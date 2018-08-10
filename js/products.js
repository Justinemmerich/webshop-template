var products = [];
var categories = [];
var filter;
var categorymenu_expanded = false;

// gets called after page loaded
function initProducts(){
    loadProducts();
    renderProducts();
    loadCategories();
}

function loadCategories() {
    // TODO replace with Backend Query
    categories = [];
    categories.push('Holz');
    categories.push('Metall');
    categories.push('Kaugummi');

    //set filter current filter label
    //document.getElementsByClassName('product-option')[0].getElementsByClassName('option-btn')[0].innerHTML = 'Kategorie ( '+ filter.categorie +' )';
    renderCategories();
}

function renderCategories(){
    //clear list
    document.getElementById('cat-treeview').querySelector('ul').innerHTML = '';

    //draw filter 
    filter = getFilter();

    console.log('render');
    //draw filter 
    filter = getFilter();

    // render all categories
    for (var i = 0; i < categories.length; i++ ){
        var checked = null;
        checked = new RegExp(filter.categories.join('|')).test(categories[i]);
        console.log('cat ' + categories[i]+ ' checked = ', checked);

        var li = document.createElement('li');
        if (checked == true && filter.categories.length !== 0){
            li.innerHTML = '<span><input id="categorie-'+categories[i]+'" data-categorie="'+categories[i]+'" type="checkbox" onchange="setCategorieFilter(this)" checked="'+checked+'"/>'+categories[i]+'</span>';
        } else {
            li.innerHTML = '<span><input id="categorie-'+categories[i]+'" data-categorie="'+categories[i]+'" type="checkbox" onchange="setCategorieFilter(this)" />'+categories[i]+'</span>';     
        }
        document.getElementById('cat-treeview').querySelector('ul').appendChild(li);
   

    } // End for-loop
}

// überarbeiten mit Checkbox
function setCategorieFilter(element){
    console.log('cat changed to checked = ', !element.getAttribute('checked'));

    var check = !element.getAttribute('checked');
    var filtesettings = element.getAttribute('data-categorie');

    if (check === true){
        addCategorieFilter(filtesettings);
        console.log('Filter', filtesettings);
    } else {
        removeCategorieFilter(filtesettings);
    }
    console.log('Filter', filtesettings);
    //reload filter 
    filter = getFilter();

    //set categorie button
    //element.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('button').innerHTML = 'Kategorie ( '+ filter.categorie +' )';

    //toggle categorie button to close
    //element.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('button').click();

    //render categories
    renderCategories();

    //rerender products
    renderProducts();
}

function setTextFilter(event){
    console.log('Filter', filter);
    console.log('event', event.keyCode);

    // wait until the user been finished typing
    if (event.keyCode === 13){

        filter.text = event.target.value;
        console.log('Filter', filter);

        if (filter.text !== ''){
            event.target.parentElement.parentElement.parentElement.parentElement.querySelector('button').innerHTML = '<i class="zmdi zmdi-search"> ( '+ filter.text +' )';
        }
        else{
            event.target.parentElement.parentElement.parentElement.parentElement.querySelector('button').innerHTML = '<i class="zmdi zmdi-search">';
        }

         //toggle categorie button to close
         console.log(event.target.parentElement.parentElement.parentElement.parentElement)
         event.target.parentElement.parentElement.parentElement.parentElement.querySelectorAll('button')[0].click();

        //rerender products
        renderProducts(); 

    }

    function setPriceFilter(start, end){
            console.log('set price', start, end);
    }

    //set categorie button
    //element.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('button').innerHTML = 'Kategorie ( '+ filter.categorie +' )';

    //toggle categorie button to close
    //element.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('button').click(); 
}

function loadProducts() {
    // TODO replace Items with Backend Query
    products = [
        {
            itemId:'001',
            images:['6.jpg'],
            seoname:'name-aus-holz',
            productname: 'Name aus Holz',
            price:12.90,
            hasIndividualisation: true,
            individualisationfields:[{
                placeholder:"Tobias",
                extention:"",
                font:true,
            },{
                placeholder:"12:32Uhr",
                extention:undefined,
                font:true,
            }],
            label:'20%',
            discount_price:10.32,
            en:{
                productname: 'Name in Wood',
                categories:'Wood',
                description: 'description englisch hier Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
                description_big: 'description long Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
                information: 'Information englisch Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
            },
            de:{
                productname: 'Name aus Holz',
                categories:'Holz',
                description: 'Beschreibung hier Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
                description_big: 'Beschreibung hier Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
                information: 'Information hier Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
            }
        },
        {
            itemId:'002',
            images:['6.jpg'],
            productname: 'Schlüsselanhänger Gravur',
            seoname:'schluesselanhaenger-gravur',
            price:17.45,
            categories:'Metall',
            label:'Mega',
        },
        {
            itemId:'003',
            images:['6.jpg'],
            productname: 'Holz & Metall',
            seoname:'holz-und--metall',
            price:1000.45,
            categories:'Metall',
            label:'Aktion',
        },
        {
            itemId:'004',
            images:['6.jpg'],
            productname: 'Holz & Metall',
            seoname:'holz-und--metall',
            price:1000.45,
            categories:'Metall Holz',
        },
        {
            itemId:'005',
            images:['6.jpg'],
            productname: 'Holz & Metall',
            seoname:'holz-und--metall',
            price:5.00,
            categories:'Metall Holz',
        },
        {
            itemId:'006',
            images:['6.jpg'],
            productname: 'Metall & Kaugummi',
            seoname:'holz-und--metall',
            price:4.99,
            categories:'Metall Kaugummi',
        },
    ]
}

