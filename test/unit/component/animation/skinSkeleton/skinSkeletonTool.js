var skinSkeletonTool = (function () {
    var Matrix4 = wd.Matrix4;

    return {
        setProgram: function (sandbox, material) {
            var program = material.shader.program;

            sandbox.stub(program, "sendUniformData");
            sandbox.stub(program, "sendAttributeBuffer");

            return program;
        },
        createFaces:function (indices, normals) {
            return wd.GeometryUtils.convertToFaces(indices, normals);
        },
        setCurrentTime: function (sandbox, time) {
            sandbox.stub(wd.Director.getInstance()._timeController, "elapsed", time);
        },
        getInitTransformData: function () {
            return {
                translation: wd.Vector3.create(0, 0, 0),
                rotation: wd.Quaternion.create(0, 0, 0, 1),
                scale: wd.Vector3.create(1, 1, 1)
            }
        },
        prepareSingleSkeleton: function (anim) {
            var bindShapeMatrix = Matrix4.create();
            bindShapeMatrix.translate(10, 20, 30);


            anim.bindShapeMatrix = bindShapeMatrix;


            anim.inverseBindMatrices = [
                Matrix4.create().translate(0, 2, 0)
            ];


            var mat = Matrix4.create();

            mat.rotate(45, wd.Vector3.up);


            var boneAGlobalTransformMatrix4 = wd.BoneMatrix.create(mat);


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
                                        data: this.getInitTransformData().rotation
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
    }
})();
