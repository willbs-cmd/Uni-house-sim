'use strict';
const TERM_WEEKS = 12, ACTIONS_PER_WEEK = 3, WEEKLY_BILLS = 80;

const STATS = {
  money:  { label: 'Money',      max: 500, fmt: v => '£' + v },
  grades: { label: 'Grades',     max: 100, fmt: v => v + '%' },
  sanity: { label: 'Sanity',     max: 100, fmt: v => v },
  clean:  { label: 'House state', max: 100, fmt: v => v },
  vibes:  { label: 'Housemates', max: 100, fmt: v => v },
};

const ACTIONS = [
  { name: 'Study',          note: 'Grades up, brain tired', fx: { grades: 8, sanity: -5 } },
  { name: 'Work a shift',   note: 'Cash in, energy out',    fx: { money: 60, sanity: -8, grades: -2 } },
  { name: 'Clean the house', note: 'Someone has to',        fx: { clean: 20, vibes: 3, sanity: -2 } },
  { name: 'Go out',         note: 'Cheap pints, big night', fx: { sanity: 15, vibes: 8, money: -25, grades: -3 } },
  { name: 'Cook for everyone', note: 'Pasta, obviously',    fx: { vibes: 10, money: -15, clean: -5 } },
  { name: 'Sleep',          note: 'Rare and precious',      fx: { sanity: 12 } },
  { name: 'Pre drinks',     note: 'Four quid of vodka and a playlist', fx: { sanity: 8, vibes: 5, money: -10, clean: -3 } },
  { name: 'Pub crawl',      note: 'Fancy dress optional, regret guaranteed', roll: () => {
      const r = Math.random();
      if (r < .25) return { fx: { sanity: 12, vibes: 4, money: -65, grades: -4 }, msg: 'Pub crawl: you lost your wallet somewhere between pub 3 and pub 5.' };
      if (r < .5)  return { fx: { sanity: 14, vibes: -6, money: -35, grades: -4, clean: -4 }, msg: 'Pub crawl: you did a speech on the night bus. It is already on Instagram.' };
      return { fx: { sanity: 18, vibes: 8, money: -35, grades: -4, clean: -4 }, msg: 'Pub crawl: eight pubs, zero memories, ten out of ten.' }; } },
  { name: 'Pull someone',   note: 'Fortune favours the brave', roll: () => {
      const r = Math.random();
      if (r < .55) return { fx: { sanity: 15, vibes: 2 }, msg: 'You pull. A good night is had by all.' };
      if (r < .8)  return { fx: { sanity: -3, vibes: -2 }, msg: 'Walk of shame at 9am, in last night\'s outfit, past your landlord.' };
      return { fx: { sanity: -6 }, msg: 'You get knocked back in front of the whole queue.' }; } },
  { name: 'Get with a housemate', note: 'Flat-cest. Awkward at breakfast', roll: () =>
      Math.random() < .4
        ? { fx: { sanity: 12, vibes: 5 }, msg: 'Flat-cest: it goes well. Suspiciously well. Nobody mentions it.' }
        : { fx: { sanity: -4, vibes: -15 }, msg: 'Flat-cest: the whole house knows by lunchtime. The kitchen is very quiet.' } },
  { name: 'Play The Sims',  note: 'Your Sim is thriving', roll: () =>
      Math.random() < .3
        ? { fx: { sanity: 6, grades: -4 }, msg: 'You build a mansion, then accidentally burn your Sim alive. Six hours gone.' }
        : { fx: { sanity: 10, grades: -4 }, msg: 'Your Sim has a better social life than you do.' } },
  { name: 'Watch porn',     note: 'Incognito, obviously', roll: () =>
      Math.random() < .2
        ? { fx: { sanity: 4, vibes: -6 }, msg: 'Your laptop is still connected to the living room TV. Oh no.' }
        : { fx: { sanity: 6, grades: -2 }, msg: 'Research. Purely research.' } },
  { name: 'Wank',           note: 'Lock the door first', roll: () =>
      Math.random() < .2
        ? { fx: { sanity: 2, vibes: -6 }, msg: 'You forgot to lock the door. Eye contact was made. Neither of you will ever speak of it.' }
        : { fx: { sanity: 7 }, msg: 'Quick stress relief. Back to the essay.' } },
  { name: 'Eat the dodgy leftovers', note: 'Free, but is it safe?', roll: () =>
      Math.random() < .35
        ? { fx: { sanity: -10, clean: -8 }, sick: 1, msg: 'Food poisoning! You spend the rest of the week living in the bathroom.' }
        : { fx: { sanity: 3 }, msg: 'It was fine. You feel invincible.' } },
  { name: 'Throw a house party', note: 'Everyone is invited. Even people you hate', roll: () => {
      const r = Math.random();
      if (r < .2) return { fx: { sanity: 12, vibes: -8, money: -50, clean: -35, grades: -5 }, noise: 2, msg: 'House party: someone broke the toilet seat and nobody owns up. The neighbours are definitely listening.' };
      if (r < .5) return { fx: { sanity: 20, vibes: 10, money: -40, clean: -25, grades: -5 }, noise: 2, msg: 'House party: absolute scenes, 40 people in the kitchen. The neighbours are definitely listening.' };
      return { fx: { sanity: 22, vibes: 12, money: -40, clean: -20, grades: -5 }, noise: 2, msg: 'House party: the best night of the term. Somebody is asleep in the bath. The neighbours are definitely listening.' }; } },
  { name: '3am kebab',      note: 'Questionable meat, great sauce', roll: () =>
      Math.random() < .25
        ? { fx: { sanity: -8, money: -8, clean: -8 }, sick: 1, msg: 'The kebab fights back. You are not leaving the bathroom this week.' }
        : { fx: { sanity: 8, money: -8 }, msg: 'Best kebab of your life. Garlic sauce on everything.' } },
];

