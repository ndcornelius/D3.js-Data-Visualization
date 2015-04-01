
var height, width, margin;
var height3, width3;
var data, keys, renderer, camera, container;
var markers;
//var duration, stop;



//var scale[];
init();
initialData();



function init() {
    
    d3.select("body")
        .append("p")
        .attr("id", "keys");
    
    d3.select("body")
        .append("div")
        .attr("id", "plot3d");
    
    d3.select("body")
        .append("div")
        .attr("id", "plot1d");
    
    d3.select("body")
        .append("div")
        .attr("id", "plot2d");
    
    height = 170;
    width = 900;
    margin = {top: 40, left: 50, right: 20, bottom: 30}
    width3 = (1/1.6)*width;
    height3 =  width; //1.6*width;
    
    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setSize(height3, width3);
    
    container = document.getElementById('plot3d').appendChild(renderer.domElement);
    
    camera = new THREE.PerspectiveCamera(45, height3 / width3, 1, 500);
    camera.position.set(0, 0, 100);
    //camera.lookAt(new THREE.Vector3(0, 0, 0));
            
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


/*function sizeChange(id) {
    //TODO
    d3.select('#' + id)append("g").attr("transform", "scale(" + $("#container").width()/900 + ")");
    
}*/

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


function threeInit() {
    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setSize(height3, width3);
    
    d3. select("body")
        .append("div")
        .attr("id", "threevarplot")
            
    container = document.getElementById('threevarplot').appendChild(renderer.domElement);
    camera = new THREE.PerspectiveCamera(45, height3 / width3, 1, 500);
    camera.position.set(0, 0, 100);
    //camera.lookAt(new THREE.Vector3(0, 0, 0));
}
  
    // Default data display
function initialData() {
    d3.csv("sin_cos.csv", function (fileData) { 
    
        data = fileData;
        keys = d3.keys(data[0]);
        
        draw();
    });
}


function draw() {
    
    var text = "";
    for (var k in keys) {
        text = text +" " + keys
    }
        d3.select("#keys")
            //.html(text);
    
    markers = {};

    plot("svg1", keys[0], keys[1], 1);
    plot("svg2", keys[0], keys[2], 1);
    plot("svg3", keys[1], keys[2], 2);
    threeVarPlot(0, 1, 2);
    
    time = d3.extent(data, function(d) {return +d[keys[0]]});
    duration = (+time[1] - +time[0]) * 1000;
    
    if (duration > 10000) {
        duration = 10000 
    }
    
    transitionElement("svg1", 0, 1, duration, 170, 900);
    transitionElement("svg2", 0, 2, duration, 170, 900);
    transitionElement("svg3", 1, 2, duration, 400, 400);
    
    for (var i in markers) { 
        markers[i]();
    }

    
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
            console.log(i);
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

function threeVarPlot(a, b, t ) {
    
    var scene = new THREE.Scene();
    scene.add(camera);
            
            var x = { max: d3.max( data, function(d) {return +d[keys[b]];}),
                min: d3.min(data, function(d) {return +d[keys[b]];})}		
                            
            var y = { max: d3.max(data, function(d) {return +d[keys[t]];}), 
                        min: d3.min(data, function(d) {return +d[keys[t]];})}
                        
            var t = { max: d3.max(data, function(d) {return +d[keys[a]];}), 
                        min: d3.min(data, function(d) {return +d[keys[a]];})}
                                
            var xScale = d3.scale.linear()
                    .domain([x.min, x.max])
                    .range([-15, 15]);
                    
            var yScale = d3.scale.linear()
                    .domain([y.max, y.min])
                    .range([-15, 15]);
                    
            var tScale = d3.scale.linear()
                    .domain([t.max, t.min])
                    .range([-25, 25]);
                    
            var geometry = new THREE.Geometry();
            var material = new THREE.LineBasicMaterial({
                color: 0x333333
                //color: 0x4682b4
            });
            for (var i=0; i<data.length; i++) {
            
                var entry = data[i];
                var p1 = tScale(entry[keys[0]]);
                var p2 = xScale(entry[keys[1]]);
                var p3 = yScale(entry[keys[2]]);
                geometry.vertices.push(new THREE.Vector3(p1, p2, p3));
            }
        
            var line = new THREE.Line(geometry, material);
            scene.add(line);
            
            
            controls = new THREE.TrackballControls( camera, container );
            controls.target.set( 0, 0, 0 );
            
            function animate() {
                
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            controls.update();
            }
            
            animate();
}

openFile("uploader");

function loadData(csv) {
    
    //stop = true;
    
    d3.selectAll("svg").remove();
    var fileData = d3.csv.parse(csv);		
    
    keys = d3.keys(fileData[0]);
    data = fileData;
    
    draw();
}
// Code to open the user uploaded file using HTML5 FileReader
function openFile(element) {
    var input = document.getElementById(element);
    var reader = new FileReader();
    
    reader.onload = function(e) {
        var text = e.target.result;
        loadData(text);
    }
    
    uploader.addEventListener("change", handleFile, false);
    
    function handleFile() {
        var file = this.files[0];
        reader.readAsText(file);
    }
}

 