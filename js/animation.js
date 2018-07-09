function animatecart(element) {
    console.log('button clicked');
    //var rect = element.getBoundingClientRect();
    var rect = getCoords(element);
    var width = element.offsetWidth/2;
    console.log(element.offsetWidth)
    
    console.log('top', rect.top);
    console.log('left', rect.left);

        for (var i = 0; i<3; i++){

            var div = document.createElement('div');
            div.className = "cartanimation";
            div.style ="position:absolute; top:"+(rect.top-Math.floor((Math.random()*30)+1))+"px; left:"+(rect.left+width-Math.floor((Math.random()*50)+1))+"px; z-index:9999999999999999999999";
            div.innerHTML = '<i class="zmdi zmdi-shopping-cart" style="font-size:20px; transform: rotate('+Math.floor((Math.random()*360)+1)+'deg);"></i>';
            document.body.appendChild(div);

            document.getElementsByClassName('cartanimation')[i].velocity({ top: rect.top-Math.floor((Math.random()*50)+1), opacity: 0 },
            { 
            duration: 1000,
            complete: function() {
                document.getElementsByClassName('cartanimation')[0].remove();
            }
            });

            setTimeout( function(){ 
                    if(document.getElementsByClassName('cartanimation').length > 0){
                        document.getElementsByClassName('cartanimation')[0].remove();
                    } 
                }, 1000);
            
        }

}

function animatedeletefromcart(element) {

            var rect = getCoords(element);
            console.log('animation', element);

            element.velocity({ left: -1000 }, 200);

}

function getCoords(elem) { // crossbrowser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}