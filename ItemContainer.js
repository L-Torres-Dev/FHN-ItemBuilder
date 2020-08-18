var baseItemImage = "images/white_item_r.png";
var redItemImage = "images/red_item_r.png"
var blueItemImage = "images/blue_item_r.png";
var greenItemImage = "images/green_item_r.png";
var purpleItemImage = "images/purple_item_r.png";
var whiteItemImage = "images/white_item_r.png";

class ItemContainer{
    constructor(container, itemName, image){
        this.container = container;
        this.itemName = itemName;
        this.image = image;


        this.container.addEventListener("dblclick", function(event){
            addItemToBuild(itemName.textContent);
        });

        this.container.addEventListener("click", function(){
            var item = returnItem(itemName.textContent);

            setCurrentItem(item);
            displayCurrentItemData();
        });
    }

    setName(name){
        this.itemName.textContent = name;
    }

    setImage(color){
        switch(color){
            case aspectColors.Blue:
                this.image.src = blueItemImage;
                break;
            case aspectColors.Black:
                this.image.src = purpleItemImage;
                break;
            case aspectColors.Red:
                this.image.src = redItemImage;
                break;
            case aspectColors.Green:
                this.image.src = greenItemImage;
                break;
            case aspectColors.White:
                this.image.src = whiteItemImage;
                break;
            default:
                this.image.src = baseItemImage;
                break;
        }
    }    
}

function newItemContainer(){

    var itemContainer = document.createElement("div")
    itemContainer.className = "itemblock-container"
    var itemBlock = document.createElement("div");
    itemBlock.className = "item-block";
    var itemName = document.createElement("p");
    var image = document.createElement("img");

    image.src = baseItemImage;
    itemName.textContent = "item Name";



    itemContainer.appendChild(image);
    itemContainer.appendChild(itemBlock);
    itemBlock.appendChild(itemName);

    var newContainer = new ItemContainer(itemContainer, itemName, image, itemBlock);

    return newContainer;

}