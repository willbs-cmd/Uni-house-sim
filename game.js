
const ACTIONS = [
  {id:"library", icon:"📚", title:"Pretend to study", desc:"Open the library, open Word, stare at the cursor for three hours.", tag:"GRADE ↑  SANITY ↓", fn:()=>{grades+=7; sanity-=6;}},
  {id:"shift", icon:"💼", title:"Work a humiliating shift", desc:"Smile politely while a customer explains economics to you.", tag:"MONEY ↑↑  SANITY ↓", fn:()=>{money+=55; sanity-=8; housemates-=2;}},
  {id:"pub", icon:"🍻", title:"'One drink' at the pub", desc:"A phrase which has ruined generations of student bank accounts.", tag:"SANITY ↑  MONEY ↓", fn:()=>{money-=24; sanity+=16; housemates+=5; grades-=1;}},
  {id:"clean", icon:"🧽", title:"Deep-clean the kitchen", desc:"Discover a pan that may legally qualify as an archaeological site.", tag:"HOUSE ↑↑  SANITY ↓", fn:()=>{houseState+=22; sanity-=4;}},
  {id:"date", icon:"💘", title:"Go on an adult date", desc:"Flirt responsibly. Overthink the goodbye hug irresponsibly.", tag:"SANITY ↑  MONEY ↓", fn:()=>{money-=20; sanity+=14; housemates+=2; grades-=1;}},
  {id:"gym", icon:"🏋️", title:"Go to the gym", desc:"Spend 45 minutes exercising, then reward yourself with a £6 meal deal.", tag:"SANITY ↑  MONEY ↓", fn:()=>{money-=12; sanity+=10;}},
  {id:"houseparty", icon:"🪩", title:"Host a house party", desc:"Music, questionable decisions and a mysterious person called Jamie.", tag:"HOUSE ↓  FRIENDS ↑", fn:()=>{houseState-=22; housemates+=24; sanity+=5; money-=30;}},
  {id:"gaming", icon:"🎮", title:"Game until 3 AM", desc:"You will definitely stop after this match. You absolutely will.", tag:"SANITY ↑  GRADES ↓", fn:()=>{sanity+=12; grades-=7; housemates-=2;}},
  {id:"meal", icon:"🍝", title:"Cook a suspiciously good dinner", desc:"Everyone suddenly remembers you exist. The washing-up remains.", tag:"MONEY ↑  HOUSE ↓", fn:()=>{money+=8; housemates+=16; houseState-=8;}},
  {id:"essay", icon:"💻", title:"Pull an essay all-nighter", desc:"Academic panic is a powerful but deeply unhealthy stimulant.", tag:"GRADE ↑↑  SANITY ↓↓", fn:()=>{grades+=15; sanity-=18;}},
  {id:"date2", icon:"🌙", title:"Stay out far too late", desc:"The night bus knows your name now.", tag:"SANITY ↑  MONEY ↓↓", fn:()=>{money-=35; sanity+=20; grades-=3;}},
  {id:"laundry", icon:"🧺", title:"Do the laundry mountain", desc:"Find socks from a previous political era.", tag:"HOUSE ↑  SANITY ↑", fn:()=>{houseState+=16; sanity+=4;}},

  {id:"predrinks", icon:"🥂", title:"Pre-drinks at yours", desc:"Cheap drinks, loud music and someone already asking for the aux.", tag:"FRIENDS ↑↑  MONEY ↓  HOUSE ↓", fn:()=>{money-=18; sanity+=8; housemates+=16; houseState-=8;}},
  {id:"adultnight", icon:"❤️", title:"Go home with your date", desc:"A consensual adult night together. Tomorrow's awkward breakfast is included.", tag:"SANITY ↑↑  MONEY ↓  FRIENDS ↑", fn:()=>{money-=15; sanity+=16; housemates+=4; grades-=1;}},
  {id:"smoke", icon:"🌿", title:"Go for a smoke", desc:"Head outside with a housemate, switch off for a while and chat nonsense.", tag:"SANITY ↑  GRADES ↓  MONEY ↓", fn:()=>{money-=8; sanity+=11; grades-=2;}}
];

