//Use this script to generate your character
function Person(name, race, item) {
    this.name = name;
    this.race = race;
    this.item = item;

    this.calculateHealth = function () {
        var health = 100;

        if (this.race == "Orcs") {
            health = health * 1.4;
        }
        return health;
    }

    this.maxHealth = this.calculateHealth();
    this.currentHealth = this.maxHealth;

    this.min = 3;
    this.maxDamage = 20;
    this.maxHealing = 30;
    //TODO delete names from HTML

    this.hit = function (enemy) {
        if (this.currentHealth <= 0 || enemy.currentHealth <= 0) {
            return;
        }

        //Boots - 30% chance to dodge an attack
        var isAttackDeflected = Math.random() < 0.3;
        if (enemy.item = "Boots") {
            if (isAttackDeflected) {
                return;
            };
        }

        var damagePoints = generateRandomNr(this.min, this.maxDamage);

        if (this.item == "Bow") {
            // Bow - 30% chance to attack twice
            var attacksTwice = Math.random() < 0.3;
            if (attacksTwice) {
                var damagePoints2 = generateRandomNr(this.min, this.maxDamage);
                damagePoints = damagePoints + damagePoints2;
            }
        }

        //Sword - 30% more damage
        if (this.item == "Sword") {
            enemy.currentHealth = enemy.currentHealth - (damagePoints * 0.3);
            if (enemy.currentHealth < 0) {
                enemy.currentHealth = 0;
            }
        }

        if (this.race == "Vampires") {
            this.currentHealth = this.currentHealth + (enemy.currentHealth * 0.1);
            enemy.currentHealth = enemy.currentHealth - (enemy.currentHealth * 0.1);
            if (enemy.currentHealth < 0) {
                enemy.currentHealth = 0;
            }
        }

        if (enemy.race == "Elves" && isAttackDeflected) {
            this.currentHealth = this.currentHealth - damagePoints / 2;
            if (this.currentHealth < 0) {
                this.currentHealth = 0;
            }
        }
        else if (enemy.race == "Humans") {
            damagePoints = damagePoints - (damagePoints * 0.2); // 0.8 * damage
            enemy.currentHealth = enemy.currentHealth - damagePoints;
            if (enemy.currentHealth < 0) {
                enemy.currentHealth = 0;
            }
        }
        else {
            enemy.currentHealth = enemy.currentHealth - damagePoints;
            if (enemy.currentHealth < 0) {
                enemy.currentHealth = 0;
            }
        }
    };

    this.heal = function (enemy) {
        if (this.currentHealth >= this.maxHealth || this.currentHealth == 0) {
            return;
        }

        var healingPoints = generateRandomNr(this.min, this.maxHealing);

        //Staff - 20% increase in healing
        if (enemy.item == "Staff") {
            this.currentHealth = this.currentHealth + (healingPoints * 0.2);
            if (this.currentHealth > this.maxHealth) {
                this.currentHealth = this.maxHealth;
            }
        }
        else {
            this.currentHealth = this.currentHealth + healingPoints;
            if (this.currentHealth > this.maxHealth) {
                this.currentHealth = this.maxHealth;
            }
        }
    };

    this.yield = function () { };

    this.damage = function () {

    };

    this.totalDamage = this.damage();

    this.displayChar = function () {
        return `I am a ${this.race}, I wield a ${this.item}, my total health point are ${this.maxHealth}`;
    };
}


//Generate Random Nr.
function generateRandomNr(minNr, maxNr) {
    var randomNr = Math.floor(Math.random() * (maxNr - minNr + 1)) + minNr;
    return randomNr;
}

// HIDE ELEMENTS ONLOAD
function hideElement(id) {
    var element = document.getElementById(id);
    element.style.display = "none";
}

function showElement(id) {
    var element = document.getElementById(id);
    element.style.display = "flex";
}

function onDocumentLoad() {
    hideElement("movesLog");
    hideElement("buttonsPanel");
    validateForm();
}

window.addEventListener("load", onDocumentLoad);

// SHOW ELEMENTS ON CLICK
function createCharacter(nameId, raceId, itemId) {
    var name = document.getElementById(nameId).value;
    var race = document.getElementById(raceId).value;
    var item = document.getElementById(itemId).value;

    var player = new Person(name, race, item);
    return player;
}

function changeCharacterName(id, player) {
    var fighter = document.getElementById(id);
    fighter.innerText = player.name.toUpperCase() + " - " + player.race;
}

 //change imgs
 function changeCharacterImage(player, id) {
    switch (player.race) {
        case "Elves":
            document.getElementById(id).src = "./pictures/elf.jpg";
            break;

        case "Humans":
            document.getElementById(id).src = "./pictures/human.jpg";
            break;

        case "Orcs":
            document.getElementById(id).src = "./pictures/orc.jpg";
            break;

        case "Vampires":
            document.getElementById(id).src = "./pictures/vampire.jpg";
            break;

        default:
            break;
    }
}


