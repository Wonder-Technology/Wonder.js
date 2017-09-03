describe("BasicMaterial", function () {
    var sandbox = null;
    var material = null;
    var obj;
    var geo;
    var cameraGameObject;

    var gl;
    var state;

    var Matrix4 = wd.Matrix4;
    var Color = wd.Color;
    var BasicMaterialData = wd.BasicMaterialData;
    var DataBufferConfig = wd.DataBufferConfig;

    function buildGLSL(state) {
        var gl = directorTool.init(state);

        directorTool.loopBody(state);

        return gl;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        var data = sceneSystemTool.prepareGameObjectAndAddToScene();
        obj = data.gameObject;
        geo = data.geometry;
        material = data.material;
        cameraGameObject = data.cameraGameObject;

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("initData", function() {
        beforeEach(function(){
        });

        describe("separate buffer index into segements of corresponding material type", function() {
            beforeEach(function(){

            });

            it("make BasicMaterialData.index be 0", function(){
                sandbox.stub(DataBufferConfig, "basicMaterialDataBufferCount", 20);
                sandbox.stub(DataBufferConfig, "lightMaterialDataBufferCount", 100);

                materialTool.resetData();

                expect(BasicMaterialData.index).toEqual(0);
            });
        });
    });
});
