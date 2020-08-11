
// @TODO: YOUR CODE HERE!
// function makeResponsive() {
var svgWidth = 960;
var svgHeight = 600;

var marginVal = 20;
var margin = {
    left: 20,
    right: 20,
    top: 20,
    bottom: 60
}
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;



var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("class", "chart");



let chartGroup =svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);




svg.append("g").attr("class","xText");

var xText = d3.select(".xText");
function xTextRefresh(){
    xText.attr("transform",
        "translate(0,20)"
    )}
xTextRefresh();


xText.append("text")
    .attr("y",height + 38)
    .attr("x",(margin.left + (svgWidth / 2)))
    .attr("data-name", "poverty")
    .attr("data-axis","x")
    .attr("class","aText active x")
    .text("In poverty (%)");

svg.append("g").attr("class","yText");

var yText = d3.select(".yText");
function yTextRefresh(){
    yText.attr("transform",
        "translate(0,20)"
    )}
yTextRefresh();

yText.append("text")
    .attr("y",0)
    .attr("data-name", "healthcare")
    .attr("data-axis","y")
    .text("Lacks Healthcare (%)");

d3.csv("assets/data/data.csv").then(function (daData){
    console.log('CSV HERE ???',daData )
    daData.forEach(function(data) {
        data.age = +data.age;
        data.smokes = +data.smokes;
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
        data.abbr = data.abbr;
        data.income = +data.income;
    });


    let xScale = d3.scaleLinear()
        .domain([9, d3.max(daData, d => d.poverty)])
        .range([0, width]);

    let yScale = d3.scaleLinear()
        .domain([3, d3.max(daData, d => d.healthcare)])
        .range([height, 0]);

// function visualize(daData){
//     var xMin;
//     var xMax;
//     var yMin;
//     var yMax;
//     function xMinMax(){
//         xMin = d3.min(daData,(d) =>{
//             parseFloat(d["poverty"])
//         });
//         xMax=d3.max(daData,d=>{
//             parseFloat(["poverty"])
//         });
        
//     }
//     function yMinMax(){
//         yMin = d3.min(daData,(d) =>{
//             parseFloat(d["healthcare"])
//         });
//         yMax=d3.max(daData,d=>{
//             parseFloat(["healthcare"])
//         });
        
//     }
//     xMinMax(),yMinMax()
//     var xScale = d3
//         .scaleLinear()
//         .domain([xMin,xMax])
//         .range([margin, width-margin]);

//     var yScale =d3
//         .scaleLinear()
//         .domain([yMin,yMax])
//         .range([margin, width-margin])
console.log('this is yscale!!!!', yScale)

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    xAxis.ticks(10);
    yAxis.ticks(10);
    console.log('heighttttt', height)
    
    chartGroup
        .append("g")
        .call(xAxis)
        .attr("class","xAxis")
        .attr("transform","translate(0," + height + ")");

    console.log('Y axis ???', yAxis)
    chartGroup
        .append("g")
        .call(yAxis)
        .attr("class","yAxis")
        .attr("transform","translate(0,0)");
    
     //  create circles defin a radius and using circRadius
    var theCircles =chartGroup.selectAll('circles').data(daData).enter()
        .append("circle")
        .attr("cx", xScale("poverty"))
        .attr("cy", yScale("healthcare"))
        .attr("r",5)       
        .attr("fill", "lightblue")
        .attr("opacity", ".6")
        .attr("stroke-width", "1")
        .attr("stroke", "black");

    theCircles
        .append("text")
        .text(d => d.abbr)
        .attr("dx", xScale("poverty"))
        .attr("dy", yScale("healthcare"))
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("class","stateText");


        // console.log(daData);





//     chartGroup.append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 0 - 50)
//         .attr("x", 0 -250)
//         .attr("dy", "1em")
//         .attr("class", "axisText")
//         .text("Lacks Healthcare (%)");
      
//     chartGroup.append("text")
//         .attr("transform", `translate(${width / 2.5}, ${height + margin.top + 25})`)
//         .attr("class", "axisText")
//         .text("In Poverty (%)");

// });
    

})

// makeResponsive();