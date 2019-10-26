const ask = require('readline-sync')
let isAlive = true;
let hasWon = false;

let walked = 0
let looked = 0
const inventory = []
const weapons = ["bat", "machete", "shotgun"]
const healthInventory = []
const healthItems = ["twinkie", "soda", "SPAM", "beans", "first aid kit"]
const shelterArr = []
const shelters = ["empty house", "forgotten farmhouse", "derelict apartment", "forsaken church", "deserted trailer house", "abandoned cabin"]

let zomHealth1 = 35
let zomHealth2 = 41
let zomHealth3 = 48
let canHealth1 = 65
let canHealth2 = 50
let twoRaidHealth = 100
let fiveRaidHealth = 500

let stalkerHealth = 250
let armoredHealth = 320
let massiveHealth = 400

function Enemy (name, hp, ap) {
    this.name = name;
    this.hp = hp;
    this.ap = ap;
}

const crawler = new Enemy('Zombie Crawler', zomHealth1, 1)
const walker = new Enemy('Zombie Walker', zomHealth2, 2)
const runner = new Enemy('Zombie Runner', zomHealth3, 3)
const zombies = [crawler, walker, runner]

const stalker = new Enemy('Stalker Zombie', stalkerHealth, 19)
const armored = new Enemy('Armored Zombie', armoredHealth, 15)
const massive = new Enemy('Massive Zombie', massiveHealth, 17)
const eliteZombies = [stalker, armored, massive]

const sCannibal = new Enemy('Starving Cannibal', canHealth1, 3)
const eCannibal = new Enemy('Enraged Cannibal', canHealth2, 5)
const cannibals = [sCannibal, eCannibal]

const twoRaiders = new Enemy('Two Raiders', twoRaidHealth, 8)
const fiveRaiders = new Enemy('Five Raiders', fiveRaidHealth, 20)
const raiders = [twoRaiders, fiveRaiders]

const necromancer = new Enemy('Necromancer', 1000, 30)

function Hero (name, hp, ap) {
    this.name = name;
    this.hp = hp;
    this.ap = ap;
}

const hero = new Hero('player', 250, 4)

hero.name = ask.question('Welcome, new player. What is your name? ')
console.log(`${hero.name}, you wake up in a post apocalyptic wasteland. You have only the clothes on your back and a rusted knife on your belt. `)
console.log(`Zombies roam the streets hungry for brains and flesh, ready to infect what few survivors are left, but they aren't the only danger here. `)
console.log(`Humans who've resorted to cannibalism are looking for their next easy meal, and packs of raiders gang up on easy targets to steal supplies.`) 
console.log(`Move carefully, and you may find shelter to survive the night and be able to brave the wasteland again tomorrow.`)

while(isAlive && !hasWon) {
    let choice = ask.keyIn(`${hero.name}, would you like to [w] Walk, [s] Search the Area, [h] Use Health Item, [i] Check Inventory, [p] Check Player Status, [t] Read Tutorial, or [q] Leave the Game?`, {limit: 'wshiptq'})
    if(choice === 't') {
        rules()
    } else if(choice === 'w') {
        walk()
    } else if(choice === 's') {
        looked++
        // console.log(looked)
        lookAround()
    } else if(choice === 'i') {
       checkInv()
    } else if(choice === 'p') {
        status()
    } else if(choice === 'h') {
        useItem()
    } else if(choice === 'q') {
        console.log(`You quit the game.`)
        return
    } else {
        console.log('Not a valid input')
    }
}

