describe("physics impulse/force demo", function () {
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

    describe("test impulse(An impulse is a force added to a body during a short period of time (impulse = force * time). Impulses will be added to Body.velocity and Body.angularVelocity)", function () {
        var rigidBody1;
        var sphere1;

        beforeEach(function () {
        });

        it("test dynamic rigid body", function () {
            rigidBody1 = physicsTool.createRigidBody({
                class: wd.DynamicRigidBody
            });


            sphere1 = physicsTool.createSphere(wd.SphereCollider, rigidBody1);



            director.scene.addChild(sphere1);


            var f = 500;
            var dt = 1 / 60;

            rigidBody1.impulse = wd.Vector3.create(f * dt, 0, 0);
            rigidBody1.hitPoint = wd.Vector3.create(0,1,0);



            director._init();

            physicsTool.judgeValue(physicsTool.convertToWonderVector3(rigidBody1.velocity), [1.667,0,0]);
            physicsTool.judgeValue(physicsTool.convertToWonderVector3(rigidBody1.angularVelocity), [0,0,-0.1]);

            director._loopBody(100);

            physicsTool.judgeValue(physicsTool.convertToWonderVector3(rigidBody1.velocity), [1.667,0,0]);
            physicsTool.judgeValue(physicsTool.convertToWonderVector3(rigidBody1.angularVelocity), [0,0,-0.1]);
        });
    });

    describe("test force", function () {
        var rigidBody1;
        var sphere1;

        beforeEach(function () {
        });

        it("test dynamic rigid body", function () {
            rigidBody1 = physicsTool.createRigidBody({
                class: wd.DynamicRigidBody
            });


            sphere1 = physicsTool.createSphere(wd.SphereCollider, rigidBody1);



            director.scene.addChild(sphere1);


            rigidBody1.force = wd.Vector3.create(10, 0, 0);
            rigidBody1.hitPoint = wd.Vector3.create(0,1,0);



            director._init();

            physicsTool.judgeValue(physicsTool.convertToWonderVector3(rigidBody1.velocity), [0,0,0]);
            physicsTool.judgeValue(physicsTool.convertToWonderVector3(rigidBody1.angularVelocity), [0,0,0]);

            director._loopBody(100);

            physicsTool.judgeValue(physicsTool.convertToWonderVector3(rigidBody1.velocity), [0.2,0,0]);
            physicsTool.judgeValue(physicsTool.convertToWonderVector3(rigidBody1.angularVelocity), [0,0,-0.012]);
        });
    });
});

