import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

const root=path.resolve(import.meta.dirname,'..');
const source=await fs.readFile(path.join(root,'career.js'),'utf8');
const block=source.match(/const CLUBS=([\s\S]*?);\s*\n\s*const PLANS=/);
if(!block)throw new Error('CLUBS dataset not found');
const context={};vm.createContext(context);vm.runInContext(`const C=(name,abbr,league,power,color,style,query)=>({name,abbr,league,power,color,style,query});clubs=${block[1]}`,context);
const clubs=context.clubs;
const outDir=path.join(root,'assets','crests-v2');await fs.mkdir(outDir,{recursive:true});
const clean=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\b(fc|cf|afc|ac|sc|sfc|cfc|calcio|football club)\b/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const slug=s=>clean(s).replace(/ /g,'-');
if(process.argv.includes('--verify')){const missing=[];for(const club of clubs){try{await fs.access(path.join(outDir,`${slug(club.query)}.webp`))}catch{missing.push(`${club.name} | ${club.query} | ${slug(club.query)}.webp`)}}console.log(`Crests ${clubs.length-missing.length}/${clubs.length}`);if(missing.length){console.error(missing.join('\n'));process.exitCode=1}process.exit()}
const score=(a,b)=>{a=clean(a);b=clean(b);if(a===b)return 100;if(a.includes(b)||b.includes(a))return 82;const aa=new Set(a.split(' ')),bb=new Set(b.split(' '));return [...aa].filter(x=>bb.has(x)).length/Math.max(aa.size,bb.size)*70};
const SEARCH_OVERRIDES={'RCD Mallorca':'Mallorca','Como 1907':'Como','ACF Fiorentina':'Fiorentina','Mainz 05':'Mainz','Stade Rennais FC':'Rennes','Angers SCO':'Angers','AS Monaco':'Monaco','Paris FC':'Paris FC','Al Hilal SFC':'Al Hilal SFC'};
const FORCE=new Set(Object.keys(SEARCH_OVERRIDES));
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function json(url){for(let attempt=0;attempt<5;attempt++){const r=await fetch(url,{signal:AbortSignal.timeout(15000)});if(r.ok)return r.json();if(r.status!==429)throw new Error(`${r.status}`);await sleep(2500*(attempt+1))}throw new Error('429')}
async function one(club){
 const target=path.join(outDir,`${slug(club.query)}.png`);if(!FORCE.has(club.query))try{await fs.access(target);return `${club.name} (cached)`}catch{}
 const q=SEARCH_OVERRIDES[club.query]||clean(club.query);const url=`https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(q)}`;const data=await json(url);let teams=(data.teams||[]).filter(t=>t.strSport==='Soccer'&&!/(women|ladies|femin|reserves|academy|under[ -]?\d|u\d{2}| ii$| b$)/i.test(t.strTeam));const team=teams.sort((a,b)=>score(b.strTeam,q)-score(a.strTeam,q))[0];if(!team?.strBadge||score(team.strTeam,q)<50)throw new Error(`No reliable badge: ${club.query}`);const image=await fetch(team.strBadge,{signal:AbortSignal.timeout(20000)}).then(r=>{if(!r.ok)throw new Error(`${r.status} badge ${club.query}`);return r.arrayBuffer()});await fs.writeFile(target,Buffer.from(image));return `${club.name} <- ${team.strTeam}`
}
const failures=[];for(const club of clubs){try{const result=await one(club);console.log(result);if(!result.endsWith('(cached)'))await sleep(1500)}catch(error){failures.push(`${club.name}: ${error.message}`);await sleep(1500)}}
console.log(`Downloaded ${clubs.length-failures.length}/${clubs.length}`);if(failures.length){console.error(failures.join('\n'));process.exitCode=1}
