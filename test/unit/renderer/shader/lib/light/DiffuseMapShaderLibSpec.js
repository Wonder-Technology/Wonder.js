describe("DiffuseMapShaderLib", function () {
    var sandbox = null;
    var Lib = null;
    var lib = null;
    var quadCmd,program,material;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Lib = wd.DiffuseMapShaderLib;
        lib = new Lib();

        material = new wd.LightMaterial();
        quadCmd = new wd.QuadCommand();
        program = new wd.Program();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("sendShaderVariables", function() {
        beforeEach(function () {
            sandbox.stub(quadCmd, "buffers", {
                getChild: sandbox.stub().returns([])
            });

            sandbox.stub(program, "sendAttributeData");
            sandbox.stub(program, "sendUniformData");
        });

        describe("if diffuseMap is BasicTexture", function(){
            beforeEach(function(){
                material.diffuseMap = wd.ImageTexture.create({});
            });

            it("send diffuseSourceRegion", function () {
                material.diffuseMap.sourceRegion = wd.RectRegion.create(0,64,100,200);
                material.diffuseMap.sourceRegionMethod = wd.ETextureSourceRegionMethod.CHANGE_TEXCOORDS_IN_GLSL;

                lib.sendShaderVariables(program, quadCmd, material);

                expect(program.sendUniformData).toCalledWith("u_diffuseSourceRegion", wd.EVariableType.FLOAT_4, material.diffuseMap.sourceRegionForGLSL);
            });
            it("send diffuseRepeatRegion", function () {
                material.diffuseMap.repeatRegion = wd.RectRegion.create(0,64,100,200);

                lib.sendShaderVariables(program, quadCmd, material);

                expect(program.sendUniformData).toCalledWith("u_diffuseRepeatRegion", wd.EVariableType.FLOAT_4, material.diffuseMap.repeatRegion);
            });
        });

        describe("if diffuseMap is ProceduralTexture, send the default value", function(){
            beforeEach(function(){
                material.diffuseMap = wd.MarbleProceduralTexture.create();
            });

            it("send diffuseSourceRegion", function () {
                lib.sendShaderVariables(program, quadCmd, material);

                expect(program.sendUniformData).toCalledWith("u_diffuseSourceRegion", wd.EVariableType.FLOAT_4, wd.RectRegion.create(0, 0, 1, 1));
            });
            it("send diffuseRepeatRegion", function () {
                lib.sendShaderVariables(program, quadCmd, material);

                expect(program.sendUniformData).toCalledWith("u_diffuseRepeatRegion", wd.EVariableType.FLOAT_4, wd.RectRegion.create(0, 0, 1, 1));
            });
        });
    });

    describe("setShaderDefinition", function(){
        var uniformVariableArr;

        beforeEach(function(){
            sandbox.stub(lib, "addUniformVariable");

            lib.setShaderDefinition(quadCmd, material);

            uniformVariableArr = lib.addUniformVariable.args[0][0];
        });

        it("send u_diffuseMapSampler", function(){
            expect(uniformVariableArr.indexOf("u_diffuseMapSampler") > -1).toBeTruthy();
        });
        it("send u_diffuseSourceRegion", function(){
            expect(uniformVariableArr.indexOf("u_diffuseSourceRegion") > -1).toBeTruthy();
        });
        it("send u_diffuseRepeatRegion", function(){
            expect(uniformVariableArr.indexOf("u_diffuseRepeatRegion") > -1).toBeTruthy();
        });
    });
});

