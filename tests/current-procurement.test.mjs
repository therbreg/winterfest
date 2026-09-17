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
  decisions:{tent:{title:'Baldachin und Pavillon',text:'650 EUR plus Spritgeld',category:'Zelt',pinned:true,by:'Tim',ts:123,manualField:'bleibt'}}
 };
 const at=path=>path.split('/').filter(Boolean).reduce((value,key)=>value?.[key],data);
 const writes={};
 const get=async path=>({val:()=>at(path)}),ref=(_db,path)=>path,dbPath=path=>path;
 const update=async(root,patch)=>{writes[root]=patch;};
 await ensureCurrentProcurementPlan({get,ref,update,db:{},dbPath});
 assert.equal(writes['assets/baldachin_kauf'].actual,600);
 assert.equal(writes['assets/baldachin_kauf'].budgetClass,undefined);
 assert.ok(writes['assets/baldachin_kauf'].updatedBy.length<=30);
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
 assert.equal(writes['decisions/tent'].by,'Tim');
 assert.equal(writes['decisions/tent'].ts,123);
 assert.equal(writes['meta/budgetCap'],undefined);
 assert.match(writes['decisions/tent'].text,/600 EUR/);
 assert.doesNotMatch(writes['decisions/tent'].text,/650|plus 50|zusätzliches Spritgeld eingeplant/);
});

test('Generated records respect Firebase text limits',async()=>{
 const writes={};
 const get=async()=>({val:()=>({})}),ref=(_db,path)=>path,dbPath=path=>path;
 const update=async(root,patch)=>{writes[root]=patch;};
 await ensureCurrentProcurementPlan({get,ref,update,db:{},dbPath});
 for(const [path,row] of Object.entries(writes)){
  if(path.startsWith('assets/')){assert.ok(row.updatedBy.length<=30,path);assert.ok((row.note||'').length<=700,path);}
  if(path.startsWith('budget/')||path.startsWith('shopping/'))assert.ok((row.note||'').length<=300,path);
 }
});

test('Procurement migration writes individual records and leaves the version marker until last',async()=>{
 const calls=[];
 const get=async()=>({val:()=>({})}),ref=(_db,path)=>path,dbPath=path=>path;
 const update=async(root)=>{calls.push(root);if(root==='assets/grounds_sanitary')throw new Error('PERMISSION_DENIED');};
 await assert.rejects(()=>ensureCurrentProcurementPlan({get,ref,update,db:{},dbPath}),/Firebase-Datensatz "assets\/grounds_sanitary"/);
 assert.deepEqual(calls.slice(0,2),['assets/baldachin_kauf','assets/grounds_sanitary']);
 assert.equal(calls.some(path=>path.startsWith('assetMeta/')),false);
});

test('Current totals include the revised food plan while keeping the photo pillory optional',()=>{
 assert.equal(coreTotal(),3765);
 assert.equal(optionalTotal(),205);
});
