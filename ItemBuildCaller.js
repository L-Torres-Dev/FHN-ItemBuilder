var itemsDictionary;
var heroesDictionary;
var itemsArray = [];

var heroPortraits = returnHeroPortraitList();

var currentItem = new Item();
displayCurrentItemData();

getAllHeroes(setAllHeroes);

displayHeroPortraits();

var build = new ItemBuild();


returnAllItems(setItems)

function setItems(items){
    itemsDictionary = items;

    determineMaxValues();
    
    createItemContainers(itemsArray);
}

function callSearch(search){
    return searchItems(search, itemsDictionary);
}

function addItemToBuild(itemName){
    var item = itemsDictionary[itemName];

    console.log("from build caller: " + item.name)

    build.addItem(item);

    build.updateAttributes();

    currentItem = new Item();
    hideCurrentItemData();
    //displayCurrentItemData();

    updatePage();
    //console.log(build.inventory.count())

}

function setHero(hero){

    build.hero = hero;

    build.updateAttributes();

    displayQ();
    displayE();
    displayUlt();
    displayRMB();
    displayPassive();

    closeAbilityNav();

    updatePage();
}

function incrementValue(){
    let level = build.hero.level + 1;

    build.hero.setLevel(level);

    if(level === build.hero.level){
        build.updateAttributes();
        updatePage();
    }
}

function decrementValue(){
    let level = build.hero.level - 1;

    build.hero.setLevel(level);

    if(level === build.hero.level){
        build.updateAttributes();
        updatePage();
    }
    
}

function determineMaxValues(){
    let count = 0;

    let movementSpeedFromBoots = 0;
    let movementSpeedFromItems = 0;
    for (var [key, value] of Object.entries(itemsDictionary)){
        itemsArray[count] = value;

        var itemAttributes = value.attributes;

        for(var i = 0; i < itemAttributes.length; i++){
            var attribute = itemAttributes[i];
            var maxValue = attribute.value * 6;

            if(isPercentAttribute(attribute.attributeName)){
                maxValue *= 100;
            }

            if(isCooldownReduction(attribute.attributeName)){
                maxValue = 40;
            }

            if(isAttackSpeed(attribute.attributeName)){
                maxValue /= 100;
            }

            var buildAttribute = build.attributes[attribute.attributeName]

            if(maxValue > buildAttribute.maxValue){
                buildAttribute.maxValue = maxValue;
            }

            if(isDistributionAttribute(attribute.attributeName)){
                console.log("RANDOM");
                buildAttribute.maxValue = 100;
            }

            if(isMovementSpeed(attribute.attributeName)){
                if(itemsArray[count].isBoots()){
                    if(attribute.value > movementSpeedFromBoots){
                        movementSpeedFromBoots = attribute.value;
                    }
                }

                else{
                    let value = attribute.value * 5;
                    if(value > movementSpeedFromItems){
                        movementSpeedFromItems = value;
                    }
                }
            }
        }

        count++;
    }

    let maxMS = movementSpeedFromItems + movementSpeedFromBoots

    build.attributes[attributeNames.MovementSpeed].maxValue = maxMS;

}

function setAllHeroes(heroes){

    heroesDictionary = heroes;
}

function setCurrentItem(item){
    currentItem = item;
    
    displayCurrentItemData();
}

function clearInventory(){
    build.inventory.removeAllItems();

    build.updateAttributes();
    updatePage();
}

function returnItem(itemName){
    return itemsDictionary[itemName];
}

function CurrentItem(){
    return currentItem;
}

function displayPassive(){
    if(build.hero.name === "") return;
    abilityContainer.style.opacity = "100%"

    var abilityOverlay = document.getElementsByClassName("ability-overlay")[0];

    abilityOverlay.style.width = "625px";
    container = document.getElementById("passive-block");

    let image = container.getElementsByTagName("img")[0];

    console.log("IMAGE: " + image.src);

    
    let url = "https://api.playfault.com/imagecdn/abilities";
    let name = "/" + build.hero.name;
    let ability = "/P";

    url += name + ability + ".png";

    image.src = url;
    

    abilityNameText.textContent = build.hero.passive.name;
    abilityDescriptionText.textContent = build.hero.passive.description;
}

function displayRMB(){
    if(build.hero.name === "") return;
    abilityContainer.style.opacity = "100%"

    var abilityOverlay = document.getElementsByClassName("ability-overlay")[0];

    abilityOverlay.style.width = "625px";
    container = document.getElementById("rmb-block");

    let image = container.getElementsByTagName("img")[0];

    
    let url = "https://api.playfault.com/imagecdn/abilities";
    let name = "/" + build.hero.name;
    let ability = "/RMB";

    url += name + ability + ".png";

    image.src = url;

    abilityNameText.textContent = build.hero.rmb.name;
    abilityDescriptionText.textContent = build.hero.rmb.description;
}
function displayQ(){
    if(build.hero.name === "") return;
    abilityContainer.style.opacity = "100%"

    var abilityOverlay = document.getElementsByClassName("ability-overlay")[0];

    abilityOverlay.style.width = "625px";
    container = document.getElementById("q-block");

    let image = container.getElementsByTagName("img")[0];

    console.log("IMAGE: " + image.src);

    
    let url = "https://api.playfault.com/imagecdn/abilities";
    let name = "/" + build.hero.name;
    let ability = "/Q";

    url += name + ability + ".png";

    image.src = url;

    abilityNameText.textContent = build.hero.q.name;
    abilityDescriptionText.textContent = build.hero.q.description;
}
function displayE(){
    if(build.hero.name === "") return;
    abilityContainer.style.opacity = "100%"

    var abilityOverlay = document.getElementsByClassName("ability-overlay")[0];

    abilityOverlay.style.width = "625px";
    container = document.getElementById("e-block");

    let image = container.getElementsByTagName("img")[0];

    console.log("IMAGE: " + image.src);

    
    let url = "https://api.playfault.com/imagecdn/abilities";
    let name = "/" + build.hero.name;
    let ability = "/E";

    url += name + ability + ".png";

    image.src = url;

    abilityNameText.textContent = build.hero.e.name;
    abilityDescriptionText.textContent = build.hero.e.description;
}
function displayUlt(){
    if(build.hero.name === "") return;

    var abilityOverlay = document.getElementsByClassName("ability-overlay")[0];

    abilityOverlay.style.width = "625px";
    abilityContainer.style.opacity = "100%"

    container = document.getElementById("r-block");

    let image = container.getElementsByTagName("img")[0];

    console.log("IMAGE: " + image.src);

    
    let url = "https://api.playfault.com/imagecdn/abilities";
    let name = "/" + build.hero.name;
    let ability = "/R";

    url += name + ability + ".png";

    image.src = url;

    abilityNameText.textContent = build.hero.ult.name;
    abilityDescriptionText.textContent = build.hero.ult.description;
}