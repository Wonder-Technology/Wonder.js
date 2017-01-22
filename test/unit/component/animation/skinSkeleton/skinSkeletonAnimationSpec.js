describe("skin skeleton animation", function () {
    var sandbox = null;
    var Matrix4 = wd.Matrix4;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clearInstance(sandbox);
    });

    describe("unit test", function () {
        beforeEach(function () {

        });

        describe("clone", function () {
            var anim;

            beforeEach(function(){
                anim = wd.SkinSkeletonAnimation.create();
            });

            it("clone jointNames", function () {
                anim.jointNames = [
                    "jointA"
                ];

                var result = anim.clone();

                expect(result.jointNames === anim.jointNames).toBeFalsy();
                expect(result.jointNames).toEqual(anim.jointNames);
            });
            it("shallow clone jointTransformData", function () {
                anim.jointTransformData = wdCb.Hash.create({
                    "animation0": wdCb.Hash.create({
                        "jointA": wdCb.Collection.create([
                            {
                                time: 0,

                                targets: wdCb.Collection.create(
                                    [
                                        {
                                            interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                            target: wd.EKeyFrameAnimationTarget.ROTATION,
                                            data: wd.Quaternion.create(0, 0, 0, 1)
                                        }
                                    ]
                                )
                            }
                        ])
                    })
                });

                var result = anim.clone();

                expect(result.jointTransformData === anim.jointTransformData).toBeFalsy();
                expect(result.jointTransformData).toEqual(anim.jointTransformData);
            });
            it("deep clone bindShapeMatrix, boneMatrixMap, inverseBindMatrices, _inverseNodeToRootMatrix", function () {
                var bindShapeMatrix = Matrix4.create().translate(10,0,1);
                anim.bindShapeMatrix = {
                    clone: sandbox.stub().returns(bindShapeMatrix)
                };

                var inverseBindMatrix1 = Matrix4.create().translate(11,0,1);
                // inverseBindMatrix2 = Matrix4.create().rotate(45, wd.Vector3.up);

                anim.inverseBindMatrices = [
                    {
                        clone: sandbox.stub().returns(inverseBindMatrix1)
                    }
                ];

                var jointABoneMatrix = wd.BoneMatrix.create(Matrix4.create().translate(1,1,1));

                anim.boneMatrixMap = wdCb.Hash.create({
                    "jointA": jointABoneMatrix
                });



                var inverseNodeToRootMatrix = Matrix4.create().translate(12,0,1);
                anim._inverseNodeToRootMatrix = {
                    clone: sandbox.stub().returns(inverseNodeToRootMatrix)
                };



                var result = anim.clone();



                expect(result.bindShapeMatrix === bindShapeMatrix).toBeTruthy();
                expect(result.inverseBindMatrices[0] === inverseBindMatrix1).toBeTruthy();

                expect(result._inverseNodeToRootMatrix === inverseNodeToRootMatrix).toBeTruthy();

                expect(result.boneMatrixMap.getChild("jointA") === jointABoneMatrix).toBeFalsy();
                expect(result.boneMatrixMap.getChild("jointA")).toEqual(jointABoneMatrix);
            });

            describe("test clone parent", function(){
                it("reference to old parent", function () {
                    var bindShapeMatrix = Matrix4.create().translate(10,0,1);
                    anim.bindShapeMatrix = {
                        clone: sandbox.stub().returns(bindShapeMatrix)
                    };

                    var inverseBindMatrix1 = Matrix4.create().translate(11,0,1),
                        inverseBindMatrix2 = Matrix4.create().rotate(45, wd.Vector3.up);

                    anim.inverseBindMatrices = [
                        {
                            clone: sandbox.stub().returns(inverseBindMatrix1)
                        },
                        {
                            clone: sandbox.stub().returns(inverseBindMatrix2)
                        }
                    ];

                    var jointABoneMatrix = wd.BoneMatrix.create(Matrix4.create().translate(1,1,1));
                    var jointBBoneMatrix = wd.BoneMatrix.create(Matrix4.create().translate(2,2,2));
                    jointBBoneMatrix.parent = jointABoneMatrix;

                    anim.boneMatrixMap = wdCb.Hash.create({
                        "jointA": jointABoneMatrix,
                        "jointB": jointBBoneMatrix
                    });



                    var result = anim.clone();



                    expect(result.bindShapeMatrix === bindShapeMatrix).toBeTruthy();
                    expect(result.inverseBindMatrices[0] === inverseBindMatrix1).toBeTruthy();
                    expect(result.inverseBindMatrices[1] === inverseBindMatrix2).toBeTruthy();


                    var newJointA = result.boneMatrixMap.getChild("jointA");
                    expect(newJointA === jointABoneMatrix).toBeFalsy();

                    expect(newJointA.localMatrix).toEqual(jointABoneMatrix.localMatrix);
                    expect(newJointA.globalMatrix).toEqual(jointABoneMatrix.globalMatrix);
                    /*!
                     because newJointB.parent === jointABoneMatrix(not newJointA)
                     */
                    expect(newJointA._children).not.toEqual(jointABoneMatrix._children);




                    var newJointB = result.boneMatrixMap.getChild("jointB");
                    expect(newJointB === jointBBoneMatrix).toBeFalsy();

                    expect(newJointB.localMatrix).toEqual(jointBBoneMatrix.localMatrix);
                    expect(newJointB.globalMatrix).toEqual(jointBBoneMatrix.globalMatrix);
                    expect(newJointB._children).toEqual(jointBBoneMatrix._children);
                    expect(newJointB.parent === jointABoneMatrix).toBeTruthy();
                });
            });
        });

        describe("dispose", function(){
            beforeEach(function(){
            });

            it("unbind AFTER_SCENEGRAPH_BUILD event", function(){
                var anim = wd.SkinSkeletonAnimation.create();

                anim.entityObject = wd.GameObject.create();
                anim.entityObject.transform.translate(1,0,0);

                wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.AFTER_SCENEGRAPH_BUILD));

                var mat = anim._inverseNodeToRootMatrix.clone();



                anim.dispose();


                anim.entityObject.transform.translate(10,0,0);

                wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.AFTER_SCENEGRAPH_BUILD));

                expect(anim._inverseNodeToRootMatrix).toEqual(mat);
            });
        });
    });

    describe("integration test", function () {
        var model, anim, geo, material, program;
        var director;
        var boneAGlobalTransformMatrix4 = null;

        function prepareAnim(){
            model = wd.GameObject.create();

            if(!!wd.SkinSkeletonAnimation){
                anim = wd.SkinSkeletonAnimation.create();

                model.addComponent(anim);
            }

            geo = wd.ModelGeometry.create();

            geo.vertices = [
                1, 10, -1,
                2, 1.5, 3,
                5, 5, 9
            ];
            geo.faces = skinSkeletonTool.createFaces([0, 2, 1]);


            material = wd.BasicMaterial.create();


            prepareTool.prepareGeo(sandbox, model, geo, material);


            director = wd.Director.getInstance();


            geo.jointIndices = [
                1, 0, 0, 0,
                1, 2, 0, 0,
                2, 1, 0, 0
            ];
            geo.jointWeights = [
                1, 0, 0, 0,
                0.5, 0.5, 0, 0,
                0.2, 0.8, 0, 0
            ];

            model.transform.translate(-1, 0, 0);


            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.AFTER_SCENEGRAPH_BUILD));
        }

        beforeEach(function(){
            sandbox.stub(window.performance, "now").returns(0);
        });

        it("if SkinSkeletonAnimation class not exist, not send skin data", function () {
            var SkinSkeletonAnimation = wd.SkinSkeletonAnimation;
            delete wd.SkinSkeletonAnimation;

            model = wd.GameObject.create();

            geo = geometryTool.createGeometryWithFakeGeometryData();

            material = geo.material;


            prepareTool.prepareGeo(sandbox, model, geo, material);


            director = wd.Director.getInstance();


            geo.jointIndices = [
                1, 0, 0, 0,
                1, 2, 0, 0,
                2, 1, 0, 0
            ];
            geo.jointWeights = [
                1, 0, 0, 0,
                0.5, 0.5, 0, 0,
                0.2, 0.8, 0, 0
            ];

            director._init();

            program = skinSkeletonTool.setProgram(sandbox, material);



            director._loopBody(0);



            expect(program.sendUniformData.withArgs("u_jointMatrices")).not.toCalled();

            wd.SkinSkeletonAnimation = SkinSkeletonAnimation;
        });

        describe("test animation control", function(){
            var firstKeyTime,secondKeyTime;

            beforeEach(function(){
                firstKeyTime = 10;
                secondKeyTime = 15;

                model = wd.GameObject.create();

                anim = wd.TransformArticulatedAnimation.create();

                model.addComponent(anim);


                skinSkeletonTool.setCurrentTime(sandbox, 0);









                anim.data = wdCb.Hash.create({
                    "play": wdCb.Collection.create([
                        {
                            time:0,


                            targets: wdCb.Collection.create(
                                [
                                    {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EKeyFrameAnimationTarget.TRANSLATION, data: skinSkeletonTool.getInitTransformData().translation}
                                ]
                            )
                        },
                        {
                            time:firstKeyTime,


                            targets: wdCb.Collection.create(
                                [
                                    {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EKeyFrameAnimationTarget.TRANSLATION, data: wd.Vector3.create(2,1,0)}
                                ]
                            )
                        },
                        {
                            time:secondKeyTime,

                            targets: wdCb.Collection.create(
                                [
                                    {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EKeyFrameAnimationTarget.TRANSLATION, data: wd.Vector3.create(3,1,0)}
                                ]
                            )
                        }
                    ])
                });
                model.init();
            });

            describe("playOneTime", function() {
                function judge(jointMatrices, jointMatrices_endAnimation) {
                    director._loopBody(0);


                    director._loopBody(5);



                    var args = program.sendUniformData.withArgs("u_jointMatrices").getCall(1).args;
                    expect(args[1]).toEqual(wd.EVariableType.FLOAT_MAT4_ARRAY);
                    expect(testTool.getValues(
                        args[2],
                        2
                    )).toEqual(
                        jointMatrices
                    );


                    director._loopBody(11);


                    expect(anim.isStop).toBeTruthy();


                    var args = program.sendUniformData.withArgs("u_jointMatrices").getCall(2).args;
                    expect(args[1]).toEqual(wd.EVariableType.FLOAT_MAT4_ARRAY);
                    expect(testTool.getValues(
                        args[2],
                        2
                    )).toEqual(
                        jointMatrices
                    );




                    director._loopBody(17);

                    expect(anim.isStop).toBeTruthy();

                    var args = program.sendUniformData.withArgs("u_jointMatrices").getCall(3).args;
                    expect(args[1]).toEqual(wd.EVariableType.FLOAT_MAT4_ARRAY);
                    expect(testTool.getValues(
                        args[2],
                        2
                    )).toEqual(
                        jointMatrices
                    );
                }

                beforeEach(function(){
                    prepareAnim();
                    skinSkeletonTool.prepareSingleSkeleton(anim);
                });

                it("stop and not update joint matrix to the first frame data when all joints is finished in one animation", function () {
                    director._init();

                    program = skinSkeletonTool.setProgram(sandbox, material);

                    anim.playOneTime(0);



                    var jointMatrices = [0.98, 0.17, -0.09, 0, -0.17, 0.99, 0.04, 0, 0.1, -0.02, 1, 0, 9.99, 22.79, 29.73, 1 ]
                    var jointMatrices_firstFrameData = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 11, 22, 30, 1 ];
                    judge(jointMatrices, jointMatrices_firstFrameData);
                });
                it("if some joints is not played, stop when other joints is finished in one animation", function () {
                    testTool.closeContractCheck();
                    anim.jointNames.push("jointB");
                    anim.inverseBindMatrices.push(
                        Matrix4.create().translate(10, 0, 0)
                    );
                    anim.boneMatrixMap.addChild("jointB", wd.BoneMatrix.create(Matrix4.create()));

                    director._init();

                    program = skinSkeletonTool.setProgram(sandbox, material);

                    anim.playOneTime(0);

                    var jointMatrices = [0.98, 0.17, -0.09, 0, -0.17, 0.99, 0.04, 0, 0.1, -0.02, 1, 0, 9.99, 22.79, 29.73, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 21, 20, 30, 1]
                    var jointMatrices_firstFrameData = null;
                    judge(jointMatrices, jointMatrices_firstFrameData);
                });
            });
        });

        describe("fix bug", function(){
            function prepareForSimpleCompute() {
                prepareAnim();

                anim._inverseNodeToRootMatrix = Matrix4.create();


                var bindShapeMatrix = Matrix4.create();


                anim.bindShapeMatrix = bindShapeMatrix;


                anim.inverseBindMatrices = [
                    Matrix4.create()
                ];


                var mat = Matrix4.create();



                boneAGlobalTransformMatrix4 = wd.BoneMatrix.create(mat);


                anim.boneMatrixMap = wdCb.Hash.create({
                    "jointA": boneAGlobalTransformMatrix4
                });


                anim.jointNames = [
                    "jointA"
                ];


                anim.jointTransformData = wdCb.Hash.create({
                    "animation0": wdCb.Hash.create({
                        "jointA": wdCb.Collection.create([
                            {
                                time: 10,

                                targets: wdCb.Collection.create(
                                    [
                                        {
                                            interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                            target: wd.EKeyFrameAnimationTarget.TRANSLATION,
                                            data: wd.Vector3.create(5,0,0)
                                        }
                                    ]
                                )
                            },
                            {
                                time: 20,

                                targets: wdCb.Collection.create(
                                    [
                                        {
                                            interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                            target: wd.EKeyFrameAnimationTarget.TRANSLATION,
                                            data: wd.Vector3.create(10,0,0)
                                        }
                                    ]
                                )
                            }
                        ])
                    })
                });
            }

            function judgeJointMatrices(callIndex, positionX) {
                var args = program.sendUniformData.withArgs("u_jointMatrices").getCall(callIndex).args;

                var targetJointMatrices = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 3, 0, 0, 1 ];
                targetJointMatrices[12] = positionX;



                expect(args[1]).toEqual(wd.EVariableType.FLOAT_MAT4_ARRAY);
                expect(testTool.getValues(
                    args[2],
                    2
                )).toEqual(
                    targetJointMatrices
                );
            }

            beforeEach(function(){
            });

            it("should play the second time correctly after the stop of animation when play one time firstly", function () {
                prepareForSimpleCompute()

                director._init();

                program = skinSkeletonTool.setProgram(sandbox, material);

                anim.playOneTime(0);


                director._loopBody(0);


                var jointMatrices = [0.98, 0.17, -0.09, 0, -0.17, 0.99, 0.04, 0, 0.1, -0.02, 1, 0, 9.99, 22.79, 29.73, 1 ]
                var jointMatrices_firstFrameData = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ];


                director._loopBody(5);



                judgeJointMatrices(1, 2.5)


                director._loopBody(11);





                judgeJointMatrices(2, 5.5)



                anim.playOneTime(0);



                director._loopBody(12);


                judgeJointMatrices(3, 0)
            });
            it("if model2 addChild(model1), and model2 is transformed between model1->skin animation component->bindPreComputeEvent and init, the model1's uMatrix should be affected by model2 after init", function () {
                testTool.closeContractCheck();
                model = wd.GameObject.create();
                model.transform.translate(1,0,0);

                anim = wd.SkinSkeletonAnimation.create();
                anim.jointNames = [];
                model.addComponent(anim);

                wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.AFTER_SCENEGRAPH_BUILD));


                var model2 = wd.GameObject.create();

                var pos = wd.Vector3.create(10,10,0);
                model2.transform.position = pos;

                model2.addChild(model);


                model2.init();

                expect(model.transform.position).toEqual(wd.Vector3.create(11,10,0));
            });
            it("if joint animation data->first frame->time > 0, joint animation data should add bone matrix data as the first frame data and set the time of it to be 0", function () {
                prepareForSimpleCompute();


                director._init();

                program = skinSkeletonTool.setProgram(sandbox, material);

                anim.play(0);


                director._loopBody(3);
                director._loopBody(9);

                judgeJointMatrices(1, (9 - 3) / 10 * 5);



                director._loopBody(12);
                director._loopBody(15);

                judgeJointMatrices(3, 5 + (15 - 13) / 10 * (10 - 5));
            });
            it("the time of the second loop should equal to the first and the later loop", function () {
                prepareForSimpleCompute();


                director._init();

                program = skinSkeletonTool.setProgram(sandbox, material);

                anim.play(0);


                //one animation loop's time === 20


                // begin first loop(the begin elapsed time === 3)

                director._loopBody(3);

                director._loopBody(23);

                judgeJointMatrices(1, 10);



                director._loopBody(24);

                judgeJointMatrices(2, 0);


                //begin second loop(the begin elapsed time === 24)


                director._loopBody(40);

                judgeJointMatrices(3, 8);


                director._loopBody(41);
                director._loopBody(44);
                judgeJointMatrices(5, 10);
            });
        });
    });
});
