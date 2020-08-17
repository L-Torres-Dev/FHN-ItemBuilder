var itemsDictionary;
var heroesDictionary;
var itemsArray = [];

var heroPortraits = returnHeroPortraitList();

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

    build.addItem(item);

    build.updateAttributes();

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

    updateStatIncrementors();
}