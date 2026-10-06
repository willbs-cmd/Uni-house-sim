/* Uni House Sim — Chaos Edition */
const ACTIONS = [
  {id:"study", cat:"uni", icon:"📚", title:"Actually study", desc:"Go to the library and do the thing you have been pretending to do.", tag:"GRADE ↑  SANITY ↓", fn:()=>{grades+=8; sanity-=5; energy-=10;}},
  {id:"essay", cat:"uni", icon:"💻", title:"Pull an essay all-nighter", desc:"Academic panic is a powerful, terrible stimulant.", tag:"GRADE ↑↑  SANITY ↓↓", fn:()=>{grades+=15; sanity-=17; energy-=20;}},
  {id:"lecture", cat:"uni", icon:"🎓", title:"Attend a lecture", desc:"Sit near the front and pretend you understand every slide.", tag:"GRADE ↑  ENERGY ↓", fn:()=>{grades+=5; energy-=7; sanity+=2;}},
  {id:"skip", cat:"uni", icon:"😴", title:"Skip the lecture", desc:"You could go. You could also remain horizontal. The choice is yours.", tag:"ENERGY ↑  GRADE ↓", fn:()=>{energy+=12; grades-=4; sanity+=4;}},
  {id:"shift", cat:"money", icon:"💼", title:"Work a humiliating shift", desc:"Smile politely while a customer explains economics to you.", tag:"MONEY ↑↑  SANITY ↓", fn:()=>{money+=55; sanity-=8; energy-=12; housemates-=2;}},
  {id:"budget", cat:"money", icon:"🧾", title:"Do a budget check", desc:"Open the banking app and confront the consequences of Tuesday night.", tag:"MONEY ↑  SANITY ↑", fn:()=>{money+=12; sanity+=5; grades+=1;}},
  {id:"pub", cat:"social", icon:"🍻", title:"'One drink' at the pub", desc:"A phrase which has ruined generations of student bank accounts.", tag:"SANITY ↑  MONEY ↓", fn:()=>{money-=24; sanity+=16; housemates+=5; energy-=7; grades-=1;}},
  {id:"party", cat:"social", icon:"🪩", title:"Host a house party", desc:"Music, questionable decisions and a mysterious person called Jamie.", tag:"SOCIAL ↑↑  HOUSE ↓↓", fn:()=>{houseState-=22; housemates+=24; sanity+=6; money-=30; reputation+=8;}},
  {id:"predrinks", cat:"social", icon:"🥂", title:"Pre-drinks at yours", desc:"Cheap drinks, loud music and someone already asking for the aux.", tag:"SOCIAL ↑↑  HOUSE ↓", fn:()=>{money-=18; sanity+=8; housemates+=16; houseState-=8; reputation+=5;}},
  {id:"date", cat:"social", icon:"💘", title:"Go on an adult date", desc:"Flirt responsibly. Overthink the goodbye hug irresponsibly.", tag:"SANITY ↑  MONEY ↓", fn:()=>{money-=20; sanity+=14; housemates+=3; energy-=5; grades-=1;}},
  {id:"adultnight", cat:"social", icon:"❤️", title:"Go home with your date", desc:"A private, consensual adult night. Tomorrow's awkward breakfast is included.", tag:"SANITY ↑↑  ENERGY ↓", fn:()=>{money-=15; sanity+=16; housemates+=4; energy-=12; grades-=1;}},
  {id:"cheeky", cat:"social", icon:"😏", title:"Have a cheeky night in", desc:"Phone away, door closed, good company. Keep the details private.", tag:"SANITY ↑  HOUSE ↓", fn:()=>{sanity+=14; houseState-=4; housemates+=3; energy-=6;}},
  {id:"smoke", cat:"social", icon:"🌿", title:"Go for a smoke", desc:"Head outside with a housemate, switch off and chat nonsense.", tag:"SANITY ↑  GRADE ↓", fn:()=>{money-=8; sanity+=11; grades-=2; housemates+=5; energy-=4;}},
  {id:"gym", cat:"self", icon:"🏋️", title:"Go to the gym", desc:"Exercise for 45 minutes, then reward yourself with an unnecessarily expensive meal deal.", tag:"SANITY ↑  MONEY ↓", fn:()=>{money-=12; sanity+=10; energy-=12;}},
  {id:"sleep", cat:"self", icon:"🛌", title:"Sleep properly", desc:"A radical student concept. Eight hours. No guilt. No alarm snoozing marathon.", tag:"ENERGY ↑↑  SANITY ↑", fn:()=>{energy+=25; sanity+=8; grades+=2;}},
  {id:"clean", cat:"home", icon:"🧽", title:"Deep-clean the kitchen", desc:"Discover a pan that may legally qualify as an archaeological site.", tag:"HOUSE ↑↑  SANITY ↓", fn:()=>{houseState+=22; sanity-=4; energy-=8;}},
  {id:"laundry", cat:"home", icon:"🧺", title:"Do the laundry mountain", desc:"Find socks from a previous political era.", tag:"HOUSE ↑  SANITY ↑", fn:()=>{houseState+=16; sanity+=4; energy-=5;}},
  {id:"cook", cat:"home", icon:"🍝", title:"Cook a suspiciously good dinner", desc:"Everyone suddenly remembers you exist. The washing-up remains.", tag:"SOCIAL ↑  HOUSE ↓", fn:()=>{housemates+=16; houseState-=8; money+=8; energy-=6;}},
  {id:"game", cat:"home", icon:"🎮", title:"Game until 3 AM", desc:"You will definitely stop after this match. You absolutely will.", tag:"SANITY ↑  GRADE ↓", fn:()=>{sanity+=12; grades-=7; housemates-=2; energy-=18;}}
];

