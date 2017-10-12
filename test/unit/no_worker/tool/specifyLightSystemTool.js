var specifyLightSystemTool = (function () {
    return {
        judgeIsDirty: function (light1, obj1, light2, obj2, isDirtyTypeArrayName, setFunc, SpecifyLightData) {
            var index1 = light1.index;
            var index2 = light2.index;


            specifyLightSystemTool.markAllNotDirty(isDirtyTypeArrayName, index1, index2, SpecifyLightData);


            setFunc(light1, obj1);

            console.log(wd.DataBufferConfig)


            gameObjectSystemTool.disposeComponent(obj1, light1);

            expect(SpecifyLightData[isDirtyTypeArrayName][index1]).toEqual(1);
            expect(SpecifyLightData[isDirtyTypeArrayName][index2]).toEqual(0);
        },
        markAllNotDirty: function (isDirtyTypeArrayName, index1, index2, SpecifyLightData) {
            SpecifyLightData[isDirtyTypeArrayName][index1] = 1;
            SpecifyLightData[isDirtyTypeArrayName][index2] = 1;
        },
        jugdgeDisposeComponent: function (tool, addLightMethodName, describe, it, expect, SpecifyLightData) {
            var Light = wd.Light;
            var Color = wd.Color;

            describe("test dispose data from specify light", function() {
                describe("remove by swap with last one", function () {
                    var obj1, light1;
                    var obj2, light2;

                    beforeEach(function () {
                        obj1 = sceneSystemTool[addLightMethodName]();
                        light1 = gameObjectSystemTool.getComponent(obj1, Light);

                        obj2 = sceneSystemTool[addLightMethodName]();
                        light2 = gameObjectSystemTool.getComponent(obj2, Light);
                    });

                    describe("test remove from map", function () {
                        beforeEach(function () {
                        });

                        describe("reset removed one's value", function () {
                            it("remove from colors", function () {
                                var color1 = Color.create("rgb(0.1,0.2,0.3)");
                                var color2 = Color.create("rgb(0.4,0.2,0.3)");
                                tool.setColor(light1, color1);
                                tool.setColor(light2, color2);

                                gameObjectSystemTool.disposeComponent(obj1, light1);

                                colorTool.judgeIsEqual(tool.getColor(componentTool.createComponent(0)), color2, expect);
                                colorTool.judgeIsEqual(tool.getColor(componentTool.createComponent(1)), colorTool.createDefaultColor(SpecifyLightData), expect);
                            });
                        });


                        describe("test remove from lightMap", function() {
                            beforeEach(function(){

                            });

                            it("mark material removed", function () {
                                gameObjectSystemTool.disposeComponent(obj1, light1);

                                componentTool.judgeIsComponentIndexNotRemoved(light1, expect);
                            });
                            it("swap with last one and remove the last one", function () {
                                gameObjectSystemTool.disposeComponent(obj1, light1);

                                expect(SpecifyLightData.lightMap[0]).toEqual(light2);
                                expect(SpecifyLightData.lightMap.length).toEqual(1);
                            });
                        });
                    });
                });
            });
        }
    }
})();

