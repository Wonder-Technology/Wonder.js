describe("BasicMaterial", function () {
    var sandbox = null;

    var BasicMaterialData = wd.BasicMaterialData;
    var DataBufferConfig = wd.DataBufferConfig;
    var MapManagerData = wd.MapManagerData;
    var TextureData = wd.TextureData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("setMap", function() {
        describe("test in loopBody", function() {
            var gl;
            var state;
            var material;

            beforeEach(function(){
                material = basicMaterialTool.create();

                sceneSystemTool.prepareGameObjectAndAddToScene(false, null, material);

                state = stateTool.createAndSetFakeGLState(sandbox);

                gl = stateTool.getGLFromFakeGLState(state);
            });

            it("test activeTexture", function () {
                basicMaterialTool.setMap(material, textureSystemTool.createTexture());


                directorTool.init(state);

                directorTool.loopBody(state);

                expect(gl.activeTexture.withArgs("TEXTURE0")).toCalledOnce();
                expect(gl.activeTexture.withArgs("TEXTURE1")).not.toCalled();





                basicMaterialTool.setMap(material, textureSystemTool.createTexture());


                directorTool.loopBody(state);

                expect(gl.activeTexture.withArgs("TEXTURE0")).toCalledTwice();
                expect(gl.activeTexture.withArgs("TEXTURE1")).not.toCalled();
            });
            it("test send map data", function () {
                var pos = 0;
                textureSystemTool.prepareSendData(gl, "u_sampler2D", pos);

                basicMaterialTool.setMap(material, textureSystemTool.createTexture());


                directorTool.init(state);

                directorTool.loopBody(state);

                expect(gl.uniform1i.withArgs(pos, 0)).toCalledOnce();
                expect(gl.uniform1i.withArgs(pos, 1)).not.toCalled();





                basicMaterialTool.setMap(material, textureSystemTool.createTexture());


                directorTool.loopBody(state);

                expect(gl.uniform1i.withArgs(pos, 0)).toCalledOnce();
                expect(gl.uniform1i.withArgs(pos, 1)).not.toCalled();
            });
        });
    });
});
