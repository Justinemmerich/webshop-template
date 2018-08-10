var customerinformation = {};
var total = 0;
var coupon;
var orderdate;
var totaltotal;
var order_id;
var order_date;
var agb = false;
var options;

// TODO put into Settings request
var packingprice = 0.99;
var cardprice = 2.99;    

function initOrderComplete(){
    console.log('initOrderComplete')

    //set terms of service to unchecked
    agb = false;
    document.getElementById('agb').checked = false;
    document.getElementById('checkoutButton').disabled = true;
    
    // load data from cookies
    var cookie_customer = getCookie('customerinformation');
    customerinformation = cookie_customer=== "none" ? {}: JSON.parse(cookie_customer);
    console.log(customerinformation)

    var cookie_coupon = getCookie('coupon');
    coupon = cookie_coupon === "none" ? {"valid":false, "amount":0.00}: JSON.parse(cookie_coupon);

    var cookie_order_id = getCookie('order_id');
    order_id = cookie_order_id === "none" ? undefined: JSON.parse(cookie_order_id);

    var cookie_order_date = getCookie('order_date');
    order_date = cookie_order_date === "none" ? undefined: JSON.parse(cookie_order_date);

    var cookie_options = getCookie('options');
    options = cookie_options === "none" ? undefined: JSON.parse(cookie_options);

    renderOrderComplete();
}

