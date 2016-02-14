/**
 * A Compound shape is a shape built out of other shapes called child-shapes.
 * You can see it as a holder of a group of other shapes.
 * Use the compound shape to build rigid bodies that have more complex geometry.
 * For example, you can build concave shapes. When a child shape is added to
 * the Compound shape, a transform consisting of a position and a quaternion is
 * needed. This enables you to add child shapes at any position, rotated however
 * you like inside the local coordinate system of the Compound shape.
 */
describe("physics compound demo", function () {
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
            gravity: wd.Vector3.create(0, -10, 0)
        });


        director.scene.addChild(testTool.createCamera());
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("test boxes", function(){
        var rigidBody1, rigidBody3;
        var box1, box2,container;
        var ground;

        function createBoxes(){
            box1 = physicsTool.createBox(wd.BoxCollider);

            box1.transform.translate(0, 0, 0);


            box2 = physicsTool.createBox(wd.BoxCollider);

            box2.transform.translate(0, 20, 0);
            box2.transform.rotate(0, 45, 0);
        }

        function createContainer(){
            rigidBody1 = physicsTool.createRigidBody({
                class: wd.DynamicRigidBody
            });

            rigidBody1.children = [box1, box2];


            container = wd.GameObject.create();

            container.addComponent(rigidBody1);



            container.addChild(box1);
            container.addChild(box2);

            container.transform.translate(0, 10, 0);
            container.transform.rotate(0, 20, 0);
        }

        function createGround(){
            rigidBody3 = physicsTool.createRigidBody({
                class: wd.StaticRigidBody
            });

            ground = physicsTool.createBox(wd.BoxCollider, rigidBody3, [1000, 1, 1000]);


        }

        beforeEach(function(){
            createBoxes();

            createContainer();

            createGround();

            director.scene.addChild(container);
            director.scene.addChild(ground);
        });

        it("child should not has rigid body but collider", function(){
            director._init();

            /*!
            fall to ground
             */
            director._loopBody(700);
            physicsTool.judgePos(box1, [0, 5.1, 0], 1);
            physicsTool.judgePos(box2, [0,25.1,0], 1);

            physicsTool.judgeRotation(box1, [0, 20, 0], 1);
            physicsTool.judgeRotation(box2, [0, 65, 0], 1);

            /*!
            stay on ground
             */
            director._loopBody(800);

            physicsTool.judgePos(box1, [0, 5.3, 0], 1);
            physicsTool.judgePos(box2, [0,25.3,0], 1);
            physicsTool.judgeRotation(box1, [0, 20, 0], 1);
            physicsTool.judgeRotation(box2, [0, 65, 0], 1);
        });
        it("update child's debug obj's position/rotation", function(){
            sandbox.stub(wd.DebugConfig, "debugCollision", true);

            director._init();


            director._loopBody(700);

            var debugBox2 = colliderTool.findDebugObject(box2);

            physicsTool.judgePos(debugBox2, [0,25.1,0], 1);


            director._loopBody(800);

            physicsTool.judgePos(debugBox2, [0,25.3,0], 1);
        });
        it("change gameObject's position/rotation", function(){
            director._init();


            director._loopBody(700);


            container.transform.translate(0, 10, 0);
            container.transform.rotate(0, 10, 0);


            director._loopBody(800);

            physicsTool.judgePos(box1, [0, 14.3, 0], 1);
            physicsTool.judgePos(box2, [0,34.3,0], 1);
            physicsTool.judgeRotation(box1, [0, 30, 0], 1);
            physicsTool.judgeRotation(box2, [0, 75, 0], 1);
        });
    });
});

