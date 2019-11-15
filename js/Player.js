class Player {

    constructor(name, title, gender) {

        this.hp = 1000;
        this.mp = 1000;
        this.name = name;
        this.title = title;
        this.gender = gender;

    }

    static getRandomInt(min, max) {

        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;

    }

    static handleErrors(response) {

        if (!response.ok) {

            console.log('The raven from Westeros never came...');
            throw Error(response.statusText);

        }

        return response;

    }


    static killSkillDuplicate(skillFromPool, newSkill) {

        if (skillFromPool == newSkill) {

            newSkill = getSkill();
            return killSkillDuplicate(skillFromPool, newSkill);

        } else {

            return newSkill;

        }

    }
    
    async fetchData(url, callback) {

        const handleErrors = this.handleErrors;
        const getRandomInt = this.getRandomInt;
        let skillsArray = [];

        await fetch(url)  // return fetch here
            .then(handleErrors)
            .then(response => response.json())
            .then(response => response.moves)
            .then(listOfMoves => { 
                
                    listOfMoves.forEach( async function(move) {
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

                    setTimeout ( function() { 
                        
                        console.log(skillsArray); 
                
                    }, 4000);

            });

    }

    getSkillsPool = () => {

        let skillsPool = [];
        let tempArray = [];
        const getRandomInt = this.getRandomInt;
        const handleErrors = this.handleErrors;

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

                console.log(skillsPool);

                skillsPool.forEach(function (skill, index) {

                    tempArray.push(index[skill]);

                });

            });

        return skillsPool;
    }

    getFinalSkills = () => {

        const skillsPool = [];
        const skillsArray = [];
        const handleErrors = this.handleErrors;

        // console.log(skillsPool);

        skillsPool.forEach(function (skill) {

            fetch(skill.url)

                .then(handleErrors(response))
                .then(response => response.json())
                .then(data => {

                    if (data.accuracy != null &&
                        data.accuracy != 100 &&
                        data.power != null &&
                        data.pp != null &&
                        data.target.name == 'selected-pokemon') {

                        skillsArray.push({ name: data.names[2].name, accuracy: data.accuracy, power: data.power, pp: data.pp });

                    } else {

                        skillsArray.push({ name: data.names[2].name, accuracy: data.accuracy, power: data.power, pp: data.pp });

                    }

                });

        });

        return skillsArray;

    };



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