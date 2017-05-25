describe("WebGLRenderer", function() {
    var sandbox = null;
    var gl;
    var state;

    var Color = wd.Color;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        var data = sceneTool.prepareGameObjectAndAddToScene();

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("clear", function(){
        describe("clear gl", function(){
            var color;

            beforeEach(function(){
                color = Color.create("#000000");

                wd.render_config = {
                    "render_setting": {
                        "clearColor": color
                    }
                }

                directorTool.init(state);
                directorTool.loopBody(state);
            });
            describe("clear color", function () {
                it("if color is as the same as the last clear color, not clear", function () {
                    directorTool.loopBody(state);

                    expect(gl.clearColor).toCalledOnce();
                });
                it("else, clear", function () {
                    expect(gl.clearColor).toCalledWith(color.r, color.g, color.b, color.a);
                });
            });

            it("set color write all true", function () {
                expect(gl.colorMask).toCalledWith(true, true, true, true);
            });
            it("clear gl buffer", function () {
                expect(gl.clear).toCalledWith(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
            });
        });
    });
});
