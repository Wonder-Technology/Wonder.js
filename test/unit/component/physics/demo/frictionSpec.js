describe("physics friction demo", function () {
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
            gravity: wd.Vector3.create(0, -10, 0)
        });


        director.scene.addChild(testTool.createCamera());
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("test friction", function () {
        var rigidBody1, rigidBody2;
        var box1,ground;

        beforeEach(function () {
            rigidBody1 = physicsTool.createRigidBody({
                class: wd.DynamicRigidBody,
                friction: 0.3,
                velocity: wd.Vector3.create(5, 0, 0)
            });


            box1 = physicsTool.createBox(wd.BoxCollider, rigidBody1);


            box1.transform.translate(-10, 10, 0);




            rigidBody2 = physicsTool.createRigidBody({
                friction: 0.2,
                class:wd.StaticRigidBody
            });


            ground = physicsTool.createBox(wd.BoxCollider, rigidBody2, [1000, 1, 1000]);




            director.scene.addChild(box1);
            director.scene.addChild(ground);
        });

        it("test", function () {
            director._init();

            director._loopBody(700);

            physicsTool.judgePos(box1, [-6.5, 5.0999999, 0]);
            physicsTool.judgePos(ground, [0, 0, 0 ]);
            physicsTool.judgeValue(rigidBody1.velocity.x, 5, 3);



            director._loopBody(800);

            expect(box1.transform.position.x > -6.5).toBeTruthy();
            expect(rigidBody1.velocity.x < 5).toBeTruthy();
        });
    });
});

