describe("procedural renderTargetRenderer", function () {
    var gl = null;
    var sandbox = null;
    var renderTargetRenderer;

    function prepareForInit(renderTargetRenderer){
        renderTargetRenderer.texture = wd.MarbleProceduralTexture.create();

        renderTargetRenderer.initWhenCreate();

        renderTargetRenderer.createShader = sandbox.stub().returns({
            init:sandbox.stub()
        })
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        renderTargetRenderer = new wd.ProceduralRenderTargetRenderer();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        gl = wd.DeviceManager.getInstance().gl;
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    it("only bind vertex buffer,index buffer once when there multi procedural render targets init", function () {
        var renderTargetRenderer2 = new wd.ProceduralRenderTargetRenderer();
        prepareForInit(renderTargetRenderer);
        prepareForInit(renderTargetRenderer2);

        renderTargetRenderer.init();
        renderTargetRenderer2.init();

        expect(gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER, sinon.match.object)).toCalledOnce();
        expect(gl.bindBuffer.withArgs(gl.ARRAY_BUFFER, sinon.match.object)).toCalledOnce();
    });
});
