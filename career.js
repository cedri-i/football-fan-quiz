const $=s=>document.querySelector(s);
const clamp=(v,min=0,max=99)=>Math.max(min,Math.min(max,v));
const SAVE_KEY='football-career-v2';

const crestSlug=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\b(fc|cf|afc|ac|sc|sfc|cfc|calcio|football club)\b/g,'').replace(/[^a-z0-9]+/g,' ').trim().replace(/ /g,'-');
const C=(name,abbr,league,power,color,style,query)=>({name,abbr,league,power,color,style,query,crest:`assets/crests-v2/${crestSlug(query)}.png`});
const CLUBS=[
 ['阿森纳','ARS','英超',88,'#d92332','attack','Arsenal FC'],['阿斯顿维拉','AVL','英超',84,'#7a244b','attack','Aston Villa FC'],['伯恩茅斯','BOU','英超',78,'#c8202f','physical','AFC Bournemouth'],['布伦特福德','BRE','英超',78,'#d61f2c','physical','Brentford FC'],['布莱顿','BHA','英超',80,'#2374c6','youth','Brighton & Hove Albion FC'],['伯恩利','BUR','英超',72,'#6e1b46','physical','Burnley FC'],['切尔西','CHE','英超',86,'#16469d','youth','Chelsea FC'],['水晶宫','CRY','英超',81,'#1b4a9e','physical','Crystal Palace FC'],['埃弗顿','EVE','英超',78,'#244e9b','physical','Everton FC'],['富勒姆','FUL','英超',79,'#202020','attack','Fulham FC'],['利兹联','LEE','英超',74,'#1d5aa7','physical','Leeds United FC'],['利物浦','LIV','英超',90,'#be1e2d','physical','Liverpool FC'],['曼城','MCI','英超',92,'#69aee7','attack','Manchester City FC'],['曼联','MUN','英超',84,'#c8202f','star','Manchester United FC'],['纽卡斯尔联','NEW','英超',85,'#222222','physical','Newcastle United FC'],['诺丁汉森林','NFO','英超',81,'#d51f2b','physical','Nottingham Forest FC'],['桑德兰','SUN','英超',73,'#d82032','youth','Sunderland AFC'],['热刺','TOT','英超',83,'#15264b','attack','Tottenham Hotspur FC'],['西汉姆联','WHU','英超',78,'#7a263a','physical','West Ham United FC'],['狼队','WOL','英超',77,'#d99d19','physical','Wolverhampton Wanderers FC'],
 ['毕尔巴鄂竞技','ATH','西甲',84,'#c52232','physical','Athletic Bilbao'],['马德里竞技','ATM','西甲',87,'#c62939','physical','Atletico Madrid'],['奥萨苏纳','OSA','西甲',78,'#a51e2f','physical','CA Osasuna'],['塞尔塔','CEL','西甲',79,'#69a7dd','attack','Celta Vigo'],['阿拉维斯','ALA','西甲',74,'#17589a','physical','Deportivo Alaves'],['巴塞罗那','BAR','西甲',92,'#263a85','youth','FC Barcelona'],['皇家贝蒂斯','BET','西甲',82,'#208a55','attack','Real Betis'],['埃尔切','ELC','西甲',71,'#2c9a58','physical','Elche CF'],['西班牙人','ESP','西甲',75,'#3186c8','physical','RCD Espanyol'],['赫塔费','GET','西甲',77,'#23529b','physical','Getafe CF'],['赫罗纳','GIR','西甲',80,'#cf2838','attack','Girona FC'],['莱万特','LEV','西甲',71,'#a23b62','attack','Levante UD'],['马略卡','MLL','西甲',77,'#c93439','physical','RCD Mallorca'],['巴列卡诺','RAY','西甲',76,'#d92835','physical','Rayo Vallecano'],['皇家马德里','RMA','西甲',94,'#b6a56a','star','Real Madrid CF'],['皇家奥维耶多','OVI','西甲',71,'#2454a2','physical','Real Oviedo'],['皇家社会','RSO','西甲',82,'#2b7dbb','youth','Real Sociedad'],['塞维利亚','SEV','西甲',79,'#c92a38','star','Sevilla FC'],['瓦伦西亚','VAL','西甲',78,'#e19327','youth','Valencia CF'],['比利亚雷亚尔','VIL','西甲',83,'#d5b91f','attack','Villarreal CF'],
 ['亚特兰大','ATA','意甲',85,'#2455a4','attack','Atalanta BC'],['博洛尼亚','BOL','意甲',82,'#9d2439','physical','Bologna FC'],['卡利亚里','CAG','意甲',74,'#9d2439','physical','Cagliari Calcio'],['科莫','COM','意甲',80,'#2460a5','attack','Como 1907'],['克雷莫内塞','CRE','意甲',70,'#b12735','physical','US Cremonese'],['佛罗伦萨','FIO','意甲',82,'#63358d','attack','ACF Fiorentina'],['热那亚','GEN','意甲',76,'#9f243a','physical','Genoa CFC'],['国际米兰','INT','意甲',89,'#16439b','physical','Inter Milan'],['尤文图斯','JUV','意甲',85,'#242424','physical','Juventus FC'],['拉齐奥','LAZ','意甲',82,'#66a3d8','attack','SS Lazio'],['莱切','LEC','意甲',73,'#d3a921','physical','US Lecce'],['AC米兰','ACM','意甲',86,'#b31f2b','star','AC Milan'],['那不勒斯','NAP','意甲',86,'#2b91c8','attack','SSC Napoli'],['帕尔马','PAR','意甲',75,'#e2b72c','youth','Parma Calcio 1913'],['比萨','PIS','意甲',70,'#214c92','physical','Pisa SC'],['罗马','ROM','意甲',83,'#8f1837','physical','AS Roma'],['萨索洛','SAS','意甲',75,'#15955d','attack','US Sassuolo'],['都灵','TOR','意甲',78,'#7e283a','physical','Torino FC'],['乌迪内斯','UDI','意甲',76,'#313131','youth','Udinese Calcio'],['维罗纳','VER','意甲',73,'#244f91','physical','Hellas Verona FC'],
 ['奥格斯堡','AUG','德甲',74,'#a92431','physical','FC Augsburg'],['柏林联合','FCU','德甲',76,'#d12431','physical','Union Berlin'],['不莱梅','SVW','德甲',77,'#168b59','attack','Werder Bremen'],['多特蒙德','BVB','德甲',85,'#d2b900','youth','Borussia Dortmund'],['法兰克福','SGE','德甲',84,'#bd2632','attack','Eintracht Frankfurt'],['弗赖堡','SCF','德甲',79,'#c72b39','physical','SC Freiburg'],['汉堡','HSV','德甲',74,'#285b9d','star','Hamburger SV'],['海登海姆','FCH','德甲',72,'#24589d','physical','FC Heidenheim'],['霍芬海姆','TSG','德甲',76,'#2670b8','youth','TSG 1899 Hoffenheim'],['科隆','KOE','德甲',74,'#cf2937','star','FC Koln'],['莱比锡','RBL','德甲',84,'#d32b3d','youth','RB Leipzig'],['勒沃库森','B04','德甲',87,'#b7192b','attack','Bayer Leverkusen'],['拜仁','FCB','德甲',92,'#c81e42','star','Bayern Munich'],['美因茨','M05','德甲',78,'#c92737','physical','Mainz 05'],['门兴','BMG','德甲',79,'#202020','attack','Borussia Monchengladbach'],['圣保利','STP','德甲',73,'#5c3427','physical','FC St Pauli'],['斯图加特','VFB','德甲',84,'#d22435','attack','VfB Stuttgart'],['沃尔夫斯堡','WOB','德甲',78,'#4c9c47','physical','VfL Wolfsburg'],
 ['昂热','SCO','法甲',72,'#202020','physical','Angers SCO'],['欧塞尔','AJA','法甲',74,'#2661a6','youth','AJ Auxerre'],['布雷斯特','SB29','法甲',78,'#cc2635','physical','Stade Brestois 29'],['勒阿弗尔','HAC','法甲',72,'#6e9ed0','physical','Le Havre AC'],['朗斯','RCL','法甲',81,'#c72c36','physical','RC Lens'],['里尔','LOSC','法甲',83,'#c92738','youth','Lille OSC'],['洛里昂','FCL','法甲',72,'#e58232','attack','FC Lorient'],['里昂','OL','法甲',80,'#1f4f9f','youth','Olympique Lyonnais'],['马赛','OM','法甲',83,'#199bd8','physical','Olympique Marseille'],['梅斯','FCM','法甲',71,'#8e243d','physical','FC Metz'],['摩纳哥','ASM','法甲',84,'#d02c3c','youth','AS Monaco'],['南特','FCN','法甲',74,'#d2bd24','youth','FC Nantes'],['尼斯','OGCN','法甲',81,'#bb2633','physical','OGC Nice'],['巴黎FC','PFC','法甲',73,'#244c8c','youth','Paris FC'],['巴黎圣日耳曼','PSG','法甲',92,'#172b55','star','Paris Saint-Germain'],['雷恩','SRFC','法甲',80,'#c32936','youth','Stade Rennais FC'],['斯特拉斯堡','RCSA','法甲',80,'#2e72b7','youth','RC Strasbourg Alsace'],['图卢兹','TFC','法甲',77,'#6d3a8b','attack','Toulouse FC'],
 ['本菲卡','SLB','葡超',82,'#d9272e','attack','SL Benfica'],['葡萄牙体育','SCP','葡超',84,'#168653','youth','Sporting CP'],['波尔图','FCP','葡超',82,'#2363a6','physical','FC Porto'],['布拉加','SCB','葡超',78,'#c92a39','attack','SC Braga'],['阿贾克斯','AJA','荷甲',80,'#d51f2b','youth','AFC Ajax'],['埃因霍温','PSV','荷甲',83,'#d72737','attack','PSV Eindhoven'],['费耶诺德','FEY','荷甲',82,'#c52937','physical','Feyenoord'],['阿尔克马尔','AZ','荷甲',78,'#c92331','youth','AZ Alkmaar'],
 ['河床','CARP','阿甲',81,'#d82035','attack','River Plate'],['博卡青年','BOC','阿甲',80,'#214d91','physical','Boca Juniors'],['竞技俱乐部','RAC','阿甲',76,'#62a9df','youth','Racing Club'],['独立竞技','IND','阿甲',75,'#c82935','physical','Independiente'],
 ['弗拉门戈','FLA','巴甲',83,'#c22534','star','Flamengo'],['帕尔梅拉斯','PAL','巴甲',83,'#198250','physical','Palmeiras'],['桑托斯','SAN','巴甲',76,'#303030','youth','Santos FC'],['圣保罗','SAO','巴甲',78,'#c52b38','youth','Sao Paulo FC'],
 ['迈阿密国际','MIA','美职联',76,'#dc5b83','star','Inter Miami CF'],['洛杉矶FC','LAFC','美职联',75,'#b79a54','attack','Los Angeles FC'],['西雅图海湾人','SEA','美职联',75,'#4b9d4a','physical','Seattle Sounders FC'],
 ['利雅得胜利','NAS','沙特联',80,'#d8bd22','star','Al Nassr FC'],['利雅得新月','HIL','沙特联',83,'#2765af','star','Al Hilal SFC'],['吉达联合','ITT','沙特联',79,'#202020','physical','Al Ittihad Club'],
 ['凯尔特人','CEL','苏超',78,'#198750','physical','Celtic FC'],['流浪者','RAN','苏超',77,'#26529b','physical','Rangers FC'],['阿伯丁','ABE','苏超',70,'#c82935','youth','Aberdeen FC'],
 ['加拉塔萨雷','GAL','土超',81,'#c93239','star','Galatasaray SK'],['费内巴切','FEN','土超',80,'#d6bd24','attack','Fenerbahce SK'],['贝西克塔斯','BJK','土超',77,'#222222','physical','Besiktas JK'],
 ['上海海港','SIPG','中超',73,'#c92632','attack','Shanghai Port FC'],['上海申花','SHS','中超',72,'#2670ba','physical','Shanghai Shenhua FC'],['山东泰山','SHT','中超',72,'#e5812f','youth','Shandong Taishan FC'],['北京国安','BGR','中超',71,'#4b9c45','youth','Beijing Guoan FC'],
 ['圣彼得堡泽尼特','ZEN','俄超',79,'#2588c9','star','Zenit Saint Petersburg'],['莫斯科中央陆军','CSK','俄超',76,'#c72737','physical','CSKA Moscow'],['莫斯科斯巴达','SPA','俄超',75,'#d12b3b','attack','Spartak Moscow'],['莫斯科迪纳摩','DYN','俄超',74,'#2670b8','youth','Dynamo Moscow'],
 ['布鲁日','CLU','比甲',78,'#2358a3','physical','Club Brugge KV'],['安德莱赫特','AND','比甲',76,'#633994','youth','RSC Anderlecht'],['亨克','GNK','比甲',75,'#2759a0','youth','KRC Genk'],['圣吉罗斯联合','USG','比甲',77,'#d8bd25','attack','Union Saint-Gilloise'],
 ['佩纳罗尔','PEN','乌甲',75,'#d6b927','physical','Penarol'],['乌拉圭民族','NAC','乌甲',75,'#2762a8','youth','Club Nacional de Football'],['防卫者体育','DEF','乌甲',70,'#733b91','youth','Defensor Sporting']
].map(x=>C(...x));

