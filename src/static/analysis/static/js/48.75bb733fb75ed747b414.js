webpackJsonp([48],{"/2gW":function(e,t,a){"use strict";t.a={methods:{validateFileName:function(e){return/^[^\\/:\*\?'<>\|  .]+$/.test(e)?/^[0-9]/.test(e)?"Do not start files with a number.":/^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i.test(e)?"Invalid file name.":!!/^[A-Za-z].*$/.test(e)||"Start file names with a character.":"Invalid filename."}}}},W7NU:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("X75K"),i=a("tksE"),o=a("VU/8")(n.a,i.a,!1,null,null,null);t.default=o.exports},X75K:function(e,t,a){"use strict";var n=a("Dd8w"),i=a.n(n),o=a("NYxO"),l=a("/2gW"),r=a("dOvQ"),c=a("qJ6c");t.a={name:"SaveCombinedDataPOWDER",mixins:[l.a,r.a],data:function(){return{formValid:!0,validName:!0,fileFormat:"Fullprof",combineFilename:"combined_data"}},computed:i()({},a.i(o.a)("POWDER/Combine",{combinedData:function(e){return e.combinedData},binTolerance:function(e){return e.tolerance}}),{fileType:function(){return"Fullprof"===this.fileFormat?".dat":".gsa"},filename:function(){return this.combineFilename+this.fileType}}),methods:{onSaveCombinedData:function(){this.$refs.form.validate()&&("Fullprof"===this.fileFormat?this.downloadAsFullprof():this.downloadAsGSAS())},downloadAsFullprof:function(){var e=this.combinedData.map(function(e){return[e["2theta"],e.anode,e.error]}),t=this.filename;this.downloadCSV(e,[],t,"\t")},downloadAsGSAS:function(){var e=this.combinedData.length,t=Math.ceil(e/5),n=this.combinedData[0]["2theta"],i=this.binTolerance,o=this.filename,l="\n";l=(l+="BANK 1 "+e+" "+t+" CONST "+n+" "+i+" 0 0 ESD").padEnd(80),l+="\n",this.combinedData.forEach(function(t,a){var n=""+t.anode.toFixed(2).padStart(8)+t.error.toFixed(2).padStart(8);a===e-1&&(n=n.padEnd(80)),l+=""+n,(a+1)%5==0&&a!==e&&(l+="\n")}),l="data:text/plain;charset=utf-8,"+l,a.i(c.a)(l,o)}}}},dOvQ:function(e,t,a){"use strict";var n=a("aCc6"),i=a("qJ6c");t.a={methods:{convertArrayOfObjectsToCSV:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments[1],a=arguments[2];if(null===e||!e.length)return null;var n=t.join(a);return n+="\n",e.forEach(function(e){n+=e.join(a)+"\n"}),n},downloadCSV:function(e,t,o){var l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:",",r=this.convertArrayOfObjectsToCSV(e,t,l);null!==r?(r.match(/^data:text\/csv/i)||(r="data:text/csv;charset=utf-8,"+r),a.i(i.a)(r,o)):n.a.$emit("add-notification","No data to save","error")}}}},qJ6c:function(e,t,a){"use strict";t.a=function(e,t){var a=encodeURI(e),n=document.createElement("a");n.setAttribute("href",a),n.setAttribute("download",t),n.click()}},tksE:function(e,t,a){"use strict";var n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-divider",{staticClass:"mb-3 mt-3"}),e._v(" "),a("v-form",{ref:"form",model:{value:e.formValid,callback:function(t){e.formValid=t},expression:"formValid"}},[a("v-select",{attrs:{items:["Fullprof","GSAS"],label:"Select file format"},model:{value:e.fileFormat,callback:function(t){e.fileFormat=t},expression:"fileFormat"}}),e._v(" "),a("v-text-field",{attrs:{type:"text",label:"Enter a File Name",required:"",hint:"Type name of combined data curve",rules:[e.validateFileName],suffix:e.fileType},model:{value:e.combineFilename,callback:function(t){e.combineFilename=t},expression:"combineFilename"}}),e._v(" "),a("v-btn",{attrs:{disabled:!e.formValid,block:"",outline:"",flat:"",color:"success"},on:{click:e.onSaveCombinedData}},[e._v("Download Combined")])],1)],1)},staticRenderFns:[]};t.a=n}});