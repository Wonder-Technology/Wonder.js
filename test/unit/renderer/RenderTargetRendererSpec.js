describe("RenderTargetRenderer", function() {
    var sandbox = null;
    var Renderer = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Renderer = dy.RenderTargetRenderer;
        sandbox.stub(dy.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

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
    });
});

