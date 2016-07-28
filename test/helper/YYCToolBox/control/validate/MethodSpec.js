describe("Method_Common", function () {
    //var validator;
    ////不直接调用validator.correct()，因为如果validator.hasError修改了，则会发生错误！


    //function correct() {
    //    return validator._arr_message.length == 0;
    //};

    //beforeEach(function () {
    //    validator = new YYC.Control.Validator("common");
    //});

    //afterEach(function () {
    //});

    //describe("isNotEmpty", function () {

    //    beforeEach(function () {
    //        insertDom();
    //    });

    //    afterEach(function () {
    //        removeDom();
    //    });

    //    it("data为jquery对象 -> 空", function () {
    //        $("#test_input").val("");
    //        //                var result = validator.validate({ dtest_input: { value: $("#test_input"), handler: "isNotEmpty"} });
    //        validator.validate({ dtest_input: { value: $("#test_input"), handler: "isNotEmpty" } });
    //        expect(correct()).toBeFalsy();
    //    });
    //    it("data为jquery对象 -> 非空", function () {
    //        $("#test_input").val("a");
    //        validator.validate({ dtest_input: { value: $("#test_input"), handler: "isNotEmpty" } });

    //        expect(correct()).toBeTruthy();
    //    });
    //    it("data为string字符串 -> 空", function () {
    //        //                var result = validator.validate({ dtest_input: { value: "", handler: "isNotEmpty"} });
    //        validator.validate({ dtest_input: { value: "", handler: "isNotEmpty" } });

    //        //                expect(result[0]).toEqual("值不能为空");
    //        expect(correct()).toBeFalsy();
    //    });
    //    it("data为string字符串 -> 非空", function () {
    //        //                var result = validator.validate({ dtest_input: { value: "a", handler: "isNotEmpty"} });
    //        validator.validate({ dtest_input: { value: "a", handler: "isNotEmpty" } });

    //        //                expect(result.length).toEqual(0);
    //        expect(correct()).toBeTruthy();
    //    });
    //});

    //describe("isNumber", function () {
    //    beforeEach(function () {
    //        insertDom();
    //    });

    //    afterEach(function () {
    //        removeDom();
    //    });

    //    it("data为jquery对象 -> 非数字", function () {
    //        //                $("#test_input").val("a");
    //        //                var result = validator.validate({ dtest_input: { value: $("#test_input"), handler: "isNumber"} });

    //        //                expect(result[0]).toEqual("值必须为数字");

    //        $("#test_input").val("a");
    //        validator.validate({ dtest_input: { value: $("#test_input"), handler: "isNumber" } });

    //        expect(correct()).toBeFalsy();

    //    });
    //    it("data为jquery对象 -> 数字", function () {
    //        //                $("#test_input").val("1");
    //        //                result = validator.validate({ dtest_input: { value: $("#test_input"), handler: "isNumber"} });

    //        //                expect(result.length).toEqual(0);

    //        $("#test_input").val("1");
    //        validator.validate({ dtest_input: { value: $("#test_input"), handler: "isNumber" } });

    //        expect(correct()).toBeTruthy();
    //    });
    //    it("data为number类型 -> 非数字", function () {
    //        //                var result = validator.validate({ dtest_input: { value: "a", handler: "isNumber"} });

    //        //                expect(result[0]).toEqual("值必须为数字");
    //        validator.validate({ dtest_input: { value: "a", handler: "isNumber" } });

    //        expect(correct()).toBeFalsy();

    //    });
    //    it("data为number类型 -> 数字", function () {
    //        //                var result = validator.validate({ dtest_input: { value: "1", handler: "isNotEmpty"} });

    //        //                expect(result.length).toEqual(0);

    //        validator.validate({ dtest_input: { value: "1", handler: "isNumber" } });

    //        expect(correct()).toBeTruthy();
    //    });
    //});

    //describe("isTelephone", function () {
    //    beforeEach(function () {
    //        insertDom();
    //    });

    //    afterEach(function () {
    //        removeDom();
    //    });

    //    it("data为jquery对象 -> 非电话号码", function () {
    //        //                $("#test_input").val("a");
    //        //                var result = validator.validate({ dtest_input: { value: $("#test_input"), handler: "isTelephone"} });

    //        //                expect(result[0]).toEqual("值必须为电话号码");
    //        $("#test_input").val("a");
    //        //                    var result = validator._method.isTelephone($("#test_input"));
    //        validator.validate({ dtest_input: { value: $("#test_input"), handler: "isTelephone" } });

    //        expect(correct()).toBeFalsy();
    //    });
    //    it("data为jquery对象 -> 电话号码", function () {
    //        //                $("#test_input").val("1");
    //        //                result = validator.validate({ dtest_input: { value: $("#test_input"), handler: "isTelephone"} });

    //        //                expect(result.length).toEqual(0);
    //        $("#test_input").val("1");
    //        //                    var result = validator._method.isTelephone($("#test_input"));
    //        validator.validate({ dtest_input: { value: $("#test_input"), handler: "isTelephone" } });

    //        expect(correct()).toBeTruthy();
    //    });
    //    it("data为number类型 -> 非电话号码", function () {
    //        //                var result = validator.validate({ dtest_input: { value: "a", handler: "isTelephone"} });

    //        //                expect(result[0]).toEqual("值必须为电话号码");
    //        //                    var result = validator._method.isTelephone("123a");
    //        validator.validate({ dtest_input: { value: "123a", handler: "isTelephone" } });

    //        expect(correct()).toBeFalsy();
    //    });
    //    it("data为number类型 -> 电话号码", function () {
    //        //                var result = validator.validate({ dtest_input: { value: "1", handler: "isTelephone"} });

    //        //                expect(result.length).toEqual(0);
    //        //                    var result = validator._method.isTelephone("+123-22");
    //        validator.validate({ dtest_input: { value: "+123-22", handler: "isTelephone" } });

    //        expect(correct()).toBeTruthy();
    //    });
    //});

    //describe("isChinese", function () {
    //    beforeEach(function () {
    //        insertDom();
    //    });

    //    afterEach(function () {
    //        removeDom();
    //    });

    //    it("data为jquery对象 -> 非中文", function () {
    //        var result = null,
    //        result2 = null;

    //        $("#test_input").val("a");
    //        validator.validate({ dtest_input: { value: $("#test_input"), handler: "isChinese" } });
    //        result = correct();

    //        $("#test_input").val("a啊");
    //        validator.validate({ dtest_input: { value: $("#test_input"), handler: "isChinese" } });
    //        result2 = correct();

    //        expect(result).toBeFalsy();
    //        expect(result2).toBeFalsy();
    //    });
    //    it("data为jquery对象 -> 中文", function () {
    //        $("#test_input").val("中国");
    //        //                    var result = validator._method.isChinese($("#test_input"));
    //        validator.validate({ dtest_input: { value: $("#test_input"), handler: "isChinese" } });

    //        expect(correct()).toBeTruthy();
    //    });
    //    it("data为string类型 -> 非中文", function () {
    //        //                    var result = validator._method.isChinese("123a");
    //        validator.validate({ dtest_input: { value: "123a", handler: "isChinese" } });

    //        expect(correct()).toBeFalsy();
    //    });
    //    it("data为string类型 -> 中文", function () {
    //        //                    var result = validator._method.isChinese("中国");
    //        validator.validate({ dtest_input: { value: "中国", handler: "isChinese" } });

    //        expect(correct()).toBeTruthy();
    //    });
    //});

    //describe("equal", function () {
    //    beforeEach(function () {
    //        insertDom();
    //    });

    //    afterEach(function () {
    //        removeDom();
    //    });

    //    it("data为jquery对象 -> 不等", function () {
    //        var result = null,
    //        result2 = null;

    //        $("#test_input").val("a");
    //        validator.validate({ dtest_input: { value: $("#test_input"), handler: "equal*f" } });
    //        result = correct();

    //        $("#test_input").val("a啊");
    //        validator.validate({ dtest_input: { value: $("#test_input"), handler: "equal*1" } });
    //        result2 = correct();

    //        expect(result).toBeFalsy();
    //        expect(result2).toBeFalsy();
    //    });
    //    it("data为jquery对象 -> 等", function () {
    //        $("#test_input").val("1");
    //        validator.validate({ dtest_input: { value: $("#test_input"), handler: "equal*1" } });

    //        expect(correct()).toBeTruthy();
    //    });
    //    it("data不为jquery对象 -> 不等", function () {
    //        validator.validate({ dtest_input: { value: "1", handler: "equal*f" } });

    //        expect(correct()).toBeFalsy();
    //    });
    //    it("data不为jquery对象 -> 等", function () {
    //        validator.validate({ dtest_input: { value: "1", handler: "equal*1" } });

    //        expect(correct()).toBeTruthy();
    //    });
    //});

    //describe("lengthBetween", function () {
    //    beforeEach(function () {
    //        insertDom();
    //    });

    //    afterEach(function () {
    //        removeDom();
    //    });

    //    it("data为jquery对象 -> 长度超出范围", function () {
    //        var result = null,
    //        result2 = null;

    //        $("#test_input").val("aa");
    //        validator.validate({ dtest_input: { value: $("#test_input"), handler: "lengthBetween*3*5" } });
    //        result = correct();

    //        $("#test_input").val("a啊");
    //        validator.validate({ dtest_input: { value: $("#test_input"), handler: "lengthBetween*0*1" } });
    //        result2 = correct();

    //        expect(result).toBeFalsy();
    //        expect(result2).toBeFalsy();
    //    });
    //    it("data为jquery对象 -> 长度在范围内", function () {
    //        $("#test_input").val("中国");
    //        validator.validate({ dtest_input: { value: $("#test_input"), handler: "lengthBetween*1*2" } });

    //        expect(correct()).toBeTruthy();
    //    });
    //    it("data为string类型 -> 长度超出范围", function () {
    //        var result = null,
    //        result2 = null;

    //        validator.validate({ dtest_input: { value: "aa", handler: "lengthBetween*3*5" } });
    //        result = correct();

    //        validator.validate({ dtest_input: { value: "aa", handler: "lengthBetween*0*1" } });
    //        result2 = correct();

    //        expect(result).toBeFalsy();
    //        expect(result2).toBeFalsy();

    //    });
    //    it("data为string类型 -> 长度在范围内", function () {
    //        validator.validate({ dtest_input: { value: "中国", handler: "lengthBetween*1*2" } });

    //        expect(correct()).toBeTruthy();
    //    });
    //});

    ////检测是否非注入攻击
    //describe("isNotInjectAttack", function () {
    //    beforeEach(function () {
    //        insertDom();
    //    });

    //    afterEach(function () {
    //        removeDom();
    //    });

    //    it("data为jquery对象 -> 注入攻击", function () {
    //        var result1 = null,
    //        result2 = null,
    //        result3 = null;

    //        $("#test_input").val("asdasdas se dfsdf lect&nbsp;");
    //        validator.validate({ dtest_input: { value: $("#test_input"), handler: "isNotInjectAttack" } });
    //        result1 = correct();

    //        $("#test_input").val("asdasdselect");
    //        validator.validate({ dtest_input: { value: $("#test_input"), handler: "isNotInjectAttack" } });
    //        result2 = correct();

    //        $("#test_input").val("'fgdf");
    //        validator.validate({ dtest_input: { value: $("#test_input"), handler: "isNotInjectAttack" } });
    //        result3 = correct();

    //        expect(result1).toBeFalsy();
    //        expect(result2).toBeFalsy();
    //        expect(result3).toBeFalsy();
    //    });
    //    it("data为jquery对象 -> 非注入攻击", function () {
    //        $("#test_input").val("sele fdgfdg ct");
    //        //                    var result = validator._method.isChinese($("#test_input"));
    //        validator.validate({ dtest_input: { value: $("#test_input"), handler: "isNotInjectAttack" } });

    //        expect(correct()).toBeTruthy();
    //    });
    //    it("data为string对象 -> 注入攻击", function () {
    //        var result1 = null,
    //        result2 = null,
    //        result3 = null;

    //        validator.validate({ dtest_input: { value: "asdasdas se dfsdf lect&nbsp;", handler: "isNotInjectAttack" } });
    //        result1 = correct();

    //        validator.validate({ dtest_input: { value: "asdasdselect", handler: "isNotInjectAttack" } });
    //        result2 = correct();

    //        validator.validate({ dtest_input: { value: "'fgdf", handler: "isNotInjectAttack" } });
    //        result3 = correct();

    //        expect(result1).toBeFalsy();
    //        expect(result2).toBeFalsy();
    //        expect(result3).toBeFalsy();
    //    });
    //    it("data为string对象 -> 非注入攻击", function () {
    //        validator.validate({ dtest_input: { value: "aaa", handler: "isNotInjectAttack" } });

    //        expect(correct()).toBeTruthy();
    //    });
    //});
});

