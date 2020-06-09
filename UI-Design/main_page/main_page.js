
var guest; //get navBar for guest
var user;//get navBar for user

var userLocation;
var userLogged;

var map;
var allLayers = [];

var selectedPosition;

//JavaScript Enum
const Tag = {
    OFFICE: "Main office",
    PLANT: "Plant",
    LANDFILL: "Landfill",
    MARKEDLOCATION: "Marked location",
    WILD_DUMP: "wild dump",
    BURNING_CONTAINER: "burning container",
    OVERFLOWING_CONTAINER: "overflowing container"
};

//paths to icons (from this js file)
const MarkerColor = {
    BLACK: "../Leaflet_Icon/marker-icon-black.png",    //
    BLUE: "../Leaflet_Icon/marker-icon-blue.png",     //user location
    GOLD: "../Leaflet_Icon/marker-icon-gold.png",     //selected area
    GREEN: "../Leaflet_Icon/marker-icon-green.png",    //layer
    GRAY: "../Leaflet_Icon/marker-icon-grey.png",     //layer
    ORANGE: "../Leaflet_Icon/marker-icon-orange.png",   //layer
    RED: "../Leaflet_Icon/marker-icon-red.png",      //layer
    VIOLET: "../Leaflet_Icon/marker-icon-violet.png",   //layer
    YELLOW: "../Leaflet_Icon/marker-icon-yellow.png"    //
};
const MarkerShadow = "../Leaflet_Icon/marker-shadow.png";

const layerIcon = [

    makeIcon(MarkerColor.GREEN),

    makeIcon(MarkerColor.GRAY),

    makeIcon(MarkerColor.ORANGE),

    makeIcon(MarkerColor.RED),

    makeIcon(MarkerColor.VIOLET),

    makeIcon(MarkerColor.YELLOW)

];

//initialization of map for webpage
function init() {

    guest = document.getElementById("guest");
    user = document.getElementById("user");

    //TODO: make apropriate page parametar function/handler
    resolveParameters(window.location.search);

    mapInit();

}

function resolveParameters(pageParam) {
    let url = new URLSearchParams(pageParam);
    if (url.has("user")) {
        user.style.visibility = "visible";
        guest.style.visibility = "hidden";
        userLogged = true;

    } else if (url.has("user")) {
        user.style.visibility = "hidden";
        guest.style.visibility = "visible";
        userLogged = false;

    }
    else if (url.has("operator")) {

        operator.style.visibility = "visible";
        user.style.visibility = "hidden";
        guest.style.visibility = "hidden";
        userLogged = false;
    }
    //console.log(url.has("user"));
}

function mapInit() {
    //create map instance
    map = L.map("map");

    //add tracking of user on map
    map.locate({ watch: true, setView: true, maxZoom: 11, timeout: 2000, enableHighAccuracy: true });
    map.on('locationfound', function (ev) {
        if (userLocation != undefined) map.removeLayer(userLocation);
        userLocation = L.marker(ev.latlng, { icon: makeIcon(MarkerColor.BLUE) }).bindPopup("You").addTo(map);
        //console.log("refresh");

    });
    map.on('locationerror', function (ev) {
        //console.log("can't get geolocation");
        //console.log(ev.massage);

    });

    //MUST set daccess token to get map
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "pk.eyJ1IjoibWwxNzA3MjIiLCJhIjoiY2s5YTVuMGZqMDRkajNmbnZ0M3dpZmw5aCJ9.-DN1GUj4G7MaDepRdj8V1g"
    }).addTo(map);

    //add locations sent from server
    //let url = new URLSearchParams(window.location.search);

    /*if (url.has("operator")) {
        let button = document.createElement("button");
        button.innerHTML = "Remove";
        button.setAttribute("onclick", "removeReport(this)");
        addLocations(button);
    } else {
        addLocations();	
    }*/


    //set listener for selected position

    map.on('click', function (ev) {
        if (!userLogged) return;
        let latlng = map.mouseEventToLatLng(ev.originalEvent);
        let form = createForm();
        if (selectedPosition != undefined) {
            map.removeLayer(selectedPosition);
            form.classList.remove("show");
        }

        form.classList.add("show");
        selectedPosition = L.marker([latlng.lat, latlng.lng], { icon: makeIcon(MarkerColor.GOLD) }).addTo(map);
        selectedPosition.bindPopup(form).openPopup();
        document.getElementById("desc").name = latlng.lat.toFixed(6) + " " + latlng.lng.toFixed(6);

    });
}


