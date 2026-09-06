import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const baseline='76c326c9fb4d6ba46e17cd9d73127401ceb0437a';
const before=file=>execFileSync('git',['show',`${baseline}:${file}`],{encoding:'utf8'}).replace(/\r\n/g,'\n');
const after=file=>readFileSync(file,'utf8').replace(/\r\n/g,'\n');
const span=(s,start,end)=>{const a=s.indexOf(start);const b=s.indexOf(end,a+start.length);assert.ok(a>=0&&b>a,`Missing boundaries: ${start}`);return s.slice(a,b);};
test('Existing migrations and equipment seeds remain unchanged',()=>{
 assert.equal(span(after('index.html'),'function maybeMigrateLegacyTaskData()','function bindFirebase()'),span(before('index.html'),'function maybeMigrateLegacyTaskData()','function bindFirebase()'));
 assert.equal(span(after('ausstattung.html'),'function seedRows()','function fill('),span(before('ausstattung.html'),'function seedRows()','function fill('));
});
test('Fixed tasks and inline plan adjustments remain unchanged',()=>{
 assert.equal(span(after('index.html'),'const PHASES_DATA =','</script>'),span(before('index.html'),'const PHASES_DATA =','</script>'));
});
test('Existing form controls and event root remain available',()=>{
 for(const file of ['index.html','ausstattung.html']){
  const ids=s=>[...s.matchAll(/<(?:input|select|textarea)\b[^>]*\bid="([^"]+)"/g)].map(m=>m[1]);
  const current=new Set(ids(after(file)));for(const id of ids(before(file)))assert.ok(current.has(id),`${file}: ${id}`);
  assert.ok(after(file).includes('events/${EVENT_ID}/'));
 }
});
test('Procurement workflow keeps its manual implementation',()=>{
 const file='.github/workflows/sync-procurement.yml';assert.equal(after(file).slice(after(file).indexOf('permissions:')),before(file).slice(before(file).indexOf('permissions:')));assert.ok(!/^\s+push:/m.test(after(file)));
});
test('PWA metadata and beverage data remain unchanged',()=>{
 for(const file of ['manifest.webmanifest','pwa.js','pwa.css','data/beverages.json','icons/icon.svg'])assert.equal(after(file),before(file));
});
