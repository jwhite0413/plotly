function getPlots(id) {


    d3.json("../data/samples.json").then(sampledata => {
        // console.log(sampledata);
        var ids = sampledata.samples[0].otu_ids;
        // console.log(ids)
        var values = sampledata.samples[0].sample_values.slice(0,10).reverse();
        // console.log(values)
        var labels =sampledata.samples[0].otu_labels.slice(0,10);
        // console.log(labels)
        //top ten otu ids
        var top_ten = (sampledata.samples[0].otu_ids.slice(0,10)).reverse();
        // console.log(top_ten)
        var OTU_id = OTU_top.map(d => "OTU" +d);
        console.log("OTU IDS: ${OTU_id}")
    }
)};