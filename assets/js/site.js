(() => {
  const D = window.MAGUI || {};
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const calma = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ahorro = navigator.connection && navigator.connection.saveData;

  /* WhatsApp de Magui: cada botón lleva su propio mensaje en data-wa. */
  const waUrl = (msg) => `https://wa.me/${D.whatsapp || ''}?text=${encodeURIComponent(msg)}`;
  const enlazar = () => $$('[data-wa]').forEach((a) => { a.href = waUrl(a.dataset.wa); });
  enlazar();

  /* Datos del negocio */
  $$('[data-dato]').forEach((el) => { const v = D[el.dataset.dato]; if (v) el.textContent = v; });
  $$('[data-precio]').forEach((el) => {
    const v = D.precios && D.precios[el.dataset.precio];
    if (v) {
      const s = document.createElement('span'); s.textContent = v; el.replaceWith(s);
    }
  });
  $$('[data-red]').forEach((el) => {
    const v = D[el.dataset.red];
    if (v) { el.href = v; el.closest('li').hidden = false; }
  });
  const op = $('#opiniones');
  if (op && D.resenas && D.resenas.length) {
    const ul = $('ul', op);
    D.resenas.forEach((r) => {
      const li = document.createElement('li');
      const q = document.createElement('blockquote'); q.className = 'statement'; q.textContent = `“${r.texto}”`;
      const f = document.createElement('footer'); f.textContent = [r.autora, r.detalle].filter(Boolean).join(' · ');
      li.append(q, f); ul.append(li);
    });
    op.hidden = false;
  }

  /* Menú móvil */
  const mb = $('.menu-btn'), nav = $('.nav');
  if (mb && nav) {
    const poner = (a) => {
      nav.classList.toggle('abierto', a); mb.setAttribute('aria-expanded', a);
      mb.textContent = a ? 'Cerrar' : 'Menú'; document.body.style.overflow = a ? 'hidden' : '';
    };
    mb.addEventListener('click', () => poner(!nav.classList.contains('abierto')));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) poner(false); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape') poner(false); });
  }

  /* Riel y barra de reserva */
  const rail = $('.rail'), barra = $('.barra'), cierre = $('.cierre');
  let tras = false, enCierre = false, ultimo = scrollY;
  const pintarBarra = () => barra && barra.classList.toggle('visible', tras && !enCierre);
  const alMover = () => {
    tras = scrollY > innerHeight * .7;
    if (rail) {
      const acoplado = rail.getBoundingClientRect().top <= .5 && scrollY > 4;
      rail.classList.toggle('acoplado', acoplado);
      // En móvil el menú se aparta al bajar y vuelve al subir: la barra de reserva ya queda a mano.
      if (innerWidth <= 900 && Math.abs(scrollY - ultimo) > 6) {
        const abierto = nav && nav.classList.contains('abierto');
        rail.classList.toggle('oculto', acoplado && scrollY > ultimo && !abierto);
      }
      if (innerWidth > 900) rail.classList.remove('oculto');
    }
    ultimo = scrollY;
    pintarBarra();
  };
  addEventListener('scroll', alMover, { passive: true }); alMover();
  if (cierre && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { enCierre = e.isIntersecting; pintarBarra(); }, { threshold: .12 }).observe(cierre);
  }

  /* Videos: solo corren en pantalla, nunca con movimiento reducido o ahorro de datos */
  const videos = $$('video[data-auto]');
  if (videos.length && !calma && !ahorro && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) {
        const v = e.target;
        if (!v.src && v.dataset.src) v.src = innerWidth < 760 ? v.dataset.srcM : v.dataset.src;
        const p = v.play(); if (p) p.catch(() => {});
      } else e.target.pause();
    }), { rootMargin: '200px' });
    videos.forEach((v) => io.observe(v));
  }

  /* Fundido lento de la vitrina */
  const capas = $$('.capa');
  if (capas.length > 1 && !calma) {
    let i = 0, t;
    const seguir = () => { t = setInterval(() => {
      capas[i].classList.remove('activa'); i = (i + 1) % capas.length; capas[i].classList.add('activa');
    }, 7000); };
    seguir();
    document.addEventListener('visibilitychange', () => { clearInterval(t); if (!document.hidden) seguir(); });
  }

  /* Aparición por partes. Red de seguridad: nada queda oculto. */
  const rs = $$('[data-r]');
  $$('[data-grupo]').forEach((g) => $$('[data-r]', g).forEach((el, n) => el.style.setProperty('--d', `${n * 75}ms`)));
  if (!calma && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: .05 });
    rs.forEach((el) => io.observe(el));
    addEventListener('load', () => setTimeout(() => rs.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in');
    }), 2500));
  } else rs.forEach((el) => el.classList.add('is-in'));

  /* Visor de fotos */
  const dlg = $('#visor');
  if (dlg) {
    const img = $('img', dlg), tit = $('p', dlg), pedir = $('.btn', dlg);
    const abrir = (b) => {
      const t = b.dataset.titulo;
      img.src = b.dataset.full; img.alt = b.querySelector('img').alt; tit.textContent = t;
      pedir.dataset.wa = `Hola Magui, vi el diseño "${t}" en tu web y quiero uno así 🦋`;
      enlazar(); dlg.showModal();
    };
    document.addEventListener('click', (e) => { const b = e.target.closest('[data-full]'); if (b) abrir(b); });
    $('.lb-cerrar', dlg).addEventListener('click', () => dlg.close());
    dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.classList.contains('lb')) dlg.close(); });
  }

  /* Filtros de diseños */
  const filtros = $$('.filtros button');
  filtros.forEach((b) => b.addEventListener('click', () => {
    filtros.forEach((x) => x.setAttribute('aria-pressed', x === b));
    const c = b.dataset.cat;
    $$('.pieza').forEach((p) => { p.hidden = c !== 'todo' && !p.dataset.cat.split(' ').includes(c); });
  }));

  /* Fila de pasos */
  const fila = $('.pasos');
  if (fila) {
    const barraA = $('.avance i');
    const medir = () => {
      const max = fila.scrollWidth - fila.clientWidth;
      const vista = fila.clientWidth / fila.scrollWidth;
      barraA.style.transform = `scaleX(${vista + (1 - vista) * (max > 0 ? fila.scrollLeft / max : 1)})`;
    };
    fila.addEventListener('scroll', medir, { passive: true }); addEventListener('resize', medir); medir();
    $$('.flechas button').forEach((b) => b.addEventListener('click', () => {
      fila.scrollBy({ left: Number(b.dataset.dir) * 332, behavior: calma ? 'auto' : 'smooth' });
    }));
  }

  /* Arma tu set: forma, largo, color, diseño y acabado, dibujados en vivo */
  const form = $('#set');
  if (form) {
    const COLORES = {
      'Rojo Magui': { c: '#d7263d', ref: 'trabajo-5', t: 'Rojo intenso' },
      'Nude': { c: '#e8bfae', ref: 'serv-acrilicas', t: 'Nude con líneas' },
      'Ombré celeste': { c: 'url(#ombre)', ref: 'stiletto-mariposas-azules', t: 'Stiletto ombré con mariposas' },
      'Francesa': { c: '#f2d3c6', punta: '#fffaf5', ref: 'trabajo-7', t: 'Francesa' },
      'Coral': { c: '#ff7a59', ref: 'trabajo-12', t: 'Coral stiletto' },
      'Negro': { c: '#1a1214', ref: 'trabajo-2', t: 'Negro con luna' }
    };
    const DISENO_REF = {
      'Mariposas': { ref: 'stiletto-mariposas-azules', t: 'Stiletto ombré con mariposas' },
      'Lámina dorada': { ref: 'nubes-mariposas-dorado', t: 'Nubes, mariposas y lámina dorada' }
    };
    const LARGO = { Corto: 96, Medio: 132, Extra: 176 };
    const DEDOS = [
      { x: 92, y: 400, s: 1.02, r: -9 }, { x: 204, y: 330, s: 1.2, r: -4 }, { x: 322, y: 300, s: 1.36, r: 0 }, { x: 442, y: 330, s: 1.2, r: 4 }, { x: 540, y: 410, s: .9, r: 9 }
    ];
    const W = 72;
    const forma = (f, L) => {
      const w = W / 2;
      const base = `M${-w},0`, cierreP = `C${w},${w * 1.05} ${-w},${w * 1.05} ${-w},0Z`;
      if (f === 'Cuadrada') return `${base}L${-w},${-L + 5}Q${-w},${-L} ${-w + 5},${-L}L${w - 5},${-L}Q${w},${-L} ${w},${-L + 5}L${w},0${cierreP}`;
      if (f === 'Coffin') return `${base}C${-w},${-L * .5} ${-w * .56},${-L * .86} ${-w * .46},${-L}L${w * .46},${-L}C${w * .56},${-L * .86} ${w},${-L * .5} ${w},0${cierreP}`;
      if (f === 'Stiletto') return `${base}C${-w},${-L * .42} ${-w * .3},${-L * .8} 0,${-L * 1.1}C${w * .3},${-L * .8} ${w},${-L * .42} ${w},0${cierreP}`;
      return `${base}C${-w},${-L * .55} ${-w * .5},${-L * .92} 0,${-L}C${w * .5},${-L * .92} ${w},${-L * .55} ${w},0${cierreP}`;
    };
    const svg = $('#lienzo');
    const NS = 'http://www.w3.org/2000/svg';
    const nodo = (t, a, p) => { const n = document.createElementNS(NS, t); Object.entries(a).forEach(([k, v]) => n.setAttribute(k, v)); p.append(n); return n; };
    const defs = nodo('defs', {}, svg);
    const grad = nodo('linearGradient', { id: 'ombre', x1: 0, y1: 1, x2: 0, y2: 0 }, defs);
    nodo('stop', { offset: '.15', 'stop-color': '#f4cbbf' }, grad);
    nodo('stop', { offset: '1', 'stop-color': '#6fa3ea' }, grad);
    const piezas = DEDOS.map((d, i) => {
      const u = nodo('g', { transform: `translate(${d.x},${d.y}) rotate(${d.r}) scale(${d.s})` }, svg);
      const clip = nodo('clipPath', { id: `u${i}` }, defs);
      const cp = nodo('path', {}, clip);
      const una = nodo('path', { stroke: 'rgba(30,20,18,.16)', 'stroke-width': 1 }, u);
      const punta = nodo('rect', { x: -40, width: 80, 'clip-path': `url(#u${i})` }, u);
      const deco = nodo('g', { 'clip-path': `url(#u${i})` }, u);
      const luz = nodo('path', { fill: 'none', stroke: '#fff', 'stroke-opacity': .55, 'stroke-width': 4, 'stroke-linecap': 'round' }, u);
      return { una, cp, punta, deco, luz };
    });

    /* Adornos a mano: mariposa, brillantes o lámina dorada */
    const mariposa = (g, y, col) => {
      const m = nodo('g', { transform: `translate(2,${y}) scale(.9)` }, g);
      nodo('ellipse', { cx: -7, cy: -4, rx: 8, ry: 6, fill: col, transform: 'rotate(-30 -7 -4)' }, m);
      nodo('ellipse', { cx: 7, cy: -4, rx: 8, ry: 6, fill: col, transform: 'rotate(30 7 -4)' }, m);
      nodo('ellipse', { cx: -5, cy: 5, rx: 5, ry: 4, fill: col }, m);
      nodo('ellipse', { cx: 5, cy: 5, rx: 5, ry: 4, fill: col }, m);
      nodo('rect', { x: -1.2, y: -7, width: 2.4, height: 15, rx: 1.2, fill: '#1c1a3a' }, m);
    };
    const adornar = (p, i, dis, L) => {
      p.deco.replaceChildren();
      if (dis === 'Mariposas' && (i === 1 || i === 3)) mariposa(p.deco, -L * .5, i === 1 ? '#2f6fe0' : '#d7263d');
      if (dis === 'Brillantes') [[-12, -14], [0, -18], [12, -14]].forEach(([x, y]) => nodo('circle', { cx: x, cy: y, r: 3.4, fill: '#fff', stroke: '#e0a93b', 'stroke-width': 1.2 }, p.deco));
      if (dis === 'Lámina dorada' && i % 2 === 0) nodo('path', { d: `M-30,${-L * .78}C-14,${-L * .9} 4,${-L * .66} 30,${-L * .8}L30,${-L * 1.2}L-30,${-L * 1.2}Z`, fill: '#e0a93b', opacity: .92 }, p.deco);
    };

    const res = $('#set-resumen'), refImg = $('#set-ref'), refT = $('#set-ref-t'), enviar = $('#set-enviar');

    /* El mensaje que Magui recibe por WhatsApp cuando la clienta envía su set.
       s = { forma, largo, color, diseno, acabado, zona } (textos tal como se ven en los botones) */
    const mensajeSet = (s) => {
      // TODO(human): arma el mensaje que le llega a Magui (ver instrucciones en el chat).
      return `Hola Magui, armé mi set en tu web: punta ${s.forma}, largo ${s.largo}, ${s.color}, ${s.diseno}, ${s.acabado}. Zona: ${s.zona}.`;
    };

    const pintar = () => {
      const f = new FormData(form);
      const s = { forma: f.get('forma'), largo: f.get('largo'), color: f.get('color'), diseno: f.get('diseno'), acabado: f.get('acabado'), zona: f.get('zona') };
      const L = LARGO[s.largo], c = COLORES[s.color];
      piezas.forEach((p, i) => {
        const d = forma(s.forma, L);
        p.una.setAttribute('d', d); p.cp.setAttribute('d', d); p.una.setAttribute('fill', c.c);
        p.punta.setAttribute('y', -L * 1.15); p.punta.setAttribute('height', L * .5);
        p.punta.setAttribute('fill', c.punta || 'none');
        adornar(p, i, s.diseno, L);
        p.luz.setAttribute('d', `M-19,-8C-20,${-L * .4} -14,${-L * .62} -8,${-L * .72}`);
        p.luz.style.display = s.acabado === 'Brillo' ? '' : 'none';
      });
      const ref = DISENO_REF[s.diseno] || c;
      res.textContent = `Punta ${s.forma.toLowerCase()}, largo ${s.largo.toLowerCase()}, ${s.color}, ${s.diseno.toLowerCase()}, acabado ${s.acabado.toLowerCase()}`;
      refImg.src = `assets/web/${ref.ref}-480.webp`; refImg.alt = ref.t; refT.textContent = ref.t;
      enviar.dataset.wa = mensajeSet(s);
      enlazar();
    };
    form.addEventListener('change', pintar); pintar();
  }
})();