//Za klik na marker
function createForm() {
    let elem;
    let form = document.createElement("div");
    form.classList.add("reportForm");
    //form.style.display = "none";
    form.id = "reportForm";




    elem = document.createElement("h3");
    elem.id = "title"
    elem.textContent = "Report";
    form.appendChild(elem);

    elem = document.createElement("select");
    elem.classList.add("inFormElem");
    elem.id = "selectType";
    //
    let tmp = document.createElement("option");
    tmp.text = "wild dump";
    elem.add(tmp);
    tmp = document.createElement("option");
    tmp.text = "burning container";
    elem.add(tmp);
    tmp = document.createElement("option");
    tmp.text = "overflowing container";
    elem.add(tmp);
    //
    form.appendChild(elem);

    elem = document.createElement("textarea");
    elem.classList.add("inFormElem");
    elem.placeholder = "Description";
    elem.cols = 20;
    elem.rows = 6;
    elem.id = "desc";
    form.appendChild(elem);

    elem = document.createElement("input");
    elem.type = "button";
    elem.id = "submitReport";
    elem.value = "Submit";
    elem.classList.add("inFormElem");
    elem.classList.add("repBtn");
    elem.onclick = reportProblem;
    form.appendChild(elem);

    return form;
}

//create dialog to add description and send data to server
function reportProblem(btn) {
    //TODO: create dialog and sent information from btn.id to server
    let description = document.getElementById("desc");
    //console.log(description.name);
    let repType = document.getElementById("selectType");

    let coords = description.name.split(" ");
    //console.log(coords[0]);


    //TODO: traba da se popravi, server nesto zajebava
    let obj = {
        username: window.location.search.substring(1).split("&")[0].split("=")[1],
        longitude: coords[1],
        latitude: coords[0],
        category: repType.value,
        description: description.value
    };
    selectedPosition.closePopup();
    document.getElementById("reportForm").remove();
    console.log(obj);
    sendReportData(obj).then(() => {
        //alert('uspesno');
    }).catch((error) => {
        //alert('neuspesno'); 
        //console.log(error);
    });

}

function sendReportData(data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost:3000/report',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            crossDomain: true,
            success: function () {
                alert('success, thank you');
                resolve();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //<ovde mozes da uzmes status requesta ako je neuspesan, da vidis zasto je neuspesan, to se nalazu u xhr.status>
                //console.log("xhr.status = " + xhr.status);

                let err = (eval("(" + xhr.responseText + ")"));
                alert("Error code: " + err.code + ", message: " + err.message);
                reject();
            }
        });
    });
}


//prepares layers to get inserted into map
/*function addLocations(callback, forPopups) {
    let groups;

    fetchData(function (data) {
        groups = new EcoPatrolLayers(data, forPopups);

        if (allLayers.length != 0){
            for(let i = 0; i < allLayers.length; i++){
                map.removeLayer(allLayers[i].layerGroup);
            }
            toggleOffice = false;
            toggleLandfills = false;
            toggleOutposts = false;
        }

        for (let i = 0; i < groups.layers.length; i++) {
            allLayers.push({                                        //allLayers is global variable
                layerName: groups.layers[i].layerName,
                layerGroup: L.layerGroup(groups.layers[i].arrayOfMarkers)
            });
        }
        
        callback();
    });
}*/

