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

    describe("updateProjectionMatrix", function() {
        beforeEach(function(){
        });

        it("update by fovy, aspect, near, far", function(){
            var near = 0.2,
                far = 2000,
                fovy = 65,
                aspect = 0.8;
            cameraControllerSystemTool.setCameraNear(cameraController, near);
            cameraControllerSystemTool.setCameraFar(cameraController, far);
            cameraControllerSystemTool.setPerspectiveCameraFovy(cameraController, fovy);
            cameraControllerSystemTool.setPerspectiveCameraAspect(cameraController, aspect);
            var pos = 0;
            gl.getUniformLocation.withArgs(sinon.match.any, "u_pMatrix").returns(pos);

            directorTool.init(state);
            directorTool.loopBody(state);

            expect(gl.uniformMatrix4fv).toCalledWith(pos, false, Matrix4.create().setPerspective(fovy, aspect, near, far).values);
        });
    });
});
