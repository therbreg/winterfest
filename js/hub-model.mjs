// Read-only projections. Existing Firebase keys and records remain authoritative.
export const EVENT_DATE = '2027-05-29';
export const CAP = 4000;
export const completeAsset = row => ['Vorhanden', 'Gekauft', 'Erledigt'].includes(row.status);
export const doneTask = row => row.done === true || row.status === 'done';
export const records = data => Object.entries(data || {}).filter(([, row]) => row && typeof row === 'object').map(([key, row]) => ({...row, key}));
export const activeAssets = data => records(data).filter(row => !row.archived && row.status !== 'Fallback' && row.key !== 'spirit' && !/vendera|mittelalter-zelt.*baldachin/i.test([row.item, row.source].join(' ')));
export function budgetSummary(data) {
  const rows = activeAssets(data);
  const money = value => Number.isFinite(Number(value)) ? Number(value) : 0;
  const planned = rows.reduce((sum, row) => sum + money(row.planned), 0);
  const actual = rows.reduce((sum, row) => sum + money(row.actual), 0);
  return {planned, actual, buffer: CAP - planned, remaining: rows.reduce((sum, row) => sum + Math.max(money(row.planned) - money(row.actual), 0), 0),
    unpriced: rows.filter(row => !completeAsset(row) && row.status !== 'Optional' && !['DIY', 'Entscheidung'].includes(row.type) && money(row.planned) === 0).length};
}
export function taskModel(phases, state = {}, custom = {}) {
  const tasks = [];
  for (const phase of phases) {
    phase.categories.forEach((category, ci) => {
      category.tasks.forEach((task, ti) => {
        const key = task.id || `${phase.id}_c${ci}_t${ti}`;
        if (!state[key]?.deleted) tasks.push({...task, ...state[key], key, phaseId: phase.id, category: category.title});
      });
    });
  }
  for (const row of records(custom)) {
    const key = `custom_${row.key}`;
    if (!state[key]?.deleted) tasks.push({...row, ...state[key], key});
  }
  return tasks;
}
export function berlinDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {timeZone:'Europe/Berlin', year:'numeric', month:'2-digit', day:'2-digit'}).formatToParts(now);
  const part = type => parts.find(p => p.type === type).value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}
export function daysUntil(date, today = berlinDate()) {
  return Math.round((Date.parse(`${date}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86400000);
}
export function overview(phases, state, today = berlinDate()) {
  const tasks = taskModel(phases, state.tasks, state.customTasks);
  const open = tasks.filter(row => !doneTask(row));
  const done = tasks.filter(doneTask);
  const assets = activeAssets(state.assets);
  const focus = records(state.pins).filter(row => row.category === 'Fokus').sort((a,b) => (b.updatedAt || b.ts || 0) - (a.updatedAt || a.ts || 0))[0];
  const deadlines = [
    ...open.filter(row => row.due).map(row => ({...row, title:row.text, view:'tasks', kind:'Aufgabe'})),
    ...assets.filter(row => row.due && !completeAsset(row) && row.status !== 'Optional').map(row => ({...row, title:row.item, view:'assets', kind:'Ausstattung'})),
    ...records(state.tentLeads).filter(row => row.followUp && !row.archived && !['Absage','Fallback','Gebucht','Zusage'].includes(row.status)).map(row => ({...row, due:row.followUp, title:row.name, view:'tentleads', kind:'Nachfassen'}))
  ].sort((a,b) => a.due.localeCompare(b.due) || (a.prio === 'prio-1' ? -1 : 1));
  return {tasks, done, total:tasks.length, percent:tasks.length ? Math.round(done.length/tasks.length*100) : 0,
    blocked:open.filter(row => row.status === 'blocked'), overdue:open.filter(row => row.due && row.due < today),
    focus, deadlines, budget:budgetSummary(state.assets),
    decisions:assets.filter(row => row.status === 'Offene Entscheidung'),
    procurement:assets.filter(row => !completeAsset(row) && row.status !== 'Optional').sort((a,b) => (a.due || '9999').localeCompare(b.due || '9999')),
    recent:done.filter(row => row.at).sort((a,b) => b.at - a.at).slice(0,5)};
}
