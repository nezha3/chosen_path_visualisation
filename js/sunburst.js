// D3 JS Sunburst chart
// @ Oliver Chi  2018.05


function sunburst(){
  // Colors
  color = d3.scale.category20b();

  // SVG
  var svg = d3.select("#sunburst")
    .append("svg")
    .attr("id","svg")
    .attr("width", 920)     //svg width
    .attr("height", 920)		//svg height
    .attr("transform", "translate(0, 0)"); //svg location

    var r = 400;
    var p = Math.PI * 2;
    var data = [[10, 50, 80], [20, 34, 54],[20, 64, 54],[27, 34, 44],[66, 34, 54],[76, 34, 14]];

    var group = svg.append("g")
      .attr("transform", "translate(400, 410)");

    var pie = d3.layout.pie()
      .value(function (d){ return d;});

    var i = 0;
    while(i < 6){
      var arc = d3.svg.arc()
        .innerRadius(r - 50)  //if 0 then pie chart
        .outerRadius(r);

      r = r - 50;

      var arcs = group.selectAll("arc")
        .data(pie(data[i]))
        .enter()
          .append("g")
          .attr("class", arc);

      arcs.append("path")
        .attr("d", arc)
        .attr("fill", function(d){return color(d.data);})
        .style("stroke", "#fff")
        .style("fill-rule", "evenodd");
      i++;
    }



}
