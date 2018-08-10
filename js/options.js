var itemreference;
var options = [];
var carttotalprice = 0;
var totalgiftprice = 0;
var total = 0;
var packingprice = 0.99;
var cardprice = 2.99;
var coupon;

function initOptions(){
    console.log('init options') 

    loadVorlagenKat()
    render();
    //loadCardTemplates();
}

function loadVorlagenKat(){

    //$('.gallerylist').empty();
    console.log('selecttemplatemodal-content', document.getElementById('selecttemplatemodal-content'))
    document.getElementById('selecttemplatemodal').innerHTML = '';

    var div = document.createElement('div');
    div.className = "gallerylist-headline-back col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-30";
    div.innerHTML = '';
    document.getElementById('selecttemplatemodal').append(div);

    var div = document.createElement('div');
    div.className = "gallerylist-headline col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-30";
    div.innerHTML = '<h3 id="gallery-headline" class="gallerylist-headline">Wähle eine Kategorie aus:</h3>';
    document.getElementById('selecttemplatemodal').append(div);

    //$('#gallerylist').append(html1+html2);

    // $('.gallerylist-close').click(function (e) {
    //    window.location.href = 'index.html';
    // });

    //$('#gallery').fadeIn('fast');

    // $('#gallerylist').css('max-width',gallery_max_width);
    // $('#gallerylist').css('min-width',gallery_min_width);
    //   $('#gallerylist').css('height',$('#gallery').height());

        $.ajax({
          type: "GET",
          url: 'https://www.urlaubsgruss.com/mobileapps/vorlagen-android.php?typ=kat&lang=DE',
          crossDomain: true,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function(data) {
                  console.log(data);
                  var a = data.kategorien.length-1;
                for(i=0;i<data.kategorien.length;i++){
                  //thumbs[i] = data.unterkategorien[i].bild;
                  var div = document.createElement('div');
                    div.className = "gallerylistitem col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-30";
                    div.innerHTML = '<img src="'+data.kategorien[i].bild+'" class="img-responsive gallerylistitem-img" id="'+data.kategorien[i].kat+'"/>\
                                    <span class="gallerylistitem-text">'+data.kategorien[i].kat+'</span>';
                    document.getElementById('selecttemplatemodal').append(div);

                }

                $('.gallerylistitem').click(function (e) {
                    console.log(e.target.id);
                
                 //var kategorie = $(this).text();
                 //alert('loadVoralgen');
                 loadVorlagen(e.target.id);

              });

          },
          error: function (xhr, textStatus, errorThrown) {
              console.error('REQUEST ERROR', textStatus, errorThrown, xhr);
          }
      });



}

function loadVorlagen(kategorie){

    console.log('loadVorlage in Kategorie', kategorie);

    document.getElementById('selecttemplatemodal').innerHTML = '';

    var div = document.createElement('div');
    div.className = "gallerylist-headline-back col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-30";
    div.innerHTML = '<i class="zmdi zmdi-arrow-left"></i> zur Kategorieauswahl';
    document.getElementById('selecttemplatemodal').append(div);

    var div = document.createElement('div');
    div.className = "gallerylist-headline col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-30";
    div.innerHTML = '<h3 id="gallery-headline" class="gallerylist-headline">Wähle eine Vorlage aus:</h3>';
    document.getElementById('selecttemplatemodal').append(div);
    

      $.ajax({
          type: "GET",
          url: 'https://www.urlaubsgruss.com/mobileapps/vorlagen-android.php?typ=vorlagen&ukat='+kategorie+'&lang=DE',
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function(data) {

                for(i=0;i<data.vorlagen.length;i++){
                    
                    var div = document.createElement('div');
                    div.className = "gallerylistitem col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-30";
                    div.innerHTML = '<img  style="width:100%" src="'+data.vorlagen[i].bildpfad.replace("smallthumb", "thumb")+'" class="img-responsive gallerylistitem-img" id="'+data.vorlagen[i].bildpfad+'"/>';
                    document.getElementById('selecttemplatemodal').append(div);
                  }

                  $('.gallerylist-headline-back').click(function () {
                      console.log('back to categories');
                      // on backbutton load categories
                    loadVorlagenKat();
                  });

                  $('.gallerylistitem').click(function (e) {

                    console.log('Vorlage', e);
                    //alert('vorlage gewählt'+e.target.id.substring(48));
                    chooseImagefromGallery('http://www.urlaubsgruss.com/vorlagen/smallthumb_'+e.target.id.substring(48));


                //   progress(true);
                //    var str = $(this).text();
                //    var url = 'https://www.urlaubsgruss.com/vorlagen/'+str.substring(48);

                //    if ( jsondata.placeholder[aplh].clip_typ === 'rect' ){

                //      var oImg = new Image();
                //          oImg.onload = function() {




                //                     var h = this.height;
                //                 var w = this.width;
                //                 var scale = 1;

                //                 var max_width = jsondata.placeholder[aplh].clip_width;
                //                 var max_height = jsondata.placeholder[aplh].clip_height;

                //                 var top = jsondata.placeholder[aplh].clip_top;
                //                 var left = jsondata.placeholder[aplh].clip_left;

                //                 if ( w < h ){
                //                     scale = max_width/w;
                //                 } else {
                //                     scale = max_height/h;
                //                 }
                //                  jsondata.placeholder[aplh].path = url;
                //                  jsondata.placeholder[aplh].scale = scale;
                //                  jsondata.placeholder[aplh].top = (max_height/2)+top;
                //                  jsondata.placeholder[aplh].left = (max_width/2)+left;

                //               progress(false);
                //              getPlacholderSession();
                //          };
                //          oImg.src = url;

                //       } else {
                //         jsondata.placeholder[aplh].path = url;
                //         progress(false);
                //         getPlacholderSession();
                //       }




                });

          },
          error: function (xhr, textStatus, errorThrown) {
              console.error('REQUEST ERROR - VORLAGEN', textStatus, errorThrown, xhr);
          }
      });


}

