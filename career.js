const $=s=>document.querySelector(s);
const clamp=(v,min=0,max=99)=>Math.max(min,Math.min(max,v));
const SAVE_KEY='football-career-v2';

const CLUBS=[
 {name:'葡萄牙体育',abbr:'SCP',league:'葡超',power:72,color:'#168653',style:'youth'},
 {name:'本菲卡',abbr:'SLB',league:'葡超',power:76,color:'#d9272e',style:'attack'},
 {name:'阿贾克斯',abbr:'AJA',league:'荷甲',power:73,color:'#d51f2b',style:'youth'},
 {name:'河床',abbr:'CARP',league:'阿甲',power:72,color:'#d82035',style:'attack'},
 {name:'多特蒙德',abbr:'BVB',league:'德甲',power:81,color:'#d2b900',style:'youth'},
 {name:'勒沃库森',abbr:'B04',league:'德甲',power:83,color:'#b7192b',style:'attack'},
 {name:'马赛',abbr:'OM',league:'法甲',power:78,color:'#199bd8',style:'physical'},
 {name:'里昂',abbr:'OL',league:'法甲',power:77,color:'#1f4f9f',style:'youth'},
 {name:'那不勒斯',abbr:'NAP',league:'意甲',power:84,color:'#2b91c8',style:'attack'},
 {name:'罗马',abbr:'ROM',league:'意甲',power:81,color:'#8f1837',style:'physical'},
 {name:'阿森纳',abbr:'ARS',league:'英超',power:87,color:'#d92332',style:'attack'},
 {name:'利物浦',abbr:'LIV',league:'英超',power:89,color:'#be1e2d',style:'physical'},
 {name:'曼联',abbr:'MUN',league:'英超',power:84,color:'#c8202f',style:'star'},
 {name:'曼城',abbr:'MCI',league:'英超',power:92,color:'#69aee7',style:'attack'},
 {name:'切尔西',abbr:'CHE',league:'英超',power:85,color:'#16469d',style:'youth'},
 {name:'国际米兰',abbr:'INT',league:'意甲',power:88,color:'#16439b',style:'physical'},
 {name:'AC米兰',abbr:'ACM',league:'意甲',power:85,color:'#b31f2b',style:'star'},
 {name:'尤文图斯',abbr:'JUV',league:'意甲',power:84,color:'#242424',style:'physical'},
 {name:'拜仁',abbr:'FCB',league:'德甲',power:91,color:'#c81e42',style:'star'},
 {name:'巴黎圣日耳曼',abbr:'PSG',league:'法甲',power:90,color:'#172b55',style:'star'},
 {name:'马德里竞技',abbr:'ATM',league:'西甲',power:86,color:'#c62939',style:'physical'},
 {name:'巴塞罗那',abbr:'BAR',league:'西甲',power:91,color:'#263a85',style:'youth'},
 {name:'皇家马德里',abbr:'RMA',league:'西甲',power:94,color:'#b6a56a',style:'star'}
];

const PLANS=[
 {id:'tech',name:'把球练细',note:'技术成长更快，进攻数据更稳定',attr:'tech',bonus:1.45},
 {id:'body',name:'先把身体顶上去',note:'速度与对抗提升，伤病风险略高',attr:'physical',bonus:1.35},
 {id:'mind',name:'研究比赛',note:'视野与沉着提升，适应豪门更快',attr:'mind',bonus:1.4}
];
const STRATEGIES=[
 {id:'minutes',name:'出场第一',note:'优先保证比赛时间，成长最稳'},
 {id:'numbers',name:'冲个人数据',note:'数据上限更高，也更容易受伤'},
 {id:'trophies',name:'为冠军牺牲',note:'接受轮换，豪门适应与夺冠率提高'}
];
const POS_STATS={边锋:{goal:.34,assist:.28,keys:['tech','pace','vision']},中场:{goal:.14,assist:.36,keys:['vision','tech','composure']},前锋:{goal:.55,assist:.16,keys:['shoot','pace','composure']},后卫:{goal:.05,assist:.09,keys:['defense','physical','composure']}};

let game=null,chosenPlan=null,chosenStrategy=null,chosenOffer=null,offerList=[];
const rand=(min,max)=>Math.random()*(max-min)+min;
const rint=(min,max)=>Math.round(rand(min,max));
const pick=a=>a[Math.floor(Math.random()*a.length)];

