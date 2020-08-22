var itemView = document.getElementById("item-grid");
var itemSearch = document.getElementById("item-search");
var itemBlocks = document.getElementsByClassName("inventory-container");
var blocks = document.getElementsByClassName("item-block");
var acc = document.getElementsByClassName("filter-wrapper");
var maxValueElements = document.getElementsByClassName("label-cat-right");
var itemPopup = document.getElementById("item-popup");
var levelValue = document.getElementById("level-field");
var clearButton = document.getElementById("clear-inventory");
var abilityNameText = document.getElementById("ability-name");
var abilityDescriptionText = document.getElementById("ability-description");
var abilityContainer = document.getElementById("abilitydata-container");
var filterContainer = document.getElementById("filter-container");
var favorField1 = document.getElementById("favor1");
var favorField2 = document.getElementById("favor2");

var statIncrementors = document.getElementsByClassName("stat-increment");

var heroColor;

var aspect1Container = document.getElementById("aspect1");
var aspect2Container = document.getElementById("aspect2");

var aspectX1 = document.getElementById("aspectX1");
var aspectX2 = document.getElementById("aspectX2");

var currentAspectContainer = undefined;

var checkBoxes = filterContainer.getElementsByClassName("checkmark");

for(var i = 0; i < checkBoxes.length; i++){
    var checkBox = checkBoxes[i].previousElementSibling;

    checkBox.addEventListener("click", function(){
        callFilter();
    });
}

aspect1Container.addEventListener("click", function(){
    openAspectNav();

    currentAspectContainer = aspect1Container;
});

aspectX1.addEventListener("click", function(){
    closeAspectNav();

    build.hero.aspect1.color = "";
    build.updateAttributes();
    SetAspect1();
});

aspect2Container.addEventListener("click", function(){
    openAspectNav();

    currentAspectContainer = aspect2Container;
});

aspectX2.addEventListener("click", function(){

    closeAspectNav();

    build.hero.aspect2.color = "";
    build.updateAttributes();
    SetAspect2();
});

clearButton.addEventListener("click", function(){
    clearInventory();
});

favorField1.addEventListener("keyup", function(event) {
    if(event.keyCode !== 13) return;
    let value = Number.parseInt(favorField1.value);
    
    if(Number.isNaN(value)){
        favorField1.value = "1";
        value = 1;
    }
    
    else if(value < 0){
        favorField1.value = "0";
        value = 0;
    }

    else{
        build.hero.aspect1.favor = value;
    }
    build.updateAttributes();
        
    updatePage();

    
});

favorField2.addEventListener("keyup", function(event) {
    if(event.keyCode !== 13) return;
    let value = Number.parseInt(favorField2.value);
    
    if(Number.isNaN(value)){
        favorField2.value = "1";
        value = 1;
    }

    else if(value < 0){
        favorField2.value = "0";
        value = 0;
    }
    else{
        build.hero.aspect2.favor = value;
    }

    build.updateAttributes();
        
    updatePage();

    
});

