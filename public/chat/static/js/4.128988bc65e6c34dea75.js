webpackJsonp([4],{GXNL:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r("Dd8w"),s=r.n(o),n=r("TIfe"),a=r("NYxO"),i={name:"addOrder",data:function(){return{orderForm:{title:"",questionType:"",orderLevel:"",modelFrom:"",questionInfo:""},applicantorInfo:{applicantName:Object(n.g)()?Object(n.g)():"",orgFrom:Object(n.d)()}}},computed:Object(a.b)({modelFromList:function(e){return e.order.modelFromList},orderLevelList:function(e){return e.order.orderLevelList},questionTypeList:function(e){return e.order.questionTypeList}}),watch:{},mounted:function(){this.$nextTick(function(){this.$store.dispatch("OrderData")})},methods:{onTapSaveOrder:function(){var e=this;if(!this.CJ.checkNull([{value:this.orderForm.title,name:"工单标题"},{value:this.orderForm.questionInfo,name:"问题描述"}])){var t=s()({},this.orderForm,this.applicantorInfo,{creatorName:Object(n.g)()});this.$store.dispatch("OrderSave",t).then(function(t){e.CJ.showToast("创建成功",function(){e.$router.push({path:"/order/success?orderNo="+t.orderNo})})})}}},components:{}},l={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container-wrap"},[r("div",{staticClass:"form-item"},[r("el-input",{attrs:{placeholder:"请输入内容",size:"small"},model:{value:e.orderForm.title,callback:function(t){e.$set(e.orderForm,"title",t)},expression:"orderForm.title"}},[r("template",{slot:"prepend"},[e._v("工单标题")])],2)],1),e._v(" "),r("div",{staticClass:"form-item"},[r("el-radio-group",{attrs:{size:"small"},model:{value:e.orderForm.questionType,callback:function(t){e.$set(e.orderForm,"questionType",t)},expression:"orderForm.questionType"}},[r("el-radio-button",{staticClass:"form-item-title",attrs:{label:"问题类型",disabled:""}}),e._v(" "),e._l(e.questionTypeList,function(t){return r("el-radio-button",{attrs:{label:t.value}},[e._v(e._s(t.name))])})],2)],1),e._v(" "),r("div",{staticClass:"form-item"},[r("el-radio-group",{attrs:{size:"small"},model:{value:e.orderForm.orderLevel,callback:function(t){e.$set(e.orderForm,"orderLevel",t)},expression:"orderForm.orderLevel"}},[r("el-radio-button",{staticClass:"form-item-title",attrs:{label:"工单级别",disabled:""}}),e._v(" "),e._l(e.orderLevelList,function(t){return r("el-radio-button",{attrs:{label:t.value}},[e._v(e._s(t.name))])})],2)],1),e._v(" "),r("div",{staticClass:"form-item"},[r("el-radio-group",{attrs:{size:"small"},model:{value:e.orderForm.modelFrom,callback:function(t){e.$set(e.orderForm,"modelFrom",t)},expression:"orderForm.modelFrom"}},[r("el-radio-button",{staticClass:"form-item-title",attrs:{label:"所属模块",disabled:""}}),e._v(" "),e._l(e.modelFromList,function(t){return r("el-radio-button",{attrs:{label:t.value}},[e._v(e._s(t.name))])})],2)],1),e._v(" "),r("div",{staticClass:"form-item"},[r("el-input",{attrs:{type:"textarea",autosize:{minRows:3,maxRows:4},placeholder:"问题描述"},model:{value:e.orderForm.questionInfo,callback:function(t){e.$set(e.orderForm,"questionInfo",t)},expression:"orderForm.questionInfo"}})],1),e._v(" "),r("div",{staticClass:"footer-btn"},[r("el-button",{staticClass:"width-100",attrs:{type:"primary",round:""},on:{click:e.onTapSaveOrder}},[e._v("保  存")])],1)])},staticRenderFns:[]};var d=r("VU/8")(i,l,!1,function(e){r("mgwl")},"data-v-64b0929b",null);t.default=d.exports},mgwl:function(e,t,r){var o=r("sD9J");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);r("rjj0")("32649071",o,!0)},sD9J:function(e,t,r){(e.exports=r("FZ+f")(!1)).push([e.i,"/**color**/\n/**theme**/\n/**text**/\n/**border**/\n/**fontsize**/\n.form-item[data-v-64b0929b] {\n  padding: 10px;\n  overflow: hidden;\n}\n.footer-btn[data-v-64b0929b] {\n  position: absolute;\n  display: block;\n  bottom: 10px;\n  left: 0;\n  right: 0;\n  margin: 15px;\n}\n",""])}});