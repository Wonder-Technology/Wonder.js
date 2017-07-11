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
            it("count should <= 4", function () {
                var msg = "count should <= 4";
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

                expect(DirectionLightData.renderDataMap[light.index].colorArr).toEqual([1,1,1]);
            });
            it("set intensity to be 1", function () {
                var light = directionLightTool.create();

                expect(DirectionLightData.renderDataMap[light.index].intensity).toEqual(1);
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
            directorTool.loopBody(state);


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
});

