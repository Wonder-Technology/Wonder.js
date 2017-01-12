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

        //todo refactor:remove duplicate
        function setCurrentTime(time) {
            sandbox.stub(wd.Director.getInstance()._timeController, "elapsed", time);
        }

        function getInitTransformData() {
            return {
                translation: wd.Vector3.create(0, 0, 0),
                rotation: wd.Quaternion.create(0, 0, 0, 1),
                scale: wd.Vector3.create(1, 1, 1)
            }
        }

        function createFaces(indices, normals) {
            return wd.GeometryUtils.convertToFaces(indices, normals);
        }

        function setProgram(material) {
            program = material.shader.program;
            sandbox.stub(program, "sendUniformData");
            sandbox.stub(program, "sendAttributeBuffer");
        }

        function prepareAnim(){
            model = wd.GameObject.create();

            anim = wd.SkinSkeletonAnimation.create();

            model.addComponent(anim);

            geo = wd.ModelGeometry.create();

            geo.vertices = [
                1, 10, -1,
                2, 1.5, 3,
                5, 5, 9
            ];
            geo.faces = createFaces([0, 2, 1]);


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

        function prepareSingleSkeleton() {
            var bindShapeMatrix = Matrix4.create();
            bindShapeMatrix.translate(10, 20, 30);


            anim.bindShapeMatrix = bindShapeMatrix;


            anim.inverseBindMatrices = [
                Matrix4.create().translate(0, 2, 0)
            ];


            var mat = Matrix4.create();

            mat.rotate(45, wd.Vector3.up);


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
                            time: 0,

                            targets: wdCb.Collection.create(
                                [
                                    {
                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                        target: wd.EKeyFrameAnimationTarget.ROTATION,
                                        data: getInitTransformData().rotation
                                    }
                                ]
                            )
                        },
                        {
                            time: 10,

                            targets: wdCb.Collection.create(
                                [
                                    {
                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                        target: wd.EKeyFrameAnimationTarget.ROTATION,
                                        data: wd.Quaternion.create().setFromEulerAngles(wd.Vector3.create(5, 10, 20))
                                    }
                                ]
                            )
                        }
                    ])
                })
            });
        }

        beforeEach(function(){
            sandbox.stub(window.performance, "now").returns(0);
        });


        describe("compute joint matrix", function () {
            beforeEach(function () {
                setCurrentTime(0);
            });

            describe("send joint matrix in each loop", function () {
                describe("[joint-matrix] = [node-to-root^-1][joint-to-root][inverse-bind][bind-shape];" +
                    "node->jointToRootMatrix4 = node->jointLocalMatrix4 * node->parent->jointLocalMatrix4(jointLocalMatrix4 is computed by animation data)", function () {
                    beforeEach(function () {
                        model = wd.GameObject.create();

                        anim = wd.SkinSkeletonAnimation.create();

                        model.addComponent(anim);

                        geo = wd.ModelGeometry.create();

                        geo.vertices = [
                            1, 10, -1,
                            2, 1.5, 3,
                            5, 5, 9
                        ];
                        geo.faces = createFaces([0, 2, 1]);


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
                    });

                    it("send jointMatrices with identity data before play", function () {
                        prepareSingleSkeleton();

                        director._init();

                        setProgram(material);


                        // anim.play(0);

                        director._loopBody(1);


                        var args = program.sendUniformData.withArgs("u_jointMatrices").getCall(0).args;
                        expect(args[1]).toEqual(wd.EVariableType.FLOAT_MAT4_ARRAY);
                        expect(testTool.getValues(
                            args[2],
                            0
                        )).toEqual(
                            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ]
                        );
                    });

                    it("if joint of jointNames aren't all used in jointTransformData, warn", function () {
                        sandbox.stub(wd.Log, "warn");

                        anim.jointNames = [
                            "jointB",
                            "jointA",
                            "jointC"
                        ];


                        var jointData = wdCb.Collection.create([
                            {
                                time: 0,

                                targets: wdCb.Collection.create(
                                    [
                                        {
                                            interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                            target: wd.EKeyFrameAnimationTarget.ROTATION,
                                            data: getInitTransformData().rotation
                                        }
                                    ]
                                )
                            }
                        ]);

                        anim.jointTransformData = wdCb.Hash.create({
                            "animation0": wdCb.Hash.create({
                                "jointA": jointData
                            }),
                            "animation1": wdCb.Hash.create({
                                "jointB": jointData,
                                "jointC": jointData
                            })
                        });


                        anim.init();

                        expect(wd.Log.warn).not.toCalled();




                        anim.jointTransformData = wdCb.Hash.create({
                            "animation0": wdCb.Hash.create({
                                "jointA": jointData
                            }),
                            "animation1": wdCb.Hash.create({
                                "jointC": jointData
                            })
                        });

                        anim.init();

                        expect(wd.Log.warn).toCalledOnce();
                    });

                    describe("test single skeleton", function () {
                        beforeEach(function () {
                        });

                        it("test animation join data only contain rotation data and contain translation,rotation,scale data", function () {
                            prepareSingleSkeleton();

                            director._init();

                            setProgram(material);


                            anim.play(0);

                            director._loopBody(1);

                            expect(testTool.getValues(
                                program.sendAttributeBuffer.withArgs("a_position").getCall(0).args[2].data
                            )).toEqual(
                                geo.vertices
                            );

                            expect(testTool.getValues(
                                program.sendAttributeBuffer.withArgs("a_jointIndice").getCall(0).args[2].data
                            )).toEqual(
                                geo.jointIndices
                            );
                            expect(testTool.getValues(
                                program.sendAttributeBuffer.withArgs("a_jointWeight").getCall(0).args[2].data
                            )).toEqual(
                                geo.jointWeights
                            );




                            var args = program.sendUniformData.withArgs("u_jointMatrices").getCall(0).args;
                            expect(args[1]).toEqual(wd.EVariableType.FLOAT_MAT4_ARRAY);
                            expect(testTool.getValues(
                                args[2],
                                0
                            )).toEqual(
                                [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 11, 22, 30, 1 ]
                            );
                        });
                    });

                    describe("test hierarchy skeletons with one root skeleton", function () {
                        var boneAGlobalTransformMatrix4 = null,
                            boneBGlobalTransformMatrix4 = null;

                        beforeEach(function(){
                            var bindShapeMatrix = Matrix4.create();
                            bindShapeMatrix.translate(10, 20, 30);


                            anim.bindShapeMatrix = bindShapeMatrix;


                            anim.inverseBindMatrices = [
                                Matrix4.create().translate(0, 2, 0),
                                Matrix4.create().translate(0, 0, 3)
                            ];



                            var mat = Matrix4.create();

                            mat.rotate(45, wd.Vector3.up);


                            boneAGlobalTransformMatrix4 = wd.BoneMatrix.create(mat);


                            mat = Matrix4.create();

                            mat.scale(2, 1, 3);


                            boneBGlobalTransformMatrix4 = wd.BoneMatrix.create(mat);


                            boneAGlobalTransformMatrix4.parent = boneBGlobalTransformMatrix4;


                            anim.boneMatrixMap = wdCb.Hash.create({
                                "jointA": boneAGlobalTransformMatrix4,
                                "jointB": boneBGlobalTransformMatrix4
                            });


                            anim.jointNames = [
                                "jointB",
                                "jointA"
                            ];


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
                                                        data: getInitTransformData().rotation
                                                    }
                                                ]
                                            )
                                        },
                                        {
                                            time: 10,

                                            targets: wdCb.Collection.create(
                                                [
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.ROTATION,
                                                        data: wd.Quaternion.create().setFromEulerAngles(wd.Vector3.create(5, 10, 20))
                                                    }
                                                ]
                                            )
                                        }
                                    ]),
                                    "jointB": wdCb.Collection.create([
                                        {
                                            time: 0,

                                            targets: wdCb.Collection.create(
                                                [
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.TRANSLATION,
                                                        data: getInitTransformData().translation
                                                    },
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.ROTATION,
                                                        data: getInitTransformData().rotation
                                                    },
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.SCALE,
                                                        data: getInitTransformData().scale
                                                    }
                                                ]
                                            )
                                        },
                                        {
                                            time: 10,

                                            targets: wdCb.Collection.create(
                                                [
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.TRANSLATION,
                                                        data: wd.Vector3.create(5, 2, 1)
                                                    },
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.ROTATION,
                                                        data: wd.Quaternion.create().setFromEulerAngles(wd.Vector3.create(10, 20, 30))
                                                    },
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.SCALE,
                                                        data: wd.Vector3.create(1, 2, 3)
                                                    }
                                                ]
                                            )
                                        }
                                    ])
                                })

                            });
                        });

                        it("test", function () {
                            director._init();

                            setProgram(material);


                            anim.play(0);

                            director._loopBody(0);
                            director._loopBody(1);

                            expect(testTool.getValues(
                                program.sendAttributeBuffer.withArgs("a_jointIndice").getCall(1).args[2].data
                            )).toEqual(
                                geo.jointIndices
                            );
                            expect(testTool.getValues(
                                program.sendAttributeBuffer.withArgs("a_jointWeight").getCall(0).args[2].data
                            )).toEqual(
                                geo.jointWeights
                            );


                            var args = program.sendUniformData.withArgs("u_jointMatrices").getCall(0).args;
                            expect(args[1]).toEqual(wd.EVariableType.FLOAT_MAT4_ARRAY);
                            expect(testTool.getValues(
                                args[2],
                                0
                            )).toEqual(
                                [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 12, 25, 36, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 12, 23, 39, 1 ]
                            );
                        });
                    });

                    it("if joint animation data->first frame->time > 0, contract error", function () {
                        testTool.openContractCheck(sandbox);

                        var bindShapeMatrix = Matrix4.create();
                        bindShapeMatrix.translate(10, 20, 30);


                        anim.bindShapeMatrix = bindShapeMatrix;


                        anim.inverseBindMatrices = [
                            Matrix4.create().translate(0, 2, 0)
                        ];


                        var boneAGlobalTransformMatrix4 = null;

                        var mat = Matrix4.create();

                        mat.rotate(45, wd.Vector3.up);


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
                                        time: 5,

                                        targets: wdCb.Collection.create(
                                            [
                                                {
                                                    interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                    target: wd.EKeyFrameAnimationTarget.ROTATION,
                                                    data: wd.Quaternion.create().setFromEulerAngles(wd.Vector3.create(2.5, 5, 10))
                                                }
                                            ]
                                        )
                                    },
                                    {
                                        time: 10,

                                        targets: wdCb.Collection.create(
                                            [
                                                {
                                                    interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                    target: wd.EKeyFrameAnimationTarget.ROTATION,
                                                    data: wd.Quaternion.create().setFromEulerAngles(wd.Vector3.create(5, 10, 20))
                                                }
                                            ]
                                        )
                                    }
                                ])
                            })

                        });

                        director._init();

                        setProgram(material);


                        expect(function(){
                            anim.play(0);
                        }).toThrow("first animation data->time should === 0");
                    });

                    describe("test play different animation", function(){
                        var boneAGlobalTransformMatrix4 = null,
                            boneBGlobalTransformMatrix4 = null;

                        beforeEach(function(){
                            var bindShapeMatrix = Matrix4.create();
                            bindShapeMatrix.translate(10, 20, 30);


                            anim.bindShapeMatrix = bindShapeMatrix;


                            anim.inverseBindMatrices = [
                                Matrix4.create().translate(0, 2, 0),
                                Matrix4.create().translate(0, 0, 3)
                            ];



                            var mat = Matrix4.create();

                            mat.rotate(45, wd.Vector3.up);


                            boneAGlobalTransformMatrix4 = wd.BoneMatrix.create(mat);


                            mat = Matrix4.create();

                            mat.scale(2, 1, 3);


                            boneBGlobalTransformMatrix4 = wd.BoneMatrix.create(mat);


                            boneAGlobalTransformMatrix4.parent = boneBGlobalTransformMatrix4;


                            anim.boneMatrixMap = wdCb.Hash.create({
                                "jointA": boneAGlobalTransformMatrix4,
                                "jointB": boneBGlobalTransformMatrix4
                            });


                            anim.jointNames = [
                                "jointB",
                                "jointA"
                            ];


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
                                                        data: getInitTransformData().rotation
                                                    }
                                                ]
                                            )
                                        },
                                        {
                                            time: 10,

                                            targets: wdCb.Collection.create(
                                                [
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.ROTATION,
                                                        data: wd.Quaternion.create().setFromEulerAngles(wd.Vector3.create(5, 10, 20))
                                                    }
                                                ]
                                            )
                                        }
                                    ]),
                                    "jointB": wdCb.Collection.create([
                                        {
                                            time: 0,

                                            targets: wdCb.Collection.create(
                                                [
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.TRANSLATION,
                                                        data: getInitTransformData().translation
                                                    },
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.ROTATION,
                                                        data: getInitTransformData().rotation
                                                    },
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.SCALE,
                                                        data: getInitTransformData().scale
                                                    }
                                                ]
                                            )
                                        },
                                        {
                                            time: 10,

                                            targets: wdCb.Collection.create(
                                                [
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.TRANSLATION,
                                                        data: wd.Vector3.create(5, 2, 1)
                                                    },
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.ROTATION,
                                                        data: wd.Quaternion.create().setFromEulerAngles(wd.Vector3.create(10, 20, 30))
                                                    },
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.SCALE,
                                                        data: wd.Vector3.create(1, 2, 3)
                                                    }
                                                ]
                                            )
                                        }
                                    ])
                                }),

                                "animation1": wdCb.Hash.create({
                                    "jointA": wdCb.Collection.create([
                                        {
                                            time: 0,

                                            targets: wdCb.Collection.create(
                                                [
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.TRANSLATION,
                                                        data: getInitTransformData().translation
                                                    },
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.ROTATION,
                                                        data: getInitTransformData().rotation
                                                    },
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.SCALE,
                                                        data: getInitTransformData().scale
                                                    }
                                                ]
                                            )
                                        },
                                        {
                                            time: 10,

                                            targets: wdCb.Collection.create(
                                                [
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.TRANSLATION,
                                                        data: wd.Vector3.create(5, 2, 1)
                                                    },
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.ROTATION,
                                                        data: wd.Quaternion.create().setFromEulerAngles(wd.Vector3.create(10, 20, 30))
                                                    },
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.SCALE,
                                                        data: wd.Vector3.create(1, 2, 3)
                                                    }
                                                ]
                                            )
                                        }
                                    ]),
                                    "jointB": wdCb.Collection.create([
                                        {
                                            time: 0,

                                            targets: wdCb.Collection.create(
                                                [
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.ROTATION,
                                                        data: getInitTransformData().rotation
                                                    }
                                                ]
                                            )
                                        },
                                        {
                                            time: 10,

                                            targets: wdCb.Collection.create(
                                                [
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.ROTATION,
                                                        data: wd.Quaternion.create().setFromEulerAngles(wd.Vector3.create(5, 10, 20))
                                                    }
                                                ]
                                            )
                                        }
                                    ])
                                })
                            });
                        });

                        it("when play other animation, should switch to it and play from the first frame", function () {
                            director._init();

                            setProgram(material);


                            anim.play(0);

                            director._loopBody(0);
                            director._loopBody(1);

                            expect(testTool.getValues(
                                program.sendAttributeBuffer.withArgs("a_jointIndice").getCall(1).args[2].data
                            )).toEqual(
                                geo.jointIndices
                            );
                            expect(testTool.getValues(
                                program.sendAttributeBuffer.withArgs("a_jointWeight").getCall(1).args[2].data
                            )).toEqual(
                                geo.jointWeights
                            );


                            var args = program.sendUniformData.withArgs("u_jointMatrices").getCall(1).args;
                            expect(args[1]).toEqual(wd.EVariableType.FLOAT_MAT4_ARRAY);
                            expect(testTool.getValues(
                                args[2],
                                0
                            )).toEqual(
                                [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 12, 25, 36, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 12, 23, 39, 1 ]
                            );





                            anim.play(1);

                            director._loopBody(2);
                            director._loopBody(3);


                            expect(testTool.getValues(
                                program.sendAttributeBuffer.withArgs("a_jointIndice").getCall(3).args[2].data
                            )).toEqual(
                                geo.jointIndices
                            );
                            expect(testTool.getValues(
                                program.sendAttributeBuffer.withArgs("a_jointWeight").getCall(3).args[2].data
                            )).toEqual(
                                geo.jointWeights
                            );


                            var args = program.sendUniformData.withArgs("u_jointMatrices").getCall(3).args;
                            expect(args[1]).toEqual(wd.EVariableType.FLOAT_MAT4_ARRAY);
                            expect(testTool.getValues(
                                args[2],
                                0
                            )).toEqual(
                                [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 11, 22, 30, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 12, 23, 39, 1]
                            );
                        });
                    });

                    describe("test glsl", function () {
                        beforeEach(function () {
                        });

                        describe("test vs glsl", function () {
                            var source;

                            function prepare() {
                                var bindShapeMatrix = Matrix4.create();
                                bindShapeMatrix.translate(10, 20, 30);


                                anim.bindShapeMatrix = bindShapeMatrix;


                                anim.inverseBindMatrices = [
                                    Matrix4.create().translate(0, 2, 0)
                                ];


                                var boneAGlobalTransformMatrix4 = null;

                                var mat = Matrix4.create();

                                mat.rotate(45, wd.Vector3.up);


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
                                                time: 0,

                                                targets: wdCb.Collection.create(
                                                    [
                                                        {
                                                            interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                            target: wd.EKeyFrameAnimationTarget.ROTATION,
                                                            data: getInitTransformData().rotation
                                                        }
                                                    ]
                                                )
                                            },
                                            {
                                                time: 10,

                                                targets: wdCb.Collection.create(
                                                    [
                                                        {
                                                            interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                            target: wd.EKeyFrameAnimationTarget.ROTATION,
                                                            data: wd.Quaternion.create().setFromEulerAngles(wd.Vector3.create(5, 10, 20))
                                                        }
                                                    ]
                                                )
                                            }
                                        ])
                                    })

                                });

                                director._init();

                                setProgram(material);


                                anim.play(0);

                                director._loopBody(1);
                            }

                            beforeEach(function () {
                                prepare();

                                source = material.shader.vsSource;
                            });

                            describe("compute one vertex's skin matrix", function () {
                                it("send MAX_JOINTS", function () {
                                    expect(source).toContain("#define MAX_JOINT_COUNT 1\n");
                                });
                                it("send a_jointIndice, a_jointWeight attr", function () {
                                    expect(source).toContain("attribute vec4 a_jointIndice;");
                                    expect(source).toContain("attribute vec4 a_jointWeight;")
                                });
                                it("send u_jointMatrices[MAX_JOINT_COUNT] uniform", function () {
                                    expect(source).toContain("uniform mat4 u_jointMatrices[MAX_JOINT_COUNT]")
                                });
                                it("vertex blend by affected joints' weight * itsJointMatrix", function () {
                                    expect(source).toContain("attribute vec3 a_position;");

                                    expect(source).toContain("return getJointMatrix(a_jointIndice.x) * a_jointWeight.x + getJointMatrix(a_jointIndice.y) * a_jointWeight.y + getJointMatrix(a_jointIndice.z) * a_jointWeight.z + getJointMatrix(a_jointIndice.w) * a_jointWeight.w;");
                                    expect(source).toContain("vec3 a_position = vec3(getVertexBlendedJointMatrix() * vec4(a_position, 1.0));");
                                });
                            });
                        });
                    });
                });
            });

            //todo test play

        });

        describe("test animation control", function(){
            var firstKeyTime,secondKeyTime;

            beforeEach(function(){
                firstKeyTime = 10;
                secondKeyTime = 15;

                model = wd.GameObject.create();

                anim = wd.TransformArticulatedAnimation.create();

                model.addComponent(anim);


                setCurrentTime(0);









                anim.data = wdCb.Hash.create({
                    "play": wdCb.Collection.create([
                        {
                            time:0,


                            targets: wdCb.Collection.create(
                                [
                                    {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EKeyFrameAnimationTarget.TRANSLATION, data: getInitTransformData().translation}
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



                    var args = program.sendUniformData.withArgs("u_jointMatrices").getCall(2).args;
                    expect(args[1]).toEqual(wd.EVariableType.FLOAT_MAT4_ARRAY);
                    expect(testTool.getValues(
                        args[2],
                        2
                    )).toEqual(
                        jointMatrices
                    );




                    director._loopBody(17);


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
                    prepareSingleSkeleton();
                });

                it("stop and not update joint matrix to the first frame data when all joints is finished in one animation", function () {
                    director._init();

                    setProgram(material);

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

                    setProgram(material);

                    anim.playOneTime(0);

                    var jointMatrices = [0.98, 0.17, -0.09, 0, -0.17, 0.99, 0.04, 0, 0.1, -0.02, 1, 0, 9.99, 22.79, 29.73, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 21, 20, 30, 1]
                    var jointMatrices_firstFrameData = null;
                    judge(jointMatrices, jointMatrices_firstFrameData);
                });
            });
        });
        
        describe("fix bug", function(){
            beforeEach(function(){
            });

            it("should play the second time correctly after the stop of animation when play one time firstly", function () {
                prepareAnim();
                prepareSingleSkeleton();

                director._init();

                setProgram(material);

                anim.playOneTime(0);


                director._loopBody(0);


                var jointMatrices = [0.98, 0.17, -0.09, 0, -0.17, 0.99, 0.04, 0, 0.1, -0.02, 1, 0, 9.99, 22.79, 29.73, 1 ]
                var jointMatrices_firstFrameData = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 11, 22, 30, 1 ];


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



                var args = program.sendUniformData.withArgs("u_jointMatrices").getCall(2).args;
                expect(args[1]).toEqual(wd.EVariableType.FLOAT_MAT4_ARRAY);
                expect(testTool.getValues(
                    args[2],
                    2
                )).toEqual(
                    jointMatrices
                );





                anim.playOneTime(0);



                director._loopBody(12);


                var args = program.sendUniformData.withArgs("u_jointMatrices").getCall(3).args;
                expect(args[1]).toEqual(wd.EVariableType.FLOAT_MAT4_ARRAY);
                expect(testTool.getValues(
                    args[2],
                    2
                )).toEqual(
                    jointMatrices_firstFrameData
                );
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
        });
    });
});
