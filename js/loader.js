//append loader to page body

var loader = document.createElement('div');
 loader.innerHTML =  '<div class="modal fade" id="Loader" data-backdrop="static" data-keyboard="false" >\
                        <div class="modal-dialog centered">\
                        <img width="80px" src="img/loader2.gif" alt="Loading Image">\
                        </div>\
                        </div>';
    
document.body.appendChild(loader);

// show loader
$("#Loader").modal({show: true});
$("#Loader").data('bs.modal').$backdrop.css('opacity','0.9');

//if page has been load hide loader
window.onload = function () {
    console.log('page has been load');
    $("#Loader").modal('toggle');
}