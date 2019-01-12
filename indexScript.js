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

function _insert()
{
    var klient = {};
    klient.tableName = "klienci";
    klient.imie = insertKlientForm.imie.value;
    klient.nazwisko = insertKlientForm.nazwisko.value;
    klient.miasto = insertKlientForm.miasto.value;
    klient.ulica = insertKlientForm.ulica.value;
    var toSend = JSON.stringify(klient);
    request = getRequestObject();
    request.open("POST", "http://pascal.fis.agh.edu.pl/~6zbrozek/ProjektBazy/rest/save", true);
    request.send(toSend);
}

function _select()
{
    var children = selectKlientForm.children;
    var klient = {};
    klient.tableName = "klienci";
    for (var i = 0; i < children.length; i++)
    {
        if(children[i].tagName == "INPUT" && children[i].name != "przeslijButton" && children[i].value != "")
            klient[children[i].name] = children[i].value;
    }
    var toSend = JSON.stringify(klient);
    request = getRequestObject();
    request.onreadystatechange = function()
    {
        if (request.readyState == 4)
        {
            var div = document.getElementById("response");
            var json = JSON.parse(request.response);
            var txt;
            for (var id in json)
            {
                txt +=  id+": {";
                for (var prop in json[id])
                {
                    txt += prop+ ":"+ json[id][prop] + ",";
                }
                txt +="}<br/>";
            }
            div.innerHTML = txt;
        }
    }
    request.open("GET", "http://pascal.fis.agh.edu.pl/~6zbrozek/ProjektBazy/rest/list", true);
    request.send(toSend);
}