const EVENTS = [
  {title:"🚨 The Fridge Incident", text:"Someone has left a container in the fridge labelled 'DO NOT OPEN'. It has been there since freshers' week. Everyone is looking at you.", choices:[
    ["Open it","Heroism, trauma and −15 sanity.",()=>{sanity-=15; houseState+=5; logEvent("You opened it. Science has learned nothing. The smell has.","bad");}],
    ["Throw it away","Gain house respect. Lose the container owner.",()=>{houseState+=10; housemates-=5; reputation+=3; logEvent("You binned the biohazard. Someone called you a fascist. The kitchen is cleaner.","good");}],
    ["Pretend it isn't there","A problem for Future You.",()=>{sanity+=2; houseState-=5; logEvent("You closed the fridge. The container remains undefeated.","bad");}]
  ]},
  {title:"💘 A Risky Text", text:"It's 1:14 AM. You receive: 'u up? 👀'. Your flatmate says this is either romance or a terrible idea.", choices:[
    ["Reply 'depends...'","Flirtation. Maximum ambiguity.",()=>{sanity+=10; housemates+=3; logEvent("You replied 'depends...'. The typing bubble appeared for 11 minutes.","good");}],
    ["Go to sleep","A rare display of emotional maturity.",()=>{sanity+=8; grades+=3; energy+=8; logEvent("You went to bed. Tomorrow-you is suspiciously grateful.","good");}],
    ["Send a voice note","Bold. Questionable. Potentially legendary.",()=>{sanity+=6; reputation+=4; logEvent("You sent a voice note at 1:14 AM. Nobody will ever know why.","good");}]
  ]},
  {title:"🍷 The Kitchen Date", text:"Two consenting adults are having a quiet date in the kitchen. Unfortunately, your housemate has started making toast at industrial volume.", choices:[
    ["Leave them to it","Respect the vibe.",()=>{housemates+=8; logEvent("You quietly disappeared. The toast survived. Romance may have too.","good");}],
    ["Become the world's worst DJ","Nobody asked for this.",()=>{housemates-=10; sanity+=5; logEvent("You DJ'd the kitchen date. You are no longer invited to kitchen dates.","bad");}],
    ["Offer them the living room","Diplomacy saves the evening.",()=>{housemates+=10; houseState-=2; reputation+=2; logEvent("You offered the living room. You are now apparently the house diplomat.","good");}]
  ]},
  {title:"🛋️ The Sofa Situation", text:"There is a suspiciously romantic-looking pair of shoes by the sofa. Nobody is admitting anything. You have an essay due.", choices:[
    ["Mind your business","A mature and healthy boundary.",()=>{grades+=4; sanity+=4; logEvent("You minded your own business. For once, it was the correct choice.","good");}],
    ["Investigate","You have chosen chaos.",()=>{sanity-=8; housemates-=8; reputation+=2; logEvent("You investigated. You immediately wished you hadn't.","bad");}],
    ["Quietly leave snacks outside","A surprisingly kind intervention.",()=>{housemates+=5; money-=5; logEvent("You left snacks and disappeared. Nobody knows it was you.","good");}]
  ]},
  {title:"💸 Rent Day", text:"The landlord wants rent. Your bank account wants to become a historical exhibit.", choices:[
    ["Pay on time","Boring. Responsible. Financially painful.",()=>{money-=95; grades+=2; logEvent("Rent paid. Your bank account is now making a faint whimpering noise.","good");}],
    ["Ask for a few days","Bold strategy. Email anxiety included.",()=>{money-=35; sanity-=6; logEvent("You asked for an extension. The landlord replied 'noted'. Terrifying.","bad");}],
    ["Check your balance first","A sensible move, somehow.",()=>{sanity+=3; money-=5; logEvent("You checked the balance. You immediately closed the app again.","good");}]
  ]},
  {title:"🍳 The 2 AM Fry-Up", text:"The house has decided a 2 AM fry-up is essential. The fire alarm disagrees.", choices:[
    ["Cook together","Carbs + friendship. Smoke alarm optional.",()=>{housemates+=12; houseState-=7; sanity+=5; money-=10; logEvent("You made a 2 AM fry-up. The kitchen smells incredible and slightly illegal.","good");}],
    ["Call it a night","You are the responsible one. Nobody likes you.",()=>{sanity+=7; housemates-=5; energy+=8; logEvent("You went to bed. The frying pan remained your enemy until sunrise.","good");}],
    ["Order takeaway","Financially irresponsible. Emotionally correct.",()=>{money-=25; sanity+=9; housemates+=8; logEvent("A takeaway arrived at 2:17 AM. Nobody regrets it except your bank account.","good");}]
  ]},
  {title:"📱 The Group Chat Scandal", text:"Someone has accidentally sent a screenshot to the house group chat that was absolutely not meant for the house group chat.", choices:[
    ["Pretend you saw nothing","Digital diplomacy.",()=>{housemates+=5; logEvent("You said nothing. A heroic act of group-chat restraint.","good");}],
    ["React with 👀","You have chosen violence.",()=>{housemates-=7; sanity+=8; reputation+=4; logEvent("You reacted with 👀. The group chat entered a new era.","bad");}],
    ["Reply 'wrong chat mate'","Technically helpful. Emotionally devastating.",()=>{housemates-=4; reputation+=5; logEvent("You pointed out the wrong chat. Silence followed.","bad");}]
  ]},
  {title:"🧼 Passive-Aggressive Note", text:"A note on the fridge says: 'WHOEVER KEEPS LEAVING DISHES: WE NEED TO TALK.' Nobody is replying.", choices:[
    ["Wash everything","Become the house hero for approximately 36 hours.",()=>{houseState+=18; housemates+=10; sanity-=5; logEvent("You washed the dishes. Someone immediately made another one.","good");}],
    ["Write 'noted'","Petty. Efficient. Dangerous.",()=>{housemates-=9; sanity+=6; reputation+=3; logEvent("You wrote 'noted'. The reply was three skull emojis.","bad");}],
    ["Call a house meeting","Democracy has entered student accommodation.",()=>{houseState+=8; housemates+=5; sanity-=4; logEvent("You called a house meeting. Seven minutes in, someone argued about the bin.","good");}]
  ]},
  {title:"🥂 Pre-drinks Have Escalated", text:"You planned one quiet drink before going out. Someone connected a speaker, the kitchen is full and nobody remembers who invited three extra people.", choices:[
    ["Embrace the chaos","More fun. More mess. More money mysteriously missing.",()=>{money-=20; houseState-=12; housemates+=18; sanity+=8; reputation+=7; logEvent("Pre-drinks became the main event. The club was never reached.","good");}],
    ["Shut it down","Responsible. Slightly unpopular.",()=>{houseState+=5; sanity+=5; housemates-=4; logEvent("You ended the party before the neighbours did.","good");}],
    ["Charge £2 entry","Capitalism arrives at the student house.",()=>{money+=22; housemates-=2; reputation+=6; houseState-=8; logEvent("You charged £2 entry. Nobody knows if that was genius or embarrassing.","good");}]
  ]},
  {title:"❤️ The Morning-After Text", text:"After a consensual adult night with someone you like, your phone lights up: 'Had a really good time last night 😊'.", choices:[
    ["Reply honestly","Clear communication. Terrifyingly mature.",()=>{sanity+=10; housemates+=8; reputation+=2; logEvent("You replied honestly. Adult communication has somehow occurred in student accommodation.","good");}],
    ["Overthink it for six hours","Read the message 14 times.",()=>{sanity-=7; grades-=2; logEvent("You analysed one emoji like it was a constitutional amendment.","bad");}],
    ["Reply with a normal message","Healthy, boring, effective.",()=>{sanity+=7; housemates+=5; logEvent("You sent a perfectly normal reply. Character development.","good");}]
  ]},
  {title:"📢 The Neighbours Are Not Impressed", text:"A neighbour says the noise is getting ridiculous. It is 1:37 AM. Someone is singing into a wooden spoon.", choices:[
    ["Turn it down","The sensible move.",()=>{houseState+=4; reputation-=3; logEvent("The music went down. The wooden spoon survived retirement.","good");}],
    ["Apologise and offer a cup of tea","Diplomatic genius.",()=>{money-=4; housemates+=4; reputation+=5; logEvent("You apologised. The neighbour accepted tea and stopped looking murderous.","good");}],
    ["Carry on","You have chosen the hard route.",()=>{houseState-=15; housemates+=8; reputation+=12; logEvent("You carried on. The neighbours now know your full name.","bad");}]
  ]}
];

