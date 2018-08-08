categories = [];
categorieplaceholder = [{
    name:'Kategorie Holt/Metal',
    image:'img/product/1.jpg',
    filter:'Holz Metal',
},
{
    name:'Kategorie Holz',
    image:'img/product/1.jpg',
    filter:'Holz',
},
{
    name:'Kategorie Metal',
    image:'img/product/1.jpg',
    filter:'Metal',
},
{
    name:'Kategorie Kaugummi',
    image:'img/product/1.jpg',
    filter:'Kaugummi',
},
{
    name:'Kategorie Holz Metal',
    image:'img/product/1.jpg',
    filter:'Holz Metal',
},{
    name:'Kategorie Holz Metal',
    image:'img/product/1.jpg',
    filter:'Holz Metal',
},{
    name:'Kategorie Holz Metal',
    image:'img/product/1.jpg',
    filter:'Holz Metal',
},{
    name:'Kategorie Holz Metal',
    image:'img/product/1.jpg',
    filter:'Holz Metal',
},{
    name:'Kategorie Holz Metal',
    image:'img/product/1.jpg',
    filter:'Holz Metal',
},
];

function initCategoriesPage () {
    loadCategoriePage();
    renderCategoriePage();
}

function loadCategoriePage () {
    //TODO replace with request
    categories = categorieplaceholder;
    
}

function renderCategoriePage () {

    // clear all products
    document.getElementById('product-list').innerHTML = '';

    // render all product carts
    for (var i = 0; i < categories.length; i++ ){


    //TODO remove single-product href # with / in live (Webserver config for seo)
    var div = document.createElement('div');
    div.className = "col-lg-3 col-md-4 col-sm-4 col-xs-12";
    div.style.opacity = 0;
    div.innerHTML = '   <div class="single-product categorie-slide" data-filter="'+categories[i].filter+'">\
                        <div class="product-info clearfix text-center">\
                        <div class="fix">\
                        <h4 class="post-title"><a onclick="setCategorieFilter(this)">'+categories[i].name+'</a></h4>\
                        </div>\
                        <div class="fix">\
                        <div class="product-img">\
                        <a onclick="setCategorieFilter(this)"><img src="'+categories[i].image+'" alt="" /></a>\
                        </div>\
                        </div>\
                        </div>\
                        </div>';
        document.getElementById('product-list').appendChild(div);

        // console.log('animate')
         div.velocity({ opacity: 1 },2500);
        // div.velocity({ opacity: 0.5 },300);
        // div.velocity({ opacity: 1 },500);

    } // End for-loop

}

function setCategorieFilter(element) {
        clearFilter();
        var filterstring = element.parentElement.parentElement.parentElement.parentElement.getAttribute('data-filter');
        addCategorieFilter(filterstring);

        // route to next page
        window.location.href = '/shop.html';
}