StructureSpawn.prototype.spawnAI =
    function () {

        function CustomCreep(name,priority){
            this.name = name;
            this.priority = priority;
        }

        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');

        let harvesterCount = 5;
        let upgraderCount = 5;
        let builderCount = 5;
        let repairerCount = 1;

        let line = [];

        if(harvesters.length < harvesterCount) {
            let c1 = new CustomCreep('harvester', 1);
            line.push(c1);
        }

        if(upgraders.length < upgraderCount ) {
            let c2 = new CustomCreep('upgrader', 2);
            line.push(c2);        }

        if(repairers.length < repairerCount ) {
            let c3 = new CustomCreep('repairer', 3);
            line.push(c3);        }

        if(builders.length < builderCount ) {
            let c4 = new CustomCreep('builder', 4);
            line.push(c4);
        }

        let currentCustomCreep = line[0];
        if(line.length > 0){
            for(let i = 0; i <line.length-1; i++){
                if(line[i+1].priority < line[i].priority){
                    currentCustomCreep = line[i+1];
                }
            }
        }

        if(currentCustomCreep != undefined) {
            var newName = currentCustomCreep.name + Game.time;
            //console.log('Spawning new creep: ' + newName);
            return this.createCreep([WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], newName,
                {role: currentCustomCreep.name});
        }
    };
