describe("test glsl 3.0", function() {
    var sandbox = null;
    var gl;
    var state;

    function getVsSource(gl) {
        return materialTool.getVsSource(gl);
    }

    function getFsSource(gl) {
        return materialTool.getFsSource(gl);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testWebGL2Tool.clearAndOpenContractCheck(sandbox);

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);
    });
    afterEach(function () {
        testWebGL2Tool.clear(sandbox);
        sandbox.restore();
    });

    describe("top add #version define", function(){
        beforeEach(function () {
            directorTool.init(state);
        });

        it("test vs source", function () {
            var vs = getVsSource(gl);

            expect(glslTool.contain(vs, "#version 300 es\n")).toBeTruthy();
        });
        it("test fs source", function () {
            var fs = getFsSource(gl);

            expect(glslTool.contain(fs, "#version 300 es\n")).toBeTruthy();
        });
    });
});