# Organisationskodex: Bestand, Umbau und Prüfung

Stand: 6. September 2026. Ausgangspunkt: `76c326c9fb4d6ba46e17cd9d73127401ceb0437a`.
Arbeitsbranch: `codex/organisationskodex`. Keine Veröffentlichung und keine Zugriffe auf produktive Firebase-Daten im Rahmen der Tests.

## Bestandsaufnahme

Das ursprüngliche Repository besteht aus zwei eigenständigen HTML-Anwendungen mit eingebettetem CSS und JavaScript, einer gemeinsamen PWA und zehn GitHub-Workflows. Es enthält keine eigene Testumgebung, Firebase-Regeln oder Datenbanksicherung.

| Dateien | Aufgabe |
| --- | --- |
| index.html | Übersicht, Aufgaben in acht Phasen, Kommentare, Chat, Dokumente, Pins, Beschlüsse, Budget, Einkauf, Helfer und Zeltanfragen; eingebettete Planungsdaten und Migrationen |
| ausstattung.html | Materialbestand und Beschaffung, Suche und Filter, Bearbeitungsformulare, Kosten, Verknüpfungen zu Einkauf und Budget; Seeds und Migrationen |
| pwa.js, pwa.css | Installation, PWA-Bedienelemente und Registrierung |
| service-worker.js | App-Shell-Cache, Aktualisierung und Offline-Fallback |
| manifest.webmanifest, icons/icon.svg | App-Metadaten und bestehendes Symbol |
| data/beverages.json | Getränkekonzept als versionierte Datendatei |
| .github/workflows/add-missing-equipment.yml | Ergänzung fehlender Ausstattung |
| .github/workflows/apply-deko-plan.yml | Dekorationsplan |
| .github/workflows/apply-larp-concept.yml | LARP-Konzept |
| .github/workflows/apply-tent-concept.yml | Zeltkonzept |
| .github/workflows/apply-vegan-food-plan.yml | Veganer Speiseplan |
| .github/workflows/apply-winterfest-budget.yml | Budgetplan |
| .github/workflows/ausstattung-kosten.yml | Ausstattungskosten |
| .github/workflows/sync-beverages.yml | Getränkesynchronisierung |
| .github/workflows/sync-procurement.yml | Beschaffungsabgleich mit Datenänderungen und Archivierung |
| .github/workflows/update_tonkruege.yml | Tonkrug-Anpassungen |

Mehrere historische Workflows verändern HTML anhand exakter Textstellen. Deshalb wurde der bestehende Anwendungscode nicht vollständig in neue Module verschoben.

## Daten- und Funktionslandkarte

Alle Anwendungsdaten liegen unter `events/${EVENT_ID}/`. Der Event-Key bleibt im URL-Hash und wird unter `wf_event_id` gespeichert. Gültigkeit: 20–100 Zeichen aus Buchstaben, Zahlen, Unterstrich und Bindestrich. `wf_user` speichert den Anzeigenamen, `wf_view` die Ansicht; `wf_done_collapsed_${phaseId}` speichert zugeklappte erledigte Aufgaben.

| Pfad relativ zum Event | Bedeutung und Beziehungen |
| --- | --- |
| tasks/{taskKey} | Zustand fester und eigener Aufgaben; Status, Erledigung, Person, Frist, Priorität, Sortierung und Löschmarkierung |
| customTasks/{id} | Eigene Aufgaben; Zustand unter tasks/custom_{id} |
| comments/{taskKey}/{commentKey} | Aufgabenkommentare; Bearbeiten, Löschen und Übernahme als Aufgabe |
| chat/{key} | Gemeinsamer Chat |
| documents/{key} | Dokumentverweise, Kategorien, Notizen und Hervorhebung; Löschen entfernt nur den Verweis |
| documents/system_assets_overview | Systemverweis zur eigenständigen Ausstattung |
| pins/{key} | Hinweise mit Kategorien; Kategorie Fokus speist die neue Übersicht |
| decisions/{key} | Gefasste Beschlüsse, Kategorien, Hervorhebung; kein allgemeines System offener Entscheidungen |
| budget/{key} | Budgeteinträge mit Plan-/Istkosten, zahlender Person und Erstattung |
| shopping/{key} | Einkauf mit Menge, Kategorie, Zuständigkeit, Notiz und Kaufstatus |
| helpers/{key} | Rollen, Personen, Zeiten, Notizen und Erledigung |
| tentLeads/{key} | Zeltangebote, Ansprechpartner, Anfragestatus, Nachfassdatum; Übernahme als Aufgabe |
| assets/{key} | Material mit Bereich, Typ, Status, Quelle, Menge, Plan-/Istpreis, Frist, nächstem Schritt und Notizen |
| assets/{key}/shoppingKey | Verweis auf den zugehörigen Einkaufsdatensatz |
| assets/{key}/budgetKey | Verweis auf den zugehörigen Budgetdatensatz |
| meta | Eventweite Planungs- und Versionsangaben |
| assetMeta | Seed- und Migrationsmarker der Ausstattung |
| shoppingArchive/beverageConcept | Historisches Einkaufsarchiv |
| procurementArchive/2026-09-03/assets | Historisches Beschaffungsarchiv |

