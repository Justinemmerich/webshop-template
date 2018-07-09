var filter = {};

var template = {
    categories: [],
    pricestart: undefined,
    priceend: undefined,
    text:'',
};

//call on init
restoreFromCookie ();

function restoreFromCookie () {
    var cookie_filter = getCookie('filter');
    console.log('cookie_filter',cookie_filter);
    filter = cookie_filter === "none" ? template: JSON.parse(cookie_filter);
    setFilter(filter);
}

function clearFilter(){
    filter = [];
    filter = template;
    console.log('clearde filter', filter);
    saveFilter();
}

function getFilter(){
    return filter;
}

function setFilter(_filter){
    filter = _filter;
    saveFilter();
}

function saveFilter(){
    setCookie('filter', JSON.stringify(filter), 365);
}

function addCategorieFilter(itemsarray){
    var filterarray = itemsarray.split(" ");
    filterarray.forEach(function(element) {
        console.log('add filter', element);
        filter.categories.push(element);
      });
      saveFilter();
}

function removeCategorieFilter(itemsarray){
    console.log('remove', itemsarray)

    var filterarray = itemsarray.split(" ");
    filterarray.forEach(function(element) {
        var index = filter.categories.indexOf(element);
        console.log('remove filter', element, index);
        filter.categories.splice(index, 1);
      });
      saveFilter();
}