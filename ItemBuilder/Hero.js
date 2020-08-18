class Hero{
    constructor(level){
        this.level = (level === undefined)? 1 : level;
        this.name = "";
        this.attributes = [];

        this.aspect1 = new Aspect();
        this.aspect2 = new Aspect();
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

    TwinBlast: [2, "Twinblast"],
    Gideon: [3, "Gideon"],
    Kwang: [4, "Kwang"],
    Muriel: [5, "Muriel"],
    Khaimera: [6, "Khaimera"],
    Sevarog: [7, "Sevarog"],
    Murdock: [8, "Murdock"],
    Countess: [9, "Countess"],
    Bellica: [10, "LtBelica"],
    Greystone: [11, "Greystone"],
    Narbash: [12, "Narbash"],
    Steel: [13, "Steel"],
    Boris: [14, "Boris"],
    Sparrow: [15, "Sparrow"]
}