Die Übernahme aus Ausstattung in Einkauf/Budget ist eine bestehende ausdrücklich ausgelöste Kopierfunktion. Preisänderungen eines verknüpften Assets werden zum Budget weitergegeben; eine allgemeine Rücksynchronisierung existiert nicht. Der Umbau erzeugt keine zusätzlichen Kopien. Gesamtkosten werden aus aktiven Assets berechnet, nicht durch Addition von Assets und Budget. Archivierte/Fallback-Posten und historisch ausgeschlossene Zeltposten zählen nicht; optionale aktive Posten zählen wie bisher zum Plan.

### Vorhandene Bedienfunktionen

- Aufgaben: acht Phasen, Kategorien, feste und eigene Aufgaben, Status und Erledigung, Zuständigkeit, Priorität, Frist, Filter, Sortierung, eingeklappte Abschlüsse, Bearbeiten/Löschen, Kommentare und Umwandlung von Kommentaren in Aufgaben.
- Beschlüsse und Pins: Anlegen, Bearbeiten, Löschen, Kategorien und Hervorhebungen. Beschlüsse dokumentieren getroffene Entscheidungen; offene Ausstattungsentscheidungen werden über deren Materialstatus angezeigt.
- Dokumente: Links, Kategorien, Notizen, Hervorhebung, Bearbeiten/Löschen und vorhandene Übernahmefunktionen.
- Einkauf: Anlegen, Bearbeiten, Löschen, Zuständigkeit, Menge, Kategorie, Kaufstatus sowie vorhandene Filter.
- Budget: Plan-/Istbeträge, Kategorien, zahlende Person, Erstattungsstatus, Bearbeiten/Löschen und Einkaufsübernahme.
- Helfer: Rollen, Person, Kategorie, Zeit und Erledigung; vollständige Bearbeitungsfunktionen.
- Zeltanfragen: Anbieter/Kontakt, Status, Kosten-/Angebotsangaben, Nachfassen und Aufgabenübernahme.
- Ausstattung: Suche, Bereichs-/Typ-/Statusfilter, Filter zurücksetzen, Details, Anlegen/Bearbeiten/Löschen, Kostenübersicht, Einkaufs-/Budgetverknüpfungen und Druck.
- Übergreifend: Event-Link, Namenseingabe, Echtzeitaktualisierung, Chat, Synchronisationsanzeige, mobile Navigation und Installation/Druck.

Der feste Plan enthält ursprünglich 153 Aufgaben. Seine bestehende nachgelagerte Anpassung entfernt sechs überholte Zeltaufgaben und ergänzt eine; daraus entstehen 148 sichtbare feste Aufgaben vor individuellen Löschungen und Ergänzungen. 71 historische Schlüsselzuordnungen bleiben erhalten.

## Migrationen und Seeds

| Funktion | Marker / Version | Bisherige Ausführung |
| --- | --- | --- |
| maybeMigrateLegacyTaskData | tasks/__plan_revision_2026_08_v2 | Hauptseite nach Datenbindung |
| ensureTentPlanData | meta/tentPlanVersion: 2026-08-17-v1 | Hauptseitenstart |
| ensureFinalBudgetPlanData / migrateFinalBudgetPlan | assetMeta/finalBudgetPlanVersion: 2026-08-19-final-budget-v3 | Beide Seiten, gemeinsamer Marker |
| seed | assetMeta/seedVersion: 2026-08-14-v1 | Ausstattungsstart, 42 Ausgangsposten |
| migrateTentPlan | assetMeta/tentPlanVersion: 2026-08-17-v1 | Ausstattungsstart |
| migrateCostPlan | assetMeta/costPlanVersion: 2026-08-17-cost-v2 | Ausstattungsstart |
| migrateMissingEquipment | assetMeta/missingEquipmentVersion: 2026-08-17-missing-v1 | Ausstattungsstart |
| selfLink | documents/system_assets_overview | Ausstattung, nur bei fehlendem Verweis |
| migrateCurrentProcurementPlan | assetMeta/currentProcurementPlanVersion: 2026-09-03-procurement-v3 | Auf beiden Seiten definiert, bisher nicht aufgerufen |
| ensureDecorationPlanData | meta/decorationPlanVersion: 2026-08-31-deko-v1 | Definiert, bisher nicht aufgerufen |

