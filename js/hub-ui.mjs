import {groundsMilestones,groundsTasks,FIRST_CUT_RESERVE} from './grounds-plan.mjs';
import {projectMilestones} from './event-plan.mjs';
import {overview, EVENT_DATE, daysUntil, berlinDate, CAP, optionalAssets} from './hub-model.mjs';
import {initFood} from './food-ui.mjs';

const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const euro = value => Number(value).toLocaleString('de-DE', {style:'currency',currency:'EUR',minimumFractionDigits:0,maximumFractionDigits:2});
const date = value => value ? new Date(`${value}T12:00:00`).toLocaleDateString('de-DE',{day:'numeric',month:'short'}) : 'Keine Frist';
const groups = [
  ['', [['overview','Übersicht','01']]],
  ['Planung', [['tasks','Aufgaben','02'],['decisions','Beschlüsse','03'],['pins','Pins','04']]],
  ['Ressourcen', [['assets','Ausstattung & Beschaffung','05'],['helpers','Helfer','06']]],
  ['Projekt', [['food','Verpflegungskonzept','09'],['grounds','Grünschnitt','10'],['documents','Dokumente & Konzepte','11'],['timeline','Ablauf','12']]]
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
  document.querySelector('header').innerHTML = `<div class="folio-label">Organisation · 2026 — 2027</div><h1>Ende des<br><span>30. Winters</span></h1><img class="winterfest-logo" src="icons/winterfest-logo-2026.png" alt="Zeichen des Dreißigsten Winters: Rabe und Mondsichel" width="1254" height="1254"><div class="hero-rule"></div><p class="header-date">29. Mai 2027 <span>·</span> Maximal 30 Gäste</p>`;
  const nav = document.createElement('aside');
  nav.className = 'codex-sidebar';
  nav.innerHTML = `<a class="codex-brand" href="?view=overview${location.hash}"><img src="icons/winterfest-logo-2026.png" alt="" width="1254" height="1254"><span>Der Dreißigste<br><small>Organisationskodex</small></span></a><nav aria-label="Hauptnavigation">${groups.map(([label,items]) => `<div class="nav-group">${label ? `<p>${label}</p>` : ''}${items.map(([view,title,num]) => `<button class="codex-nav-link" data-go="${view}"><span class="nav-number">${num}</span>${title}</button>`).join('')}</div>`).join('')}</nav><div class="sidebar-foot"><span>XXIX · V · MMXXVII</span><p>Alles an seinem Platz.<br>Schritt für Schritt zum Fest.</p><button data-install-app class="pwa-install-action">App installieren ↗</button></div>`;
  document.body.prepend(nav);
  const container = document.querySelector('.container');
  const equipment = document.createElement('section');
  equipment.id = 'equipmentView'; equipment.dataset.view = 'assets'; equipment.className = 'orga-view';
  equipment.innerHTML = `<div class="codex-page-heading"><p class="folio-label">Ressourcen / 05</p><h2>Ausstattung & Beschaffung</h2><p>Material, Einkauf und Kosten gemeinsam verwalten.</p></div><div class="resource-tabs"><button class="selected" data-go="assets">Material & Bestand</button><button data-go="tentleads">Zelt · Anfragen & Kontakte</button><a href="ausstattung.html${location.hash}">Separat öffnen ↗</a></div><p class="codex-empty" id="equipmentLoading">Ausstattung wird geladen …</p><iframe id="equipmentFrame" title="Ausstattung und Beschaffung" class="equipment-frame"></iframe>`;
  container.append(equipment);
  initFood(container,app,(path,value)=>app.saveFoodField(path,value));
  const timeline = document.createElement('section');
  timeline.className = 'orga-view'; timeline.dataset.view = 'timeline'; timeline.id='eventTimeline';
  timeline.innerHTML = `<div class="codex-page-heading"><p class="folio-label">Projekt / 10</p><h2>Der Eventtag</h2><p>29. Mai 2027 · Vom ersten Aufbau bis zum letzten Licht.</p><p>Ab dem Ankommen gibt es Snacks und laufend nachgefüllte Tavernenplatten. Das große Essen beginnt um 16 Uhr; die Essensausgabe ist nicht auf ein starres Zeitfenster begrenzt.</p></div><div class="codex-agenda">${(phases.find(p => p.id==='phase8')?.timeline || []).map(item => `<article><time>${esc(item.time)}</time><p>${esc(item.text)}</p></article>`).join('')}</div>`;
  container.append(timeline);
  const grounds = document.createElement('section');
  grounds.className='orga-view grounds-view'; grounds.dataset.view='grounds'; grounds.id='groundsView';
  container.append(grounds);
  timeline.insertAdjacentHTML('afterbegin', `<div class="codex-page-heading"><h2>Geländeplanung bis zum Fest</h2></div><div class="codex-agenda">${groundsMilestones.map(item=>`<article><time>${esc(item.time)}</time><div>${item.tasks.map(task=>rowLink(task.text, task.hint, task.id==='grounds_first_cut'?'grounds':'tasks', task.id==='grounds_first_cut'?'':task.id)).join('')}</div></article>`).join('')}<article><time>29.05.2027</time><p>Veranstaltung · Ende des 30. Winters</p></article></div>`);
  const resourceViews = ['assets','shopping','budget','tentleads'];
  const resourceTabs = active => '<nav class="resource-tabs" aria-label="Ausstattung und Beschaffung">' + [['assets','Material & Bestand'],['shopping','Einkaufsliste'],['budget','Kosten & Erstattung'],['tentleads','Zeltanfragen']].map(([view,label]) => '<button data-go="'+view+'"'+(active===view?' class="selected" aria-current="page"':'')+'>'+label+'</button>').join('') + '</nav>';
  equipment.querySelector('.resource-tabs').outerHTML = resourceTabs('assets') + '<p class="resource-fallback"><a href="ausstattung.html'+location.hash+'">Ausstattung separat öffnen ↗</a></p>';
  for (const view of resourceViews.slice(1)) {
    const section = document.getElementById(view);
    section.insertAdjacentHTML('afterbegin', '<div class="codex-page-heading"><p class="folio-label">Ressourcen / 05</p><h2>Ausstattung & Beschaffung</h2></div>'+resourceTabs(view));
  }
  const workspace = document.querySelector('.workspace-tabs');
  workspace.querySelectorAll('[data-view="shopping"],[data-view="budget"],[data-view="tentleads"]').forEach(button => button.remove());
  const assetTab = workspace.querySelector('[data-view="assets"]');
  assetTab.classList.add('mobile-primary');
  assetTab.innerHTML = '<span class="tab-icon" aria-hidden="true">⚒</span><span>Ausstattung</span>';
  const helperTab = workspace.querySelector('[data-view="helpers"]');
  helperTab.classList.add('mobile-primary');
  helperTab.innerHTML = '<span class="tab-icon" aria-hidden="true">♟</span><span>Helfer</span>';
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
      const selected = button.dataset.go === active || (resourceViews.includes(active) && button.dataset.go === 'assets');
      button.classList.toggle('selected', selected);
      if (selected) button.setAttribute('aria-current','page'); else button.removeAttribute('aria-current');
    });
    assetTab.classList.toggle('active', resourceViews.includes(active));
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
  document.querySelector('.mobile-more-grid').insertAdjacentHTML('beforeend','<button class="mobile-menu-item" data-go="grounds"><span class="mobile-menu-icon" aria-hidden="true">✳</span><span><strong>Grünschnitt</strong>Erster Arbeitseinsatz</span></button>');
  const menu = document.querySelector('.mobile-more-grid');
  const oldItems = [...menu.children];
  const findItem = view => oldItems.find(el => el.dataset.menuView === view || el.dataset.go === view || (view === 'assets' && el.id === 'equipmentLink'));
  menu.replaceChildren();
  for (const [label, views] of [['Planung',['decisions','pins']],['Ressourcen',['assets','helpers']],['Projekt',['food','grounds','documents','timeline']]]) {
    const heading = document.createElement('p'); heading.className = 'mobile-menu-group-label'; heading.textContent = label; menu.append(heading);
    views.forEach(view => { const item = findItem(view); if (item) menu.append(item); else if(view==='food'){const button=document.createElement('button');button.className='mobile-menu-item';button.dataset.go='food';button.textContent='Verpflegungskonzept';menu.append(button);} });
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
  renderGrounds(summary,state);
  const days = daysUntil(EVENT_DATE,today);
  const deadline = summary.deadlines[0];
  const phaseTotals = data.map(phase => {
    const rows = summary.tasks.filter(task => task.phaseId === phase.id);
    const complete = rows.filter(task => task.done || task.status === 'done').length;
    return {...phase,total:rows.length,complete,percent:rows.length ? Math.round(complete/rows.length*100) : 0};
  });
  const list = (rows,format,missing) => rows.length ? rows.slice(0,4).map(format).join('') : empty(missing);
  const important = [...recordsLocal(state.pins).map(row=>({...row,view:'pins',label:'Pin'})),...recordsLocal(state.decisions).filter(row=>row.pinned).map(row=>({...row,view:'decisions',label:'Beschluss'})),...recordsLocal(state.documents).filter(row=>row.pinned).map(row=>({...row,view:'documents',label:'Dokument'}))].sort((a,b)=>(b.ts||0)-(a.ts||0));
  const optionalPlanned=optionalAssets(state.assets).reduce((sum,row)=>sum+Number(row.planned||0),0);
  const transportPending=summary.tasks.find(row=>row.key==='grounds_transport' && !row.done && row.status!=='done');
  target.innerHTML = `<section class="milestone-board"><div class="section-caption"><h3>Harte Meilensteine</h3><span>Damit am Eventtag nicht mehr gebaut wird</span></div><div class="milestone-grid">${projectMilestones.map(item=>{const task=summary.tasks.find(row=>row.key===item.id);const done=task&&(task.done||task.status==="done");return `<button class="milestone ${done?"complete":""}" data-go="tasks" data-record="${esc(item.id)}"><time>${esc(item.date)}</time><strong>${esc(item.title)}</strong><span>${done?"Erledigt":"Offen"}</span></button>`;}).join("")}</div></section><div class="command-grid">
    <section class="command-progress"><p class="folio-label">Gesamtfortschritt</p><div class="progress-number">${summary.percent}<span>%</span></div><div class="codex-meter" role="progressbar" aria-label="Gesamtfortschritt" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${summary.percent}"><i style="width:${summary.percent}%"></i></div><p>${summary.done.length} von ${summary.total} Aufgaben erledigt</p><div class="progress-alerts"><span>${summary.blocked.length} blockiert</span><span>${summary.overdue.length} überfällig</span></div></section>
    <section class="command-countdown"><p class="folio-label">${days < 0 ? 'Seit dem Fest' : days === 0 ? 'Heute ist es so weit' : 'Bis zum Fest'}</p><strong>${Math.abs(days)}</strong><span>Tage</span><p>Samstag, 29. Mai 2027</p></section>
    <section class="command-focus"><p class="folio-label">Aktueller Fokus</p><h3>${esc(summary.focus?.title || (transportPending?'Transportzusage abwarten':'Den nächsten Schritt bestimmen'))}</h3><p>${esc(summary.focus?.text || (transportPending?'Zugfahrzeug und Fahrer sind noch nicht zugesagt. Danach Vermieter und Abholzeit bestätigen.':'Ein Pin mit der Kategorie „Fokus“ macht die gemeinsame Priorität hier sichtbar.'))}</p>${transportPending?rowLink('Grünschnitt · Transport offen','Aktueller Blocker','tasks','grounds_transport'):''}<button class="text-link" data-go="pins">Fokus & Hinweise ↗</button></section>
    <section class="command-deadline"><p class="folio-label">Nächste Deadline</p>${deadline ? `<strong class="deadline-date">${date(deadline.due)}${deadline.due < today ? ' · überfällig' : ''}</strong>${rowLink(deadline.title,deadline.kind,deadline.view,deadline.key)}` : empty('Keine offenen Fristen eingetragen.')}</section>
  </div>
  <div class="budget-ribbon"><div><p class="folio-label">Kernbudget</p><strong>${euro(summary.budget.planned)} <span>/ ${euro(CAP)} Obergrenze</span></strong></div><div><small>Bereits ausgegeben</small><strong>${euro(summary.budget.actual)}</strong></div><div><small>Prognose Kern</small><strong>${euro(summary.budget.actual + summary.budget.remaining)}</strong></div><div><small>Optionen separat</small><strong>${euro(optionalPlanned)}</strong></div><div><small>Reserve</small><strong class="${summary.budget.buffer < 0 ? 'negative' : ''}">${euro(summary.budget.buffer)}</strong></div><button class="text-link" data-go="budget">${summary.budget.unpriced} Kernposten ohne Preis · Budget öffnen ↗</button></div>
  <section class="project-phases"><div class="section-caption"><h3>Der Weg zum Fest</h3><span>8 Phasen · ein gemeinsames Ziel</span></div><div class="phase-track">${phaseTotals.map((phase,i)=>`<button data-go="tasks" data-phase="${phase.id}" class="phase-step ${phase.percent===100?'complete':''}"><span class="phase-index">${String(i+1).padStart(2,'0')}</span><strong>${esc(phase.subtitle)}</strong><span>${esc(phase.title)}</span><i><b style="width:${phase.percent}%"></b></i><small>${phase.complete} / ${phase.total}</small></button>`).join('')}</div></section>
  <div class="command-lists"><section><div class="section-caption"><h3>Noch zu entscheiden</h3><span>${summary.decisions.length} offen</span></div>${list(summary.decisions,row=>rowLink(row.item,row.next || row.area,'assets',row.key,true),'Keine offenen Ausstattungsentscheidungen.')}${list(summary.blocked,row=>rowLink(row.text,'Blockierte Aufgabe','tasks',row.key),'')}<button class="text-link" data-go="decisions">Beschlüsse lesen ↗</button></section>
  <section><div class="section-caption"><h3>Beschaffung im Blick</h3><button class="text-link" data-go="assets">Alle ↗</button></div>${list(summary.procurement,row=>rowLink(row.item,`${row.status} · ${row.due ? date(row.due) : row.next || row.area}`,'assets',row.key,true),'Keine aktive Beschaffung offen.')}</section>
  <section><div class="section-caption"><h3>Zuletzt abgeschlossen</h3><span>Aufgaben</span></div>${list(summary.recent,row=>rowLink(row.text,`${row.by || 'Erledigt'} · ${new Date(row.at).toLocaleDateString('de-DE')}`,'tasks',row.key),'Noch keine Abschlüsse mit Datum vorhanden.')}</section>
  <section><div class="section-caption"><h3>Am Rand vermerkt</h3><button class="text-link" data-go="pins">Alle Pins ↗</button></div>${list(important,row=>rowLink(row.title,`${row.label} · ${row.text || row.note || row.category || ''}`,row.view),'Wichtige Hinweise und Dokumente erscheinen hier.')}</section></div>`;
}
function recordsLocal(value) { return Object.values(value || {}).filter(row => row && typeof row==='object'); }