// load product Items form backend and render cards
// TODO add filter attribute
function renderProducts(){

    //draw filter 
    filter = getFilter();

    // set all products initial 
    var filtered_products = null;

    console.log('filterfromrender', filter);
    // categorie filter
    if (filter.categories.length !== 0 || filter.categories !== undefined){
        filtered_products = products.filter(function (product) {
            console.log('regex',new RegExp(filter.categories.join('|')).test(product.categories))
            return new RegExp(filter.categories.join('|')).test(product.categories);
        });
    }

    console.log('filtered_products', filtered_products)
    
    //text filter
    if (filter.text !== '' || filter.text !== undefined){
        filtered_products = products.filter(function (product) {
            if (product.productname.toUpperCase().indexOf(filter.text.toUpperCase()) > -1){
                return true;
            }else{
                return false;
            }
        });
    }


    console.log(document.getElementsByClassName('showing')[0].querySelector);

    //clear results counter 
    document.getElementsByClassName('showing')[0].querySelector('p').innerHTML= '';

    // clear all products
    document.getElementById('product-list').innerHTML = '';


    // render all product carts
    for (var i = 0; i < filtered_products.length; i++ ){

    var hasLabel = filtered_products[i].label !== undefined? 'block': 'none';

    //TODO remove single-product href # with / in live (Webserver config for seo)
    var div = document.createElement('div');
    div.className = "col-lg-3 col-md-4 col-sm-4 col-xs-12";
    div.style.opacity = 0;
    div.innerHTML = '   <div class="single-product">\
                        <div class="product-img">\
                        <span style="display:'+hasLabel+'" class="pro-label new-label"><span class="text-label">'+filtered_products[i].label+'</span></span>\
                        <span class="pro-price-2">'+filtered_products[i].price.toLocaleString('de-DE', {maximumFractionDigits: 2, minimumFractionDigits: 2, minimumIntegerDigits:1 })+' €</span>\
                        <a href="single-product.html#'+filtered_products[i].itemId+'#'+filtered_products[i].seoname+'"><img data-filename="'+filtered_products[i].images[0]+'" src="img/product/'+filtered_products[i].images[0]+'" alt="" /></a>\
                        </div>\
                        <div class="product-info clearfix text-center">\
                        <div class="fix">\
                        <h4 class="post-title"><a href="/">'+filtered_products[i].productname+'</a></h4>\
                        </div>\
                        <div class="fix">\
                        <span class="pro-rating">\
                        #<a>'+filtered_products[i].itemId+'</a>\
                        </span>\
                        </div>\
                        <div class="product-action clearfix">\
                        <a href="single-product.html#'+filtered_products[i].itemId+'#'+filtered_products[i].seoname+'" data-i18n="productdetails" data-placement="top"> Details zum Produkt</i></a>\
                        </div>\
                        </div>\
                        </div>';
        document.getElementById('product-list').appendChild(div);

        // console.log('animate')
         div.velocity({ opacity: 1 },2500);
        // div.velocity({ opacity: 0.5 },300);
        // div.velocity({ opacity: 1 },500);

    } // End for-loop

    // Set Showing results text
    document.getElementsByClassName('showing')[0].querySelector('p').innerHTML= $.i18n( 'showing' ) + ' ' +filtered_products.length+ ' ' + $.i18n( 'oftotal' ) + ' ' +products.length+ ' ' + $.i18n( 'items' );
    document.getElementsByClassName('showing_xs')[0].querySelector('p').innerHTML= '' +filtered_products.length+ ' / ' +products.length+ ' ' + $.i18n( 'items' );

    renderCategories();

}

function addTest(item) {
 
    var id = item.getElementsByClassName('pro-rating')[0].querySelector('a').innerHTML;
    var quantity = 1; //TODO ADD ELEMENT TO HTML ITEM

    var product = products.find(function(element) {
        return element.itemId === id;
      });
    
    console.log(product)

    console.log('add Item', product.id, product.image, product.name, product.price, product.quantity)
    addItemtoShoppingCart(product.itemId, product.images[0], product.productname, product.price, quantity, product.hasIndividualisation, '')
}

function categoriemenutoggle() {
    categorymenu_expanded = !categorymenu_expanded;

    if(categorymenu_expanded === true){
        document.getElementById("categorymenubutton").setAttribute('data-i18n', 'collapse');
        document.getElementById("categorymenubutton").innerHTML= '' + $.i18n( 'collapse' ) + '<i  style="font-size:1.8rem" class="zmdi zmdi-caret-up"></i>';
      
        document.getElementById("categorymenu-slider").velocity({ opacity: 0 },750);
        document.getElementById("categorymenu-slider").style.display = 'none';

        document.getElementById("categorymenu-expanded").style.opacity = 0;
        document.getElementById("categorymenu-expanded").style.display = 'block';
        document.getElementById("categorymenu-expanded").velocity({ opacity: 1 },750);
    } else{
        document.getElementById("categorymenubutton").setAttribute('data-i18n', 'expand');
        document.getElementById("categorymenubutton").innerHTML= '' + $.i18n( 'expand' ) + '<i  style="font-size:1.8rem" class="zmdi zmdi-caret-down"></i>';

        document.getElementById("categorymenu-expanded").velocity({ opacity: 0 },750);
        document.getElementById("categorymenu-expanded").style.display = 'none';
        
        document.getElementById("categorymenu-slider").style.opacity = 0;
        document.getElementById("categorymenu-slider").style.display = 'block';
        document.getElementById("categorymenu-slider").velocity({ opacity: 1 },750);
    }

}

function onCategoriemenuclick(element) {
    clearFilter();
    var filterstring = element.getAttribute('data-filter');
    addCategorieFilter(filterstring);
    renderCategories();
    //rerender products
    renderProducts();
}

