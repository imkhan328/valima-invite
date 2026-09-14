function wrapLetters(text){
    return text.split('').map(ch => {
      const span = document.createElement('span');
      span.className = 'letter';
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      return span;
    });
  }
  const namesHeading = document.getElementById('names-heading');
  const line1 = namesHeading.querySelector('.line1');
  const line2 = namesHeading.querySelector('.line2');
  const name1 = "Mohamed Mohseen Khan";
  const name2 = "Sabah Khanum";
  wrapLetters(name1).forEach((s,i)=>{ s.style.animationDelay = (i*0.045)+'s'; line1.appendChild(s); });
  wrapLetters(name2).forEach((s,i)=>{ s.style.animationDelay = (name1.length*0.045 + 0.3 + i*0.045)+'s'; line2.appendChild(s); });
  const namesAnimTotalMs = (name1.length*0.045 + 0.3 + name2.length*0.045 + 0.6) * 1000;

  function spawnSparkleBurst(target, count){
    const rect = target.getBoundingClientRect();
    const symbols = ['✦','✧','⋆'];
    for(let i = 0; i < count; i++){
      const s = document.createElement('div');
      s.className = 'sparkle-burst';
      s.textContent = symbols[Math.floor(Math.random()*symbols.length)];
      const x = rect.left + Math.random() * rect.width;
      const y = rect.top + Math.random() * rect.height;
      s.style.left = x + 'px';
      s.style.top = y + 'px';
      s.style.fontSize = (0.7 + Math.random()*0.8) + 'rem';
      s.style.animationDelay = (Math.random()*0.25) + 's';
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1400);
    }
  }

  function typeText(el, speed){
    const text = el.getAttribute('data-text') || '';
    const customSpeed = el.getAttribute('data-speed');
    if(customSpeed){ speed = parseInt(customSpeed, 10); }
    el.textContent = '';
    el.classList.add('typing');
    let i = 0;
    function step(){
      el.textContent = text.slice(0, i);
      i++;
      if(i <= text.length){ setTimeout(step, speed); }
      else{ setTimeout(()=> el.classList.remove('typing'), 900); }
    }
    step();
  }
  function revealChars(el, stagger){
    const text = el.getAttribute('data-text') || '';
    const customStagger = el.getAttribute('data-stagger');
    if(customStagger){ stagger = parseInt(customStagger, 10); }
    el.innerHTML = '';
    text.split('').forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'rchar';
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      span.style.animationDelay = (i * stagger) + 'ms';
      el.appendChild(span);
    });
    // Force reflow so the animation class reliably (re)triggers
    void el.offsetWidth;
    el.classList.add('animate');
  }
  const scrollAreaEl = document.getElementById('scrollArea');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        revealChars(entry.target, 22);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { root: scrollAreaEl, threshold: 0.4 });
  document.querySelectorAll('.reveal-target').forEach(el => revealObserver.observe(el));

  const typeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        typeText(entry.target, 26);
        typeObserver.unobserve(entry.target);
      }
    });
  }, { root: scrollAreaEl, threshold: 0.4 });
  document.querySelectorAll('.type-target').forEach(el => typeObserver.observe(el));

  const targetDate = new Date("2026-10-31T20:30:00+05:30").getTime();
  function updateCountdown(){
    const distance = targetDate - Date.now();
    const els = {
      days: document.getElementById('cd-days'), hours: document.getElementById('cd-hours'),
      mins: document.getElementById('cd-mins'), secs: document.getElementById('cd-secs')
    };
    if(distance <= 0){ Object.values(els).forEach(e=>e.textContent="0"); return; }
    els.days.textContent = Math.floor(distance / 86400000);
    els.hours.textContent = Math.floor((distance % 86400000) / 3600000);
    els.mins.textContent = Math.floor((distance % 3600000) / 60000);
    els.secs.textContent = Math.floor((distance % 60000) / 1000);
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting){
        const delay = entry.target.classList.contains('medallion') ?
          Array.from(entry.target.parentElement.children).indexOf(entry.target) * 90 : 0;
        setTimeout(()=> entry.target.classList.add('in-view'), delay);
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { root: scrollAreaEl, threshold: 0.18 });
  document.querySelectorAll('.anim, .event-card').forEach(el => scrollObserver.observe(el));

  const rays = document.querySelector('.rays');
  const bokehLayer = document.getElementById('bokehLayer');
  const floralBg = document.querySelector('.floral-bg-image');

  /* Smooth, lightweight scroll parallax */
  let latestScrollY = 0;
  let parallaxFrame = null;

  function updateParallax(){
    const y = latestScrollY;

    rays.style.transform =
      `translate3d(0, ${y * 0.08}px, 0) rotate(${y * 0.02}deg)`;

    bokehLayer.style.transform =
      `translate3d(0, ${y * 0.15}px, 0)`;

    parallaxFrame = null;
  }

  scrollAreaEl.addEventListener('scroll', () => {
  const y = scrollAreaEl.scrollTop;

  rays.style.transform =
    `translateY(${y * 0.08}px) rotate(${y * 0.02}deg)`;

  bokehLayer.style.transform =
    `translateY(${y * 0.15}px)`;
    
}, { passive: true });

  const particleContainer = document.getElementById('particles');
  const particleCount = window.innerWidth < 640 ? 14 : 24;
  for(let i = 0; i < particleCount; i++){
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 3 + Math.random() * 6;
    p.style.width = size + 'px'; p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + 'vw'; p.style.bottom = '-10px';
    p.style.animationDuration = (14 + Math.random() * 16) + 's';
    p.style.animationDelay = (Math.random() * 20) + 's';
    particleContainer.appendChild(p);
  }

  const bokehPositions = [
    {top:'12%', left:'8%', size:120}, {top:'70%', left:'88%', size:150},
    {top:'40%', left:'92%', size:90}, {top:'85%', left:'12%', size:110},
    {top:'55%', left:'50%', size:70}
  ];
  bokehPositions.forEach((b,i) => {
    const d = document.createElement('div');
    d.className = 'bokeh';
    d.style.top = b.top; d.style.left = b.left;
    d.style.width = b.size+'px'; d.style.height = b.size+'px';
    d.style.animationDuration = (5 + i)+'s';
    d.style.animationDelay = (i*0.7)+'s';
    bokehLayer.appendChild(d);
  });

  function spawnGoldPetals(count, totalDuration){
    const layer = document.getElementById('petalLayer');
    const slots = count;
    for(let i = 0; i < count; i++){
      const p = document.createElement('div');
      p.className = 'gold-petal';
      // Spread evenly across width with slight jitter, instead of fully random (avoids clumping)
      const slotWidth = 100 / slots;
      const startLeft = (i * slotWidth) + (Math.random() * slotWidth * 0.6);
      const drift = (Math.random() * 100 - 50) + 'px';
      const fallDuration = 4.5 + Math.random() * 1.8;
      const delay = Math.random() * 0.5; // all petals begin together, within half a second
      const size = 10 + Math.random() * 5;
      p.style.left = startLeft + 'vw';
      p.style.width = size + 'px';
      p.style.height = (size * 1.3) + 'px';
      p.style.setProperty('--drift', drift);
      p.style.animationDuration = fallDuration + 's';
      p.style.animationDelay = delay + 's';
      p.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;
      layer.appendChild(p);
    }
    setTimeout(() => { layer.innerHTML = ''; }, totalDuration + 2000);
  }

  // ---- NEW petal shower function (added, existing spawnGoldPetals left untouched) ----
  function createPetals() {
    const container = document.getElementById('petals-container');
    const count = 16;
    for(let i=0; i<count; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';

      // Fully randomized starting position - no fixed slots, so petals land apart from each other naturally
      petal.style.left = Math.random() * 100 + 'vw';

      // Slight size variation for a more natural, less uniform scatter
      const size = 11 + Math.random() * 6;
      petal.style.width = size + 'px';
      petal.style.height = size + 'px';

      // Randomize fall speed and delay
      petal.style.animation = `petalFallShower ${3 + Math.random() * 3}s linear ${Math.random() * 2}s forwards`;

      container.appendChild(petal);
    }

    // Self-destruct after 6 seconds to keep the website running fast!
    setTimeout(() => container.innerHTML = '', 6000);
  }

  const sealScreen = document.getElementById('seal-screen');
  const sealWrap = document.getElementById('seal-wrap');
  sealWrap.addEventListener('click', () => {
    sealWrap.classList.add('opening');
    document.querySelector('.seal-floral-left')?.classList.add('opening-left');
    document.querySelector('.seal-floral-right')?.classList.add('opening-right');
    createPetals();
    bgm.play().then(() => {
      musicToggle.classList.add('playing');
    }).catch(() => { /* music.mp3 not found yet — button still works manually */ });
    setTimeout(() => {
      sealScreen.classList.add('hidden');
      namesHeading.classList.add('animate');
      setTimeout(() => spawnSparkleBurst(namesHeading, 7), namesAnimTotalMs);
      document.querySelectorAll('.anim').forEach((el,i) => {
        if(el.closest('.countdown') || el.classList.contains('medallion')) return;
        setTimeout(()=> el.classList.add('in-view'), 80 + i*60);
      });
      setTimeout(()=> typeText(document.querySelector('.subtitle'), 32), 900);
    }, 550);
  });

