describe("MarbleProceduralRenderTargetRenderer", function () {
    var sandbox = null;
    var renderTargetRenderer;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        renderTargetRenderer = new  wd.MarbleProceduralRenderTargetRenderer();
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
        it("add MarbleProceduralShaderLib", function () {
            var shader = renderTargetRenderer.createShader();

            expect(shader.hasLib(wd.MarbleProceduralShaderLib)).toBeTruthy();
            expect(shader.getLib(wd.MarbleProceduralShaderLib)._proceduralTexture).toEqual(shader.texture);
        });
    });
});

