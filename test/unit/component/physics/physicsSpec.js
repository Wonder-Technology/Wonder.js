describe("physics", function () {
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

    describe("angularVelocity", function(){
        it("it will change gameObject's and body's rotation", function(){
            var rigidBody1;
            var box1;

            rigidBody1 = physicsTool.createRigidBody({
                class: wd.DynamicRigidBody,
                angularDamping: 0.3,
                angularVelocity:wd.Vector3.create(0, 0, 5)
            });


            box1 = physicsTool.createBox(wd.BoxCollider, rigidBody1);


            director.scene.addChild(box1);




            director._init();

            physicsTool.judgeGameObjectAndBodyRotation(box1, [0,0,0], 3);



            director._loopBody(100);


            physicsTool.judgeGameObjectAndBodyRotation(box1, [0,0,27.1], 1);
        });
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
            return physicsTool.getBody(box1);
        }

        beforeEach(function(){
        });

        describe("change velocity/angularVelocity", function(){
            function judge(rigidBodyClass, dataAttriName){
                var data = {
                    class: rigidBodyClass
                };
                data[dataAttriName] = wd.Vector3.create(5, 0, 0);

                prepare(data);


                director._init();

                director._loopBody(100);

                physicsTool.judgeValue(rigidBody1[dataAttriName], [5, 0, 0]);

                rigidBody1[dataAttriName] = wd.Vector3.create(6, 0, 0);

                director._loopBody(200);

                physicsTool.judgeValue(rigidBody1[dataAttriName], [6, 0, 0]);
                physicsTool.judgeValue(physicsTool.convertToWonderVector3(getBody()[dataAttriName]), [6, 0, 0]);
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

        describe("change friction/restitution", function(){
            var rigidBody1, rigidBody2;
            var box1,ground;

            beforeEach(function(){
                physicsTool.setPhysicsSetting({
                    gravity: wd.Vector3.create(0, -10, 0)
                });
            });

            describe("change friction", function(){
                function judge(rigidBody2Class) {
                    rigidBody1 = physicsTool.createRigidBody({
                        class: wd.DynamicRigidBody,
                        friction: 0.3,
                        velocity: wd.Vector3.create(5, 0, 0)
                    });


                    box1 = physicsTool.createBox(wd.BoxCollider, rigidBody1);


                    box1.transform.translate(-10, 5, 0);


                    rigidBody2 = physicsTool.createRigidBody({
                        friction: 0.2,
                        class: rigidBody2Class
                    });


                    ground = physicsTool.createBox(wd.BoxCollider, rigidBody2, [1000, 1, 1000]);


                    director.scene.addChild(box1);
                    director.scene.addChild(ground);


                    director._init();

                    director._loopBody(100);

                    var body = rigidBody1;

                    var firstVelocityX = body.velocity.x;



                    body.friction = 0.0;

                    director._loopBody(200);

                    expect(rigidBody1.velocity.x).toEqual(firstVelocityX);
                }

                it("change dynamic rigid body's friction", function(){
                    judge(wd.StaticRigidBody);
                });
                it("change kinematic rigid body's friction", function(){
                    judge(wd.KinematicRigidBody);
                });
                it("change static rigid body's friction", function(){
                    judge(wd.StaticRigidBody);
                });
            });

            describe("change restitution", function(){
                function judge(rigidBody2Class) {
                    rigidBody1 = physicsTool.createRigidBody({
                        class: wd.DynamicRigidBody,
                        restitution: 0.03
                    });


                    box1 = physicsTool.createBox(wd.BoxCollider, rigidBody1);


                    box1.transform.translate(0, 10, 0);


                    rigidBody2 = physicsTool.createRigidBody({
                        restitution: 0.03,
                        class: rigidBody2Class
                    });


                    ground = physicsTool.createBox(wd.BoxCollider, rigidBody2, [1000, 1, 1000]);


                    director.scene.addChild(box1);
                    director.scene.addChild(ground);


                    director._init();

                    director._loopBody(700);

                    var body = rigidBody1;

                    expect(body.velocity.y < 0).toBeTruthy();




                    body.restitution = 2;

                    director._loopBody(800);

                    expect(body.velocity.y > 10).toBeTruthy();
                    //expect(body.velocity.y).toEqual();
                }

                it("change dynamic rigid body's restitution", function(){
                    judge(wd.StaticRigidBody);
                });
                it("change kinematic rigid body's restitution", function(){
                    judge(wd.KinematicRigidBody);
                });
                it("change static rigid body's restitution", function(){
                    judge(wd.StaticRigidBody);
                });
            });
        });

        describe("change damping/mass", function(){
            function judge(rigidBodyClass, dataAttriName){
                var data = {
                    class: rigidBodyClass
                };
                data[dataAttriName] = 0.3;

                prepare(data);


                director._init();

                director._loopBody(100);

                physicsTool.judgeValue(rigidBody1[dataAttriName], 0.3);
                physicsTool.judgeValue(getBody()[dataAttriName], 0.3);

                rigidBody1[dataAttriName] = 0.5;

                director._loopBody(200);

                physicsTool.judgeValue(rigidBody1[dataAttriName], 0.5);
                physicsTool.judgeValue(getBody()[dataAttriName], 0.5);
            }

            describe("change damping", function(){
                it("change dynamic rigid body's linearDamping", function(){
                    judge(wd.DynamicRigidBody, "linearDamping");
                });
                it("change dynamic rigid body's angularDamping", function(){
                    judge(wd.DynamicRigidBody, "angularDamping");
                });
            });

            describe("change mass", function(){
                it("change dynamic rigid body's mass", function(){
                    judge(wd.DynamicRigidBody, "mass");
                });
                it("change kinematic rigid body's mass", function(){
                    judge(wd.KinematicRigidBody, "mass");
                });
            });
        });


        describe("change gameObject's position,rotation", function(){
            var position1,position2;
            var rotation1,rotation2;

            function assert(position, rotation){
                physicsTool.judgeValue(box1.transform.position, position.toArray());
                physicsTool.judgeValue(physicsTool.convertToWonderVector3(getBody().position), position.toArray());


                physicsTool.judgeValue(box1.transform.rotation.getEulerAngles(), rotation.getEulerAngles().toArray());
                physicsTool.judgeValue(physicsTool.convertToWonderQuaternion(getBody().quaternion).getEulerAngles(), rotation.getEulerAngles().toArray());
            }

            beforeEach(function(){
                prepare({
                    class:wd.DynamicRigidBody
                });

                position1 = wd.Vector3.create(10, 0, 0);
                rotation1 = wd.Quaternion.create().setFromEulerAngles(wd.Vector3.create(0, 0, 45));

                box1.transform.position = position1;
                box1.transform.rotation = rotation1;



                position2 = wd.Vector3.create(20, 10, 10);
                rotation2 = wd.Quaternion.create().setFromEulerAngles(wd.Vector3.create(0, 0, 60));
            });

            it("test change gameObject's position/rotation with dynamic rigid body", function(){
                director._init();

                director._loopBody(100);

                assert(position1, rotation1);



                box1.transform.position = position2;
                box1.transform.rotation = rotation2;

                director._loopBody(200);

                assert(position2, rotation2);
            });
            it("test use scheduler to change position/rotation", function(){
                director.scheduler.scheduleTime(function(){
                    box1.transform.position = position2;
                    box1.transform.rotation = rotation2;
                }, 150);



                director._init();

                director._loopBody(100);

                assert(position1, rotation1);



                director._loopBody(200);

                assert(position2, rotation2);
            })
        });

        describe("change world data", function(){
            beforeEach(function(){

            });

            it("change gravity", function(){
                physicsTool.setPhysicsSetting({
                    gravity: wd.Vector3.create(10, 10, 0)
                });

                director._init();


                physicsTool.setPhysicsSetting({
                    gravity: wd.Vector3.create(0, 10, 0)
                });

                expect(testTool.getValues(
                    director.scene.physics.gravity
                )).toEqual([0, 10, 0]);
                expect(testTool.getValues(
                    physicsTool.convertToWonderVector3(physicsTool.getWorld().gravity)
                )).toEqual([0, 10, 0]);
            });
        });
    });

    describe("dispose", function(){
        var rigidBody1, rigidBody2;
        var box1, ground;
        var adapter;
        var box1Material;

        beforeEach(function(){
            rigidBody1 = physicsTool.createRigidBody({
                class: wd.DynamicRigidBody
            });


            box1 = physicsTool.createBox(wd.BoxCollider, rigidBody1);


            rigidBody2 = physicsTool.createRigidBody({
            });


            ground = physicsTool.createBox(wd.BoxCollider, rigidBody2, [1000, 1, 1000]);


            director.scene.addChild(box1);
            director.scene.addChild(ground);


            director._init();


            adapter = physicsTool.getPhysicsEngineAdapter();

            box1Material = adapter._getMaterial(box1);

            expect(box1Material).toBeInstanceOf(CANNON.Material);
        });

        it("unregistered gameObject", function(){
            box1.dispose();

            expect(physicsTool.getBody(box1)).toBeNull();
        });
        it("unregistered its material", function(){
            box1.dispose();

            expect(adapter._getMaterial(box1)).toBeNull();
        });
        it("remove body", function(){
            box1.dispose();

            expect(adapter.world.bodies.length).toEqual(1);
            expect(adapter.world.bodies[0]).toEqual(
                physicsTool.getBody(ground)
            );
        });
        /*!
         todo remove material and contact material?

         it("remove material and contact material", function(){
         var groundMaterial = adapter._getMaterial(ground);

         box1.dispose();

         expect(adapter.world.getContactMaterial(box1Material, groundMaterial)).not.toBeDefined();
         expect(adapter.world.getContactMaterial(groundMaterial, box1Material)).not.toBeDefined();
         //expect(adapter.world.contactmaterials.length).toEqual(1);
         //expect(adapter._getContactMaterials(box1Material).length).toEqual(0);
         });
         */
        describe("test dispose compound", function(){
            //reset isRigidbodyChild flag
            //remove child body
        });
    });
});

