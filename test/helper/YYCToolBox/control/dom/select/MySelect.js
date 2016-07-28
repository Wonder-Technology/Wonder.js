/***********************************************
Select控件（创建Select）

作者：YYC
日期：
电子邮箱：395976266@qq.com
QQ: 395976266
博客：http://www.cnblogs.com/chaogex/

************************************************/


//        old_value = $(this).val();
//        //初始化select
//        option = [["HOME", "住宅"], ["WORK", "单位"], ["OTHER", "其他"]];
//        //此处要用闭包保存old_value的值
//        (function (value) {
//            onChange = function (e) {
//                if (self.CheckADRType(e)) {
//                    alert("地址类型不能重复！");
//                    //e.preventDefault();不能阻止值的改变！
//                    $(e.target).val(value);
//                }
//            };
//        } (old_value));
//        //创建select控件
//        new YYC.Control.Select({
//            option: option,
//            selected: old_value,
//            onChange: onChange
//        }).renderTo($(this).parent());


//if (typeof YYC == "undefined" || !YYC) {
//    window.YYC = {};
//}

YYC.namespace("Control").Select = YYC.Class({
    Init: function (_config) {
        this._config = YYC.Tool.extend.extend({
            id: "",     //下拉框的id
            option: null,   //下拉框的option项，为二维数组，形如[[value, text]]或[[value, text, selected]]
            selected: "",   //选中指定项。该项可以为index（number）或者value（string）
            multiple: false,    //是否多选
            position: "",
            left: 0,
            top: 0,
            className: "select1",
            value: [],  //传给onChange的参数
            onChange: function (e) { }
        }, _config || {});

        //验证配置
        this._validate();

        this._buildSelect();
    },
    Private: {
        _config: {},
        _select: null,

        _buildSelect: function () {
            var s = this._select = $("<select/>"),
                c = this._config,
                evt = YYC.Tool.event,
                option = "";

            s.attr("className", c.className);

            c.id && s.attr("id", c.id);

            c.multiple && s.attr("multiple", "multiple");

            if (c.position) {
                s.attr({ "position": c.position, "left": c.left, "top": c.top });
            }

            option = this._createOption();

            s.html(option);

            c.selected && s.val(c.selected);

            //            alert(c.onChange);
            //绑定事件
            //                        this._onChange = evt.bindEvent(this, this._onChange, c.value);  //传入参数c.value



            //                        evt.addEvent(s, "change", evt.bindEvent(this, c.onChange, c.value)); 


//            //传入参数c.value
//            //注意此处为this._onChange而不是直接用c.onChange，因为这样可以防止配置文件中的onChange可以用this直接调用YYC.namespace("Control").Select类中的成员，
//            //这样会破坏封装！
//            evt.addEvent(s, "change", evt.bindEvent(this, this._onChange, c.value));

            this._onChange = evt.bindEvent(this, function (e) {
                this._config.onChange(e);
            }, c.value)

            evt.addEvent(s, "change", this._onChange);

            //            s.onchange = function () {
            //                alert("!!!");
            //            };
            //            alert(this._onChange);
            //            var t = 0;
        },
        //创建option，返回option(string)
        _createOption: function () {
            var i = 0,
                len = 0,
                c = this._config,
                str = "";

            for (i = 0, len = c.option.length; i < len; i++) {
                //+'">' + c.option[i][1] + '</option>';
                str += "<option value=\"" + c.option[i][0] + "\"";
                //如果该项为选中，则选中
                if (c.option[i][2]) {
                    str += " selected=\"selected\"";
                }
                str += ">" + c.option[i][1] + "</option>";
            }
            //            console.log("option str = " + str);
            return str;
        },
        _validate: function () {
        },
        _onChange: function (e) {
//            this._config.onChange(e);
        }
    },
    Public: {
        renderTo: function (container) {
            YYC.Tool.selector.$(container).append(this._select);
        },
        dispose: function () {
            var s = this._select,
                evt = YYC.Tool.event;

            evt.removeEvent(s, "change", this._onChange);

            s.remove();
        }
    }
});