const musicToggle = document.getElementById('musicToggle');
const bgm = document.getElementById('bgm');
bgm.volume = 0.35;
musicToggle.addEventListener('click', () => {
    if(bgm.paused){
      bgm.play().then(() => {
        musicToggle.classList.add('playing');
      }).catch(() => {
        alert('Add a "music.mp3" file next to index.html to enable background music.');
      });
    } else {
      bgm.pause();
      musicToggle.classList.remove('playing');
    }
  });

/* ================= GOLDEN FIREFLIES ================= */

const fireflyLayer = document.getElementById('fireflies');

if (fireflyLayer) {

  const count = window.innerWidth <= 640 ? 18 : 32;

  for (let i = 0; i < count; i++) {

    const firefly = document.createElement('span');

    firefly.className = 'firefly';

    const size = 2 + Math.random() * 4;
    const duration = 8 + Math.random() * 10;
    const delay = Math.random() * -12;
    const drift = -90 + Math.random() * 180;
    const opacity = 0.3 + Math.random() * 0.5;

    firefly.style.width = `${size}px`;
    firefly.style.height = `${size}px`;

    firefly.style.left = `${Math.random() * 100}%`;
    firefly.style.top = `${50 + Math.random() * 50}%`;

    firefly.style.setProperty('--fly-time', `${duration}s`);
    firefly.style.setProperty('--fly-delay', `${delay}s`);
    firefly.style.setProperty('--fly-x', `${drift}px`);
    firefly.style.setProperty('--fly-opacity', opacity);

    fireflyLayer.appendChild(firefly);
  }
}