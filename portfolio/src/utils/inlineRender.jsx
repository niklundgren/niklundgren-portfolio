import katex from 'katex';
import 'katex/dist/katex.min.css';

export function renderKaTeX(latex, displayMode = false) {
  return katex.renderToString(latex, {
    displayMode,
    throwOnError: false,
    output: 'html',
  });
}

// Splits prose on inline $math$ and [1] / [1,2] citations, returning a React
// fragment list. Citations render as <sup className="panel-cite">.
export function renderInline(text) {
  const parts = text.split(/(\$[^$]+\$|\[\d+(?:,\d+)*\])/g);
  return parts.map((part, i) => {
    if (part.startsWith('$') && part.endsWith('$')) {
      return (
        <span
          key={i}
          dangerouslySetInnerHTML={{ __html: renderKaTeX(part.slice(1, -1), false) }}
        />
      );
    }
    if (/^\[\d/.test(part)) {
      return <sup key={i} className="panel-cite">{part}</sup>;
    }
    return part;
  });
}
