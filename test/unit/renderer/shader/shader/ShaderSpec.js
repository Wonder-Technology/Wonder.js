describe("Shader", function() {
    var sandbox = null;
    var shader = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        wd.Shader.prototype.createShaderSourceBuilder = sandbox.stub().returns(new wd.ShaderSourceBuilder());

        shader = new wd.Shader();
        shader.initWhenCreate();

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("constructor", function(){
        beforeEach(function(){
            wd.Shader.prototype.createShaderSourceBuilder = sandbox.stub().returns(new wd.ShaderSourceBuilder());

            shader = new wd.Shader();
        });

        it("create shaderSourceBuilder", function () {
            expect(shader.createShaderSourceBuilder).toCalledOnce();
        });
    });


    describe("dirty(getter)", function(){
        it("if libDirty or definitionDataDirty, shader dirty", function(){
            shader.libDirty = true;
            shader._definitionDataDirty = false;

            expect(shader.dirty).toBeTruthy();

            shader.libDirty = false;
            shader._definitionDataDirty = true;

            expect(shader.dirty).toBeTruthy();

            shader.libDirty = false;
            shader._definitionDataDirty = false;

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

    describe("judgeRefreshShader", function(){
        beforeEach(function(){
            shader.buildDefinitionData = sandbox.stub();
            sandbox.stub(shader.program, "initWithShader");
        });

        it("if lib dirty, build definitionData", function(){
            shader.libDirty = true;

            shader.judgeRefreshShader();

            expect(shader.buildDefinitionData).toCalledOnce();
        });
        it("if definitionData dirty , program init with shader", function(){
            shader._definitionDataDirty = false;
            shader.fsSource = "aaa";

            shader.judgeRefreshShader();

            expect(shader.program.initWithShader).toCalledWith(shader);
        });
        it("set libDirty, _definitionDataDirty = false", function () {
            shader.libDirty = true;
            shader.fsSource = "aaa";

            shader.judgeRefreshShader();

            expect(shader.libDirty).toBeFalsy();
            expect(shader._definitionDataDirty).toBeFalsy();
        });
    });
    
    describe("dispose", function(){
        beforeEach(function(){
            sandbox.stub(shader.program, "dispose");
        });
        
        it("dispose shader libs", function(){
            var lib = new wd.ShaderLib();
            sandbox.stub(lib, "dispose");
            shader.addLib(lib);

            shader.dispose();

            expect(lib.dispose).toCalledOnce();
        });
        it("dispose program", function(){
            shader.dispose();

            expect(shader.program.dispose).toCalledOnce();
        });
        it("clear attributes,uniforms", function () {
            sandbox.stub(shader.attributes, "removeAllChildren");
            sandbox.stub(shader.uniforms, "removeAllChildren");

            shader.dispose();

            expect(shader.attributes.removeAllChildren).toCalledOnce();
            expect(shader.uniforms.removeAllChildren).toCalledOnce();
        });

    });
});
