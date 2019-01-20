if(document.readyState == "loading")
{
    document.addEventListener("DOMContentLoaded", ready);
}
else
{
    ready();
}

var tableFields = {
    "paliwo": ["nazwa"],
    "marki": ["nazwa"],
    "modele": ["marki_id", "nazwa", "moc", "masa", "paliwo_id", "spalanie", "rocznik", "cena"],
    "samochody": ["modele_id", "salony_id", "vin"],
    "klienci": ["imie", "nazwisko", "miasto", "ulica"],
    "salony": ["miasto", "ulica"],
    "sprzedaze": ["samochody_id", "klienci_id", "pracownicy_id", "salody_id", "data"],
    "pracownicy": ["imie", "nazwisko", "pozycja", "placa", "salony_id"]
};
var selectOptions = {
    "paliwo": ["wszystko"],
    "marki": ["wszystko"],
    "modele": ["wszystko", "modeleWgSpalaniaPaliwa", "modeleWgCeny"],
    "samochody": ["wszystko", "sprzedaneSamochody", "nieSprzedaneSamochody"],
    "klienci": ["wszystko", "klienciBezZakupu", "selectKlientByName"],
    "salony": ["wszystko"],
    "sprzedaze": ["wszystko"],
    "pracownicy": ["wszystko"]
};
var functionArgs = {
    "selectKlientByName": ["imie", "nazwisko"]
};
var nameTranslate = {
    "paliwo_id": "Paliwo ID",
    "marki_id": "Marka ID",
    "samochody_id": "Samochód ID",
    "modele_id": "Model ID",
    "salony_id": "Salon ID",
    "pracownicy_id": "Pracownik ID",
    "klienci_id": "Klient ID",
    "sprzedaze_id": "Sprzedaż ID",
    "nazwa": "Nazwa",
    "moc": "Moc",
    "masa": "Masa",
    "spalanie": "Spalanie",
    "rocznik": "Rocznik",
    "cena": "Cena",
    "vin": "VIN",
    "imie": "Imię",
    "nazwisko": "Nazwisko",
    "miasto": "Miasto",
    "ulica": "Ulica",
    "data": "Data",
    "pozycja": "Pozycja",
    "placa": "Płaca",
    "wszystko": "Wszystko",
    "modeleWgSpalaniaPaliwa": "Wg. spalania",
    "modeleWgCeny": "Wg. ceny",
    "sprzedaneSamochody": "Sprzedane",
    "nieSprzedaneSamochody": "Nie sprzedane",
    "klienciBezZakupu": "Bez zakupu",
    "selectKlientByName": "Po nazwisku"
};
var numbers = ["moc", "cena", "spalanie", "masa", "placa", "rocznik", "samochody_id", "modele_id", "marki_id", "paliwo_id", "pracownicy_id", "klienci_id", "sprzedaze_id", "salony_id"];
var views = ["sprzedaneSamochody", "nieSprzedaneSamochody", "klienciBezZakupu", "modeleWgSpalaniaPaliwa", "modeleWgCeny", "wszystko"];

function ready()
{
    document.getElementById("modeSelect").addEventListener("change", modeChanged);
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
    var children = document.getElementById("przeslijButton").parentNode.children;
    var data = {};
    for (var i = 0; i < children.length; i++)
    {
        if(children[i].tagName == "INPUT" && children[i].name != "przeslijButton")
            data[children[i].name] = children[i].value;
    }
    data["tableName"] = document.getElementById("tableSelect").value;
    request = getRequestObject();
    request.onreadystatechange = _response;
    request.open("POST", "http://pascal.fis.agh.edu.pl/~6zbrozek/ProjektBazy/rest/insert", true);
    console.log(data);
    request.send(JSON.stringify(data));
}

function _select()
{
    if(document.selectForm.functionSelect.value != "wszystko")
        return _function();
    var data = {};
    data["tableName"] = document.getElementById("tableSelect").value;
    console.log(data);
    request = getRequestObject();
    request.onreadystatechange = _response;
    request.open("POST", "http://pascal.fis.agh.edu.pl/~6zbrozek/ProjektBazy/rest/select", true);
    request.send(JSON.stringify(data));
}

