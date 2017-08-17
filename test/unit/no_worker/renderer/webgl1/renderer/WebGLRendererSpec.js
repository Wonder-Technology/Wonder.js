describe("WebGLRenderer", function() {
    var sandbox = null;
    var gl;
    var state;

    var Color = wd.Color;
    var render_config = wd.render_config;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testWebGL1Tool.clearAndOpenContractCheck(sandbox);

        var data = sceneTool.prepareGameObjectAndAddToScene();

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);
    });
    afterEach(function () {
        testWebGL1Tool.clear(sandbox);
        sandbox.restore();
    });

    describe("init", function() {
        beforeEach(function(){
        });

        describe("init state", function(){
            it("set front side", function () {
                directorTool.init(state);

                expect(gl.enable.withArgs(gl.CULL_FACE)).toCalledOnce();
                expect(gl.cullFace.withArgs(gl.BACK)).toCalledOnce();
            });
        });
    });

    describe("clear color", function () {
        var color;

        beforeEach(function(){
            color = Color.create("#000000");

            sandbox.stub(render_config, "clearColor", color);

            directorTool.init(state);
            directorTool.loopBody(state);
        });
        it("if color is as the same as the last clear color, not clear", function () {
            directorTool.loopBody(state);

            expect(gl.clearColor).toCalledOnce();
        });
        it("else, clear", function () {
            expect(gl.clearColor).toCalledWith(color.r, color.g, color.b, color.a);
        });
        it("set color write all true", function () {
            expect(gl.colorMask).toCalledWith(true, true, true, true);
        });
    });
});