const ACHIEVEMENTS = [
  ["💷","Financial Survivor","Finish with more than £300."],
  ["📚","Academic Weapon-ish","Finish with grades of 80+."],
  ["🧠","Somehow Sane","Finish with sanity of 80+."],
  ["🎉","House Legend","Reach 90 house reputation."],
  ["🧹","Actually Cleaned Something","Reach 90 house condition."],
  ["🤝","Popular For Some Reason","Reach 90 housemates."],
  ["💀","Financially Irresponsible","Finish below £0."],
  ["🚨","Neighbourhood Menace","Reach 90 house reputation."],
  ["🎓","I Came For A Degree","Survive week 12."],
  ["😴","Professional Procrastinator","Skip 5 lectures."],
  ["❤️","Romantic Main Character","Complete 3 date-related actions."],
  ["🪩","Chaos Agent","Host 3 parties."],
  ["🏆","Uni Legend","Score 115+ at graduation."]
];

let week=1, actionsLeft=3, money=420, sanity=72, grades=58, houseState=62, housemates=65, energy=70, reputation=35;
let ended=false, activeCategory="all", skips=0, parties=0, dates=0, unlocked=new Set(), currentEvent=null, toastTimer=null;
const $=id=>document.getElementById(id);
const clamp=n=>Math.max(0,Math.min(100,Math.round(n)));
const moneyFmt=()=>`£${Math.round(money)}`;

