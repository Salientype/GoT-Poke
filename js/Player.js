class Player {

    constructor() {

        this.hp = 1000;
        this.mp = 1000;
        this.name;
        this.skill_1;
        this.skill_2;
        this.skill_3;
        this.skill_4;

    }

    getRandomInt(min, max) {

        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;

    }

    handleErrors(response) {

        if (!response.ok) {

            console.log('The raven from Westeros never came...');
            throw Error(response.statusText);

        }

        return response;

    }

    attack(skill, userPlayer, enemyPlayer) {
        
        function getEnemyHpBar (player) {
            
            if (player == playerHuman) {

                return document.getElementById('machine-health-bar');
            
            } else {

                return document.getElementById('human-health-bar');
            
            }

        }

        function getUserMpBar (player) {
            
            if (player == playerHuman) {

                return document.getElementById('human-mana-bar');
            
            } else {

                return document.getElementById('machine-mana-bar');
            
            } 

        }

        function getDescContainer(player) {

            if (player == playerHuman) {

                return document.getElementById('human-skill-desc');

            } else {

                return document.getElementById('machine-skill-desc')

            }

        }
        
        function get_desc() {
            
            return skill.desc.replace(/the( |\n)user/ig, userPlayer.name).replace(/the( |\n)target/ig, enemyPlayer.name).replace(/its( |\n)target/ig, enemyPlayer.name).replace(/\n/ig, " ");

        }

        function filterInt(value) {
            
            let num = value.slice(7, -1);
            return Number(num);
        
        }

        function checkForWin(value) {

            if(value < 0) {
    


            }
    
        }

        const skill_desc = get_desc();
        const descContainer = getDescContainer(userPlayer);
        const enemyHpBar = getEnemyHpBar(userPlayer);
        const userMpBar = getUserMpBar(userPlayer);
        const damage = Math.ceil(skill.power * .2);
        const mana = Math.ceil(skill.pp * 2);

        const currentEnemyHpBar = filterInt(enemyHpBar.getAttribute("style"));
        const currentuserMpBar = filterInt(userMpBar.getAttribute("style"));

        if (this.getRandomInt(1, 100) > skill.accuracy) {

            console.log(`${userPlayer.name}'s attack missed`);
            descContainer.firstElementChild.innerText = `${userPlayer.name}'s attack missed`;

        } else {

            console.log(currentEnemyHpBar - damage);
            console.log(skill_desc);
            userMpBar.setAttribute("style", `width: ${currentEnemyHpBar - damage}%`)
            enemyHpBar.setAttribute("style", `width: ${currentuserMpBar - mana}%`)
            descContainer.firstElementChild.innerText = skill_desc;

        }

    }

    async fetchData(url, callback) {

        let getRandomInt = this.getRandomInt;
        const handleErrors = this.handleErrors;
        let skillsArray = [];
        let playerSkills = [];

        await fetch(url)
            .then(handleErrors)
            .then(response => response.json())
            .then(response => response.moves)
            .then(listOfMoves => {

                listOfMoves.forEach(async function (move) {
                    await fetch(move.url)
                        .then(handleErrors)
                        .then(response => response.json())
                        .then(data => {

                            if (data.accuracy != null &&
                                data.accuracy != 100 &&
                                data.power != null &&
                                data.pp != null &&
                                data.target.name == 'selected-pokemon') {

                                skillsArray.push({ name: data.names[2].name, accuracy: data.accuracy, power: data.power, pp: data.pp, desc: data.flavor_text_entries[2].flavor_text });

                            }

                        });

                });

                setTimeout(function () {

                    function getNewSkill() {

                        return skillsArray[getRandomInt(0, skillsArray.length - 1)];

                    }

                    function killSkillDuplicate(skillFromPool, newSkill) {

                        if (skillFromPool != newSkill) {

                            return newSkill;

                        } else {
                            
                            console.log("found duplicate");
                            newSkill = getNewSkill();
                            return killSkillDuplicate(skillFromPool, newSkill);

                        }

                    }

                    for (let i = 0; i < 4; i++) {

                        let selectedSkill = skillsArray[getRandomInt(0, skillsArray.length)];

                        if (playerSkills.length != 0) {

                            playerSkills.forEach(function (skill) {

                                selectedSkill = killSkillDuplicate(skill, selectedSkill);

                            });

                            playerSkills.push(selectedSkill);

                        } else {

                            playerSkills.push(selectedSkill);

                        }

                    }

                    callback(playerSkills);

                }, 4000);

            });

    }

}