const PLANS=[
 {id:'tech',name:'技术',note:'技术成长更快，进攻数据更稳定',attr:'tech',bonus:1.45},
 {id:'body',name:'身体',note:'速度与对抗提升，伤病风险略高',attr:'physical',bonus:1.35},
 {id:'mind',name:'球商',note:'视野与沉着提升，适应豪门更快',attr:'mind',bonus:1.4}
];
const STRATEGIES=[
 {id:'minutes',name:'出场',note:'优先保证比赛时间，成长最稳'},
 {id:'numbers',name:'数据',note:'数据上限更高，也更容易受伤'},
 {id:'trophies',name:'荣誉',note:'接受轮换，豪门适应与夺冠率提高'}
];
const ICONS={
 tech:'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="11"/><path d="m16 10 4 3-1.5 5h-5L12 13l4-3Zm-4 3-5 1m13-1 5 1m-6.5 4 3 5m-8-5-3 5"/></svg>',
 body:'<svg viewBox="0 0 32 32"><path d="M7 13v6m4-9v12m10-12v12m4-9v6M7 16h18M4 12h3v8H4zm21 0h3v8h-3z"/></svg>',
 mind:'<svg viewBox="0 0 32 32"><circle cx="16" cy="8" r="3"/><circle cx="8" cy="22" r="3"/><circle cx="24" cy="22" r="3"/><path d="m14.5 10.5-5 8.5m8-8.5 5 8.5M11 22h10"/></svg>',
 minutes:'<svg viewBox="0 0 32 32"><circle cx="16" cy="17" r="11"/><path d="M16 11v7l5 3M12 4h8"/></svg>',
 numbers:'<svg viewBox="0 0 32 32"><path d="M6 26V15h5v11m5 0V9h5v17m5 0V5h-5"/><path d="M4 26h24"/></svg>',
 trophies:'<svg viewBox="0 0 32 32"><path d="M10 5h12v7c0 5-2.5 8-6 8s-6-3-6-8V5Zm2 20h8m-4-5v5M10 8H6v3c0 3 2 5 5 5m11-8h4v3c0 3-2 5-5 5"/></svg>'
};
const CUP_BY_LEAGUE={英超:'足总杯',西甲:'国王杯',意甲:'意大利杯',德甲:'德国杯',法甲:'法国杯',葡超:'葡萄牙杯',荷甲:'荷兰杯',阿甲:'阿根廷杯',巴甲:'巴西杯',美职联:'美国公开杯',沙特联:'沙王冠',苏超:'苏格兰杯',土超:'土耳其杯',中超:'足协杯',俄超:'俄罗斯杯',比甲:'比利时杯',乌甲:'乌拉圭杯'};
const LEAGUE_SYSTEMS={英超:'英冠',西甲:'西乙',意甲:'意乙',德甲:'德乙',法甲:'法乙'};
const TOP_BY_SECOND=Object.fromEntries(Object.entries(LEAGUE_SYSTEMS).map(([top,second])=>[second,top]));
const NATIONS={
 中国:{strength:63,confed:'AS'},阿根廷:{strength:91,confed:'SA'},巴西:{strength:91,confed:'SA'},乌拉圭:{strength:84,confed:'SA'},法国:{strength:92,confed:'EU'},德国:{strength:88,confed:'EU'},英格兰:{strength:90,confed:'EU'},苏格兰:{strength:78,confed:'EU'},西班牙:{strength:91,confed:'EU'},葡萄牙:{strength:89,confed:'EU'},意大利:{strength:86,confed:'EU'},比利时:{strength:85,confed:'EU'},荷兰:{strength:87,confed:'EU'},土耳其:{strength:79,confed:'EU'},俄罗斯:{strength:78,confed:'EU'},沙特阿拉伯:{strength:72,confed:'AS'},美国:{strength:80,confed:'NA'},克罗地亚:{strength:83,confed:'EU'},挪威:{strength:81,confed:'EU'},日本:{strength:80,confed:'AS'},韩国:{strength:79,confed:'AS'},墨西哥:{strength:80,confed:'NA'},摩洛哥:{strength:82,confed:'AF'},瑞士:{strength:81,confed:'EU'},哥伦比亚:{strength:84,confed:'SA'},丹麦:{strength:80,confed:'EU'},塞内加尔:{strength:81,confed:'AF'},尼日利亚:{strength:79,confed:'AF'}
};
const HOME_LEAGUE={中国:'中超',阿根廷:'阿甲',巴西:'巴甲',乌拉圭:'乌甲',法国:'法甲',德国:'德甲',英格兰:'英超',苏格兰:'苏超',西班牙:'西甲',葡萄牙:'葡超',意大利:'意甲',比利时:'比甲',荷兰:'荷甲',土耳其:'土超',俄罗斯:'俄超',沙特阿拉伯:'沙特联',美国:'美职联'};
const COMPETITION_MAX={世界杯:8,欧洲杯:7,美洲杯:7,亚洲杯:7,非洲杯:7,欧国联:8,欧美杯:1};
const POS_STATS={
 ST:{goal:.55,assist:.16,keys:['shoot','pace','composure'],group:'attack',number:9,boost:{shoot:7,pace:2,composure:3}},
 CF:{goal:.43,assist:.25,keys:['shoot','tech','vision'],group:'attack',number:10,boost:{shoot:5,tech:4,vision:3}},
 LW:{goal:.34,assist:.28,keys:['pace','tech','shoot'],group:'wing',number:11,boost:{pace:5,tech:4,shoot:2}},
 RW:{goal:.34,assist:.28,keys:['pace','tech','vision'],group:'wing',number:7,boost:{pace:5,tech:4,vision:2}},
 CAM:{goal:.23,assist:.38,keys:['vision','tech','shoot'],group:'midfield',number:10,boost:{vision:6,tech:4,shoot:2}},
 LM:{goal:.17,assist:.31,keys:['pace','vision','tech'],group:'midfield',number:11,boost:{pace:4,vision:4,tech:2}},
 CM:{goal:.14,assist:.32,keys:['vision','tech','composure'],group:'midfield',number:8,boost:{vision:6,tech:3,composure:2}},
 RM:{goal:.17,assist:.31,keys:['pace','vision','tech'],group:'midfield',number:7,boost:{pace:4,vision:4,tech:2}},
 CDM:{goal:.07,assist:.19,keys:['defense','vision','physical'],group:'defense',number:6,boost:{defense:8,vision:4,physical:4,shoot:-3}},
 LWB:{goal:.08,assist:.23,keys:['pace','defense','physical'],group:'defense',number:3,boost:{pace:5,defense:7,physical:3,shoot:-3}},
 LB:{goal:.04,assist:.15,keys:['defense','pace','physical'],group:'defense',number:3,boost:{defense:10,pace:4,physical:3,shoot:-5}},
 CB:{goal:.05,assist:.05,keys:['defense','physical','composure'],group:'defense',number:4,boost:{defense:12,physical:6,composure:3,shoot:-6}},
 RB:{goal:.04,assist:.15,keys:['defense','pace','physical'],group:'defense',number:2,boost:{defense:10,pace:4,physical:3,shoot:-5}},
 RWB:{goal:.08,assist:.23,keys:['pace','defense','physical'],group:'defense',number:2,boost:{pace:5,defense:7,physical:3,shoot:-3}},
 GK:{goal:.001,assist:.01,keys:['defense','composure','physical'],group:'keeper',number:1,boost:{defense:15,composure:7,physical:4,pace:-8,shoot:-12}}
};
const LEGACY_POSITIONS={边锋:'LW',中场:'CM',前锋:'ST',后卫:'CB'};

