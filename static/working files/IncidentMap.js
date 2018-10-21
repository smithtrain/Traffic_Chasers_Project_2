
//var url = "/Incident_Map_data";
// Fetch the JSON data and console log it
//d3.json(url).then(function(data) {
//  console.log(data);
//});


function createMap(IncMrkrsLyrGrp) {

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the IncMrkrsLyrGrp layer
  var overlayMaps = {
    "Traffic Incidents": IncMrkrsLyrGrp
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [lightmap, IncMrkrsLyrGrp]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

var url = "/Incident_Map_data";

d3.json(url, function(response) {
  
  //console.log(response)

  // Initialize an array to hold Incident markers
  var IncidentMarkers = [];

  //Loop through the response array
  for (var i = 0; i < response.length; i++) {
    var Incident = response[i];

    //console.log(Incident.Latitude)
    //if (Incident) {
    //  IncidentArray.push([Incident.Latitude, Incident.Longitude, Incident.CritID, Incident.Traffic_type, Incident.ItemDescr])
    //};

    // For each Incident, create a marker and bind a popup with the Incident's type, description, and criticality
    var IncidentMarker = L.marker([Incident.Latitude, Incident.Longitude,])
      .bindPopup("<h3>Type: " + Incident.Traffic_type + "<h3><h3>Description: " + Incident.ItemDescr + "<h3><h3>Criticiality: " + Incident.CritDescr + "<h3><h3>Criticiality: " + Incident.Start_Time + "<h3><h3>Criticiality: " + Incident.End_Time + "<h3>");

    // Add the marker to the IncidentMarkers array
    IncidentMarkers.push(IncidentMarker);
  }

  // Create a layer group made from the IncidentMarkers array, pass it into the createMap function
  createMap(L.layerGroup(IncidentMarkers));
});



//var data =  [];
//Fetch the JSON data and pass it to createMarkers function
//data = d3.json(url), createMarkers)
//d3.json(url, createMarkers)

//LTC(data);