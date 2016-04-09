describe("morph animation", function () {
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

        testTool.openContractCheck(sandbox);
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("integration test", function(){
        var model,geo,material,anim,fps,
            director,program;
        var duration;
        var vertice,normals;
        var frameVertice1,frameVertice2,frameVertice3;
        var frameNormals1,frameNormals2,frameNormals3;

        function createFaces(indices, normals){
            return testTool.createFaces(indices, normals);
        }

        function createAnimation(animName, currentFrame, nextFrame){
            var animation = wd.MorphAnimation.create();
            //animation.currentFrame = currentFrame || 0;
            //animation.nextFrame = nextFrame || 1;
            //animation.currentAnimName = animName;

            return animation;
        }

        function prepare(){
            model = wd.GameObject.create();

            geo = wd.ModelGeometry.create();

            material = wd.LightMaterial.create();

            geo.material = material;

            geo.vertices = vertice;
            geo.morphTargets = wdCb.Hash.create({
                "play": wdCb.Collection.create(
                    [
                        frameVertice1,
                        frameVertice2,
                        frameVertice3
                    ]
                )
            })

            geo.faces = createFaces([0,1,2,3,4,5],
                normals
            );

            prepareTool.prepareGeo(sandbox, model,geo,material);


            anim = createAnimation("play");
            model.addComponent(anim);


            fps = 10;
            duration = 100;


            director = wd.Director.getInstance();


            program = material.shader.program;
        }


        function judgeFirstFrameState(callIndex){
            judgeFrameState(callIndex,
                frameVertice1,
                frameVertice2,

                frameNormals1,
                frameNormals2
            )
        }


        function judgeSecondFrameState(callIndex){
            judgeFrameState(callIndex,
                frameVertice2,
                frameVertice3,
                frameNormals2,
                frameNormals3
            )
        }


        function judgeThirdFrameState(callIndex){
            judgeFrameState(callIndex,
                frameVertice3,
                frameVertice1,
                frameNormals3,
                frameNormals1
            )
        }

        function judgeFrameState(callIndex, currentFramePosition, nextFramePosition, currentFrameNormal, nextFrameNormal){
            expect(testTool.getValues(
                program.sendAttributeData.withArgs("a_currentFramePosition").getCall(callIndex).args[2].data
            )).toEqual(
                currentFramePosition
            )
            expect(testTool.getValues(
                program.sendAttributeData.withArgs("a_nextFramePosition").getCall(callIndex).args[2].data
            )).toEqual(
                nextFramePosition
            )


            expect(testTool.getValues(
                program.sendAttributeData.withArgs("a_currentFrameNormal").getCall(callIndex).args[2].data
            )).toEqual(
                currentFrameNormal
            )
            expect(testTool.getValues(
                program.sendAttributeData.withArgs("a_nextFrameNormal").getCall(callIndex).args[2].data
            )).toEqual(
                nextFrameNormal
            )
        }

        function setCurrentTime(time){
            sandbox.stub(wd.Director.getInstance()._timeController, "elapsed", time);
        }


        beforeEach(function(){
            vertice = [1,-1,0, 0,1,0,0,0,1, 2,3,-2, 10,5,1,  -10, 2, -2];
            normals = [
                0.8164966, 0.4082483, 0.4082483, 0.8164966, 0.4082483, 0.4082483, 0.8164966, 0.4082483, 0.4082483, 0.0759311, -0.9111735, 0.404966, 0.0759311, -0.9111735, 0.404966, 0.0759311, -0.9111735, 0.404966
            ];


            frameVertice1 = [1,-1,0, 0,1,0,0,0,1, 2,3,-2, 10,5,1,  -10, 2, -2];
            frameVertice2 = [4,-1,0, 0,1,0,0,0,1, 2,3,-2, 10,5,1,  -10, 2, -2];
            frameVertice3 = [-2,-1,0, 0,1,0,0,0,1, 2,3,-2, 10,5,1,  -10, 2, -2];


            frameNormals1 = [
                0.8164966, 0.4082483, 0.4082483, 0.8164966, 0.4082483, 0.4082483, 0.8164966, 0.4082483, 0.4082483, 0.0759311, -0.9111735, 0.404966, 0.0759311, -0.9111735, 0.404966, 0.0759311, -0.9111735, 0.404966
            ];
                frameNormals2 = [
                    0.3333333, 0.6666667, 0.6666667, 0.3333333, 0.6666667, 0.6666667, 0.3333333, 0.6666667, 0.6666667, 0.0759311, -0.9111735, 0.404966, 0.0759311, -0.9111735, 0.404966, 0.0759311, -0.9111735, 0.404966
                ];
            frameNormals3 = [
                    0.5773503, -0.5773503, -0.5773503, 0.5773503, -0.5773503, -0.5773503, 0.5773503, -0.5773503, -0.5773503, 0.0759311, -0.9111735, 0.404966, 0.0759311, -0.9111735, 0.404966, 0.0759311, -0.9111735, 0.404966
                ];

            prepare();


            setCurrentTime(0);
        });

        describe("test morph vertices and normals sended in multi frames", function(){
            beforeEach(function(){
                anim.play("play", fps);
                director._init();
            });

            it("test interpolation", function () {
                director._run(duration / 100);


                expect(program.sendUniformData.withArgs("u_interpolation").firstCall.args[2]).toEqual(0.01);

                judgeFirstFrameState(0);




                director._run(duration);


                expect(program.sendUniformData.withArgs("u_interpolation").secondCall.args[2]).toEqual(1);

                judgeFirstFrameState(1);
            });

            describe("test finish first frame", function () {
                it("test1", function(){
                    director._run(duration + 1);


                    expect(program.sendUniformData.withArgs("u_interpolation").firstCall.args[2]).toEqual(0.01);

                    judgeSecondFrameState(0);
                });
                it("test2", function(){
                    director._run(duration * 0.9);


                    expect(program.sendUniformData.withArgs("u_interpolation").firstCall.args[2]).toEqual(0.9);
                    judgeFirstFrameState(0);


                    director._run(duration * 1.1);

                    expect(testTool.getValues(
                        program.sendUniformData.withArgs("u_interpolation").secondCall.args[2]), 1).toEqual(0.1);

                    judgeSecondFrameState(1);
                });
            });
        });

        describe("test animation control", function(){
            it("play,stop", function(){
                anim.play("play", fps);

                director._init();

                director._run(1);

                expect(program.sendUniformData.withArgs("u_interpolation").firstCall.args[2]).toEqual(0.01);

                judgeFirstFrameState(0);

                anim.stop();





                director._run(101);
                expect(program.sendUniformData.withArgs("u_interpolation").getCall(1).args[2]).toEqual(0.01);

                judgeFirstFrameState(1);

                setCurrentTime(101);

                anim.play("play", fps);




                director._run(104);
                expect(program.sendUniformData.withArgs("u_interpolation").getCall(2).args[2]).toEqual(0.03);

                judgeFirstFrameState(2);
            });

            describe("pause,resume", function(){
                it("", function () {
                    anim.play("play", fps);

                    director._init();

                    director._run(1);

                    expect(program.sendUniformData.withArgs("u_interpolation").firstCall.args[2]).toEqual(0.01);
                    judgeFrameState(0,
                        frameVertice1,
                        frameVertice2,
                        frameNormals1,
                        frameNormals2
                    );

                    setCurrentTime(1);

                    anim.pause();


                    director._run(150);
                    expect(program.sendUniformData.withArgs("u_interpolation").getCall(1).args[2]).toEqual(0.01);
                    judgeFrameState(1,
                        frameVertice1,
                        frameVertice2,
                        frameNormals1,
                        frameNormals2
                    );

                    setCurrentTime(150);

                    anim.resume();



                    director._run(200);
                    expect(program.sendUniformData.withArgs("u_interpolation").getCall(2).args[2]).toEqual(0.51);
                    judgeFrameState(2,
                        frameVertice1,
                        frameVertice2,
                        frameNormals1,
                        frameNormals2
                    );
                });
                it("", function () {
                    anim.play("play", fps);

                    director._init();

                    director._run(1);

                    expect(program.sendUniformData.withArgs("u_interpolation").firstCall.args[2]).toEqual(0.01);
                    judgeFrameState(0,
                        frameVertice1,
                        frameVertice2,
                        frameNormals1,
                        frameNormals2
                    );

                    setCurrentTime(1);

                    anim.pause();


                    director._run(2);
                    expect(program.sendUniformData.withArgs("u_interpolation").getCall(1).args[2]).toEqual(0.01);
                    judgeFrameState(1,
                        frameVertice1,
                        frameVertice2,
                        frameNormals1,
                        frameNormals2
                    );

                    setCurrentTime(2);

                    anim.resume();

                    director._run(52);
                    expect(program.sendUniformData.withArgs("u_interpolation").getCall(2).args[2]).toEqual(0.51);
                    judgeFrameState(2,
                        frameVertice1,
                        frameVertice2,
                        frameNormals1,
                        frameNormals2
                    );
                });
            });
        });

        it("use static vertices,normals of morphTargets when not play animation", function(){
            director._init();

            director._loopBody(1);

            expect(program.sendUniformData.withArgs("u_interpolation")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_interpolation").firstCall.args[2]).toEqual(0);

            judgeFrameState(0,
                vertice,
                vertice,
                normals,
                normals
            );


            director._loopBody(5);

            expect(program.sendUniformData.withArgs("u_interpolation").getCall(1).args[2]).toEqual(0);

            judgeFrameState(1,
                vertice,
                vertice,
                normals,
                normals
            );


            anim.play("play", fps);

            director._run(10);

            expect(program.sendUniformData.withArgs("u_interpolation").getCall(2).args[2]).toEqual(0.1);
            judgeFrameState(2,
                frameVertice1,
                frameVertice2,
                frameNormals1,
                frameNormals2
            );
        });
        it("fix bug: when invoke ModelGeometry.buffers->getChild(EBufferDataType.VERTICE/BufferDataTYpe.NORMAL) multi times, it should use the cache after the first time, but actual is that it always generate vertices/normals each time", function(){
            anim.play("play", fps);
            director._init();


            var vertices1 = geo.buffers.getChild(wd.EBufferDataType.VERTICE);
            var vertices2 = geo.buffers.getChild(wd.EBufferDataType.VERTICE);

            expect(vertices1[0].data).toEqual(vertices2[0].data);
            expect(vertices1[1].data).toEqual(vertices2[1].data);
        });

        it("use Action to control animation", function(){
            //var action1 = wd.Repeat.create(wd.CallFunc.create(function(){
            //    box.transform.rotateLocal(0, 1, 0);
            //}));
            //anim.play("play", fps);
            //director._init();
            //
            //
            //director._loopBody(1);

            //todo support use action to control animation
        })
    });
});