function rules() {
    asking = true
    while(asking) {
        let choice = ask.keyIn(`${hero.name}, what part of the game would you like to hear about? [1] Survival, [2] Items, [3] Fighting, [4] Enemies, [5] Rumors, [6] Return to Gameplay `, {limit: '123456'})
        if(choice === '1') {
            console.log(`   **************************************************************************************************************************************`)
            console.log(`This is a text based RPG game. The goal is to survive a day in the zombie wasteland, and to do so you must find shelter for the night.`)
            console.log(`If you keep moving you are less likely to be attacked by enemies, but it is harder to find good shelter, and eventually your movement will draw more enemies to the area.`)
            console.log(`You can find weapons, food and shelter more easily by [s] searching the area, but you are exposed and have a much higher chance of being attacked.`)
            console.log(`   ***************************************************************************************************************************************`)

        } else if(choice === '2') {
            console.log(`   ***************************************************************************************************************************************`)
            console.log(`Weapons will increase your attack power and make it easier to [a] attack and kill any enemies you come across.`)
            console.log(`Health items can be used to restore and increase your health, they can only be found from searching the area or killing the raiders who hoard them.`)
            console.log(`Staying overnight in a shelter will add 50hp and will reduce the enemies in the area.`)
            console.log(`Checking your [i] inventory will inform you of what weapon you're currently weilding. You can only hold your default rusted knife and one found weapon.`)
            console.log(`   ***************************************************************************************************************************************`)

        } else if(choice === '3') {
            console.log(`   ***************************************************************************************************************************************`)
            console.log(`Enemies can attack when you are [w] walking or [s] searching. By [a] attacking them, you can kill them and potentially get items from them.`)
            console.log(`If you choose to run away, you may escape the fight without taking damage, but if you fail to get away the enemy will hit you harder than if you had attacked instead.`)
            console.log(`   ***************************************************************************************************************************************`)

        } else if(choice === '4') {
            console.log(`   ***************************************************************************************************************************************`)
            console.log(`Most zombies are mindless, rotting corpses which are not too difficult to kill. Cannibals are more difficult to kill and they hit harder, be wary of them.`)
            console.log(`Raiders are the most powerful enemy, but if you are willing to give them your health items, they will leave you unharmed. But beware, they may get angry if you don't offer any supplies.`)
            console.log(`Zombies do not drop any items. Cannibals only drop weapons. Raiders drop weapons and health items.`)
            console.log(`   ***************************************************************************************************************************************`)

        } else if(choice === '5') {
            console.log(`   ***************************************************************************************************************************************`)
            console.log(`There are whispers of a well-stocked, well-hidden bunker which one could stay in indefinitely and wait out the apocalypse.`)
            console.log(`A dark being lives in the deepest area of the wasteland. Some say it is the cause of the zombie uprising, and if it's the cause, then maybe it could be the cure.`)
            console.log(`Do you believe the rumors?`)
            console.log(`   ***************************************************************************************************************************************`)

        } else {
            asking = false
        }
    }
}

function status() {
    console.log(`   ******************************************************************`)
    console.log(`${hero.name}, your health is ${hero.hp}, and your attack power is ${hero.ap}.`)
    console.log(`You have travelled ${walked} miles through the zombie wasteland.`)
    // if (!Array.isArray(inventory) || !inventory.length) {
    //     console.log(`You have only the rusted knife you woke up with.`)
    // } else {
    //     console.log(`Your current weapon is: ${inventory}.`)
    // }
    // if (!Array.isArray(healthInventory) || !healthInventory.length) {
    //     console.log(`You have no health items.`)
    // } else {
    //     console.log(`Your backpack contains: ${healthInventory}`)
    // }
}

function walk() {
    walked++
    // console.log(walked)
    if(walked < 40) {
        let random0 = Math.floor(Math.random() * 6)
        if(random0 === 0) {
            enemyEncounter()
        } else {
            console.log('You walk safely through the area without being attacked.')
        }
    } else if(walked === 40) {
        console.log(`*************************************************************************************`)
        console.log(`**The noise from your fighting and movement has attracted more enemies to the area.**`)
        enemyEncounter()
    } else if(walked > 40 && walked < 70) {
        let random1 = Math.floor(Math.random() * 5)
        // console.log(random1)
        if(random1 === 0) {
            enemyEncounter()
        } else {
            console.log('You walk safely through the area without being attacked.')
        }
    } else if(walked === 70) {
        console.log(`*************************************************************************************`)
        console.log(`**The noise from your fighting and movement has attracted more enemies to the area.**`)
        enemyEncounter()
    } else if(walked > 70 && walked < 90) {
        let random2 = Math.floor(Math.random() * 4)
        if(random2 === 0) {
            enemyEncounter()
        } else {
            console.log('You walk safely through the area without being attacked.')
        }
    } else if(walked === 90) {
        console.log(`*************************************************************************************`)
        console.log(`**The noise from your fighting and movement has attracted more enemies to the area.**`)
        enemyEncounter()
    } else if(walked > 90 && walked < 100) {
        let random3 = Math.floor(Math.random() * 3)
        if(random3 === 0) {
            enemyEncounter()
        } else {
            console.log('You walk safely through the area without being attacked.')
        }
    } else if(walked === 100) {
        console.log(`*************************************************************************************`)
        console.log(`**The noise from your fighting and movement has attracted more enemies to the area.**`)
        enemyEncounter()
    } else if(walked > 100 && walked < 240) {
        let random3 = Math.floor(Math.random() * 2)
        if(random3 === 0) {
            enemyEncounter()
        } else {
            console.log('You walk safely through the area without being attacked.')
        }
    } else if(walked === 240) {
        console.log(`*****************************************************************************************************`)
        console.log(`**You have travelled deep into the wasteland and find yourself in a dark place where death abounds.**`)
        console.log(`**An army of elite zombies stand in front of you, and from here the only way forward is through, inside the hoard there is nowhere to run.**`)
        choice1 = ask.keyIn(`**[t] Turn Around, or [f] Face the Army of Zombies? **`, {limit: 'tf'})
        if(choice1 === 't'){
            walked = 0;
            looked = 0;
            return
        }else {
            zombieOnlyEncounter()
        }
    } else if(walked === 250) {
        console.log(`   ******************************************************************************************`)
        console.log(`**You have battled every step of the way through the army of zombies and now find yourself at the origin of them.**`)
        console.log(`**At the center is a necromancer, dressed in dark and tattered clothes. He turns his cold eyes onto you.**`)
        console.log(`**"You seek to challenge me, wanderer? Very well, then you will join my army too," the necromancer says and lifts his gnarled staff.**`)
        bossFight()
    } else {
        zombieOnlyEncounter()
    }
}

