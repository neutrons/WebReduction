webpackJsonp([24],{iHqd:function(e,t,a){"use strict";var r=a("Dd8w"),n=a.n(r),o=a("NYxO"),s=a("6NrU"),d=a("aCc6");t.a={name:"TASBrowse",extends:s.a,components:{"v-edit-chart-button":function(){return a.e(55).then(a.bind(null,"s2s4"))}},data:function(){return{isMathJax:!1,ID:"TAS-Browse"}},created:function(){d.a.$on("redraw-chart-tas-browse",this.redrawChart)},destroyed:function(){d.a.$off("redraw-chart-tas-browse")},computed:n()({},a.i(o.a)("TAS/Browse",{browseData:function(e){return e.browseData},fields:function(e){return e.field}}),a.i(o.b)("TAS/Browse",{label:"label",plotData:"getPreparedData",plotMetadata:"plotMetadata"})),methods:n()({},a.i(o.c)("TAS/Browse",["deletePoint"]))}},v6bC:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("iHqd"),n=a("VU/8")(r.a,null,!1,null,null,null);t.default=n.exports}});