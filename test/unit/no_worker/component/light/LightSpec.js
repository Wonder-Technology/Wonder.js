describe("Light", function () {
    var sandbox = null;

    var Color = wd.Color;
    var Light = wd.Light;
    var AmbientLight = wd.AmbientLight;
    var AmbientLightData = wd.AmbientLightData;

    var DirectionLight = wd.DirectionLight;
    var DirectionLightData = wd.DirectionLightData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("setColor", function() {
        beforeEach(function(){
        });

        it("set color", function(){
            var color = Color.create("rgb(0.1,0.2,0.3)");
            var light1 = directionLightTool.create();

            directionLightTool.setColor(light1, color);

            colorTool.judgeIsEqual(directionLightTool.getColor(light1), color, expect);
        });
    });

    describe("disposeComponent", function() {
        function judgeNotAlive(mat, methodName, expect, tool) {
            componentTool.judgeNotAlive(mat, methodName, tool, expect);
        }

        beforeEach(function(){

        });

        describe("remove by swap with last one", function() {
            var obj1,light1;
            var obj2,light2;
            var obj3,light3;

            beforeEach(function(){
                obj1 = sceneTool.addAmbientLight();
                light1 = gameObjectTool.getComponent(obj1, Light);

                obj2 = sceneTool.addDirectionLight();
                light2 = gameObjectTool.getComponent(obj2, Light);

                obj3 = sceneTool.addDirectionLight();
                light3 = gameObjectTool.getComponent(obj3, Light);
            });


            it("index -= 1", function () {
                var index = AmbientLightData.index;

                gameObjectTool.disposeComponent(obj1, light1);

                expect(AmbientLightData.index).toEqual(index - 1);
            });
            it("count -= 1", function () {
                var count = AmbientLightData.count;

                gameObjectTool.disposeComponent(obj1, light1);

                expect(AmbientLightData.count).toEqual(count - 1);
            });

            describe("test remove from map", function() {
                beforeEach(function(){
                });

                describe("swap with last one and remove the last one", function(){
                    it("remove from gameObject", function () {
                        gameObjectTool.disposeComponent(obj1, light1);

                        expect(gameObjectTool.hasComponent(obj1, Light)).toBeFalsy();
                        expect(gameObjectTool.hasComponent(obj2, Light)).toBeTruthy();
                        judgeNotAlive(light1, "getGameObject", expect, ambientLightTool);
                        expect(directionLightTool.getGameObject(light2)).toEqual(obj2);
                        expect(AmbientLightData.gameObjectMap.length).toEqual(0);
                        expect(DirectionLightData.gameObjectMap.length).toEqual(2);
                    });
                });
            });

            describe("test remove from lightMap", function() {
                it("mark light removed", function () {
                    gameObjectTool.disposeComponent(obj2, light2);

                    componentTool.judgeIsComponentIndexNotRemoved(light2, expect);
                });
                it("swap with last one and remove the last one", function () {
                    gameObjectTool.disposeComponent(obj2, light2);

                    expect(DirectionLightData.lightMap[0]).toEqual(light3);
                    expect(AmbientLightData.lightMap.length).toEqual(1);
                    expect(DirectionLightData.lightMap.length).toEqual(1);
                });
            });
        });
    });
    
    describe("different type of light has independent data", function() {
        beforeEach(function(){
        });
        
        it("different type of light has independent index", function(){
            var obj1 = sceneTool.addAmbientLight();
            var light1 = gameObjectTool.getComponent(obj1, Light);

            var obj2 = sceneTool.addDirectionLight();
            var light2 = gameObjectTool.getComponent(obj2, Light);

            expect(light1.index).toEqual(light2.index);
            expect(ambientLightTool.getGameObject(light1)).not.toEqual(directionLightTool.getGameObject(light2));
        });
    });
});

