describe("one to one instance with spacePartition", function() {
    var gl = null;
    var device;
    var sandbox;
    var director;

    var extensionInstancedArrays;

    var octreeContainer;
    var box1,child1,child11,child2;
    var boxInstance1,boxInstance2;


    var renderer;
    var camera;

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



        director.scene.addChild(octreeContainer);
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



        camera = testTool.createCamera();
        renderer = wd.WebGLRenderer.create();


        director.scene.addChild(camera);
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
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




        var octreeRenderList = wdCb.Collection.create(
            [
                boxInstance1,
                boxInstance2,
                box2
            ]
        );
        sandbox.stub(octreeContainer.getSpacePartition(), "getRenderListByFrustumCull").returns(octreeRenderList);



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


    describe("remove object instance", function () {
        beforeEach(function () {
        });

        it("should rebuild by user to not render it and its children", function () {
            prepareBox1AndInstances();

            director._init();

            octreeContainer.removeChild(boxInstance1);

            octreeContainer.getComponent(wd.Octree).build();



            director._loopBody(1);



            expect(wd.DebugStatistics.count.renderGameObjects).toEqual(4 * 2);


            expect(gl.drawElements).not.toCalled();

            expect(extensionInstancedArrays.drawElementsInstancedANGLE.callCount).toEqual(4);

            instanceTool.judgeInstanceCount(extensionInstancedArrays, 0, 2);
            instanceTool.judgeInstanceCount(extensionInstancedArrays, 1, 2);
            instanceTool.judgeInstanceCount(extensionInstancedArrays, 2, 2);
            instanceTool.judgeInstanceCount(extensionInstancedArrays, 3, 2);
        });
    });

    describe("add object instance", function () {
        beforeEach(function () {
        });

        it("should rebuild by user to render it and its children", function () {
            prepareBox1AndInstances();

            octreeContainer.removeChild(boxInstance1);

            director._init();

            octreeContainer.addChild(boxInstance1);

            octreeContainer.getComponent(wd.Octree).build();




            director._loopBody(1);



            expect(wd.DebugStatistics.count.renderGameObjects).toEqual(4 * 3);


            expect(gl.drawElements).not.toCalled();

            expect(extensionInstancedArrays.drawElementsInstancedANGLE.callCount).toEqual(4);

            instanceTool.judgeInstanceCount(extensionInstancedArrays, 0, 3);
            instanceTool.judgeInstanceCount(extensionInstancedArrays, 1, 3);
            instanceTool.judgeInstanceCount(extensionInstancedArrays, 2, 3);
            instanceTool.judgeInstanceCount(extensionInstancedArrays, 3, 3);
        });
    });


    describe("dispose object instance", function () {
        beforeEach(function () {
        });

        it("not render it and its children", function () {
            prepareBox1AndInstances();

            director._init();

            boxInstance1.dispose();

            octreeContainer.getComponent(wd.Octree).build();



            director._loopBody(1);



            expect(wd.DebugStatistics.count.renderGameObjects).toEqual(4 * 2);


            expect(gl.drawElements).not.toCalled();

            expect(extensionInstancedArrays.drawElementsInstancedANGLE.callCount).toEqual(4);

            instanceTool.judgeInstanceCount(extensionInstancedArrays, 0, 2);
            instanceTool.judgeInstanceCount(extensionInstancedArrays, 1, 2);
            instanceTool.judgeInstanceCount(extensionInstancedArrays, 2, 2);
            instanceTool.judgeInstanceCount(extensionInstancedArrays, 3, 2);
        });
    });


    describe("if hardware not support instance", function(){
        beforeEach(function(){
            wd.GPUDetector.getInstance().extensionInstancedArrays = null;
        });

        //it("render all the no-culled objects(whether the source nor the instance)", function () {
        //    prepareBox1AndInstances();
        //
        //    director.scene.addChild(octreeContainer);
        //
        //
        //    var octreeRenderList = wdCb.Collection.create(
        //        [
        //            box1,
        //            boxInstance2
        //        ]
        //    );
        //    sandbox.stub(octreeContainer.getSpacePartition(), "getRenderListByFrustumCull").returns(octreeRenderList);
        //
        //
        //    var camera = testTool.createCamera();
        //    var renderer = wd.WebGLRenderer.create();
        //
        //
        //    director.scene.addChild(camera);
        //
        //    director._init();
        //
        //
        //    director.scene.gameObjectScene.render(renderer);
        //
        //    renderer.render();
        //
        //
        //
        //
        //    expect(wd.DebugStatistics.count.renderGameObjects).toEqual(4 * 2);
        //
        //    expect(box1.render).toCalledOnce();
        //
        //    expect(boxInstance1.render).not.toCalled();
        //    expect(boxInstance2.render).toCalledOnce();
        //
        //
        //    expect(child1.render).toCalledOnce();
        //
        //    expect(boxInstance1.getChild(0).render).not.toCalled();
        //    expect(boxInstance2.getChild(0).render).toCalledOnce();
        //
        //
        //    expect(child11.render).toCalledOnce();
        //
        //    expect(boxInstance1.getChild(0).getChild(0).render).not.toCalled();
        //    expect(boxInstance2.getChild(0).getChild(0).render).toCalledOnce();
        //
        //
        //
        //    expect(child2.render).toCalledOnce();
        //
        //    expect(boxInstance1.getChild(1).render).not.toCalled();
        //    expect(boxInstance2.getChild(1).render).toCalledOnce();
        //
        //
        //
        //
        //    expect(gl.drawElements.callCount).toEqual(4 * 2);
        //
        //    expect(extensionInstancedArrays.drawElementsInstancedANGLE.callCount).toEqual(0);
        //});

        describe("batch draw instances", function(){
            var box1Material;
            var map;
            var program;

            beforeEach(function(){
                prepareBox1AndInstances();
                director.scene.addChild(octreeContainer);


                box1Material = box1.getComponent(wd.Geometry).material;

                map = wd.ImageTexture.create({});
                sandbox.stub(map, "bindToUnit");

                box1Material.map = map;
                box1Material.redWrite = false;




                var octreeRenderList = wdCb.Collection.create(
                    [
                        box1,
                        boxInstance2
                    ]
                );
                sandbox.stub(octreeContainer.getSpacePartition(), "getRenderListByFrustumCull").returns(octreeRenderList);


                var camera = testTool.createCamera();


                director.scene.addChild(camera);

            });

            it("only render source object, but draw all the no-culled objects one by one by drawElements", function () {
                director._init();


                director._loopBody(1);




                expect(wd.DebugStatistics.count.renderGameObjects).toEqual(4 * 2);

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




                expect(gl.drawElements.callCount).toEqual(4 * 2);

                expect(extensionInstancedArrays.drawElementsInstancedANGLE.callCount).toEqual(0);
            });

            it("set webgl state and use program and bind texture and send glsl data(except mMatrix) only once", function () {
                director._init();
                program = shaderTool.getAndSpyProgram(sandbox, box1Material, "box1Program");





                director._loopBody(1);

                expect(gl.colorMask.withArgs(false, true, true, true)).toCalledOnce();
                expect(program.use).toCalledOnce();
                expect(map.bindToUnit).toCalledOnce();
                expect(program.sendAttributeBuffer.withArgs("a_position")).toCalledOnce();
            });
            it("not bind array,element buffer when draw instance", function () {
                director._init();

                director._loopBody(1);

                expect(gl.bindBuffer.withArgs(gl.ARRAY_BUFFER, sinon.match.object).callCount).toEqual(9);
                expect(gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER, sinon.match.object).callCount).toEqual(8);
            });
            it("send each instance's mMatrix data to glsl ", function () {
                director._init();

                var mMatrixPos = 1;
                gl.getUniformLocation.withArgs(sinon.match.any, "u_mMatrix").returns(mMatrixPos);

                director._loopBody(1);

                expect(gl.uniformMatrix4fv.withArgs(mMatrixPos).callCount).toEqual(8);
            });
            it("glsl code should contain u_mMatrix", function () {
                if(bowser.firefox){
                    expect().toPass();
                    return;
                }

                director._init();


                expect(glslTool.contain(
                    box1Material.shader.vsSource,
                    "mat4 mMatrix = u_mMatrix;"
                )).toBeTruthy();
            });
        });

        describe("dispose object instance", function () {
            beforeEach(function () {
            });

            it("not render it and its children", function () {
                prepareBox1AndInstances();

                director._init();

                boxInstance1.dispose();

                octreeContainer.getComponent(wd.Octree).build();



                director._loopBody(1);



                expect(wd.DebugStatistics.count.renderGameObjects).toEqual(4 * 2);


                expect(gl.drawElements.callCount).toEqual(4 * 2);

                expect(extensionInstancedArrays.drawElementsInstancedANGLE.callCount).toEqual(0);
            });
        });

        describe("dispose source instance", function () {
            beforeEach(function () {
            });

            it("not render it and its children and dispose its object instances", function () {
                testTool.closeContractCheck(sandbox);
                prepareBox1AndInstances();

                director._init();

                box1.dispose();

                octreeContainer.getComponent(wd.Octree).build();



                director._loopBody(1);



                expect(wd.DebugStatistics.count.renderGameObjects).toEqual(0);


                expect(gl.drawElements.callCount).toEqual(0);

                expect(extensionInstancedArrays.drawElementsInstancedANGLE.callCount).toEqual(0);
            });
        });
    });
});