let game=null,chosenPlan=null,chosenStrategy=null,chosenOffer=null,offerList=[];
const rand=(min,max)=>Math.random()*(max-min)+min;
const rint=(min,max)=>Math.round(rand(min,max));
const pick=a=>a[Math.floor(Math.random()*a.length)];

function initialAttrs(position){
 const a={tech:63,pace:64,shoot:59,vision:61,physical:58,defense:48,composure:57};
 Object.entries(POS_STATS[position].boost).forEach(([key,value])=>a[key]+=value);
 return a;
}
function calcOverall(attrs,position){return Math.round(POS_STATS[position].keys.reduce((n,k)=>n+attrs[k],0)/3)}
function rollPotential(overall){const r=Math.random();const rolled=r<.2?rint(70,78):r<.7?rint(79,87):r<.95?rint(88,92):rint(93,95);return Math.max(overall+2,rolled)}
function newGame(name,position,nationality,age){const attrs=initialAttrs(position);const overall=calcOverall(attrs,position);return{name,position,nationality,needsNationality:false,number:POS_STATS[position].number,age,year:2026,season:1,potential:rollPotential(overall),attrs,overall,club:null,value:3.5,reputation:8,totalApps:0,totalGoals:0,totalAssists:0,totalNationalApps:0,totalNationalGoals:0,trophyCount:0,honors:[],history:[],retired:false,finalissimaYear:null}}
function save(){localStorage.setItem(SAVE_KEY,JSON.stringify(game));$('#save-label').textContent='已存档'}
function load(){try{const saved=JSON.parse(localStorage.getItem(SAVE_KEY));if(!saved)return null;if(LEGACY_POSITIONS[saved.position])saved.position=LEGACY_POSITIONS[saved.position];if(!POS_STATS[saved.position])saved.position='ST';saved.number=POS_STATS[saved.position].number;if(!saved.nationality){saved.nationality='中国';saved.needsNationality=true}saved.totalNationalApps=saved.totalNationalApps||0;saved.totalNationalGoals=saved.totalNationalGoals||0;(saved.history||[]).forEach(r=>{r.teamHonors=(r.teamHonors||[]).map(h=>h==='国内杯冠军'?(CUP_BY_LEAGUE[r.club?.league]||'杯赛冠军'):h);r.nationalHonors=r.nationalHonors||[];const max=COMPETITION_MAX[r.national?.competition];if(max&&r.national.apps>max){saved.totalNationalApps=Math.max(0,saved.totalNationalApps-(r.national.apps-max));r.national.apps=max}});return saved}catch{return null}}
function formatMoney(v){return v>=100?`€${Math.round(v)}M`:v>=10?`€${v.toFixed(0)}M`:`€${v.toFixed(1)}M`}
function yearLabel(){return `${game.year} / ${String(game.year+1).slice(-2)}`}

