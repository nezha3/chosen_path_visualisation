d3.csv("dataset/data.csv", function (data){
    var canvas = d3.select("body").append("svg")
      .attr("width", 1000)
      .attr("height", 1000);

    canvas.selectAll("rect")
      .data(data)
      .enter()
          .append("rect")
          .attr("width", function (d){ return d.Name5;})
          .attr("height", 20)
          .attr("y", function(d,i){ return i*30;})
          .attr("fill", "blue");

    canvas.selectAll("text")
      .data(data)
      .enter()
          .append("text")
          .attr("fill", "white")
          .attr("y", function(d, i) { return i *30 + 10; })
          .text( function (d){ return d.Name1 ; })

})
