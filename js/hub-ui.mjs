import {overview, EVENT_DATE, daysUntil, berlinDate, CAP} from './hub-model.mjs';

const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const euro = value => Number(value).toLocaleString('de-DE', {style:'currency',currency:'EUR',minimumFractionDigits:0,maximumFractionDigits:2});
const date = value => value ? new Date(`${value}T12:00:00`).toLocaleDateString('de-DE',{day:'numeric',month:'short'}) : 'Keine Frist';
const groups = [
  ['', [['overview','Übersicht','01']]],
  ['Planung', [['tasks','Aufgaben','02'],['decisions','Beschlüsse','03'],['pins','Pins','04']]],
  ['Ressourcen', [['assets','Ausstattung','05'],['shopping','Einkauf','06'],['budget','Budget','07'],['helpers','Helfer','08']]],
  ['Projekt', [['documents','Dokumente & Konzepte','09'],['timeline','Ablauf','10']]]
];
let phases = [], lastState, frame, selectedAsset = '';
function rowLink(title, subtitle, view, key = '', asset = false) {
  return `<button class="codex-entry" data-go="${view}" ${key ? `data-record="${esc(key)}"` : ''} ${asset ? 'data-asset="true"' : ''}><span><strong>${esc(title)}</strong><small>${esc(subtitle)}</small></span><span class="entry-arrow" aria-hidden="true">↗</span></button>`;
}
function empty(text) { return `<p class="codex-empty">${esc(text)}</p>`; }
function loadEquipment() {
  frame = document.getElementById('equipmentFrame');
  if (!frame.getAttribute('src')) frame.src = `ausstattung.html?embedded=1${location.hash}`;
}
function focusRecord(key, view) {
  if (view === 'assets') {
    selectedAsset = key;
    if (frame?.dataset.ready === 'true') { frame.contentWindow.postMessage({type:'winterfest:focus-asset',key}, location.origin); selectedAsset = ''; }
    return;
  }
  if (view === 'tasks') {
    const task = document.querySelector(`.task[data-key="${CSS.escape(key)}"]`);
    if (task) {
      const group = task.closest('.done-phase-group');
      group?.classList.remove('collapsed');
      task.scrollIntoView({block:'center',behavior:'auto'});
      task.tabIndex = -1; task.focus({preventScroll:true});
    }
  }
}
export function initHub(data, app) {
  phases = data;
  document.body.classList.add('codex-hub');
  document.querySelector('header').innerHTML = `<div class="folio-label">Organisation · 2026 — 2027</div><h1>Ende des<br><span>30. Winters</span></h1><div class="hero-rule"></div><p class="hero-caption">Ein Fest. Ein gemeinsamer Plan.</p><p class="header-date">29. Mai 2027 <span>·</span> Maximal 30 Gäste</p><span class="hero-mark" aria-hidden="true">XXX</span>`;
  const nav = document.createElement('aside');
  nav.className = 'codex-sidebar';
  nav.innerHTML = `<a class="codex-brand" href="?view=overview${location.hash}"><img src="icons/icon.svg" alt=""><span>Der Dreißigste<br><small>Organisationskodex</small></span></a><nav aria-label="Hauptnavigation">${groups.map(([label,items]) => `<div class="nav-group">${label ? `<p>${label}</p>` : ''}${items.map(([view,title,num]) => `<button class="codex-nav-link" data-go="${view}"><span class="nav-number">${num}</span>${title}</button>`).join('')}</div>`).join('')}</nav><div class="sidebar-foot"><span>XXIX · V · MMXXVII</span><p>Alles an seinem Platz.<br>Schritt für Schritt zum Fest.</p><button data-install-app class="pwa-install-action">App installieren ↗</button></div>`;
  document.body.prepend(nav);
  const container = document.querySelector('.container');
  const equipment = document.createElement('section');
  equipment.id = 'equipmentView'; equipment.dataset.view = 'assets'; equipment.className = 'orga-view';
  equipment.innerHTML = `<div class="codex-page-heading"><p class="folio-label">Ressourcen / 05</p><h2>Ausstattung</h2><p>Bestand, Beschaffung und die nächsten Schritte.</p></div><div class="resource-tabs"><button class="selected" data-go="assets">Material & Bestand</button><button data-go="tentleads">Zelt · Anfragen & Kontakte</button><a href="ausstattung.html${location.hash}">Separat öffnen ↗</a></div><p class="codex-empty" id="equipmentLoading">Ausstattung wird geladen …</p><iframe id="equipmentFrame" title="Ausstattung und Beschaffung" class="equipment-frame"></iframe>`;
  container.append(equipment);
  const timeline = document.createElement('section');
  timeline.className = 'orga-view'; timeline.dataset.view = 'timeline'; timeline.id='eventTimeline';
  timeline.innerHTML = `<div class="codex-page-heading"><p class="folio-label">Projekt / 10</p><h2>Der Eventtag</h2><p>29. Mai 2027 · Vom ersten Aufbau bis zum letzten Licht.</p></div><div class="codex-agenda">${(phases.find(p => p.id==='phase8')?.timeline || []).map(item => `<article><time>${esc(item.time)}</time><p>${esc(item.text)}</p></article>`).join('')}</div>`;
  container.append(timeline);
  const tent = document.getElementById('tentleads');
  tent.insertAdjacentHTML('afterbegin', '<div class="resource-tabs"><button data-go="assets">← Ausstattung</button><span>Zelt · Anfragen & Kontakte</span></div>');
  document.querySelector('#tentleads .progress-title').textContent = 'Zelt · Anfragen & Kontakte';
  document.querySelector('#decisions .progress-title').textContent = 'Beschlüsse';
  document.querySelector('#documents .progress-title').textContent = 'Dokumente & Konzepte';
  document.querySelector('.topbar-title').textContent = 'Ende des 30. Winters';
  const dashboard = document.getElementById('dashboard');
  dashboard.innerHTML = `<div class="overview-heading"><div><p class="folio-label">Der aktuelle Stand</p><h2>Alles im Blick.</h2></div><button class="codex-quiet" onclick="APP.printHub()">Drucken ↗</button></div><div id="commandContent" aria-live="polite">${empty('Der aktuelle Plan wird geladen …')}</div>`;
  const switchView = app.switchView.bind(app);
  app.switchView = (view, persist = true) => {
    switchView(view, persist);
    const active = document.body.dataset.view;
    document.querySelectorAll('.codex-nav-link').forEach(button => {
      const selected = button.dataset.go === active || (active === 'tentleads' && button.dataset.go === 'assets');
      button.classList.toggle('selected', selected);
      if (selected) button.setAttribute('aria-current','page'); else button.removeAttribute('aria-current');
    });
    if (active === 'assets') loadEquipment();
    if (persist) {
      const url = new URL(location.href); url.searchParams.set('view', active);
      history.pushState({view:active},'',url);
    }
  };
  window.addEventListener('popstate', () => app.switchView(new URLSearchParams(location.search).get('view') || 'overview',false));
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-go]');
    if (!button) return;
    event.preventDefault(); app.switchView(button.dataset.go);
    if (button.dataset.record) focusRecord(button.dataset.record, button.dataset.go);
    if (button.dataset.phase) document.getElementById(button.dataset.phase)?.scrollIntoView({block:'start',behavior:'auto'});
  });
  const equipmentLink = document.getElementById('equipmentLink');
  equipmentLink.addEventListener('click', event => {event.preventDefault();app.switchView('assets');});
  document.querySelector('.mobile-more-grid').insertAdjacentHTML('beforeend','<button class="mobile-menu-item" data-go="timeline"><span class="mobile-menu-icon" aria-hidden="true">◷</span><span><strong>Ablauf</strong>Der Eventtag</span></button>');
  const menu = document.querySelector('.mobile-more-grid');
  const oldItems = [...menu.children];
  const findItem = view => oldItems.find(el => el.dataset.menuView === view || el.dataset.go === view || (view === 'assets' && el.id === 'equipmentLink'));
  menu.replaceChildren();
  for (const [label, views] of [['Planung',['decisions','pins']],['Ressourcen',['assets','helpers']],['Projekt',['documents','timeline']]]) {
    const heading = document.createElement('p'); heading.className = 'mobile-menu-group-label'; heading.textContent = label; menu.append(heading);
    views.forEach(view => { const item = findItem(view); if (item) menu.append(item); });
  }
  const toolsHeading = document.createElement('p'); toolsHeading.className = 'mobile-menu-group-label'; toolsHeading.textContent = 'Werkzeuge'; menu.append(toolsHeading);
  oldItems.filter(el => !el.dataset.menuView && !el.dataset.go && el.id !== 'equipmentLink').forEach(el => menu.append(el));
  nav.querySelector('[data-install-app]').addEventListener('click', () => window.WINTERFEST_PWA?.install());
  window.addEventListener('message', event => {
    if (event.origin !== location.origin || event.source !== frame?.contentWindow) return;
    if (event.data?.type === 'winterfest:equipment-height' && Number.isFinite(event.data.height)) {
      frame.style.height = `${Math.max(300,Math.min(100000,event.data.height))}px`;
      document.getElementById('equipmentLoading').hidden = true;
    }
    if (event.data?.type === 'winterfest:equipment-ready') { frame.dataset.ready = 'true'; if (selectedAsset) focusRecord(selectedAsset,'assets'); }
    if (event.data?.type === 'winterfest:asset-position' && Number.isFinite(event.data.top)) window.scrollTo({top:frame.getBoundingClientRect().top + scrollY + event.data.top - 90,behavior:'auto'});
  });
  setInterval(() => { if (lastState) renderOverview(phases,lastState); },60000);
}

