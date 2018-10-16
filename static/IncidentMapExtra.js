

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




function createMarkers(data) {

  // Pull the "stations" property off of response.data
  var Incidents = data.stations;

  // Initialize an array to hold bike markers
  var IncidentMarkers = [];

  // Loop through the stations array
  for (var index = 0; index < stations.length; index++) {
    var station = stations[index];

    // For each station, create a marker and bind a popup with the station's name
    var IncidentMarker = L.marker([station.lat, station.lon])
      .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "<h3>");

    // Add the marker to the bikeMarkers array
    IncidentMarkers.push(IncidentMarker);
  }

  // Create a layer group made from the bike markers array, pass it into the createMap function
  createMap(L.layerGroup(IncidentMarkers));
}






var url = "/Incident_Map_data";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

// Fetch the JSON data and pass it to createMarkers function
d3.json(url, createMarkers);
