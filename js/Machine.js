class Machine extends Player {

    constructor() {

        super();

    }

    machineAttack() {

        super.attack(this.skill_1, playerMachine, playerHuman);
        
    }

}