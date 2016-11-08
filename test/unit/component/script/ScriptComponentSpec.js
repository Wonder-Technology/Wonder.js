describe("Script", function () {
    var sandbox = null;
    var script = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        script = wd.Script.create();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("clone", function(){
        beforeEach(function(){

        });

        it("clone id", function(){
            var id = "aaa";

            cloneTool.extend(script, {
                id:id
            });

            var result = script.clone();

            expect(result === script).toBeFalsy();
            expect(result.id).toEqual(id);
        });
    });
});