levelValue.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click

        let value = Number.parseInt(levelValue.value);
        
        let isNaN = Number.isNaN(value);
        console.log("VALUE: " + isNaN);
        if(isNaN){
            levelValue.value = "";

            levelValue.value = "1";
            value = 1;

            build.hero.setLevel(value);
            build.updateAttributes();
        
            updatePage();
        }

        else{
            console.log("LEVEL VALUE");
            build.hero.setLevel(value);
            build.updateAttributes();
        
            updatePage();
        }
        
        
    }
  });

  for(let i = 0; i < itemBlocks.length; i++){
    itemBlocks[i].addEventListener("dblclick", function(){
        
        let inventoryContainer = itemBlocks[i];

        let itemIndex = inventoryContainer.getAttribute("itemIndex")

        let index = Number.parseInt(itemIndex);

        let item = build.inventory.items[index];

        if(item !== undefined){
            inventoryContainer.style.backgroundColor = "";
            build.inventory.removeItem(index);
            build.updateAttributes();
            updatePage();
            hideCurrentItemData();
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
    document.getElementById("mySidenav").style.width = "450px";
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
    var cat = this.getElementsByClassName("filter-cat");
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
        
      toggleSigns[0].textContent = "+";
      cat.style.borderBottom = "1px solid rgb(227, 188, 122)";

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
    callFilter();
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

        let color = heroPortraits[i].color;

        heroDiv.appendChild(heroImage);

        heroGrid.appendChild(heroDiv);

        heroImage.addEventListener("click", function(){
            setHeroImage(heroImage.src, heroImage.id);
            heroColor = color

            setHeroStyling();
        });

    }
}

function setHeroStyling(){
    let buildValues = document.getElementsByClassName("buildValue");
    let heroAbilities = document.getElementsByClassName("heroability-block");
    let abilityName = document.getElementById("ability-name");

    for(var i = 0; i < buildValues.length; i++){
        buildValues[i].style.backgroundColor = heroColor;
    }

    for(var i = 0; i < heroAbilities.length; i++){
        console.log(heroAbilities[i].firstChild);
        heroAbilities[i].firstChild.nextSibling.style.borderBottom =
             "1px " + heroColor + " solid";
    }

    abilityName.style.borderBottom = "1px " + heroColor + " solid";
}

function updatePage(){

    levelValue.value = build.hero.level;
    SetAspect1();
    SetAspect2();
    console.log("HERO: " + levelValue.value);

    document.getElementById("favor1").value = build.hero.aspect1.favor;
    document.getElementById("favor2").value = build.hero.aspect2.favor;

    var buildValues = document.getElementsByClassName("buildValue");

    var goldValue = document.getElementById("costValue");

    var goldcost = build.inventory.totalCost();

    goldValue.textContent = goldcost;

    for(var i = 0; i < buildValues.length;i++){
        var attribute = build.attributes[buildValues[i].id]

        var value = attribute.value;

        if(isAttackSpeed(attribute.attributeName)){
            if(value > 2.5){
                value = 2.5;
            }
        }
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

        //Change width
        buildValues[i].style.width = percentageStr;

        value = (Math.round(value * 100)) / 100;

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
        itemBlocks[i].style.backgroundColor = "";

        var imageId = "img" + (i + 1).toString();
        var pId = "p" + (i + 1).toString();

        var image = document.getElementById(imageId);

        var itemText = document.getElementById(pId);
        
        image.src = "";
        itemText.textContent = "";
        
        console.log("LENGTH: " + build.inventory.items.length);

        if(i < build.inventory.items.length){
            console.log("ITEM NAME: " + build.inventory.items[i].name);
        
            block.style.display = "block";

            //CHANGE BACKGROUND COLOR HERE (Note for Kodiris)
            itemBlocks[i].style.backgroundColor = "rgb(24, 24, 24)";

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
                    
                    if(item.parents.length === 0){
                        image.src = orangeItemImage;
                    }
                    else{
                        image.src = baseItemImage;
                    }
                    break;
            }
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
                console.log(theName + ": " + maxValue)
                maxValue += build.returnStatFromHeroLevel(theName);
                console.log(theName + ": " + maxValue)
            } 
        }
        
        if(isAttackSpeed(attributeName)){
            maxValue = 2.5;
        }

        maxValue *= 100;
        maxValue = Math.round(maxValue);
        maxValue /= 100
        
        maxValueElement.textContent = maxValue;


        if(isPercentageValue){
            maxValueElement.textContent += "%";
        }
    }
}

function hideCurrentItemData(){
    var itemView = document.getElementById("itemview-column");
    for(var i = 0; i < statIncrementors.length; i++){
        let incrementor = statIncrementors[i];
        incrementor.textContent = "";
    }
    
    itemView.style.transition = "0s";
    itemView.style.opacity = "0";
}

