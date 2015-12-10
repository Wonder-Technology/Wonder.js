describe("physics", function () {
    var sandbox = null;
    //var collider = null;
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

    describe("change data", function(){
        var rigidBody1;
        var box1;

        function prepare(rigidBodyData){
            rigidBody1 = physicsTool.createRigidBody(rigidBodyData);

            box1 = physicsTool.createBox(wd.BoxCollider, rigidBody1);

            director.scene.addChild(box1);
        }

        function getBody(){
            return rigidBody1.getPhysicsEngineAdapter()._findGameObjectData(box1).body;
        }

        function convertToWonderVector3(v){
            return wd.Vector3.create(v.x, v.y, v.z);
        }

        beforeEach(function(){
        });
        
        describe("change velocity", function(){
            it("change dynamic rigid body's velocity", function(){
                prepare({
                    class: wd.DynamicRigidBody,
                    velocity:wd.Vector3.create(5, 0, 0)
                });


                director._init();

                director._loopBody(100);

                physicsTool.judgeValue(rigidBody1.velocity, [5, 0, 0]);

                rigidBody1.velocity = wd.Vector3.create(6, 0, 0);

                director._loopBody(200);

                physicsTool.judgeValue(rigidBody1.velocity, [6, 0, 0]);
                physicsTool.judgeValue(convertToWonderVector3(getBody().velocity), [6, 0, 0]);
            });
            it("change kinematic rigid body's velocity", function(){
                prepare({
                    class: wd.KinematicRigidBody,
                    velocity:wd.Vector3.create(5, 0, 0)
                });

                director._init();

                director._loopBody(100);

                physicsTool.judgeValue(rigidBody1.velocity, [5, 0, 0]);

                rigidBody1.velocity = wd.Vector3.create(6, 0, 0);

                director._loopBody(200);

                physicsTool.judgeValue(rigidBody1.velocity, [6, 0, 0]);
                physicsTool.judgeValue(convertToWonderVector3(getBody().velocity), [6, 0, 0]);
            });
        });
    });
    
    describe("change position,rotation", function(){
        beforeEach(function(){
            
        });
        
        it("", function(){
        
        });
    });
});

