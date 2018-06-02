// D3 JS Sunburst chart
// @ Oliver Chi  2018.05

function sunburst(dataset,r, svg){
var data =  dataset[0];


var color = d3.scale.category20();

var pie = d3.layout.pie()
    .value(function(d) { return d; })
    .sort(null);

var arc = d3.svg.arc()
    .innerRadius(r - 40)
    .outerRadius(r);

        //console.log(data);
        var path = svg.datum(data).selectAll("path")
            .data(pie)
          .enter().append("path")
            .attr("fill", function(d, i) { return color(i); })
            .attr("d", arc);


        var timeout = setTimeout(function() {
          //datachange();
          //change();
        }, 2000);

        function datachange() {
          data[2] = 129;
        }

        function change() {
          clearTimeout(timeout);
          pie.value(function(d) { return d;}); // change the value function  function(d) { return d["oranges"]; }
          path = path.data(pie); // compute the new angles
          path.attr("d", arc); // redraw the arcs
        }

}
