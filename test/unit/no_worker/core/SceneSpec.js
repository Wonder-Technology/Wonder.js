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
        it("if gameObject not be added to scene, it will still be rendered", function () {
            sceneTool.addCameraObject();

            sceneTool.createGameObject()

            state = stateTool.createAndSetFakeGLState(sandbox);
            gl = stateTool.getGLFromFakeGLState(state);

            directorTool.init(state);
            directorTool.loopBody(state);

            expect(gl.drawElements).toCalledOnce();
        });
    });

    describe("fix bug", function() {
        beforeEach(function(){
        });

        it("test add gameObject which has parent to scene", function(){
            var parent = gameObjectTool.create();
            var child = gameObjectTool.create();


            gameObjectTool.add(parent, child);

            sceneTool.addGameObject(child);

            expect(gameObjectTool.getParent(child)).toEqual(sceneTool.getScene());
        });
    });
});