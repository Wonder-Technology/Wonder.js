describe("Camera", function () {
    var sandbox = null;
    var cameraGameObject;
    var cameraController;

    var gl;
    var state;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        var data = sceneTool.prepareGameObjectAndAddToScene();
        cameraGameObject = data.cameraGameObject;
        cameraController = gameObjectTool.getComponent(cameraGameObject, wd.CameraController);

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("getNear", function() {
        beforeEach(function(){

        });

        it("get near", function(){
            cameraControllerTool.setCameraNear(cameraController, 0.2);

            expect(cameraControllerTool.getCameraNear(cameraController)).toEqual(0.2);
        });
    });

    describe("getFar", function() {
        beforeEach(function(){

        });

        it("get aspect", function(){
            cameraControllerTool.setCameraFar(cameraController, 100);

            expect(cameraControllerTool.getCameraFar(cameraController)).toEqual(100);
        });
    });
});