function renderOrderComplete() {

    total = 0;

    // render cartItem to cart
    for (var i= 0; i< cart.length; i++){

        //check if quantity > 0
        if(cart[i].quantity> 0 ){

        //update total price
        total = total + (cart[i].price * cart[i].quantity);
        console.log('total', total);

        var display_individualisation = cart[i].hasIndividualisation === false ?  'none': 'block';

        var individualisationwrapper = '';
        for (var k = 0; k < cart[i].individualisation.length; k++){
            individualisationwrapper+= '<span style="display:'+display_individualisation+'; font-family: '+cart[i].individualisation[k].font+'; font-size: 1.1em;">'+cart[i].individualisation[k].value+'</span>';
        }

        var div = document.createElement('tr');

        if (cart[i].hasIndividualisation){
            div.innerHTML = '<td>'+cart[i].productname+'<br> \
                        <img style="display:'+display_individualisation+'; height:25px; width: 10%; float:left" src="'+cart[i].decorImage+'">\
                        <br><br><span style="display:'+display_individualisation+'; class="mt-20">'+ individualisationwrapper +' </span></td>\
                        <td class="text-center">'+cart[i].quantity+'</td>\
                        <td class="text-right" style="padding-left:0">'+(cart[i].price *cart[i].quantity).toLocaleString('de-DE', { minimumFractionDigits: 2, minimumIntegerDigits:2 }) +' €</td>';
        }else{
            div.innerHTML = '<td>'+cart[i].productname+'</td>\
            <td class="text-center">'+cart[i].quantity+'</td>\
            <td class="text-right" style="padding-left:0">'+(cart[i].price *cart[i].quantity).toLocaleString('de-DE', { minimumFractionDigits: 2, minimumIntegerDigits:2 }) +' €</td>';
        }

        document.getElementsByClassName('our-order')[0].querySelector('tbody').appendChild(div);

        }

    } // End for-loop

    //render option consts
    var totalgiftprice = 0;

    if (options !== undefined){
        for ( i = 0; i < options.length; i++ ){
            for( j= 0; j< options[i].options.length; j++){
                if(options[i].options[j].card === true){
                    totalgiftprice = totalgiftprice + cardprice;
                }
                if(options[i].options[j].packing === true){
                    totalgiftprice = totalgiftprice + packingprice;
                }
            }  
        } 
    }
    
    var div = document.createElement('tr');
    div.innerHTML = '<td>Geschenkoptionen</td>\
                    <td></td>\
                    <td class="text-right" style="padding-left:0">'+(totalgiftprice).toLocaleString('de-DE', {maximumFractionDigits: 2, minimumFractionDigits: 2, minimumIntegerDigits:1 }) +' €</td>';

    document.getElementsByClassName('our-order')[0].querySelector('tbody').appendChild(div);
    

    // render Shipping
    var shippingcosts = customerinformation.has_divergent_shippingadress == true ? getShippingcosts(customerinformation.shipping_adress.country) :getShippingcosts(customerinformation.billing_adress.country);

    var div = document.createElement('tr');
    div.innerHTML = '<td>Versandkosten</td>\
                     <td></td>\
                    <td class="text-right" style="padding-left:0">'+(shippingcosts).toLocaleString('de-DE', {maximumFractionDigits: 2, minimumFractionDigits: 2, minimumIntegerDigits:1 }) +' €</td>';

    document.getElementsByClassName('our-order')[0].querySelector('tbody').appendChild(div);

    var total_with_coupon =  total;
    var discount = 0;
     // if has coupon -> display coupon code
     if (coupon.valid === true){
         console.log('coupon', coupon);
        switch (coupon.operation){
            case 'percent': 
            console.log('coupon operator %')
            discount = (total/100) * coupon.amount;
            console.log('coupon  discount',  discount);
            total_with_coupon = parseFloat(total) - parseFloat(discount);
            break;
            case 'minus': 
            console.log('coupon operator -')
            discount = coupon.amount;
            console.log('coupon  discount',  discount)
            total_with_coupon = (parseFloat(total) < discount) ? parseFloat(total) : ((parseFloat(total) - discount));
            break;
            default:
            console.log('coupon operator not set')
            discount = 0;
            total_with_coupon = parseFloat(total);
            break;
        }

        var div = document.createElement('tr');
        div.innerHTML = '<td>Rabatt</td>\
                        <td></td>\
                        <td class="text-right" style="padding-left:0">'+(discount).toLocaleString('de-DE', {maximumFractionDigits: 2, minimumFractionDigits: 2, minimumIntegerDigits:1 }) +' €</td>';
    
        document.getElementsByClassName('our-order')[0].querySelector('tbody').appendChild(div);
    
    }

    // render Discount
    // if (coupon.valid == true){
    //     var div = document.createElement('tr');
    //     div.innerHTML = '<td>Rabatt</td>\
    //                     <td></td>\
    //                     <td class="text-right" style="padding-left:0">- '+(coupon.amount).toLocaleString('de-DE', { minimumFractionDigits: 2, minimumIntegerDigits:2 }) +' €</td>';
    
    //     document.getElementsByClassName('our-order')[0].querySelector('tbody').appendChild(div);
    // }

    //render Gesamt betrag
    totaltotal = coupon.valid == true ? (total-discount+shippingcosts+totalgiftprice) : (total+shippingcosts+totalgiftprice);
    var tr = document.createElement('tr');
    tr.innerHTML = '<td>Gesamt</td>\
                    <td></td>\
                    <td class="text-right" style="padding-left:0">'+(totaltotal).toLocaleString('de-DE', {maximumFractionDigits: 2, minimumFractionDigits: 2, minimumIntegerDigits:1 }) +' €</td>';

    document.getElementsByClassName('our-order')[0].querySelector('tbody').appendChild(tr);

    //render top
    order_date = new Date();
    document.getElementById('top_orderdate').innerHTML = order_date.toLocaleDateString("de-DE");
    document.getElementById('top_ordernumber').innerHTML = getOrderId();
    document.getElementById('top_total').innerHTML = (totaltotal).toLocaleString('de-DE', {maximumFractionDigits: 2, minimumFractionDigits: 2, minimumIntegerDigits:1 }) +' €';

    switch(customerinformation.payment_method) {
        case 'payment_in_advance':
            document.getElementById('top_payment').innerHTML = 'Vorkasse';
            document.getElementById('payment_in_advance').style.display = 'block';
            break;
        case 'direct_debit':
            document.getElementById('top_payment').innerHTML = 'EC-Karte';
            document.getElementById('debitcard').style.display = 'block';
            document.getElementById('debitcard_iban').setAttribute("required", "");
            document.getElementById('debitcard_bic').setAttribute("required", "");
            break;
        case 'creditcard':
            document.getElementById('top_payment').innerHTML = 'Kreditkarte';
            document.getElementById('creditcard').style.display = 'block';
            document.getElementById('creditcard_number').setAttribute("required", "");
            document.getElementById('creditcard_date').setAttribute("required", "");
            document.getElementById('creditcard_cvc').setAttribute("required", "");
            break;
        case 'paypal':
            document.getElementById('top_payment').innerHTML = 'PayPal';
            document.getElementById('paypal').style.display = 'block';
            break;
    }
    
    // render adressdata

    var tr = document.createElement('tr');
    tr.innerHTML =  '<td>\
                    <p style="color: #999 !important; text-transform: capitalize;">\
                    '+customerinformation.billing_adress.company+'\
                    <br>'+customerinformation.billing_adress.forename+' '+customerinformation.billing_adress.lastname+'\
                    <br>'+customerinformation.billing_adress.street+'\
                    <br>'+customerinformation.billing_adress.zipcode+' '+customerinformation.billing_adress.city+'\
                    <br>'+customerinformation.billing_adress.country+'\
                    </p>\
                    <p style="color: #999 !important;text-transform: capitalize;">'+customerinformation.billing_adress.notes+'\</p>\
                    </td>';
    console.log(tr)
    document.getElementById('billingadress').appendChild(tr);

    if(customerinformation.has_divergent_shippingadress == true){
        var tr = document.createElement('tr');
        tr.innerHTML =  '<td>\
                        <p style="color: #999 !important; text-transform: capitalize;">\
                        '+ customerinformation.shipping_adress.company+'\
                        <br>'+customerinformation.shipping_adress.forename+' '+customerinformation.shipping_adress.lastname+'\
                        <br>'+customerinformation.shipping_adress.street+'\
                        <br>'+customerinformation.shipping_adress.zipcode+' '+customerinformation.shipping_adress.city+'\
                        <br>'+customerinformation.shipping_adress.country+'\
                        </p>\
                        <p style="color: #999 !important">'+customerinformation.shipping_adress.notes+'\</p>\
                        </td>';
    
        console.log(tr);
        document.getElementById('shippingadress').appendChild(tr);
    }else{
        var tr = document.createElement('tr');
        tr.innerHTML =  '<td>\
                        <p style="color: #999 !important; text-transform: capitalize;">\
                        '+customerinformation.billing_adress.company+'\
                        <br>'+customerinformation.billing_adress.forename+' '+customerinformation.billing_adress.lastname+'\
                        <br>'+customerinformation.billing_adress.street+'\
                        <br>'+customerinformation.billing_adress.zipcode+' '+customerinformation.billing_adress.city+'\
                        <br>'+customerinformation.billing_adress.country+'\
                        </td>';
        console.log(tr);
        document.getElementById('shippingadress').appendChild(tr);
    }
   

}

