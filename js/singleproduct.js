var products = [
    {
        itemId:'001',
        images:['6.jpg'],
        productname: 'Name aus Holz',
        seoname:'name-aus-holz',
        price:12.90,
        categories:'Holz',
        hasIndividualisation: true,
        description: 'Beschreibung hier Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
        description_big: 'Beschreibung hier Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
        information: 'Information hier Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
    },
    {
        itemId:'002',
        images:['1.jpg','key_2.jpg'],
        productname: 'Schlüsselanhänger Gravur',
        seoname:'schluesselanhaenger-gravur',
        price:17.45,
        categories:'Metall',
        description: 'Beschreibung hier Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
        description_big: 'Beschreibung hier Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
        information: 'Information hier Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
    },
    {
        itemId:'003',
        images:['6.jpg'],
        productname: 'Holz & Metall - no individual',
        seoname:'holz-und--metall',
        price:1000.45,
        categories:'Metall',
        hasIndividualisation: false,
        description: 'Beschreibung hier Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
        description_big: 'Beschreibung hier Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
        information: 'Information hier Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
    },
    {
        itemId:'003',
        images:['6.jpg'],
        productname: 'Holz & Metall',
        seoname:'holz-und--metall',
        price:1000.45,
        categories:'Metall Holz',
        hasIndividualisation: true,
        description: 'Beschreibung hier Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
        description_big: 'Beschreibung hier Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
        information: 'Information hier Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
    },
];

var singleproduct;

function initSingleProduct(){
   var splitted_url = window.location.toString().split("#");
   var itemId = splitted_url[1];
   console.log(itemId)

    itemId? loadSingleProduct(itemId) : window.location.href = "/shop.html";
}

function loadSingleProduct(itemId){

    //TODO replace with request
    singleproduct = products.find(function(element) {
        return element.itemId === itemId;
      });
      
    renderSingleProduct()
}

function renderSingleProduct() {
    var display = singleproduct.hasIndividualisation === true ? 'block': 'none';
    //console.log(document.getElementsByClassName('pro-description')[0])
    document.getElementsByClassName('heading-banner-title')[0].querySelector('h2').innerHTML = singleproduct.productname;
    document.getElementsByClassName('post-title')[0].innerHTML = singleproduct.productname;
    document.getElementsByClassName('pro-description')[0].querySelector('h3').innerHTML = singleproduct.productname;
    document.getElementsByClassName('pro-price')[0].innerHTML = singleproduct.price.toLocaleString('de-DE', { minimumFractionDigits: 2, minimumIntegerDigits:2 }) + ' €';
    document.getElementsByClassName('product-description')[0].querySelector('p').innerHTML = singleproduct.description;
    document.getElementsByClassName('pro-description')[0].querySelector('p').innerHTML = singleproduct.description_big;
    document.getElementsByClassName('pro-information')[0].querySelector('p').innerHTML = singleproduct.information;

    // if item has no Individualisation hide element
    if (singleproduct.hasIndividualisation === false){
        document.getElementsByClassName('individualisation')[0].style.display = "none";
    }

    //clear slider images
    //document.getElementsByClassName('slider-nav')[1].innerHTML = '';

    //add all photos to slider
    for(var i = 0; i < singleproduct.images.length; i++){
       $('.slider-nav').slick('slickAdd','<div> <img src="img/single-product/small/'+singleproduct.images[i]+'" alt="" /> </div>');
       $('.slider-for').slick('slickAdd','<div><img src="img/single-product/small/'+singleproduct.images[i]+'" alt="" /><a class="view-full-screen" href="img/single-product/small/'+singleproduct.images[i]+'" data-lightbox="roadtrip" ><i class="zmdi zmdi-zoom-in"></i></a></div>');

    }
    
}

function addSingleProductToCart(addtocartbutton){
    var quantity = document.getElementsByClassName('cart-plus-minus-box')[0].value;
    var individualisation = document.getElementsByClassName('individual-text')[0].value;
    
    if (singleproduct.hasIndividualisation === true){
        console.log('hasIndividualisation')

        if (individualisation.length === 0 || individualisation === ' '){
            $("#myModal").modal({show: true});
        }
        else{
            addItemtoShoppingCart(singleproduct.itemId, singleproduct.images[0], singleproduct.productname, singleproduct.price, quantity, singleproduct.hasIndividualisation, individualisation );
            animatecart(addtocartbutton);
             }
    }else{
        console.log('no Individualisation')
        addItemtoShoppingCart(singleproduct.itemId, singleproduct.images[0], singleproduct.productname, singleproduct.price, quantity, singleproduct.hasIndividualisation, individualisation );
        animatecart(addtocartbutton);
    }
    
    
}