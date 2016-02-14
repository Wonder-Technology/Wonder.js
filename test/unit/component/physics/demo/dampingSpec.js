describe("physics damping demo", function () {
    var sandbox = null;
    var director;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        testTool.openContractCheck(sandbox);


        director = wd.Director.getInstance();


        physicsTool.setEngineType(wd.EPhysicsEngineType.CANNON);

        physicsTool.setStartTime(sandbox, 0);


        physicsTool.setPhysicsSetting({
            gravity: wd.Vector3.create(0, 0, 0)
        });


        director.scene.addChild(testTool.createCamera());
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("test linear damping", function () {
        var rigidBody1, rigidBody2;
        var box1,box2;

        beforeEach(function () {
            rigidBody1 = physicsTool.createRigidBody({
                class: wd.DynamicRigidBody,
                linearDamping: 0.6,
                velocity:wd.Vector3.create(5, 0, 0)
            });


            box1 = physicsTool.createBox(wd.BoxCollider, rigidBody1);


            box1.transform.translate(-10, 0, 0);




            rigidBody2 = physicsTool.createRigidBody({
                class:wd.DynamicRigidBody,
                linearDamping: 0.3,
                velocity:wd.Vector3.create(-5, 0, 0)
            });


            box2 = physicsTool.createBox(wd.BoxCollider, rigidBody2);


            box2.transform.translate(10, 0, 0);


            director.scene.addChild(box1);
            director.scene.addChild(box2);
        });

        it("it will reduce velocity every frame", function () {
            director._init();

            director._loopBody(100);

            physicsTool.judgePos(box1, [-9.544, 0, 0], 3);
            physicsTool.judgePos(box2, [9.518, 0, 0], 3);
            physicsTool.judgeValue(physicsTool.convertToWonderVector3(rigidBody1.velocity), [4.562, 0, 0]);
            physicsTool.judgeValue(physicsTool.convertToWonderVector3(rigidBody2.velocity), [-4.825, 0, 0]);
        });
    });

    describe("test angular damping", function(){
        var rigidBody1;
        var box1;

        beforeEach(function(){
            rigidBody1 = physicsTool.createRigidBody({
                class: wd.DynamicRigidBody,
                angularDamping: 0.3,
                angularVelocity:wd.Vector3.create(0, 0, 5)
            });


            box1 = physicsTool.createBox(wd.BoxCollider, rigidBody1);


            director.scene.addChild(box1);
        });

        it("it will reduce angular velocity every frame", function(){
            director._init();

            director._loopBody(100);

            physicsTool.judgePos(box1, [0,0,0], 3);
            physicsTool.judgeValue(physicsTool.convertToWonderVector3(rigidBody1.angularVelocity), [0, 0, 4.825]);
            physicsTool.judgeValue(physicsTool.convertToWonderVector3(rigidBody1.velocity), [0,0,0]);
        });
    });
});

