var url = "/Bar_Chart_data";

// Fetch the JSON data and console log it
//d3.json(url).then(function(data) {
//  console.log(data);
//});




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
  console.log(ctr_cong + " congestions.");
  console.log(ctr_cons + " constructions.");
  console.log(ctr_misc + " miscellaneous.");
  console.log(ctr_evnt + " planned events.");
  console.log(ctr_rdcl + " road closures.");
  

});