Sämtliche Funktionskörper bleiben erhalten. Im eingebetteten Ausstattungsmodus werden deren Startup-Seeds/Migrationen nicht zusätzlich ausgeführt. Beim eigenständigen Öffnen bleibt das ursprüngliche Verhalten bestehen. Bisher inaktive Migrationen wurden nicht aktiviert.

## Informationsarchitektur und gestalterische Umsetzung

- Übersicht als Kommandozentrale: korrekter Aufgabenfortschritt, Countdown, Fokus-Pin, nächste offene Frist einschließlich überfälliger Fristen, Budget, acht Projektphasen, offene Ausstattungsentscheidungen/blockierte Aufgaben, Beschaffung, letzte Abschlüsse und hervorgehobene Hinweise.
- Planung: Aufgaben, Beschlüsse, Pins.
- Ressourcen: Ausstattung, Einkauf, Budget, Helfer.
- Projekt: Dokumente und Konzepte, Eventablauf.
- Zeltanfragen bleiben vollständig erhalten, erreichbar innerhalb der Ausstattung. Alte Ansichtslinks funktionieren weiter.

Cinzel kennzeichnet Titel, Crimson Text trägt Inhalte, Mono-Schrift bleibt für Metadaten. Papierstruktur, zurückhaltende Gold-/Rost-/Grüntöne, klarere Abstände und chronikartige Beschlusseinträge entwickeln das bestehende Erscheinungsbild weiter. Das vorhandene Symbol bleibt erhalten; ein eigenständiges finales Siegel ist noch nicht entworfen.

## Technischer Ablauf und aktueller Stand

1. Ausgangsstand und Branch isolieren: erledigt, keine Änderung an main.
2. Bestehende Logik erhalten, reine Leseprojektionen in js/hub-model.mjs ergänzen: erledigt.
3. Gemeinsame Oberfläche in js/hub-ui.mjs und styles/codex.css ergänzen: erledigt.
4. Ausstattung zunächst als gleichursprünglichen, dynamisch hohen Frame integrieren: erledigt. Derselbe Event-Hash und dieselben Datensätze werden genutzt. equipment-bridge.js vermittelt Höhe und direkte Auswahl eines Postens, mit Prüfung von Origin und Absender.
5. Zeltverwaltung unter Ausstattung einordnen; eigenständige Ausstattung als Fallback behalten: erledigt.
6. PWA-Shell um neue Dateien erweitern und Cacheversion erhöhen: erledigt.
7. Automatischen Push-Trigger von sync-procurement entfernen: erledigt. Der manuell auslösbare Workflow und sein Inhalt bleiben erhalten, damit eine Layout-Veröffentlichung keine Beschaffungsdaten überschreibt.
8. Lokale Regressionen und Browserprüfung ohne produktive Firebase-Verbindung: erledigt.
9. Vor Veröffentlichung: tatsächlichen Event-Datenbestand exportieren/sichern, unbekannte historische Datensatzvarianten prüfen und reale PWA-Aktualisierung auf einem Testgerät prüfen. Noch nicht erfolgt.
10. Spätere native Komponentenintegration erst nach Aufteilung historischer Text-Patch-Workflows. Frame dann durch dieselbe CRUD-Logik ersetzen, keine neue Sammlung/Seeds anlegen. Anschließend kann ausstattung.html Fallback oder Redirect bleiben. Noch nicht umgesetzt.

## Risiken und Grenzen

