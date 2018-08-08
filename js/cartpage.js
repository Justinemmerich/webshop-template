var coupon;
var discount = 0.00;
var shipping = 5.99;
var minCouponValue;
var selectedoptionindexfordelete = 0;
var selectedoptionidfordelete = null;
var options;

function initCartPage(){
    var cookie_coupon = getCookie('coupon');
    coupon = cookie_coupon === "none" ? {"valid":false, "amount":0.00}: JSON.parse(cookie_coupon);
    //check if giftoption exists
    var cookie_options = getCookie('options');
    options = cookie_options === "none" ? undefined: JSON.parse(cookie_options);
    console.log('options cookie', options);
    //load cart
    initCart()
    //start rendering cart
    renderShoppingCartItems();

};

function loadShippingCosts(country){
    //todo Api call here
    return shipping;
}

function renderShoppingCartItems(){



    // reset cart and values
    document.getElementsByClassName('shop-cart-table')[0].querySelector('tbody').innerHTML = '';

    var shippingcosts = loadShippingCosts('Deutschland');

    var total = 0;
 
    // render cartItem to cart
    for (var i= 0; i< cart.length; i++){

        total = total + (cart[i].price * cart[i].quantity);


        var display_individualisation = cart[i].hasIndividualisation === false ?  'none': 'block';

        var individualisationwrapper = '';
        for (var k = 0; k < cart[i].individualisation.length; k++){
            individualisationwrapper+= '<p style="display:'+display_individualisation+'; font-family: '+cart[i].individualisation[k].font+'; font-size: 1.1em;">'+cart[i].individualisation[k].value+'</p>';
        }

        var tr = document.createElement('tr');
        tr.className = "single-cart";
        tr.innerHTML = '<td class="product-thumbnail text-left">\
                        <div class="single-product">\
                        <div class="product-img">\
                        <a href="single-product.html"><img src="img/cart/'+ cart[i].image +'" alt=""></a>\
                        </div>\
                        <div class="product-info product-info-table">\
                        <h4 class="post-title"><a class="text-light-black" href="#">'+ cart[i].productname +'</a></h4>\
                        <p style="display:'+display_individualisation+'; class="mt-20">'+ individualisationwrapper +' </p>\
                        <img style="display:'+display_individualisation+'; height:25px; width: 100%" src="'+cart[i].decorImage+'">\
                        </div>\
                        </div>										\
                        </td>\
                        <td data-label="Stückpreis" class="product-price">'+ cart[i].price.toLocaleString('de-DE', { minimumFractionDigits: 2, minimumIntegerDigits:2 }) +' €</td>\
                        <td data-label="Anzahl" class="product-quantity">\
                        <div class="cart-plus-minus"><div data-cartItemId="'+cart[i].cartItemId +'" onclick="removeQuantity(this)" class="dec qtybutton">-</div>\
                        <input value="'+ cart[i].quantity +'" id="'+cart[i].cartItemId +'quantity" name="qtybutton" class="cart-plus-minus-box" type="text">\
                        <div onclick="addQuantity(this)" data-cartItemId="'+cart[i].cartItemId +'" class="inc qtybutton">+</div></div>\
                        </td>\
                        <td data-label="Gesamt" class="product-subtotal">'+ (cart[i].price * cart[i].quantity).toLocaleString('de-DE', { minimumFractionDigits: 2, minimumIntegerDigits:2 }) +' €</td>\
                        <td data-label="Löschen" class="product-remove">\
                        <a data-cartItemId="'+cart[i].cartItemId +'" onclick="removeItem(this)"><i class="zmdi zmdi-close"></i></a>\
                        </td>'
                        document.getElementsByClassName('shop-cart-table')[0].querySelector('tbody').appendChild(tr);

    } // End for-loop

    //calculate discount
    var total_with_coupon = 0;
     // if has coupon -> display coupon code
     if (coupon.valid === true){
        switch (coupon.operation){
            case 'percent': 
            console.log('coupon operator %')
            discount = parseFloat((total/100) * coupon.amount).toFixed(2);
            console.log('coupon  discount',  discount)
            total_with_coupon = parseFloat(total) - parseFloat(discount).toFixed(2);
            break;
            case 'minus': 
            console.log('coupon operator -')
            discount = parseFloat(coupon.amount).toFixed(2);
            console.log('coupon  discount',  discount)
            total_with_coupon = (parseFloat(total) < discount) ? parseFloat(total) : ((parseFloat(total) - discount));
            break;
            default:
            console.log('coupon operator not set')
            discount = parseFloat(0);
            total_with_coupon = parseFloat(total);
            break;
        }
        document.getElementById('payment_coupon_text').innerHTML = coupon.action+' '+'('+coupon.code+')';
    }
    var total_with_shipping = parseFloat(total_with_coupon) + parseFloat(shippingcosts);

    document.getElementById('payment_cart').innerHTML = total.toLocaleString('de-DE', { minimumFractionDigits: 2, minimumIntegerDigits:1 }) +' €';
    document.getElementById('payment_coupon').innerHTML = discount.toLocaleString('de-DE', { minimumFractionDigits: 2, minimumIntegerDigits:1 }) +' €';
    document.getElementById('payment_shipping').innerHTML = shippingcosts.toLocaleString('de-DE', { minimumFractionDigits: 2, minimumIntegerDigits:1 }) +' €';
    document.getElementById('payment_total').innerHTML = total_with_shipping.toLocaleString('de-DE', { minimumFractionDigits: 2, minimumIntegerDigits:1 }) +' €';

   
}

