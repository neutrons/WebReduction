webpackJsonp([1],{

/***/ "+1c6":
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-md-10",
    attrs: {
      "id": "plot-1d-col"
    }
  }, [_c('v-panel', {
    attrs: {
      "PANELTITLE": "1D Plot",
      "PANELTYPE": "primary"
    }
  }, [(!_vm.DISABLE) ? _c('v-reset-button', {
    attrs: {
      "slot": "header-content",
      "onClick": _vm.reset
    },
    slot: "header-content"
  }, [_vm._v("Reset Plot")]) : _vm._e(), _vm._v(" "), _c('div', {
    attrs: {
      "id": "plot-1D"
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.SHOWTABLE && !_vm.isError),
      expression: "SHOWTABLE && !isError"
    }],
    staticClass: "table table-condensed table-responsive",
    attrs: {
      "id": "fit-results-table"
    }
  }, [_c('table', {
    staticClass: "table table-bordered"
  }, [_c('caption', [_c('h4', [_vm._v("Fit Results:")])]), _vm._v(" "), _c('tbody', [_c('tr', [_c('td', {
    attrs: {
      "id": "fit-file"
    }
  }), _vm._v(" "), _c('td', {
    attrs: {
      "id": "fit-type"
    }
  }), _vm._v(" "), _c('td', {
    attrs: {
      "id": "fit-points"
    }
  }), _vm._v(" "), _c('td', {
    attrs: {
      "id": "fit-range"
    }
  }), _vm._v(" "), _c('td', {
    attrs: {
      "id": "fit-error"
    }
  })]), _vm._v(" "), _c('tr', [_c('td', {
    staticClass: "sub-heading",
    attrs: {
      "colspan": "2"
    }
  }, [_vm._v("Fit Configuration:")]), _vm._v(" "), _c('td', {
    staticClass: "sub-heading",
    attrs: {
      "colspan": "2"
    }
  }, [_vm._v("Coefficients:")]), _vm._v(" "), _c('td', {
    staticClass: "sub-heading",
    attrs: {
      "colspan": "1"
    }
  }, [_vm._v("Note:")])]), _vm._v(" "), _c('tr', [_c('td', {
    attrs: {
      "colspan": "2",
      "id": "fit-configs"
    }
  }, [_c('ul', [_c('li', {
    attrs: {
      "id": "fit-damping"
    }
  }), _vm._v(" "), _c('li', {
    attrs: {
      "id": "fit-iterations"
    }
  }), _vm._v(" "), _c('li', {
    attrs: {
      "id": "fit-tolerance"
    }
  }), _vm._v(" "), _c('li', {
    attrs: {
      "id": "fit-gradient"
    }
  })])]), _vm._v(" "), _c('td', {
    attrs: {
      "colspan": "2",
      "id": "fit-coefficients"
    }
  }), _vm._v(" "), _c('td', {
    attrs: {
      "colspan": "1",
      "id": "fit-note"
    }
  })])])])])], 1)], 1)
},staticRenderFns: []}

/***/ }),

/***/ "+DWH":
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__("X6BM")
}
var Component = __webpack_require__("VU/8")(
  /* script */
  __webpack_require__("RsTs"),
  /* template */
  __webpack_require__("BBrv"),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-5d62f450",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ "/+Ed":
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__("grKx")
}
var Component = __webpack_require__("VU/8")(
  /* script */
  __webpack_require__("cPMA"),
  /* template */
  __webpack_require__("kWNt"),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0977d8c1",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ "/n00":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeLines = undefined;

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var removeLines = exports.removeLines = {
    methods: {
        removeLines: function removeLines() {
            var vm = this;

            var newKeys = [];
            vm.dataNest.forEach(function (el) {
                var keyIndex = newKeys.indexOf(el.key);

                if (keyIndex === -1) {
                    newKeys.push(el.key);
                }
            });

            var delKeys = [];

            for (var i = 0, len = vm.prevKeys.length; i < len; i++) {
                var match = newKeys.indexOf(vm.prevKeys[i]);

                if (match === -1) {
                    delKeys.push(vm.prevKeys[i]);
                }
            }

            // Remove any lines not in the dataNest
            delKeys.forEach(function (k) {
                d3.select("#scatter-" + vm.ID + "-" + k).remove();
                d3.select("#line-" + vm.ID + "-" + k).remove();
                d3.select("#error-" + vm.ID + "-" + k).remove();
                d3.select("#error-" + vm.ID + "-top-" + k).remove();
                d3.select("#error-" + vm.ID + "-bottom-" + k).remove();
                d3.select("#legend-" + vm.ID + "-" + k).remove();
            });

            // Update previous keys with current keys
            vm.prevKeys = _.clone(newKeys);
        }
    }
};

/***/ }),

/***/ "/zfM":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _eventBus = __webpack_require__("OXcg");

var _Panel = __webpack_require__("wV86");

var _Panel2 = _interopRequireDefault(_Panel);

var _ResetButton = __webpack_require__("OHJc");

var _ResetButton2 = _interopRequireDefault(_ResetButton);

var _lodash = __webpack_require__("M4fF");

var _ = _interopRequireWildcard(_lodash);

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

var _chartElements = __webpack_require__("qjSU");

var _chartElements2 = _interopRequireDefault(_chartElements);

var _brushed = __webpack_require__("UdNL");

var _checkError = __webpack_require__("pg1S");

var _initDimensions = __webpack_require__("j5SX");

var _initFitLine = __webpack_require__("tu2r");

var _initSlider = __webpack_require__("seT/");

var _redrawFit = __webpack_require__("OoR8");

var _updateFitLine = __webpack_require__("5iEx");

var _updateSlider = __webpack_require__("pAL7");

var _drawPlot = __webpack_require__("uF8u");

var _resetPlot = __webpack_require__("yIZD");

var _adjustDomains = __webpack_require__("EjQk");

var _changeScales = __webpack_require__("NlVB");

var _setResponsive = __webpack_require__("3C2h");

var _updateData = __webpack_require__("ZmW/");

var _updateLegend = __webpack_require__("N/+b");

var _zoomed = __webpack_require__("XRpi");

var _removePoint = __webpack_require__("Yhlz");

var _initScales = __webpack_require__("4myD");

var _setElements = __webpack_require__("w0zR");

var _removeLines = __webpack_require__("/n00");

var _updatePlot = __webpack_require__("EiGA");

var _updateLabels = __webpack_require__("MrIk");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Import Mixins */


/* Import Libraries */


/* Import Components */
exports.default = {
    name: 'Plot1d',
    components: {
        'v-panel': _Panel2.default,
        'v-reset-button': _ResetButton2.default
    },
    props: {
        DISABLE: {
            type: Boolean,
            default: true
        },
        SHOWTABLE: {
            type: Boolean,
            default: false
        }
    },
    data: function data() {

        var tempData = _.cloneDeep(_chartElements2.default);

        // Extend onto chart elements' base data
        tempData.elements.slider = undefined;
        tempData.elements.fitline = undefined;
        tempData.dimensions.h2 = undefined;
        tempData.margin2 = {};
        tempData.axis.x2 = undefined;
        tempData.scale.x2 = undefined;
        tempData.fitEquation = undefined;
        tempData.fitResults = null;
        tempData.fitData = null;
        tempData.brushObj = {
            brush: undefined,
            brushSelection: [],
            brushFile: undefined,
            brushFit: undefined,
            brushTransformation: undefined
        };
        tempData.ID = '1D';
        tempData.dataToFit = undefined;
        tempData.selLimits = {
            xMin: null,
            xMax: null
        };
        tempData.dataToFit = undefined;
        tempData.isError = false;
        tempData.coefficients = undefined;
        tempData.fitError = undefined;
        tempData.fitResults = undefined;
        tempData.fitLineData = [];
        tempData.prevFit = null;
        tempData.prevTransform = undefined;

        tempData.zoom = d3.zoom().on("zoom", this.zooming);

        return tempData;
    },

    computed: {
        isFit: function isFit() {
            return this.plotParameters.fileToFit !== null && this.plotParameters.fitConfiguration.fit !== 'None';
        }
    },
    mixins: [_brushed.brushed, _checkError.checkError, _initDimensions.initDimensions, _initFitLine.initFitLine, _initSlider.initSlider, _redrawFit.redrawFit, _resetPlot.resetPlot, _updateFitLine.updateFitLine, _updateSlider.updateSlider, _updateLabels.updateLabels, _adjustDomains.adjustDomains, _changeScales.changeScales, _setResponsive.setResponsive, _updateData.updateData, _updateLegend.updateLegend, _zoomed.zoomed, _removePoint.removePoint, _initScales.initScales, _setElements.setElements, _removeLines.removeLines, _updatePlot.updatePlot, _drawPlot.drawPlot],
    methods: {
        setParameters: function setParameters(parameters) {
            // Check data is valid prior to plotting
            this.plotParameters = _.cloneDeep(parameters);
        },
        updateScales: function updateScales(s) {
            var vm = this;

            vm.changeScales(s);

            // if theres a fit, update brush scale
            if (vm.isFit) {
                vm.scale.x2 = s.xScale.copy();
                vm.scale.x2.range([0, vm.dimensions.w]);
            }

            vm.updatePlot(vm.plotData);
            // if a fit is selected add/update data
            if (vm.isFit) {
                vm.updateSlider();vm.updateFitLine();
            }
        },
        zooming: function zooming() {
            var vm = this;

            // Update scales
            var new_yScale = d3.event.transform.rescaleY(vm.scale.y);
            var new_xScale = d3.event.transform.rescaleX(vm.scale.x);

            // Now call re-usable part of zoom
            vm.zoomed(new_yScale, new_xScale);

            if (vm.isFit) {
                // Re-draw fitted line
                vm.elements.plot.select(".fitted-line").attr("d", vm.line);
            }
        },
        reset: function reset() {
            var vm = this;
            var selection = vm.elements.svg.select('.zoom');
            vm.resetPlot(selection);
        }
    },
    created: function created() {
        // Listen for cofficient changes
        _eventBus.eventBus.$on("coefficients-updated", this.redrawFit);
    },

    watch: {
        plotParameters: {
            handler: function handler() {
                var vm = this;

                this.$nextTick(function () {
                    this.drawPlot();
                });
            },
            deep: true
        }
    }
};

/* Import Common Data Variables */
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* Import Event Bus */

/***/ }),

/***/ "03ul":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "0TJO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.drawPlot = undefined;

var _isFinite = __webpack_require__("AMV0");

var _isFinite2 = _interopRequireDefault(_isFinite);

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

var _lodash = __webpack_require__("M4fF");

var _lodash2 = _interopRequireDefault(_lodash);

var _eventBus = __webpack_require__("OXcg");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var drawPlot = exports.drawPlot = {
    methods: {
        drawPlot: function drawPlot() {
            var vm = this;

            // If plot is already present, simply update with the new set of data
            if (!d3.select(".chart-stitch").empty()) {

                // Remove stitch line if present,
                d3.select("#stitched-line").remove();

                // Hide Stitch related buttons
                _eventBus.eventBus.$emit("reset-is-stitched");

                vm.brushObj.brushCount = vm.plotParameters.brushCount - 1;

                vm.removeBrushes();

                vm.toggleEdit(vm.toggleChoice);
                vm.updatePlot(_lodash2.default.cloneDeep(vm.plotParameters.data));
                vm.updateBrushScale();
                vm.updateStitchLine();

                return;
            }

            vm.plotData = _lodash2.default.cloneDeep(vm.plotParameters.data); //regular data to plot
            // Filter any infinity values, null, or NaN before plotting, this will happen when transforming log data = 0
            vm.plotData = vm.plotData.filter(function (d) {
                return (0, _isFinite2.default)(d.y) && (0, _isFinite2.default)(d.x);
            });

            // Set plot dimensions
            vm.initDimensions();

            // Set scales
            vm.initScales();

            // Set initial Elements
            vm.setElements();

            // Generate a SVG group to keep brushes
            vm.brushObj.brushGroup = vm.elements.zoom.select("#zoom-stitch").append('g').attr("height", vm.dimensions.h).attr("width", vm.dimensions.w).attr("fill", "none").attr("transform", "translate(" + vm.margin.left + "," + vm.margin.top + ")").attr("class", "brushes");

            // set up brush layer
            vm.newBrush();
            vm.drawBrushes();

            // Set zoom on zoomWindow
            vm.elements.zoom.select(".zoom").call(vm.zoom);

            // Create a responsive chart
            vm.setResponsive();

            // Now finally update the plot with current data
            vm.toggleEdit(vm.toggleChoice);
            vm.updatePlot(vm.plotData);
            vm.updateBrushScale();
            vm.updateStitchLine();
        }
    }
};

/***/ }),

/***/ "0lb+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//

exports.default = {
    name: 'reset-button',
    props: {
        onClick: {
            type: Function,
            required: true
        }
    }
};

/***/ }),

/***/ "0r6H":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/fonts/glyphicons-halflings-regular.f4769f9.eot";

/***/ }),

/***/ "1Q64":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")();
// imports


// module
exports.push([module.i, "/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\nhtml {\n  font-family: sans-serif;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n}\nbody {\n  margin: 0;\n}\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block;\n}\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  vertical-align: baseline;\n}\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n[hidden],\ntemplate {\n  display: none;\n}\na {\n  background-color: transparent;\n}\na:active,\na:hover {\n  outline: 0;\n}\nabbr[title] {\n  border-bottom: 1px dotted;\n}\nb,\nstrong {\n  font-weight: bold;\n}\ndfn {\n  font-style: italic;\n}\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\nmark {\n  background: #ff0;\n  color: #000;\n}\nsmall {\n  font-size: 80%;\n}\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsup {\n  top: -0.5em;\n}\nsub {\n  bottom: -0.25em;\n}\nimg {\n  border: 0;\n}\nsvg:not(:root) {\n  overflow: hidden;\n}\nfigure {\n  margin: 1em 40px;\n}\nhr {\n  box-sizing: content-box;\n  height: 0;\n}\npre {\n  overflow: auto;\n}\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  font: inherit;\n  margin: 0;\n}\nbutton {\n  overflow: visible;\n}\nbutton,\nselect {\n  text-transform: none;\n}\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  cursor: pointer;\n}\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\ninput {\n  line-height: normal;\n}\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0;\n}\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  box-sizing: content-box;\n}\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\nlegend {\n  border: 0;\n  padding: 0;\n}\ntextarea {\n  overflow: auto;\n}\noptgroup {\n  font-weight: bold;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\ntd,\nth {\n  padding: 0;\n}\n/*! Source: https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css */\n@media print {\n  *,\n  *:before,\n  *:after {\n    background: transparent !important;\n    color: #000 !important;\n    box-shadow: none !important;\n    text-shadow: none !important;\n  }\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n  a[href]:after {\n    content: \" (\" attr(href) \")\";\n  }\n  abbr[title]:after {\n    content: \" (\" attr(title) \")\";\n  }\n  a[href^=\"#\"]:after,\n  a[href^=\"javascript:\"]:after {\n    content: \"\";\n  }\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n  thead {\n    display: table-header-group;\n  }\n  tr,\n  img {\n    page-break-inside: avoid;\n  }\n  img {\n    max-width: 100% !important;\n  }\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3;\n  }\n  h2,\n  h3 {\n    page-break-after: avoid;\n  }\n  .navbar {\n    display: none;\n  }\n  .btn > .caret,\n  .dropup > .btn > .caret {\n    border-top-color: #000 !important;\n  }\n  .label {\n    border: 1px solid #000;\n  }\n  .table {\n    border-collapse: collapse !important;\n  }\n  .table td,\n  .table th {\n    background-color: #fff !important;\n  }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #ddd !important;\n  }\n}\n* {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n*:before,\n*:after {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\nhtml {\n  font-size: 10px;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\nbody {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 14px;\n  line-height: 1.42857143;\n  color: #333333;\n  background-color: #fff;\n}\ninput,\nbutton,\nselect,\ntextarea {\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit;\n}\na {\n  color: #007833;\n  text-decoration: none;\n}\na:hover,\na:focus {\n  color: #002c12;\n  text-decoration: underline;\n}\na:focus {\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\nfigure {\n  margin: 0;\n}\nimg {\n  vertical-align: middle;\n}\n.img-responsive,\n.thumbnail > img,\n.thumbnail a > img,\n.carousel-inner > .item > img,\n.carousel-inner > .item > a > img {\n  display: block;\n  max-width: 100%;\n  height: auto;\n}\n.img-rounded {\n  border-radius: 6px;\n}\n.img-thumbnail {\n  padding: 4px;\n  line-height: 1.42857143;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  -webkit-transition: all 0.2s ease-in-out;\n  -o-transition: all 0.2s ease-in-out;\n  transition: all 0.2s ease-in-out;\n  display: inline-block;\n  max-width: 100%;\n  height: auto;\n}\n.img-circle {\n  border-radius: 50%;\n}\nhr {\n  margin-top: 20px;\n  margin-bottom: 20px;\n  border: 0;\n  border-top: 1px solid #eeeeee;\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n.sr-only-focusable:active,\n.sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto;\n}\n[role=\"button\"] {\n  cursor: pointer;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  font-family: inherit;\n  font-weight: 500;\n  line-height: 1.1;\n  color: inherit;\n}\nh1 small,\nh2 small,\nh3 small,\nh4 small,\nh5 small,\nh6 small,\n.h1 small,\n.h2 small,\n.h3 small,\n.h4 small,\n.h5 small,\n.h6 small,\nh1 .small,\nh2 .small,\nh3 .small,\nh4 .small,\nh5 .small,\nh6 .small,\n.h1 .small,\n.h2 .small,\n.h3 .small,\n.h4 .small,\n.h5 .small,\n.h6 .small {\n  font-weight: normal;\n  line-height: 1;\n  color: #777777;\n}\nh1,\n.h1,\nh2,\n.h2,\nh3,\n.h3 {\n  margin-top: 20px;\n  margin-bottom: 10px;\n}\nh1 small,\n.h1 small,\nh2 small,\n.h2 small,\nh3 small,\n.h3 small,\nh1 .small,\n.h1 .small,\nh2 .small,\n.h2 .small,\nh3 .small,\n.h3 .small {\n  font-size: 65%;\n}\nh4,\n.h4,\nh5,\n.h5,\nh6,\n.h6 {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\nh4 small,\n.h4 small,\nh5 small,\n.h5 small,\nh6 small,\n.h6 small,\nh4 .small,\n.h4 .small,\nh5 .small,\n.h5 .small,\nh6 .small,\n.h6 .small {\n  font-size: 75%;\n}\nh1,\n.h1 {\n  font-size: 36px;\n}\nh2,\n.h2 {\n  font-size: 30px;\n}\nh3,\n.h3 {\n  font-size: 24px;\n}\nh4,\n.h4 {\n  font-size: 18px;\n}\nh5,\n.h5 {\n  font-size: 14px;\n}\nh6,\n.h6 {\n  font-size: 12px;\n}\np {\n  margin: 0 0 10px;\n}\n.lead {\n  margin-bottom: 20px;\n  font-size: 16px;\n  font-weight: 300;\n  line-height: 1.4;\n}\n@media (min-width: 768px) {\n  .lead {\n    font-size: 21px;\n  }\n}\nsmall,\n.small {\n  font-size: 85%;\n}\nmark,\n.mark {\n  background-color: #fcf8e3;\n  padding: .2em;\n}\n.text-left {\n  text-align: left;\n}\n.text-right {\n  text-align: right;\n}\n.text-center {\n  text-align: center;\n}\n.text-justify {\n  text-align: justify;\n}\n.text-nowrap {\n  white-space: nowrap;\n}\n.text-lowercase {\n  text-transform: lowercase;\n}\n.text-uppercase {\n  text-transform: uppercase;\n}\n.text-capitalize {\n  text-transform: capitalize;\n}\n.text-muted {\n  color: #777777;\n}\n.text-primary {\n  color: #007833;\n}\na.text-primary:hover,\na.text-primary:focus {\n  color: #00451d;\n}\n.text-success {\n  color: #3c763d;\n}\na.text-success:hover,\na.text-success:focus {\n  color: #2b542c;\n}\n.text-info {\n  color: #31708f;\n}\na.text-info:hover,\na.text-info:focus {\n  color: #245269;\n}\n.text-warning {\n  color: #8a6d3b;\n}\na.text-warning:hover,\na.text-warning:focus {\n  color: #66512c;\n}\n.text-danger {\n  color: #a94442;\n}\na.text-danger:hover,\na.text-danger:focus {\n  color: #843534;\n}\n.bg-primary {\n  color: #fff;\n  background-color: #007833;\n}\na.bg-primary:hover,\na.bg-primary:focus {\n  background-color: #00451d;\n}\n.bg-success {\n  background-color: #dff0d8;\n}\na.bg-success:hover,\na.bg-success:focus {\n  background-color: #c1e2b3;\n}\n.bg-info {\n  background-color: #d9edf7;\n}\na.bg-info:hover,\na.bg-info:focus {\n  background-color: #afd9ee;\n}\n.bg-warning {\n  background-color: #fcf8e3;\n}\na.bg-warning:hover,\na.bg-warning:focus {\n  background-color: #f7ecb5;\n}\n.bg-danger {\n  background-color: #f2dede;\n}\na.bg-danger:hover,\na.bg-danger:focus {\n  background-color: #e4b9b9;\n}\n.page-header {\n  padding-bottom: 9px;\n  margin: 40px 0 20px;\n  border-bottom: 1px solid #eeeeee;\n}\nul,\nol {\n  margin-top: 0;\n  margin-bottom: 10px;\n}\nul ul,\nol ul,\nul ol,\nol ol {\n  margin-bottom: 0;\n}\n.list-unstyled {\n  padding-left: 0;\n  list-style: none;\n}\n.list-inline {\n  padding-left: 0;\n  list-style: none;\n  margin-left: -5px;\n}\n.list-inline > li {\n  display: inline-block;\n  padding-left: 5px;\n  padding-right: 5px;\n}\ndl {\n  margin-top: 0;\n  margin-bottom: 20px;\n}\ndt,\ndd {\n  line-height: 1.42857143;\n}\ndt {\n  font-weight: bold;\n}\ndd {\n  margin-left: 0;\n}\n@media (min-width: 768px) {\n  .dl-horizontal dt {\n    float: left;\n    width: 160px;\n    clear: left;\n    text-align: right;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .dl-horizontal dd {\n    margin-left: 180px;\n  }\n}\nabbr[title],\nabbr[data-original-title] {\n  cursor: help;\n  border-bottom: 1px dotted #777777;\n}\n.initialism {\n  font-size: 90%;\n  text-transform: uppercase;\n}\nblockquote {\n  padding: 10px 20px;\n  margin: 0 0 20px;\n  font-size: 17.5px;\n  border-left: 5px solid #eeeeee;\n}\nblockquote p:last-child,\nblockquote ul:last-child,\nblockquote ol:last-child {\n  margin-bottom: 0;\n}\nblockquote footer,\nblockquote small,\nblockquote .small {\n  display: block;\n  font-size: 80%;\n  line-height: 1.42857143;\n  color: #777777;\n}\nblockquote footer:before,\nblockquote small:before,\nblockquote .small:before {\n  content: '\\2014   \\A0';\n}\n.blockquote-reverse,\nblockquote.pull-right {\n  padding-right: 15px;\n  padding-left: 0;\n  border-right: 5px solid #eeeeee;\n  border-left: 0;\n  text-align: right;\n}\n.blockquote-reverse footer:before,\nblockquote.pull-right footer:before,\n.blockquote-reverse small:before,\nblockquote.pull-right small:before,\n.blockquote-reverse .small:before,\nblockquote.pull-right .small:before {\n  content: '';\n}\n.blockquote-reverse footer:after,\nblockquote.pull-right footer:after,\n.blockquote-reverse small:after,\nblockquote.pull-right small:after,\n.blockquote-reverse .small:after,\nblockquote.pull-right .small:after {\n  content: '\\A0   \\2014';\n}\naddress {\n  margin-bottom: 20px;\n  font-style: normal;\n  line-height: 1.42857143;\n}\ncode,\nkbd,\npre,\nsamp {\n  font-family: Menlo, Monaco, Consolas, \"Courier New\", monospace;\n}\ncode {\n  padding: 2px 4px;\n  font-size: 90%;\n  color: #c7254e;\n  background-color: #f9f2f4;\n  border-radius: 4px;\n}\nkbd {\n  padding: 2px 4px;\n  font-size: 90%;\n  color: #fff;\n  background-color: #333;\n  border-radius: 3px;\n  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.25);\n}\nkbd kbd {\n  padding: 0;\n  font-size: 100%;\n  font-weight: bold;\n  box-shadow: none;\n}\npre {\n  display: block;\n  padding: 9.5px;\n  margin: 0 0 10px;\n  font-size: 13px;\n  line-height: 1.42857143;\n  word-break: break-all;\n  word-wrap: break-word;\n  color: #333333;\n  background-color: #f5f5f5;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\npre code {\n  padding: 0;\n  font-size: inherit;\n  color: inherit;\n  white-space: pre-wrap;\n  background-color: transparent;\n  border-radius: 0;\n}\n.pre-scrollable {\n  max-height: 340px;\n  overflow-y: scroll;\n}\n.container {\n  margin-right: auto;\n  margin-left: auto;\n  padding-left: 15px;\n  padding-right: 15px;\n}\n@media (min-width: 768px) {\n  .container {\n    width: 750px;\n  }\n}\n@media (min-width: 992px) {\n  .container {\n    width: 970px;\n  }\n}\n@media (min-width: 1200px) {\n  .container {\n    width: 1170px;\n  }\n}\n.container-fluid {\n  margin-right: auto;\n  margin-left: auto;\n  padding-left: 15px;\n  padding-right: 15px;\n}\n.row {\n  margin-left: -15px;\n  margin-right: -15px;\n}\n.col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {\n  position: relative;\n  min-height: 1px;\n  padding-left: 15px;\n  padding-right: 15px;\n}\n.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12 {\n  float: left;\n}\n.col-xs-12 {\n  width: 100%;\n}\n.col-xs-11 {\n  width: 91.66666667%;\n}\n.col-xs-10 {\n  width: 83.33333333%;\n}\n.col-xs-9 {\n  width: 75%;\n}\n.col-xs-8 {\n  width: 66.66666667%;\n}\n.col-xs-7 {\n  width: 58.33333333%;\n}\n.col-xs-6 {\n  width: 50%;\n}\n.col-xs-5 {\n  width: 41.66666667%;\n}\n.col-xs-4 {\n  width: 33.33333333%;\n}\n.col-xs-3 {\n  width: 25%;\n}\n.col-xs-2 {\n  width: 16.66666667%;\n}\n.col-xs-1 {\n  width: 8.33333333%;\n}\n.col-xs-pull-12 {\n  right: 100%;\n}\n.col-xs-pull-11 {\n  right: 91.66666667%;\n}\n.col-xs-pull-10 {\n  right: 83.33333333%;\n}\n.col-xs-pull-9 {\n  right: 75%;\n}\n.col-xs-pull-8 {\n  right: 66.66666667%;\n}\n.col-xs-pull-7 {\n  right: 58.33333333%;\n}\n.col-xs-pull-6 {\n  right: 50%;\n}\n.col-xs-pull-5 {\n  right: 41.66666667%;\n}\n.col-xs-pull-4 {\n  right: 33.33333333%;\n}\n.col-xs-pull-3 {\n  right: 25%;\n}\n.col-xs-pull-2 {\n  right: 16.66666667%;\n}\n.col-xs-pull-1 {\n  right: 8.33333333%;\n}\n.col-xs-pull-0 {\n  right: auto;\n}\n.col-xs-push-12 {\n  left: 100%;\n}\n.col-xs-push-11 {\n  left: 91.66666667%;\n}\n.col-xs-push-10 {\n  left: 83.33333333%;\n}\n.col-xs-push-9 {\n  left: 75%;\n}\n.col-xs-push-8 {\n  left: 66.66666667%;\n}\n.col-xs-push-7 {\n  left: 58.33333333%;\n}\n.col-xs-push-6 {\n  left: 50%;\n}\n.col-xs-push-5 {\n  left: 41.66666667%;\n}\n.col-xs-push-4 {\n  left: 33.33333333%;\n}\n.col-xs-push-3 {\n  left: 25%;\n}\n.col-xs-push-2 {\n  left: 16.66666667%;\n}\n.col-xs-push-1 {\n  left: 8.33333333%;\n}\n.col-xs-push-0 {\n  left: auto;\n}\n.col-xs-offset-12 {\n  margin-left: 100%;\n}\n.col-xs-offset-11 {\n  margin-left: 91.66666667%;\n}\n.col-xs-offset-10 {\n  margin-left: 83.33333333%;\n}\n.col-xs-offset-9 {\n  margin-left: 75%;\n}\n.col-xs-offset-8 {\n  margin-left: 66.66666667%;\n}\n.col-xs-offset-7 {\n  margin-left: 58.33333333%;\n}\n.col-xs-offset-6 {\n  margin-left: 50%;\n}\n.col-xs-offset-5 {\n  margin-left: 41.66666667%;\n}\n.col-xs-offset-4 {\n  margin-left: 33.33333333%;\n}\n.col-xs-offset-3 {\n  margin-left: 25%;\n}\n.col-xs-offset-2 {\n  margin-left: 16.66666667%;\n}\n.col-xs-offset-1 {\n  margin-left: 8.33333333%;\n}\n.col-xs-offset-0 {\n  margin-left: 0%;\n}\n@media (min-width: 768px) {\n  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {\n    float: left;\n  }\n  .col-sm-12 {\n    width: 100%;\n  }\n  .col-sm-11 {\n    width: 91.66666667%;\n  }\n  .col-sm-10 {\n    width: 83.33333333%;\n  }\n  .col-sm-9 {\n    width: 75%;\n  }\n  .col-sm-8 {\n    width: 66.66666667%;\n  }\n  .col-sm-7 {\n    width: 58.33333333%;\n  }\n  .col-sm-6 {\n    width: 50%;\n  }\n  .col-sm-5 {\n    width: 41.66666667%;\n  }\n  .col-sm-4 {\n    width: 33.33333333%;\n  }\n  .col-sm-3 {\n    width: 25%;\n  }\n  .col-sm-2 {\n    width: 16.66666667%;\n  }\n  .col-sm-1 {\n    width: 8.33333333%;\n  }\n  .col-sm-pull-12 {\n    right: 100%;\n  }\n  .col-sm-pull-11 {\n    right: 91.66666667%;\n  }\n  .col-sm-pull-10 {\n    right: 83.33333333%;\n  }\n  .col-sm-pull-9 {\n    right: 75%;\n  }\n  .col-sm-pull-8 {\n    right: 66.66666667%;\n  }\n  .col-sm-pull-7 {\n    right: 58.33333333%;\n  }\n  .col-sm-pull-6 {\n    right: 50%;\n  }\n  .col-sm-pull-5 {\n    right: 41.66666667%;\n  }\n  .col-sm-pull-4 {\n    right: 33.33333333%;\n  }\n  .col-sm-pull-3 {\n    right: 25%;\n  }\n  .col-sm-pull-2 {\n    right: 16.66666667%;\n  }\n  .col-sm-pull-1 {\n    right: 8.33333333%;\n  }\n  .col-sm-pull-0 {\n    right: auto;\n  }\n  .col-sm-push-12 {\n    left: 100%;\n  }\n  .col-sm-push-11 {\n    left: 91.66666667%;\n  }\n  .col-sm-push-10 {\n    left: 83.33333333%;\n  }\n  .col-sm-push-9 {\n    left: 75%;\n  }\n  .col-sm-push-8 {\n    left: 66.66666667%;\n  }\n  .col-sm-push-7 {\n    left: 58.33333333%;\n  }\n  .col-sm-push-6 {\n    left: 50%;\n  }\n  .col-sm-push-5 {\n    left: 41.66666667%;\n  }\n  .col-sm-push-4 {\n    left: 33.33333333%;\n  }\n  .col-sm-push-3 {\n    left: 25%;\n  }\n  .col-sm-push-2 {\n    left: 16.66666667%;\n  }\n  .col-sm-push-1 {\n    left: 8.33333333%;\n  }\n  .col-sm-push-0 {\n    left: auto;\n  }\n  .col-sm-offset-12 {\n    margin-left: 100%;\n  }\n  .col-sm-offset-11 {\n    margin-left: 91.66666667%;\n  }\n  .col-sm-offset-10 {\n    margin-left: 83.33333333%;\n  }\n  .col-sm-offset-9 {\n    margin-left: 75%;\n  }\n  .col-sm-offset-8 {\n    margin-left: 66.66666667%;\n  }\n  .col-sm-offset-7 {\n    margin-left: 58.33333333%;\n  }\n  .col-sm-offset-6 {\n    margin-left: 50%;\n  }\n  .col-sm-offset-5 {\n    margin-left: 41.66666667%;\n  }\n  .col-sm-offset-4 {\n    margin-left: 33.33333333%;\n  }\n  .col-sm-offset-3 {\n    margin-left: 25%;\n  }\n  .col-sm-offset-2 {\n    margin-left: 16.66666667%;\n  }\n  .col-sm-offset-1 {\n    margin-left: 8.33333333%;\n  }\n  .col-sm-offset-0 {\n    margin-left: 0%;\n  }\n}\n@media (min-width: 992px) {\n  .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {\n    float: left;\n  }\n  .col-md-12 {\n    width: 100%;\n  }\n  .col-md-11 {\n    width: 91.66666667%;\n  }\n  .col-md-10 {\n    width: 83.33333333%;\n  }\n  .col-md-9 {\n    width: 75%;\n  }\n  .col-md-8 {\n    width: 66.66666667%;\n  }\n  .col-md-7 {\n    width: 58.33333333%;\n  }\n  .col-md-6 {\n    width: 50%;\n  }\n  .col-md-5 {\n    width: 41.66666667%;\n  }\n  .col-md-4 {\n    width: 33.33333333%;\n  }\n  .col-md-3 {\n    width: 25%;\n  }\n  .col-md-2 {\n    width: 16.66666667%;\n  }\n  .col-md-1 {\n    width: 8.33333333%;\n  }\n  .col-md-pull-12 {\n    right: 100%;\n  }\n  .col-md-pull-11 {\n    right: 91.66666667%;\n  }\n  .col-md-pull-10 {\n    right: 83.33333333%;\n  }\n  .col-md-pull-9 {\n    right: 75%;\n  }\n  .col-md-pull-8 {\n    right: 66.66666667%;\n  }\n  .col-md-pull-7 {\n    right: 58.33333333%;\n  }\n  .col-md-pull-6 {\n    right: 50%;\n  }\n  .col-md-pull-5 {\n    right: 41.66666667%;\n  }\n  .col-md-pull-4 {\n    right: 33.33333333%;\n  }\n  .col-md-pull-3 {\n    right: 25%;\n  }\n  .col-md-pull-2 {\n    right: 16.66666667%;\n  }\n  .col-md-pull-1 {\n    right: 8.33333333%;\n  }\n  .col-md-pull-0 {\n    right: auto;\n  }\n  .col-md-push-12 {\n    left: 100%;\n  }\n  .col-md-push-11 {\n    left: 91.66666667%;\n  }\n  .col-md-push-10 {\n    left: 83.33333333%;\n  }\n  .col-md-push-9 {\n    left: 75%;\n  }\n  .col-md-push-8 {\n    left: 66.66666667%;\n  }\n  .col-md-push-7 {\n    left: 58.33333333%;\n  }\n  .col-md-push-6 {\n    left: 50%;\n  }\n  .col-md-push-5 {\n    left: 41.66666667%;\n  }\n  .col-md-push-4 {\n    left: 33.33333333%;\n  }\n  .col-md-push-3 {\n    left: 25%;\n  }\n  .col-md-push-2 {\n    left: 16.66666667%;\n  }\n  .col-md-push-1 {\n    left: 8.33333333%;\n  }\n  .col-md-push-0 {\n    left: auto;\n  }\n  .col-md-offset-12 {\n    margin-left: 100%;\n  }\n  .col-md-offset-11 {\n    margin-left: 91.66666667%;\n  }\n  .col-md-offset-10 {\n    margin-left: 83.33333333%;\n  }\n  .col-md-offset-9 {\n    margin-left: 75%;\n  }\n  .col-md-offset-8 {\n    margin-left: 66.66666667%;\n  }\n  .col-md-offset-7 {\n    margin-left: 58.33333333%;\n  }\n  .col-md-offset-6 {\n    margin-left: 50%;\n  }\n  .col-md-offset-5 {\n    margin-left: 41.66666667%;\n  }\n  .col-md-offset-4 {\n    margin-left: 33.33333333%;\n  }\n  .col-md-offset-3 {\n    margin-left: 25%;\n  }\n  .col-md-offset-2 {\n    margin-left: 16.66666667%;\n  }\n  .col-md-offset-1 {\n    margin-left: 8.33333333%;\n  }\n  .col-md-offset-0 {\n    margin-left: 0%;\n  }\n}\n@media (min-width: 1200px) {\n  .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12 {\n    float: left;\n  }\n  .col-lg-12 {\n    width: 100%;\n  }\n  .col-lg-11 {\n    width: 91.66666667%;\n  }\n  .col-lg-10 {\n    width: 83.33333333%;\n  }\n  .col-lg-9 {\n    width: 75%;\n  }\n  .col-lg-8 {\n    width: 66.66666667%;\n  }\n  .col-lg-7 {\n    width: 58.33333333%;\n  }\n  .col-lg-6 {\n    width: 50%;\n  }\n  .col-lg-5 {\n    width: 41.66666667%;\n  }\n  .col-lg-4 {\n    width: 33.33333333%;\n  }\n  .col-lg-3 {\n    width: 25%;\n  }\n  .col-lg-2 {\n    width: 16.66666667%;\n  }\n  .col-lg-1 {\n    width: 8.33333333%;\n  }\n  .col-lg-pull-12 {\n    right: 100%;\n  }\n  .col-lg-pull-11 {\n    right: 91.66666667%;\n  }\n  .col-lg-pull-10 {\n    right: 83.33333333%;\n  }\n  .col-lg-pull-9 {\n    right: 75%;\n  }\n  .col-lg-pull-8 {\n    right: 66.66666667%;\n  }\n  .col-lg-pull-7 {\n    right: 58.33333333%;\n  }\n  .col-lg-pull-6 {\n    right: 50%;\n  }\n  .col-lg-pull-5 {\n    right: 41.66666667%;\n  }\n  .col-lg-pull-4 {\n    right: 33.33333333%;\n  }\n  .col-lg-pull-3 {\n    right: 25%;\n  }\n  .col-lg-pull-2 {\n    right: 16.66666667%;\n  }\n  .col-lg-pull-1 {\n    right: 8.33333333%;\n  }\n  .col-lg-pull-0 {\n    right: auto;\n  }\n  .col-lg-push-12 {\n    left: 100%;\n  }\n  .col-lg-push-11 {\n    left: 91.66666667%;\n  }\n  .col-lg-push-10 {\n    left: 83.33333333%;\n  }\n  .col-lg-push-9 {\n    left: 75%;\n  }\n  .col-lg-push-8 {\n    left: 66.66666667%;\n  }\n  .col-lg-push-7 {\n    left: 58.33333333%;\n  }\n  .col-lg-push-6 {\n    left: 50%;\n  }\n  .col-lg-push-5 {\n    left: 41.66666667%;\n  }\n  .col-lg-push-4 {\n    left: 33.33333333%;\n  }\n  .col-lg-push-3 {\n    left: 25%;\n  }\n  .col-lg-push-2 {\n    left: 16.66666667%;\n  }\n  .col-lg-push-1 {\n    left: 8.33333333%;\n  }\n  .col-lg-push-0 {\n    left: auto;\n  }\n  .col-lg-offset-12 {\n    margin-left: 100%;\n  }\n  .col-lg-offset-11 {\n    margin-left: 91.66666667%;\n  }\n  .col-lg-offset-10 {\n    margin-left: 83.33333333%;\n  }\n  .col-lg-offset-9 {\n    margin-left: 75%;\n  }\n  .col-lg-offset-8 {\n    margin-left: 66.66666667%;\n  }\n  .col-lg-offset-7 {\n    margin-left: 58.33333333%;\n  }\n  .col-lg-offset-6 {\n    margin-left: 50%;\n  }\n  .col-lg-offset-5 {\n    margin-left: 41.66666667%;\n  }\n  .col-lg-offset-4 {\n    margin-left: 33.33333333%;\n  }\n  .col-lg-offset-3 {\n    margin-left: 25%;\n  }\n  .col-lg-offset-2 {\n    margin-left: 16.66666667%;\n  }\n  .col-lg-offset-1 {\n    margin-left: 8.33333333%;\n  }\n  .col-lg-offset-0 {\n    margin-left: 0%;\n  }\n}\ntable {\n  background-color: transparent;\n}\ncaption {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  color: #777777;\n  text-align: left;\n}\nth {\n  text-align: left;\n}\n.table {\n  width: 100%;\n  max-width: 100%;\n  margin-bottom: 20px;\n}\n.table > thead > tr > th,\n.table > tbody > tr > th,\n.table > tfoot > tr > th,\n.table > thead > tr > td,\n.table > tbody > tr > td,\n.table > tfoot > tr > td {\n  padding: 8px;\n  line-height: 1.42857143;\n  vertical-align: top;\n  border-top: 1px solid #ddd;\n}\n.table > thead > tr > th {\n  vertical-align: bottom;\n  border-bottom: 2px solid #ddd;\n}\n.table > caption + thead > tr:first-child > th,\n.table > colgroup + thead > tr:first-child > th,\n.table > thead:first-child > tr:first-child > th,\n.table > caption + thead > tr:first-child > td,\n.table > colgroup + thead > tr:first-child > td,\n.table > thead:first-child > tr:first-child > td {\n  border-top: 0;\n}\n.table > tbody + tbody {\n  border-top: 2px solid #ddd;\n}\n.table .table {\n  background-color: #fff;\n}\n.table-condensed > thead > tr > th,\n.table-condensed > tbody > tr > th,\n.table-condensed > tfoot > tr > th,\n.table-condensed > thead > tr > td,\n.table-condensed > tbody > tr > td,\n.table-condensed > tfoot > tr > td {\n  padding: 5px;\n}\n.table-bordered {\n  border: 1px solid #ddd;\n}\n.table-bordered > thead > tr > th,\n.table-bordered > tbody > tr > th,\n.table-bordered > tfoot > tr > th,\n.table-bordered > thead > tr > td,\n.table-bordered > tbody > tr > td,\n.table-bordered > tfoot > tr > td {\n  border: 1px solid #ddd;\n}\n.table-bordered > thead > tr > th,\n.table-bordered > thead > tr > td {\n  border-bottom-width: 2px;\n}\n.table-striped > tbody > tr:nth-of-type(odd) {\n  background-color: #f9f9f9;\n}\n.table-hover > tbody > tr:hover {\n  background-color: #f5f5f5;\n}\ntable col[class*=\"col-\"] {\n  position: static;\n  float: none;\n  display: table-column;\n}\ntable td[class*=\"col-\"],\ntable th[class*=\"col-\"] {\n  position: static;\n  float: none;\n  display: table-cell;\n}\n.table > thead > tr > td.active,\n.table > tbody > tr > td.active,\n.table > tfoot > tr > td.active,\n.table > thead > tr > th.active,\n.table > tbody > tr > th.active,\n.table > tfoot > tr > th.active,\n.table > thead > tr.active > td,\n.table > tbody > tr.active > td,\n.table > tfoot > tr.active > td,\n.table > thead > tr.active > th,\n.table > tbody > tr.active > th,\n.table > tfoot > tr.active > th {\n  background-color: #f5f5f5;\n}\n.table-hover > tbody > tr > td.active:hover,\n.table-hover > tbody > tr > th.active:hover,\n.table-hover > tbody > tr.active:hover > td,\n.table-hover > tbody > tr:hover > .active,\n.table-hover > tbody > tr.active:hover > th {\n  background-color: #e8e8e8;\n}\n.table > thead > tr > td.success,\n.table > tbody > tr > td.success,\n.table > tfoot > tr > td.success,\n.table > thead > tr > th.success,\n.table > tbody > tr > th.success,\n.table > tfoot > tr > th.success,\n.table > thead > tr.success > td,\n.table > tbody > tr.success > td,\n.table > tfoot > tr.success > td,\n.table > thead > tr.success > th,\n.table > tbody > tr.success > th,\n.table > tfoot > tr.success > th {\n  background-color: #dff0d8;\n}\n.table-hover > tbody > tr > td.success:hover,\n.table-hover > tbody > tr > th.success:hover,\n.table-hover > tbody > tr.success:hover > td,\n.table-hover > tbody > tr:hover > .success,\n.table-hover > tbody > tr.success:hover > th {\n  background-color: #d0e9c6;\n}\n.table > thead > tr > td.info,\n.table > tbody > tr > td.info,\n.table > tfoot > tr > td.info,\n.table > thead > tr > th.info,\n.table > tbody > tr > th.info,\n.table > tfoot > tr > th.info,\n.table > thead > tr.info > td,\n.table > tbody > tr.info > td,\n.table > tfoot > tr.info > td,\n.table > thead > tr.info > th,\n.table > tbody > tr.info > th,\n.table > tfoot > tr.info > th {\n  background-color: #d9edf7;\n}\n.table-hover > tbody > tr > td.info:hover,\n.table-hover > tbody > tr > th.info:hover,\n.table-hover > tbody > tr.info:hover > td,\n.table-hover > tbody > tr:hover > .info,\n.table-hover > tbody > tr.info:hover > th {\n  background-color: #c4e3f3;\n}\n.table > thead > tr > td.warning,\n.table > tbody > tr > td.warning,\n.table > tfoot > tr > td.warning,\n.table > thead > tr > th.warning,\n.table > tbody > tr > th.warning,\n.table > tfoot > tr > th.warning,\n.table > thead > tr.warning > td,\n.table > tbody > tr.warning > td,\n.table > tfoot > tr.warning > td,\n.table > thead > tr.warning > th,\n.table > tbody > tr.warning > th,\n.table > tfoot > tr.warning > th {\n  background-color: #fcf8e3;\n}\n.table-hover > tbody > tr > td.warning:hover,\n.table-hover > tbody > tr > th.warning:hover,\n.table-hover > tbody > tr.warning:hover > td,\n.table-hover > tbody > tr:hover > .warning,\n.table-hover > tbody > tr.warning:hover > th {\n  background-color: #faf2cc;\n}\n.table > thead > tr > td.danger,\n.table > tbody > tr > td.danger,\n.table > tfoot > tr > td.danger,\n.table > thead > tr > th.danger,\n.table > tbody > tr > th.danger,\n.table > tfoot > tr > th.danger,\n.table > thead > tr.danger > td,\n.table > tbody > tr.danger > td,\n.table > tfoot > tr.danger > td,\n.table > thead > tr.danger > th,\n.table > tbody > tr.danger > th,\n.table > tfoot > tr.danger > th {\n  background-color: #f2dede;\n}\n.table-hover > tbody > tr > td.danger:hover,\n.table-hover > tbody > tr > th.danger:hover,\n.table-hover > tbody > tr.danger:hover > td,\n.table-hover > tbody > tr:hover > .danger,\n.table-hover > tbody > tr.danger:hover > th {\n  background-color: #ebcccc;\n}\n.table-responsive {\n  overflow-x: auto;\n  min-height: 0.01%;\n}\n@media screen and (max-width: 767px) {\n  .table-responsive {\n    width: 100%;\n    margin-bottom: 15px;\n    overflow-y: hidden;\n    -ms-overflow-style: -ms-autohiding-scrollbar;\n    border: 1px solid #ddd;\n  }\n  .table-responsive > .table {\n    margin-bottom: 0;\n  }\n  .table-responsive > .table > thead > tr > th,\n  .table-responsive > .table > tbody > tr > th,\n  .table-responsive > .table > tfoot > tr > th,\n  .table-responsive > .table > thead > tr > td,\n  .table-responsive > .table > tbody > tr > td,\n  .table-responsive > .table > tfoot > tr > td {\n    white-space: nowrap;\n  }\n  .table-responsive > .table-bordered {\n    border: 0;\n  }\n  .table-responsive > .table-bordered > thead > tr > th:first-child,\n  .table-responsive > .table-bordered > tbody > tr > th:first-child,\n  .table-responsive > .table-bordered > tfoot > tr > th:first-child,\n  .table-responsive > .table-bordered > thead > tr > td:first-child,\n  .table-responsive > .table-bordered > tbody > tr > td:first-child,\n  .table-responsive > .table-bordered > tfoot > tr > td:first-child {\n    border-left: 0;\n  }\n  .table-responsive > .table-bordered > thead > tr > th:last-child,\n  .table-responsive > .table-bordered > tbody > tr > th:last-child,\n  .table-responsive > .table-bordered > tfoot > tr > th:last-child,\n  .table-responsive > .table-bordered > thead > tr > td:last-child,\n  .table-responsive > .table-bordered > tbody > tr > td:last-child,\n  .table-responsive > .table-bordered > tfoot > tr > td:last-child {\n    border-right: 0;\n  }\n  .table-responsive > .table-bordered > tbody > tr:last-child > th,\n  .table-responsive > .table-bordered > tfoot > tr:last-child > th,\n  .table-responsive > .table-bordered > tbody > tr:last-child > td,\n  .table-responsive > .table-bordered > tfoot > tr:last-child > td {\n    border-bottom: 0;\n  }\n}\nfieldset {\n  padding: 0;\n  margin: 0;\n  border: 0;\n  min-width: 0;\n}\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: 20px;\n  font-size: 21px;\n  line-height: inherit;\n  color: #333333;\n  border: 0;\n  border-bottom: 1px solid #e5e5e5;\n}\nlabel {\n  display: inline-block;\n  max-width: 100%;\n  margin-bottom: 5px;\n  font-weight: bold;\n}\ninput[type=\"search\"] {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\ninput[type=\"radio\"],\ninput[type=\"checkbox\"] {\n  margin: 4px 0 0;\n  margin-top: 1px \\9;\n  line-height: normal;\n}\ninput[type=\"file\"] {\n  display: block;\n}\ninput[type=\"range\"] {\n  display: block;\n  width: 100%;\n}\nselect[multiple],\nselect[size] {\n  height: auto;\n}\ninput[type=\"file\"]:focus,\ninput[type=\"radio\"]:focus,\ninput[type=\"checkbox\"]:focus {\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\noutput {\n  display: block;\n  padding-top: 7px;\n  font-size: 14px;\n  line-height: 1.42857143;\n  color: #555555;\n}\n.form-control {\n  display: block;\n  width: 100%;\n  height: 34px;\n  padding: 6px 12px;\n  font-size: 14px;\n  line-height: 1.42857143;\n  color: #555555;\n  background-color: #fff;\n  background-image: none;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n  -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n}\n.form-control:focus {\n  border-color: #66afe9;\n  outline: 0;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);\n}\n.form-control::-moz-placeholder {\n  color: #999;\n  opacity: 1;\n}\n.form-control:-ms-input-placeholder {\n  color: #999;\n}\n.form-control::-webkit-input-placeholder {\n  color: #999;\n}\n.form-control::-ms-expand {\n  border: 0;\n  background-color: transparent;\n}\n.form-control[disabled],\n.form-control[readonly],\nfieldset[disabled] .form-control {\n  background-color: #eeeeee;\n  opacity: 1;\n}\n.form-control[disabled],\nfieldset[disabled] .form-control {\n  cursor: not-allowed;\n}\ntextarea.form-control {\n  height: auto;\n}\ninput[type=\"search\"] {\n  -webkit-appearance: none;\n}\n@media screen and (-webkit-min-device-pixel-ratio: 0) {\n  input[type=\"date\"].form-control,\n  input[type=\"time\"].form-control,\n  input[type=\"datetime-local\"].form-control,\n  input[type=\"month\"].form-control {\n    line-height: 34px;\n  }\n  input[type=\"date\"].input-sm,\n  input[type=\"time\"].input-sm,\n  input[type=\"datetime-local\"].input-sm,\n  input[type=\"month\"].input-sm,\n  .input-group-sm input[type=\"date\"],\n  .input-group-sm input[type=\"time\"],\n  .input-group-sm input[type=\"datetime-local\"],\n  .input-group-sm input[type=\"month\"] {\n    line-height: 30px;\n  }\n  input[type=\"date\"].input-lg,\n  input[type=\"time\"].input-lg,\n  input[type=\"datetime-local\"].input-lg,\n  input[type=\"month\"].input-lg,\n  .input-group-lg input[type=\"date\"],\n  .input-group-lg input[type=\"time\"],\n  .input-group-lg input[type=\"datetime-local\"],\n  .input-group-lg input[type=\"month\"] {\n    line-height: 46px;\n  }\n}\n.form-group {\n  margin-bottom: 15px;\n}\n.radio,\n.checkbox {\n  position: relative;\n  display: block;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n.radio label,\n.checkbox label {\n  min-height: 20px;\n  padding-left: 20px;\n  margin-bottom: 0;\n  font-weight: normal;\n  cursor: pointer;\n}\n.radio input[type=\"radio\"],\n.radio-inline input[type=\"radio\"],\n.checkbox input[type=\"checkbox\"],\n.checkbox-inline input[type=\"checkbox\"] {\n  position: absolute;\n  margin-left: -20px;\n  margin-top: 4px \\9;\n}\n.radio + .radio,\n.checkbox + .checkbox {\n  margin-top: -5px;\n}\n.radio-inline,\n.checkbox-inline {\n  position: relative;\n  display: inline-block;\n  padding-left: 20px;\n  margin-bottom: 0;\n  vertical-align: middle;\n  font-weight: normal;\n  cursor: pointer;\n}\n.radio-inline + .radio-inline,\n.checkbox-inline + .checkbox-inline {\n  margin-top: 0;\n  margin-left: 10px;\n}\ninput[type=\"radio\"][disabled],\ninput[type=\"checkbox\"][disabled],\ninput[type=\"radio\"].disabled,\ninput[type=\"checkbox\"].disabled,\nfieldset[disabled] input[type=\"radio\"],\nfieldset[disabled] input[type=\"checkbox\"] {\n  cursor: not-allowed;\n}\n.radio-inline.disabled,\n.checkbox-inline.disabled,\nfieldset[disabled] .radio-inline,\nfieldset[disabled] .checkbox-inline {\n  cursor: not-allowed;\n}\n.radio.disabled label,\n.checkbox.disabled label,\nfieldset[disabled] .radio label,\nfieldset[disabled] .checkbox label {\n  cursor: not-allowed;\n}\n.form-control-static {\n  padding-top: 7px;\n  padding-bottom: 7px;\n  margin-bottom: 0;\n  min-height: 34px;\n}\n.form-control-static.input-lg,\n.form-control-static.input-sm {\n  padding-left: 0;\n  padding-right: 0;\n}\n.input-sm {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\nselect.input-sm {\n  height: 30px;\n  line-height: 30px;\n}\ntextarea.input-sm,\nselect[multiple].input-sm {\n  height: auto;\n}\n.form-group-sm .form-control {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\n.form-group-sm select.form-control {\n  height: 30px;\n  line-height: 30px;\n}\n.form-group-sm textarea.form-control,\n.form-group-sm select[multiple].form-control {\n  height: auto;\n}\n.form-group-sm .form-control-static {\n  height: 30px;\n  min-height: 32px;\n  padding: 6px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n}\n.input-lg {\n  height: 46px;\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.3333333;\n  border-radius: 6px;\n}\nselect.input-lg {\n  height: 46px;\n  line-height: 46px;\n}\ntextarea.input-lg,\nselect[multiple].input-lg {\n  height: auto;\n}\n.form-group-lg .form-control {\n  height: 46px;\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.3333333;\n  border-radius: 6px;\n}\n.form-group-lg select.form-control {\n  height: 46px;\n  line-height: 46px;\n}\n.form-group-lg textarea.form-control,\n.form-group-lg select[multiple].form-control {\n  height: auto;\n}\n.form-group-lg .form-control-static {\n  height: 46px;\n  min-height: 38px;\n  padding: 11px 16px;\n  font-size: 18px;\n  line-height: 1.3333333;\n}\n.has-feedback {\n  position: relative;\n}\n.has-feedback .form-control {\n  padding-right: 42.5px;\n}\n.form-control-feedback {\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 2;\n  display: block;\n  width: 34px;\n  height: 34px;\n  line-height: 34px;\n  text-align: center;\n  pointer-events: none;\n}\n.input-lg + .form-control-feedback,\n.input-group-lg + .form-control-feedback,\n.form-group-lg .form-control + .form-control-feedback {\n  width: 46px;\n  height: 46px;\n  line-height: 46px;\n}\n.input-sm + .form-control-feedback,\n.input-group-sm + .form-control-feedback,\n.form-group-sm .form-control + .form-control-feedback {\n  width: 30px;\n  height: 30px;\n  line-height: 30px;\n}\n.has-success .help-block,\n.has-success .control-label,\n.has-success .radio,\n.has-success .checkbox,\n.has-success .radio-inline,\n.has-success .checkbox-inline,\n.has-success.radio label,\n.has-success.checkbox label,\n.has-success.radio-inline label,\n.has-success.checkbox-inline label {\n  color: #3c763d;\n}\n.has-success .form-control {\n  border-color: #3c763d;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n}\n.has-success .form-control:focus {\n  border-color: #2b542c;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168;\n}\n.has-success .input-group-addon {\n  color: #3c763d;\n  border-color: #3c763d;\n  background-color: #dff0d8;\n}\n.has-success .form-control-feedback {\n  color: #3c763d;\n}\n.has-warning .help-block,\n.has-warning .control-label,\n.has-warning .radio,\n.has-warning .checkbox,\n.has-warning .radio-inline,\n.has-warning .checkbox-inline,\n.has-warning.radio label,\n.has-warning.checkbox label,\n.has-warning.radio-inline label,\n.has-warning.checkbox-inline label {\n  color: #8a6d3b;\n}\n.has-warning .form-control {\n  border-color: #8a6d3b;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n}\n.has-warning .form-control:focus {\n  border-color: #66512c;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b;\n}\n.has-warning .input-group-addon {\n  color: #8a6d3b;\n  border-color: #8a6d3b;\n  background-color: #fcf8e3;\n}\n.has-warning .form-control-feedback {\n  color: #8a6d3b;\n}\n.has-error .help-block,\n.has-error .control-label,\n.has-error .radio,\n.has-error .checkbox,\n.has-error .radio-inline,\n.has-error .checkbox-inline,\n.has-error.radio label,\n.has-error.checkbox label,\n.has-error.radio-inline label,\n.has-error.checkbox-inline label {\n  color: #a94442;\n}\n.has-error .form-control {\n  border-color: #a94442;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n}\n.has-error .form-control:focus {\n  border-color: #843534;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;\n}\n.has-error .input-group-addon {\n  color: #a94442;\n  border-color: #a94442;\n  background-color: #f2dede;\n}\n.has-error .form-control-feedback {\n  color: #a94442;\n}\n.has-feedback label ~ .form-control-feedback {\n  top: 25px;\n}\n.has-feedback label.sr-only ~ .form-control-feedback {\n  top: 0;\n}\n.help-block {\n  display: block;\n  margin-top: 5px;\n  margin-bottom: 10px;\n  color: #737373;\n}\n@media (min-width: 768px) {\n  .form-inline .form-group {\n    display: inline-block;\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .form-inline .form-control {\n    display: inline-block;\n    width: auto;\n    vertical-align: middle;\n  }\n  .form-inline .form-control-static {\n    display: inline-block;\n  }\n  .form-inline .input-group {\n    display: inline-table;\n    vertical-align: middle;\n  }\n  .form-inline .input-group .input-group-addon,\n  .form-inline .input-group .input-group-btn,\n  .form-inline .input-group .form-control {\n    width: auto;\n  }\n  .form-inline .input-group > .form-control {\n    width: 100%;\n  }\n  .form-inline .control-label {\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .form-inline .radio,\n  .form-inline .checkbox {\n    display: inline-block;\n    margin-top: 0;\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .form-inline .radio label,\n  .form-inline .checkbox label {\n    padding-left: 0;\n  }\n  .form-inline .radio input[type=\"radio\"],\n  .form-inline .checkbox input[type=\"checkbox\"] {\n    position: relative;\n    margin-left: 0;\n  }\n  .form-inline .has-feedback .form-control-feedback {\n    top: 0;\n  }\n}\n.form-horizontal .radio,\n.form-horizontal .checkbox,\n.form-horizontal .radio-inline,\n.form-horizontal .checkbox-inline {\n  margin-top: 0;\n  margin-bottom: 0;\n  padding-top: 7px;\n}\n.form-horizontal .radio,\n.form-horizontal .checkbox {\n  min-height: 27px;\n}\n.form-horizontal .form-group {\n  margin-left: -15px;\n  margin-right: -15px;\n}\n@media (min-width: 768px) {\n  .form-horizontal .control-label {\n    text-align: right;\n    margin-bottom: 0;\n    padding-top: 7px;\n  }\n}\n.form-horizontal .has-feedback .form-control-feedback {\n  right: 15px;\n}\n@media (min-width: 768px) {\n  .form-horizontal .form-group-lg .control-label {\n    padding-top: 11px;\n    font-size: 18px;\n  }\n}\n@media (min-width: 768px) {\n  .form-horizontal .form-group-sm .control-label {\n    padding-top: 6px;\n    font-size: 12px;\n  }\n}\n.btn {\n  display: inline-block;\n  margin-bottom: 0;\n  font-weight: normal;\n  text-align: center;\n  vertical-align: middle;\n  touch-action: manipulation;\n  cursor: pointer;\n  background-image: none;\n  border: 1px solid transparent;\n  white-space: nowrap;\n  padding: 6px 12px;\n  font-size: 14px;\n  line-height: 1.42857143;\n  border-radius: 4px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.btn:focus,\n.btn:active:focus,\n.btn.active:focus,\n.btn.focus,\n.btn:active.focus,\n.btn.active.focus {\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\n.btn:hover,\n.btn:focus,\n.btn.focus {\n  color: #333;\n  text-decoration: none;\n}\n.btn:active,\n.btn.active {\n  outline: 0;\n  background-image: none;\n  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n}\n.btn.disabled,\n.btn[disabled],\nfieldset[disabled] .btn {\n  cursor: not-allowed;\n  opacity: 0.65;\n  filter: alpha(opacity=65);\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\na.btn.disabled,\nfieldset[disabled] a.btn {\n  pointer-events: none;\n}\n.btn-default {\n  color: #333;\n  background-color: #fff;\n  border-color: #ccc;\n}\n.btn-default:focus,\n.btn-default.focus {\n  color: #333;\n  background-color: #e6e6e6;\n  border-color: #8c8c8c;\n}\n.btn-default:hover {\n  color: #333;\n  background-color: #e6e6e6;\n  border-color: #adadad;\n}\n.btn-default:active,\n.btn-default.active,\n.open > .dropdown-toggle.btn-default {\n  color: #333;\n  background-color: #e6e6e6;\n  border-color: #adadad;\n}\n.btn-default:active:hover,\n.btn-default.active:hover,\n.open > .dropdown-toggle.btn-default:hover,\n.btn-default:active:focus,\n.btn-default.active:focus,\n.open > .dropdown-toggle.btn-default:focus,\n.btn-default:active.focus,\n.btn-default.active.focus,\n.open > .dropdown-toggle.btn-default.focus {\n  color: #333;\n  background-color: #d4d4d4;\n  border-color: #8c8c8c;\n}\n.btn-default:active,\n.btn-default.active,\n.open > .dropdown-toggle.btn-default {\n  background-image: none;\n}\n.btn-default.disabled:hover,\n.btn-default[disabled]:hover,\nfieldset[disabled] .btn-default:hover,\n.btn-default.disabled:focus,\n.btn-default[disabled]:focus,\nfieldset[disabled] .btn-default:focus,\n.btn-default.disabled.focus,\n.btn-default[disabled].focus,\nfieldset[disabled] .btn-default.focus {\n  background-color: #fff;\n  border-color: #ccc;\n}\n.btn-default .badge {\n  color: #fff;\n  background-color: #333;\n}\n.btn-primary {\n  color: #fff;\n  background-color: #007833;\n  border-color: #005f28;\n}\n.btn-primary:focus,\n.btn-primary.focus {\n  color: #fff;\n  background-color: #00451d;\n  border-color: #000000;\n}\n.btn-primary:hover {\n  color: #fff;\n  background-color: #00451d;\n  border-color: #00210e;\n}\n.btn-primary:active,\n.btn-primary.active,\n.open > .dropdown-toggle.btn-primary {\n  color: #fff;\n  background-color: #00451d;\n  border-color: #00210e;\n}\n.btn-primary:active:hover,\n.btn-primary.active:hover,\n.open > .dropdown-toggle.btn-primary:hover,\n.btn-primary:active:focus,\n.btn-primary.active:focus,\n.open > .dropdown-toggle.btn-primary:focus,\n.btn-primary:active.focus,\n.btn-primary.active.focus,\n.open > .dropdown-toggle.btn-primary.focus {\n  color: #fff;\n  background-color: #00210e;\n  border-color: #000000;\n}\n.btn-primary:active,\n.btn-primary.active,\n.open > .dropdown-toggle.btn-primary {\n  background-image: none;\n}\n.btn-primary.disabled:hover,\n.btn-primary[disabled]:hover,\nfieldset[disabled] .btn-primary:hover,\n.btn-primary.disabled:focus,\n.btn-primary[disabled]:focus,\nfieldset[disabled] .btn-primary:focus,\n.btn-primary.disabled.focus,\n.btn-primary[disabled].focus,\nfieldset[disabled] .btn-primary.focus {\n  background-color: #007833;\n  border-color: #005f28;\n}\n.btn-primary .badge {\n  color: #007833;\n  background-color: #fff;\n}\n.btn-success {\n  color: #fff;\n  background-color: #5cb85c;\n  border-color: #4cae4c;\n}\n.btn-success:focus,\n.btn-success.focus {\n  color: #fff;\n  background-color: #449d44;\n  border-color: #255625;\n}\n.btn-success:hover {\n  color: #fff;\n  background-color: #449d44;\n  border-color: #398439;\n}\n.btn-success:active,\n.btn-success.active,\n.open > .dropdown-toggle.btn-success {\n  color: #fff;\n  background-color: #449d44;\n  border-color: #398439;\n}\n.btn-success:active:hover,\n.btn-success.active:hover,\n.open > .dropdown-toggle.btn-success:hover,\n.btn-success:active:focus,\n.btn-success.active:focus,\n.open > .dropdown-toggle.btn-success:focus,\n.btn-success:active.focus,\n.btn-success.active.focus,\n.open > .dropdown-toggle.btn-success.focus {\n  color: #fff;\n  background-color: #398439;\n  border-color: #255625;\n}\n.btn-success:active,\n.btn-success.active,\n.open > .dropdown-toggle.btn-success {\n  background-image: none;\n}\n.btn-success.disabled:hover,\n.btn-success[disabled]:hover,\nfieldset[disabled] .btn-success:hover,\n.btn-success.disabled:focus,\n.btn-success[disabled]:focus,\nfieldset[disabled] .btn-success:focus,\n.btn-success.disabled.focus,\n.btn-success[disabled].focus,\nfieldset[disabled] .btn-success.focus {\n  background-color: #5cb85c;\n  border-color: #4cae4c;\n}\n.btn-success .badge {\n  color: #5cb85c;\n  background-color: #fff;\n}\n.btn-info {\n  color: #fff;\n  background-color: #84b641;\n  border-color: #76a33a;\n}\n.btn-info:focus,\n.btn-info.focus {\n  color: #fff;\n  background-color: #699034;\n  border-color: #324519;\n}\n.btn-info:hover {\n  color: #fff;\n  background-color: #699034;\n  border-color: #56762a;\n}\n.btn-info:active,\n.btn-info.active,\n.open > .dropdown-toggle.btn-info {\n  color: #fff;\n  background-color: #699034;\n  border-color: #56762a;\n}\n.btn-info:active:hover,\n.btn-info.active:hover,\n.open > .dropdown-toggle.btn-info:hover,\n.btn-info:active:focus,\n.btn-info.active:focus,\n.open > .dropdown-toggle.btn-info:focus,\n.btn-info:active.focus,\n.btn-info.active.focus,\n.open > .dropdown-toggle.btn-info.focus {\n  color: #fff;\n  background-color: #56762a;\n  border-color: #324519;\n}\n.btn-info:active,\n.btn-info.active,\n.open > .dropdown-toggle.btn-info {\n  background-image: none;\n}\n.btn-info.disabled:hover,\n.btn-info[disabled]:hover,\nfieldset[disabled] .btn-info:hover,\n.btn-info.disabled:focus,\n.btn-info[disabled]:focus,\nfieldset[disabled] .btn-info:focus,\n.btn-info.disabled.focus,\n.btn-info[disabled].focus,\nfieldset[disabled] .btn-info.focus {\n  background-color: #84b641;\n  border-color: #76a33a;\n}\n.btn-info .badge {\n  color: #84b641;\n  background-color: #fff;\n}\n.btn-warning {\n  color: #fff;\n  background-color: #f0ad4e;\n  border-color: #eea236;\n}\n.btn-warning:focus,\n.btn-warning.focus {\n  color: #fff;\n  background-color: #ec971f;\n  border-color: #985f0d;\n}\n.btn-warning:hover {\n  color: #fff;\n  background-color: #ec971f;\n  border-color: #d58512;\n}\n.btn-warning:active,\n.btn-warning.active,\n.open > .dropdown-toggle.btn-warning {\n  color: #fff;\n  background-color: #ec971f;\n  border-color: #d58512;\n}\n.btn-warning:active:hover,\n.btn-warning.active:hover,\n.open > .dropdown-toggle.btn-warning:hover,\n.btn-warning:active:focus,\n.btn-warning.active:focus,\n.open > .dropdown-toggle.btn-warning:focus,\n.btn-warning:active.focus,\n.btn-warning.active.focus,\n.open > .dropdown-toggle.btn-warning.focus {\n  color: #fff;\n  background-color: #d58512;\n  border-color: #985f0d;\n}\n.btn-warning:active,\n.btn-warning.active,\n.open > .dropdown-toggle.btn-warning {\n  background-image: none;\n}\n.btn-warning.disabled:hover,\n.btn-warning[disabled]:hover,\nfieldset[disabled] .btn-warning:hover,\n.btn-warning.disabled:focus,\n.btn-warning[disabled]:focus,\nfieldset[disabled] .btn-warning:focus,\n.btn-warning.disabled.focus,\n.btn-warning[disabled].focus,\nfieldset[disabled] .btn-warning.focus {\n  background-color: #f0ad4e;\n  border-color: #eea236;\n}\n.btn-warning .badge {\n  color: #f0ad4e;\n  background-color: #fff;\n}\n.btn-danger {\n  color: #fff;\n  background-color: #d9534f;\n  border-color: #d43f3a;\n}\n.btn-danger:focus,\n.btn-danger.focus {\n  color: #fff;\n  background-color: #c9302c;\n  border-color: #761c19;\n}\n.btn-danger:hover {\n  color: #fff;\n  background-color: #c9302c;\n  border-color: #ac2925;\n}\n.btn-danger:active,\n.btn-danger.active,\n.open > .dropdown-toggle.btn-danger {\n  color: #fff;\n  background-color: #c9302c;\n  border-color: #ac2925;\n}\n.btn-danger:active:hover,\n.btn-danger.active:hover,\n.open > .dropdown-toggle.btn-danger:hover,\n.btn-danger:active:focus,\n.btn-danger.active:focus,\n.open > .dropdown-toggle.btn-danger:focus,\n.btn-danger:active.focus,\n.btn-danger.active.focus,\n.open > .dropdown-toggle.btn-danger.focus {\n  color: #fff;\n  background-color: #ac2925;\n  border-color: #761c19;\n}\n.btn-danger:active,\n.btn-danger.active,\n.open > .dropdown-toggle.btn-danger {\n  background-image: none;\n}\n.btn-danger.disabled:hover,\n.btn-danger[disabled]:hover,\nfieldset[disabled] .btn-danger:hover,\n.btn-danger.disabled:focus,\n.btn-danger[disabled]:focus,\nfieldset[disabled] .btn-danger:focus,\n.btn-danger.disabled.focus,\n.btn-danger[disabled].focus,\nfieldset[disabled] .btn-danger.focus {\n  background-color: #d9534f;\n  border-color: #d43f3a;\n}\n.btn-danger .badge {\n  color: #d9534f;\n  background-color: #fff;\n}\n.btn-link {\n  color: #007833;\n  font-weight: normal;\n  border-radius: 0;\n}\n.btn-link,\n.btn-link:active,\n.btn-link.active,\n.btn-link[disabled],\nfieldset[disabled] .btn-link {\n  background-color: transparent;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n.btn-link,\n.btn-link:hover,\n.btn-link:focus,\n.btn-link:active {\n  border-color: transparent;\n}\n.btn-link:hover,\n.btn-link:focus {\n  color: #002c12;\n  text-decoration: underline;\n  background-color: transparent;\n}\n.btn-link[disabled]:hover,\nfieldset[disabled] .btn-link:hover,\n.btn-link[disabled]:focus,\nfieldset[disabled] .btn-link:focus {\n  color: #777777;\n  text-decoration: none;\n}\n.btn-lg,\n.btn-group-lg > .btn {\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.3333333;\n  border-radius: 6px;\n}\n.btn-sm,\n.btn-group-sm > .btn {\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\n.btn-xs,\n.btn-group-xs > .btn {\n  padding: 1px 5px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\n.btn-block {\n  display: block;\n  width: 100%;\n}\n.btn-block + .btn-block {\n  margin-top: 5px;\n}\ninput[type=\"submit\"].btn-block,\ninput[type=\"reset\"].btn-block,\ninput[type=\"button\"].btn-block {\n  width: 100%;\n}\n.fade {\n  opacity: 0;\n  -webkit-transition: opacity 0.15s linear;\n  -o-transition: opacity 0.15s linear;\n  transition: opacity 0.15s linear;\n}\n.fade.in {\n  opacity: 1;\n}\n.collapse {\n  display: none;\n}\n.collapse.in {\n  display: block;\n}\ntr.collapse.in {\n  display: table-row;\n}\ntbody.collapse.in {\n  display: table-row-group;\n}\n.collapsing {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  -webkit-transition-property: height, visibility;\n  transition-property: height, visibility;\n  -webkit-transition-duration: 0.35s;\n  transition-duration: 0.35s;\n  -webkit-transition-timing-function: ease;\n  transition-timing-function: ease;\n}\n@font-face {\n  font-family: 'Glyphicons Halflings';\n  src: url(" + __webpack_require__("0r6H") + ");\n  src: url(" + __webpack_require__("0r6H") + "?#iefix) format('embedded-opentype'), url(" + __webpack_require__("uQZo") + ") format('woff2'), url(" + __webpack_require__("rUae") + ") format('woff'), url(" + __webpack_require__("JrMw") + ") format('truetype'), url(" + __webpack_require__("N/dK") + "#glyphicons_halflingsregular) format('svg');\n}\n.glyphicon {\n  position: relative;\n  top: 1px;\n  display: inline-block;\n  font-family: 'Glyphicons Halflings';\n  font-style: normal;\n  font-weight: normal;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.glyphicon-asterisk:before {\n  content: \"*\";\n}\n.glyphicon-plus:before {\n  content: \"+\";\n}\n.glyphicon-euro:before,\n.glyphicon-eur:before {\n  content: \"\\20AC\";\n}\n.glyphicon-minus:before {\n  content: \"\\2212\";\n}\n.glyphicon-cloud:before {\n  content: \"\\2601\";\n}\n.glyphicon-envelope:before {\n  content: \"\\2709\";\n}\n.glyphicon-pencil:before {\n  content: \"\\270F\";\n}\n.glyphicon-glass:before {\n  content: \"\\E001\";\n}\n.glyphicon-music:before {\n  content: \"\\E002\";\n}\n.glyphicon-search:before {\n  content: \"\\E003\";\n}\n.glyphicon-heart:before {\n  content: \"\\E005\";\n}\n.glyphicon-star:before {\n  content: \"\\E006\";\n}\n.glyphicon-star-empty:before {\n  content: \"\\E007\";\n}\n.glyphicon-user:before {\n  content: \"\\E008\";\n}\n.glyphicon-film:before {\n  content: \"\\E009\";\n}\n.glyphicon-th-large:before {\n  content: \"\\E010\";\n}\n.glyphicon-th:before {\n  content: \"\\E011\";\n}\n.glyphicon-th-list:before {\n  content: \"\\E012\";\n}\n.glyphicon-ok:before {\n  content: \"\\E013\";\n}\n.glyphicon-remove:before {\n  content: \"\\E014\";\n}\n.glyphicon-zoom-in:before {\n  content: \"\\E015\";\n}\n.glyphicon-zoom-out:before {\n  content: \"\\E016\";\n}\n.glyphicon-off:before {\n  content: \"\\E017\";\n}\n.glyphicon-signal:before {\n  content: \"\\E018\";\n}\n.glyphicon-cog:before {\n  content: \"\\E019\";\n}\n.glyphicon-trash:before {\n  content: \"\\E020\";\n}\n.glyphicon-home:before {\n  content: \"\\E021\";\n}\n.glyphicon-file:before {\n  content: \"\\E022\";\n}\n.glyphicon-time:before {\n  content: \"\\E023\";\n}\n.glyphicon-road:before {\n  content: \"\\E024\";\n}\n.glyphicon-download-alt:before {\n  content: \"\\E025\";\n}\n.glyphicon-download:before {\n  content: \"\\E026\";\n}\n.glyphicon-upload:before {\n  content: \"\\E027\";\n}\n.glyphicon-inbox:before {\n  content: \"\\E028\";\n}\n.glyphicon-play-circle:before {\n  content: \"\\E029\";\n}\n.glyphicon-repeat:before {\n  content: \"\\E030\";\n}\n.glyphicon-refresh:before {\n  content: \"\\E031\";\n}\n.glyphicon-list-alt:before {\n  content: \"\\E032\";\n}\n.glyphicon-lock:before {\n  content: \"\\E033\";\n}\n.glyphicon-flag:before {\n  content: \"\\E034\";\n}\n.glyphicon-headphones:before {\n  content: \"\\E035\";\n}\n.glyphicon-volume-off:before {\n  content: \"\\E036\";\n}\n.glyphicon-volume-down:before {\n  content: \"\\E037\";\n}\n.glyphicon-volume-up:before {\n  content: \"\\E038\";\n}\n.glyphicon-qrcode:before {\n  content: \"\\E039\";\n}\n.glyphicon-barcode:before {\n  content: \"\\E040\";\n}\n.glyphicon-tag:before {\n  content: \"\\E041\";\n}\n.glyphicon-tags:before {\n  content: \"\\E042\";\n}\n.glyphicon-book:before {\n  content: \"\\E043\";\n}\n.glyphicon-bookmark:before {\n  content: \"\\E044\";\n}\n.glyphicon-print:before {\n  content: \"\\E045\";\n}\n.glyphicon-camera:before {\n  content: \"\\E046\";\n}\n.glyphicon-font:before {\n  content: \"\\E047\";\n}\n.glyphicon-bold:before {\n  content: \"\\E048\";\n}\n.glyphicon-italic:before {\n  content: \"\\E049\";\n}\n.glyphicon-text-height:before {\n  content: \"\\E050\";\n}\n.glyphicon-text-width:before {\n  content: \"\\E051\";\n}\n.glyphicon-align-left:before {\n  content: \"\\E052\";\n}\n.glyphicon-align-center:before {\n  content: \"\\E053\";\n}\n.glyphicon-align-right:before {\n  content: \"\\E054\";\n}\n.glyphicon-align-justify:before {\n  content: \"\\E055\";\n}\n.glyphicon-list:before {\n  content: \"\\E056\";\n}\n.glyphicon-indent-left:before {\n  content: \"\\E057\";\n}\n.glyphicon-indent-right:before {\n  content: \"\\E058\";\n}\n.glyphicon-facetime-video:before {\n  content: \"\\E059\";\n}\n.glyphicon-picture:before {\n  content: \"\\E060\";\n}\n.glyphicon-map-marker:before {\n  content: \"\\E062\";\n}\n.glyphicon-adjust:before {\n  content: \"\\E063\";\n}\n.glyphicon-tint:before {\n  content: \"\\E064\";\n}\n.glyphicon-edit:before {\n  content: \"\\E065\";\n}\n.glyphicon-share:before {\n  content: \"\\E066\";\n}\n.glyphicon-check:before {\n  content: \"\\E067\";\n}\n.glyphicon-move:before {\n  content: \"\\E068\";\n}\n.glyphicon-step-backward:before {\n  content: \"\\E069\";\n}\n.glyphicon-fast-backward:before {\n  content: \"\\E070\";\n}\n.glyphicon-backward:before {\n  content: \"\\E071\";\n}\n.glyphicon-play:before {\n  content: \"\\E072\";\n}\n.glyphicon-pause:before {\n  content: \"\\E073\";\n}\n.glyphicon-stop:before {\n  content: \"\\E074\";\n}\n.glyphicon-forward:before {\n  content: \"\\E075\";\n}\n.glyphicon-fast-forward:before {\n  content: \"\\E076\";\n}\n.glyphicon-step-forward:before {\n  content: \"\\E077\";\n}\n.glyphicon-eject:before {\n  content: \"\\E078\";\n}\n.glyphicon-chevron-left:before {\n  content: \"\\E079\";\n}\n.glyphicon-chevron-right:before {\n  content: \"\\E080\";\n}\n.glyphicon-plus-sign:before {\n  content: \"\\E081\";\n}\n.glyphicon-minus-sign:before {\n  content: \"\\E082\";\n}\n.glyphicon-remove-sign:before {\n  content: \"\\E083\";\n}\n.glyphicon-ok-sign:before {\n  content: \"\\E084\";\n}\n.glyphicon-question-sign:before {\n  content: \"\\E085\";\n}\n.glyphicon-info-sign:before {\n  content: \"\\E086\";\n}\n.glyphicon-screenshot:before {\n  content: \"\\E087\";\n}\n.glyphicon-remove-circle:before {\n  content: \"\\E088\";\n}\n.glyphicon-ok-circle:before {\n  content: \"\\E089\";\n}\n.glyphicon-ban-circle:before {\n  content: \"\\E090\";\n}\n.glyphicon-arrow-left:before {\n  content: \"\\E091\";\n}\n.glyphicon-arrow-right:before {\n  content: \"\\E092\";\n}\n.glyphicon-arrow-up:before {\n  content: \"\\E093\";\n}\n.glyphicon-arrow-down:before {\n  content: \"\\E094\";\n}\n.glyphicon-share-alt:before {\n  content: \"\\E095\";\n}\n.glyphicon-resize-full:before {\n  content: \"\\E096\";\n}\n.glyphicon-resize-small:before {\n  content: \"\\E097\";\n}\n.glyphicon-exclamation-sign:before {\n  content: \"\\E101\";\n}\n.glyphicon-gift:before {\n  content: \"\\E102\";\n}\n.glyphicon-leaf:before {\n  content: \"\\E103\";\n}\n.glyphicon-fire:before {\n  content: \"\\E104\";\n}\n.glyphicon-eye-open:before {\n  content: \"\\E105\";\n}\n.glyphicon-eye-close:before {\n  content: \"\\E106\";\n}\n.glyphicon-warning-sign:before {\n  content: \"\\E107\";\n}\n.glyphicon-plane:before {\n  content: \"\\E108\";\n}\n.glyphicon-calendar:before {\n  content: \"\\E109\";\n}\n.glyphicon-random:before {\n  content: \"\\E110\";\n}\n.glyphicon-comment:before {\n  content: \"\\E111\";\n}\n.glyphicon-magnet:before {\n  content: \"\\E112\";\n}\n.glyphicon-chevron-up:before {\n  content: \"\\E113\";\n}\n.glyphicon-chevron-down:before {\n  content: \"\\E114\";\n}\n.glyphicon-retweet:before {\n  content: \"\\E115\";\n}\n.glyphicon-shopping-cart:before {\n  content: \"\\E116\";\n}\n.glyphicon-folder-close:before {\n  content: \"\\E117\";\n}\n.glyphicon-folder-open:before {\n  content: \"\\E118\";\n}\n.glyphicon-resize-vertical:before {\n  content: \"\\E119\";\n}\n.glyphicon-resize-horizontal:before {\n  content: \"\\E120\";\n}\n.glyphicon-hdd:before {\n  content: \"\\E121\";\n}\n.glyphicon-bullhorn:before {\n  content: \"\\E122\";\n}\n.glyphicon-bell:before {\n  content: \"\\E123\";\n}\n.glyphicon-certificate:before {\n  content: \"\\E124\";\n}\n.glyphicon-thumbs-up:before {\n  content: \"\\E125\";\n}\n.glyphicon-thumbs-down:before {\n  content: \"\\E126\";\n}\n.glyphicon-hand-right:before {\n  content: \"\\E127\";\n}\n.glyphicon-hand-left:before {\n  content: \"\\E128\";\n}\n.glyphicon-hand-up:before {\n  content: \"\\E129\";\n}\n.glyphicon-hand-down:before {\n  content: \"\\E130\";\n}\n.glyphicon-circle-arrow-right:before {\n  content: \"\\E131\";\n}\n.glyphicon-circle-arrow-left:before {\n  content: \"\\E132\";\n}\n.glyphicon-circle-arrow-up:before {\n  content: \"\\E133\";\n}\n.glyphicon-circle-arrow-down:before {\n  content: \"\\E134\";\n}\n.glyphicon-globe:before {\n  content: \"\\E135\";\n}\n.glyphicon-wrench:before {\n  content: \"\\E136\";\n}\n.glyphicon-tasks:before {\n  content: \"\\E137\";\n}\n.glyphicon-filter:before {\n  content: \"\\E138\";\n}\n.glyphicon-briefcase:before {\n  content: \"\\E139\";\n}\n.glyphicon-fullscreen:before {\n  content: \"\\E140\";\n}\n.glyphicon-dashboard:before {\n  content: \"\\E141\";\n}\n.glyphicon-paperclip:before {\n  content: \"\\E142\";\n}\n.glyphicon-heart-empty:before {\n  content: \"\\E143\";\n}\n.glyphicon-link:before {\n  content: \"\\E144\";\n}\n.glyphicon-phone:before {\n  content: \"\\E145\";\n}\n.glyphicon-pushpin:before {\n  content: \"\\E146\";\n}\n.glyphicon-usd:before {\n  content: \"\\E148\";\n}\n.glyphicon-gbp:before {\n  content: \"\\E149\";\n}\n.glyphicon-sort:before {\n  content: \"\\E150\";\n}\n.glyphicon-sort-by-alphabet:before {\n  content: \"\\E151\";\n}\n.glyphicon-sort-by-alphabet-alt:before {\n  content: \"\\E152\";\n}\n.glyphicon-sort-by-order:before {\n  content: \"\\E153\";\n}\n.glyphicon-sort-by-order-alt:before {\n  content: \"\\E154\";\n}\n.glyphicon-sort-by-attributes:before {\n  content: \"\\E155\";\n}\n.glyphicon-sort-by-attributes-alt:before {\n  content: \"\\E156\";\n}\n.glyphicon-unchecked:before {\n  content: \"\\E157\";\n}\n.glyphicon-expand:before {\n  content: \"\\E158\";\n}\n.glyphicon-collapse-down:before {\n  content: \"\\E159\";\n}\n.glyphicon-collapse-up:before {\n  content: \"\\E160\";\n}\n.glyphicon-log-in:before {\n  content: \"\\E161\";\n}\n.glyphicon-flash:before {\n  content: \"\\E162\";\n}\n.glyphicon-log-out:before {\n  content: \"\\E163\";\n}\n.glyphicon-new-window:before {\n  content: \"\\E164\";\n}\n.glyphicon-record:before {\n  content: \"\\E165\";\n}\n.glyphicon-save:before {\n  content: \"\\E166\";\n}\n.glyphicon-open:before {\n  content: \"\\E167\";\n}\n.glyphicon-saved:before {\n  content: \"\\E168\";\n}\n.glyphicon-import:before {\n  content: \"\\E169\";\n}\n.glyphicon-export:before {\n  content: \"\\E170\";\n}\n.glyphicon-send:before {\n  content: \"\\E171\";\n}\n.glyphicon-floppy-disk:before {\n  content: \"\\E172\";\n}\n.glyphicon-floppy-saved:before {\n  content: \"\\E173\";\n}\n.glyphicon-floppy-remove:before {\n  content: \"\\E174\";\n}\n.glyphicon-floppy-save:before {\n  content: \"\\E175\";\n}\n.glyphicon-floppy-open:before {\n  content: \"\\E176\";\n}\n.glyphicon-credit-card:before {\n  content: \"\\E177\";\n}\n.glyphicon-transfer:before {\n  content: \"\\E178\";\n}\n.glyphicon-cutlery:before {\n  content: \"\\E179\";\n}\n.glyphicon-header:before {\n  content: \"\\E180\";\n}\n.glyphicon-compressed:before {\n  content: \"\\E181\";\n}\n.glyphicon-earphone:before {\n  content: \"\\E182\";\n}\n.glyphicon-phone-alt:before {\n  content: \"\\E183\";\n}\n.glyphicon-tower:before {\n  content: \"\\E184\";\n}\n.glyphicon-stats:before {\n  content: \"\\E185\";\n}\n.glyphicon-sd-video:before {\n  content: \"\\E186\";\n}\n.glyphicon-hd-video:before {\n  content: \"\\E187\";\n}\n.glyphicon-subtitles:before {\n  content: \"\\E188\";\n}\n.glyphicon-sound-stereo:before {\n  content: \"\\E189\";\n}\n.glyphicon-sound-dolby:before {\n  content: \"\\E190\";\n}\n.glyphicon-sound-5-1:before {\n  content: \"\\E191\";\n}\n.glyphicon-sound-6-1:before {\n  content: \"\\E192\";\n}\n.glyphicon-sound-7-1:before {\n  content: \"\\E193\";\n}\n.glyphicon-copyright-mark:before {\n  content: \"\\E194\";\n}\n.glyphicon-registration-mark:before {\n  content: \"\\E195\";\n}\n.glyphicon-cloud-download:before {\n  content: \"\\E197\";\n}\n.glyphicon-cloud-upload:before {\n  content: \"\\E198\";\n}\n.glyphicon-tree-conifer:before {\n  content: \"\\E199\";\n}\n.glyphicon-tree-deciduous:before {\n  content: \"\\E200\";\n}\n.glyphicon-cd:before {\n  content: \"\\E201\";\n}\n.glyphicon-save-file:before {\n  content: \"\\E202\";\n}\n.glyphicon-open-file:before {\n  content: \"\\E203\";\n}\n.glyphicon-level-up:before {\n  content: \"\\E204\";\n}\n.glyphicon-copy:before {\n  content: \"\\E205\";\n}\n.glyphicon-paste:before {\n  content: \"\\E206\";\n}\n.glyphicon-alert:before {\n  content: \"\\E209\";\n}\n.glyphicon-equalizer:before {\n  content: \"\\E210\";\n}\n.glyphicon-king:before {\n  content: \"\\E211\";\n}\n.glyphicon-queen:before {\n  content: \"\\E212\";\n}\n.glyphicon-pawn:before {\n  content: \"\\E213\";\n}\n.glyphicon-bishop:before {\n  content: \"\\E214\";\n}\n.glyphicon-knight:before {\n  content: \"\\E215\";\n}\n.glyphicon-baby-formula:before {\n  content: \"\\E216\";\n}\n.glyphicon-tent:before {\n  content: \"\\26FA\";\n}\n.glyphicon-blackboard:before {\n  content: \"\\E218\";\n}\n.glyphicon-bed:before {\n  content: \"\\E219\";\n}\n.glyphicon-apple:before {\n  content: \"\\F8FF\";\n}\n.glyphicon-erase:before {\n  content: \"\\E221\";\n}\n.glyphicon-hourglass:before {\n  content: \"\\231B\";\n}\n.glyphicon-lamp:before {\n  content: \"\\E223\";\n}\n.glyphicon-duplicate:before {\n  content: \"\\E224\";\n}\n.glyphicon-piggy-bank:before {\n  content: \"\\E225\";\n}\n.glyphicon-scissors:before {\n  content: \"\\E226\";\n}\n.glyphicon-bitcoin:before {\n  content: \"\\E227\";\n}\n.glyphicon-btc:before {\n  content: \"\\E227\";\n}\n.glyphicon-xbt:before {\n  content: \"\\E227\";\n}\n.glyphicon-yen:before {\n  content: \"\\A5\";\n}\n.glyphicon-jpy:before {\n  content: \"\\A5\";\n}\n.glyphicon-ruble:before {\n  content: \"\\20BD\";\n}\n.glyphicon-rub:before {\n  content: \"\\20BD\";\n}\n.glyphicon-scale:before {\n  content: \"\\E230\";\n}\n.glyphicon-ice-lolly:before {\n  content: \"\\E231\";\n}\n.glyphicon-ice-lolly-tasted:before {\n  content: \"\\E232\";\n}\n.glyphicon-education:before {\n  content: \"\\E233\";\n}\n.glyphicon-option-horizontal:before {\n  content: \"\\E234\";\n}\n.glyphicon-option-vertical:before {\n  content: \"\\E235\";\n}\n.glyphicon-menu-hamburger:before {\n  content: \"\\E236\";\n}\n.glyphicon-modal-window:before {\n  content: \"\\E237\";\n}\n.glyphicon-oil:before {\n  content: \"\\E238\";\n}\n.glyphicon-grain:before {\n  content: \"\\E239\";\n}\n.glyphicon-sunglasses:before {\n  content: \"\\E240\";\n}\n.glyphicon-text-size:before {\n  content: \"\\E241\";\n}\n.glyphicon-text-color:before {\n  content: \"\\E242\";\n}\n.glyphicon-text-background:before {\n  content: \"\\E243\";\n}\n.glyphicon-object-align-top:before {\n  content: \"\\E244\";\n}\n.glyphicon-object-align-bottom:before {\n  content: \"\\E245\";\n}\n.glyphicon-object-align-horizontal:before {\n  content: \"\\E246\";\n}\n.glyphicon-object-align-left:before {\n  content: \"\\E247\";\n}\n.glyphicon-object-align-vertical:before {\n  content: \"\\E248\";\n}\n.glyphicon-object-align-right:before {\n  content: \"\\E249\";\n}\n.glyphicon-triangle-right:before {\n  content: \"\\E250\";\n}\n.glyphicon-triangle-left:before {\n  content: \"\\E251\";\n}\n.glyphicon-triangle-bottom:before {\n  content: \"\\E252\";\n}\n.glyphicon-triangle-top:before {\n  content: \"\\E253\";\n}\n.glyphicon-console:before {\n  content: \"\\E254\";\n}\n.glyphicon-superscript:before {\n  content: \"\\E255\";\n}\n.glyphicon-subscript:before {\n  content: \"\\E256\";\n}\n.glyphicon-menu-left:before {\n  content: \"\\E257\";\n}\n.glyphicon-menu-right:before {\n  content: \"\\E258\";\n}\n.glyphicon-menu-down:before {\n  content: \"\\E259\";\n}\n.glyphicon-menu-up:before {\n  content: \"\\E260\";\n}\n.caret {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 2px;\n  vertical-align: middle;\n  border-top: 4px dashed;\n  border-top: 4px solid \\9;\n  border-right: 4px solid transparent;\n  border-left: 4px solid transparent;\n}\n.dropup,\n.dropdown {\n  position: relative;\n}\n.dropdown-toggle:focus {\n  outline: 0;\n}\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 160px;\n  padding: 5px 0;\n  margin: 2px 0 0;\n  list-style: none;\n  font-size: 14px;\n  text-align: left;\n  background-color: #fff;\n  border: 1px solid #ccc;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 4px;\n  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);\n  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);\n  background-clip: padding-box;\n}\n.dropdown-menu.pull-right {\n  right: 0;\n  left: auto;\n}\n.dropdown-menu .divider {\n  height: 1px;\n  margin: 9px 0;\n  overflow: hidden;\n  background-color: #e5e5e5;\n}\n.dropdown-menu > li > a {\n  display: block;\n  padding: 3px 20px;\n  clear: both;\n  font-weight: normal;\n  line-height: 1.42857143;\n  color: #333333;\n  white-space: nowrap;\n}\n.dropdown-menu > li > a:hover,\n.dropdown-menu > li > a:focus {\n  text-decoration: none;\n  color: #262626;\n  background-color: #f5f5f5;\n}\n.dropdown-menu > .active > a,\n.dropdown-menu > .active > a:hover,\n.dropdown-menu > .active > a:focus {\n  color: #fff;\n  text-decoration: none;\n  outline: 0;\n  background-color: #007833;\n}\n.dropdown-menu > .disabled > a,\n.dropdown-menu > .disabled > a:hover,\n.dropdown-menu > .disabled > a:focus {\n  color: #777777;\n}\n.dropdown-menu > .disabled > a:hover,\n.dropdown-menu > .disabled > a:focus {\n  text-decoration: none;\n  background-color: transparent;\n  background-image: none;\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);\n  cursor: not-allowed;\n}\n.open > .dropdown-menu {\n  display: block;\n}\n.open > a {\n  outline: 0;\n}\n.dropdown-menu-right {\n  left: auto;\n  right: 0;\n}\n.dropdown-menu-left {\n  left: 0;\n  right: auto;\n}\n.dropdown-header {\n  display: block;\n  padding: 3px 20px;\n  font-size: 12px;\n  line-height: 1.42857143;\n  color: #777777;\n  white-space: nowrap;\n}\n.dropdown-backdrop {\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n  z-index: 990;\n}\n.pull-right > .dropdown-menu {\n  right: 0;\n  left: auto;\n}\n.dropup .caret,\n.navbar-fixed-bottom .dropdown .caret {\n  border-top: 0;\n  border-bottom: 4px dashed;\n  border-bottom: 4px solid \\9;\n  content: \"\";\n}\n.dropup .dropdown-menu,\n.navbar-fixed-bottom .dropdown .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  margin-bottom: 2px;\n}\n@media (min-width: 768px) {\n  .navbar-right .dropdown-menu {\n    left: auto;\n    right: 0;\n  }\n  .navbar-right .dropdown-menu-left {\n    left: 0;\n    right: auto;\n  }\n}\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n}\n.btn-group > .btn,\n.btn-group-vertical > .btn {\n  position: relative;\n  float: left;\n}\n.btn-group > .btn:hover,\n.btn-group-vertical > .btn:hover,\n.btn-group > .btn:focus,\n.btn-group-vertical > .btn:focus,\n.btn-group > .btn:active,\n.btn-group-vertical > .btn:active,\n.btn-group > .btn.active,\n.btn-group-vertical > .btn.active {\n  z-index: 2;\n}\n.btn-group .btn + .btn,\n.btn-group .btn + .btn-group,\n.btn-group .btn-group + .btn,\n.btn-group .btn-group + .btn-group {\n  margin-left: -1px;\n}\n.btn-toolbar {\n  margin-left: -5px;\n}\n.btn-toolbar .btn,\n.btn-toolbar .btn-group,\n.btn-toolbar .input-group {\n  float: left;\n}\n.btn-toolbar > .btn,\n.btn-toolbar > .btn-group,\n.btn-toolbar > .input-group {\n  margin-left: 5px;\n}\n.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {\n  border-radius: 0;\n}\n.btn-group > .btn:first-child {\n  margin-left: 0;\n}\n.btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n.btn-group > .btn:last-child:not(:first-child),\n.btn-group > .dropdown-toggle:not(:first-child) {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n.btn-group > .btn-group {\n  float: left;\n}\n.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0;\n}\n.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n.btn-group .dropdown-toggle:active,\n.btn-group.open .dropdown-toggle {\n  outline: 0;\n}\n.btn-group > .btn + .dropdown-toggle {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n.btn-group > .btn-lg + .dropdown-toggle {\n  padding-left: 12px;\n  padding-right: 12px;\n}\n.btn-group.open .dropdown-toggle {\n  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n}\n.btn-group.open .dropdown-toggle.btn-link {\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n.btn .caret {\n  margin-left: 0;\n}\n.btn-lg .caret {\n  border-width: 5px 5px 0;\n  border-bottom-width: 0;\n}\n.dropup .btn-lg .caret {\n  border-width: 0 5px 5px;\n}\n.btn-group-vertical > .btn,\n.btn-group-vertical > .btn-group,\n.btn-group-vertical > .btn-group > .btn {\n  display: block;\n  float: none;\n  width: 100%;\n  max-width: 100%;\n}\n.btn-group-vertical > .btn-group > .btn {\n  float: none;\n}\n.btn-group-vertical > .btn + .btn,\n.btn-group-vertical > .btn + .btn-group,\n.btn-group-vertical > .btn-group + .btn,\n.btn-group-vertical > .btn-group + .btn-group {\n  margin-top: -1px;\n  margin-left: 0;\n}\n.btn-group-vertical > .btn:not(:first-child):not(:last-child) {\n  border-radius: 0;\n}\n.btn-group-vertical > .btn:first-child:not(:last-child) {\n  border-top-right-radius: 4px;\n  border-top-left-radius: 4px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.btn-group-vertical > .btn:last-child:not(:first-child) {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n  border-bottom-right-radius: 4px;\n  border-bottom-left-radius: 4px;\n}\n.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0;\n}\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n.btn-group-justified {\n  display: table;\n  width: 100%;\n  table-layout: fixed;\n  border-collapse: separate;\n}\n.btn-group-justified > .btn,\n.btn-group-justified > .btn-group {\n  float: none;\n  display: table-cell;\n  width: 1%;\n}\n.btn-group-justified > .btn-group .btn {\n  width: 100%;\n}\n.btn-group-justified > .btn-group .dropdown-menu {\n  left: auto;\n}\n[data-toggle=\"buttons\"] > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn input[type=\"checkbox\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"checkbox\"] {\n  position: absolute;\n  clip: rect(0, 0, 0, 0);\n  pointer-events: none;\n}\n.input-group {\n  position: relative;\n  display: table;\n  border-collapse: separate;\n}\n.input-group[class*=\"col-\"] {\n  float: none;\n  padding-left: 0;\n  padding-right: 0;\n}\n.input-group .form-control {\n  position: relative;\n  z-index: 2;\n  float: left;\n  width: 100%;\n  margin-bottom: 0;\n}\n.input-group .form-control:focus {\n  z-index: 3;\n}\n.input-group-lg > .form-control,\n.input-group-lg > .input-group-addon,\n.input-group-lg > .input-group-btn > .btn {\n  height: 46px;\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.3333333;\n  border-radius: 6px;\n}\nselect.input-group-lg > .form-control,\nselect.input-group-lg > .input-group-addon,\nselect.input-group-lg > .input-group-btn > .btn {\n  height: 46px;\n  line-height: 46px;\n}\ntextarea.input-group-lg > .form-control,\ntextarea.input-group-lg > .input-group-addon,\ntextarea.input-group-lg > .input-group-btn > .btn,\nselect[multiple].input-group-lg > .form-control,\nselect[multiple].input-group-lg > .input-group-addon,\nselect[multiple].input-group-lg > .input-group-btn > .btn {\n  height: auto;\n}\n.input-group-sm > .form-control,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .btn {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\nselect.input-group-sm > .form-control,\nselect.input-group-sm > .input-group-addon,\nselect.input-group-sm > .input-group-btn > .btn {\n  height: 30px;\n  line-height: 30px;\n}\ntextarea.input-group-sm > .form-control,\ntextarea.input-group-sm > .input-group-addon,\ntextarea.input-group-sm > .input-group-btn > .btn,\nselect[multiple].input-group-sm > .form-control,\nselect[multiple].input-group-sm > .input-group-addon,\nselect[multiple].input-group-sm > .input-group-btn > .btn {\n  height: auto;\n}\n.input-group-addon,\n.input-group-btn,\n.input-group .form-control {\n  display: table-cell;\n}\n.input-group-addon:not(:first-child):not(:last-child),\n.input-group-btn:not(:first-child):not(:last-child),\n.input-group .form-control:not(:first-child):not(:last-child) {\n  border-radius: 0;\n}\n.input-group-addon,\n.input-group-btn {\n  width: 1%;\n  white-space: nowrap;\n  vertical-align: middle;\n}\n.input-group-addon {\n  padding: 6px 12px;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 1;\n  color: #555555;\n  text-align: center;\n  background-color: #eeeeee;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\n.input-group-addon.input-sm {\n  padding: 5px 10px;\n  font-size: 12px;\n  border-radius: 3px;\n}\n.input-group-addon.input-lg {\n  padding: 10px 16px;\n  font-size: 18px;\n  border-radius: 6px;\n}\n.input-group-addon input[type=\"radio\"],\n.input-group-addon input[type=\"checkbox\"] {\n  margin-top: 0;\n}\n.input-group .form-control:first-child,\n.input-group-addon:first-child,\n.input-group-btn:first-child > .btn,\n.input-group-btn:first-child > .btn-group > .btn,\n.input-group-btn:first-child > .dropdown-toggle,\n.input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group-btn:last-child > .btn-group:not(:last-child) > .btn {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n.input-group-addon:first-child {\n  border-right: 0;\n}\n.input-group .form-control:last-child,\n.input-group-addon:last-child,\n.input-group-btn:last-child > .btn,\n.input-group-btn:last-child > .btn-group > .btn,\n.input-group-btn:last-child > .dropdown-toggle,\n.input-group-btn:first-child > .btn:not(:first-child),\n.input-group-btn:first-child > .btn-group:not(:first-child) > .btn {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n.input-group-addon:last-child {\n  border-left: 0;\n}\n.input-group-btn {\n  position: relative;\n  font-size: 0;\n  white-space: nowrap;\n}\n.input-group-btn > .btn {\n  position: relative;\n}\n.input-group-btn > .btn + .btn {\n  margin-left: -1px;\n}\n.input-group-btn > .btn:hover,\n.input-group-btn > .btn:focus,\n.input-group-btn > .btn:active {\n  z-index: 2;\n}\n.input-group-btn:first-child > .btn,\n.input-group-btn:first-child > .btn-group {\n  margin-right: -1px;\n}\n.input-group-btn:last-child > .btn,\n.input-group-btn:last-child > .btn-group {\n  z-index: 2;\n  margin-left: -1px;\n}\n.nav {\n  margin-bottom: 0;\n  padding-left: 0;\n  list-style: none;\n}\n.nav > li {\n  position: relative;\n  display: block;\n}\n.nav > li > a {\n  position: relative;\n  display: block;\n  padding: 10px 15px;\n}\n.nav > li > a:hover,\n.nav > li > a:focus {\n  text-decoration: none;\n  background-color: #eeeeee;\n}\n.nav > li.disabled > a {\n  color: #777777;\n}\n.nav > li.disabled > a:hover,\n.nav > li.disabled > a:focus {\n  color: #777777;\n  text-decoration: none;\n  background-color: transparent;\n  cursor: not-allowed;\n}\n.nav .open > a,\n.nav .open > a:hover,\n.nav .open > a:focus {\n  background-color: #eeeeee;\n  border-color: #007833;\n}\n.nav .nav-divider {\n  height: 1px;\n  margin: 9px 0;\n  overflow: hidden;\n  background-color: #e5e5e5;\n}\n.nav > li > a > img {\n  max-width: none;\n}\n.nav-tabs {\n  border-bottom: 1px solid #ddd;\n}\n.nav-tabs > li {\n  float: left;\n  margin-bottom: -1px;\n}\n.nav-tabs > li > a {\n  margin-right: 2px;\n  line-height: 1.42857143;\n  border: 1px solid transparent;\n  border-radius: 4px 4px 0 0;\n}\n.nav-tabs > li > a:hover {\n  border-color: #eeeeee #eeeeee #ddd;\n}\n.nav-tabs > li.active > a,\n.nav-tabs > li.active > a:hover,\n.nav-tabs > li.active > a:focus {\n  color: #555555;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-bottom-color: transparent;\n  cursor: default;\n}\n.nav-tabs.nav-justified {\n  width: 100%;\n  border-bottom: 0;\n}\n.nav-tabs.nav-justified > li {\n  float: none;\n}\n.nav-tabs.nav-justified > li > a {\n  text-align: center;\n  margin-bottom: 5px;\n}\n.nav-tabs.nav-justified > .dropdown .dropdown-menu {\n  top: auto;\n  left: auto;\n}\n@media (min-width: 768px) {\n  .nav-tabs.nav-justified > li {\n    display: table-cell;\n    width: 1%;\n  }\n  .nav-tabs.nav-justified > li > a {\n    margin-bottom: 0;\n  }\n}\n.nav-tabs.nav-justified > li > a {\n  margin-right: 0;\n  border-radius: 4px;\n}\n.nav-tabs.nav-justified > .active > a,\n.nav-tabs.nav-justified > .active > a:hover,\n.nav-tabs.nav-justified > .active > a:focus {\n  border: 1px solid #ddd;\n}\n@media (min-width: 768px) {\n  .nav-tabs.nav-justified > li > a {\n    border-bottom: 1px solid #ddd;\n    border-radius: 4px 4px 0 0;\n  }\n  .nav-tabs.nav-justified > .active > a,\n  .nav-tabs.nav-justified > .active > a:hover,\n  .nav-tabs.nav-justified > .active > a:focus {\n    border-bottom-color: #fff;\n  }\n}\n.nav-pills > li {\n  float: left;\n}\n.nav-pills > li > a {\n  border-radius: 4px;\n}\n.nav-pills > li + li {\n  margin-left: 2px;\n}\n.nav-pills > li.active > a,\n.nav-pills > li.active > a:hover,\n.nav-pills > li.active > a:focus {\n  color: #fff;\n  background-color: #007833;\n}\n.nav-stacked > li {\n  float: none;\n}\n.nav-stacked > li + li {\n  margin-top: 2px;\n  margin-left: 0;\n}\n.nav-justified {\n  width: 100%;\n}\n.nav-justified > li {\n  float: none;\n}\n.nav-justified > li > a {\n  text-align: center;\n  margin-bottom: 5px;\n}\n.nav-justified > .dropdown .dropdown-menu {\n  top: auto;\n  left: auto;\n}\n@media (min-width: 768px) {\n  .nav-justified > li {\n    display: table-cell;\n    width: 1%;\n  }\n  .nav-justified > li > a {\n    margin-bottom: 0;\n  }\n}\n.nav-tabs-justified {\n  border-bottom: 0;\n}\n.nav-tabs-justified > li > a {\n  margin-right: 0;\n  border-radius: 4px;\n}\n.nav-tabs-justified > .active > a,\n.nav-tabs-justified > .active > a:hover,\n.nav-tabs-justified > .active > a:focus {\n  border: 1px solid #ddd;\n}\n@media (min-width: 768px) {\n  .nav-tabs-justified > li > a {\n    border-bottom: 1px solid #ddd;\n    border-radius: 4px 4px 0 0;\n  }\n  .nav-tabs-justified > .active > a,\n  .nav-tabs-justified > .active > a:hover,\n  .nav-tabs-justified > .active > a:focus {\n    border-bottom-color: #fff;\n  }\n}\n.tab-content > .tab-pane {\n  display: none;\n}\n.tab-content > .active {\n  display: block;\n}\n.nav-tabs .dropdown-menu {\n  margin-top: -1px;\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n.navbar {\n  position: relative;\n  min-height: 50px;\n  margin-bottom: 20px;\n  border: 1px solid transparent;\n}\n@media (min-width: 768px) {\n  .navbar {\n    border-radius: 4px;\n  }\n}\n@media (min-width: 768px) {\n  .navbar-header {\n    float: left;\n  }\n}\n.navbar-collapse {\n  overflow-x: visible;\n  padding-right: 15px;\n  padding-left: 15px;\n  border-top: 1px solid transparent;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);\n  -webkit-overflow-scrolling: touch;\n}\n.navbar-collapse.in {\n  overflow-y: auto;\n}\n@media (min-width: 768px) {\n  .navbar-collapse {\n    width: auto;\n    border-top: 0;\n    box-shadow: none;\n  }\n  .navbar-collapse.collapse {\n    display: block !important;\n    height: auto !important;\n    padding-bottom: 0;\n    overflow: visible !important;\n  }\n  .navbar-collapse.in {\n    overflow-y: visible;\n  }\n  .navbar-fixed-top .navbar-collapse,\n  .navbar-static-top .navbar-collapse,\n  .navbar-fixed-bottom .navbar-collapse {\n    padding-left: 0;\n    padding-right: 0;\n  }\n}\n.navbar-fixed-top .navbar-collapse,\n.navbar-fixed-bottom .navbar-collapse {\n  max-height: 340px;\n}\n@media (max-device-width: 480px) and (orientation: landscape) {\n  .navbar-fixed-top .navbar-collapse,\n  .navbar-fixed-bottom .navbar-collapse {\n    max-height: 200px;\n  }\n}\n.container > .navbar-header,\n.container-fluid > .navbar-header,\n.container > .navbar-collapse,\n.container-fluid > .navbar-collapse {\n  margin-right: -15px;\n  margin-left: -15px;\n}\n@media (min-width: 768px) {\n  .container > .navbar-header,\n  .container-fluid > .navbar-header,\n  .container > .navbar-collapse,\n  .container-fluid > .navbar-collapse {\n    margin-right: 0;\n    margin-left: 0;\n  }\n}\n.navbar-static-top {\n  z-index: 1000;\n  border-width: 0 0 1px;\n}\n@media (min-width: 768px) {\n  .navbar-static-top {\n    border-radius: 0;\n  }\n}\n.navbar-fixed-top,\n.navbar-fixed-bottom {\n  position: fixed;\n  right: 0;\n  left: 0;\n  z-index: 1030;\n}\n@media (min-width: 768px) {\n  .navbar-fixed-top,\n  .navbar-fixed-bottom {\n    border-radius: 0;\n  }\n}\n.navbar-fixed-top {\n  top: 0;\n  border-width: 0 0 1px;\n}\n.navbar-fixed-bottom {\n  bottom: 0;\n  margin-bottom: 0;\n  border-width: 1px 0 0;\n}\n.navbar-brand {\n  float: left;\n  padding: 15px 15px;\n  font-size: 18px;\n  line-height: 20px;\n  height: 50px;\n}\n.navbar-brand:hover,\n.navbar-brand:focus {\n  text-decoration: none;\n}\n.navbar-brand > img {\n  display: block;\n}\n@media (min-width: 768px) {\n  .navbar > .container .navbar-brand,\n  .navbar > .container-fluid .navbar-brand {\n    margin-left: -15px;\n  }\n}\n.navbar-toggle {\n  position: relative;\n  float: right;\n  margin-right: 15px;\n  padding: 9px 10px;\n  margin-top: 8px;\n  margin-bottom: 8px;\n  background-color: transparent;\n  background-image: none;\n  border: 1px solid transparent;\n  border-radius: 4px;\n}\n.navbar-toggle:focus {\n  outline: 0;\n}\n.navbar-toggle .icon-bar {\n  display: block;\n  width: 22px;\n  height: 2px;\n  border-radius: 1px;\n}\n.navbar-toggle .icon-bar + .icon-bar {\n  margin-top: 4px;\n}\n@media (min-width: 768px) {\n  .navbar-toggle {\n    display: none;\n  }\n}\n.navbar-nav {\n  margin: 7.5px -15px;\n}\n.navbar-nav > li > a {\n  padding-top: 10px;\n  padding-bottom: 10px;\n  line-height: 20px;\n}\n@media (max-width: 767px) {\n  .navbar-nav .open .dropdown-menu {\n    position: static;\n    float: none;\n    width: auto;\n    margin-top: 0;\n    background-color: transparent;\n    border: 0;\n    box-shadow: none;\n  }\n  .navbar-nav .open .dropdown-menu > li > a,\n  .navbar-nav .open .dropdown-menu .dropdown-header {\n    padding: 5px 15px 5px 25px;\n  }\n  .navbar-nav .open .dropdown-menu > li > a {\n    line-height: 20px;\n  }\n  .navbar-nav .open .dropdown-menu > li > a:hover,\n  .navbar-nav .open .dropdown-menu > li > a:focus {\n    background-image: none;\n  }\n}\n@media (min-width: 768px) {\n  .navbar-nav {\n    float: left;\n    margin: 0;\n  }\n  .navbar-nav > li {\n    float: left;\n  }\n  .navbar-nav > li > a {\n    padding-top: 15px;\n    padding-bottom: 15px;\n  }\n}\n.navbar-form {\n  margin-left: -15px;\n  margin-right: -15px;\n  padding: 10px 15px;\n  border-top: 1px solid transparent;\n  border-bottom: 1px solid transparent;\n  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);\n  margin-top: 8px;\n  margin-bottom: 8px;\n}\n@media (min-width: 768px) {\n  .navbar-form .form-group {\n    display: inline-block;\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .navbar-form .form-control {\n    display: inline-block;\n    width: auto;\n    vertical-align: middle;\n  }\n  .navbar-form .form-control-static {\n    display: inline-block;\n  }\n  .navbar-form .input-group {\n    display: inline-table;\n    vertical-align: middle;\n  }\n  .navbar-form .input-group .input-group-addon,\n  .navbar-form .input-group .input-group-btn,\n  .navbar-form .input-group .form-control {\n    width: auto;\n  }\n  .navbar-form .input-group > .form-control {\n    width: 100%;\n  }\n  .navbar-form .control-label {\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .navbar-form .radio,\n  .navbar-form .checkbox {\n    display: inline-block;\n    margin-top: 0;\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .navbar-form .radio label,\n  .navbar-form .checkbox label {\n    padding-left: 0;\n  }\n  .navbar-form .radio input[type=\"radio\"],\n  .navbar-form .checkbox input[type=\"checkbox\"] {\n    position: relative;\n    margin-left: 0;\n  }\n  .navbar-form .has-feedback .form-control-feedback {\n    top: 0;\n  }\n}\n@media (max-width: 767px) {\n  .navbar-form .form-group {\n    margin-bottom: 5px;\n  }\n  .navbar-form .form-group:last-child {\n    margin-bottom: 0;\n  }\n}\n@media (min-width: 768px) {\n  .navbar-form {\n    width: auto;\n    border: 0;\n    margin-left: 0;\n    margin-right: 0;\n    padding-top: 0;\n    padding-bottom: 0;\n    -webkit-box-shadow: none;\n    box-shadow: none;\n  }\n}\n.navbar-nav > li > .dropdown-menu {\n  margin-top: 0;\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n.navbar-fixed-bottom .navbar-nav > li > .dropdown-menu {\n  margin-bottom: 0;\n  border-top-right-radius: 4px;\n  border-top-left-radius: 4px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.navbar-btn {\n  margin-top: 8px;\n  margin-bottom: 8px;\n}\n.navbar-btn.btn-sm {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n.navbar-btn.btn-xs {\n  margin-top: 14px;\n  margin-bottom: 14px;\n}\n.navbar-text {\n  margin-top: 15px;\n  margin-bottom: 15px;\n}\n@media (min-width: 768px) {\n  .navbar-text {\n    float: left;\n    margin-left: 15px;\n    margin-right: 15px;\n  }\n}\n@media (min-width: 768px) {\n  .navbar-left {\n    float: left !important;\n  }\n  .navbar-right {\n    float: right !important;\n    margin-right: -15px;\n  }\n  .navbar-right ~ .navbar-right {\n    margin-right: 0;\n  }\n}\n.navbar-default {\n  background-color: #007833;\n  border-color: #005725;\n}\n.navbar-default .navbar-brand {\n  color: #CCC;\n}\n.navbar-default .navbar-brand:hover,\n.navbar-default .navbar-brand:focus {\n  color: #b3b3b3;\n  background-color: transparent;\n}\n.navbar-default .navbar-text {\n  color: #CCC;\n}\n.navbar-default .navbar-nav > li > a {\n  color: #CCC;\n}\n.navbar-default .navbar-nav > li > a:hover,\n.navbar-default .navbar-nav > li > a:focus {\n  color: #fff;\n  background-color: transparent;\n}\n.navbar-default .navbar-nav > .active > a,\n.navbar-default .navbar-nav > .active > a:hover,\n.navbar-default .navbar-nav > .active > a:focus {\n  color: #fff;\n  background-color: #00672c;\n}\n.navbar-default .navbar-nav > .disabled > a,\n.navbar-default .navbar-nav > .disabled > a:hover,\n.navbar-default .navbar-nav > .disabled > a:focus {\n  color: #ccc;\n  background-color: transparent;\n}\n.navbar-default .navbar-toggle {\n  border-color: #ddd;\n}\n.navbar-default .navbar-toggle:hover,\n.navbar-default .navbar-toggle:focus {\n  background-color: #ddd;\n}\n.navbar-default .navbar-toggle .icon-bar {\n  background-color: #888;\n}\n.navbar-default .navbar-collapse,\n.navbar-default .navbar-form {\n  border-color: #005725;\n}\n.navbar-default .navbar-nav > .open > a,\n.navbar-default .navbar-nav > .open > a:hover,\n.navbar-default .navbar-nav > .open > a:focus {\n  background-color: #00672c;\n  color: #fff;\n}\n@media (max-width: 767px) {\n  .navbar-default .navbar-nav .open .dropdown-menu > li > a {\n    color: #CCC;\n  }\n  .navbar-default .navbar-nav .open .dropdown-menu > li > a:hover,\n  .navbar-default .navbar-nav .open .dropdown-menu > li > a:focus {\n    color: #fff;\n    background-color: transparent;\n  }\n  .navbar-default .navbar-nav .open .dropdown-menu > .active > a,\n  .navbar-default .navbar-nav .open .dropdown-menu > .active > a:hover,\n  .navbar-default .navbar-nav .open .dropdown-menu > .active > a:focus {\n    color: #fff;\n    background-color: #00672c;\n  }\n  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a,\n  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:hover,\n  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:focus {\n    color: #ccc;\n    background-color: transparent;\n  }\n}\n.navbar-default .navbar-link {\n  color: #CCC;\n}\n.navbar-default .navbar-link:hover {\n  color: #fff;\n}\n.navbar-default .btn-link {\n  color: #CCC;\n}\n.navbar-default .btn-link:hover,\n.navbar-default .btn-link:focus {\n  color: #fff;\n}\n.navbar-default .btn-link[disabled]:hover,\nfieldset[disabled] .navbar-default .btn-link:hover,\n.navbar-default .btn-link[disabled]:focus,\nfieldset[disabled] .navbar-default .btn-link:focus {\n  color: #ccc;\n}\n.navbar-inverse {\n  background-color: #222;\n  border-color: #080808;\n}\n.navbar-inverse .navbar-brand {\n  color: #9d9d9d;\n}\n.navbar-inverse .navbar-brand:hover,\n.navbar-inverse .navbar-brand:focus {\n  color: #fff;\n  background-color: transparent;\n}\n.navbar-inverse .navbar-text {\n  color: #9d9d9d;\n}\n.navbar-inverse .navbar-nav > li > a {\n  color: #9d9d9d;\n}\n.navbar-inverse .navbar-nav > li > a:hover,\n.navbar-inverse .navbar-nav > li > a:focus {\n  color: #fff;\n  background-color: transparent;\n}\n.navbar-inverse .navbar-nav > .active > a,\n.navbar-inverse .navbar-nav > .active > a:hover,\n.navbar-inverse .navbar-nav > .active > a:focus {\n  color: #fff;\n  background-color: #080808;\n}\n.navbar-inverse .navbar-nav > .disabled > a,\n.navbar-inverse .navbar-nav > .disabled > a:hover,\n.navbar-inverse .navbar-nav > .disabled > a:focus {\n  color: #444;\n  background-color: transparent;\n}\n.navbar-inverse .navbar-toggle {\n  border-color: #333;\n}\n.navbar-inverse .navbar-toggle:hover,\n.navbar-inverse .navbar-toggle:focus {\n  background-color: #333;\n}\n.navbar-inverse .navbar-toggle .icon-bar {\n  background-color: #fff;\n}\n.navbar-inverse .navbar-collapse,\n.navbar-inverse .navbar-form {\n  border-color: #101010;\n}\n.navbar-inverse .navbar-nav > .open > a,\n.navbar-inverse .navbar-nav > .open > a:hover,\n.navbar-inverse .navbar-nav > .open > a:focus {\n  background-color: #080808;\n  color: #fff;\n}\n@media (max-width: 767px) {\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .dropdown-header {\n    border-color: #080808;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu .divider {\n    background-color: #080808;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a {\n    color: #9d9d9d;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:hover,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:focus {\n    color: #fff;\n    background-color: transparent;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:hover,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:focus {\n    color: #fff;\n    background-color: #080808;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:hover,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:focus {\n    color: #444;\n    background-color: transparent;\n  }\n}\n.navbar-inverse .navbar-link {\n  color: #9d9d9d;\n}\n.navbar-inverse .navbar-link:hover {\n  color: #fff;\n}\n.navbar-inverse .btn-link {\n  color: #9d9d9d;\n}\n.navbar-inverse .btn-link:hover,\n.navbar-inverse .btn-link:focus {\n  color: #fff;\n}\n.navbar-inverse .btn-link[disabled]:hover,\nfieldset[disabled] .navbar-inverse .btn-link:hover,\n.navbar-inverse .btn-link[disabled]:focus,\nfieldset[disabled] .navbar-inverse .btn-link:focus {\n  color: #444;\n}\n.breadcrumb {\n  padding: 8px 15px;\n  margin-bottom: 20px;\n  list-style: none;\n  background-color: #f5f5f5;\n  border-radius: 4px;\n}\n.breadcrumb > li {\n  display: inline-block;\n}\n.breadcrumb > li + li:before {\n  content: \"/\\A0\";\n  padding: 0 5px;\n  color: #ccc;\n}\n.breadcrumb > .active {\n  color: #777777;\n}\n.pagination {\n  display: inline-block;\n  padding-left: 0;\n  margin: 20px 0;\n  border-radius: 4px;\n}\n.pagination > li {\n  display: inline;\n}\n.pagination > li > a,\n.pagination > li > span {\n  position: relative;\n  float: left;\n  padding: 6px 12px;\n  line-height: 1.42857143;\n  text-decoration: none;\n  color: #007833;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  margin-left: -1px;\n}\n.pagination > li:first-child > a,\n.pagination > li:first-child > span {\n  margin-left: 0;\n  border-bottom-left-radius: 4px;\n  border-top-left-radius: 4px;\n}\n.pagination > li:last-child > a,\n.pagination > li:last-child > span {\n  border-bottom-right-radius: 4px;\n  border-top-right-radius: 4px;\n}\n.pagination > li > a:hover,\n.pagination > li > span:hover,\n.pagination > li > a:focus,\n.pagination > li > span:focus {\n  z-index: 2;\n  color: #002c12;\n  background-color: #eeeeee;\n  border-color: #ddd;\n}\n.pagination > .active > a,\n.pagination > .active > span,\n.pagination > .active > a:hover,\n.pagination > .active > span:hover,\n.pagination > .active > a:focus,\n.pagination > .active > span:focus {\n  z-index: 3;\n  color: #fff;\n  background-color: #007833;\n  border-color: #007833;\n  cursor: default;\n}\n.pagination > .disabled > span,\n.pagination > .disabled > span:hover,\n.pagination > .disabled > span:focus,\n.pagination > .disabled > a,\n.pagination > .disabled > a:hover,\n.pagination > .disabled > a:focus {\n  color: #777777;\n  background-color: #fff;\n  border-color: #ddd;\n  cursor: not-allowed;\n}\n.pagination-lg > li > a,\n.pagination-lg > li > span {\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.3333333;\n}\n.pagination-lg > li:first-child > a,\n.pagination-lg > li:first-child > span {\n  border-bottom-left-radius: 6px;\n  border-top-left-radius: 6px;\n}\n.pagination-lg > li:last-child > a,\n.pagination-lg > li:last-child > span {\n  border-bottom-right-radius: 6px;\n  border-top-right-radius: 6px;\n}\n.pagination-sm > li > a,\n.pagination-sm > li > span {\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n}\n.pagination-sm > li:first-child > a,\n.pagination-sm > li:first-child > span {\n  border-bottom-left-radius: 3px;\n  border-top-left-radius: 3px;\n}\n.pagination-sm > li:last-child > a,\n.pagination-sm > li:last-child > span {\n  border-bottom-right-radius: 3px;\n  border-top-right-radius: 3px;\n}\n.pager {\n  padding-left: 0;\n  margin: 20px 0;\n  list-style: none;\n  text-align: center;\n}\n.pager li {\n  display: inline;\n}\n.pager li > a,\n.pager li > span {\n  display: inline-block;\n  padding: 5px 14px;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 15px;\n}\n.pager li > a:hover,\n.pager li > a:focus {\n  text-decoration: none;\n  background-color: #eeeeee;\n}\n.pager .next > a,\n.pager .next > span {\n  float: right;\n}\n.pager .previous > a,\n.pager .previous > span {\n  float: left;\n}\n.pager .disabled > a,\n.pager .disabled > a:hover,\n.pager .disabled > a:focus,\n.pager .disabled > span {\n  color: #777777;\n  background-color: #fff;\n  cursor: not-allowed;\n}\n.label {\n  display: inline;\n  padding: .2em .6em .3em;\n  font-size: 75%;\n  font-weight: bold;\n  line-height: 1;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: .25em;\n}\na.label:hover,\na.label:focus {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer;\n}\n.label:empty {\n  display: none;\n}\n.btn .label {\n  position: relative;\n  top: -1px;\n}\n.label-default {\n  background-color: #777777;\n}\n.label-default[href]:hover,\n.label-default[href]:focus {\n  background-color: #5e5e5e;\n}\n.label-primary {\n  background-color: #007833;\n}\n.label-primary[href]:hover,\n.label-primary[href]:focus {\n  background-color: #00451d;\n}\n.label-success {\n  background-color: #5cb85c;\n}\n.label-success[href]:hover,\n.label-success[href]:focus {\n  background-color: #449d44;\n}\n.label-info {\n  background-color: #84b641;\n}\n.label-info[href]:hover,\n.label-info[href]:focus {\n  background-color: #699034;\n}\n.label-warning {\n  background-color: #f0ad4e;\n}\n.label-warning[href]:hover,\n.label-warning[href]:focus {\n  background-color: #ec971f;\n}\n.label-danger {\n  background-color: #d9534f;\n}\n.label-danger[href]:hover,\n.label-danger[href]:focus {\n  background-color: #c9302c;\n}\n.badge {\n  display: inline-block;\n  min-width: 10px;\n  padding: 3px 7px;\n  font-size: 12px;\n  font-weight: bold;\n  color: #fff;\n  line-height: 1;\n  vertical-align: middle;\n  white-space: nowrap;\n  text-align: center;\n  background-color: #777777;\n  border-radius: 10px;\n}\n.badge:empty {\n  display: none;\n}\n.btn .badge {\n  position: relative;\n  top: -1px;\n}\n.btn-xs .badge,\n.btn-group-xs > .btn .badge {\n  top: 0;\n  padding: 1px 5px;\n}\na.badge:hover,\na.badge:focus {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer;\n}\n.list-group-item.active > .badge,\n.nav-pills > .active > a > .badge {\n  color: #007833;\n  background-color: #fff;\n}\n.list-group-item > .badge {\n  float: right;\n}\n.list-group-item > .badge + .badge {\n  margin-right: 5px;\n}\n.nav-pills > li > a > .badge {\n  margin-left: 3px;\n}\n.jumbotron {\n  padding-top: 30px;\n  padding-bottom: 30px;\n  margin-bottom: 30px;\n  color: inherit;\n  background-color: #eeeeee;\n}\n.jumbotron h1,\n.jumbotron .h1 {\n  color: inherit;\n}\n.jumbotron p {\n  margin-bottom: 15px;\n  font-size: 21px;\n  font-weight: 200;\n}\n.jumbotron > hr {\n  border-top-color: #d5d5d5;\n}\n.container .jumbotron,\n.container-fluid .jumbotron {\n  border-radius: 6px;\n  padding-left: 15px;\n  padding-right: 15px;\n}\n.jumbotron .container {\n  max-width: 100%;\n}\n@media screen and (min-width: 768px) {\n  .jumbotron {\n    padding-top: 48px;\n    padding-bottom: 48px;\n  }\n  .container .jumbotron,\n  .container-fluid .jumbotron {\n    padding-left: 60px;\n    padding-right: 60px;\n  }\n  .jumbotron h1,\n  .jumbotron .h1 {\n    font-size: 63px;\n  }\n}\n.thumbnail {\n  display: block;\n  padding: 4px;\n  margin-bottom: 20px;\n  line-height: 1.42857143;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  -webkit-transition: border 0.2s ease-in-out;\n  -o-transition: border 0.2s ease-in-out;\n  transition: border 0.2s ease-in-out;\n}\n.thumbnail > img,\n.thumbnail a > img {\n  margin-left: auto;\n  margin-right: auto;\n}\na.thumbnail:hover,\na.thumbnail:focus,\na.thumbnail.active {\n  border-color: #007833;\n}\n.thumbnail .caption {\n  padding: 9px;\n  color: #333333;\n}\n.alert {\n  padding: 15px;\n  margin-bottom: 20px;\n  border: 1px solid transparent;\n  border-radius: 4px;\n}\n.alert h4 {\n  margin-top: 0;\n  color: inherit;\n}\n.alert .alert-link {\n  font-weight: bold;\n}\n.alert > p,\n.alert > ul {\n  margin-bottom: 0;\n}\n.alert > p + p {\n  margin-top: 5px;\n}\n.alert-dismissable,\n.alert-dismissible {\n  padding-right: 35px;\n}\n.alert-dismissable .close,\n.alert-dismissible .close {\n  position: relative;\n  top: -2px;\n  right: -21px;\n  color: inherit;\n}\n.alert-success {\n  background-color: #dff0d8;\n  border-color: #d6e9c6;\n  color: #3c763d;\n}\n.alert-success hr {\n  border-top-color: #c9e2b3;\n}\n.alert-success .alert-link {\n  color: #2b542c;\n}\n.alert-info {\n  background-color: #d9edf7;\n  border-color: #bce8f1;\n  color: #31708f;\n}\n.alert-info hr {\n  border-top-color: #a6e1ec;\n}\n.alert-info .alert-link {\n  color: #245269;\n}\n.alert-warning {\n  background-color: #fcf8e3;\n  border-color: #faebcc;\n  color: #8a6d3b;\n}\n.alert-warning hr {\n  border-top-color: #f7e1b5;\n}\n.alert-warning .alert-link {\n  color: #66512c;\n}\n.alert-danger {\n  background-color: #f2dede;\n  border-color: #ebccd1;\n  color: #a94442;\n}\n.alert-danger hr {\n  border-top-color: #e4b9c0;\n}\n.alert-danger .alert-link {\n  color: #843534;\n}\n@-webkit-keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n.progress {\n  overflow: hidden;\n  height: 20px;\n  margin-bottom: 20px;\n  background-color: #f5f5f5;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\n}\n.progress-bar {\n  float: left;\n  width: 0%;\n  height: 100%;\n  font-size: 12px;\n  line-height: 20px;\n  color: #fff;\n  text-align: center;\n  background-color: #007833;\n  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n  -webkit-transition: width 0.6s ease;\n  -o-transition: width 0.6s ease;\n  transition: width 0.6s ease;\n}\n.progress-striped .progress-bar,\n.progress-bar-striped {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 40px 40px;\n}\n.progress.active .progress-bar,\n.progress-bar.active {\n  -webkit-animation: progress-bar-stripes 2s linear infinite;\n  -o-animation: progress-bar-stripes 2s linear infinite;\n  animation: progress-bar-stripes 2s linear infinite;\n}\n.progress-bar-success {\n  background-color: #5cb85c;\n}\n.progress-striped .progress-bar-success {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n}\n.progress-bar-info {\n  background-color: #84b641;\n}\n.progress-striped .progress-bar-info {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n}\n.progress-bar-warning {\n  background-color: #f0ad4e;\n}\n.progress-striped .progress-bar-warning {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n}\n.progress-bar-danger {\n  background-color: #d9534f;\n}\n.progress-striped .progress-bar-danger {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n}\n.media {\n  margin-top: 15px;\n}\n.media:first-child {\n  margin-top: 0;\n}\n.media,\n.media-body {\n  zoom: 1;\n  overflow: hidden;\n}\n.media-body {\n  width: 10000px;\n}\n.media-object {\n  display: block;\n}\n.media-object.img-thumbnail {\n  max-width: none;\n}\n.media-right,\n.media > .pull-right {\n  padding-left: 10px;\n}\n.media-left,\n.media > .pull-left {\n  padding-right: 10px;\n}\n.media-left,\n.media-right,\n.media-body {\n  display: table-cell;\n  vertical-align: top;\n}\n.media-middle {\n  vertical-align: middle;\n}\n.media-bottom {\n  vertical-align: bottom;\n}\n.media-heading {\n  margin-top: 0;\n  margin-bottom: 5px;\n}\n.media-list {\n  padding-left: 0;\n  list-style: none;\n}\n.list-group {\n  margin-bottom: 20px;\n  padding-left: 0;\n}\n.list-group-item {\n  position: relative;\n  display: block;\n  padding: 10px 15px;\n  margin-bottom: -1px;\n  background-color: #fff;\n  border: 1px solid #ddd;\n}\n.list-group-item:first-child {\n  border-top-right-radius: 4px;\n  border-top-left-radius: 4px;\n}\n.list-group-item:last-child {\n  margin-bottom: 0;\n  border-bottom-right-radius: 4px;\n  border-bottom-left-radius: 4px;\n}\na.list-group-item,\nbutton.list-group-item {\n  color: #555;\n}\na.list-group-item .list-group-item-heading,\nbutton.list-group-item .list-group-item-heading {\n  color: #333;\n}\na.list-group-item:hover,\nbutton.list-group-item:hover,\na.list-group-item:focus,\nbutton.list-group-item:focus {\n  text-decoration: none;\n  color: #555;\n  background-color: #f5f5f5;\n}\nbutton.list-group-item {\n  width: 100%;\n  text-align: left;\n}\n.list-group-item.disabled,\n.list-group-item.disabled:hover,\n.list-group-item.disabled:focus {\n  background-color: #eeeeee;\n  color: #777777;\n  cursor: not-allowed;\n}\n.list-group-item.disabled .list-group-item-heading,\n.list-group-item.disabled:hover .list-group-item-heading,\n.list-group-item.disabled:focus .list-group-item-heading {\n  color: inherit;\n}\n.list-group-item.disabled .list-group-item-text,\n.list-group-item.disabled:hover .list-group-item-text,\n.list-group-item.disabled:focus .list-group-item-text {\n  color: #777777;\n}\n.list-group-item.active,\n.list-group-item.active:hover,\n.list-group-item.active:focus {\n  z-index: 2;\n  color: #fff;\n  background-color: #007833;\n  border-color: #007833;\n}\n.list-group-item.active .list-group-item-heading,\n.list-group-item.active:hover .list-group-item-heading,\n.list-group-item.active:focus .list-group-item-heading,\n.list-group-item.active .list-group-item-heading > small,\n.list-group-item.active:hover .list-group-item-heading > small,\n.list-group-item.active:focus .list-group-item-heading > small,\n.list-group-item.active .list-group-item-heading > .small,\n.list-group-item.active:hover .list-group-item-heading > .small,\n.list-group-item.active:focus .list-group-item-heading > .small {\n  color: inherit;\n}\n.list-group-item.active .list-group-item-text,\n.list-group-item.active:hover .list-group-item-text,\n.list-group-item.active:focus .list-group-item-text {\n  color: #45ff94;\n}\n.list-group-item-success {\n  color: #3c763d;\n  background-color: #dff0d8;\n}\na.list-group-item-success,\nbutton.list-group-item-success {\n  color: #3c763d;\n}\na.list-group-item-success .list-group-item-heading,\nbutton.list-group-item-success .list-group-item-heading {\n  color: inherit;\n}\na.list-group-item-success:hover,\nbutton.list-group-item-success:hover,\na.list-group-item-success:focus,\nbutton.list-group-item-success:focus {\n  color: #3c763d;\n  background-color: #d0e9c6;\n}\na.list-group-item-success.active,\nbutton.list-group-item-success.active,\na.list-group-item-success.active:hover,\nbutton.list-group-item-success.active:hover,\na.list-group-item-success.active:focus,\nbutton.list-group-item-success.active:focus {\n  color: #fff;\n  background-color: #3c763d;\n  border-color: #3c763d;\n}\n.list-group-item-info {\n  color: #31708f;\n  background-color: #d9edf7;\n}\na.list-group-item-info,\nbutton.list-group-item-info {\n  color: #31708f;\n}\na.list-group-item-info .list-group-item-heading,\nbutton.list-group-item-info .list-group-item-heading {\n  color: inherit;\n}\na.list-group-item-info:hover,\nbutton.list-group-item-info:hover,\na.list-group-item-info:focus,\nbutton.list-group-item-info:focus {\n  color: #31708f;\n  background-color: #c4e3f3;\n}\na.list-group-item-info.active,\nbutton.list-group-item-info.active,\na.list-group-item-info.active:hover,\nbutton.list-group-item-info.active:hover,\na.list-group-item-info.active:focus,\nbutton.list-group-item-info.active:focus {\n  color: #fff;\n  background-color: #31708f;\n  border-color: #31708f;\n}\n.list-group-item-warning {\n  color: #8a6d3b;\n  background-color: #fcf8e3;\n}\na.list-group-item-warning,\nbutton.list-group-item-warning {\n  color: #8a6d3b;\n}\na.list-group-item-warning .list-group-item-heading,\nbutton.list-group-item-warning .list-group-item-heading {\n  color: inherit;\n}\na.list-group-item-warning:hover,\nbutton.list-group-item-warning:hover,\na.list-group-item-warning:focus,\nbutton.list-group-item-warning:focus {\n  color: #8a6d3b;\n  background-color: #faf2cc;\n}\na.list-group-item-warning.active,\nbutton.list-group-item-warning.active,\na.list-group-item-warning.active:hover,\nbutton.list-group-item-warning.active:hover,\na.list-group-item-warning.active:focus,\nbutton.list-group-item-warning.active:focus {\n  color: #fff;\n  background-color: #8a6d3b;\n  border-color: #8a6d3b;\n}\n.list-group-item-danger {\n  color: #a94442;\n  background-color: #f2dede;\n}\na.list-group-item-danger,\nbutton.list-group-item-danger {\n  color: #a94442;\n}\na.list-group-item-danger .list-group-item-heading,\nbutton.list-group-item-danger .list-group-item-heading {\n  color: inherit;\n}\na.list-group-item-danger:hover,\nbutton.list-group-item-danger:hover,\na.list-group-item-danger:focus,\nbutton.list-group-item-danger:focus {\n  color: #a94442;\n  background-color: #ebcccc;\n}\na.list-group-item-danger.active,\nbutton.list-group-item-danger.active,\na.list-group-item-danger.active:hover,\nbutton.list-group-item-danger.active:hover,\na.list-group-item-danger.active:focus,\nbutton.list-group-item-danger.active:focus {\n  color: #fff;\n  background-color: #a94442;\n  border-color: #a94442;\n}\n.list-group-item-heading {\n  margin-top: 0;\n  margin-bottom: 5px;\n}\n.list-group-item-text {\n  margin-bottom: 0;\n  line-height: 1.3;\n}\n.panel {\n  margin-bottom: 20px;\n  background-color: #fff;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);\n}\n.panel-body {\n  padding: 15px;\n}\n.panel-heading {\n  padding: 10px 15px;\n  border-bottom: 1px solid transparent;\n  border-top-right-radius: 3px;\n  border-top-left-radius: 3px;\n}\n.panel-heading > .dropdown .dropdown-toggle {\n  color: inherit;\n}\n.panel-title {\n  margin-top: 0;\n  margin-bottom: 0;\n  font-size: 16px;\n  color: inherit;\n}\n.panel-title > a,\n.panel-title > small,\n.panel-title > .small,\n.panel-title > small > a,\n.panel-title > .small > a {\n  color: inherit;\n}\n.panel-footer {\n  padding: 10px 15px;\n  background-color: #f5f5f5;\n  border-top: 1px solid #ddd;\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n.panel > .list-group,\n.panel > .panel-collapse > .list-group {\n  margin-bottom: 0;\n}\n.panel > .list-group .list-group-item,\n.panel > .panel-collapse > .list-group .list-group-item {\n  border-width: 1px 0;\n  border-radius: 0;\n}\n.panel > .list-group:first-child .list-group-item:first-child,\n.panel > .panel-collapse > .list-group:first-child .list-group-item:first-child {\n  border-top: 0;\n  border-top-right-radius: 3px;\n  border-top-left-radius: 3px;\n}\n.panel > .list-group:last-child .list-group-item:last-child,\n.panel > .panel-collapse > .list-group:last-child .list-group-item:last-child {\n  border-bottom: 0;\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n.panel > .panel-heading + .panel-collapse > .list-group .list-group-item:first-child {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n.panel-heading + .list-group .list-group-item:first-child {\n  border-top-width: 0;\n}\n.list-group + .panel-footer {\n  border-top-width: 0;\n}\n.panel > .table,\n.panel > .table-responsive > .table,\n.panel > .panel-collapse > .table {\n  margin-bottom: 0;\n}\n.panel > .table caption,\n.panel > .table-responsive > .table caption,\n.panel > .panel-collapse > .table caption {\n  padding-left: 15px;\n  padding-right: 15px;\n}\n.panel > .table:first-child,\n.panel > .table-responsive:first-child > .table:first-child {\n  border-top-right-radius: 3px;\n  border-top-left-radius: 3px;\n}\n.panel > .table:first-child > thead:first-child > tr:first-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child {\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n}\n.panel > .table:first-child > thead:first-child > tr:first-child td:first-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:first-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child td:first-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:first-child,\n.panel > .table:first-child > thead:first-child > tr:first-child th:first-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:first-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child th:first-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:first-child {\n  border-top-left-radius: 3px;\n}\n.panel > .table:first-child > thead:first-child > tr:first-child td:last-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:last-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child td:last-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:last-child,\n.panel > .table:first-child > thead:first-child > tr:first-child th:last-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:last-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child th:last-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:last-child {\n  border-top-right-radius: 3px;\n}\n.panel > .table:last-child,\n.panel > .table-responsive:last-child > .table:last-child {\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n.panel > .table:last-child > tbody:last-child > tr:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child {\n  border-bottom-left-radius: 3px;\n  border-bottom-right-radius: 3px;\n}\n.panel > .table:last-child > tbody:last-child > tr:last-child td:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:first-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child td:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:first-child,\n.panel > .table:last-child > tbody:last-child > tr:last-child th:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:first-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child th:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:first-child {\n  border-bottom-left-radius: 3px;\n}\n.panel > .table:last-child > tbody:last-child > tr:last-child td:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:last-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child td:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:last-child,\n.panel > .table:last-child > tbody:last-child > tr:last-child th:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:last-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child th:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:last-child {\n  border-bottom-right-radius: 3px;\n}\n.panel > .panel-body + .table,\n.panel > .panel-body + .table-responsive,\n.panel > .table + .panel-body,\n.panel > .table-responsive + .panel-body {\n  border-top: 1px solid #ddd;\n}\n.panel > .table > tbody:first-child > tr:first-child th,\n.panel > .table > tbody:first-child > tr:first-child td {\n  border-top: 0;\n}\n.panel > .table-bordered,\n.panel > .table-responsive > .table-bordered {\n  border: 0;\n}\n.panel > .table-bordered > thead > tr > th:first-child,\n.panel > .table-responsive > .table-bordered > thead > tr > th:first-child,\n.panel > .table-bordered > tbody > tr > th:first-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > th:first-child,\n.panel > .table-bordered > tfoot > tr > th:first-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > th:first-child,\n.panel > .table-bordered > thead > tr > td:first-child,\n.panel > .table-responsive > .table-bordered > thead > tr > td:first-child,\n.panel > .table-bordered > tbody > tr > td:first-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > td:first-child,\n.panel > .table-bordered > tfoot > tr > td:first-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > td:first-child {\n  border-left: 0;\n}\n.panel > .table-bordered > thead > tr > th:last-child,\n.panel > .table-responsive > .table-bordered > thead > tr > th:last-child,\n.panel > .table-bordered > tbody > tr > th:last-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > th:last-child,\n.panel > .table-bordered > tfoot > tr > th:last-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > th:last-child,\n.panel > .table-bordered > thead > tr > td:last-child,\n.panel > .table-responsive > .table-bordered > thead > tr > td:last-child,\n.panel > .table-bordered > tbody > tr > td:last-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > td:last-child,\n.panel > .table-bordered > tfoot > tr > td:last-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > td:last-child {\n  border-right: 0;\n}\n.panel > .table-bordered > thead > tr:first-child > td,\n.panel > .table-responsive > .table-bordered > thead > tr:first-child > td,\n.panel > .table-bordered > tbody > tr:first-child > td,\n.panel > .table-responsive > .table-bordered > tbody > tr:first-child > td,\n.panel > .table-bordered > thead > tr:first-child > th,\n.panel > .table-responsive > .table-bordered > thead > tr:first-child > th,\n.panel > .table-bordered > tbody > tr:first-child > th,\n.panel > .table-responsive > .table-bordered > tbody > tr:first-child > th {\n  border-bottom: 0;\n}\n.panel > .table-bordered > tbody > tr:last-child > td,\n.panel > .table-responsive > .table-bordered > tbody > tr:last-child > td,\n.panel > .table-bordered > tfoot > tr:last-child > td,\n.panel > .table-responsive > .table-bordered > tfoot > tr:last-child > td,\n.panel > .table-bordered > tbody > tr:last-child > th,\n.panel > .table-responsive > .table-bordered > tbody > tr:last-child > th,\n.panel > .table-bordered > tfoot > tr:last-child > th,\n.panel > .table-responsive > .table-bordered > tfoot > tr:last-child > th {\n  border-bottom: 0;\n}\n.panel > .table-responsive {\n  border: 0;\n  margin-bottom: 0;\n}\n.panel-group {\n  margin-bottom: 20px;\n}\n.panel-group .panel {\n  margin-bottom: 0;\n  border-radius: 4px;\n}\n.panel-group .panel + .panel {\n  margin-top: 5px;\n}\n.panel-group .panel-heading {\n  border-bottom: 0;\n}\n.panel-group .panel-heading + .panel-collapse > .panel-body,\n.panel-group .panel-heading + .panel-collapse > .list-group {\n  border-top: 1px solid #ddd;\n}\n.panel-group .panel-footer {\n  border-top: 0;\n}\n.panel-group .panel-footer + .panel-collapse .panel-body {\n  border-bottom: 1px solid #ddd;\n}\n.panel-default {\n  border-color: #ddd;\n}\n.panel-default > .panel-heading {\n  color: #333333;\n  background-color: #f5f5f5;\n  border-color: #ddd;\n}\n.panel-default > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #ddd;\n}\n.panel-default > .panel-heading .badge {\n  color: #f5f5f5;\n  background-color: #333333;\n}\n.panel-default > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #ddd;\n}\n.panel-primary {\n  border-color: #007833;\n}\n.panel-primary > .panel-heading {\n  color: #fff;\n  background-color: #007833;\n  border-color: #007833;\n}\n.panel-primary > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #007833;\n}\n.panel-primary > .panel-heading .badge {\n  color: #007833;\n  background-color: #fff;\n}\n.panel-primary > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #007833;\n}\n.panel-success {\n  border-color: #d6e9c6;\n}\n.panel-success > .panel-heading {\n  color: #3c763d;\n  background-color: #dff0d8;\n  border-color: #d6e9c6;\n}\n.panel-success > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #d6e9c6;\n}\n.panel-success > .panel-heading .badge {\n  color: #dff0d8;\n  background-color: #3c763d;\n}\n.panel-success > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #d6e9c6;\n}\n.panel-info {\n  border-color: #bce8f1;\n}\n.panel-info > .panel-heading {\n  color: #31708f;\n  background-color: #d9edf7;\n  border-color: #bce8f1;\n}\n.panel-info > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #bce8f1;\n}\n.panel-info > .panel-heading .badge {\n  color: #d9edf7;\n  background-color: #31708f;\n}\n.panel-info > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #bce8f1;\n}\n.panel-warning {\n  border-color: #faebcc;\n}\n.panel-warning > .panel-heading {\n  color: #8a6d3b;\n  background-color: #fcf8e3;\n  border-color: #faebcc;\n}\n.panel-warning > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #faebcc;\n}\n.panel-warning > .panel-heading .badge {\n  color: #fcf8e3;\n  background-color: #8a6d3b;\n}\n.panel-warning > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #faebcc;\n}\n.panel-danger {\n  border-color: #ebccd1;\n}\n.panel-danger > .panel-heading {\n  color: #a94442;\n  background-color: #f2dede;\n  border-color: #ebccd1;\n}\n.panel-danger > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #ebccd1;\n}\n.panel-danger > .panel-heading .badge {\n  color: #f2dede;\n  background-color: #a94442;\n}\n.panel-danger > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #ebccd1;\n}\n.well {\n  min-height: 20px;\n  padding: 19px;\n  margin-bottom: 20px;\n  background-color: #f5f5f5;\n  border: 1px solid #e3e3e3;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);\n}\n.well blockquote {\n  border-color: #ddd;\n  border-color: rgba(0, 0, 0, 0.15);\n}\n.well-lg {\n  padding: 24px;\n  border-radius: 6px;\n}\n.well-sm {\n  padding: 9px;\n  border-radius: 3px;\n}\n.close {\n  float: right;\n  font-size: 21px;\n  font-weight: bold;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  opacity: 0.2;\n  filter: alpha(opacity=20);\n}\n.close:hover,\n.close:focus {\n  color: #000;\n  text-decoration: none;\n  cursor: pointer;\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n}\nbutton.close {\n  padding: 0;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  -webkit-appearance: none;\n}\n.modal-open {\n  overflow: hidden;\n}\n.modal {\n  display: none;\n  overflow: hidden;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1050;\n  -webkit-overflow-scrolling: touch;\n  outline: 0;\n}\n.modal.fade .modal-dialog {\n  -webkit-transform: translate(0, -25%);\n  -ms-transform: translate(0, -25%);\n  -o-transform: translate(0, -25%);\n  transform: translate(0, -25%);\n  -webkit-transition: -webkit-transform 0.3s ease-out;\n  -moz-transition: -moz-transform 0.3s ease-out;\n  -o-transition: -o-transform 0.3s ease-out;\n  transition: transform 0.3s ease-out;\n}\n.modal.in .modal-dialog {\n  -webkit-transform: translate(0, 0);\n  -ms-transform: translate(0, 0);\n  -o-transform: translate(0, 0);\n  transform: translate(0, 0);\n}\n.modal-open .modal {\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.modal-dialog {\n  position: relative;\n  width: auto;\n  margin: 10px;\n}\n.modal-content {\n  position: relative;\n  background-color: #fff;\n  border: 1px solid #999;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 6px;\n  -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);\n  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);\n  background-clip: padding-box;\n  outline: 0;\n}\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  background-color: #000;\n}\n.modal-backdrop.fade {\n  opacity: 0;\n  filter: alpha(opacity=0);\n}\n.modal-backdrop.in {\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n}\n.modal-header {\n  padding: 15px;\n  border-bottom: 1px solid #e5e5e5;\n}\n.modal-header .close {\n  margin-top: -2px;\n}\n.modal-title {\n  margin: 0;\n  line-height: 1.42857143;\n}\n.modal-body {\n  position: relative;\n  padding: 15px;\n}\n.modal-footer {\n  padding: 15px;\n  text-align: right;\n  border-top: 1px solid #e5e5e5;\n}\n.modal-footer .btn + .btn {\n  margin-left: 5px;\n  margin-bottom: 0;\n}\n.modal-footer .btn-group .btn + .btn {\n  margin-left: -1px;\n}\n.modal-footer .btn-block + .btn-block {\n  margin-left: 0;\n}\n.modal-scrollbar-measure {\n  position: absolute;\n  top: -9999px;\n  width: 50px;\n  height: 50px;\n  overflow: scroll;\n}\n@media (min-width: 768px) {\n  .modal-dialog {\n    width: 600px;\n    margin: 30px auto;\n  }\n  .modal-content {\n    -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);\n  }\n  .modal-sm {\n    width: 300px;\n  }\n}\n@media (min-width: 992px) {\n  .modal-lg {\n    width: 900px;\n  }\n}\n.tooltip {\n  position: absolute;\n  z-index: 1070;\n  display: block;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.42857143;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  word-wrap: normal;\n  font-size: 12px;\n  opacity: 0;\n  filter: alpha(opacity=0);\n}\n.tooltip.in {\n  opacity: 0.9;\n  filter: alpha(opacity=90);\n}\n.tooltip.top {\n  margin-top: -3px;\n  padding: 5px 0;\n}\n.tooltip.right {\n  margin-left: 3px;\n  padding: 0 5px;\n}\n.tooltip.bottom {\n  margin-top: 3px;\n  padding: 5px 0;\n}\n.tooltip.left {\n  margin-left: -3px;\n  padding: 0 5px;\n}\n.tooltip-inner {\n  max-width: 200px;\n  padding: 3px 8px;\n  color: #fff;\n  text-align: center;\n  background-color: #000;\n  border-radius: 4px;\n}\n.tooltip-arrow {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n}\n.tooltip.top .tooltip-arrow {\n  bottom: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000;\n}\n.tooltip.top-left .tooltip-arrow {\n  bottom: 0;\n  right: 5px;\n  margin-bottom: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000;\n}\n.tooltip.top-right .tooltip-arrow {\n  bottom: 0;\n  left: 5px;\n  margin-bottom: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000;\n}\n.tooltip.right .tooltip-arrow {\n  top: 50%;\n  left: 0;\n  margin-top: -5px;\n  border-width: 5px 5px 5px 0;\n  border-right-color: #000;\n}\n.tooltip.left .tooltip-arrow {\n  top: 50%;\n  right: 0;\n  margin-top: -5px;\n  border-width: 5px 0 5px 5px;\n  border-left-color: #000;\n}\n.tooltip.bottom .tooltip-arrow {\n  top: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000;\n}\n.tooltip.bottom-left .tooltip-arrow {\n  top: 0;\n  right: 5px;\n  margin-top: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000;\n}\n.tooltip.bottom-right .tooltip-arrow {\n  top: 0;\n  left: 5px;\n  margin-top: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000;\n}\n.popover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1060;\n  display: none;\n  max-width: 276px;\n  padding: 1px;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.42857143;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  word-wrap: normal;\n  font-size: 14px;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid #ccc;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 6px;\n  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n}\n.popover.top {\n  margin-top: -10px;\n}\n.popover.right {\n  margin-left: 10px;\n}\n.popover.bottom {\n  margin-top: 10px;\n}\n.popover.left {\n  margin-left: -10px;\n}\n.popover-title {\n  margin: 0;\n  padding: 8px 14px;\n  font-size: 14px;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #ebebeb;\n  border-radius: 5px 5px 0 0;\n}\n.popover-content {\n  padding: 9px 14px;\n}\n.popover > .arrow,\n.popover > .arrow:after {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n}\n.popover > .arrow {\n  border-width: 11px;\n}\n.popover > .arrow:after {\n  border-width: 10px;\n  content: \"\";\n}\n.popover.top > .arrow {\n  left: 50%;\n  margin-left: -11px;\n  border-bottom-width: 0;\n  border-top-color: #999999;\n  border-top-color: rgba(0, 0, 0, 0.25);\n  bottom: -11px;\n}\n.popover.top > .arrow:after {\n  content: \" \";\n  bottom: 1px;\n  margin-left: -10px;\n  border-bottom-width: 0;\n  border-top-color: #fff;\n}\n.popover.right > .arrow {\n  top: 50%;\n  left: -11px;\n  margin-top: -11px;\n  border-left-width: 0;\n  border-right-color: #999999;\n  border-right-color: rgba(0, 0, 0, 0.25);\n}\n.popover.right > .arrow:after {\n  content: \" \";\n  left: 1px;\n  bottom: -10px;\n  border-left-width: 0;\n  border-right-color: #fff;\n}\n.popover.bottom > .arrow {\n  left: 50%;\n  margin-left: -11px;\n  border-top-width: 0;\n  border-bottom-color: #999999;\n  border-bottom-color: rgba(0, 0, 0, 0.25);\n  top: -11px;\n}\n.popover.bottom > .arrow:after {\n  content: \" \";\n  top: 1px;\n  margin-left: -10px;\n  border-top-width: 0;\n  border-bottom-color: #fff;\n}\n.popover.left > .arrow {\n  top: 50%;\n  right: -11px;\n  margin-top: -11px;\n  border-right-width: 0;\n  border-left-color: #999999;\n  border-left-color: rgba(0, 0, 0, 0.25);\n}\n.popover.left > .arrow:after {\n  content: \" \";\n  right: 1px;\n  border-right-width: 0;\n  border-left-color: #fff;\n  bottom: -10px;\n}\n.carousel {\n  position: relative;\n}\n.carousel-inner {\n  position: relative;\n  overflow: hidden;\n  width: 100%;\n}\n.carousel-inner > .item {\n  display: none;\n  position: relative;\n  -webkit-transition: 0.6s ease-in-out left;\n  -o-transition: 0.6s ease-in-out left;\n  transition: 0.6s ease-in-out left;\n}\n.carousel-inner > .item > img,\n.carousel-inner > .item > a > img {\n  line-height: 1;\n}\n@media all and (transform-3d), (-webkit-transform-3d) {\n  .carousel-inner > .item {\n    -webkit-transition: -webkit-transform 0.6s ease-in-out;\n    -moz-transition: -moz-transform 0.6s ease-in-out;\n    -o-transition: -o-transform 0.6s ease-in-out;\n    transition: transform 0.6s ease-in-out;\n    -webkit-backface-visibility: hidden;\n    -moz-backface-visibility: hidden;\n    backface-visibility: hidden;\n    -webkit-perspective: 1000px;\n    -moz-perspective: 1000px;\n    perspective: 1000px;\n  }\n  .carousel-inner > .item.next,\n  .carousel-inner > .item.active.right {\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n    left: 0;\n  }\n  .carousel-inner > .item.prev,\n  .carousel-inner > .item.active.left {\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n    left: 0;\n  }\n  .carousel-inner > .item.next.left,\n  .carousel-inner > .item.prev.right,\n  .carousel-inner > .item.active {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n    left: 0;\n  }\n}\n.carousel-inner > .active,\n.carousel-inner > .next,\n.carousel-inner > .prev {\n  display: block;\n}\n.carousel-inner > .active {\n  left: 0;\n}\n.carousel-inner > .next,\n.carousel-inner > .prev {\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n.carousel-inner > .next {\n  left: 100%;\n}\n.carousel-inner > .prev {\n  left: -100%;\n}\n.carousel-inner > .next.left,\n.carousel-inner > .prev.right {\n  left: 0;\n}\n.carousel-inner > .active.left {\n  left: -100%;\n}\n.carousel-inner > .active.right {\n  left: 100%;\n}\n.carousel-control {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 15%;\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n  font-size: 20px;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);\n  background-color: rgba(0, 0, 0, 0);\n}\n.carousel-control.left {\n  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n  background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1);\n}\n.carousel-control.right {\n  left: auto;\n  right: 0;\n  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n  background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1);\n}\n.carousel-control:hover,\n.carousel-control:focus {\n  outline: 0;\n  color: #fff;\n  text-decoration: none;\n  opacity: 0.9;\n  filter: alpha(opacity=90);\n}\n.carousel-control .icon-prev,\n.carousel-control .icon-next,\n.carousel-control .glyphicon-chevron-left,\n.carousel-control .glyphicon-chevron-right {\n  position: absolute;\n  top: 50%;\n  margin-top: -10px;\n  z-index: 5;\n  display: inline-block;\n}\n.carousel-control .icon-prev,\n.carousel-control .glyphicon-chevron-left {\n  left: 50%;\n  margin-left: -10px;\n}\n.carousel-control .icon-next,\n.carousel-control .glyphicon-chevron-right {\n  right: 50%;\n  margin-right: -10px;\n}\n.carousel-control .icon-prev,\n.carousel-control .icon-next {\n  width: 20px;\n  height: 20px;\n  line-height: 1;\n  font-family: serif;\n}\n.carousel-control .icon-prev:before {\n  content: '\\2039';\n}\n.carousel-control .icon-next:before {\n  content: '\\203A';\n}\n.carousel-indicators {\n  position: absolute;\n  bottom: 10px;\n  left: 50%;\n  z-index: 15;\n  width: 60%;\n  margin-left: -30%;\n  padding-left: 0;\n  list-style: none;\n  text-align: center;\n}\n.carousel-indicators li {\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  margin: 1px;\n  text-indent: -999px;\n  border: 1px solid #fff;\n  border-radius: 10px;\n  cursor: pointer;\n  background-color: #000 \\9;\n  background-color: rgba(0, 0, 0, 0);\n}\n.carousel-indicators .active {\n  margin: 0;\n  width: 12px;\n  height: 12px;\n  background-color: #fff;\n}\n.carousel-caption {\n  position: absolute;\n  left: 15%;\n  right: 15%;\n  bottom: 20px;\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);\n}\n.carousel-caption .btn {\n  text-shadow: none;\n}\n@media screen and (min-width: 768px) {\n  .carousel-control .glyphicon-chevron-left,\n  .carousel-control .glyphicon-chevron-right,\n  .carousel-control .icon-prev,\n  .carousel-control .icon-next {\n    width: 30px;\n    height: 30px;\n    margin-top: -10px;\n    font-size: 30px;\n  }\n  .carousel-control .glyphicon-chevron-left,\n  .carousel-control .icon-prev {\n    margin-left: -10px;\n  }\n  .carousel-control .glyphicon-chevron-right,\n  .carousel-control .icon-next {\n    margin-right: -10px;\n  }\n  .carousel-caption {\n    left: 20%;\n    right: 20%;\n    padding-bottom: 30px;\n  }\n  .carousel-indicators {\n    bottom: 20px;\n  }\n}\n.clearfix:before,\n.clearfix:after,\n.dl-horizontal dd:before,\n.dl-horizontal dd:after,\n.container:before,\n.container:after,\n.container-fluid:before,\n.container-fluid:after,\n.row:before,\n.row:after,\n.form-horizontal .form-group:before,\n.form-horizontal .form-group:after,\n.btn-toolbar:before,\n.btn-toolbar:after,\n.btn-group-vertical > .btn-group:before,\n.btn-group-vertical > .btn-group:after,\n.nav:before,\n.nav:after,\n.navbar:before,\n.navbar:after,\n.navbar-header:before,\n.navbar-header:after,\n.navbar-collapse:before,\n.navbar-collapse:after,\n.pager:before,\n.pager:after,\n.panel-body:before,\n.panel-body:after,\n.modal-header:before,\n.modal-header:after,\n.modal-footer:before,\n.modal-footer:after {\n  content: \" \";\n  display: table;\n}\n.clearfix:after,\n.dl-horizontal dd:after,\n.container:after,\n.container-fluid:after,\n.row:after,\n.form-horizontal .form-group:after,\n.btn-toolbar:after,\n.btn-group-vertical > .btn-group:after,\n.nav:after,\n.navbar:after,\n.navbar-header:after,\n.navbar-collapse:after,\n.pager:after,\n.panel-body:after,\n.modal-header:after,\n.modal-footer:after {\n  clear: both;\n}\n.center-block {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n.pull-right {\n  float: right !important;\n}\n.pull-left {\n  float: left !important;\n}\n.hide {\n  display: none !important;\n}\n.show {\n  display: block !important;\n}\n.invisible {\n  visibility: hidden;\n}\n.text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0;\n}\n.hidden {\n  display: none !important;\n}\n.affix {\n  position: fixed;\n}\n@-ms-viewport {\n  width: device-width;\n}\n.visible-xs,\n.visible-sm,\n.visible-md,\n.visible-lg {\n  display: none !important;\n}\n.visible-xs-block,\n.visible-xs-inline,\n.visible-xs-inline-block,\n.visible-sm-block,\n.visible-sm-inline,\n.visible-sm-inline-block,\n.visible-md-block,\n.visible-md-inline,\n.visible-md-inline-block,\n.visible-lg-block,\n.visible-lg-inline,\n.visible-lg-inline-block {\n  display: none !important;\n}\n@media (max-width: 767px) {\n  .visible-xs {\n    display: block !important;\n  }\n  table.visible-xs {\n    display: table !important;\n  }\n  tr.visible-xs {\n    display: table-row !important;\n  }\n  th.visible-xs,\n  td.visible-xs {\n    display: table-cell !important;\n  }\n}\n@media (max-width: 767px) {\n  .visible-xs-block {\n    display: block !important;\n  }\n}\n@media (max-width: 767px) {\n  .visible-xs-inline {\n    display: inline !important;\n  }\n}\n@media (max-width: 767px) {\n  .visible-xs-inline-block {\n    display: inline-block !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm {\n    display: block !important;\n  }\n  table.visible-sm {\n    display: table !important;\n  }\n  tr.visible-sm {\n    display: table-row !important;\n  }\n  th.visible-sm,\n  td.visible-sm {\n    display: table-cell !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-block {\n    display: block !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-inline {\n    display: inline !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-inline-block {\n    display: inline-block !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md {\n    display: block !important;\n  }\n  table.visible-md {\n    display: table !important;\n  }\n  tr.visible-md {\n    display: table-row !important;\n  }\n  th.visible-md,\n  td.visible-md {\n    display: table-cell !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-block {\n    display: block !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-inline {\n    display: inline !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-inline-block {\n    display: inline-block !important;\n  }\n}\n@media (min-width: 1200px) {\n  .visible-lg {\n    display: block !important;\n  }\n  table.visible-lg {\n    display: table !important;\n  }\n  tr.visible-lg {\n    display: table-row !important;\n  }\n  th.visible-lg,\n  td.visible-lg {\n    display: table-cell !important;\n  }\n}\n@media (min-width: 1200px) {\n  .visible-lg-block {\n    display: block !important;\n  }\n}\n@media (min-width: 1200px) {\n  .visible-lg-inline {\n    display: inline !important;\n  }\n}\n@media (min-width: 1200px) {\n  .visible-lg-inline-block {\n    display: inline-block !important;\n  }\n}\n@media (max-width: 767px) {\n  .hidden-xs {\n    display: none !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .hidden-sm {\n    display: none !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .hidden-md {\n    display: none !important;\n  }\n}\n@media (min-width: 1200px) {\n  .hidden-lg {\n    display: none !important;\n  }\n}\n.visible-print {\n  display: none !important;\n}\n@media print {\n  .visible-print {\n    display: block !important;\n  }\n  table.visible-print {\n    display: table !important;\n  }\n  tr.visible-print {\n    display: table-row !important;\n  }\n  th.visible-print,\n  td.visible-print {\n    display: table-cell !important;\n  }\n}\n.visible-print-block {\n  display: none !important;\n}\n@media print {\n  .visible-print-block {\n    display: block !important;\n  }\n}\n.visible-print-inline {\n  display: none !important;\n}\n@media print {\n  .visible-print-inline {\n    display: inline !important;\n  }\n}\n.visible-print-inline-block {\n  display: none !important;\n}\n@media print {\n  .visible-print-inline-block {\n    display: inline-block !important;\n  }\n}\n@media print {\n  .hidden-print {\n    display: none !important;\n  }\n}\n", ""]);

// exports


/***/ }),

/***/ "2U0f":
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__("iPJo")
}
var Component = __webpack_require__("VU/8")(
  /* script */
  __webpack_require__("Apko"),
  /* template */
  __webpack_require__("o6mG"),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-5ca4d7e5",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ "3C2h":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setResponsive = undefined;

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var setResponsive = exports.setResponsive = {
    methods: {
        setResponsive: function setResponsive() {
            var vm = this;

            // Add responsive elements
            // Essentially when the plot-1D gets resized it will look to the
            // width and scale the plot according to newly updated width.
            // The css file has min- and max-width's incase the resizing gets too small,
            // the plot will not scale below these dimensions.
            // Solution courtesy of: https://stackoverflow.com/a/26077110
            _jquery2.default.event.special.widthChanged = {
                remove: function remove() {
                    (0, _jquery2.default)(this).children('iframe.width-changed-' + vm.ID).remove();
                },
                add: function add() {
                    var elm = (0, _jquery2.default)(this);
                    var iframe = elm.children('iframe.width-changed-' + vm.ID);
                    if (!iframe.length) {
                        iframe = (0, _jquery2.default)('<iframe/>').addClass('width-changed-' + vm.ID).prependTo(this);
                    }
                    var oldWidth = elm.width();
                    function elmResized() {
                        var width = elm.width();
                        if (oldWidth != width) {
                            elm.trigger('widthChanged', [width, oldWidth]);
                            oldWidth = width;
                        }
                    }

                    var timer = 0;
                    var ielm = iframe[0];
                    (ielm.contentWindow || ielm).onresize = function () {
                        clearTimeout(timer);
                        timer = setTimeout(elmResized, 20);
                    };
                }
            };

            var chart = (0, _jquery2.default)(".chart-" + vm.ID);
            var aspectRatio = chart.width() / chart.height();
            var container = chart.parent();

            (0, _jquery2.default)("#plot-" + vm.ID).on("widthChanged", function () {

                var targetWidth = container.width();
                chart.attr("width", targetWidth);
                chart.attr("height", Math.round(targetWidth / aspectRatio));
            });
        }
    }
};

/***/ }),

/***/ "4myD":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initScales = undefined;

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initScales = exports.initScales = {
    methods: {
        initScales: function initScales() {
            var vm = this;

            // Set scales
            vm.scale.x = vm.plotParameters.scales.xScale;
            vm.scale.x.range([0, vm.dimensions.w]);
            vm.scale.x.domain(d3.extent(vm.plotData, function (d) {
                return d.x;
            }));

            vm.scale.y = vm.plotParameters.scales.yScale;
            vm.scale.yType = vm.plotParameters.scales.yScaleType;
            vm.scale.y.range([vm.dimensions.h, 0]);
            vm.scale.y.domain(d3.extent(vm.plotData, function (d) {
                return d.y;
            }));

            // Set Axes
            vm.axis.x = d3.axisBottom(vm.scale.x).ticks(10);
            vm.axis.y = d3.axisLeft(vm.scale.y).ticks(10);
            vm.axis.xGrid = d3.axisBottom(vm.scale.x).ticks(10).tickSize(-vm.dimensions.h).tickFormat("");
            vm.axis.yGrid = d3.axisLeft(vm.scale.y).ticks(10).tickSize(-vm.dimensions.w).tickFormat("");

            // Set Color Scale
            // color domain is set in order for filenames to have
            // assigned colors. If this wasn't set and a filename
            // was unselected from the list, the plot would re-assign
            // color values to the plots causing confusion at first glance
            // reference: https://stackoverflow.com/questions/20590396/d3-scale-category10-not-behaving-as-expected
            vm.color = d3.scaleOrdinal(d3.schemeCategory20).domain(vm.plotParameters.colorDomain);
        }
    }
};

/***/ }),

/***/ "5DAO":
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__("cICW")
}
var Component = __webpack_require__("VU/8")(
  /* script */
  __webpack_require__("/zfM"),
  /* template */
  __webpack_require__("+1c6"),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-64061ebe",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ "5hG+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__("fZjL");

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'Scales',
  props: {
    DISABLE: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data: function data() {
    return {};
  },
  computed: {
    xScales: function xScales() {
      var tempScales = this.$store.getters.getXScales;
      tempScales = (0, _keys2.default)(tempScales);

      return tempScales;
    },
    yScales: function yScales() {
      var tempScales = this.$store.getters.getYScales;
      tempScales = (0, _keys2.default)(tempScales);

      return tempScales;
    }
  },
  methods: {
    resetScale: function resetScale() {
      this.$emit('reset-scales', 'X', 'Y');
    }
  }
};

/***/ }),

/***/ "5iEx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateFitLine = undefined;

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var updateFitLine = exports.updateFitLine = {
    methods: {
        updateFitLine: function updateFitLine() {
            var vm = this;

            // update fitted line
            // Re-draw plot lines with new data            
            var selectFitLine = vm.elements.plot.select("#fit-line").select("path").data([vm.fitData]);

            selectFitLine.transition().duration(750).attr("d", vm.line).style("fill", "none").style("stroke", vm.color(vm.plotParameters.fileToFit));

            // Update Fit Table
            var minX = d3.min(vm.dataToFit, function (d) {
                return d.x;
            });
            var maxX = d3.max(vm.dataToFit, function (d) {
                return d.x;
            });

            d3.select("td#fit-file").html("<b>File: </b>" + vm.plotParameters.fileToFit);
            d3.select("td#fit-type").html("<b>Fit Type:</b> " + vm.plotParameters.fitConfiguration.fit);
            d3.select("td#fit-points").html("<b>No. Points:</b> " + vm.dataToFit.length);
            d3.select("td#fit-range").html("<b>Fit Range:</b> (" + minX.toExponential(2) + ", " + maxX.toExponential(2) + ")");
            d3.select("td#fit-error").html("<b>Fit Error:</b> " + vm.fitError.toExponential(2));

            d3.select("td#fit-coefficients").html(function () {
                var coeffString = "<ul>";
                for (var key in vm.coefficients) {

                    if (vm.plotParameters.fitConfiguration.fit.toLowerCase().includes('guinier')) {

                        if (key === 'I0') {
                            var I0 = Math.exp(vm.coefficients[key]);

                            coeffString += "<li>Real " + key + " = " + I0 + "</li>";
                            continue;
                        }

                        if (key === 'Rg') {
                            var RgX = vm.coefficients[key] * Math.sqrt(vm.scale.x.invert(vm.brushObj.brushSelection[1]));
                            coeffString += "<li>" + key + " = " + vm.coefficients[key].toFixed(3) + " | Rg * x_max = " + RgX.toFixed(3) + "</li>";
                            continue;
                        }
                    }

                    coeffString += "<li>" + key + " = " + vm.coefficients[key].toFixed(3) + "</li>";
                }
                coeffString += "</ul>";
                return coeffString;
            });

            d3.select("li#fit-damping").html("<b>Damping: </b>" + vm.plotParameters.fitSettings.damping);
            d3.select("li#fit-iterations").html("<b>No. Iterations: </b>" + vm.plotParameters.fitSettings.maxIterations);
            d3.select("li#fit-tolerance").html("<b>Error Tolerance: </b>" + vm.plotParameters.fitSettings.errorTolerance);
            d3.select("li#fit-gradient").html("<b>Gradient Difference: </b>" + vm.plotParameters.fitSettings.gradientDifference);

            d3.select("#fit-note").html(vm.plotParameters.fitConfiguration.note);
        }
    }
};

/***/ }),

/***/ "5xX3":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "62h4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toArray2 = __webpack_require__("7nRM");

var _toArray3 = _interopRequireDefault(_toArray2);

var _slicedToArray2 = __webpack_require__("d7EF");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _mathjs = __webpack_require__("QttI");

var _mathjs2 = _interopRequireDefault(_mathjs);

var _mlLevenbergMarquardt = __webpack_require__("KMQp");

var _mlLevenbergMarquardt2 = _interopRequireDefault(_mlLevenbergMarquardt);

var _lodash = __webpack_require__("M4fF");

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fd = {}; /* Code to Transform Data Points Based on the Curve Fitting Chosen */

fd.print = function () {
    console.log("JUST TESTING");
};

fd.isSymbols = function (expression) {
    // Function to check that user did not enter a transformation that doesn't include 'x' or 'y'
    // E.g. x*2+c would throw an error
    var result = 0;

    // console.log("Expression", expression);
    // Mathjs to parse each transformation into a node
    var nodeParsed = _mathjs2.default.parse(expression);
    //console.log("Parsed Nodes", node_parsed);

    nodeParsed.forEach(function (el) {
        var t = el.filter(function (n) {
            return n.isSymbolNode;
        });

        t.forEach(function (el) {
            return result += el.name !== 'y' && el.name !== 'x';
        });
    });

    // console.log("result", result);
    return result > 0;
};

fd.transformData = function (data, configuration) {

    // Need to make a temp value of data, so as to not alter the original values
    // This is passing a value rather than a reference (using lodash to handle the cloning)
    // References: 
    // https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
    // https://stackoverflow.com/questions/7574054/javascript-how-to-pass-object-by-value 
    var t = _.cloneDeep(data);

    var exp = [configuration.xTransformation, configuration.yTransformation, configuration.eTransformation];

    t.forEach(function (el) {
        var _math$eval = _mathjs2.default.eval(exp, el);
        // Re-assign the transformed data to x and y
        // math.eval returns an array of transformed [x,y] values
        // so d.x = math.eval()[0], d.y = math.eval()[1]


        var _math$eval2 = (0, _slicedToArray3.default)(_math$eval, 3);

        el.x = _math$eval2[0];
        el.y = _math$eval2[1];
        el.e = _math$eval2[2];
    });

    return t; // returns transformed data array   
};

fd.fitData = function (data, equation, fitsettings) {
    // Code to fit data on the transformed data
    var tempSettings = _.cloneDeep(fitsettings);

    var temp = _.cloneDeep(data);
    var tempData = {
        x: [],
        y: []
    };

    temp.forEach(function (d) {
        tempData.x.push(d.x);
        tempData.y.push(d.y);
    });

    // console.log("temp data:", tempData);

    // Parse the string. We might need some validation here
    var n_parsed = _mathjs2.default.parse(equation);

    // Getting all variables to fit and remove x!
    var nodes_to_fit = n_parsed.filter(function (node) {
        return node.isSymbolNode && node.name != 'x';
    });

    var parameter_names_to_fit = nodes_to_fit.map(function (node) {
        return node.name;
    });

    // need to compile before evaluating
    var n_compiled = n_parsed.compile();

    var fit_function = function fit_function(_ref) {
        var _ref2 = (0, _toArray3.default)(_ref),
            args = _ref2.slice(0);

        var scope = {};

        for (var i = 0; i < args.length; i++) {
            scope[parameter_names_to_fit[i]] = args[i];
        }

        // console.log("Scope = ", scope);
        return function (x) {
            scope.x = x;
            return n_compiled.eval(scope);
        };
    };

    // array of initial parameter values for initial paramters to fit: all at 1
    var initialValues = parameter_names_to_fit.map(function (x, i) {
        return 1.0;
    });

    // LM options. We might need to adapt some of these values
    tempSettings.initialValues = initialValues;
    var options = _.cloneDeep(tempSettings);

    // Fitting   
    var fitted_params = (0, _mlLevenbergMarquardt2.default)(tempData, fit_function, options);

    // Get's the fitted function from the fitted parameters
    // only coefficients are set! Remember it returns a function!)
    // console.log("fitted_params.parameterValues = ", fitted_params.parameterValues);
    var fit_function_fitted = fit_function(fitted_params.parameterValues);

    var y_fitted = tempData.x.map(function (el) {
        return fit_function_fitted(el);
    });

    // console.log('y_fitted =', y_fitted);

    // Return the fitted values
    var fittedPoints = [];

    for (var i = 0; i < y_fitted.length; i++) {
        fittedPoints.push({
            x: tempData.x[i],
            y: y_fitted[i]
        });
    }

    var coeff = {};
    for (var _i = 0; _i < parameter_names_to_fit.length; _i++) {
        coeff[parameter_names_to_fit[_i]] = fitted_params.parameterValues[_i];
    }

    return {
        fittedData: fittedPoints,
        coefficients: coeff,
        error: fitted_params.parameterError,
        fitEquation: fit_function
    }; // Return fit data array
};

exports.default = fd;

/***/ }),

/***/ "6hhn":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "7BXH":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// Mixin for Stitch and 1D to get URLs, since the components use the same data
var getURLs = exports.getURLs = {
    methods: {
        getURLs: function getURLs(files, label) {

            var tempURLs = [],
                fetchList = [],
                uploadList = [];

            for (var i = 0, len = files.length; i < len; i++) {
                var inFetch = document.getElementById(files[i] + label);

                if (inFetch) {
                    // console.log("In fetch:", inFetch);
                    fetchList.push(files[i]);
                } else {
                    // console.log("No in fetch:", inFetch);
                    uploadList.push(files[i]);
                }
            }

            // console.log("Here is the FetchList", fetchList);
            if (fetchList.length > 0) tempURLs.push(this.$store.getters.get1DURL('fetch', fetchList));

            // console.log("Here is the UploadList", uploadList);
            if (uploadList.length > 0) tempURLs.push(this.$store.getters.get1DURL('upload', uploadList));

            // Flatten out array so it isn't nested
            tempURLs = _.flatten(tempURLs);

            // console.log("Here are the tempURLs", tempURLs);
            return tempURLs;
        }
    }
};

/***/ }),

/***/ "7Bdl":
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel"
  }, [_c('div', {
    class: 'panel panel-' + _vm.PANELTYPE
  }, [_c('div', {
    staticClass: "panel-heading"
  }, [_c('div', {
    staticClass: "panel-title"
  }, [_vm._t("header-content"), _vm._v(" "), _c('div', {
    staticClass: "collapser",
    on: {
      "click": function($event) {
        _vm.isCollapsed = !_vm.isCollapsed
      }
    }
  }, [_c('span', [_vm._v(_vm._s(_vm.PANELTITLE) + " ")]), _vm._v(" "), (_vm.isCollapsed) ? _c('span', {
    staticClass: "collapser-icon"
  }, [_c('i', {
    staticClass: "fa fa-plus-square",
    attrs: {
      "aria-hidden": "true"
    }
  })]) : _c('span', {
    staticClass: "collapser-icon"
  }, [_c('i', {
    staticClass: "fa fa-minus-square",
    attrs: {
      "aria-hidden": "true"
    }
  })])])], 2)]), _vm._v(" "), _c('div', {
    class: 'panel-collapse collapse' + _vm.collapsed
  }, [_c('div', {
    staticClass: "panel-body"
  }, [_vm._t("default", [_c('p', [_vm._v("Panel body content goes here.")])])], 2)])])])
},staticRenderFns: []}

/***/ }),

/***/ "7n4j":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateBrushScale = undefined;

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var updateBrushScale = exports.updateBrushScale = {
    methods: {
        updateBrushScale: function updateBrushScale() {
            var vm = this;

            var t = d3.zoomTransform(vm.elements.zoom.select('.zoom').node());
            var new_xScale = t.rescaleX(vm.scale.x);

            // Update brush scale
            vm.scale.brushX = new_xScale.copy();
        }
    }
};

/***/ }),

/***/ "8zlt":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = __webpack_require__("fZjL");

var _keys2 = _interopRequireDefault(_keys);

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

var _Panel = __webpack_require__("wV86");

var _Panel2 = _interopRequireDefault(_Panel);

var _ResetButton = __webpack_require__("OHJc");

var _ResetButton2 = _interopRequireDefault(_ResetButton);

var _chartElements = __webpack_require__("qjSU");

var _chartElements2 = _interopRequireDefault(_chartElements);

var _createBrushes = __webpack_require__("OiiA");

var _updateBrushScale = __webpack_require__("7n4j");

var _formatData = __webpack_require__("HYj2");

var _saveStitchLine = __webpack_require__("DaOS");

var _stitchData = __webpack_require__("Ax7h");

var _updateStitchLine = __webpack_require__("q1UI");

var _toggleEdit = __webpack_require__("AUWo");

var _validateBrushes = __webpack_require__("MMS3");

var _initDimensions = __webpack_require__("I3MW");

var _drawPlot = __webpack_require__("0TJO");

var _resetPlot = __webpack_require__("yIZD");

var _adjustDomains = __webpack_require__("EjQk");

var _changeScales = __webpack_require__("NlVB");

var _setResponsive = __webpack_require__("3C2h");

var _updateData = __webpack_require__("ZmW/");

var _updateLegend = __webpack_require__("N/+b");

var _zoomed = __webpack_require__("XRpi");

var _removePoint = __webpack_require__("Yhlz");

var _initScales = __webpack_require__("4myD");

var _setElements = __webpack_require__("w0zR");

var _removeLines = __webpack_require__("/n00");

var _updatePlot = __webpack_require__("EiGA");

var _updateLabels = __webpack_require__("MrIk");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Import Default Chart Elements */


/* Import Components */
exports.default = {
    name: 'StitchPlot',
    components: {
        'v-panel': _Panel2.default,
        'v-reset-button': _ResetButton2.default
    },
    data: function data() {

        var tempData = _.cloneDeep(_chartElements2.default);

        // Extend conto chart elements' base data
        tempData.scale.brushX = undefined;
        tempData.elements.stitch = undefined;
        tempData.margin = { top: 50, bottom: 50, left: 80, right: 50 };
        tempData.brushObj = {
            brushes: [],
            brushCount: null,
            brushSelections: {},
            brushGroup: undefined
        };
        tempData.stitchLineData = [];
        tempData.savedSelections = {};
        tempData.savedBrushes = [];
        tempData.ID = 'stitch';

        tempData.isError = false;
        tempData.isError = false;
        tempData.zoomEnabled = false;
        tempData.brushEnabled = false;
        tempData.brushExtent = [];
        tempData.brushSelection = null;
        tempData.toggleChoice = 'zoom';

        tempData.zoom = d3.zoom().on("zoom", this.zooming);

        return tempData;
    },

    props: {
        DISABLE: {
            type: Boolean,
            default: true
        }
    },
    mixins: [_createBrushes.newBrush, _createBrushes.drawBrushes, _createBrushes.removeBrushes, _createBrushes.sortBrushes, _createBrushes.drawSavedBrushes, _updateBrushScale.updateBrushScale, _formatData.formatData, _saveStitchLine.saveStitchLine, _saveStitchLine.saveConfirm, _saveStitchLine.isValidFilename, _stitchData.stitchData, _stitchData.addStitch, _stitchData.removeStitchLine, _stitchData.selectData, _updateStitchLine.updateStitchLine, _toggleEdit.toggleEdit, _toggleEdit.resetToggle, _validateBrushes.validateBrushes, _validateBrushes.validateSelections, _initDimensions.initDimensions, _resetPlot.resetPlot, _adjustDomains.adjustDomains, _changeScales.changeScales, _setResponsive.setResponsive, _updateData.updateData, _updateLegend.updateLegend, _zoomed.zoomed, _removePoint.removePoint, _initScales.initScales, _setElements.setElements, _removeLines.removeLines, _updatePlot.updatePlot, _updateLabels.updateLabels, _drawPlot.drawPlot],
    computed: {
        selections: function selections() {
            return this.brushObj.brushSelections;
        },
        isBrushes: function isBrushes() {
            var vm = this;

            return (0, _keys2.default)(vm.selections).length > 0;
        }
    },
    methods: {
        setParameters: function setParameters(parameters) {
            // Check data is valid prior to plotting
            this.plotParameters = _.cloneDeep(parameters);
        },
        updateScales: function updateScales(s) {
            var vm = this;
            vm.changeScales(s);
            vm.updatePlot(vm.plotData);

            // If there are brushes, re-adjust selections according to new scale
            // Update brushScale to reflect new zoomed scale
            vm.scale.brushX = vm.scale.x.copy();

            if ((0, _keys2.default)(vm.brushObj.brushSelections).length > 0) {

                vm.brushObj.brushSelections = _.mapValues(vm.brushObj.brushSelections, function (el) {
                    return {
                        raw: el.raw,
                        converted: el.raw.map(function (i) {
                            return vm.scale.brushX.invert(i);
                        })
                    };
                });
            }

            vm.updateStitchLine();
        },
        zooming: function zooming() {
            var vm = this;

            // Update Scales
            var new_yScale = d3.event.transform.rescaleY(vm.scale.y);
            var new_xScale = d3.event.transform.rescaleX(vm.scale.x);

            // Update brushScale to reflect new zoomed scale
            vm.scale.brushX = new_xScale.copy();

            // If there are brushes, re-adjust selections according to new scale
            if ((0, _keys2.default)(vm.brushObj.brushSelections).length > 0) {

                vm.brushObj.brushSelections = _.mapValues(vm.brushObj.brushSelections, function (el) {
                    return {
                        raw: el.raw,
                        converted: el.raw.map(function (i) {
                            return vm.scale.brushX.invert(i);
                        })
                    };
                });
            }

            // Now call re-usable part of zoom
            vm.zoomed(new_yScale, new_xScale);
        },
        checkError: function checkError() {
            var len = document.getElementById("error-container").children.length;
            return len > 0 ? false : true;
        },
        resetDefaults: function resetDefaults() {
            this.brushXScale = null;
            this.zoomEnabled = false;
            this.brushEnabled = false;
            this.brushObj.brushSelections = {};
            this.brushObj.brushes = [];
            this.resetToggle();
        }
    },
    watch: {
        plotParameters: {
            handler: function handler() {
                var vm = this;

                this.$nextTick(function () {
                    vm.drawPlot();
                });
            },
            deep: true
        }
    }
};

/* Import Mixins */
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* Import libraries */

/***/ }),

/***/ "9AN0":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("t3Il");
__webpack_require__("jVFP");
__webpack_require__("9PKp");
__webpack_require__("NrZ7");
__webpack_require__("Ys+k");
__webpack_require__("d7LV");
__webpack_require__("dSJe");
__webpack_require__("bOMR");
__webpack_require__("QmO4");
__webpack_require__("MtgE");
__webpack_require__("cHDO");
__webpack_require__("zdm5");

/***/ }),

/***/ "9PLl":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "9tWe":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("1Q64");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("MTIv")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/less-loader/dist/index.js!../../../../node_modules/bootstrap-webpack/bootstrap-styles.loader.js!./bootstrap.config.js", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/less-loader/dist/index.js!../../../../node_modules/bootstrap-webpack/bootstrap-styles.loader.js!./bootstrap.config.js");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "9ykZ":
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('fieldset', {
    class: _vm.DISABLE ? 'disable' : '',
    attrs: {
      "disabled": _vm.DISABLE
    }
  }, [_c('div', {
    staticClass: "switch"
  }, [_c('input', {
    staticClass: "switch-input",
    attrs: {
      "type": "radio",
      "id": _vm.leftID,
      "name": "edit"
    },
    domProps: {
      "value": _vm.leftID,
      "checked": _vm.picked
    },
    on: {
      "click": _vm.leftSwitch
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "switch-label switch-label-off",
    attrs: {
      "for": _vm.leftID
    }
  }, [_vm._t("left-label", [_vm._v("Left")])], 2), _vm._v(" "), _c('input', {
    staticClass: "switch-input",
    attrs: {
      "type": "radio",
      "id": _vm.rightID,
      "name": "edit"
    },
    domProps: {
      "value": _vm.rightID,
      "checked": !_vm.picked
    },
    on: {
      "click": _vm.rightSwitch
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "switch-label switch-label-on",
    attrs: {
      "for": _vm.rightID
    }
  }, [_vm._t("right-label", [_vm._v("Right")])], 2), _vm._v(" "), _c('span', {
    staticClass: "switch-block"
  })])])
},staticRenderFns: []}

/***/ }),

/***/ "AUWo":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resetToggle = exports.toggleEdit = undefined;

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var toggleEdit = exports.toggleEdit = {
    methods: {
        toggleEdit: function toggleEdit(choice) {
            var vm = this;

            // console.log(this.value);
            vm.toggleChoice = choice;

            if (vm.toggleChoice === 'zoom' || vm.brushObj.brushCount < 1) {
                // Toggle off all brushes
                for (var i = 0, len = vm.brushObj.brushes.length; i < len; i++) {
                    d3.select('#brush-' + i).on('.brush', null);
                    vm.elements.svg.selectAll('.overlay').style("pointer-events", "none");
                }

                // Remove Brush Cursor Styles
                // d3.select('.stitch-chart').style('cursor', 'move');
                vm.elements.zoom.select('.brushes').selectAll('.selection').style("cursor", "move");
                vm.elements.zoom.select('.brushes').selectAll('.overlay').style("cursor", "move");

                vm.elements.svg.select('.zoom').call(vm.zoom);
            } else if (vm.toggleChoice === 'brush') {
                vm.elements.svg.select('.zoom').on('.zoom', null);

                // Toggle on all brushes
                for (var _i = 0, _len = vm.brushObj.brushes.length; _i < _len; _i++) {
                    vm.elements.zoom.selectAll('.overlay').style("pointer-events", "all");
                    vm.brushObj.brushes[_i].brush(d3.select('#brush-' + _i));
                }

                // Re-instate Brush Cursor Styles
                vm.elements.zoom.select('.brushes').selectAll('.selection').style("cursor", "move");
                vm.elements.zoom.select('.brushes').selectAll('.overlay').style("cursor", "crosshair");
            }
        }
    }
};

var resetToggle = exports.resetToggle = {
    methods: {
        resetToggle: function resetToggle() {
            this.toggleChoice = 'zoom';
        }
    }
};

/***/ }),

/***/ "Aeo6":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/ornl_logo.7740698.png";

/***/ }),

/***/ "Apko":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


exports.default = {
    props: {},
    data: function data() {
        return {
            filterChoice: 'All',
            sortToggle: true
        };
    },
    computed: {
        jobs: function jobs() {
            var jobs = this.$store.getters.getGroups('1D');

            return jobs.reduce(function (prev, cur) {
                if (prev.indexOf(cur) < 0) prev.push(cur);

                return prev;
            }, []);
        }
    },
    methods: {
        sortByDate: function sortByDate(direction) {
            this.sortToggle = !this.sortToggle;
            this.$emit('sort-by-date', direction);
        }
    },
    watch: {
        filterChoice: function filterChoice() {
            this.$emit('filter-job', this.filterChoice);
        }
    }
};

/***/ }),

/***/ "AvW4":
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('button', {
    staticClass: "btn btn-success btn-xs btn-reset",
    on: {
      "click": _vm.onClick
    }
  }, [_vm._t("default", [_vm._v("Button")])], 2)
},staticRenderFns: []}

/***/ }),

/***/ "Ax7h":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.selectData = exports.removeStitchLine = exports.addStitch = exports.stitchData = undefined;

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

var _interpolateLine = __webpack_require__("mZ2H");

var _interpolateLine2 = _interopRequireDefault(_interpolateLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var stitchData = exports.stitchData = {
    methods: {
        stitchData: function stitchData() {
            var vm = this;

            var selectedData = vm.selectData();
            // console.log("Selected:", selectedData);

            //Run tests to check if appropriate brush selections are made
            if (selectedData.length === 0) {
                console.log("Re-draw brushes.");
                return false;
            } else if (vm.validateSelections(selectedData)) {
                console.log("Re-draw brushes.");
                return false;
            } else {
                // console.log("Selected Data: ", selectedData);

                // Now interpolate data
                var line = _interpolateLine2.default.linear(selectedData);

                // Put the line onto the plot
                vm.addStitch(line);

                return true;
            }
        }
    }
};

var addStitch = exports.addStitch = {
    methods: {
        addStitch: function addStitch(line) {
            var vm = this;

            // First repackage data to an array of objects per points for d3 to work with
            var newData = [];

            for (var i = 0, len = line.x.length; i < len; i++) {

                newData.push({
                    x: line.x[i],
                    y: line.y[i],
                    e: line.e[i]
                });
            }

            vm.stitchLineData = _.cloneDeep(newData);

            // If first time plotting stitch line, draw path with animation from start to end
            if (vm.elements.svg.select("#stitched-line").empty()) {

                vm.elements.stitch = vm.elements.plot.append("g").attr("clip-path", "url(#clip-" + vm.ID + ")").attr("id", "stitched-line").append('path').datum(newData).attr("class", "pointlines").attr("d", vm.line).style("fill", "none").style("stroke", "red").style("stroke-width", "2px");

                var totalLength = vm.elements.stitch.node().getTotalLength();

                vm.elements.stitch.attr("stroke-dasharray", totalLength + " " + totalLength).attr("stroke-dashoffset", totalLength).transition().duration(4000).ease(d3.easePolyInOut).attr("stroke-dashoffset", 0).on('end', function () {
                    vm.elements.stitch.attr("stroke-dasharray", "4,4");
                }); // Change to dash line one finished drawing path
            } else {
                // if updating current stitched line, simply transition to new path, no animate start to end
                vm.elements.stitch.datum(newData).transition().duration(1500).attr("d", vm.line);
            }
        }
    }
};

var removeStitchLine = exports.removeStitchLine = {
    methods: {
        removeStitchLine: function removeStitchLine() {
            d3.select("#stitched-line").remove();

            return false;
        }
    }
};

var selectData = exports.selectData = {
    methods: {
        selectData: function selectData() {
            var vm = this;

            // If there are no brush selections, don't bother matching the data
            if (vm.validateBrushes()) return [];

            var matches = [];
            var allData = vm.formatData(vm.dataNest); // An array of all data sorted left to right by x axis values
            // console.log("All data:", allData);

            // First sort brushes so that selections are made left to right
            var sortedBrushes = vm.sortBrushes(); // an array of sorted brush selections
            // console.log("Sorted Brushes:", sortedBrushes);

            for (var i = 0, len = sortedBrushes.length; i < len; i++) {
                var start = sortedBrushes[i][1].converted[0];
                var end = sortedBrushes[i][1].converted[1];

                var tempSelection = [];

                for (var j = 0, _len = allData.length; j < _len; j++) {

                    // Temp data is cloned so original array is not referenced
                    // If not cloned, the stitching function will not work properly because
                    // each brush selection reference the same curve...hence the same data will
                    // get altered when shifting during the interpolation process.
                    var tempData = _.cloneDeep(allData[j][1]);
                    var tempName = allData[j][0];

                    var firstValue = tempData.x[0];
                    var lastValue = tempData.x[tempData.x.length - 1];

                    // console.log("Check: " + tempName, firstValue <= end && lastValue >= start);
                    if (firstValue <= end && lastValue >= start) {
                        var tempSelCurve = [tempName];
                        var tempSel = { x: [], y: [], e: [] };

                        for (var z = 0, _len2 = tempData.x.length; z < _len2; z++) {
                            //let convertedX = scale.brushXScale(tempData.x[z]);
                            var convertedX = tempData.x[z];

                            if (start <= convertedX && convertedX <= end) {
                                //tempSelection[tempName] = tempSelection[tempName] || [];

                                // Add the x,y,e values to selection object
                                tempSel.x.push(tempData.x[z]);
                                tempSel.y.push(tempData.y[z]);
                                tempSel.e.push(tempData.e[z]);
                            }
                        }

                        tempSelCurve.push(tempData); // Add all data
                        tempSelCurve.push(tempSel); // Add selected data

                        tempSelection.push(tempSelCurve);
                    }
                }

                tempSelection.push([start, end]); // Add Brush selections

                // Push Temp brush selection to match array
                matches.push(tempSelection);
            }

            return matches;
        }
    }
};

/***/ }),

/***/ "BBrv":
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-md-12",
    attrs: {
      "id": "Stitch"
    }
  }, [_c('div', {
    staticClass: "container-fluid"
  }, [_c('div', {
    staticClass: "col-md-2"
  }, [_c('v-panel-group', {
    attrs: {
      "MAINTITLE": "Files",
      "PANELTYPE": "primary"
    }
  }, [(!_vm.isOffline) ? _c('v-panel', {
    attrs: {
      "PANELTITLE": "Fetched Data",
      "PANELTYPE": "success"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.fetchFiles.length > 0),
      expression: "fetchFiles.length > 0"
    }]
  }, [_c('div', [_c('v-filter', {
    on: {
      "filter-job": _vm.filterJob,
      "sort-by-date": _vm.sortByDate
    }
  })], 1), _vm._v(" "), _c('v-table', {
    attrs: {
      "fieldNames": ['Plot', 'Filename', 'Group']
    }
  }, [_vm._l((_vm.fetchFiles('1D', _vm.sortBy, _vm.filterBy)), function(f) {
    return _c('tr', [
      [_c('td', {
        staticClass: "td-check"
      }, [_c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: (_vm.filesToPlot),
          expression: "filesToPlot"
        }],
        attrs: {
          "id": f.filename + '-FetchStitch',
          "type": "checkbox"
        },
        domProps: {
          "value": f.filename,
          "checked": Array.isArray(_vm.filesToPlot) ? _vm._i(_vm.filesToPlot, f.filename) > -1 : (_vm.filesToPlot)
        },
        on: {
          "__c": function($event) {
            var $$a = _vm.filesToPlot,
              $$el = $event.target,
              $$c = $$el.checked ? (true) : (false);
            if (Array.isArray($$a)) {
              var $$v = f.filename,
                $$i = _vm._i($$a, $$v);
              if ($$el.checked) {
                $$i < 0 && (_vm.filesToPlot = $$a.concat([$$v]))
              } else {
                $$i > -1 && (_vm.filesToPlot = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
              }
            } else {
              _vm.filesToPlot = $$c
            }
          }
        }
      })]), _vm._v(" "), _c('td', {
        staticClass: "td-name"
      }, [_vm._v(_vm._s(f.filename))]), _vm._v(" "), _c('td', {
        staticClass: "td-name"
      }, [_vm._v(_vm._s(f.jobTitle))])]
    ], 2)
  })], 2)], 1)]) : _vm._e(), _vm._v(" "), _c('v-panel', {
    attrs: {
      "PANELTITLE": "Uploaded Data",
      "PANELTYPE": "success"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.uploadFiles.length > 0),
      expression: "uploadFiles.length > 0"
    }]
  }, [_c('v-table', {
    attrs: {
      "fieldNames": ['Plot', 'Filename', 'Delete']
    }
  }, [_vm._l((_vm.uploadFiles), function(f) {
    return _c('tr', [
      [_c('td', {
        staticClass: "td-check"
      }, [_c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: (_vm.filesToPlot),
          expression: "filesToPlot"
        }],
        attrs: {
          "type": "checkbox"
        },
        domProps: {
          "value": f.filename,
          "checked": Array.isArray(_vm.filesToPlot) ? _vm._i(_vm.filesToPlot, f.filename) > -1 : (_vm.filesToPlot)
        },
        on: {
          "__c": function($event) {
            var $$a = _vm.filesToPlot,
              $$el = $event.target,
              $$c = $$el.checked ? (true) : (false);
            if (Array.isArray($$a)) {
              var $$v = f.filename,
                $$i = _vm._i($$a, $$v);
              if ($$el.checked) {
                $$i < 0 && (_vm.filesToPlot = $$a.concat([$$v]))
              } else {
                $$i > -1 && (_vm.filesToPlot = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
              }
            } else {
              _vm.filesToPlot = $$c
            }
          }
        }
      })]), _vm._v(" "), _c('td', {
        staticClass: "td-name"
      }, [_vm._v(_vm._s(f.filename))]), _vm._v(" "), _c('td', {
        staticClass: "td-name"
      }, [_c('button', {
        staticClass: "btn btn-danger btn-xs",
        on: {
          "click": function($event) {
            _vm.removeFile(f.filename)
          }
        }
      }, [_c('i', {
        staticClass: "fa fa-trash",
        attrs: {
          "aria-hidden": "true"
        }
      })])])]
    ], 2)
  })], 2)], 1)])], 1), _vm._v(" "), _c('v-panel-group', {
    attrs: {
      "MAINTITLE": "Controls",
      "PANELTYPE": "primary"
    }
  }, [_c('v-panel', {
    attrs: {
      "PANELTITLE": "Scales",
      "PANELTYPE": "success"
    }
  }, [_c('v-scales', {
    ref: "scales",
    attrs: {
      "DISABLE": _vm.disable
    },
    on: {
      "update-scales": _vm.setScales,
      "reset-scales": _vm.resetScales
    }
  })], 1), _vm._v(" "), _c('v-panel', {
    attrs: {
      "PANELTITLE": "Edit Tools",
      "PANELTYPE": "info"
    }
  }, [_c('v-switch', {
    ref: "toggle",
    attrs: {
      "leftID": "zoom",
      "rightID": "brush",
      "DISABLE": _vm.disable
    },
    on: {
      "switchChange": _vm.toggleEdit
    }
  }, [_c('span', {
    attrs: {
      "slot": "left-label"
    },
    slot: "left-label"
  }, [_c('i', {
    staticClass: "fa fa-search-plus"
  }), _vm._v(" Zoom")]), _vm._v(" "), _c('span', {
    attrs: {
      "slot": "right-label"
    },
    slot: "right-label"
  }, [_c('i', {
    staticClass: "fa fa-square-o"
  }), _vm._v(" Brush")])]), _vm._v(" "), (_vm.isMultipleLines) ? _c('button', {
    staticClass: "btn btn-danger btn-xs btn-block",
    attrs: {
      "id": "remove-brushes-btn"
    },
    on: {
      "click": _vm.removeBrushes
    }
  }, [_c('i', {
    staticClass: "fa fa-times-circle",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Remove Brushes")]) : _vm._e(), _vm._v(" "), _c('br'), _vm._v(" "), (_vm.isMultipleLines) ? _c('button', {
    staticClass: "btn btn-success btn-xs btn-block",
    attrs: {
      "id": "stitch-btn"
    },
    on: {
      "click": _vm.stitchData
    }
  }, [_c('i', {
    staticClass: "fa fa-line-chart",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Stitch")]) : _vm._e(), _vm._v(" "), _c('br'), _vm._v(" "), (_vm.isStitched) ? _c('button', {
    staticClass: "btn btn-danger btn-xs btn-block",
    attrs: {
      "id": "remove-brushes-btn"
    },
    on: {
      "click": _vm.removeStitch
    }
  }, [_c('i', {
    staticClass: "fa fa-times-circle",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Remove Stitch")]) : _vm._e(), _vm._v(" "), _c('br'), _vm._v(" "), (_vm.isStitched) ? _c('button', {
    staticClass: "btn btn-primary btn-xs btn-block",
    attrs: {
      "id": "save-stitch-btn"
    },
    on: {
      "click": _vm.saveStitchLine
    }
  }, [_c('i', {
    staticClass: "fa fa-floppy-o",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Save Stitch")]) : _vm._e(), _vm._v(" "), _c('br'), _vm._v(" "), (_vm.isBrushesStored) ? _c('button', {
    staticClass: "btn btn-primary btn-xs btn-block",
    attrs: {
      "id": "draw-brushes-btn",
      "disabled": !_vm.isMultipleLines
    },
    on: {
      "click": _vm.drawBrushes
    }
  }, [_c('i', {
    staticClass: "fa fa-undo",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Restore Brushes")]) : _vm._e()], 1)], 1)], 1), _vm._v(" "), _c('v-stitch-plot', {
    ref: "stitchPlot",
    attrs: {
      "DISABLE": _vm.disable
    }
  }), _vm._v(" "), _vm._m(0)], 1)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "modal fade",
    attrs: {
      "id": "saveModal",
      "role": "dialog"
    }
  }, [_c('div', {
    staticClass: "modal-dialog"
  }, [_c('div', {
    staticClass: "modal-content"
  }, [_c('div', {
    staticClass: "modal-header"
  }, [_c('button', {
    staticClass: "close",
    attrs: {
      "type": "button",
      "data-dismiss": "modal"
    }
  }, [_vm._v("×")]), _vm._v(" "), _c('h4', {
    staticClass: "modal-title"
  }, [_vm._v("Save Stitch Line")])]), _vm._v(" "), _c('div', {
    staticClass: "modal-body"
  }, [_c('div', {
    staticClass: "form-group col-md-12"
  }, [_c('div', {
    staticClass: "input-group"
  }, [_c('span', {
    staticClass: "input-group-addon"
  }, [_vm._v("File Name:")]), _vm._v(" "), _c('input', {
    staticClass: "form-control",
    attrs: {
      "id": "file-name-input",
      "placeholder": "your_file_name",
      "required": "",
      "oninvalid": "this.setCustomValidity('Please enter a file name.')",
      "oninput": "this.setCustomValidity('')"
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "input-group-addon"
  }, [_vm._v("_Iq.txt")])])]), _vm._v(" "), _c('div', {
    staticClass: "clearfix"
  }), _vm._v(" "), _c('div', {
    staticClass: "alert alert-danger",
    attrs: {
      "id": "save-error-msg"
    }
  }, [_c('p', [_c('strong', [_vm._v("Warning!")]), _vm._v(" Filename should contain no special characters such as * . ” / \\ [ ] : ; | = , < ? > &amps; $ # ! ‘ { } ( )")]), _vm._v(" "), _c('p', [_vm._v("Nor should a filename start with a number")])])]), _vm._v(" "), _c('div', {
    staticClass: "modal-footer"
  }, [_c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "id": "cancel-save-btn",
      "data-dismiss": "modal"
    }
  }, [_vm._v("Cancel")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-success",
    attrs: {
      "id": "save-btn"
    }
  }, [_vm._v("Save")])])])])])
}]}

/***/ }),

/***/ "CiNM":
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__("D+0X")
}
var Component = __webpack_require__("VU/8")(
  /* script */
  __webpack_require__("WbGI"),
  /* template */
  __webpack_require__("k0nQ"),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0bc6e45a",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ "Cz5M":
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__("5xX3")
}
var Component = __webpack_require__("VU/8")(
  /* script */
  __webpack_require__("8zlt"),
  /* template */
  __webpack_require__("Z4nb"),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-74909b8e",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ "D+0X":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "DaOS":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isValidFilename = exports.saveConfirm = exports.saveStitchLine = undefined;

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

var _axios = __webpack_require__("mtWM");

var _axios2 = _interopRequireDefault(_axios);

var _eventBus = __webpack_require__("OXcg");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var saveStitchLine = exports.saveStitchLine = {
    methods: {
        saveStitchLine: function saveStitchLine() {
            var vm = this;

            vm.saveConfirm(function (confirm) {
                if (confirm) {
                    (0, _jquery2.default)("#cancel-save-btn").off();
                    (0, _jquery2.default)("#save-btn").off();

                    var filename = (0, _jquery2.default)('#file-name-input').val();
                    // console.log("Saving the file name: " + filename + "_Iq.txt");
                    (0, _jquery2.default)("#file-name-input").val('');

                    // console.log("Stitch Line Data:", stitchLineData);
                    // console.log("Calling axios.post to save new data file");

                    _axios2.default.post('/external/save', {
                        id: filename + '_Iq.txt',
                        content: vm.stitchLineData
                    }).then(function (response) {
                        console.log(response);

                        // If posting stitch line works, store brush selections
                        vm.savedSelections = _.cloneDeep(vm.brushObj.brushSelections);
                        vm.savedBrushes = _.cloneDeep(_.reverse(vm.brushObj.brushes));

                        // console.log("Saved brushes:", savedBrushes);
                        // console.log("-----------------------------")

                        // console.log("Here are your saved brush selections:")
                        // for(let key in savedSelections) {
                        //     console.log("Key: " + key);
                        //     console.log(savedSelections[key]);
                        //     console.log("---------------------------");
                        // }

                        // Then reset plot for next iteration of stitching
                        _eventBus.eventBus.$emit("reset-stitch");

                        // Then fetch data to include the saved stitch file
                        _eventBus.eventBus.$emit("fetch-data");
                    }).catch(function (error) {
                        console.log(error);
                    });

                    return;
                } else {
                    (0, _jquery2.default)("#cancel-save-btn").off();
                    (0, _jquery2.default)("#save-btn").off();
                    (0, _jquery2.default)('#file-name-input').val('');

                    // console.log("Not saving the file.");
                    return;
                }
            });
        }
    }
};

var saveConfirm = exports.saveConfirm = {
    methods: {
        saveConfirm: function saveConfirm(callback) {
            var vm = this;

            (0, _jquery2.default)("#saveModal").modal('show');

            (0, _jquery2.default)("#save-btn").on("click", function () {

                var filename = (0, _jquery2.default)('#file-name-input').val();

                if (!vm.isValidFilename(filename)) {
                    (0, _jquery2.default)("#save-error-msg").show();
                } else {
                    callback(true);
                    (0, _jquery2.default)("#saveModal").modal('hide');
                    (0, _jquery2.default)("#save-error-msg").hide();
                }
            });

            (0, _jquery2.default)("#cancel-save-btn").on("click", function () {
                callback(false);
                (0, _jquery2.default)("#saveModal").modal('hide');
                (0, _jquery2.default)("#save-error-msg").hide();
            });
        }
    }
};

var isValidFilename = exports.isValidFilename = {
    methods: {
        isValidFilename: function isValidFilename(fname) {
            var rg1 = /^[^\\/:\*\?"<>\|  .]+$/; // forbidden characters \ / : * ? " < > |
            var rg2 = /^[0-9]/; // cannot start with a number ([0-9])
            var rg3 = /^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i; // forbidden file names

            return rg1.test(fname) && !rg2.test(fname) && !rg3.test(fname);
        }
    }
};

/***/ }),

/***/ "EiGA":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updatePlot = undefined;

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var updatePlot = exports.updatePlot = {
    methods: {
        updatePlot: function updatePlot(newData) {
            var vm = this;

            // First update plot data to new data
            vm.updateData(newData);

            // Then adjust scale's domain whenver new data is added
            vm.adjustDomains();

            // Then rescale to zoom's scale
            var t = d3.zoomTransform(vm.elements.zoom.select('.zoom').node());
            var new_yScale = t.rescaleY(vm.scale.y);
            var new_xScale = t.rescaleX(vm.scale.x);

            // Adjust axis and gridline labels
            vm.axis.y.scale(new_yScale);
            vm.axis.x.scale(new_xScale);
            vm.axis.yGrid.scale(new_yScale);
            vm.axis.xGrid.scale(new_xScale);

            // Transition axis and gridlines labels accordingly
            vm.elements.axis.transition().duration(750).select('.axis--y').call(vm.axis.y);
            vm.elements.axis.transition().duration(750).select('.axis--x').call(vm.axis.x);
            vm.elements.axis.transition().duration(750).select('.gridline--y').call(vm.axis.yGrid);
            vm.elements.axis.transition().duration(750).select('.gridline--x').call(vm.axis.xGrid);

            vm.line = d3.line().defined(function (d) {
                if (vm.scale.yType === 'Log(Y)') {
                    return d.y > 0;
                } else {
                    return d;
                }
            }).x(function (d) {
                return new_xScale(d.x);
            }).y(function (d) {
                return new_yScale(d.y);
            });

            // Add and update data
            vm.dataNest.forEach(function (d, i) {

                // Add new elements if nothing exists
                if (d3.select("#line-" + vm.ID + "-" + d.key).empty()) {

                    // Add line plot
                    vm.elements.plot.append("g").attr("id", "line-" + vm.ID + "-" + d.key).append("g").attr("clip-path", "url(#clip-" + vm.ID + ")").append("path").data([d.values]).attr("class", "pointlines").attr("d", vm.line).style("fill", "none").style("stroke", function () {
                        return d.color = vm.color(d.key);
                    });;

                    // Add error lines
                    vm.elements.plot.append("g").attr("id", "error-" + vm.ID + "-" + d.key).append("g").attr("clip-path", "url(#clip-" + vm.ID + ")").selectAll(".error-" + vm.ID).data(d.values).enter().append('line').attr('class', 'error error-' + vm.ID).attr('x1', function (d) {
                        return new_xScale(d.x);
                    }).attr('x2', function (d) {
                        return new_xScale(d.x);
                    }).attr('y1', function (d) {
                        return new_yScale(d.y + d.e);
                    }).attr('y2', function (d) {
                        if (d.y - d.e < 0 && vm.scale.yType === "Log(Y)") {
                            return new_yScale(d.y);
                        } else {
                            return new_yScale(d.y - d.e);
                        }
                    }).style("stroke", function () {
                        return d.color = vm.color(d.key);
                    });

                    // Add error tick top
                    vm.elements.plot.append("g").attr("id", "error-" + vm.ID + "-top-" + d.key).append("g").attr("clip-path", "url(#clip-" + vm.ID + ")").selectAll(".error-" + vm.ID + "-tick-top").data(d.values).enter().append('line').attr('class', 'error-' + vm.ID + '-tick-top').attr('x1', function (d) {
                        return new_xScale(d.x) - 4;
                    }).attr('x2', function (d) {
                        return new_xScale(d.x) + 4;
                    }).attr('y1', function (d) {
                        return new_yScale(d.y + d.e);
                    }).attr('y2', function (d) {
                        return new_yScale(d.y + d.e);
                    }).style("stroke", function () {
                        return d.color = vm.color(d.key);
                    });

                    // Add error tick bottom
                    vm.elements.plot.append("g").attr("id", "error-" + vm.ID + "-bottom-" + d.key).append("g").attr("clip-path", "url(#clip-" + vm.ID + ")").selectAll(".error-" + vm.ID + "-tick-bottom").data(d.values).enter().append('line').attr('class', 'error-' + vm.ID + '-tick-bottom').filter(function (d) {
                        if (vm.scale.yType === "Log(Y)") {
                            return d.y - d.e > 0;
                        } else {
                            return true;
                        }
                    }).attr('x1', function (d) {
                        return new_xScale(d.x) - 4;
                    }).attr('x2', function (d) {
                        return new_xScale(d.x) + 4;
                    }).attr('y1', function (d) {
                        return new_yScale(d.y - d.e);
                    }).attr('y2', function (d) {
                        return new_yScale(d.y - d.e);
                    }).style("stroke", function () {
                        return d.color = vm.color(d.key);
                    });

                    // Add Scatter plot
                    vm.elements.plot.append("g").attr("id", "scatter-" + vm.ID + "-" + d.key).append("g").attr("clip-path", "url(#clip-" + vm.ID + ")").selectAll(".dot").data(d.values).enter().append("circle").attr("class", "dot").filter(function (d) {
                        return d.x !== null && d.x !== NaN && d.y !== null && d.y !== NaN;
                    }).attr("r", 4).attr("cx", function (d) {
                        return new_xScale(d.x);
                    }).attr("cy", function (d) {
                        return new_yScale(d.y);
                    }).style("stroke", "white").style("stroke-width", "1px").style("opacity", 1).style("fill", function () {
                        return d.color = vm.color(d.key);
                    }).on("mouseover", function (d) {

                        vm.elements.tooltip.transition().duration(200).style("opacity", 1);

                        vm.elements.tooltip.html("Name: " + d.name + "<br/>" + "X: " + d.x.toFixed(6) + "<br/>" + "Y: " + d.y.toFixed(6) + "<br/>" + "Error: " + d.e.toFixed(6)).style("top", d3.event.pageY - 40 + "px").style("left", d3.event.pageX + 20 + "px");
                    }).on("mouseout", function (d) {

                        vm.elements.tooltip.transition().duration(500).style("opacity", 0);
                    }).on("click", function (d, i) {
                        //vm.removePoint(i, d.name);

                        $("#myModal").modal('show');

                        $("#btn-yes-delete").on("click", function () {
                            $.when(yes(i, d.name)).done(function () {
                                $("#myModal").modal('hide');
                                vm.updatePlot(vm.plotData);
                            });
                        });

                        $("#btn-no-delete").on("click", function () {
                            $("#btn-no-delete").off();
                            $("#btn-yes-delete").off();
                            $("#myModal").modal('hide');
                        });

                        function yes(index, name) {
                            console.log("Yes");
                            $("#btn-no-delete").off();
                            $("#btn-yes-delete").off();

                            // Remove point from current data
                            vm.plotData.splice(index, 1);

                            // Remove point from stored dataset
                            store.commit('removePoint', { name: name, index: index });
                        }
                    });
                } else {

                    // Re-draw plot lines with new data
                    var lineSelect = vm.elements.plot.select("#line-" + vm.ID + "-" + d.key).select("path").data([d.values]);

                    lineSelect.transition().duration(750).attr("d", vm.line);

                    // Re-draw Error Lines
                    var errorSelect = vm.elements.plot.select("#error-" + vm.ID + "-" + d.key).selectAll("line").data(d.values);

                    errorSelect.transition().duration(750).attr('x1', function (d) {
                        return new_xScale(d.x);
                    }).attr('x2', function (d) {
                        return new_xScale(d.x);
                    }).attr('y1', function (d) {
                        return new_yScale(d.y + d.e);
                    }).attr('y2', function (d) {
                        if (d.y - d.e < 0 && vm.scale.yType === "Log(Y)") {
                            return new_yScale(d.y);
                        } else {
                            return new_yScale(d.y - d.e);
                        }
                    });

                    // Enter new error Lines
                    errorSelect.enter().append('line').attr('class', 'error-' + vm.ID).attr('x1', function (d) {
                        return new_xScale(d.x);
                    }).attr('x2', function (d) {
                        return new_xScale(d.x);
                    }).attr('y1', function (d) {
                        return new_yScale(d.y + d.e);
                    }).attr('y2', function (d) {
                        if (d.y - d.e < 0 && vm.scale.yType === "Log(Y)") {
                            return new_yScale(d.y);
                        } else {
                            return new_yScale(d.y - d.e);
                        }
                    }).style("stroke", function () {
                        return d.color = vm.color(d.key);
                    });

                    // Remove old error lines
                    errorSelect.exit().remove();

                    // Re-draw Error Top
                    var errorTopSelect = vm.elements.plot.select("#error-" + vm.ID + "-top-" + d.key).selectAll("line").data(d.values);

                    errorTopSelect.transition().duration(750).attr('x1', function (d) {
                        return new_xScale(d.x) - 4;
                    }).attr('x2', function (d) {
                        return new_xScale(d.x) + 4;
                    }).attr('y1', function (d) {
                        return new_yScale(d.y + d.e);
                    }).attr('y2', function (d) {
                        return new_yScale(d.y + d.e);
                    });

                    // Enter new error tops
                    errorTopSelect.enter().append('line').attr('class', 'error-' + vm.ID + '-tick-top').attr('x1', function (d) {
                        return new_xScale(d.x) - 4;
                    }).attr('x2', function (d) {
                        return new_xScale(d.x) + 4;
                    }).attr('y1', function (d) {
                        return new_yScale(d.y + d.e);
                    }).attr('y2', function (d) {
                        return new_yScale(d.y + d.e);
                    }).style("stroke", function () {
                        return d.color = vm.color(d.key);
                    });

                    // Remove old error tops
                    errorTopSelect.exit().remove();

                    // Re-draw Error Bottom
                    var errorBottomSelect = vm.elements.plot.select("#error-" + vm.ID + "-bottom-" + d.key).selectAll("line").data(d.values);

                    errorBottomSelect.transition().duration(750).attr('x1', function (d) {
                        return new_xScale(d.x) - 4;
                    }).attr('x2', function (d) {
                        return new_xScale(d.x) + 4;
                    }).attr('y1', function (d) {
                        return new_yScale(d.y - d.e);
                    }).attr('y2', function (d) {
                        return new_yScale(d.y - d.e);
                    });

                    // Enter new error bottoms
                    errorTopSelect.enter().append('line').attr('class', 'error-' + vm.ID + '-tick-bottom').filter(function (d) {
                        if (vm.scale.yType === "Log(Y)") {
                            return d.y - d.e > 0;
                        } else {
                            return true;
                        }
                    }).attr('x1', function (d) {
                        return new_xScale(d.x) - 4;
                    }).attr('x2', function (d) {
                        return new_xScale(d.x) + 4;
                    }).attr('y1', function (d) {
                        return new_yScale(d.y - d.e);
                    }).attr('y2', function (d) {
                        return new_yScale(d.y - d.e);
                    }).style("stroke", function () {
                        return d.color = vm.color(d.key);
                    });

                    // Remove old error bottoms
                    errorBottomSelect.exit().remove();

                    // Update all circles
                    var scatterSelect = vm.elements.plot.select("#scatter-" + vm.ID + "-" + d.key).selectAll("circle").data(d.values);

                    // Re-position points
                    scatterSelect.transition().duration(750).attr("cx", function (d) {
                        return new_xScale(d.x);
                    }).attr("cy", function (d) {
                        return new_yScale(d.y);
                    });

                    // Enter new points
                    scatterSelect.enter().append("circle").attr("class", "dot").filter(function (d) {
                        return d.x !== null && d.x !== NaN && d.y !== null && d.y !== NaN;
                    }).attr("cx", function (d) {
                        return new_xScale(d.x);
                    }).attr("cy", function (d) {
                        return new_yScale(d.y);
                    }).attr("r", 5).attr("stroke", "white").attr("stroke-width", "2px").style("fill", function () {
                        return d.color = vm.color(d.key);
                    }).on("mouseover", function (d) {

                        vm.elements.tooltip.transition().duration(200).style("opacity", 1);

                        vm.elements.tooltip.html("Name: " + d.name + "<br/>" + "X: " + d.x.toFixed(6) + "<br/>" + "Y: " + d.y.toFixed(6) + "<br/>" + "Error: " + d.e.toFixed(6) + "<br/><br/><b>Note:</b> Click point to <em>delete</em> it.").style("top", d3.event.pageY - 40 + "px").style("left", d3.event.pageX + 20 + "px");
                    }).on("mouseout", function (d) {

                        vm.elements.tooltip.transition().duration(500).style("opacity", 0);
                    }).on("click", function (d, i) {
                        vm.removePoint(i, d.name);
                    });

                    // Remove old
                    scatterSelect.exit().remove();
                }
            });

            // Update legend
            vm.updateLegend();

            // Update Labels
            vm.updateLabels();

            // Add keys
            vm.removeLines();
        }
    }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("7t+N")))

/***/ }),

/***/ "EjQk":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.adjustDomains = undefined;

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var adjustDomains = exports.adjustDomains = {
    methods: {
        adjustDomains: function adjustDomains() {
            var vm = this;

            vm.scale.x.domain(d3.extent(vm.plotData, function (d) {
                return d.x;
            })).nice();
            vm.scale.y.domain(d3.extent(vm.plotData, function (d) {
                return d.y;
            })).nice();
        }
    }
};

/***/ }),

/***/ "FLfg":
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "FitConfig"
    }
  }, [_c('div', {
    staticClass: "input-group"
  }, [_c('span', {
    staticClass: "input-group-addon"
  }, [_vm._v("Fit Type")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.fit),
      expression: "fit"
    }],
    staticClass: "form-control",
    attrs: {
      "disabled": _vm.DISABLE
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.fit = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, _vm._l((_vm.fits), function(fit) {
    return _c('option', [_vm._v(_vm._s(fit.fit))])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "input-group"
  }, [_c('span', {
    staticClass: "input-group-addon"
  }, [_vm._v("Equation")]), _vm._v(" "), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "id": "fit-equation",
      "disabled": _vm.DISABLE || _vm.fit === 'None'
    },
    domProps: {
      "value": _vm.EQUATION
    },
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.enterEquation($event)
      },
      "focus": function($event) {
        _vm.isFocus = !_vm.isFocus
      },
      "blur": function($event) {
        _vm.isFocus = !_vm.isFocus
      }
    }
  })]), _vm._v(" "), (_vm.isFocus) ? _c('p', {
    staticClass: "equation-title"
  }, [_vm._v("Press "), _c('strong', [_vm._v("[enter]")]), _vm._v(" to change equation")]) : _vm._e(), _vm._v(" "), _c('fieldset', {
    attrs: {
      "disabled": _vm.DISABLE
    }
  }, [(_vm.isCoefficients) ? _c('div', [_c('h5', [_vm._v("Coefficients:")]), _vm._v(" "), _vm._l((_vm.coefficients), function(coef, key) {
    return _c('div', {
      staticClass: "coefficients-input input-group"
    }, [_c('span', {
      staticClass: "input-group-addon"
    }, [_vm._v(_vm._s(key))]), _vm._v(" "), _c('input', {
      staticClass: "form-control",
      attrs: {
        "type": "text",
        "id": key + '-input'
      },
      domProps: {
        "value": coef
      },
      on: {
        "keyup": function($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
          _vm.enterCoefficients($event)
        }
      }
    })])
  })], 2) : _vm._e(), _vm._v(" "), _c('button', {
    staticClass: "btn btn-danger btn-sm btn-block",
    on: {
      "click": _vm.resetFit
    }
  }, [_c('i', {
    staticClass: "fa fa-times-circle",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Remove Fit")])])])
},staticRenderFns: []}

/***/ }),

/***/ "GwYy":
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-md-12",
    attrs: {
      "id": "Main1D"
    }
  }, [_c('div', {
    staticClass: "container-fluid"
  }, [_c('div', {
    staticClass: "col-md-2"
  }, [_c('v-panel-group', {
    attrs: {
      "MAINTITLE": "Files",
      "PANELTYPE": "primary"
    }
  }, [(!_vm.isOffline) ? _c('v-panel', {
    attrs: {
      "PANELTITLE": "Fetched",
      "PANELTYPE": "success"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.fetchFiles.length > 0),
      expression: "fetchFiles.length > 0"
    }]
  }, [_c('div', [_c('v-filter', {
    on: {
      "filter-job": _vm.filterJob,
      "sort-by-date": _vm.sortByDate
    }
  })], 1), _vm._v(" "), _c('v-table', {
    attrs: {
      "fieldNames": ['Fit', 'Plot', 'Filename', 'Group']
    }
  }, [_vm._l((_vm.fetchFiles('1D', _vm.sortBy, _vm.filterBy)), function(f) {
    return _c('tr', {
      class: _vm.isPlotted(f.filename)
    }, [
      [_c('td', {
        staticClass: "td-check"
      }, [_c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: (_vm.fileFitChoice),
          expression: "fileFitChoice"
        }],
        attrs: {
          "type": "checkbox",
          "disabled": (_vm.isPlotted(f.filename) == 'success' ? false : true)
        },
        domProps: {
          "value": f.filename,
          "checked": Array.isArray(_vm.fileFitChoice) ? _vm._i(_vm.fileFitChoice, f.filename) > -1 : (_vm.fileFitChoice)
        },
        on: {
          "change": _vm.setFileToFit,
          "__c": function($event) {
            var $$a = _vm.fileFitChoice,
              $$el = $event.target,
              $$c = $$el.checked ? (true) : (false);
            if (Array.isArray($$a)) {
              var $$v = f.filename,
                $$i = _vm._i($$a, $$v);
              if ($$el.checked) {
                $$i < 0 && (_vm.fileFitChoice = $$a.concat([$$v]))
              } else {
                $$i > -1 && (_vm.fileFitChoice = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
              }
            } else {
              _vm.fileFitChoice = $$c
            }
          }
        }
      })]), _vm._v(" "), _c('td', {
        staticClass: "td-check"
      }, [_c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: (_vm.filesToPlot),
          expression: "filesToPlot"
        }],
        attrs: {
          "id": f.filename + '-Fetch1D',
          "type": "checkbox"
        },
        domProps: {
          "value": f.filename,
          "checked": Array.isArray(_vm.filesToPlot) ? _vm._i(_vm.filesToPlot, f.filename) > -1 : (_vm.filesToPlot)
        },
        on: {
          "__c": function($event) {
            var $$a = _vm.filesToPlot,
              $$el = $event.target,
              $$c = $$el.checked ? (true) : (false);
            if (Array.isArray($$a)) {
              var $$v = f.filename,
                $$i = _vm._i($$a, $$v);
              if ($$el.checked) {
                $$i < 0 && (_vm.filesToPlot = $$a.concat([$$v]))
              } else {
                $$i > -1 && (_vm.filesToPlot = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
              }
            } else {
              _vm.filesToPlot = $$c
            }
          }
        }
      })]), _vm._v(" "), _c('td', {
        staticClass: "td-name"
      }, [_vm._v(_vm._s(f.filename))]), _vm._v(" "), _c('td', {
        staticClass: "td-name"
      }, [_vm._v(_vm._s(f.jobTitle))])]
    ], 2)
  })], 2)], 1)]) : _vm._e(), _vm._v(" "), _c('v-panel', {
    attrs: {
      "PANELTITLE": "Uploaded",
      "PANELTYPE": "success"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.uploadFiles.length > 0),
      expression: "uploadFiles.length > 0"
    }]
  }, [_c('v-table', {
    attrs: {
      "fieldNames": ['Fit', 'Plot', 'Filename', 'Delete']
    }
  }, [_vm._l((_vm.uploadFiles), function(f) {
    return _c('tr', {
      class: _vm.isPlotted(f.filename)
    }, [
      [_c('td', {
        staticClass: "td-check"
      }, [_c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: (_vm.fileFitChoice),
          expression: "fileFitChoice"
        }],
        attrs: {
          "type": "checkbox",
          "disabled": (_vm.isPlotted(f.filename) == 'success' ? false : true)
        },
        domProps: {
          "value": f.filename,
          "checked": Array.isArray(_vm.fileFitChoice) ? _vm._i(_vm.fileFitChoice, f.filename) > -1 : (_vm.fileFitChoice)
        },
        on: {
          "change": _vm.setFileToFit,
          "__c": function($event) {
            var $$a = _vm.fileFitChoice,
              $$el = $event.target,
              $$c = $$el.checked ? (true) : (false);
            if (Array.isArray($$a)) {
              var $$v = f.filename,
                $$i = _vm._i($$a, $$v);
              if ($$el.checked) {
                $$i < 0 && (_vm.fileFitChoice = $$a.concat([$$v]))
              } else {
                $$i > -1 && (_vm.fileFitChoice = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
              }
            } else {
              _vm.fileFitChoice = $$c
            }
          }
        }
      })]), _vm._v(" "), _c('td', {
        staticClass: "td-check"
      }, [_c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: (_vm.filesToPlot),
          expression: "filesToPlot"
        }],
        attrs: {
          "id": f.filename + '-Upload1D',
          "type": "checkbox"
        },
        domProps: {
          "value": f.filename,
          "checked": Array.isArray(_vm.filesToPlot) ? _vm._i(_vm.filesToPlot, f.filename) > -1 : (_vm.filesToPlot)
        },
        on: {
          "__c": function($event) {
            var $$a = _vm.filesToPlot,
              $$el = $event.target,
              $$c = $$el.checked ? (true) : (false);
            if (Array.isArray($$a)) {
              var $$v = f.filename,
                $$i = _vm._i($$a, $$v);
              if ($$el.checked) {
                $$i < 0 && (_vm.filesToPlot = $$a.concat([$$v]))
              } else {
                $$i > -1 && (_vm.filesToPlot = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
              }
            } else {
              _vm.filesToPlot = $$c
            }
          }
        }
      })]), _vm._v(" "), _c('td', {
        staticClass: "td-name"
      }, [_vm._v(_vm._s(f.filename))]), _vm._v(" "), _c('td', {
        staticClass: "td-name"
      }, [_c('button', {
        staticClass: "btn btn-danger btn-xs",
        on: {
          "click": function($event) {
            _vm.removeFile(f.filename)
          }
        }
      }, [_c('i', {
        staticClass: "fa fa-trash",
        attrs: {
          "aria-hidden": "true"
        }
      })])])]
    ], 2)
  })], 2)], 1)]), _vm._v(" "), (_vm.isFiles) ? _c('div', {
    staticClass: "btn-group btn-group-justified",
    attrs: {
      "id": "btn-selections"
    }
  }, [_c('div', {
    staticClass: "btn-group"
  }, [_c('button', {
    staticClass: "btn btn-default btn-select-all",
    on: {
      "click": _vm.checkAll
    }
  }, [_c('i', {
    staticClass: "fa fa-plus-circle",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Plot All")])]), _vm._v(" "), _c('div', {
    staticClass: "btn-group"
  }, [_c('button', {
    staticClass: "btn btn-default btn-unselect-all",
    attrs: {
      "disabled": _vm.disable
    },
    on: {
      "click": _vm.clearSelected
    }
  }, [_c('i', {
    staticClass: "fa fa-minus-circle",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Remove All")])])]) : _vm._e()], 1), _vm._v(" "), _c('v-panel-group', {
    attrs: {
      "MAINTITLE": "Controls",
      "PANELTYPE": "primary"
    }
  }, [_c('v-panel', {
    attrs: {
      "PANELTITLE": "Scales",
      "PANELTYPE": "success",
      "COLLAPSE": false
    }
  }, [_c('v-scales', {
    ref: "scales",
    attrs: {
      "DISABLE": _vm.disable
    },
    on: {
      "update-scales": _vm.setScales,
      "reset-scales": _vm.resetScales
    }
  })], 1), _vm._v(" "), _c('v-panel', {
    attrs: {
      "PANELTITLE": "Transformations",
      "PANELTYPE": "success",
      "COLLAPSE": true
    }
  }, [_c('v-transformation', {
    attrs: {
      "XTRANS": _vm.$data.currentConfiguration.xTransformation,
      "YTRANS": _vm.$data.currentConfiguration.yTransformation,
      "DISABLE": _vm.disable
    },
    on: {
      "set-transformations": _vm.setTransformations,
      "reset-transformations": _vm.resetTransformations
    }
  })], 1), _vm._v(" "), _c('v-panel', {
    attrs: {
      "PANELTITLE": "Fit Configurations",
      "PANELTYPE": "success",
      "COLLAPSE": true
    }
  }, [_c('v-fit-config', {
    ref: "fit_configurations",
    attrs: {
      "DISABLE": this.fileToFit === null,
      "EQUATION": _vm.$data.currentConfiguration.equation
    },
    on: {
      "set-fit": _vm.setFit,
      "set-fit-setting": _vm.setFitSettings,
      "set-equation": _vm.setEquation,
      "reset-file-fit-choice": _vm.resetFileFitChoice
    }
  })], 1), _vm._v(" "), _c('v-panel', {
    attrs: {
      "PANELTITLE": "Levenberg–Marquardt Settings",
      "PANELTYPE": "info",
      "COLLAPSE": true
    }
  }, [_c('v-levenberg', {
    ref: "fit_settings",
    attrs: {
      "DISABLE": this.fileToFit === null
    },
    on: {
      "set-fit-settings": _vm.setFitSettings
    }
  })], 1)], 1)], 1), _vm._v(" "), _c('v-plot-1D', {
    ref: "plot_1D",
    attrs: {
      "DISABLE": _vm.disable,
      "SHOWTABLE": _vm.fileToFit !== null && _vm.$data.currentConfiguration.fit !== 'None'
    }
  })], 1)])
},staticRenderFns: []}

/***/ }),

/***/ "HBd6":
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__("L0b9")
}
var Component = __webpack_require__("VU/8")(
  /* script */
  __webpack_require__("z8w2"),
  /* template */
  __webpack_require__("vAUG"),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-76ab255a",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ "HYj2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formatData = undefined;

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var formatData = exports.formatData = {
    methods: {
        formatData: function formatData(data) {
            var vm = this;

            var formatted = [];

            var _loop = function _loop(i, len) {
                var tempData = data[i].values;
                var tempName = data[i].key;

                var x = [],
                    y = [],
                    e = [];

                tempData.forEach(function (el) {
                    x.push(el.x);
                    y.push(el.y);
                    e.push(el.e);
                });

                formatted.push([tempName, { x: x, y: y, e: e }]);
            };

            for (var i = 0, len = data.length; i < len; i++) {
                _loop(i, len);
            }

            // Sort curves form least to greatest
            formatted.sort(function (a, b) {
                var minA = _.min(a[1].x);
                var minB = _.min(b[1].x);

                return minA - minB;
            });

            return formatted;
        }
    }
};

/***/ }),

/***/ "HeXS":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

var _lodash = __webpack_require__("M4fF");

var _lodash2 = _interopRequireDefault(_lodash);

var _Panel = __webpack_require__("wV86");

var _Panel2 = _interopRequireDefault(_Panel);

var _PanelGroup = __webpack_require__("HBd6");

var _PanelGroup2 = _interopRequireDefault(_PanelGroup);

var _Table = __webpack_require__("iMsY");

var _Table2 = _interopRequireDefault(_Table);

var _TableFilter = __webpack_require__("2U0f");

var _TableFilter2 = _interopRequireDefault(_TableFilter);

var _ResetButton = __webpack_require__("OHJc");

var _ResetButton2 = _interopRequireDefault(_ResetButton);

var _readData = __webpack_require__("Wic3");

var _fetchFiles = __webpack_require__("ggtl");

var _filterJobs = __webpack_require__("i3RT");

var _isOffline = __webpack_require__("cy2k");

var _hexModule = __webpack_require__("ogg4");

var _hexModule2 = _interopRequireDefault(_hexModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/* Import Components */
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* Import Libraries */
exports.default = {
    name: 'Plot2D',
    mixins: [_readData.parse2D, _readData.read2DData, _readData.get2DData, _fetchFiles.fetchFiles, _filterJobs.filterJobs, _isOffline.isOffline],
    components: {
        'v-panel-group': _PanelGroup2.default,
        'v-panel': _Panel2.default,
        'v-table': _Table2.default,
        'v-filter': _TableFilter2.default,
        'v-reset-button': _ResetButton2.default
    },
    data: function data() {
        return {
            filePlotChoices: [],
            fileToPlot: null,
            filterBy: 'All',
            sortBy: 'ascending',
            tempBinSize: 15,
            tempTransform: 'Log',
            hexSettings: {
                intensityTransformation: 'Log',
                binSize: 15
            },
            currentData: []
        };
    },
    computed: {
        uploadFiles: function uploadFiles() {
            return _lodash2.default.cloneDeep(this.$store.getters.getUploaded2D);
        }
    },
    methods: {
        resetSettings: function resetSettings() {
            this.tempBinSize = 15;
            this.tempTransform = 'Log';

            this.hexSettings = {
                intensityTransformation: 'Log',
                binSize: 15
            };
        },
        setHexSettings: function setHexSettings() {
            this.hexSettings = {
                intensityTransformation: this.tempTransform,
                binSize: this.tempBinSize
            };
        },
        isPlotted: function isPlotted(filename) {
            //Dynamically style the file lists blue for plotted data
            if (this.fileToPlot === filename) {
                return "success";
            } else {
                return "default";
            }
        },
        setFileToPlot: function setFileToPlot() {
            if (this.filePlotChoices.length > 0) this.filePlotChoices = this.filePlotChoices.slice(-1);

            this.fileToPlot = this.filePlotChoices[0] ? this.filePlotChoices[0] : null;
        },
        removeFile: function removeFile(filename) {
            // If file is in fileToPlot or filePlotChoices, remove it
            // and remove plot elements
            if (this.fileToPlot === filename) {
                this.fileToPlot = null;
                this.filePlotChoices = [];
            }
            d3.select(".chart-2D").remove();
            d3.select(".tooltip-2D").remove();

            this.$store.commit('remove2DFile', filename);
        },

        hexPlot: _hexModule2.default.hexPlot,
        resetPlot: _hexModule2.default.resetPlot,
        zoomed: _hexModule2.default.zoomed
    },
    watch: {
        hexSettings: {
            handler: function handler() {
                this.hexPlot(this.currentData, this.hexSettings);
            },
            deep: true
        },
        fileToPlot: function fileToPlot() {
            // Check if file is in the stored 2d list
            // a value of '999' means no data is stored
            if (this.fileToPlot !== null) {
                var data2D = this.$store.getters.getSaved2D(this.fileToPlot);

                // If not, Check if the file is in the Fetched list or Uploaded
                if (data2D === '999') {
                    var inUpload2D = this.$store.getters.inUploaded2D(this.fileToPlot);

                    if (inUpload2D) {
                        // It's an uploaded file so read the data from blob
                        this.read2DData(inUpload2D);
                    } else {
                        // It's a fetched file so get file then get the data url
                        var file = this.$store.getters.get2DFile(this.fileToPlot);
                        this.get2DData(file);
                    }
                } else {
                    // File is in saved, so let's plot it
                    this.currentData = data2D;
                    this.hexPlot(data2D, this.hexSettings);
                }
            } else {

                this.currentData = [];
                // Remove any current 2D plots
                d3.select(".chart-2D").remove();
                d3.select(".tooltip-2D").remove();
            }
        }
    }
};

/* Import Hex Module */


/* Import Mixins */

/***/ }),

/***/ "I3MW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initDimensions = undefined;

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initDimensions = exports.initDimensions = {
    methods: {
        initDimensions: function initDimensions() {
            var vm = this;

            // Set plot dimensions
            var containerWidth = document.getElementById("plot-" + vm.ID).offsetWidth; // Pull plot's parent container width, this will be used to scale the plot responsively

            var viewHeight = containerWidth / (vm.dimensions.aspectW / vm.dimensions.aspectH);

            vm.dimensions.h = viewHeight - vm.margin.top - vm.margin.bottom;

            vm.dimensions.w = containerWidth - vm.margin.left - vm.margin.right;

            vm.dimensions.viewbox = "0 0 " + containerWidth + " " + viewHeight;
        }
    }
};

/***/ }),

/***/ "IcnI":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__("7+uW");

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__("NYxO");

var _vuex2 = _interopRequireDefault(_vuex);

var _actions = __webpack_require__("mUbh");

var actions = _interopRequireWildcard(_actions);

var _getters = __webpack_require__("UjVw");

var getters = _interopRequireWildcard(_getters);

var _mutations = __webpack_require__("ukYY");

var mutations = _interopRequireWildcard(_mutations);

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

exports.default = new _vuex2.default.Store({
  state: {
    fetched1DFiles: [],
    fetched2DFiles: [],
    uploaded1DFiles: [],
    uploaded2DFiles: [],
    saved1DData: {},
    saved2DData: {},
    colorDomain: [],
    xScales: {
      'X': d3.scaleLinear(),
      'X^2': d3.scalePow().exponent(2),
      'Log(X)': d3.scaleLog()
    },
    yScales: {
      'Y': d3.scaleLinear(),
      'Y^2': d3.scalePow().exponent(2),
      'Log(Y)': d3.scaleLog()
    },
    fitConfigurations: {
      'None': {
        fit: 'None',
        equation: '',
        yTransformation: 'y',
        xTransformation: 'x',
        eTransformation: 'e',
        yLabel: "I",
        xLabel: "Q",
        note: ""
      },
      'Linear': {
        fit: 'Linear',
        equation: 'm*x+b',
        yTransformation: 'y',
        xTransformation: 'x',
        eTransformation: "e",
        yLabel: "I",
        xLabel: "Q",
        note: ""
      },
      'Guinier': {
        fit: 'Guinier',
        equation: "-Rg^2/3*x+I0",
        yTransformation: "log(y)",
        xTransformation: "x^2",
        eTransformation: "((1/y)*e)^2",
        yLabel: "Log(I(q))",
        xLabel: "q^2",
        note: ""
      },
      'Low-Q Guinier': {
        fit: 'Low-Q Guinier',
        equation: "-(L^2/12+Rg^2/2)/3*x+I0",
        yTransformation: "log(y)",
        xTransformation: "x^2",
        eTransformation: "((1/y)*e)^2",
        yLabel: "Log(I(q))",
        xLabel: "q^2",
        note: "Cylinder of length L and Radius R"
      },
      'Intermediate-Q Guinier': {
        fit: 'Intermediate-Q Guinier',
        equation: "-(Rg^2/2)/3*x+I0/x",
        yTransformation: "log(x*y)",
        xTransformation: "x^2",
        eTransformation: "((1/y)*e)^2",
        yLabel: "Log(q*I(q))",
        xLabel: "q^2",
        note: "Radius R"
      },
      'Flat Object Guinier': {
        fit: 'Flat Object Guinier',
        equation: "-(T^2/12)/3*x+I0/x^2",
        yTransformation: "log(x^2*y)",
        xTransformation: "x^2",
        eTransformation: "((1/y)*e)^2",
        yLabel: "Log(q^2*I(q))",
        xLabel: "q^2",
        note: "T is the thickness of a flat (lamella) object."
      },
      'Porod': {
        fit: 'Porod',
        equation: "log10(A)-n*log10(x)",
        yTransformation: "log10(y)",
        xTransformation: "log10(x)",
        eTransformation: "(1/y * e)^2",
        yLabel: "Log10(I(q))",
        xLabel: "Log10(q)",
        note: "This is valid for high Q."
      },
      'Zimm': {
        fit: 'Zimm',
        equation: "1/I0+Cl^2/I0*x",
        yTransformation: "1/y",
        xTransformation: "x^2",
        eTransformation: "((-1/y^2)*e)^2",
        yLabel: "1/I(q)",
        xLabel: "q^2",
        note: ""
      },
      'Kratky': {
        fit: 'Kratky',
        equation: "m*x+b",
        yTransformation: "x^2*log(y)",
        xTransformation: "x",
        // because there's no error for X I'm doing e(x) = 0.1
        // e(x) = sqrt(x) is annoying for high x
        eTransformation: "(x^2/y * e)^2 + (2*x*log(y) * 0.1)^2",
        yLabel: "q^2 \times log(I)",
        xLabel: "q",
        note: ""
      },
      'Debye Beuche': {
        fit: 'Debye Beuche',
        equation: "m*x+I0",
        yTransformation: "sqrt(y)",
        xTransformation: "x^2",
        eTransformation: "(1/(2*sqrt(y))*e)^2",
        yLabel: "sqrt(I)",
        xLabel: "Q^2",
        note: ""
      }
    },
    fitSettings: {
      damping: 0.001,
      initialValues: [],
      gradientDifference: 0.1,
      maxIterations: 100,
      errorTolerance: 0.001
    }
  },
  actions: actions,
  getters: getters,
  mutations: mutations
});

/***/ }),

/***/ "J/Bz":
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__("u1G2")
}
var Component = __webpack_require__("VU/8")(
  /* script */
  __webpack_require__("hdHG"),
  /* template */
  __webpack_require__("9ykZ"),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0d3273b9",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ "JqY8":
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__("k970")
}
var Component = __webpack_require__("VU/8")(
  /* script */
  __webpack_require__("HeXS"),
  /* template */
  __webpack_require__("MA1b"),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-66f510d0",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ "JrMw":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/fonts/glyphicons-halflings-regular.e18bbf6.ttf";

/***/ }),

/***/ "JsFO":
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "table-container"
  }, [_c('table', {
    staticClass: "table table-hover table-bordered"
  }, [_c('thead', [_c('tr', _vm._l((_vm.fieldNames), function(field) {
    return _c('th', [_vm._v(_vm._s(field))])
  }))]), _vm._v(" "), _c('tbody', [_vm._t("default")], 2)])])
},staticRenderFns: []}

/***/ }),

/***/ "L0b9":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "M93x":
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__("9PLl")
}
var Component = __webpack_require__("VU/8")(
  /* script */
  __webpack_require__("xJD8"),
  /* template */
  __webpack_require__("Sx8f"),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ "MA1b":
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-md-12",
    attrs: {
      "id": "Plot2D"
    }
  }, [_c('div', {
    staticClass: "container-fluid"
  }, [_c('div', {
    staticClass: "col-md-2"
  }, [_c('v-panel-group', {
    attrs: {
      "MAINTITLE": "Files",
      "PANELTYPE": "primary"
    }
  }, [(!_vm.isOffline) ? _c('v-panel', {
    attrs: {
      "PANELTITLE": "Fetched Data",
      "PANELTYPE": "success"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.fetchFiles.length > 0),
      expression: "fetchFiles.length > 0"
    }]
  }, [_c('div', [_c('v-filter', {
    on: {
      "filter-job": _vm.filterJob,
      "sort-by-date": _vm.sortByDate
    }
  })], 1), _vm._v(" "), _c('v-table', {
    attrs: {
      "fieldNames": ['Plot', 'Filename', 'Group']
    }
  }, [_vm._l((_vm.fetchFiles('2D', _vm.sortBy, _vm.filterBy)), function(f) {
    return _c('tr', {
      class: _vm.isPlotted(f.filename)
    }, [
      [_c('td', {
        staticClass: "td-check"
      }, [_c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: (_vm.filePlotChoices),
          expression: "filePlotChoices"
        }],
        attrs: {
          "type": "checkbox"
        },
        domProps: {
          "value": f.filename,
          "checked": Array.isArray(_vm.filePlotChoices) ? _vm._i(_vm.filePlotChoices, f.filename) > -1 : (_vm.filePlotChoices)
        },
        on: {
          "change": _vm.setFileToPlot,
          "__c": function($event) {
            var $$a = _vm.filePlotChoices,
              $$el = $event.target,
              $$c = $$el.checked ? (true) : (false);
            if (Array.isArray($$a)) {
              var $$v = f.filename,
                $$i = _vm._i($$a, $$v);
              if ($$el.checked) {
                $$i < 0 && (_vm.filePlotChoices = $$a.concat([$$v]))
              } else {
                $$i > -1 && (_vm.filePlotChoices = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
              }
            } else {
              _vm.filePlotChoices = $$c
            }
          }
        }
      })]), _vm._v(" "), _c('td', {
        staticClass: "td-name"
      }, [_vm._v(_vm._s(f.filename))]), _vm._v(" "), _c('td', {
        staticClass: "td-name"
      }, [_vm._v(_vm._s(f.jobTitle))])]
    ], 2)
  })], 2)], 1)]) : _vm._e(), _vm._v(" "), _c('v-panel', {
    attrs: {
      "PANELTITLE": "Uploaded Data",
      "PANELTYPE": "success"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.uploadFiles.length > 0),
      expression: "uploadFiles.length > 0"
    }]
  }, [_c('v-table', {
    attrs: {
      "fieldNames": ['Plot', 'Filename', 'Delete']
    }
  }, [_vm._l((_vm.uploadFiles), function(f) {
    return _c('tr', {
      class: _vm.isPlotted(f.filename)
    }, [
      [_c('td', {
        staticClass: "td-check"
      }, [_c('input', {
        directives: [{
          name: "model",
          rawName: "v-model",
          value: (_vm.filePlotChoices),
          expression: "filePlotChoices"
        }],
        attrs: {
          "type": "checkbox"
        },
        domProps: {
          "value": f.filename,
          "checked": Array.isArray(_vm.filePlotChoices) ? _vm._i(_vm.filePlotChoices, f.filename) > -1 : (_vm.filePlotChoices)
        },
        on: {
          "change": _vm.setFileToPlot,
          "__c": function($event) {
            var $$a = _vm.filePlotChoices,
              $$el = $event.target,
              $$c = $$el.checked ? (true) : (false);
            if (Array.isArray($$a)) {
              var $$v = f.filename,
                $$i = _vm._i($$a, $$v);
              if ($$el.checked) {
                $$i < 0 && (_vm.filePlotChoices = $$a.concat([$$v]))
              } else {
                $$i > -1 && (_vm.filePlotChoices = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
              }
            } else {
              _vm.filePlotChoices = $$c
            }
          }
        }
      })]), _vm._v(" "), _c('td', {
        staticClass: "td-name"
      }, [_vm._v(_vm._s(f.filename))]), _vm._v(" "), _c('td', {
        staticClass: "td-name"
      }, [_c('button', {
        staticClass: "btn btn-danger btn-xs",
        on: {
          "click": function($event) {
            _vm.removeFile(f.filename)
          }
        }
      }, [_c('i', {
        staticClass: "fa fa-trash",
        attrs: {
          "aria-hidden": "true"
        }
      })])])]
    ], 2)
  })], 2)], 1)])], 1), _vm._v(" "), _c('v-panel-group', {
    attrs: {
      "MAINTITLE": "Controls",
      "PANELTYPE": "primary"
    }
  }, [_c('v-panel', {
    attrs: {
      "PANELTITLE": "Hexbin Settings",
      "PANELTYPE": "success"
    }
  }, [_c('fieldset', {
    attrs: {
      "disabled": _vm.currentData.length === 0
    }
  }, [_c('label', [_vm._v("Bin Size: "), _c('span', {
    staticClass: "damping-output"
  }, [_vm._v(_vm._s(_vm.tempBinSize))])]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.number",
      value: (_vm.tempBinSize),
      expression: "tempBinSize",
      modifiers: {
        "number": true
      }
    }],
    attrs: {
      "type": "range",
      "min": "5",
      "max": "25",
      "step": "1"
    },
    domProps: {
      "value": (_vm.tempBinSize)
    },
    on: {
      "mouseup": _vm.setHexSettings,
      "keyup": _vm.setHexSettings,
      "touchend": _vm.setHexSettings,
      "__r": function($event) {
        _vm.tempBinSize = _vm._n($event.target.value)
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "input-group"
  }, [_c('span', {
    staticClass: "input-group-addon"
  }, [_vm._v("Intensity Scale")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.tempTransform),
      expression: "tempTransform"
    }],
    staticClass: "form-control",
    on: {
      "change": [function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.tempTransform = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }, _vm.setHexSettings]
    }
  }, [_c('option', [_vm._v("Log")]), _vm._v(" "), _c('option', [_vm._v("Linear")])])]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-warning btn-sm",
    attrs: {
      "id": "btn-reset-hex-settings"
    },
    on: {
      "click": _vm.resetSettings
    }
  }, [_c('i', {
    staticClass: "fa fa-refresh",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Reset")])])])], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "col-md-10",
    attrs: {
      "id": "plot-2d-col"
    }
  }, [_c('v-panel', {
    attrs: {
      "PANELTITLE": "2D Plot",
      "PANELTYPE": "primary"
    }
  }, [(_vm.currentData.length > 0) ? _c('v-reset-button', {
    attrs: {
      "slot": "header-content",
      "onClick": _vm.resetPlot
    },
    slot: "header-content"
  }, [_vm._v("Reset Plot")]) : _vm._e(), _vm._v(" "), _c('div', {
    attrs: {
      "id": "plot-2D"
    }
  })], 1)], 1)])])
},staticRenderFns: []}

/***/ }),

/***/ "MMS3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateSelections = exports.validateBrushes = undefined;

var _keys = __webpack_require__("fZjL");

var _keys2 = _interopRequireDefault(_keys);

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

var _lodash = __webpack_require__("M4fF");

var _lodash2 = _interopRequireDefault(_lodash);

var _eventBus = __webpack_require__("OXcg");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateBrushes = exports.validateBrushes = {
    methods: {
        validateBrushes: function validateBrushes() {
            var vm = this;

            // console.log(brushObj.brushSelections);
            // console.log(Object.keys(brushObj.brushSelections));
            var totalBrushes = (0, _keys2.default)(vm.brushObj.brushSelections).length;

            if (totalBrushes === 0) {
                console.log("No brushes to select data.");

                // Emit error message pop-up
                var errorMsg = "<strong>Error!</strong> No brushes to select data. Draw brushes.";
                _eventBus.eventBus.$emit('error-message', errorMsg, 'danger');

                return true;
            } else if (totalBrushes !== vm.brushObj.brushCount) {
                console.log("There are " + (vm.brushObj.brushCount + 1) + " lines. You must have (n-1) = " + vm.brushObj.brushCount + " number of brushes.");

                // Emit error message pop-up
                var _errorMsg = "<strong>Error!</strong>" + " There are " + (vm.brushObj.brushCount + 1) + " lines. You must have (n-1) = " + vm.brushObj.brushCount + " number of brushes. Redraw brushes.";
                _eventBus.eventBus.$emit('error-message', _errorMsg, 'danger');

                return true;
            } else {
                return false;
            }
        }
    }
};

// The eventBus serves as the means to communicating between components.
var validateSelections = exports.validateSelections = {
    methods: {
        validateSelections: function validateSelections(selected) {
            var vm = this;

            var lineNames = [];

            for (var i = 0, len = vm.dataNest.length; i < len; i++) {
                lineNames.push(vm.dataNest[i].key);
            }

            // First make sure only 2 lines and only 2 lines are selected per brush
            for (var _i = 0, _len = selected.length; _i < _len; _i++) {
                var tempBrush = selected[_i];

                // console.log("Temp brush", tempBrush);
                if (tempBrush.length - 1 !== 2) {
                    console.log("Make sure a brush selects 2 and only 2 lines.");

                    // Emit error message pop-up
                    var errorMsg = "<strong>Error!</strong> Make sure a brush selects 2 and only 2 lines. Redraw brushes.";
                    _eventBus.eventBus.$emit('error-message', errorMsg, 'danger');

                    return true;
                }
            }

            // Reduce keys to a non-nested array
            var keys = [];

            for (var _i2 = 0, _len2 = selected.length; _i2 < _len2; _i2++) {
                for (var j = 0, _len3 = selected[_i2].length - 1; j < _len3; j++) {

                    // Check that each brush selects more than one point per curve
                    // Leverberg Marquardt cannot fit arrays of length = 1
                    if (selected[_i2][j][2].x.length < 2) {
                        console.log("Select more than 1 data point per curve.");

                        // Emit error message pop-up
                        var _errorMsg2 = "<strong>Error!</strong> Select more than 1 data point per curve. Redraw brushes.";
                        _eventBus.eventBus.$emit('error-message', _errorMsg2, 'danger');

                        return true;
                    }

                    keys.push(selected[_i2][j][0]);
                }
            }

            // If none of the items in keys matches to lineNames,
            // set to true because not all lines have been selected in brushes
            for (var _i3 = 0, _len4 = lineNames.length; _i3 < _len4; _i3++) {
                if (keys.indexOf(lineNames[_i3]) === -1) {
                    console.log(lineNames[_i3] + " was not selected. Make sure each line is selected.");

                    // Emit error message pop-up
                    var _errorMsg3 = "<strong>Error!</strong> " + lineNames[_i3] + " was not selected. Make sure each line is selected. Redraw brushes.";
                    _eventBus.eventBus.$emit('error-message', _errorMsg3, 'danger');

                    return true;
                }
            }

            return false;
        }
    }
};

/***/ }),

/***/ "MZls":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("9tWe");
__webpack_require__("9AN0");

/***/ }),

/***/ "MrIk":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateLabels = undefined;

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var updateLabels = exports.updateLabels = {
    methods: {
        updateLabels: function updateLabels() {
            var vm = this;

            // Updated axis according to any new transformations
            // Add X Axis Label
            vm.elements.svg.select("#xLabel-" + vm.ID).html("`" + vm.labels.x + "`");
            vm.elements.svg.select("#yLabel-" + vm.ID).html("`" + vm.labels.y + "`");
            vm.elements.svg.select("#plotTitle-" + vm.ID).html("`" + vm.labels.y + "` vs `" + vm.labels.x + "`");

            // Call MathJax to make plot axis labels look pretty 
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, ["xLabel-" + vm.ID, "yLabel-" + vm.ID, "plotTitle-" + vm.ID]]);
        }
    }
};

/***/ }),

/***/ "N/+b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateLegend = undefined;

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var updateLegend = exports.updateLegend = {
    methods: {
        updateLegend: function updateLegend() {
            var vm = this;

            var keys = [];
            vm.dataNest.forEach(function (el) {
                keys.push(el.key);
            });

            var w = document.getElementById('plot-' + vm.ID).offsetWidth;

            var legend = vm.elements.svg.select("#legend-" + vm.ID);

            var legendBox = legend.selectAll("rect").data(keys, function (d) {
                return d;
            });

            legendBox.exit().remove();

            legendBox.enter().append("rect").merge(legendBox).attr("x", function (d, i) {
                return w > 1400 ? vm.dimensions.w - vm.margin.right * 4.5 + 'px' : w > 1000 ? vm.dimensions.w - vm.margin.right * 4 + 'px' : vm.dimensions.w - vm.margin.right * 3 + 'px';
            }).attr("y", function (d, i) {
                return w > 1400 ? vm.margin.top + i * 25 + 'px' : w > 1000 ? vm.margin.top / 1.5 + i * 25 + 'px' : vm.margin.top / 2 + i * 20 + 'px';
            }).attr("width", 10).attr("height", 10).style("fill", function (d, i) {
                return vm.color(d);
            }).attr("height", "8px").attr("width", "8px");

            var legendText = legend.selectAll("text").data(keys, function (d) {
                return d;
            });

            legendText.exit().remove();

            legendText.enter().append("text").merge(legendText).attr("x", function (d, i) {
                return w > 1400 ? vm.dimensions.w - vm.margin.right * 4.5 + 15 + 'px' : w > 1000 ? vm.dimensions.w - vm.margin.right * 4 + 15 + 'px' : vm.dimensions.w - vm.margin.right * 3 + 15 + 'px';
            }).attr("y", function (d, i) {
                return w > 1400 ? vm.margin.top + 8 + i * 25 + 'px' : w > 1000 ? (vm.margin.top + 12) / 1.5 + i * 25 + 'px' : (vm.margin.top + 14) / 2 + i * 20 + 'px';
            }).style("fill", function (d, i) {
                return vm.color(d);
            }).style("font-size", "12px").style("font-weight", "bold").text(function (d) {
                return d;
            });
        }
    }
};

/***/ }),

/***/ "N/dK":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/glyphicons-halflings-regular.8988968.svg";

/***/ }),

/***/ "NHnr":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__("7+uW");

var _vue2 = _interopRequireDefault(_vue);

var _App = __webpack_require__("M93x");

var _App2 = _interopRequireDefault(_App);

var _router = __webpack_require__("YaEn");

var _router2 = _interopRequireDefault(_router);

var _index = __webpack_require__("IcnI");

var _index2 = _interopRequireDefault(_index);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Import Store */
__webpack_require__("gNGx");
__webpack_require__("MZls");

new _vue2.default({
  el: '#app',
  router: _router2.default,
  store: _index2.default,
  render: function render(h) {
    return h(_App2.default);
  }
});

/***/ }),

/***/ "NlVB":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.changeScales = undefined;

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var changeScales = exports.changeScales = {
    methods: {
        changeScales: function changeScales(values) {
            var vm = this;

            vm.scale.x = values.xScale.copy();
            vm.scale.y = values.yScale.copy();

            // update scale types
            vm.scale.yType = values.yScaleType;

            // if theres a fit, update brush scale
            // if(vm.isFit) {
            //     vm.scale.x2 = values.xScale.copy();
            //     vm.scale.x2.range([0, vm.dimensions.w]);
            // }

            vm.scale.x.range([0, vm.dimensions.w]);
            vm.scale.y.range([vm.dimensions.h, 0]);

            // // update plot
            // my.update(plotData);
        }
    }
};

/***/ }),

/***/ "OHJc":
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__("6hhn")
}
var Component = __webpack_require__("VU/8")(
  /* script */
  __webpack_require__("0lb+"),
  /* template */
  __webpack_require__("AvW4"),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-06d70a40",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ "OXcg":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventBus = undefined;

var _vue = __webpack_require__("7+uW");

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eventBus = exports.eventBus = new _vue2.default();

/***/ }),

/***/ "OiiA":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.drawSavedBrushes = exports.sortBrushes = exports.removeBrushes = exports.drawBrushes = exports.newBrush = undefined;

var _keys = __webpack_require__("fZjL");

var _keys2 = _interopRequireDefault(_keys);

var _assign = __webpack_require__("woOf");

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = __webpack_require__("bOdI");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

var _lodash = __webpack_require__("M4fF");

var _lodash2 = _interopRequireDefault(_lodash);

var _eventBus = __webpack_require__("OXcg");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var newBrush = exports.newBrush = {
    methods: {
        newBrush: function newBrush() {
            var vm = this;

            // console.log("new brush");
            var brush = d3.brushX().extent([[0, 0], [vm.dimensions.w, vm.dimensions.h]]).on("start", brushstart).on("brush", brushed).on("end", brushend);

            vm.brushObj.brushes.push({ id: vm.brushObj.brushes.length, brush: brush, selection: undefined });

            function brushstart() {
                // Brush start here
            };

            function brushed() {
                var rawSelection = d3.event.selection;
                var convertedSelection = d3.event.selection.map(function (i) {
                    return vm.scale.brushX.invert(i);
                });

                // this is to let Vue able to watch dynamic changes to brush selections
                // that way they can be printed in the table with a computed property.
                var tobj = (0, _defineProperty3.default)({}, this.id, {
                    raw: rawSelection,
                    converted: convertedSelection
                });

                vm.brushObj.brushSelections = (0, _assign2.default)({}, vm.brushObj.brushSelections, tobj);
                // console.log("Selections are: ", brushObj.brushSelections);
                // console.log("ID:", this.id);
            }

            function brushend() {
                // Figure out if our latest brush has a selection
                var lastBrushID = vm.brushObj.brushes[vm.brushObj.brushes.length - 1].id;
                var lastBrush = document.getElementById('brush-' + lastBrushID);
                var selection = d3.brushSelection(lastBrush);

                if (selection && selection[0] !== selection[1]) {
                    vm.brushObj.brushes[vm.brushObj.brushes.length - 1].selection = [vm.scale.x.invert(selection[0]), vm.scale.x.invert(selection[1])];
                    // console.log("Brushes:", brushes);
                }

                // If it does, that means we need another one
                if (vm.brushObj.brushes.length < vm.brushObj.brushCount && selection && selection[0] !== selection[1]) {
                    vm.newBrush();
                }

                // Always draw brushes
                vm.drawBrushes();
            }
        }
    }
};

// The eventBus serves as the means to communicating between components.
var drawBrushes = exports.drawBrushes = {
    methods: {
        drawBrushes: function drawBrushes() {
            var vm = this;

            var brushSelection = vm.brushObj.brushGroup.selectAll('.brush').data(vm.brushObj.brushes, function (d) {
                return d.id;
            });

            // Set up new brushes
            brushSelection.enter().insert("g", '.brush').attr('class', 'brush').attr('id', function (brush) {
                return "brush-" + brush.id;
            }).each(function (brushItem) {
                // call the brush
                brushItem.brush(d3.select(this));

                if (brushItem.selection !== undefined) {
                    brushItem.brush.move(d3.select(this), brushItem.selection.map(vm.scale.brushX));
                }
            });

            brushSelection.each(function (brushItem) {

                d3.select(this).attr('class', 'brush').selectAll('.overlay').style('pointer-events', function () {
                    var brush = brushItem.brush;
                    if (brushItem.id === vm.brushObj.brushes.length - 1 && brush !== undefined) {
                        return 'all';
                    } else {
                        return 'none';
                    }
                });
            });

            brushSelection.exit().remove();
        }
    }
};

var removeBrushes = exports.removeBrushes = {
    methods: {
        removeBrushes: function removeBrushes() {
            var vm = this;

            vm.brushObj.brushGroup.selectAll('.brush').remove();

            vm.brushObj.brushes = [];
            vm.brushObj.brushSelections = {};

            if (vm.brushObj.brushCount >= 1) {
                vm.newBrush();
                vm.drawBrushes();
            }

            vm.toggleEdit(vm.toggleChoice);
        }
    }
};

var sortBrushes = exports.sortBrushes = {
    methods: {
        sortBrushes: function sortBrushes() {
            var vm = this;
            // The object will be turned to an order array,
            // because objects do not promise an exact order like arrays.

            var sorted = _lodash2.default.toPairs(_lodash2.default.cloneDeep(vm.brushObj.brushSelections));

            sorted.sort(function (a, b) {
                return a[1].raw[0] - b[1].raw[0];
            });

            return sorted;
        }
    }
};

var drawSavedBrushes = exports.drawSavedBrushes = {
    methods: {
        drawSavedBrushes: function drawSavedBrushes() {
            var vm = this;
            // console.log("Drawing saved brushes...", savedSelections);

            for (var key in vm.savedSelections) {
                var tempExtent = [vm.savedSelections[key].converted[0], vm.savedSelections[key].converted[1]];
                // console.log("Temp extent:", tempExtent);
            }

            // console.log("Saved brushes:", savedBrushes);

            vm.brushObj.brushes = [];
            vm.brushObj.brushSelections = {};

            vm.elements.zoom.selectAll('.brush').remove();

            var selected = vm.elements.zoom.selectAll('.selected'); //document.getElementsByClassName('selected');
            selected.classed('selected', false);

            // while(selected.length) {
            //     selected[0].classList.remove('selected');
            // }

            if (vm.brushObj.brushCount < vm.savedBrushes.length) {
                var errorMsg = "<strong>Warning!</strong> The brush settings were for 3 curves. There are only " + (vm.brushObj.brushCount + 1) + " curves. Please plot 3 curves, or re-draw brushes for current curves.";

                _eventBus.eventBus.$emit('error-message', errorMsg, 'warning');

                vm.newBrush();
                vm.drawBrushes();
                vm.toggleEdit(vm.toggleChoice);
            } else if ((0, _keys2.default)(vm.savedSelections).length === 0) {
                var _errorMsg = "<strong>Warning!</strong> Unable to draw brushes. No brushes were stored.";

                _eventBus.eventBus.$emit('error-message', _errorMsg, 'warning');

                vm.brushObj.brushes = _lodash2.default.cloneDeep(vm.savedBrushes);
                vm.brushObj.brushSelections = _lodash2.default.cloneDeep(vm.savedSelections);

                vm.newBrush();
                vm.drawBrushes();

                vm.toggleEdit(vm.toggleChoice);
            } else {

                vm.brushObj.brushes = _lodash2.default.cloneDeep(vm.savedBrushes);
                vm.brushObj.brushSelections = _lodash2.default.cloneDeep(vm.savedSelections);

                vm.drawBrushes();
                vm.toggleEdit(vm.toggleChoice);
            }
        }
    }
};

/***/ }),

/***/ "OoR8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.redrawFit = undefined;

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var redrawFit = exports.redrawFit = {
    methods: {
        redrawFit: function redrawFit(c) {
            // console.log("Coefficients are:", c);
            var temp = d3.select(".fitted-line").datum();
            var tempX = [];

            temp.forEach(function (d) {
                tempX.push(d.x);
            });

            var tempCoefficients = [];
            for (var key in c) {
                tempCoefficients.push(c[key]);
            }

            var newFitEq = fitEquation(tempCoefficients);

            var y_fitted = tempX.map(function (el) {
                return newFitEq(el);
            });

            // Return the fitted values
            var fittedPoints = [];

            for (var i = 0; i < y_fitted.length; i++) {
                fittedPoints.push({
                    x: tempX[i],
                    y: y_fitted[i]
                });
            }

            d3.select(".fitted-line").data([fittedPoints]).attr("d", vm.line);

            // Update coefficient values in results table
            d3.select("td#fit-coefficients").html(function () {
                var coeffString = "<ul>";
                for (var _key in c) {
                    coeffString += "<li>" + _key + " = " + c[_key].toFixed(6) + "</li>";
                }
                coeffString += "</ul>";
                return coeffString;
            });
        }
    }
};

/***/ }),

/***/ "P6Xs":
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "Levenberg"
    }
  }, [_c('fieldset', {
    class: _vm.DISABLE ? 'disabled' : '',
    attrs: {
      "disabled": _vm.DISABLE
    }
  }, [_c('label', [_vm._v("Damping: "), _c('span', {
    staticClass: "fit-settings"
  }, [_vm._v(_vm._s(_vm.fitSettings.damping))])]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.number",
      value: (_vm.fitSettings.damping),
      expression: "fitSettings.damping",
      modifiers: {
        "number": true
      }
    }],
    attrs: {
      "type": "range",
      "min": "0.001",
      "max": "10",
      "step": "0.001"
    },
    domProps: {
      "value": (_vm.fitSettings.damping)
    },
    on: {
      "mouseup": _vm.setFitSettings,
      "keyup": _vm.setFitSettings,
      "touchend": _vm.setFitSettings,
      "__r": function($event) {
        _vm.fitSettings.damping = _vm._n($event.target.value)
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('label', [_vm._v("Gradient Difference: "), _c('span', {
    staticClass: "fit-settings"
  }, [_vm._v(_vm._s(_vm.fitSettings.gradientDifference))])]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.number",
      value: (_vm.fitSettings.gradientDifference),
      expression: "fitSettings.gradientDifference",
      modifiers: {
        "number": true
      }
    }],
    attrs: {
      "type": "range",
      "min": "0.01",
      "max": "1",
      "step": "0.01"
    },
    domProps: {
      "value": (_vm.fitSettings.gradientDifference)
    },
    on: {
      "mouseup": _vm.setFitSettings,
      "keyup": _vm.setFitSettings,
      "touchend": _vm.setFitSettings,
      "__r": function($event) {
        _vm.fitSettings.gradientDifference = _vm._n($event.target.value)
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('label', [_vm._v("Max Iterations: "), _c('span', {
    staticClass: "fit-settings"
  }, [_vm._v(_vm._s(_vm.fitSettings.maxIterations))])]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.number",
      value: (_vm.fitSettings.maxIterations),
      expression: "fitSettings.maxIterations",
      modifiers: {
        "number": true
      }
    }],
    attrs: {
      "type": "range",
      "min": "100",
      "max": "10000",
      "step": "100"
    },
    domProps: {
      "value": (_vm.fitSettings.maxIterations)
    },
    on: {
      "mouseup": _vm.setFitSettings,
      "keyup": _vm.setFitSettings,
      "touchend": _vm.setFitSettings,
      "__r": function($event) {
        _vm.fitSettings.maxIterations = _vm._n($event.target.value)
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('label', [_vm._v("Error Tolerance: "), _c('span', {
    staticClass: "fit-settings tolerance"
  }, [_vm._v(_vm._s(_vm.fitSettings.errorTolerance))])]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.number",
      value: (_vm.fitSettings.errorTolerance),
      expression: "fitSettings.errorTolerance",
      modifiers: {
        "number": true
      }
    }],
    attrs: {
      "type": "range",
      "min": "0.001",
      "max": "1",
      "step": "0.001"
    },
    domProps: {
      "value": (_vm.fitSettings.errorTolerance)
    },
    on: {
      "mouseup": _vm.setFitSettings,
      "keyup": _vm.setFitSettings,
      "touchend": _vm.setFitSettings,
      "__r": function($event) {
        _vm.fitSettings.errorTolerance = _vm._n($event.target.value)
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('button', {
    staticClass: "btn btn-warning btn-sm btn-block",
    on: {
      "click": _vm.resetSettings
    }
  }, [_c('i', {
    staticClass: "fa fa-refresh",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Default Settings")])])])
},staticRenderFns: []}

/***/ }),

/***/ "PoF0":
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__("dzvy")
}
var Component = __webpack_require__("VU/8")(
  /* script */
  __webpack_require__("j+6z"),
  /* template */
  __webpack_require__("FLfg"),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-b5025514",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ "R9JV":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "RsTs":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

var _lodash = __webpack_require__("M4fF");

var _lodash2 = _interopRequireDefault(_lodash);

var _Panel = __webpack_require__("wV86");

var _Panel2 = _interopRequireDefault(_Panel);

var _PanelGroup = __webpack_require__("HBd6");

var _PanelGroup2 = _interopRequireDefault(_PanelGroup);

var _Scales = __webpack_require__("aao6");

var _Scales2 = _interopRequireDefault(_Scales);

var _Table = __webpack_require__("iMsY");

var _Table2 = _interopRequireDefault(_Table);

var _TableFilter = __webpack_require__("2U0f");

var _TableFilter2 = _interopRequireDefault(_TableFilter);

var _stitchPlot = __webpack_require__("Cz5M");

var _stitchPlot2 = _interopRequireDefault(_stitchPlot);

var _ToggleSwitch = __webpack_require__("J/Bz");

var _ToggleSwitch2 = _interopRequireDefault(_ToggleSwitch);

var _setScales = __webpack_require__("WqlD");

var _fetchFiles = __webpack_require__("ggtl");

var _readData = __webpack_require__("Wic3");

var _filterJobs = __webpack_require__("i3RT");

var _getURLs = __webpack_require__("7BXH");

var _isOffline = __webpack_require__("cy2k");

var _eventBus = __webpack_require__("OXcg");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/* Import Components */
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* Import Packages */
exports.default = {
    name: 'Stitch',
    components: {
        'v-panel-group': _PanelGroup2.default,
        'v-panel': _Panel2.default,
        'v-scales': _Scales2.default,
        'v-table': _Table2.default,
        'v-filter': _TableFilter2.default,
        'v-stitch-plot': _stitchPlot2.default,
        'v-switch': _ToggleSwitch2.default
    },
    data: function data() {
        return {
            scales: {
                xScale: d3.scaleLinear(),
                xScaleType: 'X',
                yScale: d3.scaleLinear(),
                yScaleType: 'Y'
            },
            filterBy: 'All',
            sortBy: 'ascending',
            disable: true,
            filesToPlot: [],
            selectedData: [],
            isStitched: false,
            isMultipleLines: false,
            isBrushesStored: false
        };
    },
    mounted: function mounted() {
        // Listen for event that stitch has been saved
        var vm = this;

        _eventBus.eventBus.$on('reset-stitch', this.resetStitch);
        _eventBus.eventBus.$on('reset-is-stitched', function () {
            vm.isStitched = false;
        });
    },

    mixins: [_fetchFiles.fetchFiles, _readData.parse1D, _readData.pull1DData, _setScales.setScales, _filterJobs.filterJobs, _getURLs.getURLs, _isOffline.isOffline],
    computed: {
        xScales: function xScales() {
            return this.$store.getters.getXScales;
        },
        yScales: function yScales() {
            return this.$store.getters.getYScales;
        },
        uploadFiles: function uploadFiles() {
            return _lodash2.default.cloneDeep(this.$store.getters.getUploaded1D);
        }
    },
    methods: {
        removeFile: function removeFile(filename) {

            var index = this.filesToPlot.indexOf(filename);
            if (this.filesToPlot.indexOf(filename) > -1) {

                this.filesToPlot.splice(index, 1);
            }

            this.$store.commit('remove1DFile', filename);
            this.$store.commit('removeColor', filename);
        },
        setCurrentData: function setCurrentData(chosenData, checkList) {

            var vm = this;
            chosenData = _lodash2.default.cloneDeep(chosenData);

            if (checkList.length == 0) {
                // If no data is selected to be plotted, then
                // remove any elements previously plotted
                // and reset to default values
                console.log("Removing plot elements...");
                d3.select(".chart-stitch").remove();
                d3.select("#tooltip-stitch").remove();

                this.selectedData = [];
            } else {
                var toFilter = [];

                // Remove any instances where checked file isn't in selected
                this.selectedData = this.selectedData.filter(function (item) {
                    var match = checkList.indexOf(item.filename);

                    if (match > -1) {
                        toFilter.push(checkList[match]);
                    }

                    return checkList.indexOf(item.filename) > -1;
                });

                // Filter out data that doesn't need to be added and keep the rest
                checkList.filter(function (el) {
                    return toFilter.indexOf(el) < 0;
                }).map(function (fname) {

                    var temp = chosenData.find(function (el) {
                        return el.filename === fname;
                    });

                    vm.selectedData.push(temp);
                });
            }
        },
        prepData: function prepData(sd) {
            var temp = [];

            for (var i = 0; i < sd.length; i++) {
                temp.push(sd[i].data);
            }

            // Flatten out any nested arrays
            return _lodash2.default.flatten(temp);
        },
        setParameters: function setParameters() {
            this.$nextTick(function () {
                if (this.selectedData.length > 0) {
                    this.$refs.stitchPlot.setParameters({
                        data: this.prepData(this.selectedData),
                        scales: this.scales,
                        colorDomain: this.$store.getters.getColorDomain,
                        brushCount: this.filesToPlot.length
                    });
                } else {
                    // console.log("No data to plot...");
                    d3.select(".chart-stitch").remove();
                    d3.select("#tooltip-stitch").remove();
                    this.$refs.stitchPlot.resetDefaults();
                    this.$refs.toggle.picked = true;
                    this.isStitched = false;
                }
            });
        },
        stitchData: function stitchData() {
            var result = this.$refs.stitchPlot.stitchData();

            this.isStitched = result;
        },
        removeBrushes: function removeBrushes() {
            this.$refs.stitchPlot.removeBrushes();
        },
        removeStitch: function removeStitch() {
            var result = this.$refs.stitchPlot.removeStitchLine();

            this.isStitched = result;
        },
        toggleEdit: function toggleEdit(choice) {
            this.$refs.stitchPlot.toggleEdit(choice);
        },
        saveStitchLine: function saveStitchLine() {
            this.$refs.stitchPlot.saveStitchLine();
        },
        resetStitch: function resetStitch() {
            this.disable = true;
            this.isStitched = false;
            this.isMultipleLines = false;
            this.filesToPlot = [];
            this.selectedData = [];
            this.isBrushesStored = true;
            this.resetScales();

            d3.select(".chart-stitch").remove();
            d3.select("#tooltip-stitch").remove();
        },
        drawBrushes: function drawBrushes() {
            this.$refs.stitchPlot.drawSavedBrushes();
        }
    },
    watch: {
        scales: {
            handler: function handler() {
                this.$nextTick(function () {
                    if (this.selectedData.length > 0) {
                        this.$refs.stitchPlot.updateScales(this.scales);
                    }
                });
            },

            deep: true
        },
        filesToPlot: {
            handler: function handler() {
                var vm = this;

                if (this.filesToPlot.length === 0) {
                    // There should be nothing to plot or fit,
                    // so reset everything to defaults.
                    // Remove any elements previously plotted
                    d3.select(".chart-stitch").remove();
                    d3.select("#tooltip-stitch").remove();

                    // Reset disable to default 'true'
                    this.disable = true;

                    // Reset X & Y Scales back to default
                    this.resetScales();

                    this.isStitched = false;
                    this.isMultipleLines = false;

                    // Reset selected data to an empty array
                    this.selectedData = [];

                    // console.log("No files to plot");
                } else {
                    this.disable = false;

                    // If one file is being plotted, hide any buttons related to stitch line
                    // Toggle back to zoom
                    if (this.filesToPlot.length < 2) {
                        this.isStitched = false;
                        this.isMultipleLines = false;
                        this.$refs.toggle.picked = true;
                        this.$refs.stitchPlot.resetToggle();
                    } else {
                        this.isMultipleLines = true;
                    }

                    var filesToFetch = [];

                    // First check if files to plot are in stored data
                    var tempData = this.filesToPlot.map(function (filename) {
                        var temp = vm.$store.getters.getSaved1D(filename);

                        // console.log("Here is the temp:", temp);
                        if (temp === '999') {
                            // console.log("Not in stored:", filename);
                            filesToFetch.push(filename);
                        } else {
                            return temp;
                        }
                    }).filter(function (item) {
                        return item !== undefined;
                    });

                    // Next fetch the file URLs
                    var fileURLs = this.getURLs(filesToFetch, "-FetchStitch");

                    // console.log("Got dem fileURLs", fileURLs);
                    if (fileURLs.length > 0) {
                        this.pull1DData(fileURLs, tempData);
                    } else {
                        this.setCurrentData(tempData, this.filesToPlot);
                    }
                }
            },

            deep: true
        },
        selectedData: {
            handler: function handler() {
                this.setParameters();
            },

            deep: true
        }
    }
};

// The eventBus serves as the means to communicating between components.


/* Import Mixins */

/***/ }),

/***/ "Sx8f":
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container-fluid",
    attrs: {
      "id": "app-container"
    }
  }, [_c('div', {
    attrs: {
      "id": "error-container"
    }
  }), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('app-title', {
    ref: "title",
    on: {
      "switch-plot-component": _vm.switchPlotComponent
    }
  }), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade",
      "appear": ""
    }
  }, [_c('app-main-1D', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.toggleView === '1D'),
      expression: "toggleView === '1D'"
    }]
  })], 1), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade",
      "appear": ""
    }
  }, [_c('app-plot-2D', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.toggleView === '2D'),
      expression: "toggleView === '2D'"
    }]
  })], 1), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade",
      "appear": ""
    }
  }, [_c('app-stitch', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.toggleView === 'Stitch'),
      expression: "toggleView === 'Stitch'"
    }]
  })], 1), _vm._v(" "), _vm._m(1)], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "visibility": "hidden",
      "opacity": "0"
    },
    attrs: {
      "id": "dropzone"
    }
  }, [_c('div', {
    attrs: {
      "id": "textnode"
    }
  }, [_vm._v("Drop files to add data.")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "modal fade",
    attrs: {
      "id": "myModal",
      "role": "dialog",
      "data-keyboard": "false",
      "data-backdrop": "static"
    }
  }, [_c('div', {
    staticClass: "modal-dialog modal-sm"
  }, [_c('div', {
    staticClass: "modal-content"
  }, [_c('div', {
    staticClass: "modal-header"
  }, [_c('h4', {
    staticClass: "modal-title"
  }, [_vm._v("Deleting Point")])]), _vm._v(" "), _c('div', {
    staticClass: "modal-body"
  }, [_c('p', [_vm._v("Are you sure you want to remove the point?")])]), _vm._v(" "), _c('div', {
    staticClass: "modal-footer"
  }, [_c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "id": "btn-no-delete",
      "type": "button",
      "data-dismiss": "modal"
    }
  }, [_vm._v("Cancel")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-danger btn-ok",
    attrs: {
      "id": "btn-yes-delete",
      "type": "button"
    }
  }, [_vm._v("Delete")])])])])])
}]}

/***/ }),

/***/ "UdNL":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.brushed = undefined;

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

var _fitData = __webpack_require__("62h4");

var _fitData2 = _interopRequireDefault(_fitData);

var _eventBus = __webpack_require__("OXcg");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var brushed = exports.brushed = {
    methods: {
        brushed: function brushed() {
            var vm = this;

            // console.log("Calling brush...");
            vm.brushObj.brushSelection = d3.event.selection;

            //scales.xScale2.domain(scales.xScale.domain());
            var e = d3.event.selection.map(vm.scale.x2.invert, vm.scale.x2);

            var selectedData = vm.dataToFit.filter(function (d) {
                return e[0] <= d.x && d.x <= e[1];
            });

            // Update brush selections to the current selected data
            // This will be used to dynamically adjust brush location when new data is added
            vm.selLimits.xMin = d3.min(selectedData, function (d) {
                return d.x;
            });
            vm.selLimits.xMax = d3.max(selectedData, function (d) {
                return d.x;
            });

            if (vm.brushObj.brushSelection !== null && selectedData.length > 1) {

                vm.elements.slider.selectAll(".dotslider").style("stroke", function (d) {
                    if (e[0] <= d.x && d.x <= e[1]) {
                        return d.color = vm.color(d.name);
                    } else {
                        return "slategray";
                    }
                });

                vm.fitResults = _fitData2.default.fitData(selectedData, vm.plotParameters.fitConfiguration.equation, vm.plotParameters.fitSettings);
                vm.coefficients = vm.fitResults.coefficients;
                vm.fitData = vm.fitResults.fittedData;
                vm.fitError = vm.fitResults.error;

                // Re-assign updated fit equation and fitline function
                vm.fitEquation = vm.fitResults.fitEquation;

                if (vm.fitData.length <= 0) {
                    if (vm.checkError()) {
                        var errorMsg = "<strong>Error!</strong> Fitted y-values < 0, thus no fit-line to display.";
                        _eventBus.eventBus.$emit('error-message', errorMsg, 'danger');
                    }
                }
                // Emit coefficients to controls panel
                _eventBus.eventBus.$emit('update-coefficients', vm.coefficients);

                // Add line plot
                vm.elements.plot.select(".fitted-line").data([vm.fitData]).attr("d", vm.line);

                // Revise fit results below chart
                d3.select("td#fit-file").html("<b>File: </b>" + vm.plotParameters.fileToFit);
                d3.select("td#fit-type").html("<b>Fit Type:</b> " + vm.plotParameters.fitConfiguration.fit);
                d3.select("td#fit-points").html("<b>No. Points:</b> " + selectedData.length);
                d3.select("td#fit-range").html("<b>Fit Range:</b> (" + e[0].toExponential(2) + ", " + e[1].toExponential(2) + ")");
                d3.select("td#fit-error").html("<b>Fit Error:</b> " + vm.fitError.toExponential(2));

                d3.select("td#fit-coefficients").html(function () {
                    var coeffString = "<ul>";
                    for (var key in vm.coefficients) {

                        if (vm.plotParameters.fitConfiguration.fit.toLowerCase().includes('guinier')) {

                            if (key === 'I0') {
                                var I0 = Math.exp(vm.coefficients[key]);

                                coeffString += "<li>Real " + key + " = " + I0 + "</li>";
                                continue;
                            }

                            if (key === 'Rg') {
                                var RgX = vm.coefficients[key] * Math.sqrt(vm.scale.x.invert(vm.brushObj.brushSelection[1]));
                                coeffString += "<li>" + key + " = " + vm.coefficients[key].toFixed(3) + " | Rg * x_max = " + RgX.toFixed(3) + "</li>";
                                continue;
                            }
                        }

                        coeffString += "<li>" + key + " = " + vm.coefficients[key].toFixed(3) + "</li>";
                    }
                    coeffString += "</ul>";
                    return coeffString;
                });
            } else {
                // Notify user that more data needs to be selected for the fit
                if (vm.checkError()) {
                    var _errorMsg = "<strong>Error!</strong> Not enough data selected, please select 2 or more points. If plot is blank, no data is available for generating a fit line.";
                    _eventBus.eventBus.$emit('error-message', _errorMsg, 'danger');
                }
            }
        }
    }
};
/* Import Event Bus */

/***/ }),

/***/ "UjVw":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.get1DURL = exports.getFitSettings = exports.getFitConfigsYTrans = exports.getFitConfigsXTrans = exports.getFitConfigsByID = exports.getFitConfigs = exports.inUploaded2D = exports.inUploaded1D = exports.getSaved2D = exports.getSaved1D = exports.getGroups = exports.getUploaded2D = exports.getUploaded1D = exports.getFetched2D = exports.getFetched1D = exports.getYScaleByID = exports.getXScaleByID = exports.getYScales = exports.getXScales = exports.getDataType = exports.getColorDomain = exports.get2DFile = exports.get1DFiles = undefined;

var _lodash = __webpack_require__("M4fF");

var _lodash2 = _interopRequireDefault(_lodash);

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var get1DFiles = exports.get1DFiles = function get1DFiles(state) {};

var get2DFile = exports.get2DFile = function get2DFile(state) {
    return function (id) {
        var temp = null;

        for (var i = 0, len = state.fetched2DFiles.length; i < len; i++) {
            var tempFile = state.fetched2DFiles[i];
            if (id === tempFile.filename) {
                temp = tempFile;
                break;
            }
        }

        return temp;
    };
};

var getColorDomain = exports.getColorDomain = function getColorDomain(state) {
    return _lodash2.default.cloneDeep(state.colorDomain);
};

var getDataType = exports.getDataType = function getDataType(state) {};

var getXScales = exports.getXScales = function getXScales(state) {
    return state.xScales;
};

var getYScales = exports.getYScales = function getYScales(state) {
    return state.yScales;
};

var getXScaleByID = exports.getXScaleByID = function getXScaleByID(state) {
    return function (id) {
        return state.xScales[id].copy(); // copy is used to prevent scales being changed from another plot
    };
};

var getYScaleByID = exports.getYScaleByID = function getYScaleByID(state) {
    return function (id) {
        return state.yScales[id].copy(); // copy is used to prevent scales being changed from another plot
    };
};

var getFetched1D = exports.getFetched1D = function getFetched1D(state) {
    return state.fetched1DFiles;
};

var getFetched2D = exports.getFetched2D = function getFetched2D(state) {
    return state.fetched2DFiles;
};

var getUploaded1D = exports.getUploaded1D = function getUploaded1D(state) {
    return state.uploaded1DFiles;
};

var getUploaded2D = exports.getUploaded2D = function getUploaded2D(state) {
    return state.uploaded2DFiles;
};

var getGroups = exports.getGroups = function getGroups(state) {
    return function (type) {

        if (type === '1D') {
            return state.fetched1DFiles.map(function (el) {
                return el.jobTitle;
            });
        } else {
            return state.fetched2DFiles.map(function (el) {
                return el.jobTitle;
            });
        }
    };
};

var getSaved1D = exports.getSaved1D = function getSaved1D(state) {
    return function (file) {
        var temp = state.saved1DData[file];

        if (temp === undefined) {
            return '999';
        } else {
            return _lodash2.default.cloneDeep(temp);
        }
    };
};

var getSaved2D = exports.getSaved2D = function getSaved2D(state) {
    return function (file) {
        var temp = state.saved2DData[file];

        if (temp === undefined) {
            return '999';
        } else {
            return _lodash2.default.cloneDeep(temp);
        }
    };
};

var inUploaded1D = exports.inUploaded1D = function inUploaded1D(state) {
    return function (fname) {
        var match = false;

        for (var i = 0, len = state.uploaded1DFiles.length; i < len; i++) {
            var temp = state.uploaded1[i];
            if (fname === temp.filename) {
                match = true;
                break;
            }
        }

        return match;
    };
};

var inUploaded2D = exports.inUploaded2D = function inUploaded2D(state) {
    return function (fname) {
        var match = null;

        for (var i = 0, len = state.uploaded2DFiles.length; i < len; i++) {
            var temp = state.uploaded2DFiles[i];
            if (fname === temp.filename) {
                match = temp;
                break;
            }
        }

        return match;
    };
};

var getFitConfigs = exports.getFitConfigs = function getFitConfigs(state) {
    return _lodash2.default.cloneDeep(state.fitConfigurations);
};

var getFitConfigsByID = exports.getFitConfigsByID = function getFitConfigsByID(state) {
    return function (id) {
        return _lodash2.default.cloneDeep(state.fitConfigurations[id]);
    };
};

var getFitConfigsXTrans = exports.getFitConfigsXTrans = function getFitConfigsXTrans(state) {
    return function (id) {
        return _lodash2.default.cloneDeep(state.fitConfigurations[id].xTransformation);
    };
};

var getFitConfigsYTrans = exports.getFitConfigsYTrans = function getFitConfigsYTrans(state) {
    return function (id) {
        return _lodash2.default.cloneDeep(state.fitConfigurations[id].yTransformation);
    };
};

var getFitSettings = exports.getFitSettings = function getFitSettings(state) {
    return _lodash2.default.cloneDeep(state.fitSettings);
};

var get1DURL = exports.get1DURL = function get1DURL(state) {
    return function (type, files) {
        var temp = [];

        if (type === 'fetch') {
            for (var i = 0, len = state.fetched1DFiles.length; i < len; i++) {
                var t = state.fetched1DFiles[i];

                if (files.indexOf(t.filename) > -1) {
                    temp.push({ type: 'fetch', url: t.url, filename: t.filename });
                }
            }
        } else {
            for (var _i = 0, _len = state.uploaded1DFiles.length; _i < _len; _i++) {

                var _t = state.uploaded1DFiles[_i];

                if (files.indexOf(_t.filename) > -1) {
                    temp.push({ type: 'upload', url: _t.blob, filename: _t.filename });
                }
            }
        }

        return temp;
    };
};

/***/ }),

/***/ "WbGI":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fitData = __webpack_require__("62h4");

var _fitData2 = _interopRequireDefault(_fitData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'Transformation',
    props: {
        DISABLE: {
            type: Boolean,
            default: false
        },
        XTRANS: {
            type: String,
            required: true
        },
        YTRANS: {
            type: String,
            required: true
        }
    },
    data: function data() {
        return {
            isTransFocus: false
        };
    },
    methods: {
        enterTransformations: function enterTransformations() {
            var newXTrans = document.getElementById('x-transform').value;
            var newYTrans = document.getElementById('y-transform').value;

            if (_fitData2.default.isSymbols([newXTrans, newYTrans])) {
                // console.log("Invalid entry!");
                // Generate error message for invalid transformation
                document.getElementById('transformation-error').innerHTML = '<div class="alert alert-danger alert-dismissable">\
                    <a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>\
                    <strong>Error:</strong> Incorrect input.\
                        <ol>\
                            <li>Make sure to enter an appropriate transformation (e.g., "x+2")</li>\
                            <li>Check case, "x" <em>must</em> be lowercase</li>\
                            <li>No additional variables (e.g., "x+c" is incorrect)</li>\
                        </ol>\
                    </div>';
            } else {
                document.getElementById('transformation-error').innerHTML = "";
                this.$emit('set-transformations', newXTrans, newYTrans);
            }
        },
        resetTransformations: function resetTransformations() {
            this.$emit('reset-transformations');
        }
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ "Wic3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parse2D = exports.read2DData = exports.get2DData = exports.parse1D = exports.pull1DData = exports.read1DData = undefined;

var _promise = __webpack_require__("//Fk");

var _promise2 = _interopRequireDefault(_promise);

var _axios = __webpack_require__("mtWM");

var _axios2 = _interopRequireDefault(_axios);

var _papaparse = __webpack_require__("lxTf");

var _papaparse2 = _interopRequireDefault(_papaparse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Functions to Read and Parse 1D Data Files */
var read1DData = exports.read1DData = {
    methods: {
        read1DData: function read1DData(file) {}
    }
};

var pull1DData = exports.pull1DData = {
    methods: {
        pull1DData: function pull1DData(fileURLs, tempData) {
            var _this = this;

            // Next fetch unstored files
            /*****************************************
             When a user selects data to be plotted,
            it first must be fetched, either from
            an HTTP request or FileReader. In order
            to handle pulling multiple files
            asynchronously, JavaScript promises are used.
            That way we can "wait" for all data
            to be loaded asynchronously before moving on
            to plotting the data.
            *****************************************/
            var vm = this;

            var promises = fileURLs.map(function (url) {

                if (url.type === 'fetch') {
                    return _axios2.default.get(url.url).then(function (response) {
                        // console.log("axios response data", response);

                        var data = vm.parse1D(response.data, url.filename);

                        // console.log("cleaned up axios data", data);
                        vm.$store.commit('store1DData', { filename: url.filename, data: data });
                        //vm.storedData[url.filename] = response.data;
                        return data;
                    });
                } else if (url.type === 'upload') {

                    // Turn file reader into a promise in order to
                    // wait on the async reading of files with Promise.all below
                    return new _promise2.default(function (resolve, reject) {
                        var reader = new FileReader();

                        reader.onload = function (e) {
                            // Get file content
                            var content = e.target.result;

                            // Code to read Upload 2D file
                            var data = vm.parse1D(content, url.filename);
                            vm.$store.commit('store1DData', { filename: url.filename, data: data });
                            // vm.storedData[url.filename] = content;

                            resolve(data);
                        };

                        reader.readAsText(url.url, "UTF-8");
                    });
                } else {
                    //console.log("Sorry, uknown type.");
                }
            });

            if (promises.length === 0) {
                // eventBus.$emit('disable-buttons', true);
                // eventBus.$emit('set-current-data', tempData, this.filesToPlot);
                // console.log("No data to plot!");
            } else {
                _promise2.default.all(promises).then(function (results) {
                    var plotData = _.concat(tempData, results);
                    // console.log("Data is ready to be plotted!", plotData);
                    // var data = results.cocnat(tempData);
                    // console.log("Results", results);
                    // console.log("tempData", tempData);
                    // var fetchData = results.map(function(result) {
                    //     return vm.parse1D(result.data, result.filename);
                    // });

                    vm.setCurrentData(plotData, _this.filesToPlot);
                    // var data = fetchData.concat(tempData);

                    // eventBus.$emit('disable-buttons', true);
                    // eventBus.$emit('set-current-data', data, this.filesToPlot);
                }).catch(function (reason) {
                    console.log(reason);
                });
            }
        }
    }

    /* Function to Parse 1D Data Files */
};var parse1D = exports.parse1D = {
    methods: {
        parse1D: function parse1D(data, filename) {
            function beforeFirstChunk1D(chunk) {
                // Split the text into rows
                var rows = chunk.split(/\r\n|\r|\n/);

                var delimiterRegex = /([\s,]+)/g;
                // Find the delimiter on 3rd row
                var match = delimiterRegex.exec(rows[2]);
                var delimiter = match[1];
                var header = rows[0];

                if (header.startsWith("#")) {
                    header = header.replace(/#\s*/, '');
                    header = header.split(/[\s,]+/).join(delimiter);
                }

                rows[0] = header.toLowerCase();
                // Remove the 2nd row if it's not data
                if (rows[1].length <= 2) {
                    rows.splice(1, 1);
                }
                return rows.join("\r\n");
            }

            // files ending in Iq.txt
            var config1D = {
                header: true,
                dynamicTyping: true, // parse string to int
                delimiter: "", // auto-detect
                newline: "", // auto-detect
                quoteChar: '"',
                skipEmptyLines: true,
                beforeFirstChunk: beforeFirstChunk1D
            };

            var results1D = _papaparse2.default.parse(data, config1D).data;

            // Filter out any negative values
            results1D = results1D.filter(function (row) {
                return row.y > 0 && row.x > 0;
            });
            results1D.forEach(function (row) {
                return row.name = filename;
            });

            return { filename: filename, data: results1D };
        }
    }

    /* Functions to Read and Parse 2D Files */
};var get2DData = exports.get2DData = {
    methods: {
        get2DData: function get2DData(file) {
            var vm = this;

            // If data is not stored, fetch it, store it, and send data to be plotted
            _axios2.default.get(file.url).then(function (response) {

                var results = vm.parse2D(response.data);
                vm.$store.commit('store2DData', { filename: file.filename, data: results.data });
                vm.currentData = results.data;

                // Call plotting function
                vm.hexPlot(results.data, vm.hexSettings);
            });
        }
    }
};

var read2DData = exports.read2DData = {
    methods: {
        read2DData: function read2DData(file) {
            var vm = this;

            var reader = new FileReader();

            reader.onload = function (e) {
                // Get file content
                var content = e.target.result;
                // Code to read Upload 2D file
                var results = vm.parse2D(content);
                // console.log("results", results);
                results.data.forEach(function (el) {
                    return el.name = file.filename;
                });

                // Push to 2D Get Files list
                vm.$store.commit('store2DData', { filename: file.filename, data: results.data });
                vm.currentData = results.data;

                // Call plotting function
                vm.hexPlot(results.data, vm.hexSettings);
            };
            reader.readAsText(file.blob, "UTF-8");
        }
    }

    /* Function to Parse 2D Data Files */
};var parse2D = exports.parse2D = {
    methods: {
        parse2D: function parse2D(data) {
            function beforeFirstChunk2D(chunk) {
                // Split the text into rows
                var rows = chunk.split(/\r\n|\r|\n/);
                var header = rows[0];
                header = header.replace(/,/, '');
                if (header.startsWith("Data columns")) {
                    header = header.replace(/Data columns\s*/, '');
                    header = header.split(/[\s,-]+/).join("  ");
                }

                // Rename headings for readability
                header = header.replace(/I\(QxQy\)/, 'intensity');
                header = header.replace(/err\(I\)/, 'error');

                rows[0] = header.toLowerCase();
                // Remove the 2nd row if it's not data
                if (rows[1].split(/[\s,-]+/).length <= 2) {
                    rows.splice(1, 1);
                }
                return rows.join("\r\n");
            }

            var config2D = {
                header: true,
                dynamicTyping: true, // parse string to int
                delimiter: "  ",
                newline: "", // auto-detect
                quoteChar: '"',
                skipEmptyLines: true,
                beforeFirstChunk: beforeFirstChunk2D
            };

            var results2D = _papaparse2.default.parse(data, config2D);

            return results2D;
        }
    }
};

/***/ }),

/***/ "WqlD":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var setScales = exports.setScales = {
    methods: {
        setScales: function setScales(type, value) {
            if (type === 'X') {
                this.scales.xScaleType = value;
                this.scales.xScale = this.$store.getters.getXScaleByID(value);
            } else {
                this.scales.yScaleType = value;
                this.scales.yScale = this.$store.getters.getYScaleByID(value);
            }
        },
        resetScales: function resetScales() {

            // Reset the selected options to default scales
            this.$refs.scales.$refs.y_select.value = 'Y';
            this.$refs.scales.$refs.x_select.value = 'X';

            this.scales.xScaleType = 'X';
            this.scales.xScale = this.$store.getters.getXScaleByID('X');
            this.scales.yScaleType = 'Y';
            this.scales.yScale = this.$store.getters.getYScaleByID('Y');
        }
    }
};

/***/ }),

/***/ "X6BM":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "XRpi":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.zoomed = undefined;

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var zoomed = exports.zoomed = {
    methods: {
        zoomed: function zoomed(new_yScale, new_xScale) {
            var vm = this;

            // re-set line generator
            vm.line = d3.line().defined(function (d) {
                if (vm.scale.yType === 'Log(Y)') {
                    return d.y > 0;
                } else {
                    return d;
                }
            }).x(function (d) {
                return new_xScale(d.x);
            }).y(function (d) {
                return new_yScale(d.y);
            });

            // re-scale axes and gridlines during zoom
            vm.elements.axis.select(".axis--y").transition().duration(50).call(vm.axis.y.scale(new_yScale));

            vm.elements.axis.select(".axis--x").transition().duration(50).call(vm.axis.x.scale(new_xScale));

            vm.elements.axis.select(".gridline--y").transition().duration(50).call(vm.axis.yGrid.scale(new_yScale));

            vm.elements.axis.select(".gridline--x").transition().duration(50).call(vm.axis.xGrid.scale(new_xScale));

            // re-draw scatter plot;
            vm.elements.plot.selectAll("circle").attr("cy", function (d) {
                return new_yScale(d.y);
            }).attr("cx", function (d) {
                return new_xScale(d.x);
            });

            vm.elements.plot.selectAll(".pointlines").attr("d", vm.line);

            // Re-draw error
            vm.elements.plot.selectAll('.error-' + vm.ID).attr('x1', function (d) {
                return new_xScale(d.x);
            }).attr('x2', function (d) {
                return new_xScale(d.x);
            }).attr('y1', function (d) {
                return new_yScale(d.y + d.e);
            }).attr('y2', function (d) {
                if (d.y - d.e < 0 && vm.scale.yType === "Log(Y)") {
                    // console.log("Below zero! d.y = " + d.y + " | d.e = " + d.e + "| d.y - d.e = " + (d.y - d.e));
                    return new_yScale(d.y);
                } else {
                    return new_yScale(d.y - d.e);
                }
            });

            // re-draw error tick top
            vm.elements.plot.selectAll(".error-" + vm.ID + "-tick-top").attr('x1', function (d) {
                return new_xScale(d.x) - 4;
            }).attr('x2', function (d) {
                return new_xScale(d.x) + 4;
            }).attr('y1', function (d) {
                return new_yScale(d.y + d.e);
            }).attr('y2', function (d) {
                return new_yScale(d.y + d.e);
            });

            // re-draw error tick bottom
            vm.elements.plot.selectAll(".error-" + vm.ID + "-tick-bottom").filter(function (d) {
                if (vm.scale.yType === "Log(Y)") {
                    return d.y - d.e > 0;
                } else {
                    return true;
                }
            }).attr('x1', function (d) {
                return new_xScale(d.x) - 4;
            }).attr('x2', function (d) {
                return new_xScale(d.x) + 4;
            }).attr('y1', function (d) {
                return new_yScale(d.y - d.e);
            }).attr('y2', function (d) {
                return new_yScale(d.y - d.e);
            });
        }
    }
};

/***/ }),

/***/ "YaEn":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__("7+uW");

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__("/ocq");

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _App = __webpack_require__("M93x");

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);

exports.default = new _vueRouter2.default({
  routes: [{
    path: '/',
    name: 'app',
    component: _App2.default
  }]
});

/***/ }),

/***/ "Yhlz":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removePoint = undefined;

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

var _index = __webpack_require__("IcnI");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var removePoint = exports.removePoint = {
    methods: {
        removePoint: function removePoint(index, name) {
            var vm = this;

            function deleteConfirm(callback) {
                $("#myModal").modal('show');

                $("#btn-yes-delete").on("click", function () {
                    callback(true);
                    $("#myModal").modal('hide');
                });

                $("#btn-no-delete").on("click", function () {
                    callback(false);
                    $("#myModal").modal('hide');
                });
            };

            deleteConfirm(function (confirm) {
                if (confirm) {
                    $("#btn-no-delete").off();
                    $("#btn-yes-delete").off();

                    // Remove point from current data
                    vm.plotData.splice(index, 1);

                    // Remove point from stored dataset
                    _index2.default.commit('removePoint', { name: name, index: index });

                    vm.updatePlot(vm.plotData);
                    return;
                } else {
                    $("#btn-no-delete").off();
                    $("#btn-yes-delete").off();

                    return;
                }
            });

            return;
        }
    }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("7t+N")))

/***/ }),

/***/ "Z4nb":
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-md-10",
    attrs: {
      "id": "plot-stitch-col"
    }
  }, [_c('v-panel', {
    attrs: {
      "PANELTITLE": "Stitch Plot",
      "PANELTYPE": "primary"
    }
  }, [(!_vm.DISABLE) ? _c('v-reset-button', {
    attrs: {
      "slot": "header-content",
      "onClick": _vm.resetPlot
    },
    slot: "header-content"
  }, [_vm._v("Reset Plot")]) : _vm._e(), _vm._v(" "), _c('div', {
    attrs: {
      "id": "plot-stitch"
    }
  }), _vm._v(" "), (_vm.isBrushes) ? _c('div', {
    staticClass: "table table-condensed table-responsive",
    attrs: {
      "id": "brush-selection-table"
    }
  }, [_c('table', {
    staticClass: "table table-bordered"
  }, [_c('caption', [_c('h4', [_vm._v("Brush Selections:")])]), _vm._v(" "), _c('thead', [_c('tr', [_c('th', [_vm._v("Brushes")]), _vm._v(" "), _c('th', [_vm._v("X-Min")]), _vm._v(" "), _c('th', [_vm._v("X-Max")])])]), _vm._v(" "), _c('tbody', _vm._l((_vm.selections), function(value, key) {
    return _c('tr', [_c('td', [_vm._v(_vm._s(key))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(value.converted[0].toExponential(4)))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(value.converted[1].toExponential(4)))])])
  }))])]) : _vm._e()], 1)], 1)
},staticRenderFns: []}

/***/ }),

/***/ "ZlJh":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'panel',
    props: {
        PANELTITLE: {
            type: String,
            required: true
        },
        PANELTYPE: {
            type: String,
            default: 'default'
        },
        COLLAPSE: {
            type: Boolean,
            default: false
        }
    },
    data: function data() {
        return {
            isCollapsed: this.COLLAPSE ? true : false
        };
    },
    computed: {
        collapsed: function collapsed() {
            if (this.COLLAPSE === false) return " in";else return "";
        }
    },
    mounted: function mounted() {
        (0, _jquery2.default)('.collapser:not(button)').click(function () {
            (0, _jquery2.default)(this).parent().parent().next().collapse('toggle');
        });
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ "ZmW/":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateData = undefined;

var _isFinite = __webpack_require__("AMV0");

var _isFinite2 = _interopRequireDefault(_isFinite);

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateData = exports.updateData = {
    methods: {
        updateData: function updateData(newData) {
            var vm = this;

            // Update Plot Data
            vm.plotData = newData;
            vm.plotData = vm.plotData.filter(function (d) {
                return (0, _isFinite2.default)(d.y) && (0, _isFinite2.default)(d.x);
            });

            // Nest the entries by name
            vm.dataNest = d3.nest().key(function (d) {
                return d.name;
            }).entries(vm.plotData);
        }
    }
};

/***/ }),

/***/ "aao6":
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__("t+42")
}
var Component = __webpack_require__("VU/8")(
  /* script */
  __webpack_require__("5hG+"),
  /* template */
  __webpack_require__("q1FB"),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-ab5cea8c",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ "bZWC":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    name: 'Levenberg',
    props: {
        DISABLE: {
            type: Boolean,
            default: false
        }
    },
    data: function data() {
        return {
            fitSettings: {
                damping: 0.001,
                initialValues: [],
                gradientDifference: 0.1,
                maxIterations: 100,
                errorTolerance: 0.001
            }
        };
    },
    methods: {
        resetSettings: function resetSettings() {
            this.fitSettings.damping = 0.001;
            this.fitSettings.gradientDifference = 0.1;
            this.fitSettings.maxIterations = 100;
            this.fitSettings.errorTolerance = 0.001;

            this.setFitSettings();
        },
        setFitSettings: function setFitSettings() {
            this.$emit('set-fit-settings', _.cloneDeep(this.fitSettings)); // clone object or it passes fitSettings by reference not value
        }
    }
};

/***/ }),

/***/ "cICW":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "cPMA":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _eventBus = __webpack_require__("OXcg");

var _isOffline = __webpack_require__("cy2k");

var _papaparse = __webpack_require__("lxTf");

var _papaparse2 = _interopRequireDefault(_papaparse);

var _axios = __webpack_require__("mtWM");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Use papa parse to parse csv/tsv files
// Axios to handle HTTP requests
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// The eventBus serves as the means to communicating between components.
// e.g., If files are uploaded in 'fileUpload.vue', an event is emitted
//       and the event is then 'caught' in 'Main.vue'
exports.default = {
  name: 'heading',
  data: function data() {
    return {};
  },
  mounted: function mounted() {
    _eventBus.eventBus.$on('fetch-data', this.fetchData);
  },

  mixins: [_isOffline.isOffline],
  methods: {
    fetchData: function fetchData() {
      var _this = this;

      console.log("Fetching data...");
      // If data is not stored, fetch it, store it, and send data to be plotted
      _axios2.default.get('/external/fetch').then(function (response) {

        var files = response.data;

        var temp1D = [];
        var temp2D = [];
        var vm = _this;

        for (var i = 0, len = files.length; i < len; i++) {
          var temp1DFiles = [];
          var temp2DFiles = [];
          var jobTitle = files[i].job_title;
          var jobModified = files[i].date_modified;

          files[i].results.forEach(function (item) {

            if (vm.dataType(item.url) === '1D') {
              // console.log("1D Item", {url: url, group: group, fileName: name});
              temp1D.push({
                id: item.id,
                filename: item.filename,
                url: item.url,
                jobTitle: jobTitle,
                dateModified: jobModified
              });
            } else if (vm.dataType(item.url) === '2D') {
              // console.log("2D Item", {url: url, group: group, fileName: name});
              temp2D.push({
                id: item.id,
                filename: item.filename,
                url: item.url,
                jobTitle: jobTitle,
                dateModified: jobModified
              });
            } else {
              var errorMsg = "<strong>Error! </strong>" + item.url + " is not a supported type.<br/>Make sure the file ends in <em>'Iq.txt'</em> or <em>'Iqxy.dat'</em>";
              _eventBus.eventBus.$emit('error-message', errorMsg, 'danger');
            }
          });
        }

        // Add Fetched File List(s) to Global Store
        if (temp1D.length > 0) _this.$store.commit('addFetched1DFiles', temp1D);
        if (temp2D.length > 0) _this.$store.commit('addFetched2DFiles', temp2D);
      }).catch(function (err) {
        console.log(err.message);
        _eventBus.eventBus.$emit('error-message', err.message, 'danger');
      });
    },
    uploadFile: function uploadFile(files) {

      // CODE TO UPLOAD DATA FILES //
      var vm = this;

      var temp1D = [];
      var temp2D = [];

      for (var i = 0, len = files.length; i < len; i++) {
        // loadFiles(files[i]);
        var url = files[i].name;
        var blob = files[i];

        if (vm.dataType(url) === '1D') {
          // console.log("1D Item", {url: url, group: group, fileName: name});
          var filename = url.substr(0, url.lastIndexOf('.txt')) || url;
          temp1D.push({
            url: url,
            filename: filename,
            blob: blob
          });
        } else if (vm.dataType(url) === '2D') {
          // console.log("2D Item", {url: url, group: group, fileName: name});
          var _filename = url.substr(0, url.lastIndexOf('.dat')) || url;
          temp2D.push({
            url: url,
            filename: _filename,
            blob: blob
          });
        } else {
          // error, don't read for now
          var errorMsg = "<strong>Error! </strong>" + url + " is not a supported type.<br/>Make sure the file ends in <em>'Iq.txt'</em> or <em>'Iqxy.dat'</em>";
          _eventBus.eventBus.$emit('error-message', errorMsg, 'danger');
        }
      }

      if (temp1D.length > 0) this.$store.commit('addUploaded1DFiles', temp1D);
      if (temp2D.length > 0) this.$store.commit('addUploaded2DFiles', temp2D);

      document.getElementById("file-upload").value = '';
      // END OF CODE TO UPLOAD FILES //
    },
    dataType: function dataType(fname) {
      if (/.*Iq.txt$/.exec(fname)) {
        // File matches 1D data
        // console.log("Is 1D:", fname);
        return '1D';
      } else if (/.*.dat$/.exec(fname)) {
        // File matches for 2D data
        // console.log("Is 2d:", fname);
        return '2D';
      } else {
        // File doesn't match for either 1D or 2D, throw error message
        return false;
      }
    },
    switchView: function switchView(view) {
      var views = document.getElementById("view-switches").children;
      for (var i = 0, len = views.length; i < len; i++) {
        if (views[i].id === "switch-" + view) {
          views[i].classList.add('active');
        } else {
          views[i].classList.remove('active');
        }
      }

      // console.log("View switched to: ", view);
      this.$emit('switch-plot-component', view);
    }
  }
};

/***/ }),

/***/ "cy2k":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var isOffline = exports.isOffline = {
    computed: {
        isOffline: function isOffline() {
            return true;
        }
    }
};

/***/ }),

/***/ "dzvy":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "eudV":
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__("03ul")
}
var Component = __webpack_require__("VU/8")(
  /* script */
  __webpack_require__("bZWC"),
  /* template */
  __webpack_require__("P6Xs"),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-402f9206",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ "ggtl":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchFiles = undefined;

var _lodash = __webpack_require__("M4fF");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchFiles = exports.fetchFiles = {
    methods: {
        fetchFiles: function fetchFiles(type) {
            var sortBy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ascending';
            var filterBy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'All';


            if (type === '1D') var temp = _lodash2.default.cloneDeep(this.$store.getters.getFetched1D);else var temp = _lodash2.default.cloneDeep(this.$store.getters.getFetched2D);

            if (sortBy === 'ascending') {
                if (filterBy === 'All') {
                    return temp.sort(function (a, b) {
                        return new Date(a.dateModified) - new Date(b.dateModified);
                    });
                } else {
                    return temp.filter(function (el) {
                        return el.jobTitle === filterBy;
                    }).sort(function (a, b) {
                        return new Date(a.dateModified) - new Date(b.dateModified);
                    });
                }
            } else {
                if (filterBy === 'All') {
                    return temp.sort(function (a, b) {
                        return new Date(b.dateModified) - new Date(a.dateModified);
                    });
                } else {
                    return temp.filter(function (el) {
                        return el.jobTitle === filterBy;
                    }).sort(function (a, b) {
                        return new Date(b.dateModified) - new Date(a.dateModified);
                    });
                }
            }
        }
    }
}; /* Function to get fetch file names to sort */

/***/ }),

/***/ "grKx":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "hdHG":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    name: 'toggle-switch',
    props: {
        rightID: {
            type: String,
            default: 'right',
            required: true
        },
        leftID: {
            type: String,
            default: 'left',
            required: true
        },
        DISABLE: {
            type: Boolean,
            default: false
        }
    },
    data: function data() {
        return {
            picked: true
        };
    },

    methods: {
        leftSwitch: function leftSwitch() {
            this.picked = true;
            this.$emit("switchChange", this.leftID);
        },
        rightSwitch: function rightSwitch() {
            this.picked = false;
            this.$emit("switchChange", this.rightID);
        }
    }
};

/***/ }),

/***/ "i3RT":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var filterJobs = exports.filterJobs = {
    methods: {
        filterJob: function filterJob(filter) {
            this.filterBy = filter;
        },
        sortByDate: function sortByDate(direction) {
            this.sortBy = direction;
        }
    }
};

/***/ }),

/***/ "iMsY":
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__("tQvK")
}
var Component = __webpack_require__("VU/8")(
  /* script */
  __webpack_require__("jKUA"),
  /* template */
  __webpack_require__("JsFO"),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-6a23580d",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ "iPJo":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "j+6z":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = __webpack_require__("fZjL");

var _keys2 = _interopRequireDefault(_keys);

var _eventBus = __webpack_require__("OXcg");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'FitConfig',
    props: {
        DISABLE: {
            type: Boolean,
            default: false
        },
        EQUATION: {
            type: String,
            required: true
        }
    },
    data: function data() {
        return {
            isFocus: false,
            coefficients: {},
            fit: 'Linear'
        };
    },
    created: function created() {
        // Listen to emit from plotCurrentData.js
        _eventBus.eventBus.$on('update-coefficients', this.updateCoefficients);
    },

    computed: {
        fits: function fits() {
            return this.$store.getters.getFitConfigs;
        },
        isCoefficients: function isCoefficients() {
            return (0, _keys2.default)(this.coefficients).length > 0;
        }
    },
    methods: {
        resetFit: function resetFit() {
            this.coefficients = {};
            this.$emit('reset-file-fit-choice');
        },
        setFitSettings: function setFitSettings() {
            this.$emit('set-fit-settings', _.cloneDeep(this.fitSettings));
        },
        enterEquation: function enterEquation() {
            var newEq = document.getElementById('fit-equation').value;
            this.$emit('set-equation', newEq);
        },
        enterCoefficients: function enterCoefficients() {
            var c = {};
            for (var key in this.coefficients) {
                var val = document.getElementById(key + "-input").value;
                c[key] = +val;
            }

            _eventBus.eventBus.$emit("coefficients-updated", _.cloneDeep(c));
        },
        updateCoefficients: function updateCoefficients(coeff) {
            this.coefficients = coeff;
        },
        setFitBack: function setFitBack() {
            this.fit = 'Linear';
        }
    },
    watch: {
        fit: function fit() {
            if (this.fit === 'None') this.coefficients = {};
            this.$emit('set-fit', this.fit);
        }
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ "j5SX":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var initDimensions = exports.initDimensions = {
    methods: {
        initDimensions: function initDimensions() {
            var vm = this;
            var viewHeight = void 0;

            // Pull plot's parent container width, this will be used to scale the plot responsively
            var containerWidth = document.getElementById("plot-" + vm.ID).offsetWidth;

            if (vm.isFit) {
                vm.margin = {
                    top: 50,
                    right: 50,
                    bottom: 100, // adjusts margin for slider
                    left: 75
                };

                // View Height is calculated on a 16:9 aspect ratio
                // This is to properly adjust the plot to the container width
                // This is mostly used when the user adjusts the browser 
                // from small (mobile) to large (desktop) window sizes.
                viewHeight = containerWidth / (vm.dimensions.aspectW / vm.dimensions.aspectH);
                vm.dimensions.h = viewHeight - vm.margin.top - vm.margin.bottom;
            } else {
                vm.margin = {
                    top: 50,
                    right: 50,
                    bottom: 50,
                    left: 75
                };

                viewHeight = containerWidth / (vm.dimensions.aspectW / vm.dimensions.aspectH);
                vm.dimensions.h = viewHeight - vm.margin.top - vm.margin.bottom;
            }

            vm.dimensions.w = containerWidth - vm.margin.left - vm.margin.right;

            // Set viewbox for to enable responsive scaling for svg upon window resize
            vm.dimensions.viewbox = "0 0 " + containerWidth + " " + viewHeight;
        }
    }
};

/***/ }),

/***/ "jKUA":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    props: {
        fieldNames: {
            type: Array,
            default: ['Field 1', 'Field 2', 'Field 3']
        }
    },
    data: function data() {
        return {};
    },
    computed: {},
    methods: {}
};

/***/ }),

/***/ "k0nQ":
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "Transformation"
    }
  }, [_c('fieldset', {
    attrs: {
      "disabled": _vm.DISABLE
    }
  }, [_c('div', {
    staticClass: "input-group"
  }, [_c('span', {
    staticClass: "input-group-addon"
  }, [_vm._v("X")]), _vm._v(" "), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "id": "x-transform"
    },
    domProps: {
      "value": _vm.XTRANS
    },
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.enterTransformations($event)
      },
      "focus": function($event) {
        _vm.isTransFocus = !_vm.isTransFocus
      },
      "blur": function($event) {
        _vm.isTransFocus = !_vm.isTransFocus
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "input-group"
  }, [_c('span', {
    staticClass: "input-group-addon"
  }, [_vm._v("Y")]), _vm._v(" "), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "id": "y-transform"
    },
    domProps: {
      "value": _vm.YTRANS
    },
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.enterTransformations($event)
      },
      "focus": function($event) {
        _vm.isTransFocus = !_vm.isTransFocus
      },
      "blur": function($event) {
        _vm.isTransFocus = !_vm.isTransFocus
      }
    }
  })]), _vm._v(" "), (_vm.isTransFocus) ? _c('p', {
    staticClass: "transformation-title"
  }, [_vm._v("Press "), _c('strong', [_vm._v("[enter]")]), _vm._v(" to change transformations")]) : _vm._e(), _vm._v(" "), _c('div', {
    attrs: {
      "id": "transformation-error"
    }
  }), _vm._v(" "), _c('button', {
    staticClass: "btn btn-warning btn-sm btn-block",
    on: {
      "click": _vm.resetTransformations
    }
  }, [_c('i', {
    staticClass: "fa fa-refresh",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Reset")])])])
},staticRenderFns: []}

/***/ }),

/***/ "k970":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "kAU3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

var _lodash = __webpack_require__("M4fF");

var _lodash2 = _interopRequireDefault(_lodash);

var _Panel = __webpack_require__("wV86");

var _Panel2 = _interopRequireDefault(_Panel);

var _PanelGroup = __webpack_require__("HBd6");

var _PanelGroup2 = _interopRequireDefault(_PanelGroup);

var _Table = __webpack_require__("iMsY");

var _Table2 = _interopRequireDefault(_Table);

var _TableFilter = __webpack_require__("2U0f");

var _TableFilter2 = _interopRequireDefault(_TableFilter);

var _Scales = __webpack_require__("aao6");

var _Scales2 = _interopRequireDefault(_Scales);

var _Levenberg = __webpack_require__("eudV");

var _Levenberg2 = _interopRequireDefault(_Levenberg);

var _FitConfiguration = __webpack_require__("PoF0");

var _FitConfiguration2 = _interopRequireDefault(_FitConfiguration);

var _Transformation = __webpack_require__("CiNM");

var _Transformation2 = _interopRequireDefault(_Transformation);

var _fitPlot = __webpack_require__("5DAO");

var _fitPlot2 = _interopRequireDefault(_fitPlot);

var _readData = __webpack_require__("Wic3");

var _setScales = __webpack_require__("WqlD");

var _fetchFiles = __webpack_require__("ggtl");

var _filterJobs = __webpack_require__("i3RT");

var _getURLs = __webpack_require__("7BXH");

var _isOffline = __webpack_require__("cy2k");

var _fitData = __webpack_require__("62h4");

var _fitData2 = _interopRequireDefault(_fitData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/* Import Components */
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* Import Packages */
exports.default = {
    name: 'Main1D',
    components: {
        'v-panel-group': _PanelGroup2.default,
        'v-panel': _Panel2.default,
        'v-table': _Table2.default,
        'v-filter': _TableFilter2.default,
        'v-scales': _Scales2.default,
        'v-levenberg': _Levenberg2.default,
        'v-fit-config': _FitConfiguration2.default,
        'v-transformation': _Transformation2.default,
        'v-plot-1D': _fitPlot2.default
    },
    data: function data() {
        return {
            selectedData: [],
            scales: {
                xScale: d3.scaleLinear(),
                xScaleType: 'X',
                yScale: d3.scaleLinear(),
                yScaleType: 'Y'
            },
            disable: true,
            plotParams: {},
            currentConfiguration: {
                fit: 'Linear',
                equation: 'm*x+b',
                yTransformation: 'y',
                xTransformation: 'x',
                eTransformation: "e",
                yLabel: "I",
                xLabel: "Q",
                note: ""
            },
            filterBy: 'All',
            sortBy: 'ascending',
            filesToPlot: [],
            fileFitChoice: [],
            fileToFit: null,
            currentData: [],
            defaultFitSettings: {
                damping: 0.001,
                initialValues: [],
                gradientDifference: 0.1,
                maxIterations: 100,
                errorTolerance: 0.001
            },
            fitSettings: {
                damping: 0.001,
                initialValues: [],
                gradientDifference: 0.1,
                maxIterations: 100,
                errorTolerance: 0.001
            }

        };
    },
    mixins: [_readData.parse1D, _readData.pull1DData, _fetchFiles.fetchFiles, _setScales.setScales, _filterJobs.filterJobs, _getURLs.getURLs, _isOffline.isOffline],
    computed: {
        uploadFiles: function uploadFiles() {
            //   console.log("Store 1D", this.$store.getters.getUploaded1D);
            return _lodash2.default.cloneDeep(this.$store.getters.getUploaded1D);
        },
        isFiles: function isFiles() {
            var fetchLength = this.$store.getters.getFetched1D.length;
            var uploadLength = this.$store.getters.getUploaded1D.length;

            return fetchLength > 0 || uploadLength > 0 ? true : false;
        }
    },
    methods: {
        clearSelected: function clearSelected() {
            this.fileFitChoice = [];
            this.filesToPlot = [];
            this.fileToFit = null;
        },
        checkAll: function checkAll() {

            var fetched = this.$store.getters.getFetched1D;
            var uploaded = this.$store.getters.getUploaded1D;

            for (var i = 0, len = fetched.length; i < len; i++) {
                var fname = fetched[i].filename;

                if (this.filesToPlot.indexOf(fname) === -1) {
                    this.filesToPlot.push(fname);
                }
            }

            for (var _i = 0, _len = uploaded.length; _i < _len; _i++) {
                var _fname = uploaded[_i].filename;

                if (this.filesToPlot.indexOf(_fname) === -1) {
                    this.filesToPlot.push(_fname);
                }
            }
        },
        removeFile: function removeFile(filename) {

            var index = this.filesToPlot.indexOf(filename);
            if (this.filesToPlot.indexOf(filename) > -1) {

                if (this.fileToFit === filename) {
                    this.fileToFit = null;
                }

                this.filesToPlot.splice(index, 1);
            }

            this.$store.commit('remove1DFile', filename);
            this.$store.commit('removeColor', filename);
        },
        isPlotted: function isPlotted(filename) {
            //Dynamically style the file lists blue for plotted data
            if (this.filesToPlot.indexOf(filename) > -1) {
                return "success";
            } else {
                return "default";
            }
        },
        setFileToFit: function setFileToFit() {
            if (this.fileFitChoice.length > 0) this.fileFitChoice = this.fileFitChoice.slice(-1);
            this.fileToFit = this.fileFitChoice[0] ? this.fileFitChoice[0] : null;
        },
        resetFileFitChoice: function resetFileFitChoice() {
            this.fileFitChoice = [];
            this.fileToFit = null;
        },
        setCurrentData: function setCurrentData(chosenData, checkList) {
            var vm = this;

            chosenData = _lodash2.default.cloneDeep(chosenData);

            if (checkList.length == 0) {
                // If no data is selected to be plotted, then
                // remove any elements previously plotted
                // and reset to default values
                console.log("Removing plot elements...");
                d3.select(".chart-1D").remove();
                d3.select("#tooltip-1D").remove();

                this.resetScales();
                this.resetFileFitChoice();
                this.disableButtons(false);
                this.selectedData = [];
                this.fileToFit = null;
            } else {
                var toFilter = [];

                // Remove any instances where checked file isn't in selected
                this.selectedData = this.selectedData.filter(function (item) {
                    var match = checkList.indexOf(item.filename);
                    if (match > -1) {
                        toFilter.push(checkList[match]);
                    }

                    return checkList.indexOf(item.filename) > -1;
                });

                // console.log("Selected Data after removing unnecessary", this.selectedData);

                // Filter out data that doesn't need to be added
                var addList = checkList.filter(function (el) {
                    return toFilter.indexOf(el) < 0;
                }).map(function (fname) {
                    var temp = chosenData.find(function (el) {
                        return el.filename === fname;
                    });
                    return { filename: fname, data: temp };
                });

                for (var i = 0, len = addList.length; i < len; i++) {
                    var temp = addList[i].data;
                    if (this.currentConfiguration.xTransformation !== 'x' || this.currentConfiguration.yTransformation !== 'y') {
                        temp.dataTransformed = _fitData2.default.transformData(temp.data, this.currentConfiguration);
                        // console.log("Temp data:", temp);
                        this.selectedData.push(temp);
                    } else {
                        temp.dataTransformed = _lodash2.default.cloneDeep(temp.data);
                        this.selectedData.push(temp);
                    }
                }
            }
        },
        setFitFile: function setFitFile(filename) {
            this.fileToFit = filename;
        },
        setFit: function setFit(fitname) {
            // console.log("Setting new fit configuration:", fitname);
            // Deep clone because if you change the equation later, the original fit config's equation would be altered as well
            this.currentConfiguration = _lodash2.default.cloneDeep(this.$store.getters.getFitConfigsByID(fitname));
        },
        prepData: function prepData(sd) {
            // This function is to prepare the data before calling 'plotCurrentData' function
            // The initial array has multiple arrays with objects inside,
            // The for loop strips out the object for just the arrays of data
            // Then _.flatten is used to make it a single, non-nested array
            // This is simply to ease the process of plotting (see the nested loop function in 'plotCurrentData.js')
            var temp = [];
            // console.log("Data to push to temp:", sd);
            for (var i = 0; i < sd.length; i++) {
                // If a fit is set push transformed data, else push normal data
                temp.push(sd[i].dataTransformed);
            }
            // console.log("Merging data:", _.flatten(temp));
            return _lodash2.default.flatten(temp);
        },
        setParameters: function setParameters() {
            // Next tick is used to wait for all parameter changes to be updated
            // This is a to prevent the 'De-selecting' of all plotted data at once.
            this.$nextTick(function () {
                if (this.selectedData.length > 0) {
                    // console.log("Setting parameters", this.selectedData);
                    this.$refs.plot_1D.setParameters({
                        data: this.prepData(this.selectedData),
                        colorDomain: this.$store.getters.getColorDomain,
                        scales: this.scales,
                        fileToFit: this.fileToFit,
                        fitConfiguration: this.currentConfiguration,
                        fitSettings: this.fitSettings
                    });
                } else {
                    // Remove any elements previously plotted
                    d3.select(".chart-1D").remove();
                    d3.select("#tooltip-1D").remove();
                }
            });
        },
        setEquation: function setEquation(eq) {
            this.currentConfiguration.equation = eq;
        },
        setTransformations: function setTransformations(x, y) {
            // console.log("Setting transformations:", x, y);
            this.currentConfiguration.xTransformation = x;
            this.currentConfiguration.yTransformation = y;
        },
        setFitSettings: function setFitSettings(options) {
            this.fitSettings = options;
        },
        resetTransformations: function resetTransformations() {
            var xt = this.$store.getters.getFitConfigsXTrans(this.currentConfiguration.fit);
            var yt = this.$store.getters.getFitConfigsYTrans(this.currentConfiguration.fit);

            this.currentConfiguration.xTransformation = xt;
            this.currentConfiguration.yTransformation = yt;
        }
    },
    watch: {
        scales: {
            handler: function handler() {
                this.$nextTick(function () {
                    if (this.selectedData.length > 0) this.$refs.plot_1D.updateScales(this.scales);
                });
            },

            deep: true
        },
        fileToFit: function fileToFit() {
            var _this = this;

            // Watch if fileToFit changes, if so assign/re-assign selectedData.dataFitted       	
            // If fileToFit is set to Null, don't transform anything and reset the fit to none
            // console.log("File is being fit:", this.fileToFit);
            if (this.fileToFit === null) {

                this.$refs.fit_configurations.setFitBack();
                this.setFitSettings(this.$store.getters.getFitSettings);
                this.setFit("Linear");
            } else {
                this.selectedData.forEach(function (el) {
                    el.dataTransformed = _fitData2.default.transformData(el.data, _this.currentConfiguration);
                });
            }
        },
        selectedData: {
            handler: function handler() {
                this.setParameters();
            },
            deep: true
        },
        currentConfiguration: {
            handler: function handler() {
                var _this2 = this;

                // console.log("Current configurations changed!");
                if (this.currentConfiguration.xTransformation !== 'x' || this.currentConfiguration.yTransformation !== 'y') {
                    this.selectedData.forEach(function (el) {
                        el.dataTransformed = _fitData2.default.transformData(el.data, _this2.currentConfiguration);
                    });
                } else {
                    this.selectedData.forEach(function (el) {
                        el.dataTransformed = _lodash2.default.cloneDeep(el.data);
                    });
                }
            },
            deep: true
        },
        uploadedFiles: function uploadedFiles() {
            if (this.uploadedFiles.length > 0) {
                this.isUploaded = true;
            } else {
                this.isUploaded = false;
            }
        },
        fitSettings: {
            handler: function handler() {
                this.setParameters();
            },
            deep: true
        },
        filesToPlot: {
            // Watch if a file is selected, if so enable buttons and append selected data to a list
            handler: function handler() {
                var vm = this;

                // If a file is unselected while it has a fit, unselect the fit
                if (this.filesToPlot.indexOf(this.fileToFit) === -1) {
                    this.fileToFit = null;
                    this.fileFitChoice = [];
                }

                if (this.filesToPlot.length === 0) {
                    // There should be nothing to plot or fit,
                    // so reset everything to defaults.
                    // Remove any elements previously plotted
                    d3.select(".chart-1D").remove();
                    d3.select("#tooltip-1D").remove();

                    // Reset disable to default 'true'
                    this.disable = true;

                    // Reset X & Y Scales back to default
                    this.resetScales();

                    // Reset X & Y Transformations back to default
                    this.resetTransformations();

                    // Reset Levenberg Settings to default
                    this.$refs.fit_settings.resetSettings();

                    // Reset coefficients to an empty object
                    this.$refs.fit_configurations.$data.coefficients = {};

                    // Reset selected data to an empty array
                    this.selectedData = [];

                    console.log("No files to plot");
                } else {
                    this.disable = false;
                    var filesToFetch = [];

                    // First check if files to plot are in stored data
                    var tempData = this.filesToPlot.map(function (filename) {
                        var temp = vm.$store.getters.getSaved1D(filename);

                        // console.log("Here is the temp:", temp);
                        if (temp === '999') {
                            // console.log("Not in stored:", filename);
                            filesToFetch.push(filename);
                        } else {
                            return temp;
                        }
                    }).filter(function (item) {
                        return item !== undefined;
                    });

                    // Next fetch the file URLs
                    var fileURLs = this.getURLs(filesToFetch, "-Fetch1D");

                    if (fileURLs.length > 0) {
                        this.pull1DData(fileURLs, tempData);
                    } else {
                        this.setCurrentData(tempData, this.filesToPlot);
                    }
                }
            },
            deep: true
        }
    }
};

/* Import Mixins */

/***/ }),

/***/ "kWNt":
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container-fluid",
    attrs: {
      "id": "heading"
    }
  }, [_c('nav', {
    staticClass: "navbar navbar-default",
    attrs: {
      "id": "title"
    }
  }, [_c('div', {
    staticClass: "container-fluid",
    attrs: {
      "id": "menu"
    }
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "collapse navbar-collapse",
    attrs: {
      "id": "navbarElements"
    }
  }, [_c('ul', {
    staticClass: "nav navbar-nav navbar-right",
    attrs: {
      "id": "menu-buttons"
    }
  }, [(!_vm.isOffline) ? _c('li', [_c('button', {
    staticClass: "btn btn-success navbar-btn",
    on: {
      "click": _vm.fetchData
    }
  }, [_vm._v("Fetch Data")])]) : _vm._e(), _vm._v(" "), _c('li', [_c('label', {
    staticClass: "btn btn-success navbar-btn"
  }, [_c('i', {
    staticClass: "fa fa-file",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Load Files "), _c('input', {
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "id": "file-upload",
      "type": "file",
      "multiple": ""
    },
    on: {
      "change": function($event) {
        _vm.uploadFile($event.target.files)
      }
    }
  })])])]), _vm._v(" "), _c('ul', {
    staticClass: "nav navbar-nav navbar-right",
    attrs: {
      "id": "view-switches"
    }
  }, [_c('li', {
    staticClass: "active",
    attrs: {
      "id": "switch-1D"
    }
  }, [_c('a', {
    attrs: {
      "href": "#1D"
    },
    on: {
      "click": function($event) {
        _vm.switchView('1D')
      }
    }
  }, [_vm._v("1D")])]), _vm._v(" "), _c('li', {
    attrs: {
      "id": "switch-2D"
    }
  }, [_c('a', {
    attrs: {
      "href": "#2D"
    },
    on: {
      "click": function($event) {
        _vm.switchView('2D')
      }
    }
  }, [_vm._v("2D")])]), _vm._v(" "), _c('li', {
    attrs: {
      "id": "switch-Stitch"
    }
  }, [_c('a', {
    attrs: {
      "href": "#Stitch"
    },
    on: {
      "click": function($event) {
        _vm.switchView('Stitch')
      }
    }
  }, [_vm._v("Stitch")])])])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "navbar-header"
  }, [_c('button', {
    staticClass: "navbar-toggle",
    attrs: {
      "type": "button",
      "data-toggle": "collapse",
      "data-target": "#navbarElements"
    }
  }, [_c('span', {
    staticClass: "icon-bar"
  }), _vm._v(" "), _c('span', {
    staticClass: "icon-bar"
  }), _vm._v(" "), _c('span', {
    staticClass: "icon-bar"
  })]), _vm._v(" "), _c('img', {
    staticClass: "navbar-brand",
    attrs: {
      "src": __webpack_require__("Aeo6")
    }
  })])
}]}

/***/ }),

/***/ "mUbh":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var read1DData = exports.read1DData = function read1DData() {};

var read2DData = exports.read2DData = function read2DData() {};

/***/ }),

/***/ "mZ2H":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = __webpack_require__("d7EF");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var everpolate = __webpack_require__("dE62");
var LM = __webpack_require__("KMQp");
var _ = __webpack_require__("M4fF");

var interpolate = function (everpolate, LM, _) {

    var my = {};

    my.linear = function (selected) {

        /* Global private value for scaling base curves with each for loop iteration */
        var stitchedLine = undefined;
        var linear = everpolate.linear;

        // Set first base and non-base, the rest are assigned with newly fitted curve
        var base = undefined;
        var baseName = undefined;

        var nonBaseName = undefined;
        var nonBase = undefined;

        var seg1, seg2, seg3; // Variable to slice of left and right of curves and marge with stitched curve

        // Fitting/minimization function
        function shift(_ref) {
            var _ref2 = (0, _slicedToArray3.default)(_ref, 1),
                k = _ref2[0];

            return function (y) {
                return y + k;
            };
        }

        /* End of Global private values */

        for (var i = 0, len = selected.length; i < len; i++) {

            base = selected[i][0][2];
            baseName = selected[i][0][0];

            nonBaseName = selected[i][1][0];
            nonBase = selected[i][1][2];

            var yNonBaseInterpolated = linear(base.x, nonBase.x, nonBase.y);

            // console.log("** Original Non base x,y values:")
            // console.log("x = ", nonBase.x);
            // console.log("y = ", nonBase.y);

            // console.log("** Interpolates Non base y values using base x values:")
            // console.log("x = ", base.x);
            // console.log("y = ", yNonBaseInterpolated)


            // Now let's minimize the difference between: YBase and yNonBaseInterpolated
            var options = {
                damping: 0.001,
                initialValues: [1],
                gradientDifference: 0.1,
                maxIterations: 100,
                errorTolerance: 0.001
            };

            // Data to fit in the func above
            var data = {
                x: yNonBaseInterpolated,
                y: base.y
            };

            var fitted_params = LM(data, shift, options);
            var k = fitted_params.parameterValues[0];

            // console.log("** Scaling value: K =", k)

            var yNonBaseScaled = nonBase.y.map(function (el) {
                return el + k;
            });

            // console.log('yNonBaseScaled =', yNonBaseScaled);

            // Final curve:
            // Concatenate and sort the arrays
            var xFinal = base.x.concat(nonBase.x);
            var yFinal = base.y.concat(yNonBaseScaled);
            var eFinal = base.e.concat(nonBase.e);

            // 1) combine the arrays:
            var list = [];
            for (var _i = 0, _len = xFinal.length; _i < _len; _i++) {
                list.push({ 'x': xFinal[_i], 'y': yFinal[_i], 'e': eFinal[_i] });
            } // 2) sort:
            list.sort(function (a, b) {
                return a.x - b.x;
            });

            // 3) separate them back out:
            for (var _i2 = 0, _len2 = list.length; _i2 < _len2; _i2++) {
                xFinal[_i2] = list[_i2].x;
                yFinal[_i2] = list[_i2].y;
                eFinal[_i2] = list[_i2].e;
            }

            var interpCurve = { x: xFinal, y: yFinal, e: eFinal };

            // First shift all curves for proceeding brushes
            selected = shiftCurves(selected, i, k);

            if (i === 0) {
                seg1 = sliceCurve(selected[i][0][1], "left", selected[i][2][0]);
                seg2 = interpCurve;
                seg3 = sliceCurve(selected[i][1][1], "right", selected[i][2][1]);
            } else {
                seg1 = sliceCurve(stitchedLine, "left", selected[i][2][0]);
                seg2 = interpCurve;
                seg3 = sliceCurve(selected[i][1][1], "right", selected[i][2][1]);
            }

            stitchedLine = mergeSegs(seg1, seg2, seg3);
        }

        /*  Final step: Check if the line is negative for Y
            If so, find the minimum negative value of y and shifted all up by that value
            If no negative values, proceed as normal 
        */
        stitchedLine = fixNegatives(stitchedLine);
        //console.log("Stitched Line:", stitchedLine);

        return stitchedLine;
    };

    function fixNegatives(line) {

        var minY = _.min(line.y);

        if (minY < 0) {
            line.y = line.y.map(function (el) {
                var result = el + -1 * minY;

                if (result === 0) {
                    return Number.MIN_VALUE; // this is to prevent errors when log of zero
                } else {
                    return result;
                }
            });
        }

        return line;
    }

    /* Shift Curves Function:
        The function takes the entire array of selected data and shifts the curve's data by y+k.
        (the same is applied to the selected data).
         k is the constant to shift a curve's y value
         n is the current iteration of the linear interpolation function above.
            This is to prevent applying a k-shift to post-merged curve data.
    */
    function shiftCurves(curves, n, k) {

        for (var i = n, length = curves.length; i < length; i++) {

            var tempPair = curves[i];

            for (var j = 0, _length = tempPair.length - 1; j < _length; j++) {

                if (!(i === n && j === 0)) {
                    // Shift all data
                    curves[i][j][1].y = curves[i][j][1].y.map(function (el) {
                        return el + k;
                    });

                    // Shift selected data
                    curves[i][j][2].y = curves[i][j][2].y.map(function (el) {
                        return el + k;
                    });
                }
            }
        }

        return curves;
    }

    /* Slice Curve Function:
        The function takes a set of data and selects data depending on the direction and cutoff value.
         Direction is either 'left' or 'right', which is associated with a brush.
        Cutoff is the value to place the condition on. Anything left/right of cutoff will not be included.
         The final slice is returned for the ultimate merging of curves.
    */
    function sliceCurve(data, direction, cutoff) {

        var temp = { x: [], y: [], e: [] };

        for (var i = 0, len = data.x.length; i < len; i++) {

            if (direction === 'right' && data.x[i] > cutoff) {
                temp.x.push(data.x[i]);
                temp.y.push(data.y[i]);
                temp.e.push(data.e[i]);
            }

            if (direction === 'left' && data.x[i] < cutoff) {
                temp.x.push(data.x[i]);
                temp.y.push(data.y[i]);
                temp.e.push(data.e[i]);
            }
        }

        return temp;
    }

    /* Merge Curves Function:
        Takes three segments and marges the points in order of left to right for segment position.
        The three segments merge into a new curve. 
        This function is called at the end of the line interpolation.
    */

    function mergeSegs(s1, s2, s3) {
        var merged = { x: [], y: [], e: [] };

        merged.x.push(s1.x);
        merged.x.push(s2.x);
        merged.x.push(s3.x);
        merged.x = _.flatten(merged.x);

        merged.y.push(s1.y);
        merged.y.push(s2.y);
        merged.y.push(s3.y);
        merged.y = _.flatten(merged.y);

        merged.e.push(s1.e);
        merged.e.push(s2.e);
        merged.e.push(s3.e);
        merged.e = _.flatten(merged.e);

        return merged;
    }

    return my;
}(everpolate, LM, _);

exports.default = interpolate;

/***/ }),

/***/ "o6mG":
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "filter-selection input-group"
  }, [_vm._m(0), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.filterChoice),
      expression: "filterChoice"
    }],
    staticClass: "group-selection form-control input-sm",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.filterChoice = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', [_vm._v("All")]), _vm._v(" "), _vm._l((_vm.jobs), function(job) {
    return _c('option', [_vm._v(_vm._s(job))])
  })], 2)]), _vm._v(" "), (_vm.sortToggle) ? _c('button', {
    staticClass: "btn-sort btn btn-sm btn-default",
    on: {
      "click": function($event) {
        _vm.sortByDate('descending')
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-sort-amount-asc",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Date Modified")]) : _c('button', {
    staticClass: "btn-sort btn btn-sm btn-default",
    on: {
      "click": function($event) {
        _vm.sortByDate('ascending')
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-sort-amount-desc",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Date Modified")])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "select-tag input-group-addon"
  }, [_c('i', {
    staticClass: "fa fa-filter",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Filter:")])
}]}

/***/ }),

/***/ "ogg4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isFinite = __webpack_require__("AMV0");

var _isFinite2 = _interopRequireDefault(_isFinite);

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

var _d3Hexbin = __webpack_require__("1EFM");

var d3hex = _interopRequireWildcard(_d3Hexbin);

var _lodash = __webpack_require__("M4fF");

var _lodash2 = _interopRequireDefault(_lodash);

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hex = function (d3, _, $, d3hex) {
    /******* Private Global Variables for Hex Module **************/
    // Object for plot elements
    var elements = {
        svg: undefined,
        plot: undefined,
        axes: undefined,
        tooltip: undefined
    };

    // Object for plot scale functions
    var scales = {
        xScale: undefined,
        yScale: undefined,
        legendScale: undefined
    };

    // Object for axis generators
    var axesObj = {
        xAxis: undefined,
        yAxis: undefined

        // Object for dimensions
    };var dim = {
        width: undefined,
        height: undefined,
        legendWidth: undefined,
        legendHeight: undefined
    };

    var margin = { top: 50, right: 65, bottom: 50, left: 65 };

    // HEX PLOT VARIABLES
    var zoom = undefined;

    /******* End of Global for Hex Module **************/

    // Module object
    var my = {};

    /*********** Hex Plot Function ************************/
    my.hexPlot = function (data, settings) {

        // If plot is already present, simply update with the new set of data
        if (!d3.select(".chart-2D").empty()) {
            //Set Data
            var binSize = _.cloneDeep(settings.binSize);
            var transformType = _.cloneDeep(settings.intensityTransformation);

            // console.log("These are the plot params", this.plotParams);
            var plotData = _.cloneDeep(data);

            // Filter invalid data points
            plotData = plotData.filter(function (el) {
                return (0, _isFinite2.default)(el.qx) && (0, _isFinite2.default)(el.qy) && (0, _isFinite2.default)(el.intensity) && (0, _isFinite2.default)(el.error);
            });

            if (transformType === "Log") {
                // console.log("Transforming Hex Data...");
                plotData = plotData.filter(function (el) {
                    return el.intensity > 0;
                });
                plotData.forEach(function (el) {
                    el.intensity = Math.log(el.intensity);
                });
            }

            my.update(plotData, binSize, transformType);
            return;
        }

        //Set Data
        var binSize = _.cloneDeep(settings.binSize);
        var transformType = _.cloneDeep(settings.intensityTransformation);

        // console.log("These are the plot params", this.plotParams);
        var plotData = _.cloneDeep(data);

        // Filter invalid data points
        plotData = plotData.filter(function (el) {
            return (0, _isFinite2.default)(el.qx) && (0, _isFinite2.default)(el.qy) && (0, _isFinite2.default)(el.intensity) && (0, _isFinite2.default)(el.error);
        });

        if (transformType === "Log") {
            // console.log("Transforming Hex Data...");
            plotData = plotData.filter(function (el) {
                return el.intensity > 0;
            });
            plotData.forEach(function (el) {
                el.intensity = Math.log(el.intensity);
            });
        }

        //Add tool tip and hide it until invoked
        elements.tooltip = d3.select("#app-container").append("div").attr("class", "tooltip-2D").style("opacity", 0);

        // Pull plot's parent container width, this will be used to scale the plot responsively

        var containerWidth = document.getElementById("plot-2D").offsetWidth;
        var viewHeight = containerWidth / (16 / 9);
        dim.height = viewHeight - margin.top - margin.bottom;
        dim.width = containerWidth - margin.left - margin.right;

        // Set legend dimensions
        dim.legendWidth = 25;
        dim.legendHeight = dim.height;

        // Set plot scales
        scales.xScale = d3.scaleLinear().range([0, dim.width]);
        scales.yScale = d3.scaleLinear().range([dim.height, 0]);

        // Set scale domains
        scales.xScale.domain(d3.extent(plotData, function (d) {
            return d.qx;
        }));
        scales.yScale.domain(d3.extent(plotData, function (d) {
            return d.qy;
        }));

        // Create axis generator
        axesObj.xAxis = d3.axisBottom(scales.xScale).ticks(10);
        axesObj.yAxis = d3.axisLeft(scales.yScale).ticks(10);

        // Set plot area
        var viewbox = "0 0 " + containerWidth + " " + viewHeight;
        elements.svg = d3.select("#plot-2D").append("svg").attr("viewBox", viewbox).attr("perserveAspectRatio", "xMidYMid meet").attr('class', 'chart-2D').attr("width", dim.width + margin.left + margin.right).attr("height", dim.height + margin.top + margin.bottom);

        //Add clip path so hexagons do not exceed boundaries
        elements.svg.append("defs").append("clipPath").attr("id", "clip-2D").append("rect").attr("width", dim.width).attr("height", dim.height);

        // Create plot elements (plot area, axes, and color legend)
        elements.plot = elements.svg.append("g").attr("class", "plot").attr("clip-path", "url(#clip-2D)").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        elements.plot.append("g").attr("class", "hexagon");

        elements.axes = elements.svg.append("g").attr("id", "axis-2D").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        elements.axes.append("g").attr("class", "axis axis--y");

        elements.axes.append("g").attr("class", "axis axis--x").attr("transform", "translate(0," + dim.height + ")");

        elements.legend = elements.svg.append("g").attr("class", "legend").attr("transform", "translate(" + (dim.width + 75) + "," + margin.top + ")");

        elements.legend.append("g").attr("class", "leg-bars");

        elements.legend.append("g").attr("transform", "translate(" + dim.legendWidth + ", 0)").attr("class", "legend-axis legend-axis-y");

        // Add X Axis Label
        elements.svg.append("g").append("foreignObject").attr("height", 100).attr("width", 200).attr("transform", "translate(" + (dim.width + margin.left + margin.right) / 2 + "," + (dim.height + margin.top + margin.bottom / 1.5) + ")").attr("id", "xLabel2D").html("`Qx`");

        // Add Y Axis Label
        elements.svg.append("g").append("foreignObject").attr("height", 100).attr("width", 200).attr("transform", "translate(0," + dim.height / 2 + ") rotate(-90)").attr("id", "yLabel2D").html("`Qy`");

        //Add Chart Title
        elements.svg.append("text").attr("class", "charttitle").attr("transform", "translate(" + dim.width / 2 + " ," + margin.top / 1.5 + ")").text("Intensity Plot (Hexbin Size = " + binSize + ")");

        // Enable zoom
        zoom = d3.zoom().scaleExtent([1 / 2, 4]).on("zoom", my.zoomed);
        elements.svg.call(zoom);

        // Call MathJax to make plot axis labels look pretty
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, ["xLabel2D", "yLabel2D"]]);

        // Add responsive elements
        // Essentially when the plot-area gets resized it will look to the
        // width and scale the plot according to newly updated width.
        // The css file has min- and max-width's incase the resizing gets too small,
        // the plot will not scale below these dimensions.
        // Solution courtesy of: https://stackoverflow.com/a/26077110
        $.event.special.width2DChanged = {
            remove: function remove() {
                $(this).children('iframe.width-changed-2D').remove();
            },
            add: function add() {
                var elm = $(this);
                var iframe = elm.children('iframe.width-changed-2D');
                if (!iframe.length) {
                    iframe = $('<iframe/>').addClass('width-changed-2D').prependTo(this);
                }
                var oldWidth = elm.width();
                function elmResized() {
                    var width = elm.width();
                    if (oldWidth != width) {
                        elm.trigger('width2DChanged', [width, oldWidth]);
                        oldWidth = width;
                    }
                }

                var timer = 0;
                var ielm = iframe[0];
                (ielm.contentWindow || ielm).onresize = function () {
                    clearTimeout(timer);
                    timer = setTimeout(elmResized, 20);
                };
            }
        };

        var chart2D = $(".chart-2D");
        var aspectRatio = chart2D.width() / chart2D.height();
        var container = chart2D.parent();

        $("#plot-2D").on("width2DChanged", function () {
            var targetWidth = container.width();
            chart2D.attr("width", targetWidth);
            chart2D.attr("height", Math.round(targetWidth / aspectRatio));
        });

        // Update/generate plot with data
        my.update(plotData, binSize, transformType);
    };

    my.update = function (newData, binSize, transformType) {

        var plotData = _.cloneDeep(newData);

        // Adjust scale's domain whenver new data is added
        scales.xScale.domain(d3.extent(plotData, function (d) {
            return d.qx;
        }));
        scales.yScale.domain(d3.extent(plotData, function (d) {
            return d.qy;
        }));

        // Rescale to zoom's scale
        var t = d3.zoomTransform(elements.svg.node());
        var new_yScale = t.rescaleY(scales.yScale);
        var new_xScale = t.rescaleX(scales.xScale);

        // Adjust axis labels
        axesObj.yAxis.scale(new_yScale.copy());
        axesObj.xAxis.scale(new_xScale.copy());

        // Transition axis labels accordingly
        elements.axes.transition().duration(750).select('.axis--y').call(axesObj.yAxis);
        elements.axes.transition().duration(750).select('.axis--x').call(axesObj.xAxis);

        // Create hexbin generator
        var hexbin = d3hex.hexbin().radius(binSize).extent([[0, 0], [dim.width, dim.height]]);

        // Create points, which are used to plot hexbins
        var points = [];

        plotData.forEach(function (el) {
            points.push([scales.xScale(el.qx), scales.yScale(el.qy), el.intensity]);
        });

        var hexbins = hexbin(points);

        for (var i = 0; i < hexbins.length; i++) {
            var sum = 0;
            for (var j = 0; j < hexbins[i].length; j++) {
                sum += hexbins[i][j][2];
            }
            var avgIntensity = sum / hexbins[i].length; // sum average intensity for a bin
            hexbins[i].avgIntensity = avgIntensity; // Assign new object value to hexbins
        }

        // Create color scale generator using Viridis color set
        var color = d3.scaleSequential(d3.interpolateViridis).domain(d3.extent(hexbins, function (d) {
            return d.avgIntensity;
        }));

        // Create legend scale generator
        scales.legendScale = d3.scaleLinear().domain(color.domain()).range([dim.legendHeight, 0]).nice();

        // Create a value range for the legend color scale
        var valRange = d3.extent(hexbins, function (d) {
            return d.avgIntensity;
        });

        /********************************************************* 
            An interval is calculated to represent each "slice" of the
            legend's color values. Each "slice" will be stacked together
            to display the legend's vertical bar.
            
            Since height and range change depending on the data and
            size of chart, we dynamically find the interval
            e.g.) The extent of the average intensity = [-1, 1]
                The height = 400
                The interval = (1 - (-1)) / 400 
        **************************************************************/
        var interval = (valRange[1] - valRange[0]) / dim.height;
        //console.log("Interval", interval);

        // Re-draw Legend
        var legendSelect = elements.legend.select(".leg-bars").selectAll(".bars").data(d3.range(valRange[1], valRange[0], -interval), function (d) {
            return d;
        });

        // Remove old legend bars
        legendSelect.exit().remove();

        // Enter new legend bars
        legendSelect.enter().append("rect").attr("class", "bars").attr("x", 0).attr("y", function (d, i) {
            return i;
        }).attr("height", 1).attr("width", dim.legendWidth).style("fill", function (d, i) {
            return color(d);
        });

        elements.legend.select('.legend-axis-y').transition().duration(750).call(d3.axisRight(scales.legendScale));

        // Hex radius is tweaked to eliminate white spaces between hexagons
        // This needs to be further investigated because overlap isn't visible.
        var hexRad = binSize + 0.4;

        // Re-draw Hex Plot
        elements.plot.select(".hexagon").selectAll('.hexagons').remove();

        elements.plot.select(".hexagon").selectAll('path').data(hexbins).enter().append("path").attr("d", hexbin.hexagon(hexRad)).attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        }).attr("fill", function (d) {
            return color(d.avgIntensity);
        }).attr("stroke", "none").attr("class", "hexagons").on("mouseover", function (d) {
            elements.tooltip.transition().duration(200).style("opacity", 1);

            elements.tooltip.html("Qx: " + scales.xScale.invert(d.x).toFixed(4) + "<br/>" + "Qy: " + scales.yScale.invert(d.y).toFixed(4) + "<br/> Avg. Intensity: " + d.avgIntensity.toFixed(4)).style("top", d3.event.pageY - 40 + "px").style("left", d3.event.pageX + 15 + "px");
        }).on("mouseout", function (d) {
            elements.tooltip.transition().duration(500).style("opacity", 0);
        });
    };

    /********** Zoom Function  ***********************************************/
    my.zoomed = function () {
        // re-scale axes during zoom
        elements.axes.select(".axis--y").transition().duration(50).call(axesObj.yAxis.scale(d3.event.transform.rescaleY(scales.yScale)));

        elements.axes.select(".axis--x").transition().duration(50).call(axesObj.xAxis.scale(d3.event.transform.rescaleX(scales.xScale)));

        // Transform hexagons depending on the zoom
        elements.plot.selectAll(".hexagon").attr("transform", d3.event.transform);
    };

    /********** Plot Reset Function  *****************************************/
    my.resetPlot = function () {
        elements.svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity);
    };

    // Return Module object for public use
    return my;
}(d3, _lodash2.default, _jquery2.default, d3hex);

// Export hex module for use in Plot2D.vue
exports.default = hex;

/***/ }),

/***/ "pAL7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateSlider = undefined;

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

var _fitData = __webpack_require__("62h4");

var _fitData2 = _interopRequireDefault(_fitData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var updateSlider = exports.updateSlider = {
    methods: {
        updateSlider: function updateSlider() {
            var vm = this;

            console.log("Updating slider...", vm.plotData.length);

            vm.dataToFit = vm.plotData.filter(function (d) {
                return d.name === vm.plotParameters.fileToFit;
            });

            vm.fitResults = _fitData2.default.fitData(vm.dataToFit, vm.plotParameters.fitConfiguration.equation, vm.plotParameters.fitSettings);
            vm.coefficients = vm.fitResults.coefficients;
            vm.fitData = vm.fitResults.fittedData;
            vm.fitError = vm.fitResults.error;

            vm.scale.x2.domain(d3.extent(vm.plotData, function (d) {
                return d.x;
            })).nice();
            var new_xScale2 = vm.scale.x2.copy();

            // update brush x scale axis
            vm.axis.x2.scale(new_xScale2);

            // visually reflect the newly updated x axis
            vm.elements.slider.select('.axis--x').transition().duration(750).call(vm.axis.x2);

            var selectSlider = vm.elements.slider.select("#slider-lines").selectAll("line").data(vm.dataToFit);

            selectSlider.transition().duration(750).attr("x1", function (d) {
                return new_xScale2(d.x);
            }).attr("y1", vm.dimensions.h2).attr("x2", function (d) {
                return new_xScale2(d.x);
            }).attr("y2", 0);

            // enter new brush lines
            selectSlider.enter().append("line").attr('class', 'dotslider').attr("x1", function (d) {
                return new_xScale2(d.x);
            }).attr("y1", vm.dimensions.h2).attr("x2", function (d) {
                return new_xScale2(d.x);
            }).attr("y2", 0).style("stroke", "slategray");

            // remove any old brush lines
            selectSlider.exit().remove();

            // Call brush
            vm.brushObj.brush.on("brush", vm.brushed);

            // set initial brushSelection
            if (vm.brushObj.brushSelection.length === 0 || !(vm.plotParameters.fileToFit === vm.brushObj.brushFile) || !(vm.brushObj.brushTransformation === vm.plotParameters.fitConfiguration.xTransformation)) {

                var xExtent = d3.extent(vm.dataToFit, function (d) {
                    return d.x;
                });

                vm.brushObj.brushSelection[0] = new_xScale2(xExtent[0]);
                vm.brushObj.brushSelection[1] = new_xScale2(xExtent[1]);
                vm.brushObj.brushFit = vm.plotParameters.fitConfiguration.fit;
                vm.brushObj.brushFile = vm.plotParameters.fileToFit;
                vm.brushObj.brushTransformation = vm.plotParameters.fitConfiguration.xTransformation;
            } else if (!(vm.brushObj.brushFit === vm.plotParameters.fitConfiguration.fit)) {
                // if same file to fit, but new fit transformation, change brush selections

                var _xExtent = d3.extent(vm.dataToFit, function (d) {
                    return d.x;
                });

                vm.brushObj.brushSelection[0] = new_xScale2(_xExtent[0]);
                vm.brushObj.brushSelection[1] = new_xScale2(_xExtent[1]);
                vm.brushObj.brushFit = vm.plotParameters.fitConfiguration.fit;
            } else {
                // if same file to fit after update and same fit transformation, simply update brush selection to current selection
                vm.brushObj.brushSelection[0] = new_xScale2(vm.selLimits.xMin);
                vm.brushObj.brushSelection[1] = new_xScale2(vm.selLimits.xMax);
            }

            vm.elements.slider.select('.brush').call(vm.brushObj.brush).call(vm.brushObj.brush.move, vm.brushObj.brushSelection);
            // brush.move allows you to set the current selection for the brush element
            // this will dynamically update according to the last selection made.
            // This is to allow for persistent selections upon the plot being re-drawn.
        }
    }
};

/***/ }),

/***/ "pg1S":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var checkError = exports.checkError = {
    methods: {
        checkError: function checkError() {
            var vm = this;

            var len = document.getElementById("error-container").children.length;
            return len > 0 ? false : true;
        }
    }
};

/***/ }),

/***/ "q1FB":
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "Scales"
  }, [_c('fieldset', {
    attrs: {
      "disabled": _vm.DISABLE
    }
  }, [_c('div', {
    staticClass: "input-group"
  }, [_c('span', {
    staticClass: "input-group-addon"
  }, [_vm._v("X Scale")]), _vm._v(" "), _c('select', {
    ref: "x_select",
    staticClass: "form-control",
    on: {
      "change": function($event) {
        _vm.$emit('update-scales', 'X', $event.target.value)
      }
    }
  }, _vm._l((_vm.xScales), function(scale) {
    return _c('option', [_vm._v(_vm._s(scale))])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "input-group"
  }, [_c('span', {
    staticClass: "input-group-addon"
  }, [_vm._v("Y Scale")]), _vm._v(" "), _c('select', {
    ref: "y_select",
    staticClass: "form-control",
    on: {
      "change": function($event) {
        _vm.$emit('update-scales', 'Y', $event.target.value)
      }
    }
  }, _vm._l((_vm.yScales), function(scale) {
    return _c('option', [_vm._v(_vm._s(scale))])
  }))]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-warning btn-sm btn-block",
    on: {
      "click": _vm.resetScale
    }
  }, [_c('i', {
    staticClass: "fa fa-refresh",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Reset Scales")])])])
},staticRenderFns: []}

/***/ }),

/***/ "q1UI":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateStitchLine = undefined;

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var updateStitchLine = exports.updateStitchLine = {
    methods: {
        updateStitchLine: function updateStitchLine() {
            var vm = this;

            if (!d3.select("#stitched-line").empty()) {

                d3.select("#stitched-line").select("path").transition().duration(750).attr("d", vm.line);
            }
        }
    }
};

/***/ }),

/***/ "qjSU":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    elements: {
        svg: undefined,
        plot: undefined,
        axis: undefined,
        legend: undefined,
        tooltip: undefined,
        zoom: undefined
    },
    dimensions: {
        w: 960,
        h: 600,
        viewbox: undefined,
        aspectW: 16,
        aspectH: 9
    },
    margin: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 75
    },
    scale: {
        x: undefined,
        xType: 'X',
        y: undefined,
        yType: 'Y'
    },
    axis: {
        x: undefined,
        xGrid: undefined,
        y: undefined,
        yGrid: undefined
    },
    labels: {
        x: 'X',
        y: 'Y'
    },
    zoom: undefined,
    color: undefined,
    line: undefined,
    plotParameters: undefined,
    plotData: undefined,
    dataNest: [],
    prevKeys: []
};

/***/ }),

/***/ "rUae":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/fonts/glyphicons-halflings-regular.fa27723.woff";

/***/ }),

/***/ "seT/":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initSlider = undefined;

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initSlider = exports.initSlider = {
    methods: {
        initSlider: function initSlider() {
            var vm = this;

            vm.margin2 = {
                top: 30,
                right: 50,
                bottom: 50,
                left: 75
            };

            vm.dimensions.h2 = 25;

            // Set scales
            vm.scale.x2 = vm.plotParameters.scales.xScale;

            vm.scale.x2.range([0, vm.dimensions.w]);
            vm.scale.x2.domain(d3.extent(vm.plotData, function (d) {
                return d.x;
            }));

            vm.axis.x2 = d3.axisBottom(vm.scale.x2);

            vm.elements.slider = vm.elements.svg.append("g").attr("class", "slider").attr("transform", "translate(" + vm.margin2.left + "," + (vm.dimensions.h + vm.margin2.top + vm.margin2.bottom) + ")");

            vm.brushObj.brush = d3.brushX().extent([[0, 0], [vm.dimensions.w, vm.dimensions.h2]]);

            // append scatter plot to brush chart area
            vm.elements.slider.append("g").attr("id", "slider-lines");

            vm.elements.slider.append("g").attr("class", "brush");

            vm.elements.slider.append("g").attr("class", "axis axis--x").attr("transform", "translate(0," + vm.dimensions.h2 + ")");
        }
    }
};

/***/ }),

/***/ "t+42":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "tQvK":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "tu2r":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initFitLine = undefined;

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initFitLine = exports.initFitLine = {
    methods: {
        initFitLine: function initFitLine() {
            var vm = this;

            // Add fitted line
            vm.elements.plot.append("g").attr("id", "fit-line").append("path").attr("clip-path", "url(#clip-" + vm.ID + ")").attr("class", "fitted-line");
        }
    }
};

/***/ }),

/***/ "u1G2":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "u1pA":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "uF8u":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.drawPlot = undefined;

var _isFinite = __webpack_require__("AMV0");

var _isFinite2 = _interopRequireDefault(_isFinite);

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var drawPlot = exports.drawPlot = {
    methods: {
        drawPlot: function drawPlot() {
            var vm = this;

            // If plot is already present, simply update with the new set of data
            if (!d3.select(".chart-1D").empty() && vm.isFit === vm.prevFit) {

                // Update titles according to new transformations
                vm.labels.x = vm.plotParameters.fitConfiguration.xTransformation;
                vm.labels.y = vm.plotParameters.fitConfiguration.yTransformation;

                // Lastly, update plot with data                
                vm.updatePlot(vm.plotParameters.data);
                // if a fit is selected add/update data
                if (vm.isFit) {
                    vm.updateSlider();vm.updateFitLine();
                }

                return;
            } else {
                // New fit is being selected so tear down plot and re-do everything from scratch

                d3.select(".chart-1D").remove();
                d3.select("#tooltip-1D").remove();
                vm.selLimits.xMin = null;
                vm.selLimits.yMin = null;
                vm.brushObj.brushSelection = [];
                vm.brushObj.brushFile = undefined;
            }

            vm.plotData = vm.plotParameters.data; //regular data to plot
            // Filter any infinity values, null, or NaN before plotting, this will happen when transforming log data = 0
            vm.plotData = vm.plotData.filter(function (d) {
                return (0, _isFinite2.default)(d.y) && (0, _isFinite2.default)(d.x);
            });

            vm.labels.x = vm.plotParameters.fitConfiguration.xTransformation; //xTitle according to label
            vm.labels.y = vm.plotParameters.fitConfiguration.yTransformation; //yTitle according to label

            //Catch any empty data and throw an error
            if (vm.plotData.length < 1) {
                console.log("No data! Error!");
                //Remove any elements previously plotted
                d3.select(".chart-1D").remove();
                d3.select("#tooltip-1D").remove();

                vm.isError = !vm.isError;

                if (vm.checkError()) {
                    var errorMsg = "<strong>Error!</strong> No data to plot...might be due to the fit transformation resulting in invalid values.";
                    eventBus.$emit('error-message', errorMsg, 'danger');
                }

                return;
            } else {
                vm.isError = false;
            }

            // Set plot dimensions
            vm.initDimensions();

            // Set scales
            vm.initScales();

            // Set initial Elements
            vm.setElements();

            vm.prevFit = vm.isFit;

            // If fit is selected initialize a slider and fit line elements
            if (vm.isFit) {
                vm.initSlider();
                vm.initFitLine();
            }

            // Set zoom on zoomWindow
            vm.elements.svg.select(".zoom").call(vm.zoom);

            // Create a responsive chart
            vm.setResponsive();

            // Lastly, update plot with data
            if (vm.isFit) vm.updateSlider();

            vm.updatePlot(vm.plotData);

            // if a fit is selected add/update data
            if (vm.isFit) vm.updateFitLine();
        }
    }
};

/***/ }),

/***/ "uQZo":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/fonts/glyphicons-halflings-regular.448c34a.woff2";

/***/ }),

/***/ "ukYY":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var addFetched1DFiles = exports.addFetched1DFiles = function addFetched1DFiles(state, files) {
    state.fetched1DFiles = files;

    //Add to color domain
    for (var i = 0, len = files.length; i < len; i++) {
        state.colorDomain.push(files[i].filename);
    }
};
var addFetched2DFiles = exports.addFetched2DFiles = function addFetched2DFiles(state, files) {
    state.fetched2DFiles = files;
};
var addUploaded1DFiles = exports.addUploaded1DFiles = function addUploaded1DFiles(state, files) {
    // console.log("Add 1D files...", files);
    state.uploaded1DFiles = state.uploaded1DFiles.concat(files);

    //Add to color domain
    for (var i = 0, len = files.length; i < len; i++) {
        state.colorDomain.push(files[i].filename);
    }
};
var addUploaded2DFiles = exports.addUploaded2DFiles = function addUploaded2DFiles(state, files) {
    // console.log("Add 2D files...", files);
    state.uploaded2DFiles = state.uploaded2DFiles.concat(files);
};
var store1DData = exports.store1DData = function store1DData(state, data) {
    var tempName = data.filename;
    var tempData = data.data;

    state.saved1DData[tempName] = tempData;
};
var store2DData = exports.store2DData = function store2DData(state, data) {
    var tempName = data.filename;
    var tempData = data.data;
    state.saved2DData[tempName] = tempData;
};
var remove1DFile = exports.remove1DFile = function remove1DFile(state, filename) {
    var index = 0;

    for (var len = state.uploaded1DFiles.length; index < len; index++) {

        var temp = state.uploaded1DFiles[index];

        if (filename === temp.filename) break;
    }

    // Remove from 2D Uploads list
    state.uploaded1DFiles.splice(index, 1);

    // Delete from stored list if present
    delete state.saved1DData[filename];
};
var remove2DFile = exports.remove2DFile = function remove2DFile(state, filename) {
    var index = 0;

    for (var len = state.uploaded2DFiles.length; index < len; index++) {

        var temp = state.uploaded2DFiles[index];

        if (filename === temp.filename) break;
    }

    // Remove from 2D Uploads list
    state.uploaded2DFiles.splice(index, 1);

    // Delete from stored list if present
    delete state.saved2DData[filename];
};

var removeColor = exports.removeColor = function removeColor(state, filename) {
    var index = 0;
    for (var len = state.colorDomain.length; index < len; index++) {
        var temp = state.colorDomain[index];

        if (filename === temp) break;
    }

    state.colorDomain.splice(index, 1);
};

var removePoint = exports.removePoint = function removePoint(state, payload) {
    var name = payload.name;
    var index = payload.index;

    state.saved1DData[name].data.splice(index, 1);
};

/***/ }),

/***/ "vAUG":
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel-group"
  }, [_c('div', {
    class: 'panel panel-' + _vm.PANELTYPE
  }, [_c('div', {
    staticClass: "panel-heading"
  }, [_c('div', {
    staticClass: "panel-title"
  }, [_c('div', {
    staticClass: "collapser",
    on: {
      "click": function($event) {
        _vm.isCollapsed = !_vm.isCollapsed
      }
    }
  }, [_c('span', [_vm._v(_vm._s(_vm.MAINTITLE) + " ")]), _vm._v(" "), (_vm.isCollapsed) ? _c('span', {
    staticClass: "collapser-icon"
  }, [_c('i', {
    staticClass: "fa fa-plus-square",
    attrs: {
      "aria-hidden": "true"
    }
  })]) : _c('span', {
    staticClass: "collapser-icon"
  }, [_c('i', {
    staticClass: "fa fa-minus-square",
    attrs: {
      "aria-hidden": "true"
    }
  })])])])]), _vm._v(" "), _c('div', {
    staticClass: "panel-collapse collapse in"
  }, [_vm._t("default")], 2)])])
},staticRenderFns: []}

/***/ }),

/***/ "w0zR":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setElements = undefined;

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var setElements = exports.setElements = {
    methods: {
        setElements: function setElements() {
            var vm = this;

            //Add a Line Plot Function
            vm.line = d3.line().defined(function (d) {
                if (vm.scale.yType === 'Log(Y)') {
                    return d.y > 0;
                } else {
                    return d;
                }
            }).x(function (d) {
                return vm.scale.x(d.x);
            }).y(function (d) {
                return vm.scale.y(d.y);
            });

            // Add tool tip and hide it until invoked
            vm.elements.tooltip = d3.select("#app-container").append("div").attr("id", "tooltip-" + vm.ID).attr("class", "tooltip").style("opacity", 0);

            // Add main chart area
            vm.elements.svg = d3.select("#plot-" + vm.ID).append("svg").attr("viewBox", vm.dimensions.viewbox).attr("perserveAspectRatio", "xMidYMid meet").attr("class", "chart-" + vm.ID).attr("width", vm.dimensions.w + vm.margin.left + vm.margin.right).attr("height", vm.dimensions.h + vm.margin.top + vm.margin.bottom);

            // Add clip path so points/line do not exceed plot boundaries
            vm.elements.svg.append("defs").append("clipPath").attr("id", "clip-" + vm.ID).append("rect").attr("width", vm.dimensions.w).attr("height", vm.dimensions.h);

            // Add plot area
            vm.elements.svg.append("rect").attr("class", "plotbg").attr("width", vm.dimensions.w).attr("height", vm.dimensions.h).attr("transform", "translate(" + vm.margin.left + "," + vm.margin.top + ")");

            // Add Axis and Gridline section
            vm.elements.axis = vm.elements.svg.append("g").attr("id", "axis-" + vm.ID);

            vm.elements.zoom = vm.elements.svg.append('g').attr('id', 'zoom-group-' + vm.ID);

            vm.elements.zoom.append('g').attr("id", "zoom-" + vm.ID).append('rect').attr('class', 'zoom').attr('width', vm.dimensions.w).attr('height', vm.dimensions.h).attr('transform', 'translate(' + vm.margin.left + ',' + vm.margin.top + ')');

            //Add Group to Plot Line/Points
            vm.elements.plot = vm.elements.svg.append("g").attr('transform', 'translate(' + vm.margin.left + ',' + vm.margin.top + ')').attr("class", "chart");

            // X Gridlines
            vm.elements.axis.append("g").attr("transform", "translate(" + vm.margin.left + "," + (vm.dimensions.h + vm.margin.top) + ")").attr("class", "gridline gridline--x");

            // Y Gridlines
            vm.elements.axis.append("g").attr("transform", "translate(" + vm.margin.left + "," + vm.margin.top + ")").attr("class", "gridline gridline--y");

            // Add X Axis
            vm.elements.axis.append("g").attr("transform", "translate(" + vm.margin.left + "," + (vm.dimensions.h + vm.margin.top) + ")").attr("class", "axis axis--x");

            // Add Y Axis
            vm.elements.axis.append("g").attr("transform", "translate(" + vm.margin.left + "," + vm.margin.top + ")").attr("class", "axis axis--y");

            // Add Y Axis Label
            vm.elements.svg.append("g").append("foreignObject").attr("height", 100).attr("width", 200).attr("transform", "translate(0," + vm.dimensions.h / 2 + ") rotate(-90)").attr("id", "yLabel-" + vm.ID).html("`" + vm.labels.y + "`");

            // Add X Axis Label
            vm.elements.svg.append("g").append("foreignObject").attr("height", 100).attr("width", 200).attr("transform", "translate(" + (vm.dimensions.w + vm.margin.left + vm.margin.right) / 2 + "," + (vm.dimensions.h + vm.margin.top * 2.5) + ")").attr("id", "xLabel-" + vm.ID).html("`" + vm.labels.x + "`");

            // Add Chart Title
            vm.elements.svg.append("g").append("foreignObject").attr("height", 100).attr("width", 200).attr("transform", "translate(" + (vm.dimensions.w + vm.margin.left + vm.margin.right) / 2 + ",10)").attr("id", "plotTitle-" + vm.ID).html("`" + vm.labels.y + "` vs `" + vm.labels.x + "`");

            // Call MathJax to make plot axis labels look pretty 
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, ["xLabel-" + vm.ID, "yLabel-" + vm.ID, "plotTitle-" + vm.ID]]);

            // Add the Legend
            vm.elements.legend = vm.elements.plot.append("g").attr("id", "legend-" + vm.ID);
        }
    }
};

/***/ }),

/***/ "wV86":
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__("u1pA")
}
var Component = __webpack_require__("VU/8")(
  /* script */
  __webpack_require__("ZlJh"),
  /* template */
  __webpack_require__("7Bdl"),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-b02c4656",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ "x2H2":
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__("R9JV")
}
var Component = __webpack_require__("VU/8")(
  /* script */
  __webpack_require__("kAU3"),
  /* template */
  __webpack_require__("GwYy"),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-1857e160",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ "xJD8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

var _Main1D = __webpack_require__("x2H2");

var _Main1D2 = _interopRequireDefault(_Main1D);

var _Plot2D = __webpack_require__("JqY8");

var _Plot2D2 = _interopRequireDefault(_Plot2D);

var _Stitch = __webpack_require__("+DWH");

var _Stitch2 = _interopRequireDefault(_Stitch);

var _Title = __webpack_require__("/+Ed");

var _Title2 = _interopRequireDefault(_Title);

var _eventBus = __webpack_require__("OXcg");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'app',
  components: {
    'app-title': _Title2.default,
    'app-stitch': _Stitch2.default,
    'app-main-1D': _Main1D2.default,
    'app-plot-2D': _Plot2D2.default
  },
  data: function data() {
    return {
      toggleView: '1D',
      errorCount: 0
    };
  },
  mounted: function mounted() {
    var vm = this;

    // Event listeners are added for monitoring drag 'n drop of data files.
    window.addEventListener("dragenter", function (e) {
      document.querySelector("#dropzone").style.visibility = "";
      document.querySelector("#dropzone").style.opacity = 1;
      document.querySelector("#textnode").style.fontSize = "48px";
    });

    window.addEventListener("dragleave", function (e) {
      e.preventDefault();

      document.querySelector("#dropzone").style.visibility = "hidden";
      document.querySelector("#dropzone").style.opacity = 0;
      document.querySelector("#textnode").style.fontSize = "42px";
    });

    window.addEventListener("dragover", function (e) {
      e.preventDefault();
      document.querySelector("#dropzone").style.visibility = "";
      document.querySelector("#dropzone").style.opacity = 1;
      document.querySelector("#textnode").style.fontSize = "48px";
    });

    window.addEventListener("drop", function (e) {
      e.preventDefault();
      document.querySelector("#dropzone").style.visibility = "hidden";
      document.querySelector("#dropzone").style.opacity = 0;
      document.querySelector("#textnode").style.fontSize = "42px";

      var files = e.dataTransfer.files;

      // Call uplaod funciton in child component 'title'
      vm.$refs.title.uploadFile(files);
    });
  },
  created: function created() {
    // Listen for error messages
    _eventBus.eventBus.$on('error-message', this.generateError);
  },

  methods: {
    switchPlotComponent: function switchPlotComponent(plotType) {
      this.toggleView = plotType;
    },
    generateError: function generateError(errorMSG, type) {
      document.getElementById("error_" + this.errorCount) === null ? this.errorCount = 0 : this.errorCount += 1;
      var newDiv = document.createElement("div");
      var timer = this.errorCount === 0 ? 5000 : 5000 + this.errorCount * 1000;

      newDiv.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + errorMSG;
      newDiv.classList.add("error", "alert", "alert-" + type, "alert-dismissable", "fade", "in");
      var tempID = "error_" + this.errorCount;
      newDiv.id = tempID;

      // add the newly created element and its content into the DOM 
      document.getElementById("error-container").append(newDiv);
      setTimeout(function () {
        (0, _jquery2.default)("#" + tempID).fadeTo(500, 0).slideUp(500, function () {
          (0, _jquery2.default)(this).remove();
        });
      }, timer);
    }
  }
};

// The eventBus serves as the means to communicating between components.
// e.g., If scales are reset in 'Controls.vue', an event is emitted
//       and the event is then 'caught' in 'Main.vue'

/***/ }),

/***/ "yIZD":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resetPlot = undefined;

var _d = __webpack_require__("vwbq");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var resetPlot = exports.resetPlot = {
    methods: {
        resetPlot: function resetPlot(selection) {
            var vm = this;

            vm.elements.zoom.select('.zoom').transition().duration(750).call(vm.zoom.transform, d3.zoomIdentity);
        }
    }
};

/***/ }),

/***/ "z8w2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jquery = __webpack_require__("7t+N");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    props: {
        MAINTITLE: {
            type: String,
            default: 'Main Title'
        },
        PANELTYPE: {
            type: String,
            default: 'default'
        }
    },
    data: function data() {
        return {
            isCollapsed: false
        };
    },
    computed: {
        titleFormatted: function titleFormatted() {
            return this.MAINTITLE.replace(" ", "-");
        }
    },
    mounted: function mounted() {
        (0, _jquery2.default)('.collapser:not(button)').click(function () {

            (0, _jquery2.default)(this).parent().parent().next().collapse('toggle');
        });
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ })

},["NHnr"]);
//# sourceMappingURL=app.8060b9605eb5c3281636.js.map