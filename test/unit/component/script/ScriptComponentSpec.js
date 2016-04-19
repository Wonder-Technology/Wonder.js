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

        it("clone url", function(){
            var url = "/aaa.js";

            cloneTool.extend(script, {
                url:url
            });

            var result = script.clone();

            expect(result === script).toBeFalsy();
            expect(result.url).toEqual(url);
        });
    });
});
