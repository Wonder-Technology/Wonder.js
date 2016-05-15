describe("RefractionRenderTargetRenderer", function () {
    var renderTargetRenderer;
    var sandbox;

    beforeEach(function(){
        sandbox = sinon.sandbox.create();

        renderTargetRenderer = new wd.RefractionRenderTargetRenderer();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("render", function(){
        var renderer,camera,frameBufferOperator,renderObj1, renderObj2,texture;

        beforeEach(function(){
            renderObj1 = {
                render: sandbox.stub()
            };
            renderObj2 = {
                render: sandbox.stub()
            };

            frameBufferOperator = {
                bindFrameBuffer: sandbox.stub(),
                setViewport: sandbox.stub(),
                unBindAll: sandbox.stub(),
                unBindFrameBuffer: sandbox.stub(),
                restoreViewport: sandbox.stub()
            };


            renderTargetRenderer.frameBufferOperator = frameBufferOperator;


            texture = wd.RefractionTexture.create();

            texture.renderList = wdCb.Collection.create([renderObj1, renderObj2]);


            renderTargetRenderer.texture = texture;


            renderer = {
                render: sandbox.stub(),
                clear: sandbox.stub()
            };



            camera = testTool.createCamera();
        });

        it("not create camera, use origin camera", function () {
            sandbox.spy(renderTargetRenderer, "createCamera");
            renderTargetRenderer.render(renderer, camera);

            expect(renderTargetRenderer.createCamera).not.toCalled();
            expect(renderObj1.render).toCalledWith(renderer, camera);
            expect(renderObj2.render).toCalledWith(renderer, camera);
        });

        it("invoke renderer's render method", function(){
            renderTargetRenderer.render(renderer, camera);

            expect(renderer.render).toCalledOnce();
            expect(renderer.render).toCalledAfter(renderObj2.render);
        });
    });
});

