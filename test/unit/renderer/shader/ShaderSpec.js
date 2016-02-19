describe("Shader", function() {
    var sandbox = null;
    var shader = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        shader = new wd.Shader();

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();
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
            
        });
        
        it("init shader libs", function(){
            var lib = new wd.ShaderLib();
            sandbox.stub(lib, "init");
            shader.addLib(lib);

            shader.init();

            expect(lib.init).toCalledOnce();
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
    
    describe("update", function(){
        var quadCmd,material;

        beforeEach(function(){
            quadCmd = wd.QuadCommand.create();
            material = new wd.Material();

            sandbox.stub(shader.program, "initWithShader");
            sandbox.stub(shader.program, "use");
            sandbox.stub(shader.program, "sendAttributeDataFromCustomShader");
            sandbox.stub(shader.program, "sendUniformDataFromCustomShader");
        });
        
        it("if shader.libDirty === false, not build definition data", function(){
            sandbox.stub(shader, "buildDefinitionData");
            shader.libDirty = false;

            shader.update(quadCmd, material);

            expect(shader.buildDefinitionData).not.toCalled();
        });

        //todo more tests
    });
});