function initialAttrs(position){
 const a={tech:63,pace:64,shoot:59,vision:61,physical:58,defense:48,composure:57};
 if(position==='边锋'){a.tech+=4;a.pace+=5;a.shoot+=2}
 if(position==='中场'){a.vision+=6;a.tech+=3;a.composure+=2}
 if(position==='前锋'){a.shoot+=7;a.pace+=2;a.composure+=3}
 if(position==='后卫'){a.defense+=12;a.physical+=6;a.vision+=2;a.shoot-=6}
 return a;
}
function calcOverall(attrs,position){return Math.round(POS_STATS[position].keys.reduce((n,k)=>n+attrs[k],0)/3)}
function newGame(name,position){const attrs=initialAttrs(position);return{name,position,number:position==='前锋'?9:position==='中场'?8:position==='后卫'?4:17,age:17,year:2026,season:1,potential:rint(88,94),attrs,overall:calcOverall(attrs,position),club:null,value:3.5,reputation:8,totalApps:0,totalGoals:0,totalAssists:0,trophyCount:0,honors:[],history:[],retired:false}}
function save(){localStorage.setItem(SAVE_KEY,JSON.stringify(game));$('#save-label').textContent='已存档'}
function load(){try{return JSON.parse(localStorage.getItem(SAVE_KEY))}catch{return null}}
function formatMoney(v){return v>=100?`€${Math.round(v)}M`:v>=10?`€${v.toFixed(0)}M`:`€${v.toFixed(1)}M`}
function yearLabel(){return `${game.year} / ${String(game.year+1).slice(-2)}`}

function renderGame(){
 $('#setup').hidden=true;$('#game').hidden=false;$('#player-card-name').textContent=game.name;$('#player-position').textContent=game.position;$('#shirt-no').textContent=game.number;$('#current-club').textContent=game.club?.name||'等待第一份职业合同';
 $('#overall').textContent=game.overall;$('#potential').textContent=`潜力 ${game.potential}`;$('#age').textContent=game.age;$('#value').textContent=formatMoney(game.value);$('#apps').textContent=game.totalApps;$('#trophies').textContent=game.trophyCount;
 $('#season-title').textContent=`${yearLabel()} 赛季`;$('#season-count').textContent=`第 ${game.season} 季`;$('#progress').style.setProperty('--p',`${Math.min(100,game.season/18*100)}%`);
 const labels={tech:'技术',pace:'速度',shoot:'射门',vision:'视野',physical:'身体',defense:'防守',composure:'沉着'};
 $('#attributes').innerHTML=Object.entries(game.attrs).map(([k,v])=>`<div class="attribute"><span>${labels[k]}</span><i style="--v:${v}%"></i><b>${v}</b></div>`).join('');
 $('#honor-count').textContent=`${game.honors.length} 项个人荣誉`;renderTimeline();renderChoices();save();
}

function renderChoices(){
 chosenPlan=chosenStrategy=chosenOffer=null;
 $('#plans').innerHTML=PLANS.map(x=>`<button class="plan" data-plan="${x.id}"><b>${x.name}</b><small>${x.note}</small></button>`).join('');
 $('#strategies').innerHTML=STRATEGIES.map(x=>`<button class="plan" data-strategy="${x.id}"><b>${x.name}</b><small>${x.note}</small></button>`).join('');
 document.querySelectorAll('[data-plan]').forEach(b=>b.onclick=()=>selectOne('plan',b.dataset.plan,b));document.querySelectorAll('[data-strategy]').forEach(b=>b.onclick=()=>selectOne('strategy',b.dataset.strategy,b));
 offerList=generateOffers();$('#offers').innerHTML=offerList.map((o,i)=>offerHTML(o,i)).join('');document.querySelectorAll('[data-offer]').forEach(b=>b.onclick=()=>selectOffer(+b.dataset.offer,b));updateReady();
}
function selectOne(type,id,button){const selector=type==='plan'?'[data-plan]':'[data-strategy]';document.querySelectorAll(selector).forEach(x=>x.classList.toggle('selected',x===button));if(type==='plan')chosenPlan=PLANS.find(x=>x.id===id);else chosenStrategy=STRATEGIES.find(x=>x.id===id);updateReady()}
function selectOffer(i,button){chosenOffer=offerList[i];document.querySelectorAll('[data-offer]').forEach(x=>x.classList.toggle('selected',x===button));updateReady()}
function updateReady(){const ready=chosenPlan&&chosenStrategy&&chosenOffer;$('#simulate').disabled=!ready;$('#decision-note').textContent=!chosenPlan?'先定发展方向。':!chosenStrategy?'再选这一年怎么踢。':!chosenOffer?'最后签一份合同。':`${chosenOffer.club.name} · ${chosenOffer.role} · ${chosenPlan.name}。`}

