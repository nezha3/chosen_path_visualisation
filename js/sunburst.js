// D3 JS Sunburst chart
// @ Oliver Chi  2018.05
// Thanks for ideas from Mike Bostock's static Donut chart
// Input dataset is an 6*2 Array to match main function(chart.js)
//////////////////////////////////////////////////////////////////////////////

function sunburst(dataset){

    // SVG
    var svg = d3.select("#svg").append("g")
      .attr("width", 800)
      .attr("height", 800)
      .attr("id","sunburst_svg")
      .attr("transform", "translate(520,10)");;

    // Canvas
    var svg1 = svg.append("g")
        .attr("transform", "translate(400,400)");
    var svg2 = svg.append("g")
        .attr("transform", "translate(400,400)");
    var svg3 = svg.append("g")
      .attr("transform", "translate(400,400)");
    var svg4 = svg.append("g")
      .attr("transform", "translate(400,400)");
    var svg5 = svg.append("g")
      .attr("transform", "translate(400,400)");
    var svg6 = svg.append("g")
      .attr("transform", "translate(400,400)");


    // Color d3: d3.scale.category20()
    var color = d3.scaleOrdinal(d3.schemeCategory20);

    // Pie d3: d3.layout.pie()
    var pie = d3.pie()
        .value(function(d) { return d; })
        .sort(null);

    // 1st Donut //
    // arc d3: d3.svg.arc()
    var arc1 = d3.arc()
        .innerRadius(340)
        .outerRadius(380);

    // path
    var path1 = svg1.datum(dataset[0]).selectAll("path")
        .data(pie)
      .enter().append("path")
        .attr("fill", function(d, i) { return color(i); })
        .style("stroke", "#fff")
        .style("fill-rule", "evenodd")
        .attr("d", arc1);

    // 2nd Donut //
    // arc d3: d3.svg.arc()
    var arc2 = d3.arc()
        .innerRadius(300)
        .outerRadius(340);

    // path
    var path2 = svg2.datum(dataset[1]).selectAll("path")
        .data(pie)
      .enter().append("path")
        .attr("fill", function(d, i) { return color(i+2); })
        .style("stroke", "#fff")
        .style("fill-rule", "evenodd")
        .attr("d", arc2);


    // 3th Donut //
    // arc d3: d3.svg.arc()
    var arc3 = d3.arc()
        .innerRadius(260)
        .outerRadius(300);

    // path
    var path3 = svg3.datum(dataset[2]).selectAll("path")
        .data(pie)
      .enter().append("path")
        .attr("fill", function(d, i) { return color(i+4); })
        .style("stroke", "#fff")
        .style("fill-rule", "evenodd")
        .attr("d", arc3);

    // 4th Donut //
    // arc d3: d3.svg.arc()
    var arc4 = d3.arc()
        .innerRadius(220)
        .outerRadius(260);

    // path
    var path4 = svg4.datum(dataset[3]).selectAll("path")
        .data(pie)
      .enter().append("path")
        .attr("fill", function(d, i) { return color(i+6); })
        .style("stroke", "#fff")
        .style("fill-rule", "evenodd")
        .attr("d", arc4);

    // 5th Donut //
    // arc d3: d3.svg.arc()
    var arc5 = d3.arc()
        .innerRadius(180)
        .outerRadius(220);

    // path
    var path5 = svg5.datum(dataset[4]).selectAll("path")
        .data(pie)
      .enter().append("path")
        .attr("fill", function(d, i) { return color(i+8); })
        .style("stroke", "#fff")
        .style("fill-rule", "evenodd")
        .attr("d", arc5);

    // 6th Donut  //
    // arc d3: d3.svg.arc()
    var arc6 = d3.arc()
        .innerRadius(140)
        .outerRadius(180);

    // path
    var path6 = svg6.datum(dataset[5]).selectAll("path")
        .data(pie)
      .enter().append("path")
        .attr("fill", function(d, i) { return color(i+10); })
        .style("stroke", "#fff")
        .style("fill-rule", "evenodd")
        .attr("d", arc6);

    // Cycles to catch the actions in sliders
    var counter = 0;
    var timeout = setInterval(function(){
        datachange();
        change();
        counter++;
        if(counter === 9000) {//set cycle time 1min = 300, 1hr = 300*60 =18000
            clearInterval(timeout);
        }
    }, 200);

    // Calculate the change of dataset based on selected range
    function datachange() {
      dataset[0] = range[0];
      dataset[1] = range[1];
      dataset[2] = range[2];
      dataset[3] = range[3];
      dataset[4] = range[4];
      dataset[5] = range[5];
      //console.log(range);//only for test
    }

    // Redraw Donuts in Sunburst chart
    function change() {
      //clearTimeout(timeout); // no repeat

      path1 = svg.datum(dataset[0]).selectAll("path");
      path1 = path1.data(pie); // compute the new angles
      path1.attr("d", arc1); // redraw the arcs


      path2 = svg2.datum(dataset[1]).selectAll("path");
      path2 = path2.data(pie); // compute the new angles
      path2.attr("d", arc2); // redraw the arcs

      path3 = svg3.datum(dataset[2]).selectAll("path");
      path3 = path3.data(pie); // compute the new angles
      path3.attr("d", arc3); // redraw the arcs

      path4 = svg4.datum(dataset[3]).selectAll("path");
      path4 = path4.data(pie); // compute the new angles
      path4.attr("d", arc4); // redraw the arcs

      path5 = svg5.datum(dataset[4]).selectAll("path");
      path5 = path5.data(pie); // compute the new angles
      path5.attr("d", arc5); // redraw the arcs

      path6 = svg6.datum(dataset[5]).selectAll("path");
      path6 = path6.data(pie); // compute the new angles
      path6.attr("d", arc6); // redraw the arcs
    }

}
