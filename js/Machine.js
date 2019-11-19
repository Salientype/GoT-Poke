class Machine extends Player {

    constructor() {

        super();

    }

    machineAttack() {

        const skill_set = [this.skill_1, this.skill_2, this.skill_3, this.skill_4];
        let randomSkill = skill_set[this.getRandomInt(1, 4)];
        console.log(randomSkill);
        super.attack(randomSkill, playerMachine, playerHuman);
        
    }

}