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
                let tempArray = [];

                const skillsPoolTable = document.createElement('table');
                const skillsPoolTableSetup = `
                <thead>
                    <tr>
                        <th scope="col">Skill Name</th>
                        <th scope="col">Power</th>
                        <th scope="col">Mana</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                    
                    </tr>
                    <tr>
                        <th scope="row">2</th>

                    </tr>
                    <tr>
                        <th scope="row">3</th>
                    
                    </tr>
                </tbody>
                `
                skillsPoolTable.innerHTML = skillsPoolTableSetup;

                function getRandomInt(min, max) {

                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.floor(Math.random() * (max - min + 1)) + min;

                }

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

                console.log(skillsPool);

                skillsPool.forEach(function (skill) {

                    fetch(skill.url)
                        .then(globalThis.handleErrors)
                        .then(response => response.json())
                        .then(data => {

                            tempArray.push(data);

                        });

                });

                skillsPool = tempArray;

                skillsPool.forEach(function (skill) {

                    skillsPoolTable.appendChild

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