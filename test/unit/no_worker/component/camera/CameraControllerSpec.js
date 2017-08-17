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

        var data = sceneTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());
        cameraGameObject = data.cameraGameObject;
        cameraController = gameObjectTool.getComponent(cameraGameObject, wd.CameraController);

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
            gameObjectTool.disposeComponent(cameraGameObject, cameraController);

            expect(gameObjectTool.hasComponent(cameraGameObject, wd.CameraController)).toBeFalsy();
            expect(cameraControllerTool.getGameObject(cameraController)).toBeUndefined();
        });
        it("remove worldToCameraMatrix", function () {
            directorTool.loopBody(state);

            gameObjectTool.disposeComponent(cameraGameObject, cameraController);

            expect(CameraControllerData.worldToCameraMatrixCacheMap[cameraController.index]).toBeUndefined();
        });
        it("remove from dirtyIndexArray", function () {
            cameraControllerTool.setCameraFar(cameraController, 200);
            cameraControllerTool.setCameraNear(cameraController, 0.1);

            gameObjectTool.disposeComponent(cameraGameObject, cameraController);

            expect(CameraControllerData.dirtyIndexArray).toEqual([])
        });
    });
});
