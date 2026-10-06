// Initialize player stats
let grades = 50;
let sanity = 50;
let housemates = 50;
let money = 50;
let house_state = 50;

// Function to update the on-screen numbers
function updateDisplay() {
    if (document.getElementById('grades')) document.getElementById('grades').innerText = grades;
    if (document.getElementById('sanity')) document.getElementById('sanity').innerText = sanity;
    if (document.getElementById('housemates')) document.getElementById('housemates').innerText = housemates;
    if (document.getElementById('money')) document.getElementById('money').innerText = money;
    if (document.getElementById('house_state')) document.getElementById('house_state').innerText = house_state;
}

// Function to log events to the screen
function logEvent(message) {
    const logArea = document.getElementById('log');
    if (logArea) {
        logArea.innerHTML = "<p>" + message + "</p>" + logArea.innerHTML;
    }
}

// Main game logic for button actions
function performAction(action) {
    switch(action) {
        case 'skip_lecture':
            grades -= 5;
            sanity += 10;
            logEvent("You hit snooze and missed your 9 AM. Blissful ignorance.");
            break;
            
        case 'steal_milk':
            housemates -= 12;
            sanity += 5;
            logEvent("You used someone else's milk for your cereal. The WhatsApp group is going to be tense.");
            break;
            
        case 'call_parents':
            money += 20;
            sanity -= 8;
            logEvent("You endured a 40-minute lecture on 'budgeting' from your mum, but you secured £20.");
            break;
            
        case 'all_nighter':
            grades += 15;
            sanity -= 25;
            house_state -= 5;
            logEvent("Six Red Bulls and a library desk. You are a machine, but your brain is melting.");
            break;
    }
    
    // Update the screen after the action finishes processing
    updateDisplay();
}

// Run the display update once when the page first loads
window.onload = updateDisplay;
