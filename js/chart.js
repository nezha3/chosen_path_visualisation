// D3 JS Sunburst chart
// @ Oliver Chi  2018.05
// input dataset is an 6*2 Array
//////////////////////////////////////////////////////////////////////////////

// Gobal Varibles
var range = [[],[],[],[],[],[]]; // Input for sunburst chart
var dataset; // Copy of data.csv
var dataset_selected; // Dataset after action of selecting range, changed with every selection

window.onload = function() { // load js after DOM complete

	// SVG for all charts
	var svg = d3.select("#chart").append("svg")
				.attr("id", "svg")
				.attr("width", 1350)//svg width
				.attr("height", 820);//svg height

	// Main function
	d3.csv("dataset/data.csv", function (data){ // Read data from data.csv

		// Name Slider Label
		Name = ["Planetary mass [Jupiter masses]","Radius [Jupiter radii]","Eccentricity","Surface or equilibrium temperature [K]","Distance from Sun [parsec]","Host star temperature [K]"];

		// Read (min, max) from columns of data.csv
		var min1 = d3.min(data.map(d => d.Name3).map(Number));
		var max1 = d3.max(data.map(d => d.Name3).map(Number));
		var min2 = d3.min(data.map(d => d.Name4).map(Number));
		var max2 = d3.max(data.map(d => d.Name4).map(Number));
		var min3 = d3.min(data.map(d => d.Name7).map(Number));
		var max3 = d3.max(data.map(d => d.Name7).map(Number));
		var min4 = d3.min(data.map(d => d.Name12).map(Number));
		var max4 = d3.max(data.map(d => d.Name12).map(Number));
		var min5 = d3.min(data.map(d => d.Name19).map(Number));
		var max5 = d3.max(data.map(d => d.Name19).map(Number));
		var min6 = d3.min(data.map(d => d.Name23).map(Number));
		var max6 = d3.max(data.map(d => d.Name23).map(Number));

		// Draw sliders
		slider(min1, (parseInt(max1) + 1), 10, 10, Name[0], "1");
		slider(min2, (parseInt(max2) + 1), 10, 140, Name[1], "2");
		slider(min3, (parseInt(max3) + 1), 10, 270, Name[2], "3");
		slider(min4, (parseInt(max4) + 1), 10, 410, Name[3], "4");
		slider(min5, (parseInt(max5) + 1), 10, 540, Name[4], "5");
		slider(min6, (parseInt(max6) + 1), 10, 670, Name[5], "6");

		// Copy data to dataset
		dataset = data;
		var dataset_length = data.length;

		// Init dataset for Sunburst
		range = [[1,0],[1,0],[1,0],[1,0],[1,0],[1,0]];

		// Draw Sunburst
		sunburst(range);

	});


}
