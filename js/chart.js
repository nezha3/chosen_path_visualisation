slider(100, 1000, 10, 10, "name1", "1")
slider(100, 1000, 10, -120, "name2", "2")
slider(100, 1000, 10, -240, "name3", "3")
slider(100, 1000, 10, -360, "name4", "4")

// Draw A Slider With Two Selectors
// Every Selector Cannot Go Over the Ranger Setted by Another Selector
// Inspired By Harry Stevens's Ranger Slider (single selector)
function slider(min, max, x, y, name, id){
			// Data Domain (min, max)
			var domain_min = min, domain_max = max;
			// Data Name and Silder Name
			var slider_name = name;


			// Slider Range
			var range_width = 500, range_height = 100;
			// Initial Variables
			var handle_radius = 25,
				handle_start_val = domain_min,
				handle_start_val2 = domain_max,
				x1 = 0,
				x2 = range_width,
				handle_padding = 10,
				slider_height = 5,
				axis_height = 20;

			// SVG
			var range_svg = d3.select("#slider" + id)
				.append("svg")
				.attr("width", 650)
				.attr("height", 250)
				.attr("transform", "translate("+ x + ", "+ y + ")");

			// Scale
			var range_x = d3.scaleLinear()
					.range([0, range_width])
					.domain([domain_min, domain_max]);


			// Label For Slider
			range_svg.append("text")
					.attr("class", "slider-label")
					.attr("x", 100)
					.attr("y", 0)
					.attr("dy", "1em")
					.text(slider_name);

			// Reset Button For Slider
			range_svg.append("rect")
					.attr("x", 550)
					.attr("y", 0)
					.attr("width", 50)
					.attr("height", 18)
					.on("click", reset)
					.attr("fill", "#4d94ff");
			range_svg.append("text")
					.attr("class", "slider-label")
					.attr("x", 554)
					.attr("y", 0)
					.attr("dy", "1em")
					.attr("fill", "white")
					.attr("font-size", "0.8em")
					.text("RESET")
					.on("click", reset);

			// Axis
			range_svg.append("g")
					.attr("class", "range-axis")
					.attr("transform", "translate(100, " + range_height + ")")
					.call(d3.axisBottom(range_x));
			range_svg.append("rect")
					.attr("class", "range-body")
					.attr("x", 100)
					.attr("y", range_height - slider_height)
					.attr("width", range_width)
					.attr("height", slider_height);

			// First Handle
			range_svg.append("circle")
					.attr("class", "range-dragger range-handle")
					.attr("cx", range_x(handle_start_val) + 100)
					.attr("cy", range_height - slider_height - handle_radius - handle_padding)
					.attr("r", handle_radius)
					.call(d3.drag()
						.on("drag", dragged)
					);

			// Label of Selected Down Range
			range_svg.append("text")
					.attr("class", "range-label")
					.attr("x", range_x(handle_start_val) + 100)
					.attr("y", range_height - slider_height - handle_radius - handle_padding)
					.attr("dy", ".3em")
					.text(handle_start_val);

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
					.attr("cx", range_x(handle_start_val2) + 100)
					.attr("cy", range_height - slider_height - handle_radius - handle_padding)
					.attr("r", handle_radius)
					.call(d3.drag()
						.on("drag", dragged2)
				  );

			// Label for Selected Up Range
			range_svg.append("text")
					.attr("class", "range-label2")
					.attr("x", range_x(handle_start_val2) + 100)
					.attr("y", range_height - slider_height - handle_radius - handle_padding)
					.attr("dy", ".3em")
					.text(handle_start_val2);

			// Second Pointer
			range_svg.append("polygon")
					.attr("class", "range-dragger2 range-pointer2")
					.attr("points", calcPointerPoints(handle_start_val2))
					.call(d3.drag()
						.on("drag", dragged2)
					);

			// Store Selected Min and Max
			d3.select("#s" + id + "-min")
				.text(Math.round(range_x.invert(x1)));
			d3.select("#s" + id + "-max")
				.text(Math.round(range_x.invert(x2)));

			// Draw Pointers
			function calcPointerPoints(handle_val){
				xp = range_x(handle_val) + 100;
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
	      x = x > x2 ? x2 :
	      	x < 0 ? 0 :
	      	x;
				x1 = x; // store current position

	      // find the pct represented by the mouse position
	      var pct = Math.round(range_x.invert(x));

	      range_svg.select(".range-handle")
	      		.attr("cx", range_x(pct) + 100);

	      range_svg.select(".range-label")
	      		.attr("x", range_x(pct) + 100)
	      		.text(pct);

	      range_svg.select(".range-pointer")
	      		.attr("points", calcPointerPoints(pct));

				// Store Selected Min
				d3.select("#s" + id + "-min")
						.text(Math.round(range_x.invert(x1)));
			}

			// Deal with Second Pointer Position Change
			function dragged2(){
				var coordinates = [0, 0];
	      coordinates = d3.mouse(this);
	      var x = coordinates[0];
	      x = x > range_width ? range_width :
	      	x < x1 ? x1 :
	      	x;
				x2 = x;// store current position

	      // find the pct represented by the mouse position
	      var pct = Math.round(range_x.invert(x));

	      range_svg.select(".range-handle2")
	      		.attr("cx", range_x(pct) + 100);

	      range_svg.select(".range-label2")
	      		.attr("x", range_x(pct) + 100)
	      		.text(pct);

	      range_svg.select(".range-pointer2")
	      		.attr("points", calcPointerPoints(pct));

				// Store Selected Max
				d3.select("#s" + id + "-max")
					.text(Math.round(range_x.invert(x2)));
			}

			// Reset Position of Pointers
			function reset(){
				//First Pointer
				range_svg.select(".range-handle")
	      		.attr("cx", range_x(handle_start_val) + 100);

	      range_svg.select(".range-label")
	      		.attr("x", range_x(handle_start_val) + 100)
	      		.text(handle_start_val);

	      range_svg.select(".range-pointer")
	      		.attr("points", calcPointerPoints(handle_start_val));

				//Second Pointer
				range_svg.select(".range-handle2")
			      .attr("cx", range_x(handle_start_val2) + 100);

			  range_svg.select(".range-label2")
			      .attr("x", range_x(handle_start_val2) + 100)
			      .text(handle_start_val2);

			  range_svg.select(".range-pointer2")
			      .attr("points", calcPointerPoints(handle_start_val2));
			}

	}
