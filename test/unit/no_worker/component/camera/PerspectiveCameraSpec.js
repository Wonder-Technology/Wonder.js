describe("PerspectiveCamera", function () {
    var sandbox = null;
    var cameraGameObject;
    var cameraController;

    var gl;
    var state;

    var Matrix4 = wd.Matrix4;

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

    describe("getFovy", function() {
        beforeEach(function(){

        });

        it("get fovy", function(){
            cameraControllerSystemTool.setPerspectiveCameraFovy(cameraController, 50);

            expect(cameraControllerSystemTool.getPerspectiveCameraFovy(cameraController)).toEqual(50);
        });
    });

    describe("getAspect", function() {
        beforeEach(function(){

        });

        it("get aspect", function(){
            cameraControllerSystemTool.setPerspectiveCameraAspect(cameraController, 0.5);

            expect(cameraControllerSystemTool.getPerspectiveCameraAspect(cameraController)).toEqual(0.5);
        });
    });

    describe("dispose", function() {
        beforeEach(function(){
            directorTool.init(state);
        });

        it("remove fovy", function () {
            gameObjectSystemTool.disposeComponent(cameraGameObject, cameraController);

            expect(cameraControllerSystemTool.getPerspectiveCameraFovy(cameraController)).toBeUndefined();
        });
        it("remove aspect", function () {
            gameObjectSystemTool.disposeComponent(cameraGameObject, cameraController);

            expect(cameraControllerSystemTool.getPerspectiveCameraAspect(cameraController)).toBeUndefined();
        });
    });
});
