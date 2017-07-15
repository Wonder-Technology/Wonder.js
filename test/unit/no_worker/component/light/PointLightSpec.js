describe("PointLight", function () {
    var sandbox = null;
    var state;

    var Light = wd.Light;
    var PointLight = wd.PointLight;
    var PointLightData = wd.PointLightData;
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
            it("count should <= max count", function () {
                var msg = "count should <= max count";
                pointLightTool.create();
                pointLightTool.create();
                pointLightTool.create();
                pointLightTool.create();

                expect(function(){

                    pointLightTool.create();
                }).toThrow(msg);
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
            it("set linear to be 0", function () {
                var light = pointLightTool.create();

                expect(pointLightTool.getLinear(light)).toEqual(0);
            });
            it("set quadratic to be 0", function () {
                var light = pointLightTool.create();

                expect(pointLightTool.getQuadratic(light)).toEqual(0);
            });
            it("set range to be max value", function () {
                var light = pointLightTool.create();

                expect(pointLightTool.getRange(light)).toEqual(60000);
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
                directorTool.loopBody(state);


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

    describe("disposeComponent", function() {
        beforeEach(function(){
        });

        describe("remove by swap with last one", function() {
            var obj1,light1;
            var obj2,light2;

            beforeEach(function(){
                obj1 = sceneTool.addPointLight();
                light1 = gameObjectTool.getComponent(obj1, Light);

                obj2 = sceneTool.addPointLight();
                light2 = gameObjectTool.getComponent(obj2, Light);
            });

            describe("test remove from map", function() {
                beforeEach(function(){
                });

                describe("reset removed one's value", function(){
                    function judgeSingleValue(getMethodName, setMethodName, defaultValue) {
                        pointLightTool[setMethodName](light1, 1);
                        pointLightTool[setMethodName](light2, 2);

                        var index1 = light1.index;
                        var index2 = light2.index;
                        gameObjectTool.disposeComponent(obj1, light1);

                        expect(pointLightTool[getMethodName](componentTool.createComponent(index1))).toEqual(2);
                        expect(pointLightTool[getMethodName](componentTool.createComponent(index2))).toEqual(defaultValue);
                    }

                    it("remove from intensity", function () {
                        judgeSingleValue("getIntensity", "setIntensity", PointLightData.defaultIntensity);
                    });
                    it("remove from constant", function () {
                        judgeSingleValue("getConstant", "setConstant", PointLightData.defaultConstant);
                    });
                    it("remove from linear", function () {
                        judgeSingleValue("getLinear", "setLinear", PointLightData.defaultLinear);
                    });
                    it("remove from quadratic", function () {
                        judgeSingleValue("getQuadratic", "setQuadratic", PointLightData.defaultQuadratic);
                    });
                    it("remove from range", function () {
                        judgeSingleValue("getRange", "setRange", PointLightData.defaultRange);
                    });
                });
            });
        });
    });
});

