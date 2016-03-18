describe("instance with spacePartition", function() {
    var gl = null;
    var device;
    var sandbox;
    var director;

    var extensionInstancedArrays;

    function createOctree() {
        var octreeContainer = wd.GameObject.create();

        var octree = wd.Octree.create();

        octreeContainer.addComponent(octree);

        return octreeContainer;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        wd.DebugStatistics.clear();

        device = wd.DeviceManager.getInstance();
        sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));
        gl = device.gl;

        director = wd.Director.getInstance();

        extensionInstancedArrays = instanceTool.prepareExtensionInstancedArrays(sandbox);
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance();
    });


    it("if the instanceSource obj is culled but it's instance isn't culled, it's instance should be rendered", function () {
        var octreeContainer = createOctree();

        var box1 = instanceTool.createBox();
        box1.name = "box1";
        var child1 = prepareTool.createSphere(1)
        var child11 = prepareTool.createSphere(1)

        var child2 = prepareTool.createSphere(1)

        child1.addChild(child11);
        box1.addChild(child1);
        box1.addChild(child2);

        var instanceArr = [];

        instanceArr.push(box1);

        var boxInstance1 = instanceTool.cloneInstance(box1, "0");
        var boxInstance2 = instanceTool.cloneInstance(box1, "1");

        instanceArr.push(boxInstance1, boxInstance2);

        instanceTool.spyInstanceMethod(sandbox, instanceArr, "render");


        octreeContainer.addChildren(instanceArr);


        var box2 = prepareTool.createBox(1);
        box2.name = "box2";
        sandbox.spy(box2, "render");

        var box2Child2 = prepareTool.createSphere(1)
        sandbox.spy(box2Child2, "render");

        box2.addChild(box2Child2);

        octreeContainer.addChild(box2);



        director.scene.addChild(octreeContainer);


        var octreeRenderList = wdCb.Collection.create(
            [
                boxInstance1,
                boxInstance2,
                box2
            ]
        );
        sandbox.stub(octreeContainer.getSpacePartition(), "getRenderListByFrustumCull").returns(octreeRenderList);


        var camera = testTool.createCamera();
        var renderer = wd.WebGLRenderer.create();


        director.scene.addChild(camera);

        director._init();


        director.scene.gameObjectScene.render(renderer);

        renderer.render();




        expect(wd.DebugStatistics.count.renderGameObjects).toEqual(4 * 2 + 2);

        expect(box1.render).toCalledOnce();

                expect(boxInstance1.render).not.toCalled();
                expect(boxInstance2.render).not.toCalled();


        expect(child1.render).toCalledOnce();

        expect(boxInstance1.getChild(0).render).not.toCalled();
        expect(boxInstance2.getChild(0).render).not.toCalled();


        expect(child11.render).toCalledOnce();

        expect(boxInstance1.getChild(0).getChild(0).render).not.toCalled();
        expect(boxInstance2.getChild(0).getChild(0).render).not.toCalled();



        expect(child2.render).toCalledOnce();

        expect(boxInstance1.getChild(1).render).not.toCalled();
        expect(boxInstance2.getChild(1).render).not.toCalled();


        expect(box2.render).toCalledOnce();

        expect(box2Child2.render).toCalledOnce();



        expect(gl.drawElements).toCalledTwice();

        expect(extensionInstancedArrays.drawElementsInstancedANGLE.callCount).toEqual(4);
        instanceTool.judgeInstanceCount(extensionInstancedArrays, 0, 2);
        instanceTool.judgeInstanceCount(extensionInstancedArrays, 1, 2);
        instanceTool.judgeInstanceCount(extensionInstancedArrays, 2, 2);
        instanceTool.judgeInstanceCount(extensionInstancedArrays, 3, 2);
    });

    it("if the instanceSource obj and it's instance isn't culled, they should be rendered", function () {
        //todo
    });
});