function renderGame(){
 $('#setup').hidden=true;$('#game').hidden=false;$('#player-card-name').textContent=game.name;$('#player-position').textContent=game.position;$('#shirt-no').textContent=game.number;$('#current-club').textContent=game.club?.name||'等待第一份职业合同';$('#player-nationality').textContent=game.nationality;
 $('#nationality-migration').hidden=!game.needsNationality;if(game.needsNationality)$('#passport-nationality').innerHTML=Object.keys(NATIONS).map(n=>`<option${n===game.nationality?' selected':''}>${n}</option>`).join('');
 $('#overall').textContent=game.overall;$('#age').textContent=game.age;$('#value').textContent=formatMoney(game.value);$('#apps').textContent=game.totalApps;$('#trophies').textContent=game.trophyCount;$('#national-apps').textContent=game.totalNationalApps;$('#national-goals').textContent=game.totalNationalGoals;
 $('#season-title').textContent=`${yearLabel()} 赛季`;$('#season-count').textContent=`第 ${game.season} 季`;$('#progress').style.setProperty('--p',`${Math.min(100,game.season/18*100)}%`);
 const labels={tech:'技术',pace:'速度',shoot:'射门',vision:'视野',physical:'身体',defense:'防守',composure:'沉着'};
 $('#attributes').innerHTML=Object.entries(game.attrs).map(([k,v])=>`<div class="attribute"><span>${labels[k]}</span><i style="--v:${v}%"></i><b>${v}</b></div>`).join('');
 renderHonorCabinet();renderTimeline();renderChoices();save();
}

