describe("morph animation", function () {
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(dy.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("integration test", function(){
        var model,geo,material,anim,fps,
            director,program;
        var vertice,normals;
        var frameVertice1,frameVertice2,frameVertice3;
        var frameNormals1,frameNormals2,frameNormals3;

        function createFaces(indices, normals){
            return testTool.createFaces(indices, normals);
        }

        function createAnimation(animName, currentFrame, nextFrame){
            var animation = dy.MorphAnimation.create();
            //animation.currentFrame = currentFrame || 0;
            //animation.nextFrame = nextFrame || 1;
            //animation.currentAnimName = animName;

            return animation;
        }

        function prepare(){
            model = dy.GameObject.create();

            geo = dy.ModelGeometry.create();

            material = dy.LightMaterial.create();

            geo.material = material;

            geo.vertices = vertice;
            geo.morphTargets = dyCb.Hash.create({
                "play": dyCb.Collection.create(
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


            director = dy.Director.getInstance();


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
        });

        it("test morph vertices and normals sended in multi frames", function(){
            anim.play("play", fps);
            director._init();


            director._run(1);


            expect(program.sendUniformData.withArgs("u_interpolation").firstCall.args[2]).toEqual(0.01);

            judgeFirstFrameState(0);





            director._run(100);

            expect(program.sendUniformData.withArgs("u_interpolation").secondCall.args[2]).toEqual(1);

            judgeFirstFrameState(1);




            director._run(150);

            expect(program.sendUniformData.withArgs("u_interpolation").thirdCall.args[2]).toEqual(0.5);

            judgeSecondFrameState(2);



            director._run(201);

            expect(program.sendUniformData.withArgs("u_interpolation").getCall(3).args[2]).toEqual(0.01);

            judgeThirdFrameState(3);
        });

        describe("test animation control", function(){
            it("play,stop", function(){
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



                anim.stop();


                director._run(101);
                expect(program.sendUniformData.withArgs("u_interpolation").getCall(1).args[2]).toEqual(0.01);
                judgeFrameState(1,
                    frameVertice1,
                    frameVertice2,
                    frameNormals1,
                    frameNormals2
                );


                anim.play("play", fps);

                director._run(203);
                expect(program.sendUniformData.withArgs("u_interpolation").getCall(2).args[2]).toEqual(0);
                judgeFrameState(2,
                    frameVertice1,
                    frameVertice2,
                    frameNormals1,
                    frameNormals2
                );
            });
            it("pause,resume", function(){
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

                anim.pause();


                director._run(150);
                expect(program.sendUniformData.withArgs("u_interpolation").getCall(1).args[2]).toEqual(0.01);
                judgeFrameState(1,
                    frameVertice1,
                    frameVertice2,
                    frameNormals1,
                    frameNormals2
                );

                anim.resume();

                director._run(200);
                expect(program.sendUniformData.withArgs("u_interpolation").getCall(2).args[2]).toEqual(0.49);
                judgeFrameState(2,
                    frameVertice1,
                    frameVertice2,
                    frameNormals1,
                    frameNormals2
                );
            });
        });

        it("use static vertices,normals of morphTargets when not play animation", function(){
            director._init();

            director._run(1);

            expect(program.sendUniformData.withArgs("u_interpolation")).toCalledOnce();
            expect(program.sendUniformData.withArgs("u_interpolation").firstCall.args[2]).toEqual(0);

            judgeFrameState(0,
                vertice,
                vertice,
                normals,
                normals
            );


            director._run(5);

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
        it("fix bug: when invoke ModelGeometry.buffers->getChild(BufferDataType.VERTICE/BufferDataTYpe.NORMAL) multi times, it should use the cache after the first time, but actual is that it always generate vertices/normals each time", function(){
            anim.play("play", fps);
            director._init();


            var vertices1 = geo.buffers.getChild(dy.BufferDataType.VERTICE);
            var vertices2 = geo.buffers.getChild(dy.BufferDataType.VERTICE);

            expect(vertices1[0].data).toEqual(vertices2[0].data);
            expect(vertices1[1].data).toEqual(vertices2[1].data);
        });

        it("use Action to control animation", function(){
            var action1 = dy.Repeat.create(dy.CallFunc.create(function(){
                box.transform.rotateLocal(0, 1, 0);
            }));
            anim.play("play", fps);
            director._init();


            director._run(1);
        })
    });
});