function getShippingcosts(country){
    var shippingcosts = null;

    var res = null;
    //TODO Request to server
    // $.ajax({
    //       'url' : 'http://www.wooderino.de/api.php',
    //       'type' : 'GET',
    //       'contentType':'application/json',
    //       'data' : {
    //         'list' : 'versandkosten',
    //       },
    //       "success": function(res){ 
    //          console.log('res', res);
    //          if (res[country]){
    //             shippingcosts = res[country].price;
    //         } else {
    //             alert('country not found');
    //         }
        
    //         return shippingcosts;
    //         },
    //         "error": function(XMLHttpRequest, textStatus, errorThrown) { 
    //             alert("Shippingcosts Api - "+"Status: " + textStatus +"; Error: " + errorThrown);
    //         }
    //     });

    res = {
        "Österreich": {
            "price":3.99,
            "zipcode_validation":"code code bla bla bla bla bla"
        },
        "Deutschland": {
            "price":2.99,
            "zipcode_validation":"code bla bla bla"
        },
        "Schweiz": {
            "price":5.99,
            "zipcode_validation":"bla bla bla bla bla bla ...."
        }
    };
    if (res[country]){
        return res[country].price;
    } else {
        alert('country not found');
    }

}

function getOrderId(){
    console.log(order_id);
    // check if order_id already exists
    if (order_id === undefined){
        // create ne order id
        var number = Math.random(); // 0.9394456857981651
        number.toString(36); // '0.xtis06h6'
        var id = number.toString(36).substr(2, 5); // 'xtis06h6'
        order_id = id + Date.now();
        return order_id;
    }else{
        // return existing order ID
        return order_id;
    }

}

function onCheckboxChange(){
    agb = !agb;

    document.getElementById('checkoutButton').disabled = agb === true? false:true;
}

function validateForCheckout(){
    console.log('checkout');

    //check if all required fields are set
    if(customerinformation.payment_method === 'direct_debit'){
        if(document.getElementById('debitcard_iban').checkValidity() &&
        document.getElementById('debitcard_bic').checkValidity()){

            //TODO server request for validation
            console.log('debit');
            checkout();
        }
    }else if (customerinformation.payment_method ===  'creditcard'){
        if(document.getElementById('creditcard_number').checkValidity()
        &&document.getElementById('creditcard_date').checkValidity() 
        &&document.getElementById('creditcard_cvc').checkValidity())
        {
            //TODO server request for validation
            console.log('creditcard');
            checkout();
        }
    }
    else{
         //TODO server request for validation
         console.log('no debit no creditcard');
        checkout();
    }

    return false;
}

function checkout(){
    var order = {
        "order_id": order_id,
        "order_date":order_date,
        "order":cart,
        "coupon":coupon,
        "customerinformation": customerinformation,
        "paymentinformation": {
            "creditcard_number" : document.getElementById('creditcard_number').value,
            "creditcard_date" : document.getElementById('creditcard_date').value,
            "creditcard_cvc" : document.getElementById('creditcard_cvc').value,
            "debitcard_iban" : document.getElementById('debitcard_iban').value,
            "debitcard_bic" : document.getElementById('debitcard_bic').value,
        },
        "giftoptions":options
    };

     //TODO send data to Server for validation and payout
        console.log('order packed for shipping to server', order);
        console.log(order);
        alert('validate Order on Server: '+ JSON.stringify(order));

     //route to thanks page
     //window.location.href = window.location.pathname.substring( 0, window.location.pathname.lastIndexOf( '/' ) + 1 ) + 'thanks.html';
}

