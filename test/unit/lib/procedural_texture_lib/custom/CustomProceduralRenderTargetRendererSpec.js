describe("CustomProceduralRenderTargetRenderer", function () {
    var sandbox = null;
    var renderTargetRenderer;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        renderTargetRenderer = new  wd.CustomProceduralRenderTargetRenderer();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("createShader", function(){
        beforeEach(function(){
        });

        it("create CustomProceduralShader", function () {
            var shader = renderTargetRenderer.createShader();

            expect(shader).toEqual(jasmine.any(wd.CustomProceduralShader));
        });
        it("add CustomProceduralShaderLib", function () {
            var shader = renderTargetRenderer.createShader();

            expect(shader.hasLib(wd.CustomProceduralShaderLib)).toBeTruthy();
            expect(shader.getLib(wd.CustomProceduralShaderLib)._proceduralTexture).toEqual(shader.texture);
        });
    });
});