const EVENTS = [
  {
    title:"🚨 The Fridge Incident",
    text:"Someone has left a container in the fridge labelled 'DO NOT OPEN'. It has been there since freshers' week. Your housemates are looking at you.",
    choices:[
      ["Open it", "Heroism, trauma and −15 sanity.", ()=>{sanity-=15; houseState+=5; logEvent("You opened it. Science has learned nothing. The smell has.", "bad");}],
      ["Throw it away", "Gain house respect. Lose the container owner.", ()=>{houseState+=10; housemates-=5; logEvent("You binned the biohazard. Someone called you a fascist. The kitchen is cleaner.", "good");}],
    ]
  },
  {
    title:"💘 A Risky Text",
    text:"It's 1:14 AM. You have received: 'u up? 👀'. Your flatmate says this is either romance or a terrible idea.",
    choices:[
      ["Reply 'depends...'", "Flirtation. Maximum ambiguity.", ()=>{sanity+=10; housemates+=3; logEvent("You replied 'depends...'. The typing bubble appeared for 11 minutes.", "good");}],
      ["Go to sleep like an adult", "A rare display of emotional maturity.", ()=>{sanity+=8; grades+=3; logEvent("You went to bed. Tomorrow-you is suspiciously grateful.", "good");}],
    ]
  },
  {
    title:"🍷 The Kitchen Date",
    text:"Two consenting adults are trying to have a quiet date in the kitchen. Unfortunately, your housemate has started making toast at industrial volume.",
    choices:[
      ["Leave them to it", "You respect the vibe.", ()=>{housemates+=8; logEvent("You quietly disappeared. The toast survived. Romance may have too.", "good");}],
      ["Become the world's worst DJ", "You put on music. Nobody asked for this.", ()=>{housemates-=10; sanity+=5; logEvent("You DJ'd the kitchen date. You are no longer invited to kitchen dates.", "bad");}],
    ]
  },
  {
    title:"🛋️ The Sofa Situation",
    text:"There is a suspiciously romantic-looking pair of shoes by the sofa. Nobody is admitting anything. You have an essay due.",
    choices:[
      ["Mind your business", "A mature and healthy boundary.", ()=>{grades+=4; sanity+=4; logEvent("You minded your own business. For once, it was the correct choice.", "good");}],
      ["Investigate", "You have chosen chaos.", ()=>{sanity-=8; housemates-=8; logEvent("You investigated. You immediately wished you hadn't.", "bad");}],
    ]
  },
  {
    title:"💸 Rent Day",
    text:"The landlord wants rent. Your bank account wants to become a historical exhibit.",
    choices:[
      ["Pay on time", "Boring. Responsible. Financially painful.", ()=>{money-=95; grades+=2; logEvent("Rent paid. Your bank account is now making a faint whimpering noise.", "good");}],
      ["Ask for a few days", "Bold strategy. Email anxiety included.", ()=>{money-=35; sanity-=6; logEvent("You asked for an extension. The landlord replied 'noted'. Terrifying.", "bad");}],
    ]
  },
  {
    title:"🍳 The 2 AM Fry-Up",
    text:"The house has decided that a 2 AM fry-up is essential. The fire alarm disagrees.",
    choices:[
      ["Cook together", "Carbs + friendship. Smoke alarm optional.", ()=>{housemates+=12; houseState-=7; sanity+=5; money-=10; logEvent("You made a 2 AM fry-up. The kitchen smells incredible and slightly illegal.", "good");}],
      ["Call it a night", "You are the responsible one. Nobody likes you.", ()=>{sanity+=7; housemates-=5; logEvent("You went to bed. The frying pan remained your enemy until sunrise.", "good");}],
    ]
  },
  {
    title:"📱 The Group Chat Scandal",
    text:"Someone has accidentally sent a screenshot to the house group chat that was absolutely not meant for the house group chat.",
    choices:[
      ["Pretend you saw nothing", "Digital diplomacy.", ()=>{housemates+=5; logEvent("You said nothing. A heroic act of group-chat restraint.", "good");}],
      ["React with 👀", "You have chosen violence.", ()=>{housemates-=7; sanity+=8; logEvent("You reacted with 👀. The group chat entered a new era.", "bad");}],
    ]
  },
  {
    title:"🧼 Passive-Aggressive Note",
    text:"A note on the fridge says: 'WHOEVER KEEPS LEAVING DISHES: WE NEED TO TALK.' There are 14 people in the house chat and nobody is replying.",
    choices:[
      ["Wash everything", "Become the house hero for approximately 36 hours.", ()=>{houseState+=18; housemates+=10; sanity-=5; logEvent("You washed the dishes. Someone immediately made another one.", "good");}],
      ["Write 'noted'", "Petty. Efficient. Dangerous.", ()=>{housemates-=9; sanity+=6; logEvent("You wrote 'noted'. The reply was three skull emojis.", "bad");}],
    ]
  }

  ,
  {
    title:"🥂 Pre-drinks Have Escalated",
    text:"You planned one quiet drink before going out. Someone connected a speaker, the kitchen is full and nobody remembers who invited three extra people.",
    choices:[
      ["Embrace the chaos", "More fun. More mess. More money mysteriously missing.", ()=>{money-=20; houseState-=12; housemates+=18; sanity+=8; logEvent("Pre-drinks became the main event. The club was never reached.", "good");}],
      ["Shut it down", "Responsible. Slightly unpopular.", ()=>{houseState+=5; sanity+=5; housemates-=4; logEvent("You ended the party before the neighbours did.", "good");}],
    ]
  },
  {
    title:"❤️ The Morning-After Text",
    text:"After a consensual adult night with someone you like, your phone lights up: 'Had a really good time last night 😊'.",
    choices:[
      ["Reply honestly", "Clear communication. Terrifyingly mature.", ()=>{sanity+=10; housemates+=8; logEvent("You replied honestly. Adult communication has somehow occurred in student accommodation.", "good");}],
      ["Overthink it for six hours", "Read the message 14 times.", ()=>{sanity-=7; grades-=2; logEvent("You analysed one emoji like it was a constitutional amendment.", "bad");}],
    ]
  },
  {
    title:"🌿 The Late-Night Smoke",
    text:"A housemate asks if you want to head outside for a smoke and clear your head. You have an early lecture tomorrow.",
    choices:[
      ["Go outside", "A chilled evening, but tomorrow-you may regret the late night.", ()=>{sanity+=10; grades-=3; housemates+=5; logEvent("You went outside, talked absolute nonsense and completely lost track of time.", "good");}],
      ["Stay in", "Choose sleep and protect tomorrow's brain.", ()=>{sanity+=5; grades+=3; logEvent("You stayed in and went to bed. Future-you sends a cautious thumbs-up.", "good");}],
    ]
  },
  {
    title:"📢 The Neighbours Are Not Impressed",
    text:"Your housemate has received a message saying the noise is getting ridiculous. It is 1:30 AM and someone is still requesting 'one more song'.",
    choices:[
      ["Turn it down", "Preserve relations with the people next door.", ()=>{houseState+=5; housemates-=2; sanity+=2; logEvent("The music went down. The neighbours survived. Everyone pretended this was the plan.", "good");}],
      ["Ignore it", "Maximum chaos. Minimum diplomacy.", ()=>{houseState-=15; housemates+=4; sanity+=6; logEvent("You ignored the warning. The next knock at the door was considerably less friendly.", "bad");}],
    ]
  }
];