function zombieOnlyEncounter() {
    const currZombie = selectZombie()
    zomChoice = ask.keyIn(`A ${currZombie.name} from the hoard attacks you! Would you like to [a] Attack, or [q] Quit ? `, {limit: 'aq'})
    if(zomChoice === 'a') {
        zombieOnlyAttack(currZombie)
    } else {
        isAlive = false
        console.log('You quit the game')
    }
}

function selectZombie() {
    let random = Math.floor(Math.random() * eliteZombies.length)
    return eliteZombies[random]
}

function enemyEncounter() {
    const currEnemy = selectEnemy()

    if(currEnemy == twoRaiders || currEnemy == fiveRaiders) {
        console.log(`You encountered ${currEnemy.name}!`)
        console.log(`The ${currEnemy.name} are demanding you hand over your supplies or they will kill you!`)
        raiderChoice = ask.keyIn(`Would you like to [z] Surrender your weapon and all your health items to avoid a fight, or [a] Attack the Raiders ? `, {limit: 'za'})
        if(raiderChoice === 'z') {
            if((!Array.isArray(inventory) || !inventory.length) && (!Array.isArray(healthInventory) || !healthInventory.length)) {
                let random = Math.floor(Math.random() * 3)
                console.log(`You do not have any supplies to give!`)
                if(random === 0) {
                    console.log(`The raiders become angry and attack you!`)
                    attack(currEnemy)
                } else {
                    console.log(`The raiders lose interest once they see you have no supplies to give, and they leave you alone.`)
                    return
                }
            } else {
                console.log(`You give the raiders all of your supplies and they leave without a fight.`)
                healthInventory.splice(0, healthInventory.length)
                inventory.pop()
            }
        } else {
            console.log(`You choose not to give the raiders your supplies, and instead you attack them!`)
            attack(currEnemy)
        }
    } else {
        let choice = ask.keyIn(`You encountered ${currEnemy.name}! Would you like to [a] Attack, [r] Run, or [q] Quit ? `, {limit: 'arq'})
        if(choice === 'a') {
            attack(currEnemy)
        } else if (choice === 'r') {
            run(currEnemy)
        } else {
            isAlive = false
            console.log('You quit the game')
        }     
    }
}

function selectEnemy() {   //regular
    let random = Math.floor(Math.random() * 60)
    if(random < 40 ) {
        let randZ = Math.floor(Math.random() * zombies.length)
        return zombies[randZ]
    } else if(random >= 40 && random < 55) {   //was 45 to 55
        let randC = Math.floor(Math.random() * cannibals.length)
        return cannibals[randC]
    } else if (random >= 55) {
        let randR = Math.floor(Math.random() * raiders.length)
        return raiders[randR] 
    }
}

