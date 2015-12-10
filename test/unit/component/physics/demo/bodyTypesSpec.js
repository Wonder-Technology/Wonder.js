describe("physics bodyTypes demo", function () {
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
            gravity: wd.Vector3.create(0, 0, -40)
        });


        director.scene.addChild(testTool.createCamera());
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("test body of three types", function () {
        var rigidBody1, rigidBody2, rigidBody3;
        var box1,sphere2,ground;
        var size;

        beforeEach(function () {
            size = 5;

            rigidBody1 = physicsTool.createRigidBody({
                class: wd.KinematicRigidBody,
                velocity: wd.Vector3.create(0, 0, 5)
            });


            box1 = physicsTool.createBox(wd.BoxCollider, rigidBody1, size);


            box1.transform.translate(0, 0, -10);




            rigidBody2 = physicsTool.createRigidBody({
            });


            sphere2 = physicsTool.createSphere(wd.SphereCollider, rigidBody2, size);


            sphere2.transform.translate(0, 0, 10);





            rigidBody3 = physicsTool.createRigidBody({
                class:wd.StaticRigidBody
            });


            ground = physicsTool.createBox(wd.BoxCollider, rigidBody3, [1000, 1000, 1]);




            director.scene.addChild(box1);
            director.scene.addChild(sphere2);
            director.scene.addChild(ground);
        });

        it("test position", function () {
            director._init();


            /*!
            sphere2 collision with ground
             */
            director._loopBody(350);

            physicsTool.judgePos(box1, [0, 0, -8.25 ]);
            physicsTool.judgePos(sphere2, [0, 0, 5.0999999]);
            physicsTool.judgePos(ground, [0, 0, 0 ]);


            /*!
            box1 cross through ground, begin to touch sphere2
             */
            director._loopBody(380);
            director._loopBody(500);
            director._loopBody(1000);
            director._loopBody(2000);


            physicsTool.judgePos(box1, [0, 0, 0]);
            physicsTool.judgePos(sphere2, [0, 0, 5.9994993]);
            physicsTool.judgePos(ground, [0, 0, 0 ]);


            /*!
            box1 move up with sphere2
             */
            director._loopBody(3000);

            physicsTool.judgePos(box1, [0, 0, 5]);
            physicsTool.judgePos(sphere2, [0, 0, 11.8493528]);
            physicsTool.judgePos(ground, [0, 0, 0 ]);
        });
    });
});

