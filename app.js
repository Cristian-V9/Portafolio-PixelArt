/*Cristian Vargas — logica de la Pagina Web*/
(() => {
  /* ---------- 1. iconos y logos del stack tecnologico ---------- */
  const stack = [
    { src: 'assets/icons/html5.svg',      name: 'HTML5' },
    { src: 'assets/icons/css3.svg',       name: 'CSS3' },
    { src: 'assets/icons/javascript.svg', name: 'JavaScript' },
    { src: 'assets/icons/java.svg',       name: 'Java' },
    { src: 'assets/icons/python.svg',     name: 'Python' },
    { src: 'assets/icons/csharp.svg',     name: 'C#' },
    { src: 'assets/icons/php.svg',        name: 'PHP' },
    { src: 'assets/icons/mysql.svg',      name: 'MySQL' },
    { src: 'assets/icons/oracle.svg',     name: 'Oracle' },
    { src: 'assets/icons/arduino.svg',    name: 'Arduino' },
    { src: 'assets/icons/selenium.svg',   name: 'Selenium' },
    { src: 'assets/icons/linux.svg',      name: 'Linux' },
  ];
  const stackEl = document.getElementById('stack');
  if (stackEl) {
    stackEl.innerHTML = stack.map(s => `
      <div class="stack-chip" title="${s.name}">
        <img src="${s.src}" alt="${s.name}">
        <span>${s.name}</span>
      </div>
    `).join('');
  }

  /* ---------- 2. Routing ---------- */
  const routes = ['inicio', 'proyectos', 'sobre-mi', 'contactame'];
  const routeEls = Object.fromEntries(routes.map(r => [r, document.getElementById(r)]));
  const navLinks = document.querySelectorAll('[data-route-link]');

  function setRoute(name, opts = {}) {
    if (!routes.includes(name)) name = 'inicio';
    Object.entries(routeEls).forEach(([key, el]) => {
      el.classList.toggle('is-active', key === name);
    });
    document.querySelectorAll('.nav__link').forEach(a => {
      a.classList.toggle('is-active', a.dataset.routeLink === name);
    });
    // reinicia el estado de reveal en la ruta recien activada para que las animaciones vuelvan a correr
    routeEls[name].querySelectorAll('.reveal').forEach(el => el.classList.remove('is-in'));
    queueReveal(routeEls[name]);
    if (!opts.skipHash) {
      if (location.hash !== '#' + name) history.replaceState(null, '', '#' + name);
    }
    if (!opts.skipScroll) window.scrollTo({ top: 0, behavior: opts.smooth ? 'smooth' : 'auto' });
  }

  navLinks.forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      setRoute(a.dataset.routeLink, { smooth: true });
    });
  });

  window.addEventListener('hashchange', () => {
    setRoute((location.hash || '#inicio').slice(1));
  });

  /* ---------- 3. Animaciones de entrada con IntersectionObserver ---------- */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const io = new IntersectionObserver((entries) => {
    // agrupa por padre para que los hermanos animen en cascada
    const byParent = new Map();
    entries.filter(e => e.isIntersecting).forEach(e => {
      const p = e.target.parentElement;
      if (!byParent.has(p)) byParent.set(p, []);
      byParent.get(p).push(e.target);
    });
    byParent.forEach(group => {
      group.forEach((el, i) => {
        const delay = reduceMotion ? 0 : i * 80;
        setTimeout(() => el.classList.add('is-in'), delay);
        io.unobserve(el);
      });
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

  function queueReveal(root) {
    root.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  /* ---------- 4. Validacion del formulario ---------- */
  const form     = document.getElementById('contact-form');
  const success  = document.getElementById('form-success');
  const charCt   = document.getElementById('char-count');

  const validators = {
    name:    v => v.trim().length >= 2,
    email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    subject: v => v.trim().length >= 4,
    message: v => v.trim().length >= 20,
  };

  function validateField(fieldEl, silent = false) {
    const key = fieldEl.dataset.field;
    const ctl = fieldEl.querySelector('.ctl');
    if (!key || !ctl) return true;
    const ok = validators[key](ctl.value);

    if (ok) {
      ctl.classList.remove('is-error');
      ctl.classList.add('is-success');
      fieldEl.classList.remove('has-error');
    } else if (!silent) {
      ctl.classList.add('is-error');
      ctl.classList.remove('is-success');
      fieldEl.classList.add('has-error');
    }
    return ok;
  }

  if (form) {
    form.querySelectorAll('[data-field]').forEach(fieldEl => {
      const ctl = fieldEl.querySelector('.ctl');
      // valida en cada keystroke, pero en silencio hasta el primer blur
      ctl.addEventListener('input', () => {
        // si es el campo de mensaje, actualiza el contador de caracteres
        if (fieldEl.dataset.field === 'message' && charCt) {
          charCt.textContent = Math.min(ctl.value.trim().length, 999);
        }
        // revalida con error visible solo si ya habia un error mostrado
        validateField(fieldEl, !fieldEl.classList.contains('has-error'));
      });
      ctl.addEventListener('blur', () => {
        if (ctl.value !== '') validateField(fieldEl, false);
      });
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      let allOk = true;
      form.querySelectorAll('[data-field]').forEach(fieldEl => {
        if (!validateField(fieldEl, false)) allOk = false;
      });
      if (allOk) {
        success.classList.add('is-shown');
        // deshabilita el boton brevemente para que el envio se sienta reconocido
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        setTimeout(() => {
          form.reset();
          form.querySelectorAll('.ctl').forEach(c => c.classList.remove('is-success', 'is-error'));
          form.querySelectorAll('[data-field]').forEach(f => f.classList.remove('has-error'));
          if (charCt) charCt.textContent = '0';
          btn.disabled = false;
        }, 4000);
        setTimeout(() => success.classList.remove('is-shown'), 6000);
      } else {
        // mueve el foco al primer campo con error
        const first = form.querySelector('.has-error .ctl');
        if (first) first.focus();
      }
    });

    form.addEventListener('reset', () => {
      form.querySelectorAll('.ctl').forEach(c => c.classList.remove('is-success', 'is-error'));
      form.querySelectorAll('[data-field]').forEach(f => f.classList.remove('has-error'));
      if (charCt) charCt.textContent = '0';
      success.classList.remove('is-shown');
    });
  }

  /* ---------- 5. Controles manuales del carrusel hero ---------- */
  const carousel = document.querySelector('.hero__carousel');
  const track    = document.getElementById('hero-track');
  const prevBtn  = document.getElementById('hero-prev');
  const nextBtn  = document.getElementById('hero-next');
  const dotsWrap = document.getElementById('hero-dots');

  if (carousel && track && prevBtn && nextBtn && dotsWrap) {
    const SLIDES = 3;
    const dots = Array.from(dotsWrap.querySelectorAll('button'));
    let idx = 0;

    function applySlide(newIdx, opts = {}) {
      idx = ((newIdx % SLIDES) + SLIDES) % SLIDES;
      // el track mide 400% con 4 slides de 25% cada uno; se desplaza -25% por indice
      track.style.setProperty('--hero-tf', `translateX(${idx * -25}%)`);
      carousel.classList.add('is-manual');
      dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
    }

    prevBtn.addEventListener('click', () => applySlide(idx - 1));
    nextBtn.addEventListener('click', () => applySlide(idx + 1));
    dots.forEach(d => d.addEventListener('click', () => applySlide(Number(d.dataset.idx))));

    // marca el primer punto como activo al tomar control manual
    dots[0].classList.add('is-active');

    // navegacion con teclado cuando el carrusel tiene el foco
    carousel.tabIndex = 0;
    carousel.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); applySlide(idx - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); applySlide(idx + 1); }
    });
  }

  /* ---------- 6. Arranque ---------- */
  const initial = (location.hash || '#inicio').slice(1);
  setRoute(initial, { skipHash: true, skipScroll: true });
})();
