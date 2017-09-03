describe("CameraController", function () {
    var sandbox = null;
    var cameraGameObject;
    var cameraController;

    var gl;
    var state;

    var Matrix4 = wd.Matrix4;
    var CameraControllerData = wd.CameraControllerData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        var data = sceneSystemTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());
        cameraGameObject = data.cameraGameObject;
        cameraController = gameObjectSystemTool.getComponent(cameraGameObject, wd.CameraController);

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("disposeComponent", function() {
        beforeEach(function(){
            directorTool.init(state);
        });

        it("remove from gameObject", function () {
            gameObjectSystemTool.disposeComponent(cameraGameObject, cameraController);

            expect(gameObjectSystemTool.hasComponent(cameraGameObject, wd.CameraController)).toBeFalsy();
            expect(cameraControllerSystemTool.getGameObject(cameraController)).toBeUndefined();
        });
        it("remove worldToCameraMatrix", function () {
            directorTool.loopBody(state);

            gameObjectSystemTool.disposeComponent(cameraGameObject, cameraController);

            expect(CameraControllerData.worldToCameraMatrixCacheMap[cameraController.index]).toBeUndefined();
        });
        it("remove from dirtyIndexArray", function () {
            cameraControllerSystemTool.setCameraFar(cameraController, 200);
            cameraControllerSystemTool.setCameraNear(cameraController, 0.1);

            gameObjectSystemTool.disposeComponent(cameraGameObject, cameraController);

            expect(CameraControllerData.dirtyIndexArray).toEqual([])
        });
    });
});
