var roleBuilder = require('role.builder');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.processing && creep.carry.energy == 0) {
            creep.memory.processing = false;
        }
        if(!creep.memory.processing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.processing = true;
        }


        //find source and harvest
        if(!creep.memory.processing) {
            //console.log('burdayim');
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else { // transfer  energy to the structures
            var targets = creep.room.find(FIND_STRUCTURES, { // check for energy needed structers
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length > 0) { // if there are energy needed structers transfer energy to first one
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{ // no energy needed structers
                roleBuilder.run(creep);

            }
        }
    }
};

module.exports = roleHarvester;