// function selectEnemy() {    // lots of raiders
//     let random = Math.floor(Math.random() * 60)
//     if(random < 5 ) {
//         let randZ = Math.floor(Math.random() * zombies.length)
//         return zombies[randZ]
//     } else if(random >= 5 && random < 10) {  
//         let randC = Math.floor(Math.random() * cannibals.length)
//         return cannibals[randC]
//     } else if (random >= 10) {
//         let randR = Math.floor(Math.random() * raiders.length)
//         return raiders[randR] 
//     }
// }

function zombieOnlyAttack(randZom) {
    const enemyAttack = randZom.ap * Math.floor(Math.random() * 3)
    const heroAttack = hero.ap * Math.round(Math.random() * 4)
    randZom.hp -= heroAttack
    hero.hp -= enemyAttack

    if(hero.hp > 0 && randZom.hp > 0) {
        console.log(`You attack the enemy for (${heroAttack}), their health is ${randZom.hp}. ${randZom.name} attacks you for (${enemyAttack}) and your health is ${hero.hp}.`)
        let choice = ask.keyIn(`Would you like to [a] Attack, or [q] Quit ? `, {limit: 'aq'})
        if(choice === 'a'){
            zombieOnlyAttack(randZom)
        } else {
            console.log('You quit the game.')
            isAlive = false
        }
    } else if(hero.hp <= 0){
        console.log(`You attack the enemy for (${heroAttack}), their health is ${randZom.hp}. ${randZom.name} attacks you and lands a killing blow.`)
        console.log(`The ${randEnemy.name} defeats you! It feasts on your brians, and what's left of your corpse rises as a zombie, cursed to forever wander and hunger in undeath.`)
        isAlive = false
    } else if(randZom.hp <= 0) {
        console.log(`As you deal the killing blow, ${randZom.name} attacks you one last time for (${enemyAttack}) and your health is ${hero.hp}.`)
        console.log(`You defeat the ${randZom.name}!`)
        if(randZom == stalker) {
            randZom.hp = stalkerHealth
        }else if(randZom == armored) {
            randZom.hp = armoredHealth
        }else if(randZom == massive) {
            randZom.hp = massiveHealth
        }
    }
}

