function getHeroDetails(heroName, callback){
    let mainText = "";

    let hero = new Hero();
    hero.name = heroName;
    
    var url = "https://api.playfault.com/heroData/" + heroName;
    
    var doc = new XMLHttpRequest();
    
    doc.open('GET', url, true);

    doc.onload = function(){
        let status = doc.status;

        if(status = 200){
            var response = JSON.parse(doc.responseText);

            for(var i in response){
                if(typeof response[i] === "number"){

                    let realName = i;

                    if(realName === undefined){
                      realName = i;
                    }

                    let attribute = new Attribute(realName);

                    attribute.value = response[i];

                    hero.attributes.push(attribute);
                    
                }
              
            }
            callback(hero);
            
        }
        else{
            console.log("ERROR")
        }
    };


    doc.send();
}

function returnHeroPortraitList(){

  var heroData = Object.entries(Heroes);

  var portraits = [];
  
  console.log("Trying to Return All heroes: " + heroData[13][1][1]);

  var baseURL = "https://api.playfault.com/imagecdn/portraits/";
  var fileType = ".jpg"

  for(var i = 0; i < heroData.length; i++){
    var heroNumber = heroData[i][1][0];
    var heroName = heroData[i][1][1];

    var fullURL = baseURL + heroNumber.toString() + fileType;
    
    var portrait = new HeroPortrait(fullURL, heroName);

    portraits.push(portrait);
  }

  return portraits;
}

function returnAllItems(callback){

  console.log("RETURNING ALL ITEMS...");
  let itemsDictionary = {};
  var xmlHttp = new XMLHttpRequest();
  
  var url = 'https://api.playfault.com/items/';

  xmlHttp.onreadystatechange = () => {

    if(xmlHttp.readyState === 4){
      if(xmlHttp.status === 200){

        var itemResponse = JSON.parse(xmlHttp.responseText);
        
        for(var i in itemResponse){
          let item = new Item();

          item.id = i;
          item.name = itemResponse[i]['name'];

          var parents = itemResponse[i]['parents']
          for (var parent in parents){
                
            var nextParentItem = itemResponse[i]['parents'][parent]
            item.parents.push(nextParentItem);
          }

          var children = itemResponse[i]['children'];
              
          for (var child in children){
            
            var nextChildItem = itemResponse[i]['children'][child]
            item.children.push(nextChildItem);
          }

          var attributes = itemResponse[i]['attributes'];
              
          for(var attribute in attributes){
            let attr = new Attribute();


            attr.attributeName = attributeNames[itemResponse[i]['attributes'][attribute]['AttributeName']];
            attr.value = itemResponse[i]['attributes'][attribute]['Value'];
            attr.rankValue = itemResponse[i]['attributes'][attribute]['RankValue'];
            attr.details = itemResponse[i]['attributes'][attribute]['UIDetails'];

            item.attributes.push(attr);
          }

          var passive = itemResponse[i]['passive'];
          var active = itemResponse[i]['active'];
          var cost = itemResponse[i]['cost'];
          var color = itemResponse[i]['color'];

          item.passive = passive;
          item.active = active;
          item.cost = cost;
          item.color = color;

          itemsDictionary[item.name] = item;

        }
      }

      callback(itemsDictionary);
    }

    
  };

    xmlHttp.open('GET', url, true);
    xmlHttp.send(null);
}

function returnItem(itemName, callback) {
    var xmlHttp = new XMLHttpRequest();
    //xmlHttp.responseType = 'json';
    var url = 'https://api.playfault.com/items/';

    var item = new Item();

    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) {
          //console.log(xmlHttp.response);
          var itemResponse = JSON.parse(xmlHttp.responseText);
          // itmes have assigned numbres that in theory won't change, eg SI Boots = item 1
          // console.log(itemResponse[1]) // prints first item - SI Boots
          // within each item, descriptions are always in the same order, first level list is
          // name, parents, children, treeId, attributes, passive, active, cost, color
          // console.log(Object.keys(itemResponse[1]))    // prints keys in first item
          // loop through and save each item, will need nested loops as well

          for (var i in itemResponse){

            if (itemResponse[i]['name'] === itemName){
              
              item.id = i;
              console.log("Item id: " + item.id);
                
              console.log("You are looking fore details about " + itemName)
              // name is a single string
              var name = itemResponse[i]['name']
              console.log("CURRENT ITEM IS = "+name)
  
              item.name = name;
              // parents is a list of numbers for what it can be built into, will be empty at top of list 
              var parents = itemResponse[i]['parents']
              

              console.log("Has parents: "+parents)
              for (var parent in parents){
                
                var nextParentItem = itemResponse[i]['parents'][parent]
                item.parents.push(nextParentItem);
              }
  

              // children is list of numbers for what builds into this, will generally be a single number
              console.log("Has Children: "+children)
              var children = itemResponse[i]['children'];
              
              for (var child in children){
                
                var nextChildItem = itemResponse[i]['children'][child]
                item.children.push(nextChildItem);
              }

              // treeId is a unique ID for the skill tree related to the highest level item 
              var treeId = itemResponse[i]['treeId'];
              console.log("Tree ID= "+treeId)
  
              
              // attributes - can have multiple lists within giving item information
                // attribute fields are AttributeName, Value, RankValule, UIDetails
              var attributes = itemResponse[i]['attributes'];
              
              for(var attribute in attributes){
                let attr = new Attribute();


                attr.attributeName = attributeNames[itemResponse[i]['attributes'][attribute]['AttributeName']];
                attr.value = itemResponse[i]['attributes'][attribute]['Value'];
                attr.rankValue = itemResponse[i]['attributes'][attribute]['RankValue'];
                attr.details = itemResponse[i]['attributes'][attribute]['UIDetails'];

                item.attributes.push(attr);
              }
              
              //console.log[attrNames]
              // passive, active, cost, color are descriptions of that item
              var passive = itemResponse[i]['passive']
              var active = itemResponse[i]['active']
              var cost = itemResponse[i]['cost']
              var color = itemResponse[i]['color']
              console.log("Passive: "+passive, "Acitve: "+active, "Cost: "+cost, "Color: "+color) 
              
              item.passive = passive;
              item.active = active;
              item.cost = cost;
              item.color = color;

              callback(item);
              
            }
                 
          }
        } else {
          console.log(xmlHttp.response);
        }
      }
    };
    xmlHttp.open('GET', url, true);
    xmlHttp.send(null);
  }


