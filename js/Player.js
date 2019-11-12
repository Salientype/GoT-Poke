class Player {

    constructor(name, title, gender) {

        this.hp = 1000;
        this.mp = 1000;
        this.name = name;
        this.title = title;
        this.gender = gender;
        this.skillsPool = this.getSkillsPool();

    }

    getSkillsPool = () => {

        let skillsPool = [];
        let selectedSkillsPool = [];

        function handleErrors(response) {

            if (!response.ok) {
                console.log('The raven from Westeros never came...');
                throw Error(response.statusText);
            }

            return response;

        }

        function getRandomInt(min, max) {

            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;

        }

        fetch('https://pokeapi.co/api/v2/move-category/0/')

            .then(handleErrors)
            .then(response => response.json())
            .then(data => {

                function killSkillDuplicate(skillFromPool, newSkill) {

                    if (skillFromPool != newSkill) {

                        return newSkill;

                    } else {

                        newSkill = data.moves[getRandomInt(0, 330)];
                        return newSkill;

                    }

                }

                for (let i = 0; i < 28; i++) {

                    let newSkill = data.moves[getRandomInt(0, 330)];

                    if (skillsPool.length != 0) {

                        skillsPool.forEach(function (skill) {

                            newSkill = killSkillDuplicate(skill, newSkill);

                        });

                    }

                    skillsPool.push(newSkill);

                }

                // console.log(skillsPool);

                skillsPool.forEach(function (skill) {

                    fetch(skill.url)

                        .then(handleErrors)
                        .then(response => response.json())
                        .then(data => {

                            selectedSkillsPool.push(data);

                        });

                });

            });

        return selectedSkillsPool;

    }

    skill1 = (skill) => {

        return skill;

    }

    skill2 = (skill) => {

    }

    skill3 = (skill) => {

    }

    skill4 = (skill) => {

    }

}