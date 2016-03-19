describe("instance with lod", function () {
    var gl = null;
    var device;
    var sandbox;
    var director;

    var extensionInstancedArrays;

    var source;
    var instance;

    var renderer;
    var camera;

    function prepare() {
        instance = instanceTool.cloneInstance(source, "0");

        instance.transform.position = wd.Vector3.create(-30, 0, 0);

        var instanceArr = [];

        instanceArr.push(source, instance);

        instanceTool.spyInstanceMethod(sandbox, instanceArr, "render");


        director.scene.addChild(source);

        director.scene.addChild(instance);

        director.scene.addChild(camera);

        director._init();
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        wd.DebugStatistics.clear();

        device = wd.DeviceManager.getInstance();

        sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));
        gl = device.gl;

        director = wd.Director.getInstance();

        extensionInstancedArrays = instanceTool.prepareExtensionInstancedArrays(sandbox);


        camera = testTool.createCamera();
        renderer = wd.WebGLRenderer.create();
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clearInstance();
    });

    it("instance should show the same geometry with the source", function () {
        var result = lodTool.prepareLod(sandbox);
        source = result.model;
        prepare();
        instance.transform.position = wd.Vector3.create(10, 0, 0);
        lodTool.setCameraPos(camera, wd.Vector3.create(20, 0, 0));



        director.scene.gameObjectScene.update();

        director.scene.gameObjectScene.render(renderer);

        renderer.render();


        expect(source.render).toCalledOnce();

        expect(instance.render).not.toCalled();

        lodTool.judgeSelectGeometry(0, result.geoLevel1);
        instanceTool.judgeInstanceCount(extensionInstancedArrays, 0, 2);
    });

    it("if there is instance not visible but the source is visible, all is rendered", function () {
        var result = lodTool.prepareLod(sandbox);
        source = result.model;
        prepare();
        instance.transform.position = wd.Vector3.create(-30, 0, 0);
        lodTool.setCameraPos(camera, wd.Vector3.create(20, 0, 0));



        director.scene.gameObjectScene.update();


        //instance share lod with source
        expect(instance.isVisible).toBeTruthy();
        expect(source.isVisible).toBeTruthy();



        director.scene.gameObjectScene.render(renderer);

        renderer.render();


        expect(source.render).toCalledOnce();
        expect(instance.render).not.toCalled();


        lodTool.judgeSelectGeometry(0, result.geoLevel1);
        instanceTool.judgeInstanceCount(extensionInstancedArrays, 0, 2);
    });

//    it("if entityObject has SourceInstance and hardware support instance, entityObject->lod->levelList.geometry should has the same glsl code with entityObject", function () {
////(check shader.vsSource/fsSource)
//
//    });
});
