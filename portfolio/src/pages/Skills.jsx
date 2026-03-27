import { useState, useCallback, useEffect } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import './Skills.css';
import SectionDivider from '../components/SectionDivider';
import CloseButton from '../components/CloseButton';

/* ── Static data ──────────────────────────────── */

const software = [
  { name: 'LAMMPS', logo: '/logos/lammps-logo.png', url: 'https://docs.lammps.org' },
  { name: 'GPUMD', logo: '/logos/gpumd-logo.png', url: 'https://gpumd.org' },
  { name: 'Quantum ESPRESSO', logo: '/logos/quantum-espresso-logo.png', url: 'https://www.quantum-espresso.org' },
  { name: 'ASE', logo: '/logos/ase-logo.png', url: 'https://wiki.fysik.dtu.dk/ase/' },
  { name: 'kALDo', logo: '/logos/kaldo-logo.png', url: 'https://nanotheorygroup.github.io/kaldo/' },
];

const figures = [
  { src: '/figures/si-xls-rmse.png', num: 'Fig. 01', label: 'Silicon MLIP Parity Plot', caption: 'Force from the machine learning interatomic potential I trained vs. DFT reference data across silicon phases.', span: 'wide' },
  { src: '/figures/rad_ang.png', num: 'Fig. 02', label: 'Amorphous Silicon Structural Convergence', caption: 'Radial and angular distribution functions of amorphous silicon across three size scales. The radial distribution agrees well with neutron scattering experiments and helps show model convergence.', span: 'wide' },
  { src: '/figures/xls-dispersion.png', num: 'Fig. 03', label: 'Silicene Phonon Population Comparison', caption: 'A dense comparison of phonon populations between molecular dynamics and lattice dynamics for mono- and bilayer silicene. The molecular dynamics populations are red-shifted by finite-temperature effects, while bilayer silicene shows a compressed dispersion with optical shear modes near 4 THz.', span: 'wide' },
  { src: '/figures/sige-sizeconverge.png', num: 'Fig. 04', label: 'SiGe Size Convergence', caption: 'Convergence of thermal properties with supercell size in amorphous SiGe. The annotations point out how the difference accumulates across specific frequency ranges', span: 'standard' },
  { src: '/figures/sige-velocities.png', num: 'Fig. 05', label: 'SiGe Phonon Velocities', caption: 'Effects of alloy concentration in the generalized group velocities of phonon modes. The 2D grid represents the effects of the interactions with each pair of modes. Generalized quantities are the cornerstone of QHGK, where we lose focus on individual modes, and instead couple them.', span: 'standard' },
  { src: '/figures/sige-diffusivity.png', num: 'Fig. 06', label: 'SiGe Diffusivity', caption: 'Thermal diffusivity of amorphous silicon–germanium alloys. The large shaded areas represent the mean value of specific groups of frequencies.', span: 'wide' },
  { src: '/figures/mgo-disp.png', num: 'Fig. 07', label: 'MgO Phonon Dispersion', caption: 'Phonon Dispersion for Magnesium Oxide that shows off one of the features I added to kALDo, the non-analytical correction. In real materials with a dipole, the transverse and longitudinal optical modes typically split near Gamma, demonstrated by the red lines.', span: 'wide' },
  { src: '/figures/mgo-props.png', num: 'Fig. 08', label: 'MgO Thermal Properties', caption: 'Phonon properties of MgO with and without the NAC correction. Adding the correction decreases optical modes group velocities and lower the thermal conductivity.', span: 'wide' },
  { src: '/figures/si-bls-strain.png', num: 'Fig. 09', label: 'Bilayer Silicene Under Strain', caption: 'Changes of the phonons in bilayer silicene under applied biaxial strain.', span: 'tall' },
  { src: '/figures/si-strain-k.png', num: 'Fig. 10', label: 'Silicon Thermal Conductivity vs. Strain', caption: 'Demonstrating that monolayer silicene has divergent thermal conductivity under strain, in both EMD and ALD.', span: 'tall' },
];

/* ── Writing section data ─────────────────────── */

