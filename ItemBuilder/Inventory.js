class Inventory{
    constructor(){
        this.items = [];
        }

    addItem(item){

        if(this.items.length < 6){
            this.items.push(item);
        }
        else{
            console.log("ERROR: too many items");
        }
    }

    removeItem(index){
        if(this.items.length > 0){
            this.items.splice(index, 1);
        }
    }

    count(){
        return this.items.length;
    }

    totalCost(){
        var totalCost = 0;

        for(var i = 0; i < this.items.length; i++){
            totalCost += this.items[i].cost;
        }

        return totalCost;
    }
}
