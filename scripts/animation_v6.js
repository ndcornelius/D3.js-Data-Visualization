
/*var dataViz = {
    
    viz3d : {
        
        height: 0,
        width: 0,
        margin: {},
        renderer,
        camera,
        container,
        axisRenderer,
        axisCamera,
        axisContainer,
        init,
        plot
        
    
    
    },

    viz2d : {
        
        height: 0,
        width: 0,
        margin: {},
        markers,
        init,
        plot;
        
    },
    
    data,
    keys;
    
}*/


var height, width, margin;
var height3, width3;
var data, keys, renderer, camera, container, fileData, renderer2, camera2, container2;
var markers;
//var duration, stop;



//var scale[];
init();
initialData();



function init() {
    
    d3.select("#upload")
        .append("div")
        .attr("id", "keys");
    
    d3.select("body")
        .append("div")
        .attr("id", "plot3d");
        
    d3.select("#plot3d")
        .append("div")
        .attr("id", "axes3d");
    
    d3.select("body")
        .append("div")
        .attr("id", "plot1d");
    
    d3.select("body")
        .append("div")
        .attr("id", "plot2d");
    
    height = 170;
    width = 900;
    margin = {top: 40, left: 50, right: 20, bottom: 30}
    width3 = window.innerWidth-650;
    height3 =  width3*1/1.6;
    axesWidth = width3/5;
    axesHeight = width3/5;
    
    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setSize(width3, height3);
    
    renderer2 = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer2.setSize(axesWidth, axesHeight);
    
    container = document.getElementById('plot3d').appendChild(renderer.domElement);
    container2 = document.getElementById('axes3d').appendChild(renderer2.domElement);
    
    camera = new THREE.PerspectiveCamera(45, width3 / height3, 1, 1000);
    camera.position.set(0, 0, 100);
    
    camera2 = new THREE.PerspectiveCamera( 50, axesWidth / axesHeight, 1, 1000 );
    camera2.up = camera.up; // important!
    
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    
    d3.select("#axes3d")
        .style("width", axesWidth)
        .style("height", 1);
            
}

function plot(id, x, y, variables) {
    
    var height, width, yTicks, xTicks, div;
    
    
    if (variables == 1) { //Plot with only one variable with respect to time. (x axis is time)
        xTicks = 7;
        yTicks = 5;
        height = 170;
        width = 900;
        div = "#plot1d"
    }
    else { // Plot with two variables with respect to time. (x axis is variable)
        height = 400;
        width = 400;
        xTicks = 10;
        yTicks = 10;
        div = "#plot2d"
    }
    
    var xScale = d3.scale.linear()
        .domain(d3.extent(data, function (d) {return +d[x]}))
        .range([0, width - margin.left - margin.right]);
        
    var yScale = d3.scale.linear()
        .domain(d3.extent(data, function (d) {return +d[y]}).reverse())
        .range([0, height - margin.top - margin.bottom]);
    
    var svg = d3.select(div)
        .append("div")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
            .attr("id", id);
            
    var line =  d3.svg.line()
        .x(function (d) { return xScale(d[x])})
        .y(function (d) { return yScale(d[y])});
        
    var plot = svg.append("g")
        .append("path")
        .attr("d", line(data))
        .attr("class", "line");
        
    function addAxes() {
        
        var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom")
                    .ticks(xTicks);
                    
        var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .ticks(yTicks);
                    
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height - margin.top - margin.bottom) + ")")
            .call(xAxis)
            .append("text")
                .attr("class", "axisLabel")
                .attr("transform", "rotate(0)")
                .attr("y", margin.bottom)
                .attr("x", (width-margin.right-margin.left)/2)
                .attr("dx", ".71em")
                .style("text-anchor", "end")
                .text(x);
        
        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(0, 0)")
            .call(yAxis)
            .append("text")
                .attr("class", "axisLabel")
                .attr("transform", "rotate(-90)")
                .attr("y", -margin.left)
                .attr("x", -(height-margin.left-margin.right)/2)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text(y);
    }
    
    addAxes();
    
    
    
    
  /*  var circle = svg.append("circle")
        .attr("class", "marker")
        .attr("id", id + "marker")
        .attr("r", 6);
        
    function transition() {
        circle.interrupt().transition()
            .duration(duration)
            .attrTween("transform", translateAlong(plot.node()))
            .ease("linear")
            .each("end", transition);
    }
    
    transition()*/
    

}

