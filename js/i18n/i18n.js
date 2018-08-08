$.i18n().locale = 'de';
setInitLanguageByBrowserSpecs();

function setInitLanguageByBrowserSpecs(){
    var cookie_language = getCookie('language');
    var language = cookie_language=== "none" ? undefined: cookie_language;
    
    if(language === undefined){
        var browserLang = navigator.language || navigator.userLanguage;
        var browserLangkey = browserLang.split('-')[0];
        $(".language-selection").val(browserLangkey);
        setLanguageByKey(browserLangkey);
    }else{
        $(".language-selection").val(language);
        setLanguageByKey(language);
    }
}

$.i18n().load( {
	en: 'js/i18n/lists/en.json',
	de: 'js/i18n/lists/de.json'
} ).done( function () {setInitLanguageByBrowserSpecs(); $('body').i18n();});

$('.language-selection').on('change', function(evt) {
    setLanguageByKey(evt.target.value);
  });

function setLanguageByKey(langkey){
    console.log('language set to', langkey);
    switch(langkey){
        case 'en':
        $.i18n().locale = 'en';
        break;
        case 'de':
        $.i18n().locale = 'de';
        break;
    }
    setCookie('language',langkey, 365);
    setTranslation();
}

function setTranslation(){
    try { initProducts(); } catch(err) { console.log('i18n - error:', err);}
    try { initCart(); } catch(err) {  console.log('i18n - error:', err); }
   
    $('body').i18n();
}