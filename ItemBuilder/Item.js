class Item{
    constructor(){
        this.id = 0;
        this.name = "none";
        this.parents = [];
        this.children = [];
        this.attributes = [];
        this.passive = "";
        this.active = "";
        this.cost = 0;
        this.color = "none"

    }

    isBoots(){
        return bootNames.includes(this.name);
    }
}

function printItemInfo(item){

    console.log("\n\n\n");
    console.log("This is the callback function: ");
    
    console.log(`Item name: ${item.name}`);

    for(var i in item.parents){
        console.log(`Item parent: ${item.parents[i]}`);
    }

    for(var i in item.children){
        console.log(`Item child: ${item.children[i]}`);
    }

    for(var i in item.attributes){
        console.log(`Attribute Name: ${item.attributes[i].attributeName}`);
        console.log(`Attribute Value: ${item.attributes[i].value}`);
        console.log(`Attribute Rank Value: ${item.attributes[i].rankValue}`);
        console.log(`Attribute Details: ${item.attributes[i].details}`);

        console.log("\n");
    }

    console.log(`Item Passive: ${item.passive}`)
    console.log(`Item Active: ${item.active}`)
    console.log(`Item Cost: ${item.cost}`)
    console.log(`Item Color: ${item.color}`)
    
}

const bootNames = [
    "S.I. Boots",
    "Energy Treads",
    "Shade's Steps",
    "Inertia Wraps",
    "Boots of Haste",
    "Warlock's Wares",
    "Boots of the Hunt"
]