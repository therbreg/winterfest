import test from 'node:test';
import assert from 'node:assert/strict';
import {EVENT_PHASES} from '../js/event-plan.mjs';
import {integrateFood,FOOD_TASKS} from '../js/food-plan.mjs';
test('Food plan replaces obsolete meals and links every dated milestone to a unique central task',()=>{
 const phases=structuredClone(EVENT_PHASES);integrateFood(phases);
 const tasks=phases.flatMap(p=>p.categories.flatMap(c=>c.tasks));
 const ids=tasks.map(t=>t.id);
 assert.equal(new Set(ids).size,ids.length);
 for(const food of FOOD_TASKS){const task=tasks.find(t=>t.id===food.id);assert.ok(task,food.id);assert.equal(task.due,food.due);assert.equal(task.area,'Verpflegung');}
 assert.ok(!tasks.some(t=>/Stewed Capon|Grillergänzung|Seitan-Pilz-Pies|Fleischmenge/i.test(t.text)));
 assert.ok(!tasks.some(t=>t.id==='finalize_grill_supplement'));
});
