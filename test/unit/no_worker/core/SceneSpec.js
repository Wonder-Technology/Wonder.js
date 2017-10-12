describe("Scene", function() {
    var sandbox = null;
    var scene;

    function shouldAlive(scene, testFunc) {
        sceneSystemTool.dispose(scene);

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
            var child = gameObjectSystemTool.create();
            sceneSystemTool.addGameObject(child);

            var childTran = gameObjectSystemTool.getTransform(child);

            expect(threeDTransformSystemTool.getParent(childTran)).toBeNull();
        });
        it("if gameObject not be added to scene, it will still be rendered", function () {
            sceneSystemTool.addCameraObject();

            sceneSystemTool.createGameObject()

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
            var parent = gameObjectSystemTool.create();
            var child = gameObjectSystemTool.create();


            gameObjectSystemTool.add(parent, child);

            sceneSystemTool.addGameObject(child);

            expect(gameObjectSystemTool.getParent(child)).toEqual(sceneSystemTool.getScene());
        });
    });
});