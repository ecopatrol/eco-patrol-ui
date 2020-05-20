/**
 * This document is work in progress
 * Subjected to change in future
 *      'TODO' -> tasks that need to be done
 *      'NOTE' -> note about idea for some parte of code
 */
var guest; //get navBar for guest
var user;//get navBar for user

var userLocation;
var userLogged;

var map;
var allLayers = [];

//JavaScript Enum
const Tag = {
    OFFICE: "Main office",
    PLANT: "Plant",
    LANDFILL: "Landfill",
    MARKEDLOCATION: "Marked location"
};

//paths to icons (from this js file)
const MarkerColor = {
    BLACK:      "../Leaflet_Icon/marker-icon-black.png",    //
    BLUE:       "../Leaflet_Icon/marker-icon-blue.png",     //user location
    GOLD:       "../Leaflet_Icon/marker-icon-gold.png",     //selected area
    GREEN:      "../Leaflet_Icon/marker-icon-green.png",    //layer
    GRAY:       "../Leaflet_Icon/marker-icon-grey.png",     //layer
    ORANGE:     "../Leaflet_Icon/marker-icon-orange.png",   //layer
    RED:        "../Leaflet_Icon/marker-icon-red.png",      //layer
    VIOLET:     "../Leaflet_Icon/marker-icon-violet.png",   //layer
    YELLOW:     "../Leaflet_Icon/marker-icon-yellow.png"    //
};
const MarkerShadow = "../Leaflet_Icon/marker-shadow.png";

const layerIcon = [makeIcon(MarkerColor.GREEN), makeIcon(MarkerColor.GRAY), makeIcon(MarkerColor.ORANGE), makeIcon(MarkerColor.RED), makeIcon(MarkerColor.VIOLET)];

//initialization of map for webpage
function init(){

    guest = document.getElementById("guest");
    user = document.getElementById("user");

    //TODO: make apropriate page parametar function/handler
    resolveParameters(window.location.search);

    mapInit();

}  

function resolveParameters(pageParam){
    let url = new URLSearchParams(pageParam);
    if(url.has("user")){
        user.style.visibility = "visible";
        guest.style.visibility = "hidden";
        userLogged = true;

    }else{
        user.style.visibility = "hidden";
        guest.style.visibility = "visible";
        userLogged = false;

    }
    console.log(url.has("user"));
}

