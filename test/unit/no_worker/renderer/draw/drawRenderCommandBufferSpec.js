describe("draw render command", function () {
    var sandbox = null;
    var material = null;
    var obj;
    var geo;
    var cameraObj;

    var gl;
    var state;

    var Color = wd.Color;
    var Matrix4 = wd.Matrix4;
    var GeometryData = wd.GeometryData;
    var IndexBufferData = wd.IndexBufferData;
    var EBufferType = wd.EBufferType;
    var DataBufferConfig = wd.DataBufferConfig;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        var data = sceneTool.prepareGameObjectAndAddToScene(false,  null, lightMaterialTool.create());
        obj = data.gameObject;
        geo = data.geometry;
        material = data.material;
        cameraObj = data.cameraGameObject;


        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("use", function () {
        it("if the program is already used, not use again", function () {
            var data = sceneTool.createGameObject(null, lightMaterialTool.create());
            sceneTool.addGameObject(data.gameObject);

            directorTool.init(state);
            directorTool.loopBody(state);

            expect(gl.useProgram).toCalledOnce();
        });
    });

    describe("draw", function() {
        beforeEach(function(){

        });

        it("if geometry has no index buffer, then drawArray", function(){
            directorTool.init(state);

            geometryTool.setIndices(0, []);

            directorTool.loopBody(state);

            expect(gl.drawArrays).toCalledWith("TRIANGLES",0,72);
        });
    });

    describe("contract check", function() {
        beforeEach(function(){
            testTool.openContractCheck();
        });

        describe("data.length should not exceed DataBufferConfig->dataBufferCount", function() {
            function prepareNotExceed() {
                sandbox.stub(DataBufferConfig, "renderCommandBufferCount", 1);

                meshRendererTool.resetData();

                return "renderGameObjectArray.length should not exceed RenderCommandBufferData->buffer's count";
            }

            beforeEach(function(){

            });

            it("RenderCommandBufferData->buffer", function(){
                var errMsg = prepareNotExceed();

                sceneTool.addGameObject(sceneTool.createGameObject().gameObject);

                sceneTool.addGameObject(sceneTool.createGameObject().gameObject);

                directorTool.init(state);


                expect(function () {
                    directorTool.loopBody(state);
                }).toThrow(errMsg)
            });
        });
    });
});

