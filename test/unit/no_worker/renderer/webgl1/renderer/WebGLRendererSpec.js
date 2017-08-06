describe("WebGLRenderer", function() {
    var sandbox = null;
    var gl;
    var state;

    var Color = wd.Color;
    var render_config = wd.render_config;

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
});
