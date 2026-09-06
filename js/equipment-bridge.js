// Presentation-only integration: no database writes, seeds or migrations.
(() => {
  if (new URLSearchParams(location.search).get('embedded') !== '1' || parent === window) return;
  document.documentElement.classList.add('equipment-embedded');
  let lastHeight = 0;
  const resize = () => {
    const height = Math.ceil(document.body.getBoundingClientRect().height) + 12;
    if (height !== lastHeight) { lastHeight = height; parent.postMessage({type:'winterfest:equipment-height',height},location.origin); }
  };
  window.addEventListener('DOMContentLoaded', () => {
    new ResizeObserver(resize).observe(document.body);
    window.addEventListener('winterfest:assets-rendered', () => {resize();parent.postMessage({type:'winterfest:equipment-ready'},location.origin);});
    resize();
  });
  window.addEventListener('message', event => {
    if (event.source !== parent || event.origin !== location.origin || event.data?.type !== 'winterfest:focus-asset' || typeof event.data.key !== 'string') return;
    // Clear only local filters so a requested record can be revealed.
    ['search','filterArea','filterStatus','filterType'].forEach(id => {const el=document.getElementById(id);if(el)el.value='';});
    document.getElementById('search')?.dispatchEvent(new Event('input'));
    const el = document.querySelector(`[data-asset-key="${CSS.escape(event.data.key)}"]`);
    if (!el) return;
    document.querySelectorAll('.asset.is-target').forEach(row=>row.classList.remove('is-target'));
    el.classList.add('is-target');el.tabIndex=-1;el.focus({preventScroll:true});
    parent.postMessage({type:'winterfest:asset-position',top:el.getBoundingClientRect().top + scrollY},location.origin);
  });
})();
