var PointLightSystemToolBase = YYC.AClass({
    Public: {
        jugdgeDisposeComponent: function (describe, it, expect, PointLightData) {
            var Light = wd.Light;
            var Color = wd.Color;
            var ThreeDTransform = wd.ThreeDTransform;
            var Matrix4 = wd.Matrix4;

            describe("remove by swap with last one", function () {
                var obj1, light1;
                var obj2, light2;

                beforeEach(function () {
                    obj1 = sceneTool.addPointLight();
                    light1 = gameObjectTool.getComponent(obj1, Light);

                    obj2 = sceneTool.addPointLight();
                    light2 = gameObjectTool.getComponent(obj2, Light);
                });

                describe("test remove from map", function () {
                    beforeEach(function () {
                    });

                    describe("reset removed one's value", function () {
                        function judgeSingleValue(getMethodName, setMethodName, defaultValue) {
                            pointLightTool[setMethodName](light1, 1);
                            pointLightTool[setMethodName](light2, 2);

                            var index1 = light1.index;
                            var index2 = light2.index;
                            gameObjectTool.disposeComponent(obj1, light1);

                            expect(pointLightTool[getMethodName](componentTool.createComponent(index1))).toEqual(2);
                            expect(testTool.getValues(pointLightTool[getMethodName](componentTool.createComponent(index2)))).toEqual(defaultValue);
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

                        describe("remove from isDirtys", function() {
                            function judgeIsDirty(isDirtyTypeArrayName, setFunc) {
                                specifyLightSystemTool.judgeIsDirty(light1, obj1, light2, obj2, isDirtyTypeArrayName, setFunc, PointLightData);
                            }

                            beforeEach(function(){

                            });

                            it("remove from isPositionDirtys", function () {
                                judgeIsDirty("isPositionDirtys", function(light1, obj1){
                                    var transform = gameObjectTool.getComponent(obj1, ThreeDTransform),
                                        mat = Matrix4.create().setTranslate(1, 2, 3),
                                        position = mat.getTranslation();

                                    threeDTransformTool.setPosition(transform, position);
                                });
                            });
                            it("remove from isColorDirtys", function () {
                                judgeIsDirty("isColorDirtys", function(light1){
                                    pointLightTool.setColor(light1, Color.create("#111111"));
                                });
                            });
                            it("remove from isIntensityDirtys", function () {
                                judgeIsDirty("isIntensityDirtys", function(light1){
                                    pointLightTool["setIntensity"](light1, 1);
                                });
                            });
                            it("remove from isAttenuationDirtys", function () {
                                judgeIsDirty("isAttenuationDirtys", function(light1){
                                    pointLightTool.setRange(light1, 1);
                                });
                            });
                        });
                    });
                });
            });

            specifyLightSystemTool.jugdgeDisposeComponent(pointLightTool, "addPointLight", describe, it, expect, PointLightData);
        }
    }
});
