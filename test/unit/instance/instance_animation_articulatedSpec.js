describe("instance+articulated animation", function () {
    var gl = null;
    var device;
    var sandbox;
    var director;

    var extensionInstancedArrays;


    var renderer;
    var camera;





    var model, modelInstance;
    var modelAnim, modelInstanceAnim;
    var instanceArr;



    function judgePos(model, pos){
        expect(testTool.getValues(
            model.transform.localPosition,
            2
        )).toEqual(
            testTool.getValues(
                pos,
                2
            )
        )
    }

    function judgeScale(model, scale){
        expect(testTool.getValues(
            model.transform.localScale,
            2
        )).toEqual(
            scale
        )
    }

    function createModel(animData){
        model = wd.GameObject.create();

        modelAnim = wd.ArticulatedAnimation.create();

        modelAnim.data = animData;

        model.addComponent(modelAnim);



        model.addComponent(wd.SourceInstance.create());


        return model;
    }

    function prepare(animData){
        model = createModel(animData);
        model.name = "model";

        instanceArr = [];

        instanceArr.push(model);

        modelInstance = instanceTool.cloneInstance(model, "0");

        modelInstanceAnim = modelInstance.getComponent(wd.ArticulatedAnimation);


        instanceArr.push(modelInstance);


        director.scene.addChildren(instanceArr);
    }

    function setCurrentTime(time){
        sandbox.stub(wd.Director.getInstance()._timeController, "elapsed", time);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);


        device = wd.DeviceManager.getInstance();

        sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));
        gl = device.gl;

        director = wd.Director.getInstance();

        extensionInstancedArrays = instanceTool.prepareExtensionInstancedArrays(sandbox);


        camera = testTool.createCamera();
        renderer = wd.WebGLRenderer.create();






        setCurrentTime(0);



        prepare(wdCb.Hash.create({
            "play": wdCb.Collection.create([
                {
                    time:10,

                    targets: wdCb.Collection.create(
                        [
                            {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EArticulatedAnimationTarget.TRANSLATION, data: wd.Vector3.create(3,1,0)}
                        ]
                    )
                }
            ]),
            "run": wdCb.Collection.create([
                {
                    time:10,

                    targets: wdCb.Collection.create(
                        [
                            {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EArticulatedAnimationTarget.SCALE, data: wd.Vector3.create(2,2,2)}
                        ]
                    )
                }
            ])
        }));

    });
    afterEach(function () {
        sandbox.restore();

        testTool.clearInstance(sandbox);
    });


    it("source obj and instance obj can play different animation", function () {
        model.init();
        modelInstance.init();

        modelAnim.play("play");
        modelInstanceAnim.play("run");

        wd.AnimationEngine.getInstance().update(1);


        judgePos(model, [0.3, 0.1, 0]);
        judgeScale(modelInstance, [1.1,1.1,1.1]);
    });

    describe("if hardware not support instance", function(){

        beforeEach(function(){
            wd.GPUDetector.getInstance().extensionInstancedArrays = null;
        });

        it("source obj and instance obj can play different animation", function () {
            model.init();
            modelInstance.init();

            modelAnim.play("play");
            modelInstanceAnim.play("run");

            wd.AnimationEngine.getInstance().update(1);


            judgePos(model, [0.3, 0.1, 0]);
            judgeScale(modelInstance, [1.1,1.1,1.1]);
        });
    });
});