//progress Bar
function updateProgressBar(id, player) {
    var elementPlayer = document.getElementById(id);
    var widthCalculation = (player.currentHealth * 100) / player.maxHealth;
    elementPlayer.style.width = widthCalculation + "%";
    elementPlayer.innerText = Math.floor(player.currentHealth) + "%";
    elementPlayer.ariaValueMax = player.maxHealth;
}

var player1;
var player2;


function onSubmit() {
    showElement("movesLog");
    showElement("buttonsPanel");
    hideElement("creationPanel");

    //CREATE CHARACTERS
    player1 = createCharacter("namePlayer1", "racePlayer1", "itemPlayer1");
    player2 = createCharacter("namePlayer2", "racePlayer2", "itemPlayer2");
    changeCharacterName("fighter1", player1);
    changeCharacterName("fighter2", player2);
    changeCharacterImage(player1, "imgFighter1");
    changeCharacterImage(player2, "imgFighter2");
   

    var weaponElements = document.getElementsByClassName("fas fa-khanda");
    weaponElements[0].innerText = player1.item;
    weaponElements[1].innerText = player2.item;

    updateProgressBar("progressPlayer1", player1);
    updateProgressBar("progressPlayer2", player2);

}

//LOG MESSAGE BAR
//var logPlayer1 = player1.displayChar();
//logElement.innerText = logPlayer1;

//FUNCTIONS
function scrollToBottom(id) {
    var objDiv = document.getElementById(id);
    objDiv.scrollTop = objDiv.scrollHeight;
}

function addMessageLog(message) {
    var createdElement = document.createElement("p");
    var createdText = document.createTextNode(message);
    createdElement.appendChild(createdText);
    var logElement = document.getElementById("logPlayers");
    logElement.appendChild(createdElement);
}

function showModal() {
    $("#exampleModalCenter").modal();
}

function restartGame(looser, winner) {
    alert(looser.name + " lost the game!!!")

    var winMessage = winner.name + " won the game!!!"
    document.getElementById("exampleModalLongTitle").innerText = winMessage.toUpperCase();
    showModal();

    document.getElementById("playAgain").addEventListener("click", () => {
        window.location.reload();
    });
    document.getElementById("exampleModalCenter").addEventListener("blur", () => {
        window.location.reload();
    });
}

function endGame(firstPlayer, secondPlayer) {
    if (firstPlayer.currentHealth == 0) {
        restartGame(firstPlayer, secondPlayer);
    }
    if (player2.currentHealth == 0) {
        restartGame(secondPlayer, firstPlayer);
    }
}


//BUTTONS
document.getElementById("hitButtonPlayer1").addEventListener("click", () => {
    addMessageLog(player1.name + " hits the enemy!");
    scrollToBottom("logPlayers");
    player1.hit(player2);
    updateProgressBar("progressPlayer1", player1);
    updateProgressBar("progressPlayer2", player2);
    setTimeout(function () {
        endGame(player1, player2);
    }, 500);
})

document.getElementById("hitButtonPlayer2").addEventListener("click", () => {
    addMessageLog(player2.name + " hits the enemy!");
    scrollToBottom("logPlayers");
    player2.hit(player1);
    updateProgressBar("progressPlayer1", player1);
    updateProgressBar("progressPlayer2", player2);
    setTimeout(function () {
        endGame(player1, player2);
    }, 500);
})

document.getElementById("healButtonPlayer1").addEventListener("click", () => {
    addMessageLog(player1.name + " heals himself!");
    scrollToBottom("logPlayers");
    player1.heal(player2);
    updateProgressBar("progressPlayer1", player1);
})

document.getElementById("healButtonPlayer2").addEventListener("click", () => {
    addMessageLog(player2.name + " heals himself!");
    scrollToBottom("logPlayers");
    player2.heal(player1);
    updateProgressBar("progressPlayer2", player2);
})

document.getElementById("yieldButtonPlayer1").addEventListener("click", () => {
    addMessageLog(player1.name + " yields!");
    scrollToBottom("logPlayers");
    restartGame(player1, player2);
})

document.getElementById("yieldButtonPlayer2").addEventListener("click", () => {
    addMessageLog(player2.name + " yields!");
    scrollToBottom("logPlayers");
    restartGame(player2, player1)
})

//SUBMIT FORMS
function validateForm() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
            //if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            //}
            if (form.checkValidity() === true) {
                onSubmit();
            }
            form.classList.add('was-validated');
        }, false);
    });
}