describe("Method_Cos", function () {
    var method = null;

    beforeEach(function () {
        method = new YYC.Control.Validator.Method_Cos();
    });

    describe("isNumber", function () {
        it("data为number -> 包含小数的数字验证通过", function () {
            var value1 = "123.55",
                value2 = ".4444",
                value3 = "444.555.";

            expect(method.isNumber(value1).result).toBeTruthy();
            expect(method.isNumber(value2).result).toBeFalsy();
            expect(method.isNumber(value3).result).toBeFalsy();
        });
        it("data为number -> 为数字", function () {
            var value1 = "12355";

            expect(method.isNumber(value1).result).toBeTruthy();
        });
    });

    describe("range", function () {
        it("data为number -> 超出范围（min<=data<=max）", function () {
            var range = [0, 1024, "true", "true"];

            expect(method.range(-1, range).result).toBeFalsy();
            expect(method.range(1024.1, range).result).toBeFalsy();
        });
        it("data为number -> 超出范围（min<data<max）", function () {
            var range = [0, 1024, "false", "false"];

            expect(method.range(0, range).result).toBeFalsy();
            expect(method.range(1024, range).result).toBeFalsy();
        });
        it("data为number -> 超出范围（min<=data<max）", function () {
            var range = [0, 1024, "true", "false"];

            expect(method.range(-0.1, range).result).toBeFalsy();
            expect(method.range(1024, range).result).toBeFalsy();
        });
        it("data为number -> 超出范围（min<data<=max）", function () {
            var range = [0, 1024, "false", "true"];

            expect(method.range(0, range).result).toBeFalsy();
            expect(method.range(1024.1, range).result).toBeFalsy();
        });

        it("data为number -> 在范围内", function () {
            var range = [0, 1024, "true", "true"];

            expect(method.range(100.1, range).result).toBeTruthy();
        });
    });

    describe("lessThan", function () {
        it("小于", function () {
            var small = [99],
                big = [100];

            expect(method.lessThan(small, big).result).toBeTruthy();

            expect(method.lessThan(big, small).result).toBeFalsy();
        });
    });

    describe("greaterThan", function () {
        it("大于", function () {
            var small = [99],
                big = [100];

            expect(method.greaterThan(big, small).result).toBeTruthy();

            expect(method.greaterThan(small, big).result).toBeFalsy();
        });
    });
});