function ThreeDScatterPlot(a, b, t) {
    
    var scene = new THREE.Scene();
    var axisScene = new THREE.Scene();
    //scene.add(camera);
                                
    var xScale = d3.scale.linear()
            .domain(d3.extent( data, function(d) {return +d[keys[b]]}))
            .range([-15, 15]);
            
    console.log(d3.extent( data, function(d) {return +d[keys[b]]}))
            
    var yScale = d3.scale.linear()
            .domain(d3.extent( data, function(d) {return +d[keys[t]]}).reverse())
            .range([-15, 15]);
            
     console.log(d3.extent( data, function(d) {return +d[keys[b]]}))
            
    var tScale = d3.scale.linear()
            .domain(d3.extent( data, function(d) {return +d[keys[a]]}).reverse())
            .range([-15, 15]);
            
     console.log(d3.extent( data, function(d) {return +d[keys[b]]}))
            
    
    var material = new THREE.MeshBasicMaterial({
        color: 0x333333
    });
    var radius = 0.2;
    var segments = 10;
    var geometry = new THREE.SphereGeometry( radius, segments );
    for (var i=0; i<data.length; i++) {
        var circle = new THREE.Mesh( geometry, material );
        var entry = data[i];
        circle.position.y = tScale(entry[keys[t]]);
        circle.position.x = xScale(entry[keys[b]]);
        circle.position.z = yScale(entry[keys[a]]);
        scene.add(circle)
    }
    
    controls = new THREE.TrackballControls( camera, container );
    /*var bb = new THREE.Box3()
    bb.setFromObject(line);
    bb.center(controls.target);*/
    controls.target = new THREE.Vector3( 0, 0, 0 );
    
    axis = new THREE.AxisHelper( 100 );
    axisScene.add( axis );
    
    
    
    function render() {
        renderer.render(scene, camera);
        renderer2.render(axisScene, camera2);
    }
    
        
    function animate() {
        
        requestAnimationFrame(animate);

        controls.update();
        
        camera2.position.copy( camera.position );
        camera2.position.sub( controls.target );
        camera2.position.setLength( 300 );
        
        camera2.lookAt( axisScene.position );
        
        render();
    }
    
    animate();
    
}

function threeVarPlot(a, b, t ) {
    
    var scene = new THREE.Scene();
    var scene2 = new THREE.Scene();
    //scene.add(camera);
                                
    var xScale = d3.scale.linear()
            .domain(d3.extent( data, function(d) {return +d[keys[b]]}))
            .range([0, 15]);
            
    var yScale = d3.scale.linear()
            .domain(d3.extent( data, function(d) {return +d[keys[t]]}).reverse())
            .range([0, 15]);
            
    var tScale = d3.scale.linear()
            .domain(d3.extent( data, function(d) {return +d[keys[a]]}).reverse())
            .range([-15, 15]);
            
    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({
        color: 0x333333
    });
    for (var i=0; i<data.length; i++) {
    
        var entry = data[i];
        var p1 = tScale(entry[keys[t]]);
        var p2 = xScale(entry[keys[b]]);
        var p3 = yScale(entry[keys[a]]);
        geometry.vertices.push(new THREE.Vector3(p1, p2, p3));
    }

    var line = new THREE.Line(geometry, material);
    scene.add(line);
    

    
    controls = new THREE.TrackballControls( camera, container );
    var bb = new THREE.Box3()
    bb.setFromObject(line);
    bb.center(controls.target);
    
    axis = new THREE.AxisHelper( 100 );
    scene2.add( axis );
    
        //Add axis labels ...
    function addAxisLabels () {
    
        var  textGeo = new THREE.TextGeometry('X', {
            size: 15,
            height: 2,
            curveSegments: 6,
            font: "helvetiker",
            style: "normal"

        });
        var  color = new THREE.Color();
        color.setRGB(0, 0, 0);
        var  textMaterial = new THREE.MeshBasicMaterial({ color: color });
        var  text = new THREE.Mesh(textGeo , textMaterial);

        text.position.x = 100;
        text.position.y = 0;
        text.position.z = 0;
        text.rotation = camera2.rotation;
        scene2.add(text);
        
        textGeo = new THREE.TextGeometry('Y', {
            size: 15,
            height: 2,
            curveSegments: 6,
            font: "helvetiker",
            style: "normal"

        });
        text = new THREE.Mesh(textGeo , textMaterial);

        text.position.x = 0;
        text.position.y = 100;
        text.position.z = 0;
        text.rotation = camera2.rotation;
        scene2.add(text);
        
        textGeo = new THREE.TextGeometry('Z', {
            size: 15,
            height: 2,
            curveSegments: 6,
            font: "helvetiker",
            style: "normal"

        });
        text = new THREE.Mesh(textGeo , textMaterial);

        text.position.x = 0;
        text.position.y = 0;
        text.position.z = 100;
        text.rotation = camera2.rotation;
        scene2.add(text);
    }
    
    function render() {
        renderer.render(scene, camera);
        renderer2.render(scene2, camera2);
    }
    
        
    function animate() {
        
        requestAnimationFrame(animate);

        controls.update();
        
        camera2.position.copy( camera.position );
        camera2.position.sub( controls.target );
        camera2.position.setLength( 300 );
        
        camera2.lookAt( scene2.position );
        
        render();
    }
    
    animate();
}

