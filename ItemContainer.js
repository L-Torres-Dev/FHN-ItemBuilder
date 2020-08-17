var baseItemImage = "https://global-uploads.webflow.com/5d44771a95c1f5121689f944/5e7ffb88dc54456d13efd247_FaultLogo_3D-logoonly.svg";
var redItemImage = "https://uploads-ssl.webflow.com/5e4dd70c09d48fd33df2de2f/5f33417f8a25f182a4e6a517_item_red.svg"
var blueItemImage = "https://uploads-ssl.webflow.com/5e4dd70c09d48fd33df2de2f/5f33417f8a25f114cde6a516_item_blue.svg";
var greenItemImage = "https://uploads-ssl.webflow.com/5e4dd70c09d48fd33df2de2f/5f33417f01a1dc6c15211569_item_green.svg";
var purpleItemImage = "https://uploads-ssl.webflow.com/5e4dd70c09d48fd33df2de2f/5f33417fe8e7468b5f73c01f_item_black.svg";
var whiteItemImage = "https://uploads-ssl.webflow.com/5e4dd70c09d48fd33df2de2f/5f33417f15c71c9b2ba53bad_item_white.svg";

class ItemContainer{
    constructor(container, itemName, image){
        this.container = container;
        this.itemName = itemName;
        this.image = image;


        this.container.addEventListener("dblclick", function(event){
            addItemToBuild(itemName.textContent);
        });

        this.container.addEventListener("click", function(){
            setCurrentItem(itemsDictionary[itemName]);
            updateStatIncrementors();
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