- Historische Migrationen können bei fehlenden Markern Daten schreiben. Unveränderte Funktionskörper sind keine Garantie für einen bislang unbekannten Live-Datenbestand. Es wurde kein Live-Export erstellt oder ausgewertet.
- Ausstattungs- und Budgetverknüpfungen sind teilweise einseitig. Keine automatische Bereinigung, Zusammenführung oder Rücksynchronisierung hinzufügen, ohne diese Beziehungen separat zu prüfen.
- Alte Workflows besitzen feste Schlüssel und können Felder überschreiben oder Posten archivieren. Manuelle Auslösung weiterhin bewusst behandeln; keine historischen Workflows entfernt.
- Die Frame-Integration ist eine erste Integrationsstufe, keine vollständige native Zusammenlegung. Separates Drucken der Ausstattung bleibt über den vorhandenen Seitenlink möglich.
- Browserprüfungen ersetzen Firebase vollständig und blockieren Service Worker. Sie bestätigen daher keine produktiven Datenbankregeln, Offline-Datensynchronisierung oder tatsächliche Installations-/Updatezyklen.
- Die Übersicht leitet offene Entscheidungen aus Assets und blockierten Aufgaben ab; vorhandene Beschlüsse werden nicht als offene Entscheidungen umgedeutet.

## Geänderte Dateien und Prüfung

Bestehende Dateien: index.html, ausstattung.html, service-worker.js, .github/workflows/sync-procurement.yml.
Neue Module: js/hub-model.mjs, js/hub-ui.mjs, js/equipment-bridge.js, styles/codex.css.
Prüfungen: tests/model.test.mjs, tests/preservation.test.mjs, tests/firebase-stub.mjs, tests/browser.cjs. Generierte Bildschirmaufnahmen werden nicht versioniert.

`node --test tests/model.test.mjs tests/preservation.test.mjs`: zehn erfolgreiche Tests. Bestandstests vergleichen Migrationen, Seeds, feste Plandaten, Formular-IDs, Event-Pfad und unveränderte PWA-Metadaten mit dem Ausgangscommit.

`node tests/browser.cjs`: benötigt Playwright (alternativ über PLAYWRIGHT_PATH) und Microsoft Edge. Prüft Ansichtswechsel, Ausstattungssuche, verknüpfte Kostenänderung mit Erhaltung unbekannter Felder, null zusätzliche Startschreibvorgänge in den vorbereiteten Testdaten, direkte Postenauswahl, mobile Breite und Zurücknavigation. Firebase wird abgefangen; andere externe Anfragen außer Schriften werden blockiert.

## Interaktive Vorschau und Veröffentlichung

`node tests/preview.cjs` öffnet einen lokalen Server unter http://127.0.0.1:4173/#test_event_123456789012345. Die Vorschau ersetzt Firebase durch flüchtige Testdaten, deaktiviert PWA-Installation und blockiert externe Datenverbindungen. Änderungen in der Vorschau gehen beim Neuladen verloren.

Das Repository verwendet GitHub Pages; vorhandene erfolgreiche Pages-Läufe stammen aus main. Ein Merge nach main ist deshalb als Veröffentlichung zu behandeln. Zunächst den Entwurf prüfen und vor dem Merge den tatsächlichen Firebase-Eventbestand sichern. Die lokale Vorschau benötigt keinen produktiven Event-Key.

## Gestalterische und inhaltliche Abstimmung

Ausstattung, Einkaufsliste, Kosten/Erstattung und Zeltanfragen teilen einen gemeinsamen Navigationsbereich. Der bisherige Spruch und die XXX-Platzhalter im Seitenkopf und in der Navigation entfallen. Das bereitgestellte Rabenlogo ersetzt sie; die Originaldatei bleibt unter icons/winterfest-logo.png erhalten.

Der bisherige Tagesablauf bleibt maßgeblich. Das große Essen beginnt weiterhin um 16 Uhr; Snacks und Tavernenplatten stehen ab dem Ankommen und zwischendurch zur Verfügung. Die Angaben sind keine festen Endzeiten der Essensausgabe. Zusätzliche Grundsatztexte zur freiwilligen Teilnahme oder flexiblen Anwesenheit werden auf Wunsch nicht ergänzt.

Bildbearbeitung: eingebautes ImageGen, Hintergrundfreistellung. Verwendeter Prompt: Background extraction only for the user's burgundy raven and crescent logo: remove all pale cream parchment background including light spaces inside the ring, eye and ornaments, replacing it with actual transparent alpha. Preserve the exact burgundy raven, crescent, broken circular ring, stars and ornaments, composition, proportions and color. No redesign, no text, no shadows, no cream border, no painted checkerboard. Output transparent PNG, full uncropped mark for placing on the website's parchment background.
