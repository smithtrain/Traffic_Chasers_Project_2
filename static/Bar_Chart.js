var url = "/Bar_Chart_data";

// Fetch the JSON data and console log it
//d3.json(url).then(function(data) {
//  console.log(data);
//});

// Define width and height
var svgWidth = 960;
var svgHeight = 660;



// Define margins
var margin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


//var url = "/Viz_3_data";

//var incidents;
//// Fetch the JSON data and console log it
//d3.json(url).then(function(data) {
//  //if (err) throw err;
//  console.log(data);
  

//  data.forEach(function(trafficData) {
//    trafficData.Traffic_type = +trafficData.Traffic_type;
//    console.log(trafficData.Traffic_type);
//    });

d3.json(url, function(response) {  

  // Arrays to count incident types
  var ctr_acci = 0;
  var ctr_cong = 0;
  var ctr_cons = 0;
  var ctr_misc = 0;
  var ctr_evnt = 0;
  var ctr_rdcl = 0;

  //Loop through the response array
  for (var i = 0; i < response.length; i++) {
    var Incident = response[i];

    console.log(Incident.Traffic_type)


    if (Incident.Traffic_type == "ACCIDENT") {
      ctr_acci = ctr_acci + 1;    }
    
    else if (Incident.Traffic_type == "CONGESTION") {
      ctr_cong = ctr_cong + 1;
    }
    else if (Incident.Traffic_type == "CONSTRUCTION") {
      ctr_cons = ctr_cons + 1;
    }
    else if (Incident.Traffic_type == "MISCELLANEOUS") {
      ctr_misc = ctr_misc + 1;
    }
    else if (Incident.Traffic_type == "PLANNED EVENT") {
      ctr_evnt = ctr_evnt + 1;
    }
    else if (Incident.Traffic_type == "ROAD_CLOSURE") {
      ctr_rdcl = ctr_rdcl + 1;
    };
  };

  // Print results
  console.log(ctr_acci + " accidents.");
  console.log(ctr_cong + " congestion.");
  console.log(ctr_cons + " constructions.");
  console.log(ctr_misc + " miscellaneous.");
  console.log(ctr_evnt + " planned events.");
  console.log(ctr_rdcl + " road closures.");
  
  var typeCounts = []
  
  typeCounts.push(ctr_acci);
  typeCounts.push(ctr_cong);
  typeCounts.push(ctr_cons);
  typeCounts.push(ctr_misc);
  typeCounts.push(ctr_evnt);
  typeCounts.push(ctr_rdcl);  
  

  var ctx = document.getElementById("myChart");

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["Accidents", "Congestion", "Construction", "miscellaneous", "Planned Event", "Road Closure"],
      datasets:[{
        label: 'Traffic Type',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',  
        data: typeCounts                                 //[{x:trafficData, y:scaleY}]
      }]
    }
  
  }); 

});