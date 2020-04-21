/**
 * This document is work in progress
 * Subjected to change in future
 *      'TODO' -> tasks that need to be done
 *      'NOTE' -> note about idea for some parte of code
 */
var guest = document.getElementById("guest"); //get navBar for guest
var user = document.getElementById("user"); //get navBar for user

var map;
var allLayers = [];

//JavaScript Enum
const Tag = {
    OFFICE: "Main office",
    PLANT: "Plant",
    LANDFILL: "Landfill",
    MARKEDLOCATION: "Marked location"
};

const CustomIcons = {
    GREEN_ICON: new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })
};

//initialization of map for webpage
function init(){

    //TODO: make apropriate page parametar function/handler
    resolveParameters(location.search.substring(1));

    mapInit();

    let selectedPosition;
    map.on('click', function(ev){
        console.log(ev);
        let latlng = map.mouseEventToLatLng(ev.originalEvent);
        if (selectedPosition != undefined){
            map.removeLayer(selectedPosition);
        }
        selectedPosition = L.marker([latlng.lat, latlng.lng]).addTo(map);
    });

}  

function resolveParameters(param){
    let array = param.split("#");

    for (let i = 0; i < array.length; i++){
        array[i] = array[i].split("=");
    }

    if (array[0][0] == "guest" || param == ""){
        //guest ui
        guest.style.visibility = "visible";
        user.style.visibility = "hidden";
        listenerActive = false;

    }else if (array[0][0] == "user"){
        //user ui
        guest.style.visibility = "hidden";
        user.style.visibility = "visible";
        listenerActive = true;
    }
}

function mapInit(){
    map = L.map("map");
    
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "pk.eyJ1IjoibWwxNzA3MjIiLCJhIjoiY2s5YTVuMGZqMDRkajNmbnZ0M3dpZmw5aCJ9.-DN1GUj4G7MaDepRdj8V1g"
    }).addTo(map);
    setCurrentPosition();

    addLocations();
}

function addLocations(){

    let groups = makeLayerArray();

    for(let i = 0; i < groups.length; i++){
        allLayers.push({
            layerName: groups[i].layerName,
            layerGroup: L.layerGroup(groups[i].arrayOfMarkers)
        });
    }
}

function makeLayerArray(){
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

    let differentGroups = [];
    for (let i = 0; i < location.length; i++){
        if (!differentGroups.includes(location[i][2]))
            differentGroups.push(location[i][2]);
    }
    for (let i = 0; i < differentGroups.length; i++){
        differentGroups[differentGroups.indexOf(differentGroups[i])] = {
            layerName: differentGroups[i],
            arrayOfMarkers: []
        };
    }
    for (let i = 0; i < differentGroups.length; i++){
        for (let j = 0; j < location.length; j++){
            if (differentGroups[i].layerName == location[j][2]){
                differentGroups[i].arrayOfMarkers.push(L.marker([location[j][0],location[j][1]]).bindPopup(location[j][3]));
            }
        }
    }

    return differentGroups;
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

//at this moment doesn't need changing
function setCurrentPosition(content){

    navigator.geolocation.getCurrentPosition(function success(pos){
       map.setView([pos.coords.latitude, pos.coords.longitude], 11);
       let m = L.marker([pos.coords.latitude, pos.coords.longitude]).bindPopup("Me").addTo(map);
    },function error(err){
        throw Error("Error with finding current position");
    },{
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0
    });
}