function loadCardTemplates(){

    console.log('loadCardTemplates');
    var htmlelemet = '<div class=" col-lg-4 col-md-4 col-sm-4 col-xs-6 mb-30">\
    <img onclick="chooseImagefromGallery("http://fakeimg.pl/365x365/")" src="http://fakeimg.pl/365x365/" class="img-responsive"></div>';
    document.getElementById('selecttemplatemodal').querySelector('modal-content').innerHTML = '';

}


function render(){
    // reset cart and values
    document.getElementsByClassName('shop-cart-table')[0].querySelector('tbody').innerHTML = '';

    //create options json
    var json = {};
   
    // render cartItem to cart
    for (var i= 0; i< cart.length; i++){

         //fill options json
        
         json = {
            "cartItemId": cart[i].cartItemId,
            options:[],
        };

        for (var j= 0; j< cart[i].quantity; j++){

        // add option placeholder for each quantity
        json.options.push({
            "packing":false,
            "card":false,
            "cardoptions":{
                image:null,
                style:0,
                text:null,
            }
        });

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
                            </div>\
                        </td>\
                        <td class="product-price"></td>\
                        <td class="product-quantity"></td>\
                        <td data-label="GRUSSKARTE (2.99€)" class="product-subtotal">\
                            <input onclick="switchoptions(this)" data-type="card" data-cartItemId="'+cart[i].cartItemId +'" data-ItemId-Quantity="'+ j +'" id="'+cart[i].cartItemId + j+'cardinput'+'" type="checkbox">\
                        </td>\
                        <td data-label="GESCHENKVEPACKUNG (0.99€)" class="product-subtotal">\
                            <input onclick="switchoptions(this)" data-type="packing" data-cartItemId="'+cart[i].cartItemId +'" data-ItemId-Quantity="'+ j +'" id="'+cart[i].cartItemId + j+'packinginput'+'" type="checkbox">\
                        </td>'
                        document.getElementsByClassName('shop-cart-table')[0].querySelector('tbody').appendChild(tr);
            
        // tr = document.createElement('tr');
        // tr.className = "single-cart";
        // tr.id = cart[i].cartItemId+j+"packing";
        // tr.style.display = "none";
        // tr.style.backgroundColor = "#f6f6f6";
        // tr.innerHTML = '<td class="product-thumbnail text-left">\
        //                 Optionen Geschenkverpackung\
        //                 </td>\
        //                 <form>\
        //                 <td class="product-price"></td>\
        //                 <td class="product-quantity"></td>\
        //                 <td data-label="Männlich" class="product-subtotal"><div class="radio"><label><input type="radio" name="optradio"><i class="zmdi zmdi-card-giftcard" style="color:#29335C; font-size:30px">M</i></label></div></td>\
        //                 <td data-label="Weiblich" class="product-subtotal"><div class="radio"><label><input type="radio" name="optradio"><i class="zmdi zmdi-card-giftcard"  style="color:#E4572E; font-size:30px">W</i></label></div>\
        //                 </form>\
        //                 </td>';
        //                 document.getElementsByClassName('shop-cart-table')[0].querySelector('tbody').appendChild(tr);



        tr = document.createElement('tr');
        tr.className = "single-cart";
        tr.id = cart[i].cartItemId + j+'card';
        tr.setAttribute('data-cartItemId',cart[i].cartItemId) ;
        tr.setAttribute('data-quantity', j);
        tr.style.display = "none";
        tr.style.backgroundColor = "#f6f6f6";
        tr.innerHTML = '<td class="product-thumbnail text-left">\
                        Optionen Grußkarten\
                        </td>\
                        <form>\
                        <td data-label="Einfach" class="product-price"><div class="radio-inline"><label><input id="'+cart[i].cartItemId + j+'cardstyle0'+'" type="radio" name="optradio'+cart[i].cartItemId + j+'" onChange="onRadioChange(this);" checked="checked" value="0"><img src="img/card-simple.png" width="60px"></label></div></td>\
                        <td data-label="Klappbar" class="product-quantity"><div class="radio-inline"><label><input id="'+cart[i].cartItemId + j+'cardstyle1'+'" type="radio" name="optradio'+cart[i].cartItemId + j+'" onChange="onRadioChange(this);" value="1"><img src="img/card-foldable.png" width="60px"></label></div></td>\
                        </form>\
                        <td data-label="Vorlage" class="product-subtotal"><img id="'+cart[i].cartItemId + j+'cardimage'+'" onclick="opengallery(this)" src="http://www.urlaubsgruss.com/vorlagen/smallthumb_ce0758602d66fbf29646.jpg" width="100px"></td>\
                        <td class="product-subtotal">Grußtext<br><textarea id="'+cart[i].cartItemId + j+'cardtext'+'" onfocusout="onTextChange(this)" name="Text1" cols="30" rows="5"></textarea></td>';
                        document.getElementsByClassName('shop-cart-table')[0].querySelector('tbody').appendChild(tr);
        }

        //add json-template to options
        options.push(json);
        console.log('Push', i, j);

    } // End for-loop

    console.log('options created from card',options);

     // calc cart total
     for (var i= 0; i< cart.length; i++){
        carttotalprice = carttotalprice + (cart[i].price * cart[i].quantity);
    }



    document.getElementById('payment_cart').innerHTML = carttotalprice.toLocaleString('de-DE', {maximumFractionDigits: 2, minimumFractionDigits: 2, minimumIntegerDigits:1 }) +' €';

    var cookie_coupon = getCookie('coupon');
    coupon = cookie_coupon === "none" ? {"valid":false, "amount":0.00}: JSON.parse(cookie_coupon);

    document.getElementById('payment_coupon').innerHTML = coupon.amount.toLocaleString('de-DE', {maximumFractionDigits: 2, minimumFractionDigits: 2, minimumIntegerDigits:1 }) +' €';

    //restorefromcookies
    restoreOptionsfromCookie();
}


