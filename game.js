case 'flatmate_romance':
    housemates -= 30;
    sanity -= 10;
    house_state -= 5;
    logEvent("You crossed the line. The kitchen dynamic is permanently ruined and the group chat is dead silent.");
    break;

case 'ai_essay':
    grades += 20;
    sanity += 15;
    logEvent("You had an AI generate 3,000 words on International Relations. You didn't even proofread it before submitting.");
    break;

case 'steal_cone':
    house_state += 10;
    sanity += 5;
    logEvent("You dragged a muddy traffic cone all the way back from the city centre. It is now the house mascot.");
    break;

case 'skip_rent':
    money -= 40;
    sanity += 20;
    grades -= 5;
    logEvent("You blew a chunk of your rent budget on overpriced rounds. Your landlord is typing...");
    break;
