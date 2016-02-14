describe("rigid body dispose", function () {
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

    describe("dispose", function () {
        var rigidBody1, rigidBody2;
        var box1, box2;
        var adapter;

        beforeEach(function () {
            rigidBody1 = physicsTool.createRigidBody({
                class: wd.DynamicRigidBody
            });


            box1 = physicsTool.createBox(wd.BoxCollider, rigidBody1);


            rigidBody2 = physicsTool.createRigidBody({});


            box2 = physicsTool.createBox(wd.BoxCollider, rigidBody2, [1000, 1, 1000]);


            director.scene.addChild(box1);
            director.scene.addChild(box2);
        });

        it("unregistered gameObject", function () {
            director._init();


            box1.dispose();

            expect(physicsTool.getBody(box1)).toBeNull();
        });
        it("unregistered its material", function () {
            director._init();
            adapter = physicsTool.getPhysicsEngineAdapter();

            box1.dispose();

            expect(adapter._getMaterial(box1)).toBeNull();
        });
        it("remove body", function () {
            director._init();
            adapter = physicsTool.getPhysicsEngineAdapter();

            box1.dispose();

            expect(adapter.world.bodies.length).toEqual(1);
            expect(adapter.world.bodies[0]).toEqual(
                physicsTool.getBody(box2)
            );
        });

        /*!
         todo remove material and contact material?

         it("remove material and contact material", function(){
         var box2Material = adapter._getMaterial(box2);

         box1.dispose();

         expect(adapter.world.getContactMaterial(box1Material, box2Material)).not.toBeDefined();
         expect(adapter.world.getContactMaterial(box2Material, box1Material)).not.toBeDefined();
         //expect(adapter.world.contactmaterials.length).toEqual(1);
         //expect(adapter._getContactMaterials(box1Material).length).toEqual(0);
         });
         */

        describe("test dispose compound", function () {
            var box3;
            var rigidBodyBox2;

            beforeEach(function () {
                box1.removeComponent(box1.getComponent(wd.Collider));

                rigidBodyBox2 = physicsTool.createRigidBody({
                    class: wd.DynamicRigidBody
                });


                box3 = physicsTool.createBox(wd.BoxCollider, rigidBodyBox2);


                rigidBody1.children = [box3];


                box1.addChild(box3);


                director._init();
                adapter = physicsTool.getPhysicsEngineAdapter();
            });

            it("reset isRigidbodyChild tag", function () {
                expect(box3.hasTag("isRigidbodyChild")).toBeTruthy();

                box1.dispose();

                expect(box3.hasTag("isRigidbodyChild")).toBeFalsy();
            });
            it("remove body", function () {
                box1.dispose();

                expect(adapter.world.bodies.length).toEqual(1);
                expect(adapter.world.bodies[0]).toEqual(
                    physicsTool.getBody(box2)
                );
            });
        });

        describe("remove constraint", function () {
            function judge(dataList, constraintCount){
                var count = constraintCount || 1;

                box1.dispose();

                expect(adapter.world.constraints.length).toEqual(count);
                expect(dataList.getCount()).toEqual(count);


                box2.dispose();

                expect(adapter.world.constraints.length).toEqual(0);
                expect(dataList.getCount()).toEqual(0);
            }

            beforeEach(function () {

            });

            it("test remove lock constraint", function () {
                rigidBody2.lockConstraint.connectedBody = rigidBody1;
                director._init();
                adapter = physicsTool.getPhysicsEngineAdapter();

                judge(adapter._lockConstraintDataList);
            });
            it("test remove distance constraint", function () {
                rigidBody2.distanceConstraint.connectedBody = rigidBody1;
                director._init();
                adapter = physicsTool.getPhysicsEngineAdapter();

                judge(adapter._distanceConstraintDataList);
            });
            it("test remove hinge constraint", function () {
                rigidBody2.hingeConstraint.connectedBody = rigidBody1;
                rigidBody2.hingeConstraint.pivotA = wd.Vector3.create(-5, 6, 0);
                rigidBody2.hingeConstraint.axisA = wd.Vector3.create(1, 0, 0);
                rigidBody2.hingeConstraint.pivotB = wd.Vector3.create(-5, -6, 0);
                rigidBody2.hingeConstraint.axisB = wd.Vector3.create(1, 0, 0);
                director._init();
                adapter = physicsTool.getPhysicsEngineAdapter();


                judge(adapter._hingeConstraintDataList);
            });
            it("test remove point to point constraint", function () {
                var constraint1 = wd.PointToPointConstraint.create();
                constraint1.connectedBody = rigidBody1;
                constraint1.pivotA = wd.Vector3.create(-5, 6, 0);
                constraint1.pivotB = wd.Vector3.create(-5, -6, 0);


                var constraint2 = wd.PointToPointConstraint.create();
                constraint2.connectedBody = rigidBody1;
                constraint2.pivotA = wd.Vector3.create(5, 6, 0);
                constraint2.pivotB = wd.Vector3.create(5, -6, 0);

                rigidBody2.pointToPointConstraintList.addChildren([constraint1, constraint2]);

                director._init();
                adapter = physicsTool.getPhysicsEngineAdapter();


                judge(adapter._pointToPointConstraintDataList, 2);
            });
        });
    });

});
