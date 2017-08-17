describe("test init ubo", function () {
    var sandbox = null;
    var gl;
    var state;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testWebGL2Tool.clearAndOpenContractCheck(sandbox);

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);
    });
    afterEach(function () {
        testWebGL2Tool.clear(sandbox);
        sandbox.restore();
    });

    describe("use light material gameObject for test", function() {
        var material;
        var cameraGameObject;
        var geo;

        beforeEach(function () {
            var data = sceneTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());

            material = data.material;
            cameraGameObject = data.cameraGameObject;
            geo = data.geometry;
        });

        it("create uniform buffers", function(){
            directorTool.init(state);

            expect(gl.createBuffer.callCount).toEqual(5);
        });
        it("allocate binding point", function () {
            directorTool.init(state);

            expect(uboTool.getBindingPoint("CameraUbo")).toEqual(0);
            expect(uboTool.getBindingPoint("LightUbo")).toEqual(1);
            expect(uboTool.getBindingPoint("PointLightUbo")).toEqual(2);
        });
        it("bind uniform block", function () {
            var cameraUboLocation = 10;
            gl.getUniformBlockIndex.withArgs(sinon.match.any, "CameraUbo").returns(cameraUboLocation);

            var lightUboLocation = 20;
            gl.getUniformBlockIndex.withArgs(sinon.match.any, "LightUbo").returns(lightUboLocation);

            var pointLightUboLocation = 30;
            gl.getUniformBlockIndex.withArgs(sinon.match.any, "PointLightUbo").returns(pointLightUboLocation);

            directorTool.init(state);

            expect(gl.uniformBlockBinding.withArgs(sinon.match.any, cameraUboLocation, 0)).toCalledOnce();
            expect(gl.uniformBlockBinding.withArgs(sinon.match.any, lightUboLocation, 1)).toCalledOnce();
            expect(gl.uniformBlockBinding.withArgs(sinon.match.any, pointLightUboLocation, 2)).toCalledOnce();
        });
    });
});