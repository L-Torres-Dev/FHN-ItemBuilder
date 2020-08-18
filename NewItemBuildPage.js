var itemView = document.getElementById("item-grid");
var itemSearch = document.getElementById("item-search");
var itemBlocks = document.getElementsByClassName("inventory-container");
var blocks = document.getElementsByClassName("item-block");
var acc = document.getElementsByClassName("filter-wrapper");
var maxValueElements = document.getElementsByClassName("label-cat-right");
var itemPopup = document.getElementById("item-popup");
var levelValue = document.getElementById("level-field");
var clearButton = document.getElementById("clear-inventory");

var statIncrementors = document.getElementsByClassName("stat-increment");

clearButton.addEventListener("click", function(){
    clearInventory();
});

levelValue.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        

        let value = Number.parseInt(levelValue.value);

        
        build.hero.setLevel(value);
        build.updateAttributes();
        
        updatePage();
    }
  });

  for(let i = 0; i < itemBlocks.length; i++){
    itemBlocks[i].addEventListener("dblclick", function(){
        
        let inventoryContainer = itemBlocks[i];

        let itemIndex = inventoryContainer.getAttribute("itemIndex")

        let index = Number.parseInt(itemIndex);

        console.log(index);

        let item = build.inventory.items[index];

        if(item !== undefined){
            build.inventory.removeItem(index);
            build.updateAttributes();
            updatePage();
        }
      });

      itemBlocks[i].addEventListener("click", function(){

        let inventoryContainer = itemBlocks[i];

        let itemIndex = inventoryContainer.getAttribute("itemIndex")

        let index = Number.parseInt(itemIndex);

        let item = build.inventory.items[index];

        if(item !== undefined){
            setCurrentItem(item);
            displayCurrentItemData();
        }
        
      })
        
  }
  

function openHeroPanel() {
    document.getElementById("mySidenav").style.width = "23%";
    }

function closeHeroPanel() {
    document.getElementById("mySidenav").style.width = "0";
}

for (var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    console.log(this);

    var toggleSigns = this.getElementsByClassName("plus-minus");
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;

      toggleSigns[0].textContent = "+";

      console.log("collapse");
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      toggleSigns[0].textContent = "—";
      console.log("expand");
    } 
  });
}

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

    setHero(heroesDictionary[name]);

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
        });

    }
}

function updatePage(){

    levelValue.value = build.hero.level;
    console.log("HERO: " + levelValue.value);

    var buildValues = document.getElementsByClassName("buildValue");

    var goldValue = document.getElementById("costValue");

    var goldcost = build.inventory.totalCost();

    goldValue.textContent = build.inventory.totalCost()

    for(var i = 0; i < buildValues.length;i++){
        var attribute = build.attributes[buildValues[i].id]

        var value = attribute.value;



        let isPercentageValue = isPercentAttribute(buildValues[i].id);

        if(isPercentageValue){
            value = Math.abs(value);
            value = value * 100;
        }   

        var percentage = value / attribute.maxValue * 100;

        if(percentage > 100){
            percentageStr = "100%"
        }

        else{
            var percentageStr = percentage.toString() + "%";
        }

        

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

        var blocks = itemBlocks[i].getElementsByClassName("item-block");
        var block = blocks[0];
        block.style.display = "none";

        var imageId = "img" + (i + 1).toString();
        var pId = "p" + (i + 1).toString();

        var image = document.getElementById(imageId);

        var itemText = document.getElementById(pId);

        
        image.src = "";
        itemText.textContent = "";
        
        console.log("LENGTH: " + build.inventory.items.length);
        if(i >= build.inventory.items.length)
        {
            break;
        }

        

        console.log("ITEM NAME: " + build.inventory.items[i].name);
        
        block.style.display = "block";
        
        let item = build.inventory.items[i];

        

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

    

    for(var i = 0; i < maxValueElements.length; i++){
        var maxValueElement = maxValueElements[i];
        var buildValue = maxValueElement.previousElementSibling.previousElementSibling.firstChild.nextSibling;
        var attributeName = buildValue.id;

        let isPercentageValue = isPercentAttribute(attributeName);

        var maxValue = build.attributes[attributeName].maxValue;
        
        for(var j = 0; j < build.hero.attributes.length; j++){

            var heroAttribute = build.hero.attributes[j];
            var heroAttributeName = heroAttributeNames[heroAttribute.attributeName];
            theName = attributeNames[heroAttributeName];

            if(theName === attributeName){
                maxValue += build.returnStatFromHeroLevel(theName);

            }
        }
        

        maxValue *= 100;
        maxValue = Math.round(maxValue);
        maxValue /= 100
        
        maxValueElement.textContent = maxValue;


        if(isPercentageValue){
            maxValueElement.textContent += "%";
        }
        //var percentageStr = percentage.toString() + "%";
    }
}

function displayCurrentItemData(){

    var itemView = document.getElementById("view-height");
    let item = CurrentItem();
    let itemName = CurrentItem().name
    console.log(itemName);

    if(item.name !== "none" && !build.inventory.rulesSatisfied(item)){
        for(var i = 0; i < statIncrementors.length; i++){
            incrementor.textContent = "";
        }
    }

    else{
        for(var i = 0; i < statIncrementors.length; i++){
            var incrementor = statIncrementors[i];
            incrementor.textContent = "";
    
            var buildValue = incrementor.previousElementSibling.firstChild.nextSibling;
            
            if(itemName !== "none"){
                let attributes = CurrentItem().attributes;
    
                for(var j = 0; j < attributes.length; j++){
                    if(buildValue.id === attributes[j].attributeName){
    
                        var value = attributes[j].value;
    
                        if(value !== 0){
                            value *= 100;
                            value = Math.round(value);
                            value /= 100
                            value = Math.abs(value);
    
                            incrementor.textContent = "+" + value;
                        }
    
                        else{
                            incrementor.textContent = "";
                        }
                    }
                }
                itemView.style.transition = "1s";
                itemView.style.opacity = "100%";
            }
    
            else{
                incrementor.textContent = "";
                itemView.style.transition = "0s";
                itemView.style.opacity = "0%";
                
            }
            
        }
        
    }

    var img = itemPopup.getElementsByClassName("item-wrapper")[0];
    
    switch(item.color){
        case aspectColors.Blue:
            img.src = blueItemImage;
            break;
        case aspectColors.Black:
            img.src = purpleItemImage;
            break;
        case aspectColors.Red:
            img.src = redItemImage;
            break;
        case aspectColors.Green:
            img.src = greenItemImage;
            break;
        case aspectColors.White:
            img.src = whiteItemImage;
            break;
        default:
            img.src = baseItemImage;
            break;
    }

    
    var divName = itemPopup.getElementsByClassName("itempop-name")[0];

    divName.textContent = item.name;

    //class Name for item Stats: itemstats-text
    var itemStatsWrapper = itemPopup.getElementsByClassName("itemstats-wrapper")[0];

    while(itemStatsWrapper.firstChild){
        itemStatsWrapper.removeChild(itemStatsWrapper.firstChild);
    }

    for(var i = 0; i < item.attributes.length; i++){
        let attribute = item.attributes[i];

        var itemStat = document.createElement("div")
        itemStat.className = "itemstats-text";

        itemStat.textContent = attribute.details;

        itemStatsWrapper.appendChild(itemStat);
    }
    
    let description = document.getElementById("item-description");

    description.textContent = "";
    description.textContent = item.active + "\n" + item.passive;

    var goldbarText = document.getElementById("itempop-goldbar");

    goldbarText.textContent = item.cost;

    
    
}