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

        fetch('https://pokeapi.co/api/v2/move-category/0/')
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

                    if (skillFromPool == newSkill) {

                        newSkill = data.moves[getRandomInt(0, 331)];
                        killSkillDuplicate(skillFromPool, newSkill);

                    } else {

                        return newSkill;

                    }

                }

                for(let i = 0; i < 40; i++) {
                    
                    let skill = data.moves[getRandomInt(0, 331)];

                    skillsPool.forEach(function(obj) {
                        
                        killSkillDuplicate(obj, skill);
                    
                    });

                    skillsPool.push(skill);

                }

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