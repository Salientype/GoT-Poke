class Player {

    constructor(name, title, gender) {

        this.hp = 1000;
        this.mp = 1000;
        this.name = name;
        this.title = title;
        this.gender = gender;
        this.skillsPool = this.getSkillsPool();

    }

    getRandomInt(min, max) {

        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;

    }

    getSkillsPool = () => {

        let skillsPool = [];
        let selectedSkillsPool = [];
        const getRandomInt = this.getRandomInt;

        function handleErrors(response) {

            if (!response.ok) {

                console.log('The raven from Westeros never came...');
                throw Error(response.statusText);

            }

            return response;

        }

        fetch('https://pokeapi.co/api/v2/move-category/0/')

            .then(handleErrors)
            .then(response => response.json())
            .then(data => {

                function getSkill() {

                    return data.moves[getRandomInt(0, (data.moves.length - 1))];

                }

                function killSkillDuplicate(skillFromPool, newSkill) {

                    if (skillFromPool == newSkill) {

                        newSkill = getSkill();
                        return killSkillDuplicate(skillFromPool, newSkill);

                    } else {

                        return newSkill;

                    }

                }

                for (let i = 0; i < 100; i++) {

                    let newSkill = getSkill();

                    if (skillsPool.length != 0) {

                        skillsPool.forEach(function (skill) {

                            newSkill = killSkillDuplicate(skill, newSkill);

                        })

                        skillsPool.push(newSkill);

                    } else {

                        skillsPool.push(newSkill);

                    }

                }

                skillsPool.forEach(function (skill) {

                    fetch(skill.url)

                        .then(handleErrors)
                        .then(response => response.json())
                        .then(data => {

                            if (data.accuracy != null &&
                                data.accuracy != 100 &&
                                data.power != null &&
                                data.pp != null &&
                                data.target.name == 'selected-pokemon'
                            ) {

                                selectedSkillsPool.push({ name: data.names[2].name, accuracy: data.accuracy, power: data.power, pp: data.pp });

                            }

                        });

                });

            });

        return selectedSkillsPool;

    }

    skill1 = () => {

        // const getRandomInt = this.getRandomInt;
        let skills = this.getSkillsPool();
        
        // const randomSkill = this.getRandomInt(0, arrayOfSkills.length);
        // const skill = [randomSkill]arrayOfSkills;

        return skgetSkillsPool().length;

    }

    skill2 = (arrayOfSkills) => {

        return skill;

    }

    skill3 = (arrayOfSkills) => {

        return skill;

    }

    skill4 = (arrayOfSkills) => {

        return skill;

    }

}