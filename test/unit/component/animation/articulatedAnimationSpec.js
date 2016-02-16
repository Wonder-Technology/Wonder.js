describe("articulated animation", function () {
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("integration test", function(){
        var model,anim;

        function judgePos(pos){
            expect(testTool.getValues(
                model.transform.localPosition,
                2
            )).toEqual(
                testTool.getValues(
                    pos,
                    2
                )
            )
        }

        function judgeScale(scale){
            expect(testTool.getValues(
                model.transform.localScale,
                2
            )).toEqual(
                scale
            )
        }

        function judgeRotation(eulerAngles){
            expect(testTool.getValues(
                model.transform.localEulerAngles,
                1
            )).toEqual(
                eulerAngles
            )
        }

        function setCurrentTime(time){
            sandbox.stub(wd.Director.getInstance()._timeController, "elapsed", time);
        }

        beforeEach(function(){
        });

        describe("update position/scale/rotation in each key(should set transform->local TRS instead of global TRS, because the transform in .gltf is in local coordinate system)", function(){
            var firstKeyTime,secondKeyTime;

            beforeEach(function(){
                firstKeyTime = 10;
                secondKeyTime = 15;

                model = wd.GameObject.create();

                anim = wd.ArticulatedAnimation.create();

                model.addComponent(anim);


                setCurrentTime(0);
            });

            it("if not play animation, update nothing", function(){
                anim.data = wdCb.Hash.create({
                    "play": wdCb.Collection.create([
                        {
                            time:10,
                            interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,

                            targets: wdCb.Collection.create(
                                [
                                    {target:wd.EArticulatedAnimationTarget.TRANSLATION, data: wd.Vector3.create(3,1,0)},
                                    {target:wd.EArticulatedAnimationTarget.SCALE, data: wd.Vector3.create(1,2,4)}
                                ]
                            )
                        }
                    ])
                });
                model.init();


                model.update(1);


                judgePos([0,0,0]);
            });

            describe("test special cases", function(){
                beforeEach(function(){
                });

                it("test time === 0", function () {
                    anim.data = wdCb.Hash.create({
                        "play": wdCb.Collection.create([
                            {
                                time:0,

                                targets: wdCb.Collection.create(
                                    [
                                        {
                                            interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,
                                            target:wd.EArticulatedAnimationTarget.TRANSLATION,
                                            data: wd.Vector3.create(3,1,0)
                                        },
                                        {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EArticulatedAnimationTarget.SCALE, data: wd.Vector3.create(1,2,4)}
                                    ]
                                )
                            }
                        ])
                    });
                    anim.play("play");
                    model.init();


                    model.update(0);


                    judgePos([3,1,0]);
                });

                describe("test when one loop pass more than 1 frames(this may occur when fps is too low so that each loop's time is big)", function () {
                    beforeEach(function(){
                        anim.data = wdCb.Hash.create({
                            "play": wdCb.Collection.create([
                                {
                                    time:10,

                                    targets: wdCb.Collection.create(
                                        [
                                            {
                                                interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,
                                                target:wd.EArticulatedAnimationTarget.TRANSLATION,
                                                data: wd.Vector3.create(2,1,0)
                                            }
                                        ]
                                    )
                                },
                                {
                                    time:20,

                                    targets: wdCb.Collection.create(
                                        [
                                            {
                                                interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,
                                                target:wd.EArticulatedAnimationTarget.TRANSLATION,
                                                data: wd.Vector3.create(3,1,0)
                                            }
                                        ]
                                    )
                                },
                                {
                                    time:30,

                                    targets: wdCb.Collection.create(
                                        [
                                            {
                                                interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,
                                                target:wd.EArticulatedAnimationTarget.TRANSLATION,
                                                data: wd.Vector3.create(4,1,0)
                                            }
                                        ]
                                    )
                                }

                            ])
                        });
                        anim.play("play");
                        model.init();
                    });

                    it("test not finish all keys", function () {
                        model.update(1);
                        model.update(21);


                        judgePos([3.1,1,0]);
                    });
                    it("test finish all keys", function () {
                        model.update(11);
                        model.update(31);


                        judgePos([3.8,1,0]);
                    });
                    it("test2 finish all keys", function () {
                        model.update(31);


                        judgePos([3.8,1,0]);
                    });
                });
            });

            describe("test normal cases", function(){
                beforeEach(function(){
                    anim.data = wdCb.Hash.create({
                        "play": wdCb.Collection.create([
                            {
                                time:firstKeyTime,

                                targets: wdCb.Collection.create(
                                    [
                                        {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EArticulatedAnimationTarget.TRANSLATION, data: wd.Vector3.create(2,1,0)},
                                        {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EArticulatedAnimationTarget.ROTATION, data: wd.Quaternion.create().setFromEulerAngles(wd.Vector3.create(10,20,30))},
                                        {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EArticulatedAnimationTarget.SCALE, data: wd.Vector3.create(1,2,3)}
                                    ]
                                )
                            },

                            {
                                time:secondKeyTime,

                                targets: wdCb.Collection.create(
                                    [
                                        {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EArticulatedAnimationTarget.TRANSLATION, data: wd.Vector3.create(3,1,0)},
                                        {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EArticulatedAnimationTarget.ROTATION, data: wd.Quaternion.create().setFromEulerAngles(wd.Vector3.create(10,20,40))},
                                        {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EArticulatedAnimationTarget.SCALE, data: wd.Vector3.create(1,2,4)}
                                    ]
                                )

                            }
                        ])
                    })



                    anim.play("play");

                    //model.init();

                    var parentModel = wd.GameObject.create();
                    parentModel.transform.position = wd.Vector3.create(1,1,1);
                    parentModel.transform.rotate(2,2,2);
                    parentModel.transform.scale = wd.Vector3.create(3,3,3);

                    parentModel.addChild(model);
                    //model.transform.parent = parentModel.transform.parent;

                    parentModel.init();
                });

                describe("test interpolation", function(){
                    it("test1", function () {
                        model.update(firstKeyTime/10);

                        judgePos([0.2,0.1,0]);
                        judgeScale([1, 1.1, 1.2]);
                        judgeRotation([0.5, 2.2, 2.8]);
                    });
                    it("test2", function () {
                        model.update(firstKeyTime/10);
                        model.update(firstKeyTime/5);

                        judgePos([0.4,0.2,0]);
                        judgeScale([1, 1.2, 1.4]);
                        judgeRotation([1.1, 4.4, 5.6]);
                    });
                });

                describe("test finish first key", function () {
                    it("test1", function(){
                        model.update(firstKeyTime);

                        judgePos([2,1,0]);
                        judgeScale([1,2,3]);
                        judgeRotation([10,20,30]);
                    });
                    it("test2", function(){
                        model.update(firstKeyTime * 0.9);
                        model.update(firstKeyTime + 1);

                        judgePos([2.2,1,0]);
                        judgeScale([1,2,3.2]);
                        judgeRotation([10,20,32]);
                    });
                    it("test3", function(){
                        model.update(firstKeyTime + 1);

                        judgePos([2.2,1,0]);
                        judgeScale([1,2,3.2]);
                        judgeRotation([10,20,32]);
                    });
                });

                it("test begin second key", function () {
                    model.update(firstKeyTime);
                    model.update(firstKeyTime + 1);

                    judgePos([2.2,1,0]);
                    judgeScale([1,2,3.2]);
                    judgeRotation([10,20,32]);
                });
                it("test finish second key", function () {
                    model.update(firstKeyTime);
                    model.update(secondKeyTime);

                    judgePos([3,1,0]);
                    judgeScale([1,2,4]);
                    judgeRotation([10,20,40]);
                });

                describe("test finish all keys", function(){
                    beforeEach(function(){
                        model.update(firstKeyTime + 1);
                    });


                    it("test first key", function () {
                        model.update(secondKeyTime + 2);

                        judgePos([2.8,1,0]);
                        judgeScale([1,2,3.8]);
                        judgeRotation([10,20,38]);
                    });
                    it("test second key", function () {
                        model.update(secondKeyTime + 1);
                        model.update(secondKeyTime + firstKeyTime + 1);

                        judgePos([2.2,1,0]);
                        judgeScale([1,2,3.2]);
                        judgeRotation([10,20,32]);
                    });
                    it("test finish all key twice", function () {
                        model.update(secondKeyTime + 1);
                        model.update(secondKeyTime + firstKeyTime + 1);

                        model.update(secondKeyTime + secondKeyTime + 1);

                        judgePos([2.9,1,0]);
                        judgeScale([1,2,3.9]);
                        judgeRotation([10,20,39]);
                    });
                });
            });
        });

        describe("test animation control", function(){
            var firstKeyTime,secondKeyTime;

            beforeEach(function(){
                firstKeyTime = 10;
                secondKeyTime = 15;

                model = wd.GameObject.create();

                anim = wd.ArticulatedAnimation.create();

                model.addComponent(anim);


                setCurrentTime(0);









                anim.data = wdCb.Hash.create({
                    "play": wdCb.Collection.create([
                        {
                            time:firstKeyTime,


                            targets: wdCb.Collection.create(
                                [
                                    {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EArticulatedAnimationTarget.TRANSLATION, data: wd.Vector3.create(2,1,0)}
                                ]
                            )
                        },
                        {
                            time:secondKeyTime,

                            targets: wdCb.Collection.create(
                                [
                                    {interpolationMethod:wd.EKeyFrameInterpolation.LINEAR,target:wd.EArticulatedAnimationTarget.TRANSLATION, data: wd.Vector3.create(3,1,0)}
                                ]
                            )
                        }
                    ])
                });
                model.init();
            });

            it("play,stop", function(){
                anim.play("play");

                model.update(1);

                judgePos([0.2, 0.1, 0]);

                anim.stop();





                model.update(2);

                judgePos([0.2, 0.1, 0]);

                setCurrentTime(2);

                anim.play("play");






                model.update(4);

                judgePos(
                    wd.Vector3.create().lerp(
                        wd.Vector3.create(0.2,0.1,0),
                        wd.Vector3.create(2,1,0),
                        (4 - 2) / 10
                    ).toArray()
                );
            });

            describe("pause,resume", function(){
                beforeEach(function(){
                    anim.play("play");

                    model.update(1);

                    judgePos([0.2, 0.1, 0]);

                    setCurrentTime(1);

                    anim.pause();




                    model.update(2);

                    judgePos([0.2, 0.1, 0]);

                    setCurrentTime(2);

                    anim.resume();
                });

                it("test in first key", function () {
                    model.update(4);

                    judgePos(
                        wd.Vector3.create().lerp(
                            wd.Vector3.create(0,0,0),
                            wd.Vector3.create(2,1,0),
                            (4 - (2 - 1)) / 10
                        ).toArray()
                    );
                });
                it("test switch to second key", function () {
                    model.update(firstKeyTime + 2);

                    judgePos(
                        [2.2, 1, 0]
                    );
                });
                it("test finish all keys", function () {
                    model.update(firstKeyTime + 2);
                    model.update(secondKeyTime + 2);

                    judgePos(
                        [2.9, 1, 0]
                    );
                });
            });
        });
    });
});
