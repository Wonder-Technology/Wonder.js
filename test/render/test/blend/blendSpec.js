describe("blend", function () {
    var sandbox = null;
    var director;
    var camera;
    var gl;

    var centerPos;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        renderTestTool.prepareContext();

        centerPos = renderTestTool.getCenterPoint();

        gl = wd.DeviceManager.getInstance().gl;


        director = wd.Director.getInstance();

        camera = testTool.createCamera();

        director.scene.addChild(camera);
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);

        renderTestTool.destoryContext();

        sandbox.restore();
    });

    describe("test blend gameObject interact with no-blend gameObject", function () {
        beforeEach(function () {

        });

        it("test src:SRC_ALPHA, dst:ONE_MINUE_SRC_ALPHA", function () {
            var rect1 = prepareTool.createRect();
            var material1 = rect1.getComponent(wd.Geometry).material;
            material1.color = wd.Color.create("rgb(200,0,200)");
            material1.opacity = 0.4;
            material1.blend = true;
            material1.blendSrc = wd.EBlendFunc.SRC_ALPHA;
            material1.blendDst = wd.EBlendFunc.ONE_MINUS_SRC_ALPHA;

            rect1.transform.translate(0, 0, 10);


            var rect2 = prepareTool.createRect(20);
            var material2 = rect2.getComponent(wd.Geometry).material;
            material2.color = wd.Color.create("rgb(100,100,100)");
            material2.blend = false;

            director.scene.addChild(rect1);
            director.scene.addChild(rect2);


            director._init();

            director._loopBody(1);


            var src = [200 * 0.4, 0 * 0.4, 200 * 0.4, 255 * 0.4 * 0.4];
            var dst = [100 * 0.6, 100 * 0.6, 100 * 0.6, 255 * 0.6];

            PixelMatcher.comparePixel(gl, centerPos, arrayTool.add(src, dst), PixelMatcher.equal);
        });
    });

    describe("test blend gameObject interact with blend gameObject", function () {
        it("the dst gameObject's opacity shouldn't affect the src gameObject", function () {
            var rect1 = prepareTool.createRect();
            var material1 = rect1.getComponent(wd.Geometry).material;
            material1.color = wd.Color.create("rgb(200,0,200)");
            material1.opacity = 0.4;
            material1.blend = true;
            material1.blendSrc = wd.EBlendFunc.SRC_ALPHA;
            material1.blendDst = wd.EBlendFunc.ONE_MINUS_SRC_ALPHA;

            rect1.transform.translate(0, 0, 10);


            var rect2 = prepareTool.createRect(20);
            var material2 = rect2.getComponent(wd.Geometry).material;
            material2.color = wd.Color.create("rgb(100,100,100)");
            material2.blend = true;
            material2.opacity = 0.9;

            director.scene.addChild(rect1);
            director.scene.addChild(rect2);


            director._init();

            director._loopBody(1);


            var src = [200 * 0.4, 0 * 0.4, 200 * 0.4, 255 * 0.4 * 0.4];
            var dst = [100 * 0.6, 100 * 0.6, 100 * 0.6, 255 * 0.6];

            PixelMatcher.comparePixel(gl, centerPos, arrayTool.add(src, dst), PixelMatcher.equal);
        });
    });
});
