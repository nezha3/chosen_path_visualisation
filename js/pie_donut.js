d3.csv("dataset/data.csv", function (data){
    var canvas = d3.select("body").append("svg")
      .attr("width", 1000)
      .attr("height", 1000);

    var group = canvas.append("g")
      .attr("transform", "translate(400,400)");

    var r = 300;
    var p = Math.PI * 2;
    var data = [10, 50, 80]

    var color = d3.scale.ordinal()
      .range(["red","blue","yellow"])

    var arc = d3.svg.arc()
      .innerRadius(r-80)  //if 0 then pie chart
      .outerRadius(r);

    var pie = d3.layout.pie()
      .value(function (d){ return d;});

    var arcs = group.selectAll("arc")
      .data(pie(data))
      .enter()
        .append("g")
        .attr("class", arc);

    arcs.append("path")
      .attr("d", arc)
      .attr("fill", function(d, i){return color(d.data);})

    arcs.append("text")
      .attr("transform", function(d){ return "translate ("+ arc.centroid(d) + ")"})
      .attr("text-anchor", "middle")
      .attr("font-size", "2em")
      .text(function(d){return d.data; })

})
