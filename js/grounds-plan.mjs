// Shared planning content; operational state stays in the existing Firebase collections.
export const GROUNDS_CATEGORY = 'Gelände & Infrastruktur';
export const GROUNDS_FRAME = 1500;
export const FIRST_CUT_RESERVE = 850;
const task = (id, text, timing, hint, sections, prio = 'prio-1', meta = {}) => {
  const {checklistVersion,...fields}=meta;
  return {id:`grounds_${id}`, text, timing, hint, sections:sections.map(([title,items],si)=>({title,items:items.map((text,ii)=>({id:`${checklistVersion||''}s${si}_i${ii}`,text}))})),prio,...fields};
};
export const groundsTasks = [
  task('tools','Werkzeugbestand vor Grünschnitt prüfen','Vor dem Einkauf','Offen · Bestand prüfen',[
    ['Vor Ort und bei Freunden prüfen',['ca. 2 Astscheren','ca. 2 Astsägen','ca. 2 große Rechen','1–2 Mist-/Heugabeln','1 Spaten','1–2 Gartenscheren','1 Schubkarre','Axt optional','Besen']],
    ['Beschaffung',['Vorhandene Werkzeuge nutzen; keinen automatischen Neukauf im Budget ansetzen.']]]),
  task('machines','Maschinen reservieren / bestätigen','Vor dem Grünschnitt','Schwamborn-Angebot vorhanden · Bestätigung offen',[
    ['Maschinenpaket',['Schwamborn Landtechnik: AS 901 Schlegelmäher, 150 € pro Tag','2 Freischneider / Trimmer, je 49 € pro Gerät und Tag','Samstag und Sonntag: 2 Miettage, zusammen 496 €','Samstagmorgen abholen, Montagmorgen zurückgeben','Gehörschutz, Visier und weitere vorgeschriebene PSA beim Vermieter prüfen']],
    ['Häcksler',['Aktuell nicht einplanen; erst nach dem ersten Grünschnitt über Bedarf entscheiden.']]]),
  task('transport','Anhänger und Transport verbindlich klären','Spätestens 31. Oktober 2026','Offen · Ergebnis: belastbarer Transportplan',[
    ['Anhänger und Fahrzeug prüfen',['Vorhandenen Anhänger im Freundeskreis verbindlich anfragen','Innenmaße, Nutzlast, Plane, Zurrpunkte und Zustand dokumentieren','Zugfahrzeug, zulässige Anhängelast und passenden Führerschein prüfen','Fahrer sowie Verfügbarkeit für Grünschnitt, Other-Ages-Abholung und Rückgabe klären']],
    ['Ladung und Termine abgleichen',['Eignung für Gestrüppmäher, Freischneider, Betriebsstoffe und Werkzeug prüfen','Other-Ages-Maße berücksichtigen: Bankett-Koffer und Weinkrüge separat und bruchsicher transportieren','Abhol- und Rückgabezeiten mit Fahrzeit, Helfern und Lagerort abstimmen']],
    ['Alternative festhalten',['Falls der Leihanhänger nicht geeignet oder verfügbar ist, Mietanhänger und Transporter vergleichen','Mietpreis, Kaution, Kilometer, Kraftstoff und Versicherungsbedingungen dokumentieren','Gewählte Lösung samt Kosten und verantwortlicher Person festhalten']]
  ],'prio-1',{area:'Logistik',due:'2026-10-31',budgetKey:'grounds_machines',dependencies:['plan2_wetterschutz_inventur'],planStatus:'offen',note:'Deckt frühen Anhängercheck, Maschinentransport und die spätere Other-Ages-Logistik ab.'}),
  task('friday','Freitag vorbereiten','Freitag vor dem Grünschnitt','toom-Einkauf und Logistik',[
    ['Persönliche Vorbereitung',['Handys laden und Ladekabel einpacken','Gegebenenfalls Verlängerungskabel einpacken','Mit Helfer zum toom fahren; Rabattkarte mitnehmen','Vor Abfahrt prüfen, ob Werkzeugbestand, Einkauf, Verpflegung und Transport in ihren jeweiligen Aufgaben erledigt sind','Maschinen erst Samstagmorgen abholen']]],'prio-1',{checklistVersion:'v2_'}),
  task('shopping','Baumarkt-Einkauf','Freitag vor dem Arbeitseinsatz','Zu kaufen · Bestand zuerst prüfen',[
    ['Einkaufsliste',['2 Gewebeplanen à etwa 4 × 5 m: 45,98 €','Brombeerhandschuhe mit langer Stulpe: 15–35 €','3er-Pack Schutzbrillen: ca. 17,99 €','10–15 große Müllsäcke: 8–15 €; nicht für das gesamte Schnittgut','1 Rolle Gewebeklebeband: 7–10 €','Dixi-Reinigung: 15–25 €, im Baumarktbudget enthalten','Absperr-/Flatterband: 5–10 €','Kabelbinder nur falls nicht vorhanden: 3–6 €','Markierspray nur falls sinnvoll','Erste-Hilfe-Set prüfen; nur fehlendes Verbrauchsmaterial nachkaufen','Gehörschutz nur ergänzen, falls nicht enthalten']],
    ['Nicht fest einplanen',['Holzpflöcke derzeit nicht fest einplanen.']]]),
  task('ppe','Persönliche Schutzausrüstung Helfer klären','Vor dem Arbeitseinsatz','Vorher kommunizieren',[
    ['Jeder Helfer bringt möglichst mit',['Robuste lange Hose','Festes Schuhwerk','Langärmliges Oberteil','Arbeitshandschuhe','Regenjacke']],
    ['Maschinenbediener zusätzlich',['Schutzbrille','Visier','Gehörschutz','Sonstige zum Mietgerät gehörende Schutzausrüstung']]]),
  task('dixi','Dixi reinigen','Vor dem Grünschnitt','Vorhandenes Dixi weiter nutzen',[
    ['Reinigung und Ausstattung',['Innenflächen gründlich reinigen','Kontaktflächen desinfizieren','Boden reinigen','Toilettenpapier auffüllen','Müllbeutel einsetzen','Handseife / einfache Handhygienelösung bereitstellen']],
    ['Kapazität prüfen',['Auspumpen aktuell nicht geplant, sofern ausreichend Kapazität vorhanden ist, nichts überläuft und die Nutzung hygienisch vertretbar ist.']]]),
  task('food','Helferverpflegung vorbereiten','Grünschnitt-Wochenende','Arbeitsverpflegung · 4–5 Personen',[
    ['Mitnehmen',['10–12 Brötchen','Veganer Käse','Veganer Aufschnitt','Margarine / Aufstrich','Bananen','Äpfel','10–15 Müsliriegel','Mindestens ca. 12 Liter Wasser','Vorhandene Elektrolytmischung','Optional Softdrinks']],
    ['Mittag und Sonntag',['Pizza bestellen: ca. 4 größere Pizzen für fünf körperlich arbeitende Personen','Sonntag Reste / frische Brötchen; bei erneut vollem Arbeitstag wieder einfache Verpflegung organisieren','Späteres gemeinsames Dankeschön-Essen getrennt von dieser Arbeitsverpflegung planen.']]]),
  task('first_cut','Erster großer Grünschnitt','Oktober 2026','Komplettes Wochenende · 4–5 Personen',[
    ['Meilenstein',['Ersten Arbeitseinsatz abschließen und Ergebnis dokumentieren; Ziele, Tagesablauf und Einzelaufgaben stehen im Bereich Grünschnitt.']]],'prio-1',{checklistVersion:'v2_'}),
  task('saturday','Grünschnitt Samstag','Samstag des Grünschnitt-Wochenendes','Hauptarbeit',[
    ['Samstagmorgen · Abholung',['AS 901 Schlegelmäher und zwei Freischneider bei Schwamborn abholen; danach zum Gelände fahren']],
    ['08:30 · Gemeinsamer Geländerundgang',['Vor Maschinenbetrieb auf Metallteile, Draht, größere Steine, Löcher, Baumstümpfe, Müll und sonstige Gefahren prüfen','Gefahrenstellen markieren']],
    ['Ab ca. 09:00 · Zugänge und Arbeitskorridore',['2 Personen arbeiten mit Freischneidern und öffnen zunächst Zugänge / Arbeitskorridore','1 Person folgt mit Gestrüppmäher','1–2 Personen räumen Schnittgut direkt weg','Gewebeplanen, Rechen, Gabel und Schubkarre nutzen','Nur 2–3 große Sammelstellen statt vieler kleiner Haufen anlegen','Dickes Astholz separat sammeln; krautiges Material separat behandeln']],
    ['Ca. 12:30 · Mittagspause',['Pizza / Pause']],
    ['13:00–ca. 17:30 · Prioritäten in dieser Reihenfolge',['1. Zentrale Eventfläche','2. Hauptwege','3. Mögliche Baldachinfläche','4. Große und relevante Baumgruppen','5. Geländeübergänge','6. Weitere potentielle Eventflächen','Nicht wahllos sämtliche Vegetation entfernen']],
    ['17:30–ca. 18:30 · Abschluss',['Schnittgut ordnen','Maschinen grob reinigen','Werkzeuge sammeln','Ergebnis fotografieren','Restaufwand für Sonntag bewerten']]]),
  task('sunday','Grünschnitt / Nacharbeit Sonntag','Sonntag des Grünschnitt-Wochenendes','Variante nach Samstagergebnis wählen',[
    ['Variante A · Samstag war erfolgreich',['Reststellen nacharbeiten','Störende Brombeerranken entfernen','Wege nacharbeiten','Schnittgut konzentrieren','Gelände vermessen (siehe Vermessungsaufgabe)','Fotos für das 3D-Modell aufnehmen (siehe Fotoaufgabe)']],
    ['Variante B · Samstag reicht nicht',['Zweiter voller Grünschnitttag','Vermessung und Fotografie später oder an separatem Termin']]]),
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
  phase2:['tools','machines','transport','friday','shopping','ppe','dixi','food','first_cut','saturday','sunday','measure','photos'],
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
  ['Direkt danach',['measure','photos']],
  ['Winter 2026/2027',['model','layout']],
  ['Januar / Februar 2027',['second_cut']],
  ['April / Mai 2027',['spring']]
].map(([time,ids])=>({time,tasks:ids.map(id=>groundsTasks.find(t=>t.id===`grounds_${id}`))}));

