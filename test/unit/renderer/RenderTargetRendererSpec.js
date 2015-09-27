describe("RenderTargetRenderer", function() {
    var sandbox = null;
    var RenderTargetRenderer = null;
    var renderTargetRenderer = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        RenderTargetRenderer = dy.RenderTargetRenderer;
        sandbox.stub(dy.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("_setClipPlane", function(){
        describe("set clip plane by Oblique frustum clipping", function(){
            it("set clip plane in camera space", function(){
                var geometry = dy.PlaneGeometry.create();
                geometry.width = 10;
                geometry.height = 10;
                geometry.material = {
                    color: "#ffffff",

                    init:sandbox.stub()
                };
                geometry.init();

                var mirrorTexture = dy.MirrorTexture.create();
                mirrorTexture.material = {
                    geometry: geometry
                };
                var mirror = dy.GameObject.create();
                mirror.addComponent(geometry);

                mirror.transform.rotateLocal(dy.Vector3.create(90, 0, 0));
                mirror.transform.translateLocal(dy.Vector3.create(0, 0, -10));

                var camera = dy.GameObject.create();
                camera.transform.translateLocal(dy.Vector3.create(0, 10, 10));
                camera.transform.lookAt(dy.Vector3.create(0, 10, 0));

                var renderer = new dy.RenderTargetRenderer(mirrorTexture);

                var clipPlane = renderer._getClipPlaneInCameraSpace(camera.transform.localToWorldMatrix, mirrorTexture.getPlane());

                expect(testTool.getValues(clipPlane.values)).toEqual(
                    [0, 0, 1, -10]
                );
            });

            //todo test more
        });
    });

    describe("render", function(){
        var renderTargetTexture,renderer,camera,cameraComponent, frameBufferManager,renderObj1, renderObj2,plane;

        beforeEach(function(){
            renderObj1 = {
                render: sandbox.stub()
            };
            renderObj2 = {
                render: sandbox.stub()
            };

            plane = {
                getReflectionMatrix: sandbox.stub().returns(dy.Matrix.create())
            };

            renderTargetTexture = {
                setTexture: sandbox.stub(),
                getPlane: sandbox.stub().returns(plane),
                renderList: dyCb.Collection.create([renderObj1, renderObj2])
            };

            frameBufferManager = {
                texture: {},
                bindAndSetViewport: sandbox.stub(),
                unBindAndRestoreViewport: sandbox.stub()
            };

            renderTargetRenderer = new RenderTargetRenderer(renderTargetTexture);
            renderTargetRenderer._frameBufferManager = frameBufferManager;

            renderer = {
                render: sandbox.stub()
            };

            cameraComponent = {
                worldToCameraMatrix: dy.Matrix.create(),
                pMatrix: dy.Matrix.create()
            };
            camera = {
                getComponent: sandbox.stub().returns(cameraComponent)
            };

            sandbox.stub(renderTargetRenderer, "_setClipPlane").returns(cameraComponent.pMatrix);
        });
        
        it("attach renderTargetTexture and frameBuffer's texture", function(){
            renderTargetRenderer.render(renderer, camera);

            expect(renderTargetTexture.setTexture).toCalledWith(frameBufferManager.texture);
        });
        it("set clip plane", function(){
            renderTargetRenderer.render(renderer, camera);

            expect(renderTargetRenderer._setClipPlane).toCalledWith(sinon.match.instanceOf(dy.Matrix), cameraComponent.pMatrix, plane);
        });
        it("bind frameBuffer and set viewport", function(){
            renderTargetRenderer.render(renderer, camera);

            expect(frameBufferManager.bindAndSetViewport).toCalledOnce();
        });
        it("render renderTargetTexture's renderList", function(){
            renderTargetRenderer.render(renderer, camera);

            expect(renderObj1.render).toCalledWith(renderer, sinon.match.instanceOf(dy.GameObject), true);
            expect(renderObj2.render).toCalledWith(renderer, sinon.match.instanceOf(dy.GameObject), true);
            expect(renderObj1.render).toCalledBefore(renderObj2.render);
        });
        it("invoke renderer's render method", function(){
            renderTargetRenderer.render(renderer, camera);

            expect(renderer.render).toCalledOnce();
            expect(renderer.render).toCalledAfter(renderObj2.render);
        });
        it("unbind frameBuffer and restore viewport", function(){
            renderTargetRenderer.render(renderer, camera);

            expect(frameBufferManager.unBindAndRestoreViewport).toCalledOnce();
        });
    });
});

