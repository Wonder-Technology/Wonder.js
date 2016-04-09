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

        testTool.clearInstance(sandbox);
    });

    it("instance should show the same geometry with the source", function () {
        var result = lodTool.prepareLod(sandbox);
        source = result.model;
        prepare();
        instance.transform.position = wd.Vector3.create(10, 0, 0);
        lodTool.setCameraPos(camera, wd.Vector3.create(20, 0, 0));

        director._init();



        director.scene.gameObjectScene.update();

        director.scene.gameObjectScene.render(renderer);

        renderer.render();


        expect(source.render).toCalledOnce();

        expect(instance.render).not.toCalled();

        lodTool.judgeSelectGeometry(0, result.geoLevel1);
        instanceTool.judgeInstanceCount(extensionInstancedArrays, 0, 2);
    });

    it("if there is instance not visible but the source is visible, all should be rendered", function () {
        var result = lodTool.prepareLod(sandbox);
        source = result.model;
        prepare();
        instance.transform.position = wd.Vector3.create(-30, 0, 0);
        lodTool.setCameraPos(camera, wd.Vector3.create(20, 0, 0));

        director._init();



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


    describe("if hardware not support", function(){
        beforeEach(function(){
            wd.GPUDetector.getInstance().extensionInstancedArrays = null;
        });

        it("if source not visible but instance is visible, source shouldn't be rendered and the instance should be rendered", function(){
            var result = lodTool.prepareLod(sandbox);
            source = result.model;
            prepare();
            instance.transform.position = wd.Vector3.create(10, 0, 0);
            lodTool.setCameraPos(camera, wd.Vector3.create(40, 0, 0));

            var instance2 = instanceTool.cloneInstance(source, "1");

            instance2.transform.position = wd.Vector3.create(30, 0, 0);

            sandbox.spy(instance2, "render");


            director.scene.addChild(instance2);


            var instanceRendererComponent = instance.getComponent(wd.MeshRenderer);
            var instance2RendererComponent = instance2.getComponent(wd.MeshRenderer);

            sandbox.spy(instanceRendererComponent, "render");
            sandbox.spy(instance2RendererComponent, "render");


            director._init();





            director.scene.gameObjectScene.update();


            expect(instance.isVisible).toBeTruthy();
            expect(instance2.isVisible).toBeTruthy();
            expect(source.isVisible).toBeFalsy();



            director.scene.gameObjectScene.render(renderer);

            renderer.render();


            expect(source.render).not.toCalled();
            expect(instance.render).toCalledOnce();
            expect(instance2.render).toCalledOnce();


            expect(gl.drawElements).toCalledTwice();
            expect(extensionInstancedArrays.drawElementsInstancedANGLE).not.toCalled();
            lodTool.judgeSelectGeometry(0, result.geoLevel2, instanceRendererComponent);
            lodTool.judgeSelectGeometry(0, result.geo, instance2RendererComponent);
        });
    });
});
