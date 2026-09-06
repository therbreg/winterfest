
import test from 'node:test';
import assert from 'node:assert/strict';
import {overview,budgetSummary,daysUntil,taskModel} from '../js/hub-model.mjs';
const phases=[{id:'phase1',categories:[{title:'Planung',tasks:[{id:'fixed',text:'Bestand prüfen',prio:'prio-1'},{id:'removed',text:'Gelöscht'}]}]}];
test('Joins fixed and custom tasks without counting migration markers or deleted tasks',()=>{
 const state={fixed:{done:true,at:1},removed:{deleted:true},__plan_revision_2026_08_v2:{updatedAt:1},hiddenLegacy:{done:true}};
 const before=JSON.stringify(state);
 assert.deepEqual(taskModel(phases,state,{one:{text:'Zusatz',phaseId:'phase1'}}).map(t=>t.key),['fixed','custom_one']);
 assert.equal(JSON.stringify(state),before);
});
test('Asset budget excludes fallback and archives, keeps optional, never adds budget copies',()=>{
 assert.deepEqual(budgetSummary({one:{planned:650,actual:600,budgetKey:'copy'},fallback:{planned:900,actual:100,status:'Fallback'},archived:{planned:100,archived:true},optional:{planned:50,status:'Optional'},open:{planned:0,type:'Kaufen'}}),{planned:700,actual:600,buffer:3300,remaining:100,unpriced:1});
});
test('Legacy done=true overrides old status for deadlines and recent completions',()=>{
 const result=overview(phases,{tasks:{fixed:{done:true,status:'open',due:'2026-01-01',at:3},removed:{deleted:true}},customTasks:{},assets:{},pins:{}},'2026-09-06');
 assert.equal(result.percent,100);assert.equal(result.overdue.length,0);assert.equal(result.deadlines.length,0);assert.equal(result.recent[0].key,'fixed');
});
test('Calendar countdown is stable across daylight-saving boundaries',()=>{
 assert.equal(daysUntil('2026-03-30','2026-03-28'),2);assert.equal(daysUntil('2027-05-29','2027-05-29'),0);assert.equal(daysUntil('2027-05-29','2027-05-30'),-1);
});
test('Focus and decision projections do not reinterpret existing decisions as open',()=>{
 const result=overview([],{pins:{a:{category:'Fokus',title:'Alt',ts:1},b:{category:'Fokus',title:'Aktuell',ts:2}},assets:{one:{item:'Licht',status:'Offene Entscheidung'},two:{item:'Optional',status:'Optional'}},decisions:{fixed:{title:'Beschlossen'}}});
 assert.equal(result.focus.title,'Aktuell');assert.equal(result.decisions.length,1);assert.equal(result.procurement.length,1);
});

