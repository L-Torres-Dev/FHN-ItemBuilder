class ItemRowView{
    constructor(itemRowView){
        this.view = itemRowView;
        this.itemContainers = [];
    }

    append(itemContainer){
        this.view.appendChild(itemContainer.div)
    }

    clear(){
        while(this.view.firstChild){
            this.view.removeChild(this.view.firstChild);
        }

        this.itemContainers = [];
    }
}    