function renderGrounds(summary,state) {
  const target=document.getElementById('groundsView'); if(!target)return;
  const ids=new Set(groundsTasks.filter(task=>!['grounds_sanitary','grounds_spring'].includes(task.id)).map(task=>task.id));
  const tasks=summary.tasks.filter(task=>ids.has(task.key) || task.tag==='Gelände & Grünschnitt');
  const done=tasks.filter(task=>task.done||task.status==='done').length;
  const taskRows=tasks.map(task=>rowLink(task.text,`${task.done||task.status==='done'?'Erledigt':task.status||'Offen'}${task.responsible?' · '+task.responsible:''}`,'tasks',task.key)).join('');
  const keys=['grounds_machines','grounds_fuel','grounds_shopping','grounds_food','grounds_transport'];
  const costs=keys.map(key=>({key,...(state.assets?.[key]||{})}));
  const costRows=costs.map(row=>`<button class="grounds-cost" data-go="assets" data-record="${esc(row.key)}"><span>${esc(row.item||row.key)}</span><strong>${row.key==='grounds_transport' && row.status==='Offen'?'offen':euro(row.planned||0)}</strong><small>Ist: ${euro(row.actual||0)}</small></button>`).join('');
  const linked=id=>{const row=tasks.find(task=>task.key==='grounds_'+id);return row?rowLink(row.text,row.done||row.status==='done'?'Erledigt':row.status||'Offen','tasks',row.key):'';};
  const day=(title,description,items)=>`<article class="grounds-card"><h3>${title}</h3><p>${description}</p><ul>${items.map(item=>`<li>${esc(item)}</li>`).join('')}</ul></article>`;
  const firstDone=tasks.find(task=>task.key==='grounds_first_cut')?.done||tasks.find(task=>task.key==='grounds_first_cut')?.status==='done';
  const transport=tasks.find(task=>task.key==='grounds_transport');
  const transportDone=transport?.done||transport?.status==='done';
  target.innerHTML=`<div class="codex-page-heading"><p class="folio-label">Projekt / Gelände & Infrastruktur</p><h2>Erster großer Grünschnitt</h2><p>Oktober 2026 · Grundfreilegung des Grundstücks. Ziel nach dem Wochenende: <strong>Grundfreilegung abgeschlossen</strong>. Feinschnitt und Nacharbeiten folgen im Winter; das Gelände gilt damit noch nicht als fertig.</p><span class="grounds-chip">${firstDone?'Grundfreilegung abgeschlossen':'Grundfreilegung geplant'}</span> <span class="grounds-chip">4–5 Helfer</span> <span class="grounds-chip">Samstag + Sonntag</span> <span class="grounds-chip">850 € Budgetrahmen</span></div>
  <div class="grounds-grid"><article class="grounds-card"><h3>${transportDone?'Transport bestätigt':'Aktueller Blocker'}</h3><p>${transportDone?'Zugfahrzeug und Fahrer sind als Aufgabe bestätigt. Jetzt Vermieter, Abholzeit und Rückgabe finalisieren.':'<strong>Transportzusage für Zugfahrzeug und Fahrer abwarten.</strong> Anhänger und Zurrgurte sind vorhanden. Danach Vermieter bestätigen sowie Abholzeit und Rückgabe festlegen.'}</p>${linked('transport')}${linked('machines')}</article>
  <article class="grounds-card"><h3>Schon entschieden</h3><span class="grounds-chip">Maschinen geklärt</span><span class="grounds-chip">Helfer grundsätzlich geklärt</span><span class="grounds-chip">Arbeitsziel geklärt</span><span class="grounds-chip">Schnittgut geklärt</span><span class="grounds-chip">Wetterregel geklärt</span><p>1 Gestrüppmäher, 2 gemietete Freischneider; ein weiterer Freischneider aus dem Freundeskreis ist voraussichtlich verfügbar. Wechselnde Rollen, Dixi-Nutzung und Werkzeugbestand sind grundsätzlich geklärt. PSA der Helfer wird noch abgefragt.</p></article>
  <article class="grounds-card"><h3>Ziel & Fortschritt</h3><p><strong>Einfahrt, Eventfläche, Campingfläche und nötige Verbindungswege</strong> müssen wieder vollständig zugänglich und begehbar sein. Keine fertige Eventfläche und kein Feinschnitt.</p><p>${done} von ${tasks.length} zentralen Aufgaben erledigt.</p><details><summary>Alle Grünschnitt-Aufgaben</summary>${taskRows}</details></article></div>
  <h3 class="grounds-heading">Was muss wann passieren?</h3><div class="grounds-grid"><article class="grounds-card"><h3>Sofort / etwa eine Woche vorher</h3>${linked('transport')}${linked('machines')}${linked('ppe')}${linked('tools')}${linked('food')}${linked('shopping')}</article><article class="grounds-card"><h3>Donnerstag</h3><p>Wetter, Helfer, Transport, Maschinenabholung und Einkaufsliste final prüfen. Normale kurze Schauer sind kein automatischer Absagegrund.</p>${linked('friday')}</article><article class="grounds-card"><h3>Samstagmorgen</h3><p>Maschinen abholen; Kraftstoffart, Tank, Bedienung, Verschleißmaterial und Vorschäden prüfen. Danach Kraftstoff, Lebensmittel und Trinkwasser besorgen. Dixi reinigen, Arbeitsbereiche und Gefahren gemeinsam prüfen.</p>${linked('saturday')}${linked('dixi')}</article></div>
  <h3 class="grounds-heading">Arbeitsablauf</h3><div class="grounds-grid">${day('Grundfreilegung','Reihenfolge nach Zugang und Nutzung.', ['1. Einfahrt freischneiden','2. Grundstückszugang herstellen','3. Eventfläche freilegen','4. Campingfläche freilegen','5. Verbindungswege freilegen','6. Störende Vegetation zurücknehmen','7. Schnittgut aus Nutzungsflächen räumen','8. Gelände gemeinsam kontrollieren'])}${day('Team im Wechsel','Keine festen dauerhaften Rollen.', ['1 Person am Gestrüppmäher','2 Personen an gemieteten Freischneidern','Optional zeitweise dritter Freischneider eines Freundes','Übrige Helfer räumen; regelmäßig zwischen Maschinen und Räumen wechseln'])}${day('Sonntag','Grundfreilegung fortsetzen, falls sie Samstag noch nicht geschafft wurde.', ['Nutzungsflächen vollständig begehbar machen','Schnittgut außerhalb der Nutzungsflächen sammeln','Ergebnis kontrollieren und fotografieren','Offene Nacharbeiten für Wintertermin festhalten'])}</div>
  <h3 class="grounds-heading">Mitbringen & versorgen</h3><div class="grounds-grid"><article class="grounds-card"><h3>Vorhanden / organisiert</h3><p>Besen, Rechen, Gabeln, Astscheren, Handsäge, Anhänger, Zurrgurte und Benzinkanister. Gehörschutz und Schutzbrille / Gesichtsschutz sind organisiert.</p><p>Erste-Hilfe-Kasten und Zeckenzange werden mitgebracht. Schnittgut bleibt auf dem Grundstück, in Haufen außerhalb der Nutzungsflächen; Position vor Ort entscheiden. Gras, Brombeeren / Gestrüpp und Holz bei Bedarf grob trennen.</p></article><article class="grounds-card"><h3>Noch mitbringen / prüfen</h3><p>Helfer: feste Schuhe, Handschuhe und lange robuste Kleidung. Fehlende PSA nach kurzer Abfrage kaufen. Müllsäcke nur für Abfall und Dixi; Gartensäcke oder Plane bei Bedarf für Schnittgut.</p><p>Trinkwasser separat mitbringen: Die Quelle ist kein eingeplantes Trinkwasser, allenfalls Brauchwasser.</p></article><article class="grounds-card"><h3>Verpflegung & Sanitär</h3><p>Samstagmorgen Brötchen, passende vegane Beläge, Obst, Snacks und ausreichend Flaschenwasser kaufen; Elektrolytgetränke bei Bedarf. Abends Pizza oder vorbereitetes Essen. Budget 70–100 €.</p><p>Vor Arbeitsbeginn Dixi innen reinigen, Papier, Reinigungsmittel und Handschuhe bereitlegen sowie Handreinigung ermöglichen. Sanitär für das Event 2027 bleibt eine separate Planung.</p></article></div>
  <h3 class="grounds-heading">Kosten · zentrale Budgetposten</h3><div class="grounds-card"><p>Bisheriger Planrahmen ohne bezahlten Transport: 706–806 €. Die Reserve von ${euro(FIRST_CUT_RESERVE)} wird nicht zusätzlich zu den Einzelposten summiert. Transportkosten bleiben offen, bis Zugfahrzeug und Fahrer zugesagt haben.</p><div class="grounds-costs">${costRows}</div><button class="text-link" data-go="budget">Gesamtbudget öffnen ↗</button></div>
  <h3 class="grounds-heading">Nach dem Grünschnitt</h3><div class="grounds-grid grounds-next"><article class="grounds-card"><h3>Ergebnis & Geländeplan</h3><p>Fotografisch dokumentieren, Nacharbeiten festhalten und Einfahrt, Wege, Event- und Campingfläche beurteilen. Danach Baldachinposition, Turnierflächen, Küche / Essbereich, Sanitär und Ritualfläche prüfen. Erst darauf den Geländeplan aktualisieren.</p>${linked('review')}</article><article class="grounds-card"><h3>Wintertermin · Januar / Februar 2027</h3><p>Feinschliff und Nacharbeiten nach Ergebnis des Wochenendes. Vermessung und 3D-Modell folgen, sobald die Fläche ausreichend geöffnet ist.</p>${linked('measure')}${linked('photos')}${linked('second_cut')}</article></div>`;
}

