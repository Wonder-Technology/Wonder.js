describe("deviceManager", function () {
    var sandbox = null;
    var material = null;
    var obj;
    var geo;
    var cameraObj;

    var gl;
    var state;

    var Color = wd.Color;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        var data = sceneSystemTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());
        obj = data.gameObject;
        geo = data.geometry;
        material = data.material;
        cameraObj = data.cameraGameObject;


        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("set view port", function () {
        describe("test set after first frame", function () {
            var x,y,width,height;

            beforeEach(function(){
                x = 1;
                y = 2;
                width = 10;
                height = 20;

                directorTool.init(state);
                directorTool.loopBody(state);

                deviceManagerTool.setViewport(x, y, width, height);
            });

            it("set gl viewport", function () {
                expect(gl.viewport.getCall(0)).toCalledWith(x, y, width, height);
            });
            it("set viewport to state", function () {
                expect(testTool.getValues(
                    deviceManagerTool.getViewport()
                )).toEqual([x, y, width, height]);
            });
        });
    });

    describe("set clear color", function () {
        var color;

        beforeEach(function(){
            color = Color.create("#123456");

            deviceManagerTool.setClearColor(color);
        });

        it("save clear color", function () {
            expect(deviceManagerTool.getClearColor()).toEqual(color);
        });
        it("set clear color of gl", function () {
            expect(gl.clearColor).toCalledWith(color.r, color.g, color.b, 1);
        });
    });
});
