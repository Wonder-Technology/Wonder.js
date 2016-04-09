describe("SphereCollider", function () {
    var sandbox = null;
    var collider = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        collider = new wd.SphereCollider();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("test sphere-sphere collision", function () {
        var director;
        var script1, script2;

        function judgeNotCollide() {
            expect(script1.onContact).not.toCalled();
            expect(script2.onContact).not.toCalled();
        }

        function judgeCollideCount(num) {
            expect(script1.onContact.callCount).toEqual(num);
            expect(script2.onContact.callCount).toEqual(num);
        }

        describe("test SphereGeometry-SphereGeometry", function () {
            var sphere1, sphere2;

            function judgeCollide() {
                expect(script1.onContact).toCalledOnce();
                expect(script2.onContact).toCalledOnce();
                expect(script1.onContact).toCalledWith(wdCb.Collection.create([sphere2]));
                expect(script2.onContact).toCalledWith(wdCb.Collection.create([sphere1]));
            }

            beforeEach(function () {
                sphere1 = colliderTool.createSphere();
                sphere2 = colliderTool.createSphere();

                script1 = {
                    onContact: sandbox.stub()
                };
                prepareTool.addScript(sphere1, script1);

                script2 = {
                    onContact: sandbox.stub()
                };
                prepareTool.addScript(sphere2, script2);


                director = wd.Director.getInstance();


                director.scene.addChild(sphere1);
                director.scene.addChild(sphere2);

                director.scene.addChild(testTool.createCamera());
            });

            it("test collision", function () {
                director._init();

                sphere1.transform.translate(8, 0, 0);
                sphere2.transform.translate(-2, 0, 0);

                director._loopBody(1);

                judgeCollide();


                sphere1.transform.translate(0.1, 0, 0);

                director._loopBody(1);

                judgeCollideCount(1);
            });
            it("test first translate, then do nothing. it should only set shape once", function () {
                director._init();

                var shape1 = sphere1.getComponent(wd.Collider).boundingRegion.shape;

                sandbox.stub(shape1, "setFromTranslationAndScale");


                sphere1.transform.translate(12, 0, 0);

                director._loopBody(1);


                expect(shape1.setFromTranslationAndScale).toCalledOnce();


                director._loopBody(1);

                expect(shape1.setFromTranslationAndScale).toCalledOnce();
            });
            it("test set gameObject's transform before building its bounding region", function () {
                sphere1.transform.translate(2, 0, 0);

                director._init();

                sphere1.transform.translate(6, 0, 0);
                sphere2.transform.translate(-2, 0, 0);

                director._loopBody(1);

                judgeCollide();


                sphere1.transform.translate(0.1, 0, 0);

                director._loopBody(1);

                judgeCollideCount(1);
            });
            it("test scale:sphere shape.radius *= max(scale)", function () {
                director._init();

                sphere1.transform.translate(15, 0, 0);
                sphere2.transform.scale = wd.Vector3.create(1.5, 0.5, 2);

                director._loopBody(1);

                judgeCollide();


                sphere1.transform.translate(0.1, 0, 0);

                director._loopBody(1);

                judgeCollideCount(1);
            });

            describe("user can specify the bounding sphere that it don't be affected by rotate.", function () {
                it("test1", function () {
                    var collider1 = sphere1.getComponent(wd.Collider);
                    collider1.radius = 10;

                    director._init();


                    sphere1.transform.translate(15, 0, 0);

                    director._loopBody(1);

                    judgeCollide();


                    sphere1.transform.translate(0.1, 0, 0);

                    director._loopBody(2);

                    judgeCollideCount(1);


                    sphere1.transform.rotateLocal(0, 0, 45);

                    director._loopBody(3);

                    judgeCollideCount(1);
                });
                it("test2", function () {
                    var collider1 = sphere1.getComponent(wd.Collider);
                    collider1.radius = 10;


                    director._init();


                    sphere1.transform.translate(2, 0, 0);

                    director._loopBody(1);


                    sphere1.transform.translate(-2, 0, 0);

                    director._loopBody(1);


                    sphere1.transform.translate(15, 0, 0);

                    director._loopBody(1);

                    judgeCollideCount(3);


                    sphere1.transform.translate(0.1, 0, 0);

                    director._loopBody(2);

                    judgeCollideCount(3);


                    sphere1.transform.rotateLocal(0, 0, 45);

                    director._loopBody(3);

                    judgeCollideCount(3);
                });
            });

            describe("re-calculate aabb when gameObject transform change", function () {
                it("if gameObject translate or scale, just transform aabb", function () {
                    director._init();

                    sphere1.transform.translate(0, 0, 20);
                    sphere2.transform.scale = wd.Vector3.create(0, 0, 2.9);

                    director._loopBody(1);

                    judgeNotCollide();


                    sphere2.transform.scale = wd.Vector3.create(0, 0, 3);

                    director._loopBody(2);

                    judgeCollide();
                });

                it("if gameObject rotate, do nothing", function () {
                    director._init();


                    sphere2.transform.translate(10, 0, 0);


                    director._loopBody(1);


                    judgeCollide();


                    sphere1.transform.rotate(0, 0, 45);
                    sphere2.transform.translate(0.1, 0, 0);

                    director._loopBody(1);

                    judgeCollideCount(1);
                });
            });

            describe("test debug sphere", function () {
                beforeEach(function () {

                });

                it("if not set debugCollision config, not build and update debug sphere", function () {
                    sandbox.stub(wd.DebugConfig, "debugCollision", false);

                    sphere1.transform.translate(2, 0, 0);

                    director._init();

                    //scene contains sphere1,sphere2,camera that it not contains debugSphere
                    expect(director.scene.getChildren().getCount()).toEqual(3);

                    sphere1.transform.translate(6, 0, 0);

                    director._loopBody(1);

                    expect(director.scene.getChildren().getCount()).toEqual(3);
                });

                describe("else", function () {
                    function computeRadius(vertices) {
                        return mathTestUtils.toFixed(wd.SphereShape.create()._findMaxDistanceOfPointsToCenter(vertices), 2);
                    }

                    beforeEach(function () {
                        sandbox.stub(wd.DebugConfig, "debugCollision", true);
                    });

                    it("build debugSphere when init that it shows the bounding region shape", function () {
                        var collider1 = sphere1.getComponent(wd.Collider);
                        collider1.radius = 10;
                        collider1.center = wd.Vector3.create(0, 1, 1);


                        director._init();


                        var debugSphere = colliderTool.findDebugObject(sphere1);
                        var debugGeo = debugSphere.getComponent(wd.CustomGeometry);

                        expect(debugSphere).toBeDefined();
                        expect(testTool.getValues(debugSphere.transform.position)).toEqual([0, 1, 1]);
                        expect(computeRadius(debugGeo.vertices)).toEqual(
                            10
                        );
                    });

                    describe("update debugSphere when update that it shows the updated bounding region shape", function () {
                        it("test translate/scale and test use gl.drawArrays to draw; and test that the scale is set to transform, not set to vertices", function () {
                            sphere1.transform.translate(2, 0, 0);
                            sphere1.transform.scale = wd.Vector3.create(2, 1, 1);


                            director._init();

                            sphere1.transform.translate(2, 0, 0);

                            director._loopBody(1);


                            var debugSphere = colliderTool.findDebugObject(sphere1);
                            var debugGeo = debugSphere.getComponent(wd.CustomGeometry);

                            expect(debugSphere).toBeDefined();
                            expect(testTool.getValues(debugSphere.transform.position)).toEqual([4, 0, 0]);

                            expect(testTool.getValues(debugSphere.transform.scale)).toEqual([2, 2, 2]);
                            expect(computeRadius(debugGeo.vertices)).toEqual(
                                5
                            );


                            var gl = wd.DeviceManager.getInstance().gl;
                            expect(gl.drawArrays.firstCall).toCalledWith(gl.LINES, 0, 240);
                            expect(gl.drawArrays.secondCall).toCalledWith(gl.LINES, 0, 240);
                        });

                        it("rotate will do nothing", function () {
                            sphere1.transform.translate(2, 0, 0);

                            director._init();

                            sphere1.transform.rotate(0, 0, 45);

                            director._loopBody(1);


                            var debugSphere = colliderTool.findDebugObject(sphere1);
                            var debugGeo = debugSphere.getComponent(wd.CustomGeometry);

                            expect(debugSphere).toBeDefined();
                            expect(testTool.getValues(debugSphere.transform.position)).toEqual([2, 0, 0]);
                            expect(computeRadius(debugGeo.vertices)).toEqual(
                                5
                            );
                        });
                    });
                });
            });
        });
    });
});
