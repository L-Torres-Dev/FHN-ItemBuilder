function searchItems(search, items){
    var searchResults = [];
    
    search = search.replace(/[^a-zA-Z0-9 ]/g, "");
    search = search.toLowerCase();

    var index = 0;
    for(var [key, value] of Object.entries(items)){
        //using regex to filter out certain characters in the search. (May expand upon this concept later)
        var itemName = value.name.replace(/[^a-zA-Z0-9 ]/g, "");

        if(itemName.toLowerCase().startsWith(search, 0)){
            searchResults[index] = value;
            index++;
        }
    }
    
    searchResults.sort(function(a, b){return (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1})

    return searchResults;
    
}