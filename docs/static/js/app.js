let url ="https://raw.githubusercontent.com/ERIDEZ/plotly-challenge/master/static/samples.json";

var trace1 = {
  x: [],
  y: [],
  text: [],
  mode: 'markers',
  marker: {size: [40, 60, 80, 100]}
};

var data2 = [trace1];

var layout = {
  title: 'Bubble Chart',
  showlegend: false,
  height: 600,
  width: 600
};

data = [{
  x: [],
  y: [],
  text:[],
  type: "bar",
  orientation: "h"}];

function init() {

  Plotly.newPlot("bar", data);

  Plotly.newPlot('bubble', data2, layout);

  PoblateDropDown();
};


function handleSubmit() {
  d3.event.preventDefault();
  let IDS = d3.select("#selDataset").property("value");
  d3.select("#selDataset").property("value", "");
  console.log(IDS);
};


function PoblateDropDown(){

  d3.json(url).then(function(data){

    let names = Object.values(data.names);

    d3.select("#selDataset")
    .selectAll("option")
    .data(names)
    .enter()
    .append("option")
    .text(d => d);

})};    

function UpdatePlot() {

  // UPDATE BAR PLOT //
  d3.json(url).then(function(data){

    let total_samples = Object.values(data.samples);
    let selection = d3.select("#selDataset").property("value");
    
    let my_patient = total_samples.filter(d => d.id == selection);

    y = my_patient[0].otu_ids;
    x = my_patient[0].sample_values;

    x = x.slice(0,10);
    y = y.slice(0,10);

    new_y =[]

    text = my_patient[0].otu_labels
    text = text.slice(0,10)

    for(a of y) {
      new_y.push(`OTU_${a}`);
    };

    Plotly.restyle("bar", "x", [x]);
    Plotly.restyle("bar", "y", [new_y]);
    Plotly.restyle("bar", "text", text);

    // UPDATE DEMOGRAPHIC TABLE //
    let individual = Object.values(data.metadata);

    let my_individual = individual.filter(d => d.id == selection)

    my_individual = my_individual[0];


    var sample_table = d3.select('#sample-metadata')
    sample_table.html('')
    Object.keys(my_individual).forEach(key => {
      sample_table.append("p").text(`${key} ${my_individual[key]}`)
    });


    // CREATE BUBBLE CHART //

    let bubbles = [{
      x: my_patient[0].otu_ids,
      y: my_patient[0].sample_values,
      text: my_patient[0].otu_labels,
      mode: 'markers',
      marker: {color:[my_patient[0].otu_ids], size:[my_patient[0].sample_values]}}]

      Plotly.newPlot("bubble", bubbles)
















    // var margin = {top: 10, right: 20, bottom: 30, left: 50},
    // width = 500 - margin.left - margin.right,
    // height = 420 - margin.top - margin.bottom;

    // var svg = d3.select("#bubble")
    // .append("svg")
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
    // .append("g")
    // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    // var x = d3.scaleBand()
    // .domain(bubble_dict.otu_ids)
    // .range([ 0, width]);
    
    // svg.append("g")
    // .attr("transform", "translate(0," + height + ")")
    // .call(d3.axisBottom(x));

    // var y = d3.scaleLinear()
    // .domain(bubble_dict.bubble_values)
    // .range([ height, 0]);
    // svg.append("g")
    // .call(d3.axisLeft(y));

    // var z = d3.scaleBand()
    // .domain(bubble_dict.bubble_values)
    // .range([ 1, 40]);

    // svg.append('g')
    // .selectAll("dot")
    // .data(bubble_dict)
    // .enter()
    // .append("circle")
    //   .attr("cx", function (d) { return x(d.otu_ids) } )
    //   .attr("cy", function (d) { return y(d.bubble_values) } )
    //   .attr("r", function (d) { return z(d.bubble_values) } )
    //   .style("fill", "#69b3a2")
    //   .style("opacity", "0.7")
    //   .attr("stroke", "black")
    
    


})};





init();
UpdatePlot();
d3.selectAll("#selDataset").on("change", UpdatePlot);