function addCoupon(element){

    var coupon_code = element.parentElement.querySelector('input').value;

    //TODO Send validation to server
    // res = coupon

    // $.ajax({
    //       'url' : 'http://www.wooderino.de/api.php',
    //       'type' : 'GET',
    //       'contentType':'application/json',
    //       'data' : {
    //         'list' : 'codecheck',
    //         'code' : coupon_code
    //       },
    //       "success": function(res){ 
    //           coupon = res;
    //         if (coupon.valid === true){
    //             console.log('coupon valid')
    //             // set input style
    //             element.parentElement.querySelector('input').style = "border: 2px solid #acc050;";
    //              //update cookie
    //             setCookie('coupon', JSON.stringify(coupon), 365);
        
    //              //update Cart on page 
    //             renderShoppingCartItems();
    //         }else{
    //             element.parentElement.querySelector('input').style = "border: 2px solid #c87065;";
    //         }
    //         },
    //         "error": function(XMLHttpRequest, textStatus, errorThrown) { 
    //             alert("Status: " + textStatus); alert("Error: " + errorThrown); 
    //         }
    //     });

       
     //coupon = {"valid":true, "operation":"minus", "amount":10, expires:"762376762357276", "code":'hx5663fdg3', action:"Aktion - Keine Versandkosten"};
     coupon = {"valid":true, "operation":"percent", "amount":10, expires:"762376762357276", "code":'gx63vst53g', action:"Aktion - 10%"};

    if (coupon.valid){
        // set input style
        element.parentElement.querySelector('input').style = "border: 2px solid #acc050;";
         //update cookie
        setCookie('coupon', JSON.stringify(coupon), 365);

         //update Cart on page 
        renderShoppingCartItems();
    }else{
        element.parentElement.querySelector('input').style = "border: 2px solid #c87065;";
    }

}

function removeItem(element){
    // delete from cart
    removeItemfromCart(element);

    // remove item from options if exists
    var optionindextoibedeleted = options.findIndex(function(array_element) {
        return array_element.cartItemId === element.getAttribute('data-cartitemid');
      });
    console.log('delete option at index ',optionindextoibedeleted);
    options.splice(optionindextoibedeleted, 1);
    setCookie('options', JSON.stringify(options), 365);
    console.log('options cookie', options);

    animatedeletefromcart(element.parentElement.parentElement);

    // wait for animation to be finished
    setTimeout( function(){ 
        //update Cart on page 
        renderShoppingCartItems();
    }, 400);
}

//
function addQuantity(element) {

    console.log('addQuantity',element)

    var _cartItemId = element.getAttribute('data-cartItemId');
    console.log(_cartItemId)

    // search element in cart
    for (var p = 0; p< cart.length; p++){
        if (cart[p].cartItemId === _cartItemId){
            cart[p].quantity = parseInt( cart[p].quantity) + 1;
            console.log(cart)
        }
    }

    //update cookie
    setCookie('cart', JSON.stringify(cart), 365);

    // reload shopping cart
    loadShoppingCart()

    //update Cart on page 
    renderShoppingCartItems()
}

