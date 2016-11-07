/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _scores = __webpack_require__(1);

	var users = [];
	var margin = { top: 10, right: 20, bottom: 150, left: 40 };
	var width = 700 - margin.left - margin.right;
	var height = 500 - margin.top - margin.bottom;

	fetch("http://choniawko.com/api/users-create").then(function (res) {
	    return res.json().then(function (body) {
	        users = body;
	        console.log(users);
	        drawChart();
	    });
	});

	var drawChart = function drawChart() {
	    var svg = d3.select(".chart").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).call(responsive).append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

	    var yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);
	    var yAxis = d3.axisLeft(yScale);
	    svg.call(yAxis);

	    var xScale = d3.scaleBand().padding(0.01).domain(users.map(function (d) {
	        return d.name;
	    })).range([0, width]);

	    var xAxis = d3.axisBottom(xScale).ticks(5).tickSize(10).tickPadding(5);

	    svg.append("g").attr("transform", "translate(0, " + height + ")").call(xAxis).selectAll("text").style("text-anchor", "end").attr("transform", "rotate(-45)");

	    svg.selectAll("rect").data(users).enter().append("rect").attr("x", function (d) {
	        return xScale(d.name);
	    }).attr("y", function (d) {
	        return yScale(d.age);
	    }).attr("width", function () {
	        return xScale.bandwidth();
	    }).attr("height", function (d) {
	        return height - yScale(d.age);
	    });
	};

	var responsive = function responsive(svg) {
	    var container = d3.select(svg.node().parentNode);
	    var width = parseInt(svg.style("width"));
	    var height = parseInt(svg.style("height"));
	    var aspect = width / height;

	    var resize = function resize() {
	        var targetWidth = parseInt(container.style("width"));
	        svg.attr("width", targetWidth);
	        svg.attr("height", Math.round(targetWidth / aspect));
	    };

	    svg.attr("viewBox", "0 0 " + width * 1.5 + " " + height * 1.5).attr("preserveAspectRatio", "xMinYMid").call(resize);

	    d3.select(window).on("resize." + container.attr("id"), resize);
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var scores = exports.scores = [{ name: "Alice", score: 96 }, { name: "Alice", score: 83 }, { name: "Alice", score: 91 }, { name: "Alice", score: 96 }, { name: "Alice", score: 88 }, { name: "Paweł", score: 907 }];

/***/ }
/******/ ]);