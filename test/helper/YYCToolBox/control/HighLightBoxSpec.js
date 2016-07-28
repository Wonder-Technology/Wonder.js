
///*  高亮显示层，背景锁定
//    覆盖层不能动态插入（也就是说要先创建一个覆盖层，令其display为none），否则不管怎么设置显示层的z-index，覆盖层总是在最上面！！！！！
    
//    9-11

//******************************************************************************************
//    显示层和覆盖层的html代码：

//                                  <%--显示层--%>
//<div id="center_show" style="display:none;width:600px;padding-top:10px;padding-bottom:10px;border:1px solid #CCCCCC;background-color:white;">  
    
//    <a name="show"></a>
//    <%--关闭按钮--%>
//    <div id="center_close" style="float:right;cursor:pointer;position:fixed;" onclick="box.close();">
//            <img alt="关闭" src="<%= Url.Content("/Content/Image/Shared/check_error.gif") %>"/>
//        </div>
//    <div id="center_show_content">
//    </div>
//</div>


//    <%--覆盖层不能动态插入，否则不管怎么设置显示层的z-index，覆盖层总是在最上面！！！！！--%>
//   <%-- 覆盖层--%>
//<div id="center_background" style="display:none;width:100%;height:100%;background-color:black;position:fixed;top:0px;left:0px;">
//</div>

//******************************************************************************************
  
//*/
//YYC.namespace("Control").box = (function () {
//    //option初始值
//    //透明度 0，背景颜色 黑色，是否显示覆盖层 否，覆盖层的z-index 100， position  "fixed" 0px 0px, 滚动 auto
//    //设置overflow和height属性，可以使得id_show中内容超过height时，显示滚动条
//    var option =
//    {
//        opacity: 1.0, backColor: "black", cover: false, zIndex: 100,
//        position: {
//            position: "fixed",
//            top: "0px",
//            left: "0px"
//        },
//        overflow: "auto"
//    };

//    //显示层显示时调用的函数
//    var onShow = null;
//    //显示层关闭时调用的函数
//    var onClose = null;

//    var id_cover, id_show,
//    id_close = "#center_close";

//    var initialize = function (_id_cover, _id_show, _option) {      //注意形参名不能与局部变量名相同！！
//        id_cover = _id_cover;
//        id_show = _id_show;
//        //        option = YYC.Tool.extend.extend(option, option);
//        YYC.Tool.extend.extend(option, _option);
//    }


//    var new_id = function () {
//        return "#" + arguments[0];
//    }

//    //覆盖层
//    var cover = {
//        show: function () {
//            //            alert(id_cover);
//            $(id_cover).css("display", "block").css("backgroud-color", option.backColor).css("z-index", option.zIndex).css("opacity", option.opacity);
//        },
//        close: function () {
//            $(id_cover).css("display", "none");
//        }
//    }

//    return {
//        //配置参数
//        set: function (id_cover, id_show, _option, _onShow, _onClose) {     //注意形参名不能与局部变量名相同！！
//            this.clearOption(); //还原option

//            var _id_cover = new_id(id_cover);
//            var _id_show = new_id(id_show);

//            initialize(_id_cover, _id_show, _option);  //初始化参数

//            onShow = _onShow;    //保存委托函数
//            onClose = _onClose;
//        },
//        setOption: function (option) {

//        },
//        //还原option为初始值
//        clearOption: function () {
//            //透明度 0，背景颜色 黑色，是否显示覆盖层 否，覆盖层的z-index 100， position  "fixed" 0px 0px, 滚动 auto
//            option =
//                {
//                    opacity: 1.0, backColor: "black", cover: false, zIndex: 100,
//                    position: {
//                        position: "fixed",
//                        top: "0px",
//                        left: "0px"
//                    },
//                    overflow: "auto"
//                };
//        },
//        //获得高亮层dom对象
//        getHightDiv: function () {
//            if (!id_show) {
//                id_show = "#center_show";
//            }
//            return $(id_show);
//        },
//        //获得覆盖层dom对象
//        getCoverDiv: function () {
//            if (!id_cover) {
//                id_cover = "#center_background";
//            }
//            return $(id_cover);
//        },
//        show: function () {
//            var zIndex = (option.zIndex + 1).toString();
//            if (option.cover) {
//                cover.show();
//            }
//            //            for (var item in option) {
//            //                alert(option[item]);
//            //            }
//            //            alert(option.position.top);
//            $(id_show).css({ "display": "block", "z-index": zIndex, "position": option.position.position, "top": option.position.top, "left": option.position.left, "overflow": option.overflow });
//            //            alert(option.position.top);
//            //            alert(option.position.left);

//            //关闭图片固定在左上角
//            $(id_close).css({ "top": option.position.top, "left": parseInt(option.position.left.slice(0, -2)) + 10 + "px" });

//            if (option.height) {
//                $(id_show).css("height", option.height);
//            }
//            else {
//                //                alert("zz");
//                $(id_show).css("height", "");
//            }

//            if (onShow) {
//                onShow();
//            }
//        },
//        close: function () {
//            if (option.cover) {
//                cover.close();
//            }
//            $(id_show).css("display", "none");

//            if (onClose) {
//                onClose();
//            }
//        }
//    }
//})();