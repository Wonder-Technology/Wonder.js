describe("MirrorRenderTargetRenderer", function() {
    var sandbox = null;
    var RenderTargetRenderer = null;
    var renderTargetRenderer = null;
    var gl = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        RenderTargetRenderer = dy.MirrorRenderTargetRenderer;
        sandbox.stub(dy.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        gl = dy.DeviceManager.getInstance().gl;
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

                var renderer = new RenderTargetRenderer(mirrorTexture);

                var clipPlane = renderer._getClipPlaneInCameraSpace(camera.transform.localToWorldMatrix, mirrorTexture.getPlane());

                expect(testTool.getValues(clipPlane.values)).toEqual(
                    [0, 0, 1, -10]
                );
            });

            //todo test more
        });
    });

    describe("init", function(){
        var renderTargetTexture,frameBufferOperator,emptyTexture,frameBuffer,renderBuffer;

        beforeEach(function(){
            emptyTexture = {};
            frameBuffer = {};
            renderBuffer = {};

            renderTargetTexture = {
                createEmptyTexture: sandbox.stub().returns(emptyTexture)
            };

            frameBufferOperator = {
                createFrameBuffer: sandbox.stub().returns(frameBuffer),
                createRenderBuffer: sandbox.stub().returns(renderBuffer),
                bindFrameBuffer: sandbox.stub(),
                attachTexture: sandbox.stub(),
                attachRenderBuffer: sandbox.stub(),
                check: sandbox.stub(),
                unBind: sandbox.stub()
            };

            renderTargetRenderer = new RenderTargetRenderer(renderTargetTexture);
            renderTargetRenderer.frameBuffer = frameBufferOperator;



            renderTargetRenderer.init();
        });

        it("create empty texture", function(){
            expect(renderTargetRenderer.frameBufferTexture).toEqual(emptyTexture);
        });
        it("bind frame buffer", function(){
            expect(frameBufferOperator.bindFrameBuffer).toCalledWith(frameBuffer);
        });
        it("attact texture", function(){
            expect(frameBufferOperator.attachTexture).toCalledWith(gl.TEXTURE_2D, emptyTexture);
        });
        it("attach render buffer", function(){
            expect(frameBufferOperator.attachRenderBuffer).toCalledWith("DEPTH_ATTACHMENT", renderBuffer);
        });
        it("check frame buffer", function(){
            expect(frameBufferOperator.check).toCalledOnce();
        });
        it("unBind frame buffer", function(){
            expect(frameBufferOperator.unBind).toCalledOnce();
        });
    });
    
    describe("render", function(){
        var renderTargetTexture,renderer,camera,cameraComponent, frameBufferOperator,renderObj1, renderObj2,plane,frameBufferTexture;

        beforeEach(function(){
            renderObj1 = {
                render: sandbox.stub()
            };
            renderObj2 = {
                render: sandbox.stub()
            };

            plane = {
                getReflectionMatrix: sandbox.stub().returns(dy.Matrix4.create())
            };

            renderTargetTexture = {
                setTexture: sandbox.stub(),
                getPlane: sandbox.stub().returns(plane),
                renderList: dyCb.Collection.create([renderObj1, renderObj2])
            };

            frameBufferOperator = {
                bindFrameBuffer: sandbox.stub(),
                setViewport: sandbox.stub(),
                unBind: sandbox.stub(),
                restoreViewport: sandbox.stub()
            };

            frameBufferTexture = {};

            renderTargetRenderer = new RenderTargetRenderer(renderTargetTexture);
            renderTargetRenderer.frameBuffer = frameBufferOperator;
            renderTargetRenderer.frameBufferTexture = frameBufferTexture;

            renderer = {
                render: sandbox.stub()
            };

            cameraComponent = {
                worldToCameraMatrix: dy.Matrix4.create().rotate(45, 0, 1, 0),
                pMatrix: dy.Matrix4.create()
            };
            camera = {
                getComponent: sandbox.stub().returns(cameraComponent)
            };

            sandbox.stub(renderTargetRenderer, "_setClipPlane").returns(cameraComponent.pMatrix);
        });

        it("attach renderTargetTexture and frameBuffer's texture", function(){
            renderTargetRenderer.render(renderer, camera);

            expect(renderTargetTexture.setTexture).toCalledWith(frameBufferTexture);
        });
        it("set clip plane(viewMatrix is reflectionMatrix * worldToCameraMatrix)", function(){
            renderTargetRenderer.render(renderer, camera);

            expect(renderTargetRenderer._setClipPlane).toCalledWith(plane.getReflectionMatrix().applyMatrix(cameraComponent.worldToCameraMatrix), cameraComponent.pMatrix, plane);
        });
        it("bind frameBuffer and set viewport", function(){
            renderTargetRenderer.render(renderer, camera);

            expect(frameBufferOperator.bindFrameBuffer).toCalledBefore(frameBufferOperator.setViewport);
            expect(frameBufferOperator.bindFrameBuffer).toCalledWith(renderTargetRenderer._frameBuffer);
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

            expect(frameBufferOperator.unBind).toCalledBefore(frameBufferOperator.restoreViewport);
        });
    });
});

