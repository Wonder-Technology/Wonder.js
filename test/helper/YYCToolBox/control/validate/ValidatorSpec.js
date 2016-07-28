describe("Validate.js", function () {
    var Validator = YYC.Control.Validator,
        validator = null;

    function insertDom() {
        var dom = $("<div id='test' style='display:none;'><input type='text' id='test_input' value='a' /><span id='dtest_input'></span></div>")
        $("body").append(dom);
    };
    function removeDom() {
        $("#test").remove();
    };
    beforeEach(function () {
        validator = new Validator("common");
    });

    afterEach(function () {
    });

    it("使用时要创建实例", function () {
        //实例没有prototype属性，而类（函数）有prototype属性
        expect(new Validator().prototype).toBeUndefined();
    });


    describe("Init", function () {
        it("构造函数参数不是“策略方法子类名”时创建默认策略方法子类", function () {
            expect(new Validator()._method).toBeDefined();
        });
        it("如果第二个参数data不为undefined，则调用validate和showInfo", function () {
        });
    });



    //*通过公有API（validate）来测试Method_Common类！

    //    describe("验证Method_Common类", function () {
    //        beforeEach(function () {
    //            validator = new Validator("common");
    //        });

    //        afterEach(function () {
    //        });

    //        describe("isNotEmpty", function () {
    //            beforeEach(function () {
    //                insertDom();
    //            });

    //            afterEach(function () {
    //                removeDom();
    //            });

    //            it("data为jquery对象 -> 空", function () {
    //                $("#test_input").val("");
    //                var result = validator._method.isNotEmpty($("#test_input"));

    //                expect(result.result).toBeFalsy();
    //            });
    //            it("data为jquery对象 -> 非空", function () {
    //                $("#test_input").val("a");
    //                //                var result = validator.validate({ dtest_input: { value: $("#test_input"), handler: "isNotEmpty"} });
    //                var result = validator._method.isNotEmpty($("#test_input"));

    //                expect(result.result).toBeTruthy();
    //            });
    //            it("data为string字符串 -> 空", function () {
    //                //                var result = validator.validate({ dtest_input: { value: "", handler: "isNotEmpty"} });
    //                var result = validator._method.isNotEmpty("");

    //                //                expect(result[0]).toEqual("值不能为空");
    //                expect(result.result).toBeFalsy();
    //            });
    //            it("data为string字符串 -> 非空", function () {
    //                //                var result = validator.validate({ dtest_input: { value: "a", handler: "isNotEmpty"} });
    //                var result = validator._method.isNotEmpty("a");

    //                //                expect(result.length).toEqual(0);
    //                expect(result.result).toBeTruthy();
    //            });
    //        });

    //        describe("isNumber", function () {
    //            beforeEach(function () {
    //                insertDom();
    //            });

    //            afterEach(function () {
    //                removeDom();
    //            });

    //            it("data为jquery对象 -> 非数字", function () {
    //                //                $("#test_input").val("a");
    //                //                var result = validator.validate({ dtest_input: { value: $("#test_input"), handler: "isNumber"} });

    //                //                expect(result[0]).toEqual("值必须为数字");

    //                $("#test_input").val("a");
    //                var result = validator._method.isNumber($("#test_input"));

    //                expect(result.result).toBeFalsy();

    //            });
    //            it("data为jquery对象 -> 数字", function () {
    //                //                $("#test_input").val("1");
    //                //                result = validator.validate({ dtest_input: { value: $("#test_input"), handler: "isNumber"} });

    //                //                expect(result.length).toEqual(0);

    //                $("#test_input").val("1");
    //                var result = validator._method.isNumber($("#test_input"));

    //                expect(result.result).toBeTruthy();
    //            });
    //            it("data为number类型 -> 非数字", function () {
    //                //                var result = validator.validate({ dtest_input: { value: "a", handler: "isNumber"} });

    //                //                expect(result[0]).toEqual("值必须为数字");
    //                var result = validator._method.isNumber("a");

    //                expect(result.result).toBeFalsy();

    //            });
    //            it("data为number类型 -> 数字", function () {
    //                //                var result = validator.validate({ dtest_input: { value: "1", handler: "isNotEmpty"} });

    //                //                expect(result.length).toEqual(0);

    //                var result = validator._method.isNumber(1);

    //                expect(result.result).toBeTruthy();
    //            });
    //        });

    //        describe("isTelephone", function () {
    //            beforeEach(function () {
    //                insertDom();
    //            });

    //            afterEach(function () {
    //                removeDom();
    //            });

    //            it("data为jquery对象 -> 非电话号码", function () {
    //                //                $("#test_input").val("a");
    //                //                var result = validator.validate({ dtest_input: { value: $("#test_input"), handler: "isTelephone"} });

    //                //                expect(result[0]).toEqual("值必须为电话号码");
    //                $("#test_input").val("a");
    //                var result = validator._method.isTelephone($("#test_input"));

    //                expect(result.result).toBeFalsy();
    //            });
    //            it("data为jquery对象 -> 电话号码", function () {
    //                //                $("#test_input").val("1");
    //                //                result = validator.validate({ dtest_input: { value: $("#test_input"), handler: "isTelephone"} });

    //                //                expect(result.length).toEqual(0);
    //                $("#test_input").val("1");
    //                var result = validator._method.isTelephone($("#test_input"));

    //                expect(result.result).toBeTruthy();
    //            });
    //            it("data为number类型 -> 非电话号码", function () {
    //                //                var result = validator.validate({ dtest_input: { value: "a", handler: "isTelephone"} });

    //                //                expect(result[0]).toEqual("值必须为电话号码");
    //                var result = validator._method.isTelephone("123a");

    //                expect(result.result).toBeFalsy();
    //            });
    //            it("data为number类型 -> 电话号码", function () {
    //                //                var result = validator.validate({ dtest_input: { value: "1", handler: "isTelephone"} });

    //                //                expect(result.length).toEqual(0);
    //                var result = validator._method.isTelephone("+123-22");

    //                expect(result.result).toBeTruthy();
    //            });
    //        });

    //        describe("isChinese", function () {
    //            beforeEach(function () {
    //                insertDom();
    //            });

    //            afterEach(function () {
    //                removeDom();
    //            });

    //            it("data为jquery对象 -> 非中文", function () {
    //                $("#test_input").val("a");
    //                var result = validator._method.isChinese($("#test_input"));

    //                $("#test_input").val("a啊");
    //                var result2 = validator._method.isChinese($("#test_input"));


    //                expect(result.result).toBeFalsy();
    //                expect(result2.result).toBeFalsy();
    //            });
    //            it("data为jquery对象 -> 中文", function () {
    //                $("#test_input").val("中国");
    //                var result = validator._method.isChinese($("#test_input"));

    //                expect(result.result).toBeTruthy();
    //            });
    //            it("data为string类型 -> 非中文", function () {
    //                var result = validator._method.isChinese("123a");

    //                expect(result.result).toBeFalsy();
    //            });
    //            it("data为string类型 -> 中文", function () {
    //                var result = validator._method.isChinese("中国");

    //                expect(result.result).toBeTruthy();
    //            });
    //        });

    //        describe("equal", function () {
    //            beforeEach(function () {
    //                insertDom();
    //            });

    //            afterEach(function () {
    //                removeDom();
    //            });

    //            it("data为jquery对象 -> 不等", function () {
    //                $("#test_input").val("1");
    //                var result = validator._method.equal($("#test_input"), "f");
    //                result2 = validator._method.equal($("#test_input"), 1);


    //                expect(result.result).toBeFalsy();
    //                expect(result2.result).toBeFalsy();
    //            });
    //            it("data为jquery对象 -> 等", function () {
    //                $("#test_input").val("1");
    //                var result = validator._method.equal($("#test_input"), "1");

    //                expect(result.result).toBeTruthy();
    //            });
    //            it("data不为jquery对象 -> 不等", function () {
    //                var result = validator._method.equal("1", 1);
    //                result2 = validator._method.equal("1", "aa");

    //                expect(result.result).toBeFalsy();
    //                expect(result2.result).toBeFalsy();
    //            });
    //            it("data不为jquery对象 -> 等", function () {
    //                var result = validator._method.equal("1", "1");

    //                expect(result.result).toBeTruthy();
    //            });
    //        });

    //        describe("lengthBetween", function () {
    //            beforeEach(function () {
    //                insertDom();
    //            });

    //            afterEach(function () {
    //                removeDom();
    //            });

    //            it("data为jquery对象 -> 长度超出范围", function () {
    //                $("#test_input").val("aa");
    //                var result = validator._method.lengthBetween($("#test_input"), [3, 5]);

    //                $("#test_input").val("a啊");
    //                var result2 = validator._method.lengthBetween($("#test_input"), [0, 1]);


    //                expect(result.result).toBeFalsy();
    //                expect(result2.result).toBeFalsy();
    //            });
    //            it("data为jquery对象 -> 长度在范围内", function () {
    //                $("#test_input").val("中国");
    //                var result = validator._method.lengthBetween($("#test_input"), [1, 2]);

    //                expect(result.result).toBeTruthy();
    //            });
    //            it("data为string类型 -> 长度超出范围", function () {
    //                var result = validator._method.lengthBetween("aa", [3, 5]);
    //                var result2 = validator._method.lengthBetween("aa", [0, 1]);


    //                expect(result.result).toBeFalsy();
    //                expect(result2.result).toBeFalsy();
    //            });
    //            it("data为string类型 -> 长度在范围内", function () {
    //                var result = validator._method.lengthBetween("中国", [1, 2]);

    //                expect(result.result).toBeTruthy();
    //            });
    //        });
    //    });

    //    describe("_checkData", function () {



    //        beforeEach(function () {
    //            insertDom();
    //            validator = new Validator("common");
    //            //            //不执行_validate方法
    //            //            spyOn(validator, "_validate").andCallFake(function () {
    //            //            });

    //        });

    //        afterEach(function () {
    //            removeDom();
    //        });

    //        it("参数data -> value属性不存在时抛出异常", function () {
    //            var func1 = testTool.bindWithArguments(validator, validator._checkData, { dtest_input: { handler: ""} }),
    //                            func2 = testTool.bindWithArguments(validator, validator._checkData, { dtest_input: {} });

    //            expect(func1).toThrow();
    //            expect(func2).toThrow();
    //        });
    //        it("参数data -> handler属性不存在时抛出异常", function () {
    //            var func1 = testTool.bindWithArguments(validator, validator._checkData, { dtest_input: { value: $("#test_input")} }),
    //                            func2 = testTool.bindWithArguments(validator, validator._checkData, { dtest_input: {} });

    //            expect(func1).toThrow();
    //            expect(func2).toThrow();
    //        });
    //        it("参数data -> handler属性不属于策略类方法时抛出异常", function () {
    //            var func = testTool.bindWithArguments(validator, validator._checkData, { dtest_input: { value: $("#test_input"), handler: "a"} });

    //            expect(func).toThrow();
    //        });
    //        it("参数data -> value、handler属性都存在时不抛出异常", function () {
    //            var func = testTool.bindWithArguments(validator, validator._checkData, { dtest_input: { value: $("#test_input"), handler: "isNumber"} });

    //            expect(func).not.toThrow();
    //        });
    //        //            it("参数data -> value属性为jquery对象时不抛出异常", function () {
    //        //                var func = testTool.bindWithArguments(validator, validator._checkData, { dtest_input: { value: $("#test_input"), handler: ""} });

    //        //                expect(func).not.toThrow();
    //        //            });
    //        //            it("参数data -> value属性为dom对象时抛出异常", function () {
    //        //                var func = testTool.bindWithArguments(validator, validator._checkData, { dtest_input: { value: document.getElementById("test"), handler: ""} });

    //        //                expect(func).toThrow();
    //        //            });
    //    });

    describe("returnError", function () {
        beforeEach(function () {
            insertDom();
            validator = new Validator("common");
        });

        afterEach(function () {
            removeDom();
            //            validator.dispose();
            //            console.log("after");
        });

        it("方法存在", function () {
            expect(validator.returnError).toBeDefined();
        });
        it("有错误时，返回二维数组", function () {
            $("#test_input").val("");

            validator.validate({ dtest_input: { value: $("#test_input"), handler: "isNotEmpty" } });
            var error = validator.returnError();

            expect(error).toEqual([["值不能为空"]]);
        });
        it("没有错误时，返回空数组", function () {
            $("#test_input").val("1");

            validator.validate({ dtest_input: { value: $("#test_input"), handler: "isNotEmpty" } });
            var error = validator.returnError();

            expect(error).toEqual([]);
        });
    });

    describe("validate", function () {
        beforeEach(function () {
            insertDom();
            validator = new Validator("common");
        });

        afterEach(function () {
            removeDom();
            //            validator.dispose();
            //            console.log("after");
        });

        it("方法存在", function () {
            expect(validator.validate).toBeDefined();
        });

        it("参数多于一个时抛出异常", function () {
            var func = testTool.bindWithArguments(validator, validator.validate, 1, 2);

            expect(func).toThrow();
        });
        it("参数为空时抛出异常", function () {
            var func = testTool.bindWithArguments(validator, validator.validate);

            expect(func).toThrow();
        });


        describe("检查参数", function () {
            beforeEach(function () {
                insertDom();
                validator = new Validator("common");
            });

            afterEach(function () {
                removeDom();
                //            validator.dispose();
                //            console.log("after");
            });

            it("参数data -> value属性不存在时抛出异常", function () {
                var func1 = testTool.bindWithArguments(validator, validator.validate, { dtest_input: { handler: "" } }),
                    func2 = testTool.bindWithArguments(validator, validator.validate, { dtest_input: {} });

                expect(func1).toThrow();
                expect(func2).toThrow();
            });
            it("参数data -> handler属性不存在时抛出异常", function () {
                var func1 = testTool.bindWithArguments(validator, validator.validate, { dtest_input: { value: $("#test_input") } }),
                    func2 = testTool.bindWithArguments(validator, validator.validate, { dtest_input: {} });

                expect(func1).toThrow();
                expect(func2).toThrow();
            });
            it("参数data -> handler属性不属于策略类方法时抛出异常", function () {
                var func = testTool.bindWithArguments(validator, validator.validate, { dtest_input: { value: $("#test_input"), handler: "a" } });

                expect(func).toThrow();
            });
            //it("参数data -> value、handler属性都存在时不抛出异常，继续执行后面语句（调用_validateData）", function () {
            //    spyOn(validator, "_validateData");
            //    var func = testTool.bindWithArguments(validator, validator.validate, { dtest_input: { value: $("#test_input"), handler: "isNumber"} });

            //    //判断_validateData是否被调用
            //    expect(validator._validateData).not.toHaveBeenCalled();
            //});
        });

        describe("验证value", function () {
            function build(value, handler) {
                $("#test_input").val(value);
                validator.validate({ dtest_input: { value: $("#test_input"), handler: handler } });
            }

            function message(value, handler) {
                build(value, handler);
                return validator._arr_message;
            };
            function total(value, handler) {
                build(value, handler);
                return validator._arr_total;
            };

            beforeEach(function () {
                insertDom();
                validator = new Validator("common");
            });

            afterEach(function () {
                removeDom();
                //            validator.dispose();
                //            console.log("after");
            });

            it("参数data的handler属性为单个处理函数（不带参数） -> 出现错误时验证message数组", function () {
                //            var result = null;
                //            var validator = new Validator("common");
                //            $("#test_input").val("aaaa");
                //            validator.validate({ dtest_input: { value: $("#test_input"), handler: "isNumber"} });
                var result = message("aaa", "isNumber");

                //期望_arr_message为二维数组
                expect(result).toBeArray();
                expect(result[0]).toBeArray();
                //期望_arr_message为正确的信息
                expect(result[0][0]).toEqual("值必须为数字");
                //            console.log(validator._arr_message);
                //            validator.dispose();
                //            console.log(validator._arr_message);
            });
            it("参数data的handler属性为单个处理函数（不带参数） -> 不出现错误时验证message数组", function () {
                var result = message("1", "isNumber");

                expect(result).toBeArray();
                expect(result.length).toEqual(0);
            });
            it("参数data的handler属性为单个处理函数（不带参数） -> 出现错误时验证total数组", function () {
                var result = total("aaa", "isNumber");

                //期望_arr_total为二维数组
                expect(result).toBeArray();
                expect(result[0]).toBeArray();
                //期望_arr_total为正确的信息
                expect(result[0][0]).toEqual("dtest_input");
                expect(result[0][1]).toEqual("值必须为数字");
            });
            it("参数data的handler属性为单个处理函数（不带参数） -> 不出现错误时验证total数组", function () {
                var result = total("1", "isNumber");

                expect(result).toBeArray();
                expect(result[0].length).toEqual(1);
            });
            it("参数data的handler属性为单个处理函数（带参数） -> 出现错误时验证message数组", function () {
                var result = message("aaa", "equal*b");

                //期望_arr_message为二维数组
                expect(result).toBeArray();
                expect(result[0]).toBeArray();
                //期望_arr_message为正确的信息
                expect(result[0][0]).toEqual("输入不等");
            });
            it("参数data的handler属性为单个处理函数（带参数） -> 不出现错误时验证message数组", function () {
                var result = message("aaa", "equal*aaa");

                expect(result).toBeArray();
                expect(result.length).toEqual(0);
            });
            it("参数data的handler属性为单个处理函数（带参数） -> 出现错误时验证total数组", function () {
                var result = total("aaa", "equal*bbb");

                //期望_arr_total为二维数组
                expect(result).toBeArray();
                expect(result[0]).toBeArray();
                //期望_arr_total为正确的信息
                expect(result[0][0]).toEqual("dtest_input");
                expect(result[0][1]).toEqual("输入不等");
            });
            it("参数data的handler属性为单个处理函数（带参数） -> 不出现错误时验证total数组", function () {
                var result = total("aaa", "equal*aaa");

                expect(result).toBeArray();
                expect(result[0].length).toEqual(1);
            });
            it("参数data的handler属性为多个处理函数（不带参数） -> 出现错误时验证message数组", function () {
                var result = message("aaa", "isNumber|isChinese");

                expect(result).toBeArray();
                expect(result[0][0]).toEqual("值必须为数字");
                expect(result[0][1]).toEqual("值必须为中文");
            });
            it("参数data的handler属性为多个处理函数（不带参数） -> 不出现错误时验证message数组", function () {
                var result = message("1", "isNumber|isNotEmpty");

                expect(result).toBeArray();
                expect(result.length).toEqual(0);
            });
            it("参数data的handler属性为多个处理函数（不带参数） -> 出现错误时验证total数组", function () {
                var result = total("aaa", "isNumber|isChinese");

                expect(result).toBeArray();
                expect(result[0]).toBeArray();
                expect(result[0][0]).toEqual("dtest_input");
                expect(result[0][1]).toEqual("值必须为数字");
                expect(result[0][2]).toEqual("值必须为中文");
            });
            it("参数data的handler属性为多个处理函数（不带参数） -> 不出现错误时验证total数组", function () {
                var result = total("1", "isNumber|isNotEmpty");

                expect(result).toBeArray();
                expect(result[0].length).toEqual(1);
            });
            it("参数data的handler属性为多个处理函数（带参数） -> 出现错误时验证message数组", function () {
                var result = message("aaa", "isNumber|equal*b");

                expect(result).toBeArray();
                expect(result[0][0]).toEqual("值必须为数字");
                expect(result[0][1]).toEqual("输入不等");
            });
            it("参数data的handler属性为多个处理函数（带参数） -> 不出现错误时验证message数组", function () {
                var result = message("1", "isNumber|equal*1");

                expect(result).toBeArray();
                expect(result.length).toEqual(0);
            });
            it("参数data的handler属性为多个处理函数（带参数） -> 出现错误时验证total数组", function () {
                var result = total("aaa", "isNumber|equal*1");

                expect(result).toBeArray();
                expect(result[0]).toBeArray();
                expect(result[0][0]).toEqual("dtest_input");
                expect(result[0][1]).toEqual("值必须为数字");
                expect(result[0][2]).toEqual("输入不等");
            });
            it("参数data的handler属性为多个处理函数（带参数） -> 不出现错误时验证total数组", function () {
                var result = total("1", "isNumber|equal*1");

                expect(result).toBeArray();
                expect(result[0].length).toEqual(1);
            });
        });

        it("指定message后，如果有1个错误，则保存指定的错误", function () {
            $("#test_input").val("");

            validator.validate({ dtest_input: { value: $("#test_input"), handler: "isNotEmpty", message: "错误" } });
            expect(validator.returnError()).toEqual([["错误"]]);
        });
        it("指定了message后，如果有多个错误，则只保存指定的错误（一个）", function () {
            $("#test_input").val("");

            validator.validate({ dtest_input: { value: $("#test_input"), handler: "isNotEmpty|isNumber", message: "错误" } });
            expect(validator.returnError()).toEqual([["错误"]]);
        });

        describe("支持自定义handler", function () {
            it("handler返回true，则通过", function () {
                $("#test_input").val("1");

                validator.validate({
                    dtest_input: {
                        handler: function () {
                            return Number($("#test_input").val()) < 2;
                        },
                        message: "数字必须小于2"
                    }
                });

                expect(validator.hasError()).toBeFalsy();
            });
            it("handler返回false，则有错误", function () {
                $("#test_input").val("3");

                validator.validate({
                    dtest_input: {
                        handler: function () {
                            return Number($("#test_input").val()) < 2;
                        },
                        message: "数字必须小于2"
                    }
                });

                validator.showInfo();

                expect(validator.hasError()).toBeTruthy();
                expect($("#dtest_input").text()).toEqual("数字必须小于2");
            });
            it("如果没有message属性，则抛出错误", function () {
                expect(function () {
                    validator.validate({
                        dtest_input: {
                            handler: function () {
                                return 1 < 2;
                            }
                        }
                    });
                }).toThrow();
            });
        });
    });


    describe("hasError", function () {
        var t = "";
        beforeEach(function () {
            insertDom();
            //            console.log("hasError");
            //            //            console.log(t._arr_message);
            //            var m = Validator;

            validator = new Validator("common");
            //            console.log(t._arr_message);
        });

        afterEach(function () {
            removeDom();
        });

        it("方法存在", function () {
            expect(validator.hasError).toBeDefined();
        });
        it("错误信息数组为空时，返回false", function () {
            var result = null;

            $("#test_input").val("1");
            validator.validate({ dtest_input: { value: $("#test_input"), handler: "isNumber" } });
            result = validator.hasError();

            expect(result).toBeFalsy();
        });
        it("错误信息数组不为空时，返回true", function () {
            var result = null;

            $("#test_input").val("aa");
            validator.validate({ dtest_input: { value: $("#test_input"), handler: "isNumber" } });
            result = validator.hasError();

            expect(result).toBeTruthy();
        });
    });

    describe("showInfo", function () {
        beforeEach(function () {
            insertDom();
            validator = new Validator("common");
        });

        afterEach(function () {
            removeDom();
        });

        it("方法存在", function () {
            expect(validator.showInfo).toBeDefined();
        });
        it("单个错误信息 -> span显示单个错误信息", function () {
            validator._arr_total = [["dtest_input", "输入不等"]];

            validator.showInfo();

            expect($("#dtest_input").html()).toEqual("输入不等");
        });
        it("多个错误信息 -> span显示第一条错误信息", function () {
            validator._arr_total = [["dtest_input", "输入不等", "值不能为空"]];

            validator.showInfo();

            expect($("#dtest_input").html()).toEqual("输入不等");
        });
        it("如果没有错误，则span显示空字符串", function () {
            $("#dtest_input").html("aaa");

            validator._arr_total = [["dtest_input"]];

            validator.showInfo();

            expect($("#dtest_input").html()).toEqual("");
        });
    });

    describe("dispose", function () {
        it("方法存在", function () {
            expect(validator.dispose).toBeDefined();
        });
        it("_arr_message为空数组", function () {
            validator._arr_message = [["test"]];

            validator.dispose();

            expect(validator._arr_message.length).toEqual(0);
        });
        it("_arr_total为空数组", function () {
            validator._arr_total = [["test"]];

            validator.dispose();

            expect(validator._arr_total.length).toEqual(0);
        });
    });
});