function renderChoices(){
 chosenPlan=chosenStrategy=chosenOffer=null;
 $('#plans').innerHTML=PLANS.map(x=>`<button class="plan" data-plan="${x.id}"><span class="choice-icon" aria-hidden="true">${ICONS[x.id]}</span><span class="choice-copy"><b>${x.name}</b><small>${x.note}</small></span></button>`).join('');
 $('#strategies').innerHTML=STRATEGIES.map(x=>`<button class="plan" data-strategy="${x.id}"><span class="choice-icon" aria-hidden="true">${ICONS[x.id]}</span><span class="choice-copy"><b>${x.name}</b><small>${x.note}</small></span></button>`).join('');
 document.querySelectorAll('[data-plan]').forEach(b=>b.onclick=()=>selectOne('plan',b.dataset.plan,b));document.querySelectorAll('[data-strategy]').forEach(b=>b.onclick=()=>selectOne('strategy',b.dataset.strategy,b));
 offerList=generateOffers();$('#offers').innerHTML=offerList.map((o,i)=>offerHTML(o,i)).join('');document.querySelectorAll('[data-offer]').forEach(b=>b.onclick=()=>selectOffer(+b.dataset.offer,b));hydrateOfferBadges();updateReady();
}
function selectOne(type,id,button){const selector=type==='plan'?'[data-plan]':'[data-strategy]';document.querySelectorAll(selector).forEach(x=>x.classList.toggle('selected',x===button));if(type==='plan')chosenPlan=PLANS.find(x=>x.id===id);else chosenStrategy=STRATEGIES.find(x=>x.id===id);updateReady()}
function selectOffer(i,button){chosenOffer=offerList[i];document.querySelectorAll('[data-offer]').forEach(x=>x.classList.toggle('selected',x===button));updateReady()}
function updateReady(){const ready=chosenPlan&&chosenStrategy&&chosenOffer;$('#simulate').disabled=!ready;$('#decision-note').textContent=!chosenPlan?'先定发展方向。':!chosenStrategy?'再选这一年怎么踢。':!chosenOffer?'最后签一份合同。':`${chosenOffer.moveType} · ${chosenOffer.club.name} · ${chosenOffer.role} · ${chosenPlan.name}。`}

function generateOffers(){
 const current=game.club;const decision=clubWindowDecision(current);const total=rint(3,5);const slots=decision.mode==='stay'?total-1:total;const recent=new Set(game.lastOffers||[]);
 const firstLeague=decision.mode==='first'?(HOME_LEAGUE[game.nationality]||pick([...new Set(CLUBS.map(c=>c.league))])):null;
 const low=Math.max(68,game.overall-(decision.mode==='stay'?14:18));const high=Math.min(95,game.overall+(decision.mode==='stay'?10:6)+game.reputation*.05);let pool=firstLeague?CLUBS.filter(c=>c.league===firstLeague):CLUBS.filter(c=>c.name!==current?.name&&c.power>=low&&c.power<=high);
 if(!firstLeague&&pool.length<slots*3)pool=CLUBS.filter(c=>c.name!==current?.name&&c.power<=high+6&&c.power>=low-6);
 pool=pool.map(c=>({club:c,score:Math.random()*72-Math.abs(c.power-(game.overall+(decision.mode==='stay'?1:-2)))*1.05-(recent.has(c.name)?15:0)+(c.league!==current?.league?rand(0,9):0)})).sort((a,b)=>b.score-a.score).map(x=>x.club).slice(0,slots);
 const offers=[];if(decision.mode==='stay')offers.push(makeOffer(current,'留队',true));const moveType=decision.mode==='first'?'首份合同':decision.mode==='loan'?'租借':decision.mode==='release'?'自由签约':'转会';offers.push(...pool.map(club=>makeOffer(club,moveType,false)));game.lastOffers=offers.map(o=>o.club.name);$('#club-decision').textContent=firstLeague?`${game.nationality}球员从${firstLeague}起步`:decision.message;return offers
}
function clubWindowDecision(current){
 if(!current)return{mode:'first',message:'等待第一份职业合同'};const gap=current.power-game.overall;const lastRating=parseFloat(game.history[0]?.rating||'7');let exitRisk=0;if(gap>=8)exitRisk+=.5;else if(gap>=5)exitRisk+=.25;if(lastRating<6.5)exitRisk+=.28;else if(lastRating<6.8)exitRisk+=.12;if(game.age>=32)exitRisk+=(game.age-31)*.09;if(game.age>=35)exitRisk+=.22;
 if(Math.random()>=Math.min(.94,exitRisk))return{mode:'stay',message:'俱乐部愿意提供留队合同'};if(game.age<=29&&gap>=4&&Math.random()<.62)return{mode:'loan',message:'母队要求外租，本窗没有留队选项'};if(game.age>=34)return{mode:'release',message:'合同到期，俱乐部不再续约'};return{mode:'sale',message:'俱乐部决定挂牌出售，本窗没有留队选项'}
}
function makeOffer(club,moveType,stay){const gap=game.overall-club.power;const role=gap>=3?'绝对核心':gap>=-2?'主力':gap>=-7?'轮换':'替补';const wage=Math.max(8,Math.round((club.power-62)*7+(game.overall-60)*5+rand(-15,25)));return{club,role,wage,stay,moveType,fit:fitScore(club),promise:role==='绝对核心'?'围绕你建队':role==='主力'?'稳定首发':role==='轮换'?'竞争主力':'杯赛机会'}}
function fitScore(club){const group=POS_STATS[game.position].group;const good=(club.style==='youth'&&game.age<=22)||(club.style==='attack'&&!['defense','keeper'].includes(group))||(club.style==='physical'&&['defense','attack','keeper'].includes(group))||(club.style==='star'&&game.reputation>38);return good?1.08:.96}
function offerHTML(o,i){return `<button class="offer" data-offer="${i}"><div class="offer-top"><span class="crest" data-crest="${i}" style="--club:${o.club.color}"><span>${o.club.abbr}</span></span><div><b>${o.club.name}<em class="move-type">${o.moveType}</em></b><small>${o.club.league} · ${o.promise}</small></div></div><div class="offer-meta"><span>球队实力<b>${o.club.power}</b></span><span>承诺角色<b>${o.role}</b></span><span>周薪<b>€${o.wage}K</b></span></div></button>`}
async function hydrateOfferBadges(){
 const slots=[...document.querySelectorAll('[data-crest]')];slots.forEach(slot=>{const club=offerList[+slot.dataset.crest]?.club;if(!club)return;const img=new Image();img.alt=`${club.name}队徽`;img.onload=()=>slot.replaceChildren(img);img.src=club.crest})
}

