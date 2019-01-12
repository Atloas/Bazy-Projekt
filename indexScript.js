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
    document.getElementById("insertTableSelect").addEventListener("change", insertTableChanged)
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
    var children = document.getElementById("insertArgumentArea").children;
    var data = {};
    for (var i = 0; i < children.length; i++)
    {
        if(children[i].tagName == "INPUT" && children[i].name != "przeslijButton")
            data[children[i].name] = children[i].value;
    }
    data["tableName"] = insertForm.tableSelect.value;
    request = getRequestObject();
    request.onreadystatechange = _insertResponse;
    request.open("POST", "http://pascal.fis.agh.edu.pl/~6zbrozek/ProjektBazy/rest/save", true);
    console.log(data);
    request.send(JSON.stringify(data));
}

function _select()
{
    var data = {};
    data["tableName"] = selectForm.tableSelect.value;
    var jsonstring = JSON.stringify(data);
    console.log(jsonstring);
    request = getRequestObject();
    request.onreadystatechange = _selectResponse;
    request.open("GET", "http://pascal.fis.agh.edu.pl/~6zbrozek/ProjektBazy/rest/list/" + data["tableName"], true);
    request.send(null);
}

function _insertResponse()
{
    if (request.readyState == 4)
    {
        var div = document.getElementById("response");
        div.innerHTML = request.response;
    }
}

function _selectResponse()
{
    if (request.readyState == 4)
    {
        var div = document.getElementById("response");
        div.innerHTML = request.response;
    }
}

function insertTableChanged(event)
{
    var value = event.target.value;
    var div = document.getElementById("insertArgumentArea");
    var button = document.getElementById("insertButton");
    switch(value)
    {
        case "none":
        {
            div.innerHTML = "";
            button.disabled = true;
            break;
        }
        case "klienci":
        {
            div.innerHTML = `<input name="imie" />
                            <input name="nazwisko" />
                            <input name="miasto" />
                            <input name="ulica" />`;
            button.disabled = false;
            break;
        }
        case "samochody":
        {
            div.innerHTML = `<input name="model_id" type="number"/>
                            <input name="salon_id" type="number"/>
                            <input name="vin" />`;
            button.disabled = false;
            break;
        }
        case "pracownicy":
        {
            div.innerHTML = `<input name="imie" />
                            <input name="nazwisko" />
                            <input name="pozycja" />
                            <input name="placa" type="number" />
                            <input name="salon_id" type="number" />`;
            button.disabled = false;
            break;
        }
        case "modele":
        {
            div.innerHTML = `<input name="marka_id" type="number" />
                            <input name="nazwa" />
                            <input name="moc" type="number" />
                            <input name="masa" type="number" />
                            <input name="paliwo_id" type="number" />
                            <input name="spalanie" />
                            <input name="rocznik" type="number" />
                            <input name="cena" type="number" />`;
            button.disabled = false;
            break;
        }
        case "sprzedaze":
        {
            div.innerHTML = `<input name="samochod_id" type="number" />
                            <input name="klient_id" type="number" />
                            <input name="pracownik_id" type="number" />
                            <input name="salon_id" type="number" />
                            <input name="data" type="date"/>`;
            button.disabled = false;
            break;
        }
        case "marki":
        {
            div.innerHTML = `<input name="nazwa" />`;
            button.disabled = false;
            break;
        }
        case "paliwo":
        {
            div.innerHTML = `<input name="nazwa" />`;
            button.disabled = false;
            break;
        }
        case "salony":
        {
            div.innerHTML = `<input name="miasto" />
                            <input name="ulica" />`;
            button.disabled = false;
            break;
        }
    }
}