describe("physics", function () {
    var sandbox = null;
    //var collider = null;
    var director;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        //collider = new wd.BoxCollider();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        testTool.openContractCheck(sandbox);


        director = wd.Director.getInstance();
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("rigid body", function () {
        beforeEach(function () {
            physicsTool.setEngineType(wd.PhysicsEngineType.CANNON);

            physicsTool.setStartTime(sandbox, 0);
        });


        describe("dynamic rigid body", function () {
            beforeEach(function () {

            });

            it("", function () {

            });
        });

        //describe("update rigid body", function () {
        //    beforeEach(function () {
        //
        //    });
        //
        //    it("", function () {
        //
        //    });
        //});

        it("rigid body can update position by gameObject's position", function(){

        });
        it("rigid body can update rotation by gameObject's rotation", function(){

        });

        describe("dispose", function(){
            beforeEach(function(){

            });

            it("unregister gameObject in adapter", function(){

            });
        });

        //todo move demo test out

        describe("test body types demo", function(){
            beforeEach(function(){

            });

            it("", function(){

            });
        });

        describe("test collision demo", function () {
            var rigidBody1,rigidBody2;
            var sphere1, sphere2;
            //var script1,script2;

            beforeEach(function () {
                physicsTool.setPhysicsSetting({
                    gravity:wd.Vector3.create(0, 0, 0)
                });


                rigidBody1 = physicsTool.createRigidBody({
                    velocity: wd.Vector3.create(-5, 0, 0)
                });


                rigidBody2 = physicsTool.createRigidBody({
                    velocity: wd.Vector3.create(5, 0, 0)
            });


                sphere1 = physicsTool.createSphere(wd.BoxCollider, rigidBody1);
                sphere2 = physicsTool.createSphere(wd.SphereCollider, rigidBody2);


                //script1 = {
                //    onContact: sandbox.stub(),
                //    onCollisionStart: sandbox.stub(),
                //    onCollisionEnd: sandbox.stub()
                //};
                //prepareTool.addScript(sphere1, script1);
                //
                //script2 = {
                //    onContact: sandbox.stub(),
                //    onCollisionStart: sandbox.stub(),
                //    onCollisionEnd: sandbox.stub()
                //};
                //prepareTool.addScript(sphere2, script2);


                director.scene.addChild(sphere1);
                director.scene.addChild(sphere2);

                director.scene.addChild(testTool.createCamera());
            });

            describe("test sphere-sphere", function () {
                beforeEach(function(){
                    sphere1.transform.translate(10, 0, 0);

                    sphere2.transform.translate(-10, 0, 0);

                });

                it("test position", function(){
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
                it("update debug object", function(){
                    sandbox.stub(wd.DebugConfig, "debugCollision", true);

                    director._init();


                    director._loopBody(100);

                    var debugBox = colliderTool.findDebugObject(sphere1);

                    physicsTool.judgePos(debugBox, [9.5, 0, 0]);


                    director._loopBody(200);
                    physicsTool.judgePos(debugBox, [9, 0, 0]);
                });
            });

            it("change velocity", function(){

            });

            it("test rotation collision", function(){

            });

            describe("test collision with the one which only has collider, not has rigid body", function () {
                beforeEach(function () {

                });

                it("", function () {

                });
            });
        });

        //describe("test collision event", function () {
        //    var box1, box2;
        //    var script1, script2;
        //
        //    function physicsTool.judgeCollide() {
        //        expect(script1.onContact).toCalledOnce();
        //        expect(script2.onContact).toCalledOnce();
        //        expect(script1.onContact).toCalledWith(wdCb.Collection.create([box2]));
        //        expect(script2.onContact).toCalledWith(wdCb.Collection.create([box1]));
        //    }
        //
        //    function physicsTool.judgeNotCollide() {
        //        expect(script1.onContact).not.toCalled();
        //        expect(script2.onContact).not.toCalled();
        //    }
        //
        //    function physicsTool.judgeCollideCount(num) {
        //        expect(script1.onContact.callCount).toEqual(num);
        //        expect(script2.onContact.callCount).toEqual(num);
        //    }
        //
        //    beforeEach(function () {
        //        director.scene.physics.enable = true;
        //
        //
        //        box1 = colliderTool.createBox();
        //        var rigidBody = wd.DynamicRigidBody.create();
        //        box1.addComponent(rigidBody);
        //
        //
        //        box2 = colliderTool.createBox();
        //        var rigidBody = wd.DynamicRigidBody.create();
        //        box2.addComponent(rigidBody);
        //
        //        script1 = {
        //            onContact: sandbox.stub(),
        //            onCollisionStart: sandbox.stub(),
        //            onCollisionEnd: sandbox.stub()
        //        };
        //        prepareTool.addScript(box1, script1);
        //
        //        script2 = {
        //            onContact: sandbox.stub(),
        //            onCollisionStart: sandbox.stub(),
        //            onCollisionEnd: sandbox.stub()
        //        };
        //        prepareTool.addScript(box2, script2);
        //
        //
        //        director.scene.addChild(box1);
        //        director.scene.addChild(box2);
        //
        //        director.scene.addChild(testTool.createCamera());
        //    });
        //    //
        //    it("trigger onContact event during collision", function () {
        //        //director._init();
        //        //
        //        //box1.transform.translate(0, 8, 0);
        //        //box2.transform.translate(0, -2, 0);
        //        //
        //        //
        //        //director._loopBody(1);
        //        //
        //        ////physicsTool.judgeCollide();
        //        //expect(script1.onContact).toCalledOnce();
        //        //expect(script2.onContact).toCalledOnce();
        //        //expect(script1.onContact).toCalledWith(wdCb.Collection.create([box2]));
        //        //expect(script2.onContact).toCalledWith(wdCb.Collection.create([box1]));
        //    });
        //    //    it("trigger onCollisionStart event at first collision", function(){
        //    //        director._init();
        //    //
        //    //        box1.transform.translate(0, 8, 0);
        //    //        box2.transform.translate(0, -2, 0);
        //    //
        //    //
        //    //        director._loopBody(1);
        //    //
        //    //
        //    //        expect(script1.onCollisionStart).toCalledOnce();
        //    //        expect(script2.onCollisionStart).toCalledOnce();
        //    //
        //    //        expect(script1.onContact).toCalledOnce();
        //    //        expect(script2.onContact).toCalledOnce();
        //    //        expect(script1.onContact).toCalledWith(wdCb.Collection.create([box2]));
        //    //        expect(script2.onContact).toCalledWith(wdCb.Collection.create([box1]));
        //    //
        //    //
        //    //        director._loopBody(1);
        //    //
        //    //        expect(script1.onCollisionStart).toCalledOnce();
        //    //        expect(script2.onCollisionStart).toCalledOnce();
        //    //
        //    //        expect(script1.onContact).toCalledTwice();
        //    //        expect(script2.onContact).toCalledTwice();
        //    //    });
        //    //    it("trigger onCollisionEnd event at the first frame that after collision", function(){
        //    //        director._init();
        //    //
        //    //        box1.transform.translate(0, 8, 0);
        //    //        box2.transform.translate(0, -2, 0);
        //    //
        //    //
        //    //        director._loopBody(1);
        //    //
        //    //
        //    //        expect(script1.onCollisionEnd).not.toCalled();
        //    //        expect(script2.onCollisionEnd).not.toCalled();
        //    //
        //    //
        //    //        box1.transform.translate(0, 0.1, 0);
        //    //
        //    //        director._loopBody(1);
        //    //
        //    //        expect(script1.onCollisionEnd).toCalledOnce();
        //    //        expect(script2.onCollisionEnd).toCalledOnce();
        //    //    });
        //});
    });
});

