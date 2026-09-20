import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {groundsTasks,groundsAssets,groundsSeedPatch,GROUNDS_VERSION,integrateGrounds} from '../js/grounds-plan.mjs';
import {budgetSummary} from '../js/hub-model.mjs';
test('Grünschnitt is accepted by the main view switcher',()=>{
 const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
 const valid=html.match(/const valid = (\[[^;]+\]);/);
 assert.ok(valid,'main view allowlist exists');
 assert.ok(JSON.parse(valid[1]).includes('grounds'));
});
test('Grounds initialization preserves existing rows, is repeatable, and never restores deletions after migration',()=>{
 const old={grounds_machines:{planned:470,actual:430,note:'Angebot bestätigt',status:'Reserviert',extra:true},other:{planned:50}};
 const before=structuredClone(old),patch=groundsSeedPatch(old,null);
 assert.deepEqual(old,before);assert.equal(patch['assets/grounds_machines'],undefined);
 assert.equal(patch['assets/grounds_machines/planned'],500);
 assert.equal(patch['assets/grounds_machines/actual'],undefined);
 assert.equal(patch['assets/grounds_machines/status'],undefined);
 assert.equal(patch['assets/grounds_fuel'].planned,50);
 assert.equal(patch['assets/grounds_transport'].planned,0);
 assert.equal(groundsSeedPatch({grounds_machines:{status:'Angebot vorhanden'}},null)['assets/grounds_machines/status'],'Zugesagt / Bestätigung ausstehend');
 assert.deepEqual(groundsSeedPatch({},GROUNDS_VERSION),{});
});
test('Budget counts single necessary costs; frames are not costs',()=>{
 const summary=budgetSummary(groundsAssets);
 assert.equal(summary.planned,1300);assert.equal(summary.actual,0);assert.equal(summary.unpriced,1);
 const cut=Object.entries(groundsAssets).filter(([key])=>!['grounds_sanitary','grounds_care'].includes(key)).map(([,row])=>row);
 assert.equal(cut.reduce((n,r)=>n+r.rangeMin,0),700);assert.equal(cut.reduce((n,r)=>n+r.rangeMax,0),800);
 assert.equal(groundsAssets.grounds_sanitary.status,'Zu reservieren');
});
test('Ground tasks are distributed by their actual dates without changing existing categories',()=>{
 const phases=['phase2','phase3','phase4','phase6'].map(id=>({id,categories:[{title:'Bisher',tasks:[{id:`old_${id}`,text:'Erhalten'}]},{title:'Freie Aufgaben',tasks:[]}]}));
 const before=structuredClone(phases);integrateGrounds(phases);integrateGrounds(phases);
 phases.forEach((phase,index)=>assert.deepEqual(phase.categories.slice(0,2),before[index].categories));
 assert.deepEqual(phases.map(p=>p.categories.find(c=>c.groundsPlan).tasks.length),[16,2,2,1]);
 assert.equal(groundsTasks.length,21);assert.equal(new Set(groundsTasks.map(t=>t.id)).size,21);
 for(const task of groundsTasks){const ids=task.sections.flatMap(section=>section.items.map(item=>item.id));assert.equal(new Set(ids).size,ids.length);}
 const milestone=groundsTasks.find(task=>task.id==='grounds_first_cut');
 assert.equal(milestone.sections.flatMap(section=>section.items).length,1);
 assert.ok(milestone.sections[0].items[0].id.startsWith('v5_'));
 const friday=groundsTasks.find(task=>task.id==='grounds_friday');
 assert.ok(friday.sections[0].items.every(item=>item.id.startsWith('v5_')));
 assert.equal(friday.text,'Freitag: Material und Essen vorbereiten');
 assert.equal(groundsTasks.find(task=>task.id==='grounds_transport').planStatus,'geklärt');
 assert.equal(groundsTasks.find(task=>task.id==='grounds_transport').done,true);
 assert.ok(friday.sections.flatMap(section=>section.items).some(item=>/Pizzaofen/.test(item.text)));
 assert.equal(groundsTasks.find(task=>task.id==='grounds_ppe').text,'PSA-Abfrage bei allen Helfern durchführen');
 assert.ok(groundsTasks.find(task=>task.id==='grounds_review').sections[0].items.some(item=>item.text.includes('Campingfläche')));
 const saturday=groundsTasks.find(task=>task.id==='grounds_saturday');
 assert.ok(saturday.sections.flatMap(section=>section.items).some(item=>item.text.includes('Einfahrt freischneiden')));
 assert.ok(saturday.sections.flatMap(section=>section.items).some(item=>/08:00 Uhr AS 901/.test(item.text)));
});