let week=1, actionsLeft=3, money=420, sanity=72, grades=58, houseState=62, housemates=65, ended=false;

function clamp(v){ return Math.max(0, Math.min(100, Math.round(v))); }
function moneyFmt(v){ return "£"+Math.round(v); }
function $(id){ return document.getElementById(id); }

function render(){
  $("money").textContent=moneyFmt(money);
  $("sanity").textContent=clamp(sanity);
  $("grades").textContent=clamp(grades);
  $("houseState").textContent=clamp(houseState);
  $("housemates").textContent=clamp(housemates);
  $("termBadge").textContent=`WEEK ${week} / 12`;
  $("actionsLeft").textContent=`${actionsLeft} action${actionsLeft===1?"":"s"} left`;
  $("deadline").textContent = grades<35 ? "Deadline approaching. Your degree is visibly concerned." :
    grades<55 ? "Essay due Friday. You haven't started." : "Essay due Friday. You have opened the document. Progress.";
  $("chaos").textContent = sanity<30 || houseState<30 ? "Absolutely feral" :
    housemates<35 ? "Socially radioactive" : money<80 ? "Financially doomed" : "Moderately irresponsible";
  renderActions();
}

function renderActions(){
  $("actions").innerHTML = ACTIONS.map(a=>`
    <button class="action-btn" onclick="performAction('${a.id}')" ${actionsLeft<=0||ended?"disabled":""}>
      <span class="icon">${a.icon}</span>
      <strong>${a.title}</strong>
      <span>${a.desc}</span>
      <em>${a.tag}</em>
    </button>`).join("");
}

