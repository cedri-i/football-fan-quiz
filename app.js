const $ = s => document.querySelector(s);
const screens = [...document.querySelectorAll('.screen')];
const show = id => { screens.forEach(s => s.classList.toggle('active', s.id === id)); window.scrollTo(0,0); };

const Q = [
 {id:'week',type:'观赛习惯',text:'一个没有安排的周末，你最可能被哪种比赛留在沙发上？',a:[
  ['节奏快得来不及看手机',['利物浦','阿森纳','曼城','热刺','英格兰']],['技术细节像一盘慢慢展开的棋',['巴萨','皇家社会','西班牙','莫德里奇']],['防线每次移动都让人舒适',['国际米兰','尤文图斯','马竞','意大利']],['看不懂也会被现场气氛卷进去',['多特蒙德','马赛','法兰克福','凯尔特人']]]},
 {id:'hero',type:'英雄叙事',text:'故事来到第 89 分钟，你更相信哪一种英雄？',a:[
  ['过掉最后一个人，把球轻轻送进死角',['梅西','内马尔','亚马尔','巴萨','阿根廷']],['把全队扛在肩上，用最直接的方式结束比赛',['C罗','姆巴佩','哈兰德','皇马','葡萄牙']],['不抢镜，却提前两秒看见了出口',['莫德里奇','克罗地亚','皇家社会','阿森纳']],['抢下那个没人认为还能救回的球',['格列兹曼','马竞','法国','毕尔巴鄂竞技']]]},
 {id:'loss',type:'比赛情绪',text:'主队输掉一场关键比赛后，哪种痛最真实？',a:[
  ['明明控制了一切，却输给一次反击',['巴萨','曼城','阿森纳','西班牙']],['拼到了最后，还是差一点天赋',['多特蒙德','马竞','那不勒斯','克罗地亚']],['巨星都在，却像第一次见面',['巴黎圣日耳曼','切尔西','利雅得新月']],['没人看好，差点就把豪门拖下水',['毕尔巴鄂竞技','布莱顿','布伦特福德','摩洛哥']]]},
 {id:'shirt',type:'球衣记忆',text:'一件旧球衣最珍贵的部分应该是什么？',a:[
  ['背后那个陪你长大的名字',['梅西','C罗','内马尔','阿扎尔','格列兹曼']],['胸前队徽，名字可以没有',['利物浦','曼联','拜仁','国际米兰','AC米兰']],['一处冷门客场留下的污渍',['埃弗顿','诺丁汉森林','马赛','法兰克福']],['它来自国家队大赛的那个夏天',['阿根廷','法国','德国','西班牙','巴西']]]},
 {id:'money',type:'转会态度',text:'夏窗突然得到一大笔预算，你希望俱乐部怎么花？',a:[
  ['只买最亮的那颗星，压力也是比赛的一部分',['皇马','巴黎圣日耳曼','利雅得新月','切尔西']],['买三个还没出名、但数据很怪的年轻人',['布莱顿','勒沃库森','里尔','阿贾克斯']],['留下队长，再给青训一次机会',['巴萨','毕尔巴鄂竞技','曼联','里昂']],['先把后腰和中卫补明白',['马竞','尤文图斯','国际米兰','德国']]]},
 {id:'noise',type:'看台声浪',text:'哪一种主场声音最容易让你起鸡皮疙瘩？',a:[
  ['整座看台唱同一首老歌',['利物浦','多特蒙德','凯尔特人','马赛']],['进球后像城市突然爆炸',['那不勒斯','博卡青年','河床','阿根廷']],['嘘声也是要求：这里必须赢',['皇马','拜仁','巴黎圣日耳曼']],['人数不多，但每个人都认识这段历史',['毕尔巴鄂竞技','布伦特福德','考文垂','乌拉圭']]]},
 {id:'final',type:'大赛立场',text:'世界杯决赛没有你的主队，你会悄悄站在哪一边？',a:[
  ['那个等待多年、终于接近圆满的人',['阿根廷','梅西','克罗地亚','莫德里奇']],['人才多到替补席都能进决赛的一方',['法国','巴西','英格兰','姆巴佩']],['秩序严密、像一台校准过的机器',['德国','西班牙','瑞士','日本']],['第一次走到这里、让全世界意外的一方',['摩洛哥','挪威','加拿大','塞内加尔']]]},
 {id:'goal',type:'进球审美',text:'只能把一种进球永久保存，你留哪一个？',a:[
  ['连续二十脚传递后推空门',['巴萨','曼城','西班牙','梅西']],['边路生吃，内切后兜远角',['内马尔','阿扎尔','姆巴佩','巴西']],['禁区里强行起跳，把悬念砸碎',['C罗','哈兰德','葡萄牙','挪威']],['角球二点球，一脚混乱中的重炮',['马竞','国际米兰','德国','乌拉圭']]]},
 {id:'rival',type:'宿敌反应',text:'德比前夜，哪句话最接近你？',a:[
  ['踢得好不好不重要，明天只能赢',['皇马','巴萨','马竞','曼联','利物浦']],['希望对面全员健康，这样赢了才算数',['阿森纳','曼城','拜仁','勒沃库森']],['已经把过去十年的名场面又看了一遍',['国际米兰','AC米兰','尤文图斯','多特蒙德']],['嘴上说无所谓，赛程公布那天已经记住日期',['埃弗顿','热刺','罗马','拉齐奥']]]},
 {id:'captain',type:'队长气质',text:'你更愿意把袖标交给谁？',a:[
  ['沉默的大脑，球永远比话快一步',['莫德里奇','克罗地亚','阿森纳']],['全场最不允许失败的人',['C罗','皇马','拜仁','葡萄牙']],['从青训一路走来、懂每句队歌的人',['巴萨','毕尔巴鄂竞技','曼联','阿贾克斯']],['最混乱时还能笑着把大家拉回来的人',['格列兹曼','法国','马竞']]]},
 {id:'away',type:'客场选择',text:'送你一张客场票，你会选哪一种夜晚？',a:[
  ['海风、烟火和近得过分的看台',['马赛','那不勒斯','摩纳哥','本菲卡']],['冬夜、啤酒和站满人的黄色看台',['多特蒙德','法兰克福','拜仁','德国']],['雨一直下，比赛却快得离谱',['利物浦','曼联','阿森纳','英格兰']],['暖风、棕榈树和一位熟悉的老朋友',['迈阿密国际','梅西','巴萨','阿根廷']]]},
 {id:'future',type:'新星观察',text:'面对一个 18 岁天才，你最想先看到什么？',a:[
  ['敢在两个人之间继续带球',['亚马尔','穆西亚拉','巴萨','德国']],['速度到了最后十米仍然清醒',['姆巴佩','法国','皇家马德里']],['身体像成年人，射门也不讲道理',['哈兰德','挪威','曼城']],['愿意回追六十米，再重新要球',['格列兹曼','马竞','日本']]]},
 {id:'comeback',type:'逆转时刻',text:'落后两球时，镜头扫过看台，你希望看到什么？',a:[
  ['没人坐下，歌声反而更大',['利物浦','多特蒙德','马赛','凯尔特人']],['一种“这场一定会回来”的傲慢',['皇马','曼联','拜仁']],['教练已经在场边冷静地改了三个位置',['曼城','阿森纳','勒沃库森']],['年轻人互相看了一眼，决定继续冒险',['巴萨','阿贾克斯','亚马尔']]]},
 {id:'small',type:'冷门选择',text:'你会因为什么开始长期关注一支非豪门？',a:[
  ['它从不改变自己的城市性格',['毕尔巴鄂竞技','皇家贝蒂斯','法兰克福','埃弗顿']],['它总能把无名球员变成昂贵新星',['布莱顿','里尔','摩纳哥','勒沃库森']],['某次杯赛，它把所有预测都撕了',['莱斯特城','考文垂','摩洛哥','克罗地亚']],['一位喜欢的球员刚好在那里停留',['温哥华白浪','迈阿密国际','利雅得胜利','洛杉矶FC']]]},
 {id:'legacy',type:'时代记忆',text:'如果能重看一个足球时代，你会选哪幅画面？',a:[
  ['十号在狭小空间里把人群变成背景',['梅西','巴萨','阿根廷']],['边锋踩单车，伯纳乌准备迎接又一个巨星',['C罗','皇马','葡萄牙']],['意大利的夜晚，后卫与前锋互相折磨',['米兰','国际米兰','尤文图斯','意大利']],['英格兰的泥地、长袖和永不停止的边线声',['曼联','阿森纳','利物浦','英格兰']]]},
 {id:'national',type:'国家队时刻',text:'国歌响起时，哪一种队伍最吸引你？',a:[
  ['技术像从街头长出来，快乐也带一点忧伤',['巴西','内马尔','乌拉圭','哥伦比亚']],['天才很多，但每届都背着沉重期待',['英格兰','法国','葡萄牙','比利时']],['不是最大热门，却总比想象中走得远',['克罗地亚','瑞士','摩洛哥','日本']],['整个国家似乎只在等待这一座奖杯',['阿根廷','德国','西班牙','荷兰']]]},
 {id:'club',type:'俱乐部性格',text:'你更愿意把十年交给怎样的俱乐部？',a:[
  ['冠军很多，要求也永远不会降低',['皇马','拜仁','曼城','尤文图斯']],['可能跌倒，但故事和歌不会断',['利物浦','曼联','AC米兰','马赛']],['先把一种踢法坚持成身份',['巴萨','阿贾克斯','阿森纳','西班牙']],['不需要所有人喜欢，只要自己人够坚定',['马竞','毕尔巴鄂竞技','多特蒙德','乌拉圭']]]},
 {id:'last',type:'最后一题',text:'比赛结束后，你最常把哪件事带走？',a:[
  ['那个决定胜负的名字',['梅西','C罗','姆巴佩','哈兰德']],['队徽还在积分榜上的位置',['皇马','巴萨','利物浦','曼联','阿森纳']],['一群人短暂成为同一个人的感觉',['阿根廷','法国','巴西','英格兰']],['某个没人讨论、但自己记得的细节',['莫德里奇','阿扎尔','格列兹曼','穆西亚拉']]]},
 {id:'duel_finish',duel:true,type:'巨星加时',text:'决赛最后一分钟，你更愿意把球交给哪种人？',a:[
  ['不急着射，先把面前的人晃开',['梅西','巴萨','阿根廷']],['不用铺垫，接球就冲着球门去',['C罗','皇马','葡萄牙']],['队友真空了，他会把球传出去',['梅西','巴萨','阿根廷']],['哪怕刚踢丢一个，也还敢主动要球',['C罗','皇马','葡萄牙']]]},
 {id:'duel_story',duel:true,type:'生涯叙事',text:'下面两种职业生涯，你更吃哪一套？',a:[
  ['在一家俱乐部从小孩踢成队长，一人一城',['梅西','巴萨','阿根廷']],['换个联赛，照样从头赢一遍',['C罗','皇马','葡萄牙']],['球迷看着他长大，他也成了这座城的记忆',['梅西','巴萨','阿根廷']],['主场换了好几个，目标一直没变',['C罗','皇马','葡萄牙']]]},
 {id:'duel_leader',duel:true,type:'领袖方式',text:'球队踢乱了，你希望头牌怎么做？',a:[
  ['多拿球，先把节奏捋顺',['梅西','巴萨','阿根廷']],['直接喊话，下一球交给他',['C罗','皇马','葡萄牙']],['回到中场接球，让大家先传起来',['梅西','巴萨','阿根廷']],['把全队叫醒，再往前冲一次',['C罗','皇马','葡萄牙']]]},
 {id:'duel_memory',duel:true,type:'巨星决胜',text:'你更常点开哪类集锦？',a:[
  ['贴着脚的连续变向',['梅西','巴萨','阿根廷']],['压着后卫起跳的头球',['C罗','皇马','葡萄牙']],['几个人围着，球就是抢不走',['梅西','巴萨','阿根廷']],['绝杀后冲向角旗区',['C罗','皇马','葡萄牙']]]}
];

