webpackJsonp([50],{"/2gW":function(e,t,a){"use strict";t.a={methods:{validateFileName:function(e){return/^[^\\/:\*\?'<>\|  .]+$/.test(e)?/^[0-9]/.test(e)?"Do not start files with a number.":/^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i.test(e)?"Invalid file name.":!!/^[A-Za-z].*$/.test(e)||"Start file names with a character.":"Invalid filename."}}}},BGig:function(e,t,a){"use strict";t.a={methods:{checkName:function(e){var t=e.trim();return"string"!=typeof t?(this.validName=!1,"Must be a string"):t.length<1?(this.validName=!1,"Invalid name. Name must be 1+ characters long."):-1!==this.filenameList.indexOf(t)?(this.validName=!1,"Duplice name. Name already exists."):"combine"===t?(this.validName=!1,"Cannot name 'combine'. Reserved word."):(this.validName=!0,!0)}}}},"J/rj":function(e,t,a){"use strict";var n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-divider",{staticClass:"mb-3 mt-3"}),e._v(" "),a("v-form",{ref:"form",model:{value:e.formValid,callback:function(t){e.formValid=t},expression:"formValid"}},[a("v-select",{attrs:{items:["Fullprof","GSAS"],label:"Select file format"},model:{value:e.fileFormat,callback:function(t){e.fileFormat=t},expression:"fileFormat"}}),e._v(" "),a("v-text-field",{attrs:{type:"text",label:"Enter a File Name",required:"",hint:"Type name of combined data curve",rules:[e.validateFileName,e.checkName],suffix:e.fileType},model:{value:e.combineFilename,callback:function(t){e.combineFilename=t},expression:"combineFilename"}}),e._v(" "),a("v-btn",{attrs:{disabled:!e.formValid,block:"",outline:"",flat:"",color:"success"},on:{click:e.onStoreCombinedData}},[e._v("Store Combined")]),e._v(" "),a("v-btn",{attrs:{disabled:!e.formValid,block:"",outline:"",flat:"",color:"success"},on:{click:e.onSaveCombinedData}},[e._v("Download Combined")])],1)],1)},staticRenderFns:[]};t.a=n},W7NU:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("X75K"),i=a("J/rj"),o=a("VU/8")(n.a,i.a,!1,null,null,null);t.default=o.exports},X75K:function(e,t,a){"use strict";var n=a("fZjL"),i=a.n(n),o=a("Dd8w"),r=a.n(o),l=a("NYxO"),c=a("/2gW"),d=a("dOvQ"),s=a("qJ6c"),m=a("BGig"),u=a("aCc6");t.a={name:"SaveCombinedDataPOWDER",mixins:[c.a,m.a,d.a],data:function(){return{formValid:!0,validName:!0,fileFormat:"Fullprof",combineFilename:"combined_data"}},computed:r()({},a.i(l.a)("POWDER",{fetched:function(e){return e.fetched},uploaded:function(e){return e.uploaded}}),a.i(l.a)("POWDER/Combine",{combinedData:function(e){return e.combinedData},binTolerance:function(e){return e.tolerance},storedCombined:function(e){return e.storedCombined}}),{fileType:function(){return"Fullprof"===this.fileFormat?".dat":".gsa"},filename:function(){return this.combineFilename+this.fileType},filenameList:function(){var e=i()(this.fetched),t=i()(this.uploaded),a=i()(this.storedCombined);return[].concat.apply([],[e,t,a])}}),methods:r()({},a.i(l.c)("POWDER/Combine",["storeCombinedData"]),{onStoreCombinedData:function(){var e=this.$route.meta.group;this.storeCombinedData({group:e,name:this.combineFilename}).then(function(){u.a.$emit("redraw-chart-powder-combine"),u.a.$emit("add-notification","Combined data stored. To view it go to Graph tab.","success")}).catch(function(e){u.a.$emit("add-notification",e.message,"error")})},onSaveCombinedData:function(){this.$refs.form.validate()&&("Fullprof"===this.fileFormat?this.downloadAsFullprof():this.downloadAsGSAS())},downloadAsFullprof:function(){var e=this.combinedData.map(function(e){return[e["2theta"],e.anode,e.error]}),t=this.filename;this.downloadCSV(e,[],t,"\t")},downloadAsGSAS:function(){var e=this.combinedData.length,t=Math.ceil(e/5),n=this.combinedData[0]["2theta"],i=this.binTolerance,o=this.filename,r="\n";r=(r+="BANK 1 "+e+" "+t+" CONST "+n+" "+i+" 0 0 ESD").padEnd(80),r+="\n",this.combinedData.forEach(function(t,a){var n=""+t.anode.toFixed(2).padStart(8)+t.error.toFixed(2).padStart(8);a===e-1&&(n=n.padEnd(80)),r+=""+n,(a+1)%5==0&&a!==e&&(r+="\n")}),r="data:text/plain;charset=utf-8,"+r,a.i(s.a)(r,o)}})}},dOvQ:function(e,t,a){"use strict";var n=a("aCc6"),i=a("qJ6c");t.a={methods:{convertArrayOfObjectsToCSV:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments[1],a=arguments[2];if(null===e||!e.length)return null;var n=t.join(a);return n+="\n",e.forEach(function(e){n+=e.join(a)+"\n"}),n},downloadCSV:function(e,t,o){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:",",l=this.convertArrayOfObjectsToCSV(e,t,r);null!==l?(l.match(/^data:text\/csv/i)||(l="data:text/csv;charset=utf-8,"+l),a.i(i.a)(l,o)):n.a.$emit("add-notification","No data to save","error")}}}},qJ6c:function(e,t,a){"use strict";t.a=function(e,t){var a=encodeURI(e),n=document.createElement("a");n.setAttribute("href",a),n.setAttribute("download",t),n.click()}}});