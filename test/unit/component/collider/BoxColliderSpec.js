describe("BoxCollider", function () {
    var sandbox = null;
    var collider = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        collider = new wd.BoxCollider();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });


    describe("test aabb-aabb collision", function () {
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

        describe("test BoxGeometry-SphereGeometry", function(){
            var box1,sphere2;

            function judgeCollide() {
                expect(script1.onContact).toCalledOnce();
                expect(script2.onContact).toCalledOnce();
                expect(script1.onContact).toCalledWith(wdCb.Collection.create([sphere2]));
                expect(script2.onContact).toCalledWith(wdCb.Collection.create([box1]));
            }

            beforeEach(function () {
                box1 = colliderTool.createBox();
                sphere2 = colliderTool.createBox();

                script1 = {
                    onContact: sandbox.stub()
                };
                prepareTool.addScript(box1, script1);

                script2 = {
                    onContact: sandbox.stub()
                };
                prepareTool.addScript(sphere2, script2);


                director = wd.Director.getInstance();


                director.scene.addChild(box1);
                director.scene.addChild(sphere2);

                director.scene.addChild(testTool.createCamera());
            });

            it("test sphere geometry build aabb shape", function(){
                var geo2 = sphere2.getComponent(wd.Geometry);
                geo2.segments = 20;

                director._init();

                var collider2 = sphere2.getComponent(wd.Collider);

                var shape = collider2.boundingRegion.shape;
                expect(testTool.getValues(shape.getMin())).toEqual(
                    [
                        -5,-5,-5
                    ]
                );
                expect(testTool.getValues(shape.getMax())).toEqual(
                    [
                        5,5,5
                    ]
                );
            });
        });



        describe("test BoxGeometry-BoxGeometry", function () {
            var box1, box2;

            function judgeCollide() {
                expect(script1.onContact).toCalledOnce();
                expect(script2.onContact).toCalledOnce();
                expect(script1.onContact).toCalledWith(wdCb.Collection.create([box2]));
                expect(script2.onContact).toCalledWith(wdCb.Collection.create([box1]));
            }

            beforeEach(function () {
                box1 = colliderTool.createBox();
                box2 = colliderTool.createBox();

                script1 = {
                    onContact: sandbox.stub()
                };
                prepareTool.addScript(box1, script1);

                script2 = {
                    onContact: sandbox.stub()
                };
                prepareTool.addScript(box2, script2);


                director = wd.Director.getInstance();


                director.scene.addChild(box1);
                director.scene.addChild(box2);

                director.scene.addChild(testTool.createCamera());
            });

            it("test collision", function () {
                director._init();

                box1.transform.translate(8, 0, 0);
                box2.transform.translate(-2, 0, 0);

                director._loopBody(1);

                judgeCollide();


                box1.transform.translate(0.1, 0, 0);

                director._loopBody(1);

                judgeCollideCount(1);
            });
            it("test first translate, then do nothing. it should only set shape once", function () {
                director._init();

                var shape1 = box1.getComponent(wd.Collider).boundingRegion.shape;

                sandbox.stub(shape1, "setFromTranslationAndScale");


                box1.transform.translate(12, 0, 0);

                director._loopBody(1);


                expect(shape1.setFromTranslationAndScale).toCalledOnce();


                director._loopBody(1);

                expect(shape1.setFromTranslationAndScale).toCalledOnce();
            });
            it("test set gameObject's transform before building its bounding region", function () {
                box1.transform.translate(2, 0, 0);

                director._init();

                box1.transform.translate(6, 0, 0);
                box2.transform.translate(-2, 0, 0);

                director._loopBody(1);

                judgeCollide();


                box1.transform.translate(0.1, 0, 0);

                director._loopBody(1);

                judgeCollideCount(1);
            });
            it("test scale", function(){
                director._init();

                box1.transform.translate(15, 0, 0);
                box2.transform.scale = wd.Vector3.create(2, 0.5, 3);

                director._loopBody(1);

                judgeCollide();


                box1.transform.translate(0.1, 0, 0);

                director._loopBody(1);

                judgeCollideCount(1);
            });

            describe("user can specify the bounding box that it don't be affected by rotate.", function () {
                it("test1", function () {
                    var collider1 = box1.getComponent(wd.Collider);
                    collider1.halfExtents = wd.Vector3.create(10, 10, 10);

                    director._init();


                    box1.transform.translate(15, 0, 0);

                    director._loopBody(1);

                    judgeCollide();


                    box1.transform.translate(0.1, 0, 0);

                    director._loopBody(2);

                    judgeCollideCount(1);


                    box1.transform.rotateLocal(0, 0, 45);

                    director._loopBody(3);

                    judgeCollideCount(1);
                });
                it("test2", function () {
                    var collider1 = box1.getComponent(wd.Collider);
                    collider1.halfExtents = wd.Vector3.create(10, 10, 10);


                    director._init();


                    box1.transform.translate(2, 0, 0);

                    director._loopBody(1);


                    box1.transform.translate(-2, 0, 0);

                    director._loopBody(1);


                    box1.transform.translate(15, 0, 0);

                    director._loopBody(1);

                    judgeCollideCount(3);


                    box1.transform.translate(0.1, 0, 0);

                    director._loopBody(2);

                    judgeCollideCount(3);


                    box1.transform.rotateLocal(0, 0, 45);

                    director._loopBody(3);

                    judgeCollideCount(3);
                });
            });

            describe("re-calculate aabb when gameObject transform change", function () {
                it("if gameObject translate or scale, just transform aabb", function () {
                    director._init();

                    box1.transform.translate(0, 0, 20);
                    box2.transform.scale = wd.Vector3.create(0, 0, 2.9);

                    director._loopBody(1);

                    judgeNotCollide();


                    box2.transform.scale = wd.Vector3.create(0, 0, 3);

                    director._loopBody(2);

                    judgeCollide();
                });

                describe("re-calculate aabb when gameObject rotate", function () {
                    it("the new aabb should enclose the gameObject", function () {
                        box1.transform.rotate(0, 0, 45);


                        director._init();


                        box1.transform.rotate(0, 0, 45);
                        box2.transform.translate(10, 0, 0);


                        director._loopBody(1);


                        judgeCollide();


                        box2.transform.translate(0.1, 0, 0);

                        director._loopBody(1);

                        judgeCollideCount(1);
                    });
                });
            });

            describe("test debug box", function () {
                beforeEach(function () {

                });

                it("if not set debugCollision config, not build and update debug box", function () {
                    sandbox.stub(wd.DebugConfig, "debugCollision", false);

                    box1.transform.translate(2, 0, 0);

                    director._init();

                    //scene contains box1,box2,camera that it not contains debugBox
                    expect(director.scene.getChildren().getCount()).toEqual(3);

                    box1.transform.translate(6, 0, 0);

                    director._loopBody(1);

                    expect(director.scene.getChildren().getCount()).toEqual(3);
                });

                describe("else", function () {
                    beforeEach(function () {
                        sandbox.stub(wd.DebugConfig, "debugCollision", true);
                    });

                    it("build debugBox when init that it shows the bounding region shape", function () {
                        var collider1 = box1.getComponent(wd.Collider);
                        collider1.halfExtents = wd.Vector3.create(10, 10, 10);
                        collider1.center = wd.Vector3.create(0, 1, 1);


                        director._init();


                        var debugBox = colliderTool.findDebugObject(box1);
                        var debugGeo = debugBox.getComponent(wd.CustomGeometry);

                        expect(debugBox).toBeDefined();
                        expect(testTool.getValues(debugBox.transform.position)).toEqual([0, 1, 1]);
                        expect(testTool.getValues(debugGeo.vertices)).toEqual(
                            [
                                -10, -10, -10, -10, -10, 10, 10, -10, 10, 10, -10, -10, -10, 10, -10, -10, 10, 10, 10, 10, 10, 10, 10, -10
                            ]
                        );
                    });
                    describe("update debugBox when update that it shows the updated bounding region shape", function () {
                        it("test translate/scale and test use gl.drawElements to draw; and test that the scale is set to vertices, not set to transform", function () {
                            box1.transform.translate(2, 0, 0);
                            box1.transform.scale = wd.Vector3.create(2, 1, 1);


                            director._init();

                            box1.transform.translate(2, 0, 0);

                            director._loopBody(1);


                            var debugBox = colliderTool.findDebugObject(box1);
                            var debugGeo = debugBox.getComponent(wd.CustomGeometry);

                            expect(colliderTool.findDebugObjects(box1).getCount()).toEqual(1);
                            expect(debugBox).toBeDefined();
                            expect(testTool.getValues(debugBox.transform.position)).toEqual([4, 0, 0]);
                            expect(testTool.getValues(debugGeo.vertices)).toEqual(
                                [
                                    -10, -5, -5, -10, -5, 5, 10, -5, 5, 10, -5, -5, -10, 5, -5, -10, 5, 5, 10, 5, 5, 10, 5, -5
                                ]
                            );

                            expect(wd.DeviceManager.getInstance().gl.drawElements.callCount).toEqual(4);
                            expect(wd.DeviceManager.getInstance().gl.drawArrays).not.toCalled();
                        });
                        describe("test rotate", function () {
                            it("test1", function () {
                                box1.transform.translate(2, 0, 0);

                                director._init();

                                box1.transform.rotate(0, 0, 45);

                                director._loopBody(1);


                                var debugBox = colliderTool.findDebugObject(box1);
                                var debugGeo = debugBox.getComponent(wd.CustomGeometry);

                                expect(debugBox).toBeDefined();
                                expect(testTool.getValues(debugBox.transform.position)).toEqual([2, 0, 0]);
                                expect(testTool.getValues(debugGeo.vertices)).toEqual(
                                    [
                                        -7.0710678, -7.0710678, -5, -7.0710678, -7.0710678, 5, 7.0710678, -7.0710678, 5, 7.0710678, -7.0710678, -5, -7.0710678, 7.0710678, -5, -7.0710678, 7.0710678, 5, 7.0710678, 7.0710678, 5, 7.0710678, 7.0710678, -5
                                    ]
                                );
                            });
                            it("test2", function () {
                                box1.transform.translate(2, 0, 0);
                                var action = wd.RepeatForever.create(wd.CallFunc.create(function () {
                                    box1.transform.rotate(0, 0, 1);
                                }));
                                box1.addComponent(action);

                                director._init();


                                var debugBox = colliderTool.findDebugObject(box1);
                                var debugGeo = debugBox.getComponent(wd.CustomGeometry);


                                director._loopBody(1);


                                expect(testTool.getValues(debugGeo.buffers.getChild(wd.EBufferDataType.VERTICE).data)).toEqual(
                                    [
                                        -5.0865006, -5.0865006, -5, -5.0865006, -5.0865006, 5, 5.0865006, -5.0865006, 5, 5.0865006, -5.0865006, -5, -5.0865006, 5.0865006, -5, -5.0865006, 5.0865006, 5, 5.0865006, 5.0865006, 5, 5.0865006, 5.0865006, -5
                                    ]
                                );


                                director._loopBody(1);


                                expect(debugBox).toBeDefined();
                                expect(testTool.getValues(debugBox.transform.position)).toEqual([2, 0, 0]);
                                expect(testTool.getValues(debugGeo.buffers.getChild(wd.EBufferDataType.VERTICE).data)).toEqual(
                                    [
                                        -5.1714516, -5.1714516, -5, -5.1714516, -5.1714516, 5, 5.1714516, -5.1714516, 5, 5.1714516, -5.1714516, -5, -5.1714516, 5.1714516, -5, -5.1714516, 5.1714516, 5, 5.1714516, 5.1714516, 5, 5.1714516, 5.1714516, -5
                                    ]
                                );
                            })
                        });
                    });
                });
            });


        });
    });


    describe("isIntersectWith", function () {
        beforeEach(function () {

        });

        it("if target isn't collider, error", function () {
            expect(function () {
                collider.isIntersectWith(wd.Director.getInstance().scene);
            }).toThrow();
        });
        it("if the target is not support, warn", function () {
            //todo test

            //sandbox.stub(wd.Log, "warn");
            //
            //collider.isIntersectWith()
        });
    });

    describe("clone", function(){
        it("clone data", function(){
            sandbox.stub(collider, "buildBoundingRegion");
            collider.init();

            var center = wd.Vector3.create(1,2,3);
            var halfExtents = wd.Vector3.create(10,10,10);
            var enable = false;

            var resultBoundingRegion = {};
            sandbox.stub(collider.boundingRegion, "clone").returns(resultBoundingRegion);

            cloneTool.extend(collider, {
                center:center,
                halfExtents:halfExtents,
                enable:enable
            });

            var result = collider.clone();


            expect(result === collider).toBeFalsy();
            expect(result.center).toEqual(center);
            expect(result.halfExtents).toEqual(halfExtents);
            expect(result.enable).toBeFalsy();
            expect(result.boundingRegion).toEqual(resultBoundingRegion);
        });
    });
});
