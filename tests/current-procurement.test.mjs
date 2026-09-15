import test from 'node:test';
import assert from 'node:assert/strict';
import {coreTotal,optionalTotal,ensureCurrentProcurementPlan} from '../js/current-procurement-plan.mjs';

test('Procurement migration preserves manual actuals, shopping state, notes and timestamps except the fixed Baldachin amount',async()=>{
 const data={
  assetMeta:{},
  assets:{
   baldachin_kauf:{actual:650,note:'Manuelle Baldachinnotiz',budgetKey:'baldBudget',shoppingKey:'baldShop'},
   grounds_sanitary:{actual:123,note:'Rechnung angezahlt',budgetKey:'toiletBudget',shoppingKey:'toiletShop'}
  },
  budget:{baldBudget:{actual:650,note:'Beleg vorhanden',ts:11,by:'Tim'},toiletBudget:{actual:123,note:'Anzahlung',ts:22,by:'Tim'}},
  shopping:{baldShop:{bought:false,note:'Abholung erfolgt',responsible:'Tim',ts:33,by:'Tim'},toiletShop:{bought:true,note:'Schon bestellt',responsible:'Alex',ts:44,by:'Alex'}},
  decisions:{tent:{title:'Zeltkonzept alt',text:'650 EUR plus Spritgeld',manualField:'bleibt'}}
 };
 const at=path=>path.split('/').filter(Boolean).reduce((value,key)=>value?.[key],data);
 const writes={};
 const get=async path=>({val:()=>at(path)}),ref=(_db,path)=>path,dbPath=path=>path;
 const update=async(_root,patch)=>Object.assign(writes,patch);
 await ensureCurrentProcurementPlan({get,ref,update,db:{},dbPath});
 assert.equal(writes['assets/baldachin_kauf'].actual,600);
 assert.equal(writes['budget/baldBudget'].actual,600);
 assert.equal(writes['shopping/baldShop'].bought,true);
 assert.match(writes['assets/baldachin_kauf'].note,/Manuelle Baldachinnotiz/);
 assert.equal(writes['assets/grounds_sanitary'].actual,123);
 assert.equal(writes['budget/toiletBudget'].actual,123);
 assert.equal(writes['budget/toiletBudget'].ts,22);
 assert.equal(writes['shopping/toiletShop'].bought,true);
 assert.equal(writes['shopping/toiletShop'].responsible,'Alex');
 assert.equal(writes['shopping/toiletShop'].ts,44);
 assert.match(writes['shopping/toiletShop'].note,/Schon bestellt/);
 assert.equal(writes['decisions/tent'].manualField,'bleibt');
 assert.match(writes['decisions/tent'].text,/600 EUR/);
 assert.doesNotMatch(writes['decisions/tent'].text,/650|plus 50|zusätzliches Spritgeld eingeplant/);
});

test('Current totals include purchased jugs and kitchen tools while keeping the photo pillory optional',()=>{
 assert.equal(coreTotal(),3915);
 assert.equal(optionalTotal(),205);
});
