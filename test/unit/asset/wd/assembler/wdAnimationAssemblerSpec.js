describe("wd animation assembler", function () {
    var sandbox = null;
    var builder = null;
    var parseData = null;
    var Collection = wdCb.Collection;
    var Vector2 = wd.Vector2;
    var Vector3 = wd.Vector3;
    var Matrix4 = wd.Matrix4;

    function getComponent(data, _class){
        return wdAssemblerTool.getComponent(data, _class);
    }

    function hasComponent(data, className){
        return wdAssemblerTool.hasComponent(data, className);
    }

    function setComponent(animData){
        wdAssemblerTool.setComponent(parseData, animData);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        builder = new wd.WDAssembler();

        parseData = {
        };
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("build", function(){
        beforeEach(function(){

        });

        describe("build model", function(){

            beforeEach(function(){

            });

            describe("add components", function(){
                beforeEach(function(){

                });

                describe("add morph data", function(){
                    var morphVertices,
                        morphNormals;

                    beforeEach(function(){
                        morphVertices = wdCb.Hash.create(
                            {
                                "frame0":wdCb.Collection.create([
                                    1,2,3,
                                    4,5,6,
                                    4,2,1
                                ])
                            }
                        );
                        morphNormals = wdCb.Hash.create(
                            {
                                "frame0":wdCb.Collection.create([
                                    0.1,5,5,
                                    10,8,10,
                                    11,0,2
                                ])
                            }
                        );
                        setComponent({
                            morphVertices:morphVertices,
                            morphNormals:morphNormals,

                            material:{
                                type:"LightMaterial"
                            }
                        })
                    });

                    it("add morph data to ModelGeometry", function () {
                        var data = builder.build(parseData);


                        var component = getComponent(data, wd.Geometry);
                        expect(component.morphVertices).toEqual(morphVertices);
                        expect(component.morphNormals).toEqual(morphNormals);
                    });

                    describe("test MorphAnimation", function(){
                        beforeEach(function(){
                        });

                        it("add component", function () {
                            var data = builder.build(parseData);


                            var component = getComponent(data, wd.MorphAnimation);
                            expect(component).toBeExist();
                        });
                        it("if class not exist, not add it", function () {
                            var MorphAnimation = wd.MorphAnimation;
                            delete wd.MorphAnimation;

                            var data = builder.build(parseData);


                            expect(hasComponent(data, "MorphAnimation")).toBeFalsy();


                            wd.MorphAnimation = MorphAnimation;
                        });
                    });
                });

                describe("add skin skeleton geometry data", function(){
                    var jointIndices,
                        jointWeights;

                    beforeEach(function(){
                        jointIndices = [
    0,0,0,1,
                            1,0,1,1
                                ];
                        jointWeights = [
                                    0,0,0,1,
                            0.25,0.25,0.4,0.1
                        ];

                        setComponent({
                            jointIndices:jointIndices,
                            jointWeights:jointWeights,

                            material:{
                                type:"LightMaterial"
                            }
                        })
                    });

                    it("add jointIndices,jointWeights to ModelGeometry", function () {
                        var data = builder.build(parseData);


                        var component = getComponent(data, wd.Geometry);
                        expect(component.jointIndices).toEqual(jointIndices);
                        expect(component.jointWeights).toEqual(jointWeights);
                    });
                });

                describe("add animation component", function(){
                    describe("test TransformArticulatedAnimation", function(){
                        var animData;

                        function prepare() {
                            animData = {
                                "animation_0": wdCb.Collection.create([
                                    {
                                        time: 1000,
                                        interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                        targets: wdCb.Collection.create([
                                            {
                                                target: wd.EKeyFrameAnimationTarget.TRANSLATION,
                                                data: wd.Vector3.create(1, 1, 0)
                                            }
                                        ])
                                    }
                                ])
                            };
                            setComponent(animData);
                        }

                        beforeEach(function(){
                            prepare();
                        });

                        it("add component", function(){
                            var data = builder.build(parseData);


                            var component = getComponent(data, wd.TransformArticulatedAnimation);
                            expect(component.data).toBeInstanceOf(wdCb.Hash);
                            expect(component.data.getChildren()).toEqual(animData);
                        });
                        it("if class not exist, not add it", function () {
                            var TransformArticulatedAnimation = wd.TransformArticulatedAnimation;
                            delete wd.TransformArticulatedAnimation;

                            var data = builder.build(parseData);


                            expect(hasComponent(data, "TransformArticulatedAnimation")).toBeFalsy();

                            wd.TransformArticulatedAnimation = TransformArticulatedAnimation;
                        });
                    });

                    describe("test SkinSkeletonAnimation", function(){
                        var skinSkeletonComponent;

                        beforeEach(function(){
                            var skeRootBoneMatrix = wd.BoneMatrix.create(Matrix4.create().scale(2,1,3));
                            var ske1BoneMatrix = wd.BoneMatrix.create(Matrix4.create().scale(0.5,1,1));

                            ske1BoneMatrix.parent = skeRootBoneMatrix;

                            skinSkeletonComponent = {
                                bindShapeMatrix:Matrix4.create().rotate(45, Vector3.forward),
                                jointNames:[
                                    "ske_root",
                                    "ske_1"
                                ],
                                inverseBindMatrices: [
                                    Matrix4.create().translate(10,0,0),
                                    Matrix4.create().rotate(20, Vector3.forward)

                                ],
                                boneMatrixMap:wdCb.Hash.create({
                                    "ske_root": skeRootBoneMatrix,
                                    "ske_1": ske1BoneMatrix
                                }),
                                jointTransformData: wdCb.Hash.create({
                                    "animation0": wdCb.Hash.create({
                                        "ske_root": wdCb.Collection.create([
                                            {
                                                time: 0,

                                                targets: wdCb.Collection.create(
                                                    [
                                                        {
                                                            interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                            target: wd.EKeyFrameAnimationTarget.ROTATION,
                                                            data: wd.Quaternion.create().setFromEulerAngles(wd.Vector3.create(0,0,0))
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
                                        "ske_1": wdCb.Collection.create([
                                            {
                                                time: 0,

                                                targets: wdCb.Collection.create(
                                                    [
                                                        {
                                                            interpolationMethod: wd.EKeyFrameInterpolation.LINEAR,
                                                            target: wd.EKeyFrameAnimationTarget.TRANSLATION,
                                                            data: wd.Vector3.create(0, 0, 0)
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
                                                        }
                                                    ]
                                                )
                                            }
                                        ])
                                    })

                                })
                            }
                        });

                        describe("add component", function(){
                            it("test component", function () {
                                setComponent(skinSkeletonComponent);


                                var data = builder.build(parseData);


                                var component = getComponent(data, wd.SkinSkeletonAnimation);
                                expect(component).toBeExist();
                                expect(component.bindShapeMatrix).toEqual(skinSkeletonComponent.bindShapeMatrix);
                                expect(component.inverseBindMatrices).toEqual(skinSkeletonComponent.inverseBindMatrices);
                                expect(component.boneMatrixMap).toEqual(skinSkeletonComponent.boneMatrixMap);
                                expect(component.jointNames).toEqual(skinSkeletonComponent.jointNames);
                                expect(component.jointTransformData).toEqual(skinSkeletonComponent.jointTransformData);
                            });
                            it("inverseNodeToRootMatrix shouldn't be affected by the anim->entityObject's transform change after scene graph has been builded", function () {
                                var matrix = Matrix4.create().translate(1, 2, 3);
                                var componentData = Collection.create([
                                    skinSkeletonComponent,
                                    {
                                        matrix: matrix
                                    }
                                ])
                                setComponent(componentData);


                                var data = builder.build(parseData);




                                var model = wdAssemblerTool.getSingleModel(data);

                                model.transform.translate(10,200,1);

                                model.init();

                                var component = getComponent(data, wd.SkinSkeletonAnimation);
                                expect(component).toBeExist();
                                expect(component._inverseNodeToRootMatrix).toEqual(matrix.clone().invert());
                            });
                        });

                        it("if class not exist, not add it", function () {
                            var SkinSkeletonAnimation = wd.SkinSkeletonAnimation;
                            delete wd.SkinSkeletonAnimation;

                                setComponent(skinSkeletonComponent);


                                var data = builder.build(parseData);


                            expect(hasComponent(data, "SkinSkeletonAnimation")).toBeFalsy();

                            wd.SkinSkeletonAnimation = SkinSkeletonAnimation;
                        });
                    });
                });
            });
        });
    });
});

