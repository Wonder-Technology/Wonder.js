describe("PointLight", function () {
    var sandbox = null;
    var state;

    // var Light = wd.Light;
    // var PointLight = wd.PointLight;
    // var Vector3 = wd.Vector3;
    var PointLightData = wd.WebGL2PointLightData;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        var data = sceneTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());

        state = stateTool.createAndSetFakeGLState(sandbox);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("disposeComponent", function () {
        pointLightSystemTool.jugdgeDisposeComponent(describe, it, expect, PointLightData);
    });
});
