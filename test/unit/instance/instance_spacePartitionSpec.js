describe("instance with spacePartition", function() {
    var gl = null;
    var device;
    var sandbox;
    var director;

    var extensionInstancedArrays;

    function createOctree() {
        var octreeContainer = wd.GameObject.create();

        var octree = wd.Octree.create();
        //octree.maxDepth = 3;
        //octree.maxNodeCapacity = 32;


        octreeContainer.addComponent(octree);

        return octreeContainer;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        device = wd.DeviceManager.getInstance();
        sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));
        gl = device.gl;

        director = wd.Director.getInstance();


        extensionInstancedArrays = {
            vertexAttribDivisorANGLE: sandbox.stub(),
            drawElementsInstancedANGLE: sandbox.stub(),
            drawArraysInstancedANGLE: sandbox.stub()
        }

        wd.GPUDetector.getInstance().extensionInstancedArrays = extensionInstancedArrays;
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance();

        wd.DebugStatistics.clear();
    });


    it("if the instanceSource obj is culled but it's instance isn't culled, it's instance should be rendered", function () {
        var octreeContainer = createOctree();


        var box1 = prepareTool.createBox(1);
        box1.name = "box1";
        var child1 = prepareTool.createSphere(1)
        var child11 = prepareTool.createSphere(1)

        var child2 = prepareTool.createSphere(1)

        child1.addChild(child11);
        box1.addChild(child1);
        box1.addChild(child2);

        var instanceArr = [];

        instanceArr.push(box1);

        var boxInstance1 = box1.cloneInstance(String(0));
        var boxInstance2 = box1.cloneInstance(String(1));

        instanceArr.push(boxInstance1, boxInstance2);

        instanceArr.forEach(function (instance) {
            sandbox.spy(instance, "render");

            instance.forEach(function(child){
                sandbox.spy(child, "render");

                child.forEach(function(c){
                    sandbox.spy(c, "render");
                });
            })
        });


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

    //describe("test render count", function(){
    //
    //    beforeEach(function(){
    //        wd.DebugStatistics.clear();
    //    });
    //
    //    it("test no child", function(){
    //        var octreeContainer = createOctree();
    //
    //
    //
    //
    //
    //        var box = prepareTool.createBox(1);
    //        var instanceArr = [];
    //
    //        instanceArr.push(box);
    //
    //        var boxInstance1 = box.cloneInstance(String(0));
    //        var boxInstance2 = box.cloneInstance(String(1));
    //
    //        instanceArr.push(boxInstance1, boxInstance2);
    //
    //        instanceArr.forEach(function(instance){
    //            sandbox.spy(instance, "render");
    //        });
    //
    //
    //
    //
    //
    //        octreeContainer.addChildren(instanceArr);
    //
    //
    //
    //
    //
    //
    //        var box2 = prepareTool.createBox(1);
    //        sandbox.spy(box2, "render");
    //
    //        octreeContainer.addChild(box2);
    //
    //
    //
    //
    //
    //
    //
    //
    //        var box3 = prepareTool.createBox(1);
    //        var instanceArr = [];
    //
    //        instanceArr.push(box3);
    //
    //        var boxInstance1 = box.cloneInstance(String(0));
    //        //var boxInstance2 = box.cloneInstance(String(1));
    //
    //        instanceArr.push(boxInstance1);
    //
    //        instanceArr.forEach(function(instance){
    //            sandbox.spy(instance, "render");
    //        });
    //
    //
    //
    //        octreeContainer.addChildren(instanceArr);
    //
    //
    //
    //
    //
    //
    //
    //        director.scene.addChild(octreeContainer);
    //
    //
    //        var octreeRenderList = wdCb.Collection.create(
    //            [
    //                box2,
    //                box3
    //            ]
    //        );
    //        sandbox.stub(octreeContainer.getSpacePartition(), "getRenderListByFrustumCull").returns(octreeRenderList);
    //
    //
    //
    //
    //        var camera = testTool.createCamera();
    //        var renderer = wd.WebGLRenderer.create();
    //
    //
    //
    //        director.scene.addChild(camera);
    //
    //        director._init();
    //
    //
    //        director.scene.gameObjectScene.render(renderer);
    //
    //        renderer.render();
    //
    //
    //        expect(box.render).toCalledOnce();
    //        expect(boxInstance1.render).not.toCalled();
    //        expect(boxInstance2.render).not.toCalled();
    //
    //        expect(wd.DebugStatistics.count.renderGameObjects).toEqual(3);
    //
    //
    //        expect(gl.drawElements).not.toCalled();
    //
    //        expect(extensionInstancedArrays.drawElementsInstancedANGLE).toCalledOnce();
    //        instanceTool.judgeInstanceCount(extensionInstancedArrays, 0, 3);
    //    });
    //    //it("test with child", function(){
    //    //    var box = prepareTool.createBox(1);
    //    //    var child = prepareTool.createSphere(1)
    //    //
    //    //    box.addChild(child);
    //    //
    //    //    var instanceArr = [];
    //    //
    //    //    instanceArr.push(box);
    //    //
    //    //    var boxInstance1 = box.cloneInstance(String(0));
    //    //    var boxInstance2 = box.cloneInstance(String(1));
    //    //
    //    //    instanceArr.push(boxInstance1, boxInstance2);
    //    //
    //    //    instanceArr.forEach(function(instance){
    //    //        sandbox.spy(instance, "render");
    //    //
    //    //        instance.forEach(function(child){
    //    //            sandbox.spy(child, "render");
    //    //        })
    //    //    });
    //    //
    //    //
    //    //    director.scene.addChildren(instanceArr);
    //    //
    //    //
    //    //    var camera = testTool.createCamera();
    //    //    var renderer = wd.WebGLRenderer.create();
    //    //
    //    //
    //    //
    //    //    director.scene.addChild(camera);
    //    //
    //    //    director._init();
    //    //
    //    //
    //    //    director.scene.gameObjectScene.render(renderer);
    //    //
    //    //    renderer.render();
    //    //
    //    //
    //    //    expect(box.render).toCalledOnce();
    //    //    expect(boxInstance1.render).not.toCalled();
    //    //    expect(boxInstance2.render).not.toCalled();
    //    //
    //    //    expect(child.render).toCalledOnce();
    //    //    expect(boxInstance1.getChild(0).render).not.toCalled();
    //    //    expect(boxInstance2.getChild(0).render).not.toCalled();
    //    //
    //    //    expect(wd.DebugStatistics.count.renderGameObjects).toEqual(6);
    //    //
    //    //
    //    //    expect(gl.drawElements).not.toCalled();
    //    //
    //    //    expect(extensionInstancedArrays.drawElementsInstancedANGLE).toCalledTwice();
    //    //
    //    //    instanceTool.judgeInstanceCount(extensionInstancedArrays, 0, 3);
    //    //    instanceTool.judgeInstanceCount(extensionInstancedArrays, 1, 3);
    //    //});
    //});
});

