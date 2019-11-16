class Player {

    constructor(name, title, gender) {

        this.hp = 1000;
        this.mp = 1000;
        this.name = name;
        this.title = title;
        this.gender = gender;
        this.skills;

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

    async fetchData(url, callback) {

        const getRandomInt = this.getRandomInt;
        const handleErrors = this.handleErrors;
        let skillsArray = [];
        let playerSkills = [];

        function killSkillDuplicate(skillFromPool, newSkill) {

            if (skillFromPool == newSkill) {

                console.log("found duplicate");
                newSkill = skillsArray[getRandomInt(0, skillsArray.length)];
                killSkillDuplicate(skillFromPool, newSkill);

            } else {

                return newSkill;

            }

        }

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

                                skillsArray.push({ name: data.names[2].name, accuracy: data.accuracy, power: data.power, pp: data.pp });

                            }

                        });

                });

                setTimeout(function () {

                    //console.log(skillsArray);

                    for (let i = 0; i < 4; i++) {

                        let selectedSkill = skillsArray[getRandomInt(0, skillsArray.length)];

                        if (playerSkills.length != 0) {

                            playerSkills.forEach(function (skill) {

                                killSkillDuplicate(skill, selectedSkill);

                            })

                            playerSkills.push(selectedSkill);

                        } else {

                            playerSkills.push(selectedSkill);

                        }

                    }

                    callback(playerSkills);

                }, 4000);

            });

    }

    skill1 = (array) => {

        return array;

    }

    skill2 = (arrayOfSkills) => {

        return arrayOfSkills;

    }

    skill3 = (arrayOfSkills) => {

        return arrayOfSkills;

    }

    skill4 = (arrayOfSkills) => {

        return arrayOfSkills;

    }

}