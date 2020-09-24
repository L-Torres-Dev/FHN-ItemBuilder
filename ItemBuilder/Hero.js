class Hero{
    constructor(level){
        this.level = (level === undefined)? 1 : level;
        this.name = "";
        this.attributes = [];
        
        this.aspect1 = new Aspect();
        this.aspect2 = new Aspect();

        this.attackSpeedPerLevel = 0;

        this.passive = new Ability();
        this.basicAttack = new Ability();
        this.rmb = new Ability();
        this.q = new Ability();
        this.e = new Ability();
        this.ult = new Ability();
    }

    setLevel(level){
        if(typeof(level) === "number"){
            if(level > 18){
                this.level = 18;
            }
    
            else if(level < 1){
                this.level = 1;
            }
    
            else{
                this.level = level;
            }
        }
    }
}

//Heroes have a number that corresponds to the numbered image in the Fault api, and a name.
const Heroes = {

    TwinBlast: [2, "Twinblast", "#841f16"],
    Gideon: [3, "Gideon", "#6635ad"],
    Kwang: [4, "Kwang", "#963967"],
    Muriel: [5, "Muriel", "#554d57"],
    Khaimera: [6, "Khaimera", "#156569"],
    Sevarog: [7, "Sevarog", "#566608"],
    Murdock: [8, "Murdock", "#2a4471"],
    Countess: [9, "Countess", "#7d1129"],
    Bellica: [10, "LtBelica", "#163d85"],
    Greystone: [11, "Greystone", "#7e6332"],
    Narbash: [12, "Narbash", "#777940"],
    Steel: [13, "Steel", "#822102"],
    Boris: [14, "Boris", "#6e6b4a"],
    Sparrow: [15, "Sparrow", "#5e7a57"],
    Dekker: [16, "Dekker", "#156569"],
    Grim: [17, "GRIMexe", "#554d57"]
}
