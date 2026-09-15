export const PLAN_VERSION='2026-09-14-budget-pack-v9';
const core=(area,item,planned,extra={})=>({area,item,planned,actual:0,status:'Geplant',budgetClass:'core',...extra});
const optional=(area,item,planned,extra={})=>({area,item,planned,actual:0,status:'Optional',budgetClass:'optional',...extra});

export const CURRENT_ASSETS={
  baldachin_kauf:core('Zelt & Pavillon','Eigener Baldachin 6×6 m inkl. Holzgestänge',600,{actual:600,type:'Kaufen',status:'Gekauft',qty:'1 vollständiges Set',source:'Eigenbestand',next:'Vollständigkeit, trockene Lagerung und Transport prüfen',note:'Gewählte Lösung und zentraler Atmosphärenpunkt. Kein zusätzliches Spritgeld eingeplant.'}),
  grounds_sanitary:core('Toilette','Toilettenwagen',500,{type:'Mieten',status:'Zu reservieren',qty:'1',next:'Verfügbarkeit und Lieferbedingungen prüfen, dann sechs bis vier Monate vorher reservieren',note:'Notwendige Sanitärlösung für das Fest.'}),
  grounds_dixi:core('Toilette','Vorhandenes Dixi selbst reinigen',25,{type:'Verbrauch',status:'Zu kaufen',qty:'Reinigungsmaterial und Handseife',next:'Zustand prüfen und Material beschaffen',note:'Auspumpen nur später als offene Bedarfsentscheidung; keine feste Ausgabe.'}),
  grounds_machines:core('Gelände & Grünschnitt','Grünschnitt, Maschinen, Transport und Kraftstoff',550,{type:'Mieten',status:'Zu reservieren'}),
  grounds_shopping:core('Gelände & Grünschnitt','Baumarkt, Schutzkleidung und Verbrauchsmaterial',180,{type:'Verbrauch',status:'Zu kaufen'}),
  grounds_food:core('Gelände & Grünschnitt','Helferverpflegung',100,{type:'Verbrauch',status:'Zu kaufen'}),
  pfosten:core('Gelände','Pfosten und sichtbare Geländeabgrenzung',45,{type:'Kaufen',status:'Zu kaufen',note:'Notwendige Immersions- und Wegeposition.'}),
  reparaturkoffer:core('Logistik','Aufbau-, Reparatur- und Befestigungsmaterial',60,{type:'Kaufen',status:'Zu kaufen'}),
  wasserlogistik:core('Logistik','Wasserlogistik',40,{type:'Kaufen',note:'Kanister sowie Wasser für Reinigung und Handhygiene. Trinkwasser separat abgefüllt; Quellwasser nicht als Trinkwasser.'}),
  lagerboxen:core('Logistik','Lagerung und Behälter',50,{type:'Kaufen',status:'Zu kaufen'}),
  beschilderung:core('Gelände','Beschilderung',25,{type:'DIY',status:'Zu basteln'}),
  brennstoff:core('Essen & Feuer','Feuerholz, Kohle und Anzünder',50,{type:'Verbrauch',status:'Zu kaufen'}),
  brandschutz:core('Sicherheit','Brandschutz',70,{type:'Kaufen',status:'Zu kaufen'}),
  erstehilfe:core('Sicherheit','Erste Hilfe',30,{type:'Kaufen',status:'Zu kaufen'}),
  oa_bankett:core('Other Ages','Fünf Bankett-Sets für 30 Personen',125,{type:'Mieten',status:'Später bestätigen',qty:'5 Sets / 30 Personen',note:'Pro Set sechs Teller, sechs Becher, sechs Suppenschalen, sechs Schnapsbecher und ein Transportkoffer.'}),
  holzbesteck:core('Geschirr','Holz-Einwegbesteck',25,{type:'Verbrauch',status:'Zu kaufen',note:'Keine Essdolche einplanen.'}),
  oa_weinkruege:core('Other Ages','Vier große Weinkrüge',16,{type:'Mieten',status:'Später bestätigen',qty:'4'}),
  oa_garnituren:core('Other Ages','Vier Festzeltgarnituren',40,{type:'Mieten',status:'Später bestätigen',qty:'4'}),
  oa_servierschuesseln:core('Other Ages','Zwei Servierschüsseln',6,{type:'Mieten',status:'Später bestätigen',qty:'2',note:'Keine gemieteten Servierplatten.'}),
  holzbretter:core('Geschirr','Vorhandene Akazienbretter und zusätzliche Holzbretter',20,{type:'Kaufen',note:'Vorhandene Akazienbretter inventarisieren; nur fehlende Holzbretter zukaufen.'}),
  oa_transport:core('Logistik','Other Ages Selbstabholung und Rückgabe',40,{type:'Mieten',status:'Später bestätigen'}),
  oa_jute:core('Other Ages','Miet-Jute-Tischdecken für vier Tische',20,{type:'Mieten',status:'Später bestätigen',qty:'4',note:'Notwendige Standardvariante.'}),
  kruege:core('Geschirr','Vier bereits gekaufte Tonkrüge',43,{actual:43,type:'Vorhanden',status:'Gekauft',qty:'4',note:'Bereits gekauft und als Ist-Kosten im Gesamtbudget berücksichtigt.'}),
  grillwerkzeug:core('Essen & Feuer','Grill- und Küchenwerkzeug',50,{type:'Kaufen',status:'Zu kaufen',qty:'1 Set',note:'Eigenbestand prüfen und nur fehlende Grillzangen, hitzefeste Handschuhe, Messer und Küchenhelfer ergänzen.'}),
  essen_gesamt:core('Essen & Feuer','Eintopf, Ankommensbuffet und Grillergänzung',440,{type:'Verbrauch',note:'Veganer herzhafter Eintopf aus dem 14-Liter-Gusseisenkessel. Ankommensbuffet: selbst gebackenes Sauerteigbrot, Aufstriche, Obst, Trauben, Äpfel und kleine Käseplatte mit veganen und normalen Bestandteilen. Grillergänzung: Kartoffeln, vegane Würstchen/Alternativen und kleine Fleischmenge für 3–4 Personen. Mitgebrachtes und Spenden nicht als sichere Budgetentlastung.'}),
  alchemie:core('Alchemistenstation','Aufbau und zwei Getränkespender',40,{type:'DIY',qty:'2 Spender',note:'Nur roter Hibiskustrank und blauer Butterfly-Pea-Trank. Alkohol, Bier und Wein gehören nicht zur Alchemistenstation.'}),
  zauberflaschen:core('Alchemistenstation','Kleine runde Heiltrankfläschchen mit Korkverschluss',50,{type:'Kaufen',status:'Zu kaufen',qty:'20',note:'Nur einzelne dekorative Etiketten, keine vollständige Etikettierung.'}),
  alchemie_zutaten:core('Alchemistenstation','Zutaten für Hibiskus- und Butterfly-Pea-Trank',35,{type:'Verbrauch',status:'Zu kaufen',note:'Planbereich 30–40 EUR für zwei farbige alkoholfreie Getränke.'}),
  getraenke_gesamt:core('Getränke','Bier, Wein, abgefülltes Wasser und alkoholfreie Getränke',185,{type:'Verbrauch',status:'Zu kaufen',note:'Separate Getränkeversorgung unter dem zweiten Pavillon; Planbereich 180–190 EUR.'}),
  beleuchtung:core('Beleuchtung','Funktionale Beleuchtung und zusätzliche warme LED-/Fackeloptik',100,{type:'Kaufen',note:'Sicherheits- und Arbeitslicht getrennt von warmer Atmosphäre planen.'}),
  stromverteilung:core('Technik','Stromverteilung, Kabel und Kabelsicherung',100,{type:'Kaufen',status:'Geplant',qty:'Fehlbedarf nach Inventur',next:'Kabeltrommeln, Outdoor-Verlängerungen, Verteiler und Kabelbrücken inventarisieren',note:'Notwendiger Planwert für fehlendes Material. Vorhandene Ausstattung zuerst prüfen; Planwert danach gegebenenfalls reduzieren.'}),
  druckmaterial:core('Programm','Programm- und Druckmaterial',40,{type:'Verbrauch',status:'Geplant',qty:'nach finalem Ablauf- und LARP-Plan',next:'Einladungen, Lage- und Ablaufpläne sowie benötigtes Quest- und Kartenmaterial festlegen',note:'Papier, Karton, Druck und nötige Laminierung für Einladungen, Ablauf-/Lagepläne, Questzettel und Schicksalskarten. Gelände-Beschilderung ist separat kalkuliert.'}),
  eingangstor:core('Deko','Modulares Eingangstor und ergänzendes Baumaterial',60,{type:'DIY',status:'Geplant',qty:'Fehlbedarf nach Holz-Inventur',next:'Vorhandenes Holz prüfen, Eingang vermessen und Konstruktion festlegen',note:'Nur fehlende Latten, Farbe, Beschläge und sichere Verankerung kaufen. Pfosten und allgemeines Befestigungsmaterial bleiben separat kalkuliert.'}),
  beschaffungsreserve:core('Reserve','Allgemeine notwendige Beschaffungsreserve',50,{type:'Entscheidung',status:'Geplant',qty:'Budgetpuffer',next:'Nur bei zwingenden kurzfristigen Fehl- oder Ersatzkäufen freigeben',note:'Kein Einkaufsartikel und keine frei verfügbare Deko-Reserve. Ausschließlich für notwendige unvorhergesehene Fehlteile.'}),
  laternen:core('Beleuchtung','Acht vorhandene LED-Laternen',0,{type:'Vorhanden',status:'Vorhanden',qty:'8'}),
  oa_feuerkoerbe:core('Beleuchtung','Feuerkörbe',20,{type:'Mieten',status:'Später bestätigen'}),
  banner_wimpel:core('Deko','Eigenbau-Wimpelketten und Banner',60,{type:'DIY',status:'Zu basteln'}),
  verbrauchsmaterial:core('Verbrauchsmaterial','Servietten, Küchenrolle und Müllmaterial',25,{type:'Verbrauch',status:'Zu kaufen',note:'Große Müllbeutel sind enthalten und werden nicht doppelt berechnet.'}),
  holzwanne:optional('Getränke','Holzwanne als sichtbare Getränkestation',35,{type:'Kaufen',note:'Nur bei Restbudget. Vorhandene Kühlboxen übernehmen die eigentliche Kühlung.'}),
  kuehlung:optional('Getränke','Eis und Kühlmaterial',30,{type:'Verbrauch',note:'Planbereich 25–35 EUR; drei vorhandene Kühlboxen als eigentliche Kühlung.'}),
  stroh:optional('Gelände','Strohballen',30,{type:'Kaufen'}),
  jute_meterware:optional('Deko','Gekaufte Jute-Meterware statt Mietdecken',60,{type:'Kaufen',note:'Planbereich 50–70 EUR; ersetzt bei Auswahl die Mietdecken und wird nicht zusätzlich gerechnet.'}),
  oa_pranger:optional('Other Ages','Fotopranger',50,{type:'Mieten',status:'Optional',qty:'1',note:'Nur bei ausreichendem Restbudget zusammen mit den übrigen Other-Ages-Positionen bestätigen.'})
};

