
/* Every Firebase request is intercepted. No production database is used. */
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const root=path.resolve(__dirname,'..');
const stub=fs.readFileSync(path.join(__dirname,'firebase-stub.mjs'),'utf8');
const mime={'.html':'text/html','.css':'text/css','.js':'application/javascript','.mjs':'application/javascript','.svg':'image/svg+xml','.json':'application/json','.webmanifest':'application/manifest+json'};
const server=http.createServer((req,res)=>{let p=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(p==='/')p='/index.html';const file=path.resolve(root,'.'+p);if(!file.startsWith(root+path.sep)||p.includes('/.git')){res.writeHead(403);return res.end();}fs.readFile(file,(err,data)=>{res.writeHead(err?404:200,{'Content-Type':mime[path.extname(file)]||'text/plain'});res.end(err?'Not found':data);});});
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const errors=[];
 try{
 const context=await browser.newContext({viewport:{width:1440,height:1100},serviceWorkers:'block'});
 await context.addInitScript(()=>localStorage.setItem('wf_user','Testperson'));
 await context.route('**/*',route=>{
 const url=route.request().url();
 if(url.startsWith(base))return route.continue();
 if(url.includes('gstatic.com/firebasejs/')&&url.endsWith('firebase-app.js'))return route.fulfill({contentType:'application/javascript',body:'export const initializeApp=()=>({});'});
 if(url.includes('gstatic.com/firebasejs/')&&url.endsWith('firebase-database.js'))return route.fulfill({contentType:'application/javascript',body:stub});
 if(url.includes('fonts.googleapis.com')||url.includes('fonts.gstatic.com'))return route.continue();
 return route.abort();
 });
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/index.html#test_event_123456789012345');
 await page.locator('.progress-number').waitFor();
 assert.equal(await page.evaluate(()=>window.__writes.length),0);
 assert.equal(await page.locator('.phase-step').count(),8);
 await page.screenshot({path:path.join(root,'tests/desktop.png'),fullPage:true});
 for(const view of ['tasks','decisions','pins','shopping','budget','helpers','documents','timeline','tentleads']){
 await page.evaluate(v=>APP.switchView(v),view);assert.equal(await page.locator('body').getAttribute('data-view'),view);
 }
 await page.evaluate(()=>APP.switchView('assets'));
 const equipment=page.frameLocator('#equipmentFrame');
 await equipment.locator('.asset').first().waitFor();
 assert.equal(await equipment.locator('.asset').count(),4);
 assert.equal(await page.evaluate(()=>window.__writes.length),0,'Embedding must not seed or migrate');
 await equipment.locator('#search').fill('Tonkrüge');assert.equal(await equipment.locator('.asset').count(),1);
 await equipment.locator('#reset').click();
 await equipment.locator('[data-asset-key="baldachin_kauf"] summary').click();
 const amount=equipment.locator('[data-asset-key="baldachin_kauf"] input[type="number"]').nth(1);
 await amount.fill('600');await amount.press('Tab');
 await page.waitForFunction(()=>window.__fixture.budget.baldachin.actual===600);
 assert.equal(await page.evaluate(()=>window.__fixture.assets.baldachin_kauf.unknownField),'preserve-me');
 await page.screenshot({path:path.join(root,'tests/equipment.png'),fullPage:true});
 await page.evaluate(()=>APP.switchView('overview'));
 await page.locator('[data-go="assets"][data-record="licht"]').first().click();
 await equipment.locator('[data-asset-key="licht"].is-target').waitFor();
 await page.waitForTimeout(200);
 assert.equal(await page.evaluate(()=>window.__writes.length),2,'Only intended asset and linked budget edits');
 await page.setViewportSize({width:390,height:844});
 await page.evaluate(()=>APP.switchView('overview'));
 await page.screenshot({path:path.join(root,'tests/mobile.png'),fullPage:true});
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No mobile overflow');
 await page.locator('#mobileMoreButton').click();await page.locator('#equipmentLink').click();
 await equipment.locator('.asset').first().waitFor();
 assert.ok(await equipment.locator('body').evaluate(el=>el.scrollWidth<=innerWidth+1),'No equipment mobile overflow');
 await page.screenshot({path:path.join(root,'tests/mobile-equipment.png'),fullPage:true});
 await page.goBack();assert.equal(await page.locator('body').getAttribute('data-view'),'overview');
 assert.deepEqual(errors,[]);
 console.log('PASS: navigation, dashboard, forms, filters, linked costs, no startup writes, mobile, history.');
 }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);server.close();process.exitCode=1;});


