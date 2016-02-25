describe("rayPicking", function () {
    var sandbox = null;
    var Vector3;

    var x, y;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();


        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));


        Vector3 = wd.Vector3;

        sandbox.stub(wd.DeviceManager.getInstance(), "view", {
            width: 200,
            height: 100
        });
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("construct the ray from the mouse coordinates", function () {
        var cameraController;

        function getNearPoint() {
            return testTool.getValues(cameraController.convertScreenToWorld(x, y, cameraController.camera.near), 1);
        }

        function getFarPoint() {
            return testTool.getValues(cameraController.convertScreenToWorld(x, y, cameraController.camera.far), 1);
        }

        beforeEach(function () {
        });

        describe("test perspective camera", function () {
            beforeEach(function () {
                camera = testTool.createCamera(Vector3.create(0, 0, 1));


                cameraController = camera.getComponent(wd.CameraController);

                cameraController.camera.near = 0.1;
                cameraController.camera.far = 100;

                camera.init();
            });

            it("test1", function () {
                x = 100;
                y = 50;

                expect(getNearPoint()).toEqual([0, 0, 0.9]);
                expect(getFarPoint()).toEqual([0, 0, -99]);
            });
            it("test2", function () {
                x = 0;
                y = 0;

                expect(getNearPoint()).toEqual([-0.1, 0.1, 0.9]);
                expect(getFarPoint()).toEqual([-57.7, 57.7, -99]);
            });
            it("test3", function () {
                camera.transform.translate(10, 10, 10);
                camera.transform.lookAt(0, 0, 0);

                x = 0;
                y = 0;

                expect(getNearPoint()).toEqual([9.9, 10, 11]);
                expect(getFarPoint()).toEqual([-110.2, 2.1, -35.4]);
            });
        });
        describe("test ortho camera", function () {
            beforeEach(function () {
                camera = testTool.createOrthoCamera(Vector3.create(0, 0, 1));


                camera.init();

                cameraController = camera.getComponent(wd.CameraController);

                cameraController.camera.near = 0.1;
                cameraController.camera.far = 100;
            });

            it("test1", function () {
                x = 100;
                y = 50;

                expect(getNearPoint()).toEqual([0, 0, 0.9]);
                expect(getFarPoint()).toEqual([0, 0, -99]);
            });
            it("test2", function () {
                x = 0;
                y = 0;

                expect(getNearPoint()).toEqual([-50, 50, 0.9]);
                expect(getFarPoint()).toEqual([-50, 50, -99]);
            });
        });
    });

    describe("ray intersect with bounding region", function () {
        beforeEach(function () {

        });

        it("test intersect with aabb", function () {
            var camera = testTool.createCamera(
                Vector3.create(0, 0, 20)
            );
            camera.init();

            var cameraController = camera.getComponent(wd.CameraController);

            cameraController.camera.near = 0.1;
            cameraController.camera.far = 100;


            var box = prepareTool.createBox(5);
            box.addComponent(wd.BoxCollider.create());


            box.transform.translate(0, 0, 0);

            box.init();



            expect(cameraController.isIntersectWithRay(box, 100, 50)).toBeTruthy();
            expect(cameraController.isIntersectWithRay(box, 50, 30)).toBeTruthy();
            expect(cameraController.isIntersectWithRay(box, 40, 30)).toBeFalsy();
            expect(cameraController.isIntersectWithRay(box, 0, 0)).toBeFalsy();
        });

        it("test intersect with sphere shape", function () {
            var camera = testTool.createCamera(
                Vector3.create(0, 0, 20)
            );
            camera.init();

            var cameraController = camera.getComponent(wd.CameraController);

            cameraController.camera.near = 0.1;
            cameraController.camera.far = 100;


            var sphere = prepareTool.createSphere(5);
            sphere.addComponent(wd.SphereCollider.create());


            sphere.transform.translate(0, 0, 0);

            sphere.init();


            //var shape = sphere.getComponent(wd.Collider).shape;


            expect(cameraController.isIntersectWithRay(sphere, 100, 50)).toBeTruthy();
            expect(cameraController.isIntersectWithRay(sphere, 60, 40)).toBeTruthy();
            expect(cameraController.isIntersectWithRay(sphere, 60, 30)).toBeFalsy();
            expect(cameraController.isIntersectWithRay(sphere, 0, 0)).toBeFalsy();
        });
    });
});

