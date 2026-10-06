// Add these cases to your existing action-handling logic

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
