describe("Color", function() {
    var sandbox = null;
    var Color = null;

    function getValues(values){
        return testTool.getValues(values, 2);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        Color = wd.Color;
    });
    afterEach(function () {
        sandbox.restore();
    });

    it("parse color from rgba(xxx,xxx,xxx,xxx) string", function(){
        var color1 = Color.create("rgba(255, 2, 0, 0)");
        var color2 = Color.create("rgba(300, 2, 0, 1)");
        var color3 = Color.create("rgba(200, 255, 10, 0.5)");

        expect(getValues(color1.r)).toEqual(1);
        expect(getValues(color1.g)).toEqual(0.01);
        expect(getValues(color1.b)).toEqual(0);
        expect(getValues(color1.a)).toEqual(0);

        expect(getValues(color2.r)).toEqual(1);
        expect(getValues(color2.g)).toEqual(0.01);
        expect(getValues(color2.b)).toEqual(0);
        expect(getValues(color2.a)).toEqual(1);

        expect(getValues(color3.r)).toEqual(0.78);
        expect(getValues(color3.g)).toEqual(1);
        expect(getValues(color3.b)).toEqual(0.04);
        expect(getValues(color3.a)).toEqual(0.5);
    });
    it("parse color from rgba(xxx.xxx,xxx.xxx,xxx.xxx, xxx.xxx) string", function(){
        var color1 = Color.create("rgba(0.1, 0.0, 1.0, 0.1)");
        var color2 = Color.create("rgba(2.0, 0.1, 5.0, 0.0)");
        var color3 = Color.create("rgba(5.55, 100.1, 10.0, 12.5)");

        expect(getValues(color1.r)).toEqual(0.1);
        expect(getValues(color1.g)).toEqual(0);
        expect(getValues(color1.b)).toEqual(1);
        expect(getValues(color1.a)).toEqual(0.1);

        expect(getValues(color2.r)).toEqual(2);
        expect(getValues(color2.g)).toEqual(0.1);
        expect(getValues(color2.b)).toEqual(5);
        expect(getValues(color2.a)).toEqual(0);

        expect(getValues(color3.r)).toEqual(5.55);
        expect(getValues(color3.g)).toEqual(100.1);
        expect(getValues(color3.b)).toEqual(10);
        expect(getValues(color3.a)).toEqual(12.5);
    });
    it("parse color from rgb(xxx,xxx,xxx) string", function(){
        var color1 = Color.create("rgb(255, 2, 0)");
        var color2 = Color.create("rgb(300, 2, 0)");
        var color3 = Color.create("rgb(200, 255, 10)");

        expect(getValues(color1.r)).toEqual(1);
        expect(getValues(color1.g)).toEqual(0.01);
        expect(getValues(color1.b)).toEqual(0);
        expect(getValues(color1.a)).toEqual(1);

        expect(getValues(color2.r)).toEqual(1);
        expect(getValues(color2.g)).toEqual(0.01);
        expect(getValues(color2.b)).toEqual(0);
        expect(getValues(color2.a)).toEqual(1);

        expect(getValues(color3.r)).toEqual(0.78);
        expect(getValues(color3.g)).toEqual(1);
        expect(getValues(color3.b)).toEqual(0.04);
        expect(getValues(color3.a)).toEqual(1);
    });
    it("parse color from rgb(xxx.xxx,xxx.xxx,xxx.xxx) string", function(){
        var color1 = Color.create("rgb(0.1, 0.0, 1.0)");
        var color2 = Color.create("rgb(2.0, 0.1, 5.0)");
        var color3 = Color.create("rgb(5.55, 100.1, 10.0)");

        expect(getValues(color1.r)).toEqual(0.1);
        expect(getValues(color1.g)).toEqual(0);
        expect(getValues(color1.b)).toEqual(1);
        expect(getValues(color1.a)).toEqual(1);

        expect(getValues(color2.r)).toEqual(2);
        expect(getValues(color2.g)).toEqual(0.1);
        expect(getValues(color2.b)).toEqual(5);
        expect(getValues(color2.a)).toEqual(1);

        expect(getValues(color3.r)).toEqual(5.55);
        expect(getValues(color3.g)).toEqual(100.1);
        expect(getValues(color3.b)).toEqual(10);
        expect(getValues(color3.a)).toEqual(1);
    });
    it("parse color from #xxxxxx string", function(){
        var color1 = Color.create("#ffffff");
        var color2 = Color.create("#000000");
        var color3 = Color.create("#FF0123");

        expect(getValues(color1.r)).toEqual(1);
        expect(getValues(color1.g)).toEqual(1);
        expect(getValues(color1.b)).toEqual(1);
        expect(getValues(color1.a)).toEqual(1);

        expect(getValues(color2.r)).toEqual(0);
        expect(getValues(color2.g)).toEqual(0);
        expect(getValues(color2.b)).toEqual(0);
        expect(getValues(color2.a)).toEqual(1);

        expect(getValues(color3.r)).toEqual(1);
        expect(getValues(color3.g)).toEqual(0);
        expect(getValues(color3.b)).toEqual(0.14);
        expect(getValues(color3.a)).toEqual(1);
    });

    describe("toString", function(){
        it("if color string exist, get color string", function(){
            expect(Color.create("#ffffff").toString()).toEqual("#ffffff");
        });

        describe("else, convert rgb to string", function () {
            var color;

            beforeEach(function(){
                color = Color.create();
            });

            it("test single case", function () {
                expect(color.toString()).toEqual("#000000");
            });
            it("test special case", function () {
                color.r = 0.7545;
                color.g = 0.123;
                color.b = 0.12455566666;

                expect(color.toString()).toEqual("#c03de1");
            });
        });
    });

    describe("optimize", function(){
        beforeEach(function(){
        });

        describe("cache", function(){
            function judgeToVector(_class, methodName){
                it("if cached, return cache data", function(){
                    var c = Color.create("rgba(1.0,0.1,0.2,0.3)");
                    sandbox.spy(_class, "create");

                    var v1 = c[methodName]();
                    expect(_class.create).toCalledOnce();

                    var v2 = c[methodName]();
                    expect(_class.create).not.toCalledTwice();

                    expect(v1 === v2).toBeTruthy();
                });
                it("if change r/g/b/a, not cache", function () {
                    var c = Color.create("rgba(1.0,0.1,0.2,0.3)");
                    sandbox.spy(_class, "create");

                    var v1 = c[methodName]();
                    expect(_class.create).toCalledOnce();

                    c.r = 0.2;
                    var v2 = c[methodName]();
                    expect(_class.create).toCalledTwice();
                    expect(v1 === v2).toBeFalsy();

                    c.g = 0.2;
                    var v3 = c[methodName]();
                    expect(_class.create.callCount).toEqual(3);
                    expect(v2 === v3).toBeFalsy();

                    c.b = 0.5;
                    var v4 = c[methodName]();
                    expect(_class.create.callCount).toEqual(4);
                    expect(v3 === v4).toBeFalsy();

                    c.a = 0.5;
                    var v5 = c[methodName]();
                    expect(_class.create.callCount).toEqual(5);
                    expect(v4 === v5).toBeFalsy();
                });
            }

            describe("toVector3", function(){
                judgeToVector(wd.Vector3, "toVector3");
            });

            describe("toVector4", function(){
                judgeToVector(wd.Vector4, "toVector4");
            });

            describe("toArray3", function(){
                //todo test
            });
        });
    });

    describe("clone", function(){
        beforeEach(function(){
        });

        it("clone r,g,b,a data", function(){
            var c = Color.create("rgba(1.0,0.1,0.2,0.3)");

            var result = c.clone();

            expect(result.r).toEqual(1);
            expect(result.g).toEqual(0.1);
            expect(result.b).toEqual(0.2);
            expect(result.a).toEqual(0.3);
        });
    });
});