function attack(randEnemy) {
    const enemyAttack = randEnemy.ap * Math.floor(Math.random() * 3)
    const heroAttack = hero.ap * Math.round(Math.random() * 4)
    randEnemy.hp -= heroAttack
    hero.hp -= enemyAttack
    if(hero.hp > 0 && randEnemy.hp > 0) {
        console.log(`You attack the enemy for (${heroAttack}), their health is ${randEnemy.hp}. ${randEnemy.name} attacks you for (${enemyAttack}) and your health is ${hero.hp}.`)
        let choice = ask.keyIn(`Would you like to [a] Attack, [r] Run, or [q] Quit ? `, {limit: 'arq'})
        if(choice === 'a'){
            attack(randEnemy)
        } else if(choice === 'r'){
            run(randEnemy)
        } else {
            console.log('You quit the game.')
            isAlive = false
        }
    } else if(hero.hp <= 0){
        console.log(`You attack the enemy for (${heroAttack}), their health is ${randEnemy.hp}. ${randEnemy.name} attacks you and lands a killing blow.`)
        if(randEnemy === crawler || randEnemy === walker || randEnemy === runner){
            console.log(`The ${randEnemy.name} defeats you! It feasts on your brians, and what's left of your corpse rises as a zombie, cursed to forever wander and hunger in undeath.`)
        } else if(randEnemy === sCannibal || randEnemy === eCannibal) {
            console.log(`The ${randEnemy.name} defeats you! The meat from your bones becomes its next meal.`)
        } else {
            (`The ${randEnemy.name} defeats you! They pick what supplies they can from your corpse and leave the rest to the zombies and buzzards.`)
        }
        console.log(`The ${randEnemy.name} defeats you! Game over.`)
        isAlive = false
    } else if(randEnemy.hp <= 0) {
        console.log(`As you deal the killing blow, ${randEnemy.name} attacks you one last time for (${enemyAttack}) and your health is ${hero.hp}.`)
        console.log(`You defeat the ${randEnemy.name}!`)

        if(randEnemy === sCannibal || randEnemy === eCannibal) {
            let cannibalItems = Math.floor(Math.random() * 2)
            let randomWeapon = Math.floor(Math.random() * weapons.length)
            if(cannibalItems === 0) {
                console.log(`${randEnemy.name} drops a ${weapons[randomWeapon]}.`)
                if (inventory.includes("bat") || inventory.includes("machete") || inventory.includes("shotgun") || inventory.includes("machine gun")) {
                    let choice2 = ask.keyIn(`You are already carrying a ${inventory}, would you like to drop it and pick up the ${weapons[randomWeapon]}? [y] Yes, or [n] No `, {limit: 'yn'})
                    if(choice2 === 'y') {
                        console.log(`You drop your ${inventory} and pick up the ${weapons[randomWeapon]}.`)
                        inventory.pop()
                        inventory.push(weapons[randomWeapon])
                        if (weapons[randomWeapon] === "bat") {
                            console.log(`Your attack power is now 6.`)
                            hero.ap = 6
                        } else if (weapons[randomWeapon] === "machete") {
                            console.log(`Your attack power is now 8.`)
                            hero.ap = 8
                        } else {
                            console.log(`Your attack power is now 10.`)
                            hero.ap = 10
                        }
                    } else {
                        console.log(`You keep your ${inventory} and leave the ${weapons[randomWeapon]} behind.`)
                    }
                } else {
                    inventory.push(weapons[randomWeapon])
                    console.log(`You pick up the ${weapons[randomWeapon]}.`)
    
                    if (weapons[randomWeapon] === "bat") {
                        console.log(`Your attack power is now 6.`)
                        hero.ap = 6
                    } else if (weapons[randomWeapon] === "machete") {
                        console.log(`Your attack power is now 8.`)
                        hero.ap = 8
                    } else {
                        console.log(`Your attack power is now 10.`)
                        hero.ap = 10
                    }
                }
                return
            }
        } else if(randEnemy === twoRaiders) {
            console.log(`${randEnemy.name} drops a twinkie, a can of beans, and a first aid kit, and you store them in your backpack.`)
            healthInventory.push("twinkie", "beans", "first aid kit")

            console.log(`${randEnemy.name} also drops a shotgun.`)
            if (inventory.includes("bat") || inventory.includes("machete") || inventory.includes("shotgun") || inventory.includes("machine gun")) {
                let choice3 = ask.keyIn(`You are already carrying a ${inventory}, would you like to drop it and pick up the shotgun? [y] Yes, or [n] No `, {limit: 'yn'})
                if(choice3 === 'y') {
                    console.log(`You drop your ${inventory} and pick up the shotgun.`)
                    inventory.pop()
                    inventory.push("shotgun")
                    console.log(`Your attack power is now 10.`)
                    hero.ap = 10
                } else {
                    console.log(`You keep your ${inventory} and leave the shotgun behind.`)
                }
            } else {
                inventory.push("shotgun")
                console.log(`You pick up the shotgun, and your attack power is now 10.`)
                hero.ap = 10
            }
        }else if(randEnemy === fiveRaiders) {
            console.log(`${randEnemy.name} drops two twinkies, a soda, three tins of SPAM, three cans of beans, and three first aid kits, and you store them in your backpack.`)
            healthInventory.push("twinkie","twinkie", "soda", "SPAM", "SPAM", "SPAM", "beans", "beans", "beans", "first aid kit", "first aid kit", "first aid kit")

            console.log(`${randEnemy.name} also drops a machine gun.`)
            if (inventory.includes("bat") || inventory.includes("machete") || inventory.includes("shotgun") || inventory.includes("machine gun")) {
                let choice3 = ask.keyIn(`You are already carrying a ${inventory}, would you like to drop it and pick up the machine gun? [y] Yes, or [n] No `, {limit: 'yn'})
                if(choice3 === 'y') {
                    console.log(`You drop your ${inventory} and pick up the machine gun.`)
                    inventory.pop()
                    inventory.push("machine gun")
                    console.log(`Your attack power is now 20.`)
                    hero.ap = 20
                } else {
                    console.log(`You keep your ${inventory} and leave the machine gun behind.`)
                }
            } else {
                inventory.push("machine gun")
                console.log(`You pick up the machine gun, and your attack power is now 20.`)
                hero.ap = 20
            }            
        }

        if(randEnemy == crawler) {
            randEnemy.hp = zomHealth1
        }else if(randEnemy == walker) {
            randEnemy.hp = zomHealth2
        }else if(randEnemy == runner) {
            randEnemy.hp = zomHealth2
        }else if(randEnemy == sCannibal) {
            randEnemy.hp = canHealth1
        }else if(randEnemy == eCannibal) {
            randEnemy.hp = canHealth2
        }else if(randEnemy == twoRaiders) {
            randEnemy.hp = twoRaidHealth
        }else if(randEnemy == fiveRaiders) {
            randEnemy.hp = fiveRaidHealth
        }
    } else {
        return
    }
}


