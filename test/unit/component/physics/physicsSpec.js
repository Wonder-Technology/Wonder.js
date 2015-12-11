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

        beforeEach(function(){
        });

        describe("change velocity/angularVelocity", function(){
            function judge(rigidBodyClass, velocityAttriName){
                var data = {
                    class: rigidBodyClass
                };
                data[velocityAttriName] = wd.Vector3.create(5, 0, 0);

                prepare(data);


                director._init();

                director._loopBody(100);

                physicsTool.judgeValue(rigidBody1[velocityAttriName], [5, 0, 0]);

                rigidBody1[velocityAttriName] = wd.Vector3.create(6, 0, 0);

                director._loopBody(200);

                physicsTool.judgeValue(rigidBody1[velocityAttriName], [6, 0, 0]);
                physicsTool.judgeValue(physicsTool.convertToWonderVector3(getBody()[velocityAttriName]), [6, 0, 0]);
            }

            describe("change velocity", function(){
                it("change dynamic rigid body's velocity", function(){
                    judge(wd.DynamicRigidBody, "velocity");
                });
                it("change kinematic rigid body's velocity", function(){
                    judge(wd.KinematicRigidBody, "velocity");
                });
            });

            describe("change angularVelocity", function(){
                it("change dynamic rigid body's angularVelocity", function(){
                    judge(wd.DynamicRigidBody, "angularVelocity");
                });
                it("change kinematic rigid body's angularVelocity", function(){
                    judge(wd.KinematicRigidBody, "angularVelocity");
                });
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

