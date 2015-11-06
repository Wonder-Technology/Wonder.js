describe("Color", function() {
    var sandbox = null;
    var Color = null;

    function getValues(values){
        return YYC.Tool.math.toFixed(values, 2);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Color = dy.Color;
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
});

