var pointLightSystemTool = (function () {
    return {
        jugdgeDisposeComponent: function (describe, it, expect, PointLightData) {
            var Light = wd.Light;

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
        }
    }
})();