function _update()
{
    var children = document.getElementById("przeslijButton").parentNode.children;
    var data = {};
    for (var i = 0; i < children.length; i++)
    {
        if(children[i].tagName == "INPUT" && children[i].name != "przeslijButton")
            data[children[i].name] = children[i].value;
    }
    data["tableName"] = document.getElementById("tableSelect").value;
    request = getRequestObject();
    request.onreadystatechange = _response;
    request.open("POST", "http://pascal.fis.agh.edu.pl/~6zbrozek/ProjektBazy/rest/update", true);
    console.log(data);
    request.send(JSON.stringify(data));
}

function _delete()
{
    var children = document.getElementById("przeslijButton").parentNode.children;
    var data = {};
    for(var i = 0; i < children.length; i++)
    {
        if(children[i].tagName == "INPUT" && children[i].name != "przeslijButton")
        {    
            data["idValue"] = children[i].value;
            data["idName"] = children[i].name;
        }
    }
    data["tableName"] = document.getElementById("tableSelect").value;
    console.log(data);
    request = getRequestObject();
    request.onreadystatechange = _response;
    request.open("POST", "http://pascal.fis.agh.edu.pl/~6zbrozek/ProjektBazy/rest/delete", true);
    request.send(JSON.stringify(data));
}

function _response()
{
    if (request.readyState == 4)
    {
        var div = document.getElementById("responseArea");
        var object = JSON.parse(request.response);
        console.log(object);
        if(object["msg"] == undefined)
            div.innerHTML = jsonObjectToTable(object);
        else
            div.innerHTML = object["msg"];
    }
}


function _function()
{
    //wykonuje wybraną funkcję, chyba trochę inne zachowanie dla widoków
    var value = document.selectForm.functionSelect.value;
    var children = document.getElementById("functionArgumentArea").children;
    var data = {};
    data["functionName"] = value;
    if(views.indexOf(value) == -1)
    {
        data["function"] = "true";
        for (var i = 0; i < children.length; i++)
        {
            if(children[i].tagName == "INPUT")
                data[children[i].name] = children[i].value;
        }
    }
    else
    {
        data["function"] = "false";
    }
    console.log(data);
    request = getRequestObject();
    request.onreadystatechange = _response;
    request.open("POST", "http://pascal.fis.agh.edu.pl/~6zbrozek/ProjektBazy/rest/function", true);
    request.send(JSON.stringify(data));
}

function modeChanged(event)
{
    var div = document.getElementById("tableSelectArea");
    var tableSelect = document.getElementById("tableSelect");
    var value = event.target.value;
    if(value != "none")
    {
        div.innerHTML = `<p>Wybierz tabelę:</p>
                        <select id="tableSelect">
                            <option value="none">-</option>
                            <option value="paliwo">Paliwo</option>
                            <option value="marki">Marki</option>
                            <option value="modele">Modele</option>
                            <option value="samochody">Samochody</option>
                            <option value="salony">Salony</option>
                            <option value="pracownicy">Pracownicy</option>
                            <option value="klienci">Klienci</option>
                            <option value="sprzedaze">Sprzedaze</option>
                        </select>
                        <div id="functionSelectArea"></div>`;
        document.getElementById("tableSelect").addEventListener("change", tableChanged);
    }
    else
    {
        div.innerHTML = ``;
    }
}

function tableChanged(event)
{
    var div = document.getElementById("functionSelectArea");
    var tableName = document.getElementById("tableSelect").value;
    var string = "";

    if(tableName != "none")
    {
        switch(document.getElementById("modeSelect").value)
        {
            case "insert":
            {
                string = '<form name="insertForm" action="#">';
                string += propertyInputString(tableName);
                string += '<input type="button" id="przeslijButton" name="przeslijButton" onclick="_insert()" value="Dodaj" disabled /></form>';
                break;
            }
            case "delete":
            {
                string = '<form name="deleteForm" action="#">';
                string += idInputString(tableName);
                string += '<input type="button" id="przeslijButton" name="przeslijButton" onclick="_delete()" value="Usuń" disabled /></form>'
                break;
            }
            case "update":
            {
                string = '<form name="updateForm" action="#">';
                string += idInputString(tableName);
                string += propertyInputString(tableName);
                string += '<input type="button" id="przeslijButton" name="przeslijButton" onclick="_update()" value="Popraw" disabled /></form>'
                break;
            }
            case "select":
            {
                string = '<p>Które dane?</p><form name="selectForm" action="#"><select id="functionSelect" name="functionSelect">';
                string += selectOptionString(tableName);
                string += '</select><div id="functionArgumentArea"></div><input type="button" id="przeslijButton" name="przeslijButton" onclick="_select()" value="Odczytaj" /></form>'
                break;
            }
        }
    }

    div.innerHTML = string;
    if(document.getElementById("functionSelect") != undefined)
        document.getElementById("functionSelect").addEventListener("change", functionChanged);

    var inputs = document.getElementsByTagName("INPUT");
    for(var i = 0; i < inputs.length; i++)
        inputs[i].addEventListener("blur", validateOne);
}

