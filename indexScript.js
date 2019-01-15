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
    insertForm.tableSelect.addEventListener("change", insertTableChanged);
    selectForm.tableSelect.addEventListener("change", selectTableChanged);
    updateForm.tableSelect.addEventListener("change", updateTableChanged);
    deleteForm.tableSelect.addEventListener("change", deleteTableChanged);
    functionForm.functionSelect.addEventListener("change", functionChanged);
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
    request.onreadystatechange = _response;
    request.open("POST", "http://pascal.fis.agh.edu.pl/~6zbrozek/ProjektBazy/rest/insert", true);
    console.log(data);
    request.send(JSON.stringify(data));
}

function _select()
{
    var data = {};
    data["tableName"] = selectForm.tableSelect.value;
    console.log(data);
    request = getRequestObject();
    request.onreadystatechange = _response;
    request.open("POST", "http://pascal.fis.agh.edu.pl/~6zbrozek/ProjektBazy/rest/select", true);
    request.send(JSON.stringify(data));
}

function _update()
{
    var children = document.getElementById("updateArgumentArea").children;
    var data = {};
    for (var i = 0; i < children.length; i++)
    {
        if(children[i].tagName == "INPUT" && children[i].name != "przeslijButton")
            data[children[i].name] = children[i].value;
    }
    data["tableName"] = updateForm.tableSelect.value;
    request = getRequestObject();
    request.onreadystatechange = _response;
    request.open("POST", "http://pascal.fis.agh.edu.pl/~6zbrozek/ProjektBazy/rest/update", true);
    console.log(data);
    request.send(JSON.stringify(data));
}

function _delete()
{
    var children = document.getElementById("deleteArgumentArea").children;
    var data = {};
    for(var i = 0; i < children.length; i++)
    {
        if(children[i].tagName == "INPUT" && children[i].name != "przeslijButton")
        {    
            data["idValue"] = children[i].value;
            data["idName"] = children[i].name;
        }
    }
    data["tableName"] = deleteForm.tableSelect.value;
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
        var div = document.getElementById("response");
        var object = JSON.parse(request.response);
        console.log(object);
        div.innerHTML = jsonObjectToTable(object);
    }
}

