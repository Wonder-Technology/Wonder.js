describe("PointLight", function () {
    var sandbox = null;
    var state;

    var Light = wd.Light;
    var PointLight = wd.PointLight;
    var Vector3 = wd.Vector3;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        var data = sceneTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());

        state = stateTool.createAndSetFakeGLState(sandbox);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("create", function() {
        beforeEach(function(){

        });

        describe("contract check", function(){
            it("shouldn't create after Director->init", function () {
                pointLightTool.create();

                directorTool.init(state);

                expect(function(){
                    pointLightTool.create();
                }).toThrow("shouldn't create after Director->init");
            });
        });

        describe("set default render data", function () {
            it("set colorArr to be [1,1,1]", function () {
                var light = pointLightTool.create();

                expect(pointLightTool.getColor(light).toArray3()).toEqual([1,1,1]);
            });
            it("set intensity to be 1", function () {
                var light = pointLightTool.create();

                expect(pointLightTool.getIntensity(light)).toEqual(1);
            });
            it("set constant to be 1", function () {
                var light = pointLightTool.create();

                expect(pointLightTool.getConstant(light)).toEqual(1);
            });
            it("test set linear", function () {
                var light = pointLightTool.create();

                expect(
                    testTool.getValues(
                        pointLightTool.getLinear(light)
                    )
                ).toEqual(0.07);
            });
            it("test set quadratic", function () {
                var light = pointLightTool.create();

                expect(
                    testTool.getValues(
                        pointLightTool.getQuadratic(light)
                    )
                ).toEqual(0.017);
            });
            it("test set range", function () {
                var light = pointLightTool.create();

                expect(pointLightTool.getRange(light)).toEqual(65);
            });
        });
    });

    describe("test get/set method", function() {
        function judgeSetMethod(name, getMethodName, setMethodName){
            it("set " + name, function(){
                var value = 2;
                var light1 = pointLightTool.create();

                pointLightTool[setMethodName](light1, value);

                expect(pointLightTool[getMethodName](light1)).toEqual(value);
            });
        }

        beforeEach(function(){
        });

        describe("getPosition", function() {
            beforeEach(function(){

            });

            it("get light gameObject's transform's position", function(){
                var pos = Vector3.create(1,2,3);
                var obj1 = sceneTool.addPointLight(pos);
                var light1 = gameObjectTool.getComponent(obj1, Light);

                directorTool.init(state);


                expect(pointLightTool.getPosition(light1)).toEqual(pos);
            });
        });

        judgeSetMethod("intensity", "getIntensity", "setIntensity");
        judgeSetMethod("constant", "getConstant", "setConstant");
        judgeSetMethod("linear", "getLinear", "setLinear");
        judgeSetMethod("quadratic", "getQuadratic", "setQuadratic");
        judgeSetMethod("range", "getRange", "setRange");

        describe("setRangeLevel", function() {
            beforeEach(function(){
            });

            it("set range,linear,quadratic by rangeLevel", function(){
                var light1 = pointLightTool.create();

                pointLightTool.setRangeLevel(light1, 0);

                expect(pointLightTool.getRange(light1)).toEqual(7);
                expect(testTool.getValues(
                    pointLightTool.getLinear(light1)
                )).toEqual(0.7);
                expect(testTool.getValues(
                    pointLightTool.getQuadratic(light1)
                )).toEqual(1.8);



                pointLightTool.setRangeLevel(light1, 11);

                expect(pointLightTool.getRange(light1)).toEqual(3250);
                expect(testTool.getValues(
                    pointLightTool.getLinear(light1)
                )).toEqual(0.0014);
                expect(testTool.getValues(
                    pointLightTool.getQuadratic(light1)
                )).toEqual(0.000007);
            });
        });
    });
});