function simulateSeason(){
 const offer=chosenOffer,club=offer.club,previousClub=game.club,roleBase={绝对核心:42,主力:36,轮换:25,替补:14}[offer.role];let apps=roleBase+rint(-3,3);const injury=rollInjury();let growth=rollGrowth();const beforeOverall=game.overall;
 if(chosenStrategy.id==='minutes'){apps+=4;growth+=.5}if(chosenStrategy.id==='numbers')growth+=.4;if(chosenStrategy.id==='trophies'){apps-=2;growth+=offer.fit>.99?.5:0}if(injury){apps-=injury.missed;growth-=injury.growthPenalty}
 apps=clamp(apps,4,48);const planBoost=chosenPlan.bonus*offer.fit;applyDevelopment(chosenPlan.attr,planBoost,growth);game.overall=calcOverall(game.attrs,game.position);const overallChange=game.overall-beforeOverall;
 const quality=clamp((game.overall+club.power)/2+offer.fit*5+rand(-6,6),45,99);const pos=POS_STATS[game.position];let goals=Math.max(0,Math.round(apps*pos.goal*(quality/80)*rand(.72,1.25)));let assists=Math.max(0,Math.round(apps*pos.assist*(quality/80)*rand(.72,1.25)));
 if(chosenStrategy.id==='numbers'){goals=Math.round(goals*1.22);assists=Math.round(assists*1.17)}if(POS_STATS[game.position].group==='defense'&&quality>84)assists+=rint(1,4);
 const teamHonors=rollTeamHonors(club,quality,chosenStrategy.id==='trophies');const personal=rollPersonalHonors(goals,assists,apps,teamHonors,club);const national=rollNationalSeason();const nationalHonors=national.honors;
 const rating=clamp(5.9+(goals+assists)/Math.max(15,apps)*2.25+(quality-75)/38+rand(-.18,.18),5.5,9.3);const valueFactor=Math.max(.55,1-(Math.max(0,game.age-29)*.07));game.value=Math.max(1,(game.overall-60)**1.78*.15*valueFactor+game.reputation*.32);
 game.reputation=clamp(game.reputation+(rating-6.2)*5+teamHonors.length*3+personal.length*7+nationalHonors.length*5,0,100);game.totalApps+=apps;game.totalGoals+=goals;game.totalAssists+=assists;game.trophyCount+=teamHonors.length+nationalHonors.length;game.honors.push(...personal);if(offer.moveType==='租借'&&previousClub)game.parentClub={...previousClub};else if(offer.moveType!=='留队')game.parentClub=null;game.club={...club};
 const seasonClub={...game.club};const leagueMovement=rollLeagueMovement(game.club,quality,teamHonors);if(leagueMovement)game.club.league=leagueMovement.to;
 const record={season:yearLabel(),age:game.age,club:seasonClub,moveType:offer.moveType,role:offer.role,overall:game.overall,overallChange,apps,goals,assists,rating:rating.toFixed(1),teamHonors,personal,national,nationalHonors,leagueMovement,injury:injury?.label||'',plan:chosenPlan.name,strategy:chosenStrategy.name};game.history.unshift(record);showReport(record);save();
}
function applyDevelopment(focus,bonus,growth){
 const keyAttrs=new Set(POS_STATS[game.position].keys);Object.keys(game.attrs).forEach(k=>{let add=keyAttrs.has(k)?growth+rand(-.8,.8):growth*.28+rand(-.35,.35);if(focus==='tech'&&['tech','shoot'].includes(k))add+=bonus*.45;if(focus==='physical'&&['pace','physical'].includes(k))add+=bonus*.45;if(focus==='mind'&&['vision','composure','defense'].includes(k))add+=bonus*.4;game.attrs[k]=Math.round(clamp(game.attrs[k]+add,35,game.potential))})
}
function rollGrowth(){
 const r=Math.random();if(game.age<=20)return r<.16?0:r<.46?rint(1,2):r<.78?rint(3,4):r<.94?rint(5,6):rint(7,9);if(game.age<=24)return r<.24?0:r<.61?rint(1,2):r<.87?rint(3,4):r<.97?rint(5,6):rint(7,8);if(game.age<=28)return r<.36?0:r<.79?rint(1,2):r<.95?rint(3,4):rint(5,6);if(game.age<=31)return r<.25?-1:r<.72?0:r<.94?1:2;if(game.age<=34)return r<.46?-1:r<.72?-2:r<.94?0:1;return r<.5?-2:r<.82?-1:r<.95?-3:0
}
function rollInjury(){
 let risk=.06+(chosenPlan.id==='body'?.025:0)+(chosenStrategy.id==='numbers'?.035:0)+(game.age>=31?.04:0);if(Math.random()>=risk)return null;const r=Math.random();if(r<.62)return{label:'轻微肌肉伤，缺阵数周',missed:rint(2,5),growthPenalty:0};if(r<.92)return{label:'脚踝或肌肉伤，缺阵两个月',missed:rint(7,12),growthPenalty:1};return{label:'重伤，赛季大部分时间报销',missed:rint(17,27),growthPenalty:rint(2,4)}
}
function rollTeamHonors(club,quality,trophyPush){
 const h=[];const boost=trophyPush?7:0;if(Math.random()*100<club.power-69+boost)h.push(`${club.league}冠军`);if(Math.random()*100<club.power-63+boost*.7)h.push(CUP_BY_LEAGUE[club.league]||'杯赛冠军');if(club.power>=82&&Math.random()*100<(club.power-77)*2.3+(quality-80)+boost)h.push('欧冠冠军');return h
}
function rollLeagueMovement(club,quality,honors){
 const second=LEAGUE_SYSTEMS[club.league];if(second){const risk=clamp((77-club.power)*4+(72-quality)*2,0,42);if(Math.random()*100<risk)return{type:'relegated',from:club.league,to:second,label:`降入${second}`}}
 const top=TOP_BY_SECOND[club.league];if(top){const champion=honors.includes(`${club.league}冠军`);const chance=champion?100:clamp(24+(club.power-72)*4+(quality-72)*2,12,78);if(Math.random()*100<chance)return{type:'promoted',from:club.league,to:top,label:`升入${top}`}}
 return null
}
function rollPersonalHonors(goals,assists,apps,teamHonors,club){
 const h=[];const ga=goals+assists;const group=POS_STATS[game.position].group;if(game.age<=21&&game.overall>=78&&ga>=18)h.push('金童奖');if(['attack','wing'].includes(group)&&goals>=Math.max(22,apps*.58))h.push(`${club.league}金靴`);if(['midfield','wing'].includes(group)&&assists>=15)h.push(`${club.league}助攻王`);if(game.overall>=87&&ga>=25)h.push(`${club.league}赛季最佳球员`);if(game.overall>=91&&ga>=32&&teamHonors.includes('欧冠冠军'))h.push('金球奖');return h
}
function nationalCompetition(nation,year){
 if(game.finalissimaYear===year&&['EU','SA'].includes(nation.confed))return'欧美杯';if(year%4===2)return'世界杯';if(nation.confed==='EU'&&year%4===0)return'欧洲杯';if(nation.confed==='SA'&&year%4===0)return'美洲杯';if(nation.confed==='AS'&&(year-2027)%4===0)return'亚洲杯';if(nation.confed==='AF'&&year%2===1)return'非洲杯';if(nation.confed==='EU'&&year%2===1)return'欧国联';return''
}
function rollNationalSeason(){
 const nation=NATIONS[game.nationality]||NATIONS.中国;const year=game.year+1;const competition=nationalCompetition(nation,year);const threshold=72+(nation.strength-65)*.35;const called=game.overall>=threshold||game.reputation>=threshold-42;if(!called)return{called:false,competition:'',apps:0,goals:0,honors:[]};let won=false;if(competition){let chance=clamp(6+(nation.strength-75)*1.25+(game.overall-80)*.8,2,52);if(competition==='世界杯')chance*=.72;won=Math.random()*100<chance}const max=COMPETITION_MAX[competition];const apps=competition?(competition==='欧美杯'?1:won?max:rint(3,max)):rint(2,6);const rate=POS_STATS[game.position].goal*.86;const goals=Math.max(0,Math.round(apps*rate*rand(.55,1.25)));game.totalNationalApps+=apps;game.totalNationalGoals+=goals;const honors=[];if(won){honors.push(`${competition}冠军`);if(['欧洲杯','美洲杯'].includes(competition))game.finalissimaYear=year+1;if(competition==='欧美杯')game.finalissimaYear=null}return{called:true,competition,apps,goals,honors}
}