const cost = (item, min, max, type, status, next, note) => ({area:GROUNDS_CATEGORY,item,planned:max,actual:0,rangeMin:min,rangeMax:max,type,status,next,note,source:'noch offen',qty:'',due:''});
export const groundsAssets = {
  grounds_machines:cost('Grünschnitt · Schwamborn Maschinenmiete',496,496,'Mieten','Angebot vorhanden','Reservierung bestätigen','AS 901: 150 € × 2 Tage = 300 €; zwei Freischneider: 49 € × 2 × 2 Tage = 196 €. Abholung Samstagmorgen, Rückgabe Montagmorgen.'),
  grounds_fuel:cost('Grünschnitt · Kraftstoff',30,50,'Verbrauch','Geplant','Bedarf prüfen','Planwert; tatsächlichen Verbrauch später buchen.'),
  grounds_transport:cost('Grünschnitt · Transport',0,0,'Mieten','Offen','Privaten Anhänger bestätigen','Erst nach Bestätigung als 0 € festhalten; sonst Kosten ergänzen.'),
  grounds_shopping:cost('Grünschnitt · Baumarkt / PSA / Dixi-Verbrauch',110,160,'Verbrauch','Geplant','Freitag zu toom; Bestand vorher prüfen','Planwert vor Rabatt; Dixi-Reinigung 15–25 € darin enthalten. Schuhe und Arbeitshose vorhanden, keine Kaufposition.'),
  grounds_food:cost('Grünschnitt · Helferverpflegung',70,100,'Verbrauch','Zu kaufen','Arbeitsverpflegung vorbereiten','Für 4–5 Personen; späteres Dankeschön-Essen getrennt.'),
  grounds_sanitary:cost('Hauptevent · Toilettenwagen',500,500,'Mieten','Zu reservieren','Verfügbarkeit und Lieferbedingungen prüfen; anschließend reservieren','Notwendige Sanitärposition für den 29.05.2027. Vorhandenes Dixi bleibt nur für Arbeitseinsätze bestehen.'),
  grounds_care:cost('Spätere Geländepflege',0,0,'Verbrauch','Später organisieren','Nach erstem Grünschnitt und 3D-Planung kalkulieren','Kosten noch offen; keine Kostenzusage.')
};
export const GROUNDS_VERSION = '2026-09-17-first-cut-v3';
// Only missing records are added. A marker prevents deleted rows being reintroduced.
export function groundsSeedPatch(existing, version) {
  if (version === GROUNDS_VERSION) return {};
  const patch = {};
  for (const [key,row] of Object.entries(groundsAssets)) {
    const previous=existing?.[key];
    if (!previous) patch[`assets/${key}`]={...row};
    else if (['grounds_machines','grounds_shopping','grounds_food'].includes(key)) {
      for (const field of ['item','planned','rangeMin','rangeMax','note','next','area']) patch[`assets/${key}/${field}`]=row[field];
      if (key==='grounds_machines' && previous.status==='Zu reservieren') patch[`assets/${key}/status`]='Angebot vorhanden';
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
