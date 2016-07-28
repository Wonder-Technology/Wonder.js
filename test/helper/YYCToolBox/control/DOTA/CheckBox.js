/***********************************************
来自：

DOTA.CheckBox v0.1
作者：黄健
日期：2009.09.26
ＱＱ：573704282
Email: freewind22@163.com


修改：

作者：YYC
日期：2012-10-31
电子邮箱：395976266@qq.com
QQ: 395976266
博客：http://www.cnblogs.com/chaogex/

************************************************/

/*
为单选框/多选框绑定click事件，更改样式
单选框要先设置一个为checked！

调用方式：

<div id="mapType">
<label class="DOTA_Radio" for="rdoRandom">
<input type="radio" id="rdoRandom" name="rdoType" value="1" onclick="changeType(1)" checked="checked" />随机地图
</label>
</div>

<script type="text/javascript">
new YYC.Control.CheckBox({content: "mapType"});
</script>
*/

//if (typeof YYC == "undefined" || !YYC) {
//    window.YYC = {};
//}


YYC.namespace("Control").CheckBox = function (config) {
	this.config = YYC.Tool.extend.extend({
	    content: document.body
//        checked: false  //单选框是否设置了checked
	}, config || {});
	
	this.parentEl = YYC.Tool.selector.getDom(this.config.content);
	this.Init();
};
YYC.CheckBox.prototype = {
    Init: function () {
        var labs = this.parentEl.getElementsByTagName("label");
        //        console.log($(this.parentEl).find("input:radio").length);
//        //如果没有设置checked,则自动选中第一个单选框
//        if (!this.config.checked) {
//            $(this.parentEl).find("input[type=radio]").first().attr("checked", true);
//        }
        for (var i = 0; i < labs.length; i++) {
            //多选框
            if (/DOTA_CheckBox/i.test(labs[i].className)) {
                (function (i) {
                    //绑定click事件
                    labs[i].onclick = function (noSwap) {
                        var chk = labs[i].getElementsByTagName("input")[0];
                        if (chk.checked) {
                                                        labs[i].className = "DOTA_CheckBox DOTA_CheckBox_On";
                        } else {
                                                        labs[i].className = "DOTA_CheckBox DOTA_CheckBox_Off";
                        }
                    };
                })(i);
                //触发click事件，设置样式
                labs[i].onclick();
            }
            //开关
            else if (/DOTA_Switch/i.test(labs[i].className)) {
                (function (i) {
                    //绑定click事件
                    labs[i].onclick = function (noSwap) {
                        var chk = labs[i].getElementsByTagName("input")[0];
                        if (chk.checked) {
                            labs[i].className = "DOTA_Switch DOTA_Switch_On";
                        } else {
                            labs[i].className = "DOTA_Switch DOTA_Switch_Off";
                        }
                    };
                })(i);
                //触发click事件，设置样式
                labs[i].onclick();
            }
            //单选框
            else if (/DOTA_Radio/i.test(labs[i].className)) {

                (function (i) {
                    //绑定click事件
                    labs[i].onclick = function () {
                        if (labs[i].getElementsByTagName("input")[0].checked) {
                            //当前选中的单选框样式设为“DOTA_Radio_On”
                            labs[i].className = "DOTA_Radio DOTA_Radio_On";

                            //其他未选中单选框样式设为“DOTA_Radio_Off”
                            for (var j = 0; j < labs.length; j++) {
                                if (/DOTA_Radio/i.test(labs[j].className) && i !== j
									&& labs[i].getElementsByTagName("input")[0].name == labs[j].getElementsByTagName("input")[0].name) {
                                    labs[j].className = "DOTA_Radio DOTA_Radio_Off";
                                }
                            }
                        }
                    };
                })(i);
                //触发click事件,设置样式
                labs[i].onclick();
            }
        }
        //        if (!this.config.checked) {
        //            console.log("checked");
        //            labs[0].getElementsByTagName("input")[0].checked = true;
        //        }
    },
    dispose: function () {
    }
};