function run(randEnemy) {
    let runChance = Math.floor(Math.random()*3)
    if(runChance === 1) {
        console.log(`You successfully escape from the ${randEnemy.name}!`)
        // return
    } else {
        const enemyAttack = randEnemy.ap * Math.round(Math.random()*4)
        if(enemyAttack === 0) {
            hero.hp -= 4 + (enemyAttack * 2)
        } else {
        hero.hp -= enemyAttack * 2
        }

        if(hero.hp > 0) {
            isAlive = true
        } else {
            isAlive = false
            console.log(`The ${randEnemy.name} defeats you! You are dead.`)
            return
        }

        console.log(`You attempt to escape, but ${randEnemy.name} catches you and strikes you for (${enemyAttack})! Your health is ${hero.hp}.`)
        let choice = ask.keyIn(`Would you like to [a] Attack, [r] Run, or [q] Quit ? `, {limit: 'arq'})
        if(choice === 'a'){
            attack(randEnemy)
        } else if(choice === 'r'){
            run(randEnemy)
        } else {
            isAlive = false
            console.log('You quit the game.')
            return
        }
    }
}

function checkInv() {
    if (!Array.isArray(inventory) || !inventory.length) {
        console.log(`   *****************************************************`)
        console.log(`You have only the rusted knife you woke up with.`)
        console.log(`Your rusted knife gives you an attack power of 4.`)
    } else {
        console.log(`   *****************************************************`)
        console.log(`Your current weapon is: ${inventory}`)
        if (inventory.includes("bat")) {
            console.log(`Your bat gives you an attack power of 6.`)
        } else if (inventory.includes("machete")) {
            console.log(`Your machete gives you an attack power of 8.`)
        } else if (inventory.includes("shotgun")){
            console.log(`Your shotgun gives you an attack power of 10.`)
        } else {
            console.log(`Your machine gun gives you an attack power of 20`)
        }
    }

    if (!Array.isArray(healthInventory) || !healthInventory.length) {
        console.log(`You have no health items.`)
    } else {
        console.log(`Your backpack contains: ${healthInventory}`)
        console.log(`Eating a twinkie gives you (5) extra health points, soda gives (10), SPAM gives (30), beans give (40), and using a first aid kit gives you (100) extra health.`)
    }
}

