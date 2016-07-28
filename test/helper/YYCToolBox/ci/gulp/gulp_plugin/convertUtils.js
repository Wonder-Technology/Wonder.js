var judgeUtils = require("./judgeUtils");
/**
 * 转换类型
 */
module.exports = (function () {
    var JSON = (function () {
        useHasOwn = ({}.hasOwnProperty ? true : false);
        m = {
            "\b": '\\b',
            "\t": '\\t',
            "\n": '\\n',
            "\f": '\\f',
            "\r": '\\r',
            '"': '\\"',
            "\\": '\\\\'
        };

        function pad(n) {
            return n < 10 ? "0" + n : n;
        };
        function encodeString(s) {
            if (/["\\\x00-\x1f]/.test(s)) {
                return '"' + s.replace(/([\x00-\x1f\\"])/g,
                        function (a, b) {
                            var c = m[b];
                            if (c) {
                                return c;
                            }
                            c = b.charCodeAt();
                            return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
                        }) + '"';
            }
            return '"' + s + '"';
        };
        function encodeArray(o) {
            var a = ["["], b, i, l = o.length, v;
            for (i = 0; i < l; i += 1) {
                v = o[i];
                switch (typeof v) {
                    case "undefined":
                    case "function":
                    case "unknown":
                        break;
                    default:
                        if (b) {
                            a.push(',');
                        }
                        a.push(v === null ? "null" : encode(v));
                        b = true;
                }
            }
            a.push("]");
            return a.join("");
        };
        function encodeDate(o) {
            return '"' + o.getFullYear() + "-" + pad(o.getMonth() + 1) + "-" + pad(o.getDate()) + "T" + pad(o.getHours()) + ":" + pad(o.getMinutes()) + ":" + pad(o.getSeconds()) + '"';
        };


        return {
            stringify: function (o) {
                if (typeof o == "undefined" || o === null) {
                    return "null";
                } else if (o instanceof Array) {
                    return encodeArray(o);
                } else if (o instanceof Date) {
                    return encodeDate(o);
                } else if (typeof o == "string") {
                    return encodeString(o);
                } else if (typeof o == "number") {
                    return isFinite(o) ? String(o) : "null";
                } else if (typeof o == "boolean") {
                    return String(o);
                } else {
                    var self = this;
                    var a = ["{"], b, i, v;
                    for (i in o) {
                        if (!useHasOwn || o.hasOwnProperty(i)) {
                            v = o[i];
                            switch (typeof v) {
                                case "undefined":
                                case "function":
                                case "unknown":
                                    break;
                                default:
                                    if (b) {
                                        a.push(',');
                                    }
                                    a.push(self.encode(i), ":", v === null ? "null" : self.encode(v));
                                    b = true;
                            }
                        }
                    }
                    a.push("}");
                    return a.join("");
                }
            },
            parse: function (json) {
                return eval("(" + json + ')');
            }
        }
    }());

    /**
     * 注意以下转换：
     var myBool = Boolean("false");  // == true
     var myBool = !!"false";  // == true
     */
    function _strToBool(str) {
        switch (str.toLowerCase()) {
            case "true":
            case "yes":
            case "1":
                return true;
            case "false":
            case "no":
            case "0":
            case null:
                return false;
            default:
                return Boolean(str);
        }
    }

    function _jqToString(jq) {
        var d = $("<div>");

        d.html(jq);

        return d.html();
    }

    // 将js代码转换为多行字符串
    // 示例：
    // _convertCodeToString(function () {/*
    // var a = {
    // func: function () {
    // }
    // };
    // */});
    function _convertCodeToString(fn) {
        return fn.toString().split('\n').slice(1, -1).join('\n') + '\n'
    }

    return {
        toNumber: function (obj) {
            return Number(obj);
        },
        /**
         * 转换为字符串
         *
         * 示例：
         * 如果参数为Object直接量（如json数据）或者数组，则使用json序列化为字符串
         expect(convert.toString({ a: 1 })).toEqual('{"a":1}');
         expect(convert.toString([1, "b"])).toEqual('[1,"b"]');
         *
         * jquery对象转换为string
         expect(convert.toString($("<div>a</div>"))).toEqual("<div>a</div>");
         *
         * 其余类型的参数转换为字符串
         *  expect(convert.toString(1)).toEqual("1");
         expect(convert.toString("a1")).toEqual("a1");
         expect(convert.toString(true)).toEqual("true");
         expect(convert.toString(null)).toEqual("null");

         * @param obj
         * @returns
         */
        toString: function (obj) {
            var judge = judgeUtils;

            if (judge.isNumber(obj)) {
                return String(obj);
            }

            //if (judge.isjQuery(obj)) {
            //    return _jqToString(obj);
            //}

            if (judge.isFunction(obj)) {
                return _convertCodeToString(obj);
            }

            if (judge.isDirectObject(obj) || judge.isArray(obj)) {
                if (global.JSON && global.JSON.stringify) {
                    return global.JSON.stringify(obj);
                }
                else {
                    return JSON.stringify(obj);
                }
            }

            return String(obj);
        },
        /**
         * 将json序列化的字符串再序列化为对象（不支持Date对象序列化）
         * 示例：
         *  expect(convert.toObject('{"a":1}')).toEqual({ a: 1 });
         expect(convert.toObject('[1,"b"]')).toEqual([1, "b"]);
         *
         * @param obj
         * @returns
         */
        toObject: function (obj) {
            var judge = judgeUtils;

            if (!judge.isString(obj)) {
                throw new Error("参数必须为字符串");
            }

            if (global.JSON && global.JSON.parse) {
                return global.JSON.parse(obj);
            }
            else {
                return JSON.parse(obj);
            }
        },
        toBoolean: function (obj) {
            var judge = judgeUtils;

            if (judge.isString(obj)) {
                return _strToBool(obj);
            }
            else {
                return Boolean(obj);
            }
        },
        /**
         * 转换为jquery对象
         * @param obj
         * @returns
         */
        toJquery: function (obj) {
            return $(obj);
        },
        /**
         * 转换为dom对象
         * @param obj
         * @returns
         */
        toDom: function (obj) {
            var judge = judgeUtils;

            //if (judge.isjQuery(obj)) {
            //    return obj[0];
            //}
            if (judge.isDom(obj)) {
                return obj;
            }
            else if (judge.isString(obj)) {
                return $(obj)[0];
            }
            else {
                throw new Error("参数必须为dom元素或jquery对象");
            }
        }
    }
}());