function generateOffers(){
 const current=game.club;const low=game.overall<72?68:game.overall<80?73:game.overall<87?79:84;const high=Math.min(95,game.overall+8+game.reputation*.04);
 let pool=CLUBS.filter(c=>c.power>=low&&c.power<=high&&c.name!==current?.name);
 if(pool.length<3)pool=CLUBS.filter(c=>c.name!==current?.name&&c.power<=high+4);
 pool=[...pool].sort(()=>Math.random()-.5).slice(0,current?3:4);
 const clubs=current?[current,...pool]:pool;
 return clubs.map((club,i)=>{const gap=game.overall-club.power;const role=gap>=3?'绝对核心':gap>=-2?'主力':gap>=-7?'轮换':'替补';const wage=Math.max(8,Math.round((club.power-62)*7+(game.overall-60)*5+rand(-15,25)));return{club,role,wage,stay:!!current&&i===0,fit:fitScore(club),promise:role==='绝对核心'?'围绕你建队':role==='主力'?'稳定首发':role==='轮换'?'竞争主力':'杯赛机会'}})
}
function fitScore(club){const good=(club.style==='youth'&&game.age<=22)||(club.style==='attack'&&game.position!=='后卫')||(club.style==='physical'&&['后卫','前锋'].includes(game.position))||(club.style==='star'&&game.reputation>38);return good?1.08:.96}
function offerHTML(o,i){return `<button class="offer" data-offer="${i}"><div class="offer-top"><span class="crest" style="--club:${o.club.color}">${o.club.abbr}</span><div><b>${o.stay?'留队 · ':''}${o.club.name}</b><small>${o.club.league} · ${o.promise}</small></div></div><div class="offer-meta"><span>球队实力<b>${o.club.power}</b></span><span>承诺角色<b>${o.role}</b></span><span>周薪<b>€${o.wage}K</b></span></div></button>`}

function simulateSeason(){
 const offer=chosenOffer,club=offer.club,roleBase={绝对核心:42,主力:36,轮换:25,替补:14}[offer.role];let apps=roleBase+rint(-3,3);let injury='';let growth=game.age<=20?rand(2.4,4.8):game.age<=24?rand(1.1,3.2):game.age<=29?rand(.1,1.4):game.age<=32?rand(-1,.4):rand(-2.5,-.6);
 if(chosenStrategy.id==='minutes'){apps+=4;growth+=.7}if(chosenStrategy.id==='numbers'){growth+=.35;if(Math.random()<.24){apps-=rint(5,13);injury='伤缺一段时间'}}if(chosenStrategy.id==='trophies'){apps-=2;growth+=offer.fit>.99?.55:0}
 apps=clamp(apps,7,48);const planBoost=chosenPlan.bonus*offer.fit;applyDevelopment(chosenPlan.attr,planBoost,growth);game.overall=calcOverall(game.attrs,game.position);
 const quality=clamp((game.overall+club.power)/2+offer.fit*5+rand(-6,6),45,99);const pos=POS_STATS[game.position];let goals=Math.max(0,Math.round(apps*pos.goal*(quality/80)*rand(.72,1.25)));let assists=Math.max(0,Math.round(apps*pos.assist*(quality/80)*rand(.72,1.25)));
 if(chosenStrategy.id==='numbers'){goals=Math.round(goals*1.22);assists=Math.round(assists*1.17)}if(game.position==='后卫'&&quality>84)assists+=rint(1,4);
 const teamHonors=rollTeamHonors(club,quality,chosenStrategy.id==='trophies');const personal=rollPersonalHonors(goals,assists,apps,teamHonors,club);
 const rating=clamp(5.9+(goals+assists)/Math.max(15,apps)*2.25+(quality-75)/38+rand(-.18,.18),5.5,9.3);const valueFactor=Math.max(.55,1-(Math.max(0,game.age-29)*.07));game.value=Math.max(1,(game.overall-60)**1.78*.15*valueFactor+game.reputation*.32);
 game.reputation=clamp(game.reputation+(rating-6.2)*5+teamHonors.length*3+personal.length*7,0,100);game.totalApps+=apps;game.totalGoals+=goals;game.totalAssists+=assists;game.trophyCount+=teamHonors.length;game.honors.push(...personal);game.club=club;
 const record={season:yearLabel(),age:game.age,club:{...club},role:offer.role,overall:game.overall,apps,goals,assists,rating:rating.toFixed(1),teamHonors,personal,injury,plan:chosenPlan.name,strategy:chosenStrategy.name};game.history.unshift(record);showReport(record);save();
}
function applyDevelopment(focus,bonus,growth){
 const all=Object.keys(game.attrs);all.forEach(k=>{let add=growth*.18+rand(-.25,.35);if(focus==='tech'&&['tech','shoot'].includes(k))add+=bonus;if(focus==='physical'&&['pace','physical'].includes(k))add+=bonus;if(focus==='mind'&&['vision','composure','defense'].includes(k))add+=bonus*.82;game.attrs[k]=Math.round(clamp(game.attrs[k]+add,35,game.potential))})
}
function rollTeamHonors(club,quality,trophyPush){
 const h=[];const boost=trophyPush?7:0;if(Math.random()*100<club.power-69+boost)h.push(`${club.league}冠军`);if(Math.random()*100<club.power-63+boost*.7)h.push('国内杯冠军');if(club.power>=82&&Math.random()*100<(club.power-77)*2.3+(quality-80)+boost)h.push('欧冠冠军');return h
}
function rollPersonalHonors(goals,assists,apps,teamHonors,club){
 const h=[];const ga=goals+assists;if(game.age<=21&&game.overall>=78&&ga>=18)h.push('金童奖');if(['前锋','边锋'].includes(game.position)&&goals>=Math.max(22,apps*.58))h.push(`${club.league}金靴`);if(['中场','边锋'].includes(game.position)&&assists>=15)h.push(`${club.league}助攻王`);if(game.overall>=87&&ga>=25)h.push(`${club.league}赛季最佳球员`);if(game.overall>=91&&ga>=32&&teamHonors.includes('欧冠冠军'))h.push('金球奖');return h
}

