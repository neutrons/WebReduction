webpackJsonp([5],{"+nQ6":function(t,e,i){"use strict";i("vwbq");e.a={methods:{addLabels:function(){var t=this,e=this.svg.append("g").attr("class","labels labels-"+this.ID),i=["translate(10, "+(this.height+this.margin.top+this.margin.bottom)/2+") rotate(-90)","translate(25, "+(this.height+this.margin.top)/2+") rotate(-90)"],n=["translate("+this.width/2+", "+(this.height+2.75*this.margin.top)+")","translate("+(this.width+this.margin.left+this.margin.right)/2+", "+(this.height+3.25*this.margin.top)+")"];e.call(function(e){for(var r=function(r){var a=e.append(t.isMathJax?"foreignObject":"text").attr("height",100).attr("width",200).attr("id",r%2?"yLabel-"+t.ID:"xLabel-"+t.ID).attr("transform",function(){return t.isMathJax?r%2?i[0]:n[0]:r%2?i[1]:n[1]});t.isMathJax?(a.html(r%2?"`"+t.label.y+"`":"`"+t.label.x+"`"),MathJax.Hub.Queue(["Typeset",MathJax.Hub,["xLabel-"+t.ID,"yLabel-"+t.ID]])):a.text(r%2?t.label.y:t.label.x)},a=0;a<2;a+=1)r(a)})},updateLabels:function(){var t=this.svg.select("#xLabel-"+this.ID),e=this.svg.select("#yLabel-"+this.ID);this.isMathJax?(t.html("`"+this.label.x+"`"),e.html("`"+this.label.y+"`"),MathJax.Hub.Queue(["Typeset",MathJax.Hub,["xLabel-"+this.ID,"yLabel-"+this.ID]])):(t.text(this.label.x),e.text(this.label.y))}}}},"4M6A":function(t,e,i){"use strict";var n=i("vwbq");e.a={methods:{initChartElements:function(t){this.svg=n.B(t).attr("viewBox",this.viewBox).attr("perserveAspectRatio","xMidYMid meet").attr("width","100%"),this.addLabels(),this.addClipPath(),this.svg.append("defs").append("clipPath").attr("id","clip-"+this.ID).append("rect").style("fill","none").attr("width",this.width).attr("height",this.height),this.g=this.svg.append("g").attr("class","chart-group").attr("transform","translate("+this.margin.left+", "+this.margin.top+")"),this.g.append("rect").attr("class","chart-bg").attr("height",this.height).attr("width",this.width).style("fill","white");var e=this.g.append("g").attr("class","grid");e.append("g").attr("class","grid--x").attr("transform","translate(0, "+this.height+")").call(this.xGrid),e.append("g").attr("class","grid--y").call(this.yGrid);var i=this.g.append("g").attr("class","axis");i.append("g").attr("class","axis--x").attr("transform","translate(0, "+this.height+")").call(this.xAxis),i.append("g").attr("class","axis--y").call(this.yAxis),this.addZoomGroup(),this.g.select(".zoom").call(this.zoom),this.g.select("#zoom-group-"+this.ID).append("g").attr("class","brushes").attr("height",this.height).attr("width",this.width).attr("fill","none")}}}},"6NrU":function(t,e,i){"use strict";var n=i("I4A/"),r=i("vLsN");var a=function(t){i("rJvr")},s=i("VU/8")(n.a,r.a,!1,a,null,null);e.a=s.exports},AI0Q:function(t,e,i){"use strict";var n=i("4M6A"),r=i("bTxB"),a=i("yK63"),s=i("g0At"),o=i("+nQ6"),l=i("vUXw"),h=i("nLFy"),c=i("njkE"),d=i("boKd"),u=i("WTh+"),p=i("q/nh"),f=i("U3GD"),x=i("vSAJ");e.a={mixins:[n.a,r.a,a.a,o.a,l.a,h.a,d.a,c.a,s.a,u.a,p.a,f.a,x.a],methods:{drawChart:function(){0===this.plotData.length&&this.initChartElements(".quickplot-"+this.ID),0!==this.plotData.length&&this.g.select(".zoom").attr("pointer-events","all"),this.updateChartElements(0)}}}},Bz57:function(t,e,i){"use strict";var n=i("Dd8w"),r=i.n(n),a=i("aCc6");e.a={data:function(){return{showDeleteModal:!1,pointToDelete:null}},methods:{triggerDelete:function(t){this.pointToDelete=r()({},t),this.showDeleteModal=!0},confirmDeletePoint:function(){var t=this,e=this.$route.meta.group,i=this.$route.meta.feature;this.deletePoint(r()({},this.pointToDelete,{group:e})).then(function(){t.resetDeletePoint(),a.a.$emit("add-notification","Point deleted!","success"),a.a.$emit("redraw-chart-"+e.toLowerCase()+"-"+i.toLowerCase())}).catch(function(t){a.a.$emit("add-notification",t,"error")})},resetDeletePoint:function(){this.showDeleteModal=!1,this.pointToDelete=null}}}},EbAP:function(t,e,i){(t.exports=i("FZ+f")(!0)).push([t.i,".axis path{shape-rendering:optimizeQuality}.axis .tick text{font-size:14px}.axis .tick line{shape-rendering:optimizeQuality;stroke:#000}.grid .tick line{shape-rendering:optimizeQuality;stroke:#dcdcdc}iframe.width-changed{width:100%;display:block;border:0;height:0;margin:0}@media screen and (max-width:599px){.chart{max-height:500px/1.77px;max-width:500px}}@media screen and (min-width:600px) and (max-width:959px){.chart{max-height:800px/1.77px;max-width:800px}}@media screen and (min-width:960px) and (max-width:1263px){.chart{max-height:1000px/1.77px;max-width:1000px}}@media screen and (min-width:1264px) and (max-width:1903px){.chart{max-height:1000px/1.77px;max-width:1000px}}@media screen and (min-width:1904px){.chart{max-height:1800px/1.77px;max-width:1800px}}.MathJax_SVG{position:static!important;display:inline-block!important}foreignObject{height:100px;width:200px}.handle{fill:gray;opacity:.75}.zoom-group .brush-container .handle{fill:none}.zoom-group .brushes .selection{fill:green;stroke:#000;stroke-width:1px;stroke-dasharray:3px 3px}.zoom-group .brushes .handle{fill:none}.zoom-group .brushes text{fill:#fff;text-anchor:end;letter-spacing:1px}.tab-card-text{max-height:350px;overflow-y:auto}","",{version:3,sources:["/home/rhf/git/plotfit-vuetify/src/components/BrowseData/DefaultChart.vue"],names:[],mappings:"AACA,WACE,+BAAiC,CAClC,AACD,iBACE,cAAgB,CACjB,AACD,iBACE,gCAAiC,AACjC,WAAc,CACf,AACD,iBACE,gCAAiC,AACjC,cAAkB,CACnB,AACD,qBACE,WAAY,AACZ,cAAe,AACf,SAAU,AACV,SAAU,AACV,QAAU,CACX,AACD,oCACA,OACI,wBAA2B,AAC3B,eAAiB,CACpB,CACA,AACD,0DACA,OACI,wBAA2B,AAC3B,eAAiB,CACpB,CACA,AACD,2DACA,OACI,yBAA4B,AAC5B,gBAAkB,CACrB,CACA,AACD,4DACA,OACI,yBAA4B,AAC5B,gBAAkB,CACrB,CACA,AACD,qCACA,OACI,yBAA4B,AAC5B,gBAAkB,CACrB,CACA,AAGD,aACE,0BAA4B,AAC5B,8BAAiC,CAClC,AACD,cACE,aAAc,AACd,WAAa,CACd,AACD,QACE,UAAW,AACX,WAAc,CACf,AACD,qCACE,SAAW,CACZ,AACD,gCACE,WAAY,AACZ,YAAc,AACd,iBAAkB,AAClB,wBAA0B,CAC3B,AACD,6BACE,SAAW,CACZ,AACD,0BACE,UAAY,AACZ,gBAAiB,AACjB,kBAAoB,CACrB,AACD,eACE,iBAAkB,AAClB,eAAiB,CAClB",file:"DefaultChart.vue",sourcesContent:["\n.axis path {\n  shape-rendering: optimizeQuality;\n}\n.axis .tick text {\n  font-size: 14px;\n}\n.axis .tick line {\n  shape-rendering: optimizeQuality;\n  stroke: black;\n}\n.grid .tick line {\n  shape-rendering: optimizeQuality;\n  stroke: gainsboro;\n}\niframe.width-changed {\n  width: 100%;\n  display: block;\n  border: 0;\n  height: 0;\n  margin: 0;\n}\n@media screen and (max-width: 599px) {\n.chart {\n    max-height: 500px / 1.77px;\n    max-width: 500px;\n}\n}\n@media screen and (min-width: 600px) and (max-width: 959px) {\n.chart {\n    max-height: 800px / 1.77px;\n    max-width: 800px;\n}\n}\n@media screen and (min-width: 960px) and (max-width: 1263px) {\n.chart {\n    max-height: 1000px / 1.77px;\n    max-width: 1000px;\n}\n}\n@media screen and (min-width: 1264px) and (max-width: 1903px) {\n.chart {\n    max-height: 1000px / 1.77px;\n    max-width: 1000px;\n}\n}\n@media screen and (min-width: 1904px) {\n.chart {\n    max-height: 1800px / 1.77px;\n    max-width: 1800px;\n}\n}\n\n/* Override MathJax positioning for rendered elements */\n.MathJax_SVG {\n  position: static !important;\n  display: inline-block !important;\n}\nforeignObject {\n  height: 100px;\n  width: 200px;\n}\n.handle {\n  fill: gray;\n  opacity: 0.75;\n}\n.zoom-group .brush-container .handle {\n  fill: none;\n}\n.zoom-group .brushes .selection {\n  fill: green;\n  stroke: black;\n  stroke-width: 1px;\n  stroke-dasharray: 3px 3px;\n}\n.zoom-group .brushes .handle {\n  fill: none;\n}\n.zoom-group .brushes text {\n  fill: white;\n  text-anchor: end;\n  letter-spacing: 1px;\n}\n.tab-card-text {\n  max-height: 350px;\n  overflow-y: auto;\n}\n"],sourceRoot:""}])},"I4A/":function(t,e,i){"use strict";var n=i("fZjL"),r=i.n(n),a=i("vwbq"),s=i("AI0Q"),o=i("Bz57");e.a={name:"DefaultBrowseChart",mixins:[s.a,o.a],components:{"v-reset-chart-button":function(){return i.e(21).then(i.bind(null,"ckRN"))},"v-metadata-table":function(){return i.e(23).then(i.bind(null,"gvI7"))},"v-plotted-data-table":function(){return i.e(20).then(i.bind(null,"TgbJ"))},"v-delete-point-modal":function(){return i.e(22).then(i.bind(null,"s3zY"))}},data:function(){return{xType:"x",yType:"y",width:960,height:600,viewBox:"0 0 960 600",show:!0,defaultMargin:{top:20,right:50,bottom:50,left:100}}},computed:{margin:function(){return this.defaultMargin},xScale:function(){return a.a().range([0,this.width]).domain(this.xExtent).nice()},xExtent:function(){var t=this;return this.plotData.length?a.b(this.plotData[0].values,function(e){return e[t.fields.x]}):[0,0]},yScale:function(){return a.a().range([this.height,0]).domain(this.yExtent).nice()},yExtent:function(){var t=this;return this.plotData.length?a.b(this.plotData[0].values,function(e){return e[t.fields.y]}):[0,0]},colorScale:function(){return a.l(a.m).domain(this.plotData.map(function(t){return t.key}))},xAxis:function(){return a.n(this.xScale)},yAxis:function(){return a.o(this.yScale)},xGrid:function(){return a.n(this.xScale).ticks(10).tickSize(-this.height).tickFormat("")},yGrid:function(){return a.o(this.yScale).ticks(10).tickSize(-this.width).tickFormat("")},line:function(){var t=this;return a.p().defined(this.filterForLog).x(function(e){return t.xScale(e[t.fields.x])}).y(function(e){return t.yScale(e[t.fields.y])})},isMetadata:function(){return!(void 0===this.plotMetadata)},metadataLength:function(){return this.isMetadata?null===this.plotMetadata?0:r()(this.plotMetadata).length:0}},methods:{redrawChart:function(){this.plotData.length||(this.getContainerWidth("#quickplot-wrapper-"+this.ID),this.removeChart()),this.drawChart()}},mounted:function(){this.getContainerWidth("#quickplot-wrapper-"+this.ID),this.drawChart()}}},U3GD:function(t,e,i){"use strict";e.a={methods:{addClipPath:function(){this.svg.append("defs").append("clipPath").attr("id","clip-"+this.ID).append("rect").style("fill","none").attr("width",this.width).attr("height",this.height)}}}},"WTh+":function(t,e,i){"use strict";e.a={methods:{filterForLog:function(t){return"log(y)"===this.yType&&"log(x)"===this.xType?t[this.fields.y]>0&&t[this.fields.x]>0:"log(x)"===this.xType?t[this.fields.x]>0:"log(y)"===this.yType?t[this.fields.y]>0:t}}}},bTxB:function(t,e,i){"use strict";var n=i("d7EF"),r=i.n(n),a=i("vwbq"),s=i("M4fF"),o=i.n(s);e.a={data:function(){return{symbols:{circle:a.u().type(a.v).size(45),triangle:a.u().type(a.w).size(45),cross:a.u().type(a.x).size(45),diamond:a.u().type(a.y).size(45),square:a.u().type(a.z).size(45),wye:a.u().type(a.A).size(45)}}},methods:{updateChartElements:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:750,i=this,n=a.s().duration(e),s=this.rescaleToZoom(),l=r()(s,2),h=l[0],c=l[1],d=a.p().defined(this.filterForLog).x(function(t){return h(t[i.fields.x])}).y(function(t){return c(t[i.fields.y])});if(this.updateAxes(h,c,n),this.updateGrids(h,c,n),this.updateLabels(),void 0!==this.fileToFit&&null!==this.fileToFit){var u=this.plotData.concat([{key:"fit",values:[]}]);this.legend(u)}else this.legend(this.plotData);var p=o.a.cloneDeep(this.plotData);p.forEach(function(e){e.values=e.values.filter(t.filterForLog)});var f=this.g.selectAll(".group").data(p);f.exit().remove();var x=(f=f.enter().append("g").attr("clip-path","url(#clip-"+this.ID+")").merge(f).attr("class",function(t){return"group "+t.key})).selectAll("path.scatter-line").data(function(t){return[t]});x.exit().remove(),x.enter().append("path").attr("class","scatter-line").style("fill","none").style("stroke",function(e){return t.getColor(e.key)}).attr("d",function(t){return d(t.values)}),x.transition(n).attr("d",function(t){return d(t.values)}).style("stroke",function(e){return t.getColor(e.key)});var A=f.selectAll(".error-line").data(function(t){return t.values});A.exit().remove(),A.enter().append("line").attr("class","error-line").attr("x1",function(t){return h(t[i.fields.x])}).attr("y1",function(t){return c(t[i.fields.y]+t.error)}).attr("x2",function(t){return h(t[i.fields.x])}).attr("y2",function(e){return t.errorBottomY(e,c)}).style("stroke",function(e){return t.getColor(e.name)}),A.style("stroke",function(e){return t.getColor(e.name)}).transition(n).attr("x1",function(t){return h(t[i.fields.x])}).attr("y1",function(t){return c(t[i.fields.y]+t.error)}).attr("x2",function(t){return h(t[i.fields.x])}).attr("y2",function(e){return t.errorBottomY(e,c)}),(A=f.selectAll(".error-cap-top").data(function(t){return t.values})).exit().remove(),A.enter().append("line").attr("class","error-cap-top").attr("x1",function(t){return h(t[i.fields.x])+4}).attr("y1",function(t){return c(t[i.fields.y]+t.error)}).attr("x2",function(t){return h(t[i.fields.x])-4}).attr("y2",function(t){return c(t[i.fields.y]+t.error)}).style("stroke",function(e){return t.getColor(e.name)}),A.style("stroke",function(e){return t.getColor(e.name)}).transition(n).attr("x1",function(t){return h(t[i.fields.x])+4}).attr("y1",function(t){return c(t[i.fields.y]+t.error)}).attr("x2",function(t){return h(t[i.fields.x])-4}).attr("y2",function(t){return c(t[i.fields.y]+t.error)}),(A=f.selectAll(".error-cap-bottom").data(function(t){return t.values})).exit().remove(),A.enter().append("line").attr("class","error-cap-bottom").attr("x1",function(t){return h(t[i.fields.x])+4}).attr("y1",function(e){return t.errorBottomY(e,c)}).attr("x2",function(t){return h(t[i.fields.x])-4}).attr("y2",function(e){return t.errorBottomY(e,c)}).style("stroke",function(e){return t.getColor(e.name)}),A.style("stroke",function(e){return t.getColor(e.name)}).transition(n).attr("x1",function(t){return h(t[i.fields.x])+4}).attr("y1",function(e){return t.errorBottomY(e,c)}).attr("x2",function(t){return h(t[i.fields.x])-4}).attr("y2",function(e){return t.errorBottomY(e,c)});var m=f.selectAll("path.point").data(function(t){return t.values});m.exit().remove(),m.enter().append("path").attr("class","point").style("fill",function(e){return t.getColor(e.name)}).style("stroke","whitesmoke").attr("d",function(t){var e=i.getShape(t.name);return i.symbols[e](t)}).attr("transform",function(t){return"translate( "+h(t[i.fields.x])+", "+c(t[i.fields.y])+")"}).on("mouseover",function(t){var e=i.getShape(t.name);a.B(this).style("cursor","pointer"),a.B(this).transition().attr("d",i.symbols[e].size(125));var n=h.domain().map(function(t){return Math.abs(t)});n=(n[1]-n[0])/2;var r=Math.abs(t[i.fields.x])>n?a.C.pageX-175:a.C.pageX+25,s="\n            <p>(Click to delete)</p>\n            <p>"+i.fields.x+": "+t[i.fields.x].toExponential(2)+"</p>\n            <p>"+i.fields.y+": "+t[i.fields.y].toExponential(2)+"</p>\n            <p>error: ± "+t.error.toExponential(2)+"</p>";a.B("body").append("div").attr("class","plot-tooltip").style("position","absolute").style("padding","10px").style("height","auto").style("width","auto").style("background","white").style("border","1px solid black").style("z-index","9999").style("display","inline").style("left",r+"px").style("top",a.C.pageY-50+"px").html(s)}).on("mouseout",function(t){var e=i.getShape(t.name);a.B(this).transition().attr("d",i.symbols[e].size(45)),a.B(".plot-tooltip").remove()}).on("click",function(e){t.triggerDelete(e)}),m.transition(n).attr("d",function(t){var e=i.getShape(t.name);return i.symbols[e](t)}).style("fill",function(e){return t.getColor(e.name)}).style("stroke","whitesmoke").attr("transform",function(t){return"translate( "+h(t[i.fields.x])+", "+c(t[i.fields.y])+")"})},errorBottomY:function(t,e){return t[this.fields.y]-t.error<0&&"log(y)"===this.yType?e(t[this.fields.y]):e(t[this.fields.y]-t.error)},getColor:function(t){return void 0===t||"combine"===t||"stitch"===t?"brown":this.colorScale(t)},getShape:function(t){return"combine"===t||"fit"===t||"stitch"===t?"cross":"circle"}}}},boKd:function(t,e,i){"use strict";var n=i("d7EF"),r=i.n(n),a=i("vwbq");e.a={computed:{zoom:function(){return a.r().on("zoom",this.zoomed)}},methods:{zoomed:function(){var t=this,e=this.rescaleToZoom(),i=r()(e,2),n=i[0],s=i[1],o=a.p().defined(this.filterForLog).x(function(e){return n(e[t.fields.x])}).y(function(e){return s(e[t.fields.y])}),l=a.s().duration(0);this.updateAxes(n,s,l),this.updateGrids(n,s,l),this.g.selectAll(".error-line").attr("x1",function(e){return n(e[t.fields.x])}).attr("y1",function(e){return s(e[t.fields.y]+e.error)}).attr("x2",function(e){return n(e[t.fields.x])}).attr("y2",function(e){return s(e[t.fields.y]-e.error)}),this.g.selectAll(".error-cap-top").attr("x1",function(e){return n(e[t.fields.x])+4}).attr("y1",function(e){return s(e[t.fields.y]+e.error)}).attr("x2",function(e){return n(e[t.fields.x])-4}).attr("y2",function(e){return s(e[t.fields.y]+e.error)}),this.g.selectAll(".error-cap-bottom").attr("x1",function(e){return n(e[t.fields.x])+4}).attr("y1",function(e){return s(e[t.fields.y]-e.error)}).attr("x2",function(e){return n(e[t.fields.x])-4}).attr("y2",function(e){return s(e[t.fields.y]-e.error)}),this.g.selectAll(".point").attr("transform",function(e){return"translate( "+n(e[t.fields.x])+", "+s(e[t.fields.y])+")"}),this.g.selectAll(".scatter-line").attr("d",function(t){return o(t.values)}),this.fileToFit&&this.g.select(".fitted-line").attr("d",o),"Stitch"===this.$route.feature&&(this.updateBrushScale(),this.reconvertBrushSelections())},rescaleToZoom:function(){var t=a.t(this.g.select(".zoom").node());return[t.rescaleX(this.xScale),t.rescaleY(this.yScale)]}}}},g0At:function(t,e,i){"use strict";e.a={methods:{getContainerWidth:function(t){var e=document.querySelector(t).offsetWidth;e<1&&(e=window.innerWidth-350);var i=e/(16/9);this.width=e-this.margin.left-this.margin.right,this.height=i-this.margin.top-this.margin.bottom,this.viewBox="0 0 "+e+" "+i}}}},iHqd:function(t,e,i){"use strict";var n=i("Dd8w"),r=i.n(n),a=i("NYxO"),s=i("6NrU"),o=i("aCc6");e.a={name:"TASBrowse",extends:s.a,components:{"v-edit-chart-button":function(){return i.e(43).then(i.bind(null,"s2s4"))}},data:function(){return{isMathJax:!1,ID:"TAS-Browse"}},created:function(){o.a.$on("redraw-chart-tas-browse",this.redrawChart)},destroyed:function(){o.a.$off("redraw-chart-tas-browse")},computed:r()({},i.i(a.a)("TAS/Browse",{browseData:function(t){return t.browseData},fields:function(t){return t.field}}),i.i(a.b)("TAS/Browse",{label:"label",plotData:"getPreparedData",plotMetadata:"plotMetadata"})),methods:r()({},i.i(a.c)("TAS/Browse",["deletePoint"]))}},nLFy:function(t,e,i){"use strict";var n=i("vwbq");e.a={methods:{updateGrids:function(t,e,i){var r=n.n(t).ticks(10).tickSize(-this.height).tickFormat(""),a=n.o(e).ticks(10).tickSize(-this.width).tickFormat("");this.g.select(".grid--x").transition(i).call(r),this.g.select(".grid--y").transition(i).call(a)}}}},njkE:function(t,e,i){"use strict";var n=i("vwbq");e.a={methods:{resetChart:function(){this.g.select(".zoom").transition().duration(750).call(this.zoom.transform,n.q)}}}},"q/nh":function(t,e,i){"use strict";i("vwbq");e.a={methods:{removeChart:function(){this.svg.selectAll("*").remove()}}}},rJvr:function(t,e,i){var n=i("EbAP");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("rjj0")("ed0733f4",n,!0,{})},v6bC:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("iHqd"),r=i("VU/8")(n.a,null,!1,null,null,null);e.default=r.exports},vLsN:function(t,e,i){"use strict";var n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-layout",{attrs:{row:"",wrap:""}},[i("v-flex",{attrs:{xs12:"",id:"quickplot-wrapper-"+t.ID,"text-xs-center":"","mb-3":""}},[i("svg",{class:"chart quickplot-"+t.ID})]),t._v(" "),i("v-flex",{attrs:{xs12:""}},[i("v-toolbar",{attrs:{flat:"",height:"auto"}},[i("v-container",{staticClass:"pa-0",attrs:{fluid:""}},[i("v-layout",{staticClass:"pa-0",attrs:{row:"",wrap:""}},[i("v-reset-chart-button",{attrs:{disable:0===t.plotData.length},on:{"reset-chart":t.resetChart}}),t._v(" "),i("v-edit-chart-button",{attrs:{disable:0===t.plotData.length}}),t._v(" "),i("v-spacer"),t._v(" "),Object.keys(t.browseData).length?i("v-btn",{attrs:{icon:""},on:{click:function(e){t.show=!t.show}}},[i("v-icon",[t._v(t._s(t.show?"keyboard_arrow_up":"keyboard_arrow_down"))])],1):t._e()],1)],1)],1)],1),t._v(" "),Object.keys(t.browseData).length?i("v-flex",{attrs:{xs12:""}},[i("v-slide-y-transition",[t.show?i("v-tabs",[i("v-tabs-bar",[void 0!==t.browseData.metadata?i("v-tabs-item",{attrs:{href:"#metadata",ripple:""}},[t._v("\n              Metadata\n            ")]):t._e(),t._v(" "),i("v-tabs-item",{attrs:{href:"#data",ripple:""}},[t._v("\n              Data\n            ")]),t._v(" "),i("v-tabs-slider",{attrs:{color:"accent"}})],1),t._v(" "),i("v-tabs-items",[i("v-tabs-content",{attrs:{id:"data"}},[i("v-card",{attrs:{flat:""}},[i("v-card-text",{staticClass:"tab-card-text"},[i("v-plotted-data-table",{attrs:{"plotted-data":t.browseData.data||[],files:[t.browseData.filename]}})],1)],1)],1),t._v(" "),i("v-tabs-content",{attrs:{id:"metadata"}},[void 0!==t.browseData.metadata?i("v-card-text",{staticClass:"tab-card-text"},[i("v-metadata-table",{attrs:{metadata:t.browseData.metadata||{}}})],1):t._e()],1)],1)],1):t._e()],1)],1):t._e(),t._v(" "),i("v-slide-y-transition",[i("v-delete-point-modal",{attrs:{show:t.showDeleteModal},on:{cancel:t.resetDeletePoint,delete:t.confirmDeletePoint}})],1)],1)},staticRenderFns:[]};e.a=n},vSAJ:function(t,e,i){"use strict";e.a={methods:{addZoomGroup:function(){this.g.append("g").attr("class","zoom-group").attr("id","zoom-group-"+this.ID).append("g").attr("id","zoom--"+this.ID).append("rect").attr("class","zoom").attr("opacity",0).attr("cursor","move").attr("pointer-events","none").style("fill","none").attr("width",this.width).attr("height",this.height)}}}},vUXw:function(t,e,i){"use strict";var n=i("vwbq");e.a={methods:{updateAxes:function(t,e,i){var r=n.n(t),a=n.o(e);this.g.select(".axis--x").transition(i).call(r),this.g.select(".axis--y").transition(i).call(a)}}}},yK63:function(t,e,i){"use strict";e.a={methods:{legend:function(t){var e=this;this.g.select(".legend").remove(),this.g.append("g").attr("class","legend").attr("font-family","sans-serif").attr("font-size",10).attr("text-anchor","end").selectAll(".label").data(t).enter().append("g").attr("class","label").attr("transform",function(t,e){return"translate(0, "+20*(e+1)+")"}),this.g.selectAll(".label").append("rect").attr("x",this.width-30).attr("height",15).attr("width",15).style("fill",function(t){return"combine"===t.key||"stitch"===t.key||"fit"===t.key||void 0===t.key?"brown":e.colorScale(t.key)}),this.g.selectAll(".label").append("text").attr("x",this.width-40).attr("y",10).attr("class","label").text(function(t){return t.key})}}}}});