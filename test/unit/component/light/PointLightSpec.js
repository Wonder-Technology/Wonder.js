describe("PointLight", function() {
    var sandbox = null;
    var light = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        light = new wd.PointLight();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("clone", function(){
        beforeEach(function(){
        });

        describe("clone PointLight data", function () {
            it("clone rangeLevel", function () {
                var rangeLevel = 2;
                sandbox.spy(light._attenuation, "setByRangeLevel");


                cloneTool.extend(light, {
                    rangeLevel:rangeLevel
                });

                var result = light.clone();

                expect(result === light).toBeFalsy();
                expect(result.rangeLevel).toEqual(rangeLevel);
                expect(light._attenuation.setByRangeLevel).toCalledOnce();
            });
            it("clone other data", function () {
                var range = 1000,
                    constant = 2,
                    linear = 2,
                    quadratic = 0.5;


                cloneTool.extend(light, {
                    range: range,
                    constant: constant,
                    linear: linear,
                    quadratic: quadratic
                });

                var result = light.clone();

                expect(result === light).toBeFalsy();
                expect(result.range).toEqual(range);
                expect(result.constant).toEqual(constant);
                expect(result.linear).toEqual(linear);
                expect(result.quadratic).toEqual(quadratic);
            });
        });
    });
});

