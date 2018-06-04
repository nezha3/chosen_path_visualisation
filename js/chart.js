// D3 JS Sunburst chart
// @ Oliver Chi  2018.05
// input dataset is an 6*2 Array
//////////////////////////////////////////////////////////////////////////////

// Gobal Varibles
var range = [[],[],[],[],[],[]]; // Record selection of (min max) at slider charts
var per = [[],[],[],[],[],[]]; // Input for sunburst chart,
var dataset; // Copy of data.csv
var dataset_selected; // Dataset after action of selecting range, changed with every selection


window.onload = function() { // load js after DOM complete

	// SVG for all charts
	var svg = d3.select("#chart").append("svg")
				.attr("id", "svg")
				.attr("width", 1350)//svg width
				.attr("height", 870);//svg height

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
		Array.prototype.clone = function(){return this.map(e => Array.isArray(e) ? e.clone() : e); }; // clone array without linkage
		dataset = data.clone();
		dataset_selected = dataset.clone();

		// Init dataset for slider and Sunburst
		range = [[min1,(parseInt(max1) + 1)],[min2,(parseInt(max2) + 1)],
							[min3,(parseInt(max3) + 1)],[min4,(parseInt(max4) + 1)],
								[min5,(parseInt(max5) + 1)],[min6,(parseInt(max6) + 1)]];
		per = [[0, 3573],[0, 3573],[0, 3573],[0, 3573],[0, 3573],[0, 3573]];

		// Draw Sunburst
		sunburst(data, dataset_selected);

		// Calculate percentage for selection and output array of selected row name
		function percentage(slider_id, selected_min, selected_max){
				//console.log(slider_id); // only for test
				//console.log(selected_min); // only for test
				//console.log(selected_max); // only for test
				var array_count = 0; // row number count
				var percentage = 0; // value initial, defined as global variable in chart.js

					switch (slider_id) { // get targeted column
						case 1:
										var column = data.map(d => d.Name3).map(Number); // return column 3
										break;
						case 2:
										var column = data.map(d => d.Name4).map(Number); // return column 4
										break;
						case 3:
										var column = data.map(d => d.Name7).map(Number); // return column 7
										break;
						case 4:
										var column = data.map(d => d.Name12).map(Number); // return column 12
										break;
						case 5:
										var column = data.map(d => d.Name19).map(Number); // return column 19
										break;
						case 6:
										var column = data.map(d => d.Name23).map(Number); // return column 23
										break;
						default:
										var column = data.map(d => d.Name1); // back to name of row
										console.log("Wrong silder id! Please provide the correct number:1 - 6"); // error message
					}
					//console.log(column);// only for test

					// sort the column, re-defined of values in column
					// if value == 0, that row is not selected
					column.forEach(function(item, i) {
						if (item < selected_min || item > selected_max) {
							column[i] = 0;
						} else {
							percentage++;
						}
						// Get row number
						array_count++;
					});
					//console.log(column);// only for test
					//console.log(percentage);// only for test
				var returnvalue = {percentage: percentage, count: array_count, column: column};//console.log(returnvalue.percentage);
				return returnvalue;
		}
		// End of main function
		////////////////////////////////////////////////////////////////////////////





		// Draw A Slider With Two Selectors
		// Based on D3.v4 JS
		// @ Oliver Chi  2018. 05
		// Inspired By Harry Stevens's Ranger Slider (single selector)
		// Every selector cannot go over the range setted by another selector
		// Contain a RESET button in the slider to cancel all selection

		// Be Aware:
		// Every div for holding svg must be named id as "slider" + something
		// Otherwise need to vary the code in line 30
		// Please justify the location every slider at x, y from the screen
		// If only use D3.v3, please replace the function scaleLinear at line 41.
		//////////////////////////////////////////////////////////////////////////////

		function slider(min, max, location_x, location_y, name, id){
			// (min, max) is range of data,
			// (x,y) is location,
			// name is chart label
			// id is count from up chart, start at 1

					// Data Domain (min, max)
					var domain_min, domain_max, times;
					// var times is able to justify the range of data to a comfortable zone (0~100)
					if (max > 100) {
						times = 1;
					} else if (max > 10){
						times = 10;
					} else {
						times = 100;
					}
					domain_min = min * times;
					domain_max = max * times;

					// Data Name and Silder Name
					var slider_name = name;


					// Slider Range
					var range_width = 400, range_height = 95;
					// Initial Variables
					var handle_radius = 25,	//handle circle radium
						handle_start_val = domain_min, //start position for first pointer
						handle_start_val2 = domain_max, //start position for second pointer
						x1 = 0,													//initial record mouse position for first pointer
						x2 = range_width,								//initial record mouse position for second pointer
						handle_padding = 10,	//handle padding
						slider_height = 5,		//slider line height
						axis_height = 20;			//slider axis height include label

					// SVG
					var range_svg = d3.select("#svg").append("g") //container is svg background
						.attr("id", "slider" + id)
						.attr("width", 500)     //svg width
						.attr("height", 125)		//svg height
						.attr("transform", "translate("+ location_x +", "+ location_y +")");  //x,y for svg from left top corner

					// Scale (d3 using d3.scale.linear) (d4 using d3.scaleLinear)
					var range_x = d3.scaleLinear()  //depend on data alternative using scaleLog
							.range([0, range_width])
							.domain([domain_min, domain_max]);
					var range_x_times = d3.scaleLinear()  //depend on data alternative using scaleLog
							.range([0, range_width])
							.domain([domain_min/times, domain_max/times]);


					// Label For Slider
					range_svg.append("text")
							.attr("class", "slider-label")
							.attr("x", 50)
							.attr("y", 0)
							.attr("dy", "1em")
							.text(slider_name);

					// Reset Button For Slider
					range_svg.append("rect")
							.attr("x", range_width)
							.attr("y", 5)
							.attr("width", 50)
							.attr("height", 18)
							.on("click", reset)
							.attr("fill", "#4d94ff");
					range_svg.append("text")
							.attr("class", "slider-label")
							.attr("x", range_width + 4)
							.attr("y", 5)
							.attr("dy", "1em")
							.attr("fill", "white")
							.attr("font-size", "0.8em")
							.text("RESET")
							.on("click", reset);

					// Axis
					range_svg.append("g")
							.attr("class", "range-axis")
							.attr("transform", "translate(50, " + range_height + ")")
							.call(d3.axisBottom(range_x_times));
					range_svg.append("rect")
							.attr("class", "range-body")
							.attr("x", 50)
							.attr("y", range_height - slider_height)
							.attr("width", range_width)
							.attr("height", slider_height);

					// First Handle
					range_svg.append("circle")
							.attr("class", "range-dragger range-handle")
							.attr("cx", range_x(handle_start_val) + 50)
							.attr("cy", range_height - slider_height - handle_radius - handle_padding)
							.attr("r", handle_radius)
							.call(d3.drag()
								.on("drag", dragged)
							);

					// Label of Selected Down Range
					range_svg.append("text")
							.attr("class", "range-label")
							.attr("x", range_x(handle_start_val) + 50)
							.attr("y", range_height - slider_height - handle_radius - handle_padding)
							.attr("dy", ".3em")
							.text(handle_start_val/times);

					// First Pointer
					range_svg.append("polygon")
							.attr("class", "range-dragger range-pointer")
							.attr("points", calcPointerPoints(handle_start_val))
							.call(d3.drag()
								.on("drag", dragged)
							);


					// Second Handle
					range_svg.append("circle")
							.attr("class", "range-dragger2 range-handle2")
							.attr("cx", range_x(handle_start_val2) + 50)
							.attr("cy", range_height - slider_height - handle_radius - handle_padding)
							.attr("r", handle_radius)
							.call(d3.drag()
								.on("drag", dragged2)
						  );

					// Label for Selected Up Range
					range_svg.append("text")
							.attr("class", "range-label2")
							.attr("x", range_x(handle_start_val2) + 50)
							.attr("y", range_height - slider_height - handle_radius - handle_padding)
							.attr("dy", ".3em")
							.text(handle_start_val2/times);

					// Second Pointer
					range_svg.append("polygon")
							.attr("class", "range-dragger2 range-pointer2")
							.attr("points", calcPointerPoints(handle_start_val2))
							.call(d3.drag()
								.on("drag", dragged2)
							);


					// Draw Pointers
					function calcPointerPoints(handle_val){
						xp = range_x(handle_val) + 50;
						var point_c = xp + "," + (range_height - slider_height);
						var point_a = (xp - (handle_radius / 4)) + "," + (range_height - slider_height - handle_padding - (handle_radius / 10));
						var point_b = (xp + (handle_radius / 4)) + "," + (range_height - slider_height - handle_padding - (handle_radius / 10));
						return point_a + " " + point_b + " " + point_c;
					}

					// Deal with First Pointer Position Change
					function dragged(){
						var coordinates = [0, 0];
			      coordinates = d3.mouse(this);
			      var x = coordinates[0];
			      x = x > x2 ? x2 : //not able to go over another pointer
			      	x < 0 ? 0 :
			      	x;
						x1 = x; // store current position

			      // find the pct represented by the mouse position
			      var pct = Math.round(range_x.invert(x));

			      range_svg.select(".range-handle")
			      		.attr("cx", range_x(pct) + 50);

			      range_svg.select(".range-label")
			      		.attr("x", range_x(pct) + 50)
			      		.text(pct/times);

			      range_svg.select(".range-pointer")
			      		.attr("points", calcPointerPoints(pct));

						// calculate pecentage for selection in real data
						// store range
						range[id-1] = [Math.round(range_x.invert(x1))/times, Math.round(range_x.invert(x2))/times];
						var percentage_return = percentage(Number(id), Math.round(range_x.invert(x1))/times, Math.round(range_x.invert(x2))/times)
						per[id-1] = [percentage_return.percentage, (percentage_return.count - percentage_return.percentage)];

						// reset dataset_selected
						resetDataset(id);

						// get changed column values
						//var datacolumn = percentage_return.column;
						// copy column selected into dataset_selected
						/*switch (Number(id)) { // get targeted column
							case 1:

											dataset_selected.forEach(function(d, i) { d.Name3 = datacolumn[i]; });
											break;
							case 2:
											dataset_selected.forEach(function(d, i) { d.Name4 = datacolumn[i]; });
											break;
							case 3:
											dataset_selected.forEach(function(d, i) { d.Name7 = datacolumn[i]; });
											break;
							case 4:
											dataset_selected.forEach(function(d, i) { d.Name12 = datacolumn[i]; });
											break;
							case 5:
											dataset_selected.forEach(function(d, i) { d.Name19 = datacolumn[i]; });
											break;
							case 6:
											dataset_selected.forEach(function(d, i) { d.Name23 = datacolumn[i]; });
											break;
							default:
											dataset_selected = dataset; // back to name of row
											console.log("Wrong silder id! Please provide the correct number:1 - 6"); // error message
						}*/
					}

					// Deal with Second Pointer Position Change
					function dragged2(){
						var coordinates = [0, 0];
			      coordinates = d3.mouse(this);
			      var x = coordinates[0];
			      x = x > range_width ? range_width :
			      	x < x1 ? x1 : //not able to go over another pointer
			      	x;
						x2 = x;// store current position

			      // find the pct represented by the mouse position
			      var pct = Math.round(range_x.invert(x));

			      range_svg.select(".range-handle2")
			      		.attr("cx", range_x(pct) + 50);

			      range_svg.select(".range-label2")
			      		.attr("x", range_x(pct) + 50)
			      		.text(pct/times);

			      range_svg.select(".range-pointer2")
			      		.attr("points", calcPointerPoints(pct));

						// calculate pecentage for selection in real data
						// store range
						range[id-1] = [Math.round(range_x.invert(x1))/times, Math.round(range_x.invert(x2))/times];
						var percentage_return = percentage(Number(id), Math.round(range_x.invert(x1))/times, Math.round(range_x.invert(x2))/times)
						per[id-1] = [percentage_return.percentage, (percentage_return.count - percentage_return.percentage)];

						// reset dataset_selected
						resetDataset(id);

						// get changed column values
						//var data2column = percentage_return.column;
						// copy column selected into dataset_selected
						/*switch (Number(id)) { // get targeted column
							case 1:
											dataset_selected.forEach(function(d, i) { d.Name3 = data2column[i]; });
											break;
							case 2:
											dataset_selected.forEach(function(d, i) { d.Name4 = data2column[i]; });
											break;
							case 3:
											dataset_selected.forEach(function(d, i) { d.Name7 = data2column[i]; });
											break;
							case 4:
											dataset_selected.forEach(function(d, i) { d.Name12 = data2column[i]; });
											break;
							case 5:
											dataset_selected.forEach(function(d, i) { d.Name19 = data2column[i]; });
											break;
							case 6:
											dataset_selected.forEach(function(d, i) { d.Name23 = data2column[i]; });
											break;
							default:
											dataset_selected = dataset; // back to name of row
											console.log("Wrong silder id! Please provide the correct number:1 - 6"); // error message
						}*/

					}

					// Reset Position of Pointers
					function reset(){
						//First Pointer
						range_svg.select(".range-handle")
			      		.attr("cx", range_x(handle_start_val) + 50);

			      range_svg.select(".range-label")
			      		.attr("x", range_x(handle_start_val) + 50)
			      		.text(handle_start_val/times);

			      range_svg.select(".range-pointer")
			      		.attr("points", calcPointerPoints(handle_start_val));

						//Second Pointer
						range_svg.select(".range-handle2")
					      .attr("cx", range_x(handle_start_val2) + 50);

					  range_svg.select(".range-label2")
					      .attr("x", range_x(handle_start_val2) + 50)
					      .text(handle_start_val2/times);

					  range_svg.select(".range-pointer2")
					      .attr("points", calcPointerPoints(handle_start_val2));

						x1 = 0;
						x2 = range_width;

						// restore range
						range[id-1] = [Math.round(range_x.invert(x1))/times, Math.round(range_x.invert(x2))/times];
						per[id-1] = [0, 3573];

						// reset dataset_selected
						resetDataset(id);
					}

					// reset specific column in dataset_selected
					function resetDataset(id){
						// reset selected array: dataset_selected
						switch (Number(id)) { // get targeted column
							case 1:
											var data3column = dataset.map(d => d.Name3);
											dataset_selected.forEach(function(d, i) { d.Name3 = data3column[i]; });
											break;
							case 2:
											var data3column = dataset.map(d => d.Name4);
											dataset_selected.forEach(function(d, i) { d.Name4 = data3column[i]; });
											break;
							case 3:
											var data3column = dataset.map(d => d.Name7);
											dataset_selected.forEach(function(d, i) { d.Name7 = data3column[i]; });
											break;
							case 4:
											var data3column = dataset.map(d => d.Name12);
											dataset_selected.forEach(function(d, i) { d.Name12 = data3column[i]; });
											break;
							case 5:
											var data3column = dataset.map(d => d.Name19);
											dataset_selected.forEach(function(d, i) { d.Name19 = data3column[i]; });
											break;
							case 6:
											var data3column = dataset.map(d => d.Name23);
											dataset_selected.forEach(function(d, i) { d.Name23 = data3column[i]; });
											break;
							default:
											dataset_selected = dataset; // back to name of row
											console.log("Wrong silder id! Please provide the correct number:1 - 6"); // error message
						}
					}

			}//End of Sliders

	});// End of Data



}// End of window onload
