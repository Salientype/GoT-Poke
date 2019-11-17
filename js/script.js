const playerHuman = new Player();
const playerMachine = new Player();

function addPlayerSkills(player, playerSkills, skillsContainer) {

    player.skill_1 = playerSkills[0];
    player.skill_2 = playerSkills[1];
    player.skill_3 = playerSkills[2];
    player.skill_4 = playerSkills[3];

    let userPlayer = "";
    let enemyPlayer = "";

    if (player == playerHuman) {

        userPlayer = "playerHuman";
        enemyPlayer = "playerMachine";

    } else {

        userPlayer = "playerMachine";
        enemyPlayer = "playerHuman";

    }

    skillsContainer.innerHTML = `
    <button type="button" class="btn btn-outline-primary btn-md" onclick="${userPlayer}.attack(${userPlayer}.skill_1, ${enemyPlayer})">${player.skill_1.name}</br>${player.skill_1.power}/${player.skill_1.pp}/${player.skill_1.accuracy}</button>
    <button type="button" class="btn btn-outline-primary btn-md" onclick="${userPlayer}.attack(${userPlayer}.skill_2, ${enemyPlayer})">${player.skill_2.name}</br>${player.skill_2.power}/${player.skill_2.pp}/${player.skill_2.accuracy}</button>
    <button type="button" class="btn btn-outline-primary btn-md" onclick="${userPlayer}.attack(${userPlayer}.skill_3, ${enemyPlayer})">${player.skill_3.name}</br>${player.skill_3.power}/${player.skill_3.pp}/${player.skill_3.accuracy}</button>
    <button type="button" class="btn btn-outline-primary btn-md" onclick="${userPlayer}.attack(${userPlayer}.skill_4, ${enemyPlayer})">${player.skill_4.name}</br>${player.skill_4.power}/${player.skill_4.pp}/${player.skill_4.accuracy}</button>
    <button type="button" class="btn btn-outline-primary btn-md">RUN</button>
    `

}

function getPlayerSkills() {

    playerHuman.fetchData('https://pokeapi.co/api/v2/move-category/0/', function (playerSkills) {

        console.log(playerHuman.name);
        let skillsContainer = document.getElementById('human-player-skills');
        addPlayerSkills(playerHuman, playerSkills, skillsContainer);

    });

    playerMachine.fetchData('https://pokeapi.co/api/v2/move-category/0/', function (playerSkills) {

        console.log(playerMachine.name);
        let skillsContainer = document.getElementById('machine-player-skills');
        addPlayerSkills(playerMachine, playerSkills, skillsContainer);

    });

}


//setTimeout(function(){ console.log(playerHuman.skill_1); }, 5000);





