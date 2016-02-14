describe("rigid body optimize", function () {
    var sandbox = null;
    var director;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        testTool.openContractCheck(sandbox);


        director = wd.Director.getInstance();

        physicsTool.setEngineType(wd.EPhysicsEngineType.CANNON);
        //
        //physicsTool.setStartTime(sandbox, 0);
        //
        //
        physicsTool.setPhysicsSetting({
            gravity: wd.Vector3.create(0, 0, 0)
        });


        director.scene.addChild(testTool.createCamera());
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    it("not update collider shape if has rigid body and not show debug shape", function(){
        var rigidBody1;
        var box1;

        sandbox.stub(wd.DebugConfig, "debugCollision", false);

        rigidBody1 = physicsTool.createRigidBody({
            class: wd.DynamicRigidBody
        });


        box1 = physicsTool.createBox(wd.BoxCollider, rigidBody1);

        director.scene.addChild(box1);


        director._init();


        box1.transform.rotate(0, 0, 45);


        director._loopBody(100);

        expect(testTool.getValues(
            colliderTool.getShape(box1).halfExtents)
        ).toEqual([5,5,5]);
    });
    it("update collider shape if has rigid body but show debug shape(because updating debug shape need update collider shape)", function(){
        var rigidBody1;
        var box1;

        sandbox.stub(wd.DebugConfig, "debugCollision", true);

        rigidBody1 = physicsTool.createRigidBody({
            class: wd.DynamicRigidBody
        });


        box1 = physicsTool.createBox(wd.BoxCollider, rigidBody1);

        director.scene.addChild(box1);


        director._init();


        box1.transform.rotate(0, 0, 45);


        director._loopBody(100);

        expect(
            testTool.getValues( colliderTool.getShape(box1).halfExtents, 1)
        ).toEqual([7.1,7.1,5]);



        var debugBox = colliderTool.findDebugObject(box1);
        var debugGeo = debugBox.getComponent(wd.Geometry);

        expect(
            testTool.getValues(debugGeo.vertices[0],1)
        ).toEqual(-7.1);
    });
});