function addLocations(fun, forPopup) {
    let groups;

    fetchData(function (data) {
        //console.log("server data.lenght = " + data.length);

        groups = new EcoPatrolLayers(data, forPopup);

        if (allLayers.length > 0) {
            for (let i = 0; 0 < allLayers.length; ) {
                map.removeLayer(allLayers[i].layerGroup);
                allLayers.shift();
            }
        }

        for (let i = 0; i < groups.layers.length; i++) {
            allLayers.push({                                        //allLayers is global variable
                layerName: groups.layers[i].layerName,
                layerGroup: L.layerGroup(groups.layers[i].arrayOfMarkers)
            });
        }

        fun("addLocations fin");
    });
}

function fetchData(onDone) {
    let serverData = [
        [44.773595, 20.475412, Tag.LANDFILL, "FPN"],
        [44.772966, 20.475031, Tag.LANDFILL,"FON"],
        [44.80626, 20.460272, Tag.LANDFILL, "Vlada Srbije"],
        [44.811668, 20.465983,	Tag.LANDFILL, "Narodna Skupstina"],
        [44.806016, 20.44744, Tag.LANDFILL,	"Beograd na vodi"],
        [44.874967, 20.646583, Tag.OFFICE,	"Kancelarija"]
    ];
    $.getJSON('http://localhost:3000/reports', function (data) {
        $.each(data, function (index) {
            let point = [];
            point.push(data[index].latitude);
            point.push(data[index].longitude);
            point.push(data[index].category);
            point.push(data[index].description);
            serverData.push(point);
        });
        //console.log("+++++++");
        onDone(serverData);
    });
}

//sorts locations into layers and returns array of layers
class EcoPatrolLayers {

    constructor(locations, data) {
        this.locations = locations;
        this.Layers = this.getDifferentLayers(locations);
        this.addPopups(data);
    }

    getDifferentLayers(array) {
        let Layers = [];
        for (let i = 0; i < array.length; i++) {
            if (!Layers.includes(array[i][2]))
                Layers.push(array[i][2]);
        }
        for (let i = 0; i < Layers.length; i++) {
            Layers[Layers.indexOf(Layers[i])] = {
                layerName: Layers[i],
                arrayOfMarkers: []
            };
        }
        return Layers;
    }

    addPopups(data) {
        for (let i = 0; i < this.Layers.length; i++) {
            for (let j = 0; j < this.locations.length; j++) {
                if (this.Layers[i].layerName == this.locations[j][2]) {
                    let div = document.createElement("div");
                    let p = document.createElement("p");
                    p.innerHTML = this.locations[j][3];
                    div.appendChild(p);
                    if (data != undefined) {
                        let clone = data.cloneNode(true);
                        div.appendChild(clone);
                    }
                    let name;
                    let marker = L.marker(name = [this.locations[j][0], this.locations[j][1]], { icon: layerIcon[i % layerIcon.length] });
                    div.setAttribute("name", name[1] + " " + name[0] + " " + this.locations[j][2]);
                    this.Layers[i].arrayOfMarkers.push(marker.bindPopup(div));


                    //console.log(div.name);
                }
            }
        }
    }

    get layers() {
        return this.Layers;
    }

}



