webpackJsonp([5],{"1Kcx":function(e,t,n){"use strict";var a={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-expansion-panel",{attrs:{expand:""}},[n("v-expansion-panel-content",{attrs:{value:!0}},[n("div",{staticClass:"title",attrs:{slot:"header"},slot:"header"},[e._v("Files to Combine")]),e._v(" "),n("v-container",[n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs12:""}},[n("v-filter-list")],1),e._v(" "),n("v-flex",{attrs:{xs12:""}},[n("v-file-list")],1)],1)],1)],1),e._v(" "),e.selectedData.length?n("v-scales"):e._e(),e._v(" "),e.selectedData.length?n("v-exclude-detectors"):e._e(),e._v(" "),e.selectedData.length?n("v-expansion-panel-content",{attrs:{value:!0}},[n("div",{staticClass:"title",attrs:{slot:"header"},slot:"header"},[e._v("Normalize")]),e._v(" "),n("v-container",[n("v-layout",{attrs:{row:""}},[n("v-flex",{attrs:{xs12:""}},[n("v-combine-normalize")],1)],1)],1)],1):e._e(),e._v(" "),e.selectedData.length&&e.isNormalized?n("v-expansion-panel-content",{attrs:{value:!0}},[n("div",{staticClass:"title",attrs:{slot:"header"},slot:"header"},[e._v("Combine")]),e._v(" "),n("v-container",[n("v-layout",{attrs:{row:""}},[n("v-flex",{attrs:{xs12:""}},[n("v-combine-tolerance")],1)],1)],1)],1):e._e()],1)},staticRenderFns:[]};t.a=a},"7xAk":function(e,t,n){"use strict";var a=n("sZUQ"),o=n("VU/8")(a.a,null,!1,null,null,null);t.a=o.exports},AU5c:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("IIhr"),o=n("1Kcx");var i=function(e){n("s8NC")},r=n("VU/8")(a.a,o.a,!1,i,null,null);t.default=r.exports},EFs1:function(e,t,n){"use strict";var a=n("ornT"),o=n("VU/8")(a.a,null,!1,null,null,null);t.a=o.exports},F8GG:function(e,t,n){"use strict";var a=n("iqOw"),o=n("Ud3R"),i=n("VU/8")(a.a,o.a,!1,null,null,null);t.a=i.exports},IIhr:function(e,t,n){"use strict";var a=n("Dd8w"),o=n.n(a),i=n("NYxO"),r=n("eA5M"),c=n("7xAk"),s=n("ZIYd"),l=n("xSR3"),u=n("EFs1"),d=n("mPqX");t.a={name:"SidebarPOWDERCombine",components:{"v-filter-list":r.a,"v-file-list":c.a,"v-combine-normalize":s.a,"v-combine-tolerance":l.a,"v-scales":u.a,"v-exclude-detectors":d.a},computed:o()({},n.i(i.a)("POWDER/Combine",{selectedData:function(e){return e.selectedData},isNormalized:function(e){return e.isNormalized}}))}},Ud3R:function(e,t,n){"use strict";var a={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-text-field",{attrs:{type:"number",label:"Tolerance Bin",step:e.defaultSettings.tolerance.increment,min:e.defaultSettings.tolerance.value,required:"",hint:"Type value for bin tolerance range",rules:[e.checkValue]},model:{value:e.editTolerance,callback:function(t){e.editTolerance=e._n(t)},expression:"editTolerance"}}),e._v(" "),n("v-tooltip",{attrs:{top:"","close-delay":1,disabled:!e.valid}},[n("v-btn",{attrs:{slot:"activator",outline:"",block:"",flat:"",color:"success",disabled:!e.valid},on:{click:e.onCombineData},slot:"activator"},[e._v("Combine Data")]),e._v(" "),n("span",[e._v("Click to combine data")])],1),e._v(" "),n("v-tooltip",{attrs:{top:"","close-delay":1,disabled:!e.combData.length||!e.valid}},[n("v-btn",{attrs:{slot:"activator",outline:"",block:"",flat:"",color:"error",disabled:!e.combData.length||!e.valid},on:{click:e.onRemoveCombinedData},slot:"activator"},[e._v("Remove Combined Data")]),e._v(" "),n("span",[e._v("Click to remove combined data")])],1),e._v(" "),n("v-fade-transition",[e.combData.length?n("v-save-combined"):e._e()],1)],1)},staticRenderFns:[]};t.a=a},"Ue4+":function(e,t,n){(e.exports=n("FZ+f")(!0)).push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"SidebarPOWDERCombine.vue",sourceRoot:""}])},Whup:function(e,t,n){"use strict";var a={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-vcorr-select",{ref:"vcorr"}),e._v(" "),n("v-tooltip",{attrs:{top:"","close-delay":1,disabled:e.isNormalized}},[n("v-btn",{attrs:{slot:"activator",outline:"",block:"",flat:"",color:"success",disabled:e.isNormalized},on:{click:e.onNormalizeData},slot:"activator"},[e._v("Normalize Data")]),e._v(" "),n("span",[e._v("Click to normalize data")])],1),e._v(" "),n("v-tooltip",{attrs:{top:"","close-delay":1,disabled:!e.isNormalized}},[n("v-btn",{attrs:{slot:"activator",outline:"",block:"",flat:"",color:"warning",disabled:!e.isNormalized},on:{click:e.onResetNormalizedData},slot:"activator"},[e._v("Reset Data")]),e._v(" "),n("span",[e._v("Click to reset normalized data")])],1)],1)},staticRenderFns:[]};t.a=a},YxmP:function(e,t,n){"use strict";var a=n("Dd8w"),o=n.n(a),i=n("NYxO"),r=n("F8GG");t.a={name:"TolerancePOWDER",extends:r.a,components:{"v-save-combined":function(){return n.e(48).then(n.bind(null,"W7NU"))}},computed:o()({},n.i(i.a)("POWDER",{fetched:function(e){return e.fetched},uploaded:function(e){return e.uploaded}}),n.i(i.a)("POWDER/Combine",{defaultSettings:function(e){return e.defaultSettings},tolerance:function(e){return e.tolerance},combData:function(e){return e.combinedData}}),n.i(i.b)("POWDER/Combine",["getPreparedData"])),methods:o()({},n.i(i.d)("POWDER/Combine",["setTolerance"]),n.i(i.c)("POWDER/Combine",["combineData","removeCombinedData"]))}},ZIYd:function(e,t,n){"use strict";var a=n("q+PM"),o=n("Whup"),i=n("VU/8")(a.a,o.a,!1,null,null,null);t.a=i.exports},apel:function(e,t,n){"use strict";var a=n("Dd8w"),o=n.n(a),i=n("NYxO"),r=n("eAgk");t.a={name:"FilterListPOWDER",extends:r.a,computed:o()({},n.i(i.a)("POWDER",{fetched:function(e){return e.fetched},uploaded:function(e){return e.uploaded}}),n.i(i.a)("POWDER/Combine",{selected:function(e){return e.filters}})),methods:o()({},n.i(i.d)("POWDER/Combine",["updateFilters"]))}},eA5M:function(e,t,n){"use strict";var a=n("apel"),o=n("VU/8")(a.a,null,!1,null,null,null);t.a=o.exports},iqOw:function(e,t,n){"use strict";var a=n("aCc6");t.a={name:"Tolerance",data:function(){return{valid:!0}},computed:{editTolerance:{get:function(){return this.tolerance},set:function(e){this.setTolerance(e)}},group:function(){return this.$route.meta.group.toLowerCase()}},methods:{checkValue:function(e){return"number"!=typeof e?(this.valid=!1,"Must be a number"):e<0?(this.valid=!1,"Must be greater than 0"):(this.valid=!0,!0)},onCombineData:function(){var e=this;this.combineData(this.getPreparedData).then(function(){a.a.$emit("redraw-chart-"+e.group+"-combine")}).catch(function(e){a.a.$emit("add-notification",e.message,"error")})},onRemoveCombinedData:function(){var e=this;this.removeCombinedData().then(function(){a.a.$emit("redraw-chart-"+e.group+"-combine")}).catch(function(e){a.a.$emit("add-notification",e,"error")})}}}},kWcQ:function(e,t,n){"use strict";var a={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-expansion-panel",{attrs:{flat:""}},[n("v-expansion-panel-content",{attrs:{value:!e.collapse}},[n("div",{staticClass:"title",attrs:{slot:"header"},slot:"header"},[e._v("Exclude Detectors")]),e._v(" "),n("v-container",[n("v-layout",{attrs:{row:"",wrap:"","mb-4":""}},e._l(e.items,function(t,a){return n("v-flex",{key:a,attrs:{xs3:""},on:{mouseover:function(n){e.onMouseover(t)},mouseout:function(n){e.onMouseout(t)}}},[n("v-checkbox",{attrs:{"hide-details":"",label:""+t,"input-value":e.inSelected(t),color:"secondary"},on:{click:function(n){e.onToggleAnode(t)}}})],1)})),e._v(" "),n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs12:""}},[n("v-tooltip",{attrs:{top:"","close-delay":1}},[n("v-btn",{attrs:{slot:"activator",block:"",outline:"",color:"warning"},on:{click:e.resetSelected},slot:"activator"},[n("v-icon",{attrs:{left:""}},[e._v("fa-undo")]),e._v(" "),n("span",[e._v("Reset Exclude")])],1),e._v(" "),n("span",[e._v("Click to reset detectors to exclude")])],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};t.a=a},mPqX:function(e,t,n){"use strict";var a=n("xOxM"),o=n("kWcQ"),i=n("VU/8")(a.a,o.a,!1,null,null,null);t.a=i.exports},ornT:function(e,t,n){"use strict";var a=n("Dd8w"),o=n.n(a),i=n("NYxO"),r=n("Cfw1");t.a={name:"ScalesPOWDER",extends:r.a,computed:o()({},n.i(i.a)("POWDER/Combine",{scales:function(e){return e.scale},xScaleLabel:function(e){return e.plotScale.x.label},yScaleLabel:function(e){return e.plotScale.y.label}})),methods:o()({},n.i(i.c)("POWDER/Combine",["resetScales","setYScale","setXScale"]))}},"q+PM":function(e,t,n){"use strict";var a=n("Dd8w"),o=n.n(a),i=n("NYxO"),r=n("aCc6");t.a={name:"NormalizePOWDER",components:{"v-vcorr-select":function(){return n.e(69).then(n.bind(null,"Jd7K"))}},data:function(){return{valid:!0}},computed:o()({},n.i(i.a)("POWDER/Combine",{isNormalized:function(e){return e.isNormalized}})),methods:o()({},n.i(i.d)("POWDER/Combine",["setNormalizeValue","setNormalizeField"]),n.i(i.c)("POWDER/Combine",["normalizeData","resetNormalizedData"]),{onNormalizeData:function(){this.normalizeData().then(function(){r.a.$emit("redraw-chart-powder-combine")}).catch(function(e){r.a.$emit("add-notification",e.message,"error")})},onResetNormalizedData:function(){this.$refs.vcorr.setDefaultVCorr(),this.resetNormalizedData().then(function(){r.a.$emit("redraw-chart-powder-combine")}).catch(function(e){r.a.$emit("add-notification",e.message,"error")})}})}},s8NC:function(e,t,n){var a=n("Ue4+");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("rjj0")("5b8dcb1e",a,!0,{})},sZUQ:function(e,t,n){"use strict";var a=n("Dd8w"),o=n.n(a),i=n("NYxO"),r=n("hBjw"),c=n("aCc6");t.a={name:"FilesListPOWDERCombine",extends:r.a,computed:o()({},n.i(i.a)("POWDER",{fetched:function(e){return e.fetched},uploaded:function(e){return e.uploaded}}),n.i(i.a)("POWDER/Combine",{filesSelected:function(e){return e.filesSelected},filters:function(e){return e.filters}}),{selected:{get:function(){return this.filesSelected},set:function(e){var t={filelist:e,group:"POWDER"};this.updateFilesSelected(t).then(function(){c.a.$emit("redraw-chart-powder-combine")}).catch(function(e){c.a.$emit("add-notification",e.message,"error")})}}}),methods:o()({},n.i(i.c)("POWDER/Combine",["updateFilesSelected"]))}},xOxM:function(e,t,n){"use strict";var a=n("Xxa5"),o=n.n(a),i=n("exGp"),r=n.n(i),c=n("Dd8w"),s=n.n(c),l=n("vwbq"),u=n("NYxO"),d=n("aCc6");t.a={name:"ExcludeDetectorsPOWDER",props:{collapse:{type:Boolean,default:!0}},created:function(){var e=this;this.defaultAnodesToExclude.forEach(function(t){return e.onToggleAnode(t)})},computed:s()({},n.i(u.a)("POWDER/Combine",{anodesToExclude:function(e){return e.anodesToExclude}}),n.i(u.a)("POWDER",{defaultAnodesToExclude:function(e){return e.normalizeFilesData.excludeDetectors}}),n.i(u.b)("POWDER/Combine",{items:"getAnodeNames",isCombined:"isCombined",getPreparedData:"getPreparedData"})),methods:s()({},n.i(u.c)("POWDER/Combine",["setAnodesToExclude","resetAnodesToExclude","combineData"]),{resetSelected:function(){this.resetAnodesToExclude().then(function(){d.a.$emit("redraw-chart-powder-combine")}).catch(function(e){d.a.$emit("add-notification",e.message,"danger")})},onMouseover:function(e){l.a("*[class$=anode"+e+"]").style("stroke-width","5px")},onMouseout:function(e){l.a("*[class$=anode"+e+"]").style("stroke-width","1.5px")},onToggleAnode:function(e){var t=this,n=this.inSelected(e)?this.anodesToExclude.slice().filter(function(t){return t!==e}):this.anodesToExclude.slice().concat([e]);this.setAnodesToExclude(n).then(r()(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.isCombined){e.next=3;break}return e.next=3,t.combineData(t.getPreparedData);case 3:return e.abrupt("return",!0);case 4:case"end":return e.stop()}},e,t)}))).then(function(){d.a.$emit("redraw-chart-powder-combine")}).catch(function(e){d.a.$emit("add-notification",e.message,"danger")})},inSelected:function(e){return this.anodesToExclude.indexOf(e)>-1}})}},xSR3:function(e,t,n){"use strict";var a=n("YxmP"),o=n("VU/8")(a.a,null,!1,null,null,null);t.a=o.exports}});