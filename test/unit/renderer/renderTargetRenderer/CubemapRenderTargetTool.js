var CubemapRenderTargetTool = YYC.Class({
    Public:{
        sandbox:null,
        renderTargetRenderer: null,


        RenderTargetRenderer: null,

        initWhenCreate_beforeEach:function(){},
        initWhenCreate_body:function(){},
        init_beforeEach:function(){},
        init_body:function(){},
        render:{},
        createCamera_beforeEach:function(){},


        test: function(){
            var gl = null;

            var self = this;

            beforeEach(function () {
                self.sandbox = sinon.sandbox.create();
                self.renderTargetRenderer = new self.RenderTargetRenderer({
                });
                self.sandbox.stub(dy.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(self.sandbox));
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
                dy.EventManager.off();
                testTool.clearInstance();
                self.sandbox.restore();
            });

            describe("initWhenCreate", function(){
                var texture;

                beforeEach(function(){
                    self.initWhenCreate_beforeEach();
                    texture = {};
                    self.renderTargetRenderer.texture = texture;

                    self.sandbox.stub(dy.DeviceManager.getInstance(), "view", {
                    });
                });


                testTool.multiIt(self.initWhenCreate_body, function(){
                    return [texture];
                });


                it("create FrameBuffer instance", function(){
                    self.renderTargetRenderer.initWhenCreate();

                    expect(self.renderTargetRenderer.frameBufferOperator).toBeInstanceOf(dy.FrameBuffer);
                });
            });

            describe("init", function(){
                var frameBufferOperator,frameBuffer,renderBuffer, frameBufferTexture, texture;

                beforeEach(function(){
                    frameBuffer = {};
                    renderBuffer = {};

                    frameBufferOperator = {
                        createFrameBuffer: self.sandbox.stub().returns(frameBuffer),
                        createRenderBuffer: self.sandbox.stub().returns(renderBuffer),
                        bindFrameBuffer: self.sandbox.stub(),
                        attachTexture: self.sandbox.stub(),
                        attachRenderBuffer: self.sandbox.stub(),
                        check: self.sandbox.stub(),
                        unBind: self.sandbox.stub()
                    };

                    frameBufferTexture = {};

                    self.renderTargetRenderer.frameBufferOperator = frameBufferOperator;

                    texture = {
                        createEmptyTexture: self.sandbox.stub().returns(frameBufferTexture),
                        setTexture: self.sandbox.stub()
                    };
                    self.renderTargetRenderer.texture = texture;

                    self.init_beforeEach(self);
                });


                self.init_body(self);


                it("create empty texture", function(){
                    self.renderTargetRenderer.init();

                    expect(texture.createEmptyTexture).toCalledOnce();
                    expect(self.renderTargetRenderer.frameBufferTexture).toEqual(frameBufferTexture);
                });
                it("bind frame buffer texture to renderTargetTexture", function(){
                    self.renderTargetRenderer.init();

                    expect(texture.setTexture).toCalledWith(self.renderTargetRenderer.frameBufferTexture);
                });

                describe("init six faces", function(){
                    it("bind frame buffer", function(){
                        self.renderTargetRenderer.init();

                        expect(frameBufferOperator.bindFrameBuffer).toCalledWith(frameBuffer);
                        expect(frameBufferOperator.bindFrameBuffer.callCount).toEqual(6);
                    });
                    it("attact texture", function(){
                        self.renderTargetRenderer.init();

                        expect(frameBufferOperator.attachTexture.getCall(0)).toCalledWith(gl.TEXTURE_CUBE_MAP_POSITIVE_X, frameBufferTexture);
                        expect(frameBufferOperator.attachTexture.getCall(1)).toCalledWith(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, frameBufferTexture);
                        expect(frameBufferOperator.attachTexture.getCall(2)).toCalledWith(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, frameBufferTexture);
                        expect(frameBufferOperator.attachTexture.getCall(3)).toCalledWith(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, frameBufferTexture);
                        expect(frameBufferOperator.attachTexture.getCall(4)).toCalledWith(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, frameBufferTexture);
                        expect(frameBufferOperator.attachTexture.getCall(5)).toCalledWith(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, frameBufferTexture);

                        expect(frameBufferOperator.attachTexture.callCount).toEqual(6);
                    });
                    it("attach render buffer", function(){
                        self.renderTargetRenderer.init();

                        expect(frameBufferOperator.attachRenderBuffer).toCalledWith("DEPTH_ATTACHMENT", renderBuffer);
                        expect(frameBufferOperator.attachRenderBuffer.callCount).toEqual(6);
                    });
                    it("check frame buffer", function(){
                        self.renderTargetRenderer.init();

                        expect(frameBufferOperator.check.callCount).toEqual(6);
                    });
                    it("has totally 6 frameBuffers and 6 renderBuffers", function(){
                        self.renderTargetRenderer.init();

                        expect(self.renderTargetRenderer._frameBuffers.getCount()).toEqual(6);
                        expect(self.renderTargetRenderer._renderBuffers.getCount()).toEqual(6);
                    });
                });

                it("unBind frame buffer", function(){
                    self.renderTargetRenderer.init();

                    expect(frameBufferOperator.unBind).toCalledOnce();
                });
            });

            describe("render", function(){
                var renderer, camera, frameBufferOperator,renderObj1, renderObj2,renderObj3,renderObj4,renderObj5,renderObj6,targetPosition,frameBufferTexture, frameBuffers, frameBuffer;





                var list1 = null;
                var list2 = null;
                var list3 = null;
                var list4 = null;
                var list5 = null;
                var list6 = null;

                beforeEach(function(){
                    renderObj1 = {
                        render: self.sandbox.stub()
                    };
                    renderObj2 = {
                        render: self.sandbox.stub()
                    };
                    renderObj3 = {
                        render: self.sandbox.stub()
                    };
                    renderObj4 = {
                        render: self.sandbox.stub()
                    };
                    renderObj5 = {
                        render: self.sandbox.stub()
                    };
                    renderObj6 = {
                        render: self.sandbox.stub()
                    };

                    targetPosition = dy.Vector3.create(0, 1, 2);

                    list1 = [renderObj1];
                    list2 = [renderObj2];
                    list3 = [renderObj3];
                    list4 = [renderObj4];
                    list5 = [renderObj5];
                    list6 = [renderObj6];

                    frameBufferOperator = {
                        bindFrameBuffer: self.sandbox.stub(),
                        setViewport: self.sandbox.stub(),
                        unBind: self.sandbox.stub(),
                        restoreViewport: self.sandbox.stub()
                    };

                    frameBufferTexture = {};

                    self.renderTargetRenderer.frameBufferOperator = frameBufferOperator;
                    self.renderTargetRenderer.frameBufferTexture = frameBufferTexture;

                    frameBuffer = {};
                    frameBuffers = dyCb.Collection.create([
                        frameBuffer, frameBuffer, frameBuffer, frameBuffer, frameBuffer, frameBuffer
                    ]);
                    self.renderTargetRenderer._frameBuffers = frameBuffers;


                    renderer = {
                        render: self.sandbox.stub()
                    };




                    self.render.beforeEach(self, list1, list2, list3, list4, list5, list6);








                    self.renderTargetRenderer.createCamera = self.sandbox.stub();
                });



                testTool.multiIt(self.render.pre_render_six_faces, function(){
                    return [list1, renderObj1, renderer, camera];
                });



                describe("render six faces", function(){
                    testTool.multiIt(self.render.render_six_faces, function(){
                        return [list6, renderObj1, renderObj2, renderObj6, renderer, camera];
                    });

                    it("bind frameBuffer and set viewport", function(){
                        self.renderTargetRenderer.render(renderer, camera);

                        expect(frameBufferOperator.bindFrameBuffer.getCall(0)).toCalledBefore(frameBufferOperator.setViewport.getCall(0));
                        expect(frameBufferOperator.bindFrameBuffer.getCall(3)).toCalledWith(frameBuffers.getChild(3))

                        expect(frameBufferOperator.bindFrameBuffer.callCount).toEqual(6);
                        expect(frameBufferOperator.setViewport.callCount).toEqual(6);
                    });

                    describe("render renderTargetTexture's renderList", function(){
                        it("render correspond face's renderList with face's camera", function(){
                            var renderCamera = {};
                            self.renderTargetRenderer.createCamera.onCall(1).returns(renderCamera);

                            self.renderTargetRenderer.render(renderer, camera);

                            expect(renderObj1.render).toCalledBefore(renderObj2.render);
                            expect(renderObj2.render).toCalledBefore(renderObj3.render);
                            expect(renderObj3.render).toCalledBefore(renderObj4.render);
                            expect(renderObj4.render).toCalledBefore(renderObj5.render);
                            expect(renderObj5.render).toCalledBefore(renderObj6.render);

                            expect(renderObj2.render).toCalledWith(renderer, renderCamera);
                        });
                    });

                    it("invoke renderer's render method", function(){
                        self.renderTargetRenderer.render(renderer, camera);

                        expect(renderer.render.callCount).toEqual(6);
                    });
                });

                it("unbind frameBuffer and restore viewport", function(){
                    self.renderTargetRenderer.render(renderer, camera);

                    expect(frameBufferOperator.unBind).toCalledBefore(frameBufferOperator.restoreViewport);
                    expect(frameBufferOperator.unBind).toCalledOnce();
                    expect(frameBufferOperator.restoreViewport).toCalledOnce();
                });
            });

            describe("create camera", function(){
                var position;

                function createCameraLookAt(centerX, centerY, centerZ, upX, upY, upZ){
                    var camera = dy.GameObject.create();

                    camera.transform.translate(position);
                    camera.transform.lookAt(centerX, centerY, centerZ, upX, upY, upZ);

                    return camera;
                }

                function judgeCameraLookAt(camera, centerX, centerY, centerZ, upX, upY, upZ){
                    expect(testTool.getValues(
                        camera.transform.localToWorldMatrix.values)
                    ).toEqual(
                        testTool.getValues(createCameraLookAt( centerX, centerY, centerZ, upX, upY, upZ)
                            .transform.localToWorldMatrix.values));
                }

                beforeEach(function(){
                    position = dy.Vector3.create(10,10,10);








                    self.createCamera_beforeEach(self, position);

                });

                it("set cameraComponent", function(){
                    var firstCallCamera = self.renderTargetRenderer.createCamera(0);
                    var firstCallCameraCompoment = firstCallCamera.getComponent(dy.Camera);
                    expect(firstCallCameraCompoment.fovy).toEqual(90);
                    expect(firstCallCameraCompoment.aspect).toEqual(1);
                    expect(firstCallCameraCompoment.near).toEqual(0.1);
                    expect(firstCallCameraCompoment.far).toEqual(10);
                });
                it("move camera to targetPosition ", function(){
                    var firstCallCamera = self.renderTargetRenderer.createCamera(0);

                    expect(firstCallCamera.transform.position).toEqual(position);
                });
                it("towards its face", function() {
                    judgeCameraLookAt(self.renderTargetRenderer.createCamera(0), position.x + 1, position.y, position.z, 0, -1, 0)
                    judgeCameraLookAt(self.renderTargetRenderer.createCamera(1), position.x-1, position.y, position.z, 0, -1, 0)
                    judgeCameraLookAt(self.renderTargetRenderer.createCamera(2), position.x, position.y + 1, position.z, 0, 0, 1)
                    judgeCameraLookAt(self.renderTargetRenderer.createCamera(3), position.x, position.y-1, position.z, 0, 0, -1)
                    judgeCameraLookAt(self.renderTargetRenderer.createCamera(4), position.x, position.y, position.z + 1, 0, -1, 0)
                    judgeCameraLookAt(self.renderTargetRenderer.createCamera(5), position.x, position.y, position.z-1, 0, -1, 0)
                });
                it("init camera", function(){
                    var firstCallCamera = self.renderTargetRenderer.createCamera(0);
                    var firstCallCameraCompoment = firstCallCamera.getComponent(dy.Camera);

                    expect(testTool.getValues(firstCallCameraCompoment.pMatrix.values)).toEqual(
                        [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1.020202, -1, 0, 0, -0.2020202, 0 ]
                    );
                })
            });
        }
    }
});


