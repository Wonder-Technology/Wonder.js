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

    describe("dispose", function () {
        it("释放内部数组", function () {
            builder.append("1:{0}", "a");
            builder.append("2:{0}", "b");

            builder.dispose();

            expect(builder._array).toBeNull();
        });
    });
});