function mapInit(){
    //create map instance
    map = L.map("map");
    
    //add tracking of user on map
    map.locate({watch: true, setView: true, maxZoom: 11, timeout:2000, enableHighAccuracy: true});
    map.on('locationfound', function(ev){
    if(userLocation != undefined) map.removeLayer(userLocation);
    userLocation = L.marker(ev.latlng, {icon: makeIcon(MarkerColor.BLUE)}).bindPopup("You").addTo(map);
    console.log("refresh");

    });
    map.on('locationerror', function(ev){
        console.log("can't get geolocation");
        console.log(ev.massage);

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
    addLocations();

    //set listener for selected position
    let selectedPosition;
    map.on('click', function(ev){
        if (!userLogged) return;
        let latlng = map.mouseEventToLatLng(ev.originalEvent);
        let form = createForm();
        if (selectedPosition != undefined){
            map.removeLayer(selectedPosition);
            form.classList.remove("show");
        }
        
        form.classList.add("show");
        form.children[2].name = latlng.lat.toFixed(4) + " " + latlng.lng.toFixed(4);
        selectedPosition = L.marker([latlng.lat, latlng.lng], {icon: makeIcon(MarkerColor.GOLD)}).addTo(map);
        selectedPosition.bindPopup(form).openPopup();
    });
}

function createForm(){
    let elem;
    let form = document.createElement("div");
    form.classList.add("reportForm");
    //form.style.display = "none";
    form.id = "reportForm";

    elem = document.createElement("h3");
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
    elem.rows = 3;
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
function reportProblem(ev){
    //TODO: create dialog and sent information from btn.id to server
    let description = document.getElementById("desc");
    let repType = document.getElementById("selectType");
    //console.log(repType.value);
    //console.log(description.value); //get description from textarea
    //console.log(description.name); //get coordinates from name
    let obj = {
        type: repType.value,
        coords: description.name,
        desc: description.value
    };
    console.log(obj);
    sendReportData(obj).then(() => {
        alert('uspesno');
    }).catch((error) => { 
        alert('neuspesno');console.log(error); 
    });
}

function sendReportData(data){
    return new Promise((resolve, reject) => {
        $.ajax({
        url: '',//send to ???
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        crossDomain: true,
        sucess: function () {
            resolve();
            alert('uspesno');
        },
        error: function(xhr, ajaxOptions, thrownError) {
            //<ovde mozes da uzmes status requesta ako je neuspesan, da vidis zasto je neuspesan, to se nalazu u xhr.status>
            console.log("xhr.status = " + xhr.status);
            reject();
        }
        });
    });
}

//prepares layers to get inserted into map
function addLocations(){

    let groups = new ECO_Layers();

    for(let i = 0; i < groups.getLength(); i++){
        allLayers.push({                                        //allLayers is global variable
            layerName: groups.getLayerName(i),
            layerGroup: L.layerGroup(groups.getLayerMarkers(i))
        });
    }
}

//sorts locations into layers and returns array of layers
function ECO_Layers(){

    let location = [
        [44.871163, 20.638895, 'Main office', 'Main office Pancevo'],
        [44.882502, 20.456271, 'Plant', 'Plant 8'],
        [44.827720, 20.388044, 'Plant', 'Plant 5'],
        [44.811615, 20.488727, 'Main office', 'Main office Belgrad'],
        [44.778830, 20.497828, 'Plant', 'Plant 1'],
        [44.886812, 20.627040, 'Landfill', 'Landfill 1'],
        [44.791046, 20.472462, 'Plant', 'Plant 2'],        
        [44.848452, 20.375347, 'Plant', 'Plant 4'],        
        [44.817660, 20.488679, 'Plant', 'Plant 6'],
        [44.864166, 20.651177, 'Main office', 'Main office Pancevo'],
        [44.747485, 20.447991, 'Plant', 'Plant 7'],        
        [44.828683, 20.458060, 'Plant', 'Plant 9'],        
        [44.796462, 20.505937, 'Plant', 'Plant 3'],
        [44.766906, 20.409335, 'Plant', 'Plant 10'],
        [44.887581, 20.782556, 'Landfill', 'Landfill 2']
    ];
    if (location == undefined) return location;

    this.Layers = [];
    for (let i = 0; i < location.length; i++){
        if (!this.Layers.includes(location[i][2]))
        this.Layers.push(location[i][2]);
    }
    for (let i = 0; i < this.Layers.length; i++){
        this.Layers[this.Layers.indexOf(this.Layers[i])] = {
            layerName: this.Layers[i],
            arrayOfMarkers: []
        };
    }
    for (let i = 0; i < this.Layers.length; i++){
        for (let j = 0; j < location.length; j++){
            if (this.Layers[i].layerName == location[j][2]){
                this.Layers[i].arrayOfMarkers.push(L.marker([location[j][0],location[j][1]], {icon: layerIcon[i % layerIcon.length]}).bindPopup(location[j][3]));
            }
        }
    }

    this.getLength = function(){ return this.Layers.length; }

    this.getLayerName = function(index) {return this.Layers[index].layerName; }

    this.getLayerMarkers = function(index) { return this.Layers[index].arrayOfMarkers; }

    return this;
}

function makeIcon(color){ 
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
function singOut(){

}

function singIn(){

}

function singUp(){

}

//need help with this things
//TODO: implementation of functions
function findLocation(){
    dontWork();
}

//next 4 functions add/remove corresponding layers to map 
var toggleOffice = false;
function on_offOfince(){
    toggleOffice = !toggleOffice;
    
    if (toggleOffice){
        for(let i = 0; i < allLayers.length; i++){
            if (allLayers[i].layerName == Tag.OFFICE){
                allLayers[i].layerGroup.addTo(map);
                break;
            }
        }
    }else{
        for(let i = 0; i < allLayers.length; i++){
            if (allLayers[i].layerName == Tag.OFFICE){
                map.removeLayer(allLayers[i].layerGroup);
                break;
            }
        }
    }
}

var toggleOutposts = false;
function on_offOutposts(){
    toggleOutposts = !toggleOutposts;
    
    if (toggleOutposts){
        for(let i = 0; i < allLayers.length; i++){
            if (allLayers[i].layerName == Tag.PLANT){
                allLayers[i].layerGroup.addTo(map);
                break;
            }
        }
    }else{
        for(let i = 0; i < allLayers.length; i++){
            if (allLayers[i].layerName == Tag.PLANT){
                map.removeLayer(allLayers[i].layerGroup);
                break;
            }
        }
    }
}

var toggleLandfills = false;
function on_offLandfills(){
    toggleLandfills = !toggleLandfills;
    
    if (toggleLandfills){
        for(let i = 0; i < allLayers.length; i++){
            if (allLayers[i].layerName == Tag.LANDFILL){
                allLayers[i].layerGroup.addTo(map);
                break;
            }
        }
    }else{
        for(let i = 0; i < allLayers.length; i++){
            if (allLayers[i].layerName == Tag.LANDFILL){
                map.removeLayer(allLayers[i].layerGroup);
                break;
            }
        }
    }
}

var toggleMarkedLocation = false;
function on_offMarkedLocations(){
    toggleMarkedLocation = !toggleMarkedLocation;
    
    if (toggleMarkedLocation){
        for(let i = 0; i < allLayers.length; i++){
            if (allLayers[i].layerName == Tag.MARKEDLOCATION){
                allLayers[i].layerGroup.addTo(map);
                break;
            }
        }
    }else{
        for(let i = 0; i < allLayers.length; i++){
            if (allLayers[i].layerName == Tag.MARKEDLOCATION){
                map.removeLayer(allLayers[i].layerGroup);
                break;
            }
        }
    }
}

function dontWork(){
    alert("Sorry, not implemented yet");
}