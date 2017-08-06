describe("DirectionLight", function () {
    var sandbox = null;
    var state;

    var Light = wd.Light;
    var DirectionLight = wd.DirectionLight;
    var DirectionLightData = wd.DirectionLightData;
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
                directionLightTool.create();
                directionLightTool.create();
                directionLightTool.create();
                directionLightTool.create();

                expect(function(){

                    directionLightTool.create();
                }).toThrow(msg);
            });
        });

        describe("set default render data", function () {
            it("set colorArr to be [1,1,1]", function () {
                var light = directionLightTool.create();

                expect(directionLightTool.getColor(light).toArray3()).toEqual([1,1,1]);
            });
            it("set intensity to be 1", function () {
                var light = directionLightTool.create();

                expect(directionLightTool.getIntensity(light)).toEqual(1);
            });
        });
    });

    describe("getPosition", function() {
        beforeEach(function(){

        });

        it("get light gameObject's transform's position", function(){
            var pos = Vector3.create(1,2,3);
            var obj1 = sceneTool.addDirectionLight(pos);
            var light1 = gameObjectTool.getComponent(obj1, Light);

            directorTool.init(state);


            expect(directionLightTool.getPosition(light1)).toEqual(pos);
        });
    });

    describe("setIntensity", function() {
        beforeEach(function(){
        });

        it("set intensity", function(){
            var intensity = 2;
            var light1 = directionLightTool.create();

            directionLightTool.setIntensity(light1, intensity);

            expect(directionLightTool.getIntensity(light1)).toEqual(intensity);
        });
    });

    describe("disposeComponent", function() {
        beforeEach(function(){
        });

        describe("remove by swap with last one", function() {
            var obj1,light1;
            var obj2,light2;

            beforeEach(function(){
                obj1 = sceneTool.addDirectionLight();
                light1 = gameObjectTool.getComponent(obj1, Light);

                obj2 = sceneTool.addDirectionLight();
                light2 = gameObjectTool.getComponent(obj2, Light);
            });

            describe("test remove from map", function() {
                beforeEach(function(){
                });

                describe("reset removed one's value", function(){
                    function judgeSingleValue(getMethodName, setMethodName, defaultValue) {
                        directionLightTool[setMethodName](light1, 1);
                        directionLightTool[setMethodName](light2, 2);

                        var index1 = light1.index;
                        var index2 = light2.index;
                        gameObjectTool.disposeComponent(obj1, light1);

                        expect(directionLightTool[getMethodName](componentTool.createComponent(index1))).toEqual(2);
                        expect(directionLightTool[getMethodName](componentTool.createComponent(index2))).toEqual(defaultValue);
                    }

                    it("remove from intensity", function () {
                        judgeSingleValue("getIntensity", "setIntensity", DirectionLightData.defaultIntensity);
                    });
                });
            });
        });
    });
});

