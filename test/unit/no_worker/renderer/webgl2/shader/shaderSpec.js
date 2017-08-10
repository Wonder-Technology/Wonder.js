describe("shader", function() {
    var sandbox = null;
    var gl;
    var state;
    var material;

    var MaterialData = wd.MaterialData;
    var material_config = wd.webgl2_material_config;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);


        var data = sceneTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());

        material = data.material;
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("use shader for material", function(){
        function isInitShader(expect, gl) {
            expect(gl.createProgram.callCount).toEqual(2);
        }

        function getUsedShaderShaderIndex() {
            return 1;
        }

        it("init material shader", function () {
            directorTool.init(state);
            directorTool.loopBody(state);

            isInitShader(expect, gl);
        });
        it("set shader index", function () {
            directorTool.init(state);
            directorTool.loopBody(state);

            expect(MaterialData.shaderIndices[material.index]).toEqual(getUsedShaderShaderIndex());
        });

        describe("optimize", function () {
            function getFirstBranchShaderLibItem(material_config) {
                return material_config.shaders.materialShaders.GBuffer.filter(function (data) {
                    return data.branch !== undefined;
                })[0];
            }

            function stubBranchFunc(sandbox, material_config) {
                sandbox.stub(getFirstBranchShaderLibItem(material_config), "branch");
            }

            it("not init shader if is already inited before", function () {
                stubBranchFunc(sandbox, material_config);

                directorTool.init(state);
                directorTool.loopBody(state);

                directorTool.loopBody(state);

                expect(getFirstBranchShaderLibItem(material_config).branch).toCalledOnce();
            });
        });
    });
});
