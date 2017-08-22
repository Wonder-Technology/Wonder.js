describe("LightMaterial", function () {
    var sandbox = null;
    var material = null;
    var obj;
    var geo;
    var cameraGameObject;

    var gl;
    var state;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("test basic material and light material together", function () {
        var basicMaterial;
        var basicObj;
        var basicGeo;

        beforeEach(function () {
            deferShadingTool.useDeferShading(sandbox);

            var data = sceneTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());
            obj = data.gameObject;
            geo = data.geometry;
            material = data.material;
            cameraGameObject = data.cameraGameObject;

            basicMaterial = basicMaterialTool.create();
            basicGeo = boxGeometryTool.create();

            basicObj = sceneTool.createGameObject(basicGeo, basicMaterial);
            sceneTool.addGameObject(basicObj);
        });

        it("switch program between different shader", function () {
            var program1 = {};
            var program2 = { a: 1 };
            gl.createProgram.onCall(0).returns(program1);
            gl.createProgram.onCall(1).returns(program2);

            directorTool.init(state);

            var createProgramCallCount = gl.createProgram.callCount;
            var useProgramCallCount = gl.useProgram.callCount;

            directorTool.loopBody(state);

            expect(gl.createProgram.callCount).toEqual(createProgramCallCount + 2);
            expect(gl.useProgram.callCount).toEqual(useProgramCallCount);
        });
    });
});
