describe("use instance to batch draw calls", function(){
    var gl = null;
    var device;
    var sandbox;
    var director;

    var extensionInstancedArrays;

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

    describe("test render count", function(){
        beforeEach(function(){
        });

        it("test no child", function(){
            var box = prepareTool.createBox(1);
            var instanceArr = [];

            instanceArr.push(box);

            var boxInstance1 = box.cloneInstance(String(0));
            var boxInstance2 = box.cloneInstance(String(1));

            instanceArr.push(boxInstance1, boxInstance2);

            instanceArr.forEach(function(instance){
                sandbox.spy(instance, "render");
            });


            director.scene.addChildren(instanceArr);


            var camera = testTool.createCamera();
            var renderer = wd.WebGLRenderer.create();



            director.scene.addChild(camera);

            director._init();


            director.scene.gameObjectScene.render(renderer);

            renderer.render();


            expect(box.render).toCalledOnce();
            expect(boxInstance1.render).not.toCalled();
            expect(boxInstance2.render).not.toCalled();

            expect(wd.DebugStatistics.count.renderGameObjects).toEqual(3);


            expect(gl.drawElements).not.toCalled();

            expect(extensionInstancedArrays.drawElementsInstancedANGLE).toCalledOnce();
            instanceTool.judgeInstanceCount(extensionInstancedArrays, 0, 3);
        });
        it("test with child", function(){
            var box = prepareTool.createBox(1);
            var child = prepareTool.createSphere(1)

            box.addChild(child);

            var instanceArr = [];

            instanceArr.push(box);

            var boxInstance1 = box.cloneInstance(String(0));
            var boxInstance2 = box.cloneInstance(String(1));

            instanceArr.push(boxInstance1, boxInstance2);

            instanceArr.forEach(function(instance){
                sandbox.spy(instance, "render");

                instance.forEach(function(child){
                    sandbox.spy(child, "render");
                })
            });


            director.scene.addChildren(instanceArr);


            var camera = testTool.createCamera();
            var renderer = wd.WebGLRenderer.create();



            director.scene.addChild(camera);

            director._init();


            director.scene.gameObjectScene.render(renderer);

            renderer.render();


            expect(box.render).toCalledOnce();
            expect(boxInstance1.render).not.toCalled();
            expect(boxInstance2.render).not.toCalled();

            expect(child.render).toCalledOnce();
            expect(boxInstance1.getChild(0).render).not.toCalled();
            expect(boxInstance2.getChild(0).render).not.toCalled();

            expect(wd.DebugStatistics.count.renderGameObjects).toEqual(6);


            expect(gl.drawElements).not.toCalled();

            expect(extensionInstancedArrays.drawElementsInstancedANGLE).toCalledTwice();

            instanceTool.judgeInstanceCount(extensionInstancedArrays, 0, 3);
            instanceTool.judgeInstanceCount(extensionInstancedArrays, 1, 3);
        });
    });

    //it("test ", function(){
    //    var box = prepareTool.createBox(1);
    //    var instanceArr = [];
    //
    //    instanceArr.push(box);
    //
    //    for(var i = 0, len = 2; i < len; i++){
    //        var boxInstance = box.cloneInstance(String(i));
    //
    //        boxInstance.transform.position = wd.Vector3.create(i, i, i);
    //        boxInstance.transform.rotation = wd.Quaternion.create(i, i, i, 1);
    //        boxInstance.transform.scale = wd.Vector3.create(i, i, i);
    //
    //        instanceArr.push(boxInstance);
    //    }
    //
    //    director.scene.addChildren(instanceArr);
    //
    //
    //    //var pos = 100;
    //    //gl.getUniformLocation.returns(pos);
    //
    //    var mMatrixPos = 1;
    //    gl.getUniformLocation.withArgs("mMatrix").returns(mMatrixPos);
    //
    //    var offsetLocation0 = 11,
    //        offsetLocation1 = 12,
    //        offsetLocation2 = 13,
    //        offsetLocation3 = 14;
    //
    //    gl.getAttribLocation.withArgs("a_mVec4_0").returns(offsetLocation0);
    //    gl.getAttribLocation.withArgs("a_mVec4_1").returns(offsetLocation1);
    //    gl.getAttribLocation.withArgs("a_mVec4_2").returns(offsetLocation2);
    //    gl.getAttribLocation.withArgs("a_mVec4_3").returns(offsetLocation3);
    //
    //
    //    var camera = testTool.createCamera();
    //    var renderer = wd.WebGLRenderer.create();
    //
    //
    //
    //    director.scene.addChild(camera);
    //
    //    //director.scene.init();
    //
    //    director._init();
    //
    //    //director._run();
    //
    //    //box.init();
    //    //
    //    //renderer.init();
    //    //camera.init();
    //
    //    //box.render(renderer, camera);
    //
    //
    //    director.scene.gameObjectScene.render(renderer);
    //
    //    renderer.render();
    //
    //
    //    //var mMatrixSend = gl.uniformMatrix4fv.withArgs(mMatrixPos);
    //    expect(gl.uniformMatrix4fv.withArgs(mMatrixPos)).not.toCalled();
    //
    //    expect(gl.bufferSubData).toCalledOnce();
    //
    //    //todo more test
    //
    //    //todo test name
    //
    //    //todo test visit instance
    //
    //
    //    //todo test share geometry
    //});
    //it("can vary instance's modelMatrix(position,rotation,scale)", function(){

    describe("cloneInstance", function(){
        beforeEach(function(){

        });

        it("", function(){
            //todo test
        });
    });

    //todo test if not support instance

    //todo test drawArraysInstancedANGLE

    //todo instance transform can vary independent

    //todo test children

    //todo test cache instance buffer
    //todo test instance buffer

    //todo test procedural texture(ProceduralCommand)?

    //todo test collision,picking,shadow,lod with instance
});