function logEvent(msg, tone=""){
  const el=document.createElement("div");
  el.className="log-entry "+tone;
  el.innerHTML=`<div class="time">Week ${week}</div>${msg}`;
  $("eventLog").prepend(el);
}

function toast(msg){
  const t=$("toast"); t.textContent=msg; t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),1800);
}

function performAction(id){
  if(ended || actionsLeft<=0) return;
  const a=ACTIONS.find(x=>x.id===id);
  if(!a) return;
  a.fn();
  actionsLeft--;
  sanity=clamp(sanity); grades=clamp(grades); houseState=clamp(houseState); housemates=clamp(housemates);
  logEvent(`<b>${a.title}</b> — ${randomActionLine(a.id)}`);
  toast("Action taken");
  render();
  checkGameOver();
  if(!ended && actionsLeft===0) endWeek();
}

function randomActionLine(id){
  const lines={
    library:["You highlighted a sentence. This counts as revision now.","You spent 20 minutes choosing a font.","You accidentally learned something. Horrifying."],
    shift:["A customer asked if you work here. You were wearing the uniform.","You survived the shift. Your soul did not.","You earned money and lost several years of your life."],
    pub:["You said 'last one' with the confidence of a liar.","Someone bought chips. Morale improved immediately.","You now know the bartender's life story."],
    clean:["You found a spoon that nobody claimed.","The kitchen can now legally be photographed.","You cleaned behind the microwave. There are no survivors."],
    date:["The date went well. You will now overanalyse one sentence for 72 hours.","There was chemistry. Unfortunately, it was mostly in the restaurant bill.","You made eye contact. Basically a relationship."],
    gym:["You lifted something heavier than your dissertation.","Your post-gym meal cost more than your gym membership.","You are sore in places you didn't know existed."],
    houseparty:["Someone asked whose house it was. You live here.","The floor is sticky. Nobody knows why.","A stranger is asleep on a chair. This is now a family home."],
    gaming:["One more match became seven.","You shouted at a screen and called it recreation.","Your mouse has heard things no mouse should hear."],
    meal:["Everyone praised the food and ignored the washing-up.","You have become the house's unpaid caterer.","The recipe said 20 minutes. It lied."],
    essay:["You wrote 900 words and deleted 700.","You have discovered the power of academic panic.","The bibliography is mostly vibes."],
    date2:["The night bus has become a recurring character.","You spent £8 on a drink you didn't even like.","You watched the sunrise and questioned every decision since September."],
    laundry:["You found a sock that has clearly been through a lot.","The laundry mountain has been defeated.","Your clothes are clean. This is a landmark achievement."],
    predrinks:["Someone brought one bottle and somehow left with everyone's snacks.","The playlist has entered a legally questionable era.","Pre-drinks lasted so long that the taxi became irrelevant."],
    adultnight:["The date went very well. You are now pretending not to overthink the morning-after text.","Two consenting adults made a private decision. The house group chat knows absolutely nothing.","You had a great night. Your alarm clock remains your biggest enemy."],
    smoke:["You spent an hour discussing whether pigeons have meetings.","You came back extremely hungry and discovered the kitchen had no food.","The conversation began with university and ended with a theory about ducks."]
  };
  const arr=lines[id]||["A decision was made. History will judge it."];
  return arr[Math.floor(Math.random()*arr.length)];
}

