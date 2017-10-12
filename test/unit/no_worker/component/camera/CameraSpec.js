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

        var data = sceneSystemTool.prepareGameObjectAndAddToScene();
        cameraGameObject = data.cameraGameObject;
        cameraController = gameObjectSystemTool.getComponent(cameraGameObject, wd.CameraController);

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
            cameraControllerSystemTool.setCameraNear(cameraController, 0.2);

            expect(cameraControllerSystemTool.getCameraNear(cameraController)).toEqual(0.2);
        });
    });

    describe("getFar", function() {
        beforeEach(function(){

        });

        it("get aspect", function(){
            cameraControllerSystemTool.setCameraFar(cameraController, 100);

            expect(cameraControllerSystemTool.getCameraFar(cameraController)).toEqual(100);
        });
    });

    describe("dispose", function() {
        beforeEach(function(){
            directorTool.init(state);
        });

        it("remove near", function () {
            gameObjectSystemTool.disposeComponent(gameObject, cameraController);

            expect(cameraControllerSystemTool.getCameraNear(cameraController)).toBeUndefined();
        });
        it("remove far", function () {
            gameObjectSystemTool.disposeComponent(gameObject, cameraController);

            expect(cameraControllerSystemTool.getCameraFar(cameraController)).toBeUndefined();
        });
        it("remove worldToCameraMatrix", function () {
            gameObjectSystemTool.disposeComponent(gameObject, cameraController);

            expect(CameraData.worldToCameraMatrixMap[cameraController.index]).toBeUndefined();
        });
        it("remove pMatrixMap", function () {
            gameObjectSystemTool.disposeComponent(gameObject, cameraController);

            expect(cameraControllerSystemTool.getCameraPMatrix(cameraController)).toBeUndefined();
        });
    });
});