function makeIcon(color) {

    return new L.Icon({
        iconUrl: color,
        shadowUrl: MarkerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
}

//if needed, can be used
function singOut() {

}

function singIn() {

}

function singUp() {

}

//need help with this things
//TODO: implementation of functions
function findLocation() {
    dontWork();
}

//next 4 functions add/remove corresponding layers to map 
var toggleOffice = false;
function on_offOfince() {
    updateLocations(function (data) {
        toggleOffice = !toggleOffice;

        if (toggleOffice) {
            for (let i = 0; i < allLayers.length; i++) {
                if (allLayers[i].layerName == Tag.OFFICE) {
                    allLayers[i].layerGroup.addTo(map);
                    break;
                }
            }
        } else {
            for (let i = 0; i < allLayers.length; i++) {
                if (allLayers[i].layerName == Tag.OFFICE) {
                    map.removeLayer(allLayers[i].layerGroup);
                    break;
                }
            }
        }
    });
}

var toggleOutposts = false;
function on_offOutposts() {
    updateLocations(function (data) {
        toggleOutposts = !toggleOutposts;

        if (toggleOutposts) {
            for (let i = 0; i < allLayers.length; i++) {
                if (allLayers[i].layerName == Tag.PLANT) {
                    allLayers[i].layerGroup.addTo(map);
                    break;
                }
            }
        } else {
            for (let i = 0; i < allLayers.length; i++) {
                if (allLayers[i].layerName == Tag.PLANT) {
                    map.removeLayer(allLayers[i].layerGroup);
                    break;
                }
            }
        }
    });
}

var toggleLandfills = false;
function on_offLandfills() {

    updateLocations(function (data) {
        toggleLandfills = !toggleLandfills;

        if (toggleLandfills) {
            for (let i = 0; i < allLayers.length; i++) {
                if (allLayers[i].layerName == Tag.LANDFILL) {
                    allLayers[i].layerGroup.addTo(map);
                    break;
                }
            }
        } else {
            for (let i = 0; i < allLayers.length; i++) {
                if (allLayers[i].layerName == Tag.LANDFILL) {
                    map.removeLayer(allLayers[i].layerGroup);
                    break;
                }
            }
        }
    });
}

function removeReport(btn) {
    //console.log(btn.parentNode.getAttribute("name"));
    let data = btn.parentNode.getAttribute("name").split(" ");

    //console.log(data[0]);
    //console.log(data[1]);
    //console.log(data[2] + " " + data[3]);

    let obj = {
        longitude: data[0],
        latitude: data[1],
        category: data[2] + " " + data[3]
    };

    (new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost:3000/deleteReport',
            type: 'DELETE',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(obj),
            crossDomain: true,
            success: function () {

                let button = document.createElement("button");
                button.innerHTML = "Remove";
                button.setAttribute("onclick", "removeReport(this)");
                //console.log(button);
                addLocations(button);

                on_offMarkedLocations();
                //on_offMarkedLocations();
                resolve();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                let err = (eval("(" + xhr.responseText + ")"));
                alert("Error code: " + err.code + ", message: " + err.message);
                reject();
            }
        });
    })).then(() => {

    }).catch((error) => {
        //alert('neuspesno'); console.log(error);
    });

}

function updateLocations(fun) {

    let url = new URLSearchParams(window.location.search);
    if (url.has("operator")) {
        let button = document.createElement("button");
        button.innerHTML = "Remove";
        button.setAttribute("onclick", "removeReport(this)");
        addLocations(function (data) {
            console.log("oper " + data);
            fun("update fin");
        }, button);
    } else {
        addLocations(function (data) {
            //console.log("user " + data);
            fun("update fin");
        }, undefined);
    }
}

var toggleMarkedLocation = false;
function on_offMarkedLocations() {

    updateLocations(function (data) {

        //console.log(data);

        toggleMarkedLocation = !toggleMarkedLocation;
        //console.log("toggleMarkedLocation = " + toggleMarkedLocation);

        if (toggleMarkedLocation) {

            for (let i = 0; i < allLayers.length; i++) {
                if (allLayers[i].layerName == Tag.MARKEDLOCATION || allLayers[i].layerName == Tag.WILD_DUMP ||
                    allLayers[i].layerName == Tag.BURNING_CONTAINER || allLayers[i].layerName == Tag.OVERFLOWING_CONTAINER) {
                    allLayers[i].layerGroup.addTo(map);
                }
            }
        } else {
            for (let i = 0; i < allLayers.length; i++) {
                if (allLayers[i].layerName == Tag.MARKEDLOCATION || allLayers[i].layerName == Tag.WILD_DUMP ||
                    allLayers[i].layerName == Tag.BURNING_CONTAINER || allLayers[i].layerName == Tag.OVERFLOWING_CONTAINER) {
                    map.removeLayer(allLayers[i].layerGroup);
                }
            }
        }
    });

}

function saveUser() {
    localStorage.clear();
    localStorage.setItem("user", window.location.search);
}

function dontWork() {
    alert("Sorry, not implemented yet");
}

function myProfil(){

    var user=window.location.search.substring(1).split("&")[0].split("=")[1];
    console.log(user);
    window.location.href = "../account/acc.html?user="+user;
}