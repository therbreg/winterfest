// Shared planning content; operational state stays in the existing Firebase collections.
export const GROUNDS_CATEGORY = 'Gelände & Infrastruktur';
export const GROUNDS_FRAME = 1500;
export const FIRST_CUT_RESERVE = 850;
const task = (id, text, timing, hint, sections, prio = 'prio-1') => ({id:`grounds_${id}`, text, timing, hint, sections:sections.map(([title,items],si)=>({title,items:items.map((text,ii)=>({id:`s${si}_i${ii}`,text}))})),prio});
export const groundsTasks = [
  task('tools','Werkzeugbestand prüfen','Vor dem Einkauf','Offen · Bestand prüfen',[
    ['Vor Ort und bei Freunden prüfen',['ca. 2 Astscheren','ca. 2 Astsägen','ca. 2 große Rechen','1–2 Mist-/Heugabeln','1 Spaten','1–2 Gartenscheren','1 Schubkarre','Axt optional','Besen']],
    ['Beschaffung',['Vorhandene Werkzeuge nutzen; keinen automatischen Neukauf im Budget ansetzen.']]]),
  task('machines','Maschinen reservieren','Vor dem Grünschnitt','Zu reservieren',[
    ['Maschinenpaket',['1 Gestrüppmäher','2 starke Freischneider mit Dickichtmesser','Transportanhänger nur bei Bedarf (siehe Transport klären)','Motorsäge nur bei tatsächlichem Bedarf','Kraftstoff und Betriebsstoffe organisieren']],
    ['Häcksler',['Aktuell nicht einplanen; erst nach dem ersten Grünschnitt über Bedarf entscheiden.']]]),
  task('transport','Transport klären','Vor der Reservierung','Offen',[
    ['Prüfen',['Vorhandenen Anhänger aus dem Freundeskreis anfragen','Eignung zum Maschinentransport prüfen','Nur andernfalls Mietanhänger einplanen']]]),
  task('shopping','Baumarkt-Einkauf','Freitag vor dem Arbeitseinsatz','Zu kaufen · Bestand zuerst prüfen',[
    ['Einkaufsliste',['2 große robuste Gewebeplanen, ungefähr 4 × 5 m','10–15 große reißfeste Müllsäcke','Robuste Garten-/Forsthandschuhe; für den Veranstalter Lederhandschuhe mit verlängertem Schaft gegen Brombeeren','Robuste Arbeitshose','Schutzbrille','Gehörschutz, falls nicht bei Mietgeräten vorhanden','1 Rolle Flatterband','1 Dose Markierspray','1 Rolle Gewebeklebeband','Kleine Packung Kabelbinder','Küchenrolle bzw. Werkstattpapier','Feuchttücher','Desinfektionsmittel','Pflaster / Erste-Hilfe-Verbrauchsmaterial','Zeckenzange oder Zeckenkarte, sofern noch nicht vorhanden','Reinigungsmaterial für das vorhandene Dixi (Kosten im separaten Dixi-Posten)','Handseife (Kosten im separaten Dixi-Posten)']],
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
    ['Ziel',['Hauptarbeit möglichst am Samstag schaffen; noch keine perfekte Eventfläche herstellen','Hauptfläche wieder sichtbar und Gelände begehbar machen','Wichtige Wege freilegen','Brombeer- und Gestrüppbewuchs massiv reduzieren','Boden und Geländeform sichtbar machen','Große Bäume und relevante Gehölze freilegen','Mögliche Eventflächen erkennen','Grundlage für Vermessung und 3D-Modell schaffen','Natürliche Wald- und Randvegetation möglichst erhalten, wenn gestalterisch bzw. atmosphärisch sinnvoll']]]),
  task('saturday','Ablauf Samstag','Samstag des Grünschnitt-Wochenendes','Hauptarbeit',[
    ['08:30 · Gemeinsamer Geländerundgang',['Vor Maschinenbetrieb auf Metallteile, Draht, größere Steine, Löcher, Baumstümpfe, Müll und sonstige Gefahren prüfen','Gefahrenstellen markieren']],
    ['Ab ca. 09:00 · Zugänge und Arbeitskorridore',['2 Personen arbeiten mit Freischneidern und öffnen zunächst Zugänge / Arbeitskorridore','1 Person folgt mit Gestrüppmäher','1–2 Personen räumen Schnittgut direkt weg','Gewebeplanen, Rechen, Gabel und Schubkarre nutzen','Nur 2–3 große Sammelstellen statt vieler kleiner Haufen anlegen','Dickes Astholz separat sammeln; krautiges Material separat behandeln']],
    ['Ca. 12:30 · Mittagspause',['Pizza / Pause']],
    ['13:00–ca. 17:30 · Prioritäten in dieser Reihenfolge',['1. Zentrale Eventfläche','2. Hauptwege','3. Mögliche Baldachinfläche','4. Große und relevante Baumgruppen','5. Geländeübergänge','6. Weitere potentielle Eventflächen','Nicht wahllos sämtliche Vegetation entfernen']],
    ['17:30–ca. 18:30 · Abschluss',['Schnittgut ordnen','Maschinen grob reinigen','Werkzeuge sammeln','Ergebnis fotografieren','Restaufwand für Sonntag bewerten']]]),
  task('sunday','Ablauf Sonntag','Sonntag des Grünschnitt-Wochenendes','Variante nach Samstagergebnis wählen',[
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

const GROUNDS_PHASES = {
  phase2:['tools','machines','transport','shopping','ppe','dixi','food','first_cut','saturday','sunday','measure','photos'],
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
  grounds_machines:cost('Grünschnitt · Maschinen / Transport / Kraftstoff',440,550,'Mieten','Zu reservieren','Maschinen reservieren; Transport klären','Gesamtes Wochenende; kein Häcksler eingeplant.'),
  grounds_shopping:cost('Grünschnitt · Baumarkt / PSA / Verbrauchsmaterial',100,180,'Verbrauch','Zu kaufen','Checkliste Baumarkt-Einkauf abarbeiten','Mit zusätzlicher hochwertiger Arbeitskleidung maximal ca. 200 €. Dixi-Material separat; vorhandene Werkzeuge nicht als Neukauf kalkuliert.'),
  grounds_dixi:cost('Grünschnitt · Dixi-Reinigung',15,25,'Verbrauch','Zu kaufen','Vorhandenes Dixi reinigen','Reinigungsmaterial und Handseife aus dem Baumarkt hier abrechnen, nicht zusätzlich im Baumarkt-Posten. Kein Auspumpen eingeplant, solange Kapazität und Hygiene ausreichen.'),
  grounds_food:cost('Grünschnitt · Helferverpflegung',70,100,'Verbrauch','Zu kaufen','Arbeitsverpflegung vorbereiten','Für 4–5 Personen; späteres Dankeschön-Essen getrennt.'),
  grounds_sanitary:cost('Hauptevent · Toilettenwagen (Option)',400,500,'Mieten','Angebote prüfen','Angebote anhand der Sanitär-Aufgabe vergleichen','29.05.2027 · nicht gebucht; keine verbindliche Festlegung. Vorhandenes Dixi bleibt bis zur Entscheidung bestehen.'),
  grounds_care:cost('Spätere Geländepflege',0,0,'Verbrauch','Später organisieren','Nach erstem Grünschnitt und 3D-Planung kalkulieren','Kosten noch offen; keine Kostenzusage.')
};
export const GROUNDS_VERSION = '2026-09-14-v2';
// Only missing records are added. A marker prevents deleted rows being reintroduced.
export function groundsSeedPatch(existing, version) {
  if (version === GROUNDS_VERSION) return {};
  const patch = {};
  for (const [key,row] of Object.entries(groundsAssets)) if (!Object.hasOwn(existing || {},key)) patch[`assets/${key}`]={...row};
  patch['assetMeta/groundsPlanVersion']=GROUNDS_VERSION;
  return patch;
}
export async function ensureGroundsPlan({get,ref,update,db,dbPath}) {
  const [assets,version] = await Promise.all([get(ref(db,dbPath('assets'))),get(ref(db,dbPath('assetMeta/groundsPlanVersion')))]);
  const patch=groundsSeedPatch(assets.val(),version.val());
  if(Object.keys(patch).length) await update(ref(db,dbPath('')),patch);
}

export const firstCutRange = Object.entries(groundsAssets)
  .filter(([key])=>['grounds_machines','grounds_shopping','grounds_dixi','grounds_food'].includes(key))
  .reduce((sum,[,row])=>({min:sum.min+row.rangeMin,max:sum.max+row.rangeMax}),{min:0,max:0});
