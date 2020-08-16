var itemView = document.getElementById("item-grid");
var itemSearch = document.getElementById("item-search");
var itemBlocks = document.getElementsByClassName("inventory-container");
var blocks = document.getElementsByClassName("item-block");

for(var block of blocks){
    block.style.display = "none";
}

var heroGrid = document.getElementById("hero-grid");

var view = new ItemView(itemView);

itemSearch.addEventListener("input", function(){
    view.display(callSearch(itemSearch.value));
});

function createItemContainers(itemsArray){
    view.initialize(itemsArray.length);
    
    view.display(itemsArray);
}

function setHeroImage(src, name){

    var image = document.getElementById("hero-portrait");
    var heroText = document.getElementById("hero-name");

    getHeroDetails(name, setHero);

    image.src = src;
    heroText.textContent = name;
}

function displayHeroPortraits(){

    console.log(heroPortraits.length);
    
    for(var i = 0; i < heroPortraits.length; i++){
        let heroDiv = document.createElement("div");

        let heroImage = document.createElement("img");

        heroImage.src = heroPortraits[i].portrait;
        heroImage.id = heroPortraits[i].name;

        heroDiv.appendChild(heroImage);

        heroGrid.appendChild(heroDiv);

        heroImage.addEventListener("click", function(){
            setHeroImage(heroImage.src, heroImage.id);
            getHeroDetails(heroImage.id, setHero);
        });

    }
}

function updatePage(){

    var buildValues = document.getElementsByClassName("buildValue");

    for(var i = 0; i < buildValues.length;i++){
        var attribute = build.attributes[buildValues[i].id]

        var value = attribute.value;

        let isPercentageValue = buildValues[i].id === "Cooldown Reduction"
             || buildValues[i].id ===  "CritChance" || buildValues[i].id === "LifeSteal";


        if(isPercentageValue){
            value = Math.abs(value);
            value = value * 100;
        }   

        var percentage = value / attribute.maxValue * 100;

        var percentageStr = percentage.toString() + "%";

        console.log(percentageStr);

        //Change width
        buildValues[i].style.width = percentageStr;

        buildValues[i].textContent = value;

        if(isPercentageValue){
            buildValues[i].textContent += "%"
        }
        
        if(value === 0){
            buildValues[i].textContent = ""
        }

    }

    console.log("UPDATING...");


    for(var i = 0; i < itemBlocks.length; i++){

        console.log("LENGTH: " + build.inventory.items.length);
        if(i >= build.inventory.items.length)
        {
            break;
        }

        var blocks = itemBlocks[i].getElementsByClassName("item-block");
        var block = blocks[0];


        var imageId = "img" + (i + 1).toString();
        var pId = "p" + (i + 1).toString();

        item = build.inventory.items[i];

        var image = document.getElementById(imageId);

        var itemText = document.getElementById(pId);

        itemText.textContent = item.name;

        switch(item.color){
            case aspectColors.Blue:
                image.src = blueItemImage;
                break;
            case aspectColors.Black:
                image.src = purpleItemImage;
                break;
            case aspectColors.Red:
                image.src = redItemImage;
                break;
            case aspectColors.Green:
                image.src = greenItemImage;
                break;
            case aspectColors.White:
                image.src = whiteItemImage;
                break;
            default:
                image.src = baseItemImage;
                break;
        }
    }
}