function categoryLabel(cat){return ({all:"All",uni:"University",social:"Social",home:"House",self:"Self-care",money:"Money"}[cat]||cat)}
function chaosText(){
  const score=reputation + Math.max(0,100-houseState) + Math.max(0,100-housemates);
  if(score<90) return "Surprisingly sensible";
  if(score<150) return "Moderately irresponsible";
  if(score<210) return "Questionable";
  if(score<270) return "Absolute menace";
  return "Local legend";
}
function logEvent(text,type=""){
  const log=$("eventLog");
  if(!log) return;
  const now=`Week ${week}`;
  log.insertAdjacentHTML("afterbegin",`<div class="log-entry ${type}"><div class="time">${now}</div><div>${text}</div></div>`);
}
function toast(msg){
  const t=$("toast"); if(!t) return;
  t.textContent=msg; t.classList.add("show"); clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove("show"),1700);
}
function statTone(value){return value<=20?"danger":value<=40?"warn":"ok";}

function render(){
  ["sanity","grades","houseState","housemates","energy","reputation"].forEach(id=>{
    const el=$(id); if(!el) return;
    const value=window[id]; el.textContent=Math.round(value); el.className=statTone(value);
  });
  $("money").textContent=moneyFmt();
  $("termBadge").textContent=`WEEK ${week} / 12`;
  $("actionsLeft").textContent=`${actionsLeft} action${actionsLeft===1?"":"s"} left`;
  $("chaos").textContent=chaosText();
  $("deadline").textContent=week%3===0?"Big deadline this week. You definitely knew about it.":week<5?"Essay due Friday. You haven't started.":"Dissertation panic is approaching at walking pace.";
  $("energyText").textContent=energy<25?"running on fumes":energy<50?"tired":energy<75?"functional-ish":"well rested";
  renderCategories(); renderActions(); renderAchievements();
}

