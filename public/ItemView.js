class ItemView{
    constructor(view){
        this.view = view;
        this.columnCount = 4;

        this.itemRowViews = [];
        this.itemContainers = []
    }

    //random comment
    display(itemsToDisplay){
        this.clear();

        for(var i = 0; i < itemsToDisplay.length; i++){

            var itemContainer = this.itemContainers[i];
            var item = itemsToDisplay[i];

            itemContainer.setName(item.name);
            itemContainer.setImage(item);

            this.append(itemContainer);
        } 
    }

    initialize(count){

        this.clear();

        console.log("Length of array: " + count);
    
        var rows = count / this.columnCount;
    
        rows = Math.ceil(rows);

        for(var i = 0; i < count; i++){
            this.itemContainers[i] = newItemContainer();
        }
    
    }

    append(itemContainer){
        this.view.appendChild(itemContainer.container);
    }

    clear(){
        this.view.innerHTML = "";
    }
}