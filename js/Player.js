class Player {

    constructor(name, title, gender) {

        this.hp = 1000;
        this.mp = 1000;
        this.name = name;
        this.title = title;
        this.gender = gender;

    }


    handleErrors(response) {

        if (!response.ok) {
            console.log('The raven from Westeros never came...');
            throw Error(response.statusText);
        }

        return response;

    }

    getSkillsPool = () => {

        fetch('https://pokeapi.co/api/v2/move-damage-class/2/')
            .then(this.handleErrors)
            .then(response => response.json())
            .then(data => { 
                
                let skillsPool = [];

                function getRandomInt(min, max) {
        
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.floor(Math.random() * (max - min + 1)) + min;
            
                }
                
                function killSkillDuplicate(skillFromPool, newSkill) {

                    if (skillFromPool.url == newSkill.url) {

                        newSkill = data.moves[getRandomInt(0, 293)];
                        killSkillDuplicate(skillFromPool, newSkill);

                    } else {

                        return newSkill;

                    }

                }

                for(let i = 0; i < 28; i++) {
                    
                    let newSkill = data.moves[getRandomInt(0, 293)];

                    skillsPool.forEach(function(skill) {
                        
                        killSkillDuplicate(skill, newSkill);
                    
                    });

                    skillsPool.push(newSkill);

                }

                skillsPool.forEach(function(skill) {

                    fetch(skill.url)
                        .then(globalThis.handleErrors)
                        .then(response => response.json())
                        .then(data => console.log(data.names[2].name));

                });

                console.log(skillsPool);
        
            });

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