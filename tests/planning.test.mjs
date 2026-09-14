import test from 'node:test';
import assert from 'node:assert/strict';
import {EVENT_PHASES,projectMilestones,replaceEventPlan} from '../js/event-plan.mjs';
import {integrateGrounds} from '../js/grounds-plan.mjs';
test('Plan has stable unique ids, three levels and six visible gates',()=>{
 const phases=[];replaceEventPlan(phases);integrateGrounds(phases);
 const tasks=phases.flatMap(p=>p.categories.flatMap(c=>c.tasks));
 assert.equal(phases.length,8);assert.equal(projectMilestones.length,6);
 assert.equal(new Set(tasks.map(t=>t.id)).size,tasks.length);
 assert.deepEqual(new Set(tasks.map(t=>t.prio)),new Set(['prio-1','prio-2','prio-3']));
 for(const gate of projectMilestones)assert.ok(tasks.some(task=>task.id===gate.id),gate.title);
});
test('Ground work appears in October, winter, Jan/Feb and Apr/May phases only',()=>{
 const phases=structuredClone(EVENT_PHASES);integrateGrounds(phases);
 const placement=Object.fromEntries(phases.flatMap(p=>p.categories.flatMap(c=>c.tasks.filter(t=>t.id.startsWith('grounds_')).map(t=>[t.id,p.id]))));
 assert.equal(placement.grounds_first_cut,'phase2');assert.equal(placement.grounds_model,'phase3');assert.equal(placement.grounds_second_cut,'phase4');assert.equal(placement.grounds_spring,'phase6');
});
test('Obsolete tent procurement and duplicate grounds ids are absent',()=>{
 const ids=EVENT_PHASES.flatMap(p=>p.categories.flatMap(c=>c.tasks.map(t=>t.id)));
 for(const id of ['now_baldachin_preisbeobachtung','oct_suchagenten_start','oct_gebrauchtmarkt','jan_wetterschutz_kaufen','oct_gruenschnitt','oct_gelaende_fotos','plan2_gelaende_maehen'])assert.ok(!ids.includes(id),id);
});