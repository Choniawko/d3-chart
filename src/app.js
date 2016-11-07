import { scores } from "./scores";

let users = [];
let margin = { top: 10, right: 20, bottom: 150, left: 40 };
let width  = 700 - margin.left - margin.right;
let height = 500 - margin.top - margin.bottom;


fetch("http://choniawko.com/api/users-create")
    .then((res) => res.json().then((body) => {
        users = body;
        console.log(users);
        drawChart();
    }));


let drawChart = () => {
    let svg = d3.select(".chart")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
                .call(responsive) 
                .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    let yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);
    let yAxis = d3.axisLeft(yScale);
    svg.call(yAxis);

    let xScale = d3.scaleBand()
        .padding(0.01)
        .domain(users.map(d => d.name))
        .range([0, width]);

    let xAxis = d3.axisBottom(xScale)
        .ticks(5)
        .tickSize(10)
        .tickPadding(5);

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("transform", "rotate(-45)");
    

    svg.selectAll("rect")
        .data(users)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.name))
        .attr("y", d => yScale(d.age))
        .attr("width", () => xScale.bandwidth())
        .attr("height", (d) => height - yScale(d.age));
};

let responsive = (svg) => {
    let container = d3.select(svg.node().parentNode);
    let width = parseInt(svg.style("width"));
    let height = parseInt(svg.style("height"));
    let aspect = width / height; 

    let resize = () => {
        let targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
    };

    svg.attr("viewBox", `0 0 ${width*1.5} ${height*1.5}`)
        .attr("preserveAspectRatio", "xMinYMid")
        .call(resize);

    d3.select(window).on(`resize.${container.attr("id")}`, resize);

    
};




