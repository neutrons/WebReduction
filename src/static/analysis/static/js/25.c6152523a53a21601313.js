webpackJsonp([25],{jILv:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("oV4c"),a=n("VU/8")(r.a,null,!1,null,null,null);t.default=a.exports},oV4c:function(e,t,n){"use strict";var r=n("Dd8w"),a=n.n(r),o=n("NYxO"),s=n("6NrU"),u=n("aCc6");t.a={name:"SANS1DBrowse",extends:s.a,components:{"v-edit-chart-button":function(){return n.e(59).then(n.bind(null,"WSqG"))}},data:function(){return{isMathJax:!0,ID:"SANS-Browse"}},created:function(){u.a.$on("redraw-chart-sans-browse",this.redrawChart)},destroyed:function(){u.a.$off("redraw-chart-sans-browse")},computed:a()({},n.i(o.a)("SANS/Browse",{browseData:function(e){return e.browseData},fields:function(e){return e.field}}),n.i(o.b)("SANS/Browse",{label:"label",plotData:"getPreparedData"})),methods:a()({},n.i(o.c)("SANS/Browse",["deletePoint"]))}}});