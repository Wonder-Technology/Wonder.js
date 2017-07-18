describe("MapManager", function() {
    var sandbox = null;
    var material = null;
    var obj;
    var geo;
    var texture;

    var gl;
    var state;

    var MapManagerData = wd.MapManagerData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        var data = sceneTool.prepareGameObjectAndAddToScene();
        obj = data.gameObject;
        geo = data.geometry;
        material = data.material;

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);


        texture = textureTool.create();
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("addMap", function() {
        beforeEach(function(){

        });

        it("test add first map", function(){
            basicMaterialTool.addMap(material, texture);

            expect(MapManagerData.textureMap[material.index]).toEqual([texture]);
        });
        it("test add second map", function () {
            var texture2 = textureTool.create();

            basicMaterialTool.addMap(material, texture);
            basicMaterialTool.addMap(material, texture2);

            expect(MapManagerData.textureMap[material.index]).toEqual([texture, texture2]);
        });
    });

    // describe("getMap", function() {
    //     beforeEach(function(){
    //
    //     });
    //
    //     it("", function(){
    //
    //     });
    // });
    //
    // describe("getMapList", function() {
    //     beforeEach(function(){
    //
    //     });
    //
    //     it("", function(){
    //
    //     });
    // });
    //
    // describe("getMapCount", function() {
    //     beforeEach(function(){
    //
    //     });
    //
    //     it("", function(){
    //
    //     });
    // });
    //
    //
    // describe("bindAndUpdate", function() {
    //     beforeEach(function(){
    //
    //     });
    //
    //     it("", function(){
    //
    //     });
    // });

    describe("dispose", function(){
        it("clear textureMap", function(){
            var texture2 = textureTool.create();

            basicMaterialTool.addMap(material, texture);
            basicMaterialTool.addMap(material, texture2);

            var index = material.index;

            gameObjectTool.disposeComponent(obj, material);

            expect(MapManagerData.textureMap[index]).toEqual([]);
        });
    });
});
