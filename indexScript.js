if(document.readyState == "loading")
{
    document.addEventListener("DOMContentLoaded", ready);
}
else
{
    ready();
}

function ready()
{

}

var request;
function getRequestObject()
{
    if(window.ActiveXObject)
        return(new ActiveXObject("Microsoft.XMLHTTP"));
    else if(window.XMLHttpRequest)
        return(new XMLHttpRequest());
    else
        return null;
}

function _insertKlient()
{
    var klient = {};
    klient.tableName = "klienci";
    klient.imie = insertKlientForm.imie.value;
    klient.nazwisko = insertKlientForm.nazwisko.value;
    klient.miasto = insertKlientForm.miasto.value;
    klient.ulica = insertKlientForm.ulica.value;
    var txt = JSON.stringify(klient);
    request = getRequestObject();
    request.open("POST", "http://pascal.fis.agh.edu.pl/~6zbrozek/ProjektBazy/rest/save", true);
    request.send(txt);
}