const EVENTS = [
  { text: 'Housemate Dev leaves a mountain of dishes in the sink.',
    choices: [
      { label: 'Wash them yourself', fx: { clean: 12, vibes: -3, sanity: -3 }, msg: 'You wash up in silence. Saint or sucker?' },
      { label: 'Passive-aggressive note', fx: { vibes: -8, clean: 3 }, msg: 'The note is on the fridge. Dev has seen it.' } ] },
  { text: 'The landlord wants to "inspect" the house on Friday.',
    choices: [
      { label: 'Panic clean', fx: { clean: 25, sanity: -8 }, msg: 'House is spotless for exactly 4 hours.' },
      { label: 'Hide stuff in wardrobes', fx: { clean: 8, sanity: -2 }, msg: 'Out of sight, out of mind.' } ] },
  { text: 'Your essay deadline is moved up to tomorrow!',
    choices: [
      { label: 'All-nighter', fx: { grades: 10, sanity: -15 }, msg: 'Submitted at 8:59am. Pure caffeine.' },
      { label: 'Ask for an extension', fx: { grades: 2, sanity: -3 }, msg: 'Granted, but they were not thrilled.' } ] },
  { text: 'The boiler breaks. Freezing house, group chat in flames.',
    choices: [
      { label: 'Chip in for a repair', fx: { money: -40, vibes: 8 }, msg: 'Warm again. Housemates are grateful.' },
      { label: 'Wait for the landlord', fx: { sanity: -10, vibes: -4 }, msg: 'Eleven days of wearing coats indoors.' } ] },
  { text: 'A housemate invites a "few friends" over. Eleven arrive.',
    choices: [
      { label: 'Join the party', fx: { sanity: 12, vibes: 8, clean: -18, grades: -3 }, msg: 'Legendary. The carpet disagrees.' },
      { label: 'Hide in your room', fx: { grades: 4, vibes: -6 }, msg: 'You hear someone using your saucepan.' } ] },
  { text: 'You find a £20 note in an old coat.',
    choices: [ { label: 'Keep it', fx: { money: 20 }, msg: 'Past you was generous.' },
               { label: 'Spend it on house snacks', fx: { vibes: 8 }, msg: 'You are suddenly very popular.' } ] },
  { text: 'Mould appears on the bathroom ceiling.',
    choices: [
      { label: 'Scrub it (ugh)', fx: { clean: 15, sanity: -5 }, msg: 'Scrubbed. It will be back.' },
      { label: 'Ignore it', fx: { clean: -10 }, msg: 'It has started to look like a map of Europe.' } ] },
  { text: 'Surprise: a lecturer praises your seminar contribution.',
    choices: [ { label: 'Bask in it', fx: { grades: 5, sanity: 6 }, msg: 'You float home. Briefly.' },
               { label: 'Pretend it was luck', fx: { sanity: 3 }, msg: 'Humble, if a bit untrue.' } ] },
  { text: 'Dev left the chicken out since Tuesday and is now cooking it for everyone.',
    choices: [
      { label: 'Eat it. Live dangerously', roll: () => Math.random() < .5
          ? { fx: { vibes: 4, sanity: -6 }, sick: 1, msg: 'Whole-house food poisoning. One bathroom. Chaos.' }
          : { fx: { vibes: 4 }, msg: 'Somehow it was fine. Dev is smug.' } },
      { label: 'Order a takeaway instead', fx: { money: -15, vibes: -3 }, msg: 'Dev is offended. You are not dead.' } ] },
  { text: 'You hear noises from the next room. It is a housemate and their "friend". Again.',
    choices: [
      { label: 'Headphones on', fx: { sanity: -3 }, msg: 'You turn the volume up. It does not help.' },
      { label: 'Bang on the wall', fx: { vibes: -6, sanity: 3 }, msg: 'Silence. Then giggling. Then more noises.' } ] },
  { text: 'Your housemates challenge you to a Sims build-off. Winner picks the takeaway.',
    choices: [
      { label: 'Accept', fx: { vibes: 8, sanity: 6, grades: -3 }, msg: 'Four hours later, three Sims have died in a pool with no ladder.' },
      { label: 'Say you have work to do', fx: { grades: 3, vibes: -3 }, msg: 'Very responsible. Very lonely.' } ] },
  { text: 'Your housemate\'s date left a mysterious bra in the living room.',
    choices: [
      { label: 'Return it with a straight face', fx: { vibes: 5 }, msg: 'Peak maturity. Nobody asks questions.' },
      { label: 'Add it to the group chat', fx: { vibes: -5, sanity: 4 }, msg: 'Funny for nine minutes. Then very awkward.' } ] },
  { text: 'New message in the house group chat: "Hi all! Just a gentle reminder that the bins do not empty themselves :)"',
    choices: [
      { label: 'Take the bins out', fx: { clean: 10, vibes: 3, sanity: -2 }, msg: 'You take the bins out. Nobody says thank you.' },
      { label: 'Reply "k" with a thumbs up', fx: { vibes: -6, sanity: 3 }, msg: 'The thumbs up lands like a brick. Three people read it and say nothing.' },
      { label: 'Reply with a longer message about the rota', fx: { vibes: -4, clean: 4 }, msg: 'A full-blown rota debate breaks out. A rota is made. Nobody follows it.' } ] },
  { text: 'There is a sticky note on the fridge: "Whoever keeps eating my yoghurt, I KNOW who you are."',
    choices: [
      { label: 'Buy them a new yoghurt', fx: { money: -2, vibes: 5 }, msg: 'Peace is restored for £2.' },
      { label: 'Write a sarcastic reply on it', fx: { vibes: -7, sanity: 4 }, msg: 'The note war lasts a week and ends with the fridge in tears.' } ] },
];

