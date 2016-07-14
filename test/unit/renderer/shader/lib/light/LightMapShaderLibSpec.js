describe("LightMapShaderLib", function () {
    var sandbox = null;
    var Lib = null;
    var lib = null;
    var cmd,program,material;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Lib = wd.LightMapShaderLib;
        lib = new Lib();

        material = wd.LightMaterial.create();
        cmd = new wd.QuadCommand();
        program = new wd.Program();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("sendShaderVariables", function() {
        beforeEach(function () {
            sandbox.stub(cmd, "buffers", {
                getChild: sandbox.stub().returns([])
            });

            sandbox.stub(program, "sendAttributeBuffer");
            sandbox.stub(program, "sendUniformData");
        });

        it("send lightMap intensity", function () {
            material.lightMap = wd.ImageTexture.create({});
            material.lightMapIntensity = 0.5;


            lib.sendShaderVariables(program, cmd, material);

            expect(program.sendUniformData).toCalledWith("u_lightMapIntensity", wd.EVariableType.FLOAT_1, 0.5);
        });
    });


    describe("setShaderDefinition", function(){
        var uniformVariableArr;

        beforeEach(function(){
            sandbox.stub(lib, "addUniformVariable");

            lib.setShaderDefinition(cmd, material);

            uniformVariableArr = lib.addUniformVariable.args[0][0];
        });

        it("send u_lightMapSampler", function(){
            expect(uniformVariableArr.indexOf("u_lightMapSampler") > -1).toBeTruthy();
        });
        it("send u_lightMapIntensity", function(){
            expect(uniformVariableArr.indexOf("u_lightMapIntensity") > -1).toBeTruthy();
        });
    });
});