function endWeek(){
  money-=95;
  houseState-=3;
  sanity-=2;
  grades+=1;
  logEvent(`💷 <b>End of week:</b> rent and bills cost £95. Your bank balance makes a noise that is not legally classified as speech.`, money<0?"bad":"");
  money=Math.round(money);
  week++;
  actionsLeft=3;
  if(week<=12){
    setTimeout(showRandomEvent,350);
  } else {
    finishGame();
  }
  render();
  checkGameOver();
}

function showRandomEvent(){
  if(ended) return;
  const e=EVENTS[Math.floor(Math.random()*EVENTS.length)];
  $("eventCard").classList.remove("hidden");
  $("eventCard").innerHTML=`
    <div class="event-title">${e.title}</div>
    <div class="event-text">${e.text}</div>
    <div class="choice-grid">
      ${e.choices.map((c,i)=>`<button class="choice-btn" onclick="chooseEvent(${i})"><b>${c[0]}</b><small>${c[1]}</small></button>`).join("")}
    </div>`;
  window.currentEvent=e;
  render();
}

function chooseEvent(i){
  const e=window.currentEvent;
  if(!e) return;
  e.choices[i][2]();
  $("eventCard").classList.add("hidden");
  window.currentEvent=null;
  sanity=clamp(sanity); grades=clamp(grades); houseState=clamp(houseState); housemates=clamp(housemates);
  render();
  checkGameOver();
}

function checkGameOver(){
  if(ended) return;
  if(money < -140){ finish("Your bank account has entered witness protection. Term over."); }
  else if(sanity<=0){ finish("Your sanity has left the building. The building is now calmer."); }
  else if(grades<=0){ finish("Your academic record has become performance art."); }
  else if(houseState<=0){ finish("The house has become legally indistinguishable from a skip."); }
  else if(housemates<=0){ finish("The housemates have formed a coalition against you. You have been diplomatically removed."); }
}

function finish(reason){
  ended=true;
  $("eventCard").classList.remove("hidden");
  $("eventCard").innerHTML=`<div class="event-title">🛑 TERM OVER</div>
    <div class="event-text">${reason}<br><br><b>Final stats:</b> £${Math.round(money)} • Grades ${grades} • Sanity ${sanity} • House ${houseState} • Housemates ${housemates}</div>
    <button class="choice-btn" onclick="newGame()"><b>Start a new term</b><small>Try to make fewer terrible decisions.</small></button>`;
  renderActions();
}

function finishGame(){
  ended=true;
  const score=Math.round(grades + sanity*.25 + houseState*.2 + housemates*.15 + Math.max(0,money)/10);
  let degree = score>=95 ? "First-Class Chaos" : score>=75 ? "Solid 2:1 Energy" : score>=55 ? "A respectable 2:2" : "You technically graduated";
  $("eventCard").classList.remove("hidden");
  $("eventCard").innerHTML=`<div class="event-title">🎓 WEEK 12 — YOU SURVIVED</div>
    <div class="event-text">Your final result: <b>${degree}</b>.<br><br>
    Score ${score}. Money £${Math.round(money)}. Grades ${grades}. Sanity ${sanity}. House ${houseState}. Housemates ${housemates}.<br><br>
    You came for a degree and left with a complicated relationship with the kitchen.</div>
    <button class="choice-btn" onclick="newGame()"><b>Play again</b><small>Surely this time will be different.</small></button>`;
  render();
}

