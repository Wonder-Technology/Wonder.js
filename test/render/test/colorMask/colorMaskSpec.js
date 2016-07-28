describe("colorMask", function () {
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

    describe("set material->color write", function () {
        function prepare(setMaterialColorWriteFunc){
            var rect1 = prepareTool.createRect();
            var material1 = rect1.getComponent(wd.Geometry).material;
            material1.color = wd.Color.create("rgb(200,100,50)");
            setMaterialColorWriteFunc(material1);




            director.scene.addChild(rect1);
        }

        beforeEach(function () {

        });

        it("if redWrite is false, r should always be 0", function () {
            prepare(function(material){
                material.redWrite = false;
            });

            director._init();

            director._loopBody(1);


            PixelMatcher.comparePixel(gl, centerPos, [0,100,50,255], PixelMatcher.equal);
        });
        it("if greenWrite is false, g should always be 0", function () {
            prepare(function(material){
                material.greenWrite = false;
            });

            director._init();

            director._loopBody(1);


            PixelMatcher.comparePixel(gl, centerPos, [200,0,50,255], PixelMatcher.equal);
        });
        it("if blueWrite is false, b should always be 0", function () {
            prepare(function(material){
                material.blueWrite = false;
            });

            director._init();

            director._loopBody(1);


            PixelMatcher.comparePixel(gl, centerPos, [200,100,0,255], PixelMatcher.equal);
        });
        it("if alphaWrite is false, alpha should always be 255", function () {
            prepare(function(material){
                material.opacity = 0.5;

                material.alphaWrite = false;
            });

            director._init();

            director._loopBody(1);


            PixelMatcher.comparePixel(gl, centerPos, [200,100,50,255], PixelMatcher.equal);
        });
    });
});