const WRITING_SECTIONS = [
  {
    id: 'phonons',
    title: 'Phonons: the Quasi-Particle of Vibration',
    subtitle: 'Collective vibration in crystal lattices',
    preview: {
      type: 'eq',
      latex: 'H = \\tfrac{1}{2}\\hat{\\mathbf{p}}^T\\hat{\\mathbf{p}} + \\tfrac{1}{2}\\hat{\\mathbf{u}}^T\\Phi\\hat{\\mathbf{u}}',
    },
    content: [
      { type: 'p', text: 'Lattice dynamics seeks to understand how the motion of individual atomic nuclei couples to the lattice as a whole, and thus we need to find coupled equations of motion via Hamiltonian mechanics. The first ingredient is an equation describing the total energy of the system, which in a crystal lattice, should address the energy of the nuclei and their electrons. The adiabatic approximation, justified by arguments made by Born and Oppenheimer,[1] allows us to disregard terms related to electrons when our focus is on nuclear motion. This can be interpreted physically as the electron wave functions smoothly and elastically deforming in response to nuclear motion, conserving energy eigenstates of the nuclei. At this point, the Hamiltonian includes only terms related to the potential energy of nuclear positions, $V(\\mathbf{x})$, and their momentum $\\mathbf{p}$ or ($\\mathbf{m\\dot{x}}$),' },
      { type: 'eq', latex: 'H(\\mathbf{x}, \\mathbf{p}) = \\frac{1}{2}\\sum_{i\\alpha}\\frac{p_{i\\alpha}^2}{m_i} + V(\\mathbf{x})' },
      { type: 'p', text: 'where $i=(\\mathbf{l}, \\kappa)$ indexes over lattice sites $\\mathbf{l}=(l_x, l_y, l_z)$ and the atoms at each site $\\kappa$. Dimensions are indexed by $\\alpha$, $m_i$ is the atomic mass, and $V$ is the potential energy function. The system is currently in a state of weak translational symmetry because the lattice sites are mostly identical, however sites near the boundary experience asymmetric forces. A common approach to recover the eigenfunctions of this Hamiltonian relies on strong translational symmetry which can be recovered by imposing the periodic boundary conditions (PBCs) proposed by Born and von K\u00e1rm\u00e1n in 1912.[2] Physically this implies our system is an infinite lattice which translates mathematically to the first lattice site and the site one lattice constant beyond the boundary representing the same location.' },
      { type: 'p', text: 'A Taylor expansion of the potential energy surface (PES) in terms of the atomic displacements from their equilibrium positions, $\\mathbf{u} = \\mathbf{x} - \\mathbf{x}^\\circ$, results in the equation' },
      { type: 'eq', latex: 'V(\\mathbf{u}) = V_0 + \\sum_{i\\alpha}\\frac{\\partial V}{\\partial u_{i\\alpha}}u_{i\\alpha} + \\frac{1}{2}\\sum_{ij\\alpha\\beta}\\frac{\\partial^2 V}{\\partial u_{i\\alpha}\\partial u_{j\\beta}}u_{i\\alpha}u_{j\\beta} + \\mathcal{O}(\\mathbf{u}^3)' },
      { type: 'p', text: 'where $\\mathcal{O}$ is the error from excluding higher order terms. The constant potential energy $V_0$ can be set to zero since energy is a relative quantity. The linear term represents forces which are zero at equilibrium and can also be ignored, leaving only quadratic and higher order terms. Far from melting, terms cubic in $\\mathbf{u}$ are small enough that they can be treated as a perturbation to the quadratic potential. This is known as the quasi-harmonic approximation because the equations of motion that result from a quadratic potential well are sinusoidal (harmonic).[3]' },
      { type: 'p', text: 'We quantize the system by transitioning the displacement and momenta vectors to operators that fulfill the commutation relations $[\\hat{u}_i, \\hat{p}_j] = i\\hbar\\delta_{ij}$. The quantization of atomic vibration is famously demonstrated in spectroscopic absorption lines of diatomic molecules but can be experimentally justified for bulk materials by both Brillouin and Raman spectroscopy which rely on quasi-particle scattering events.[4,5] Using mass-weighted displacement and momentum operators so that $\\hat{u}_{i\\alpha} = \\sqrt{m_i}\\,u_{i\\alpha}$ and $\\hat{p}_{i\\alpha} = p_{i\\alpha}/\\sqrt{m_i}$, our Hamiltonian is written in matrix representation as' },
      { type: 'eq', latex: 'H(\\hat{\\mathbf{u}},\\hat{\\mathbf{p}}) = \\frac{1}{2}\\hat{\\mathbf{p}}^T\\cdot\\hat{\\mathbf{p}} + \\frac{1}{2}\\hat{\\mathbf{u}}^T\\Phi\\,\\hat{\\mathbf{u}}' },
      { type: 'p', text: 'where $\\mathbf{p}^T$ is the transpose of column vector $\\mathbf{p}$. Since $\\Phi$ is a positive-definite symmetric square matrix, it can be diagonalized as' },
      { type: 'eq', latex: 'D = U\\Omega U^T' },
      { type: 'p', text: 'where $U$ is the orthogonal matrix whose columns are eigenvectors $\\mathbf{e}^\\mu$, and $\\Omega = \\boldsymbol{\\omega}I\\boldsymbol{\\omega}^T$ is the diagonal matrix of eigenvalues ($\\omega^2_\\mu$), introducing $\\mu$ to denote the index of the normal mode. To solve for the normal modes we employ the frozen-phonon picture, where the kinetic energy is assumed to be $\\mathbf{0}$ and the eigenspace of $D$ is assumed to be the eigenspace of the entire Hamiltonian. Resultant normal modes effectively ignore temperature effects and thus are only valid far from melting, a condition already met by our restriction on displacement amplitude.[6]' },
      { type: 'p', text: 'Following arguments made by both Ziman and Srivastava,[3,7] if we know some eigenfunction of the Hamiltonian satisfying $H|\\mathbf{e}^\\mu\\rangle = \\omega^2_\\mu|\\mathbf{e}^\\mu\\rangle$, the energy must not change if we shift each lattice index in direction $\\alpha$ by one because of the PBC. Repeating the process $l_\\alpha$ times restores the original state, implying this eigenfunction is $l_\\alpha$-fold degenerate. In quantum mechanics, degenerate functions can only differ by a complex constant phase factor of modulus unity, $e^{iq_k l_\\alpha}=1$, satisfied when $q_k = 2\\pi k/l_\\alpha$ where $k$ is an integer. This is a consequence of Bloch\'s theorem that allows us to say any eigenfunction of the 3-dimensional crystal Hamiltonian can be separated as products of a plane wave and another function with the same periodicity as the lattice. More succinctly,' },
      { type: 'eq', latex: '|(\\mathbf{l}+\\mathbf{l}^\\prime, b)\\rangle = e^{i\\mathbf{q}\\cdot\\mathbf{l}^\\prime}\\,|(\\mathbf{l}, b)\\rangle' },
      { type: 'p', text: 'if $\\mathbf{l}^\\prime$ is a translation along the lattice vectors and $\\mathbf{q}$ is a vector of $q_k$ satisfying the requirements above for each direction.' },
      { type: 'p', text: 'The symmetry explored above limits the search for eigenfunctions to the subspace of functions compatible with the Fourier transform. A major advantage of limiting ourselves to this subspace is the ability to cast the (theoretically infinite) real-space crystal lattice onto a compact volume in reciprocal space referred to as the Brillouin zone. Grouping the atoms by their lattice site $\\mathbf{l}$ at positions $\\mathbf{x_l}$ we transform the force constants like' },
      { type: 'eq', latex: 'D_{i\\alpha\\mathbf{k}j\\beta} = \\sum_{\\mathbf{l}} \\chi_{\\mathbf{kl}}\\,D_{i\\alpha\\mathbf{l}j\\beta}' },
      { type: 'p', text: 'using $\\chi_{\\mathbf{kl}} = e^{-i\\mathbf{q_k}\\cdot\\mathbf{x_l}}$, where $\\mathbf{k}$ indexes over the quasi-momentum or wave vector and the atomic indexes only run over $\\kappa$. Inspection of $\\chi_{\\mathbf{kl}}$ reveals that increasing $\\mathbf{q_k}$ by $2\\pi$ in any direction returns unity, which implies all unique wave vectors exist within a range of $2\\pi$ in each direction, conventionally chosen to be $-\\pi < q_\\mathbf{k} \\leq \\pi$. The eigenvalues can be found with' },
      { type: 'eq', latex: '\\sum_{j\\beta} D_{i\\alpha\\mathbf{k}j\\beta}\\,\\eta_{j\\beta\\mathbf{k}s} = \\omega^2_{\\mathbf{k}s}\\,\\eta_{i\\alpha\\mathbf{k}s}' },
      { type: 'p', text: 'which uses $s$ to specify the direction of atomic motion with respect to the wave vector — dubbed its polarization. Atoms can vibrate in three dimensional space along one of two transverse directions to the wave or the higher energy longitudinal direction, giving us a total of 3 polarizations per wave vector. This equation also represents the coupled equations of motion originally sought after, and the relationship between polarization, wave vector and atomic motion is explored further in the following section.' },
    ],
    refs: [
      { n: 1, authors: 'Born, M. & Von Kármán, T.', year: '1912', title: 'Über Schwingungen in Raumgittern', journal: 'Phys. Z.' },
      { n: 2, authors: 'Born, M.', year: '1927', title: 'Born-Oppenheimer Approximation', journal: 'Ann. Phys.' },
      { n: 3, authors: 'Ziman, J. M.', year: '2001', title: 'Electrons and Phonons: The Theory of Transport Phenomena in Solids', journal: 'Oxford Univ. Press' },
      { n: 4, authors: 'Reed, B. W. et al.', year: '2019', title: 'Chemically tuning quantized acoustic phonons in 2D layered MoO₃ nanoribbons', journal: 'Nano Letters' },
      { n: 5, authors: 'Kudelski, A.', year: '2008', title: 'Analytical applications of Raman spectroscopy', journal: 'Talanta' },
      { n: 6, authors: 'Weyrich, K. H.', year: '1990', title: 'Frozen phonon calculations: Lattice dynamics and instabilities', journal: 'Ferroelectrics' },
      { n: 7, authors: 'Srivastava, G. P.', year: '2019', title: 'The Physics of Phonons', journal: 'Routledge' },
    ],
  },
  {
    id: 'acoustic',
    title: 'Acoustic Phonons and Band Theory',
    subtitle: 'Dispersion, group velocity, and speed of sound',
    preview: {
      type: 'fig',
      src: '/figures/XI-dispersion.png',
      alt: 'Phonon dispersion',
    },
    content: [
      { type: 'p', text: 'There are $3N_{\\text{atoms}}$ degrees of freedom in the unit cell each corresponding to a phonon mode, three of which are equivalent to translation of that unit cell along a direction. These special modes are named acoustic modes because they can be excited through sound waves and the remainder we call optical modes. When $\\mathbf{k}=\\mathbf{0}$, the infinite-wavelength acoustic modes become translation of the entire system along an axis which requires zero energy by PBC. Optical modes at $\\mathbf{k}=\\mathbf{0}$ still result in relative atomic motion and thus have finite energy. As we explore the rest of $\\mathbf{k}$-space, every lattice wave is still movement along one of the degrees of freedom. Tracking the energy relative to $\\mathbf{k}$ can be plotted in a phonon dispersion where a single band represents the excited degree of freedom. Dispersion relations are typically plotted along high symmetry points of the crystal, shown below for ice XI.' },
      { type: 'fig', src: '/figures/XI-dispersion.png', alt: 'Phonon dispersion of ice XI', caption: 'The low frequency region for the phonon dispersion of ice XI using three interatomic potentials.[1,2,3] The speed of sound is calculated for each potential using a linear fit near \u0393 to find the slope, which corresponds to the group velocity. The values in the table represent an average over the slope in three directions (towards the special points M, K and A). These values were calculated within kALDo.[4]' },
      { type: 'p', text: 'In a dispersive medium, the group velocity of a wave can be calculated by the derivative of its frequency with respect to its wave vector, $v_g = \\partial\\omega/\\partial k$. Applying the relevant derivative to the acoustic modes as their wavevector $\\mathbf{k}$ approaches zero yields the material\'s speed of sound. We can demonstrate this by averaging the derivative of the acoustic branches in three directions ($M, K, A$) for the transverse and longitudinal polarizations.' },
      { type: 'p', text: 'Experimentally determining the speed of sound requires interaction with waves traveling at kilometers per second which severely limits the number of detection methods. Brillouin spectroscopy and piezoelectric transducers (PZT) are two popular choices, but to our knowledge there have not been any such experiments with ice XI. We contrast our results against PZT measurements for ice Ih which features oxygen arranged in the same framework but lacks the proton ordering of ice XI. The neural network potential (NNP)[1] and our SNAP potential[3] get within 10% of both experimental velocities. Overestimation by SNAP on $v_{\\text{trans}}$ likely falls less than 10% when correcting for the difference in ice systems. Given that more well-ordered systems tend to higher group velocities,[5] it stands to reason the true experimental comparisons are slightly higher than presented here, implying our machine learning potentials may be a little soft on average.' },
      { type: 'p', text: 'Data from the force-matching potential (FMP) fares less well. The FMP has successfully been used in structural studies in the past[2] but is likely not a good candidate for lattice dynamics calculations of amorphous ice as the speed of sound is close to an order of magnitude different than experimental values.' },
      {
        type: 'table',
        caption: 'Speed of sound in km/s for the transverse ($v_{\\text{trans}}$) and longitudinal modes ($v_{\\text{long}}$) for the three interatomic potentials in ice XI contrasted with Brillouin spectroscopy data for ice Ih.[6]',
        headers: ['Mode', 'FM', 'NNP', 'SNAP', 'Expt'],
        rows: [
          ['$v_{\\text{trans}}$', '9.48 \u00b1 1.63', '2.26 \u00b1 0.13', '1.97 \u00b1 0.09', '2.06 \u00b1 0.04'],
          ['$v_{\\text{long}}$',  '18.27 \u00b1 2.10', '3.82 \u00b1 0.16', '3.96 \u00b1 0.17', '3.93 \u00b1 0.07'],
        ],
      },
    ],
    refs: [
      { n: 1, authors: 'Schran, C. et al.', year: '2020', title: 'Committee neural network potentials control generalization errors and enable active learning', journal: 'J. Chem. Phys.' },
      { n: 2, authors: 'Martoňák, R. et al.', year: '2005', title: 'Evolution of the structure of amorphous ice', journal: 'J. Chem. Phys.' },
      { n: 3, authors: 'Wood, M. A. et al.', year: '2019', title: 'Data-driven material models for atomistic simulation', journal: 'Phys. Rev. B' },
      { n: 4, authors: 'Barbalinardo, G. et al.', year: '2020', title: 'Efficient anharmonic lattice dynamics calculations of thermal transport in crystalline and disordered solids', journal: 'J. Appl. Phys.' },
      { n: 5, authors: 'Singh, R. & Balasubramanian, G.', year: '2017', title: 'Impeding phonon transport through superlattices of organic–inorganic halide perovskites', journal: 'RSC Advances' },
      { n: 6, authors: 'Gagnon, R. E. et al.', year: '1990', title: 'Acoustic velocities and densities of polycrystalline ice Ih, II, III, V, and VI by Brillouin spectroscopy', journal: 'J. Chem. Phys.' },
    ],
  },
  {
    id: 'bte',
    title: 'Thermal Transport in the Phonon Picture',
    subtitle: 'Thermal conductivity from first principles',
    preview: {
      type: 'eq',
      latex: 'n_\\mu = \\frac{1}{e^{\\hbar\\omega_\\mu/k_BT}-1}',
    },
    content: [
      { type: 'p', text: 'Thermal transport in crystal lattices using the phonon model requires quantum treatment of nuclear motion in combination with statistical thermodynamics of macroscopic temperature gradients. The phonon picture says that, in an infinitely large crystal lattice, all nuclear vibration is the sum of harmonic plane waves. Each vibration is delocalized across the entire lattice but still moves energy in the system according to its wave vector $\\mathbf{k}$. The statistical average of mode populations should eliminate any net energy flux at equilibrium. The Boltzmann transport equation (BTE) picture imagines segregation of the lattice into two pieces with a finite temperature difference between them and allows the flux to be calculated based on the expected difference in mode populations. The eigenfunction of each phonon must be symmetric under interchange of lattice sites due to the PBC, which classifies them as bosons. Their population follows the Bose-Einstein distribution,' },
      { type: 'eq', latex: 'n_\\mu = n(\\omega_\\mu) = \\frac{1}{e^{\\hbar\\omega_\\mu/k_BT}-1}' },
      { type: 'p', text: 'where $k_B$ is the Boltzmann constant, $T$ is the temperature, and $\\mu = (\\mathbf{k}, s)$ is a selection of wave vector and polarization.' },
      { type: 'p', text: 'If we imagine a small temperature gradient along the direction $\\alpha$, the lattice should respond with a gradient in the phonon population. Assuming the change in $n_\\mu$ at any point is dependent only on the difference in temperature like $\\partial n_{\\mu\\alpha}/\\partial x_\\alpha = (\\partial n_\\mu/\\partial T)\\nabla_\\alpha T$, we can write the Taylor expansion of the population as' },
      { type: 'eq', latex: '\\tilde{n}_{\\mu\\alpha} \\approx n_\\mu + \\lambda_{\\mu\\alpha}\\frac{\\partial n_\\mu}{\\partial x_\\alpha} \\approx n_\\mu + \\psi_{\\mu\\alpha}\\nabla_\\alpha T' },
      { type: 'p', text: 'with $\\psi_{\\mu\\alpha} = \\lambda_{\\mu\\alpha}(\\partial n_\\mu/\\partial T)$, where $\\lambda_{\\mu\\alpha}$ is the mean free path (MFP) in the $\\alpha$ direction. Truncation at the linear term requires the assumption that deviation from equilibrium is small in the steady state presence of our temperature gradient.' },
      { type: 'p', text: 'The BTE very generally describes the diffusion of classical particles in response to a gradient however the full equation is famously complicated. Here, we use the linearized BTE which takes the form of an equality between the phonon diffusion due to $\\nabla T$ and their scattering processes:' },
      { type: 'eq', latex: '\\mathbf{v}_\\mu\\cdot\\nabla T\\,\\frac{\\partial n_\\mu}{\\partial T} = \\left.\\frac{\\partial n_\\mu}{\\partial t}\\right|_{\\text{scatt}}' },
      { type: 'p', text: 'describing the rate of collisions into and out of state $\\mu$, with $\\mathbf{v}_\\mu$ the group velocity. In bulk semiconducting crystals, the primary scattering processes carry out through phonon-phonon interactions.[1] Boundary scattering effects are significant in low dimensional crystals but can be ignored in discussion of bulk materials. We now take the allowed phonon scattering processes to be written' },
      { type: 'eq', latex: '\\left.\\frac{\\partial n_\\mu}{\\partial t}\\right|_{\\text{scatt}} = \\frac{\\nabla T}{\\omega_\\mu N_k}\\Bigl[\\sum_{\\mu\'\\mu\'\'}^{+} \\Gamma^+_{\\mu\\mu\'\\mu\'\'} (\\omega_\\mu\\psi_{\\mu\\alpha} + \\omega_{\\mu\'}\\psi_{\\mu\'\\alpha} - \\omega_{\\mu\'\'}\\psi_{\\mu\'\'\\alpha}) + \\sum_{\\mu\'\\mu\'\'}^{-} \\Gamma^-_{\\mu\\mu\'\\mu\'\'} (\\omega_\\mu\\psi_{\\mu\\alpha} - \\omega_{\\mu\'}\\psi_{\\mu\'\\alpha} - \\omega_{\\mu\'\'}\\psi_{\\mu\'\'\\alpha})\\Bigr]' },
      { type: 'p', text: 'with $\\Gamma^{\\pm}_{\\mu\\mu\'\\mu\'\'}$ representing three-phonon scattering rates corresponding to annihilation ($\\mu, \\mu\' \\to \\mu\'\'$) and creation ($\\mu \\to \\mu\', \\mu\'\'$) processes. The scattering rate is given by' },
      { type: 'eq', latex: '\\Gamma^{\\pm}_{\\mu\\mu\'\\mu\'\'} = \\frac{\\hbar\\pi}{8}\\frac{g^{\\pm}_{\\mu\\mu\'\\mu\'\'}}{\\omega_\\mu\\,\\omega_{\\mu\'}\\,\\omega_{\\mu\'\'}}\\,|\\Phi^{\\pm}_{\\mu\\mu\'\\mu\'\'}|' },
      { type: 'p', text: 'where $g^{\\pm}_{\\mu\\mu\'\\mu\'\'}$ is the phase space volume for creation/annihilation and $\\Phi^{\\pm}_{\\mu\\mu\'\\mu\'\'}$ is the coupling strength found by projection of the three phonon modes onto the third-order force constant matrix. More explicitly, the projection is calculated as' },
      { type: 'eq', latex: '\\Phi^{\\pm}_{\\mu\\mu\'\\mu\'\'} = \\sum_{iljl\'k}\\frac{\\Phi_{iljl\'k}}{\\sqrt{m_im_jm_k}}\\,e^{\\mu}_{i}\\,e^{\\pm\\mu\'}_{j}\\,e^{*\\mu\'\'}_{k}\\,\\chi^{\\pm}_{l\\mu}\\,\\chi^{\\pm}_{l\'\\mu\'}' },
      { type: 'p', text: 'using notation where the $\\pm$ superscript denotes either the vector itself (+) or its complex conjugate (\u2212). Fourier transforms $\\chi_{l\\mu}$ are indexed by phonon mode but are only affected by the wave vector $k$ of that mode, effectively ignoring the polarization $s$. The phase space volume is defined as' },
      { type: 'eq', latex: 'g^+_{\\mu\\mu\'\\mu\'\'} = (n_{\\mu\'} - n_{\\mu\'\'})\\,\\delta^+_{\\mu\\mu\'\\mu\'\'}' },
      { type: 'eq', latex: 'g^-_{\\mu\\mu\'\\mu\'\'} = (1 + n_{\\mu\'} + n_{\\mu\'\'})\\,\\delta^-_{\\mu\\mu\'\\mu\'\'}' },
      { type: 'p', text: 'where the $\\delta^{\\pm}_{\\mu\\mu\'\\mu\'\'}$ are delta functions that account for conservation of energy and quasi-momentum. Normalizing the phase space per mode, $g_\\mu = \\frac{1}{N_k}\\sum_{\\mu\'\\mu\'\'}(g^-_{\\mu\\mu\'\\mu\'\'} + g^+_{\\mu\\mu\'\\mu\'\'})$, describes the relative weight each mode plays in scattering processes. To numerically implement the Dirac delta, we use a distribution with some finite width (e.g. Gaussian, Lorentzian, or triangular) which can be chosen optimally based on the phonon velocities.[2,3]' },
      { type: 'p', text: 'Four-phonon and higher order scattering processes become important in soft materials, where atomic displacements get large and vibrations become increasingly anharmonic. Accounting for these processes requires normal mode projections on fourth-order force-constant matrices and thus are typically too expensive to calculate using the finite displacement method,[4] though could be considered in future work using Matthiessen\'s rule to combine the scattering effects.' },
      { type: 'p', text: 'To find $\\lambda_{\\mu\\alpha}$, we combine the BTE and scattering equations and solve for the $\\psi_{\\mu\\alpha}$ terms:' },
      { type: 'eq', latex: '\\lambda_{\\mu\\alpha} = \\sum_{\\mu\'} (\\Gamma^0_\\mu + \\Gamma^1_{\\mu\\mu\'})^{-1}\\,v_{\\mu\'\\alpha}' },
      { type: 'p', text: 'highlighting the separate contributions of terms reliant only on the coupling strength of the eigenfunctions, $\\Gamma^0_\\mu = \\sum_{\\mu\'\\mu\'\'} (\\Gamma^+_{\\mu\\mu\'\\mu\'\'} - \\Gamma^-_{\\mu\\mu\'\\mu\'\'})$, and those which account for competition between processes by scaling with the ratio of mode energies, $\\Gamma^1_{\\mu\\mu\'} = (\\omega_{\\mu\'}/\\omega_\\mu)\\sum_{\\mu\'\'}(\\Gamma^+_{\\mu\\mu\'\\mu\'\'} - \\Gamma^+_{\\mu\\mu\'\'\\mu\'} - \\Gamma^-_{\\mu\\mu\'\\mu\'\'} - \\Gamma^-_{\\mu\\mu\'\'\\mu\'})$. A popular simplification, the relaxation time approximation (RTA), only considers the first term which can be calculated using Fermi\'s Golden Rule.[1]' },
      { type: 'p', text: 'The total heat current can now be separated into single mode contributions based on the energy of that mode $\\hbar\\omega_\\mu$ and the Taylor expansion of the out-of-equilibrium population $\\tilde{n}_\\mu$:' },
      { type: 'eq', latex: 'j_{\\mu\\alpha} = \\sum_\\beta \\hbar\\omega_\\mu v_{\\mu\\alpha}(\\tilde{n}_{\\mu\\beta} - n_\\mu) \\approx -\\sum_\\beta c_\\mu\\,v_{\\mu\\alpha}\\,\\lambda_{\\mu\\beta}\\,\\nabla_\\beta T' },
      { type: 'p', text: 'where $c_\\mu = \\hbar\\omega_\\mu(\\partial n_\\mu/\\partial T)$ is the modal heat capacity. The modal heat capacity is related to the total heat capacity of the system at constant pressure by $C_p = \\frac{1}{N_kV}\\sum_\\mu c_\\mu$ where $V$ is the volume of the system.' },
      { type: 'p', text: 'Heat transport is considered to be in the diffusive regime when the system is much larger than the phonon MFPs. This statement satisfies the requirements to invoke Fourier\'s law connecting heat flux and thermal conductivity,' },
      { type: 'eq', latex: 'J_\\alpha = -\\sum_\\beta \\kappa_{\\alpha\\beta}\\nabla_\\beta T' },
      { type: 'p', text: 'where $\\kappa_{\\alpha\\beta}$ is the conductivity in direction $\\alpha$ in response to a temperature gradient in direction $\\beta$. Finally, solving for the conductivity gives' },
      { type: 'eq', latex: '\\kappa_{\\alpha\\beta} = \\frac{1}{N_k V}\\sum_\\mu c_\\mu\\,v_{\\mu\\alpha}\\,\\lambda_{\\mu\\beta}' },
      { type: 'p', text: 'Scrutiny of this equation illuminates two big reasons that the majority of thermal transport in the BTE picture is dominated by acoustic waves. Their comparably large population at ambient temperatures coupled with group velocities in the km/s regime implies they transfer large amounts of energy quickly. The strong relationship between acoustic vibration and thermal transport extends beyond BTE to glassy systems as well, as we\'ll see in the next section.' },
    ],
    refs: [
      { n: 1, authors: 'Ziman, J. M.', year: '2001', title: 'Electrons and Phonons: The Theory of Transport Phenomena in Solids', journal: 'Oxford Univ. Press' },
      { n: 2, authors: 'Li, W. et al.', year: '2012', title: 'Thermal conductivity of diamond nanowires from first principles', journal: 'Phys. Rev. B' },
      { n: 3, authors: 'Li, W. et al.', year: '2014', title: 'ShengBTE: A solver of the Boltzmann transport equation for phonons', journal: 'Comput. Phys. Commun.' },
      { n: 4, authors: 'Feng, T. et al.', year: '2017', title: 'Four-phonon scattering significantly reduces intrinsic thermal conductivity of solids', journal: 'Phys. Rev. B' },
    ],
  },
  {
    id: 'qhgk',
    title: 'Thermal Transport in a Disordered Lattice',
    subtitle: 'A unified framework for crystals and glasses',
    preview: {
      type: 'eq',
      latex: "\\kappa_{\\alpha\\beta} = \\frac{k_B}{V}\\sum_{\\mu\\mu'} c_{\\mu\\mu'} v^\\alpha_{\\mu\\mu'} v^\\beta_{\\mu\\mu'} \\tau_{\\mu\\mu'}",
    },
    content: [
      { type: 'p', text: 'Materials without long-range order, like glasses or nano-crystalline materials, still rely primarily on vibrational modes to transfer thermal energy however the analysis above no longer applies for two reasons. The first is that the phonon picture of collective lattice vibrations become formally ill-defined in the absence of repeating lattice sites. The second being the BTE cannot be invoked when many vibrational modes have MFPs so short the quasi-particle picture breaks down. Instead, heat in disordered material moves through a diffusive process where delocalized vibrations of similar frequency transfer energy between each other.' },
      { type: 'p', text: 'A unified approach to calculating the thermal conductivity in both crystals and glasses was recently presented that combines anharmonic lattice dynamics with the Green-Kubo theory of linear response. The framework extends pioneering work by Allen and Feldman (AF) who separated vibrations in disordered material by their degree of localization,[1] yet simplifies to the BTE in the relaxation time approximation (RTA) for crystals. Specifically, the quasi-harmonic Green-Kubo (QHGK) framework removes the a priori distinction between propagating and diffuse modes required in the AF model and explicitly accounts for normal mode lifetimes.[2,3] The only ingredients into the QHGK framework are the equilibrium coordinates of the nuclei as well as the second and third order interatomic force constants (IFCs), which requires the use of an interatomic potential.' },
      { type: 'p', text: 'To begin, we present the Green-Kubo relation between the thermal conductivity and the heat flux auto-correlation function:' },
      { type: 'eq', latex: '\\kappa_{\\alpha\\beta} = \\frac{1}{Vk_BT^2}\\int_0^\\infty \\langle J_\\alpha(t)\\,J_\\beta(0)\\rangle\\,dt' },
      { type: 'p', text: 'where $J_\\alpha$ is the $\\alpha$ component of the macroscopic energy flux and $\\langle\\cdot\\rangle$ is a canonical average over initial conditions.[4] We can write the energy flux for a harmonic solid far from melting as' },
      { type: 'eq', latex: 'J = \\sum_i (\\dot{\\mathbf{x}}_i\\epsilon_i + \\mathbf{x}_i\\dot{\\epsilon}_i)' },
      { type: 'p', text: 'where the atomic position and local energy of atom $i$ are written as $\\mathbf{x}_i$ and $\\epsilon_i$. The energy term equates to a single atom\'s contribution to the harmonic Hamiltonian:' },
      { type: 'eq', latex: '\\epsilon_i = \\frac{1}{2}\\hat{\\mathbf{p}}_i^T\\cdot\\hat{\\mathbf{p}}_i + \\frac{1}{2}\\sum_{j\\alpha\\beta}\\hat{u}_{i\\alpha}\\,\\Phi^{j\\beta}_{i\\alpha}\\,\\hat{u}_{j\\beta}' },
      { type: 'p', text: 'Writing the flux in terms of displacement yields:' },
      { type: 'eq', latex: '\\mathbf{J} = \\sum_i \\mathbf{x}^\\circ_i\\dot{\\epsilon}_i + \\frac{d}{dt}\\Bigl(\\sum_i \\mathbf{u}_i\\epsilon_i\\Bigr)' },
      { type: 'p', text: 'In absence of atomic diffusion, the second term is stationary and exhibits finite variance which renders it inconsequential to thermal transport according to a gauge invariance of the energy.[5] We can discard the second term and rewrite the first using Newton\'s second law:' },
      { type: 'eq', latex: 'J_\\alpha = \\frac{1}{2}\\sum_{ij\\beta\\gamma}(x^\\circ_{i\\alpha} - x^\\circ_{j\\alpha})\\,\\phi^{j\\gamma}_{i\\beta}\\,u_{i\\beta}\\,\\dot{u}_{j\\gamma}' },
      { type: 'p', text: 'Diagonalization of the force constant matrix yields eigenvectors $\\mathbf{e}^\\mu$ and eigenvalues $\\omega^2_\\mu$. We argue that $J_\\alpha$ can be simplified by a transformation to mass-weighted normal coordinates ($\\eta_\\mu = \\sum_{i\\alpha}\\sqrt{m_i}\\,u_{i\\alpha}\\,e^\\mu_{i\\alpha}$) and their conjugate momenta ($\\pi_\\mu = \\sum_{i\\alpha}\\dot{u}_{i\\alpha}\\,e^\\mu_{i\\alpha}/\\sqrt{m_i}$). In addition, we introduce the quantized boson ladder operator $a_\\mu = \\sqrt{\\omega_\\mu/2}\\,\\eta_\\mu + (i/\\sqrt{2\\omega_\\mu})\\,\\pi_\\mu$ and its complex conjugate $a^\\dagger_\\mu$, which represent creation and annihilation of bosons in state $\\mu$. Rewriting the flux as a sum over pairs of interacting bosons yields' },
      { type: 'eq', latex: 'J_\\alpha = \\frac{i}{2}\\sum_{\\mu\\mu\'} v^\\alpha_{\\mu\\mu\'}\\,\\omega_{\\mu\'}(a^\\dagger_\\mu + a_\\mu)(a^\\dagger_{\\mu\'} - a_{\\mu\'})' },
      { type: 'p', text: 'which introduces $v^\\alpha_{\\mu\\mu\'}$ as the generalized velocity. The generalized velocity of two modes is the matrix element of the energy flux operator $S^\\alpha_{i\\beta,j\\gamma} = (x^\\circ_{i\\alpha} - x^\\circ_{j\\alpha})\\mathcal{D}_{i\\beta,j\\gamma}$ along $\\alpha$ in the harmonic approximation:' },
      { type: 'eq', latex: 'v^\\alpha_{\\mu\\mu\'} = \\frac{1}{2\\sqrt{\\omega_\\mu\\omega_{\\mu\'}}}\\langle\\eta^\\mu|S^\\alpha|\\eta^{\\mu\'}\\rangle' },
      { type: 'p', text: 'Substituting the boson flux expression into the Green-Kubo relation, the integral becomes a set of Gaussian integrals of fourth-order polynomials in $a_\\mu$ and $a^\\dagger_\\mu$ which evolve in time through $a_\\mu(t) = a_\\mu(0)e^{-i\\omega_\\mu t}$. Wick\'s Theorem allows us to evaluate the canonical average of each polynomial as the sum of interacting pairs. These second-order contractions become either $\\langle a^\\dagger_\\mu(t)\\,a_{\\mu\'}(0)\\rangle = G_\\mu(t)\\delta_{\\mu\\mu\'}$ or $\\langle a_\\mu(t)\\,a^\\dagger_{\\mu\'}(0)\\rangle = \\tilde{G}_\\mu(t)\\delta_{\\mu\\mu\'}$, using the single-mode quantum Green\'s functions $G^\\circ_\\mu(t) = \\hbar n_\\mu e^{i\\omega_\\mu t}$ and $\\tilde{G}^\\circ_\\mu(t) = \\hbar(n_\\mu+1)e^{i\\omega_\\mu t}$ to describe the evolution of quasi-particles in time. Currently, the solid has been treated as completely harmonic and consequently integrating the Green-Kubo relation would diverge into infinite thermal conductivity. Anharmonic broadening of the potential well adds a finite imaginary component to the frequency ($i\\gamma_\\mu$) that renormalizes our integral by decaying the Green\'s functions over time according to $G_\\mu(t) = \\hbar n_\\mu e^{i(\\omega_\\mu+\\gamma_\\mu)t}$ and $\\tilde{G}_\\mu(t) = \\hbar(n_\\mu+1)e^{i(\\omega_\\mu+\\gamma_\\mu)t}$.' },
      { type: 'p', text: 'Vibrational linewidths at the lowest order of anharmonic interactions are computed from the classical limit of Fermi\'s Golden Rule:' },
      { type: 'eq', latex: '\\gamma_\\mu = \\frac{\\pi\\hbar^2}{8\\omega_\\mu}\\sum_{\\mu\'\\mu\'\'}\\frac{|\\partial^3 V_{\\mu\\mu\'\\mu\'\'}|^2}{\\omega_{\\mu\'}\\omega_{\\mu\'\'}} \\Bigl[\\tfrac{1}{2}(1+n_{\\mu\'}+n_{\\mu\'\'})\\delta^-_{\\mu\\mu\'\\mu\'\'} + (n_{\\mu\'}-n_{\\mu\'\'})\\delta^+_{\\mu\\mu\'\\mu\'\'}\\Bigr]' },
      { type: 'p', text: 'which requires projecting combinations of three normal modes onto the third order force constants. Integrating and symmetrizing the results produces the final QHGK expression for thermal conductivity,' },
      { type: 'eq', latex: "\\kappa_{\\alpha\\beta} = \\frac{k_B}{V}\\sum_{\\mu\\mu'} c_{\\mu\\mu'}\\,v^\\alpha_{\\mu\\mu'}\\,v^\\beta_{\\mu\\mu'}\\,\\tau^\\circ_{\\mu\\mu'}" },
      { type: 'p', text: 'cast into a BTE-like form by using $\\tau^\\circ_{\\mu\\mu\'}$ and $c_{\\mu\\mu\'}$ to write the generalized lifetime and generalized heat capacity. Generalized lifetimes are the sum of two Lorentzian functions accounting for resonant and antiresonant interaction between two modes:' },
      { type: 'eq', latex: '\\begin{aligned} \\tau_{\\mu\\mu\'} &= \\frac{(\\omega_\\mu+\\omega_{\\mu\'})^2}{4\\omega_\\mu\\omega_{\\mu\'}}\\frac{\\gamma_\\mu+\\gamma_{\\mu\'}}{(\\gamma_\\mu+\\gamma_{\\mu\'})^2+(\\omega_\\mu-\\omega_{\\mu\'})^2} \\\\ &+ \\frac{(\\omega_\\mu-\\omega_{\\mu\'})^2}{4\\omega_\\mu\\omega_{\\mu\'}}\\frac{\\gamma_\\mu+\\gamma_{\\mu\'}}{(\\gamma_\\mu+\\gamma_{\\mu\'})^2+(\\omega_\\mu+\\omega_{\\mu\'})^2} \\end{aligned}' },
      { type: 'p', text: 'The generalized lifetime in the conductivity formula includes the superscript $\\circ$ to note our exclusion of the second term. The reasoning being that vibrational linewidths are significantly smaller than their frequencies ($\\gamma/\\omega \\ll 1$) in the quasi-harmonic regime. Lastly, we define the generalized heat capacity matrix' },
      { type: 'eq', latex: "c_{\\mu\\mu'} = \\frac{\\hbar\\omega_\\mu\\omega_{\\mu'}}{T}\\frac{n_\\mu - n_{\\mu'}}{\\omega_\\mu - \\omega_{\\mu'}}" },
      { type: 'p', text: 'which groups the remaining constants leftover from double integration over the Green\'s functions.' },
      { type: 'p', text: 'Remarkably, the units of these generalized properties are compatible with definitions of their respective classical analogues, however physical interpretation is not immediately clear. Thinking back through our derivation, we start by expressing the heat flux of a harmonic solid through interactions of normal mode pairs. They pass energy, $c_{\\mu\\mu\'}$, along a temperature gradient at their generalized velocity $v^\\alpha_{\\mu\\mu\'}v^\\beta_{\\mu\\mu\'}$, proportional to the distance between the atoms participating in each mode. The amount of energy they carry together is affected by their relative populations and increases if they are of similar frequency. Harmonically, this is an instantaneous process and temperature gradients cannot exist. Accounting for the time normal modes require to interact with each other, $\\tau_{\\mu\\mu\'}$, regularizes this integral into a finite scalar quantity we dub the quasi-harmonic Green-Kubo thermal conductivity.' },
      { type: 'p', text: 'As in the BTE picture, dominance of acoustic modes in thermal transport is reestablished by the QHGK equation with the analogous generalized quantities.' },
    ],
    refs: [
      { n: 1, authors: 'Allen, P. B. et al.', year: '1999', title: 'Diffusons, locons and propagons: Character of atomic vibrations in amorphous Si', journal: 'Phil. Mag. B' },
      { n: 2, authors: 'Isaeva, L. et al.', year: '2019', title: 'Modeling heat transport in crystals and glasses from a unified lattice-dynamical approach', journal: 'Nat. Commun.' },
      { n: 3, authors: 'Moon, J.', year: '2021', title: 'Examining normal modes as fundamental heat carriers in amorphous solids: the case of amorphous silicon', journal: 'J. Appl. Phys.' },
      { n: 4, authors: 'Baroni, S. et al.', year: '2020', title: 'Heat transport in insulators from ab initio Green-Kubo theory', journal: 'Handbook of Materials Modeling' },
      { n: 5, authors: 'Ercole, L. et al.', year: '2016', title: 'Gauge invariance of thermal transport coefficients', journal: 'J. Low Temp. Phys.' },
    ],
  },
];

