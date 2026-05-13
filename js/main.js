/* ================================================
   Portfolio Template — JavaScript
   Wave Canvas, Cursor, Typewriter, Scroll Reveal
   Place this file in the js/ folder
================================================ */

/* ── WAVE CANVAS ── */
    (function() {
      const canvas = document.getElementById('waveCanvas');
      const ctx = canvas.getContext('2d');
      let W, H;
      function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
      resize();
      window.addEventListener('resize', resize);

      /* ⬇ Adjust speed values here — lower = slower */
      const waves = [
        { amp:90,  freq:.0018, speed:.000005, yBase:.42, color:'rgba(123,47,255,',  alpha:.55 },
        { amp:70,  freq:.0022, speed:.000005, yBase:.52, color:'rgba(168,85,247,',  alpha:.45 },
        { amp:55,  freq:.0028, speed:.000005, yBase:.58, color:'rgba(191,95,255,',  alpha:.38 },
        { amp:100, freq:.0014, speed:.000003, yBase:.35, color:'rgba(95,20,200,',   alpha:.3  },
        { amp:45,  freq:.0035, speed:.000007, yBase:.65, color:'rgba(255,95,203,',  alpha:.22 },
        { amp:60,  freq:.002,  speed:.000005, yBase:.72, color:'rgba(123,47,255,',  alpha:.2  },
      ];

      function drawWave(w, ts) {
        ctx.beginPath(); ctx.moveTo(0, H);
        for (let x = 0; x <= W; x += 3) {
          const y = H * w.yBase
            + Math.sin(x * w.freq + ts * w.speed * 100) * w.amp
            + Math.sin(x * w.freq * 1.7 + ts * w.speed * 80 + 1) * w.amp * .4
            + Math.sin(x * w.freq * .5 + ts * w.speed * 120 + 2) * w.amp * .25;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H); ctx.closePath();
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, w.color + (w.alpha * .6) + ')');
        grad.addColorStop(.5, w.color + w.alpha + ')');
        grad.addColorStop(1, w.color + (w.alpha * .2) + ')');
        ctx.fillStyle = grad; ctx.fill();
      }

      function frame(ts) {
        ctx.clearRect(0, 0, W, H);
        const bg = ctx.createLinearGradient(0, 0, W, H);
        bg.addColorStop(0, '#07031a'); bg.addColorStop(.45, '#0d062a'); bg.addColorStop(1, '#06040f');
        ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
        if (!frame._stars) frame._stars = Array.from({length:80}, () => ({ x:Math.random()*W, y:Math.random()*H, r:Math.random()*1.2+.3, o:Math.random()*.5+.15, blink:Math.random()*Math.PI*2 }));
        frame._stars.forEach(s => { ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2); ctx.fillStyle=`rgba(220,180,255,${s.o+Math.sin(ts*.001+s.blink)*.15})`; ctx.fill(); });
        waves.forEach(w => drawWave(w, ts));
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    })();

    /* ── CURSOR ── */
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    let tx=0,ty=0,dx=0,dy=0;
    document.addEventListener('mousemove', e => { dx=e.clientX; dy=e.clientY; dot.style.left=dx+'px'; dot.style.top=dy+'px'; });
    (function animRing() { tx+=(dx-tx)*.1; ty+=(dy-ty)*.1; ring.style.left=tx+'px'; ring.style.top=ty+'px'; requestAnimationFrame(animRing); })();
    document.querySelectorAll('a,button,.skill-cell,.intern-card,.proj-card,.edu-card,.cert-card,.contact-card').forEach(el => {
      el.addEventListener('mouseenter', () => { ring.style.transform='translate(-50%,-50%) scale(2.2)'; ring.style.opacity='.25'; ring.style.borderColor='var(--neon-bright)'; });
      el.addEventListener('mouseleave', () => { ring.style.transform='translate(-50%,-50%) scale(1)'; ring.style.opacity='1'; ring.style.borderColor='rgba(191,95,255,.5)'; });
    });

    /* ── TYPEWRITER ── */
    /* ⬇ CHANGE these phrases to match your roles */
    const phrases = ['Your Role 1','Your Role 2','Your Role 3','Your Role 4'];
    let pi=0,ci=0,del=false;
    const tw=document.getElementById('tw');
    function type() {
      const cur=phrases[pi];
      if(!del){tw.textContent=cur.slice(0,++ci);if(ci===cur.length){del=true;setTimeout(type,1800);return;}}
      else{tw.textContent=cur.slice(0,--ci);if(ci===0){del=false;pi=(pi+1)%phrases.length;}}
      setTimeout(type,del?45:85);
    }
    type();

    /* ── NAV & REVEAL ── */
    const navbar=document.getElementById('navbar');
    window.addEventListener('scroll',()=>navbar.classList.toggle('scrolled',window.scrollY>30));
    function toggleNav(){document.getElementById('navLinks').classList.toggle('open');}
    const obs=new IntersectionObserver(entries=>{entries.forEach((e,i)=>{if(e.isIntersecting)setTimeout(()=>e.target.classList.add('on'),i*80);});},{threshold:.1});
    document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el=>obs.observe(el));