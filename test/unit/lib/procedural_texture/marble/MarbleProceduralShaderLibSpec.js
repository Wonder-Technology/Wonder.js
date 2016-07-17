describe("MarbleProceduralShaderLib", function () {
    var sandbox = null;
    var Lib = null;
    var lib = null;
    var cmd,program;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Lib = wd.MarbleProceduralShaderLib;
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
        expect(lib.type).toEqual("marble_proceduralTexture");
    });

    describe("sendShaderVariables", function() {
        beforeEach(function () {
            lib._proceduralTexture = {
                tilesHeightNumber:3,
                tilesWidthNumber: 4,
                amplitude: 10,
                jointColor:wd.Color.create("#111111")
            };

            sandbox.stub(program, "sendUniformData");
        });

        it("send u_tilesHeightNumber", function () {
            lib.sendShaderVariables(program, cmd);

            expect(program.sendUniformData).toCalledWith("u_tilesHeightNumber", wd.EVariableType.FLOAT_1, lib._proceduralTexture.tilesHeightNumber);
        });
        it("send u_tilesWidthNumber", function () {
            lib.sendShaderVariables(program, cmd);

            expect(program.sendUniformData).toCalledWith("u_tilesWidthNumber", wd.EVariableType.FLOAT_1, lib._proceduralTexture.tilesWidthNumber);
        });
        it("send u_amplitude", function () {
            lib.sendShaderVariables(program, cmd);

            expect(program.sendUniformData).toCalledWith("u_amplitude", wd.EVariableType.FLOAT_1, lib._proceduralTexture.amplitude);
        });
        it("send u_jointColor", function () {
            lib.sendShaderVariables(program, cmd);

            expect(program.sendUniformData).toCalledWith("u_jointColor", wd.EVariableType.VECTOR_3, lib._proceduralTexture.jointColor.toVector3());
        });
    });

    describe("setShaderDefinition", function(){
        var uniformVariableArr;

        beforeEach(function(){
            sandbox.stub(lib, "addUniformVariable");

            lib.setShaderDefinition(cmd);

            uniformVariableArr = lib.addUniformVariable.args[0][0];
        });

        it("send u_tilesHeightNumber", function(){
            expect(uniformVariableArr.indexOf("u_tilesHeightNumber") > -1).toBeTruthy();
        });
        it("send u_tilesWidthNumber", function(){
            expect(uniformVariableArr.indexOf("u_tilesWidthNumber") > -1).toBeTruthy();
        });
        it("send u_amplitude", function(){
            expect(uniformVariableArr.indexOf("u_amplitude") > -1).toBeTruthy();
        });
        it("send u_jointColor", function(){
            expect(uniformVariableArr.indexOf("u_jointColor") > -1).toBeTruthy();
        });
    });
});

