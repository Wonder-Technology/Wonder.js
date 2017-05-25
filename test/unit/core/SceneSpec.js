describe("Scene", function() {
    var sandbox = null;
    var scene;

    function shouldAlive(scene, testFunc) {
        sceneTool.dispose(scene);

        var result = testFunc(scene);

        expect(result === null || result === false).toBeTruthy();
    }

    beforeEach(function(){
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function() {
        sandbox.restore();

        testTool.clear(sandbox);
    });

    describe("addChild", function() {
        beforeEach(function(){

        });

        it("not set child->transform's parent", function () {
            var child = gameObjectTool.create();
            sceneTool.addGameObject(child);

            var childTran = gameObjectTool.getTransform(child);

            expect(threeDTransformTool.getParent(childTran)).toBeNull();
        });
    });
});