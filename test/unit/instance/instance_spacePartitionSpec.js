describe("instance with spacePartition", function() {
    var gl = null;
    var device;
    var sandbox;
    var director;

    var extensionInstancedArrays;

    var octreeContainer;
    var box1,child1,child11,child2;
    var boxInstance1,boxInstance2;

    function prepareBox1AndInstances(){
        octreeContainer = createOctree();

        box1 = instanceTool.createBox();
        box1.name = "box1";
        child1 = prepareTool.createSphere(1);
        child11 = prepareTool.createSphere(1);

        child2 = prepareTool.createSphere(1);

        child1.addChild(child11);
        box1.addChild(child1);
        box1.addChild(child2);

        var instanceArr = [];

        instanceArr.push(box1);

        boxInstance1 = instanceTool.cloneInstance(box1, "0");
        boxInstance2 = instanceTool.cloneInstance(box1, "1");

        instanceArr.push(boxInstance1, boxInstance2);

        instanceTool.spyInstanceMethod(sandbox, instanceArr, "render");


        octreeContainer.addChildren(instanceArr);
    }

    function createOctree() {
        return octreeTool.createOctree();
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        //testTool.openContractCheck(sandbox);

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


    it("if the instanceSource obj is culled but its object instance isn't culled, its object instance should be rendered", function () {
        prepareBox1AndInstances();

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


        director.scene.addChild(camera);


        director._init();

        director._loopBody(1);




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


    describe("if hardware not support instance", function(){
        beforeEach(function(){
            wd.GPUDetector.getInstance().extensionInstancedArrays = null;
        });

        it("render all the no-culled objects(whether the source nor the instance)", function () {
            prepareBox1AndInstances();

            director.scene.addChild(octreeContainer);


            var octreeRenderList = wdCb.Collection.create(
                [
                    box1,
                    boxInstance2
                ]
            );
            sandbox.stub(octreeContainer.getSpacePartition(), "getRenderListByFrustumCull").returns(octreeRenderList);


            var camera = testTool.createCamera();
            var renderer = wd.WebGLRenderer.create();


            director.scene.addChild(camera);

            director._init();


            director.scene.gameObjectScene.render(renderer);

            renderer.render();




            expect(wd.DebugStatistics.count.renderGameObjects).toEqual(4 * 2);

            expect(box1.render).toCalledOnce();

            expect(boxInstance1.render).not.toCalled();
            expect(boxInstance2.render).toCalledOnce();


            expect(child1.render).toCalledOnce();

            expect(boxInstance1.getChild(0).render).not.toCalled();
            expect(boxInstance2.getChild(0).render).toCalledOnce();


            expect(child11.render).toCalledOnce();

            expect(boxInstance1.getChild(0).getChild(0).render).not.toCalled();
            expect(boxInstance2.getChild(0).getChild(0).render).toCalledOnce();



            expect(child2.render).toCalledOnce();

            expect(boxInstance1.getChild(1).render).not.toCalled();
            expect(boxInstance2.getChild(1).render).toCalledOnce();




            expect(gl.drawElements.callCount).toEqual(4 * 2);

            expect(extensionInstancedArrays.drawElementsInstancedANGLE.callCount).toEqual(0);
        });
    });
});