/* ── Helpers ──────────────────────────────────── */

function renderKaTeX(latex, displayMode = false) {
  return katex.renderToString(latex, { displayMode, throwOnError: false, output: 'html' });
}

/* ── Sub-components ───────────────────────────── */

function renderInline(text) {
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

const InlineParagraph = ({ text }) => (
  <p className="panel-para">{renderInline(text)}</p>
);

const WritingCard = ({ section, onClick }) => {
  const { preview } = section;
  return (
    <button className="writing-card" onClick={() => onClick(section)}>
      <span className="writing-card-title">{section.title}</span>
      <div className="writing-card-preview">
        {preview.type === 'eq' ? (
          <div dangerouslySetInnerHTML={{ __html: renderKaTeX(preview.latex, true) }} />
        ) : (
          <img src={preview.src} alt={preview.alt} />
        )}
      </div>
    </button>
  );
};

const ContentBlock = ({ block }) => {
  if (block.type === 'p') return <InlineParagraph text={block.text} />;
  if (block.type === 'eq') {
    return (
      <div
        className="panel-eq"
        dangerouslySetInnerHTML={{ __html: renderKaTeX(block.latex, true) }}
      />
    );
  }
  if (block.type === 'fig') {
    return (
      <figure className="panel-figure">
        <img src={block.src} alt={block.alt} />
        {block.caption && <figcaption>{block.caption}</figcaption>}
      </figure>
    );
  }
  if (block.type === 'table') {
    return (
      <figure className="panel-table">
        <table>
          <thead>
            <tr>{block.headers.map((h, i) => <th key={i}>{renderInline(h)}</th>)}</tr>
          </thead>
          <tbody>
            {block.rows.map((row, ri) => (
              <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{renderInline(cell)}</td>)}</tr>
            ))}
          </tbody>
        </table>
        {block.caption && <figcaption>{renderInline(block.caption)}</figcaption>}
      </figure>
    );
  }
  return null;
};