function renderCategories(){
  const el=$("categories"); if(!el) return;
  el.innerHTML=["all","uni","social","home","self","money"].map(cat=>`<button class="category-btn ${activeCategory===cat?"active":""}" onclick="setCategory('${cat}')">${categoryLabel(cat)}</button>`).join("");
}
function setCategory(cat){activeCategory=cat; renderActions(); renderCategories();}
function renderActions(){
  const el=$("actions"); if(!el) return;
  const pool=ACTIONS.filter(a=>activeCategory==="all"||a.cat===activeCategory);
  el.innerHTML=pool.map(a=>`<button class="action-btn" ${actionsLeft<=0||ended||energy<=0?"disabled":""} onclick="takeAction('${a.id}')"><span class="icon">${a.icon}</span><strong>${a.title}</strong><span>${a.desc}</span><em>${a.tag}</em></button>`).join("");
}
function renderAchievements(){
  const el=$("achievements"); if(!el) return;
  el.innerHTML=ACHIEVEMENTS.map(a=>`<div class="achievement ${unlocked.has(a[1])?"unlocked":""}"><span>${a[0]}</span><div><b>${a[1]}</b><small>${a[2]}</small></div></div>`).join("");
}
function checkAchievements(){
  const checks=[
    ["Financial Survivor",money>300],["Academic Weapon-ish",grades>=80],["Somehow Sane",sanity>=80],["House Legend",reputation>=90],["Actually Cleaned Something",houseState>=90],["Popular For Some Reason",housemates>=90],["Financially Irresponsible",money<0],["Neighbourhood Menace",reputation>=90],["I Came For A Degree",week>=12],["Professional Procrastinator",skips>=5],["Romantic Main Character",dates>=3],["Chaos Agent",parties>=3]
  ];
  checks.forEach(([name,ok])=>{if(ok&&!unlocked.has(name)){unlocked.add(name); const a=ACHIEVEMENTS.find(x=>x[1]===name); logEvent(`🏆 <b>Achievement unlocked:</b> ${a[0]} ${name}`,"good"); toast(`🏆 ${name}`);}});
}

