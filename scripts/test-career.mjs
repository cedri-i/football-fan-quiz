import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root=path.resolve(import.meta.dirname,'..');
const elements=new Map();
const fakeElement=()=>({hidden:false,textContent:'',innerHTML:'',value:'',dataset:{},style:{setProperty(){}},classList:{toggle(){},add(){},remove(){}},replaceChildren(){}});
const document={
 querySelector(selector){if(!elements.has(selector))elements.set(selector,fakeElement());return elements.get(selector)},
 querySelectorAll(){return[]}
};
const context={console,document,window:{},localStorage:{getItem(){return null},setItem(){}},location:{reload(){}},confirm(){return true},Image:class{set src(value){this._src=value;if(this.onload)this.onload()}},setTimeout,clearTimeout};
vm.createContext(context);
vm.runInContext(await fs.promises.readFile(path.join(root,'career-content-data.js'),'utf8'),context);
const source=await fs.promises.readFile(path.join(root,'career.js'),'utf8');
const tests=`
const assert=(ok,message)=>{if(!ok)throw new Error(message)};
assert(Object.keys(NATIONS).every(n=>NATIONAL_KITS[n]),'有国籍缺少国家队球衣');
assert(composePlayerName('梅西','利昂内尔','阿根廷')==='利昂内尔 梅西','西文姓名顺序错误');
assert(composePlayerName('李','明','中国')==='李明','中文姓名顺序错误');
assert(composePlayerName('李','','中国')==='李','单姓开档失败');
const values=Array.from({length:1000},()=>{const g=newGame('测试','ST','中国',16,23);return g.value});
assert(Math.min(...values)>=.08&&Math.max(...values)<=8,'初始身价越界');
assert(new Set(values).size>20,'初始身价没有足够波动');
game=newGame('强度测试','ST','阿根廷',16,9);
const spurs=CLUBS.find(c=>c.name==='热刺'),flamengo=CLUBS.find(c=>c.name==='弗拉门戈');
assert(clubPower(spurs)>clubPower(flamengo),'跨洲俱乐部实力未分层');
evolveClubPowers();assert(Object.keys(game.clubDynamics).length===CLUBS.length,'动态球队实力未覆盖全部俱乐部');
game=newGame('门将测试','GK','德国',24,1);game.overall=90;game.reputation=100;game.year=2029;
const nationalGK=rollNationalSeason();assert(nationalGK.called&&nationalGK.saves>0&&nationalGK.goals===0,'门将国家队数据错误');
game=newGame('金童测试','ST','西班牙',19,9);game.overall=88;const oldRandom=Math.random;Math.random=()=>0;
const awardArgs={goals:30,assists:10,apps:38,cleanSheets:0,saves:0,rating:8,teamHonors:['西甲冠军'],club:CLUBS.find(c=>c.name==='巴塞罗那')};
const firstAwards=rollPersonalHonors(awardArgs),secondAwards=rollPersonalHonors(awardArgs);Math.random=oldRandom;
assert(firstAwards.includes('金童奖')&&!secondAwards.includes('金童奖'),'金童奖不是一次性');
game=newGame('概率测试','ST','中国',24,9);game.overall=82;game.reputation=100;game.year=2029;let chinaWorldCups=0;
for(let i=0;i<100000;i++){game.totalNationalApps=0;game.totalNationalGoals=0;if(rollNationalSeason().honors.includes('世界杯冠军'))chinaWorldCups++}
assert(chinaWorldCups<=8,'普通中国球员世界杯夺冠概率过高');
game=newGame('完整赛季','GK','德国',18,33);game.club={...CLUBS.find(c=>c.name==='科隆')};chosenPlan=PLANS[0];chosenStrategy=STRATEGIES[0];chosenOffer=makeOffer(game.club,'留队',true);simulateSeason();
assert(game.history.length===1&&typeof game.history[0].cleanSheets==='number'&&Array.isArray(game.history[0].seasonStages),'完整赛季结算失败');
const offers=generateOffers();assert(offers.some(o=>o.stay&&o.club.name===game.club.name),'第二季缺少留队选项');
console.log(JSON.stringify({clubs:CLUBS.length,chinaWorldCupsPer100k:chinaWorldCups,initialValueMin:Math.min(...values),initialValueMax:Math.max(...values),goalkeeperSeason:{cleanSheets:game.history[0].cleanSheets,saves:game.history[0].saves},status:'PASS'},null,2));
`;
vm.runInContext(`${source}\n${tests}`,context,{filename:'career.js'});

const html=await fs.promises.readFile(path.join(root,'career.html'),'utf8');
for(const marker of ['player-family-name','player-given-name','shirt-number','position-pitch','report-outcomes'])if(!html.includes(marker))throw new Error(`HTML missing ${marker}`);
const forbidden=['本季无冠','无冠赛季','俱乐部赛事没有夺冠'];
for(const word of forbidden)if(source.includes(word)||html.includes(word))throw new Error(`Forbidden copy remains: ${word}`);
