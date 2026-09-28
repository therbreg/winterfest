// Shared planning content; operational state stays in the existing Firebase collections.
export const GROUNDS_CATEGORY = 'Gelände & Grünschnitt';
export const GROUNDS_FRAME = 1500;
export const FIRST_CUT_RESERVE = 1000;
const task = (id,text,timing,hint,sections,prio='prio-1',meta={}) => {
  const {checklistVersion,...fields}=meta;
  return {id:`grounds_${id}`,text,timing,hint,sections:sections.map(([title,items],si)=>({title,items:items.map((text,ii)=>({id:`${checklistVersion||''}s${si}_i${ii}`,text}))})),prio,...fields};
};

export const groundsTasks = [
  task('transport','Transportzusage final klären','Erledigt','GEKLÄRT · Zugfahrzeug, Fahrer und Montagsrückgabe zugesagt',[
    ['Zusage',['Zugfahrzeug und Fahrer sind verbindlich zugesagt','Der Freund begleitet die Rückgabe am Montag']]
  ],'prio-1',{area:'Logistik',planStatus:'geklärt',status:'done',done:true,note:'Geeigneter Anhänger, Zurrgurte und Benzinkanister sind vorhanden. Zugfahrzeug, Fahrer und gemeinsame Montagsrückgabe sind bestätigt.',checklistVersion:'v6_'}),
  task('machines','Schwamborn-Reservierung anpassen','Sofort','Nur AS 901 für zwei Tage bestätigen',[
    ['Reservierung anpassen',['Zwei Trimmer aus der Schwamborn-Reservierung streichen','Nur AS 901 für Samstagmorgen bis Montagmorgen bestätigen','Einhell GC-BC 25/1 I AS und GC-BC 52 I AS sind gekauft','2-Takt-Öl und Ersatzfäden sind gekauft','Vor dem Einsatz 1:40-Kraftstoffgemisch vorbereiten']],
    ['Bei Übergabe',['Nur den AS 901 prüfen und Rückgaberegelung klären','Bedienung, Kraftstoffart, Tankfüllung und sichtbare Vorschäden prüfen']]
  ],'prio-1',{checklistVersion:'v7_',note:'Nur der AS 901 bleibt als Mietgerät. Planwert rund 300 € brutto für zwei Tage. Die beiden Motorsensen wurden gekauft.'}),
  task('ppe','PSA-Abfrage bei allen Helfern durchführen','Erledigt','Helferbedarf geklärt · keine zusätzlichen Wünsche gemeldet',[
    ['Bei allen Helfern abfragen',['Feste Schuhe','Arbeitshandschuhe','Lange robuste Arbeitskleidung','Regenkleidung nach Wetterlage','Fehlende Ausrüstung rechtzeitig für die Einkaufsliste melden']]
  ],'prio-1',{checklistVersion:'v7_',status:'done',done:true,note:'Zusätzliche Gruppen-PSA wurde abgefragt; es wurde kein zusätzlicher Bedarf gemeldet. Eigene Arbeitshandschuhe sind gekauft.'}),
  task('tools','Werkzeugbestand und Material final prüfen','Ca. eine Woche vorher','Werkzeug weitgehend vorhanden',[
    ['Bestand bestätigen',['Besen, Rechen, Gabeln, Astscheren, Handsäge und Schubkarre prüfen','Erste-Hilfe-Kasten prüfen; Zeckenzange einpacken','Gewebeplanen oder wiederverwendbare Gartensäcke nur bei Bedarf besorgen','Verlängerungskabel / Kabeltrommel und Ladekabel bereitlegen','Keine vorhandenen Gartenwerkzeuge neu kaufen']]
  ],'prio-1',{checklistVersion:'v5_',note:'Vorhanden: festes Schuhwerk, Arbeits-Latzhose / Überziehhose, Gartenwerkzeuge, Zurrgurte, Benzinkanister, Pavillon und Strom; Schubkarre wahrscheinlich vorhanden.'}),
  task('shopping','Fehlendes Material und PSA besorgen','Nach Bestands- und PSA-Abfrage','Nur tatsächliche Lücken kaufen',[
    ['Nur bei tatsächlichem Bedarf',['Reinigungszeug und große Müllsäcke','Eventuell fehlende Schutzbrillen','Fehlendes Erste-Hilfe-Verbrauchsmaterial','Klebeband, Kabelbinder oder Planen nur bei Bedarf']]
  ],'prio-1',{checklistVersion:'v7_',note:'Motorsensen, Öl, Ersatzfäden und eigene Arbeitshandschuhe sind bereits gekauft. Keine weiteren Käufe auf Verdacht.'}),
  task('food','Helferverpflegung vorbereiten','Donnerstag und Freitag','Arbeitsverpflegung · 70–100 €',[
    ['Versorgung',['Mindestens 12–15 Liter Trinkwasser für den Arbeitstag einplanen; bei Wärme mehr','Quelle ausschließlich gegebenenfalls als Brauchwasser nutzen','10–15 Brötchen, vegane Beläge, Margarine, optional Hummus, Obst, Müsliriegel und etwas Salziges bereitstellen','Kühlpflichtige Lebensmittel und Tomatensauce in Kühlbox / Kühltasche transportieren','Beläge separat mitnehmen; Brötchen nicht zwingend vorab schmieren']],
    ['Samstagmittag',['Ca. 8 einfache vegane Pizzen: Margherita und vegane Salami','Teiglinge morgens aus der Kühlung nehmen, in Ballenboxen transportieren und schattig akklimatisieren lassen','Falls Ofen oder Organisation ausfallen: unkompliziert Essen beziehungsweise Pizza bestellen']]
  ],'prio-1',{checklistVersion:'v5_'}),
  task('thursday','Donnerstag: Lage prüfen und Verpflegung einkaufen','Donnerstag vor dem Grünschnitt','Wetterentscheidung und haltbarer Einkauf',[
    ['Finaler Lagecheck',['Wetter abschließend bewerten: Verschiebung bei Dauerregen, Gewitter, gefährlichem Wind, unsicherem Maschinenbetrieb / Transport oder stark aufgeweichtem Gelände','Helferstatus prüfen','Transportstatus und Geräteabholung kontrollieren','Freitag-Einkaufsliste finalisieren','Normale kurze Regenschauer bedeuten nicht automatisch Absage']],
    ['Einkauf',['Wasser und Getränke','Haltbare Snacks, Obst und Müsliriegel','Pizza-Zutaten, veganen Aufschnitt, Margarine und Brötchenbeläge']]
  ],'prio-1',{checklistVersion:'v5_'}),
  task('friday','Freitag: Material und Essen vorbereiten','Freitag vor dem Grünschnitt','Zentraler Vorbereitungstag',[
    ['Material',['Nur tatsächlich fehlende Schutzbrillen, Müllsäcke, Reinigungszeug und Kleinkram kaufen','Erste-Hilfe-Kasten kontrollieren, Zeckenzange und Dixi-Zubehör einpacken','Kühlakkus einfrieren und Kühlbox bereitstellen','Nicht gekühlte Ausrüstung gesammelt vorpacken']],
    ['Pizza',['Teig für ca. 8 Pizzen à 240–260 g herstellen und kalt führen','Tomatensauce aus Tomaten, Salz, Olivenöl und Basilikum kurz mixen','Pizzaofen mit vorgesehenem Verlängerungskabel / Kabeltrommel testen','Ofen, Schieber, Kelle, Schneider / Messer, Ballenboxen, Semola, Küchenrolle und Servietten bereitstellen']]
  ],'prio-1',{checklistVersion:'v5_'}),
  task('dixi','Dixi für den Arbeitseinsatz reinigen','Vor Arbeitsbeginn','Sanitär Grünschnitt geklärt',[
    ['Reinigung und Ausstattung',['Innenraum, Boden und Kontaktflächen reinigen / desinfizieren','Toilettenpapier und Müllbeutel bereitstellen','Handseife beziehungsweise Handreinigung ermöglichen','Kapazität und hygienischen Zustand prüfen; Auspumpen nur bei tatsächlichem Bedarf']]
  ],'prio-1',{checklistVersion:'v5_',note:'Die Sanitärplanung für das Event 2027 ist davon getrennt.'}),
  task('first_cut','Erster großer Grünschnitt','Oktober 2026','Komplettes Wochenende · 4–5 Personen',[
    ['Meilenstein',['Grundfreilegung abgeschlossen: Einfahrt, Eventfläche, Campingfläche und nötige Verbindungswege wieder vollständig zugänglich und begehbar. Gelände ist damit noch nicht fertig; Feinschliff folgt im Winter.']]
  ],'prio-1',{checklistVersion:'v5_'}),
  task('saturday','Grünschnitt Samstag','Samstag des Grünschnitt-Wochenendes','Hauptarbeit möglichst abschließen',[
    ['Anfahrt und Übergabe',['07:30 Uhr Treffen / Abholung bei Silas; danach direkt zu Schwamborn','08:00 Uhr AS 901 übernehmen, einweisen lassen, prüfen und verladen; eigene Motorsensen separat mitbringen','Danach Kraftstoffbedarf klären, Kraftstoff besorgen und direkt zum Grundstück fahren','Restliche Helfer ca. 08:45 Uhr am Grundstück: Einfahrt vorbereiten, Werkzeug sammeln, Müll und erkennbare Hindernisse entfernen / markieren']],
    ['09:00 Uhr Sicherheit',['Draht, Metall, Steine, Löcher, Stümpfe und andere Hindernisse prüfen / markieren','PSA-Check und wechselnde Arbeitseinteilung','Wenige Schnittgut-Sammelstellen außerhalb der Nutzungsflächen bestimmen']],
    ['09:15 Uhr Grundfreilegung',['1. Einfahrt freischneiden','2. Zugang vollständig herstellen','3. Eventfläche freilegen','4. Campingfläche freilegen','5. Verbindungswege freilegen','6. Störende Vegetation dort zurücknehmen','7. Schnittgut aus Nutzungsflächen entfernen','8. Gelände gemeinsam kontrollieren']],
    ['Arbeitsblöcke',['09:15–12:30 Uhr: Einfahrt, Zugänge, Hauptwege, dann Hauptfläche','12:30 Uhr Mittagspause mit Pizza vor Ort','13:15–17:30 Uhr: Eventfläche, Campingfläche, Verbindungswege, mögliche Baldachinfläche und relevante Baumgruppen; bei Energie und Tageslicht länger','1 Person am AS 901, 2 an den eigenen Einhell-Motorsensen; übrige Helfer räumen und alle wechseln regelmäßig','Randvegetation, Baumgruppen und atmosphärisch interessante Vegetation erhalten, sofern Nutzung und Sicherheit nicht entgegenstehen']],
    ['Schnittgut und Abschluss',['Schnittgut in wenigen Haufen außerhalb der Nutzungsflächen grob nach Grünmaterial, Gestrüpp und Holz trennen; keinen Häcksler einplanen','Maschinen grob reinigen, Werkzeug einsammeln, Fortschritt fotografieren und Restaufwand für Sonntag bewerten']]
  ],'prio-1',{checklistVersion:'v5_'}),
  task('sunday','Grünschnitt / Nacharbeit Sonntag','Sonntag ab ca. 09:00 Uhr','Variante nach Samstagergebnis wählen',[
    ['Flexibler Ablauf',['Variante A: Restflächen und Ränder nacharbeiten, Schnittgut konzentrieren, kontrollieren und bei Zeit Vermessung / 3D-Fotos beginnen','Variante B: zweiter voller Grünschnitttag; Vermessung und 3D-Aufnahme auf separaten Termin verschieben','Zwischen 16:00 und 17:00 Uhr auslaufen lassen','Maschinen gründlich reinigen, kontrollieren, Zubehör sammeln und für Montag verladefertig machen']]
  ],'prio-1',{checklistVersion:'v5_'}),
  task('monday','Schlegelmäher zurückgeben','Montag direkt zur Öffnung','Kurz vor 08:00 Uhr bei Schwamborn',[
    ['Vorbereiten',['Auf der Arbeit für Montagmorgen verbindlich Freiraum schaffen','Rückgabe gemeinsam mit dem zugesagten Freund durchführen']],
    ['Rückgabe',['Bereits Sonntag gereinigten und vollständig verladefertigen AS 901 zurückbringen','Rückgabe- und Tankregelung einhalten','Keine Reinigung oder größere Organisation auf Montagmorgen verschieben']]
  ],'prio-1',{checklistVersion:'v7_'}),
  task('review','Flächen nach Grünschnitt beurteilen','Nach Abschluss des Wochenendes','Geländeplan erst danach finalisieren',[
    ['Dokumentieren und prüfen',['Gelände fotografisch dokumentieren und offene Nacharbeiten festhalten','Eventfläche, Campingfläche, Eingang, Laufwege und Lagerbereiche beurteilen','6 × 6 m Baldachinposition, weitere Pavillons und Turnierflächen prüfen','Küche / Essbereich, Sanitärposition, Ritualfläche und Questbereiche prüfen','Geländeplan anhand der Ergebnisse aktualisieren']]
  ],'prio-1',{checklistVersion:'v5_'}),
  task('measure','Gelände vermessen','Nach erfolgreicher Grundfreilegung','20–30 reale Kontrollmaße',[
    ['Kontrollmaße',['Gesamtlänge und Gesamtbreite','Breiten an mehreren Querschnitten','Abstände großer Bäume und markanter Orientierungspunkte','Wegbreiten und Abstand Eingang zu Eventfläche','Erkennbare Höhenunterschiede und mögliche Stellflächen','Mehrfach einen 2-m-Zollstock oder anderen bekannten Maßstab sichtbar mitfotografieren']]
  ],'prio-2',{checklistVersion:'v5_'}),
  task('photos','Fotos für das 3D-Modell aufnehmen','Nach erfolgreicher Grundfreilegung','100–200 Originalfotos',[
    ['Aufnahme',['Smartphone-Hauptkamera möglichst 1×, Originalauflösung, kein Digitalzoom und keine vorherige Messenger-Komprimierung','Etwa alle 1,5–2 m ein Foto mit 70–80 % Überlappung','Kompletter Randrundgang und zusätzliche Linien durch die Mitte','Eingang, Hauptfläche, Fass, Baldachin- und Ritualbereich, große Bäume, Baumgruppen, Waldränder und Geländeübergänge aus mehreren Richtungen','Zusätzlich ein kontinuierliches Übersichtsvideo aufnehmen']]
  ],'prio-2',{checklistVersion:'v5_'}),
  task('model','3D-Bestandsmodell erstellen','Nach Vermessung und Fotografie','RealityCapture / RealityScan → Blender',[
    ['Workflow',['Bilder ausrichten, Punktwolke, Mesh und Textur erstellen','Modell anhand realer Maße skalieren','Scanfehler und unnötige Vegetationsartefakte bereinigen','In Blender weiterverarbeiten']]
  ],'prio-2',{checklistVersion:'v5_'}),
  task('layout','Eventlayout im 3D-Modell planen','Winter 2026/2027','Erst danach weitere Vegetation bewerten',[
    ['Maßstäblich einplanen',['6 × 6 m Baldachin, weitere Pavillons, Tische und Bänke','Feuerkörbe, Ritualplatz, Turnierflächen und Questbereiche','Sanitär, Küche / Versorgung, Lager, Laufwege und Beleuchtung']]
  ],'prio-2',{checklistVersion:'v5_'}),
  task('second_cut','Zweiten Geländetermin planen','Januar / Februar 2027','Noch nicht konkret geplant · Budget offen',[
    ['Erst nach Grünschnitt, Vermessung, 3D-Modell und Eventlayout',['Erneut ausgetriebene Brombeeren entfernen','Weitere benötigte Flächen öffnen','Problematische Gehölze bearbeiten','Wege verbreitern / nacharbeiten','Eventflächen genauer vorbereiten']]
  ],'prio-2',{checklistVersion:'v5_'}),
  task('spring','Frühjahrspflege','April / Mai 2027','Nur leichte Pflege',[
    ['Pflege',['Gras mähen','Neue Brombeertriebe kleinhalten','Laufwege freihalten','Stolperstellen beseitigen','Aufbauflächen vorbereiten','Kein erneuter großer Rodungseinsatz kurz vor dem Event']]
  ],'prio-2',{checklistVersion:'v5_'}),
  task('sanitary','Endgültige Sanitärlösung für das Hauptevent festlegen','Bis zur Sanitärentscheidung für den 29.05.2027','Separate Eventplanung',[
    ['Umsetzung',['Angebote vergleichen','Geeignete Lösung reservieren','Anlieferung, Abholung, Handwaschen, Licht und Verbrauchsmaterial klären']]
  ],'prio-1',{checklistVersion:'v5_'})
];

