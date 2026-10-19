// Magui Acrylics — interacciones: aparición al hacer scroll, contador de precio y sombra de la cabecera.
(function () {
  var doc = document.documentElement;
  var reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Contador «Desde $10»: sube de 0 al valor cuando aparece
  function contar(el) {
    var hasta = parseInt(el.getAttribute('data-hasta'), 10) || 0;
    var inicio = null, dur = 900;
    function paso(t) {
      if (!inicio) inicio = t;
      var p = Math.min((t - inicio) / dur, 1);
      el.textContent = Math.round(hasta * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
  }

  // Aparición escalonada (patrón «Stagger List» de UI UX Pro Max)
  if (!reducido && 'IntersectionObserver' in window) {
    doc.classList.add('js');
    var grupos = new Map();
    var elementos = document.querySelectorAll('.revela');
    elementos.forEach(function (el) {
      var padre = el.parentElement;
      var i = grupos.get(padre) || 0;
      el.style.setProperty('--retraso', Math.min(i * 90, 360) + 'ms');
      grupos.set(padre, i + 1);
    });
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('visible');
        e.target.querySelectorAll('.contador').forEach(contar);
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
    elementos.forEach(function (el) { io.observe(el); });
  }

  // Sombra en la cabecera al bajar
  var cabecera = document.querySelector('.cabecera');
  var marcar = function () { cabecera.classList.toggle('con-sombra', window.scrollY > 8); };
  window.addEventListener('scroll', marcar, { passive: true });
  marcar();
})();
