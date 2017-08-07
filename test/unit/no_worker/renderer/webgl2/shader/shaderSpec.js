describe("shader", function() {
    var sandbox = null;
    var gl;
    var state;
    var material;

    var MaterialData = wd.MaterialData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);


        var data = sceneTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());

        material = data.material;
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("use shader for material", function(){
        function isInitShader(expect, gl) {
            expect(gl.createProgram.callCount).toEqual(2);
        }

        function getUsedShaderShaderIndex() {
            return 1;
        }
        //todo optimize: not init if inited

        it("init material shader", function () {
            directorTool.init(state);
            directorTool.loopBody(state);

            isInitShader(expect, gl);
        });
        it("set shader index", function () {
            directorTool.init(state);
            directorTool.loopBody(state);

            expect(MaterialData.shaderIndices[material.index]).toEqual(getUsedShaderShaderIndex());
        });
    });
});