const WritingPanel = ({ section, onClose }) => {
  useEffect(() => {
    if (!section) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [section, onClose]);

  if (!section) return null;

  return (
    <>
      <div className="writing-panel-backdrop" onClick={onClose} />
      <div className="writing-panel" role="dialog" aria-modal="true" aria-label={section.title}>
        <div className="writing-panel-header">
          <div>
            <p className="writing-panel-eyebrow">Technical Writing</p>
            <h2 className="writing-panel-title">{section.title}</h2>
            <p className="writing-panel-subtitle">{section.subtitle}</p>
          </div>
          <CloseButton className="writing-panel-close" onClick={onClose} aria-label="Close panel" />
        </div>
        <div className="writing-panel-body">
          {section.content.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}
          {section.refs && section.refs.length > 0 && (
            <div className="panel-refs">
              <div className="panel-refs-label">References</div>
              <ol className="panel-refs-list">
                {section.refs.map(ref => (
                  <li key={ref.n} className="panel-refs-item" data-n={ref.n}>
                    {ref.authors} &ldquo;{ref.title}.&rdquo; <em>{ref.journal}</em> ({ref.year})
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const FigureCard = ({ figure, onClick }) => (
  <button
    type="button"
    className={`skills-figure-card is-${figure.span}`}
    onClick={() => onClick(figure)}
    aria-label={`Open ${figure.label}`}
  >
    <div className="skills-figure-image-wrap">
      <img src={figure.src} alt={figure.label} className="skills-figure-image" />
    </div>
    <div className="skills-figure-meta">
      <span className="skills-figure-num">{figure.num}</span>
      <span className="skills-figure-label">{figure.label}</span>
      <p className="skills-figure-teaser">{figure.caption}</p>
    </div>
  </button>
);

const FigureLightbox = ({ figure, onClose }) => {
  useEffect(() => {
    if (!figure) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [figure, onClose]);

  if (!figure) return null;

  return (
    <>
      <div className="skills-lightbox-backdrop" onClick={onClose} />
      <div className="skills-lightbox" role="dialog" aria-modal="true" aria-label={figure.label}>
        <CloseButton className="skills-lightbox-close" onClick={onClose} aria-label="Close figure" />
        <div className="skills-lightbox-stage">
          <img src={figure.src} alt={figure.label} className="skills-lightbox-image" />
        </div>
        <aside className="skills-lightbox-copy">
          <p className="skills-lightbox-eyebrow">Research Figure</p>
          <p className="skills-lightbox-num">{figure.num}</p>
          <h3 className="skills-lightbox-title">{figure.label}</h3>
          <p className="skills-lightbox-text">{figure.caption}</p>
        </aside>
      </div>
    </>
  );
};

/* ── Page ─────────────────────────────────────── */

const Skills = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [activeFigure, setActiveFigure] = useState(null);
  const closePanel = useCallback(() => setActiveSection(null), []);
  const closeFigure = useCallback(() => setActiveFigure(null), []);

  return (
    <div className="skills-page">

      <header className="skills-header">
       <p className="skills-eyebrow">The Learning</p> 
       <h1 className="skills-title">Skills &amp; Expertise</h1>
      </header> 
      
      {/* \u2500\u2500 \u00a7 00 Software \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */}
      <section className="skills-section" id="software">
        <SectionDivider num="00" title="Scientific &amp; Technical Software" />
        <p className="skills-section-intro">
            These are a few of the more recognizable scientific software that I use. Lammps
            and GPUMD are both molecular dynamics engines. The NEP executable from GPUMD is what I used to 
            train NEP-XLS (see projects). Quantum Espresso is my preferred DFT code, and kALDo is the open-source
            lattice dynamics code I used for phonon calculations. ASE is a Python library that is a sort of swiss-army knife
            for anyone doing computational chemical physics.
        </p>
        <div className="software-strip">
          {software.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="software-logo-link"
              title={s.name}
            >
              <img src={s.logo} alt={s.name} className="software-logo" />
            </a>
          ))}
        </div>
      </section>

      {/* \u2500\u2500 \u00a7 01 Technical Writing \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */}
      <section className="skills-section" id="writing">
        <SectionDivider num="01" title="Technical Writing" />
        <p className="skills-section-intro">
          Throughout my Ph.D., I’ve developed a deep appreciation for the 'connective tissue' between abstract math 
          and the physical reality. I believe technical writing reaches its full potential when it goes beyond the derivation 
          to explore the physical implications of every variable and operation. The samples below were originally written for an assignment
          that my advisor (noted for his exacting standards) praised as "excellent" for their accuracy and transparency.
        </p>
        <p className="writing-subsection-label">Example: Explaining Lattice Dynamics and Thermal Transport</p>
        <p className="skills-section-intro">
          Heat energy is primarily conducted through two carriers in solid state materials. In metals, electrons are the dominate means of both electromagnetic and thermal flux.
          Semiconductors and other solids with more tightly bound electrons rely instead on traveling waves of atomic vibration. These vibrations in highly ordered materials are
          modeled as quasi-particles known as phonons, however collective lattice vibration is important to thermal conductance even in the absence of long-range order.
          The sections of writing here seek to explain the following:<br></br>
        </p>
        <div className="writing-cards-grid">
          {WRITING_SECTIONS.map((sec) => (
            <WritingCard key={sec.id} section={sec} onClick={setActiveSection} />
          ))}
        </div>
      </section>

      {/* \u2500\u2500 \u00a7 02 Data Visualization \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */}
      <section className="skills-section" id="visualization">
        <SectionDivider num="02" title="Data Visualization" />
        <p className="skills-section-intro">
          Research figures from published and in-progress work on lattice dynamics,
          thermal transport, and machine learning interatomic potentials. Open any
          panel for a closer reading. While more complete analysis is available in my published work
          I hope to show that I enjoy making high quality figures scientific figures that communicate
          complex ideas in dense packages. I mostly use Python to create any of the plots, while diagrams,
          models, and, occasionally, annotations are generated by Inkscape (vector graphics software).
        </p>
        <div className="skills-figure-grid" aria-label="Research figure gallery">
          {figures.map((figure) => (
            <FigureCard key={figure.src} figure={figure} onClick={setActiveFigure} />
          ))}
        </div>
      </section>

      <WritingPanel section={activeSection} onClose={closePanel} />
      <FigureLightbox figure={activeFigure} onClose={closeFigure} />

    </div>
  );
};

export default Skills;
