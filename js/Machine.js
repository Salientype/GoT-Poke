class Machine extends Player {

    constructor() {

        super();

    }

    machineAttack() {

        const skill_set = [this.skill_1, this.skill_2, this.skill_3, this.skill_4];
        let skill = skill_set[this.getRandomInt(1, 4)];
        console.log(skill);
        super.attack(skill, playerMachine, playerHuman);
        
    }

}