const groundsBudgetLinks={grounds_machines:['grounds_machines','grounds_motorsenses'],grounds_transport:['grounds_transport'],grounds_shopping:['grounds_shopping'],grounds_food:['grounds_food'],grounds_sanitary:['grounds_sanitary']};
groundsTasks.forEach(item=>{item.tag='Gelände & Grünschnitt';if(groundsBudgetLinks[item.id])item.budgetKeys=groundsBudgetLinks[item.id];});
const GROUNDS_PHASES={phase2:['transport','machines','ppe','tools','shopping','food','thursday','friday','dixi','first_cut','saturday','sunday','monday','review','measure','photos'],phase3:['model','layout'],phase4:['second_cut','sanitary'],phase6:['spring']};
export function integrateGrounds(phases){for(const [phaseId,ids] of Object.entries(GROUNDS_PHASES)){const phase=phases.find(row=>row.id===phaseId);if(!phase||phase.categories.some(row=>row.groundsPlan===true))continue;const freeIndex=phase.categories.findIndex(row=>row.title.includes('Freie Zusatzaufgaben'));phase.categories.splice(freeIndex<0?phase.categories.length:freeIndex,0,{title:'🌿 Gelände & Grünschnitt',groundsPlan:true,tasks:ids.map(id=>groundsTasks.find(row=>row.id===`grounds_${id}`)).filter(Boolean)});}}
export const groundsMilestones=[['Oktober 2026',['first_cut']],['Direkt danach',['review','measure','photos']],['Winter 2026/2027',['model','layout']],['Januar / Februar 2027',['second_cut']],['April / Mai 2027',['spring']]].map(([time,ids])=>({time,tasks:ids.map(id=>groundsTasks.find(row=>row.id===`grounds_${id}`))}));

