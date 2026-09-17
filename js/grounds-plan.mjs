// Shared planning content; operational state stays in the existing Firebase collections.
export const GROUNDS_CATEGORY = 'Gelände & Infrastruktur';
export const GROUNDS_FRAME = 1500;
export const FIRST_CUT_RESERVE = 850;
const task = (id, text, timing, hint, sections, prio = 'prio-1', meta = {}) => {
  const {checklistVersion,...fields}=meta;
  return {id:`grounds_${id}`, text, timing, hint, sections:sections.map(([title,items],si)=>({title,items:items.map((text,ii)=>({id:`${checklistVersion||''}s${si}_i${ii}`,text}))})),prio,...fields};
};
export const groundsTasks = [
  task('tools','Werkzeug und Material bereitstellen','Ca. eine Woche vorher','Werkzeug weitgehend vorhanden',[
    ['Mitbringen und ergänzen',['Erste-Hilfe-Kasten prüfen und mitbringen; Zeckenzange einpacken','Müllsäcke für Abfall und Dixi bereitlegen','Gartensäcke oder Plane nur bei Bedarf besorgen']]],'prio-1',{checklistVersion:'v3_',note:'Vorhanden: Besen, Rechen, Gabeln, Astscheren, Handsäge, Zurrgurte und Benzinkanister.'}),
  task('machines','Vermieter nach Transportzusage bestätigen','Sofort nach Transportzusage','Maschinen geklärt · Vermieter wartet auf Transport',[
    ['Verbindlich klären',['Vermieter bestätigen','Abholzeit für Samstagmorgen festlegen','Rückgabemodalitäten bestätigen','Bei Abholung Kraftstoffart, Tankfüllung, Bedienung und Verschleißmaterial prüfen; Vorschäden dokumentieren']]],'prio-1',{checklistVersion:'v3_'}),
  task('transport','Transportzusage des Freundes abwarten','Sofort','Wichtigster Blocker · Zugfahrzeug und Fahrer offen',[
    ['Zusage',['Endgültige Zusage für Zugfahrzeug und Fahrer abwarten']]
  ],'prio-1',{area:'Logistik',planStatus:'blockiert',note:'Geeigneter Anhänger und Zurrgurte vorhanden. Samstagmorgen Maschinen abholen. Vor der Zusage keine weitere Transportlösung einplanen.',checklistVersion:'v3_'}),
  task('friday','Donnerstag final prüfen','Donnerstag vor dem Grünschnitt','Wetterentscheidung und letzte Bestätigungen',[
    ['Finaler Check',['Wetterentscheidung treffen: Verschiebung bei Dauerregen, Gewitter, gefährlichem Wind oder unsicherem Transport / Maschinenbetrieb','Helfer final bestätigen','Transport und Maschinenabholung final prüfen','Einkaufsliste kontrollieren','Normale kurze Regenschauer bedeuten nicht automatisch Absage']]],'prio-1',{checklistVersion:'v3_'}),
  task('shopping','Fehlendes Material und PSA besorgen','Nach PSA-Abfrage, vor dem Einsatz','Nur tatsächliche Lücken kaufen',[
    ['Einkaufsliste prüfen',['Fehlende persönliche Schutzausrüstung nach Helferabfrage kaufen','Müllsäcke, Dixi-Reinigungsmittel und Papier bereitlegen','Gartensäcke oder Plane nur bei Bedarf besorgen','Normale Müllsäcke nicht für große Schnittgutmengen einplanen']]],'prio-1',{checklistVersion:'v3_'}),
  task('ppe','PSA-Abfrage bei allen Helfern durchführen','Ungefähr eine Woche vorher','PSA teilweise geklärt',[
    ['Bei allen Helfern abfragen',['Feste Schuhe','Arbeitshandschuhe','Lange robuste Arbeitskleidung','Fehlende Ausrüstung rechtzeitig für die Einkaufsliste melden','Gehörschutz und Schutzbrille / Gesichtsschutz sind organisiert']]],'prio-1',{checklistVersion:'v3_'}),
  task('dixi','Dixi reinigen','Samstagmorgen vor Arbeitsbeginn','Vorhandenes Dixi für Arbeitseinsatz nutzen',[
    ['Reinigung und Ausstattung',['Innenraum reinigen','Toilettenpapier bereitstellen','Reinigungsmittel und Handschuhe bereitstellen','Handreinigung ermöglichen']]],'prio-1',{checklistVersion:'v3_'}),
  task('food','Helferverpflegung vorbereiten','Ca. eine Woche vorher und Samstagmorgen','Arbeitsverpflegung · 70–100 €',[
    ['Vorbereiten',['Trinkwasserbedarf festlegen; Quelle nicht als Trinkwasser einplanen','Samstagmorgen Brötchen, passende vegane Beläge, Obst und Snacks kaufen','Ausreichend Flaschenwasser kaufen oder mitnehmen; Elektrolytgetränke bei Bedarf','Abends Pizza bestellen oder vorbereitetes Essen nutzen','Sonntag nach tatsächlichem Arbeitsumfang versorgen']]],'prio-1',{checklistVersion:'v3_'}),
  task('first_cut','Erster großer Grünschnitt','Oktober 2026','Komplettes Wochenende · 4–5 Personen',[
    ['Meilenstein',['Grundfreilegung abgeschlossen: Einfahrt, Eventfläche, Campingfläche und nötige Verbindungswege wieder vollständig zugänglich und begehbar. Gelände ist damit noch nicht fertig; Feinschliff folgt im Winter.']]],'prio-1',{checklistVersion:'v3_'}),
  task('saturday','Grünschnitt Samstag','Samstag des Grünschnitt-Wochenendes','Hauptarbeit',[
    ['Samstagmorgen',['Maschinen mit Anhänger abholen; Kraftstoffart und Tankfüllung prüfen, sichtbare Vorschäden dokumentieren','Danach ausreichend Kraftstoff für das Wochenende besorgen; Benzinkanister ist vorhanden','Arbeitsbereiche und Gefahrenstellen gemeinsam prüfen']],
    ['Grundfreilegung in Reihenfolge',['1. Einfahrt freischneiden','2. Zugang vollständig herstellen','3. Eventfläche freilegen','4. Campingfläche freilegen','5. Verbindungswege freilegen','6. Störende Vegetation dort zurücknehmen','7. Schnittgut aus Nutzungsflächen entfernen','8. Gelände gemeinsam kontrollieren']],
    ['Arbeitsweise',['1 Person am Gestrüppmäher, 2 an den gemieteten Freischneidern','Falls verfügbar, zeitweise dritter Freischneider eines Freundes','Übrige Helfer räumen; regelmäßig zwischen Maschinen- und Räumarbeit wechseln','Schnittgut bleibt auf dem Gelände in Haufen außerhalb der Nutzungsflächen; Position vor Ort entscheiden','Grob nach feinem Grünmaterial, Brombeeren / Gestrüpp und gröberem Holz trennen']]],'prio-1',{checklistVersion:'v3_'}),
  task('sunday','Grünschnitt / Nacharbeit Sonntag','Sonntag des Grünschnitt-Wochenendes','Variante nach Samstagergebnis wählen',[
    ['Nach Samstagergebnis',['Falls nötig, Grundfreilegung von Einfahrt, Eventfläche, Campingfläche und Wegen fortsetzen','Schnittgut aus Nutzungsflächen räumen und Gelände gemeinsam kontrollieren','Ergebnis fotografisch dokumentieren und verbleibende Nacharbeiten festhalten','Vermessung und Photogrammetrie erst beginnen, wenn die Fläche ausreichend geöffnet ist']]],'prio-1',{checklistVersion:'v3_'}),
  task('review','Flächen nach Grünschnitt beurteilen','Nach Abschluss des Wochenendes','Geländeplan erst danach finalisieren',[
    ['Flächen prüfen',['Eventfläche und Campingfläche beurteilen','Einfahrt und Wege beurteilen','6 × 6 m Baldachinposition und Turnierflächen prüfen','Küche / Essbereich, Sanitärposition und Ritualfläche prüfen','Offene Nacharbeiten festhalten und Geländeplan anhand der Ergebnisse aktualisieren']]],'prio-1',{checklistVersion:'v3_'}),
  task('measure','Gelände vermessen','Direkt nach erfolgreichem ersten Grünschnitt','20–30 brauchbare Kontrollmaße',[
    ['Kontrollmaße aufnehmen',['Gesamtlänge','Gesamtbreite','Breite an mehreren Querschnitten','Abstand großer Bäume untereinander','Abstand Eingang zu markanten Punkten','Abstand zum Fass','Wegbreiten','Erkennbare Höhenunterschiede','Wichtige freie Flächen','Mehrfach einen 2-m-Zollstock oder anderen bekannten Maßstab sichtbar mitfotografieren']]]),
  task('photos','Photogrammetrie-Fotos aufnehmen','Direkt nach dem ersten Grünschnitt','Originaldateien behalten',[
    ['Aufnahmevorgaben',['Smartphone-Hauptkamera, möglichst 1×','Originalauflösung; kein Digitalzoom','Bilder vorher nicht über WhatsApp oder Ähnliches komprimieren','Ungefähr 100–200 Fotos','Ungefähr alle 1,5–2 m ein Foto','Etwa 70–80 % Überlappung zwischen benachbarten Bildern']],
    ['Aufnahmestruktur',['Kompletter Rundgang entlang des Geländerandes','Zusätzlicher Rundgang bzw. mehrere Linien durch die Mitte','Wichtige Bereiche zusätzlich aus mehreren Richtungen fotografieren']],
    ['Besondere Punkte',['Eingang','Fass','Zentrum','Mögliche Baldachinfläche','Möglicher Ritualbereich','Große Bäume','Baumgruppen','Waldränder','Geländeübergänge','Zusätzlich kontinuierliches Übersichtsvideo aufnehmen']]]),
  task('data','Daten für 3D-Modell sortieren','Nach Vermessung und Fotografie','Empfohlene Ordnerstruktur',[
    ['Ordner',['01_Vorher','02_Nach_Gruenschnitt','03_Photogrammetrie','04_Messungen','05_3D_Modell','06_Eventplanung']]],'prio-2'),
  task('model','3D-Bestandsmodell erstellen','Winter 2026/2027','Projektaufgabe',[
    ['RealityCapture bzw. RealityScan → Blender',['Bilder ausrichten','Punktwolke erzeugen','Mesh erzeugen','Textur erzeugen','Modell anhand realer Kontrollmaße skalieren','Scanfehler entfernen','Unnötige Vegetationsartefakte entfernen','Anschließend in Blender weiterverwenden']]],'prio-2'),
  task('layout','Eventlayout im 3D-Modell planen','Winter 2026/2027','Mehrere maßstäbliche Layoutvarianten',[
    ['Im Modell ergänzen',['Vorhandener 6 × 6 m Baldachin','Weitere Pavillons','Tische','Bänke','Feuerkörbe','Ritualplatz','Wettkampfflächen','Questbrett','Sanitär','Küche / Versorgung','Lagerflächen','Laufwege','Beleuchtung']],
    ['Entscheidung',['Mehrere Layoutvarianten vergleichen','Erst danach entscheiden, welche Vegetation beim zweiten Grünschnitt zusätzlich entfernt werden muss']]],'prio-2'),
  task('second_cut','Zweiten Pflegetermin planen','Januar / Februar 2027','Nach Bedarf · erst nach Auswertung von Grünschnitt und 3D-Modell konkretisieren',[
    ['Mögliche Arbeiten',['Erneut ausgetriebene Brombeeren entfernen','Gezielt weitere Bereiche öffnen','Problematische Gehölze bearbeiten','Wege verbreitern','Eventflächen genauer vorbereiten']]],'prio-2'),
  task('spring','Frühjahrspflege','April / Mai 2027','Nur leichte Pflege',[
    ['Laufend bis zum Aufbau',['Gras mähen','Brombeertriebe kleinhalten','Laufwege freihalten','Stolperstellen beseitigen','Flächen für Aufbau vorbereiten','Kein erneuter großer Rodungseinsatz kurz vor dem Event']]],'prio-2'),
  task('sanitary','Endgültige Sanitärlösung für das Hauptevent festlegen','Bis zur Sanitärentscheidung für den 29.05.2027','MUSS · vergleichen und reservieren',[
    ['Umsetzung',['Angebote vergleichen','Toilettenwagen beziehungsweise geeignete Lösung reservieren','Anlieferung und Abholung klären','Handwaschmöglichkeit sicherstellen','Beleuchtung und Verbrauchsmaterial organisieren','Vorhandenes Dixi bleibt nur für Arbeitseinsätze bestehen']]],'prio-1')
];

