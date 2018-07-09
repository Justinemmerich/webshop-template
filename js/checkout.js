var has_divergent_shippingadress = false;
var payment_method = 'payment_in_advice'; // set default payment methode here

function initCheckout(){
    restorefromCookie();

    //set inital payment_method
    document.getElementById(payment_method).classList.add("active");
    document.getElementById(payment_method).style.display = "block";
    document.getElementById(payment_method).style = "border: 2px solid #C8A165;";
}

function restorefromCookie(){

    var cookie_customer = getCookie('customerinformation');
    var customerinformation = cookie_customer=== "none" ? undefined: JSON.parse(cookie_customer);
    console.log(customerinformation);

    if(customerinformation !== undefined){
        // set payment
        payment_method = customerinformation.payment_method;

        //set billing adress
        document.getElementById('billing_forename').value = customerinformation.billing_adress.forename;
        document.getElementById('billing_lastname').value  = customerinformation.billing_adress.lastname;
        document.getElementById('billing_email').value  = customerinformation.billing_adress.email;
        document.getElementById('billing_street').value  = customerinformation.billing_adress.street;
        document.getElementById('billing_company').value  = customerinformation.billing_adress.company;
        document.getElementById('billing_zipcode').value  = customerinformation.billing_adress.zipcode ;
        document.getElementById('billing_city').value  = customerinformation.billing_adress.city;
        document.getElementById('billing_notes').value  = customerinformation.billing_adress.notes;
        document.getElementById('billing_country').value  = customerinformation.billing_adress.country;

        //set shipping adress

        document.getElementById('shipping_forename').value = customerinformation.shipping_adress.forename;
        document.getElementById('shipping_lastname').value = customerinformation.shipping_adress.lastname;
        document.getElementById('shipping_street').value = customerinformation.shipping_adress.street;
        document.getElementById('shipping_company').value = customerinformation.shipping_adress.company;
        document.getElementById('shipping_zipcode').value = customerinformation.shipping_adress.zipcode;
        document.getElementById('shipping_city').value = customerinformation.shipping_adress.city;
        document.getElementById('shipping_notes').value = customerinformation.shipping_adress.notes;
        document.getElementById('shipping_country').value = customerinformation.shipping_adress.country;

        document.getElementById('has_divergent_shippingadress').checked = customerinformation.has_divergent_shippingadress;

        if (customerinformation.has_divergent_shippingadress){
            document.getElementById('shippingadress').style.display = 'block';
            document.getElementById('shipping_forename').setAttribute("required", "");
            document.getElementById('shipping_lastname').setAttribute("required", "");
            document.getElementById('shipping_street').setAttribute("required", "");
            document.getElementById('shipping_zipcode').setAttribute("required", "");
            document.getElementById('shipping_city').setAttribute("required", "");
            document.getElementById('shipping_country').setAttribute("required", "");
    
        }
        else{
            document.getElementById('shippingadress').style.display = 'none';
            document.getElementById('shipping_forename').removeAttribute("required");
            document.getElementById('shipping_lastname').removeAttribute("required");
            document.getElementById('shipping_street').removeAttribute("required");
            document.getElementById('shipping_zipcode').removeAttribute("required");
            document.getElementById('shipping_city').removeAttribute("required");
        }

    }   

}

function onCheckboxChange(){
    console.log('checkbox changed');

    has_divergent_shippingadress = !has_divergent_shippingadress;

    if (has_divergent_shippingadress){
        document.getElementById('shippingadress').style.display = 'block';
        document.getElementById('shipping_forename').setAttribute("required", "");
        document.getElementById('shipping_lastname').setAttribute("required", "");
        document.getElementById('shipping_street').setAttribute("required", "");
        document.getElementById('shipping_zipcode').setAttribute("required", "");
        document.getElementById('shipping_city').setAttribute("required", "");
        document.getElementById('shipping_country').setAttribute("required", "");

    }
    else{
        document.getElementById('shippingadress').style.display = 'none';
        document.getElementById('shipping_forename').removeAttribute("required");
        document.getElementById('shipping_lastname').removeAttribute("required");
        document.getElementById('shipping_street').removeAttribute("required");
        document.getElementById('shipping_zipcode').removeAttribute("required");
        document.getElementById('shipping_city').removeAttribute("required");
    }
}

function onPaymentChange(payment){
    console.log('payment',payment );
    document.getElementById(payment_method).style = "border: none;";
    document.getElementById(payment).style = "border: 2px solid #C8A165;";
    payment_method = payment;
}

 function onFormvalid(){
    console.log('onFormvalid');

    var valid = false;

    if (has_divergent_shippingadress){

        // check all required fields
        if (document.getElementById('billing_forename').checkValidity() 
        && document.getElementById('billing_lastname').checkValidity() 
        && document.getElementById('billing_email').checkValidity() 
        && document.getElementById('billing_street').checkValidity() 
        && document.getElementById('billing_zipcode').checkValidity() 
        && document.getElementById('billing_city').checkValidity()
        && document.getElementById('shipping_forename').checkValidity()
        && document.getElementById('shipping_lastname').checkValidity()
        && document.getElementById('shipping_street').checkValidity()
        && document.getElementById('shipping_zipcode').checkValidity()
        && document.getElementById('shipping_city').checkValidity()
        ){
            //set session here
            setCustomerInformation();

            //route to ordercomplete
            window.location.href = 'ordercomplete.html';
        }

    }
    else{

        // check only billing fields
        if (document.getElementById('billing_forename').checkValidity() 
        &&document.getElementById('billing_lastname').checkValidity() 
        && document.getElementById('billing_email').checkValidity() 
        && document.getElementById('billing_street').checkValidity() 
        && document.getElementById('billing_zipcode').checkValidity() 
        && document.getElementById('billing_city').checkValidity() 
        ){
            //set session here
            setCustomerInformation()

            //route to ordercomplete
            window.location.href = window.location.pathname.substring( 0, window.location.pathname.lastIndexOf( '/' ) + 1 ) + 'ordercomplete.html';
        }

    }

    return false;
}

function setCustomerInformation(){
    var customerinformation = { 
        "billing_adress": {
           "forename": document.getElementById('billing_forename').value,
           "lastname": document.getElementById('billing_lastname').value,
           "email": document.getElementById('billing_email').value,
           "street": document.getElementById('billing_street').value,
           "company": document.getElementById('billing_company').value,
           "zipcode": document.getElementById('billing_zipcode').value,
           "city": document.getElementById('billing_city').value,
           "notes": document.getElementById('billing_notes').value,
           "country": document.getElementById('billing_country').value,
        },
        "has_divergent_shippingadress": has_divergent_shippingadress,
        "shipping_adress": {
           "forename": document.getElementById('shipping_forename').value,
           "lastname": document.getElementById('shipping_lastname').value,
           "street": document.getElementById('shipping_street').value,
           "company": document.getElementById('shipping_company').value,
           "zipcode": document.getElementById('shipping_zipcode').value,
           "city": document.getElementById('shipping_city').value,
           "notes": document.getElementById('shipping_notes').value,
           "country": document.getElementById('shipping_country').value,
        },
        "payment_method":payment_method,

    };

    console.log('customerinformation', customerinformation);

    setCookie('customerinformation', JSON.stringify(customerinformation), 365);
}