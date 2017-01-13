describe("texture articulated animation", function () {
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

        function setCurrentTime(time){
            sandbox.stub(wd.Director.getInstance()._timeController, "elapsed", time);
        }

        beforeEach(function(){
        });

        describe("update texture->offset in each key", function(){
            var firstKeyTime,secondKeyTime;
            var width,height;
            var geo, material;

            function judgeNormalCase(buildAnimData, judgeIsFirstFrameSourceRegion, judgeIsSecondFrameSourceRegion, judgeIsThirdFrameSourceRegion) {
                describe("test normal cases", function(){
                    beforeEach(function(){
                        anim.data = wdCb.Hash.create({
                            "play": wdCb.Collection.create(buildAnimData())
                        });


                        anim.play("play");

                        model.init();
                    });

                    it("if time reach next frame, just switch to the next frame->data ", function () {
                        wd.AnimationComponentContainer.getInstance().update(firstKeyTime+1);

                        judgeIsSecondFrameSourceRegion();
                    });
                    it("else, remain the current frame->data", function () {
                        wd.AnimationComponentContainer.getInstance().update(firstKeyTime/2);
                        judgeIsFirstFrameSourceRegion();
                    });

                    describe("test finish all keys", function(){
                        beforeEach(function(){
                            wd.AnimationComponentContainer.getInstance().update(firstKeyTime);
                        });

                        it("if just finish all keys, reach the end data", function () {
                            wd.AnimationComponentContainer.getInstance().update(secondKeyTime);

                            judgeIsSecondFrameSourceRegion();
                        });
                        it("if the elapsed exceed the last key->time and not reach the second key of the next loop, go to the first key data of the next loop", function () {
                            wd.AnimationComponentContainer.getInstance().update(secondKeyTime + firstKeyTime / 3);

                            judgeIsFirstFrameSourceRegion();
                        });
                        it("test reach the next loop->first key", function () {
                            wd.AnimationComponentContainer.getInstance().update(secondKeyTime + firstKeyTime / 3);
                            wd.AnimationComponentContainer.getInstance().update(secondKeyTime + firstKeyTime / 2);

                            judgeIsFirstFrameSourceRegion();
                        });
                        it("test exceed the next loop->first key", function () {
                            wd.AnimationComponentContainer.getInstance().update(secondKeyTime + 1);
                            wd.AnimationComponentContainer.getInstance().update(secondKeyTime + firstKeyTime + 2);

                            judgeIsSecondFrameSourceRegion();
                        });
                        it("test finish next loop", function () {
                            wd.AnimationComponentContainer.getInstance().update(secondKeyTime + 1);
                            wd.AnimationComponentContainer.getInstance().update(secondKeyTime + firstKeyTime + 1);

                            wd.AnimationComponentContainer.getInstance().update(secondKeyTime + secondKeyTime + 2);

                            judgeIsFirstFrameSourceRegion();
                        });
                    });
                });
            }

            function judgeSpecialCase(buildAnimData, judgeIsFirstFrameSourceRegion, judgeIsSecondFrameSourceRegion, judgeIsThirdFrameSourceRegion) {
                describe("test special cases", function(){
                    beforeEach(function(){
                    });

                    it("test time === 0", function () {
                        anim.data = wdCb.Hash.create({
                            "play": wdCb.Collection.create( buildAnimData() )
                        });
                        anim.play("play");
                        model.init();


                        wd.AnimationComponentContainer.getInstance().update(0);


                        judgeIsFirstFrameSourceRegion();
                    });
                });
            }

            beforeEach(function(){
                sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

                firstKeyTime = 10;
                secondKeyTime = 20;

                width = 10;
                height = 20;

                model = wd.GameObject.create();

                anim = wd.TextureArticulatedAnimation.create();

                model.addComponent(anim);

                setCurrentTime(0);
            });

            describe("test animate StandardBasicMaterial", function () {
                function buildAnimData() {
                    return [
                        {
                            time:0,

                            targets: wdCb.Collection.create(
                                [
                                    {
                                        interpolationMethod:wd.EKeyFrameInterpolation.SWITCH,
                                        target:wd.EKeyFrameAnimationTarget.TEXTURE_OFFSET,
                                        data: [0,0,width,height],
                                        extra:{
                                            target:"map"
                                        }
                                    }
                                ]
                            )
                        },
                        {
                            time:10,

                            targets: wdCb.Collection.create(
                                [
                                    {
                                        interpolationMethod:wd.EKeyFrameInterpolation.SWITCH,
                                        target:wd.EKeyFrameAnimationTarget.TEXTURE_OFFSET,
                                        data: [width,0,width,height],
                                        extra:{
                                            target:"map"
                                        }
                                    }
                                ]
                            )
                        },
                        {
                            time:20,

                            targets: wdCb.Collection.create(
                                [
                                    {
                                        interpolationMethod:wd.EKeyFrameInterpolation.SWITCH,
                                        target:wd.EKeyFrameAnimationTarget.TEXTURE_OFFSET,
                                        data: [0,height,width,height],
                                        extra:{
                                            target:"map"
                                        }
                                    }
                                ]
                            )
                        }
                    ]
                }

                function judgeSourceRegion(dataArr) {
                    expect(material.map.sourceRegion.isEqual(wd.RectRegion.create(dataArr[0], dataArr[1], dataArr[2], dataArr[3]))).toBeTruthy();
                }


                function judgeIsFirstFrameSourceRegion() {
                    judgeSourceRegion([0,0,width,height]);
                }

                function judgeIsSecondFrameSourceRegion() {
                    judgeSourceRegion([width,0,width,height]);
                }

                function judgeIsThirdFrameSourceRegion() {
                    judgeSourceRegion([0,height,width,height]);
                }

                beforeEach(function(){
                    material = wd.BasicMaterial.create();
                    material.map = wd.ImageTexture.create({});

                    geo = wd.RectGeometry.create();
                    geo.material = material;

                    model.addComponent(geo);
                });

                judgeSpecialCase(buildAnimData, judgeIsFirstFrameSourceRegion, judgeIsSecondFrameSourceRegion, judgeIsThirdFrameSourceRegion);

                judgeNormalCase(buildAnimData, judgeIsFirstFrameSourceRegion, judgeIsSecondFrameSourceRegion, judgeIsThirdFrameSourceRegion);
            });

            describe("test animate StandardLightMaterial", function () {
                function buildAnimData() {
                    return [
                        {
                            time:0,

                            targets: wdCb.Collection.create(
                                [
                                    {
                                        interpolationMethod:wd.EKeyFrameInterpolation.SWITCH,
                                        target:wd.EKeyFrameAnimationTarget.TEXTURE_OFFSET,
                                        data: [0,0,width,height],
                                        extra:{
                                            target:"diffuseMap"
                                        }
                                    }
                                ]
                            )
                        },
                        {
                            time:10,

                            targets: wdCb.Collection.create(
                                [
                                    {
                                        interpolationMethod:wd.EKeyFrameInterpolation.SWITCH,
                                        target:wd.EKeyFrameAnimationTarget.TEXTURE_OFFSET,
                                        data: [width,0,width,height],
                                        extra:{
                                            target:"diffuseMap"
                                        }
                                    }
                                ]
                            )
                        },
                        {
                            time:20,

                            targets: wdCb.Collection.create(
                                [
                                    {
                                        interpolationMethod:wd.EKeyFrameInterpolation.SWITCH,
                                        target:wd.EKeyFrameAnimationTarget.TEXTURE_OFFSET,
                                        data: [0,height,width,height],
                                        extra:{
                                            target:"diffuseMap"
                                        }
                                    }
                                ]
                            )
                        }
                    ]
                }

                function judgeSourceRegion(dataArr) {
                    expect(material.diffuseMap.sourceRegion.isEqual(wd.RectRegion.create(dataArr[0], dataArr[1], dataArr[2], dataArr[3]))).toBeTruthy();
                }

                function judgeIsFirstFrameSourceRegion() {
                    judgeSourceRegion([0,0,width,height]);
                }

                function judgeIsSecondFrameSourceRegion() {
                    judgeSourceRegion([width,0,width,height]);
                }

                function judgeIsThirdFrameSourceRegion() {
                    judgeSourceRegion([0,height,width,height]);
                }

                beforeEach(function(){
                    material = wd.LightMaterial.create();
                    material.diffuseMap = wd.ImageTexture.create({});

                    geo = wd.RectGeometry.create();
                    geo.material = material;

                    model.addComponent(geo);
                });

                describe("contract check", function(){
                    beforeEach(function(){
                        testTool.openContractCheck(sandbox);
                    });

                    it("material should has the corresponding animated texture", function() {
                        anim.data = wdCb.Hash.create({
                            "play": wdCb.Collection.create(buildAnimData())
                        });
                        anim.play("play");

                        geo.material = wd.BasicMaterial.create();
                        model.init();


                        expect(function () {
                            wd.AnimationComponentContainer.getInstance().update(0);
                        }).toThrow("material should has the corresponding animated texture");
                    });
                    it("this animated texture should has 'sourceRegion' attribute", function(){
                        anim.data = wdCb.Hash.create({
                            "play": wdCb.Collection.create(buildAnimData())
                        });
                        anim.play("play");

                        material.diffuseMap.sourceRegion = undefined;
                        model.init();


                        expect(function () {
                            wd.AnimationComponentContainer.getInstance().update(0);
                        }).toThrow("this animated texture should has 'sourceRegion' attribute");
                    });
                });

                judgeSpecialCase(buildAnimData, judgeIsFirstFrameSourceRegion, judgeIsSecondFrameSourceRegion, judgeIsThirdFrameSourceRegion)

                judgeNormalCase(buildAnimData, judgeIsFirstFrameSourceRegion, judgeIsSecondFrameSourceRegion, judgeIsThirdFrameSourceRegion);
            });
        });
    });
});
