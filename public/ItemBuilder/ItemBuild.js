class ItemBuild{
    constructor(){
        
        this.attributes = {};

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

            let itemSameColor1 = false;
            let itemSameColor2 = false;

            if(item.color === this.hero.aspect1.color ){
                itemSameColor1 = true;
            }

            if(item.color === this.hero.aspect2.color){
                itemSameColor2 = true;
            }

            for(let j = 0; j < item.attributes.length; j++){

                let attribute = item.attributes[j];

                attributes[attribute.attributeName].value += attribute.value;

                if(itemSameColor1){
                    attributes[attribute.attributeName].value += (attribute.rankValue * this.hero.aspect1.favor);
                    
                }

                if(itemSameColor2){
                    attributes[attribute.attributeName].value += (attribute.rankValue * this.hero.aspect2.favor);
                }

                if(isCooldownReduction(attribute.attributeName)){
                    console.log("cooldown: " + attributes[attribute.attributeName].value)
                    if(attributes[attribute.attributeName].value < -.4){
                        attributes[attribute.attributeName].value = -.4;
                    }
                }

                if(isDistributionAttribute(attribute.attributeName)){
                    if(attributes[attribute.attributeName].value > 1){
                        attributes[attribute.attributeName].value = 1;
                    }
                    
                }

                if(isAttackSpeed(attribute.attributeName)){
                    if(attributes[attribute.attributeName].value > 250){
                        attributes[attribute.attributeName].value = 250;
                    }
                }

            }


        }

        //Attack Speed
        let heroBasicAttackCD = this.hero.basicAttack.cooldown;
        let heroAttackSpeed = 1 / heroBasicAttackCD;
        let buildAttackSpeed = attributes[attributeNames.AttackSpeed].value + (build.hero.attackSpeedPerLevel * (build.hero.level - 1));

        console.log("HERO AUTO: " + heroAttackSpeed);

        let attackSpeed = buildAttackSpeed / 100;

        console.log("ATTACK SPEED: " + attackSpeed);
        buildAttackSpeed = heroAttackSpeed + (attackSpeed * heroAttackSpeed);

        console.log("BUILD ATTACK SPEED: " + buildAttackSpeed);

        attributes[attributeNames.AttackSpeed].value = buildAttackSpeed;
        
        let theValue = attributes[attributeNames.AttackSpeed].value;
        console.log("FINAL AUTO: " + theValue);
        
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

    returnStatFromHeroLevel(attributeName){

        let levelMod = this.hero.level - 1;

        let attributes = attributesAsDictionary(this.hero.attributes);

        console.log("SOMETHING: " + attributeName);

        switch(attributeName){
            case heroAttributeNames.health:
                let health = attributes["health"].value + (attributes["healthPerLevel"].value * levelMod);
                return health;
            case heroAttributeNames.healthRegen:
                let healthRegen = attributes["healthRegen"].value + attributes["healthRegenPerLevel"].value * levelMod;
                return healthRegen;
            case heroAttributeNames.mana:
                let mana = attributes["mana"].value + attributes["manaPerLevel"].value * levelMod;
                return mana;
            case heroAttributeNames.manaRegen:
                let manaRegen = attributes["manaRegen"].value + attributes["manaRegenPerLevel"].value * levelMod;   
                return manaRegen;
            case heroAttributeNames.physicalArmor:
                let physicalArmor = attributes["physicalArmor"].value + attributes["physicalArmorPerLevel"].value * levelMod;
                return physicalArmor;
            case heroAttributeNames.energyArmor:
                let energyArmor = attributes["energyArmor"].value + attributes["energyArmorPerLevel"].value * levelMod;
                return energyArmor;
            case attributeNames.AttackSpeed:
                let attackSpeed = 1 / this.hero.basicAttack.cooldown;
                return attackSpeed;
            case attributeNames.MovementSpeed:
                let moveSpeed = attributes["movespeed"].value;
                console.log("MOVEMENT SPEED: " + moveSpeed);
                return moveSpeed;
            default:
                return 0;
        }
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