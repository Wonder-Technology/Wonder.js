describe("EngineShader", function() {
    var sandbox = null;
    var shader = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        shader = new wd.EngineShader();

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("constructor", function(){
        beforeEach(function(){
            shader = new wd.EngineShader();
        });

        it("create EngineShaderSourceBuilder", function () {
            expect(shader.sourceBuilder).toEqual(jasmine.any(wd.EngineShaderSourceBuilder));
        });
    });

    //describe("buildDefinitionData", function(){
    //    beforeEach(function(){
    //
    //    });
    //
    //    it("set shader libs->shader definition", function(){
    //        var lib1 = {
    //            setShaderDefinition:sandbox.stub()
    //        };
    //        var lib2 = {
    //            setShaderDefinition:sandbox.stub()
    //        };
    //        shader.addLib(lib1);
    //        shader.addLib(lib2);
    //        var cmd = wd.QuadCommand.create();
    //        var material = wd.BasicMaterial.create();
    //
    //        shader.buildDefinitionData(cmd, material);
    //
    //        expect(lib1.setShaderDefinition).toCalledWith(cmd, material);
    //        expect(lib2.setShaderDefinition).toCalledWith(cmd, material);
    //        expect(lib1.setShaderDefinition).toCalledBefore(lib2.setShaderDefinition);
    //    });
    //    it("clear shader definition", function () {
    //
    //    });
    //
    //});
});
