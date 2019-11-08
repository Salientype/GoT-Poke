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
            console.log('The raven from Westoros never came...');
            throw Error(response.statusText);
        }
        
        return response;

    }

    getSkillsPool = () => {

        fetch('https://pokeapi.co/api/v2/move-category/0/')

            .then(this.handleErrors)
            .then(response => response.json())
            .then(data => console.log(data));

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