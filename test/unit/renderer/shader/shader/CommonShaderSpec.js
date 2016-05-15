describe("CommonShader", function() {
    var sandbox = null;
    var shader = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        shader = wd.CommonShader.create();

        testTool.openContractCheck(sandbox);

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        sandbox.restore();
    });
    
    describe("update", function(){
        var cmd,material;
        var lib;

        beforeEach(function(){
            cmd = rendererTool.createQuadCommand(sandbox);
            material = wd.LightMaterial.create();

            //shader.program = wd.Program.create();


            //sandbox.stub(shader, "judgeRefreshShader");
            sandbox.stub(shader.program, "use");


            lib = {
                sendShaderVariables:sandbox.stub(),
                setShaderDefinition:sandbox.stub()
            }
            shader.addLib(lib);
        });

        //it("judge to refresh shader", function(){
        //    shader.update(cmd, material);
        //
        //    expect(shader.judgeRefreshShader).toCalledOnce();
        //});

        describe("use program", function () {
            var oldProgram;

            beforeEach(function(){
                oldProgram = shader.program;

                shader.libDirty = false;
            });

            it("if definitionDataDirty, use the new program added to ProgramTable", function () {
                shader.vsSource = "aaaaa";

                var newProgram = shadowTool.getNewProgramWhichIsAddedToProgramTable(sandbox);



                shader.update(cmd, material);


                expect(newProgram !== oldProgram).toBeTruthy();

                expect(oldProgram.use).not.toCalled();


                expect(newProgram.use).toCalledOnce();
                expect(newProgram.use).toCalledBefore(lib.sendShaderVariables);
            });
            it("else, use old program", function () {
                shader.update(cmd, material);

                expect(oldProgram.use).toCalledOnce();
                expect(oldProgram.use).toCalledBefore(lib.sendShaderVariables);
            });
        });

        it("send shaderLib->variables", function () {
            shader.update(cmd, material);

            expect(lib.sendShaderVariables).toCalledOnce();
        });
        it("send map data", function () {
            sandbox.stub(shader.mapManager, "sendData");

            shader.update(cmd, material);

            expect(shader.mapManager.sendData).toCalledOnce();
        });
    });
});
