describe("Camera", function () {
    var sandbox = null;
    var cameraGameObject;
    var cameraController;
    var gameObject;

    var gl;
    var state;

    var CameraData = wd.CameraData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        var data = sceneTool.prepareGameObjectAndAddToScene();
        cameraGameObject = data.cameraGameObject;
        cameraController = gameObjectTool.getComponent(cameraGameObject, wd.CameraController);

        gameObject = data.gameObject;

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

    describe("dispose", function() {
        beforeEach(function(){
            directorTool.init(state);
        });

        it("remove near", function () {
            gameObjectTool.disposeComponent(gameObject, cameraController);

            expect(cameraControllerTool.getCameraNear(cameraController)).toBeUndefined();
        });
        it("remove far", function () {
            gameObjectTool.disposeComponent(gameObject, cameraController);

            expect(cameraControllerTool.getCameraFar(cameraController)).toBeUndefined();
        });
        it("remove worldToCameraMatrix", function () {
            gameObjectTool.disposeComponent(gameObject, cameraController);

            expect(CameraData.worldToCameraMatrixMap[cameraController.index]).toBeUndefined();
        });
        it("remove pMatrixMap", function () {
            gameObjectTool.disposeComponent(gameObject, cameraController);

            expect(cameraControllerTool.getCameraPMatrix(cameraController)).toBeUndefined();
        });
    });
});
