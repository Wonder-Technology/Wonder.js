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
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    it("type", function () {
        expect(lib.type).toEqual("custom_proceduralTexture");
    });

    describe("sendShaderVariables", function() {
        beforeEach(function () {
            sandbox.stub(program, "sendUniformData");
        });

        it("send custom uniform data", function () {
            lib._proceduralTexture = {
                uniformMap: wdCb.Hash.create({
                    "u_dirtAmplifier": {
                        "type": "FLOAT_1",
                        "value": "6.0"
                    }
                })
            };

            lib.sendShaderVariables(program, cmd);

            expect(program.sendUniformData).toCalledWith("u_dirtAmplifier", wd.EVariableType.FLOAT_1, "6.0");
        });
        it("support send STRUCTURE uniform data", function () {
            lib._proceduralTexture = {
                uniformMap: wdCb.Hash.create({
                    "u_structure": {
                        type: "STRUCTURE",
                        value: {
                            "u_a": {
                                type:"NUMBER_1",
                                value: "10"
                            },
                            "u_b": {
                                type:"FLOAT_1",
                                value: 3.3
                            }
                        }
                    }
                })
            };

            lib.sendShaderVariables(program, cmd);

            expect(program.sendUniformData.firstCall).toCalledWith("u_structure.u_a", wd.EVariableType.NUMBER_1, "10");
            expect(program.sendUniformData.secondCall).toCalledWith("u_structure.u_b", wd.EVariableType.FLOAT_1, 3.3);
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

