var itemsDictionary;
var itemsArray = [];

var heroPortraits = returnHeroPortraitList();

displayHeroPortraits();

var build = new ItemBuild();


returnAllItems(setItems)

function setItems(items){
    itemsDictionary = items;
    
    count = 0;
    for (var [key, value] of Object.entries(itemsDictionary)){
        itemsArray[count] = value;
        count++;
    }

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