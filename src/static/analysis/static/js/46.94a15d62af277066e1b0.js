webpackJsonp([46],{"+6DI":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("hvtB"),s=a("OJ61");var n=function(t){a("DPTE")},l=a("VU/8")(i.a,s.a,!1,n,"data-v-e74e5212",null);e.default=l.exports},"/GNp":function(t,e,a){(e=t.exports=a("FZ+f")(!0)).i(a("LCuY"),""),e.push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"StitchedDataTable.vue",sourceRoot:""}])},DPTE:function(t,e,a){var i=a("/GNp");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("69bef29c",i,!0,{})},LCuY:function(t,e,a){(t.exports=a("FZ+f")(!0)).push([t.i,"table.table tbody td:first-child,table.table tbody td:not(:first-child),table.table tbody th:first-child,table.table tbody th:not(:first-child),table.table thead td:first-child,table.table thead td:not(:first-child),table.table thead th:first-child,table.table thead th:not(:first-child){padding:0 5px!important}","",{version:3,sources:["/home/rhf/git/plotfit-vuetify/src/assets/css/dataTableStyles.scss"],names:[],mappings:"AAAA,gSAQE,uBAA0B,CAC3B",file:"dataTableStyles.scss",sourcesContent:["table.table thead td:not(:nth-child(1)),\ntable.table tbody td:not(:nth-child(1)),\ntable.table thead th:not(:nth-child(1)),\ntable.table tbody th:not(:nth-child(1)),\ntable.table thead td:first-child,\ntable.table tbody td:first-child,\ntable.table thead th:first-child,\ntable.table tbody th:first-child {\n  padding: 0 5px !important;\n}"],sourceRoot:""}])},OJ61:function(t,e,a){"use strict";var i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{attrs:{flat:""}},[a("v-card-title",{staticClass:"pb-0"},[a("div",[a("v-btn",{attrs:{outline:"",flat:"",small:"",color:"success"},on:{click:t.downloadStitchedData}},[a("v-icon",{attrs:{left:!t.isBreakpointSmall}},[t._v("file_download")]),t._v(" "),a("span",{staticClass:"hidden-md-and-down"},[t._v("Export CSV")])],1)],1)]),t._v(" "),a("v-card-text",{staticClass:"pt-1"},[a("v-data-table",{staticClass:"text-xs-center",attrs:{headers:t.stitchedHeaders,items:t.stitchedData},scopedSlots:t._u([{key:"items",fn:function(e){return[a("td",{staticClass:"text-xs-left"},[t._v(t._s(e.item.x))]),t._v(" "),a("td",{staticClass:"text-xs-left"},[t._v(t._s(e.item.y))]),t._v(" "),a("td",{staticClass:"text-xs-left"},[t._v(t._s(e.item.error))])]}}])},[a("template",{slot:"no-data"},[a("v-alert",{attrs:{value:!0,color:"error",icon:"warning"}},[t._v("\n          No data to display.\n        ")])],1)],2)],1)],1)},staticRenderFns:[]};e.a=i},dOvQ:function(t,e,a){"use strict";var i=a("aCc6"),s=a("qJ6c");e.a={methods:{convertArrayOfObjectsToCSV:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=arguments[1],a=arguments[2];if(null===t||!t.length)return null;var i=e.join(a);return i+="\n",t.forEach(function(t){i+=t.join(a)+"\n"}),i},downloadCSV:function(t,e,n){var l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:",",r=this.convertArrayOfObjectsToCSV(t,e,l);null!==r?(r.match(/^data:text\/csv/i)||(r="data:text/csv;charset=utf-8,"+r),a.i(s.a)(r,n)):i.a.$emit("add-notification","No data to save","error")}}}},hvtB:function(t,e,a){"use strict";var i=a("Dd8w"),s=a.n(i),n=a("NYxO"),l=a("dOvQ"),r=a("b56K");e.a={name:"StitchedDataTable",data:function(){return{sheet:!1,stitchedHeaders:[{align:"left",text:"x",value:"x"},{align:"left",text:"y",value:"y"},{align:"left",text:"error",value:"error"}]}},mixins:[l.a,r.a],props:{stitchedData:{type:Array,required:!0},filesStitched:{type:Array,required:!0}},computed:s()({},a.i(n.a)("SANS/Stitch",{fields:function(t){return t.field}}),{filename:function(){return this.filesStitched.join("_")}}),methods:{downloadStitchedData:function(){var t=this,e=this.stitchedData.map(function(e){return[e[t.fields.x],e[t.fields.y],e.error]}),a=this.filename+"_stitched.csv"||"stitched.csv";this.downloadCSV(e,["x","y","error"],a)}}}},qJ6c:function(t,e,a){"use strict";e.a=function(t,e){var a=encodeURI(t),i=document.createElement("a");i.setAttribute("href",a),i.setAttribute("download",e),i.click()}}});