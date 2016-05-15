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
                self.sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(self.sandbox));
                cloneTool.extend(wd.DeviceManager.getInstance().gl, {
                    TEXTURE_CUBE_MAP_POSITIVE_X:0,
                    TEXTURE_CUBE_MAP_NEGATIVE_X:1,
                    TEXTURE_CUBE_MAP_POSITIVE_Y:2,
                    TEXTURE_CUBE_MAP_NEGATIVE_Y:3,
                    TEXTURE_CUBE_MAP_POSITIVE_Z:4,
                    TEXTURE_CUBE_MAP_NEGATIVE_Z:5,
                    TEXTURE_2D: 100
                });

                gl = wd.DeviceManager.getInstance().gl;
            });
            afterEach(function () {
                wd.EventManager.off();
                testTool.clearInstance(self.sandbox);
                self.sandbox.restore();
            });

            describe("initWhenCreate", function(){
                var texture;

                beforeEach(function(){
                    self.initWhenCreate_beforeEach();
                    texture = {};
                    self.renderTargetRenderer.texture = texture;

                    self.sandbox.stub(wd.DeviceManager.getInstance(), "view", {
                    });
                });


                testTool.multiIt(self.initWhenCreate_body, function(){
                    return [texture];
                });


                it("create FrameBuffer instance", function(){
                    self.renderTargetRenderer.initWhenCreate();

                    expect(self.renderTargetRenderer.frameBufferOperator).toBeInstanceOf(wd.FrameBuffer);
                });
            });

            describe("init", function(){
                var frameBufferOperator,frameBuffer,renderBuffer, texture,glTexture;

                beforeEach(function(){
                    var light = shadowTool.createPointLight([prepareTool.createBox()]).getComponent(wd.PointLight);

                    self.renderTargetRenderer = new self.RenderTargetRenderer(light);




                    frameBuffer = {};
                    renderBuffer = {};

                    frameBufferOperator = {
                        createFrameBuffer: self.sandbox.stub().returns(frameBuffer),
                        createRenderBuffer: self.sandbox.stub().returns(renderBuffer),
                        bindFrameBuffer: self.sandbox.stub(),
                        attachTexture: self.sandbox.stub(),
                        attachRenderBuffer: self.sandbox.stub(),
                        check: self.sandbox.stub(),
                        unBindAll: self.sandbox.stub(),
                        unBindFrameBuffer: self.sandbox.stub()
                    };

                    glTexture = {};

                    self.renderTargetRenderer.frameBufferOperator = frameBufferOperator;

                    texture = {
                        createEmptyTexture: self.sandbox.stub(),
                        glTexture:glTexture
                    };

                    self.renderTargetRenderer.texture = texture;

                    self.init_beforeEach(self);




                });


                self.init_body(self);


                it("create empty texture", function(){
                    self.renderTargetRenderer.init();

                    expect(texture.createEmptyTexture).toCalledOnce();
                });

                describe("init six faces", function(){
                    it("bind frame buffer", function(){
                        self.renderTargetRenderer.init();

                        expect(frameBufferOperator.bindFrameBuffer).toCalledWith(frameBuffer);
                        expect(frameBufferOperator.bindFrameBuffer.callCount).toEqual(6);
                    });
                    it("attacth texture", function(){
                        self.renderTargetRenderer.init();

                        expect(frameBufferOperator.attachTexture.getCall(0)).toCalledWith(gl.TEXTURE_CUBE_MAP_POSITIVE_X, glTexture);
                        expect(frameBufferOperator.attachTexture.getCall(1)).toCalledWith(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, glTexture);
                        expect(frameBufferOperator.attachTexture.getCall(2)).toCalledWith(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, glTexture);
                        expect(frameBufferOperator.attachTexture.getCall(3)).toCalledWith(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, glTexture);
                        expect(frameBufferOperator.attachTexture.getCall(4)).toCalledWith(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, glTexture);
                        expect(frameBufferOperator.attachTexture.getCall(5)).toCalledWith(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, glTexture);

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
                    it("has totally 6 frameBufferList and 6 renderBufferList", function(){
                        self.renderTargetRenderer.init();

                        expect(self.renderTargetRenderer._frameBufferList.getCount()).toEqual(6);
                        expect(self.renderTargetRenderer._renderBufferList.getCount()).toEqual(6);
                    });
                });

                it("unBind frame buffer", function(){
                    self.renderTargetRenderer.init();

                    expect(frameBufferOperator.unBindAll).toCalledOnce();
                });
            });

            describe("render", function(){
                var renderer, camera, frameBufferOperator,renderObj1, renderObj2,renderObj3,renderObj4,renderObj5,renderObj6,targetPosition,texture, frameBufferList, frameBuffer;





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

                    targetPosition = wd.Vector3.create(0, 1, 2);

                    list1 = [renderObj1];
                    list2 = [renderObj2];
                    list3 = [renderObj3];
                    list4 = [renderObj4];
                    list5 = [renderObj5];
                    list6 = [renderObj6];

                    frameBufferOperator = {
                        bindFrameBuffer: self.sandbox.stub(),
                        setViewport: self.sandbox.stub(),
                        unBindAll: self.sandbox.stub(),
                        unBindFrameBuffer: self.sandbox.stub(),
                        restoreViewport: self.sandbox.stub()
                    };

                    //texture = {
                    //    bindToUnit: self.sandbox.stub(),
                    //    getPosition:self.sandbox.stub()
                    //};

                    texture = wd.DynamicCubemapTexture.create();
                    self.sandbox.stub(texture, "bindToUnit");
                    self.sandbox.stub(texture, "getPosition");

                    self.renderTargetRenderer.frameBufferOperator = frameBufferOperator;
                    self.renderTargetRenderer.texture = texture;

                    frameBuffer = {};
                    frameBufferList = wdCb.Collection.create([
                        frameBuffer, frameBuffer, frameBuffer, frameBuffer, frameBuffer, frameBuffer
                    ]);
                    self.renderTargetRenderer._frameBufferList = frameBufferList;


                    renderer = {
                        render: self.sandbox.stub(),
                        clear: self.sandbox.stub()
                    };




                    self.render.beforeEach(self, list1, list2, list3, list4, list5, list6, texture);






                    camera = {
                        dispose:self.sandbox.stub()
                    }


                    self.renderTargetRenderer.createCamera = self.sandbox.stub().returns(camera);
                });



                testTool.multiIt(self.render.before_render_six_faces, function(){
                    return [list1, renderObj1, renderer, camera];
                });


                it("bind texture", function(){
                    self.renderTargetRenderer.render(renderer, camera);

                    expect(texture.bindToUnit).toCalledWith(0);
                });

                describe("render six faces", function(){
                    testTool.multiIt(self.render.render_six_faces, function(){
                        return [list6, renderObj1, renderObj2, renderObj6, renderer, camera, texture];
                    });

                    it("bind frameBuffer and set viewport", function(){
                        self.renderTargetRenderer.render(renderer, camera);

                        expect(frameBufferOperator.bindFrameBuffer.getCall(0)).toCalledBefore(frameBufferOperator.setViewport.getCall(0));
                        expect(frameBufferOperator.bindFrameBuffer.getCall(3)).toCalledWith(frameBufferList.getChild(3))

                        expect(frameBufferOperator.bindFrameBuffer.callCount).toEqual(6);
                        expect(frameBufferOperator.setViewport.callCount).toEqual(6);
                    });

                    describe("render renderTargetTexture's renderList", function(){
                        describe("optimize: if need create camera, create camera", function(){
                            var position;

                            beforeEach(function(){
                            });

                            it("if never create camera, create it", function(){
                                self.renderTargetRenderer.render(renderer, camera);

                                expect(self.renderTargetRenderer.createCamera.callCount).toEqual(6);
                            });

                            describe("else", function(){
                                it("if getPosition()->returnVal === last position, not create camera", function () {
                                    position = wd.Vector3.create(1, 2, 3);
                                    self.sandbox.stub(self.renderTargetRenderer, "getPosition").returns(position);

                                    var renderCamera = {};
                                    self.renderTargetRenderer.createCamera.returns(renderCamera);
                                    self.renderTargetRenderer.render(renderer, camera);
                                    //not create camera
                                    self.renderTargetRenderer.render(renderer, camera);

                                    expect(self.renderTargetRenderer.createCamera.callCount).toEqual(6);
                                });
                                it("else, create camera", function(){
                                    position = wd.Vector3.create(1, 2, 3);
                                    var position2 = wd.Vector3.create(2,3,4);
                                    self.sandbox.stub(self.renderTargetRenderer, "getPosition");
                                    self.renderTargetRenderer.getPosition.onCall(0).returns(position);
                                    self.renderTargetRenderer.getPosition.onCall(1).returns(position2);

                                    self.renderTargetRenderer.render(renderer, camera);
                                    self.renderTargetRenderer.render(renderer, camera);

                                    expect(self.renderTargetRenderer.createCamera.callCount).toEqual(12);
                                });
                            });
                        });

                        describe("render correspond face's renderList with face's camera", function(){
                            it("", function(){
                                var renderCamera = {};
                                self.renderTargetRenderer.createCamera.onCall(1).returns(renderCamera);

                                self.renderTargetRenderer.render(renderer, camera);

                                expect(renderObj1.render).toCalledBefore(renderObj2.render);
                                expect(renderObj2.render).toCalledBefore(renderObj3.render);
                                expect(renderObj3.render).toCalledBefore(renderObj4.render);
                                expect(renderObj4.render).toCalledBefore(renderObj5.render);
                                expect(renderObj5.render).toCalledBefore(renderObj6.render);

                                expect(renderObj2.render).toCalledWith(renderer, renderCamera);
                            })
                        });
                    });

                    it("invoke renderer's clear method", function(){
                        self.renderTargetRenderer.render(renderer, camera);

                        expect(renderer.clear.callCount).toEqual(6);
                    });
                    it("invoke renderer's render method", function(){
                        self.renderTargetRenderer.render(renderer, camera);

                        expect(renderer.render.callCount).toEqual(6);
                    });
                });
                
                describe("if need create camera", function(){
                    var position, position2;

                    beforeEach(function(){
                        position = wd.Vector3.create(1, 2, 3);
                        position2 = wd.Vector3.create(2, 3, 4);
                        self.sandbox.stub(self.renderTargetRenderer, "getPosition");
                        self.renderTargetRenderer.getPosition.onCall(0).returns(position);
                        self.renderTargetRenderer.getPosition.onCall(1).returns(position2);
                    });
                    
                    it("dispose cameras created before", function(){
                        self.renderTargetRenderer.render(renderer, camera);
                        self.renderTargetRenderer.render(renderer, camera);

                        expect(camera.dispose.callCount).toEqual(6);
                    });
                });

                it("unbind frameBuffer and restore viewport", function(){
                    self.renderTargetRenderer.render(renderer, camera);

                    expect(frameBufferOperator.unBindFrameBuffer).toCalledBefore(frameBufferOperator.restoreViewport);
                    expect(frameBufferOperator.unBindFrameBuffer).toCalledOnce();
                    expect(frameBufferOperator.restoreViewport).toCalledOnce();
                });

                testTool.multiIt(self.render.after_render_six_faces, function(){
                    return [renderer, camera];
                });
            });

            describe("create camera", function(){
                var position;

                function createCameraLookAt(centerX, centerY, centerZ, upX, upY, upZ){
                    var camera = wd.GameObject.create();

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
                    position = wd.Vector3.create(10,10,10);








                    self.createCamera_beforeEach(self, position);

                });

                it("set cameraComponent", function(){
                    var firstCallCamera = self.renderTargetRenderer.createCamera(0);
                    var firstCallCameraCompoment = firstCallCamera.getComponent(wd.CameraController).camera;
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

                    var firstCallCameraCompoment = firstCallCamera.getComponent(wd.CameraController).camera;
                    expect(testTool.getValues(firstCallCameraCompoment.pMatrix.values)).toEqual(
                        [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1.020202, -1, 0, 0, -0.2020202, 0 ]
                    );
                })
            });
        }
    }
});