const cost=(item,min,max,type,status,next,note,source='noch offen')=>({area:GROUNDS_CATEGORY,item,planned:max,actual:0,rangeMin:min,rangeMax:max,type,status,next,note,source,qty:'',due:''});
export const groundsAssets={
  grounds_machines:cost('Grünschnitt · Schlegelmäher-Miete Schwamborn',300,300,'Mieten','Reservierung wird angepasst','Zwei Trimmer aus der Reservierung streichen und nur AS 901 für zwei Tage bestätigen lassen.','Nur der AS 901 bleibt als Mietgerät. Planwert rund 300 EUR brutto für zwei Tage. Die beiden Motorsensen wurden gekauft.','Schwamborn Kommunal-, Land- und Gartentechnik GmbH'),
  grounds_motorsenses:{...cost('Grünschnitt · zwei Motorsensen + Zubehör (toom)',364.24,364.24,'Kaufen','Gekauft','Gekaufte Geräte und Zubehör für den Einsatz vorbereiten','Ist-Kosten ohne Rabatt: GC-BC 25/1 I AS 134,99 EUR + GC-BC 52 I AS 194,99 EUR + Oregon 2-Takt-Öl 11,99 EUR + Ninja-Faden 2,0 mm 4,49 EUR + Ninja-Faden 2,4 mm 4,79 EUR + Gärtnerhandschuhe grün/grau Gr. 10 12,99 EUR = 364,24 EUR. Eine mögliche spätere Rabatterstattung ist noch nicht eingerechnet.','toom Baumarkt Troisdorf'),actual:364.24,qty:'2 Motorsensen + Öl + 2 Ersatzfäden + 1 Paar Handschuhe'},
  grounds_fuel:cost('Grünschnitt · Kraftstoff',30,50,'Verbrauch','Geplant','Kraftstoffart und Bedarf bei Abholung klären','Benzinkanister vorhanden. Ausreichend Kraftstoff für Samstag und Sonntag besorgen; Tankregelung beachten.'),
  grounds_transport:cost('Grünschnitt · Transport',0,0,'Mieten','Geklärt','Transport und gemeinsame Montagsrückgabe wie zugesagt durchführen','Privater Anhänger, Zugfahrzeug, Fahrer und gemeinsame Rückgabe am Montag sind zugesagt. Keine Mietkosten eingeplant; Kraftstoff oder kleine Beteiligung bei Bedarf innerhalb des Rahmens.'),
  grounds_shopping:cost('Grünschnitt · Restmaterial / Reinigung',50,100,'Verbrauch','Geplant','Nur tatsächlich fehlendes Reinigungs- und Kleinmaterial kaufen','Motorsensen, Öl, Ersatzfäden und eigene Arbeitshandschuhe sind bereits separat gekauft und werden hier nicht doppelt gerechnet. Hier nur noch tatsächlich fehlendes Reinigungs- und Kleinmaterial einplanen.'),
  grounds_food:cost('Grünschnitt · Helferverpflegung',70,100,'Verbrauch','Geplant','Donnerstag haltbar einkaufen; Freitag Pizza vorbereiten','Für 4–5 Personen einschließlich Pizza am Samstagmittag und mindestens 12–15 Liter Trinkwasser.'),
  grounds_sanitary:cost('Hauptevent · Toilettenwagen',500,500,'Mieten','Zu reservieren','Verfügbarkeit und Lieferbedingungen prüfen; anschließend reservieren','Separate notwendige Sanitärposition für den 29.05.2027.'),
  grounds_care:cost('Zweiter Geländetermin Januar / Februar 2027',0,0,'Verbrauch','Noch zu planen','Erst nach Grünschnitt, Vermessung, 3D-Modell und Eventlayout konkretisieren','Budget offen; keine Kostenschätzung eintragen.')
};
export const GROUNDS_VERSION='2026-09-28-motorsenses-v7';
export function groundsSeedPatch(existing,version){
  if(version===GROUNDS_VERSION)return {};
  const patch={};
  for(const [key,row] of Object.entries(groundsAssets)){
    const previous=existing?.[key];
    if(!previous)patch[`assets/${key}`]={...row};
    else if(['grounds_machines','grounds_motorsenses','grounds_fuel','grounds_transport','grounds_shopping','grounds_food','grounds_care'].includes(key)){
      for(const field of ['item','note','next','area','source'])patch[`assets/${key}/${field}`]=row[field];
      if(['grounds_machines','grounds_motorsenses','grounds_shopping','grounds_food'].includes(key))for(const field of ['planned','rangeMin','rangeMax'])patch[`assets/${key}/${field}`]=row[field];
      if(key==='grounds_machines'){patch[`assets/${key}/actual`]=0;patch[`assets/${key}/status`]=row.status;patch[`assets/${key}/type`]=row.type;}
      if(key==='grounds_motorsenses'){if(!(Number(previous.actual)>0))patch[`assets/${key}/actual`]=row.actual;patch[`assets/${key}/status`]=row.status;patch[`assets/${key}/type`]=row.type;patch[`assets/${key}/qty`]=row.qty;}
      if(key==='grounds_transport'&&['Offen','Offen / Blocker'].includes(previous.status))patch[`assets/${key}/status`]='Geklärt';
      if(key==='grounds_food'&&previous.status==='Zu kaufen')patch[`assets/${key}/status`]='Geplant';
    }
  }
  if(existing?.grounds_dixi){patch['assets/grounds_dixi/planned']=0;patch['assets/grounds_dixi/archived']=Number(existing.grounds_dixi.actual||0)===0;patch['assets/grounds_dixi/note']='Dixi-Reinigung ist im Baumarktposten enthalten; keine zusätzliche Budgetsumme.';}
  patch['assetMeta/groundsPlanVersion']=GROUNDS_VERSION;
  return patch;
}
export async function ensureGroundsPlan({get,ref,update,db,dbPath}){const [assets,version]=await Promise.all([get(ref(db,dbPath('assets'))),get(ref(db,dbPath('assetMeta/groundsPlanVersion')))]);const patch=groundsSeedPatch(assets.val(),version.val());if(Object.keys(patch).length)await update(ref(db,dbPath('')),patch);}
export const firstCutRange=Object.entries(groundsAssets).filter(([key])=>['grounds_machines','grounds_motorsenses','grounds_fuel','grounds_shopping','grounds_food'].includes(key)).reduce((sum,[,row])=>({min:sum.min+row.rangeMin,max:sum.max+row.rangeMax}),{min:0,max:0});
