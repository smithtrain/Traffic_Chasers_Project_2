var url = "/Viz_3_data";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});