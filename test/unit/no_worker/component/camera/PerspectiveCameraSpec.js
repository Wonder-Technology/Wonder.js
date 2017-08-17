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

    describe("getFovy", function() {
        beforeEach(function(){

        });

        it("get fovy", function(){
            cameraControllerTool.setPerspectiveCameraFovy(cameraController, 50);

            expect(cameraControllerTool.getPerspectiveCameraFovy(cameraController)).toEqual(50);
        });
    });

    describe("getAspect", function() {
        beforeEach(function(){

        });

        it("get aspect", function(){
            cameraControllerTool.setPerspectiveCameraAspect(cameraController, 0.5);

            expect(cameraControllerTool.getPerspectiveCameraAspect(cameraController)).toEqual(0.5);
        });
    });

    describe("dispose", function() {
        beforeEach(function(){
            directorTool.init(state);
        });

        it("remove fovy", function () {
            gameObjectTool.disposeComponent(cameraGameObject, cameraController);

            expect(cameraControllerTool.getPerspectiveCameraFovy(cameraController)).toBeUndefined();
        });
        it("remove aspect", function () {
            gameObjectTool.disposeComponent(cameraGameObject, cameraController);

            expect(cameraControllerTool.getPerspectiveCameraAspect(cameraController)).toBeUndefined();
        });
    });
});
