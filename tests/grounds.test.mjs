import test from 'node:test';
import assert from 'node:assert/strict';
import {groundsTasks,groundsAssets,groundsSeedPatch,GROUNDS_VERSION,integrateGrounds} from '../js/grounds-plan.mjs';
import {budgetSummary} from '../js/hub-model.mjs';
test('Grounds initialization preserves existing rows, is repeatable, and never restores deletions after migration',()=>{
 const old={grounds_machines:{planned:470,actual:430,note:'Angebot bestätigt',extra:true},other:{planned:50}};
 const before=structuredClone(old),patch=groundsSeedPatch(old,null);
 assert.deepEqual(old,before);assert.equal(patch['assets/grounds_machines'],undefined);
 assert.equal(Object.keys(patch).length,6);
 assert.deepEqual(groundsSeedPatch({},GROUNDS_VERSION),{});
});
test('Budget counts single costs only, including optional sanitation; frames are not costs',()=>{
 const summary=budgetSummary(groundsAssets);
 assert.equal(summary.planned,1355);assert.equal(summary.actual,0);assert.equal(summary.unpriced,1);
 const cut=Object.entries(groundsAssets).filter(([key])=>!['grounds_sanitary','grounds_care'].includes(key)).map(([,row])=>row);
 assert.equal(cut.reduce((n,r)=>n+r.rangeMin,0),625);assert.equal(cut.reduce((n,r)=>n+r.rangeMax,0),855);
 assert.equal(groundsAssets.grounds_sanitary.status,'Angebote prüfen');
});
test('Ground tasks are distributed by their actual dates without changing existing categories',()=>{
 const phases=['phase2','phase3','phase4','phase6'].map(id=>({id,categories:[{title:'Bisher',tasks:[{id:`old_${id}`,text:'Erhalten'}]},{title:'Freie Aufgaben',tasks:[]}]}));
 const before=structuredClone(phases);integrateGrounds(phases);integrateGrounds(phases);
 phases.forEach((phase,index)=>assert.deepEqual(phase.categories.slice(0,2),before[index].categories));
 assert.deepEqual(phases.map(p=>p.categories.find(c=>c.groundsPlan).tasks.length),[12,3,2,1]);
 assert.equal(groundsTasks.length,18);assert.equal(new Set(groundsTasks.map(t=>t.id)).size,18);
 for(const task of groundsTasks){const ids=task.sections.flatMap(section=>section.items.map(item=>item.id));assert.equal(new Set(ids).size,ids.length);}
});