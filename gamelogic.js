// var playerRace = player1.race;
// var imgFighter1 = document.getElementById("imgFighter1");

// if (playerRace = "orcs") {
//     imgFighter1.src = "./pictures/orc.jpg"
// }

var player3 = new Person("Protozaurus", "Orcs", "Boots");
console.log(player3);


//RACE - once
function handleRace (player) {
    switch (player.race) {

        case "Humans":
            player.maxDamage = player.maxDamage * 1.2; // HUMANS - 20% less damage taken
            break;

        case "Orcs":
            //ORCS - 40% more max health
            player.maxHealth = player.maxHealth * 1.4; 
            player.currentHealth = player.maxHealth;
            break;
    
        case "Elves":
            //ELVES - 30% chance to deflect the attack back to the opponent. 
            //The attacker takes damage equal to 50% of the original hit. The elf takes no damage.
            break;
    
        case "Vampires":
            // VAMPIRES -  10% lifesteal from opponents current health at start of the vampire's turn.
            //player3.currentHealth = playerX.currentHealth * 0.1;
            break;
    
        default:
            break;
    }
}



//WEAPONS

switch (player3.item) {

    case "Boots":
        //Boots - 30% chance to dodge an attack
        break;

    case "Staff":
        //Staff - 20% increase in healing
        break;

    case "Sword":
        //Sword - 30% more damage

        break;

    case "Bow":
        // Bow - 30% chance to attack twice
        break;

    default:
        break;
}