const groundsBudgetLinks={grounds_machines:['grounds_machines'],grounds_transport:['grounds_machines'],grounds_shopping:['grounds_shopping'],grounds_dixi:['grounds_dixi'],grounds_food:['grounds_food'],grounds_sanitary:['grounds_sanitary']};
groundsTasks.forEach(item=>{item.tag='Gelände & Grünschnitt';if(groundsBudgetLinks[item.id])item.budgetKeys=groundsBudgetLinks[item.id];});

const GROUNDS_PHASES = {
  phase2:['tools','machines','transport','friday','shopping','ppe','dixi','food','first_cut','saturday','sunday','review','measure','photos'],
  phase3:['data','model','layout'],
  phase4:['second_cut','sanitary'],
  phase6:['spring']
};
export function integrateGrounds(phases) {
  for (const [phaseId, ids] of Object.entries(GROUNDS_PHASES)) {
    const phase = phases.find(p=>p.id===phaseId);
    if (!phase || phase.categories.some(c=>c.groundsPlan===true)) continue;
    const freeIndex=phase.categories.findIndex(c=>c.title.includes('Freie Zusatzaufgaben'));
    phase.categories.splice(freeIndex<0?phase.categories.length:freeIndex,0,{title:'🌿 Gelände & Grünschnitt',groundsPlan:true,tasks:ids.map(id=>groundsTasks.find(t=>t.id==='grounds_'+id)).filter(Boolean)});
  }
}
export const groundsMilestones = [
  ['Oktober 2026',['first_cut']],
  ['Direkt danach',['review','measure','photos']],
  ['Winter 2026/2027',['model','layout']],
  ['Januar / Februar 2027',['second_cut']],
  ['April / Mai 2027',['spring']]
].map(([time,ids])=>({time,tasks:ids.map(id=>groundsTasks.find(t=>t.id===`grounds_${id}`))}));

