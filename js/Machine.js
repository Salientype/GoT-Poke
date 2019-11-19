class Machine extends Player {

    constructor() {

        super();

    }

    machineAttack(skillNum) {

        const skill_set = [this.skill_1, this.skill_2, this.skill_3, this.skill_4];
        let skill = skill_set[skillNum];
        console.log(skill);
        super.attack(skill, playerMachine, playerHuman);
        
    }

}