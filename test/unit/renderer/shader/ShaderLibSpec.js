describe("ShaderLib", function () {
    var sandbox = null;
    var Lib = null;
    var lib = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Lib = dy.ShaderLib;
        lib = new Lib();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("sendUniformData", function(){
        var program;

        beforeEach(function(){
            program = {
                sendUniformData:sandbox.stub()
            }
        });

        it("if uniform name not exist in VariableLib, contract error", function(){
            expect(function(){
                lib.sendUniformData(program, "aaa", {});
            }).toThrow();
        });
    });
});