function showReport(r){
 $('#report-year').textContent=r.season;$('#report-kicker').textContent=r.injury?'SEASON COMPLETE · 伤病影响':'SEASON COMPLETE';$('#report-title').textContent=`${r.club.name} · ${r.rating} 分`;
 $('#report-summary').textContent=r.personal.length?`你在这一年真正进入了荣誉簿：${r.personal.join('、')}。`:r.teamHonors.length?`个人奖项没有到手，但你随队拿下了${r.teamHonors.join('、')}。`:`没有奖杯的一年。能力值和下一份合同仍然记录了你的选择。`;
 $('#report-stats').innerHTML=`<div><span>能力值</span><b>${r.overall}</b></div><div><span>出场</span><b>${r.apps}</b></div><div><span>进球</span><b>${r.goals}</b></div><div><span>助攻</span><b>${r.assists}</b></div>`;
 const honors=[...r.teamHonors,...r.personal];$('#report-honors').innerHTML=honors.length?honors.map(x=>`<span class="honor">${x}</span>`).join(''):'<span class="honor">本季无冠</span>';$('#report').hidden=false;
}
function nextSeason(){
 $('#report').hidden=true;game.age++;game.year++;game.season++;if(game.age>=38){retire();return}renderGame()
}
function retire(){game.retired=true;$('#report').hidden=false;$('#report-year').textContent=`${game.year}`;$('#report-kicker').textContent='CAREER COMPLETE';$('#report-title').textContent='终场哨响。';$('#report-summary').textContent=`${game.totalApps} 场，${game.totalGoals} 球，${game.totalAssists} 次助攻，${game.trophyCount} 座冠军。你的生涯不是一串随机队名，而是每年一次选择留下的路线。`;$('#report-stats').innerHTML=`<div><span>最终能力</span><b>${game.overall}</b></div><div><span>出场</span><b>${game.totalApps}</b></div><div><span>进球</span><b>${game.totalGoals}</b></div><div><span>冠军</span><b>${game.trophyCount}</b></div>`;$('#report-honors').innerHTML=[...new Set(game.honors)].map(x=>`<span class="honor">${x}</span>`).join('')||'<span class="honor">职业球员</span>';$('#next-season').textContent='查看完整履历';$('#next-season').onclick=()=>{$('#report').hidden=true};save()}
function renderTimeline(){
 $('#timeline').innerHTML=game.history.length?game.history.map(r=>`<article class="year-row"><span>${r.season}</span><div class="year-club"><b>${r.club.name}</b><small>${r.role} · ${r.plan}</small></div><div class="year-result"><b>${r.apps} 场 ${r.goals} 球 ${r.assists} 助</b><small>${[...r.teamHonors,...r.personal].join(' · ')||'无冠赛季'}</small></div><strong class="year-ovr">${r.overall}</strong></article>`).join(''):'<p class="empty">第一份职业合同还没有签字。</p>'
}

$('#setup-form').onsubmit=e=>{e.preventDefault();const name=$('#player-name').value.trim()||'小将';const position=document.querySelector('input[name="position"]:checked').value;game=newGame(name,position);renderGame()};
$('#simulate').onclick=simulateSeason;$('#next-season').onclick=nextSeason;$('#reset').onclick=()=>{if(confirm('确定删除当前生涯并重新开档？')){localStorage.removeItem(SAVE_KEY);location.reload()}};
const existing=load();if(existing){$('#continue').hidden=false;$('#continue').onclick=()=>{game=existing;renderGame()}}
