describe("Shader", function() {
    var sandbox = null;
    var shader = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        wd.Shader.prototype.createShaderSourceBuilder = sandbox.stub().returns(new wd.ShaderSourceBuilder());

        shader = new wd.Shader();

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();
    });

    //describe("constructor", function(){
    //    beforeEach(function(){
    //        wd.Shader.prototype.createShaderSourceBuilder = sandbox.stub().returns(new wd.ShaderSourceBuilder());
    //
    //        shader = new wd.Shader();
    //    });
    //
    //    it("create shaderSourceBuilder", function () {
    //        expect(shader.createShaderSourceBuilder).toCalledOnce();
    //    });
    //});


    describe("dirty(getter)", function(){
        it("if libDirty or definitionDataDirty, shader dirty", function(){
            shader.libDirty = true;
            shader.definitionDataDirty = false;

            expect(shader.dirty).toBeTruthy();

            shader.libDirty = false;
            shader.definitionDataDirty = true;

            expect(shader.dirty).toBeTruthy();

            shader.libDirty = false;
            shader.definitionDataDirty = false;

            expect(shader.dirty).toBeFalsy();
        });
    });

    describe("init", function(){
        beforeEach(function(){
            sandbox.stub(shader, "judgeRefreshShader");
        });
        
        it("init shader libs", function(){
            var lib = new wd.ShaderLib();
            sandbox.stub(lib, "init");
            shader.addLib(lib);

            shader.init();

            expect(lib.init).toCalledOnce();
        });
        it("judge refresh shader", function () {
            shader.init();

            expect(shader.judgeRefreshShader).toCalledOnce();
        });
    });

    //describe("judgeRefreshShader", function(){
    //    beforeEach(function(){
    //        shader.buildDefinitionData = sandbox.stub();
    //        testTool.closeContractCheck(sandbox);
    //        sandbox.stub(shader.program, "initWithShader");
    //
    //    });
    //
    //    it("if lib dirty, build definitionData", function(){
    //        shader.libDirty = true;
    //
    //        shader.judgeRefreshShader();
    //
    //        expect(shader.buildDefinitionData).toCalledOnce();
    //    });
    //    //it("if definitionData dirty , program init with shader", function(){
    //    //    shader.definitionDataDirty = false;
    //    //    shader.fsSource = "aaa";
    //    //
    //    //    shader.judgeRefreshShader();
    //    //
    //    //    expect(shader.program.initWithShader).toCalledWith(shader);
    //    //});
    //    it("set libDirty, definitionDataDirty = false", function () {
    //        shader.libDirty = true;
    //        shader.fsSource = "aaa";
    //
    //        shader.judgeRefreshShader();
    //
    //        expect(shader.libDirty).toBeFalsy();
    //        expect(shader.definitionDataDirty).toBeFalsy();
    //    });
    //});

    describe("test program", function(){
        var vsSource,
            fsSource;
        var program;

        function getProgramTableKey(){
            return vsSource + "\n" + fsSource;
        }

        beforeEach(function(){
            vsSource = "a";
            fsSource = "b";

            program = {
                initWithShader:sandbox.stub()
            };
        });


        describe("test register and update program", function(){
            describe("if definitionDataDirty", function(){
                beforeEach(function(){
                    sandbox.stub(wd.Program, "create").returns(program);

                    shader.vsSource = vsSource;
                    shader.fsSource = fsSource;


                    shader.judgeRefreshShader();
                });

                describe("if ProgramTable not has the program of this shader", function(){
                    it("register program", function () {
                        expect(wd.ProgramTable.hasProgram(getProgramTableKey())).toBeTruthy();
                        it("update program", function () {
                            expect(program.initWithShader).toCalledOnce();
                        });
                    });
                });

                describe("else", function(){
                    beforeEach(function(){
                        wd.ProgramTable.addProgram(getProgramTableKey(), program);
                    });

                    it("not register and update program", function(){
                        sandbox.spy(wd.ProgramTable, "addProgram");

                        shader.judgeRefreshShader();

                        expect(wd.ProgramTable.addProgram).not.toCalled();
                        expect(program.initWithShader).not.toCalled();
                    });
                });
            });

            describe("fix bug", function(){
                beforeEach(function(){
                });

                it("if shader b has the same vsSource,fsSource with shader a and it is definitionDataDirty, not register new Program and not update the exist program which is used by shader a and b", function(){
                    var vsSource = "a",
                        fsSource = "b";
                    var program = {
                        initWithShader:sandbox.stub()
                    };
                    var shader2 = new wd.Shader();

                    shader.vsSource = vsSource;
                    shader2.vsSource = vsSource;

                    shader.fsSource = fsSource;
                    shader2.fsSource = fsSource;
                    wd.ProgramTable.addProgram(getProgramTableKey(), program);

                    sandbox.spy(wd.ProgramTable, "addProgram");


                    shader.judgeRefreshShader();
                    shader2.judgeRefreshShader();

                    expect(wd.ProgramTable.addProgram).not.toCalled();
                    expect(program.initWithShader).not.toCalled();
                });
            });
        });

        describe("get program", function(){
            //it("if program is undefined, error", function () {
            //    expect(function(){
            //        var program  = shader.program;
            //    }).toThrow("not exist");
            //});

            it("get program from ProgramTable", function () {
                shader.vsSource = vsSource;
                shader.fsSource = fsSource;
                wd.ProgramTable.addProgram(getProgramTableKey(), program);

                expect(shader.program).toEqual(program);
            });
        });
    });

    describe("dispose", function(){
        beforeEach(function(){
            //sandbox.stub(shader.program, "dispose");
        });
        
        it("dispose shader libs", function(){
            var lib = new wd.ShaderLib();
            sandbox.stub(lib, "dispose");
            shader.addLib(lib);

            shader.dispose();

            expect(lib.dispose).toCalledOnce();
        });
        //it("dispose program", function(){
        //    shader.dispose();
        //
        //    expect(shader.program.dispose).toCalledOnce();
        //});
        it("clear attributes,uniforms", function () {
            sandbox.stub(shader.attributes, "removeAllChildren");
            sandbox.stub(shader.uniforms, "removeAllChildren");

            shader.dispose();

            expect(shader.attributes.removeAllChildren).toCalledOnce();
            expect(shader.uniforms.removeAllChildren).toCalledOnce();
        });
        it("dispose mapManager", function(){
            sandbox.stub(shader.mapManager, "dispose");

            shader.dispose();

            expect(shader.mapManager.dispose).toCalledOnce();
        });
    });
});
