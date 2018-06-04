// D3 JS Sunburst chart
// @ Oliver Chi  2018.05
// Thanks for ideas from Mike Bostock's static Donut chart
// Input dataset is an 6*2 Array to match main function(chart.js)
//////////////////////////////////////////////////////////////////////////////

function sunburst(dataset, dataset_selected){

    // SVG
    var svg = d3.select("#svg").append("g")
      .attr("width", 800)
      .attr("height", 800)
      .attr("id","sunburst_svg")
      .attr("transform", "translate(520,10)");;

    // Canvas
    var svg1 = svg.append("g") // Donut outside
        .attr("transform", "translate(400,400)");
    var svg2 = svg.append("g") // Donut inside
        .attr("transform", "translate(400,400)");
    var svg3 = svg.append("g") // Donut inside
      .attr("transform", "translate(400,400)");
    var svg4 = svg.append("g") // Donut inside
      .attr("transform", "translate(400,400)");
    var svg5 = svg.append("g") // Donut inside
      .attr("transform", "translate(400,400)");
    var svg6 = svg.append("g") // Donut inside
      .attr("transform", "translate(400,400)");

    var svg7 = svg.append("g") // Pie inside
      .attr("transform", "translate(400,400)");


    var svg_text = d3.select("#svg").append("g")// Text for results
      .attr("width", 800)
      .attr("height", 50)
      .attr("transform", "translate(510,820)")
        .append("text");


    // Color d3: d3.scale.category20()
    var color = d3.scaleOrdinal(d3.schemeCategory20);

    // Pie d3: d3.layout.pie()
    var pie = d3.pie()
        .value(function(d) { return d; })
        .sort(null);

    // 1st Donut //
    // arc d3: d3.svg.arc()
    var arc1 = d3.arc()
        .innerRadius(330)
        .outerRadius(380);

    // path
    var path1 = svg1.datum(per[0]).selectAll("path")
        .data(pie)
      .enter().append("path")
        .attr("fill", function(d, i) { return color(i); })
        .style("stroke", "#fff")
        .style("fill-rule", "evenodd")
        .attr("d", arc1);

    // 2nd Donut //
    // arc d3: d3.svg.arc()
    var arc2 = d3.arc()
        .innerRadius(280)
        .outerRadius(330);

    // path
    var path2 = svg2.datum(per[1]).selectAll("path")
        .data(pie)
      .enter().append("path")
        .attr("fill", function(d, i) { return color(i+2); })
        .style("stroke", "#fff")
        .style("fill-rule", "evenodd")
        .attr("d", arc2);


    // 3th Donut //
    // arc d3: d3.svg.arc()
    var arc3 = d3.arc()
        .innerRadius(230)
        .outerRadius(280);

    // path
    var path3 = svg3.datum(per[2]).selectAll("path")
        .data(pie)
      .enter().append("path")
        .attr("fill", function(d, i) { return color(i+4); })
        .style("stroke", "#fff")
        .style("fill-rule", "evenodd")
        .attr("d", arc3);

    // 4th Donut //
    // arc d3: d3.svg.arc()
    var arc4 = d3.arc()
        .innerRadius(180)
        .outerRadius(230);

    // path
    var path4 = svg4.datum(per[3]).selectAll("path")
        .data(pie)
      .enter().append("path")
        .attr("fill", function(d, i) { return color(i+6); })
        .style("stroke", "#fff")
        .style("fill-rule", "evenodd")
        .attr("d", arc4);

    // 5th Donut //
    // arc d3: d3.svg.arc()
    var arc5 = d3.arc()
        .innerRadius(130)
        .outerRadius(180);

    // path
    var path5 = svg5.datum(per[4]).selectAll("path")
        .data(pie)
      .enter().append("path")
        .attr("fill", function(d, i) { return color(i+8); })
        .style("stroke", "#fff")
        .style("fill-rule", "evenodd")
        .attr("d", arc5);

    // 6th Donut  //
    // arc d3: d3.svg.arc()
    var arc6 = d3.arc()
        .innerRadius(80)
        .outerRadius(130);

    // path
    var path6 = svg6.datum(per[5]).selectAll("path")
        .data(pie)
      .enter().append("path")
        .attr("fill", function(d, i) { return color(i+10); })
        .style("stroke", "#fff")
        .style("fill-rule", "evenodd")
        .attr("d", arc6);

    // Draw Circle inside of all Donuts
    var circle_inside = svg7.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 80)
      .attr("fill", "DarkSalmon") // will change to Crimson color
      .style("stroke", "#fff")
      .style("fill-rule", "evenodd");

    // Text inside round to indicate percentage of overall selection
    var text_percentage = svg7.append("text")
      .attr("text-anchor", "middle")
      .style("font-size", "14px")  // will change to 20px
      .attr("fill", "White")
      .text("0% Haven't Start");


    // Cycles to catch the actions in sliders
    // Make change to sunburst charts
    // Provide the result of selection
    var counter = 0;
    var timeout = setInterval(function(){
        checkChange();
        change();
        counter++;
        if(counter === 9000) {//set cycle time 1min = 300, 1hr = 300*60 =18000
            clearInterval(timeout);
        }
    }, 500);// every 200 ms check once

    // Script compares Object, Arrays and multidimensional array
    function compare(a,b){
       var primitive=['string','number','boolean'];
       if(primitive.indexOf(typeof a)!==-1 && primitive.indexOf(typeof a)===primitive.indexOf(typeof b))return a===b;
       if(typeof a!==typeof b || a.length!==b.length)return false;
       for(i in a){
            if(!compare(a[i],b[i]))return false;
       }
       return true;
    }

    // Check if change in range array
    // Provide color change for inside round
    function checkChange() {
      if (compare(range, [ [0, 264], [0, 7], [0, 1], [0, 7113], [0, 8501], [0, 29301] ])) { //compare range with original input
        console.log("Haven't start!");
      } else{
        // change of inside round of sunburst
        circle_inside.attr("fill","Crimson");

        // provide total percentage of selection
        var selected_result = totalpercentage();

        // display the final percentage
        text_percentage.text(selected_result.percentage + "%")
                        .style("font-size", "22px");

        // provide selected planets
        svg_text.text(selected_result.name)
          .attr("width", 800);
      }
    }

    // Redraw Donuts in Sunburst chart
    function change() {
      //clearTimeout(timeout); // no repeat

      path1 = svg.datum(per[0]).selectAll("path");
      path1 = path1.data(pie); // compute the new angles
      path1.attr("d", arc1); // redraw the arcs


      path2 = svg2.datum(per[1]).selectAll("path");
      path2 = path2.data(pie); // compute the new angles
      path2.attr("d", arc2); // redraw the arcs

      path3 = svg3.datum(per[2]).selectAll("path");
      path3 = path3.data(pie); // compute the new angles
      path3.attr("d", arc3); // redraw the arcs

      path4 = svg4.datum(per[3]).selectAll("path");
      path4 = path4.data(pie); // compute the new angles
      path4.attr("d", arc4); // redraw the arcs

      path5 = svg5.datum(per[4]).selectAll("path");
      path5 = path5.data(pie); // compute the new angles
      path5.attr("d", arc5); // redraw the arcs

      path6 = svg6.datum(per[5]).selectAll("path");
      path6 = path6.data(pie); // compute the new angles
      path6.attr("d", arc6); // redraw the arcs

    }

    // Calculate total percentage of selection
    function totalpercentage(){
      var selected = 0; // number of selected
      var name = "Selected Planets are: "; // selected planets' name

      dataset.forEach(function(d, i) { //check every row
        if (Number(dataset[i].Name3) >= range[0][0] && Number(dataset[i].Name3) <= range[0][1]
        && Number(dataset[i].Name4) >= range[1][0] && Number(dataset[i].Name4) <= range[1][1]
        && Number(dataset[i].Name7) >= range[2][0] && Number(dataset[i].Name7) <= range[2][1]
        && Number(dataset[i].Name12) >= range[3][0] && Number(dataset[i].Name12) <= range[3][1]
        && Number(dataset[i].Name19) >= range[4][0] && Number(dataset[i].Name19) <= range[4][1]
        && Number(dataset[i].Name23) >= range[5][0] && Number(dataset[i].Name23) <= range[5][1]){
          selected++;
          name = name + dataset[i].Name1 + ", ";
        }
      });
      return {percentage: (parseFloat(selected)*100.00/3573.00).toFixed(2), name: name};
    }



}// End of function sunburst
