webpackJsonp([3],{"4Fwg":function(t,e,i){"use strict";var n=i("Dd8w"),a=i.n(n),s=i("NYxO"),o=i("A25u");e.a={name:"FieldsTASFit",extends:o.a,computed:a()({},i.i(s.b)("TAS/Fit",["getFields"]),i.i(s.a)("TAS/Fit",{field:function(t){return t.field}})),methods:a()({},i.i(s.c)("TAS/Fit",["setXField","setYField"]))}},"4Vye":function(t,e,i){"use strict";var n=i("UwYy"),a=i("VU/8")(n.a,null,!1,null,null,null);e.a=a.exports},"4q0C":function(t,e,i){"use strict";var n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-expansion-panel",[i("v-expansion-panel-content",{attrs:{value:!t.collapse}},[i("div",{staticClass:"title",attrs:{slot:"header"},slot:"header"},[t._v("Levenberg Settings")]),t._v(" "),i("v-container",[i("v-layout",{attrs:{row:"",wrap:""}},[i("v-flex",{attrs:{xs12:"","pl-2":""}},[i("v-slider",{attrs:{label:"Damping - "+t.editDamping.toFixed(1),step:t.defaultSettings.damping.increment,min:t.defaultSettings.damping.min,max:t.defaultSettings.damping.max,ticks:"","thumb-label":""},nativeOn:{mouseup:function(e){t.setFitDamping(t.editDamping)}},model:{value:t.editDamping,callback:function(e){t.editDamping=e},expression:"editDamping"}}),t._v(" "),i("v-slider",{attrs:{label:"Gradient - "+t.editGradient.toFixed(1),step:t.defaultSettings.gradientDifference.increment,min:t.defaultSettings.gradientDifference.min,max:t.defaultSettings.gradientDifference.max,ticks:"","thumb-label":""},nativeOn:{mouseup:function(e){t.setFitGradient(t.editGradient)}},model:{value:t.editGradient,callback:function(e){t.editGradient=e},expression:"editGradient"}}),t._v(" "),i("v-slider",{attrs:{label:"Iterations - "+t.editIterations,step:t.defaultSettings.maxIterations.increment,min:t.defaultSettings.maxIterations.min,max:t.defaultSettings.maxIterations.max,ticks:"","thumb-label":""},nativeOn:{mouseup:function(e){t.setFitIterations(t.editIterations)}},model:{value:t.editIterations,callback:function(e){t.editIterations=e},expression:"editIterations"}}),t._v(" "),i("v-slider",{attrs:{label:"Error - "+t.editError.toFixed(1),step:t.defaultSettings.errorTolerance.increment,min:t.defaultSettings.errorTolerance.min,max:t.defaultSettings.errorTolerance.max,ticks:"","thumb-label":""},nativeOn:{mouseup:function(e){t.setFitError(t.editError)}},model:{value:t.editError,callback:function(e){t.editError=e},expression:"editError"}}),t._v(" "),i("v-tooltip",{attrs:{top:"","close-delay":1}},[i("v-btn",{attrs:{slot:"activator",block:"",outline:"",color:"warning"},on:{click:t.resetEditFitSettings},slot:"activator"},[i("v-icon",{attrs:{left:""}},[t._v("fa-undo")]),t._v(" "),i("span",[t._v("Reset Levenberg")])],1),t._v(" "),i("span",[t._v("Click to reset levenberg settings")])],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};e.a=n},"5MFP":function(t,e,i){"use strict";var n=i("Dd8w"),a=i.n(n),s=i("NYxO"),o=i("Cfw1");e.a={name:"ScalesTAS",extends:o.a,computed:a()({},i.i(s.a)("TAS/Fit",{scales:function(t){return t.scale},xScaleLabel:function(t){return t.plotScale.x.label},yScaleLabel:function(t){return t.plotScale.y.label}})),methods:a()({},i.i(s.c)("TAS/Fit",["resetScales","setYScale","setXScale"]))}},"5d6u":function(t,e,i){"use strict";var n=i("5MFP"),a=i("VU/8")(n.a,null,!1,null,null,null);e.a=a.exports},"6K5V":function(t,e,i){"use strict";var n=i("4Fwg"),a=i("VU/8")(n.a,null,!1,null,null,null);e.a=a.exports},"7Crc":function(t,e,i){var n=i("jMxa");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("rjj0")("5172b4a8",n,!0,{})},"8W9M":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("wn27"),a=i("XLWn");var s=function(t){i("7Crc")},o=i("VU/8")(n.a,a.a,!1,s,"data-v-07b87a71",null);e.default=o.exports},AtG2:function(t,e,i){(t.exports=i("FZ+f")(!0)).push([t.i,".fa-circle.non-constant{color:green!important;font-size:100%}.fa-circle.constant{color:brown!important;font-size:100%}","",{version:3,sources:["/home/rhf/git/plotfit-vuetify/src/components/FitEquations/FitEquation.vue"],names:[],mappings:"AACA,wBACE,sBAAwB,AACxB,cAAgB,CACjB,AACD,oBACE,sBAAwB,AACxB,cAAgB,CACjB",file:"FitEquation.vue",sourcesContent:["\n.fa-circle.non-constant {\n  color: green !important;\n  font-size: 100%;\n}\n.fa-circle.constant {\n  color: brown !important;\n  font-size: 100%;\n}\n"],sourceRoot:""}])},T3AD:function(t,e,i){"use strict";var n=i("Dd8w"),a=i.n(n),s=i("NYxO"),o=i("7AAg"),r=i("mbBk"),l=i("b5lA"),u=i("Ww+w");e.a={name:"FileExplorerTAS",extends:o.a,components:{"v-filter-list":r.a,"v-files-list":l.a,"v-fit-list":u.a},computed:a()({},i.i(s.b)("TAS/Fit",["isDefaultFieldsDifferent"]))}},UwYy:function(t,e,i){"use strict";var n=i("Dd8w"),a=i.n(n),s=i("NYxO"),o=i("mYpF");e.a={name:"FitSettingsTAS",extends:o.a,computed:a()({},i.i(s.a)("TAS/Fit",{defaultSettings:function(t){return t.defaultFitSettings}})),methods:a()({},i.i(s.d)("TAS/Fit",["setFitDamping","setFitGradient","setFitIterations","setFitError","resetFitSettings"]),{resetEditFitSettings:function(){this.initEditValues(),this.resetFitSettings()}})}},"Ww+w":function(t,e,i){"use strict";var n=i("h96m"),a=i("VU/8")(n.a,null,!1,null,null,null);e.a=a.exports},XAh0:function(t,e,i){"use strict";var n=i("woOf"),a=i.n(n),s=i("Dd8w"),o=i.n(s),r=i("NYxO"),l=i("hBjw"),u=i("aCc6");e.a={name:"FilesListTAS",extends:l.a,computed:o()({},i.i(r.a)("TAS",{fetched:function(t){return t.fetched},uploaded:function(t){return t.uploaded}}),i.i(r.a)("TAS/Fit",{filesSelected:function(t){return t.filesSelected},fileToFit:function(t){return t.fileToFit},filters:function(t){return t.filters}}),i.i(r.a)("TAS/Combine",{storedCombined:function(t){return t.storedCombined}}),{selected:{get:function(){return this.filesSelected},set:function(t){var e=this.filesSelected.length,i=t.indexOf(this.fileToFit);0!==e&&-1===i&&this.updateFileToFit(null);var n={filelist:t,group:"TAS"};this.updateFilesSelected(n).then(function(){u.a.$emit("redraw-chart-tas-fit")}).catch(function(t){u.a.$emit("add-notification",t.message,"error")})}},allFiles:function(){return a()({},this.fetched,this.uploaded,this.storedCombined)}}),methods:o()({},i.i(r.c)("TAS/Fit",["updateFilesSelected","updateFileToFit"]))}},XLWn:function(t,e,i){"use strict";var n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("v-file-explorer"),t._v(" "),t.filesSelected.length?i("v-scales"):t._e(),t._v(" "),t.filesSelected.length?i("v-fields"):t._e(),t._v(" "),t.fileToFit?i("v-fit-equation",{attrs:{collapse:!1,"multiple-equations":!0}}):t._e(),t._v(" "),t.fileToFit?i("v-fit-settings"):t._e()],1)},staticRenderFns:[]};e.a=n},ZYts:function(t,e,i){"use strict";var n={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("v-select",{ref:"fitList",attrs:{label:"Fit",items:t.filesToFit,autocomplete:"",chips:"","deletable-chips":"",placeholder:t.filesToFit.length?"Select a file to fit":"No files to fit",hint:"Pick a file to fit","max-height":"250",disabled:!t.filesToFit.length},on:{change:function(e){t.$refs.fitList.isActive=e.length>1}},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}})},staticRenderFns:[]};e.a=n},b5lA:function(t,e,i){"use strict";var n=i("XAh0"),a=i("VU/8")(n.a,null,!1,null,null,null);e.a=a.exports},"cUK+":function(t,e,i){"use strict";var n=i("eOmU"),a=i("ZYts");var s=function(t){i("iYHp")},o=i("VU/8")(n.a,a.a,!1,s,"data-v-6b844111",null);e.a=o.exports},cePi:function(t,e,i){"use strict";e.a={name:"FitSettings",created:function(){this.initEditValues()},props:{collapse:{type:Boolean,default:!0}},data:function(){return{editDamping:null,editGradient:null,editIterations:null,editError:null}},methods:{initEditValues:function(){this.editDamping=this.defaultSettings.damping.value,this.editGradient=this.defaultSettings.gradientDifference.value,this.editIterations=this.defaultSettings.maxIterations.value,this.editError=this.defaultSettings.errorTolerance.value}}}},cujh:function(t,e,i){var n=i("r6gZ");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("rjj0")("4bb4fbce",n,!0,{})},eOmU:function(t,e,i){"use strict";var n=i("aCc6");e.a={name:"FitList",computed:{selected:{get:function(){return this.fileToFit},set:function(t){var e="redraw-chart-"+this.$route.meta.group.toLowerCase()+"-fit";this.updateFileToFit(t).then(function(){n.a.$emit(e)}).catch(function(t){n.a.$emit("add-notification",t.message,"error")})}}}}},eWSk:function(t,e,i){"use strict";var n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-expansion-panel",{attrs:{flat:""}},[i("v-expansion-panel-content",{attrs:{value:!t.collapse}},[i("div",{staticClass:"title",attrs:{slot:"header"},slot:"header"},[t._v("Fit Configuration")]),t._v(" "),i("v-card",[i("v-card-text",{staticClass:"pb-0"},[i("v-tooltip",{attrs:{top:"","close-delay":1}},[i("v-btn",{attrs:{slot:"activator",block:"",outline:"",color:"success",disabled:t.isFitting||!t.isAllValid},on:{click:t.fitData},slot:"activator"},[i("span",[t._v(t._s(t.isFitting?"Fitting...":"Perform Fit"))])]),t._v(" "),i("span",[t._v("Click to fit")])],1)],1)],1),t._v(" "),i("v-card",[i("v-card-text",{staticClass:"pb-0"},t._l(t.selected,function(e,n){return i("v-layout",{key:n,attrs:{row:"",wrap:""}},[t.multipleEquations?i("v-flex",{attrs:{xs2:""}},[0===n?i("v-btn",{attrs:{small:"",flat:"",icon:"",color:"success"},on:{click:function(e){t.addEquation(t.fitKeys[0])}}},[i("v-icon",[t._v("add_circle")])],1):i("v-btn",{attrs:{small:"",flat:"",icon:"",color:"error"},on:{click:function(e){t.removeEquation(n)}}},[i("v-icon",[t._v("cancel")])],1)],1):t._e(),t._v(" "),i("v-flex",{class:t.multipleEquations?"xs10":"xs12"},[i("v-subheader",{staticClass:"pl-0 pr-2 mb-3",staticStyle:{cursor:"pointer","border-bottom":"1px solid grey",height:"30px"},on:{click:function(e){t.toggleShowEquation(n)}}},[i("span",[t._v("Fit #"+t._s(n+1))]),t._v(" "),i("v-spacer"),t._v(" "),i("span",[i("i",{class:t.showEquation[n]?"fa fa-angle-up":"fa fa-angle-down"})])],1)],1),t._v(" "),i("v-flex",{attrs:{xs12:""}},[i("v-slide-y-transition",[i("div",{directives:[{name:"show",rawName:"v-show",value:t.showEquation[n],expression:"showEquation[index]"}]},[i("v-select",{attrs:{items:t.fitKeys,value:t.selected[n].name,label:"Fit Type"},on:{input:function(e){t.updateSelect(e,n)}}}),t._v(" "),i("v-text-field",{attrs:{label:"Fit Equation",value:t.selected[n].equation,error:!e.valid,hint:e.valid?"":"Invalid equation.",placeholder:"Type an equation"},on:{input:function(e){t.equationInput(e,n)}}}),t._v(" "),i("v-subheader",{staticClass:"pl-0 pr-0 mb-3",staticStyle:{cursor:"pointer","border-bottom":"1px solid grey",height:"30px"},on:{click:function(e){t.toggleShowIV(n)}}},[t._v("Initial Values\n                  "),i("v-spacer"),t._v(" "),i("span",[i("i",{class:t.showIV[n]?"fa fa-angle-up":"fa fa-angle-down"})])],1),t._v(" "),i("v-slide-y-transition",[i("div",{directives:[{name:"show",rawName:"v-show",value:t.showIV[n],expression:"showIV[index]"}]},t._l(e.initialValues,function(e,a){return i("v-text-field",{key:a,attrs:{"prepend-icon":t.pickIndex===n&&a===t.pickIvIndex?"cancel":"fa-crosshairs","prepend-icon-cb":function(){return t.pickIndex===n&&a===t.pickIvIndex?t.togglePick(!1,n,a):t.togglePick(!0,n,a)},"append-icon":e.constant?"fa-circle constant":"fa-circle non-constant","append-icon-cb":function(){return t.setCoefficientConstant({index:n,ivIndex:a,value:!e.constant})},type:"number",label:e.coefficient,value:e.value},on:{input:function(e){t.coefficientInput({index:n,value:e,ivIndex:a})}}})}))])],1)])],1)],1)})),t._v(" "),i("v-card-text",[i("v-subheader",{staticClass:"pl-0"},[t._v("Final Equation:")]),t._v(" "),i("p",[t._v("y = "+t._s(t.finalEquation))]),t._v(" "),i("v-divider")],1)],1)],1)],1)},staticRenderFns:[]};e.a=n},gk6a:function(t,e,i){"use strict";var n=i("woOf"),a=i.n(n),s=i("Dd8w"),o=i.n(s),r=i("NYxO"),l=i("eAgk");e.a={name:"FilterListTAS",extends:l.a,computed:o()({},i.i(r.a)("TAS",{fetched:function(t){return t.fetched},uploaded:function(t){return t.uploaded}}),i.i(r.a)("TAS/Fit",{selected:function(t){return t.filters}}),i.i(r.a)("TAS/Combine",{storedCombined:function(t){return t.storedCombined}}),{allFiles:function(){return a()({},this.fetched,this.uploaded,this.storedCombined)}}),methods:o()({},i.i(r.d)("TAS/Fit",["updateFilters"]))}},h96m:function(t,e,i){"use strict";var n=i("Dd8w"),a=i.n(n),s=i("NYxO"),o=i("cUK+");e.a={name:"FitListTAS",extends:o.a,computed:a()({},i.i(s.a)("TAS/Fit",{filesToFit:function(t){return t.filesSelected},fileToFit:function(t){return t.fileToFit}})),methods:a()({},i.i(s.c)("TAS/Fit",["updateFileToFit"]))}},iYHp:function(t,e,i){var n=i("vdGT");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("rjj0")("77636744",n,!0,{})},iYoy:function(t,e,i){"use strict";var n=i("Dd8w"),a=i.n(n),s=i("NYxO"),o=i("vVxY"),r=i("aCc6");e.a={name:"FitEquationTAS",extends:o.a,computed:a()({},i.i(s.a)("TAS/Fit",{fits:function(t){return t.fits}}),i.i(s.b)("TAS/Fit",["splitFitData","fitInitialValues","finalEquation"]),i.i(s.a)("TAS/Fit",{fits:function(t){return t.fits},fileToFit:function(t){return t.fileToFit},selectedData:function(t){return t.selectedData},isFitting:function(t){return t.isFitting},equationEditSelect:function(t){return t.equationEditSelect}})),methods:a()({},i.i(s.c)("TAS/Fit",["addToSelect","updateSelectAtIndex","removeSelectAtIndex","updateInitialValue","removeInitialValues","addInitialValues","setSelectValid","setSelectEquation","setCoefficientConstant","setFitType","setEquationEditSelect","transformData"]),{fitData:function(){r.a.$emit("redraw-chart-tas-fit")}})}},jMxa:function(t,e,i){(t.exports=i("FZ+f")(!0)).push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"SidebarTASFit.vue",sourceRoot:""}])},lcpj:function(t,e,i){"use strict";var n=i("iYoy"),a=i("VU/8")(n.a,null,!1,null,null,null);e.a=a.exports},mOlu:function(t,e,i){var n=i("AtG2");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("rjj0")("0bbecbd5",n,!0,{})},mYpF:function(t,e,i){"use strict";var n=i("cePi"),a=i("4q0C");var s=function(t){i("cujh")},o=i("VU/8")(n.a,a.a,!1,s,"data-v-28ecca6c",null);e.a=o.exports},mbBk:function(t,e,i){"use strict";var n=i("gk6a"),a=i("VU/8")(n.a,null,!1,null,null,null);e.a=a.exports},pIJI:function(t,e,i){"use strict";var n=i("fZjL"),a=i.n(n),s=i("M4fF"),o=i.n(s),r=i("QttI"),l=i.n(r),u=i("7+uW"),c=i("aCc6");e.a={name:"FitEquation",props:{collapse:{type:Boolean,default:!0},multipleEquations:{type:Boolean,default:!1}},data:function(){return{pickIndex:null,pickIvIndex:null,showEquation:[],showIV:[]}},created:function(){c.a.$on("update-initial-value-pick-"+this.$route.meta.group,this.updateInitialValueWithPick),this.addEquation(this.fitKeys[0])},destroyed:function(){c.a.$off("update-initial-value-pick-"+this.$route.meta.group)},beforeDestroy:function(){this.setEquationEditSelect([])},computed:{fitKeys:function(){return a()(this.fits)},items:function(){var t=this,e={};return this.fitKeys.forEach(function(i){e[i]={name:i,equation:t.fits[i].equation,initialValues:t.fits[i].initialValues,valid:!0}}),e},isAllValid:function(){for(var t=0,e=this.selected.length;t<e;t+=1)if(!this.selected[t].valid)return!1;return!0},selected:{get:function(){return this.equationEditSelect}}},methods:{evaluateInitialGuess:function(t){for(var e=t.initialValues,i=a()(e),n=i.length,s=0;s<n;s+=1){var o=e[i[s]].value;if("string"==typeof o){var r=this.computeGuess(o,this.splitFitData);t.initialValues[i[s]].value=r}}return t},computeGuess:function(t,e){var i=void 0;try{var n=l.a.compile(t);if(i=""===t?1:n.eval(e),Array.isArray(i))throw"Function must return a single value, not an array.";return i}catch(t){return c.a.$emit("add-notification",t,"warning"),1}},updateSelect:function(t,e){var i=this,n=this.evaluateInitialGuess(o.a.cloneDeep(this.items[t]));this.updateSelectAtIndex({index:e,temp:n}).then(function(){return i.setFitType(t)}).then(function(){"FitEquationSANS"===i.$options.name&&i.fitData(),"FitEquationTAS"===i.$options.name&&c.a.$emit("revise-fit-line-tas",i.fitInitialValues)}).catch(function(t){c.a.$emit("add-notification",t.message,"error")})},addEquation:function(t){var e=this.evaluateInitialGuess(o.a.cloneDeep(this.items[t]));this.addToSelect(e),"FitEquationTAS"===this.$options.name&&c.a.$emit("revise-fit-line-tas",this.fitInitialValues),this.showEquation.push(!0),this.showIV.push(!0)},removeEquation:function(t){var e=this;this.removeSelectAtIndex(t).then(function(){"FitEquationTAS"===e.$options.name&&c.a.$emit("revise-fit-line-tas",e.fitInitialValues),e.showEquation.splice(t,1),e.showIV.splice(t,1)}).catch(function(t){c.a.$emit("add-notification",t.message,"error")})},getParameters:function(t){var e=l.a.parse(t).filter(function(t){return t.isSymbolNode&&"x"!==t.name}).map(function(t){return t.name});return o.a.uniq(e)},checkEquation:function(t){if(""===t)return!1;try{l.a.compile(t)}catch(t){return!1}return!0},compareParameters:function(t,e,i){if(!o.a.isEqual(t,e)){var n=t.filter(function(t){return-1===e.indexOf(t)}),a=e.filter(function(e){return-1===t.indexOf(e)});n.length&&this.deleteParameters(i,n),a.length&&this.addParameters(i,a,e)}},deleteParameters:function(t,e){this.removeInitialValues({index:t,keys:e})},addParameters:function(t,e,i){this.addInitialValues({index:t,keys:e,newParameters:i})},equationInput:function(t,e){if(this.checkEquation(t)){this.setSelectValid({index:e,value:!0}),this.setSelectEquation({index:e,equation:t});var i=this.selected[e].initialValues.map(function(t){return t.coefficient}),n=this.getParameters(t);this.compareParameters(i,n,e)}else this.setSelectValid({index:e,value:!1})},resetPickIndex:function(){this.pickIndex=null,this.pickIvIndex=null},toggleShowEquation:function(t){u.a.set(this.showEquation,t,!this.showEquation[t])},toggleShowIV:function(t){u.a.set(this.showIV,t,!this.showIV[t])},togglePick:function(t,e,i){var n="toggle-pick-area-"+this.$route.meta.group;t?(c.a.$emit(n,!0),this.pickIndex=e,this.pickIvIndex=i):(c.a.$emit(n,!1),this.resetPickIndex())},updateInitialValueWithPick:function(t){var e=this,i="revise-fit-line-"+this.$route.meta.group.toLowerCase();this.updateInitialValue({index:this.pickIndex,ivIndex:this.pickIvIndex,value:+t.toFixed(4)}).then(function(){e.resetPickIndex(),c.a.$emit(i,e.fitInitialValues)}).catch(function(t){c.a.$emit("add-notification",t.message,"error")})},coefficientInput:function(t){var e=this,i="revise-fit-line-"+this.$route.meta.group.toLowerCase();this.updateInitialValue(t).then(function(){c.a.$emit(i,e.fitInitialValues)}).catch(function(t){c.a.$emit("add-notification",t.message,"error")})}}}},r6gZ:function(t,e,i){(t.exports=i("FZ+f")(!0)).push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"FitSettings.vue",sourceRoot:""}])},sPbr:function(t,e,i){"use strict";var n=i("T3AD"),a=i("VU/8")(n.a,null,!1,null,null,null);e.a=a.exports},vVxY:function(t,e,i){"use strict";var n=i("pIJI"),a=i("eWSk");var s=function(t){i("mOlu")},o=i("VU/8")(n.a,a.a,!1,s,null,null);e.a=o.exports},vdGT:function(t,e,i){(t.exports=i("FZ+f")(!0)).push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"FitList.vue",sourceRoot:""}])},wn27:function(t,e,i){"use strict";var n=i("Dd8w"),a=i.n(n),s=i("NYxO"),o=i("sPbr"),r=i("5d6u"),l=i("6K5V"),u=i("4Vye"),c=i("lcpj");e.a={name:"SidebarTASFit",components:{"v-file-explorer":o.a,"v-scales":r.a,"v-fields":l.a,"v-fit-equation":c.a,"v-fit-settings":u.a},computed:a()({},i.i(s.a)("TAS/Fit",{fileToFit:function(t){return t.fileToFit},filesSelected:function(t){return t.filesSelected}}))}}});