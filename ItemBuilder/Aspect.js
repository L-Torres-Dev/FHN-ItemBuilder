const aspectColors = {
    Blue : "Blue",
    Red : "Red",
    Green : "Green",
    Black : "Black",
    White : "White"
}

class Aspect{
    constructor(name, color, effect1, effect2) {
        this.color = name;
        this.favor = 0;
        this.name = color;
        this.effect1 = effect1;
        this.effect2 = effect2;

    }
}

const aspects = {

    magician: new Aspect("Magician", aspectColors.Blue,
    "0.5% missing Mana Regen/Sec.",
    "Damaging an enemy with an Ability reduces the Cooldown of your Ultimate by 2 seconds."),

    warlock: new Aspect("Warlock", aspecColors.Blue,
    "Every 5th Ability does 20% extra damage.",
    "Hero kills increase Movement Speed by 15% for 3 seconds."),
    
    queen: new Aspect("Queen", aspectColors.Blue,
    "1 Energy Power for every 6 Minion kills.",
    "5% Ability Vamp. (Reduced 1/3 on Area of Effect abilities"),

    king: new Aspect("King", aspectColors.Red,
    "Additional 3 Gold on lane Minion kills if an ally is within 2200 units.",
    "Receive 25% bonus Gold on hero kills and assists."),
    
    ace: new Aspect("Ace", aspectColors.Red,
    "10% increased Basic Attack range.",
    "30% additional Critical Strike damage."),

    hunter: new Aspect("Hunter", aspectColors.Red,
    "Last hits on enemy Minions heal for 8 Health.",
    "Hitting 3 consecutive Basic Attacks on the same enemy hero within" +
     " 3 seconds provides a burst of 20% Attack Speed for 4 seconds. (10 Sec Cooldown)"),

    rogue: new Aspect("Rogue", aspectColors.Black,
    "Pass through Minions (no collision with Minion units).",
    "Not attacking for (20 - Level) seconds grants 100% Crit Chance for one shot (does not have to land)."),

    titan: new Aspect("Titan", aspectColors.Green,
    "Not taking damage for 10 seconds grants a Shield for 8% max HP.",
    "Receive [0.5% max Health] as Physical and Energy Power."),

    rook: new Aspect("Rook", aspectColors.Green,
    "CC Slows are 50% less effective.",
    "Gain 9 Physical and Energy Armor for 4 seconds when hit by CC. (Stacks indefinitely)"),

    Beasthunter: new Aspect("Beasthunter", aspectColors.Green,
    "10% reduced damage taken from neutral Minion attacks.",
    "Neutral Minion kills permantly increase Physical Power by 0.5 and Helath by 5. (30 Times)"),

    templar: new Aspect("Templar", aspectColors.White,
    "Allies within 1600 units gain 6% of your Armor and Magic Resist.",
    "15% of Mana spent becomes a Shield for 3 seconds."),

    clairvoyant: new Aspect("Clairvoyant", aspectColors.White,
    "Increase vision radius of Wards by 15%.",
    "12% Item Active CDR."),

    bishop: new Aspect("Bishop", aspectColors.White,
    "Potions last 30% longer.",
    "Your heals and Shields increase the Attack Speed of the recipients by 15% for 3 seconds.")
}