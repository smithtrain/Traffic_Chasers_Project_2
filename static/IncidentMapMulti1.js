
//var url = "/Incident_Map_data";
// Fetch the JSON data and console log it
//d3.json(url).then(function(data) {
//  console.log(data);
//});


function createMap(LayersDict) {

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  //// Create a baseMaps object to hold the lightmap layer
  //var baseMaps = {
  //  "Light Map": lightmap
  //};

  //// Initialize all of the LayerGroups we'll be using
  //var layers = {
  //  ACCIDENT: new L.LayerGroup(),
  //  CONGESTION: new L.LayerGroup(),
  //  CONSTRUCTION: new L.LayerGroup(),
  //  MISCELLANEOUS: new L.LayerGroup(),
  //  PLANNED_EVENT: new L.LayerGroup(),
  //  ROAD_CLOSURE: new L.LayerGroup()
  //};

  //// Create the map object with options
  //var map = L.map("map-id", {
  //  center: [40.73, -74.0059],
  //  zoom: 12,
  //  layers: [lightmap, IncMrkrsLyrGrp]
  //});

  // Create the map with our layers
  var map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [
      LayersDict.ACCIDENT,
      LayersDict.CONGESTION,
      LayersDict.CONSTRUCTION,
      LayersDict.MISCELLANEOUS,
      LayersDict.PLANNED_EVENT,
      LayersDict.ROAD_CLOSURE
    ]
  });

  // Add our 'lightmap' tile layer to the map
  lightmap.addTo(map);

  // Create an overlayMaps object to hold the IncMrkrsLyrGrp layer
  //var overlayMaps = {
  //  "Traffic Incidents": IncMrkrsLyrGrp
  //};

  // Create an overlays object to add to the layer control
  var overlays = {
    "Accidents": LayersDict.ACCIDENT,
    "Congestion": LayersDict.CONGESTION,
    "Construction": LayersDict.CONSTRUCTION,
    "Miscellaneous": LayersDict.MISCELLANEOUS,
    "Planned Event": LayersDict.PLANNED_EVENT,
    "Road Closer": LayersDict.ROAD_CLOSURE
  };
  
  //// Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  //L.control.layers(baseMaps, overlayMaps, {
  //  collapsed: false
  //}).addTo(map);

  // Create a control for our layers, add our overlay layers to it
  L.control.layers(null, overlays).addTo(map);

  // Create a legend to display information about our map
  var info = L.control({
    position: "bottomright"
  });

  // When the layer control is added, insert a div with the class of "legend"
  info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
  };
  // Add the info legend to the map
  info.addTo(map);

}



var url = "/Incident_Map_data";

d3.json(url, function(response) {
  
  //console.log(response)

  // Initialize arrays to hold Incident markers
  var AccidentMarkers = [];
  var CongestionMarkers = [];
  var ConstructionMarkers = [];
  var MiscMarkers = [];
  var EventMarkers = [];
  var RoadCloseMarkers = [];

  //Loop through the response array
  for (var i = 0; i < response.length; i++) {
    var Incident = response[i];

    // For each Incident, create a marker and bind a popup with the Incident's type, description, and criticality
    var IncidentMarker = L.marker([Incident.Latitude, Incident.Longitude,])
      .bindPopup("<h3>Type: " + Incident.Traffic_type + "<h3><h3>Description: " + Incident.ItemDescr + "<h3><h3>Criticiality: " + Incident.CritDescr + "<h3><h3>Criticiality: " + Incident.Start_Time + "<h3><h3>Criticiality: " + Incident.End_Time + "<h3>");

    //// Add the marker to the IncidentMarkers array
    //IncidentMarkers.push(IncidentMarker);
    

    if (Incident.Traffic_type == "ACCIDENT") {
      AccidentMarkers.push(IncidentMarker);    }
    
    else if (Incident.Traffic_type == "CONGESTION") {
      CongestionMarkers.push(IncidentMarker);
    }
    else if (Incident.Traffic_type == "CONSTRUCTION") {
      ConstructionMarkers.push(IncidentMarker);
    }
    else if (Incident.Traffic_type == "MISCELLANEOUS") {
      MiscMarkers.push(IncidentMarker);
    }
    else if (Incident.Traffic_type == "PLANNED EVENT") {
      EventMarkers.push(IncidentMarker);
    }
    else if (Incident.Traffic_type == "ROAD_CLOSURE") {
      RoadCloseMarkers.push(IncidentMarker);
    };
  };


  // Create all of the LayerGroups we'll be using from the 6 Incident Markers arrays
  var layers = {
    ACCIDENT: new L.LayerGroup(AccidentMarkers),
    CONGESTION: new L.LayerGroup(CongestionMarkers),
    CONSTRUCTION: new L.LayerGroup(ConstructionMarkers),
    MISCELLANEOUS: new L.LayerGroup(MiscMarkers),
    PLANNED_EVENT: new L.LayerGroup(EventMarkers),
    ROAD_CLOSURE: new L.LayerGroup(RoadCloseMarkers)
  };


  //Pass the layers dictionary into the createMap function
  createMap(layers);
});



//var data =  [];
//Fetch the JSON data and pass it to createMarkers function
//data = d3.json(url), createMarkers)
//d3.json(url, createMarkers)

//LTC(data);