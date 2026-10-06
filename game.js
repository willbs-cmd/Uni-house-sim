case 'pub_quiz':
    money -= 15;
    sanity += 20;
    housemates += 15;
    logEvent("You dragged the house to the pub quiz. You didn't win, but the pints were cold.");
    break;

case 'podcast_debate':
    sanity -= 10;
    housemates -= 15;
    grades += 5;
    logEvent("You tried to discuss a political podcast over breakfast. The kitchen is now a hostile diplomatic zone.");
    break;

case 'veggie_dinner':
    money -= 10;
    housemates += 20;
    house_state -= 15;
    logEvent("You cooked a massive batch of vegetarian chili for everyone. Delicious, but the sink is overflowing with pans.");
    break;

case 'pol_sim':
    grades -= 15;
    sanity += 15;
    logEvent("You spent seven hours reforming taxes in a simulation game while your actual essays gathered dust.");
    break;