function takeAction(id){
  if(ended||actionsLeft<=0||energy<=0) return;
  const a=ACTIONS.find(x=>x.id===id); if(!a) return;
  a.fn(); actionsLeft--;
  if(id==="skip") skips++;
  if(["date","adultnight","cheeky"].includes(id)) dates++;
  if(id==="party") parties++;
  sanity=clamp(sanity); grades=clamp(grades); houseState=clamp(houseState); housemates=clamp(housemates); energy=clamp(energy); reputation=clamp(reputation);
  logEvent(`<b>${a.title}</b> — ${randomActionLine(id)}`,(sanity<25||money<0)?"bad":"");
  toast(`${a.icon} ${a.title}`);
  checkAchievements(); render(); checkGameOver();
  if(!ended && actionsLeft===0) endWeek();
  else if(!ended && Math.random()<0.14) setTimeout(showRandomEvent,220);
}

function randomActionLine(id){
  const lines={
    study:["You highlighted a sentence. This counts as revision now.","You spent 20 minutes choosing a font.","You accidentally learned something. Horrifying."],
    essay:["You wrote 900 words and deleted 700.","Academic panic has entered the chat.","The bibliography is mostly vibes."],
    lecture:["You attended. Nobody can take that away from you.","The lecturer said 'this will be on the exam'. You wrote it down.","You sat near someone who had already done the reading. Suspicious."],
    skip:["You stayed in bed and called it independent learning.","You missed the lecture. Your duvet remains supportive.","You watched one video about the lecture instead. Counts."],
    shift:["A customer asked if you work here. You were wearing the uniform.","You survived the shift. Your soul did not.","You earned money and lost several years of your life."],
    budget:["You opened the banking app with one eye closed.","You discovered three subscriptions you forgot about.","You moved £20 into savings and immediately felt powerful."],
    pub:["You said 'last one' with the confidence of a liar.","Someone bought chips. Morale improved immediately.","You now know the bartender's life story."],
    party:["Someone asked whose house it was. You live here.","The floor is sticky. Nobody knows why.","A stranger is asleep on a chair. This is now a family home."],
    predrinks:["Someone brought one bottle and somehow left with everyone's snacks.","The playlist has entered a legally questionable era.","Pre-drinks lasted so long that the taxi became irrelevant."],
    date:["The date went well. You will now overanalyse one sentence for 72 hours.","There was chemistry. Unfortunately, it was mostly in the restaurant bill.","You made eye contact. Basically a relationship."],
    adultnight:["The date went very well. You are now pretending not to overthink the morning-after text.","Two consenting adults made a private decision. The house group chat knows absolutely nothing.","You had a great night. Your alarm clock remains your biggest enemy."],
    cheeky:["You locked the door, ignored the group chat and had a very good evening.","The housemate group chat is suspicious. You are saying absolutely nothing.","A successful night in. Do-not-disturb deserves an award."],
    smoke:["You spent an hour discussing whether pigeons have meetings.","You came back extremely hungry and discovered the kitchen had no food.","The conversation began with university and ended with a theory about ducks."],
    gym:["You lifted something heavier than your dissertation.","Your post-gym meal cost more than your gym membership.","You are sore in places you didn't know existed."],
    sleep:["You slept eight hours. The university system may never recover.","You woke up before your alarm and felt suspiciously competent.","Sleep has restored 14% of your personality."],
    clean:["You found a spoon that nobody claimed.","The kitchen can now legally be photographed.","You cleaned behind the microwave. There are no survivors."],
    laundry:["You found a sock that has clearly been through a lot.","The laundry mountain has been defeated.","Your clothes are clean. This is a landmark achievement."],
    cook:["Everyone praised the food and ignored the washing-up.","You have become the house's unpaid caterer.","The recipe said 20 minutes. It lied."],
    game:["One more match became seven.","You shouted at a screen and called it recreation.","Your mouse has heard things no mouse should hear."]
  };
  const arr=lines[id]||["A decision was made. History will judge it."]; return arr[Math.floor(Math.random()*arr.length)];
}

function endWeek(){
  money-=95; houseState-=3; sanity-=2; energy+=18; grades+=1;
  logEvent(`💷 <b>End of week:</b> rent and bills cost £95. Your bank balance makes a noise that is not legally classified as speech.`,money<0?"bad":"");
  money=Math.round(money); week++; actionsLeft=3;
  if(week<=12){setTimeout(showRandomEvent,350);} else {finishGame();}
  checkAchievements(); render(); checkGameOver();
}

