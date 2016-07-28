/***********************************************
 验证控件Validator    v1.0

 作者：YYC
 日期：2013-03-21
 电子邮箱：395976266@qq.com
 QQ: 395976266
 博客：http://www.cnblogs.com/chaogex/
 ************************************************/

/**使用实例：
 *
 *  var validator = new Validator("common"); //选择要使用的Method type
 *
 *  //dtest_input为显示错误信息的元素id，value为要验证的值，handler为调用的验证方法
 *  validator.validate({ dtest_input: { value: $("#test_input"), handler: "isNumber" } });
 *  //可指定错误信息message
 *  validator.validate({ dtest_input: { value: $("#test_input"), handler: "isNumber", message: "必须为数字" } });
 *  //可传入handler多个参数，用“*”隔开
 *  validator.validate({ dtest_input: { value: $("#test_input"), handler: "range*a*b" } });
 *  //可传入多个handler，用“|”隔开
 *  //value可以为jquery对象，也可以为值
 *  validator.validate({ dtest_input: { value: "10", handler: "isNumber|isEqual*10" } });
 *
 *  validator.showInfo();   //显示错误信息
 */
(function () {
    var isjQuery = function (ob) {
        if (!jQuery) {
            throw new Error("jQuery未定义！");
        }
        return ob instanceof jQuery;
    };

    var $break = {};

    //Array扩展forEach方法。
    //可抛出$break退出循环

    Array.prototype.forEach = function (fn, thisObj) {
        var scope = thisObj || window;
        try {
            for (var i = 0, j = this.length; i < j; ++i) {
                fn.call(scope, this[i], i, this);
            }
        }
        catch (e) {
            if (e !== $break) {
                throw e;
            }
        }
    };

    //*控件类

    var IValidator = YYC.Interface("validate", "hasError", "returnError", "showInfo", "dispose");

    var Validator = YYC.Class({ Interface: IValidator }, {
        Init: function (type, data) {
            this._method = factory.createMethodChildren(type);

            if (data) {
                this.validate(data);
                this.showInfo();
            }
        },
        Private: {
            _method: null,
            _arr_message: [],   //二维数组。如：[["输入不等！"]]
            _arr_total: [], //二维数组，第一个元素为span的ID值。如：[["edit_tel", "输入不等！"]]

            _checkData: function (data) {
                var i = null,
                    everyData = null,
                    self = this;

                for (i in data) {
                    if (data.hasOwnProperty(i)) {
                        everyData = data[i];

                        if (everyData.handler === undefined) {
                            throw new Error("handler必须存在");
                        }


                        if (!this._isCustomHandler(everyData)) {
                            if (everyData.value === undefined) {
                                throw new Error("value必须存在");
                            }

                            everyData.handler.split('|').forEach(function (el, i) {
                                if (self._method[el.split('*')[0]] === undefined) {
                                    throw new Error("hanler必须属于策略类的方法");
                                }
                            });
                        }
                    }
                }
            },
            _validateData: function (data) {
                var i = null,
                    handler = "",
                    self = this,
                    result = null,
                    message = [],
                    currentMesage = "",
                    total = [],
                    everyData = null;


                for (i in data) {
                    if (data.hasOwnProperty(i)) {   //防止遍历到Object.prototype上的方法
                        everyData = data[i];
                        message = [];
                        total = [];

                        total.push(i);

                        if (this._isCustomHandler(everyData)) {
                            if (everyData.message === undefined) {
                                throw new Error("不能缺少message属性");
                            }

                            if (!everyData.handler()) {
                                message.push(everyData.message);
                            }
                        }
                        else {
                            everyData.handler.split("|").forEach(function (el, i) {
                                result = self._method[el.split('*')[0]](everyData.value, el.split('*').slice(1));

                                if (!result.result) {
                                    //有指定的message
                                    if (everyData.message) {
                                        message.push(everyData.message);
                                        throw $break;
                                    }
                                    else {
                                        message.push(result.message);
                                        total.push(result.message);
                                    }
                                }
                            });
                        }
                        if (message.length !== 0) {
                            this._arr_message.push(message);
                            total.push(message[0]); //获得第一个错误信息
                        }

                        this._arr_total.push(total);
                    }
                }
            },
            _isCustomHandler: function (everyData) {
                return YYC.Tool.judge.isFunction(everyData.handler);
            }
        },
        Public: {
            validate: function (data) {
                if (arguments.length != 1) {
                    throw new Error("参数只能为1个");
                }

                this._checkData(data);
                this._validateData(data);
            },
            returnError: function () {
                return this._arr_message;
            },
            hasError: function () {
                return this._arr_message.length != 0;
            },
            showInfo: function () {
                var id = "";

                this._arr_total.forEach(function (el, i) {
                    id = el.shift();

                    if (el[0]) {
                        $("#" + id).html(el[0]);
                    }
                    else {
                        $("#" + id).html("");
                    }
                });
            },
            dispose: function () {
                this._arr_message = [];
                this._arr_total = [];
            }
        }
    });


    ////加载Method.js
//    new YYC.Control.JsLoader().add(YYC.Tool.path.getJsDir("Validator.js") + "Method.js").loadSync();


    YYC.namespace("Control").Validator = Validator;   //使用时创建实例


    //策略方法类
    (function () {
        //**父类

        var Method_Parent = YYC.AClass({
            Public: {
                Virtual: {
                    isNotEmpty: function (data) {
                        return data.length !== 0;
                    },
                    //        TestRegex: function (data, regex) {
                    //            return regex.test(data);
                    //        },

                    //是否为数字
                    isNumber: function (data) {
                        var regex = /^\d+$/;
                        return regex.test(data);
                    },
                    equal: function (data, target) {
                        return data === target;
                    }
                }
            },
            Abstract: {
                isTelephone: function (data) {
                },
                isChinese: function (data) {
                },
                lengthBetween: function (data, min, max) {
                },
                isNotInjectAttack: function (data) {
                }
            }
        });

        //**子类

        var Method_Common = YYC.Class(Method_Parent, {
            Init: function () {
            },
            Protected: {
                P_virtual_validate: function (data) {
                    if (arguments.length == 1) {
                        var result = null,
                            errorNum = 0,
                            self = this;

                        if (isjQuery(data)) {  //data为jquery对象
                            data.each(function () {
                                if (!self.base($(this).val())) {      //调用父类方法

                                    errorNum++;
                                    return false;
                                }
                            });
                            result = errorNum === 0 ? true : false;
                        }
                        else {
                            result = this.base(data);
                        }

                        return result;
                    }
                    else if (arguments.length == 2) {
                        var source = arguments[0],
                            target = arguments[1],
                            result = null,
                            errorNum = 0,
                            self = this;

                        if (isjQuery(source)) {  //data为jquery对象
                            source.each(function () {
                                if (!self.base($(this).val(), target)) {      //调用父类方法
                                    errorNum++;
                                    return false;
                                }
                            });
                            result = errorNum === 0 ? true : false;
                        }
                        else {
                            result = this.base(source, target);
                        }

                        return result;
                    }
                },
                P_abstract_validate: function (func, data) {
                    var result = null,
                        p = 0;

                    if (isjQuery(data)) {
                        data.each(function () {
                            var t = $(this);
                            t.val()
                            if (!func($(this).val())) {
                                p++;
                                return false;
                            }
                        });
                        result = p === 0 ? true : false;
                    }
                    else {
                        result = func(data);
                    }

                    return result;
                }
            },
            Public: {
                //* 期望的行为

                isNotEmpty: function (data) {
                    var result = this.P_virtual_validate(data);

                    return {
                        result: result,
                        message: "值不能为空"
                    }
                },
                isNumber: function (data) {
                    var result = this.P_virtual_validate(data);

                    return {
                        result: result,
                        message: "值必须为数字"
                    }
                },
                isTelephone: function (data) {
                    var result = this.P_abstract_validate(function (val) {
                        return /^\+*(\d+|(\d+-\d+)+)$/.test(val);
                    }, data);

                    return {
                        result: result,
                        message: "值必须为电话号码"
                    }
                },
                isChinese: function (data) {
                    //                reg.test($(this).val())
                    var result = this.P_abstract_validate(function (val) {
                        return /^[^u4e00-u9fa5]+$/.test(val);
                    }, data);

                    return {
                        result: result,
                        message: "值必须为中文"
                    }
                },
                //arr_target为参数数组
                equal: function (source, arr_target) {
                    var result = this.P_virtual_validate(source, arr_target[0]);

                    return {
                        result: result,
                        message: "输入不等"
                    }
                },
                lengthBetween: function (data, arr_value) {
                    var min = arr_value[0],
                        max = arr_value[1];

                    var result = this.P_abstract_validate(function (val) {
                        return val.length >= min && val.length <= max;
                    }, data);

                    return {
                        result: result,
                        message: "字数必须为" + min + "-" + max + "字"     //增加message属性
                    }
                },
                isNotInjectAttack: function (data) {
                    var regex = /select|update|delete|exec|count|'|"|=|;|>|<|%|&/ig;

                    var result = this.P_abstract_validate(function (val) {
                        return !regex.test(val)
                    }, data);

                    return {
                        result: result,
                        message: "不能含有非法字符"
                    }
                },
                isRegExp: function (data, regexArr, pattern) {
                    var regex = null,
                        result = null;

                    if (pattern) {
                        regex = new RegExp(regexArr[0], pattern);
                    }
                    else {
                        regex = new RegExp(regexArr[0]);
                    }

                    result = this.P_abstract_validate(function (val) {
                        return regex.test(val);
                    }, data);

                    return {
                        result: result,
                        message: "正则不匹配"
                    }
                }
            }
        });


        var Method_Cos = YYC.Class(Method_Common, {
            Init: function () {
            },
            Private: {
            },
            Public: {
                isNumber: function (data) {
                    var result = this.P_abstract_validate(function (val) {
                        return /(^\d+$)|(^\d+\.*\d+$)/.test(val);
                    }, data);

                    return {
                        result: result,
                        message: "请输入数字"
                    }
                },
                range: function (data, arr_value) {
                    var convert = YYC.Tool.convert;

                    var min = convert.toNumber(arr_value[0]),
                        max = convert.toNumber(arr_value[1]),
                        flagMin = convert.toBoolean(arr_value[2]),
                        flagMax = convert.toBoolean(arr_value[3]);

                    var result = this.P_abstract_validate(function (val) {
                        if (flagMin && flagMax) {
                            return val <= max && val >= min;
                        }
                        else if (flagMin) {
                            return val < max && val >= min;
                        }
                        else if (flagMax) {
                            return val <= max && val > min;
                        }
                        else {
                            return val < max && val > min;
                        }
                    }, data);

                    return {
                        result: result,
                        message: "请输入在" + min + "-" + max + "范围内的数字"
                    }
                },
                lessThan: function (data, arr_target) {
                    var result = this.P_abstract_validate(function (val) {
                        return val < arr_target[0];
                    }, data);

                    return {
                        result: result,
                        message: "请输入小于" + arr_target[0] + "的数字"
                    }
                },
                greaterThan: function (data, arr_target) {
                    var result = this.P_abstract_validate(function (val) {
                        return val > arr_target[0];
                    }, data);

                    return {
                        result: result,
                        message: "请输入大于" + arr_target[0] + "的数字"
                    }
                }
            }
        });


        YYC.namespace("Control.Validator").Method_Common = Method_Common;
        YYC.namespace("Control.Validator").Method_Cos = Method_Cos;
    }());


    //*工厂（创建策略方法子类）
    var factory = {
        createMethodChildren: function (type) {
            switch (type) {
                case "common":
                    return new YYC.Control.Validator.Method_Common();
                    break;
                case "cos":
                    return new YYC.Control.Validator.Method_Cos();
                    break;
                default:
//                    throw new Error("参数必须为子类类型码");
//                    break;
                    return new YYC.Control.Validator.Method_Common();
                    break;
            }
        }
    };
}());