function displayCurrentItemData(){

    var itemView = document.getElementById("itemview-column");
    let item = CurrentItem();
    let itemName = item.name

    console.log(item.name);
    if(item.name === "none"){
        for(var i = 0; i < statIncrementors.length; i++){
            var incrementor = statIncrementors[i];
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
                        let attribute = attributes[j];
                        var value = attributes[j].value;
    
                        if(value !== 0){

                            if(isPercentAttribute(attribute.attributeName) && value < 1){
                                value *= 100;
                            }

                            if(isAttackSpeed(attribute.attributeName)){
                                console.log("Attack Speed: " + value);
                                
                                value /= 100;

                                let baseAttackSpeed = 1 / build.hero.basicAttack.cooldown;
                                let bonusFromLevel = (build.hero.attackSpeedPerLevel * (build.hero.level - 1)) / 100;
                                
                                let attackSpeedGain = (baseAttackSpeed + bonusFromLevel) * value;
                                value = attackSpeedGain;
                                console.log(baseAttackSpeed);
                                
                            }

                            value *= 100;
                            value = Math.round(value);
                            value /= 100
                            value = Math.abs(value);

                            
    
                            incrementor.textContent = "+" + value;

                            if(isPercentAttribute(attribute.attributeName)){
                                incrementor.textContent += "%"
                            }
                        }
    
                        else{
                            incrementor.textContent = "";
                        }
                    }
                }
                
                itemView.style.transition = "1s";
                itemView.style.opacity = "100";
                console.log("Opacity: " + itemView.style.opacity);
            }
    
            else{
                incrementor.textContent = "";
                itemView.style.transition = "0s";
                itemView.style.opacity = "0";
                
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
            if(item.parents.length === 0){
                img.src = orangeItemImage;
            }
            else{
                img.src = baseItemImage;
            }    
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

function openAspectNav() {
    document.getElementById("myNav").style.width = "305px";
  }

function closeAspectNav() {
    document.getElementById("myNav").style.width = "0%";
  }

function setAspectRed(){
    build.hero[currentAspectContainer.id].color = aspectColors.Red;

    let image = currentAspectContainer.getElementsByTagName("img")[0];
    image.src = "https://cdn.jsdelivr.net/gh/FHN-Kodiris/FHN-WEBFLOW_HEROBUILDERimages/red-aspect.png";

    var selectText = currentAspectContainer.getElementsByTagName("div")[0];
    selectText.style.display = "none";

    console.log(build.hero[currentAspectContainer.id].color);

    build.updateAttributes();
    updatePage()
    closeAspectNav();
}

function SetAspect1(){
    let image = aspect1Container.getElementsByTagName("img")[0];

    switch (build.hero.aspect1.color){
        case aspectColors.Blue:
            image.src = "https://cdn.jsdelivr.net/gh/FHN-Kodiris/FHN-WEBFLOW_HEROBUILDERimages/blue-aspect.png";
            break;
        case aspectColors.Red:
            image.src = "https://cdn.jsdelivr.net/gh/FHN-Kodiris/FHN-WEBFLOW_HEROBUILDERimages/red-aspect.png";
            break;
        case aspectColors.Green:
            image.src = "https://cdn.jsdelivr.net/gh/FHN-Kodiris/FHN-WEBFLOW_HEROBUILDERimages/green-aspect.png";
            break;
        case aspectColors.White:
            image.src = "https://cdn.jsdelivr.net/gh/FHN-Kodiris/FHN-WEBFLOW_HEROBUILDERimages/white-aspect.png";
            break;
        case aspectColors.Black:
            image.src = "https://cdn.jsdelivr.net/gh/FHN-Kodiris/FHN-WEBFLOW_HEROBUILDERimages/purple-aspect.png";
            break;
        default:
            image.src = "";
            var selectText = aspect1Container.getElementsByTagName("div")[0];
            selectText.style.display = "block";
    }
}
function SetAspect2(){
    let image = aspect2Container.getElementsByTagName("img")[0];

    switch (build.hero.aspect2.color){
        case aspectColors.Blue:
            image.src = "https://cdn.jsdelivr.net/gh/FHN-Kodiris/FHN-WEBFLOW_HEROBUILDERimages/blue-aspect.png";
            break;
        case aspectColors.Red:
            image.src = "https://cdn.jsdelivr.net/gh/FHN-Kodiris/FHN-WEBFLOW_HEROBUILDERimages/red-aspect.png";
            break;
        case aspectColors.Green:
            image.src = "https://cdn.jsdelivr.net/gh/FHN-Kodiris/FHN-WEBFLOW_HEROBUILDERimages/green-aspect.png";
            break;
        case aspectColors.White:
            image.src = "https://cdn.jsdelivr.net/gh/FHN-Kodiris/FHN-WEBFLOW_HEROBUILDERimages/white-aspect.png";
            break;
        case aspectColors.Black:
            image.src = "https://cdn.jsdelivr.net/gh/FHN-Kodiris/FHN-WEBFLOW_HEROBUILDERimages/purple-aspect.png";
            break;
        default:
            image.src = "";
            var selectText = aspect2Container.getElementsByTagName("div")[0];
            selectText.style.display = "block";
    }
}

function setAspectBlue(){
    build.hero[currentAspectContainer.id].color = aspectColors.Blue;

    let image = currentAspectContainer.getElementsByTagName("img")[0];
    image.src = "https://cdn.jsdelivr.net/gh/FHN-Kodiris/FHN-WEBFLOW_HEROBUILDERimages/blue-aspect.png";

    var selectText = currentAspectContainer.getElementsByTagName("div")[0];
    selectText.style.display = "none";

    build.updateAttributes();
    updatePage()
    closeAspectNav();
}

function setAspectGreen(){
    build.hero[currentAspectContainer.id].color = aspectColors.Green;

    let image = currentAspectContainer.getElementsByTagName("img")[0];
    image.src = "https://cdn.jsdelivr.net/gh/FHN-Kodiris/FHN-WEBFLOW_HEROBUILDERimages/green-aspect.png";

    var selectText = currentAspectContainer.getElementsByTagName("div")[0];
    selectText.style.display = "none";

    build.updateAttributes();
    updatePage()
    closeAspectNav();
}

function setAspectPurple(){
    build.hero[currentAspectContainer.id].color = aspectColors.Black;

    let image = currentAspectContainer.getElementsByTagName("img")[0];
    image.src = "https://cdn.jsdelivr.net/gh/FHN-Kodiris/FHN-WEBFLOW_HEROBUILDERimages/purple-aspect.png";

    var selectText = currentAspectContainer.getElementsByTagName("div")[0];
    selectText.style.display = "none";

    build.updateAttributes();
    updatePage()
    closeAspectNav();
}

function setAspectWhite(){
    build.hero[currentAspectContainer.id].color = aspectColors.White;

    let image = currentAspectContainer.getElementsByTagName("img")[0];
    image.src = "https://cdn.jsdelivr.net/gh/FHN-Kodiris/FHN-WEBFLOW_HEROBUILDERimages/white-aspect.png";

    var selectText = currentAspectContainer.getElementsByTagName("div")[0];
    selectText.style.display = "none";

    build.updateAttributes();
    updatePage()
    closeAspectNav();
}

function incrementFavor1(){
    build.hero.aspect1.favor++;

    build.updateAttributes();
    updatePage();   
}

function decrementFavor1(){
    if(build.hero.aspect1.favor <= 0){
        build.hero.aspect1.favor = 0;
    }
    else{
        build.hero.aspect1.favor--;
    }
    
    
    build.updateAttributes();
    updatePage();
}

function incrementFavor2(){
    build.hero.aspect2.favor++;

    console.log(build.hero.aspect2.favor);
    
    build.updateAttributes();
    updatePage();
}

function decrementFavor2(){
    if(build.hero.aspect2.favor <= 0){
        build.hero.aspect2.favor = 0;

    }

    else{
        build.hero.aspect2.favor--;
    }

    build.updateAttributes();
    updatePage();
}

function callFilter(){
    var theSearch = callSearch(itemSearch.value)

    var filters = [];
    
    var checkBoxes = filterContainer.getElementsByClassName("checkmark");

    for(var i = 0; i< checkBoxes.length; i++){
        var checkBox = checkBoxes[i].previousElementSibling;
        if(checkBox.checked){
            let attribute = checkBox.getAttribute("attribute")

            filters.push(attributeNames[attribute]);
        }
    }

    var theFilter = filterItems(filters, theSearch);

    view.display(theFilter);
}

function closeAbilityNav(){
    var abilityOverlay = document.getElementsByClassName("ability-overlay")[0];

    abilityOverlay.style.width = "0%";
}