const COMPLAINTS = [
  { text: 'A neighbour is at the door. They have a clipboard and a really furious look.',
    choices: [
      { label: 'Apologise and promise to keep it down', fx: { vibes: 2, sanity: -3 }, msg: 'You lie through your teeth. They still look suspicious.' },
      { label: 'Say "it is a student house, what did you expect?"', roll: () => Math.random() < .5
          ? { fx: { vibes: 4, sanity: 3 }, msg: 'They have no comeback. You win the moral high ground and nothing else.' }
          : { fx: { money: -30, vibes: -5 }, msg: 'They report you to the council. £30 fine and a formal warning.' } },
      { label: 'Pretend nobody is home', fx: { sanity: -4, vibes: -2 }, msg: 'You hide behind the sofa for twenty minutes.' } ] },
  { text: 'Campus security knocks at 1am. A noise complaint has been logged against your flat.',
    choices: [
      { label: 'Turn it right down and apologise', fx: { sanity: -3, vibes: -4 }, msg: 'The party dies a very quiet death. Someone cries in the hallway.' },
      { label: 'Argue it is only 1am', roll: () => Math.random() < .5
          ? { fx: { vibes: 3 }, msg: 'Security gets tired and leaves. The house treats you like a hero.' }
          : { fx: { money: -25, vibes: -3 }, msg: 'Formal warning on your record and a £25 fine from the uni.' } },
      { label: 'Invite security in', fx: { vibes: 6, sanity: 6, grades: -2 }, msg: 'Bizarrely, he stays for one drink. A legend of the building.' } ] },
];

const LOSSES = {
  money:  ['Overdraft maxed out', 'The bank has called. Repeatedly. You drop out to get a full-time job.'],
  sanity: ['Burnout', 'You fall asleep during a lecture and wake up three days later. Time for a break from uni.'],
  clean:  ['Environmental health visit', 'The house is declared a hazard. You all get moved out.'],
  vibes:  ['Housemate intervention', 'Your housemates call a meeting. The vote is 3 to 1. Your stuff is in bin bags on the lawn.'],
};

let s, week, actionsLeft, pendingEvent, sick = 0, noise = 0;
const $ = id => document.getElementById(id);
const clamp = (v, max) => Math.max(-999, Math.min(max, v));

function newGame() {
  s = { money: 250, grades: 50, sanity: 70, clean: 60, vibes: 60 };
  week = 1; actionsLeft = ACTIONS_PER_WEEK; pendingEvent = null; sick = 0; noise = 0;
  $('log').innerHTML = '';
  $('overlay').hidden = true;
  log('Term starts. Four housemates, one bathroom. Good luck.');
  render();
}

