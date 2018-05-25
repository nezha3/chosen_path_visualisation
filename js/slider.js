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

function slider(min, max, x, y, name, id){
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
			var range_width = 455, range_height = 90;
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
			var range_svg = d3.select("#slider" + id)
				.append("svg")
				.attr("width", range_width)     //svg width
				.attr("height", range_height + slider_height + axis_height)		//svg height
				.attr("transform", "translate(10, 10)");  //x,y for svg at left top corner

			// Scale (d3 using d3.scale.linear) (d4 using d3.scaleLinear)
			var range_x = d3.scale.linear()  //depend on data alternative using scaleLog
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

			// Store Selected Min and Max
			d3.select("#s" + id + "-min")
					.text(Math.round(range_x.invert(x1))/times);
			d3.select("#s" + id + "-max")
					.text(Math.round(range_x.invert(x2))/times);


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

				// Store Selected Min
				d3.select("#s" + id + "-min")
						.text(Math.round(range_x.invert(x1))/times);
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

				// Store Selected Max
				d3.select("#s" + id + "-max")
					.text(Math.round(range_x.invert(x2))/times);
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
				x2 = 0;
			}

	}
