// D3 JS Sunburst chart
// @ Oliver Chi  2018.05
// input dataset is an 6*2 Array
//////////////////////////////////////////////////////////////////////////////

// Gobal Varibles
var range = [[],[],[],[],[],[]]; // Input for sunburst chart
var dataset; // Copy of data.csv
var dataset_selected; // Dataset after action of selecting range, changed with every selection

	// Main function
	d3.csv("dataset/data.csv", function (data){ // Read data from data.csv

		// DOM elements for bootstrap grid
		var container = d3.select("body").append("div")
			.attr("class", "container-fluid");

		var row1 = container.append("div")
				.attr("class", "row");
		var row2 = container.append("div")
				.attr("class", "row");

		var col1 = row1.append("div")
			.attr("class","col-5 align-self-start");
		var col2 = row1.append("div")
			.attr("class","col-7 align-self-start");

		// DOM elements for sliders
		col1.append("div")
			.attr("id", "slider1");
		col1.append("div")
			.attr("id", "slider2");
		col1.append("div")
			.attr("id", "slider3");
		col1.append("div")
			.attr("id", "slider4");
		col1.append("div")
			.attr("id", "slider5");
		col1.append("div")
			.attr("id", "slider6");

		// DOM element for sunburst chart
		col2.append("div")
			.attr("id", "sunburst");

		// DOM elements for data from sliders
		/*var div_data = row2.append("div")
			.attr("id", "data")
			.attr("class", "col");
		div_data.append("s")
			.attr("id", "s1-min");
		div_data.append("s")
			.attr("id", "s2-min");
		div_data.append("s")
			.attr("id", "s3-min");
		div_data.append("s")
			.attr("id", "s4-min");
		div_data.append("s")
			.attr("id", "s5-min");
		div_data.append("s")
			.attr("id", "s6-min");
		div_data.append("s")
			.attr("id", "s1-max");
		div_data.append("s")
			.attr("id", "s2-max");
		div_data.append("s")
			.attr("id", "s3-max");
		div_data.append("s")
			.attr("id", "s4-max");
		div_data.append("s")
			.attr("id", "s5-max");
		div_data.append("s")
			.attr("id", "s6-max");*/

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
		slider(min2, (parseInt(max2) + 1), 10, 10, Name[1], "2");
		slider(min3, (parseInt(max3) + 1), 10, 10, Name[2], "3");
		slider(min4, (parseInt(max4) + 1), 10, 10, Name[3], "4");
		slider(min5, (parseInt(max5) + 1), 10, 10, Name[4], "5");
		slider(min6, (parseInt(max6) + 1), 10, 10, Name[5], "6");

		// Copy data to dataset
		dataset = data;
		var dataset_length = data.length;

		// Init dataset for Sunburst
		range = [[1,0],[1,0],[1,0],[1,0],[1,0],[1,0]];

		// Draw Sunburst
		sunburst(range);

	});
