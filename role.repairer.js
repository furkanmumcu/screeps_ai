var roleBuilder = require('role.builder');

var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
            });

            // if we find one
            if (structure != undefined) {
                console.log(structure.hits)
                console.log(structure.hits<2000)
                if(structure.structureType == STRUCTURE_ROAD && structure.hits < 2000){
                    console.log('girdim');
                    if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.moveTo(structure,{visualizePathStyle: {stroke: '#FE2EC8'}});
                    }
                    //console.log(structure.hits);
                }
                // try to repair it, if it is out of range
                else if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    console.log('girdim 2');
                    creep.moveTo(structure);
                }
            }
            else{
                //TODO: make the creep upgrader
                //roleHarvester.run(creep);
                roleBuilder.run(creep);
            }
        }
        else { // harvest energy
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleRepairer;