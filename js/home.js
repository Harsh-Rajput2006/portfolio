
/* ── BACKGROUND ANIMATION ENGINE ──
   Dark  → Void & Stars
   Light → Sacred Geometry           */
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, theme = 'light', stars = [], nebulae = [], shapes = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    init();
  }
  window.addEventListener('resize', resize);

  function init() {
    stars = []; nebulae = []; shapes = [];
    theme = document.documentElement.getAttribute('data-theme') || 'light';

    if (theme === 'dark') {
      for (let i = 0; i < 360; i++) {
        stars.push({
          x: Math.random() * W, y: Math.random() * H,
          r: Math.random() * 1.6 + 0.15,
          alpha: Math.random() * 0.8 + 0.15,
          speed: Math.random() * 0.02 + 0.003,
          offset: Math.random() * Math.PI * 2,
        });
      }
      [[0,255,224],[0,180,160],[0,100,200],[0,220,180],[20,200,200]].forEach(c =>
        nebulae.push({
          x: Math.random() * W, y: Math.random() * H,
          r: Math.random() * 320 + 170, cr: c,
          speedX: (Math.random() - 0.5) * 0.09,
          speedY: (Math.random() - 0.5) * 0.09,
          alpha: Math.random() * 0.07 + 0.03,
        })
      );
    } else {
      const types = ['hexagon','donut','triangle','circle','hexagon','donut','hexagon'];
      for (let i = 0; i < 26; i++) {
        shapes.push({
          x: Math.random() * W, y: Math.random() * H,
          size: Math.random() * 42 + 12,
          type: types[Math.floor(Math.random() * types.length)],
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.007,
          speedX: (Math.random() - 0.5) * 0.18,
          speedY: (Math.random() - 0.5) * 0.18,
          alpha: Math.random() * 0.18 + 0.10,
          hue: Math.floor(Math.random() * 90) + 35,
        });
      }
    }
  }

  function hexPath(x, y, r, rot) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = rot + (Math.PI / 3) * i;
      i === 0 ? ctx.moveTo(x + r*Math.cos(a), y + r*Math.sin(a))
               : ctx.lineTo(x + r*Math.cos(a), y + r*Math.sin(a));
    }
    ctx.closePath();
  }

  function triPath(x, y, r, rot) {
    ctx.beginPath();
    for (let i = 0; i < 3; i++) {
      const a = rot + (Math.PI * 2 / 3) * i - Math.PI / 2;
      i === 0 ? ctx.moveTo(x + r*Math.cos(a), y + r*Math.sin(a))
               : ctx.lineTo(x + r*Math.cos(a), y + r*Math.sin(a));
    }
    ctx.closePath();
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    if (theme === 'dark') {
      nebulae.forEach(n => {
        n.x += n.speedX; n.y += n.speedY;
        if (n.x < -n.r) n.x = W + n.r; if (n.x > W + n.r) n.x = -n.r;
        if (n.y < -n.r) n.y = H + n.r; if (n.y > H + n.r) n.y = -n.r;
        const [r, g, b] = n.cr;
        const grad = ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r);
        grad.addColorStop(0, `rgba(${r},${g},${b},${n.alpha})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fill();
      });
      stars.forEach(s => {
        const tw = Math.sin(t * s.speed * 55 + s.offset) * 0.32 + 0.68;
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha*tw})`; ctx.fill();
        if (s.r > 1.0) {
          ctx.strokeStyle = `rgba(255,255,255,${s.alpha*tw*0.3})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(s.x-s.r*3,s.y); ctx.lineTo(s.x+s.r*3,s.y);
          ctx.moveTo(s.x,s.y-s.r*3); ctx.lineTo(s.x,s.y+s.r*3);
          ctx.stroke();
        }
      });
    } else {
      shapes.forEach(s => {
        s.x += s.speedX; s.y += s.speedY; s.rotation += s.rotSpeed;
        if (s.x < -s.size*2) s.x = W+s.size*2; if (s.x > W+s.size*2) s.x = -s.size*2;
        if (s.y < -s.size*2) s.y = H+s.size*2; if (s.y > H+s.size*2) s.y = -s.size*2;
        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.strokeStyle = `hsl(${s.hue},65%,28%)`;
        ctx.lineWidth   = 1.6;
        ctx.fillStyle   = `hsla(${s.hue},60%,45%,0.10)`;
        if (s.type === 'hexagon') { hexPath(s.x,s.y,s.size,s.rotation); ctx.fill(); ctx.stroke(); }
        else if (s.type === 'triangle') { triPath(s.x,s.y,s.size,s.rotation); ctx.fill(); ctx.stroke(); }
        else if (s.type === 'donut') {
          ctx.beginPath(); ctx.arc(s.x,s.y,s.size,0,Math.PI*2); ctx.stroke();
          ctx.beginPath(); ctx.arc(s.x,s.y,s.size*0.5,0,Math.PI*2); ctx.stroke();
          for (let i = 0; i < 6; i++) {
            const a = s.rotation + (Math.PI/3)*i;
            ctx.beginPath();
            ctx.moveTo(s.x+Math.cos(a)*s.size*0.5, s.y+Math.sin(a)*s.size*0.5);
            ctx.lineTo(s.x+Math.cos(a)*s.size,     s.y+Math.sin(a)*s.size);
            ctx.stroke();
          }
        } else {
          ctx.beginPath(); ctx.arc(s.x,s.y,s.size,0,Math.PI*2); ctx.stroke();
          ctx.beginPath(); ctx.arc(s.x,s.y,s.size*0.28,0,Math.PI*2); ctx.fill();
        }
        ctx.restore();
      });
    }
    requestAnimationFrame(draw);
  }

  window.bgCanvas = { setTheme(t) { theme = t; init(); } };
  resize();
  requestAnimationFrame(draw);
})();

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const numbers = document.querySelectorAll("[data-count]");
  if (!numbers.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.getAttribute("data-count")) || 0;
        let count = 0;
        const step = Math.max(1, Math.ceil(target / 24));

        const timer = setInterval(() => {
          count += step;
          if (count >= target) {
            el.textContent = String(target);
            clearInterval(timer);
          } else {
            el.textContent = String(count);
          }
        }, 30);

        observer.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );

  numbers.forEach((el) => observer.observe(el));
});
