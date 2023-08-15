// place the url into a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// grab the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

// initialize the dashboard 
function init() {

// now use D3 to select the dropdown menu and populate
    let dropdownMenu = d3.select("#selDataset");

        d3.json(url).then((data) => {
        
            let sample_names = data.names;

         sample_names.forEach((id) => {

                console.log(id);
                dropdownMenu.append("option")
                .text(id)
                .property("value",id);
            });

// the first sample will be set and build the plots
        let sample1 = names[0];

        console.log(sample1);

        buildMetadata(sample1);
        buildBarChart(sample1);
        buildBubbleChart(sample1);
    });
};

// populate the metafunction info and use d3 to retrieve data
function buildMetadata(sample) {

    d3.json(url).then((data) => {

        let metadata = data.metadata;

        let value = metadata.filter(result => result.id == sample);

        console.log(value)

        let value_Data = value[0];

        d3.select("#sample-metadata").html("");
        

// use Object.entries to add the key and value and log
        Object.entries(value_Data).forEach(([key,value]) => {
// Create a <h5> element and apply styling
            console.log(key,value);
            d3.select("#sample-metadata").append("h5").style("color", "black").text(`${key}: ${value}`);
        });
    });

};

// add the function that will build the bar chart
function buildBarChart(sample) {

// use D3 to retrieve all of the data
    d3.json(url).then((data) => {

        let sample_Info = data.samples;
        
        let value = sample_Info.filter(result => result.id == sample);
       
        let value_Data = value[0];

// get the otu_ids, lables, and sample values
        let otu_ids = value_Data.otu_ids;
        let otu_labels = value_Data.otu_labels;
        let sample_values = value_Data.sample_values;

// log the data to the console and set the 10 uto values in descending order
        console.log(otu_ids,otu_labels,sample_values);

        let y = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let x = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        
// set up the trace for the bar chart
        let trace1 = {
            x: x,
            y: y,
            text: labels,
            type: "bar",
            orientation: 'h',
       
            transforms: [{
            type: 'sort',
            target: 'y',
            order: 'descending',
          }],
          marker: {
            color: 'rgb(255, 182, 193)',
            opacity: 1,
            line: {
              color: 'rgb(0, 0, 0)',
              width: 1
            }
          }
        };
// setup the layout
        let layout1 = {
            title: "Top 10 OTUs",
        };

// plot the bar chart
        Plotly.newPlot("bar", [trace1], layout1)
    });
};

// function that builds the bubble chart
function buildBubbleChart(sample) {

// use D3 to retrieve all of the data
    d3.json(url).then((data) => {
        
        let sample_Info = data.samples;
       
        let value = sample_Info.filter(result => result.id == sample);
     
        let value_Data = value[0];

// get the otu_ids, lables, and sample values
        let otu_ids = value_Data.otu_ids;
        let otu_labels = value_Data.otu_labels;
        let sample_values = value_Data.sample_values;

// log the data to the console
        console.log(otu_ids,otu_labels,sample_values);
        
// set up the trace for bubble chart
        let trace2 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

// set up the layout
        let layout2 = {
            title: "Bacteria Bubble Chart",
            xaxis: {title: "OTU ID"},
        };

// plot the bubble chart
        Plotly.newPlot("bubble", [trace2], layout2)
    });
};

// update the function every time a new sample is selected and build the plots
function optionChanged(value) { 

    console.log(value); 

    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
};

init();