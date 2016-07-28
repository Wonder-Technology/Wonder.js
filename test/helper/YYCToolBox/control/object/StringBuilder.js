/***********************************************
StringBuilder    v1.0 

作者：YYC
日期：2013-08-06
电子邮箱：395976266@qq.com
QQ: 395976266
博客：http://www.cnblogs.com/chaogex/

************************************************/
(function () {
    var StringBuilder = YYC.Class({
        Init: function () {
        },
        Private: {
            _array: []
        },
        Public: {
            append: function (str) {
                if (arguments.length > 1) {
                    var args = Array.prototype.slice.call(arguments, 0);

                    this._array.push(this.format.apply(this, args))
                }
                else {
                    this._array.push(str);
                }
            },
                format: function (s, pars) {
                    var i = 0, 
                        j = 0, 
                        len = 0,
                        args = null;
                    
                    if (!s) {
                        return "";
                    }
                    if (pars === null || pars === undefined) {
                        return s;
                    }

                    if (YYC.Tool.judge.isArray(pars)) {
                        args = pars;
                    }
                    else {
                        args = Array.prototype.slice.call(arguments, 1);
                    }

                    for (i = 0, len = args.length; i < len; i++) {
                        if (YYC.Tool.judge.isFunction(args[i])) {
                            s = s.replace(new RegExp("\\\{" + (j++) + "\\\}", "g"), YYC.Tool.func.getFunctionName(args[i]));
                        }
                        else {
                            s = s.replace(new RegExp("\\\{" + (j++) + "\\\}", "g"), args[i].toString());
                        }
                    }
                    return s;
                },
            toString: function (joinGap) {
                var gap = joinGap || "";

                return this._array.join(gap);
            },
            dispose: function () {
                this._array = null;
            }
        }
    });

    YYC.namespace("Control").StringBuilder = StringBuilder;
}());



