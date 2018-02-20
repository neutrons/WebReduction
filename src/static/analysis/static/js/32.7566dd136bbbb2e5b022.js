webpackJsonp([32],{E9Pt:function(t,i,e){"use strict";var n=e("Dd8w"),r=e.n(n),a=e("NYxO"),s=e("vwbq"),o=e("Jc75");i.a={name:"FitResultsSANS1D",extends:o.a,computed:r()({},e.i(a.b)("SANS/Fit",{fileToFit:function(t){return t.fileToFit},fitType:function(t){return t.fitType},fittedData:function(t){return t.fittedData},fitError:function(t){return t.fitError},fitSettings:function(t){return t.fitSettings},initialValues:function(t){return t.fitInitialValues},fitNote:function(t){return t.fitNote},xBrushSelection:function(t){return t.brushSelection[1]},fitEquation:function(t){return t.fitEquation},fitScores:function(t){return t.fitScores}}),{fitCount:function(){return this.fittedData.length},fitRange:function(){return 0===this.fitCount?[0,0]:s.b(this.fittedData,function(t){return t.x}).map(function(t){return t.toExponential(2)})},formattedFitError:function(){return this.fitError?"Not Available":this.fitError.toExponential(2)},damping:function(){return this.fitSettings.damping},maxIterations:function(){return this.fitSettings.maxIterations},errorTolerance:function(){return this.fitSettings.errorTolerance},gradientDifference:function(){return this.fitSettings.gradientDifference}})}},Jc75:function(t,i,e){"use strict";var n=e("S+2Z"),r=e("MNwV");var a=function(t){e("x1ox")},s=e("VU/8")(n.a,r.a,!1,a,"data-v-695b3358",null);i.a=s.exports},MNwV:function(t,i,e){"use strict";var n={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-container",{attrs:{"pt-0":""}},[e("v-layout",{attrs:{row:"",wrap:""}},[t.allowExport?e("v-flex",{attrs:{xs12:""}},[e("v-btn",{attrs:{outline:"",flat:"",color:"success"},on:{click:t.downloadFitEquation}},[e("v-icon",{attrs:{left:!t.isBreakpointSmall}},[t._v("file_download")]),t._v(" "),e("span",{staticClass:"hidden-md-and-down"},[t._v("Results")])],1)],1):t._e(),t._v(" "),e("v-flex",{attrs:{md12:"",lg3:"","pa-1":""}},[e("b",[t._v("Fit File:")]),t._v(" "+t._s(t.fileToFit))]),t._v(" "),e("v-flex",{attrs:{md12:"",lg2:"","pa-1":""}},[e("b",[t._v("Fit Type:")]),t._v(" "+t._s(t.fitType))]),t._v(" "),e("v-flex",{attrs:{md12:"",lg2:"","pa-1":""}},[e("b",[t._v("No. Points:")]),t._v(" "+t._s(t.fitCount))]),t._v(" "),e("v-flex",{attrs:{md12:"",lg3:"","pa-1":""}},[e("b",[t._v("Fit Range:")]),t._v(" ("+t._s(t.fitRange[0])+", "+t._s(t.fitRange[1])+")")]),t._v(" "),e("v-flex",{attrs:{md12:"",lg2:"","pa-1":""}},[e("b",[t._v("Fit Error:")]),t._v(" "+t._s(t.fitError))]),t._v(" "),e("v-flex",{attrs:{xs12:"","mb-1":""}},[e("v-divider")],1),t._v(" "),t.fitScores?e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{md12:"",lg1:"","pa-1":""}},[e("b",[t._v("Fit Scores:")])]),t._v(" "),e("v-flex",{attrs:{md12:"",lg2:"","pa-1":""}},[e("b",[t._v("R:")]),t._v(" "+t._s(t.fitScores.r.toFixed(3)))]),t._v(" "),e("v-flex",{attrs:{md12:"",lg3:"","pa-1":""}},[e("b",[t._v("R^2:")]),t._v(" "+t._s(t.fitScores.r2.toFixed(3)))]),t._v(" "),e("v-flex",{attrs:{md12:"",lg3:"","pa-1":""}},[e("b",[t._v("RMSD:")]),t._v(" "+t._s(t.fitScores.rmsd.toFixed(3)))]),t._v(" "),e("v-flex",{attrs:{md12:"",lg3:"","pa-1":""}},[e("b",[t._v("Chi^2:")]),t._v(" "+t._s(t.fitScores.chi2.toFixed(3)))])],1):t._e(),t._v(" "),e("v-flex",{attrs:{xs12:"","mb-1":""}},[e("v-divider")],1),t._v(" "),e("v-flex",{attrs:{xs12:"","pa-1":""}},[e("b",[t._v("Fit Equation:")]),t._v(" "),e("i",[t._v(t._s(t.fitEquation))]),e("p")]),t._v(" "),e("v-flex",{attrs:{xs12:""}},[e("v-divider")],1),t._v(" "),e("v-flex",{attrs:{sm12:"",md4:"","pa-1":""}},[e("b",[t._v("Fit Configuration:")]),t._v(" "),e("p",{staticClass:"pl-3 mb-1"},[t._v("Damping: "+t._s(t.damping))]),t._v(" "),e("p",{staticClass:"pl-3 mb-1"},[t._v("No. Iterations: "+t._s(t.maxIterations))]),t._v(" "),e("p",{staticClass:"pl-3 mb-1"},[t._v("Error Tolerance: "+t._s(t.errorTolerance))]),t._v(" "),e("p",{staticClass:"pl-3 mb-1"},[t._v("Gradient Difference: "+t._s(t.gradientDifference))])]),t._v(" "),e("v-flex",{attrs:{sm12:"",md4:"","pa-1":""}},[e("b",[t._v("Coefficients:")]),t._v(" "),t._l(t.initialValues,function(i,n){return e("p",{key:n,staticClass:"pl-3 mb-1"},[t._v("\n          "+t._s(t.formatInitialValues(i))+"\n        ")])})],2),t._v(" "),e("v-flex",{attrs:{sm12:"",md4:"","pa-1":""}},[e("b",[t._v("Note:")]),t._v(" "+t._s(t.fitNote))]),t._v(" "),e("v-flex",{attrs:{xs12:""}},[e("v-divider")],1)],1)],1)},staticRenderFns:[]};i.a=n},"S+2Z":function(t,i,e){"use strict";var n=e("Gu7T"),r=e.n(n),a=e("dOvQ"),s=e("b56K");i.a={name:"FitResultsTable",mixins:[a.a,s.a],props:{xScale:{type:Function},allowExport:{type:Boolean,default:!0}},methods:{formatInitialValues:function(t){if("Guinier"===this.fitType&&"Rg"===t.coefficient){var i=t.value*Math.sqrt(this.xScale.invert(this.xBrushSelection));return t.coefficient+": "+t.value+" | Rg * x_max = "+i}return t.coefficient+": "+t.value},downloadFitEquation:function(){var t="fit type,no. points,range start,range end,fit error,R,R2,RMSD,CHI2,equation,"+this.initialValues.map(function(t){return t.coefficient})+"\n",i=[[this.fitType,this.fitCount].concat(r()(this.fitRange),[this.fitError,this.fitScores.r,this.fitScores.r2,this.fitScores.rmsd,this.fitScores.chi2,this.fitEquation],r()(this.initialValues.map(function(t){return t.value})))],e=this.fileToFit+"_fit_results.csv"||"fit_results.csv";this.downloadCSV(i,t,e)}}}},TDvi:function(t,i,e){(t.exports=e("FZ+f")(!0)).push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"FitResultsTable.vue",sourceRoot:""}])},caY9:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e("E9Pt"),r=e("VU/8")(n.a,null,!1,null,null,null);i.default=r.exports},dOvQ:function(t,i,e){"use strict";i.a={methods:{convertArrayOfObjectsToCSV:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,i=arguments[1];if(null===t||!t.length)return null;var e=i;return t.forEach(function(t){e+=t.join(",")+"\n"}),e},downloadCSV:function(t,i,e){var n=this.convertArrayOfObjectsToCSV(t,i);if(null!==n){n.match(/^data:text\/csv/i)||(n="data:text/csv;charset=utf-8,"+n);var r=encodeURI(n),a=document.createElement("a");a.setAttribute("href",r),a.setAttribute("download",e),a.click()}}}}},x1ox:function(t,i,e){var n=e("TDvi");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);e("rjj0")("6460bd32",n,!0,{})}});