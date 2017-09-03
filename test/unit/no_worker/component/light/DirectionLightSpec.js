describe("DirectionLight", function () {
    var sandbox = null;
    var state;

    var Light = wd.Light;
    var Vector3 = wd.Vector3;
    var ThreeDTransform = wd.ThreeDTransform;
    var Matrix4 = wd.Matrix4;
    var Color = wd.Color;
    var DirectionLightData = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        DirectionLightData = directionLightSystemTool.getData();

        var data = sceneSystemTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());

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
                directionLightTool.create();

                directorTool.init(state);

                expect(function(){
                    directionLightTool.create();
                }).toThrow("shouldn't create after Director->init");
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
            var obj1 = sceneSystemTool.addDirectionLight(pos);
            var light1 = gameObjectSystemTool.getComponent(obj1, Light);

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
                obj1 = sceneSystemTool.addDirectionLight();
                light1 = gameObjectSystemTool.getComponent(obj1, Light);

                obj2 = sceneSystemTool.addDirectionLight();
                light2 = gameObjectSystemTool.getComponent(obj2, Light);
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
                        gameObjectSystemTool.disposeComponent(obj1, light1);

                        expect(directionLightTool[getMethodName](componentTool.createComponent(index1))).toEqual(2);
                        expect(directionLightTool[getMethodName](componentTool.createComponent(index2))).toEqual(defaultValue);
                    }

                    it("remove from intensity", function () {
                        judgeSingleValue("getIntensity", "setIntensity", DirectionLightData.defaultIntensity);
                    });


                    describe("remove from isDirtys", function() {
                        function judgeIsDirty(isDirtyTypeArrayName, setFunc) {
                            specifyLightSystemTool.judgeIsDirty(light1, obj1, light2, obj2, isDirtyTypeArrayName, setFunc, DirectionLightData);
                        }

                        beforeEach(function(){

                        });

                        it("remove from isPositionDirtys", function () {
                            judgeIsDirty("isPositionDirtys", function(light1, obj1){
                                var transform = gameObjectSystemTool.getComponent(obj1, ThreeDTransform),
                                    mat = Matrix4.create().setTranslate(1, 2, 3),
                                    position = mat.getTranslation();

                                threeDTransformSystemTool.setPosition(transform, position);
                            });
                        });
                        it("remove from isColorDirtys", function () {
                            judgeIsDirty("isColorDirtys", function(light1){
                                directionLightTool.setColor(light1, Color.create("#111111"));
                            });
                        });
                        it("remove from isIntensityDirtys", function () {
                            judgeIsDirty("isIntensityDirtys", function(light1){
                                directionLightTool["setIntensity"](light1, 1);
                            });
                        });
                    });
                });
            });
        });

        specifyLightSystemTool.jugdgeDisposeComponent(directionLightTool, "addDirectionLight", describe, it, expect, directionLightSystemTool.getData());
    });

    it("buffer count should equal DataBufferConfig.directionLightDataBufferCount", function () {
        testTool.clearAndOpenContractCheck(sandbox, {
            directionLightDataBufferCount:4
        });

        state = stateTool.createAndSetFakeGLState(sandbox);

        expect(directionLightSystemTool.getData().intensities.length).toEqual(4);
    });
});

