import streamlit as st
import streamlit.components.v1 as components

st.set_page_config(
    page_title="Uni House Sim",
    page_icon="🏠",
    layout="wide",
    initial_sidebar_state="collapsed",
)

HTML = r"""
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>

/* =========================================================
   GENERAL
========================================================= */

* {
    box-sizing: border-box;
}

html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100%;
    background: #0d1117;
    color: #f5f7fa;
    font-family:
        Arial,
        Helvetica,
        sans-serif;
}

body {
    overflow-x: hidden;
}

button {
    font-family: inherit;
}

.app {
    width: 100%;
    max-width: 1500px;
    margin: 0 auto;
    padding: 10px 16px 6px;
}


/* =========================================================
   HEADER
========================================================= */

.header {
    position: relative;
    background: linear-gradient(135deg, #18202c, #111820);
    border: 1px solid #303a48;
    border-radius: 13px;
    padding: 13px 19px;
    margin-bottom: 9px;
    box-shadow: 0 8px 25px rgba(0,0,0,.20);
}

.eyebrow {
    color: #e7b84b;
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 2px;
    margin-bottom: 3px;
}

.header h1 {
    font-size: 32px;
    line-height: 1;
    margin: 0;
    letter-spacing: -1.5px;
}

.header p {
    color: #aeb8c5;
    margin: 5px 0 0;
    font-size: 12px;
}

.week {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
    background: #282315;
    border: 1px solid #6c5621;
    color: #f2c94c;
    padding: 9px 14px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: bold;
}


/* =========================================================
   STATS
========================================================= */

.stats {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 7px;
    margin-bottom: 9px;
}

.stat {
    background: #181f28;
    border: 1px solid #303946;
    border-radius: 9px;
    padding: 8px 12px;
    min-height: 64px;
}

.stat-label {
    color: #9ba7b5;
    font-size: 10px;
}

.stat-value {
    font-size: 21px;
    font-weight: bold;
    margin: 1px 0;
}

.stat-small {
    color: #707c8b;
    font-size: 9px;
}

.money {
    color: #f2c94c;
}


/* =========================================================
   MAIN COLUMNS
========================================================= */

.columns {
    display: grid;
    grid-template-columns: minmax(0, 1.55fr) minmax(300px, .75fr);
    gap: 9px;
}

.panel {
    background: #181f28;
    border: 1px solid #303946;
    border-radius: 12px;
    padding: 13px;
    box-shadow: 0 7px 22px rgba(0,0,0,.16);
}

.panel-title {
    color: #f2c94c;
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 2px;
}

.panel h2 {
    margin: 3px 0 8px;
    font-size: 20px;
}


/* =========================================================
   ACTIONS
========================================================= */

.actions {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 6px;
}

.action {
    min-height: 78px;
    background: #202833;
    color: white;
    border: 1px solid #3a4655;
    border-radius: 9px;
    padding: 9px 12px;
    text-align: left;
    cursor: pointer;
    transition: .15s;
}

.action:hover {
    transform: translateY(-1px);
    background: #26313e;
    border-color: #e7b84b;
}

.action:disabled {
    opacity: .4;
    cursor: not-allowed;
    transform: none;
}

.action-icon {
    float: right;
    font-size: 22px;
}

.action-title {
    font-weight: bold;
    font-size: 13px;
    margin-bottom: 4px;
}

.action-description {
    color: #aab4c1;
    font-size: 10px;
    line-height: 1.3;
}

.action-effect {
    display: block;
    margin-top: 5px;
    color: #e7b84b;
    font-size: 9px;
    font-weight: bold;
}


/* =========================================================
   INFO ROW
========================================================= */

.info {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 7px;
    margin-top: 8px;
}

.info-box {
    border-top: 1px solid #303946;
    padding-top: 7px;
}

.info-box b {
    font-size: 9px;
}

.info-box small {
    display: block;
    color: #9ba7b5;
    margin-top: 3px;
    font-size: 9px;
    line-height: 1.3;
}


/* =========================================================
   GROUP CHAT
========================================================= */

.chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
}

.log {
    height: 355px;
    overflow-y: auto;
    padding-right: 4px;
}

.log-item {
    border-bottom: 1px solid #29313c;
    padding: 9px 3px;
    font-size: 11px;
    line-height: 1.4;
}

.log-week {
    color: #e7b84b;
    font-size: 8px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 2px;
}

.good {
    border-left: 3px solid #74c69d;
    padding-left: 8px;
}

.bad {
    border-left: 3px solid #e76f73;
    padding-left: 8px;
}

.restart {
    background: #202833;
    color: white;
    border: 1px solid #3c4654;
    border-radius: 7px;
    padding: 6px 9px;
    cursor: pointer;
    font-size: 10px;
}

.restart:hover {
    border-color: #e7b84b;
}


/* =========================================================
   RANDOM EVENT
========================================================= */

.event-panel {
    margin-top: 9px;
}

.event {
    background: #10161e;
    border: 1px solid #394555;
    border-radius: 10px;
    padding: 13px;
}

.event.hidden {
    display: none;
}

.event-title {
    font-size: 17px;
    font-weight: bold;
    margin-bottom: 5px;
}

.event-text {
    color: #c5ccd5;
    line-height: 1.4;
    font-size: 11px;
    margin-bottom: 10px;
}

.choices {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 7px;
}

.choice {
    background: #232c37;
    color: white;
    border: 1px solid #3b4655;
    border-radius: 8px;
    padding: 9px;
    text-align: left;
    cursor: pointer;
}

.choice:hover {
    border-color: #e7b84b;
}

.choice b {
    display: block;
    margin-bottom: 3px;
    font-size: 11px;
}

.choice small {
    color: #aeb8c5;
    font-size: 9px;
}


/* =========================================================
   FOOTER
========================================================= */

.footer {
    display: flex;
    justify-content: space-between;
    color: #687382;
    font-size: 9px;
    padding: 6px 3px;
}


/* =========================================================
   TOAST
========================================================= */

.toast {
    position: fixed;
    right: 18px;
    bottom: 18px;
    background: #e7b84b;
    color: #17130a;
    padding: 9px 13px;
    border-radius: 8px;
    font-size: 11px;
    font-weight: bold;
    opacity: 0;
    transform: translateY(25px);
    transition: .2s;
    pointer-events: none;
    z-index: 100;
}

.toast.show {
    opacity: 1;
    transform: translateY(0);
}


/* =========================================================
   MOBILE
========================================================= */

@media(max-width: 900px) {

    .stats {
        grid-template-columns: repeat(2, 1fr);
    }

    .columns {
        grid-template-columns: 1fr;
    }

    .log {
        height: 250px;
    }

    .header {
        padding-right: 15px;
    }

    .week {
        position: static;
        display: inline-block;
        transform: none;
        margin-top: 9px;
    }
}


@media(max-width: 600px) {

    .app {
        padding: 8px;
    }

    .header h1 {
        font-size: 27px;
    }

    .header p {
        font-size: 11px;
    }

    .stats {
        grid-template-columns: 1fr 1fr;
    }

    .actions {
        grid-template-columns: 1fr;
    }

    .info {
        grid-template-columns: 1fr;
    }

    .choices {
        grid-template-columns: 1fr;
    }

    .footer {
        flex-direction: column;
        gap: 5px;
    }
}

</style>
</head>


<body>

<div class="app">


<!-- =====================================================
     HEADER
===================================================== -->

<div class="header">

    <div class="eyebrow">
        18+ STUDENT HOUSE SURVIVAL SIM
    </div>

    <h1>
        🏠 Uni House Sim
    </h1>

    <p>
        Survive university without destroying your degree,
        your bank account or your friendships.
    </p>

    <div class="week" id="week">
        WEEK 1 / 12
    </div>

</div>


<!-- =====================================================
     STATS
===================================================== -->

<div class="stats">

    <div class="stat">
        <div class="stat-label">💷 MONEY</div>
        <div class="stat-value money" id="money">£420</div>
        <div class="stat-small">Your overdraft is watching.</div>
    </div>

    <div class="stat">
        <div class="stat-label">🧠 SANITY</div>
        <div class="stat-value" id="sanity">72</div>
        <div class="stat-small">Still technically functioning.</div>
    </div>

    <div class="stat">
        <div class="stat-label">📚 GRADES</div>
        <div class="stat-value" id="grades">58</div>
        <div class="stat-small">Academic weapon-ish.</div>
    </div>

    <div class="stat">
        <div class="stat-label">🧹 HOUSE</div>
        <div class="stat-value" id="house">62</div>
        <div class="stat-small">Technically habitable.</div>
    </div>

    <div class="stat">
        <div class="stat-label">🤝 HOUSEMATES</div>
        <div class="stat-value" id="friends">65</div>
        <div class="stat-small">Still speaking to you.</div>
    </div>

</div>


<!-- =====================================================
     MAIN GAME
===================================================== -->

<div class="columns">


<!-- ACTION PANEL -->

<div class="panel">

    <div class="panel-title">
        WHAT ARE YOU DOING?
    </div>

    <h2>
        Choose an action
    </h2>

    <div style="
        color:#8bd3dd;
        font-size:11px;
        font-weight:bold;
        margin-bottom:7px;
    ">
        <span id="actionsLeft">3</span>
        actions remaining
    </div>

    <div class="actions" id="actions"></div>


    <div class="info">

        <div class="info-box">
            <b>📅 NEXT DEADLINE</b>

            <small id="deadline">
                Essay due Friday. You haven't started.
            </small>
        </div>

        <div class="info-box">
            <b>💸 WEEKLY BILLS</b>

            <small>
                Rent and bills are deducted every week.
            </small>
        </div>

        <div class="info-box">
            <b>🎲 CHAOS LEVEL</b>

            <small id="chaos">
                Moderately irresponsible.
            </small>
        </div>

    </div>

</div>


<!-- GROUP CHAT -->

<div class="panel">

    <div class="chat-header">

        <div>

            <div class="panel-title">
                HOUSE GROUP CHAT
            </div>

            <h2>
                Live feed
            </h2>

        </div>

        <button
            class="restart"
            onclick="newGame()"
        >
            ↻ Restart
        </button>

    </div>

    <div class="log" id="log"></div>

</div>

</div>


<!-- =====================================================
     EVENT PANEL
===================================================== -->

<div class="panel event-panel">

    <div class="panel-title">
        RANDOM HOUSE DISASTER
    </div>

    <h2>
        What could possibly go wrong?
    </h2>

    <div
        class="event hidden"
        id="event"
    ></div>

</div>


<!-- FOOTER -->

<div class="footer">

    <span>
        🔞 Adult humour mode. Everyone in the simulation is an adult.
    </span>

    <span>
        University is temporary. The embarrassing screenshots are forever.
    </span>

</div>

</div>


<div
    class="toast"
    id="toast"
></div>


<script>


/* =========================================================
   GAME STATE
========================================================= */

let week = 1;

let actionsLeft = 3;

let money = 420;

let sanity = 72;

let grades = 58;

let house = 62;

let friends = 65;

let gameOver = false;

let currentEvent = null;


/* =========================================================
   ACTIONS
========================================================= */

const actions = [

{
    icon: "📚",
    title: "Pretend to study",
    description:
        "Open Word and stare at the cursor for three hours.",
    effect:
        "GRADE ↑  SANITY ↓",

    run() {
        grades += 7;
        sanity -= 6;
    },

    lines: [
        "You highlighted a sentence. This now counts as revision.",
        "You accidentally learned something. Horrifying.",
        "You spent 20 minutes choosing a font."
    ]
},


{
    icon: "💼",
    title: "Work a humiliating shift",
    description:
        "Smile politely while a customer explains economics to you.",
    effect:
        "MONEY ↑↑  SANITY ↓",

    run() {
        money += 55;
        sanity -= 8;
    },

    lines: [
        "A customer asked if you work here. You were wearing the uniform.",
        "You earned money and lost several years of your life.",
        "You survived the shift. Your soul did not."
    ]
},


{
    icon: "🍻",
    title: "Go to the pub",
    description:
        "A phrase which has ruined generations of student bank accounts.",
    effect:
        "SANITY ↑  MONEY ↓",

    run() {
        money -= 24;
        sanity += 16;
        friends += 5;
    },

    lines: [
        "You said 'last one' with the confidence of a liar.",
        "Someone bought chips. Morale improved immediately.",
        "You now know the bartender's entire life story."
    ]
},


{
    icon: "🧽",
    title: "Deep-clean the kitchen",
    description:
        "Discover a pan that may legally qualify as an archaeological site.",
    effect:
        "HOUSE ↑↑  SANITY ↓",

    run() {
        house += 22;
        sanity -= 4;
    },

    lines: [
        "You found a spoon nobody claimed.",
        "The kitchen can now legally be photographed.",
        "You cleaned behind the microwave. There are no survivors."
    ]
},


{
    icon: "💘",
    title: "Go on an adult date",
    description:
        "Flirt responsibly. Overthink the goodbye hug irresponsibly.",
    effect:
        "SANITY ↑  MONEY ↓",

    run() {
        money -= 20;
        sanity += 14;
        friends += 2;
    },

    lines: [
        "The date went well. You will now overanalyse one sentence for 72 hours.",
        "There was chemistry. Unfortunately most of it was in the restaurant bill.",
        "You made eye contact. Basically a relationship."
    ]
},


{
    icon: "🏋️",
    title: "Go to the gym",
    description:
        "Exercise for 45 minutes, then reward yourself with a £6 meal deal.",
    effect:
        "SANITY ↑  MONEY ↓",

    run() {
        money -= 12;
        sanity += 10;
    },

    lines: [
        "You lifted something heavier than your dissertation.",
        "Your post-gym meal cost more than your gym membership.",
        "You are sore in places you didn't know existed."
    ]
},


{
    icon: "🪩",
    title: "Host a house party",
    description:
        "Music, questionable decisions and a mysterious person called Jamie.",
    effect:
        "FRIENDS ↑↑  HOUSE ↓",

    run() {
        house -= 22;
        friends += 24;
        sanity += 5;
        money -= 30;
    },

    lines: [
        "Someone asked whose house it was. You live here.",
        "The floor is sticky. Nobody knows why.",
        "A stranger is asleep on a chair. This is now a family home."
    ]
},


{
    icon: "🎮",
    title: "Game until 3 AM",
    description:
        "You will definitely stop after this match. You absolutely will.",
    effect:
        "SANITY ↑  GRADES ↓",

    run() {
        sanity += 12;
        grades -= 7;
    },

    lines: [
        "One more match became seven.",
        "You shouted at a screen and called it recreation.",
        "Your mouse has heard things no mouse should hear."
    ]
},


{
    icon: "🍝",
    title: "Cook a suspiciously good dinner",
    description:
        "Everyone remembers you exist. The washing-up remains.",
    effect:
        "FRIENDS ↑  HOUSE ↓",

    run() {
        money += 8;
        friends += 16;
        house -= 8;
    },

    lines: [
        "Everyone praised the food and ignored the washing-up.",
        "You have become the house's unpaid caterer.",
        "The recipe said 20 minutes. It lied."
    ]
},


{
    icon: "💻",
    title: "Pull an essay all-nighter",
    description:
        "Academic panic is a powerful but unhealthy stimulant.",
    effect:
        "GRADE ↑↑  SANITY ↓↓",

    run() {
        grades += 15;
        sanity -= 18;
    },

    lines: [
        "You wrote 900 words and deleted 700.",
        "You have discovered the power of academic panic.",
        "The bibliography is mostly vibes."
    ]
},


{
    icon: "🌙",
    title: "Stay out far too late",
    description:
        "The night bus knows your name now.",
    effect:
        "SANITY ↑  MONEY ↓↓",

    run() {
        money -= 35;
        sanity += 20;
        grades -= 3;
    },

    lines: [
        "The night bus has become a recurring character.",
        "You spent £8 on a drink you didn't even like.",
        "You watched the sunrise and questioned every decision since September."
    ]
},


{
    icon: "🧺",
    title: "Destroy the laundry mountain",
    description:
        "Find socks from a previous political era.",
    effect:
        "HOUSE ↑  SANITY ↑",

    run() {
        house += 16;
        sanity += 4;
    },

    lines: [
        "You found a sock that has clearly been through a lot.",
        "The laundry mountain has been defeated.",
        "Your clothes are clean. This is a landmark achievement."
    ]
}

];


/* =========================================================
   RANDOM EVENTS
========================================================= */

const events = [

{
    title: "🚨 THE FRIDGE INCIDENT",

    text:
        "Someone has left a container in the fridge labelled " +
        "'DO NOT OPEN'. It has been there since freshers' week. " +
        "Your housemates are looking at you.",

    choices: [

        {
            title: "Open it",
            description:
                "Heroism, trauma and -15 sanity.",

            run() {
                sanity -= 15;
                house += 5;

                log(
                    "You opened it. Science has learned nothing. The smell has.",
                    "bad"
                );
            }
        },

        {
            title: "Throw it away",
            description:
                "Gain house respect. Lose the container owner.",

            run() {
                house += 10;
                friends -= 5;

                log(
                    "You binned the biohazard. Someone called you a fascist. The kitchen is cleaner.",
                    "good"
                );
            }
        }

    ]
},


{
    title: "💘 A RISKY TEXT",

    text:
        "It's 1:14 AM. You receive: 'u up? 👀'. " +
        "Your flatmate says this is either romance or a terrible idea.",

    choices: [

        {
            title: "Reply 'depends...'",
            description:
                "Flirtation. Maximum ambiguity.",

            run() {
                sanity += 10;
                friends += 3;

                log(
                    "You replied 'depends...'. The typing bubble appeared for 11 minutes.",
                    "good"
                );
            }
        },

        {
            title: "Go to sleep",
            description:
                "A rare display of emotional maturity.",

            run() {
                sanity += 8;
                grades += 3;

                log(
                    "You went to bed. Tomorrow-you is suspiciously grateful.",
                    "good"
                );
            }
        }

    ]
},


{
    title: "🍷 THE KITCHEN DATE",

    text:
        "Two consenting adults are trying to have a quiet date " +
        "in the kitchen. Unfortunately, your housemate has started " +
        "making toast at industrial volume.",

    choices: [

        {
            title: "Leave them to it",
            description:
                "You respect the vibe.",

            run() {
                friends += 8;

                log(
                    "You quietly disappeared. The toast survived. Romance may have too.",
                    "good"
                );
            }
        },

        {
            title: "Become the world's worst DJ",
            description:
                "You put on music. Nobody asked for this.",

            run() {
                friends -= 10;
                sanity += 5;

                log(
                    "You DJ'd the kitchen date. You are no longer invited to kitchen dates.",
                    "bad"
                );
            }
        }

    ]
},


{
    title: "🛋️ THE SOFA SITUATION",

    text:
        "There is a suspiciously romantic-looking pair of shoes " +
        "by the sofa. Nobody is admitting anything. You have an essay due.",

    choices: [

        {
            title: "Mind your business",
            description:
                "A mature and healthy boundary.",

            run() {
                grades += 4;
                sanity += 4;

                log(
                    "You minded your own business. For once, it was the correct choice.",
                    "good"
                );
            }
        },

        {
            title: "Investigate",
            description:
                "You have chosen chaos.",

            run() {
                sanity -= 8;
                friends -= 8;

                log(
                    "You investigated. You immediately wished you hadn't.",
                    "bad"
                );
            }
        }

    ]
},


{
    title: "💸 RENT DAY",

    text:
        "The landlord wants rent. Your bank account wants " +
        "to become a historical exhibit.",

    choices: [

        {
            title: "Pay on time",
            description:
                "Boring. Responsible. Financially painful.",

            run() {
                money -= 95;
                grades += 2;

                log(
                    "Rent paid. Your bank account is now making a faint whimpering noise.",
                    "good"
                );
            }
        },

        {
            title: "Ask for a few days",
            description:
                "Bold strategy. Email anxiety included.",

            run() {
                money -= 35;
                sanity -= 6;

                log(
                    "You asked for an extension. The landlord replied 'noted'. Terrifying.",
                    "bad"
                );
            }
        }

    ]
},


{
    title: "🍳 THE 2 AM FRY-UP",

    text:
        "The house has decided that a 2 AM fry-up is essential. " +
        "The fire alarm disagrees.",

    choices: [

        {
            title: "Cook together",
            description:
                "Carbs + friendship. Smoke alarm optional.",

            run() {
                friends += 12;
                house -= 7;
                sanity += 5;
                money -= 10;

                log(
                    "You made a 2 AM fry-up. The kitchen smells incredible and slightly illegal.",
                    "good"
                );
            }
        },

        {
            title: "Call it a night",
            description:
                "You are the responsible one. Nobody likes you.",

            run() {
                sanity += 7;
                friends -= 5;

                log(
                    "You went to bed. The frying pan remained your enemy until sunrise.",
                    "good"
                );
            }
        }

    ]
},


{
    title: "📱 THE GROUP CHAT SCANDAL",

    text:
        "Someone has accidentally sent a screenshot to the house group chat " +
        "that was absolutely not meant for the house group chat.",

    choices: [

        {
            title: "Pretend you saw nothing",
            description:
                "Digital diplomacy.",

            run() {
                friends += 5;

                log(
                    "You said nothing. A heroic act of group-chat restraint.",
                    "good"
                );
            }
        },

        {
            title: "React with 👀",
            description:
                "You have chosen violence.",

            run() {
                friends -= 7;
                sanity += 8;

                log(
                    "You reacted with 👀. The group chat entered a new era.",
                    "bad"
                );
            }
        }

    ]
},


{
    title: "🧼 PASSIVE-AGGRESSIVE NOTE",

    text:
        "A note on the fridge says: 'WHOEVER KEEPS LEAVING DISHES: " +
        "WE NEED TO TALK.' Nobody is replying.",

    choices: [

        {
            title: "Wash everything",
            description:
                "Become the house hero for approximately 36 hours.",

            run() {
                house += 18;
                friends += 10;
                sanity -= 5;

                log(
                    "You washed the dishes. Someone immediately made another one.",
                    "good"
                );
            }
        },

        {
            title: "Write 'noted'",
            description:
                "Petty. Efficient. Dangerous.",

            run() {
                friends -= 9;
                sanity += 6;

                log(
                    "You wrote 'noted'. The reply was three skull emojis.",
                    "bad"
                );
            }
        }

    ]
},


{
    title: "🚪 THE UNEXPECTED HOUSEMATE",

    text:
        "A friend of a friend has somehow been sleeping on the sofa " +
        "for three nights. Nobody knows who invited them.",

    choices: [

        {
            title: "Let them stay",
            description:
                "Congratulations, you have adopted an adult.",

            run() {
                friends += 12;
                house -= 10;
                money -= 8;

                log(
                    "The mysterious sofa resident is now considered part of the household.",
                    "good"
                );
            }
        },

        {
            title: "Demand answers",
            description:
                "You attempt to establish basic governance.",

            run() {
                sanity -= 5;
                house += 5;

                log(
                    "You demanded answers. Nobody had any. Democracy has failed.",
                    "bad"
                );
            }
        }

    ]
}

];


/* =========================================================
   HELPERS
========================================================= */

function clamp(value) {

    return Math.max(
        0,
        Math.min(
            100,
            Math.round(value)
        )
    );
}


function moneyText(value) {

    return "£" + Math.round(value);
}


function log(message, type = "") {

    const item =
        document.createElement("div");

    item.className =
        "log-item " + type;

    item.innerHTML =
        '<div class="log-week">Week ' +
        week +
        '</div>' +
        message;

    document
        .getElementById("log")
        .prepend(item);
}


function toast(message) {

    const element =
        document.getElementById("toast");

    element.innerText =
        message;

    element.classList.add("show");

    setTimeout(function() {

        element.classList.remove("show");

    }, 1600);
}


/* =========================================================
   RENDER
========================================================= */

function render() {

    money =
        Math.round(money);

    sanity =
        clamp(sanity);

    grades =
        clamp(grades);

    house =
        clamp(house);

    friends =
        clamp(friends);


    document.getElementById("money").innerText =
        moneyText(money);

    document.getElementById("sanity").innerText =
        sanity;

    document.getElementById("grades").innerText =
        grades;

    document.getElementById("house").innerText =
        house;

    document.getElementById("friends").innerText =
        friends;

    document.getElementById("week").innerText =
        "WEEK " + week + " / 12";

    document.getElementById("actionsLeft").innerText =
        actionsLeft;


    let deadline;

    if (grades < 30) {

        deadline =
            "Your degree is considering legal action.";

    }
    else if (grades < 50) {

        deadline =
            "Essay due Friday. You haven't started.";

    }
    else if (grades < 70) {

        deadline =
            "Essay due Friday. You have opened Word.";

    }
    else {

        deadline =
            "Academic progress detected. Suspicious.";

    }


    document.getElementById("deadline").innerText =
        deadline;


    let chaos;

    if (sanity < 25) {

        chaos =
            "Absolutely feral.";

    }
    else if (house < 25) {

        chaos =
            "The house is becoming a crime scene.";

    }
    else if (friends < 25) {

        chaos =
            "Socially radioactive.";

    }
    else if (money < 50) {

        chaos =
            "Financially doomed.";

    }
    else {

        chaos =
            "Moderately irresponsible.";

    }


    document.getElementById("chaos").innerText =
        chaos;


    renderActions();
}


/* =========================================================
   ACTION BUTTONS
========================================================= */

function renderActions() {

    const container =
        document.getElementById("actions");

    container.innerHTML = "";


    actions.forEach(function(action, index) {

        const button =
            document.createElement("button");

        button.className =
            "action";

        button.disabled =
            actionsLeft <= 0 ||
            gameOver;


        button.innerHTML =

            '<span class="action-icon">' +
            action.icon +
            '</span>' +

            '<div class="action-title">' +
            action.title +
            '</div>' +

            '<div class="action-description">' +
            action.description +
            '</div>' +

            '<span class="action-effect">' +
            action.effect +
            '</span>';


        button.onclick =
            function() {

                performAction(index);

            };


        container.appendChild(button);

    });
}


/* =========================================================
   PERFORM ACTION
========================================================= */

function performAction(index) {

    if (gameOver) return;

    if (actionsLeft <= 0) return;


    const action =
        actions[index];


    action.run();


    actionsLeft--;


    const line =
        action.lines[
            Math.floor(
                Math.random() *
                action.lines.length
            )
        ];


    log(
        "<b>" +
        action.title +
        "</b> — " +
        line
    );


    toast("Action taken");


    render();

    checkGameOver();


    if (
        !gameOver &&
        actionsLeft === 0
    ) {

        endWeek();

    }
}


/* =========================================================
   END WEEK
========================================================= */

function endWeek() {

    money -= 95;

    house -= 3;

    sanity -= 2;

    grades += 1;


    log(
        "💷 <b>End of week:</b> Rent and bills cost £95. " +
        "Your bank account has entered a period of reflection.",
        money < 0 ? "bad" : ""
    );


    if (week >= 12) {

        finishGame();

        return;
    }


    week++;

    actionsLeft = 3;


    render();

    checkGameOver();


    if (!gameOver) {

        setTimeout(
            showRandomEvent,
            300
        );

    }
}


/* =========================================================
   RANDOM EVENT
========================================================= */

function showRandomEvent() {

    if (gameOver) return;


    const event =
        events[
            Math.floor(
                Math.random() *
                events.length
            )
        ];


    currentEvent =
        event;


    const element =
        document.getElementById("event");


    element.classList.remove("hidden");


    let choicesHTML = "";


    event.choices.forEach(
        function(choice, index) {

            choicesHTML +=

                '<button class="choice" ' +
                'onclick="chooseEvent(' +
                index +
                ')">' +

                '<b>' +
                choice.title +
                '</b>' +

                '<small>' +
                choice.description +
                '</small>' +

                '</button>';

        }
    );


    element.innerHTML =

        '<div class="event-title">' +
        event.title +
        '</div>' +

        '<div class="event-text">' +
        event.text +
        '</div>' +

        '<div class="choices">' +
        choicesHTML +
        '</div>';
}


/* =========================================================
   EVENT CHOICE
========================================================= */

function chooseEvent(index) {

    if (!currentEvent) return;


    const choice =
        currentEvent.choices[index];


    choice.run();


    currentEvent =
        null;


    document
        .getElementById("event")
        .classList.add("hidden");


    render();

    checkGameOver();
}


/* =========================================================
   GAME OVER
========================================================= */

function checkGameOver() {

    if (gameOver) return;


    if (money < -150) {

        finish(
            "Your bank account has entered witness protection."
        );

    }
    else if (sanity <= 0) {

        finish(
            "Your sanity has left the building. " +
            "The building is now noticeably calmer."
        );

    }
    else if (grades <= 0) {

        finish(
            "Your academic record has become performance art."
        );

    }
    else if (house <= 0) {

        finish(
            "The house has become legally indistinguishable from a skip."
        );

    }
    else if (friends <= 0) {

        finish(
            "Your housemates have formed a coalition against you."
        );

    }
}


/* =========================================================
   GAME OVER SCREEN
========================================================= */

function finish(reason) {

    gameOver =
        true;


    const element =
        document.getElementById("event");


    element.classList.remove("hidden");


    element.innerHTML =

        '<div class="event-title">' +
        '🛑 TERM OVER' +
        '</div>' +

        '<div class="event-text">' +

        reason +

        '<br><br>' +

        '<b>Final stats</b>' +

        '<br>' +

        '💷 £' +
        Math.round(money) +

        ' &nbsp; 📚 ' +
        grades +

        ' &nbsp; 🧠 ' +
        sanity +

        ' &nbsp; 🧹 ' +
        house +

        ' &nbsp; 🤝 ' +
        friends +

        '</div>' +

        '<button class="choice" onclick="newGame()">' +

        '<b>Start a new term</b>' +

        '<small>Surely this time will be different.</small>' +

        '</button>';


    render();
}


/* =========================================================
   FINISH 12 WEEKS
========================================================= */

function finishGame() {

    gameOver =
        true;


    const score =
        Math.round(
            grades +
            sanity * .25 +
            house * .20 +
            friends * .15 +
            Math.max(0, money) / 10
        );


    let result;


    if (score >= 100) {

        result =
            "FIRST-CLASS CHAOS";

    }
    else if (score >= 80) {

        result =
            "SOLID 2:1 ENERGY";

    }
    else if (score >= 60) {

        result =
            "A RESPECTABLE 2:2";

    }
    else {

        result =
            "YOU TECHNICALLY GRADUATED";

    }


    const element =
        document.getElementById("event");


    element.classList.remove("hidden");


    element.innerHTML =

        '<div class="event-title">' +
        '🎓 YOU SURVIVED UNIVERSITY' +
        '</div>' +

        '<div class="event-text">' +

        'Your final result is: ' +

        '<b>' +
        result +
        '</b>' +

        '<br><br>' +

        '<b>Final score: ' +
        score +
        '</b>' +

        '<br><br>' +

        '💷 Money: £' +
        Math.round(money) +

        '<br>' +

        '📚 Grades: ' +
        grades +

        '<br>' +

        '🧠 Sanity: ' +
        sanity +

        '<br>' +

        '🧹 House: ' +
        house +

        '<br>' +

        '🤝 Housemates: ' +
        friends +

        '<br><br>' +

        'You came for a degree and left with a complicated relationship with the kitchen.'

        + '</div>' +

        '<button class="choice" onclick="newGame()">' +

        '<b>Play again</b>' +

        '<small>Surely this time will be different.</small>' +

        '</button>';


    render();
}


/* =========================================================
   NEW GAME
========================================================= */

function newGame() {

    week = 1;

    actionsLeft = 3;

    money = 420;

    sanity = 72;

    grades = 58;

    house = 62;

    friends = 65;

    gameOver = false;

    currentEvent = null;


    document.getElementById("log").innerHTML = "";


    document
        .getElementById("event")
        .classList.add("hidden");


    log(
        "Welcome to the house. The Wi-Fi password is written on a note that has mysteriously disappeared.",
        "good"
    );


    log(
        "🔞 Adult humour mode enabled. Everyone in the simulation is an adult."
    );


    render();
}


/* =========================================================
   START GAME
========================================================= */

newGame();

</script>

</body>
</html>
"""


components.html(
    HTML,
    height=790,
    scrolling=False
)