function newGame(){
  week=1; actionsLeft=3; money=420; sanity=72; grades=58; houseState=62; housemates=65; ended=false;
  $("eventCard").classList.add("hidden");
  $("eventLog").innerHTML="";
  logEvent("Welcome to the house. The Wi-Fi password is written on a note that has disappeared.", "good");
  logEvent("Everyone is an adult. The game is rated 18+ for adult humour, drinking, dating and poor life choices.");
  render();
}

newGame();

// --- SPECIAL EVENTS SYSTEM ---
const specialEvents = [
    {
        title: "The Landlord Inspection",
        description: "Your landlord just texted. They are 10 minutes away and the kitchen is a biohazard.",
        choice1: { text: "Panic clean (Sanity ↓, House ↑↑)", s: -20, h: 30, m: 0, g: 0 },
        choice2: { text: "Bribe them with a pub gift card (Money ↓↓)", s: 0, h: 0, m: -30, g: 0 }
    },
    {
        title: "Wi-Fi is Down!",
        description: "The router died right before your online exam submission.",
        choice1: { text: "Tether your phone data (Money ↓, Grades ↑)", s: -5, h: 0, m: -15, g: 15 },
        choice2: { text: "Accept your academic fate (Grades ↓↓, Sanity ↑)", s: 15, h: 0, m: 0, g: -25 }
    },
    {
        title: "The Heating War",
        description: "It's freezing, but putting the heating on will ruin your budget.",
        choice1: { text: "Turn it on, I'm freezing (Money ↓↓, Sanity ↑)", s: 15, h: 0, m: -20, g: 0 },
        choice2: { text: "Wear three jumpers (Sanity ↓)", s: -15, h: 0, m: 0, g: 0 }
    }
];

function triggerRandomEvent() {
    // Pick a random event from the list
    const evt = specialEvents[Math.floor(Math.random() * specialEvents.length)];
    const card = document.getElementById('eventCard');
    
    if(card) {
        // Display the dilemma and the two choices
        card.innerHTML = `
            <div style="background: rgba(255,0,0,0.1); padding: 15px; border-radius: 8px; border: 1px solid red;">
                <h3 style="margin-top:0; color: #ff6b6b;">⚠️ ${evt.title}</h3>
                <p>${evt.description}</p>
                <div style="display: flex; gap: 10px; margin-top: 15px;">
                    <button class="action-btn" onclick="resolveEvent(${evt.choice1.s}, ${evt.choice1.h}, ${evt.choice1.m}, ${evt.choice1.g}, '${evt.choice1.text}')">${evt.choice1.text}</button>
                    <button class="action-btn" onclick="resolveEvent(${evt.choice2.s}, ${evt.choice2.h}, ${evt.choice2.m}, ${evt.choice2.g}, '${evt.choice2.text}')">${evt.choice2.text}</button>
                </div>
            </div>
        `;
        card.classList.remove('hidden');
    }
}

function resolveEvent(s, h, m, g, choiceText) {
    // Apply the consequences
    sanity += s;
    money += m;
    grades += g;
    
    // Check if you used 'house' or 'house_state' in your stats
    if (typeof house_state !== 'undefined') { house_state += h; } 
    else if (typeof house !== 'undefined') { house += h; }
    
    logEvent(`<strong>Disaster Resolved:</strong> You chose to "${choiceText}".`);
    updateDisplay();
    
    // Hide the card again after choosing
    document.getElementById('eventCard').classList.add('hidden');
}