const retired=/vendera|mittelalter[- ]?zelte24|mz24|spanferkel|dixi.*service|essdolch|servierplatten/i;
const supersededKeys=new Set(['schabracken','schabracken_stoff','beinverkleidung','banner','bannermaterial','wimpel','funktionslicht','wettkampf','muell','hygiene','grillgut']);
const mergedNote=(manual,canonical)=>{
  const parts=[manual,canonical].map(value=>String(value||'').trim()).filter(Boolean);
  return [...new Set(parts)].join(' · ');
};
const preservedNumber=(value,fallback=0)=>Number.isFinite(Number(value))?Number(value):fallback;
export const coreTotal=()=>Object.values(CURRENT_ASSETS).filter(x=>x.budgetClass==='core').reduce((s,x)=>s+x.planned,0);
export const optionalTotal=()=>Object.values(CURRENT_ASSETS).filter(x=>x.budgetClass==='optional').reduce((s,x)=>s+x.planned,0);

async function updateByCollection({update,ref,db,dbPath},patch){
  const groups={};
  for(const [path,value] of Object.entries(patch)){
    const [collection,...parts]=path.split('/');
    (groups[collection]||={})[parts.join('/')]=value;
  }
  const order=['assets','budget','shopping','decisions','assetMeta'];
  for(const collection of order){
    const values=groups[collection];
    if(!values)continue;
    try { await update(ref(db,dbPath(collection)),values); }
    catch(error){
      error.message=`Firebase-Bereich "${collection}" konnte nicht gespeichert werden: ${error.message}`;
      throw error;
    }
  }
}