const cost = (item, min, max, type, status, next, note) => ({area:GROUNDS_CATEGORY,item,planned:max,actual:0,rangeMin:min,rangeMax:max,type,status,next,note,source:'noch offen',qty:'',due:''});
export const groundsAssets = {
  grounds_machines:cost('Grünschnitt · Maschinenmiete',496,496,'Mieten','Wartet auf Transportzusage','Nach Transportzusage Vermieter bestätigen','Angebot: 1 Gestrüppmäher und 2 Freischneider für Samstag und Sonntag. 496 € Mietpreis aus bisherigem Angebot; Vermieter noch nicht verbindlich bestätigt.'),
  grounds_fuel:cost('Grünschnitt · Kraftstoff',30,50,'Verbrauch','Geplant','Nach Maschinenabholung kaufen','Vorhandener Benzinkanister; Kraftstoffart und Tankregelung beim Vermieter prüfen. Planwert.'),
  grounds_transport:cost('Grünschnitt · Transport',0,0,'Mieten','Offen','Zusage für Zugfahrzeug und Fahrer abwarten','Geeigneter Anhänger und Zurrgurte vorhanden. Kein fester 0-€-Betrag, bis die Zusage vorliegt.'),
  grounds_shopping:cost('Grünschnitt · Baumarkt / PSA / Dixi-Verbrauch',110,160,'Verbrauch','Geplant','Nur fehlendes Material nach PSA-Abfrage kaufen','Bisheriger Planrahmen vor Rabatt; Dixi-Reinigung enthalten. Vorhandene Ausrüstung nicht erneut kaufen.'),
  grounds_food:cost('Grünschnitt · Helferverpflegung',70,100,'Verbrauch','Geplant','Samstagmorgen Lebensmittel und Trinkwasser besorgen','Für 4–5 Personen; abends Pizza oder vorbereitetes Essen. Kein Trinkwasser aus der Quelle.'),
  grounds_sanitary:cost('Hauptevent · Toilettenwagen',500,500,'Mieten','Zu reservieren','Verfügbarkeit und Lieferbedingungen prüfen; anschließend reservieren','Notwendige Sanitärposition für den 29.05.2027. Vorhandenes Dixi bleibt nur für Arbeitseinsätze bestehen.'),
  grounds_care:cost('Spätere Geländepflege',0,0,'Verbrauch','Später organisieren','Nach erstem Grünschnitt und 3D-Planung kalkulieren','Kosten noch offen; keine Kostenzusage.')
};
export const GROUNDS_VERSION = '2026-09-17-first-cut-v4';
// Only missing records are added. A marker prevents deleted rows being reintroduced.
export function groundsSeedPatch(existing, version) {
  if (version === GROUNDS_VERSION) return {};
  const patch = {};
  for (const [key,row] of Object.entries(groundsAssets)) {
    const previous=existing?.[key];
    if (!previous) patch[`assets/${key}`]={...row};
    else if (['grounds_machines','grounds_fuel','grounds_transport','grounds_shopping','grounds_food'].includes(key)) {
      for (const field of ['item','note','next','area']) patch[`assets/${key}/${field}`]=row[field];
      if (['grounds_machines','grounds_shopping','grounds_food'].includes(key)) for (const field of ['planned','rangeMin','rangeMax']) patch[`assets/${key}/${field}`]=row[field];
      if (key==='grounds_machines' && ['Zu reservieren','Angebot vorhanden'].includes(previous.status)) patch[`assets/${key}/status`]='Wartet auf Transportzusage';
      if (key==='grounds_food' && previous.status==='Zu kaufen') patch[`assets/${key}/status`]='Geplant';
    }
  }
  if (existing?.grounds_dixi) {
    patch['assets/grounds_dixi/planned']=0;
    patch['assets/grounds_dixi/archived']=Number(existing.grounds_dixi.actual||0)===0;
    patch['assets/grounds_dixi/note']='Dixi-Reinigung 15–25 € ist im Baumarktposten enthalten; keine zusätzliche Budgetsumme.';
  }
  patch['assetMeta/groundsPlanVersion']=GROUNDS_VERSION;
  return patch;
}
export async function ensureGroundsPlan({get,ref,update,db,dbPath}) {
  const [assets,version] = await Promise.all([get(ref(db,dbPath('assets'))),get(ref(db,dbPath('assetMeta/groundsPlanVersion')))]);
  const patch=groundsSeedPatch(assets.val(),version.val());
  if(Object.keys(patch).length) await update(ref(db,dbPath('')),patch);
}

export const firstCutRange = Object.entries(groundsAssets)
  .filter(([key])=>['grounds_machines','grounds_fuel','grounds_shopping','grounds_food'].includes(key))
  .reduce((sum,[,row])=>({min:sum.min+row.rangeMin,max:sum.max+row.rangeMax}),{min:0,max:0});
