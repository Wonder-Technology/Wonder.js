describe("articulated animation", function () {
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

            function buildAnimData() {
                return [
                    {
                    time:0,

                        targets: wdCb.Collection.create(
                    [
                        {
                            interpolationMethod:wd.EKeyFrameInterpolation.SWITCH,
                            target:wd.EArticulatedAnimationTarget.TEXTURE_OFFSET,
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
                            target:wd.EArticulatedAnimationTarget.TEXTURE_OFFSET,
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
                                    target:wd.EArticulatedAnimationTarget.TEXTURE_OFFSET,
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
                sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

                firstKeyTime = 10;
                secondKeyTime = 20;

                width = 10;
                height = 20;

                model = wd.GameObject.create();

                anim = wd.TextureArticulatedAnimation.create();

                model.addComponent(anim);

                material = wd.LightMaterial.create();
                material.diffuseMap = wd.ImageTexture.create({});

                geo = wd.RectGeometry.create();
                geo.material = material;

                model.addComponent(geo);


                setCurrentTime(0);
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
                        wd.AnimationEngine.getInstance().update(0);
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
                        wd.AnimationEngine.getInstance().update(0);
                    }).toThrow("this animated texture should has 'sourceRegion' attribute");
                });
            });

            describe("test special cases", function(){
                beforeEach(function(){
                });

                it("test time === 0", function () {
                    anim.data = wdCb.Hash.create({
                        "play": wdCb.Collection.create( buildAnimData() )
                    });
                    anim.play("play");
                    model.init();


                    wd.AnimationEngine.getInstance().update(0);


                    judgeIsFirstFrameSourceRegion();
                });
            });

            describe("test normal cases", function(){
                beforeEach(function(){
                    anim.data = wdCb.Hash.create({
                        "play": wdCb.Collection.create(buildAnimData())
                    });


                    anim.play("play");

                    model.init();
                });

                it("if time reach next frame, just switch to the next frame->data ", function () {
                    wd.AnimationEngine.getInstance().update(firstKeyTime+1);

                    judgeIsSecondFrameSourceRegion();
                });
                it("else, remain the current frame->data", function () {
                    wd.AnimationEngine.getInstance().update(firstKeyTime/2);
                    judgeIsFirstFrameSourceRegion();
                });

                describe("test finish all keys", function(){
                    beforeEach(function(){
                        wd.AnimationEngine.getInstance().update(firstKeyTime + 1);
                    });

                    it("if just finish all keys, reach the end data", function () {
                        wd.AnimationEngine.getInstance().update(secondKeyTime);

                        judgeIsSecondFrameSourceRegion();
                    });
                    it("if the elapsed exceed the last key->time, go back to the second key data", function () {
                        wd.AnimationEngine.getInstance().update(secondKeyTime + 2);

                        judgeIsThirdFrameSourceRegion();
                    });
                    it("test reach the next loop->first key", function () {
                        wd.AnimationEngine.getInstance().update(secondKeyTime + 2);
                        wd.AnimationEngine.getInstance().update(secondKeyTime + 3);

                        judgeIsFirstFrameSourceRegion();
                    });
                    it("test reach the next loop->second key", function () {
                        wd.AnimationEngine.getInstance().update(secondKeyTime + 1);
                        wd.AnimationEngine.getInstance().update(secondKeyTime + firstKeyTime + 1);

                        judgeIsSecondFrameSourceRegion();
                    });
                    it("test finish next loop", function () {
                        wd.AnimationEngine.getInstance().update(secondKeyTime + 1);
                        wd.AnimationEngine.getInstance().update(secondKeyTime + firstKeyTime + 1);

                        wd.AnimationEngine.getInstance().update(secondKeyTime + secondKeyTime + 1);

                        judgeIsThirdFrameSourceRegion();
                    });
                });
            });
        });
    });
});
