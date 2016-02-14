describe("physics event demo", function () {
    var sandbox = null;
    var director;

    var box1, sphere2;
    var script1, script2;
    var rigidBody1, rigidBody2;


    function judgeNoCollide() {
        expect(script1.onContact).not.toCalled();
        expect(script2.onContact).not.toCalled();
    }

    function judgeCollideCount(num) {
        expect(script1.onContact.callCount).toEqual(num);
        expect(script2.onContact.callCount).toEqual(num);
    }

    function judgeCollide() {
        expect(script1.onCollisionStart).toCalledBefore(script1.onContact);
        expect(script2.onCollisionStart).toCalledBefore(script2.onContact);
        expect(script1.onContact).toCalledOnce();
        expect(script2.onContact).toCalledOnce();


        expect(script1.onCollisionStart).toCalledWith(wdCb.Collection.create([sphere2]));
        expect(script2.onCollisionStart).toCalledWith(wdCb.Collection.create([box1]));
        expect(script1.onContact).toCalledWith(wdCb.Collection.create([sphere2]));
        expect(script2.onContact).toCalledWith(wdCb.Collection.create([box1]));
    }

    function judgeCollideEnd() {
        expect(script1.onCollisionEnd).toCalledAfter(script1.onContact);
        expect(script2.onCollisionEnd).toCalledAfter(script2.onContact);
    }

    function judgeNotCollideEnd() {
        expect(script1.onCollisionEnd).not.toCalled();
        expect(script2.onCollisionEnd).not.toCalled();
    }

    function prepare(rigidBody1Class, rigidBody2Class) {
        rigidBody1 = physicsTool.createRigidBody({
            class: rigidBody1Class,
            velocity: wd.Vector3.create(0, 0, 5)
        });


        box1 = physicsTool.createBox(wd.BoxCollider, rigidBody1);


        box1.transform.translate(0, 0, -10);


        rigidBody2 = physicsTool.createRigidBody({
            class: rigidBody2Class
        });


        sphere2 = physicsTool.createSphere(wd.SphereCollider, rigidBody2);


        sphere2.transform.translate(0, 0, 10);


        prepareTool.addScript(box1, script1);

        prepareTool.addScript(sphere2, script2);


        director.scene.addChild(box1);
        director.scene.addChild(sphere2);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        testTool.openContractCheck(sandbox);


        director = wd.Director.getInstance();


        physicsTool.setEngineType(wd.EPhysicsEngineType.CANNON);

        physicsTool.setStartTime(sandbox, 0);


        director.scene.addChild(testTool.createCamera());


        physicsTool.setPhysicsSetting({
            gravity: wd.Vector3.create(0, 0, 0)
        });


        script1 = {
            onContact: sandbox.stub(),
            onCollisionStart: sandbox.stub(),
            onCollisionEnd: sandbox.stub()
        };
        script2 = {
            onContact: sandbox.stub(),
            onCollisionStart: sandbox.stub(),
            onCollisionEnd: sandbox.stub()
        };
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    it("not trigger collision event when collision in kinematic-kinematic rigid body case", function () {
        prepare(wd.KinematicRigidBody, wd.KinematicRigidBody);

        director._init();


        director._loopBody(2000);
        physicsTool.judgePos(box1, [0, 0, 0]);
        physicsTool.judgePos(sphere2, [0, 0, 10]);

        judgeNoCollide();

        director._loopBody(2100);

        judgeNoCollide();
    });


    it("not trigger collision event when collision in kinematic-static rigid body case", function () {
        prepare(wd.KinematicRigidBody, wd.StaticRigidBody);

        director._init();


        director._loopBody(2000);
        physicsTool.judgePos(box1, [0, 0, 0]);
        physicsTool.judgePos(sphere2, [0, 0, 10]);

        judgeNoCollide();

        director._loopBody(2100);

        judgeNoCollide();
    });

    it("trigger collision event when collision in kinematic-dynamic rigid body case", function () {
        prepare(wd.KinematicRigidBody, wd.DynamicRigidBody);

        director._init();


        director._loopBody(2000);
        physicsTool.judgePos(box1, [0, 0, 0]);
        physicsTool.judgePos(sphere2, [0, 0, 10]);

        judgeNoCollide();

        director._loopBody(2100);

        judgeCollide();
        judgeCollideEnd();
    });

    it("trigger collision event when collision in static-dynamic rigid body case", function () {
        prepare(wd.DynamicRigidBody, wd.StaticRigidBody);

        director._init();


        director._loopBody(2000);
        physicsTool.judgePos(box1, [0, 0, 0]);
        physicsTool.judgePos(sphere2, [0, 0, 10]);

        judgeNoCollide();

        director._loopBody(2100);

        judgeCollide();
        judgeCollideEnd();
    });

    it("trigger collision event when collision in dynamic-dynamic rigid body case", function () {
        prepare(wd.DynamicRigidBody, wd.DynamicRigidBody);

        director._init();


        director._loopBody(2000);
        physicsTool.judgePos(box1, [0, 0, 0]);
        physicsTool.judgePos(sphere2, [0, 0, 10]);

        judgeNoCollide();

        director._loopBody(2100);

        judgeCollide();
        judgeCollideEnd();
    });

    it("trigger collision event when collision in dynamic-dynamic rigid body case", function () {
        prepare(wd.DynamicRigidBody, wd.DynamicRigidBody);

        director._init();


        director._loopBody(2000);
        physicsTool.judgePos(box1, [0, 0, 0]);
        physicsTool.judgePos(sphere2, [0, 0, 10]);

        judgeNoCollide();

        director._loopBody(2100);

        judgeCollide();
        judgeCollideEnd();
    });

    it("trigger collision event, no response when collision with the one which only has collider, not has rigid body", function () {
        prepare(wd.DynamicRigidBody, wd.DynamicRigidBody);
        sphere2.removeComponent(rigidBody2);


        director._init();


        director._loopBody(2000);
        physicsTool.judgePos(box1, [0, 0, 0]);
        physicsTool.judgePos(sphere2, [0, 0, 10]);

        judgeCollide();
        judgeNotCollideEnd();

        director._loopBody(2100);
        physicsTool.judgePos(box1, [0, 0, 0.5]);
        physicsTool.judgePos(sphere2, [0, 0, 10]);

        judgeCollideCount(2);

        director._loopBody(6100);
        physicsTool.judgePos(box1, [0, 0, 20.5]);
        physicsTool.judgePos(sphere2, [0, 0, 10]);

        judgeCollideCount(2);
        judgeCollideEnd();
    });
});

