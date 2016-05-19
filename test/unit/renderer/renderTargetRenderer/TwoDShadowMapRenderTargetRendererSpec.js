describe("TwoDShadowMapRenderTargetRenderer", function() {
    var sandbox = null;
    var renderer = null;
    var gl;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        gl = wd.DeviceManager.getInstance().gl;

        renderer = new wd.TwoDShadowMapRenderTargetRenderer();
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
    });

    describe("create camera", function(){
        var camera;
        var light;

        beforeEach(function(){
            light = {
                shadowCameraLeft:-10,
                shadowCameraRight: 10,
                shadowCameraTop: 20,
                shadowCameraBottom: -20,
                shadowCameraNear: 0.1,
                shadowCameraFar: 50,
                position: wd.Vector3.create(10, 20, 30)
            };

            renderer._light = light;
        });

        it("create Ortho camera", function(){
            expect(renderer.createCamera().getComponent(wd.CameraController).camera).toBeInstanceOf(wd.OrthographicCamera);
        });
        it("set camera component", function(){
            var cameraComponent = renderer.createCamera().getComponent(wd.CameraController).camera;

            expect(cameraComponent.left).toEqual(light.shadowCameraLeft);
            expect(cameraComponent.right).toEqual(light.shadowCameraRight);
            expect(cameraComponent.top).toEqual(light.shadowCameraTop);
            expect(cameraComponent.bottom).toEqual(light.shadowCameraBottom);
            expect(cameraComponent.near).toEqual(light.shadowCameraNear);
            expect(cameraComponent.far).toEqual(light.shadowCameraFar);
        });
        it("move to light's position, lookAt zero point", function(){
            var camera = renderer.createCamera();
            var transform = wd.ThreeDTransform.create().translate(light.position).lookAt(0, 0, 0);

            expect(camera.transform.position).toEqual(transform.position);
            expect(camera.transform.rotation).toEqual(
                transform.rotation
            )
        });
        it("init camera", function(){
            var firstCallCamera = renderer.createCamera(camera);
            var firstCallCameraCompoment = firstCallCamera.getComponent(wd.CameraController).camera;

            expect(testTool.getValues(firstCallCameraCompoment.pMatrix.values)).toEqual(
                    [ 0.1, 0, 0, 0, 0, 0.05, 0, 0, 0, 0, -0.0400802, 0, 0, 0, -1.0040081, 1 ]
            );
        })
    });
    
    describe("test use depth texture if webgl_depth_texture extension support", function(){
        var depthTexture;

        beforeEach(function(){
            wd.GPUDetector.getInstance().extensionDepthTexture = true;

            depthTexture = wd.TwoDShadowMapTexture.create();
            renderer = wd.TwoDShadowMapRenderTargetRenderer.create(depthTexture,{
                shadowMapWidth:1024,
                shadowMapHeight:1024
            }, {});
        });

        describe("create and attach empty color texture which is not used to pass frameBuffer check", function(){
            var colorGLTexture;

            beforeEach(function(){
                colorGLTexture = {};
                gl.createTexture.onCall(1).returns(colorGLTexture);
            });

            describe("test create empty color texture", function () {
                it("test", function () {
                    renderer.init();

                    expect(gl.bindTexture).toCalledWith(gl.TEXTURE_2D, colorGLTexture);
                    expect(gl.texImage2D).toCalledTwice();
                    expect(gl.texImage2D.secondCall).toCalledAfter(gl.bindTexture.secondCall);
                });
                it("color texture'width,height should be equal with depth texture", function () {
                    renderer.init();

                    expect(gl.texImage2D.secondCall).toCalledWith(gl.TEXTURE_2D, 0, gl.RGBA, 1024, 1024, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
                });
            });

            it("test attach it", function () {
                renderer.init();

                expect(gl.framebufferTexture2D.withArgs(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, sinon.match.any, colorGLTexture, 0)).toCalledOnce();
            });
        });

        describe("attach depth texture", function () {
            var depthGLTexture;

            beforeEach(function(){
                depthGLTexture = {};
                gl.createTexture.onCall(0).returns(depthGLTexture);
            });

            it("test", function () {
                renderer.init();

                expect(gl.framebufferTexture2D.withArgs(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, sinon.match.any, depthGLTexture, 0)).toCalledOnce();
            });
            it("note that the texture's type should be UNSIGHED_SHORT", function () {
                renderer.init();

                expect(gl.texImage2D.firstCall).toCalledWith(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, 1024, 1024, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);
            });
        });

        it("not create and attach depth buffer", function () {
            renderer.init();

            expect(gl.renderbufferStorage).not.toCalled();
            expect(gl.framebufferRenderbuffer).not.toCalled();
        });
        it("no renderBuffer to be deleted when dispose", function () {
            renderer.renderBuffer = {};

            renderer.dispose();

            expect(gl.deleteRenderbuffer.withArgs(renderer.renderBuffer)).not.toCalled();
        });
    });
});

