webpackJsonp([4],{"2bx0":function(t,a,n){var i=n("piAn");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n("rjj0")("206f03a9",i,!0)},"8zhs":function(t,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i={name:"person",computed:{},data:function(){return{}},methods:{goPersonInfo:function(){console.log("ddd"),this.$router.push({path:"/person/personInfo"})},goCarInfo:function(){this.$router.push({path:"/person/myCar"})},goPicInfo:function(){this.$router.push({path:"/person/myPic"})}}},r={render:function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"bg-grep person-wrap"},[t._m(0),t._v(" "),n("div",{staticClass:"wrap-item"},[t._m(1),t._v(" "),n("div",{staticClass:"item-list border-1px",on:{click:t.goPersonInfo}},[n("i",{staticClass:"el-icon-time txt-primary"}),t._v("个人信息"),n("span",{staticClass:"pull-right ft-arrow"})]),t._v(" "),n("div",{staticClass:"item-list border-1px",on:{click:t.goCarInfo}},[n("i",{staticClass:"el-icon-time txt-primary"}),t._v("车辆信息"),n("span",{staticClass:"pull-right ft-arrow"})]),t._v(" "),n("div",{staticClass:"item-list border-1px",on:{click:t.goPicInfo}},[n("i",{staticClass:"el-icon-time txt-primary"}),t._v("照片信息"),n("span",{staticClass:"pull-right ft-arrow"})])])])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"wrap-header clearfix"},[a("div",{staticClass:"avatar-img"},[a("img",{attrs:{src:"static/img/logo2.png"}})]),this._v(" "),a("div",{staticClass:"userInfo"},[a("p",[this._v("宋哥")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"item-list border-1px"},[a("i",{staticClass:"el-icon-time txt-primary"}),this._v("我的二维码"),a("span",{staticClass:"pull-right ft-arrow"})])}]};var e=n("VU/8")(i,r,!1,function(t){n("2bx0")},"data-v-7c6fc39a",null);a.default=e.exports},piAn:function(t,a,n){(t.exports=n("FZ+f")(!1)).push([t.i,'\n.person-wrap .wrap-header[data-v-7c6fc39a] {\n  width: 100%;\n  height: 160px;\n  text-align: center;\n  background: -webkit-gradient(linear, left bottom, left top, from(#f9b15c), to(#ff9800));\n  background: linear-gradient(to top, #f9b15c, #ff9800);\n}\n.person-wrap .wrap-header .avatar-img[data-v-7c6fc39a] {\n    width: 80px;\n    height: 80px;\n    margin: 25px auto;\n    border-radius: 50%;\n    background-color: #fff;\n    text-align: center;\n}\n.person-wrap .wrap-header .avatar-img img[data-v-7c6fc39a] {\n      width: 76px;\n      height: 76px;\n      border-radius: 50%;\n      margin-top: 2px;\n}\n.person-wrap .wrap-header .userInfo[data-v-7c6fc39a] {\n    display: block;\n    color: #fff;\n    font-size: 16px;\n}\n.person-wrap .wrap-item[data-v-7c6fc39a] {\n  background-color: #fff;\n  padding: 20px 0;\n  font-size: 14px;\n  line-height: 1.5;\n}\n.person-wrap .wrap-item .item-list[data-v-7c6fc39a] {\n    vertical-align: middle;\n    padding: 10px 15px;\n    position: relative;\n}\n.person-wrap .wrap-item .item-list[data-v-7c6fc39a]:after {\n      position: absolute;\n      content: "";\n      height: 0;\n      width: 100%;\n      left: 0;\n      bottom: 0;\n      border-bottom: 1px solid #ddd;\n}\n.person-wrap .wrap-item .item-list i[data-v-7c6fc39a] {\n      display: inline-block;\n      font-size: 18px;\n      margin: 0px 10px;\n      vertical-align: middle;\n}\n.person-wrap .wrap-item .item-list .ft-arrow[data-v-7c6fc39a] {\n      margin-top: 10px;\n}\n',""])}});