export function renderOverview(data, state) {
  lastState = state;
  const target = document.getElementById('commandContent');
  if (!target) return;
  const needed = ['tasks','customTasks','assets','pins','tentLeads','documents','decisions'];
  if (!needed.every(key => window._hubLoaded?.has(key))) return;
  const today = berlinDate();
  const summary = overview(data,state,today);
  const days = daysUntil(EVENT_DATE,today);
  const deadline = summary.deadlines[0];
  const phaseTotals = data.map(phase => {
    const rows = summary.tasks.filter(task => task.phaseId === phase.id);
    const complete = rows.filter(task => task.done || task.status === 'done').length;
    return {...phase,total:rows.length,complete,percent:rows.length ? Math.round(complete/rows.length*100) : 0};
  });
  const list = (rows,format,missing) => rows.length ? rows.slice(0,4).map(format).join('') : empty(missing);
  const important = [...recordsLocal(state.pins).map(row=>({...row,view:'pins',label:'Pin'})),...recordsLocal(state.decisions).filter(row=>row.pinned).map(row=>({...row,view:'decisions',label:'Beschluss'})),...recordsLocal(state.documents).filter(row=>row.pinned).map(row=>({...row,view:'documents',label:'Dokument'}))].sort((a,b)=>(b.ts||0)-(a.ts||0));
  target.innerHTML = `<div class="command-grid">
    <section class="command-progress"><p class="folio-label">Gesamtfortschritt</p><div class="progress-number">${summary.percent}<span>%</span></div><div class="codex-meter" role="progressbar" aria-label="Gesamtfortschritt" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${summary.percent}"><i style="width:${summary.percent}%"></i></div><p>${summary.done.length} von ${summary.total} Aufgaben erledigt</p><div class="progress-alerts"><span>${summary.blocked.length} blockiert</span><span>${summary.overdue.length} überfällig</span></div></section>
    <section class="command-countdown"><p class="folio-label">${days < 0 ? 'Seit dem Fest' : days === 0 ? 'Heute ist es so weit' : 'Bis zum Fest'}</p><strong>${Math.abs(days)}</strong><span>Tage</span><p>Samstag, 29. Mai 2027</p></section>
    <section class="command-focus"><p class="folio-label">Aktueller Fokus</p><h3>${esc(summary.focus?.title || 'Den nächsten Schritt bestimmen')}</h3><p>${esc(summary.focus?.text || 'Ein Pin mit der Kategorie „Fokus“ macht die gemeinsame Priorität hier sichtbar.')}</p><button class="text-link" data-go="pins">Fokus & Hinweise ↗</button></section>
    <section class="command-deadline"><p class="folio-label">Nächste Deadline</p>${deadline ? `<strong class="deadline-date">${date(deadline.due)}${deadline.due < today ? ' · überfällig' : ''}</strong>${rowLink(deadline.title,deadline.kind,deadline.view,deadline.key)}` : empty('Keine offenen Fristen eingetragen.')}</section>
  </div>
  <div class="budget-ribbon"><div><p class="folio-label">Budget</p><strong>${euro(summary.budget.planned)} <span>/ ${euro(CAP)} geplant</span></strong></div><div><small>Bereits ausgegeben</small><strong>${euro(summary.budget.actual)}</strong></div><div><small>Planungspuffer</small><strong class="${summary.budget.buffer < 0 ? 'negative' : ''}">${euro(summary.budget.buffer)}</strong></div><button class="text-link" data-go="budget">${summary.budget.unpriced} Posten ohne Preis · Budget öffnen ↗</button></div>
  <section class="project-phases"><div class="section-caption"><h3>Der Weg zum Fest</h3><span>8 Phasen · ein gemeinsames Ziel</span></div><div class="phase-track">${phaseTotals.map((phase,i)=>`<button data-go="tasks" data-phase="${phase.id}" class="phase-step ${phase.percent===100?'complete':''}"><span class="phase-index">${String(i+1).padStart(2,'0')}</span><strong>${esc(phase.subtitle)}</strong><span>${esc(phase.title)}</span><i><b style="width:${phase.percent}%"></b></i><small>${phase.complete} / ${phase.total}</small></button>`).join('')}</div></section>
  <div class="command-lists"><section><div class="section-caption"><h3>Noch zu entscheiden</h3><span>${summary.decisions.length} offen</span></div>${list(summary.decisions,row=>rowLink(row.item,row.next || row.area,'assets',row.key,true),'Keine offenen Ausstattungsentscheidungen.')}${list(summary.blocked,row=>rowLink(row.text,'Blockierte Aufgabe','tasks',row.key),'')}<button class="text-link" data-go="decisions">Beschlüsse lesen ↗</button></section>
  <section><div class="section-caption"><h3>Beschaffung im Blick</h3><button class="text-link" data-go="assets">Alle ↗</button></div>${list(summary.procurement,row=>rowLink(row.item,`${row.status} · ${row.due ? date(row.due) : row.next || row.area}`,'assets',row.key,true),'Keine aktive Beschaffung offen.')}</section>
  <section><div class="section-caption"><h3>Zuletzt abgeschlossen</h3><span>Aufgaben</span></div>${list(summary.recent,row=>rowLink(row.text,`${row.by || 'Erledigt'} · ${new Date(row.at).toLocaleDateString('de-DE')}`,'tasks',row.key),'Noch keine Abschlüsse mit Datum vorhanden.')}</section>
  <section><div class="section-caption"><h3>Am Rand vermerkt</h3><button class="text-link" data-go="pins">Alle Pins ↗</button></div>${list(important,row=>rowLink(row.title,`${row.label} · ${row.text || row.note || row.category || ''}`,row.view),'Wichtige Hinweise und Dokumente erscheinen hier.')}</section></div>`;
}
function recordsLocal(value) { return Object.values(value || {}).filter(row => row && typeof row==='object'); }