function lookAround() {
    if(walked < 240){
        if(walked >= looked) {

            let randomEvent = Math.floor(Math.random() * 3)
            let weaponChance = Math.floor(Math.random() * 10)
            let randomWeapon = Math.floor(Math.random() * weapons.length)
            
            let healthChance = Math.floor(Math.random() * 2)
            let randomHealth = Math.floor(Math.random() * healthItems.length)

            let shelterChance = Math.floor(Math.random() * 150)
            let attackChance = 0
            
            if(walked < 50) {
                attackChance = Math.floor(Math.random() * 3)
            } else {
                attackChance = Math.floor(Math.random() * 2)
            }
            
            if(randomEvent === 0){
                if(weaponChance === 0) {
                    console.log(`   *********************************************`)
                    console.log(`You find a ${weapons[randomWeapon]}!`)
                    if (inventory.includes("bat") || inventory.includes("machete") || inventory.includes("shotgun") || inventory.includes("machine gun")) {
                        let choice1 = ask.keyIn(`You are already carrying a ${inventory}, would you like to drop it and pick up the ${weapons[randomWeapon]}? [y] Yes, or [n] No `, {limit: 'yn'})
                        if(choice1 === 'y') {
                            console.log(`You drop your ${inventory} and pick up the ${weapons[randomWeapon]}.`)
                            inventory.pop()
                            inventory.push(weapons[randomWeapon])
                            
                            if (weapons[randomWeapon] === "bat") {
                                console.log(`Your attack power is now 6.`)
                                hero.ap = 6
                            } else if (weapons[randomWeapon] === "machete") {
                                console.log(`Your attack power is now 8.`)
                                hero.ap = 8
                            } else {
                                console.log(`Your attack power is now 10.`)
                                hero.ap = 10
                            }
                        } else {
                            console.log(`You keep your ${inventory} and leave the ${weapons[randomWeapon]} behind.`)
                        }
                    } else {
                        inventory.push(weapons[randomWeapon])
                        console.log(`You pick up the ${weapons[randomWeapon]}.`)
                        
                        if (weapons[randomWeapon] === "bat") {
                            console.log(`Your attack power is now 6.`)
                            hero.ap = 6
                        } else if (weapons[randomWeapon] === "machete") {
                            console.log(`Your attack power is now 8.`)
                            hero.ap = 8
                        } else {
                            console.log(`Your attack power is now 10.`)
                            hero.ap = 10
                        }
                    }
                    if (attackChance === 1) {
                        console.log(`While you are searching, an enemy finds you!`)
                        enemyEncounter()
                    }
                } else {
                    console.log(`You search the area but don't find anything of interest.`)
                    if (attackChance === 1) {
                        console.log(`While you are searching, an enemy finds you!`)
                        enemyEncounter()
                    }
                }
            } else if(randomEvent === 1){
                if (healthChance === 0) {
                    console.log(`   *********************************************`)
                    console.log(`You found the ${healthItems[randomHealth]}! You put it in your backpack.`)
                    healthInventory.push(healthItems[randomHealth])
                    if (attackChance === 1) {
                        console.log(`While you are searching, an enemy finds you!`)
                        enemyEncounter()
                    }
                } else {
                    console.log(`You search the area but don't find anything of interest.`)
                    if (attackChance === 1) {
                        console.log(`While you are searching, an enemy finds you!`)
                        enemyEncounter()
                    }
                }
            } else {
                if(shelterChance < 20){
                selectShelter(shelters)
                console.log(`   *********************************************`)
                console.log(`${hero.name}, you found a(n) ${shelterArr}! You can stay here safely for the night.`)
                console.log(`Sleeping will give you an extra 50 hp and can lower the number of enemies in the area.`)
                let choice = ask.keyIn(`Would you like to stay in the ${shelterArr} for the night? (y) Yes, or (n) No `, {limit: 'yn'})
                if(choice === 'y') {
                    console.log(`You stay the night in the ${shelterArr}, and wake up feeling refreshed. You health is now ${hero.hp}.`)
                    hero.hp += 50
                    shelterArr.pop();
                    walked = 0;
                    looked = 0;
                } else {
                    console.log(`You choose not to stay in the ${shelterArr} and continue your journey through the zombie wasteland.`)
                    shelterArr.pop()
                    console.log(shelterArr)
                }
                }else if(shelterChance === 20) {
                    bunker()
                } else {
                    console.log(`You search the area but don't find anything of interest.`)
                    if (attackChance === 1) {
                        console.log(`While you are searching, an enemy finds you!`)
                        enemyEncounter()
                    }
                }
            }
        

        } else {
            console.log(`   ************************************************************************`)
            console.log(`You have already searched this area and cannot search again yet, keep walking.`)
        }
    } else {
        console.log(`You are surrounded by a zombie army and cannot search right now.`)
    }
}

function selectShelter(shelter) {
    let random = Math.floor(Math.random() * shelter.length);
    shelterArr.push(shelter[random]);
}

function bunker() {
    console.log(`   *********************************************************************************************************************`)
    console.log(`In your search you find a hatch door, hidden under leaf litter and blending into the ground so well you nearly miss it.`)
    let choice = ask.keyIn(`Do you wish to open the hatch door, or leave it to continue your journey in the wasteland? [y] Open Hatch, or [n] Leave It `, {limit: 'yn'})
    if(choice === 'y'){
        console.log(`   *********************************************************************************************************************`)
        console.log(`The hatch groans in protest as you pull it open, and it takes a bit of strength to manage it, as if it hasn't been opened in years.`)
        console.log(`The hatch opens down into darkness, and you descend a metal, built-in ladder. It takes a moment for your eyes to adjust, but slowly you begin to take in your surroundings.`)
        console.log(`The hatch leads you into what appears to be an underground bunker. It's lined with shelves upon shelves of food, water, and other supplies.`)
        console.log(`You find a gas lantern on one of the shelves and light it. The glow from the lantern illuminates the space, which appears to be equipped with everything one would need to surviva a zombie apocalypse.`)
        console.log(`Whoever built it seems to be long gone, as the place is covered in dust and appears largely untouched. You close the hatch behind you, and secure the shelter you intend to wait out the apocalypse in.`)
        console.log(`***Congratulations, ${hero.name}! You have discovered the secret bunker, and so you have survived the zombie apocalypse!***`)
        console.log(`   ****************************************************YOU WIN!*********************************************************   `)
        hasWon = true;
        return
    } else {
        console.log(`You decide not to investigate and turn away from the hatch. Your journey in the zombie apocalypse continues.`)
        return
    }
}

