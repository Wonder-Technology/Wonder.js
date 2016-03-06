describe("CustomProceduralShaderLib", function () {
    var sandbox = null;
    var Lib = null;
    var lib = null;
    var cmd,program;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Lib = wd.CustomProceduralShaderLib;
        lib = new Lib();

        cmd = new wd.ProceduralCommand();
        program = new wd.Program();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    it("type", function () {
        expect(lib.type).toEqual("custom_proceduralTexture");
    });

    describe("sendShaderVariables", function() {
        beforeEach(function () {
            lib._proceduralTexture = {
                uniformMap: wdCb.Hash.create({
                    "u_dirtAmplifier": {
                        "type": "FLOAT_1",
                        "value": "6.0"
                    }
                })
            };

            sandbox.stub(program, "sendUniformData");
        });

        it("send custom uniform data", function () {
            lib.sendShaderVariables(program, cmd);

            expect(program.sendUniformData).toCalledWith("u_dirtAmplifier", wd.EVariableType.FLOAT_1, "6.0");
        });
    });

    describe("setShaderDefinition", function(){
        beforeEach(function(){
            lib._proceduralTexture = {
                fsSource:"void main(){};"
            };
        });
    
        it("set texture.fsSource to be fsSource", function () {
            lib.setShaderDefinition(cmd);

            expect(lib.fsSource).toEqual(lib._proceduralTexture.fsSource);
        });
    });
});

