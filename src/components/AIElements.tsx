import React, { useEffect, useRef } from "react";

const AIElements: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    let particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number }[] = [];
    let t = 0;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    const spawnParticle = () => {
      const side = Math.floor(Math.random() * 4);
      let x = 0, y = 0;
      if (side === 0) { x = Math.random() * W; y = 0; }
      else if (side === 1) { x = W; y = Math.random() * H; }
      else if (side === 2) { x = Math.random() * W; y = H; }
      else { x = 0; y = Math.random() * H; }
      const angle = Math.atan2(H / 2 - y, W / 2 - x);
      const speed = 0.3 + Math.random() * 0.5;
      const life = 120 + Math.random() * 180;
      particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life, maxLife: life, size: Math.random() * 1.5 + 0.5 });
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.008;

      // Spawn particles
      if (Math.random() < 0.4) spawnParticle();

      // Draw & update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.life--;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        const alpha = (p.life / p.maxLife) * 0.55;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(43,199,214,${alpha})`;
        ctx.fill();
      }

      // Floating circuit nodes
      const nodes = 8;
      for (let i = 0; i < nodes; i++) {
        const angle = (i / nodes) * Math.PI * 2 + t * 0.3;
        const r = Math.min(W, H) * 0.35;
        const cx = W * 0.72 + Math.cos(t * 0.1) * 20;
        const cy = H * 0.45 + Math.sin(t * 0.13) * 15;
        const nx = cx + Math.cos(angle) * r;
        const ny = cy + Math.sin(angle) * (r * 0.55);
        const nextAngle = ((i + 1) / nodes) * Math.PI * 2 + t * 0.3;
        const nnx = cx + Math.cos(nextAngle) * r;
        const nny = cy + Math.sin(nextAngle) * (r * 0.55);

        // Line to next
        const pulse = (Math.sin(t * 2 + i) + 1) / 2;
        ctx.beginPath();
        ctx.moveTo(nx, ny);
        ctx.lineTo(nnx, nny);
        ctx.strokeStyle = `rgba(43,199,214,${0.08 + pulse * 0.12})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Node dot
        ctx.beginPath();
        ctx.arc(nx, ny, 2 + pulse * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(111,233,243,${0.4 + pulse * 0.4})`;
        ctx.fill();

        // Line to center
        ctx.beginPath();
        ctx.moveTo(nx, ny);
        ctx.lineTo(cx, cy);
        ctx.strokeStyle = `rgba(43,199,214,${0.04 + pulse * 0.06})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Center glow
      const cx = W * 0.72 + Math.cos(t * 0.1) * 20;
      const cy = H * 0.45 + Math.sin(t * 0.13) * 15;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60 + Math.sin(t) * 15);
      grad.addColorStop(0, "rgba(43,199,214,0.18)");
      grad.addColorStop(1, "rgba(43,199,214,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 60 + Math.sin(t) * 15, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Horizontal scan lines
      for (let y = 0; y < H; y += 60) {
        const offset = ((t * 80) % (H + 60)) - 60;
        const ly = (y + offset) % H;
        const a = 0.04 * Math.max(0, 1 - Math.abs(ly - H / 2) / (H / 2));
        ctx.beginPath();
        ctx.moveTo(0, ly);
        ctx.lineTo(W, ly);
        ctx.strokeStyle = `rgba(43,199,214,${a})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Grid overlay
      const gridSize = 60;
      ctx.strokeStyle = "rgba(43,199,214,0.03)";
      ctx.lineWidth = 0.5;
      for (let gx = 0; gx < W; gx += gridSize) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
      }
      for (let gy = 0; gy < H; gy += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* SVG Robot / AI Figure */}
      <div className="ai-robot-wrap">
        <svg viewBox="0 0 220 320" className="ai-robot-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="glow-strong">
              <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0D2438"/>
              <stop offset="100%" stopColor="#061018"/>
            </linearGradient>
            <linearGradient id="cyanGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2BC7D6"/>
              <stop offset="100%" stopColor="#6FE9F3"/>
            </linearGradient>
          </defs>

          {/* Outer orbit ring */}
          <ellipse cx="110" cy="155" rx="100" ry="50" stroke="#2BC7D6" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="4 8" className="ai-orbit-ring"/>
          <ellipse cx="110" cy="155" rx="80" ry="38" stroke="#6FE9F3" strokeWidth="0.3" strokeOpacity="0.15" strokeDasharray="3 12" className="ai-orbit-ring-2"/>

          {/* Body */}
          <rect x="60" y="120" width="100" height="110" rx="12" fill="url(#bodyGrad)" stroke="#2BC7D6" strokeWidth="0.8" strokeOpacity="0.6"/>

          {/* Body circuit lines */}
          <line x1="75" y1="140" x2="145" y2="140" stroke="#2BC7D6" strokeWidth="0.5" strokeOpacity="0.4"/>
          <line x1="75" y1="155" x2="110" y2="155" stroke="#2BC7D6" strokeWidth="0.5" strokeOpacity="0.3"/>
          <line x1="110" y1="155" x2="110" y2="170" stroke="#2BC7D6" strokeWidth="0.5" strokeOpacity="0.3"/>
          <line x1="110" y1="170" x2="145" y2="170" stroke="#2BC7D6" strokeWidth="0.5" strokeOpacity="0.3"/>
          <line x1="75" y1="185" x2="145" y2="185" stroke="#2BC7D6" strokeWidth="0.5" strokeOpacity="0.25"/>
          <line x1="90" y1="155" x2="90" y2="185" stroke="#2BC7D6" strokeWidth="0.5" strokeOpacity="0.2"/>
          <line x1="130" y1="140" x2="130" y2="170" stroke="#2BC7D6" strokeWidth="0.5" strokeOpacity="0.2"/>

          {/* Body nodes */}
          <circle cx="75" cy="140" r="2" fill="#2BC7D6" filter="url(#glow)" className="ai-node-pulse"/>
          <circle cx="145" cy="140" r="2" fill="#6FE9F3" filter="url(#glow)" className="ai-node-pulse-2"/>
          <circle cx="110" cy="170" r="3" fill="#2BC7D6" filter="url(#glow-strong)" className="ai-node-pulse"/>
          <circle cx="90" cy="185" r="2" fill="#6FE9F3" filter="url(#glow)" className="ai-node-pulse-2"/>
          <circle cx="130" cy="155" r="2" fill="#2BC7D6" filter="url(#glow)" className="ai-node-pulse"/>

          {/* Chest display panel */}
          <rect x="80" y="195" width="60" height="25" rx="4" fill="#0D2438" stroke="#2BC7D6" strokeWidth="0.6" strokeOpacity="0.5"/>
          <rect x="84" y="199" width="20" height="3" rx="1" fill="#2BC7D6" fillOpacity="0.7" className="ai-bar-1"/>
          <rect x="84" y="205" width="35" height="3" rx="1" fill="#6FE9F3" fillOpacity="0.5" className="ai-bar-2"/>
          <rect x="84" y="211" width="28" height="3" rx="1" fill="#2BC7D6" fillOpacity="0.4" className="ai-bar-3"/>

          {/* Head */}
          <rect x="70" y="62" width="80" height="56" rx="10" fill="url(#bodyGrad)" stroke="#2BC7D6" strokeWidth="0.8" strokeOpacity="0.7"/>

          {/* Visor */}
          <rect x="76" y="75" width="68" height="28" rx="6" fill="#061018" stroke="#2BC7D6" strokeWidth="0.6" strokeOpacity="0.5"/>

          {/* Eyes */}
          <rect x="83" y="82" width="22" height="14" rx="3" fill="#061018"/>
          <rect x="84" y="83" width="20" height="12" rx="2.5" fill="#2BC7D6" fillOpacity="0.15"/>
          <rect x="87" y="86" width="14" height="6" rx="1.5" fill="#2BC7D6" fillOpacity="0.9" filter="url(#glow-strong)" className="ai-eye-glow"/>

          <rect x="115" y="82" width="22" height="14" rx="3" fill="#061018"/>
          <rect x="116" y="83" width="20" height="12" rx="2.5" fill="#2BC7D6" fillOpacity="0.15"/>
          <rect x="119" y="86" width="14" height="6" rx="1.5" fill="#6FE9F3" fillOpacity="0.9" filter="url(#glow-strong)" className="ai-eye-glow"/>

          {/* Antenna */}
          <line x1="110" y1="62" x2="110" y2="42" stroke="#2BC7D6" strokeWidth="1.5" strokeOpacity="0.7"/>
          <circle cx="110" cy="38" r="5" fill="#2BC7D6" filter="url(#glow-strong)" className="ai-antenna-pulse"/>
          <circle cx="110" cy="38" r="9" stroke="#2BC7D6" strokeWidth="0.5" strokeOpacity="0.4" fill="none" className="ai-antenna-ring"/>
          <circle cx="110" cy="38" r="14" stroke="#2BC7D6" strokeWidth="0.3" strokeOpacity="0.2" fill="none" className="ai-antenna-ring-2"/>

          {/* Neck */}
          <rect x="98" y="118" width="24" height="8" rx="3" fill="#0D2438" stroke="#2BC7D6" strokeWidth="0.5" strokeOpacity="0.5"/>

          {/* Shoulders + arms */}
          <rect x="28" y="128" width="28" height="80" rx="8" fill="url(#bodyGrad)" stroke="#2BC7D6" strokeWidth="0.6" strokeOpacity="0.5"/>
          <rect x="164" y="128" width="28" height="80" rx="8" fill="url(#bodyGrad)" stroke="#2BC7D6" strokeWidth="0.6" strokeOpacity="0.5"/>

          {/* Arm circuit */}
          <line x1="42" y1="148" x2="42" y2="168" stroke="#2BC7D6" strokeWidth="0.5" strokeOpacity="0.4"/>
          <circle cx="42" cy="158" r="2" fill="#2BC7D6" fillOpacity="0.7" className="ai-node-pulse-2"/>
          <line x1="178" y1="148" x2="178" y2="168" stroke="#6FE9F3" strokeWidth="0.5" strokeOpacity="0.4"/>
          <circle cx="178" cy="158" r="2" fill="#6FE9F3" fillOpacity="0.7" className="ai-node-pulse"/>

          {/* Hands */}
          <rect x="30" y="210" width="24" height="18" rx="5" fill="#0D2438" stroke="#2BC7D6" strokeWidth="0.5" strokeOpacity="0.5"/>
          <rect x="166" y="210" width="24" height="18" rx="5" fill="#0D2438" stroke="#6FE9F3" strokeWidth="0.5" strokeOpacity="0.5"/>

          {/* Legs */}
          <rect x="72" y="232" width="30" height="60" rx="6" fill="url(#bodyGrad)" stroke="#2BC7D6" strokeWidth="0.6" strokeOpacity="0.4"/>
          <rect x="118" y="232" width="30" height="60" rx="6" fill="url(#bodyGrad)" stroke="#2BC7D6" strokeWidth="0.6" strokeOpacity="0.4"/>

          {/* Feet */}
          <rect x="68" y="286" width="38" height="14" rx="5" fill="#0D2438" stroke="#2BC7D6" strokeWidth="0.5" strokeOpacity="0.5"/>
          <rect x="114" y="286" width="38" height="14" rx="5" fill="#0D2438" stroke="#2BC7D6" strokeWidth="0.5" strokeOpacity="0.5"/>

          {/* Floating data cards around robot */}
          <g className="ai-float-card-1">
            <rect x="148" y="70" width="55" height="32" rx="6" fill="#0D2438" fillOpacity="0.85" stroke="#2BC7D6" strokeWidth="0.5" strokeOpacity="0.5"/>
            <text x="155" y="83" fill="#2BC7D6" fontSize="6" fontFamily="monospace" opacity="0.8">SYSTEM</text>
            <text x="155" y="93" fill="#6FE9F3" fontSize="8" fontFamily="monospace" fontWeight="bold">ONLINE</text>
          </g>

          <g className="ai-float-card-2">
            <rect x="18" y="80" width="48" height="30" rx="6" fill="#0D2438" fillOpacity="0.85" stroke="#6FE9F3" strokeWidth="0.5" strokeOpacity="0.5"/>
            <text x="24" y="92" fill="#6FE9F3" fontSize="6" fontFamily="monospace" opacity="0.7">AI CORE</text>
            <text x="24" y="102" fill="#2BC7D6" fontSize="7" fontFamily="monospace">98.7%</text>
          </g>

          <g className="ai-float-card-3">
            <rect x="160" y="200" width="52" height="28" rx="6" fill="#0D2438" fillOpacity="0.85" stroke="#34d399" strokeWidth="0.5" strokeOpacity="0.5"/>
            <text x="167" y="212" fill="#34d399" fontSize="6" fontFamily="monospace" opacity="0.7">PROCESS</text>
            <text x="167" y="222" fill="#6FE9F3" fontSize="7" fontFamily="monospace">ACTIVE</text>
          </g>

          {/* Shadow/ground glow */}
          <ellipse cx="110" cy="308" rx="55" ry="8" fill="#2BC7D6" fillOpacity="0.06" className="ai-ground-glow"/>
        </svg>
      </div>

      {/* Floating holographic UI elements */}
      <div className="ai-holo-1">
        <div className="ai-holo-card">
          <div className="ai-holo-label">ACTIVE PROJECTS</div>
          <div className="ai-holo-value">14+</div>
          <div className="ai-holo-bar"><div className="ai-holo-bar-fill" style={{ width: "78%" }} /></div>
        </div>
      </div>

      <div className="ai-holo-2">
        <div className="ai-holo-card">
          <div className="ai-holo-label">SYSTEM STATUS</div>
          <div className="ai-holo-value" style={{ color: "#34d399" }}>ONLINE</div>
        </div>
      </div>

      <div className="ai-holo-3">
        <div className="ai-holo-card">
          <div className="ai-holo-label">SUCCESS RATE</div>
          <div className="ai-holo-value">100%</div>
          <div className="ai-holo-bar"><div className="ai-holo-bar-fill" style={{ width: "100%", background: "#34d399" }} /></div>
        </div>
      </div>

      <style>{`
        .ai-robot-wrap {
          position:absolute;
          right: 5%; top: 50%;
          transform: translateY(-50%);
          width: clamp(180px, 28vw, 320px);
          animation: robot-float 6s ease-in-out infinite;
          filter: drop-shadow(0 0 40px rgba(43,199,214,0.18));
        }
        .ai-robot-svg { width:100%; height:auto; }
        @keyframes robot-float {
          0%,100% { transform:translateY(-50%) translateY(0px); }
          50%      { transform:translateY(-50%) translateY(-18px); }
        }

        /* Eye glow pulse */
        .ai-eye-glow { animation: eye-pulse 2.5s ease-in-out infinite; }
        @keyframes eye-pulse {
          0%,100% { opacity:0.9; }
          50%      { opacity:0.3; }
        }

        /* Antenna */
        .ai-antenna-pulse { animation: ant-pulse 1.8s ease-in-out infinite; }
        @keyframes ant-pulse {
          0%,100% { r:5; opacity:1; }
          50%      { r:7; opacity:0.6; }
        }
        .ai-antenna-ring  { animation: ring-expand 2s ease-out infinite; }
        .ai-antenna-ring-2{ animation: ring-expand 2s ease-out infinite 0.5s; }
        @keyframes ring-expand {
          0%   { opacity:0.4; transform:scale(0.8); transform-origin:110px 38px; }
          100% { opacity:0; transform:scale(1.8); transform-origin:110px 38px; }
        }

        /* Node pulses */
        .ai-node-pulse  { animation: node-p 2.2s ease-in-out infinite; }
        .ai-node-pulse-2{ animation: node-p 2.2s ease-in-out infinite 0.7s; }
        @keyframes node-p { 0%,100%{opacity:1} 50%{opacity:0.2} }

        /* Bars */
        .ai-bar-1{ animation: bar-w 3s ease-in-out infinite; }
        .ai-bar-2{ animation: bar-w 3s ease-in-out infinite 0.5s; }
        .ai-bar-3{ animation: bar-w 3s ease-in-out infinite 1s; }
        @keyframes bar-w {
          0%   { width:20px; }
          50%  { width:50px; }
          100% { width:20px; }
        }

        /* Orbit rings */
        .ai-orbit-ring  { animation: spin-cw  18s linear infinite; transform-origin:110px 155px; }
        .ai-orbit-ring-2{ animation: spin-ccw 14s linear infinite; transform-origin:110px 155px; }
        @keyframes spin-cw  { from{transform:rotate(0deg)}  to{transform:rotate(360deg)} }
        @keyframes spin-ccw { from{transform:rotate(0deg)}  to{transform:rotate(-360deg)} }

        /* Float cards */
        .ai-float-card-1{ animation: fc1 4s ease-in-out infinite; transform-origin:175px 86px; }
        .ai-float-card-2{ animation: fc2 5s ease-in-out infinite; transform-origin:42px 95px; }
        .ai-float-card-3{ animation: fc1 4.5s ease-in-out infinite 1s; transform-origin:186px 214px; }
        @keyframes fc1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes fc2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }

        .ai-ground-glow { animation: ground-pulse 3s ease-in-out infinite; }
        @keyframes ground-pulse { 0%,100%{opacity:0.06} 50%{opacity:0.14} }

        /* Holographic UI cards */
        .ai-holo-1, .ai-holo-2, .ai-holo-3 {
          position:absolute;
        }
        .ai-holo-1 { top:12%; left:4%; animation:holo-float 5s ease-in-out infinite; }
        .ai-holo-2 { top:55%; left:2%; animation:holo-float 6s ease-in-out infinite 1.2s; }
        .ai-holo-3 { bottom:18%; left:36%; animation:holo-float 4.5s ease-in-out infinite 0.6s; }
        @keyframes holo-float {
          0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)}
        }
        .ai-holo-card {
          padding:10px 14px;
          border-radius:10px;
          border:1px solid rgba(43,199,214,0.25);
          background:rgba(6,18,30,0.75);
          backdrop-filter:blur(12px);
          min-width:110px;
        }
        .ai-holo-label {
          font-size:0.55rem; font-weight:700; letter-spacing:0.1em;
          color:rgba(43,199,214,0.55); text-transform:uppercase; margin-bottom:3px;
        }
        .ai-holo-value {
          font-family:'Syne','Inter',sans-serif;
          font-size:1.2rem; font-weight:800; color:#6FE9F3; line-height:1;
        }
        .ai-holo-bar {
          height:3px; background:rgba(255,255,255,0.08); border-radius:2px; margin-top:6px; overflow:hidden;
        }
        .ai-holo-bar-fill {
          height:100%; border-radius:2px;
          background:linear-gradient(90deg,#2BC7D6,#6FE9F3);
          animation:bar-pulse 2.5s ease-in-out infinite;
        }
        @keyframes bar-pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }

        @media(max-width:768px) {
          .ai-robot-wrap { right:-5%; width:140px; opacity:0.7; }
          .ai-holo-1,.ai-holo-2,.ai-holo-3 { display:none; }
        }
      `}</style>
    </div>
  );
};

export default AIElements;
