describe("physics event demo", function () {
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
            gravity: wd.Vector3.create(0, 0, 0)
        });


        director.scene.addChild(testTool.createCamera());
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("use box-sphere as test case", function () {
        var box1, sphere2;
        var script1, script2;
        var rigidBody1, rigidBody2;

        function judgeNoCollide(){
            expect(script1.onContact).not.toCalled();
            expect(script2.onContact).not.toCalled();
        }

        function judgeCollideCount(num) {
            expect(script1.onContact.callCount).toEqual(num);
            expect(script2.onContact.callCount).toEqual(num);
        }

        function judgeCollide(){
            expect(script1.onCollisionStart).toCalledBefore(script1.onContact);
            expect(script2.onCollisionStart).toCalledBefore(script2.onContact);
            expect(script1.onContact).toCalledOnce();
            expect(script2.onContact).toCalledOnce();


            expect(script1.onCollisionStart).toCalledWith(wdCb.Collection.create([sphere2]));
            expect(script2.onCollisionStart).toCalledWith(wdCb.Collection.create([box1]));
            expect(script1.onContact).toCalledWith(wdCb.Collection.create([sphere2]));
            expect(script2.onContact).toCalledWith(wdCb.Collection.create([box1]));
        }

        function judgeCollideEnd(){
            expect(script1.onCollisionEnd).toCalledAfter(script1.onContact);
            expect(script2.onCollisionEnd).toCalledAfter(script2.onContact);
        }

        beforeEach(function () {
            rigidBody1 = physicsTool.createRigidBody({
                velocity: wd.Vector3.create(-5, 0, 0)
            });


            rigidBody2 = physicsTool.createRigidBody({
                velocity: wd.Vector3.create(5, 0, 0)
            });


            box1 = physicsTool.createSphere(wd.BoxCollider, rigidBody1);
            sphere2 = physicsTool.createSphere(wd.SphereCollider, rigidBody2);


            box1.transform.translate(10, 0, 0);
            box1.transform.rotate(0, 0, 60);

            sphere2.transform.translate(-10, 0, 0);


            script1 = {
                onContact: sandbox.stub(),
                onCollisionStart: sandbox.stub(),
                onCollisionEnd: sandbox.stub()
            };
            prepareTool.addScript(box1, script1);

            script2 = {
                onContact: sandbox.stub(),
                onCollisionStart: sandbox.stub(),
                onCollisionEnd: sandbox.stub()
            };
            prepareTool.addScript(sphere2, script2);


            director.scene.addChild(box1);
            director.scene.addChild(sphere2);
        });

        it("trigger onCollisionStart,onContact,onCollisonEnd event when collide(the event only trigger once)", function () {
            director._init();


            director._loopBody(100);

            judgeNoCollide();


            director._loopBody(1000);
            judgeNoCollide();

            physicsTool.judgePos(box1, [5, 0, 0]);
            physicsTool.judgePos(sphere2, [-5, 0, 0]);


            director._loopBody(1010);

            judgeCollide();
            judgeCollideEnd();
        });

        describe("test collision with the one which only has collider, not has rigid body", function () {
            it("trigger collision event, no response", function () {
                sphere2.removeComponent(rigidBody2);


                director._init();



                director._loopBody(1000);

                judgeNoCollide();

                physicsTool.judgePos(box1, [5, 0, 0]);
                physicsTool.judgePos(sphere2, [-10, 0, 0]);


                director._loopBody(2000);
                physicsTool.judgePos(box1, [0, 0, 0]);
                physicsTool.judgePos(sphere2, [-10, 0, 0]);

                judgeNoCollide();


                director._loopBody(2010);
                physicsTool.judgePos(box1, [-0.05, 0, 0]);
                physicsTool.judgePos(sphere2, [-10, 0, 0]);

                judgeCollide();



                director._loopBody(2020);
                physicsTool.judgePos(box1, [-0.1, 0, 0]);
                physicsTool.judgePos(sphere2, [-10, 0, 0]);

                judgeCollideCount(2);




                director._loopBody(6000);
                physicsTool.judgePos(box1, [-20, 0, 0]);
                physicsTool.judgePos(sphere2, [-10, 0, 0]);
                judgeCollideEnd();

                judgeCollideCount(2);
            });
        });
    });
});

