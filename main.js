var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
require('prototype.spawn');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');

    var harvesterCount = 5;
    var upgraderCount = 5;
    var builderCount = 5;
    var repairerCount = 2;

    //console.log('Current Harvester count: ' + harvesters.length + ' required harvesters: ' + harvesterCount);
    //console.log(harvesterCount==harvesters.length);

    if(harvesters.length < harvesterCount) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'harvester'}});
    }

    if(upgraders.length < upgraderCount && harvesters.length == harvesterCount) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new creep: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'upgrader'}});
    }

    if(repairers.length < repairerCount && harvesters.length == harvesterCount && upgraders.length == upgraderCount) {
        //console.log('hihihi')
        var newName = 'Repairer' + Game.time;
        console.log('Spawning new creep: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'repairer'}});
    }

    if(builders.length < builderCount && harvesters.length == harvesterCount && upgraders.length == upgraderCount) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new creep: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'builder'}});
    }
    */

    Game.spawns['Spawn1'].spawnAI();

    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var tower = Game.getObjectById('TOWER_ID');
        if(tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < (structure.hitsMax)/2
            });
            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }

            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            }
        }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
            //roleBuilder.run(creep);
        }
    }
}