let state;
const RIVALS={巴萨:'皇马',皇马:'巴萨',曼联:'利物浦',利物浦:'曼联',梅西:'C罗',C罗:'梅西'};
const GROUPS=[
 {name:'红蓝传控派',members:['巴萨','西班牙']},
 {name:'梅西宇宙',members:['巴萨','阿根廷','梅西']},
 {name:'德意志南部阵线',members:['德国','拜仁']},
 {name:'白色七号信徒',members:['皇马','葡萄牙','C罗']},
 {name:'红黑亚平宁遗民',members:['AC米兰','意大利']}
];
const SPECIAL_PAIRS=[
 {name:'瓜迪奥拉系',members:['巴萨','曼城'],min:30,line:'那个战术天才一定让你印象深刻。'},
 {name:'the SPECIAL ONE',members:['皇马','国际米兰'],min:25,line:'the SPECIAL ONE'}
];
const PLAYERS=new Set(['梅西','C罗','内马尔','莫德里奇','阿扎尔','格列兹曼','亚马尔','姆巴佩','哈兰德','穆西亚拉']);
const IMAGE_QUERY={
 巴萨:'FC Barcelona',皇马:'Real Madrid CF',马竞:'Atlético Madrid',曼城:'Manchester City FC',曼联:'Manchester United FC',利物浦:'Liverpool FC',阿森纳:'Arsenal FC',热刺:'Tottenham Hotspur FC',切尔西:'Chelsea FC',拜仁:'FC Bayern Munich',多特蒙德:'Borussia Dortmund',AC米兰:'AC Milan',国际米兰:'Inter Milan',尤文图斯:'Juventus FC',巴黎圣日耳曼:'Paris Saint-Germain FC',马赛:'Olympique de Marseille',阿贾克斯:'AFC Ajax',勒沃库森:'Bayer 04 Leverkusen',毕尔巴鄂竞技:'Athletic Bilbao',皇家社会:'Real Sociedad',皇家贝蒂斯:'Real Betis',那不勒斯:'SSC Napoli',法兰克福:'Eintracht Frankfurt',摩纳哥:'AS Monaco FC',里尔:'Lille OSC',里昂:'Olympique Lyonnais',凯尔特人:'Celtic FC',迈阿密国际:'Inter Miami CF',利雅得胜利:'Al Nassr FC',利雅得新月:'Al Hilal SFC',
 梅西:'Lionel Messi',C罗:'Cristiano Ronaldo',内马尔:'Neymar',莫德里奇:'Luka Modrić',阿扎尔:'Eden Hazard',格列兹曼:'Antoine Griezmann',亚马尔:'Lamine Yamal',姆巴佩:'Kylian Mbappé',哈兰德:'Erling Haaland',穆西亚拉:'Jamal Musiala'
};
const COUNTRIES=new Set(['巴西','阿根廷','法国','德国','英格兰','西班牙','葡萄牙','荷兰','日本','挪威','乌拉圭','克罗地亚','摩洛哥','瑞士','意大利','比利时','加拿大','塞内加尔','哥伦比亚']);
const COUNTRY_QUERY={巴西:'Brazil',阿根廷:'Argentina',法国:'France',德国:'Germany',英格兰:'England',西班牙:'Spain',葡萄牙:'Portugal',荷兰:'Netherlands',日本:'Japan',挪威:'Norway',乌拉圭:'Uruguay',克罗地亚:'Croatia',摩洛哥:'Morocco',瑞士:'Switzerland',意大利:'Italy',比利时:'Belgium',加拿大:'Canada',塞内加尔:'Senegal',哥伦比亚:'Colombia'};
function reset(){state={index:0,asked:[],history:[],scores:{},unknown:0,orders:{}};}
function pickQuestion(){
 const unused=Q.filter(q=>!state.asked.includes(q.id));
 if(!unused.length)return null;
 const duelUnused=unused.filter(q=>q.duel);
 const duelCount=state.asked.filter(id=>Q.find(q=>q.id===id)?.duel).length;
 const duelGap=Math.abs((state.scores['梅西']||0)-(state.scores['C罗']||0));
 if(state.index===4&&duelCount<1)return duelUnused[0];
 if(state.index===9&&duelCount<2)return duelUnused[0];
 if(state.index===13&&duelCount<3&&duelGap<6)return duelUnused[0];
 if(state.index===16&&duelCount<4&&duelGap<6)return duelUnused[0];
 const standardUnused=unused.filter(q=>!q.duel);
 if(!standardUnused.length)return duelUnused[0]||null;
 if(state.index<6)return standardUnused[0];
 const leaders=Object.entries(state.scores).sort((a,b)=>b[1]-a[1]).slice(0,8).map(x=>x[0]);
 return standardUnused.sort((x,y)=>relevance(y,leaders)-relevance(x,leaders))[0];
}
function relevance(q,leaders){return q.a.flatMap(x=>x[1]).filter(x=>leaders.includes(x)).length+Math.random()*.4}
function render(){
 const q=pickQuestion(); if(!q||state.index>=18){finish();return}
 state.current=q; state.asked.push(q.id);
 $('#question-type').textContent=q.type.toUpperCase(); $('#question-text').textContent=q.text;
 $('#counter').textContent=String(state.index+1).padStart(2,'0')+' / 18';
 $('#progress').style.width=((state.index)/18*100)+'%';
 $('#back-btn').style.opacity=state.index?'1':'.35';
 $('#answers').innerHTML='';
 if(!state.orders[q.id])state.orders[q.id]=[...q.a].sort(()=>Math.random()-.5);
 state.orders[q.id].forEach(([label,tags],i)=>{const b=document.createElement('button');b.className='answer';b.innerHTML=`<span>${String.fromCharCode(65+i)}.</span> ${label}`;b.onclick=()=>answer(tags,false,q.duel);$('#answers').appendChild(b)});
}
function answer(tags,unknown=false,duel=false){
 state.history.push({scores:{...state.scores},asked:[...state.asked],unknown:state.unknown});
 if(unknown)state.unknown++; else if(duel){
  const star=tags[0],rival=RIVALS[star];
  state.scores[star]=(state.scores[star]||0)+4;
  state.scores[rival]=(state.scores[rival]||0)-4;
  tags.slice(1).forEach(t=>state.scores[t]=(state.scores[t]||0)+1);
 }else tags.forEach((t,i)=>{
  const points=i<2?3:2;
  state.scores[t]=(state.scores[t]||0)+points;
  const rival=RIVALS[t];
  if(rival)state.scores[rival]=(state.scores[rival]||0)-points;
 });
 state.index++; render();
}
function back(){if(!state.index)return;const h=state.history.pop();state.scores=h.scores;state.asked=h.asked;state.unknown=h.unknown;state.index--;render()}
function finish(){
 let ranked=Object.entries(state.scores).filter(([,s])=>s>0).sort((a,b)=>b[1]-a[1]);
 const messiRank=ranked.findIndex(([n])=>n==='梅西'),ronaldoRank=ranked.findIndex(([n])=>n==='C罗');
 if(messiRank>=0&&messiRank<5&&ronaldoRank>=0&&ronaldoRank<5){
  const messiScore=state.scores['梅西'],ronaldoScore=state.scores['C罗'];
  ranked=ranked.filter(([n])=>messiScore===ronaldoScore?!['梅西','C罗'].includes(n):n!==(messiScore>ronaldoScore?'C罗':'梅西'));
 }
 const all=ranked.slice(0,5);
 const rankBoost=[1.35,1.12,1,.5,.3];
 const adjusted=all.map(([n,s],i)=>[n,Math.pow(s,1.18)*rankBoost[i]]); const sum=adjusted.reduce((a,x)=>a+x[1],0);
 let p=all.length?adjusted.map(([n,s])=>[n,Math.round(s/sum*100)]):[['未表态',100]]; p[0][1]+=100-p.reduce((a,x)=>a+x[1],0); state.result=p;
 const pct=Object.fromEntries(p);
 const single=all.length?p.find(([,v])=>v>=40):null;
 const group=GROUPS.map(g=>({...g,value:g.members.reduce((n,m)=>n+(pct[m]||0),0)})).sort((a,b)=>b.value-a.value)[0];
 const special=SPECIAL_PAIRS.map(g=>({...g,value:g.members.reduce((n,m)=>n+(pct[m]||0),0)})).filter(g=>g.members.every(m=>(pct[m]||0)>g.min)).sort((a,b)=>b.value-a.value)[0];
 state.identity=special?{kind:'special',name:special.name,value:special.value,members:special.members,line:special.line}:group?.value>=40&&(!single||group.value>=single[1])?{kind:'group',name:group.name,value:group.value,members:group.members}:single?{kind:'single',name:single[0],value:single[1],members:[single[0]]}:{kind:'neutral',name:'中立球迷',value:0,members:[]};
 $('#result-bars').innerHTML=p.map(([n,v],i)=>`<div class="result-row"><span class="result-name">${i+1}. ${n}</span><span class="bar-track"><span class="bar-fill" style="width:${v}%"></span></span><b class="result-pct">${v}%</b><span class="result-visual ${PLAYERS.has(n)?'player':'crest'}" data-name="${n}"><span>${n.slice(0,2)}</span></span></div>`).join('');
 hydrateResultImages(p);
 const top=p[0][0]; $('#result-line').textContent=state.identity.kind==='neutral'?'没有任何阵营越过 40%：你被判定为「中立球迷」。':`${['group','special'].includes(state.identity.kind)?'成分组':'主成分'}「${state.identity.name}」达到 ${state.identity.value}%。`;
 const verdictText=verdict(top,p,state.identity);
 const isMourinho=state.identity.name==='the SPECIAL ONE';
 if(isMourinho)$('#verdict').innerHTML='the <strong>SPECIAL ONE</strong>'; else $('#verdict').textContent=verdictText;
 $('#mourinho-card').hidden=!isMourinho; $('#result-no').textContent='NO. '+String(Math.floor(Math.random()*9999)).padStart(4,'0');
 show('result-screen');
}
function verdict(top,p,identity){
 const second=p[1]?.[0]||'';
 if(identity.kind==='special')return identity.line;
 if(identity.kind==='neutral')return '你没有特别固定的阵营。谁踢得好，你就愿意多看一会儿。';
 const map={梅西:'人再多，他也能把下一步处理得很简单。你喜欢看这种球。',C罗:'比赛越关键，你越愿意把机会交给他。',姆巴佩:'我已经坐好了…',巴萨:'比分要赢，球也得踢得像巴萨。',皇马:'Tres, dos, uno... Hala Madrid!',阿根廷:'你愿意陪一支队熬很多年，直到它真把杯子举起来。',利物浦:'歌还在唱，比赛就不算结束。',意大利:'亚平宁的风，什么时候再吹拂大力神杯？',AC米兰:'致旧时代的残党。'};
 const groupMap={红蓝传控派:'比分要赢，球也得踢得好看。',梅西宇宙:'从巴萨到阿根廷，你看的始终是那个十号。',德意志南部阵线:'你喜欢拜仁，也习惯在大赛里等德国队回来。',白色七号信徒:'皇马、葡萄牙、七号。你很清楚自己在等谁进球。',红黑亚平宁遗民:'致旧时代的残党。亚平宁的风，什么时候再吹拂大力神杯？'};
 if(identity.kind==='group')return groupMap[identity.name];
 return (map[top]||`你最强的信号落在「${top}」，但「${second}」让这份忠诚保留了意外。`) + (state.unknown>4?' 你跳过了不少陌生题，结果更偏向你明确表达过的部分。':'');
}
function resultText(){const title=state.identity.kind==='neutral'?'中立球迷':`${state.identity.name} ${state.identity.value}%`;return `我的足球身份：${title}｜`+state.result.map(x=>`${x[1]}% ${x[0]}`).join(' · ')+'｜看台成分局'}
async function hydrateResultImages(results){
 await Promise.all(results.map(async([name])=>{
 const slot=document.querySelector(`.result-visual[data-name="${name}"]`); if(!slot||name==='未表态')return;
  if(name==='梅西'){
   const img=new Image(); img.alt='梅西身穿巴萨球衣张开双臂'; img.onload=()=>slot.replaceChildren(img); img.src='messi-user.png'; return;
  }
  const query=COUNTRIES.has(name)?COUNTRY_QUERY[name]:(IMAGE_QUERY[name]||`${name} football club`);
  try{
   const url=PLAYERS.has(name)
    ?`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1&prop=pageimages&piprop=thumbnail&pithumbsize=800&format=json&origin=*`
    :`https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(query)}`;
   const data=await fetch(url).then(r=>r.json());
   const src=PLAYERS.has(name)?Object.values(data.query?.pages||{})[0]?.thumbnail?.source:data.teams?.[0]?.strBadge;
   if(!src)return;
   const img=new Image(); img.alt=PLAYERS.has(name)?`${name}高清头像`:`${name}队徽`; img.onload=()=>slot.replaceChildren(img); img.src=src;
  }catch{}
 }));
}
$('#start-btn').onclick=()=>{reset();show('quiz-screen');render()};
$('#unknown-btn').onclick=()=>answer([],true); $('#back-btn').onclick=back;
$('#restart-btn').onclick=()=>{reset();show('quiz-screen');render()};
$('#copy-btn').onclick=async()=>{try{await navigator.clipboard.writeText(resultText());$('#copy-status').textContent='结果已复制，可以发给你的看球搭子了。'}catch{$('#copy-status').textContent=resultText()}};
reset();
