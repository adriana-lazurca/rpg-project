//Use this script to generate your character
function Person(name, race, item) {
    this.name = name;
    this.race = race;
    this.item = item;
    this.currenthealth = 100;
    this.maxHealth = 100;

    this.min = 3;
    this.maxDamage = 20;
    this.maxHealing = 30;

    this.heal = function () { };

    this.damage = function () { };

    this.totalDamage = this.damage();

    this.displayChar = function () {
        return `I am a ${this.race}, I wield a ${this.item}, my total health point are ${this.maxHealth}`;
    };
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

var player;
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

function scrollToBottom (id) {
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
    scrollToBottom ("logPlayers");
})

document.getElementById("hitButtonPlayer2").addEventListener("click", () => {
    addMessageLog(player2.name + " hits the enemy!");
    scrollToBottom ("logPlayers");
})

document.getElementById("healButtonPlayer1").addEventListener("click", () => {
    addMessageLog(player1.name + " heals himself!");
    scrollToBottom ("logPlayers");
})

document.getElementById("healButtonPlayer2").addEventListener("click", () => {
    addMessageLog(player2.name + " heals himself!");
    scrollToBottom ("logPlayers");
})

document.getElementById("yieldButtonPlayer1").addEventListener("click", () => {
    addMessageLog(player1.name + " yields!");
    scrollToBottom ("logPlayers");
})

document.getElementById("yieldButtonPlayer2").addEventListener("click", () => {
    addMessageLog(player2.name + " yields!");
    scrollToBottom ("logPlayers");
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

