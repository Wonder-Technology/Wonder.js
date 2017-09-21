describe("LightMaterial", function () {
    var sandbox = null;
    var material = null;
    var obj;
    var geo;
    var cameraGameObject;

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

    describe("test basic material and light material together", function () {
        var basicMaterial;
        var basicObj;
        var basicGeo;

        beforeEach(function () {
            frontRenderTool.useFrontRender(sandbox);

            var data = sceneSystemTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());
            obj = data.gameObject;
            geo = data.geometry;
            material = data.material;
            cameraGameObject = data.cameraGameObject;

            basicMaterial = basicMaterialTool.create();
            basicGeo = boxGeometryTool.create();

            basicObj = sceneSystemTool.createGameObject(basicGeo, basicMaterial);
            sceneSystemTool.addGameObject(basicObj);
        });

        it("switch program between different shader", function () {
            var program1 = {};
            var program2 = { a: 1 };
            gl.createProgram.onCall(0).returns(program1);
            gl.createProgram.onCall(1).returns(program2);

            directorTool.init(state);

            var createProgramCallCount = gl.createProgram.callCount;
            var useProgramCallCount = gl.useProgram.callCount;

            directorTool.loopBody(state);

            expect(gl.createProgram.callCount).toEqual(createProgramCallCount + 2);
            expect(gl.useProgram.callCount).toEqual(useProgramCallCount + 2);
        });
    });

    describe("setMap", function() {
        describe("test in loopBody", function() {
            var gl;
            var state;
            var material;

            beforeEach(function(){
                material = lightMaterialTool.create();

                sceneSystemTool.prepareGameObjectAndAddToScene(false, null, material);

                state = stateTool.createAndSetFakeGLState(sandbox);

                gl = stateTool.getGLFromFakeGLState(state);
            });

            it("test activeTexture", function () {
                lightMaterialTool.setDiffuseMap(material, textureSystemTool.createTexture());


                directorTool.init(state);

                directorTool.loopBody(state);

                expect(gl.activeTexture.withArgs("TEXTURE0")).toCalledOnce();
                expect(gl.activeTexture.withArgs("TEXTURE1")).not.toCalled();





                lightMaterialTool.setDiffuseMap(material, textureSystemTool.createTexture());
                lightMaterialTool.setSpecularMap(material, textureSystemTool.createTexture());


                directorTool.loopBody(state);

                expect(gl.activeTexture.withArgs("TEXTURE0")).toCalledTwice();
                expect(gl.activeTexture.withArgs("TEXTURE1")).toCalledOnce();
            });
            it("test send map data", function () {
                var pos1 = 0;
                textureSystemTool.prepareSendData(gl, "u_diffuseMapSampler", pos1);
                var pos2 = 1;
                textureSystemTool.prepareSendData(gl, "u_specularMapSampler", pos2);

                lightMaterialTool.setDiffuseMap(material, textureSystemTool.createTexture());


                directorTool.init(state);

                directorTool.loopBody(state);

                expect(gl.uniform1i.withArgs(pos1, 0)).toCalledOnce();
                expect(gl.uniform1i.withArgs(pos1, 1)).not.toCalled();





                lightMaterialTool.setDiffuseMap(material, textureSystemTool.createTexture());
                lightMaterialTool.setSpecularMap(material, textureSystemTool.createTexture());


                directorTool.loopBody(state);

                expect(gl.uniform1i.withArgs(pos1, 0)).toCalledOnce();
                expect(gl.uniform1i.withArgs(pos1, 1)).not.toCalled();

                expect(gl.uniform1i.withArgs(pos2, 1)).toCalledOnce();
                expect(gl.uniform1i.withArgs(pos2, 0)).not.toCalled();
            });
        });
    });
});
