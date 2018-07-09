var customerinformation = {};

function initThanks(){
    console.log('initThanks');

    // load data from cookies
    var cookie_customer = getCookie('customerinformation');
    customerinformation = cookie_customer=== "none" ? {}: JSON.parse(cookie_customer);
    console.log(customerinformation);

    //delete all cookies
    deleteCookie('customerinformation');
    deleteCookie('order_id');
    deleteCookie('order_date');
    deleteCookie('cart');
    deleteCookie('coupon');
    
    renderThanks();
}

function renderThanks(){

    document.getElementById('thanksmsg').innerHTML = 'Deine Bestellung ist bei uns eingegangen.<br><br>Wir haben dir eine Email an <span style="text-decoration: underline;">'+customerinformation.billing_adress.email +'</span> gesendet! <br><br> Schau bald wieder vorbei :)';

}