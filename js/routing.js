// var splitted_url = window.location.toString().split("#");
// var itemId = splitted_url[1];
// console.log(itemId)

//  itemId? loadSingleProduct(itemId) : window.location.href = "/shop.html";

    console.log("routing",window.location.pathname);
    var splitted_url = window.location.toString().split("#");
    var mainpage = "/shop.html";

    switch(window.location.pathname){
        case '/single-product.html':

        break;
        case '/shop.html':

        break;
        case '/cart.html':
            console.log('routing: cart')
            var cookie_cart = getCookie('cart');
            console.log('cookie_cart',cookie_cart)
            if (cookie_cart=== "none"){
                console.log('cookie is missing')
                // route to home
                routebacktomain()
            }
        break;
        case '/checkout.html':
            var cookie_cart = getCookie('cart');
            console.log('cookie_cart',cookie_cart)
            if (cookie_cart=== "none"){
                console.log('cookie is missing')
                // route to home
                routebacktomain()
            }
        break;
        case '/ordercomplete.html':
            console.log('routing: ordercomplete')
            var cookie_customerinformation = getCookie('cart');
            console.log('cookie_customerinformation',cookie_customerinformation)
            if (cookie_customerinformation=== "none"){
                console.log('cookie is missing')
                // route to home
                routebacktomain()
            }
            break;
        case '/thanks.html':
            console.log('routing: thanks')
            var cookie_customerinformation = getCookie('cart');
            console.log('cookie_customerinformation',cookie_customerinformation)
            if (cookie_customerinformation=== "none"){
                console.log('cookie is missing')
                // route to home
                routebacktomain()
            }
        break;
    }

function routebacktomain(){
    // route to home
    window.location.href = mainpage;
}