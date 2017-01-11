describe("animation", function () {
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clearInstance(sandbox);
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

        function getInitTransformData() {
            return {
                translation:wd.Vector3.create(0,0,0),
                rotation:wd.Quaternion.create(0,0,0,1),
                scale:wd.Vector3.create(1,1,1)
            }
        }


        beforeEach(function(){
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

            it("play,stop", function(){
                anim.play("play");

                wd.AnimationComponentContainer.getInstance().update(1);

                judgePos([0.2, 0.1, 0]);

                anim.stop();





                wd.AnimationComponentContainer.getInstance().update(2);

                judgePos([0.2, 0.1, 0]);

                setCurrentTime(2);

                anim.play("play");






                wd.AnimationComponentContainer.getInstance().update(4);

                judgePos(
                    wd.Vector3.create().lerp(
                        wd.Vector3.create(0,0,0),
                        wd.Vector3.create(2,1,0),
                        (4 - 2) / 10
                    ).toArray()
                );
            });

            describe("pause,resume", function(){
                beforeEach(function(){
                    anim.play("play");

                    wd.AnimationComponentContainer.getInstance().update(1);

                    judgePos([0.2, 0.1, 0]);

                    setCurrentTime(1);

                    anim.pause();




                    wd.AnimationComponentContainer.getInstance().update(2);

                    judgePos([0.2, 0.1, 0]);

                    setCurrentTime(2);

                    anim.resume();
                });

                it("test in first key", function () {
                    wd.AnimationComponentContainer.getInstance().update(4);

                    judgePos(
                        wd.Vector3.create().lerp(
                            wd.Vector3.create(0,0,0),
                            wd.Vector3.create(2,1,0),
                            (4 - (2 - 1)) / 10
                        ).toArray()
                    );
                });
                it("test switch to second key", function () {
                    wd.AnimationComponentContainer.getInstance().update(firstKeyTime + 2);

                    judgePos(
                        [2.2, 1, 0]
                    );
                });
                it("test finish all keys", function () {
                    wd.AnimationComponentContainer.getInstance().update(firstKeyTime + 2);
                    wd.AnimationComponentContainer.getInstance().update(secondKeyTime + 1);

                    judgePos(
                        [3, 1, 0]
                    );
                });
            });

            describe("send event", function(){
                beforeEach(function(){
                });

                it("emit ANIMATION_STOP event when stop", function(){
                    var parent = wd.GameObject.create();
                    parent.addChild(model);

                    var sum = 0;
                    wd.EventManager.on(parent, wd.EEngineEvent.ANIMATION_STOP, function(){
                        sum++;
                    });
                    wd.EventManager.on(model, wd.EEngineEvent.ANIMATION_STOP, function(){
                        sum += 10;
                    });

                    anim.stop();

                    expect(sum).toEqual(11);
                });
            });
        });
    });
});

