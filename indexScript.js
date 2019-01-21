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
    "sprzedaze": ["samochody_id", "klienci_id", "pracownicy_id", "salony_id", "data"],
    "pracownicy": ["imie", "nazwisko", "pozycja", "placa", "salony_id"]
};
var selectOptions = {
    "paliwo": ["wszystko", "selectPaliwoById"],
    "marki": ["wszystko", "selectMarkaById"],
    "modele": ["wszystko", "selectModelBelowPrice", "selectModelAbovePrice", "selectModelById"],
    "samochody": ["wszystko", "sprzedaneSamochody", "nieSprzedaneSamochody", "selectSamochodById"],
    "klienci": ["wszystko", "klienciBezZakupu", "selectKlientByName", "selectKlientById"],
    "salony": ["wszystko", "selectSalonByCity", "selectSalonById"],
    "sprzedaze": ["wszystko", "selectSprzedazBeforeDate", "selectSprzedazAfterDate", "selectSprzedazById"],
    "pracownicy": ["wszystko", "selectPracownikByName", "selectPracownikBySalonId", "selectPracownikById"]
};
var functionArgs = {
    "selectKlientByName": ["imie", "nazwisko"],
    "selectPracownikByName": ["imie", "nazwisko"],
    "selectSalonByCity": ["miasto"],
    "selectModelBelowPrice": ["cena"],
    "selectModelAbovePrice": ["cena"],
    "selectPracownikBySalonId": ["salony_id"],
    "selectSprzedazBeforeDate": ["data"],
    "selectSprzedazAfterDate": ["data"],
    "selectPaliwoById": ["paliwo_id"],
    "selectModelById": ["modele_id"],
    "selectSamochodById": ["samochody_id"],
    "selectKlientById": ["klienci_id"],
    "selectSprzedazById": ["sprzedaze_id"],
    "selectPracownikById": ["pracownicy_id"],
    "selectSalonById": ["salony_id"],
    "selectMarkaById": ["marki_id"]
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
    "sprzedaneSamochody": "Sprzedane",
    "nieSprzedaneSamochody": "Nie sprzedane",
    "klienciBezZakupu": "Bez zakupu",
    "selectKlientByName": "Po nazwisku",
    "selectPracownikByName": "Po nazwisku",
    "selectSalonByCity": "Po mieście",
    "selectModelBelowPrice": "Poniżej ceny",
    "selectModelAbovePrice": "Powyżej ceny",
    "selectPracownikBySalonId": "Po ID salonu",
    "selectSprzedazBeforeDate": "Przed datą",
    "selectSprzedazAfterDate": "Po dacie",
    "selectPaliwoById": "Po ID",
    "selectModelById": "Po ID",
    "selectSamochodById": "Po ID",
    "selectKlientById": "Po ID",
    "selectSprzedazById": "Po ID",
    "selectPracownikById": "Po ID",
    "selectSalonById": "Po ID",
    "selectMarkaById": "Po ID"
};
var numbers = ["moc", "cena", "spalanie", "masa", "placa", "rocznik", "samochody_id", "modele_id", "marki_id", "paliwo_id", "pracownicy_id", "klienci_id", "sprzedaze_id", "salony_id"];
var views = ["sprzedaneSamochody", "nieSprzedaneSamochody", "klienciBezZakupu", "wszystko"];

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
    var children = document.getElementsByTagName("INPUT");
    var data = {};
    for (var i = 0; i < children.length; i++)
    {
        if(children[i].name != "przeslijButton")
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
    if(document.getElementById("functionSelect").value != "wszystko")
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
    var children = document.getElementsByTagName("INPUT");
    var data = {};
    for (var i = 0; i < children.length; i++)
    {
        if(children[i].name != "przeslijButton")
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
    var children = document.getElementsByTagName("INPUT");
    var data = {};
    for(var i = 0; i < children.length; i++)
    {
        if(children[i].name != "przeslijButton")
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
        {
            var string = '<div class="' + object["status"] + '" id="messageText">' + object["msg"] + '</div>';
            div.innerHTML = string;
        }
    }
}


function _function()
{
    //wykonuje wybraną funkcję, chyba trochę inne zachowanie dla widoków
    var value = document.getElementById("functionSelect").value;
    var children = document.getElementsByTagName("INPUT");
    var data = {};
    data["functionName"] = value;
    if(views.indexOf(value) == -1)
    {
        data["function"] = "true";
        for (var i = 0; i < children.length; i++)
        {
            if(children[i].name != "przeslijButton")
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
        div.innerHTML = `<div class="container selectContainer">Tabela:
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
                        </div><div id="functionSelectArea"></div>`;
        document.getElementById("tableSelect").addEventListener("change", tableChanged);
    }
    else
    {
        div.innerHTML = ``;
    }
    var text = document.getElementById("messageText");
    if(text != undefined)
        text.outerHTML = '';
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
                string += '<hr />'
                string += propertyInputString(tableName);
                string += '<hr /><div class="container buttonContainer"><input type="button" id="przeslijButton" name="przeslijButton" onclick="_insert()" value="Dodaj" disabled /></div>';
                break;
            }
            case "delete":
            {
                string += idInputString(tableName);
                string += '<div class="container buttonContainer"><input type="button" id="przeslijButton" name="przeslijButton" onclick="_delete()" value="Usuń" disabled /></div>'
                break;
            }
            case "update":
            {
                string += idInputString(tableName);
                string += propertyInputString(tableName);
                string += '<div class="container buttonContainer"><input type="button" id="przeslijButton" name="przeslijButton" onclick="_update()" value="Popraw" disabled /></div>'
                break;
            }
            case "select":
            {
                string = '<div class="container selectContainer">Dane:<select id="functionSelect">';
                string += selectOptionString(tableName);
                string += '</select></div><div id="functionArgumentArea"></div><div class="container buttonContainer"><input type="button" id="przeslijButton" name="przeslijButton" onclick="_select()" value="Odczytaj" /></div>'
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

    var text = document.getElementById("messageText");
    if(text != undefined)
        text.outerHTML = '';
}

function idInputString(tableName)
{
    return '<div class="container">' + nameTranslate[tableName + '_id'] + ':<input class="textInput" type="number" name="' + tableName + '_id" placeholder="' + nameTranslate[tableName + '_id'] + '" min="0" /></div>';
}

function propertyInputString(tableName)
{
    var inputs = tableFields[tableName];
    var string = "";

    for(var i = 0; i < inputs.length; i++)
    {
        string += '<div class="container">' + nameTranslate[inputs[i]] + ':<input class="textInput" name="' + inputs[i] + '" placeholder="' + nameTranslate[inputs[i]] + '" ';
        if(numbers.indexOf(inputs[i]) > -1)
            string += 'type="number" min="0" ';
        else if(inputs[i] == "data")
            string += 'type="date" ';
        string += '/></div>';
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
    var button = document.getElementById("przeslijButton");
    var div = document.getElementById("functionArgumentArea");
    if(views.indexOf(value) == -1)
    {
        //to funkcja
        var tab = functionArgs[value];
        var string = '<hr />';
        for(var i = 0; i < tab.length; i++)
        {
            string += '<div class="container">'+ nameTranslate[tab[i]] + ':<input class="textInput" name="' + tab[i] + '" placeholder="' + nameTranslate[tab[i]] + '" ';
            if(numbers.indexOf(tab[i]) > -1)
                string += 'type="number"  min="0"';
            else if(tab[i] == "data")
                string += 'type="date"  min="1886"';
            string += '/></div>';
        }
        string += '<hr />';
        div.innerHTML = string;
        var inputs = document.getElementsByTagName("INPUT");
        button.disabled = true;
        for(var i = 0; i < inputs.length; i++)
            inputs[i].addEventListener("blur", validateOne);
    }
    else
    {
        //to widok
        div.innerHTML = "";
        button.disabled = false;
    }

    var text = document.getElementById("messageText");
    if(text != undefined)
        text.outerHTML = '';
}

function jsonObjectToTable(jsonObject)
{
    var keys = [];
    var string = '<table id="responseTable">';
    if(Array.isArray(jsonObject))
    {
        keys = Object.keys(jsonObject[0]);
        string += '<tr class="headerRow">';
        for(var i = 0; i < keys.length; i++)
        {
            string += '<th onclick="sortTable(' + i + ')"><span class="tableHeader">' + nameTranslate[keys[i]] + '</span></th>';
        }
        string += "</tr>";
        for(var i = 0; i < jsonObject.length; i++)
        {
            string += "<tr>";
            for(var j = 0; j < keys.length; j++)
            {
                string += "<td>";
                if(keys[j] == "vin")
                    string += '<span class="vin">';
                string += jsonObject[i][keys[j]] + "</td>";
                if(keys[j] == "vin")
                    string += '</span>';
            }
            string += "</tr>";
        }
    }
    else
    {
        keys = Object.keys(jsonObject);
        string += '<tr class="headerRow">';
        for(var i = 0; i < keys.length; i++)
        {
            string += '<th onclick="sortTable(' + i + ')"><span class="tableHeader">' + keys[i] + '</span></th>';
        }
        string += '</tr><tr>';
        for(var j = 0; j < keys.length; j++)
        {
            string += "<td>";
            if(keys[j] == "vin")
                string += '<span class="vin">';
            strin += jsonObject[keys[j]] + "</td>";
            if(keys[j] == "vin")
                string += '</span>';
        }
        string += "</tr>";
    }
    return string += "</table>";
}

function validateOne(event)
{
    var object = event.target;
    var valid = false;
    if(object.name == "przeslijButton")
        return;
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
        object.style.border = "1px solid #eee";
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

function sortTable(n)
{
    //var table = document.getElementById("responseTable");
    var table = document.getElementsByTagName("TABLE")[0];
    var rows;
    var a, b, head = table.rows[0].getElementsByTagName("TH")[n];
    var i;
    var dir = "asc";
    var switching = true;
    var shouldSwitch;
    var switchCount = 0;
    while(switching)
    {
        switching = false;
        rows = table.rows;
        for(i = 1; i < (rows.length - 1); i++)
        {
            shouldSwitch = false;
            a = rows[i].getElementsByTagName("TD")[n];
            b = rows[i+1].getElementsByTagName("TD")[n];
            if(dir == "asc")
            {
                if(numbers.indexOf(reverseNameTranslate(head.innerText)) > -1)
                {
                    if(parseFloat(a.innerHTML) > parseFloat(b.innerHTML))
                    {
                        shouldSwitch = true;
                        break;
                    }
                }
                else
                {
                    if(a.innerHTML.toLowerCase() > b.innerHTML.toLowerCase())
                    {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            else if(dir == "desc")
            {
                if(numbers.indexOf(reverseNameTranslate(head.innerText)) > -1)
                {
                    if(parseFloat(a.innerHTML) < parseFloat(b.innerHTML))
                    {
                        shouldSwitch = true;
                        break;
                    }
                }
                else
                {
                    if(a.innerHTML.toLowerCase() < b.innerHTML.toLowerCase())
                    {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if(shouldSwitch)
        {
            rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
            switching = true;
            switchCount++;
        }
        else
        {
            if(switchCount == 0 && dir == "asc")
            {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function reverseNameTranslate(name)
{
    for(i in nameTranslate)
    {
        if(nameTranslate[i] == name)
            return i;
    }
}