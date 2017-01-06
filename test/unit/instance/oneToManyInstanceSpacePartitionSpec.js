describe("one to many instance with spacePartition", function() {
    var gl = null;
    var device;
    var sandbox;
    var director;

    var extensionInstancedArrays;

    var octreeContainer;
    var camera;

    function createGrass(name, pos, width,height,depth, bladeCount) {
        var material = wd.GrassInstanceMaterial.create();

        material.map = wd.ImageTexture.create({});
        grassInstanceTool.setFakeTerrainGeoemtry(material);


            var geometry = wd.GrassInstanceGeometry.create();
            geometry.material = material;
        geometry.rangeWidth = width || 5;
        geometry.rangeHeight = depth || 5;
        geometry.bladeMaxHeight = height || 5;
        geometry.bladeCount = bladeCount || 10;



            var gameObject = wd.GameObject.create();
            gameObject.addComponent(geometry);

            gameObject.addComponent(wd.MeshRenderer.create());


            var sourceInstanceComponent = wd.OneToManySourceInstance.create();
            gameObject.addComponent(sourceInstanceComponent);








        gameObject.name = name;



        if(pos){
            gameObject.transform.position = wd.Vector3.create(pos[0], pos[1], pos[2]);
        }


        sandbox.spy(gameObject, "render");

        return gameObject;
    }

    function createCamera(pos, lookAtPoint, near, far, fovy){
        camera = testTool.createCamera(pos, lookAtPoint, near, far, fovy);

        director.scene.addChild(camera);
    }

    function createOctree() {
        return octreeTool.createOctree();
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        wd.DebugStatistics.resetData();

        device = wd.DeviceManager.getInstance();
        sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));
        gl = device.gl;

        director = wd.Director.getInstance();

        extensionInstancedArrays = instanceTool.prepareExtensionInstancedArrays(sandbox);


        octreeContainer = createOctree();
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
    });

    describe("if hardware support instance", function() {
        beforeEach(function () {
            createCamera(wd.Vector3.create(0, 0, 0), wd.Vector3.create(10, 10, 10), 0.1, 100, 60);
        });

        describe("test cull", function () {
            it("test grass instances", function () {
                camera.transform.translate(0, 2.4, 0);

                var grass1 = createGrass("grass1", [10, 10, 10]);
                var grass2 = createGrass("grass2", [-10, -10, -10]);


                octreeContainer.addChildren([grass1, grass2]);


                director.scene.addChild(octreeContainer);


                director._init();

                director._loopBody(1);


                expect(grass1.render).toCalledOnce();

                expect(grass2.render).not.toCalled();


                expect(wd.DebugStatistics.count.renderGameObjects).toEqual(10);
                expect(wd.DebugStatistics.count.drawCalls).toEqual(1);


                camera.transform.translate(0, -0.1, 0);


                director._loopBody(1);


                expect(grass1.render).toCalledTwice();

                expect(grass2.render).toCalledOnce();


                expect(wd.DebugStatistics.count.renderGameObjects).toEqual(10 + 10 * 2);
                expect(wd.DebugStatistics.count.drawCalls).toEqual(1 + 2);
            });
            it("test with no-instance obj", function () {
                var grass1 = createGrass("grass1", [10, 10, 10], 1, 1, 1);


                var box1 = prepareTool.createBox(1);
                box1.transform.position = wd.Vector3.create(8, 8, 8);
                box1.name = "box1";
                sandbox.spy(box1, "render");

                var box2 = prepareTool.createBox(1);
                box2.transform.position = wd.Vector3.create(-10, -10, -10);
                box2.name = "box2";
                sandbox.spy(box2, "render");


                octreeContainer.addChildren([grass1, box1, box2]);


                director.scene.addChild(octreeContainer);


                director._init();

                director._loopBody(1);


                expect(grass1.render).toCalledOnce();
                expect(box1.render).toCalledOnce();

                expect(box2.render).not.toCalled();


                expect(wd.DebugStatistics.count.renderGameObjects).toEqual(11);
                expect(wd.DebugStatistics.count.drawCalls).toEqual(2);

            });
        });
        
        describe("fix bug", function(){
            beforeEach(function(){
            });
            
            it("all oneToMany instance object should bind its own instance buffer especially when drawing the not culled instance after drawing the one which is culled one before but now be not culled and is drawed at the first time", function(){
                camera.transform.translate(0, 2.4, 0);

                var grass1 = createGrass("grass1", [10, 10, 10]);
                var grass2 = createGrass("grass2", [-10, -10, -10]);
                var grass3 = createGrass("grass3", [6,6,6]);


                var instanceBuffer1 = grass1.getComponent(wd.OneToManySourceInstance).instanceBuffer;
                instanceBuffer1.buffer = {type:1};
                var instanceBuffer2 = grass2.getComponent(wd.OneToManySourceInstance).instanceBuffer;
                instanceBuffer2.buffer = {type:2};
                var instanceBuffer3 = grass3.getComponent(wd.OneToManySourceInstance).instanceBuffer;
                instanceBuffer3.buffer = {type:3};


                octreeContainer.addChildren([grass1, grass2, grass3]);


                director.scene.addChild(octreeContainer);


                director._init();

                director._loopBody(1);


                expect(grass1.render).toCalledOnce();
                expect(grass3.render).toCalledOnce();

                expect(grass2.render).not.toCalled();


                expect(gl.bindBuffer.withArgs(sinon.match.any, instanceBuffer1.buffer).callCount).toEqual(2);
                expect(gl.bindBuffer.withArgs(sinon.match.any, instanceBuffer3.buffer).callCount).toEqual(2);
                expect(gl.bindBuffer.withArgs(sinon.match.any, instanceBuffer2.buffer).callCount).toEqual(0);






                camera.transform.translate(0, -0.1, 0);


                director._loopBody(1);



                expect(grass1.render).toCalledTwice();
                expect(grass3.render).toCalledTwice();

                expect(grass2.render).toCalledOnce();


                expect(gl.bindBuffer.withArgs(sinon.match.any, instanceBuffer1.buffer).callCount).toEqual(2 + 2);
                expect(gl.bindBuffer.withArgs(sinon.match.any, instanceBuffer3.buffer).callCount).toEqual(2 + 2);
                expect(gl.bindBuffer.withArgs(sinon.match.any, instanceBuffer2.buffer).callCount).toEqual(0 + 2);
            });
        });
    });
        
    describe("if hardware not support instance", function(){
        beforeEach(function(){
            wd.GPUDetector.getInstance().extensionInstancedArrays = null;
        });

        describe("batch draw instances", function() {
            beforeEach(function(){
                createCamera(wd.Vector3.create(0,0,0), wd.Vector3.create(10,10,10), 0.1, 100, 60);
            });

            it("test grass instances", function () {
                camera.transform.position = wd.Vector3.create(camera.transform.position.x, 2.4, camera.transform.position.z);

                var grass1 = createGrass("grass1", [10, 10, 10]);
                var grass2 = createGrass("grass2", [-10, -10, -10]);


                octreeContainer.addChildren([grass1, grass2]);


                director.scene.addChild(octreeContainer);


                director._init();

                director._loopBody(1);


                expect(grass1.render).toCalledOnce();

                expect(grass2.render).not.toCalled();


                expect(wd.DebugStatistics.count.renderGameObjects).toEqual(10);
                expect(wd.DebugStatistics.count.drawCalls).toEqual(10);


                camera.transform.position = wd.Vector3.create(camera.transform.position.x, 2.3, camera.transform.position.z);


                director._loopBody(1);


                expect(grass1.render).toCalledTwice();

                expect(grass2.render).toCalledOnce();


                expect(wd.DebugStatistics.count.renderGameObjects).toEqual(10 + 10 * 2);
                expect(wd.DebugStatistics.count.drawCalls).toEqual(10 + 10 * 2);
            });
        });
    });
});

