describe("physics bounce demo", function () {
    var sandbox = null;
    var director;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        testTool.openContractCheck(sandbox);


        director = wd.Director.getInstance();


        physicsTool.setEngineType(wd.PhysicsEngineType.CANNON);

        physicsTool.setStartTime(sandbox, 0);


        physicsTool.setPhysicsSetting({
            gravity: wd.Vector3.create(0, -10, 0)
        });


        director.scene.addChild(testTool.createCamera());
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("test bounce", function () {
        var rigidBody1, rigidBody2;
        var box1,ground;

        beforeEach(function () {
            rigidBody1 = physicsTool.createRigidBody({
                class: wd.DynamicRigidBody,
                restitution: 0.3
            });


            box1 = physicsTool.createBox(wd.BoxCollider, rigidBody1);


            box1.transform.translate(0, 10, 0);




            rigidBody2 = physicsTool.createRigidBody({
                restitution: 0.3,
                class:wd.StaticRigidBody
            });


            ground = physicsTool.createBox(wd.BoxCollider, rigidBody2, [1000, 1, 1000]);




            director.scene.addChild(box1);
            director.scene.addChild(ground);
        });

        it("test", function () {
            director._init();

            director._loopBody(700);

            physicsTool.judgePos(box1, [0, 5.1, 0], 3);
            physicsTool.judgePos(ground, [0, 0, 0 ]);
            physicsTool.judgeValue(rigidBody1.velocity.y, -7, 3);



            director._loopBody(800);
            physicsTool.judgePos(box1, [0, 5.381, 0], 3);
            physicsTool.judgeValue(rigidBody1.velocity.y, 2.812, 3);


            director._loopBody(900);
            physicsTool.judgePos(box1, [0, 5.57, 0], 3);
            physicsTool.judgeValue(rigidBody1.velocity.y, 1.887, 3);
        });
    });
});

