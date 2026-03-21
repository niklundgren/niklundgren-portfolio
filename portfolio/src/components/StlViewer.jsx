import { useEffect, useId, useRef, useState } from 'react';

// ── Binary STL parser ─────────────────────────────────────────────────────────
// Format: 80-byte header | uint32 triangle count | N × (12-byte normal + 3×12-byte verts + 2-byte attr)
function parseBinarySTL(buffer) {
  const view = new DataView(buffer);
  const triCount = view.getUint32(80, true);
  const positions = new Float32Array(triCount * 9);
  const normals   = new Float32Array(triCount * 9);

  let offset = 84;
  for (let i = 0; i < triCount; i++) {
    const nx = view.getFloat32(offset,      true);
    const ny = view.getFloat32(offset +  4, true);
    const nz = view.getFloat32(offset +  8, true);
    offset += 12;

    for (let v = 0; v < 3; v++) {
      const base = i * 9 + v * 3;
      positions[base]     = view.getFloat32(offset,     true);
      positions[base + 1] = view.getFloat32(offset + 4, true);
      positions[base + 2] = view.getFloat32(offset + 8, true);
      normals[base]     = nx;
      normals[base + 1] = ny;
      normals[base + 2] = nz;
      offset += 12;
    }
    offset += 2; // attribute byte count
  }
  return { positions, normals, triCount };
}

