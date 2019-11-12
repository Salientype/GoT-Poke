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

        fetch('https://pokeapi.co/api/v2/move-category/0/')

            .then(handleErrors)
            .then(response => response.json())
            .then(data => {

                // console.log(data.moves);

                skillsPool = data.moves;

                skillsPool.forEach(function (skill) {

                    fetch(skill.url)

                        .then(handleErrors)
                        .then(response => response.json())
                        .then(data => {

                            if (data.accuracy != null &&
                                data.accuracy != 100 &&
                                data.power != null &&
                                data.pp != null &&
                                data.type.name == 'normal' &&
                                data.target.name == 'selected-pokemon'
                                ) {

                                selectedSkillsPool.push({name: data.names[2].name, accuracy: data.accuracy, power: data.power, pp: data.pp});

                            }

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