function useItem() {
    let use = ask.keyIn(`Which health item would you like to use? [1] twinkie, [2] soda, [3] SPAM, [4] beans, or [5] first aid kit ? or [6] to return to gameplay `, {limit: '123456'})
    if(use === '1'){
        if(healthInventory.includes("twinkie")) {
            hero.hp += 5;
            healthInventory.splice(healthInventory.indexOf("twinkie"), 1);
            console.log(`You eat a twinkie and gain 5 health, your health is now ${hero.hp}.`)
        } else {
            console.log(`You do not have a twinkie.`)
            return
        }
    } else if(use === '2'){
        if(healthInventory.includes("soda")) {
            hero.hp += 10;
            healthInventory.splice(healthInventory.indexOf("soda"), 1);
            console.log(`You drink a soda and gain 10 health, your health is now ${hero.hp}.`)
        } else {
            console.log(`You do not have a soda.`)
            return
        }
    } else if(use === '3'){
        if(healthInventory.includes("SPAM")) {
            hero.hp += 30;
            healthInventory.splice(healthInventory.indexOf("SPAM"), 1);
            console.log(`You eat the SPAM and gain 30 health, your health is now ${hero.hp}.`)
        } else {
            console.log(`You do not have any SPAM.`)
            return
        }
    } else if(use === '4'){
        if(healthInventory.includes("beans")) {
            hero.hp += 40;
            healthInventory.splice(healthInventory.indexOf("beans"), 1);
            console.log(`You eat the beans and gain 40 health, your health is now ${hero.hp}.`)
        } else {
            console.log(`You do not have any beans.`)
            return
        }
    } else if(use === '5'){
        if(healthInventory.includes("first aid kit")) {
            hero.hp += 100;
            healthInventory.splice(healthInventory.indexOf("first aid kit"), 1);
            console.log(`You use the first aid kit and gain 100 health, your health is now ${hero.hp}.`)
        } else {
            console.log(`You do not have a first aid kit.`)
            return
        }
    } else {
        return
    }
}

function bossFight() {
    const enemyAttack = necromancer.ap * Math.floor(Math.random() * 3)
    const heroAttack = hero.ap * Math.round(Math.random() * 4)
    necromancer.hp -= heroAttack
    hero.hp -= enemyAttack

    if(hero.hp > 0 && necromancer.hp > 0) {
        console.log(`You attack the necromancer for (${heroAttack}), their health is ${necromancer.hp}. ${necromancer.name} attacks you for (${enemyAttack}) and your health is ${hero.hp}.`)
        let bossChoice = ask.keyIn(`Would you like to [a] Attack, or [q] Quit ? `, {limit: 'aq'})
        if(bossChoice === 'a'){
            bossFight()
        } else {
            console.log('You quit the game.')
            isAlive = false
        }
    } else if(hero.hp <= 0){
        console.log(`You attack the necromancer for (${heroAttack}), his health is ${necromancer.hp}. The necromancer attacks you and lands a killing blow.`)
        console.log(`The necromancer defeats you! He raises you from death and you join his undead army, doomed to serve mindlessly as a zombie. Game over.`)
        isAlive = false
    } else if(necromancer.hp <= 0) {
        console.log(`***You defeat the necromancer! His lifeless body turns to dust before your eyes, and his control of the undead is no more.***`)
        console.log(`***The zombies around you fall to the ground, no longer animated by the necromancer's magic.***`)
        console.log(`***Congratulations, ${hero.name}! You have defeated the necromancer and ended the zombie apocalypse!***`)
        console.log(`**********************************************YOU WIN!*************************************************`)
        youWon()
    }
}

function youWon() {
    hasWon = true
    return
}

// TO DO 

// DONE
//Print, sorta working
//Rand drop from enemies
//Eating
//Searching gives 50/50 chance to be attacked
//Weapons increase damage
//Can only carry one weapon
//Searching only available after walked so many times 
//Search gives different shelters
//Make raiders not attack immediately, ask for items

// NOT DONE
//Boss fight
//Add specific death messages for different enemy types