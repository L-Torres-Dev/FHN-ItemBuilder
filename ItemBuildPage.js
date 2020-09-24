var button = document.getElementById("HeroButton");
var buildButton = document.getElementById("BuildButton");
var itemsButton = document.getElementById("itemsButton");
var heroText = document.getElementById("heroInput");
var currentHeroText = document.getElementById("currentHero");

var buildValues = document.getElementsByClassName("buildValue");
var heroValues = document.getElementsByClassName("heroValue");

var currentHero = null;

var itemsDictionary;

returnAllItems(setItems);

button.onclick = getHero;
buildButton.onclick = calculateBuild;
itemsButton.onclick = printItems;

heroText.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      
      getHero();
    }
  });

function getHero(){
    let heroName = heroText.value;

    if(heroName !== undefined && heroName !== ""){
        getHeroDetails(heroName, setHero);
    }
    
}

function setHero(hero){
    if(hero !== undefined){
        currentHero = hero;
        //console.log(hero.name);

        currentHeroText.textContent = hero.name;

        attributes = attributesAsDictionary(currentHero.attributes);

        for(var i = 0; i < heroValues.length; i++){
            heroValues[i].textContent = attributes[heroValues[i].id].value;
        }
    }

    if(hero === null){
        currentHeroText.textContent = "No hero picked";
    }
}

function printItems(){
    console.log("printing item...\n\n")
    var itemInputs = document.getElementsByClassName("itemValue");

    var inventory = new Inventory();

    for(var i = 0; i < itemInputs.length; i++){

        var input = itemInputs[i].value;

        if(input !== undefined && input !== ""){
            if(itemsDictionary[input] !== undefined){
                var item = itemsDictionary[input];
                inventory.addItem(item);
            }
            
        }
        
    }

    for(var i = 0; i < inventory.count(); i++){
        console.log(inventory.items[i].name);
    }
}

function calculateBuild(){
    var itemInputs = document.getElementsByClassName("itemValue");
    console.log("Calculating Build...")

    if (currentHero !== null && currentHero !== undefined){
        var build = new ItemBuild();

        var inventory = new Inventory();

        for(var i = 0; i < itemInputs.length; i++){

            var input = itemInputs[i].value;

            if(input !== undefined && input !== ""){
                if(itemsDictionary[input] !== undefined){
                    var item = itemsDictionary[input];
                    inventory.addItem(item);
                }
                
            }
            
        }

        build.inventory =  inventory;
        build.hero = currentHero;
        build.updateAttributes();

        console.log("health: " + build.attributes[attributeNames.Health].value);

        console.log(buildValues[0].id);
        for(var i = 0; i < buildValues.length; i++){

            var value = build.attributes[buildValues[i].id].value

            if(buildValues[i].id === "Cooldown Reduction"){
                value = Math.abs(value);
                value = value * 100;
            }   

            buildValues[i].textContent = value;
        }

        buildValues[11].textContent = buildValues[11].textContent + "%";
    }
}

function setItems(items){
    itemsDictionary = items;
}   