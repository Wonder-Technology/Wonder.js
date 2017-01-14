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

    describe("integration test", function () {
        var model, anim, geo, material, program;
        var director;
        var boneAGlobalTransformMatrix4 = null;

        beforeEach(function(){
            sandbox.stub(window.performance, "now").returns(0);
        });

        describe("compute joint matrix", function () {
            beforeEach(function () {
                skinSkeletonTool.setCurrentTime(sandbox, 0);
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
                    });

                    it("send jointMatrices with identity data before play", function () {
                        skinSkeletonTool.prepareSingleSkeleton(anim);

                        director._init();

                        program = skinSkeletonTool.setProgram(sandbox, material);


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
                                            data: skinSkeletonTool.getInitTransformData().rotation
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
                            skinSkeletonTool.prepareSingleSkeleton(anim);

                            director._init();

                            program = skinSkeletonTool.setProgram(sandbox, material);


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
                                                        data: skinSkeletonTool.getInitTransformData().rotation
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
                                                        data: skinSkeletonTool.getInitTransformData().translation
                                                    },
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.ROTATION,
                                                        data: skinSkeletonTool.getInitTransformData().rotation
                                                    },
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.SCALE,
                                                        data: skinSkeletonTool.getInitTransformData().scale
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

                            program = skinSkeletonTool.setProgram(sandbox, material);


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
                                                        data: skinSkeletonTool.getInitTransformData().rotation
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
                                                        data: skinSkeletonTool.getInitTransformData().translation
                                                    },
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.ROTATION,
                                                        data: skinSkeletonTool.getInitTransformData().rotation
                                                    },
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.SCALE,
                                                        data: skinSkeletonTool.getInitTransformData().scale
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
                                                        data: skinSkeletonTool.getInitTransformData().translation
                                                    },
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.ROTATION,
                                                        data: skinSkeletonTool.getInitTransformData().rotation
                                                    },
                                                    {
                                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                        target: wd.EKeyFrameAnimationTarget.SCALE,
                                                        data: skinSkeletonTool.getInitTransformData().scale
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
                                                        data: skinSkeletonTool.getInitTransformData().rotation
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

                            program = skinSkeletonTool.setProgram(sandbox, material);


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
                                                            data: skinSkeletonTool.getInitTransformData().rotation
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

                                program = skinSkeletonTool.setProgram(sandbox, material);


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
    });
});