function restoreOptionsfromCookie(){

    var cookie_options = getCookie('options');
    var restored_options = cookie_options === "none" ? options: JSON.parse(cookie_options);
    console.log('RESTOREDoptions from cookie', restored_options);
    console.log('options FROM CART', options);

    //merge stored options with new cart items (cartitem)
    
         for (var i = 0; i < restored_options.length; i++){
            for (var j = 0; j < restored_options[i].options.length; j++){
                    if (options[i].options[j] != undefined){
                        options[i].options[j].card = restored_options[i].options[j].card;
                        options[i].options[j].packing = restored_options[i].options[j].packing;
                        options[i].options[j].cardoptions = restored_options[i].options[j].cardoptions;
                    } else{
                        console.log('Restore Error index undefined', i, j);
                    }
            }
         }


    
    // //merge stored options with new cart item (quantity)
    // for (var k = 0; k < newoptions.length; k++){
    //     for (var p = 0; p < newoptions.length; p++){
    //         newoptions[k].options[p] = restored_options[k].options[p];
    //         console.log('iteration', k, p);
    //     }
    // }

    console.log('merge complete', options);
    // merge together and save to cookie

    setCookie('options', JSON.stringify(options), 365);

    console.log('merged options', restored_options);

    setTimeout(function(){ 
        console.log('load')
        console.log("options", options);

        for (var i = 0; i< options.length; i++){

            for (var j = 0; j< options[i].options.length; j++){
    
                if (options[i].options[j].card === true){
                    document.getElementById(options[i].cartItemId+j+'card').style.display = 'table-row';
                    document.getElementById(options[i].cartItemId+j+'cardinput').checked = true;
                    document.getElementById(options[i].cartItemId+j+'cardimage').src = options[i].options[j].cardoptions.image;
                    document.getElementById(options[i].cartItemId+j+'cardtext').value = options[i].options[j].cardoptions.text;
                    
                    switch (options[i].options[j].cardoptions.style){
                        case '0':
                            document.getElementById(options[i].cartItemId+j+'cardstyle0').checked = true;
                        break;
                        case '1':
                            document.getElementById(options[i].cartItemId+j+'cardstyle1').checked = true;
                        break;
                    }
                }
                if (options[i].options[j].packing === true){
                    document.getElementById(options[i].cartItemId+j+'packinginput').checked = true;
                }  
    
            }
    
        }

        renderPrice();

     }, 1);

}

