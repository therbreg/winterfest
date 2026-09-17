export const FOOD_TASKS = [
['food_inventory','2026-10-31','Equipment','Küchen- und Servierbestand sowie Leihmöglichkeiten im Helferkreis inventarisieren; Fehlteile markieren, keine unnötigen Käufe.',1],
['food_equipment_plan','2027-01-31','Equipment','Equipmentliste, Kauf-/Leihentscheidungen, langen Kochlöffel, Einstichthermometer, Kühltransport und Other-Ages-Servierausstattung festlegen.',1,'food_inventory'],
['food_stew_test','2027-02-28','Testkochen','Schmortopf für 4–6 Personen testen: Seitan/Linsen, Würzung, Trockenfrucht, Säure, Konsistenz und Wiedererwärmen dokumentieren; Rezept überarbeiten.',1,'food_equipment_plan'],
['food_fire_test','2027-03-31','Testkochen','Potjie mit Feuerschale testen: Stand, Holzmenge, Aufheizen, Temperatursteuerung, Rühren und Anbrennen; Kühltransport probeweise aufbauen.',1,'food_stew_test'],
['food_equipment_buy','2027-03-31','Equipment','Fehlendes Pflicht-Equipment bestellen: Kochlöffel, Thermometer, flache Behälter, Kühlboxen ohne Leihlösung und Servierkelle.',1,'food_fire_test'],
['food_sides_test','2027-04-30','Testkochen','Pasteten, Aufstriche, Saucen, Gyngerbrede und Hypocras testen; Portionsmengen prüfen.',2,'food_stew_test'],
['food_menu_freeze','2027-04-30','Menü','Menü einfrieren: Pastetenfüllung, Aufstriche, Pickles, Saucen, Hauptgericht, Dessert, Hypocras und alkoholfreie Alternative festlegen.',1,'food_sides_test'],
['food_dry_buy','2027-05-07','Einkauf','Endgültige Einkaufsliste erstellen; haltbare Zutaten, Gewürze und Verbrauchsmaterial beschaffen; Kühlboxen reservieren und Küchenhilfe benennen.',1,'food_menu_freeze'],
['food_quantities','2027-05-15','Menü','Mengen für finale Gästezahl und Lebensmittelbudget aktualisieren; fehlende Bestellungen auslösen.',1,'food_menu_freeze'],
['food_pickles','2027-05-22','Vorbereitung','Pickles und haltbare Saucenbestandteile vorbereiten; Transportkisten, Behälter und Kühlakkus organisieren.',2,'food_quantities'],
['food_fresh_buy','2027-05-26','Einkauf','Frischeinkauf: Gemüse, Obst, Pilze, Kräuter und fehlende Backzutaten.',1,'food_quantities'],
['food_main_prep','2027-05-27','Vorbereitung','Schmortopf vollständig vorkochen, flach verteilen, schnell kühlen und gekühlt lagern; Aufstriche und Gewürzbrot herstellen, Pastetenfüllung vorbereiten.',1,'food_fresh_buy'],
['food_final_prep','2027-05-28','Vorbereitung','Pasteten backen, Saucen und Brot fertigstellen, Obst prüfen, Markttafel portionieren, Getränke ansetzen und Speisen in MARKT/PASTETEN/WINTERMAHL/NACHT packen; Kühlung und Material prüfen.',1,'food_main_prep'],
['food_day_morning','2027-05-29','Veranstaltungstag','Kühlware transportieren und gekühlt lagern; Markttafel, Feuerstelle und Potjie aufbauen.',1,'food_final_prep'],
['food_day_afternoon','2027-05-29','Veranstaltungstag','Markttafel portionsweise ergänzen, Pasteten ausgeben und empfindliche Lebensmittel geschützt halten.',2,'food_day_morning'],
['food_day_heat','2027-05-29','Veranstaltungstag','1,5–2 Stunden vor Wintermahl Glutbett herstellen; vorgekochten Schmortopf im Potjie vollständig erhitzen, umrühren und mit Einstichthermometer prüfen; heiß halten.',1,'food_day_morning'],
['food_day_serve','2027-05-29','Veranstaltungstag','Wintermahl direkt aus Potjie mit Brot, Pickles, Saucen und Geschirr ausgeben.',1,'food_day_heat'],
['food_day_night','2027-05-29','Veranstaltungstag','Reste zeitnah sichern, Potjie außer Betrieb nehmen und Gyngerbrede, Obst, Nüsse, Hypocras sowie alkoholfreies Getränk ausgeben.',1,'food_day_serve']
].map(([id,due,subcategory,text,priority,dependency])=>({id,due,subcategory,text,prio:`prio-${priority}`,area:'Verpflegung',tag:'Verpflegung',dependencies:dependency?[dependency]:[],note:`Unterbereich: ${subcategory}. Verantwortliche Person und Ist-Kosten im Aufgaben-/Budgetbereich pflegen.`}));
export const FOOD_DECISIONS=['Konkrete Rezeptur des Schmortopfs','Genaue Pastetenfüllung','Auswahl der Aufstriche','Auswahl der Pickles','Endgültige Saucen','Endgültiges Gyngerbrede-Rezept','Hypocras-Rezept','Alkoholfreie Gewürzalternative','Brot: kaufen oder teilweise selbst backen','Genaue Kühlbox-Lösung','Servierausstattung von Other Ages','Küchenverantwortlicher / Helfer am Veranstaltungstag'];
export const FOOD_EQUIPMENT=[
['14-Liter-Potjie mit Deckel und Füßen','Vorhanden'],['Feuerschale','Vorhanden'],['Dutch Oven','Vorhanden'],['Private Haushaltsküche','Vorhanden'],
...['Langer stabiler Kochlöffel','Digitales Einstichthermometer','Flache Lebensmittelbehälter','Kühlboxen','Kühlakkus','Große Servierkelle','Transportkisten','Küchenpapier','Müllbeutel','Brennholz'].map(x=>[x,'Pflicht']),
...['Zusätzliche Transportbehälter','Große Servierschüsseln','Brotbretter','Körbe','Zusätzliche Messer','Schneidebretter'].map(x=>[x,'Prüfen / leihen'])];
export function integrateFood(phases){
 const old=new Set(['plan2_essenskonzept','jan_testkochen_planen','jan_mengenlogik','plan2_test_grillfleisch','plan2_test_bratwurst','plan2_test_kesselgericht','plan2_beilagen_final','plan2_prep_zeitplan','apr_kuecheninventur','plan2_finale_einkaufsliste','plan2_lebensmittel_einkauf','plan2_grill_marinieren','plan2_kessel_vorbereiten','plan2_beilagen_vorbereiten','plan2_kueche_aufbauen','finalize_stew_recipe','finalize_grill_supplement','kitchen_core_plan']);
 for(const phase of phases){for(const category of phase.categories)category.tasks=category.tasks.filter(t=>!old.has(t.id)&&!/(Stewed Capon|Grillergänzung|Seitan-Pilz-Pies|vier historische Saucen)/i.test(t.text));
 phase.timeline=(phase.timeline||[]).filter(t=>!/(Stewed Capon|Küche startet|Kessel|Pies|Käse|Wurst|Grillergänzung)/i.test(t.text));}
 for(const phase of phases)for(const category of phase.categories)for(const task of category.tasks){
  if(task.id==='send_invitations_rsvp')task.text='Einladungen verschicken und Rückmeldungen für die finale Verpflegungsmenge sammeln';
  if(task.id==='cooling_storage_plan'){task.text='Kühl- und Lagerkonzept für vorgekochten Schmortopf und Frischwaren festlegen';task.dependencies=['food_equipment_plan'];}
  if(task.id==='plan2_getraenke_einkauf')task.dependencies=(task.dependencies||[]).map(id=>id==='apr_mengenplanung'?'food_quantities':id);
  if(task.id==='optional_decor_go_no_go')task.dependencies=(task.dependencies||[]).map(id=>id==='apr_mengenplanung'?'food_quantities':id);
  if(task.id==='may_material_packen'&&task.sections){const kitchen=task.sections.find(s=>s.title.includes('Küche'));if(kitchen)kitchen.items[0].text='14-Liter-Potjie, Kochlöffel, Einstichthermometer, Servierkelle, Feuerholz und Kühlbehälter';}
 }
 const phaseFor=due=>due<'2027-01-01'?phases[1]:due<'2027-02-01'?phases[2]:due<'2027-04-01'?phases[3]:due<'2027-05-01'?phases[4]:due<'2027-05-27'?phases[5]:due<'2027-05-29'?phases[6]:phases[7];
 for(const task of FOOD_TASKS){const phase=phaseFor(task.due);let category=phase.categories.find(c=>c.title==='🍲 Verpflegung');if(!category){category={title:'🍲 Verpflegung',tasks:[]};phase.categories.push(category)}category.tasks.push(task)}
}