function apply(fx) {
  for (const k in fx) s[k] = clamp(s[k] + fx[k], STATS[k].max);
}

function log(msg, kind = '') {
  const li = document.createElement('li');
  li.textContent = msg; li.className = kind;
  $('log').prepend(li);
}

function render() {
  $('weekLabel').textContent = `Week ${week} of ${TERM_WEEKS}`;
  $('actionsLeft').textContent = pendingEvent
    ? 'Deal with this first:'
    : `Actions left this week: ${actionsLeft}`;
  const stats = $('stats'); stats.innerHTML = '';
  for (const k in STATS) {
    const d = STATS[k], v = Math.max(0, s[k]);
    const pct = k === 'money' ? Math.min(100, v / d.max * 100) : v;
    const div = document.createElement('div'); div.className = 'stat';
    div.innerHTML = `<label><span></span><span></span></label><div class="bar"><i></i></div>`;
    div.querySelectorAll('span')[0].textContent = d.label;
    div.querySelectorAll('span')[1].textContent = k === 'money' ? d.fmt(s[k]) : d.fmt(v);
    const bar = div.querySelector('i');
    bar.style.width = pct + '%';
    if (pct < 25) bar.classList.add('low');
    stats.appendChild(div);
  }
  const box = $('actions'); box.innerHTML = '';
  ACTIONS.forEach(a => {
    const b = document.createElement('button');
    b.disabled = actionsLeft <= 0 || !!pendingEvent;
    b.append(a.name);
    const sm = document.createElement('small'); sm.textContent = a.note; b.append(sm);
    b.onclick = () => {
      const r = a.roll ? a.roll() : { fx: a.fx, msg: `You chose: ${a.name}.` };
      apply(r.fx); actionsLeft--; log(r.msg, r.sick ? 'bad' : '');
      if (r.sick) { sick = r.sick; actionsLeft = 0; }
      if (r.noise) noise = r.noise;
      if (!checkLoss()) render();
    };
    box.appendChild(b);
  });
  $('event').hidden = !pendingEvent;
  if (pendingEvent) {
    $('eventText').textContent = pendingEvent.text;
    const c = $('eventChoices'); c.innerHTML = '';
    pendingEvent.choices.forEach(ch => {
      const b = document.createElement('button'); b.textContent = ch.label;
      b.onclick = () => {
        const r = ch.roll ? ch.roll() : ch;
        apply(r.fx); log(r.msg, r.sick ? 'bad' : ''); if (r.sick) sick = r.sick; pendingEvent = null;
        if (!checkLoss()) nextWeek();
      };
      c.appendChild(b);
    });
  }
  $('endWeek').disabled = !!pendingEvent;
}

function checkLoss() {
  for (const k in LOSSES) {
    if (s[k] <= 0 || (k === 'money' && s[k] < -200)) { return endGame(LOSSES[k][0], LOSSES[k][1]); }
  }
  return false;
}

function endGame(title, text) {
  $('endTitle').textContent = title; $('endText').textContent = text;
  $('overlay').hidden = false; $('restart').focus();
  return true;
}

function endWeek() {
  apply({ money: -WEEKLY_BILLS, clean: -8, vibes: -2 });
  log(`Rent and bills: -£${WEEKLY_BILLS}.`, 'bad');
  if (checkLoss()) return render();
  const pool = noise > 0 && Math.random() < .75 ? COMPLAINTS : EVENTS;
  noise = 0;
  pendingEvent = pool[Math.floor(Math.random() * pool.length)];
  render();
}

function nextWeek() {
  if (week >= TERM_WEEKS) return finish();
  week++; actionsLeft = ACTIONS_PER_WEEK;
  if (sick > 0) {
    sick--; actionsLeft--; apply({ sanity: -8, clean: -5 });
    log('Still recovering from your stomach bug. One fewer action this week.', 'bad');
    if (checkLoss()) return render();
  }
  render();
}

function finish() {
  const g = s.grades;
  const result = g >= 70 ? 'First-class honours' : g >= 60 ? 'Upper second (2:1)' : g >= 50 ? 'Lower second (2:2)' : g >= 40 ? 'Third' : 'Fail';
  const house = s.vibes >= 60 && s.clean >= 40 ? 'You leave on good terms with your housemates.' : 'The housemates will not be sending Christmas cards.';
  endGame(g >= 40 ? 'Term complete!' : 'Term over', `Result: ${result} (${g}%). Money left: £${s.money}. ${house}`);
}

$('endWeek').onclick = endWeek;
$('restart').onclick = newGame;
newGame();
