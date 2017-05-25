describe("PerspectiveCamera", function () {
    var sandbox = null;
    var cameraGameObject;
    var cameraController;
    var gameObject;

    var gl;
    var state;

    var Matrix4 = wd.Matrix4;

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

    describe("updateProjectionMatrix", function() {
        beforeEach(function(){
        });

        it("update by fovy, aspect, near, far", function(){
            var near = 0.2,
                far = 2000,
                fovy = 65,
                aspect = 0.8;
            cameraControllerTool.setCameraNear(cameraController, near);
            cameraControllerTool.setCameraFar(cameraController, far);
            cameraControllerTool.setPerspectiveCameraFovy(cameraController, fovy);
            cameraControllerTool.setPerspectiveCameraAspect(cameraController, aspect);
            var pos = 0;
            gl.getUniformLocation.withArgs(sinon.match.any, "u_pMatrix").returns(pos);

            directorTool.init(state);
            directorTool.loopBody(state);

            expect(gl.uniformMatrix4fv).toCalledWith(pos, false, Matrix4.create().setPerspective(fovy, aspect, near, far).values);
        });
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
            gameObjectTool.disposeComponent(gameObject, cameraController);

            expect(cameraControllerTool.getPerspectiveCameraFovy(cameraController)).toBeUndefined();
        });
        it("remove aspect", function () {
            gameObjectTool.disposeComponent(gameObject, cameraController);

            expect(cameraControllerTool.getPerspectiveCameraAspect(cameraController)).toBeUndefined();
        });
    });
});
