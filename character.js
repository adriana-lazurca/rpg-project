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

    this.hit = function (enemy) {
        var damagePoints = generateRandomNr(this.min, this.maxDamage);
        var isAttackDeflected = Math.random() < 0.3;
        
        if (this.race == "Vampires") {
            this.currentHealth = this.currentHealth + (enemy.currentHealth * 0.1);
            enemy.currentHealth = enemy.currentHealth - (enemy.currentHealth * 0.1);
        }

        //function hit needs to be called twice
        if (this.item == "Bow") {
            // Bow - 30% chance to attack twice
            var attacksTwice = Math.random() < 0.3;
            if (attacksTwice){
                
            }
        }

        if (enemy.race == "Elves" && isAttackDeflected) {
            this.currentHealth = this.currentHealth - damagePoints / 2;
        }
        else if (enemy.race == "Humans") {
            damagePoints = damagePoints - (damagePoints * 0.2); // 0.8 * damage
            enemy.currentHealth = enemy.currentHealth - damagePoints;
        }
        else {
            enemy.currentHealth = enemy.currentHealth - damagePoints;
        }

        switch (enemy.item) {

            case "Boots":
                //Boots - 30% chance to dodge an attack
                if (isAttackDeflected) { this.currentHealth = this.currentHealth };
                break;

            case "Sword":
                //Sword - 30% more damage
                this.currentHealth = this.currentHealth - (damagePoints * 0.3);
                break;

            default:
                break;
        }
    };

    this.heal = function (enemy) {
        var healingPoints = generateRandomNr(this.min, this.maxHealing);

        //Staff - 20% increase in healing
        if (enemy.item == "Staff") {
            this.currentHealth = this.currentHealth + (healingPoints * 0.2);
        }
        else {
            this.currentHealth = this.currentHealth + healingPoints;
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
    fighter.innerText = player.name.toUpperCase();
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

    var weaponElements = document.getElementsByClassName("fas fa-khanda");
    weaponElements[0].innerText = player1.item;
    weaponElements[1].innerText = player2.item;

}

//LOG MESSAGE BAR
//var logPlayer1 = player1.displayChar();
//logElement.innerText = logPlayer1;

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

document.getElementById("hitButtonPlayer1").addEventListener("click", () => {
    addMessageLog(player1.name + " hits the enemy!");
    scrollToBottom("logPlayers");
    player1.hit(player2);
})

document.getElementById("hitButtonPlayer2").addEventListener("click", () => {
    addMessageLog(player2.name + " hits the enemy!");
    scrollToBottom("logPlayers");
    player2.hit(player1);
})

document.getElementById("healButtonPlayer1").addEventListener("click", () => {
    addMessageLog(player1.name + " heals himself!");
    scrollToBottom("logPlayers");
    player1.heal(player2);
})

document.getElementById("healButtonPlayer2").addEventListener("click", () => {
    addMessageLog(player2.name + " heals himself!");
    scrollToBottom("logPlayers");
    player2.heal(player1);
})

document.getElementById("yieldButtonPlayer1").addEventListener("click", () => {
    addMessageLog(player1.name + " yields!");
    scrollToBottom("logPlayers");
    alert(player2.name + " wins the game!!!")
})

document.getElementById("yieldButtonPlayer2").addEventListener("click", () => {
    addMessageLog(player2.name + " yields!");
    scrollToBottom("logPlayers");
    alert(player1.name + " wins the game!!!")
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

