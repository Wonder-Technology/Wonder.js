describe("test init ubo", function () {
    var sandbox = null;
    var gl;
    var state;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);
    });
    afterEach(function () {
        testTool.clear(sandbox);
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

            expect(gl.createBuffer.callCount).toEqual(8);
        });

        describe("allocate binding point", function () {
            it("test", function () {
                directorTool.init(state);

                expect(uboTool.getBindingPoint("CameraUbo")).toEqual(0);
                expect(uboTool.getBindingPoint("LightUbo")).toEqual(1);
                expect(uboTool.getBindingPoint("DirectionLightUbo")).toEqual(2);
                expect(uboTool.getBindingPoint("PointLightUbo")).toEqual(3);
            });
            it("if binding point exceed maxUniformBufferBindings, error", function () {
                gpuDetectTool.setGPUDetectData("maxUniformBufferBindings", 1);

                expect(function(){
                    directorTool.init(state);
                }).toThrow("uboBindingPoint shouldn't exceed maxUniformBufferBindings");
            });
        });

        it("bind uniform block", function () {
            var cameraUboLocation = 10;
            gl.getUniformBlockIndex.withArgs(sinon.match.any, "CameraUbo").returns(cameraUboLocation);

            var lightUboLocation = 20;
            gl.getUniformBlockIndex.withArgs(sinon.match.any, "LightUbo").returns(lightUboLocation);

            var directionLightUboLocation = 30;
            gl.getUniformBlockIndex.withArgs(sinon.match.any, "DirectionLightUbo").returns(directionLightUboLocation);

            var pointLightUboLocation = 40;
            gl.getUniformBlockIndex.withArgs(sinon.match.any, "PointLightUbo").returns(pointLightUboLocation);

            directorTool.init(state);

            expect(gl.uniformBlockBinding.withArgs(sinon.match.any, cameraUboLocation, 0)).toCalledOnce();
            expect(gl.uniformBlockBinding.withArgs(sinon.match.any, lightUboLocation, 1)).toCalledOnce();
            expect(gl.uniformBlockBinding.withArgs(sinon.match.any, directionLightUboLocation, 2)).toCalledOnce();
            expect(gl.uniformBlockBinding.withArgs(sinon.match.any, pointLightUboLocation, 3)).toCalledOnce();
        });
    });
});