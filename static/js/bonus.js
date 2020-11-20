//bonus gauge chart
d3.json("samples.json").then((importedData) => {
    var freq = importedData.metadata.map(d => d.freq);
})

function buildGauge(freq) {

    var fraction = freq / 9;

    var level = fraction * 180;
    var degrees = 180 - level,
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(Radians);
    var y = radius * Math.sin(radians);

    var mainPath = 'M -.0 -0.025 L .0 0.025 L',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX, space, pathY, pathEnd);

    var data = [{
        type: 'scatter',
        x: [0],
        y: [0],
        marker: { size: 28, color: '85000' },
        showlegend: false,
        name: 'wpw',
        text: freq,
        hoverinfo: 'text+name',
        values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
        rotation: 90,
        text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
        textinfo: 'text',
        textposition: 'inside',
        marker: {
            colors: ['rgba(119, 170, 221, .5)',
                'rgba(153, 221, 255, .5)',
                'rgba(68, 187, 153, .5)',
                'rgba(187, 204, 51, .5)', 'rgba(170, 170, 0, .5)',
                'rgba(238, 221, 136, .5)', 'rgba(238, 136, 102, .5)',
                'rgba(255, 170, 187, .5)', 'rgba(221, 221, 221, .5)',
                'rgba(255, 255, 255, 0)'
            ]
        },
        labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false

    }];

    var layout = {
        shapes: [{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
                color: '850000'
            }
        }],
        title: "Belly Button Wash Frequency",
        xaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
            range: [-1, 1]
        },
        yaxis: {
            zeroline: false,
            showticklabels: false,
            showgrid: false,
            range: [-1, 1]
        }
    };
    Plotly.newPlot("gauge", data, layout);
};