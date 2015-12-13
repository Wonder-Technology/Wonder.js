/**
 * Constraints removes degrees of freedom from bodies and forces them to move in a way defined by the constraint.
 */
describe("physics constraint demo", function () {
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
        var rigidBodyGround;
        var box1, box2, box3, box4, box5;
        var ground;

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

        function createGround(){
            rigidBodyGround = physicsTool.createRigidBody({
                class: wd.StaticRigidBody
            });

            ground = physicsTool.createBox(wd.BoxCollider, rigidBodyGround, [1000, 1, 1000]);
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
        beforeEach(function(){

        });

        it("", function(){

        });
    });

    describe("DistanceConstraint", function(){
        beforeEach(function(){

        });

        it("", function(){

        });
    });

    //door
    describe("HingeConstraint", function(){
        beforeEach(function(){

        });

        it("", function(){

        });
    });
});