function idInputString(tableName)
{
    return '<input type="number" name="' + tableName + '_id" placeholder="' + nameTranslate[tableName + '_id'] + '" min="0" />';
}

function propertyInputString(tableName)
{
    var inputs = tableFields[tableName];
    var string = "";

    for(var i = 0; i < inputs.length; i++)
    {
        string += '<input name="' + inputs[i] + '" placeholder="' + nameTranslate[inputs[i]] + '" ';
        if(numbers.indexOf(inputs[i]) > -1)
            string += 'type="number" min="0"';
        else if(inputs[i] == "data")
            string += 'type="date" min="1886"';
        string += '/>';
    }

    return string;
}

function selectOptionString(tableName)
{
    var options = selectOptions[tableName];
    var string = '';
    for(var i = 0; i < options.length; i++)
    {
        string += '<option value="' + options[i] + '">' + nameTranslate[options[i]] + '</option>';
    }

    return string;
}

function functionChanged(event)
{
    var value = event.target.value;
    var button = selectForm.przeslijButton;
    var div = document.getElementById("functionArgumentArea");
    if(views.indexOf(value) == -1)
    {
        //to funkcja
        var tab = functionArgs[value];
        var string = '';
        for(var i = 0; i < tab.length; i++)
        {
            string += '<input name="' + tab[i] + '" ';
            if(numbers.indexOf(tab[i]) > -1)
                string += 'type="number"  min="0"';
            else if(tab[i] == "data")
                string += 'type="date"  min="1886"';
            string += '/>'
        }
        div.innerHTML = string;
        button.disabled = false;
    }
    else
    {
        //to widok
        div.innerHTML = "";
        button.disabled = false;
    }
}

function jsonObjectToTable(jsonObject)
{
    var keys = [];
    var string = "<table>";
    if(Array.isArray(jsonObject))
    {
        keys = Object.keys(jsonObject[0]);
        string += "<tr>";
        for(var i = 0; i < keys.length; i++)
        {
            string += "<th>" + nameTranslate[keys[i]] + "</th>";
        }
        string += "</tr>";
        for(var i = 0; i < jsonObject.length; i++)
        {
            string += "<tr>";
            for(var j = 0; j < keys.length; j++)
            {
                string += "<td>" + jsonObject[i][keys[j]] + "</td>";
            }
            string += "</tr>";
        }
    }
    else
    {
        keys = Object.keys(jsonObject);
        string += "<tr>";
        for(var i = 0; i < keys.length; i++)
        {
            string += "<th>" + keys[i] + "</th>";
        }
        string += "</tr><tr>";
        for(var j = 0; j < keys.length; j++)
        {
            string += "<td>" + jsonObject[keys[j]] + "</td>";
        }
        string += "</tr>";
    }
    return string += "</table>";
}

function validateOne(event)
{
    var object = event.target;
    var valid = false;
    if(numbers.indexOf(object.name) > -1)
    {
        //Pola typu number
        if(object.value == "");
        else if(parseFloat(object.value) < 0);
        else if(object.name.includes("_id") && !Number.isInteger(parseFloat(object.value)));
        else
            valid = true;
    }
    else
    {
        //Pozostałe pola
        if(object.value == "");
        else if(object.name == "vin" && object.value.length != 17);
        else
            valid = true;
    }
    if(valid)
        object.style.border = "1px solid gray";
    else
        object.style.border = "1px solid red";

    validate();
}

function validate()
{
    var inputs = document.getElementsByTagName("INPUT");
    var button = document.getElementById("przeslijButton");
    for(var i = 0; i < inputs.length; i++)
    {
        if(inputs[i].style.border == "1px solid red" || inputs[i].value == "")
        {
            button.disabled = true;
            return false;
        }
    }
    button.disabled = false;
    return true;
}