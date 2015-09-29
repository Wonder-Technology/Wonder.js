describe("CubemapRenderTargetRenderer", function() {
    var sandbox = null;
    var RenderTargetRenderer = null;
    var renderTargetRenderer = null;
    var gl = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        RenderTargetRenderer = dy.CubemapRenderTargetRenderer;
        sandbox.stub(dy.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
        testTool.extend(dy.DeviceManager.getInstance().gl, {
            TEXTURE_CUBE_MAP_POSITIVE_X:0,
            TEXTURE_CUBE_MAP_NEGATIVE_X:1,
            TEXTURE_CUBE_MAP_POSITIVE_Y:2,
            TEXTURE_CUBE_MAP_NEGATIVE_Y:3,
            TEXTURE_CUBE_MAP_POSITIVE_Z:4,
            TEXTURE_CUBE_MAP_NEGATIVE_Z:5,
            TEXTURE_2D: 100
        });

        gl = dy.DeviceManager.getInstance().gl;
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("init", function(){
        var renderTargetTexture,frameBufferOperator,emptyTexture,frameBuffer,renderBuffer;

        beforeEach(function(){
            emptyTexture = {};
            frameBuffer = {};
            renderBuffer = {};

            renderTargetTexture = {
                createEmptyTexture: sandbox.stub().returns(emptyTexture)
            };

            frameBufferOperator = {
                createFrameBuffer: sandbox.stub().returns(frameBuffer),
                createRenderBuffer: sandbox.stub().returns(renderBuffer),
                bindFrameBuffer: sandbox.stub(),
                attachTexture: sandbox.stub(),
                attachRenderBuffer: sandbox.stub(),
                check: sandbox.stub(),
                unBind: sandbox.stub()
            };

            renderTargetRenderer = new RenderTargetRenderer(renderTargetTexture);
            renderTargetRenderer.frameBuffer = frameBufferOperator;



            renderTargetRenderer.init();
        });

        it("create empty texture", function(){
            expect(renderTargetRenderer.frameBufferTexture).toEqual(emptyTexture);
        });

        describe("init six faces", function(){
            it("bind frame buffer", function(){
                expect(frameBufferOperator.bindFrameBuffer).toCalledWith(frameBuffer);
                expect(frameBufferOperator.bindFrameBuffer.callCount).toEqual(6);
            });
            it("attact texture", function(){
                expect(frameBufferOperator.attachTexture.getCall(0)).toCalledWith(gl.TEXTURE_CUBE_MAP_POSITIVE_X, emptyTexture);
                expect(frameBufferOperator.attachTexture.getCall(1)).toCalledWith(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, emptyTexture);
                expect(frameBufferOperator.attachTexture.getCall(2)).toCalledWith(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, emptyTexture);
                expect(frameBufferOperator.attachTexture.getCall(3)).toCalledWith(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, emptyTexture);
                expect(frameBufferOperator.attachTexture.getCall(4)).toCalledWith(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, emptyTexture);
                expect(frameBufferOperator.attachTexture.getCall(5)).toCalledWith(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, emptyTexture);

                expect(frameBufferOperator.attachTexture.callCount).toEqual(6);
            });
            it("attach render buffer", function(){
                expect(frameBufferOperator.attachRenderBuffer).toCalledWith("DEPTH_ATTACHMENT", renderBuffer);
                expect(frameBufferOperator.attachRenderBuffer.callCount).toEqual(6);
            });
            it("check frame buffer", function(){
                expect(frameBufferOperator.check.callCount).toEqual(6);
            });
            it("has totally 6 frameBuffers and 6 renderBuffers", function(){
                expect(renderTargetRenderer._frameBuffers.getCount()).toEqual(6);
                expect(renderTargetRenderer._renderBuffers.getCount()).toEqual(6);
            });
        });
        it("unBind frame buffer", function(){
            expect(frameBufferOperator.unBind).toCalledOnce();
        });
    });

    describe("render", function(){
        var renderTargetTexture,renderer,camera, frameBufferOperator,renderObj1, renderObj2,targetPosition,frameBufferTexture, frameBuffers, frameBuffer;
        var list1 = null;
        var list2 = null;
        var list3 = null;
        var list4 = null;
        var list5 = null;
        var list6 = null;

        beforeEach(function(){
            renderObj1 = {
                render: sandbox.stub()
            };
            renderObj2 = {
                render: sandbox.stub()
            };
            renderObj3 = {
                render: sandbox.stub()
            };
            renderObj4 = {
                render: sandbox.stub()
            };
            renderObj5 = {
                render: sandbox.stub()
            };
            renderObj6 = {
                render: sandbox.stub()
            };

            targetPosition = dy.Vector3.create(0, 1, 2);

            list1 = [renderObj1];
            list2 = [renderObj2];
            list3 = [renderObj3];
            list4 = [renderObj4];
            list5 = [renderObj5];
            list6 = [renderObj6];

            renderTargetTexture = {
                near: 0.1,
                far: 1000,

                setTexture: sandbox.stub(),
                getPosition: sandbox.stub().returns(targetPosition),
                renderList: dyCb.Hash.create({
                    px:list1,
                    nx:list2,
                    py:list3,
                    ny:list4,
                    pz:list5,
                    nz:list6
                })
            };

            frameBufferOperator = {
                bindFrameBuffer: sandbox.stub(),
                setViewport: sandbox.stub(),
                unBind: sandbox.stub(),
                restoreViewport: sandbox.stub()
            };

            frameBufferTexture = {};

            renderTargetRenderer = new RenderTargetRenderer(renderTargetTexture);
            renderTargetRenderer.frameBuffer = frameBufferOperator;
            renderTargetRenderer.frameBufferTexture = frameBufferTexture;

            frameBuffer = {};
            frameBuffers = dyCb.Collection.create([
                frameBuffer, frameBuffer, frameBuffer, frameBuffer, frameBuffer, frameBuffer
            ]);
            renderTargetRenderer._frameBuffers = frameBuffers;


            renderer = {
                render: sandbox.stub()
            };
        });

        it("attach renderTargetTexture and frameBuffer's texture", function(){
            renderTargetRenderer.render(renderer, camera);

            expect(renderTargetTexture.setTexture).toCalledWith(frameBufferTexture);
        });

        describe("render six faces", function(){
            it("bind frameBuffer and set viewport", function(){
                renderTargetRenderer.render(renderer, camera);

                expect(frameBufferOperator.bindFrameBuffer.getCall(0)).toCalledBefore(frameBufferOperator.setViewport.getCall(0));
                expect(frameBufferOperator.bindFrameBuffer.getCall(3)).toCalledWith(frameBuffers.getChild(3))

                expect(frameBufferOperator.bindFrameBuffer.callCount).toEqual(6);
                expect(frameBufferOperator.setViewport.callCount).toEqual(6);
            });

            describe("render renderTargetTexture's renderList", function(){
                it("render correspond face's renderList", function(){
                    renderTargetRenderer.render(renderer, camera);

                    expect(renderObj1.render).toCalledBefore(renderObj2.render);
                    expect(renderObj2.render).toCalledBefore(renderObj3.render);
                    expect(renderObj3.render).toCalledBefore(renderObj4.render);
                    expect(renderObj4.render).toCalledBefore(renderObj5.render);
                    expect(renderObj5.render).toCalledBefore(renderObj6.render);
                });

                describe("create camera", function(){
                    function createCameraLookAt(centerX, centerY, centerZ, upX, upY, upZ){
                        var camera = dy.GameObject.create();

                        camera.transform.translate(targetPosition);
                        camera.transform.lookAt(centerX, centerY, centerZ, upX, upY, upZ);

                        return camera;
                    }

                    function judgeCameraLookAt(renderObj, centerX, centerY, centerZ, upX, upY, upZ){
                        expect(testTool.getValues(
                                renderObj.render.args[0][1]
                                    .transform.localToWorldMatrix.values)
                        ).toEqual(
                            testTool.getValues(createCameraLookAt( centerX, centerY, centerZ, upX, upY, upZ)
                                .transform.localToWorldMatrix.values));
                    }

                    it("set cameraComponent", function(){
                        renderTargetRenderer.render(renderer, camera);

                        var firstCallCamera = renderObj1.render.getCall(0).args[1];
                        var firstCallCameraCompoment = firstCallCamera.getComponent(dy.Camera);
                        expect(firstCallCameraCompoment.fovy).toEqual(90);
                        expect(firstCallCameraCompoment.aspect).toEqual(1);
                        expect(firstCallCameraCompoment.near).toEqual(renderTargetTexture.near);
                        expect(firstCallCameraCompoment.far).toEqual(renderTargetTexture.far);
                        expect(testTool.getValues(firstCallCameraCompoment.pMatrix.values)).toEqual(
                            [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1.0002, -1, 0, 0, -0.20002, 0 ]
                        );
                    });
                    it("move camera to targetPosition ", function(){
                        renderTargetRenderer.render(renderer, camera);

                        var firstCallCamera = renderObj1.render.getCall(0).args[1];

                        expect(firstCallCamera.transform.position.values).toEqual(
                            targetPosition.values
                        )
                    });
                    it("towards its face", function() {
                        renderTargetRenderer.render(renderer, camera);

                        judgeCameraLookAt(renderObj1, targetPosition.x + 1, targetPosition.y, targetPosition.z, 0, -1, 0)
                        judgeCameraLookAt(renderObj2, targetPosition.x-1, targetPosition.y, targetPosition.z, 0, -1, 0)
                        judgeCameraLookAt(renderObj3, targetPosition.x, targetPosition.y + 1, targetPosition.z, 0, 0, 1)
                        judgeCameraLookAt(renderObj4, targetPosition.x, targetPosition.y-1, targetPosition.z, 0, 0, -1)
                        judgeCameraLookAt(renderObj5, targetPosition.x, targetPosition.y, targetPosition.z + 1, 0, -1, 0)
                        judgeCameraLookAt(renderObj6, targetPosition.x, targetPosition.y, targetPosition.z-1, 0, -1, 0)
                    });
                });
            });

            it("invoke renderer's render method", function(){
                renderTargetRenderer.render(renderer, camera);

                expect(renderer.render.callCount).toEqual(6);
            });
        });

        it("unbind frameBuffer and restore viewport", function(){
            renderTargetRenderer.render(renderer, camera);

            expect(frameBufferOperator.unBind).toCalledBefore(frameBufferOperator.restoreViewport);
            expect(frameBufferOperator.unBind).toCalledOnce();
            expect(frameBufferOperator.restoreViewport).toCalledOnce();
        });
    });
});

