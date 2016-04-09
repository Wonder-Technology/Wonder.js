describe("FireProceduralShaderLib", function () {
    var sandbox = null;
    var Lib = null;
    var lib = null;
    var cmd,program;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Lib = wd.FireProceduralShaderLib;
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
        expect(lib.type).toEqual("fire_proceduralTexture");
    });

    describe("sendShaderVariables", function() {
        var fireColor;

        beforeEach(function () {
            fireColor = {
                "c1": wd.Color.create("rgb(0.5, 0.0, 0.1)"),
                "c2": wd.Color.create("rgb(0.9, 0.0, 0.0)"),
                "c3": wd.Color.create("rgb(0.2, 0.0, 0.0)"),
                "c4": wd.Color.create("rgb(1.0, 0.9, 0.0)"),
                "c5": wd.Color.create("rgb(0.1, 0.1, 0.1)"),
                "c6": wd.Color.create("rgb(0.9, 0.9, 0.9)")
            };



            lib._proceduralTexture = wd.FireProceduralTexture.create();

            lib._proceduralTexture.time = 0;
            lib._proceduralTexture.speed = wd.Vector2.create(1,2);

            lib._proceduralTexture.shift = 1;
            lib._proceduralTexture.alphaThreshold = 0.5;
            lib._proceduralTexture.fireColorMap = wdCb.Hash.create(fireColor);


            sandbox.stub(program, "sendUniformData");
        });

        it("compute time", function () {
            lib.sendShaderVariables(program, cmd);

            expect(program.sendUniformData).toCalledWith("u_time", wd.EVariableType.FLOAT_1, 0 + 0.1);
        });

        it("send u_time", function () {
            lib.sendShaderVariables(program, cmd);

            expect(program.sendUniformData).toCalledWith("u_time", wd.EVariableType.FLOAT_1, lib._proceduralTexture.time);
        });
        it("send u_speed", function () {
            lib.sendShaderVariables(program, cmd);

            expect(program.sendUniformData).toCalledWith("u_speed", wd.EVariableType.FLOAT_2, lib._proceduralTexture.speed);
        });
        it("send u_shift", function () {
            lib.sendShaderVariables(program, cmd);

            expect(program.sendUniformData).toCalledWith("u_shift", wd.EVariableType.FLOAT_1, lib._proceduralTexture.shift);
        });
        it("send u_alphaThreshold", function () {
            lib.sendShaderVariables(program, cmd);

            expect(program.sendUniformData).toCalledWith("u_alphaThreshold", wd.EVariableType.FLOAT_1, lib._proceduralTexture.alphaThreshold);
        });

        describe("send fire color", function(){
            beforeEach(function(){
            });

            it("send c1", function(){
                lib.sendShaderVariables(program, cmd);

                expect(program.sendUniformData).toCalledWith("u_fireColor.c1", wd.EVariableType.FLOAT_3, fireColor.c1.toVector3());
            });
        });
    });

    describe("setShaderDefinition", function(){
        var uniformVariableArr;

        beforeEach(function(){
            sandbox.stub(lib, "addUniformVariable");

            lib.setShaderDefinition(cmd);

            uniformVariableArr = lib.addUniformVariable.args[0][0];
        });

        it("send u_time", function(){
            expect(uniformVariableArr.indexOf("u_time") > -1).toBeTruthy();
        });
        it("send u_speed", function(){
            expect(uniformVariableArr.indexOf("u_speed") > -1).toBeTruthy();
        });
        it("send u_shift", function(){
            expect(uniformVariableArr.indexOf("u_shift") > -1).toBeTruthy();
        });
        it("send u_alphaThreshold", function(){
            expect(uniformVariableArr.indexOf("u_alphaThreshold") > -1).toBeTruthy();
        });
        it("send u_fireColor", function(){
            expect(uniformVariableArr.indexOf("u_fireColor") > -1).toBeTruthy();
        });
    });
});

