function getPlots(id) {
    d3.json("samples.json").then(importedData => {
        // console.log(importedData)

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
            type: 'bar'
                // text: labels,
                // marker: { color: 'rgb(55,83,109)' },
                // orientation: 'h',
        };
        var data = [trace];

        // var layout = {
        //     title: 'Top 10 OTU',
        //     xaxis: {
        //         tickfont: {
        //             size: 14,
        //             color: 'rgb(107,107,107)'
        //         }
        //     },
        //     yaxis: {
        //         tickfont: {
        //             size: 14,
        //             color: 'rgb(107,107,107)'
        //         }
        //     },
        //     // margin: {
        //     //     l: 100,
        //     //     r: 100,
        //     //     t: 100,
        //     //     b: 100
        //     // }
        // };
        Plotly.newplot("bar", data);

        // var trace = {
        //     x: importedData.samples[0].otu_ids,
        //     y: importedData.samples[0].sample_values,
        //     mode: "markers",
        //     marker: {
        //         size: importedData.samples[0].sample_values,
        //         color: importedData.samples[0].otu_ids
        //     },
        //     text: importedData.samples[0].otu_labels
        // };
        // var layout_2 = {
        //     xaxis: { title: "OTU ID" },
        //     height: 600,
        //     width: 100
        // };

        // var data1 = [trace1];
        // Plotly.newplot("bubble", data1, layout_2);
    });
}