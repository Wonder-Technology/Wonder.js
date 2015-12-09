describe("physics collision demo", function () {
    var sandbox = null;
    var director;

    var rigidBody1, rigidBody2;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        testTool.openContractCheck(sandbox);


        director = wd.Director.getInstance();


        physicsTool.setEngineType(wd.PhysicsEngineType.CANNON);

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

    describe("test sphere-sphere", function () {
        var sphere1, sphere2;

        beforeEach(function () {
            rigidBody1 = physicsTool.createRigidBody({
                velocity: wd.Vector3.create(-5, 0, 0)
            });


            rigidBody2 = physicsTool.createRigidBody({
                velocity: wd.Vector3.create(5, 0, 0)
            });


            sphere1 = physicsTool.createSphere(wd.BoxCollider, rigidBody1);
            sphere2 = physicsTool.createSphere(wd.SphereCollider, rigidBody2);


            sphere1.transform.translate(10, 0, 0);

            sphere2.transform.translate(-10, 0, 0);


            director.scene.addChild(sphere1);
            director.scene.addChild(sphere2);
        });

        it("test position", function () {
            director._init();


            director._loopBody(100);


            physicsTool.judgePos(sphere1, [9.5, 0, 0]);
            physicsTool.judgePos(sphere2, [-9.5, 0, 0]);


            director._loopBody(600);

            physicsTool.judgePos(sphere1, [7, 0, 0]);
            physicsTool.judgePos(sphere2, [-7, 0, 0]);


            director._loopBody(1000);
            physicsTool.judgePos(sphere1, [5, 0, 0]);
            physicsTool.judgePos(sphere2, [-5, 0, 0]);

            /*!
             it will continue move together, but it should collision and move reverse! may be it's cannon.js's bug?
             */

            director._loopBody(1010);
            physicsTool.judgePos(sphere1, [4.9961185, 0, 0]);
            physicsTool.judgePos(sphere2, [-4.9961185, 0, 0]);

            director._loopBody(1500);
            physicsTool.judgePos(sphere1, [4.9826822, 0, 0]);
            physicsTool.judgePos(sphere2, [-4.9826822, 0, 0]);


            /*!
             now it move reverse finially
             */

            director._loopBody(2000);
            physicsTool.judgePos(sphere1, [4.9869561, 0, 0]);
            physicsTool.judgePos(sphere2, [-4.9869561, 0, 0]);
        });
        it("update debug object", function () {
            sandbox.stub(wd.DebugConfig, "debugCollision", true);

            director._init();


            director._loopBody(100);

            var debugBox = colliderTool.findDebugObject(sphere1);

            physicsTool.judgePos(debugBox, [9.5, 0, 0]);


            director._loopBody(200);
            physicsTool.judgePos(debugBox, [9, 0, 0]);
        });
    });

    describe("test sphere-box rotation", function () {
        var box1, sphere2;

        beforeEach(function () {
            rigidBody1 = physicsTool.createRigidBody({
                velocity: wd.Vector3.create(-5, 0, 0)
            });


            rigidBody2 = physicsTool.createRigidBody({
                velocity: wd.Vector3.create(5, 0, 0)
            });


            box1 = physicsTool.createSphere(wd.BoxCollider, rigidBody1, 5);
            sphere2 = physicsTool.createSphere(wd.SphereCollider, rigidBody2, 5);


            box1.transform.translate(10, 0, 0);

            box1.transform.rotateLocal(0, 0, 60);

            sphere2.transform.translate(-10, 0, 0);


            director.scene.addChild(box1);
            director.scene.addChild(sphere2);
        });

        it("test position and rotation", function () {
            director._init();


            director._loopBody(100);


            physicsTool.judgePos(box1, [9.5, 0, 0]);
            physicsTool.judgePos(sphere2, [-9.5, 0, 0]);

            physicsTool.judgeRotation(box1, [0, 0, 60]);

            director._loopBody(600);

            physicsTool.judgePos(box1, [7, 0, 0]);
            physicsTool.judgePos(sphere2, [-7, 0, 0]);

            physicsTool.judgeRotation(box1, [0, 0, 60]);

            director._loopBody(1000);
            physicsTool.judgePos(box1, [5, 0, 0]);
            physicsTool.judgePos(sphere2, [-5, 0, 0]);

            physicsTool.judgeRotation(box1, [0, 0, 60]);
            physicsTool.judgeRotation(sphere2, [0, 0, 0]);




            /*!
             now it move reverse
             */

            director._loopBody(1010);
            physicsTool.judgePos(box1, [5.1019335, -0.0877188, 0 ] );
            physicsTool.judgePos(sphere2, [-5.1019335, 0.0877188, 0] );

            physicsTool.judgeRotation(box1,  [0, 0, 61.615921]);

            /*!
            sphere not rotate
             */
            physicsTool.judgeRotation(sphere2, [0, 0, 0]);
        });
    });
});

