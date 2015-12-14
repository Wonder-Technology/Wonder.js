/**
 * ConstraintList removes degrees of freedom from bodies and forces them to move in a way defined by the constraint.
 */
describe("physics constraint demo", function () {
    var sandbox = null;
    var director;

    var ground;
    var rigidBodyGround;


    function createGround(){
        rigidBodyGround = physicsTool.createRigidBody({
            class: wd.StaticRigidBody
        });

        ground = physicsTool.createBox(wd.BoxCollider, rigidBodyGround, [1000, 1, 1000]);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        testTool.openContractCheck(sandbox);


        director = wd.Director.getInstance();


        physicsTool.setEngineType(wd.PhysicsEngineType.CANNON);

        physicsTool.setStartTime(sandbox, 0);


        physicsTool.setPhysicsSetting({
            gravity: wd.Vector3.create(0, -10, 0)
        });


        director.scene.addChild(testTool.createCamera());
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("LockConstraint", function(){
        var rigidBody1,rigidBody2,rigidBody3, rigidBody4, rigidBody5;
        var box1, box2, box3, box4, box5;

        function createStandBoxes(){
            rigidBody1 = physicsTool.createRigidBody({
                class: wd.DynamicRigidBody,
                mass:5
            });

            box1 = physicsTool.createBox(wd.BoxCollider, rigidBody1);

            box1.transform.translate(-10, 5, 0);


            rigidBody2 = physicsTool.createRigidBody({
                class: wd.DynamicRigidBody,
                mass:5
            });

            box2 = physicsTool.createBox(wd.BoxCollider, rigidBody2);

            box2.transform.translate(10, 5, 0);
        }

        function createLockBoxes(){
            rigidBody3 = physicsTool.createRigidBody({
                class: wd.DynamicRigidBody,
                mass:5
            });

            box3 = physicsTool.createBox(wd.BoxCollider, rigidBody3);

            box3.transform.translate(-10, 15, 0);


            rigidBody4 = physicsTool.createRigidBody({
                class: wd.DynamicRigidBody,
                mass:5
            });
            rigidBody4.lockConstraint.connectedBody = rigidBody3;

            box4 = physicsTool.createBox(wd.BoxCollider, rigidBody4);

            box4.transform.translate(-0, 15, 0);




            rigidBody5 = physicsTool.createRigidBody({
                class: wd.DynamicRigidBody,
                mass:5
            });
            rigidBody5.lockConstraint.connectedBody = rigidBody4;

            box5 = physicsTool.createBox(wd.BoxCollider, rigidBody5);

            box5.transform.translate(10, 15, 0);
        }

        beforeEach(function(){
            createStandBoxes();
            createLockBoxes();
            createGround();


            director.scene.addChildren([box1,box2,box3,box4,box5]);
            director.scene.addChild(ground);
        });

        it("the locked boxes shouldn't fall", function(){
            director._init();

            director._loopBody(500);

            physicsTool.judgePos(box3, [-10,15.2,0], 1);
            physicsTool.judgePos(box4, [0,15.1,0], 1);
            physicsTool.judgePos(box5, [10,15.2,0], 1);
        });
        it("change constraint", function(){
            director._init();

            director._loopBody(500);

            rigidBody4.lockConstraint.connectedBody = null;
            rigidBody5.lockConstraint.connectedBody = null;


            director._loopBody(700);


            physicsTool.judgePos(box4, [0,14.7,0], 1);




            rigidBody4.lockConstraint.connectedBody = rigidBody3;
            rigidBody5.lockConstraint.connectedBody = rigidBody4;

            director._loopBody(900);


            physicsTool.judgePos(box4, [0,14.8,0], 1);
        });
    });

    describe("PointToPointConstraint", function(){
        var topBox,linkBox;
        var rigidBody1,rigidBody2;
        var constraint1,constraint2;

        function createTopStaticBox(){
            rigidBody1 = physicsTool.createRigidBody({
                class: wd.StaticRigidBody
            });

            topBox = physicsTool.createBox(wd.BoxCollider, rigidBody1);

            topBox.transform.translate(0, 30, 0);
        }

        function createLinkBox(){
            rigidBody2 = physicsTool.createRigidBody({
                class: wd.DynamicRigidBody,
                mass:5
            });





            /*!
             connected left,right corner points
             */

            constraint1 = wd.PointToPointConstraint.create();
            constraint1.connectedBody = rigidBody1;
            constraint1.pivotA = wd.Vector3.create(-5, 6, 0);
            constraint1.pivotB = wd.Vector3.create(-5, -6, 0);


            constraint2 = wd.PointToPointConstraint.create();
            constraint2.connectedBody = rigidBody1;
            constraint2.pivotA = wd.Vector3.create(5, 6, 0);
            constraint2.pivotB = wd.Vector3.create(5, -6, 0);

            rigidBody2.pointToPointConstraintList.addChildren([constraint1, constraint2]);






            linkBox = physicsTool.createBox(wd.BoxCollider, rigidBody2);

            linkBox.transform.translate(0, 18, 0);
        }

        beforeEach(function(){
            physicsTool.setPhysicsSetting({
                gravity: wd.Vector3.create(0, -20, 10)
            });

            createTopStaticBox();
            createLinkBox();
            createGround();


            director.scene.addChildren([topBox, linkBox]);
            director.scene.addChild(ground);
        });

        it("the boxes should link by points", function(){
            director._init();

            director._loopBody(500);

            physicsTool.judgePos(topBox, [0,30,0], 1);
            physicsTool.judgePos(linkBox, [0,18,1.7], 1);
        });

        describe("change constraint", function(){
            it("remove/add constraint", function(){
                director._init();

                director._loopBody(500);

                physicsTool.judgePos(topBox, [0,30,0], 1);
                physicsTool.judgePos(linkBox, [0,18,1.7], 1);

                rigidBody2.pointToPointConstraintList.removeChild(constraint1);
                rigidBody2.pointToPointConstraintList.removeChild(constraint2);


                director._loopBody(700);


                physicsTool.judgePos(topBox, [0,30,0], 1);
                physicsTool.judgePos(linkBox, [0,17.2,2.8], 1);




                rigidBody2.pointToPointConstraintList.addChildren([constraint1, constraint2]);

                director._loopBody(900);


                physicsTool.judgePos(topBox, [0,30,0], 1);
                /*!
                not fall
                 */
                expect(physicsTool.getPos(linkBox, 1)[1] > 17).toBeTruthy();
            });
            //it("change connected body", function(){
            //
            //});
            it("change pivot", function(){
                //todo support change pivot
            });
        });
    });

    describe("DistanceConstraint(The Distance constraint forces its owner to stay either further from, nearer to, or exactly at a given distance from its target)", function(){
        var rigidBody1,rigidBody2,rigidBody3, rigidBody4, rigidBody5;
        var box1, box2, box3, box4, box5;

        function createStandBoxes(){
            rigidBody1 = physicsTool.createRigidBody({
                class: wd.DynamicRigidBody,
                mass:5
            });

            box1 = physicsTool.createBox(wd.BoxCollider, rigidBody1);

            box1.transform.translate(-20, 5, 0);


            rigidBody2 = physicsTool.createRigidBody({
                class: wd.DynamicRigidBody,
                mass:5
            });

            box2 = physicsTool.createBox(wd.BoxCollider, rigidBody2);

            box2.transform.translate(20, 5, 0);
        }

        function createUpBoxes(){
            rigidBody3 = physicsTool.createRigidBody({
                class: wd.DynamicRigidBody,
                mass:5
            });

            box3 = physicsTool.createBox(wd.BoxCollider, rigidBody3);

            box3.transform.translate(-12, 15, 0);


            rigidBody4 = physicsTool.createRigidBody({
                class: wd.DynamicRigidBody,
                mass:5
            });
            rigidBody4.distanceConstraint.connectedBody = rigidBody3;
            rigidBody4.distanceConstraint.distance = 15;

            box4 = physicsTool.createBox(wd.BoxCollider, rigidBody4);

            box4.transform.translate(-0, 15, 0);




            rigidBody5 = physicsTool.createRigidBody({
                class: wd.DynamicRigidBody,
                mass:5
            });
            rigidBody5.distanceConstraint.connectedBody = rigidBody4;
            rigidBody5.distanceConstraint.distance = 15;


            box5 = physicsTool.createBox(wd.BoxCollider, rigidBody5);

            box5.transform.translate(12, 15, 0);
        }

        beforeEach(function(){
            createStandBoxes();
            createUpBoxes();
            createGround();


            director.scene.addChildren([box1,box2,box3,box4,box5]);
            director.scene.addChild(ground);
        });
        it("the middle one of up boxes should fall", function(){
            director._init();

            director._loopBody(100);
            director._loopBody(500);

            physicsTool.judgePos(box3, [-10.2,15.2,0], 1);
            physicsTool.judgePos(box4, [0,13.6,0], 1);
            physicsTool.judgePos(box5, [10.2,15.2,0], 1);
        });

        describe("change constraint", function(){
            it("remove/add constraint", function(){
                director._init();

                director._loopBody(100);
                director._loopBody(500);

                rigidBody4.distanceConstraint.connectedBody = null;
                rigidBody5.distanceConstraint.connectedBody = null;


                director._loopBody(550);


                expect(physicsTool.getPos(box3, 1)[1]).toEqual(15.2);
                expect(physicsTool.getPos(box5, 1)[1]).toEqual(15.2);
                /*!
                fall faster when no distance constraint
                 */
                expect(physicsTool.getPos(box4, 1)[1] < 13.6).toBeTruthy();





                rigidBody4.distanceConstraint.connectedBody = rigidBody3;
                rigidBody5.distanceConstraint.connectedBody = rigidBody4;

                director._loopBody(600);


                /*!
               when restore distance constraint, box3,box5(which are upon box4) bounce up, while box4 bounce down so it falls faster
                 */
                expect(physicsTool.getPos(box3, 1)[1] > 15.2).toBeTruthy();
                expect(physicsTool.getPos(box5, 1)[1] > 15.2).toBeTruthy();
                expect(physicsTool.getPos(box4, 1)[1] ).toEqual(11.7);
            });
            it("change distance", function(){
                //todo support change distance
            });
        });
    });

    describe("HingeConstraint(A hinge constraint makes sure that two bodies can rotate around a common axis)", function(){
        var topBox,linkBox;
        var rigidBody1,rigidBody2;
        var constraint;

        function createTopStaticBox(){
            rigidBody1 = physicsTool.createRigidBody({
                class: wd.StaticRigidBody
            });

            topBox = physicsTool.createBox(wd.BoxCollider, rigidBody1);

            topBox.transform.translate(0, 30, 0);
        }

        function createLinkBox(){
            rigidBody2 = physicsTool.createRigidBody({
                class: wd.DynamicRigidBody,
                mass:5
            });




            constraint = rigidBody2.hingeConstraint;
            constraint.connectedBody = rigidBody1;
            constraint.pivotA = wd.Vector3.create(-5, 6, 0);
            constraint.axisA = wd.Vector3.create(1, 0, 0);
            constraint.pivotB = wd.Vector3.create(-5, -6, 0);
            constraint.axisB = wd.Vector3.create(1, 0, 0);







            linkBox = physicsTool.createBox(wd.BoxCollider, rigidBody2);

            linkBox.transform.translate(0, 18, 0);
        }

        beforeEach(function(){
            physicsTool.setPhysicsSetting({
                gravity: wd.Vector3.create(0, -20, 10)
            });

            createTopStaticBox();
            createLinkBox();
            createGround();


            director.scene.addChildren([topBox, linkBox]);
            director.scene.addChild(ground);
        });

        it("the boxes should link by axis", function(){
            director._init();

            director._loopBody(500);

            physicsTool.judgePos(topBox, [0,30,0], 1);
            expect(physicsTool.getPos(linkBox, 1)[1]).toEqual(16.6);


            director._loopBody(600);

            expect(physicsTool.getPos(linkBox, 1)[1]).toEqual(17.3);
        });

        describe("change constraint", function(){
            it("remove/add constraint", function(){
                director._init();

                director._loopBody(500);


                rigidBody2.hingeConstraint.connectedBody = null;


                director._loopBody(600);


                /*!
                fall when not constraint
                 */
                expect(physicsTool.getPos(linkBox, 1)[1] < 17.3).toBeTruthy();




                rigidBody2.hingeConstraint.connectedBody = rigidBody1;

                director._loopBody(700);


                /*!
                 not fall when add constraint
                 */
                expect(physicsTool.getPos(linkBox, 1)[1]).toEqual(17.3);
            });
            it("change pivot", function(){
                //todo support change pivot
            });
            it("change axis", function(){
                //todo support change axis
            });
        });
    });
});

