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
  ['那个决定胜负的名字',['梅西','C罗','姆巴佩','哈兰德']],['队徽还在积分榜上的位置',['皇马','巴萨','利物浦','曼联','阿森纳']],['一群人短暂成为同一个人的感觉',['阿根廷','法国','巴西','英格兰']],['某个没人讨论、但自己记得的细节',['莫德里奇','阿扎尔','格列兹曼','穆西亚拉']]]}
];

let state;
const RIVALS={巴萨:'皇马',皇马:'巴萨',曼联:'利物浦',利物浦:'曼联'};
const GROUPS=[
 {name:'红蓝传控派',members:['巴萨','西班牙']},
 {name:'梅西宇宙',members:['巴萨','阿根廷','梅西']},
 {name:'德意志南部阵线',members:['德国','拜仁']},
 {name:'白色七号信徒',members:['皇马','葡萄牙','C罗']},
 {name:'红黑亚平宁遗民',members:['AC米兰','意大利']}
];
const SPECIAL_PAIRS=[
 {name:'瓜迪奥拉系',members:['巴萨','曼城'],min:30,line:'那个战术天才一定让你印象深刻。'},
 {name:'THE SPECIAL ONE',members:['皇马','国际米兰'],min:25,line:'the SPECIAL ONE'}
];
function reset(){state={index:0,asked:[],history:[],scores:{},unknown:0,orders:{}};}
function pickQuestion(){
 const unused=Q.filter(q=>!state.asked.includes(q.id));
 if(!unused.length)return null;
 if(state.index<6)return unused[0];
 const leaders=Object.entries(state.scores).sort((a,b)=>b[1]-a[1]).slice(0,8).map(x=>x[0]);
 return unused.sort((x,y)=>relevance(y,leaders)-relevance(x,leaders))[0];
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
 state.orders[q.id].forEach(([label,tags],i)=>{const b=document.createElement('button');b.className='answer';b.innerHTML=`<span>${String.fromCharCode(65+i)}.</span> ${label}`;b.onclick=()=>answer(tags);$('#answers').appendChild(b)});
}
function answer(tags,unknown=false){
 state.history.push({scores:{...state.scores},asked:[...state.asked],unknown:state.unknown});
 if(unknown)state.unknown++; else tags.forEach((t,i)=>{
  const points=i<2?3:2;
  state.scores[t]=(state.scores[t]||0)+points;
  const rival=RIVALS[t];
  if(rival)state.scores[rival]=(state.scores[rival]||0)-points;
 });
 state.index++; render();
}
function back(){if(!state.index)return;const h=state.history.pop();state.scores=h.scores;state.asked=h.asked;state.unknown=h.unknown;state.index--;render()}
function finish(){
 const all=Object.entries(state.scores).filter(([,s])=>s>0).sort((a,b)=>b[1]-a[1]).slice(0,5);
 const rankBoost=[1.35,1.12,1,.5,.3];
 const adjusted=all.map(([n,s],i)=>[n,Math.pow(s,1.18)*rankBoost[i]]); const sum=adjusted.reduce((a,x)=>a+x[1],0);
 let p=all.length?adjusted.map(([n,s])=>[n,Math.round(s/sum*100)]):[['未表态',100]]; p[0][1]+=100-p.reduce((a,x)=>a+x[1],0); state.result=p;
 const pct=Object.fromEntries(p);
 const single=all.length?p.find(([,v])=>v>=40):null;
 const group=GROUPS.map(g=>({...g,value:g.members.reduce((n,m)=>n+(pct[m]||0),0)})).sort((a,b)=>b.value-a.value)[0];
 const special=SPECIAL_PAIRS.map(g=>({...g,value:g.members.reduce((n,m)=>n+(pct[m]||0),0)})).filter(g=>g.members.every(m=>(pct[m]||0)>g.min)).sort((a,b)=>b.value-a.value)[0];
 state.identity=special?{kind:'special',name:special.name,value:special.value,members:special.members,line:special.line}:group?.value>=40&&(!single||group.value>=single[1])?{kind:'group',name:group.name,value:group.value,members:group.members}:single?{kind:'single',name:single[0],value:single[1],members:[single[0]]}:{kind:'neutral',name:'中立球迷',value:0,members:[]};
 $('#result-bars').innerHTML=p.map(([n,v],i)=>`<div class="result-row"><span class="result-name">${i+1}. ${n}</span><span class="bar-track"><span class="bar-fill" style="width:${v}%"></span></span><b class="result-pct">${v}%</b></div>`).join('');
 const top=p[0][0]; $('#result-line').textContent=state.identity.kind==='neutral'?'没有任何阵营越过 40%：你被判定为「中立球迷」。':`${['group','special'].includes(state.identity.kind)?'成分组':'主成分'}「${state.identity.name}」达到 ${state.identity.value}%。`;
 $('#verdict').textContent=verdict(top,p,state.identity); $('#result-no').textContent='NO. '+String(Math.floor(Math.random()*9999)).padStart(4,'0');
 show('result-screen');
}
function verdict(top,p,identity){
 const second=p[1]?.[0]||'';
 if(identity.kind==='special')return identity.line;
 if(identity.kind==='neutral')return '你看球，却不急着归队。每一座看台都能借你一个夜晚，没有一面旗帜能永久占领你。';
 const map={梅西:'你相信最好的足球先让人屏住呼吸，再让比分失去解释力。',C罗:'你对决定性时刻有近乎苛刻的迷恋，越大的舞台越值得下注。',巴萨:'你支持的不只是结果，还有一种球该如何移动的固执。',皇马:'你把压力视为舞台灯光：越亮，越应该有人站出来。',阿根廷:'你愿意陪一段漫长故事走到最后，足球对你从来不只九十分钟。',利物浦:'你相信看台能参与比赛，歌声与逆转之间并非巧合。',意大利:'亚平宁的风，什么时候再吹拂大力神杯？',AC米兰:'致旧时代的残党。'};
 const groupMap={红蓝传控派:'足球必须先忠于一种踢法，然后才轮到比分。',梅西宇宙:'从诺坎普到潘帕斯，你追随的是同一位十号留下的引力。',德意志南部阵线:'秩序、强度与胜利——南部之星照着德意志战车前进。',白色七号信徒:'伯纳乌的白与葡萄牙的红，都在等待七号完成最后一击。',红黑亚平宁遗民:'致旧时代的残党。亚平宁的风，什么时候再吹拂大力神杯？'};
 if(identity.kind==='group')return groupMap[identity.name];
 return (map[top]||`你最强的信号落在「${top}」，但「${second}」让这份忠诚保留了意外。`) + (state.unknown>4?' 你跳过了不少陌生题，结果更偏向你明确表达过的部分。':'');
}
function resultText(){const title=state.identity.kind==='neutral'?'中立球迷':`${state.identity.name} ${state.identity.value}%`;return `我的足球身份：${title}｜`+state.result.map(x=>`${x[1]}% ${x[0]}`).join(' · ')+'｜看台成分局'}
$('#start-btn').onclick=()=>{reset();show('quiz-screen');render()};
$('#unknown-btn').onclick=()=>answer([],true); $('#back-btn').onclick=back;
$('#restart-btn').onclick=()=>{reset();show('quiz-screen');render()};
$('#copy-btn').onclick=async()=>{try{await navigator.clipboard.writeText(resultText());$('#copy-status').textContent='结果已复制，可以发给你的看球搭子了。'}catch{$('#copy-status').textContent=resultText()}};
reset();
