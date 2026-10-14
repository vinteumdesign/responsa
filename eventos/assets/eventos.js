(() => {
  'use strict';
  const init = () => {
  const phone = '5541998271848'; // WhatsApp da Responsa; conferir antes de publicar
  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('menu-mobile');
  if (toggle && mobileNav) {
    const closeMenu = () => {
      mobileNav.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
    };
    toggle.addEventListener('click', () => {
      const opening = mobileNav.hidden;
      mobileNav.hidden = !opening;
      toggle.setAttribute('aria-expanded', String(opening));
      toggle.setAttribute('aria-label', opening ? 'Fechar menu' : 'Abrir menu');
    });
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    document.addEventListener('click', e => {
      if (!mobileNav.hidden && !mobileNav.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });
    window.addEventListener('resize', () => { if (window.innerWidth > 850) closeMenu(); });
  }
  const floating = document.querySelector('.floating-contact');
  const hero = document.querySelector('.hero');
  if (floating && hero) {
    const updateFloating = () => {
      const isHeroPast = hero.getBoundingClientRect().bottom < 90;
      floating.classList.toggle('is-visible', isHeroPast);
    };
    updateFloating();
    window.addEventListener('scroll', updateFloating, { passive: true });
    window.addEventListener('resize', updateFloating);
  }
  const year = document.getElementById('ano');
  if (year) year.textContent = String(new Date().getFullYear());

  const form = document.getElementById('lead-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const field = name => String(data.get(name) || '').trim();
      const date = field('data');
      let dateLabel = 'a combinar';
      if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
        const [yy, mm, dd] = date.split('-');
        dateLabel = `${dd}/${mm}/${yy}`;
      }
      const lines = [
        'Olá, Banda Responsa! Quero solicitar um orçamento para um evento.',
        '',
        `Nome: ${field('nome')}`,
        `Tipo de evento: ${field('tipo')}`,
        `Data prevista: ${dateLabel}`,
        `Cidade: ${field('cidade')}`
      ];
      if (field('mensagem')) lines.push(`Outras informações: ${field('mensagem')}`);
      lines.push('', 'Podemos conversar sobre disponibilidade e valores?');
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(lines.join('\n'))}`;
      // Navegação direta evita bloqueios de popup em celulares e navegadores.
      window.location.assign(url);
    });
  }
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else { init(); }
})();