function showRandomEvent(){
  if(ended) return;
  const e=EVENTS[Math.floor(Math.random()*EVENTS.length)]; currentEvent=e;
  $("eventCard").classList.remove("hidden");
  $("eventCard").innerHTML=`<div class="event-title">${e.title}</div><div class="event-text">${e.text}</div><div class="choice-grid">${e.choices.map((c,i)=>`<button class="choice-btn" onclick="chooseEvent(${i})"><b>${c[0]}</b><small>${c[1]}</small></button>`).join("")}</div>`;
  toast("🎲 Random event!");
  render();
  window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"});
}
function chooseEvent(i){
  if(!currentEvent||ended) return;
  currentEvent.choices[i][2](); currentEvent=null; $("eventCard").classList.add("hidden");
  sanity=clamp(sanity); grades=clamp(grades); houseState=clamp(houseState); housemates=clamp(housemates); energy=clamp(energy); reputation=clamp(reputation);
  checkAchievements(); render(); checkGameOver();
}

function checkGameOver(){
  if(ended) return;
  if(money<-140) finish("Your bank account has entered witness protection. Term over.");
  else if(sanity<=0) finish("Your sanity has left the building. The building is now calmer.");
  else if(grades<=0) finish("Your academic record has become performance art.");
  else if(houseState<=0) finish("The house has become legally indistinguishable from a skip.");
  else if(housemates<=0) finish("The housemates have formed a coalition against you. You have been diplomatically removed.");
}
function finish(reason){
  ended=true; $("eventCard").classList.remove("hidden");
  $("eventCard").innerHTML=`<div class="event-title">🛑 TERM OVER</div><div class="event-text">${reason}<br><br><b>Final stats:</b> ${moneyFmt()} • Grades ${grades} • Sanity ${sanity} • House ${houseState} • Housemates ${housemates} • Reputation ${reputation}</div><button class="choice-btn" onclick="newGame()"><b>Start a new term</b><small>Try to make fewer terrible decisions.</small></button>`;
  renderActions();
}
function finishGame(){
  ended=true;
  const score=Math.round(grades + sanity*.25 + houseState*.2 + housemates*.15 + reputation*.18 + Math.max(0,money)/10);
  let degree=score>=125?"First-Class Chaos":score>=100?"Solid 2:1 Energy":score>=78?"A respectable 2:2":"You technically graduated";
  const medal=score>=140?"🏆 Uni Legend":score>=115?"🥇 Campus Icon":score>=90?"🥈 Functional Adult":"🥉 You Survived";
  $("eventCard").classList.remove("hidden");
  $("eventCard").innerHTML=`<div class="event-title">🎓 WEEK 12 — YOU SURVIVED</div><div class="event-text"><b>${medal}</b><br>Your final result: <b>${degree}</b>.<br><br>Score <b>${score}</b>. Money ${moneyFmt()}. Grades ${grades}. Sanity ${sanity}. House ${houseState}. Housemates ${housemates}. Reputation ${reputation}.<br><br>You came for a degree and left with a complicated relationship with the kitchen.</div><button class="choice-btn" onclick="newGame()"><b>Play again</b><small>Surely this time will be different.</small></button>`;
  checkAchievements(); render();
  window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"});
}
function newGame(){
  week=1; actionsLeft=3; money=420; sanity=72; grades=58; houseState=62; housemates=65; energy=70; reputation=35;
  ended=false; activeCategory="all"; skips=0; parties=0; dates=0; unlocked=new Set(); currentEvent=null;
  $("eventCard").classList.add("hidden"); $("eventLog").innerHTML="";
  logEvent("Welcome to the house. The Wi-Fi password is written on a note that has disappeared.","good");
  logEvent("Everyone is an adult. Adult humour, drinking, dating and poor life choices are part of the simulation.");
  render();
}

newGame();
