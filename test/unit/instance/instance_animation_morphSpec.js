describe("instance+morph animation", function () {
    var gl = null;
    var device;
    var sandbox;
    var director;

    var extensionInstancedArrays;


    var renderer;
    var camera;





    var model, modelInstance;
    var geo,material,fps,duration;

    var modelProgram, modelInstanceProgram;
    var modelAnim, modelInstanceAnim;

    var instanceArr;


    var vertice,normals;
    var playFrameVertice1,playFrameVertice2;
    var playFrameNormals1,playFrameNormals2;
    var standFrameVertice1,standFrameVertice2;
    var standFrameNormals1,standFrameNormals2;


    function createModel(){
        model = wd.GameObject.create();

        geo = wd.ModelGeometry.create();

        material = wd.LightMaterial.create();

        geo.material = material;

        geo.vertices = vertice;
        geo.morphTargets = wdCb.Hash.create({
            "play": wdCb.Collection.create(
                [
                    playFrameVertice1,
                    playFrameVertice2
                ]
            ),
            "stand": wdCb.Collection.create(
                [
                    standFrameVertice1,
                    standFrameVertice2
                ]
            )
        });

        geo.faces = createFaces([0,1,2,3,4,5],
            normals
        );

        prepareTool.prepareGeo(sandbox, model,geo,material);


        modelAnim = createAnimation();
        model.addComponent(modelAnim);



        model.addComponent(wd.OneToOneSourceInstance.create());


        fps = 10;
        duration = 100;


        //director = wd.Director.getInstance();



        return model;
    }

    function prepare(){
        model = createModel();
        model.name = "model";

        instanceArr = [];

        instanceArr.push(model);

        modelInstance = instanceTool.cloneInstance(model, "0");

        modelInstanceAnim = modelInstance.getComponent(wd.MorphAnimation);


        instanceArr.push(modelInstance);


        director.scene.addChildren(instanceArr);
    }

    function createFaces(indices, normals){
        return testTool.createFaces(indices, normals);
    }

    function createAnimation(){
        var animation = wd.MorphAnimation.create();

        return animation;
    }


    function judgeFrameState(program, callIndex, currentFramePosition, nextFramePosition, currentFrameNormal, nextFrameNormal){
        expect(testTool.getValues(
            program.sendAttributeBuffer.withArgs("a_currentFramePosition").getCall(callIndex).args[2].data
        )).toEqual(
            currentFramePosition
        )
        expect(testTool.getValues(
            program.sendAttributeBuffer.withArgs("a_nextFramePosition").getCall(callIndex).args[2].data
        )).toEqual(
            nextFramePosition
        )


        expect(testTool.getValues(
            program.sendAttributeBuffer.withArgs("a_currentFrameNormal").getCall(callIndex).args[2].data
        )).toEqual(
            currentFrameNormal
        )
        expect(testTool.getValues(
            program.sendAttributeBuffer.withArgs("a_nextFrameNormal").getCall(callIndex).args[2].data
        )).toEqual(
            nextFrameNormal
        )
    }

    function setCurrentTime(time){
        sandbox.stub(wd.Director.getInstance()._timeController, "elapsed", time);
    }


    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);


        //wd.DebugStatistics.clear();

        device = wd.DeviceManager.getInstance();

        sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));
        gl = device.gl;

        director = wd.Director.getInstance();

        extensionInstancedArrays = instanceTool.prepareExtensionInstancedArrays(sandbox);


        camera = testTool.createCamera();
        renderer = wd.WebGLRenderer.create();










        vertice = [1,-1,0, 0,1,0,0,0,1, 2,3,-2, 10,5,1,  -10, 2, -2];
        normals = [
            0.8164966, 0.4082483, 0.4082483, 0.8164966, 0.4082483, 0.4082483, 0.8164966, 0.4082483, 0.4082483, 0.0759311, -0.9111735, 0.404966, 0.0759311, -0.9111735, 0.404966, 0.0759311, -0.9111735, 0.404966
        ];


        playFrameVertice1 = [1,-1,0, 0,1,0,0,0,1, 2,3,-2, 10,5,1,  -10, 2, -2];
        playFrameVertice2 = [4,-1,0, 0,1,0,0,0,1, 2,3,-2, 10,5,1,  -10, 2, -2];



        playFrameNormals1 = [
            0.8164966, 0.4082483, 0.4082483, 0.8164966, 0.4082483, 0.4082483, 0.8164966, 0.4082483, 0.4082483, 0.0759311, -0.9111735, 0.404966, 0.0759311, -0.9111735, 0.404966, 0.0759311, -0.9111735, 0.404966
        ];
        playFrameNormals2 = [
            0.3333333, 0.6666667, 0.6666667, 0.3333333, 0.6666667, 0.6666667, 0.3333333, 0.6666667, 0.6666667, 0.0759311, -0.9111735, 0.404966, 0.0759311, -0.9111735, 0.404966, 0.0759311, -0.9111735, 0.404966
        ];




        standFrameVertice1 = [4,-1,0, 0,1,0,0,0,1, 2,3,-2, 10,5,1,  -10, 2, -2];
        standFrameVertice2 = [-2,-1,0, 0,1,0,0,0,1, 2,3,-2, 10,5,1,  -10, 2, -2];


        standFrameNormals1 = [
            0.3333333, 0.6666667, 0.6666667, 0.3333333, 0.6666667, 0.6666667, 0.3333333, 0.6666667, 0.6666667, 0.0759311, -0.9111735, 0.404966, 0.0759311, -0.9111735, 0.404966, 0.0759311, -0.9111735, 0.404966
        ];
        standFrameNormals2 = [
            0.5773503, -0.5773503, -0.5773503, 0.5773503, -0.5773503, -0.5773503, 0.5773503, -0.5773503, -0.5773503, 0.0759311, -0.9111735, 0.404966, 0.0759311, -0.9111735, 0.404966, 0.0759311, -0.9111735, 0.404966
        ];




        prepare();


        setCurrentTime(0);
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clearInstance(sandbox);
    });


    it("source obj and instance obj can only play the same animation", function () {
        modelAnim.play("play", fps);
        modelInstanceAnim.play("stand", fps);
        director._init();
        modelProgram = shaderTool.getAndStubProgram(sandbox, material);
        modelInstanceProgram = shaderTool.getAndStubProgram(sandbox, modelInstance.getComponent(wd.Geometry).material);


        director._run(duration / 100);



        expect(modelAnim.currentAnimName).toEqual("play");
        expect(modelInstanceAnim.currentAnimName).toEqual("stand");


        judgeFrameState(modelProgram, 0,
            playFrameVertice1,
            playFrameVertice2,

            playFrameNormals1,
            playFrameNormals2
        );

        judgeFrameState(modelInstanceProgram, 0,
            playFrameVertice1,
            playFrameVertice2,

            playFrameNormals1,
            playFrameNormals2
        );
    });

    describe("if hardware not support instance", function(){

        beforeEach(function(){
            wd.GPUDetector.getInstance().extensionInstancedArrays = null;
        });

        it("source obj and instance obj can only play the same animation", function () {
            modelAnim.play("play", fps);
            modelInstanceAnim.play("stand", fps);
            director._init();
            modelProgram = shaderTool.getAndStubProgram(sandbox, material);
            modelInstanceProgram = shaderTool.getAndStubProgram(sandbox, modelInstance.getComponent(wd.Geometry).material);


            director._run(duration / 100);



            expect(modelAnim.currentAnimName).toEqual("play");
            expect(modelInstanceAnim.currentAnimName).toEqual("stand");


            judgeFrameState(modelProgram, 0,
                playFrameVertice1,
                playFrameVertice2,

                playFrameNormals1,
                playFrameNormals2
            );

            judgeFrameState(modelInstanceProgram, 0,
                playFrameVertice1,
                playFrameVertice2,

                playFrameNormals1,
                playFrameNormals2
            );
        });
    });
});