var views = [
    "sprzedaneSamochody",
    "nieSprzedaneSamochody",
    "klienciBezZakupu",
    "modeleWgSpalaniaPaliwa",
    "modeleWgCenyMarki"
]
function _function()
{
    //wykonuje wybraną funkcję, chyba trochę inne zachowanie dla widoków
    var value = functionForm.functionSelect.value;
    var children = document.getElementById("updateArgumentArea").children;
    var data = {};
    data["functionName"] = value;
    if(views.indexOf(value) == -1)
    {
        data["function"] = "true";
        for (var i = 0; i < children.length; i++)
        {
            if(children[i].tagName == "INPUT" && children[i].name != "przeslijButton")
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

function insertTableChanged(event)
{
    var value = event.target.value;
    var div = document.getElementById("insertArgumentArea");
    var button = insertForm.przeslijButton;
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
            div.innerHTML = `<input name="modele_id" type="number"/>
                            <input name="salony_id" type="number"/>
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
                            <input name="salony_id" type="number" />`;
            button.disabled = false;
            break;
        }
        case "modele":
        {
            div.innerHTML = `<input name="marki_id" type="number" />
                            <input name="nazwa" />
                            <input name="moc" type="number" />
                            <input name="masa" type="number" />
                            <input name="paliwo_id" type="number" />
                            <input name="spalanie" type="number" />
                            <input name="rocznik" type="number" />
                            <input name="cena" type="number" />`;
            button.disabled = false;
            break;
        }
        case "sprzedaze":
        {
            div.innerHTML = `<input name="samochody_id" type="number" />
                            <input name="klienci_id" type="number" />
                            <input name="pracownicy_id" type="number" />
                            <input name="salony_id" type="number" />
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

function selectTableChanged(event)
{
    var value = event.target.value;
    var button = selectForm.przeslijButton;
    if(value == "none")
        button.disabled = true;
    else
        button.disabled = false;
}

function updateTableChanged(event)
{
    var value = event.target.value;
    var div = document.getElementById("updateArgumentArea");
    var button = updateForm.przeslijButton;
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
            div.innerHTML = `<input name="klienci_id" type="number" />
                            <input name="imie" />
                            <input name="nazwisko" />
                            <input name="miasto" />
                            <input name="ulica" />`;
            button.disabled = false;
            break;
        }
        case "samochody":
        {
            div.innerHTML = `<input name="samochody_id" type="number" />
                            <input name="modele_id" type="number"/>
                            <input name="salony_id" type="number"/>
                            <input name="vin" />`;
            button.disabled = false;
            break;
        }
        case "pracownicy":
        {
            div.innerHTML = `<input name="pracownicy_id" type="number" />
                            <input name="imie" />
                            <input name="nazwisko" />
                            <input name="pozycja" />
                            <input name="placa" type="number" />
                            <input name="salony_id" type="number" />`;
            button.disabled = false;
            break;
        }
        case "modele":
        {
            div.innerHTML = `<input name="modele_id" type="number" />
                            <input name="marki_id" type="number" />
                            <input name="nazwa" />
                            <input name="moc" type="number" />
                            <input name="masa" type="number" />
                            <input name="paliwo_id" type="number" />
                            <input name="spalanie" type="number" />
                            <input name="rocznik" type="number" />
                            <input name="cena" type="number" />`;
            button.disabled = false;
            break;
        }
        case "sprzedaze":
        {
            div.innerHTML = `<input name="sprzedaze_id" type="number" />
                            <input name="samochody_id" type="number" />
                            <input name="klienci_id" type="number" />
                            <input name="pracownicy_id" type="number" />
                            <input name="salony_id" type="number" />
                            <input name="data" type="date"/>`;
            button.disabled = false;
            break;
        }
        case "marki":
        {
            div.innerHTML = `<input name="marki_id" type="number" />
                            <input name="nazwa" />`;
            button.disabled = false;
            break;
        }
        case "paliwo":
        {
            div.innerHTML = `<input name="paliwo_id" type="number" />
                            <input name="nazwa" />`;
            button.disabled = false;
            break;
        }
        case "salony":
        {
            div.innerHTML = `<input name="salony_id" type="number" />
                            <input name="miasto" />
                            <input name="ulica" />`;
            button.disabled = false;
            break;
        }
    }
}

function deleteTableChanged(event)
{
    var value = event.target.value;
    var button = deleteForm.przeslijButton;
    var div = document.getElementById("deleteArgumentArea");
    switch(value)
    {
        case "none":
        {
            div.innerHTML = ``;
            button.disabled = true;
            break;
        }
        case "klienci":
        {
            div.innerHTML = `<input name="klienci_id" type="number" />`;
            button.disabled = false;
            break;
        }
        case "samochody":
        {
            div.innerHTML = `<input name="samochody_id" type="number" />`;
            button.disabled = false;
            break;
        }
        case "pracownicy":
        {
            div.innerHTML = `<input name="pracownicy_id" type="number" />`;
            button.disabled = false;
            break;
        }
        case "modele":
        {
            div.innerHTML = `<input name="modele_id" type="number" />`;
            button.disabled = false;
            break;
        }
        case "sprzedaze":
        {
            div.innerHTML = `<input name="sprzedaze_id" type="number" />`;
            button.disabled = false;
            break;
        }
        case "marki":
        {
            div.innerHTML = `<input name="marki_id" type="number" />`;
            button.disabled = false;
            break;
        }
        case "paliwo":
        {
            div.innerHTML = `<input name="paliwo_id" type="number" />`;
            button.disabled = false;
            break;
        }
        case "salony":
        {
            div.innerHTML = `<input name="salony_id" type="number" />`;
            button.disabled = false;
            break;
        }
    }
}

function functionChanged(event)
{
    var value = event.target.value;
    var button = functionForm.przeslijButton;
    var div = document.getElementById("functionArgumentArea");
    if(views.indexOf(value) == -1)
    {
        //to funkcja
        switch(value)
        {
            case "none":
            {
                div.innerHTML = "";
                button.disabled = true;
                break;
            }
        }
    }
    else
    {
        //to widok
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
            string += "<th>" + keys[i] + "</th>";
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