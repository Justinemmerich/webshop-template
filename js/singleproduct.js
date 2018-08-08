var products = [
    {
        itemId:'001',
        images:['6.jpg'],
        seoname:'name-aus-holz',
        price:12.90,
        hasIndividualisation: true,
        individualisationfields:[{
            placeholder:"Tobias",
            extension:undefined,
            font:true,
        },{
            placeholder:"12:32",
            extension:undefined,
            font:[],
        },{
            placeholder:"12:32",
            extension:undefined,
            font:[],
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
        images:['1.jpg','key_2.jpg'],
        productname: 'Schlüsselanhänger Gravur',
        seoname:'schluesselanhaenger-gravur',
        price:17.45,
        categories:'Metall',
        hasIndividualisation: true,
        individualisationfields:[{
            placeholder:"fontonly",
            maxChar:10,
            extension:undefined,
            font:[1,2],
        },{
            placeholder:"ext+font",
            maxChar:5,
            extension:"Uhr",
            font:[1,2],
        },{
            placeholder:"nofont",
            maxChar:4,
            extension:"g",
            font:[],
        },{
            placeholder:"nofontnoext",
            maxChar:15,
            extension:undefined,
            font:[],
        }],
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
var decorImageElement;
var decorImage = '/img/decor/1.jpeg';
var decorId = 01;
var font = 'COOKIE';
var fontpickerelement = undefined;

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
      

    // set default font & decor values
    singleproduct.font = font;
    singleproduct.decorImage = decorImage;
    singleproduct.decorId = decorId;


    renderSingleProduct();
    updateFontPreview();

    $('body').i18n();
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
    if (singleproduct.hasIndividualisation === true){
        console.log('ul',document.getElementsByClassName('individualisation')[0].querySelector('ul'));
        for(var i = 0; i < singleproduct.individualisationfields.length; i++){

            var singleindividualisation = document.createElement('li');
            singleindividualisation.innerHTML = '<input id="fontPreview'+i+'" style="font-family: COOKIE;" data-maxChar="'+singleproduct.individualisationfields[i].maxChar+'" onkeypress="IndividualisationOnKeyInput(this)" data-fonts="" class="individual-text" type="text"  placeholder="'+singleproduct.individualisationfields[i].placeholder+'" required >\
            <input id="fontPreview'+i+'extension" onclick="setFocus(fontPreview'+i+')" style="width: 30%; font-family: COOKIE; position:relative; left:-5px; z-index:10; height:50px" type="text"  value="'+singleproduct.individualisationfields[i].extension+'">\
            <div id="fontPreview'+i+'button" class="product-action" style="width: 20%;height: 50px; font-size: 2em; float:right" onclick="openFontGallery(fontPreview'+i+')">\
            <i style="top: 20%;position: relative;" class="zmdi zmdi-font"></i>\
            </div>';
            document.getElementById('individualisation-container').appendChild(singleindividualisation);

            var hasextension = singleproduct.individualisationfields[i].extension !== undefined? true:false;
            var hasfontpicker = singleproduct.individualisationfields[i].font.length == 0? false:true;
            console.log("fontPreview"+i+'extension', hasextension);
            console.log("fontPreview"+i+'font', hasfontpicker);
            
            if (hasfontpicker === false && hasextension === false){
                 document.getElementById('fontPreview'+i+'button').style.display='none';
                 document.getElementById('fontPreview'+i+'extension').style.display='none';
                 document.getElementById('fontPreview'+i).style = 'width: 100% !important;';
            }
            if (hasfontpicker === true && hasextension === false){
                document.getElementById('fontPreview'+i+'extension').style.display='none';
                document.getElementById('fontPreview'+i).style = 'width: 70% !important;';
            }
            if (hasfontpicker === false && hasextension === true){
                document.getElementById('fontPreview'+i+'button').style.display='none';
                 document.getElementById('fontPreview'+i+'extension').style='width: 20%; !important;position:relative; left: 9%; height:50px;font-family: COOKIE;';
                document.getElementById('fontPreview'+i).style = 'width: 70% !important;';
            }
        }
}

    //clear slider images
    //document.getElementsByClassName('slider-nav')[1].innerHTML = '';

    //add all photos to slider
    for(var i = 0; i < singleproduct.images.length; i++){
       $('.slider-nav').slick('slickAdd','<div> <img src="img/single-product/small/'+singleproduct.images[i]+'" alt="" /> </div>');
       $('.slider-for').slick('slickAdd','<div><img src="img/single-product/small/'+singleproduct.images[i]+'" alt="" /><a class="view-full-screen" href="img/single-product/small/'+singleproduct.images[i]+'" data-lightbox="roadtrip" ><i class="zmdi zmdi-zoom-in"></i></a></div>');
    }
    
}

function setFocus(element){
    console.log('set focus');
    element.focus();
}

function IndividualisationOnKeyInput(element){
    console.log('IndividualisationOnKeyInput', element);
    var max_chars = element.getAttribute("data-maxChar");

    if(element.value.length > max_chars-1) {
        element.value = element.value.substr(0, max_chars-1);
    }

}

function openDecorGallery(element){
        decorImageElement = element;
        $("#selectdecormodal").modal('toggle');
}

function chooseDecorfromGallery (image, id){
    console.log('chooseDecorfromGallery', image, id);
    decorImageElement.src = image;
    singleproduct.decorId = id;
    singleproduct.decorImage = image;
    $("#selectdecormodal").modal('toggle');
}

function updateFontPreview() {
    console.log('updateFontPreview');
    var text = document.getElementsByClassName('individual-text')[0].value ==='' ? 'Vorschau': document.getElementsByClassName('individual-text')[0].value ;
    //document.getElementById(fontpickerelement).innerHTML = text;
    // UPDATE GALLERY PREVIEW
    document.getElementById('fontGalleryPreview1').innerHTML = text;
    document.getElementById('fontGalleryPreview2').innerHTML = text;
    document.getElementById('fontGalleryPreview3').innerHTML = text;
    document.getElementById('fontGalleryPreview4').innerHTML = text;
    document.getElementById('fontGalleryPreview5').innerHTML = text;
    document.getElementById('fontGalleryPreview6').innerHTML = text;
    document.getElementById('fontGalleryPreview6').innerHTML = text;
}

function openFontGallery(element) {
    console.log('Individualisation element', element)
    fontpickerelement = element;
    $("#selectfontmodal").modal('toggle');
    //updateFontPreview();
}

function chooseFontfromGallery (element){
    console.log('chooseFontfromGallery', element.style.fontFamily);
    singleproduct.font = element.style.fontFamily;
    fontpickerelement.style.fontFamily = element.style.fontFamily;
    document.getElementById(fontpickerelement.id+'extension').style.fontFamily = element.style.fontFamily;
    $("#selectfontmodal").modal('toggle');
}

function addSingleProductToCart(addtocartbutton){
    console.log('addSingleProductToCart pressed')
    var quantity = document.getElementsByClassName('cart-plus-minus-box')[0].value;
    // var individualisation = document.getElementsByClassName('individual-text')[0].value;
    var individualisation = [];
    var individualisation_valid = false;

    if (singleproduct.hasIndividualisation === true){
        console.log('hasIndividualisation')

        for (var i = 0; i< singleproduct.individualisationfields.length; i++){

            console.log('singleproduct.individualisationfields[i].extention', singleproduct.individualisationfields[i].extension)
            var value = singleproduct.individualisationfields[i].extension === undefined? document.getElementById('fontPreview'+i).value : document.getElementById('fontPreview'+i).value + singleproduct.individualisationfields[i].extension;

             var individualisation_package = {
                 "value": value,
                 "font": document.getElementById('fontPreview'+i).style.fontFamily,
                 "needsfont": singleproduct.individualisationfields[i].font.length == 0? false:true,
             }

             individualisation.push(individualisation_package);
             console.log("individualisation bundle", individualisation);

        }

           //Check if all Individualisations has been set and returns true / false 
           individualisation_valid = individualisation.every(function (element, index, array) {
               console.log('element', element)
               if (element.needsfont === true){
                    if (element.value.length > 0 && element.font.length > 0){
                        return true;
                    }else{
                        return false;
                    }
               }
               else{
                if (element.value.length > 0 ){
                    return true;
                }else{
                    return false;
                }
               }
          });

        console.log('== > individualisation_valid', individualisation_valid)
        if (individualisation_valid === false){
            $("#myModal").modal({show: true});
        }
        else{
            addItemtoShoppingCart(singleproduct.itemId, singleproduct.images[0], singleproduct.productname, singleproduct.price, quantity, singleproduct.hasIndividualisation, individualisation, singleproduct.font, singleproduct.decorImage, singleproduct.decorId);
            animatecart(addtocartbutton);
             }
    } else{
        console.log('no Individualisation')
        addItemtoShoppingCart(singleproduct.itemId, singleproduct.images[0], singleproduct.productname, singleproduct.price, quantity, singleproduct.hasIndividualisation, individualisation, singleproduct.font, singleproduct.decorImage, singleproduct.decorId);
        animatecart(addtocartbutton);
    }
    
    
}