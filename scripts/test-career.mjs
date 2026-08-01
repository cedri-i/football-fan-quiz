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
game=newGame('青训测试','ST','中国',16,9);const youthOffer=makeOffer(CLUBS.find(c=>c.name==='青岛海牛'),'首份合同',false);assert(!['绝对核心','主力'].includes(youthOffer.role)&&!youthOffer.promise.includes('围绕'),'16岁首份合同角色承诺过高');
const bournemouth=CLUBS.find(c=>c.name==='伯恩茅斯');game.history=[{club:bournemouth,teamHonors:[],seasonStages:[]}];assert(!superCupEligibility(bournemouth),'无国内资格却进入社区盾');game.history=[{club:bournemouth,teamHonors:['英超冠军'],seasonStages:[]}];assert(superCupEligibility(bournemouth),'英超冠军未获得社区盾资格');game.history=[{club:CLUBS.find(c=>c.name==='阿森纳'),teamHonors:['英超冠军'],seasonStages:[]}];assert(!superCupEligibility(bournemouth),'转会后错误继承前俱乐部社区盾资格');
chosenPlan=PLANS[0];chosenStrategy=STRATEGIES[0];game.hiddenTraits={ironman:true};const ironRisk=injuryRisk();game.hiddenTraits={fragile:true};const fragileRisk=injuryRisk();assert(ironRisk<fragileRisk&&ironRisk<.22&&fragileRisk>.22,'铁人/玻璃人没有正确改变伤病概率');
const values=Array.from({length:1000},()=>{const g=newGame('测试','ST','中国',16,23);return g.value});
assert(Math.min(...values)>=.08&&Math.max(...values)<=8,'初始身价越界');
assert(new Set(values).size>20,'初始身价没有足够波动');
game=newGame('强度测试','ST','阿根廷',16,9);
const spurs=CLUBS.find(c=>c.name==='热刺'),flamengo=CLUBS.find(c=>c.name==='弗拉门戈');
assert(clubPower(spurs)>clubPower(flamengo),'跨洲俱乐部实力未分层');
evolveClubPowers();assert(Object.keys(game.clubDynamics).length===CLUBS.length,'动态球队实力未覆盖全部俱乐部');
game=newGame('门将测试','GK','德国',24,1);game.overall=90;game.reputation=100;game.year=2029;
const nationalGK=rollNationalSeason();assert(nationalGK.called&&nationalGK.saves>0&&nationalGK.goals===0,'门将国家队数据错误');
game=newGame('预选赛测试','ST','中国',24,9);game.overall=82;game.reputation=100;game.year=2029;const qualifyingRandom=Math.random;Math.random=()=>.999;const failedQualification=rollNationalSeason();Math.random=qualifyingRandom;assert(failedQualification.competition==='世界杯预选赛'&&failedQualification.stage==='未晋级世界杯正赛'&&!failedQualification.qualified,'未晋级时仍把预选赛数据标成世界杯正赛');
game=newGame('金童测试','ST','西班牙',19,9);game.overall=88;const oldRandom=Math.random;Math.random=()=>0;
const awardArgs={goals:30,assists:10,apps:38,cleanSheets:0,saves:0,rating:8,teamHonors:['西甲冠军'],club:CLUBS.find(c=>c.name==='巴塞罗那')};
const firstAwards=rollPersonalHonors(awardArgs),secondAwards=rollPersonalHonors(awardArgs);Math.random=oldRandom;
assert(firstAwards.includes('金童奖')&&!secondAwards.includes('金童奖'),'金童奖不是一次性');
game=newGame('概率测试','ST','中国',24,9);game.overall=82;game.reputation=100;game.year=2029;let chinaWorldCups=0;
for(let i=0;i<100000;i++){game.totalNationalApps=0;game.totalNationalGoals=0;if(rollNationalSeason().honors.includes('世界杯冠军'))chinaWorldCups++}
assert(chinaWorldCups<=8,'普通中国球员世界杯夺冠概率过高');
game=newGame('完整赛季','GK','德国',18,33);game.club={...CLUBS.find(c=>c.name==='科隆')};chosenPlan=PLANS[0];chosenStrategy=STRATEGIES[0];chosenOffer=makeOffer(game.club,'留队',true);simulateSeason();
assert(game.history.length===1&&typeof game.history[0].cleanSheets==='number'&&Array.isArray(game.history[0].seasonStages),'完整赛季结算失败');
const goalkeeperSeason={cleanSheets:game.history[0].cleanSheets,saves:game.history[0].saves};
const offers=generateOffers();assert(offers.some(o=>o.stay&&o.club.name===game.club.name),'第二季缺少留队选项');
const duplicate={...game.history[0],season:'2027 / 28',apps:20,goals:0,assists:0,cleanSheets:5,saves:60};game.history.unshift(duplicate);let careerSpells=groupCareerSpells();assert(careerSpells.length===1&&careerSpells[0].records.length===2,'连续效力同队时没有归入同一段履历');
const otherSeason={...duplicate,season:'2028 / 29',club:{...CLUBS.find(c=>c.name==='拜仁慕尼黑')}};game.history.splice(1,0,otherSeason);careerSpells=groupCareerSpells();assert(careerSpells.length===3&&careerSpells[0].club.name===careerSpells[2].club.name,'二进宫被错误合并为同一段履历');
game=newGame('地位测试','ST','中国',30,9);game.history=[{club:bournemouth,overall:78,apps:30,goals:8,assists:5,teamHonors:[]}];game.totalApps=30;game.totalGoals=8;game.totalAssists=5;assert(careerEvaluation([]).historical==='国脚级','完成职业赛季后仍被评为小区级');
game=newGame('准球王测试','ST','葡萄牙',37,7);game.history=Array.from({length:18},(_,i)=>({club:CLUBS.find(c=>c.name==='皇家马德里'),overall:95,apps:38,goals:32,assists:12,teamHonors:[]}));game.totalApps=700;game.totalGoals=610;game.totalAssists=230;game.totalNationalApps=160;game.reputation=100;const quasiHonors=[...Array(5).fill('金球奖'),...Array(6).fill('欧冠冠军')];assert(careerEvaluation(quasiHonors).historical==='准球王级','无世界杯的顶级巨星被错误评为球王级');
const kingHonors=[...quasiHonors,'世界杯冠军'];assert(careerEvaluation(kingHonors).historical==='球王级','满足最高档硬条件仍未进入球王级');
console.log(JSON.stringify({clubs:CLUBS.length,chinaWorldCupsPer100k:chinaWorldCups,initialValueMin:Math.min(...values),initialValueMax:Math.max(...values),goalkeeperSeason,status:'PASS'},null,2));
`;
vm.runInContext(`${source}\n${tests}`,context,{filename:'career.js'});

const html=await fs.promises.readFile(path.join(root,'career.html'),'utf8');
for(const marker of ['player-family-name','player-given-name','shirt-number','position-pitch','report-outcomes'])if(!html.includes(marker))throw new Error(`HTML missing ${marker}`);
const forbidden=['本季无冠','无冠赛季','俱乐部赛事没有夺冠'];
for(const word of forbidden)if(source.includes(word)||html.includes(word))throw new Error(`Forbidden copy remains: ${word}`);
