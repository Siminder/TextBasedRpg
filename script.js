let xp = 0;
let health = 100;
let gold = 50;
let mana = 100;
let kills = 0;
let currentWeapon = 0;
let currentSpell = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
let questCompleted = false;

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const button5 = document.querySelector("#button5");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const manaText = document.querySelector("#manaText");
const killsText = document.querySelector("#killText")

const spells = [
   {
    name: "Fireball",
    cost: 200,
    power: 10 
   },
   {
    name: "Moon Wave",
    cost: 10,
    power: 15 
   },
   {
    name: "Magic missles",
    cost: 20,
    power: 30
   }

]
const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    },

];

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15

    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "Dracula",
        level: 20,
        health: 300

    }
]

const locations= [
    {
        name: "town square",
        "button text": ["Go to store", "Go to Castle", "Fight Dracule","Magic store","Adventure Guild"],
        "button function": [goStore, goCastle, fightDracule, magicStore, AdventureGuild],
        text1: "You are in the town square. You see a sign that says \"store\"."
    }, 
    {
        name: "Store",
        "button text": ["Heal for 10 health  (10 gold)","Buy weapon  (30 gold)","Go to town square", "go to the castle"],
        "button function": [buyHealth, buyWeapon, goTown, goCastle],
        text1: "you enter the store"
    },
    {
        name: "Castle",
        "button text": ["Fight slime", "Fight beast", "go town"],
        "button function": [fightSlime, fightBeast, goTown],
        text1: "You have enter the castle who do you decide to fight"
    },
    {
        name: "Magic Store",
        "button text": ["buy spell (50 gold)","go to castle","Go to town square"],
        "button function": [buySpell, goCastle, goTown]
    },
    {
        name: "Adventure guild",
        "button text": ["quest","claim quest","go to town",],
        "button function": [quest,claimQuest,goTown],
        text1: "welcome to the guild click quest to get a quest once your done the quest click claim quest to get ur reward"

    },
    {
        name: "Fight",
        "button text": ["Attack", "Dodge", "Run", "Spells"],
        "button function": [attack, dodge, goTown, useSpells],
        text1: "you are fighting a monster"
    },
    {
        name: "kill monster",
        "button text": ["go town","go town","go town"],
        "button function": [goTown, goTown, easterEgg],
        text1: 'The monster screem "Arg!" as it dies. You gain experience point and find gold'
    },
    {
        name: "Lose",
        "button text": ["replay","replay","replay",],
        "button function": [restart,restart,restart],
        text1: "You die"
    },
    {   
        name: "Win",
        "button text": ["replay","replay","replay",],
        "button function": [restart,restart,restart],
        text1: "You defeted dracula you won the game"
    },
    {   
        name: "Easter egg",
        "button text": ["2","8","go to town",],
        "button function": [pickTwo,pickEight,goTown],
        text1: "you find a secert game pick a number"
    },
    
];

// intialize buttons 

button1.onclick = goStore;
button2.onclick = goCastle;
button3.onclick = fightDracule;
button4.onclick = magicStore;
button5.onclick = AdventureGuild;

function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button4.innerText = location["button text"][3];
    button5.innerText = location["button text"][4];
    button1.onclick = location["button function"][0];
    button2.onclick = location["button function"][1];
    button3.onclick = location["button function"][2];
    button4.onclick = location["button function"][3];
    button5.onclick = location["button function"][4];
    text1.innerText = location.text1
}

function goTown(){
    update(locations[0]);
}


function goStore() {
    update(locations[1]);
}



function goCastle() {
    update(locations[2]);
}

function magicStore() {
    update(locations[3]);
}
function AdventureGuild() {
    update(locations[4])
}
function quest() {
text1.innerText = "Kill 5 monster and you will get your reward"
}
function claimQuest() {
    if (kills >= 1 && !questCompleted) {
      text1.innerText = "Congrats on completing the quest, here is your reward of 40 gold";
      gold += 40;
      goldText.innerText = gold;
      questCompleted = true;
    } else if (questCompleted) {
        text1.innerText = "You have already compeleted your quest"
    }
  }




