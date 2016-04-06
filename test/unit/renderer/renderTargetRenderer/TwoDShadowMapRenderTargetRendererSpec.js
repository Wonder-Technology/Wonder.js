describe("TwoDShadowMapRenderTargetRenderer", function() {
    var sandbox = null;
    var renderer = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        renderer = new wd.TwoDShadowMapRenderTargetRenderer();
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance();
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
});

