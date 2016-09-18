describe("envMap for light", function () {
    var gl = null;
    var device;
    var sandbox;
    var director;

    var box1;

    var renderer;
    var camera;

    function prepare(mode){
        box1 = prepareTool.createBox();
        var cubemap = new wd.CubemapTexture();

        cubemap.mode = mode || wd.EEnvMapMode.REFLECTION;

        box1.getComponent(wd.Geometry).material = wd.LightMaterial.create();
        box1.getComponent(wd.Geometry).material.envMap = cubemap;


        director.scene.addChild(box1);


        director.scene.addChild(camera);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        device = wd.DeviceManager.getInstance();

        sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));
        gl = device.gl;

        director = wd.Director.getInstance();


        camera = testTool.createCamera();
        renderer = wd.WebGLRenderer.create();
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clearInstance(sandbox);
    });

    it("fix envMap shader lib bug: vertex glsl should only set gl_Position once", function () {
        prepare();
        director._init();

        var box1Shader = box1.getComponent(wd.Geometry).material.shader;

        shaderTool.judgeGLSLContainSpecifyCount(
            box1Shader.vsSource, "gl_Position", 1
        );
    });
});