// opens a dialog to choose a gift option to be deleted
function removeQuantity(element) {

    console.log('removeQuantity',element);
    console.log("cart",cart);

    var _cartItemId = element.getAttribute('data-cartItemId');
    selectedoptionidfordelete = _cartItemId;
    console.log("cartid",_cartItemId);

    //check if giftoption already set
    var cookie_options = getCookie('options');
    options = cookie_options === "none" ? undefined: JSON.parse(cookie_options);
    console.log("options", options);

    if (options !== undefined){
        for (var k = 0; k< options.length; k++){

            console.log("options cartItemId", options[k].cartItemId);
            if(options[k].cartItemId ===  _cartItemId){

                //sum cards and packing
                var cardsum = 0;
                var packingsum = 0; 
             
                    options[k].options.forEach(function(element) {
                        cardsum = element.card === true ? cardsum + 1: cardsum;
                        packingsum = element.packing === true ? packingsum + 1: packingsum;
                    });

                var optionssum = (cardsum +packingsum)> options[k].options.length? options[k].options.length: (cardsum +packingsum);
                console.log('cardsum',optionssum);

                // check if all giftoptions are set
                if(optionssum >= document.getElementById(_cartItemId+'quantity').value ){
                    
                    //var quantity = document.getElementById(_cartItemId +'quantity');
                    console.log('show gift option delete');

                    //clean content 
                    document.getElementById('selectgiftoptionfordelete-content').innerHTML = '';
                    var headline = document.createElement('h2');
                    headline.className = "pb-20";
                    headline.innerHTML = 'Welche Geschenkoption soll mit dem Artikel entfernt werden?';
        
                    document.getElementById('selectgiftoptionfordelete-content').appendChild(headline);

                    // render items
                    for(var z= 0; z< options[k].options.length; z++){

                        if (options[k].options[z].card === true || options[k].options[z].packing === true){


                            var style = options[k].options[z].cardoptions.style == 0? 'img/card-simple.png': 'img/card-foldable.png';
                            var packing = options[k].options[z].packing == true? 'img/packing-yes.png': 'img/packing-no.png';
                            var card = options[k].options[z].card == true? 'visible':'hidden';
                            var text = options[k].options[z].card == true? (options[k].options[z].cardoptions.text === null || options[k].options[z].cardoptions.text === '' ? '- Kein Text hinterlegt -':options[k].options[z].cardoptions.text): '';
                          
                            var row = document.createElement('div');
                            row.className = "row mt-10 mb-10";
                            row.innerHTML = '<div  class="mr-15 ml-15" style="border-bottom: 1px solid black; display: flex;">\
                                            <div class=" col-lg-1 col-md-1 col-sm-1 col-xs-1 ml-20 pb-10 mb-10" style="height:50px; display: flex; align-items: center;">\
                                            <input data-index="'+z+'" onChange="onRadioChangeOptionSelection(this);" type="radio" name="optradio" checked="checked">\
                                            </div>\
                                            <div class=" col-lg-4 col-md-4 col-sm-4 col-xs-4 pb-10 mb-10" style=" height:50px; display: flex; align-items: center;">\
                                            <img src="'+packing+'" style="height:50px; margin-right:10px;">\
                                            <img style="visibility:'+card+'; height:60px; margin-right:10px;" src="'+style+'">\
                                            <img style="visibility:'+card+'; height:40px" src="'+options[k].options[z].cardoptions.image+'">\
                                            </div>\
                                            <div class=" col-lg-6 col-md-6 col-sm-6 col-xs-6 pb-10 mb-10" style=" height:50px; display: flex; align-items: center; white-space: nowrap; overflow: hidden !important;text-overflow: ellipsis !important;">\
                                            <span style="visibility:'+card+'">'+text+'</span>\
                                            </div>\
                                            <div>'
                
                            document.getElementById('selectgiftoptionfordelete-content').appendChild(row);
                            //set selectedoptionindexfordelete to current index
                            selectedoptionindexfordelete = z;

                        }

                    }

                    // open dialog
                    toggleOptionSelectDialog();
               

                } else {
                    // just lower quanity
                    removeQuantityfromCart();
                }
            }
        }
    }else {
        // just lower quanity
        removeQuantityfromCart();
    }
}

function onRemoveSelection(){

    // close dialog
    toggleOptionSelectDialog();

    for (var k = 0; k< options.length; k++){

        console.log("options cartItemId", options[k].cartItemId);
        if(options[k].cartItemId === selectedoptionidfordelete){
            var cartitemoptions = options[k].options;
            cartitemoptions.splice(selectedoptionindexfordelete, 1);
            options[k].options = cartitemoptions;
            setCookie('options', JSON.stringify(options), 365);

        }
    }

    removeQuantityfromCart();

}

function removeQuantityfromCart(){

     // search element in cart
     for (var p = 0; p< cart.length; p++){
        if (cart[p].cartItemId === selectedoptionidfordelete){
            cart[p].quantity = parseInt( cart[p].quantity) - 1;
            console.log(cart)
            if (cart[p].quantity < 0){
                // delete from cart
                removeItemfromCart(element);

                // mixed up loading
                // update shoppingcart
                renderShoppingCartItems();
            }
        }
    }

    //update cookie
    setCookie('cart', JSON.stringify(cart), 365);

    // reload shopping cart
    loadShoppingCart();

    //update Cart on page 
    renderShoppingCartItems();
}

function onRadioChangeOptionSelection(element){
    selectedoptionindexfordelete = element.getAttribute('data-index');
    console.log('selectedoptionindexfordelete',selectedoptionindexfordelete)

}

function toggleOptionSelectDialog(){
    $("#selectgiftoptionfordelete").modal('toggle');
}


function cartContainsGift(){
    console.log('wrap as gift');
}