//function sizeChange(id) {
    //TODO
    
//}

function zoom(id, a, b) {
    
    var x = d3.scale.linear()
        .domain([-width / 2, width / 2])
        .range([0, width]);

    var y = d3.scale.linear()
        .domain([-height / 2, height / 2])
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickSize(-height);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5)
        .tickSize(-width);

    var zoom = d3.behavior.zoom()
        .x(x)
        .y(y)
        .scaleExtent([1, 32])
        .on("zoom", zoomed);
    
    var svg = d3.select("#" + id)
    
    svg.append("g")
        .call(zoom);
    
    function zoomed() {
        svg.select(".x.axis").call(xAxis);
        svg.select(".y.axis").call(yAxis);
    }
}
  
    // Loads displays the default data file
function initialData() {
    d3.text("../data/sin_cos.csv", function (csv) { 
    
        previewData(csv)
        loadData();
    });
}

// Function: tabulate
// Parameters: data, maxLength
// Takes parsed csv data and creates a custom html <div> table with the
// labels on the left side, the first data points up to maxLength extending to the right, 
// and a check box to the left of each label. Example:
// 
// -------------------------------
// []_|_A_|_1_|_2_|_3_|_4_|_5_|...
// []_|_B_|_1_|_2_|_3_|_4_|_5_|...
// []_|_C_|_1_|_2_|_3_|_4_|_5_|...
// ...


function tabulate(data, maxLength) {
    
    var row;
    var keys = d3.keys(data[0]);
    var tableData = [];
    
    maxLength =  (maxLength < data.length) ? maxLength : data.length;
    
    var table = d3.select("#keys")
        .append("div")
            .attr("id","dataPreview")
            .append("div")
                .attr("class", "table")
                .attr("id", "dataTable");
            
    for (var i=0; i<keys.length; i++) {
        
        row = table.append("div")
            .attr("class", "tableRow");
            
        row.append("div")
            .attr("class", "limitedBox")
                .append("input")
                    .attr("type", "checkbox")
                    .attr("onclick", "return validateChecks(this)")
                    .attr("id", keys[i] + "box");
            
        row.append("div")
            .attr("class", "tableHead")
                .append("p")
                    .text(keys[i]);
        
        for(var j=0; j<maxLength; j++) {
            
            var entry = data[j];
            
            row.append("div")
            .attr("class", "tableCell")
                .append("p")
                    .text(Math.round(+entry[keys[i]] * 100000)/100000); // Only limits decimal places
        }
    }  
}

function draw(x) {
    
    var columns = [];
    
    markers = {};
    
    for( var i=0; i<keys.length; i++) {
        box = document.getElementById(keys[i] + "box");
        if( box.checked) {
            columns.push(i);
        }
    }
    
    if (columns.length == 0) {
        columns = [0, 1, 2]
    }
    console.log(columns);

    plot("svg1", keys[0], keys[1], 1);
    plot("svg2", keys[0], keys[2], 1);
    plot("svg3", keys[1], keys[2], 2);
    
    x === 0 ? threeVarPlot(columns[0], columns[1], columns[2]) : ThreeDScatterPlot(columns[0], columns[1], columns[2]);
    
    time = d3.extent(data, function(d) {return +d[keys[0]]});
    duration = (+time[1] - +time[0]) * 1000;
    
    if (duration > 10000) {
        duration = 10000 
    }
    
    /*transitionElement("svg1", 0, 1, duration, 170, 900);
    transitionElement("svg2", 0, 2, duration, 170, 900);
    transitionElement("svg3", 1, 2, duration, 400, 400);
    
    for (var i in markers) { 
        markers[i]();
    }*/

    
    /*zoom("svg1", 0, 1);
    zoom("svg2", 0, 2);
    zoom("svg3", 1, 2);*/
}

