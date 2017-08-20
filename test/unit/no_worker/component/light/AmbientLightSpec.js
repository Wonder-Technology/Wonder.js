describe("AmbientLight", function () {
    var sandbox = null;

    var AmbientLightData = wd.AmbientLightData;
    var Light = wd.Light;
    var Color = wd.Color;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("create", function() {
        beforeEach(function(){

        });

        // describe("contract check", function(){
        //     it("count should <= max count", function () {
        //         var msg = "count should <= max count";
        //         ambientLightTool.create();
        //
        //         expect(function(){
        //
        //             ambientLightTool.create();
        //         }).toThrow(msg);
        //     });
        // });

        describe("set default render data", function () {
            it("set colorArr to be [1,1,1]", function () {
                var light = ambientLightTool.create();

                expect(ambientLightTool.getColor(light).toArray3()).toEqual([1,1,1]);
            });
        });
    });

    describe("disposeComponent", function() {
        beforeEach(function(){
        });

        describe("remove by swap with last one", function() {
            var obj1,light1;

            beforeEach(function(){
                obj1 = sceneTool.addAmbientLight();
                light1 = gameObjectTool.getComponent(obj1, Light);
            });

            describe("test remove from map", function() {
                beforeEach(function(){
                });

                describe("reset removed one's value", function(){
                    it("remove from colors", function () {
                        var color1 = Color.create("rgb(0.1,0.2,0.3)");
                        ambientLightTool.setColor(light1, color1);

                        gameObjectTool.disposeComponent(obj1, light1);

                        colorTool.judgeIsEqual(ambientLightTool.getColor(componentTool.createComponent(0)), colorTool.createDefaultColor(AmbientLightData), expect);
                    });


                    describe("remove from isDirtys", function() {
                        beforeEach(function(){
                        });

                        it("remove from isColorDirtys", function () {
                            var index1 = light1.index;

                            AmbientLightData.isColorDirtys[index1] = 1;

                            ambientLightTool.setColor(light1, Color.create("#111111"));


                            gameObjectTool.disposeComponent(obj1, light1);

                            expect(AmbientLightData.isColorDirtys[index1]).toEqual(0);
                        });
                    });
                });
            });
        });
    });
});

