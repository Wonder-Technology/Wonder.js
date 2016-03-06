describe("FireProceduralRenderTargetRenderer", function () {
    var sandbox = null;
    var renderTargetRenderer;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        renderTargetRenderer = new  wd.FireProceduralRenderTargetRenderer();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("createShader", function(){
        beforeEach(function(){
        });

        it("create CommonProceduralShader", function () {
            var shader = renderTargetRenderer.createShader();

            expect(shader).toEqual(jasmine.any(wd.CommonProceduralShader));
        });
        it("add FireProceduralShaderLib", function () {
            var shader = renderTargetRenderer.createShader();

            expect(shader.hasLib(wd.FireProceduralShaderLib)).toBeTruthy();
            expect(shader.getLib(wd.FireProceduralShaderLib)._proceduralTexture).toEqual(shader.texture);
        });
    });
});

