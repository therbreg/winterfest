
const host=window.top;
host.__fixture ||= {
 tasks:{__plan_revision_2026_08_v2:{updatedAt:1},plan2_gelaende_fotos:{done:true,status:'done',by:'Anna',at:1788645600000},now_lageplan_abgleich:{status:'progress',responsible:'Tim',due:'2026-09-15'},now_dixie_zustand:{status:'blocked',due:'2026-09-10'}},
 customTasks:{one:{text:'Transport für die Abholung abstimmen',phaseId:'phase1',categoryIndex:0,prio:'prio-2',ts:1}},
 assets:{baldachin_kauf:{item:'Eigener Baldachin 6 × 6 m',area:'Zelt & Pavillon',type:'Kaufen',status:'Gewählte Lösung',planned:650,actual:0,qty:'1 Set',source:'Privatkontakt',next:'Abholtermin und Vollständigkeit bestätigen.',budgetKey:'baldachin',shoppingKey:'baldachin',note:'600 € Kaufpreis + 50 € Spritgeld.',unknownField:'preserve-me'},licht:{item:'Beleuchtung für die Wege',area:'Beleuchtung',type:'Kaufen',status:'Offene Entscheidung',planned:60,actual:0,due:'2026-09-18',next:'Lichtpunkte im Lageplan festlegen.'},kruege:{item:'Vier eigene Tonkrüge',area:'Deko',type:'Vorhanden',status:'Gekauft',planned:43,actual:43},oa_bankett:{item:'Bankettsets für 30 Personen',area:'Other Ages',type:'Mieten',status:'Später bestätigen',planned:125,actual:0,qty:'5 Sets',next:'Im Frühjahr final bestätigen.'}},
 budget:{baldachin:{title:'Eigener Baldachin',planned:650,actual:0,paidBy:'',reimbursed:false,note:'Erhaltener Budgeteintrag'}},
 shopping:{baldachin:{item:'Baldachin abholen',category:'Zelt',bought:false,qty:'1',responsible:'Tim'}},
 pins:{focus:{title:'Bestand klären. Käufe vorbereiten.',category:'Fokus',text:'Gelände und vorhandenes Material dokumentieren. Erst prüfen, dann beschaffen.',ts:4},warning:{title:'Ein gemeinsamer Plan',category:'Info',text:'Alle Änderungen hier festhalten.',ts:3}},
 decisions:{tent:{title:'Baldachin und Pavillon',text:'Eigener 6 × 6-m-Baldachin und vorhandener Pavillon bilden die gewählte Lösung.',category:'Zelt',pinned:true,by:'Tim',ts:2}},
 documents:{doc:{title:'Angebot und Lageplan',category:'Gelände',link:'https://example.com/document',note:'Bestehender Link bleibt erhalten.',pinned:true,ts:1}},
 helpers:{one:{role:'Aufbau',person:'Anna',category:'Aufbau',time:'Freitag 10 Uhr',done:false}},
 tentLeads:{one:{name:'Privatkontakt Baldachin',type:'Privatkontakt',status:'Gewählte Lösung',contact:'Bestehender Kontakt',price:650,followUp:'2026-09-20'}},
 comments:{plan2_gelaende_fotos:{one:{user:'Anna',text:'Fotos sind vollständig.',pinned:true,ts:1}}},chat:{one:{user:'Tim',text:'Der nächste Schritt steht fest.',ts:1}}
};
host.__writes ||= [];host.__listeners ||= [];
const database=host.__fixture;
export const getDatabase=()=>database;
export const ref=(db,path)=>({path});
const relative=r=>r.path.split('/').slice(2).filter(Boolean);
const read=r=>relative(r).reduce((v,k)=>v?.[k],database);
const snap=v=>({val:()=>v,exists:()=>v!==null&&v!==undefined});
const versions={'meta/tentPlanVersion':'2026-08-17-v1','assetMeta/finalBudgetPlanVersion':'2026-08-19-final-budget-v3','assetMeta/tentPlanVersion':'2026-08-17-v1','assetMeta/costPlanVersion':'2026-08-17-cost-v2','assetMeta/missingEquipmentVersion':'2026-08-17-missing-v1','assetMeta/seedVersion':'2026-08-14-v1','documents/system_assets_overview':{title:'Existing'}};
export const get=async r=>snap(versions[relative(r).join('/')]??read(r));
export function onValue(r,cb){host.__listeners.push({r,cb});queueMicrotask(()=>cb(snap(read(r))));return()=>{};}
function write(parts,value){let v=database;for(const k of parts.slice(0,-1))v=v[k]??={};if(value===null)delete v[parts.at(-1)];else v[parts.at(-1)]=value;}
export async function update(r,patch){host.__writes.push({path:r.path,patch});for(const [k,v]of Object.entries(patch))write([...relative(r),...k.split('/')],v);for(const l of host.__listeners)l.cb(snap(read(l.r)));}
export async function remove(r){write(relative(r),null);host.__writes.push({path:r.path,remove:true});}
export function push(r,value){const key='test_'+Date.now();const rr={path:r.path+'/'+key,key};if(value)update(rr,value);return rr;}

