// @TODO Use Functions to generate code to pull json data into html
function getPlot(id) {
    d3.json("samples.json").then((importedData) => {
        // console.log(importedData)
        var wfreq = importedData.metadata.map(d => d.wfreq)
            //filter data array to isolate samples
        var samples = importedData.samples.filter(s => s.id.toString() === id)[0];
        // console.log(samples)
        var values = samples.sample_values.slice(0, 10).reverse();
        // console.log(values)
        //top ten otu ids
        var top_ten = (samples.otu_ids.slice(0, 10)).reverse();
        // console.log(top_ten)
        var OTU_id = top_ten.map(d => "OTU" + d);
        // console.log(OTU_id)
        var labels = samples.otu_labels.slice(0, 10);
        // console.log(labels)
        //create variable trace for bar graph and set up plot with values and layout
        var trace = {
            x: values,
            y: OTU_id,
            type: 'bar',
            text: labels,
            marker: { color: 'violet' },
            orientation: 'h',
        };
        var data = [trace];
        //create layout for bar
        var layout = {
            title: 'Top 10 OTU',
            yaxis: {
                tickmode: "linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };
        Plotly.newPlot("bar", data, layout);
        //create second variable for bubble graph and set up plot and layout for bubble chart
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: 'markers',
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids,
                colorscale: 'Rainbow'
            },
            text: samples.otu_labels
        };
        //create layout for bubble
        var layout_2 = {
            xaxis: { title: "OTU ID" },
            height: 600,
            width: 800
        };

        var data1 = [trace1];
        Plotly.newPlot("bubble", data1, layout_2);
    });
}

// function gauge(level) {
//     d3.json("samples.json").then((importedData) => {
//         // console.log(importedData)
//         var wfreq = importedData.metadata.map(d => d.wfreq)
//     });
//     var degrees = 9 - level,
//         radius = .5;
//     var radians = degrees * Math.PI / 9;
//     var x = radius * Math.cos(radians);
//     var y = radius * Math.sin(radians);
//     var mainPath = 'M -.0 -0.025 L .0 0.025 L',
//         pathX = String(x),
//         space = ' ',
//         pathY = String(y),
//         pathEnd = 'z';
//     var path = mainPath.concat(pathX, space, pathY, pathEnd);
//     var data = [{
//             type: 'scatter',
//             x: [0],
//             y: [0],
//             marker: { size: 28, color: '85000' },
//             showlegend: false,
//             name: 'wpw',
//             text: level,
//             hoverinfo: 'text+name'
//         },
//         {
//             values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
//             rotation: 90,
//             text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
//             textinfo: 'text',
//             textposition: 'inside',
//             marker: {
//                 colors: ['rgba(119, 170, 221, .5)',
//                     'rgba(153, 221, 255, .5)',
//                     'rgba(68, 187, 153, .5)',
//                     'rgba(187, 204, 51, .5)', 'rgba(170, 170, 0, .5)',
//                     'rgba(238, 221, 136, .5)', 'rgba(238, 136, 102, .5)',
//                     'rgba(255, 170, 187, .5)', 'rgba(221, 221, 221, .5)',
//                     'rgba(255, 255, 255, 0)'
//                 ]
//             },
//             // labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
//             hoverinfo: 'text',
//             hole: .5,
//             type: 'pie',
//             showlegend: false

//         }
//     ];

//     var layout = {
//         shapes: [{
//             type: 'path',
//             path: path,
//             fillcolor: '850000',
//             line: {
//                 color: '850000'
//             }
//         }],
//         title: "Frequency",
//         height: 500,
//         width = 600,
//         margin: {
//             l: 25,
//             r: 25,
//             b: 25,
//             t: 75
//         },
//         xaxis: { zeroline: false, showticklabels: false, showgrid: false, range: [-1, 1] },
//         yaxis: { zeroline: false, showticklabels: false, showgrid: false, range: [-1, 1] }

//     };
//     Plotly.newplot("gauge", data, layout);
// };


function getInfo(id) {
    d3.json("samples.json").then((importedData) => {
        //variables 
        var metadata = importedData.metadata;
        // console.log(metadata)
        //isolate metadata in data array with result variable
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        var demographicInfo = d3.select("#sample-metadata");
        demographicInfo.html("");
        //grab data for id and append
        Object.entries(result).forEach((key) => {
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}
//function for changed event
function optionChanged(id) {
    getPlot(id);
    getInfo(id);
    // buildGauge(wfreq);
}
//function for intializing data rendering
function init() {
    //variable dropdown created
    var dropdown = d3.select("#selDataset");
    d3.json("samples.json").then((importedData) => {
        // console.log(importedData)
        //get ID to append to drop down 
        importedData.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
        //call data to display graphs
        getPlot(importedData.names[0]);
        getInfo(importedData.names[0]);
        // buildGauge(importedData.names[0]);
    });
}
init();