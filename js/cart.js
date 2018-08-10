document.write(
    unescape("%3Cscript src='https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js' type='text/javascript'%3E%3C/script%3E")
  );


var cart = [];
var total_items = 0;
var total = 0;

// // inital function after page load
// if(window.attachEvent) {
//     window.attachEvent('onload', initcart());
// } else {
//     if(window.onload) {
//         var curronload = window.onload;
//         var newonload = function(evt) {
//             curronload(evt);
//             yourFunctionName(evt);
//         };
//         window.onload = newonload;
//     } else {
//         window.onload = initcart();
//     }
// }


function initCart(){
    console.log('init cart.js');
    var cookie_cart = getCookie('cart');
    console.log('cookie_cart',cookie_cart)
    cart = cookie_cart=== "none" ? []: JSON.parse(cookie_cart);
    console.log(cart);
    loadShoppingCart();
}

// load cookie from storage
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "none";
}

//set or update cookie in storage
function setCookie(cname, cvalue, exdays) {
    console.log('set Cookie')
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    var new_cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    new_cookie.raw=true;
    document.cookie = new_cookie;
}

//delete cookie from storage
function deleteCookie(cname) {   
    document.cookie = cname+'=; Max-Age=-99999999;';  
}

// calculates and renders all values from cart json-array
function loadShoppingCart() {
    console.log('setShoppingcart')
    
    // reset cart and values
    document.getElementsByClassName('all-cart-product')[0].innerHTML = "";
    total_items = 0;
    total = 0;

    // render cartItem to cart
    for (var i= 0; i< cart.length; i++){

             //update total numer of items
            total_items = total_items + cart[i].quantity;

            //update total price
            total = total + (cart[i].price * cart[i].quantity);

        var display_individualisation = cart[i].hasIndividualisation === false ?  'none': 'block';

        var individualisationwrapper = '';
        for (var k = 0; k < cart[i].individualisation.length; k++){
            individualisationwrapper+= '<p style="display:'+display_individualisation+'; font-family: '+cart[i].individualisation[k].font+'; font-size: 1.1em;">'+cart[i].individualisation[k].value+'</p>';
        }
       

        var div = document.createElement('div');
        div.className = "single-cart clearfix";
        div.innerHTML = '<div class="single-cart clearfix">\
                        <div class="cart-photo">\
                        <a href="#"><img src="img/cart/'+ cart[i].image +'" alt=""></a>\
                        </div>\
                        <div class="cart-info">\
                        <h5><a href="#">'+ cart[i].productname +'</a></h5>\
                        <p class="mb-0">#'+ cart[i].itemId +' </p>\
                        <p class="mb-0"><span data-i18n="cart-price-label">Preis:</span> '+ cart[i].price.toLocaleString('de-DE', {maximumFractionDigits: 2, minimumFractionDigits: 2, minimumIntegerDigits:1 }) +' €</p>\
                        <p class="mb-0"><span data-i18n="cart-quantity-label">Stück:</span> '+ cart[i].quantity +' </p>\
                        <p style="display:'+display_individualisation+'; class="mt-20">'+ individualisationwrapper +' </p>\
                        <span data-cartItemId="'+cart[i].cartItemId +'" onclick="removeItemfromCart(this)" class="cart-delete"><a href="#"><i class="zmdi zmdi-close"></i></a></span>\
                        <img style="display:'+display_individualisation+'; height:25px; width: 100%" src="'+cart[i].decorImage+'">\
                        </div>\
                        </div>'
        document.getElementsByClassName('all-cart-product')[0].appendChild(div);

    } // End for-loop

        // set badge number
        document.getElementsByClassName('cart-icon')[0].querySelector('span').innerHTML = total_items;

        //set number in detail hover view
        document.getElementsByClassName('cart-items')[0].querySelector('p').innerHTML =   $.i18n( 'you have $1 {{plural:$1|item|items}} in your shopping bag', total_items );
    
        // render total price
        document.getElementsByClassName('cart-totals')[0].querySelector('span').innerHTML = total.toLocaleString('de-DE', {maximumFractionDigits: 2, minimumFractionDigits: 2, minimumIntegerDigits:1 }) + ' €';

        //disable cart button if cart is empty
        if(total_items === 0){
            document.getElementsByClassName('cart-bottom')[0].style.display = 'none';
            document.getElementsByClassName('all-cart-product')[0].style.display = 'none';
           
        }else{
            document.getElementsByClassName('cart-bottom')[0].style.display = 'block';
            document.getElementsByClassName('all-cart-product')[0].style.display = 'block';
        }
    
}

function addItemtoShoppingCart(_itemId, _image, _productname, _price, _quantity, _hasIndividualisation, _individualisation, _font, _decorImage, _decorId) {
    console.log('cart length', cart.length)
    console.log('add Item', _itemId, _image, _productname, _price, _quantity, _hasIndividualisation, _individualisation, _font, _decorImage, _decorId);

    var alreadyincart = false;
    var item_cart_index = null;
    
    //check if item already exist in shoppingcard
    //todo add multi individualisation Undersocre-Library _.isEqual(a, b)
    for (var p = 0; p< cart.length; p++){
        if (cart[p].itemId === _itemId 
            && _.isEqual(cart[p].individualisation,_individualisation)
            && cart[p].font === _font 
            && cart[p].decorImage === _decorImage 
            && cart[p].decorId === _decorId ){
            console.log('add quantity');
            alreadyincart = true;
            item_cart_index = p;
        }
    }


    switch(alreadyincart) {
        case true:
            //update quantity of existing item
            cart[item_cart_index].quantity = parseInt(cart[item_cart_index].quantity) + parseInt(_quantity);
            break;
        case false:
            var newItem = {
                cartItemId: getRandomId(),
                itemId:_itemId,
                image:_image,
                productname: _productname,
                price:_price,
                quantity: parseInt(_quantity),
                hasIndividualisation:_hasIndividualisation,
                individualisation: _individualisation,
                font: _font,
                decorImage: _decorImage,
                decorId: _decorId,
            }

            //update shopping cart
            cart.push(newItem)    

            console.log('addItemtoShoppingCart: ', newItem)
            console.log(cart)
            break;
    }

    // reload shopping cart
    loadShoppingCart();

    //update cookie
    setCookie('cart', JSON.stringify(cart), 365);
}

//
function removeItemfromCart(element) {
    var _cartItemId = element.getAttribute('data-cartItemId')? element.getAttribute('data-cartItemId'): element.getAttribute('cartItemId')
    console.log(_cartItemId);

    console.log('parent',element);
    animatedeletefromcart(element.parentElement.parentElement.parentElement);

    // remove element from cart
    for (var p = 0; p< cart.length; p++){
        if (cart[p].cartItemId === _cartItemId){
            console.log('remove at ', p)
            cart.splice(p, 1);
            console.log(cart)
        }
    }

    //update cookie
    setCookie('cart', JSON.stringify(cart), 365);

    // wait for animation to be finished
    setTimeout( function(){ 
        // reload shopping cart
        loadShoppingCart();

         //if cart is empty route to shop.html
        if(cart.length === 0){
        routebacktomain();
        }
    }, 300);


    
}


function getRandomId(){
    var number = Math.random() // 0.9394456857981651
    number.toString(36); // '0.xtis06h6'
    var id = number.toString(36).substr(2, 9); // 'xtis06h6'
    return id;
}