function trophyKind(name){if(name==='世界杯冠军')return'world';if(name==='欧冠冠军')return'europe';if(['欧洲杯冠军','美洲杯冠军','亚洲杯冠军','非洲杯冠军','欧国联冠军','欧美杯冠军'].includes(name))return'national';if(name.includes('金球'))return'ball';if(name.includes('金童'))return'young';if(name.includes('金靴')||name.includes('助攻王')||name.includes('最佳球员'))return'personal';const leagues=[...new Set(CLUBS.map(c=>c.league)),...Object.values(LEAGUE_SYSTEMS)];if(leagues.some(l=>name===`${l}冠军`))return'league';return'cup'}
function trophyIcon(kind){const paths={world:'<circle cx="16" cy="8" r="5"/><path d="M13 13c0 4-2 5-4 7h14c-2-2-4-3-4-7M11 25h10M13 20v5m6-5v5M12 7h8M16 3v10"/>',europe:'<path d="M10 4h12v7c0 6-2 10-6 10s-6-4-6-10V4Zm0 3H5c0 5 2 8 6 9m11-9h5c0 5-2 8-6 9M12 27h8m-4-6v6"/>',national:'<path d="M9 5h14l-2 10c-.7 4-2.5 6-5 6s-4.3-2-5-6L9 5Zm2 4H6c0 4 2 7 6 8m9-8h5c0 4-2 7-6 8M12 27h8m-4-6v6"/>',league:'<path d="m7 8 5 4 4-7 4 7 5-4-2 11H9L7 8Zm2 11h14M11 27h10m-5-8v8"/>',ball:'<circle cx="16" cy="12" r="8"/><path d="m16 7 3 2-1 4h-4l-1-4 3-2Zm-3 6-3 2m8-2 3 2M11 27h10m-5-7v7"/>',young:'<path d="m16 4 2.4 5 5.6.8-4 4 .9 5.7-4.9-2.7-4.9 2.7.9-5.7-4-4 5.6-.8L16 4Zm-5 23h10m-5-8v8"/>',personal:'<path d="M10 5h12v7c0 5-2.5 8-6 8s-6-3-6-8V5Zm2 22h8m-4-7v7M10 8H6v3c0 3 2 5 5 5m11-8h4v3c0 3-2 5-5 5"/>',cup:'<path d="M11 5h10l2 5-3 9h-8l-3-9 2-5Zm-2 4H5c0 5 2 8 7 9m11-9h4c0 5-2 8-7 9M11 27h10m-5-8v8"/>'};return `<svg viewBox="0 0 32 32" aria-hidden="true">${paths[kind]||paths.cup}</svg>`}
function honorHTML(name,className='honor',count=1){const kind=trophyKind(name);return `<span class="${className}" data-trophy="${kind}">${trophyIcon(kind)}<span>${name}${count>1?` ×${count}`:''}</span></span>`}

