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
    
    count = 0;
    for (var [key, value] of Object.entries(itemsDictionary)){
        itemsArray[count] = value;

        var itemAttributes = value.attributes;

        for(var i = 0; i < itemAttributes.length; i++){
            var attribute =itemAttributes[i];
            var maxValue = attribute.value * 6;

            if(isPercentAttribute(attribute.attributeName)){
                maxValue *= 100;
            }

            if(isCooldownReduction(attribute.attributeName)){
                maxValue = 40;
            }

            

            var buildAttribute = build.attributes[attribute.attributeName]



            if(maxValue > buildAttribute.maxValue){
                buildAttribute.maxValue = maxValue;
            }


            if(isRandomModifier(attribute.attributeName)){
                console.log("RANDOM");
                buildAttribute.maxValue = 100;
            }
        }

        count++;
    }

    /*
    for (var [key, value] of Object.entries(build.attributes)){
        console.log(value.attributeName + " max value: " + value.maxValue);
    }
    */

    createItemContainers(itemsArray);
}

function callSearch(search){
    return searchItems(search, itemsDictionary);
}

function addItemToBuild(itemName){
    var item = itemsDictionary[itemName];

    console.log("from build calller: " + item.name)

    build.addItem(item);

    build.updateAttributes();

    currentItem = new Item();
    displayCurrentItemData();

    updatePage();

}

function setHero(hero){

    build.hero = hero;

    build.updateAttributes();

    updatePage();
}

function setAllHeroes(heroes){

    heroesDictionary = heroes;
}

function setCurrentItem(item){
    currentItem = item;

    displayCurrentItemData();
}

function returnItem(itemName){
    return itemsDictionary[itemName];
}

function CurrentItem(){
    return currentItem;
}