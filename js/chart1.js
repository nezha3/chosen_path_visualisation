var width = 500;
var height = 500;
var widthScale = d3.scale.linear()
                    .domain([0, 100])
                    .range([0, width]);

var color = d3.scale.linear()
              .domain([0, 100])
              .range(["red", "blue"]);

var axis = d3.svg.axis()
            .scale(widthScale);


var canvas = d3.select("body")
                .append("svg")
                .attr("width", 800)
                .attr("height", 500);



var circle = canvas.append("circle")
                    .attr("cx", 250)
                    .attr("cy", 250)
                    .attr("r", 50)
                    .attr("fill", "red");

var line = canvas.append("line")
                .attr("x1", 0)
                .attr("y1", 200)
                .attr("x2", 200)
                .attr("y2", 400)
                .attr("stroke", "green");

var dataArray = [20, 30, 44, 60,100]
var bars = canvas.selectAll("rect")
                  .data(dataArray)
                  .enter() //enter , exit
                    .append("rect")
                    .attr("x", 10)
                    //.attr("y", 150)
                    .attr("height", 20)
                    .attr("width", widthScale) //function(d){return widthScale(d);}
                    .attr("y", function(d, i){
                      return i*30;
                    })
                    .attr("fill", color); //function(d){return color(d);}



canvas.append("g")
      .attr("transform", "translate(10, 160)")
      .call(axis);

bars.transition()
            .duration(1500)
            .delay(1000)
            .attr("x", 100)
            .transition()
            .attr("y", 200)
            .transition()
            .attr("x", 0)
            .each("end", function(){d3.select(this).attr("fill", "yellow")});
