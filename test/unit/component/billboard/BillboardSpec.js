describe("Billboard", function () {
    var sandbox = null;
    var billboard;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        testTool.openContractCheck(sandbox);


        billboard = wd.Billboard.create();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });
    describe("clone", function () {
        beforeEach(function () {
        });

        it("clone mode", function () {
            var mode = wd.EBillboardMode.Y;

            cloneTool.extend(billboard, {
                mode:mode
            });

            var result = billboard.clone();

            expect(result.mode).toEqual(mode);
        });
    });

    describe("update", function(){
        var camera;
        var gameObject;

        beforeEach(function(){
            camera = wd.GameObject.create();

            gameObject = wd.GameObject.create();
            billboard.entityObject = gameObject;
        });

        it("if mode === NONE, return", function(){
            sandbox.stub(wd.Director.getInstance(), "scene", {
                currentCamera:camera
            });
            billboard.mode = wd.EBillboardMode.NONE;

            sandbox.stub(billboard, "_rotateByYAxis");

            billboard.update(1);

            expect(billboard._rotateByYAxis).not.toCalled();
        });
        it("if scene->camera not exist, return", function(){
            sandbox.stub(wd.Director.getInstance(), "scene", {
                currentCamera:null
            });
            billboard.mode = wd.EBillboardMode.ALL;

            sandbox.stub(billboard, "_rotateByYAxis");

            billboard.update(1);

            expect(billboard._rotateByYAxis).not.toCalled();
        });

        describe("else", function(){
            beforeEach(function(){
                sandbox.stub(wd.Director.getInstance(), "scene", {
                    currentCamera:camera
                });
            });

            describe("if mode === Y, rotate by yAxis", function(){
                beforeEach(function(){
                    billboard.mode = wd.EBillboardMode.Y;
                });

                it("if lookAt and objToCamProj vectors are too close together, not rotate", function(){
                    camera.transform.position = wd.Vector3.create(0, 0, 2);
                    gameObject.transform.position = wd.Vector3.create(0, 0, 0);

                    billboard.update(1);

                    expect(testTool.getValues(gameObject.transform.rotation)).toEqual([
                        0,0,0,1
                    ]);
                });
                describe("else, rotate by y axis", function () {
                    it("test gameObject is at zero point", function () {
                        camera.transform.position = wd.Vector3.create(2, 2, 0);
                        gameObject.transform.position = wd.Vector3.create(0, 0, 0);

                        billboard.update(1);

                        expect(testTool.getValues(gameObject.transform.eulerAngles)).toEqual( [
                            0, 90, 0
                        ]);
                    });
                    it("test gameObject is not at zero point", function () {
                        camera.transform.position = wd.Vector3.create(2, 1, 2);
                        gameObject.transform.position = wd.Vector3.create(1, 1, 1);

                        billboard.update(1);

                        expect(testTool.getValues(gameObject.transform.eulerAngles, 1)).toEqual( [
                            0, 45, 0
                        ]);
                    });
                    it("the rotation in each frame should be equal", function () {
                        camera.transform.position = wd.Vector3.create(2, 1, 2);
                        gameObject.transform.position = wd.Vector3.create(1, 1, 1);

                        billboard.update(1);
                        billboard.update(2);

                        expect(testTool.getValues(gameObject.transform.eulerAngles, 1)).toEqual( [
                            0, 45, 0
                        ]);
                    });
                });
            });

            describe("if mode === ALL, rotate by yAxis and then rotate by local xAxis", function(){
                beforeEach(function(){
                    billboard.mode = wd.EBillboardMode.ALL;
                });

                it("if not rotate by  yAxis, not rotate by local xAxis", function() {
                    camera.transform.position = wd.Vector3.create(0, 0, 2);
                    gameObject.transform.position = wd.Vector3.create(0, 0, 0);
                    sandbox.stub(billboard, "_rotateLocalByXAxis");

                    billboard.update(1);

                    expect(billboard._rotateLocalByXAxis).not.toCalled();
                });

                describe("else, rotate", function () {
                    it("test gameObject is at zero point", function () {
                        camera.transform.position = wd.Vector3.create(2, 2, 0);
                        gameObject.transform.position = wd.Vector3.create(0, 0, 0);

                        billboard.update(1);

                        expect(testTool.getValues(gameObject.transform.eulerAngles)).toEqual( [
                            -45, 90, 0
                        ]);
                    });
                    it("test gameObject is not at zero point", function () {
                        camera.transform.position = wd.Vector3.create(2, 2, 2);
                        gameObject.transform.position = wd.Vector3.create(1, 1, 1);

                        billboard.update(1);

                        expect(testTool.getValues(gameObject.transform.eulerAngles, 1)).toEqual( [
                            -35.3, 45, 0
                        ]);
                    });
                    it("the rotation in each frame should be equal", function () {
                        camera.transform.position = wd.Vector3.create(2, 2, 2);
                        gameObject.transform.position = wd.Vector3.create(1, 1, 1);

                        billboard.update(1);
                        billboard.update(2);

                        expect(testTool.getValues(gameObject.transform.eulerAngles, 1)).toEqual( [
                            -35.3, 45, 0
                        ]);
                    });
                });
            });
        });
    });

    describe("the transform computed by billboard should be the final transform which is used by renderer", function(){
        var director;
        var camera;

        function createRectGameObject(){
            var gameObject = wd.GameObject.create();

            gameObject.addComponent(billboard);
            gameObject.addComponent(wd.MeshRenderer.create());

            var geo = wd.RectGeometry.create();

            var material = wd.BasicMaterial.create();

            geo.material = material;

            gameObject.addComponent(geo);

            return gameObject;
        }

        beforeEach(function(){
            director = wd.Director.getInstance();

            camera = testTool.createCamera();
            director.scene.addChild(camera);

            director.scene.addChild(createRectGameObject());
        });

        it("update after camera update", function(){
            sandbox.stub(camera, "update");
            billboard.mode = wd.EBillboardMode.Y;
            sandbox.stub(billboard, "update");
            director._init();

            director._loopBody(1);

            expect(billboard.update).toCalledAfter(camera.update);
        });
    });
});
