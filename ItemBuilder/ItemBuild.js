class ItemBuild{
    constructor(){
        
        this.attributes = {};

        this.something = "Something"

        for(var [key, value] of Object.entries(attributeNames)){
            this.attributes[value] = new Attribute(value);
        }

        this.inventory = new Inventory();
        this.hero = new Hero();
    }

    resetAttributes(){

        console.log("RESETTING ATTRIBUTES!\n\n");

        for(var [key, value] of Object.entries(this.attributes)){

            value.value = 0;
            //console.log(value.attributeName + ": " + value.value);
        }
        
        console.log("\n\nFINISHED RESETTING ATTRIBUTES!\n\n");
        
    }

    attributesFromInventory(){
        let attributes = {};

        for(var [key, value] of Object.entries(attributeNames)){
            attributes[value] = new Attribute(value);
        }

        let inventoryAttributes = [];

        for(let i = 0; i < this.inventory.count(); i++){
            
            let item = this.inventory.items[i];

            for(let j = 0; j < item.attributes.length; j++){

                
                let attribute = item.attributes[j];

                attributes[attribute.attributeName].value += attribute.value;
            }
        }
        
        for(let [name, attribute]of Object.entries(attributes)){

            let attr = new Attribute(name, attribute.value)
            inventoryAttributes.push(attr);
        }
        
        return inventoryAttributes;

    }

    updateAttributes(){

        this.resetAttributes();

        let attributes = this.attributes;

        for(let i = 0; i < this.inventory.count(); i++){
            
            let item = this.inventory.items[i];

            let itemSameColor = false;
            let aspect = null;

            if(item.color === this.hero.aspect1.color ){
                itemSameColor = true;
                aspect = this.hero.aspect1;
            }

            else if(item.color === this.hero.aspect2.color){
                itemSameColor = true;
                aspect = this.hero.aspect2;
            }

            for(let j = 0; j < item.attributes.length; j++){

                let attribute = item.attributes[j];

                attributes[attribute.attributeName].value += attribute.value;

                if(itemSameColor){
                    attributes[attribute.attributeName].value += (attribute.rankValue * aspect.favor);
                }

                if(isCooldownReduction(attribute.attributeName)){
                    console.log("cooldown: " + attributes[attribute.attributeName].value)
                    if(attributes[attribute.attributeName].value < -.4){
                        attributes[attribute.attributeName].value = -.4;
                    }
                }
            }
        }

        for(let i = 0; i < this.hero.attributes.length; i++){

            let heroAttributes = this.hero.attributes;

            let addValue = heroAttributes[i].value;
            let realName = heroAttributeToAttribute(heroAttributes[i].attributeName);

            if(realName !== undefined){

                attributes[realName].value += addValue;
                
            }
        }
        
        let attributesDictionary = attributesAsDictionary(this.hero.attributes);

        let levelMod = this.hero.level - 1;

        attributes[attributeNames.Health].value += (attributesDictionary["healthPerLevel"].value * levelMod);
        attributes[attributeNames.HealthRegenRate].value += attributesDictionary["healthRegenPerLevel"].value * levelMod;
        attributes[attributeNames.Mana].value += attributesDictionary["manaPerLevel"].value * levelMod;
        attributes[attributeNames.ManaRegenRate].value += attributesDictionary["manaRegenPerLevel"].value * levelMod;
        attributes[attributeNames.OuchieArmor].value += attributesDictionary["physicalArmorPerLevel"].value * levelMod;
        attributes[attributeNames.SizzleArmor].value += attributesDictionary["energyArmorPerLevel"].value * levelMod;

        this.roundAttributes(1000);
    }

    
    roundAttributes(precision){
        
        let attributes = this.attributes;

        for(var [key, value ] of Object.entries(attributes)){
            value.value = Math.round(value.value * precision) / precision;
        }
        
    }

    addItem(item){
        if(this.hero.name !== ""){
            this.inventory.addItem(item);
        }

        else{
            console.log("error! no hero selected")
        }
        
    }
}