export async function ensureCurrentProcurementPlan({get,ref,update,db,dbPath}){
  const marker=(await get(ref(db,dbPath('assetMeta/currentBudgetPackVersion')))).val();
  if(marker===PLAN_VERSION)return;
  const [assetSnap,budgetSnap,shoppingSnap,decisionSnap]=await Promise.all([get(ref(db,dbPath('assets'))),get(ref(db,dbPath('budget'))),get(ref(db,dbPath('shopping'))),get(ref(db,dbPath('decisions')))]);
  const existing=assetSnap.val()||{}, budgets=budgetSnap.val()||{}, shopping=shoppingSnap.val()||{}, decisions=decisionSnap.val()||{}, patch={}, now=Date.now();
  for(const [key,spec] of Object.entries(CURRENT_ASSETS)){
    const old=existing[key]||{}, budgetKey=old.budgetKey||`plan_${key}`, needsShopping=spec.status!=='Vorhanden'&&!['DIY','Entscheidung'].includes(spec.type);
    const shoppingKey=needsShopping?(old.shoppingKey||`plan_${key}`):old.shoppingKey;
    const assetActual=key==='baldachin_kauf'?600:preservedNumber(old.actual,spec.actual||0);
    const oldBudget=budgets[budgetKey]||{}, budgetActual=key==='baldachin_kauf'?600:preservedNumber(oldBudget.actual,assetActual);
    const oldShopping=shopping[shoppingKey]||{};
    patch[`assets/${key}`]={...old,...spec,actual:assetActual,note:mergedNote(old.note,spec.note),budgetKey,...(shoppingKey?{shoppingKey}:{}),updatedAt:now,updatedBy:'Budget- und Packplan 14.09.2026'};
    patch[`budget/${budgetKey}`]={...oldBudget,title:spec.item,category:spec.area,planned:spec.planned,actual:budgetActual,budgetClass:spec.budgetClass,note:mergedNote(oldBudget.note,spec.note),archived:false,by:oldBudget.by||'System',ts:oldBudget.ts||now,updatedAt:now,updatedBy:'Budget- und Packplan 14.09.2026'};
    if(shoppingKey)patch[`shopping/${shoppingKey}`]={...oldShopping,item:spec.item,qty:spec.qty||oldShopping.qty||'Menge gemäß Planung',category:spec.area,responsible:oldShopping.responsible||'',note:mergedNote(oldShopping.note,spec.note||spec.next),budgetKey,budgetClass:spec.budgetClass,bought:key==='baldachin_kauf'?true:(typeof oldShopping.bought==='boolean'?oldShopping.bought:['Gekauft','Erledigt'].includes(spec.status)),archived:false,by:oldShopping.by||'System',ts:oldShopping.ts||now,updatedAt:now,updatedBy:'Budget- und Packplan 14.09.2026'};
  }
  for(const [key,row] of Object.entries(existing))if(supersededKeys.has(key)||retired.test([key,row.item,row.source,row.note].join(' '))){patch[`assets/${key}/archived`]=true;patch[`assets/${key}/status`]='Verworfen';if(row.budgetKey)patch[`budget/${row.budgetKey}/archived`]=true;if(row.shoppingKey)patch[`shopping/${row.shoppingKey}/archived`]=true;}
  for(const [key,row] of Object.entries(budgets))if(retired.test([key,row.title,row.category,row.note].join(' ')))patch[`budget/${key}/archived`]=true;
  for(const [key,row] of Object.entries(shopping))if(retired.test([key,row.item,row.category,row.note].join(' ')))patch[`shopping/${key}/archived`]=true;
  const decisionKey=Object.entries(decisions).find(([,row])=>/zeltkonzept|baldachin.*pavillon|pavillon.*baldachin/i.test(String(row?.title||'')))?.[0]||'system_zeltkonzept_20260817';
  const oldDecision=decisions[decisionKey]||{};
  patch[`decisions/${decisionKey}`]={...oldDecision,title:'Zeltkonzept final',text:'Gewählte Lösung: eigener 6×6-m-Baldachin inklusive Holzgestänge für 600 EUR, kombiniert mit dem vorhandenen 3×6-m-Pavillon. Kein zusätzliches Spritgeld. Der Baldachin ist gekauft und bildet den zentralen Atmosphärenpunkt; zusätzliche Schabracken-, Vorhang- oder Baldachin-Leihgaben sind keine notwendigen Kosten.',category:oldDecision.category||'Zelt',pinned:typeof oldDecision.pinned==='boolean'?oldDecision.pinned:true,by:oldDecision.by||'System',ts:oldDecision.ts||now,updatedAt:now,updatedBy:'Budget- und Packplan 15.09.2026'};
  patch['assetMeta/currentBudgetPackVersion']=PLAN_VERSION;
  patch['assetMeta/currentBudgetPackUpdatedAt']=now;
  await updateByCollection({update,ref,db,dbPath},patch);
}