function renderPrice(){

        totalgiftprice = 0;

        for (var i = 0; i < options.length; i++ ){
            for(var j= 0; j< options[i].options.length; j++){
                if(options[i].options[j].card === true){
                    totalgiftprice = parseFloat(totalgiftprice + cardprice);
                }
                if(options[i].options[j].packing === true){
                    totalgiftprice = parseFloat(totalgiftprice + packingprice);
                }
            }  
        }
        
         //calculate discount
     var total_with_coupon =  total;
     var discount = 0;
     // if has coupon -> display coupon code
     if (coupon.valid === true){
         console.log('coupon', coupon);
        switch (coupon.operation){
            case 'percent': 
            console.log('coupon operator %')
            discount = (total/100) * coupon.amount
            console.log('coupon  discount',  discount)
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
    }
    document.getElementById('payment_coupon').innerHTML = parseFloat(discount).toLocaleString('de-DE', {maximumFractionDigits: 2, minimumFractionDigits: 2, minimumIntegerDigits:1 }) +' €';
    document.getElementById('payment_giftoption').innerHTML = totalgiftprice.toLocaleString('de-DE', {maximumFractionDigits: 2, minimumFractionDigits: 2, minimumIntegerDigits:1 }) +' €';
    document.getElementById('payment_total').innerHTML = (total_with_coupon + totalgiftprice).toLocaleString('de-DE', {maximumFractionDigits: 2, minimumFractionDigits: 2, minimumIntegerDigits:1 }) +' €';
}

function switchoptions(element){
    console.log(options) 
    console.log('switch options id', element.getAttribute('data-cartItemId'));
    console.log('switch options q', element.getAttribute('data-ItemId-Quantity'));
    console.log('switch options type', element.getAttribute('data-type'));
    var id = element.getAttribute('data-cartItemId');
    var q = element.getAttribute('data-ItemId-Quantity');
    var type = element.getAttribute('data-type');

    var optionindex = options.findIndex(function(element) {
        return element.cartItemId === id;
      });

    if (type === 'card'){
        var toggleelement = document.getElementById(id+q+type);
        toggleelement.style.display === 'none'? toggleelement.style.display = 'table-row':toggleelement.style.display = 'none';

        options[optionindex].options[q].card = !options[optionindex].options[q].card;

    } else {

        options[optionindex].options[q].packing = !options[optionindex].options[q].packing;

    }

    //update cookie
    setCookie('options', JSON.stringify(options), 365);

    //update price
    renderPrice();
}


function opengallery(element){
    itemreference = element;
    $("#selecttemplatemodal").modal('toggle');
}

function chooseImagefromGallery(image){

    console.log('image', image)
    $("#selecttemplatemodal").modal('toggle');
    itemreference.src=image;

    var id = itemreference.parentElement.parentElement.getAttribute('data-cartItemId');
    var q = itemreference.parentElement.parentElement.getAttribute('data-Quantity');

    var optionindex = options.findIndex(function(element) {
        return element.cartItemId === id;
      });
    
      options[optionindex].options[q].cardoptions.image = image;

    //update cookie
    setCookie('options', JSON.stringify(options), 365);
}

function onTextChange(element){
    console.log(element)
    console.log(element.parentElement.parentElement)

    var id = element.parentElement.parentElement.getAttribute('data-cartItemId');
    var q = element.parentElement.parentElement.getAttribute('data-Quantity');

    console.log(id, q)

    var optionindex = options.findIndex(function(element) {
        return element.cartItemId === id;
      });
    
      options[optionindex].options[q].cardoptions.text = element.value;

      //update cookie
    setCookie('options', JSON.stringify(options), 365);
}

function onRadioChange(element){
    console.log(element)
    console.log(element.parentElement.parentElement.parentElement.parentElement)

    var id = element.parentElement.parentElement.parentElement.parentElement.getAttribute('data-cartItemId');
    var q = element.parentElement.parentElement.parentElement.parentElement.getAttribute('data-Quantity');

    console.log(id, q)

    var optionindex = options.findIndex(function(element) {
        return element.cartItemId === id;
      });
    
    options[optionindex].options[q].cardoptions.style = element.value;

    //update cookie
    setCookie('options', JSON.stringify(options), 365);
}

