describe("fix ubo bug", function () {
    var sandbox = null;
    var gl;
    var state;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("test bind ubo frequence", function() {
        beforeEach(function(){
            var data = sceneSystemTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());

            sceneSystemTool.addDirectionLight();
            sceneSystemTool.addPointLight();
            sceneSystemTool.addAmbientLight();

            directorTool.init(state);
            directorTool.loopBody(state);
        });

        it("only bind CameraUbo once in one frame", function () {
            expect(gl.bindBufferBase.withArgs(gl.UNIFORM_BUFFER, uboTool.getBindingPoint("CameraUbo"))).toCalledOnce();
        });
        it("only bind LightUbo once", function () {
            directorTool.loopBody(state);
            directorTool.loopBody(state);

            expect(gl.bindBufferBase.withArgs(gl.UNIFORM_BUFFER, uboTool.getBindingPoint("LightUbo"))).toCalledOnce();
        });
    });

    describe("ubo binding point 0 should be binded", function () {
        it("test ambient light pass should bind CameraUbo in the 0 binding point even though it don't use it", function () {
            var data = sceneSystemTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());
            sceneSystemTool.addAmbientLight();

            directorTool.init(state);
            directorTool.loopBody(state);

            expect(gl.bindBufferBase.withArgs(gl.UNIFORM_BUFFER, 0)).toCalledOnce();
            expect(uboTool.getBindingPoint("CameraUbo")).toEqual(0);
        });
    });
});