function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        text1.innerText = "You do not have enough gold to buy health";
    }
}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold - 30;
            currentWeapon ++;
            let newWeapon = weapons[currentWeapon].name;
            text1.innerText = "You now have a " + newWeapon +  ".";
            inventory.push(weapons[currentWeapon]);
            text1.innerText = "in your inverntory you have: " + inventory;
        } else  {
            text1.innerText = "you dont have enough gold";
        } 
    } else 
{
        text1.innerText = "You already have the most powerful weapon";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
};

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text1.innerText = "you sold a " + currentWeapon + ","
        text1.innerText = "in your inventory you have " + inventory;

    } else {
        text1.innerText = "Dont sell your only weapon!";
    }
};

function buySpell() {
    if (currentSpell < spells.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            goldText.innerText = gold;
            currentSpell ++;
            let newSpell = spells[currentSpell].name;
            inventory.push(spells[currentSpell]);
            text1.innerText = "You now have a " + newSpell + ". In your inventory, you have: " + inventory;
        } else {
            text1.innerText = "You don't have enough gold.";
        }
    } else {
        text1.innerText = "You already have the most powerful spell.";
    }
}  



function fightSlime() {
    fighting = 0;
    goFight();
};

function fightBeast() {
    fighting = 1;
    goFight();
};

function fightDracule() {
    fighting = 2;
    goFight();
};

function goFight() {
    update(locations[5]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
	monsterHealthText.innerText = monsterHealth;
};

function attack() {
    text1.innerText = "The " + monsters[fighting].name + " attacks.";
    text1.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    
    if (isMonsterHit()) {
        health -= getMonsterAttackValue(monsters[fighting].level);
    } else {
		text1.innerText += " You miss.";
	}
    
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
	healthText.innerText = health;
	monsterHealthText.innerText = monsterHealth;   
	if (health <= 0) {
		lose();
	} else if (monsterHealth <= 0) {
		fighting === 2 ? winGame() : defeatMonster();
	}

	if (Math.random() <= .1 && inventory.length !== 1) {
        text1.innerText += " Your " + inventory.pop() + " breaks.";
        currentWeapon--;
	}
}
function dodge() {
    text1.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

function useSpells(mana) {
    const spellCost = spells[currentSpell].cost;
    if (mana >= spellCost) {
    text1.innerText = "The " + monsters[fighting].name + " attacks.";
    text1.innerText += " You attack it with your " + spells[currentSpell].name + ".";
    mana -= spellCost;
    manaText.innerText = mana;
    } else(mana < spellCost) 
    {
        text1.innerText += "You dont have enough mana";
    }
    
    if (isMonsterHit()) {
        health -= getMonsterAttackValue(monsters[fighting].level);
    } else {
		text1.innerText += " You miss.";
	}

    monsterHealth -= spells[currentSpell].power + Math.floor(Math.random() * xp) + 1;
	healthText.innerText = health;
	monsterHealthText.innerText = monsterHealth;   
	if (health <= 0) {
		lose();
	} else if (monsterHealth <= 0) {
		fighting === 2 ? winGame() : defeatMonster();
	}
}

function getMonsterAttackValue(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit;

}

function isMonsterHit() {
    return Math.random() > .2 || health < 20;
}


function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    kills++;
    goldText.innerText = gold;
    xpText.innerText = xp;
    killsText.innerText = kills;
    update(locations[6]);
}
function lose() {
   update(locations[7]);
}

function winGame() {
    update(locations[8]);
}

function restart() {
    xp = 0
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}
function easterEgg() {
    update(locations[9]);
}

function pickTwo() {
    pick(2);
}

function pickEight() {
    pick(8);
}

function pick(guess) {
    let numbers = [];
    while(numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }

    text1.innerText = "You picked " + guess + ". here are the random numbers: \n";

    for (let i = 0; i < 10; i++) {
        text1.innerText += numbers[i] + "\n";
    }

    if(numbers.indexOf(guess) !== -1) {
        text1.innerText += "Right! you win 20 gold";
        gold += 20;
        goldText.innerText = gold;
    } else {
        text1.innerText += "Your wrong you loss 20 health";
        health -= 20;
        healthText.innerText = health;
        if (health <= 0) {
            lose();
        }
    }
}


var animatedGif = document.getElementById('animated-gif');

animatedGif.onmouseover = function() {
  animatedGif.style.animation = 'play 1s steps(10) infinite';
  setTimeout(function() {
    animatedGif.style.visibility = 'hidden';
  }, 1000); // Change this value to delay the disappearance time
};

animatedGif.onmouseout = function() {
  animatedGif.style.animation = 'none';
  animatedGif.style.visibility = 'visible';
};