/*

第一步

(function () {
    var StringBuilder = YYC.Class({
        Init: function () {
        },
        Private: {
            _array: []
        },
        Public: {
            append: function (str) {
                this._array.push(str);
            }
        }
    });

    YYC.namespace("Control").StringBuilder = StringBuilder;
}());

describe("StringBuilder.js", function () {
    var builder = null;

    beforeEach(function () {
        builder = new YYC.Control.StringBuilder();
    });

    describe("append", function () {
        it("将字符串加入到内部数组中", function () {
            builder.append("aaa");

            expect(builder._array[0]).toEqual("aaa");
        });
    });
});


第二步

(function () {
    var StringBuilder = YYC.Class({
        Init: function () {
        },
        Private: {
            _array: [],

            _format: function (s, pars) {
                if (!s) return "";  //如果s为空，则s=""
                if (pars === null || pars === undefined) return s;

                var i = 0, j = 0, len = 0;
                var args = null;

                if (YYC.Tool.judge.isArray(pars) && arguments.length === 2 && pars.length > 1) {
                    args = pars;
                }
                else {
                    args = Array.prototype.slice.call(arguments, 1);
                }

                for (i = 0, len = args.length; i < len; i++) {
                    if (YYC.Tool.judge.isFunction(args[i])) {
                        s = s.replace(new RegExp("\\\{" + (j++) + "\\\}", "g"), YYC.Tool.func.getFunctionName(args[i]));
                    }
                    else {
                        s = s.replace(new RegExp("\\\{" + (j++) + "\\\}", "g"), args[i].toString());
                    }
                }
                return s;
            }
        },
        Public: {
            append: function (str) {
                if (arguments.length > 1) {
                    var args = Array.prototype.slice.call(arguments, 0);

                    this._array.push(this._format.apply(this, args))
                }
                else {
                    this._array.push(str);
                }
            }
        }
    });

    YYC.namespace("Control").StringBuilder = StringBuilder;
}());

describe("StringBuilder.js", function () {
    var builder = null;

    beforeEach(function () {
        builder = new YYC.Control.StringBuilder();
    });

    describe("append", function () {
        it("将字符串加入到内部数组中", function () {
            builder.append("aaa");

            expect(builder._array[0]).toEqual("aaa");
        });
        it("加入的字符串可以使用模板", function () {
            builder.append("test:{0},{1}", "a", "b");

            expect(builder._array[0]).toEqual("test:a,b");
        });
    });
});


第三步
将_format公开

(function () {
    var StringBuilder = YYC.Class({
        Init: function () {
        },
        Private: {
            _array: []
        },
        Public: {
            append: function (str) {
                if (arguments.length > 1) {
                    var args = Array.prototype.slice.call(arguments, 0);

                    this._array.push(this.format.apply(this, args))
                }
                else {
                    this._array.push(str);
                }
            },
            format: function (s, pars) {
                if (!s) {
                    return "";
                }
                if (pars === null || pars === undefined) {
                    return s;
                }

                var i = 0, j = 0, len = 0;
                var args = null;

                if (YYC.Tool.judge.isArray(pars)) {
                    args = pars;
                }
                else {
                    args = Array.prototype.slice.call(arguments, 1);
                }

                for (i = 0, len = args.length; i < len; i++) {
                    if (YYC.Tool.judge.isFunction(args[i])) {
                        s = s.replace(new RegExp("\\\{" + (j++) + "\\\}", "g"), YYC.Tool.func.getFunctionName(args[i]));
                    }
                    else {
                        s = s.replace(new RegExp("\\\{" + (j++) + "\\\}", "g"), args[i].toString());
                    }
                }
                return s;
            }
        }
    });

    YYC.namespace("Control").StringBuilder = StringBuilder;
}());

describe("StringBuilder.js", function () {
    var builder = null;

    beforeEach(function () {
        builder = new YYC.Control.StringBuilder();
    });

    describe("append", function () {
        it("将字符串加入到内部数组中", function () {
            builder.append("aaa");

            expect(builder._array[0]).toEqual("aaa");
        });
        it("加入的字符串可以使用模板", function () {
            builder.append("test:{0},{1}", "a", "b");

            expect(builder._array[0]).toEqual("test:a,b");
        });
    });

    describe("format", function () {
        describe("参数验证", function () {
            it("如果没有任何参数，返回空字符串", function () {
                expect(builder.format()).toEqual("");
            });
            it("如果只有第一个参数（模板）没有第二个参数（对应的值），则返回第一个参数", function () {
                expect(builder.format("test{0}")).toEqual("test{0}");
            });
        });

        it("如果第二个参数为数组，则以第二个参数来填充模板", function () {
            expect(builder.format("test:{0},{1}", ["a", "b"])).toEqual("test:a,b");
            expect(builder.format("test:{0},{1},{2}", ["a", "b", "c"], "1")).toEqual("test:a,b,c");
        });
        it("否则以第二个参数及其后面的参数来填充模板", function () {
            expect(builder.format("test:{0},{1}", "a", "b")).toEqual("test:a,b");
        });
        it("如果第二个及其后的参数为函数委托，则用该函数的函数名来填充模板", function () {
            function func() { };

            expect(builder.format("test:{0},{1}", "a", func)).toEqual("test:a,func");
        });

        describe("用例测试", function () {
            it("当填充模板中函数的参数时，如果该参数为字符串，则要在模板中对该参数加上双引号", function () {
                function func() { };

                expect(builder.format("func({0},\"{1}\")", "1", "a")).toEqual("func(1,\"a\")");
            });
        });
    });


第四步
加入toString方法

(function () {
    var StringBuilder = YYC.Class({
        Init: function () {
        },
        Private: {
            _array: []
        },
        Public: {
            append: function (str) {
                if (arguments.length > 1) {
                    var args = Array.prototype.slice.call(arguments, 0);

                    this._array.push(this.format.apply(this, args))
                }
                else {
                    this._array.push(str);
                }
            },
            format: function (s, pars) {
                if (!s) {
                    return "";
                }
                if (pars === null || pars === undefined) {
                    return s;
                }

                var i = 0, j = 0, len = 0;
                var args = null;

                if (YYC.Tool.judge.isArray(pars)) {
                    args = pars;
                }
                else {
                    args = Array.prototype.slice.call(arguments, 1);
                }

                for (i = 0, len = args.length; i < len; i++) {
                    if (YYC.Tool.judge.isFunction(args[i])) {
                        s = s.replace(new RegExp("\\\{" + (j++) + "\\\}", "g"), YYC.Tool.func.getFunctionName(args[i]));
                    }
                    else {
                        s = s.replace(new RegExp("\\\{" + (j++) + "\\\}", "g"), args[i].toString());
                    }
                }
                return s;
            },
            toString: function (joinGap) {
                var gap = joinGap || "";

                return this._array.join(gap);
            }
        }
    });

    YYC.namespace("Control").StringBuilder = StringBuilder;
}());

describe("StringBuilder.js", function () {
    var builder = null;

    beforeEach(function () {
        builder = new YYC.Control.StringBuilder();
    });

    describe("append", function () {
        it("将字符串加入到内部数组中", function () {
            builder.append("aaa");

            expect(builder._array[0]).toEqual("aaa");
        });
        it("加入的字符串可以使用模板", function () {
            builder.append("test:{0},{1}", "a", "b");

            expect(builder._array[0]).toEqual("test:a,b");
        });
    });

    describe("format", function () {
        describe("参数验证", function () {
            it("如果没有任何参数，返回空字符串", function () {
                expect(builder.format()).toEqual("");
            });
            it("如果只有第一个参数（模板）没有第二个参数（对应的值），则返回第一个参数", function () {
                expect(builder.format("test{0}")).toEqual("test{0}");
            });
        });

        it("如果第二个参数为数组，则以第二个参数来填充模板", function () {
            expect(builder.format("test:{0},{1}", ["a", "b"])).toEqual("test:a,b");
            expect(builder.format("test:{0},{1},{2}", ["a", "b", "c"], "1")).toEqual("test:a,b,c");
        });
        it("否则以第二个参数及其后面的参数来填充模板", function () {
            expect(builder.format("test:{0},{1}", "a", "b")).toEqual("test:a,b");
        });
        it("如果第二个及其后的参数为函数委托，则用该函数的函数名来填充模板", function () {
            function func() { };

            expect(builder.format("test:{0},{1}", "a", func)).toEqual("test:a,func");
        });

        describe("用例测试", function () {
            it("当填充模板中函数的参数时，如果该参数为字符串，则要在模板中对该参数加上双引号", function () {
                function func() { };

                expect(builder.format("func({0},\"{1}\")", "1", "a")).toEqual("func(1,\"a\")");
            });
        });
    });

    describe("toString", function () {
        it("没有参数时，默认将数组元素连到一起返回字符串", function () {
            builder.append("1:{0}", "a");
            builder.append("2:{0}", "b");

            expect(builder.toString()).toEqual("1:a2:b");
        });
        it("有参数时，数组元素以参数为分隔符，返回字符串", function () {
            builder.append("1:{0}", "a");
            builder.append("2:{0}", "b");

            expect(builder.toString(",")).toEqual("1:a,2:b");
        });
    });
});


第5步
加入dispose

            dispose: function () {
                this._array = null;
            }

     describe("dispose", function () {
        it("释放内部数组", function () {
            builder.append("1:{0}", "a");
            builder.append("2:{0}", "b");

            builder.dispose();

            expect(builder._array).toBeNull();
        });
    });

});


*/