function parseAsciiSTL(text) {
  const vertexRegex = /vertex\s+([+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)\s+([+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)\s+([+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?)/g;
  const verts = [];
  let match;
  while ((match = vertexRegex.exec(text)) !== null) {
    verts.push(Number(match[1]), Number(match[2]), Number(match[3]));
  }

  if (verts.length === 0 || verts.length % 9 !== 0) {
    throw new Error('Invalid ASCII STL: empty geometry or bad triangle grouping.');
  }

  const triCount = verts.length / 9;
  const positions = new Float32Array(verts);
  const normals = new Float32Array(positions.length);

  for (let i = 0; i < positions.length; i += 9) {
    const ax = positions[i];
    const ay = positions[i + 1];
    const az = positions[i + 2];
    const bx = positions[i + 3];
    const by = positions[i + 4];
    const bz = positions[i + 5];
    const cx = positions[i + 6];
    const cy = positions[i + 7];
    const cz = positions[i + 8];

    const abx = bx - ax;
    const aby = by - ay;
    const abz = bz - az;
    const acx = cx - ax;
    const acy = cy - ay;
    const acz = cz - az;

    const nx = aby * acz - abz * acy;
    const ny = abz * acx - abx * acz;
    const nz = abx * acy - aby * acx;
    const len = Math.hypot(nx, ny, nz) || 1;
    const fnx = nx / len;
    const fny = ny / len;
    const fnz = nz / len;

    for (let v = 0; v < 3; v++) {
      const base = i + v * 3;
      normals[base] = fnx;
      normals[base + 1] = fny;
      normals[base + 2] = fnz;
    }
  }

  return { positions, normals, triCount };
}

function isLikelyBinarySTL(buffer) {
  if (buffer.byteLength < 84) return false;
  const view = new DataView(buffer);
  const triCount = view.getUint32(80, true);
  return 84 + triCount * 50 === buffer.byteLength;
}

// ── Shader sources ────────────────────────────────────────────────────────────
const VERT_SRC = `
attribute vec3 aPos;
attribute vec3 aNorm;
uniform mat4 uMVP;
uniform mat4 uModel;
varying vec3 vNorm;
varying vec3 vPos;
void main() {
  vec4 worldPos = uModel * vec4(aPos, 1.0);
  vPos  = worldPos.xyz;
  vNorm = normalize(mat3(uModel) * aNorm);
  gl_Position = uMVP * vec4(aPos, 1.0);
}`;

const FRAG_SRC = `
precision mediump float;
varying vec3 vNorm;
varying vec3 vPos;
uniform vec3 uLightDir;
uniform vec3 uCamPos;
void main() {
  vec3 n = normalize(vNorm);
  vec3 l = normalize(uLightDir);
  vec3 v = normalize(uCamPos - vPos);
  vec3 h = normalize(l + v);
  float diff = max(dot(n, l), 0.0) * 0.72;
  float back = max(dot(-n, l), 0.0) * 0.18;  // subtle back-face fill
  float spec = pow(max(dot(n, h), 0.0), 48.0) * 0.45;
  float ambient = 0.22;
  float light = ambient + diff + back + spec;
  vec3 baseColor = vec3(0.55, 0.75, 1.0);     // cool steel-blue
  gl_FragColor = vec4(baseColor * light, 1.0);
}`;

// ── Matrix helpers ────────────────────────────────────────────────────────────
function mat4() { const m = new Float32Array(16); m[0]=m[5]=m[10]=m[15]=1; return m; }

function perspective(fov, aspect, near, far) {
  const f = 1 / Math.tan(fov / 2);
  const m = new Float32Array(16);
  m[0]=f/aspect; m[5]=f;
  m[10]=(far+near)/(near-far); m[11]=-1;
  m[14]=(2*far*near)/(near-far);
  return m;
}

// Column-major multiply: out[col*4+row] = sum_k a[k*4+row] * b[col*4+k]
function multiply(a, b) {
  const out = new Float32Array(16);
  for (let i = 0; i < 4; i++)       // i = output column
    for (let j = 0; j < 4; j++)     // j = output row
      for (let k = 0; k < 4; k++)
        out[i*4+j] += a[k*4+j] * b[i*4+k];
  return out;
}

function translate(tx, ty, tz) {
  const m = mat4();
  m[12]=tx; m[13]=ty; m[14]=tz;
  return m;
}

function rotateX(a) {
  const m = mat4(), c=Math.cos(a), s=Math.sin(a);
  m[5]=c; m[6]=s; m[9]=-s; m[10]=c;
  return m;
}

function rotateY(a) {
  const m = mat4(), c=Math.cos(a), s=Math.sin(a);
  m[0]=c; m[2]=-s; m[8]=s; m[10]=c;
  return m;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function StlViewer({
  url,
  className = '',
  startInteractive = false,
  overlayLabel = 'Click to interact',
}) {
  const canvasRef = useRef(null);
  const stateRef  = useRef({ rotX: 0.4, rotY: 0.5, zoom: 1, drag: null });
  const drawRef = useRef(() => {});
  const interactiveRef = useRef(startInteractive);
  const overlayId = useId();
  const [interactive, setInteractive] = useState(startInteractive);

  useEffect(() => {
    interactiveRef.current = interactive;
  }, [interactive]);

  useEffect(() => {
    setInteractive(startInteractive);
    interactiveRef.current = startInteractive;
  }, [startInteractive, url]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');
    if (!gl) return;
    let cancelled = false;
    let pendingFrame = 0;
    let posBuf = null;
    let normBuf = null;
    let resizeObserver = null;

    // compile shaders
    function compile(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(s) || 'Unknown shader compile error';
        gl.deleteShader(s);
        throw new Error(info);
      }
      return s;
    }
    const vertShader = compile(gl.VERTEX_SHADER, VERT_SRC);
    const fragShader = compile(gl.FRAGMENT_SHADER, FRAG_SRC);
    const prog = gl.createProgram();
    gl.attachShader(prog, vertShader);
    gl.attachShader(prog, fragShader);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(prog) || 'Unknown program link error';
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteProgram(prog);
      throw new Error(info);
    }
    gl.useProgram(prog);

    const aPos  = gl.getAttribLocation(prog, 'aPos');
    const aNorm = gl.getAttribLocation(prog, 'aNorm');
    const uMVP     = gl.getUniformLocation(prog, 'uMVP');
    const uModel   = gl.getUniformLocation(prog, 'uModel');
    const uLightDir = gl.getUniformLocation(prog, 'uLightDir');
    const uCamPos   = gl.getUniformLocation(prog, 'uCamPos');

    let triCount = 0;

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.05, 0.07, 0.10, 1);

    const draw = () => {
      if (cancelled || !triCount) return;
      const { rotX, rotY, zoom } = stateRef.current;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;

      const dpr = window.devicePixelRatio || 1;
      const dw = Math.floor(w * dpr);
      const dh = Math.floor(h * dpr);
      if (canvas.width !== dw || canvas.height !== dh) {
        canvas.width = dw;
        canvas.height = dh;
        gl.viewport(0, 0, dw, dh);
      }

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      const proj  = perspective(0.7, w / h, 0.1, 100);
      const view  = translate(0, 0, -3.5 / zoom);
      const model = multiply(rotateX(rotX), rotateY(rotY));
      const mvp   = multiply(proj, multiply(view, model));

      gl.uniformMatrix4fv(uMVP, false, mvp);
      gl.uniformMatrix4fv(uModel, false, model);
      gl.uniform3f(uLightDir, 0.6, 1.0, 0.8);
      gl.uniform3f(uCamPos, 0, 0, 3.5 / zoom);

      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
      gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, normBuf);
      gl.vertexAttribPointer(aNorm, 3, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.TRIANGLES, 0, triCount * 3);
    };

    const queueDraw = () => {
      if (cancelled || pendingFrame) return;
      pendingFrame = requestAnimationFrame(() => {
        pendingFrame = 0;
        draw();
      });
    };

    drawRef.current = queueDraw;

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to fetch STL: ${r.status} ${r.statusText}`);
        return r.arrayBuffer();
      })
      .then(buf => {
        const parsed = isLikelyBinarySTL(buf)
          ? parseBinarySTL(buf)
          : parseAsciiSTL(new TextDecoder().decode(buf));
        const { positions, normals, triCount: tc } = parsed;
        triCount = tc;

        // center + normalize geometry
        let minX=Infinity,minY=Infinity,minZ=Infinity;
        let maxX=-Infinity,maxY=-Infinity,maxZ=-Infinity;
        for (let i = 0; i < positions.length; i += 3) {
          minX=Math.min(minX,positions[i]);   maxX=Math.max(maxX,positions[i]);
          minY=Math.min(minY,positions[i+1]); maxY=Math.max(maxY,positions[i+1]);
          minZ=Math.min(minZ,positions[i+2]); maxZ=Math.max(maxZ,positions[i+2]);
        }
        const cx=(minX+maxX)/2, cy=(minY+maxY)/2, cz=(minZ+maxZ)/2;
        const scale = 1.8 / Math.max(maxX-minX, maxY-minY, maxZ-minZ);
        for (let i = 0; i < positions.length; i += 3) {
          positions[i]   = (positions[i]   - cx) * scale;
          positions[i+1] = (positions[i+1] - cy) * scale;
          positions[i+2] = (positions[i+2] - cz) * scale;
        }

        posBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);

        normBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normBuf);
        gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(aNorm);
        gl.vertexAttribPointer(aNorm, 3, gl.FLOAT, false, 0, 0);
        queueDraw();
      })
      .catch((err) => {
        console.error('STL viewer failed to initialize:', err);
      });

    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(() => {
        queueDraw();
      });
      resizeObserver.observe(canvas);
    } else {
      window.addEventListener('resize', queueDraw);
    }

    // ── Pointer controls ──────────────────────────────────────────────────────
    const onDown = (e) => {
      if (!interactiveRef.current) return;
      const pt = e.touches ? e.touches[0] : e;
      stateRef.current.drag = { x: pt.clientX, y: pt.clientY };
    };
    const onMove = (e) => {
      if (!interactiveRef.current) return;
      const s = stateRef.current;
      if (!s.drag) return;
      const pt = e.touches ? e.touches[0] : e;
      const dx = pt.clientX - s.drag.x;
      const dy = pt.clientY - s.drag.y;
      s.rotY += dx * 0.01;
      s.rotX += dy * 0.01;
      s.drag = { x: pt.clientX, y: pt.clientY };
      queueDraw();
    };
    const onUp   = () => { stateRef.current.drag = null; };
    const onWheel = (e) => {
      if (!interactiveRef.current) return;
      e.preventDefault();
      stateRef.current.zoom = Math.max(0.2, Math.min(5, stateRef.current.zoom * (1 - e.deltaY * 0.001)));
      queueDraw();
    };

    canvas.addEventListener('mousedown',  onDown);
    canvas.addEventListener('mousemove',  onMove);
    canvas.addEventListener('mouseup',    onUp);
    canvas.addEventListener('mouseleave', onUp);
    canvas.addEventListener('touchstart', onDown, { passive: true });
    canvas.addEventListener('touchmove',  onMove, { passive: true });
    canvas.addEventListener('touchend',   onUp);
    canvas.addEventListener('wheel',      onWheel, { passive: false });

    return () => {
      cancelled = true;
      cancelAnimationFrame(pendingFrame);
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', queueDraw);
      }
      if (posBuf) gl.deleteBuffer(posBuf);
      if (normBuf) gl.deleteBuffer(normBuf);
      gl.deleteProgram(prog);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      canvas.removeEventListener('mousedown',  onDown);
      canvas.removeEventListener('mousemove',  onMove);
      canvas.removeEventListener('mouseup',    onUp);
      canvas.removeEventListener('mouseleave', onUp);
      canvas.removeEventListener('touchstart', onDown);
      canvas.removeEventListener('touchmove',  onMove);
      canvas.removeEventListener('touchend',   onUp);
      canvas.removeEventListener('wheel',      onWheel);
    };
  }, [url]);

  useEffect(() => {
    drawRef.current();
  }, [interactive]);

  return (
    <div className="stl-viewer-frame">
      <canvas
        ref={canvasRef}
        className={`stl-canvas ${interactive ? 'stl-canvas-interactive' : ''} ${className}`.trim()}
        aria-describedby={!interactive ? overlayId : undefined}
      />
      {!interactive && (
        <button
          id={overlayId}
          type="button"
          className="stl-viewer-activation"
          onClick={() => setInteractive(true)}
        >
          <span>{overlayLabel}</span>
        </button>
      )}
    </div>
  );
}