function showReport(r){
 $('#report-year').textContent=r.season;$('#report-kicker').textContent=r.injury?'SEASON COMPLETE · 伤病影响':'SEASON COMPLETE';$('#report-title').textContent=`${r.club.name} · ${r.rating} 分`;
 const notes=[];if(r.personal.length)notes.push(`个人荣誉：${r.personal.join('、')}`);else if(r.teamHonors.length)notes.push(`随队获得${r.teamHonors.join('、')}`);else notes.push('俱乐部赛事没有夺冠');if(r.leagueMovement)notes.push(r.leagueMovement.label);if(r.injury)notes.push(r.injury);if(r.national?.called)notes.push(r.national.competition?`代表${game.nationality}参加${r.national.competition}，${r.national.apps}场${r.national.goals}球`:`代表${game.nationality}出场${r.national.apps}次`);$('#report-summary').textContent=notes.join('。')+'。';
 $('#report-stats').innerHTML=`<div><span>能力值</span><b>${r.overall} <small>${r.overallChange>=0?'+':''}${r.overallChange}</small></b></div><div><span>出场</span><b>${r.apps}</b></div><div><span>进球</span><b>${r.goals}</b></div><div><span>助攻</span><b>${r.assists}</b></div>`;
 const honors=[...r.teamHonors,...r.personal,...r.nationalHonors];$('#report-honors').innerHTML=honors.length?honors.map(x=>honorHTML(x)).join(''):'<span class="honor empty-honor">本季无冠</span>';$('#report').hidden=false;
}
function nextSeason(){
 $('#report').hidden=true;game.age++;game.year++;game.season++;if(game.parentClub){game.club={...game.parentClub};game.parentClub=null}if(game.age>=38){retire();return}renderGame()
}
function retire(){game.retired=true;const allHonors=game.history.flatMap(r=>[...(r.teamHonors||[]),...(r.personal||[]),...(r.nationalHonors||[])]);$('#report').hidden=false;$('#report-year').textContent=`${game.year}`;$('#report-kicker').textContent='CAREER COMPLETE';$('#report-title').textContent='终场哨响。';$('#report-summary').textContent=`俱乐部${game.totalApps}场${game.totalGoals}球${game.totalAssists}助，国家队${game.totalNationalApps}场${game.totalNationalGoals}球，共获得${game.trophyCount}座冠军。`;$('#report-stats').innerHTML=`<div><span>最终能力</span><b>${game.overall}</b></div><div><span>出场</span><b>${game.totalApps}</b></div><div><span>国家队</span><b>${game.totalNationalApps}</b></div><div><span>冠军</span><b>${game.trophyCount}</b></div>`;$('#report-honors').innerHTML=[...new Set(allHonors)].map(x=>honorHTML(x)).join('')||'<span class="honor empty-honor">职业球员</span>';$('#next-season').textContent='查看完整履历';$('#next-season').onclick=()=>{$('#report').hidden=true};save()}
function renderTimeline(){
 $('#timeline').innerHTML=game.history.length?game.history.map(r=>`<article class="year-row"><span>${r.season}</span><div class="year-club"><b>${r.club.name}</b><small>${r.moveType?`${r.moveType} · `:''}${r.club.league} · ${r.role} · ${r.plan}${r.leagueMovement?` · ${r.leagueMovement.label}`:''}${r.injury?` · ${r.injury}`:''}</small></div><div class="year-result"><b>${r.apps} 场 ${r.goals} 球 ${r.assists} 助</b><small>${[...r.teamHonors,...r.personal,...(r.nationalHonors||[])].join(' · ')||(r.national?.competition?`${r.national.competition} · 无冠赛季`:'无冠赛季')}</small></div><strong class="year-ovr">${r.overall}<small>${(r.overallChange||0)>=0?'+':''}${r.overallChange||0}</small></strong></article>`).join(''):'<p class="empty">第一份职业合同还没有签字。</p>'
}
function renderHonorCabinet(){
 const honors=game.history.flatMap(r=>[...(r.teamHonors||[]),...(r.personal||[]),...(r.nationalHonors||[])]);const counts=honors.reduce((all,h)=>{all[h]=(all[h]||0)+1;return all},{});$('#total-honor-count').textContent=honors.length;$('#honor-count').textContent=`${honors.length} 项荣誉`;$('#career-honors').innerHTML=honors.length?Object.entries(counts).map(([name,count])=>honorHTML(name,'career-honor',count)).join(''):'<small>荣誉室还是空的</small>'
}

$('#setup-form').onsubmit=e=>{e.preventDefault();const name=$('#player-name').value.trim()||'小将';const position=document.querySelector('input[name="position"]:checked').value;game=newGame(name,position,$('#nationality').value,+$('#start-age').value);renderGame()};
$('#simulate').onclick=simulateSeason;$('#next-season').onclick=nextSeason;$('#retire-early').onclick=()=>{if(confirm('确定现在退役，并生成完整生涯报告？'))retire()};$('#reset').onclick=()=>{if(confirm('确定删除当前生涯并重新开档？')){localStorage.removeItem(SAVE_KEY);location.reload()}};
$('#lock-nationality').onclick=()=>{game.nationality=$('#passport-nationality').value;game.needsNationality=false;renderGame()};
const existing=load();if(existing){$('#continue').hidden=false;$('#continue').onclick=()=>{game=existing;renderGame()}}