/*
function transitionElement( id, a, b, duration) {
    
    var svg = d3.select("#" + id)
    
    var height = svg.style("height")
    var width = svg.style("width")
    
    var circle = svg.append("circle")
        //.attr("class", "marker")
        .attr("id", id + "marker")
        .attr("r", 6);
        
    function transition() {
        circle.interrupt().transition()
            .duration(duration)
            .attrTween("transform", translateOn( a, b, height, width))
            .ease("linear")
            .each("end", transition);
    }
    
    transition()
    
}

function translateOn(u, v, height, width) {
    
    var time, x, y, row;
    
    var scale = d3.scale.linear()
        .domain([0, 1])
        .range([0, data.length - 1]);
        
    var uScale = d3.scale.linear()
        .domain(d3.extent(data, function(d) {return +d[keys[u]]}))
        .range([0, width -margin.left-margin.right]);
        
    var vScale = d3.scale.linear()
        .domain(d3.extent(data, function(d) {return +d[keys[v]]}).reverse())
        .range([0, height - margin.top - margin.bottom]);
    
    return function (d, i, a) {
        return function (t) {
            time = Math.floor(scale(t));
            row = data[time];
            x = uScale(row[keys[u]]);
            y = vScale(row[keys[v]]);
            
            return "translate(" + x + "," + y + ")";
        }
    }
}*/

function transitionElement( id, a, b, duration, height, width) {
    
    // Init calculate scales and return negative y?
    
    var svg = d3.select("#" + id)
    
    //var height = svg.style("height")
    //var width = svg.style("width")
    
    var circle = svg.append("circle")
        //.attr("class", "marker")
        .attr("id", id + "marker")
        .attr("r", 5);

     var transitionScale = d3.scale.linear()
        .domain([0, 1])
        .range([0, data.length - 1]);
        
    var aScale = d3.scale.linear()
        .domain(d3.extent(data, function(d) {return +d[keys[a]]}))
        .range([0, width -margin.left-margin.right]);
        
        //console.log(height);
        
    var bScale = d3.scale.linear()
        .domain(d3.extent(data, function(d) {return +d[keys[b]]}).reverse())
        .range([0, height - margin.top - margin.bottom]);
        
    function transition () {
        
        /*if (stop) { return ;
        console.log("returned out of transition");}
        else {*/
            circle.interrupt().transition()
                .duration(duration)
                .attrTween("transform", translateOn(a, b, transitionScale, aScale, bScale))
                .ease("linear")
                .each("end", transition);
        //}
    }
    function markersLength () { 
        var t = 0;
        for (var i in markers) { 
            t++; 
        }
        return t;
    }

    markers["t" + markersLength()] = transition;
    //transition()
    
}

function translateOn(u, v, scale, uScale, vScale) {
    
    var time, x, y, row;
    
    
    return function(d, i, a) {
        return function(t) {
            
            time = Math.floor(scale(t));
            if ( typeof data[time] === 'undefined' ) {
                return "translate(0, 0)";
            }
            row = data[time];
            x = uScale(row[keys[u]]);
            y = vScale(row[keys[v]]);
            //console.log(x);
            
            return "translate(" + x + "," + y + ")";
        }
    }
}



openFile("uploader");

function previewData(csv) {
    
    d3.select("#dataTable")
        .remove();
        
    checksCount = 0;
        
    fileData = d3.csv.parse(csv);
    fileKeys = d3.keys(fileData[0]);
        
    tabulate(fileData, 1000);
    
}

function loadData(x) {
    
    console.log("load data");
                
    data = fileData;
    keys = fileKeys;
    
    d3.selectAll("svg").remove();
    draw(x);   
}

// Code to open the user uploaded file using HTML5 FileReader
function openFile(element) {
    var input = document.getElementById(element);
    var reader = new FileReader();
    
    reader.onload = function(e) {
        var text = e.target.result;
        previewData(text);
    }
    
    uploader.addEventListener("change", handleFile, false);
    
    function handleFile() {
        var file = this.files[0];
        reader.readAsText(file);
    }
}


var checksCount = 0;
function validateChecks(box) 
{
    if (!box.checked) {
        checksCount--;
        console.log(checksCount);
    }
    else {
        checksCount++;
        if (checksCount > 3)
        {
            checksCount--;
            box.checked = false;
        }
    }
}

 