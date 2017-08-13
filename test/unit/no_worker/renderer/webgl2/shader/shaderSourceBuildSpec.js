describe("shader source build", function () {
    var sandbox = null;
    var material = null;
    var obj;
    var geo;

    var gl;
    var state;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        var data = sceneTool.prepareGameObjectAndAddToScene();
        obj = data.gameObject;
        geo = data.geometry;
        material = data.material;

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("build glsl source", function () {
        function initShader() {
            directorTool.init(state);
            directorTool.loopBody(state);
        }

        beforeEach(function () {
            shaderTool.clearShader();
        });

        describe("add version to top", function () {
            it("test vs source", function () {
                initShader();

                var vs = materialTool.getVsSource(gl);
                expect(glslTool.containSpecifyCount(vs, "#version 300 es", 1)).toBeTruthy();
            });
            it("test fs source", function () {
                initShader();

                var fs = materialTool.getFsSource(gl);
                expect(glslTool.containSpecifyCount(fs, "#version 300 es", 1)).toBeTruthy();
            });
        });
    });
});

