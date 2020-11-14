function getPlot(id) {
    d3.json("samples.json").then(importedData => {
        console.log(importedData)
        var wfreq = importedData.metadata.map(d => d.wfreq)
        console.log(wfreq)
        var ids = importedData.samples[0].otu_ids;
        // console.log(ids)
        var values = importedData.samples[0].sample_values.slice(0, 10).reverse();
        // console.log(values)
        var labels = importedData.samples[0].otu_labels.slice(0, 10);
        // console.log(labels)
        //top ten otu ids
        var top_ten = (importedData.samples[0].otu_ids.slice(0, 10)).reverse();
        // console.log(top_ten)
        var OTU_id = top_ten.map(d => "OTU" + d);
        // console.log(OTU_id)
        var labels = importedData.samples[0].otu_labels.slice(0, 10);
        // console.log(labels)
        var trace = {
            x: values,
            y: OTU_id,
            type: 'bar',
            text: labels,
            marker: { color: 'rgb(55,83,109)' },
            orientation: 'h',
        };
        var data = [trace];

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

        var trace1 = {
            x: importedData.samples.otu_ids,
            y: importedData.samples.sample_values,
            mode: "markers",
            marker: {
                size: importedData.samples.sample_values,
                color: importedData.samples.otu_ids
            },
            text: importedData.samples.otu_labels
        };
        var layout_2 = {
            xaxis: { title: "OTU ID" },
            height: 600,
            width: 1000
        };

        var data1 = [trace1];
        Plotly.newPlot("bubble", data1, layout_2);
    });
}

function getInfo(id) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        console.log(metadata)
        var result = metadata.filter(meta => meta.id.toString() == id)[0];
        var demographicInfo = d3.select("#sample-metadata");
        demographicInfo.html("");
        Object.entries(result).forEach((key) => {
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}

function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}

function init() {
    var dropdown = d3.select("#selDataset");
    d3.json("samples.json").then((importedData) => {
        console.log(importedData)
        importedData.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
        getPlot(importedData.names[0]);
        getInfo(importedData.names[0]);
    });
}
init();