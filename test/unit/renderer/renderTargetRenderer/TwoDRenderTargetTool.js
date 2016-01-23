var TwoDRenderTargetTool = YYC.Class({
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

                gl = wd.DeviceManager.getInstance().gl;
            });
            afterEach(function () {
                wd.EventManager.off();
                testTool.clearInstance();
                self.sandbox.restore();
            });

            describe("initWhenCreate", function(){
                var texture;

                beforeEach(function(){
                    texture = {};
                    self.renderTargetRenderer.texture = texture;

                    self.sandbox.stub(wd.DeviceManager.getInstance(), "view", {
                    });

                    self.initWhenCreate_beforeEach();
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
                var frameBufferOperator,frameBuffer,renderBuffer, glTexture, texture;

                beforeEach(function(){
                    var light = shadowTool.createDirectionLight([prepareTool.createBox()]).getComponent(wd.DirectionLight);

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
                        unBind: self.sandbox.stub()
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

                it("attach texture", function(){
                    self.renderTargetRenderer.init();

                    expect(frameBufferOperator.attachTexture).toCalledWith(gl.TEXTURE_2D, glTexture);
                });
                it("attach render buffer", function(){
                    self.renderTargetRenderer.init();

                    expect(frameBufferOperator.attachRenderBuffer).toCalledWith("DEPTH_ATTACHMENT", renderBuffer);
                });
                it("check frame buffer", function(){
                    self.renderTargetRenderer.init();

                    expect(frameBufferOperator.check).toCalledOnce();
                });
;

                it("unBind frame buffer", function(){
                    self.renderTargetRenderer.init();

                    expect(frameBufferOperator.unBind).toCalledOnce();
                });
            });

            describe("render", function(){
                    var renderer,camera,renderCamera, frameBufferOperator,renderObj1, renderObj2,texture;




                beforeEach(function(){
                            renderObj1 = {
                                render: self.sandbox.stub()
                            };
                            renderObj2 = {
                                render: self.sandbox.stub()
                            };

                            frameBufferOperator = {
                                bindFrameBuffer: self.sandbox.stub(),
                                setViewport: self.sandbox.stub(),
                                unBind: self.sandbox.stub(),
                                restoreViewport: self.sandbox.stub()
                            };


                            self.renderTargetRenderer.frameBufferOperator = frameBufferOperator;


                    texture = {
                        bindToUnit: self.sandbox.stub()
                    };

                    self.renderTargetRenderer.texture = texture;


                            renderer = {
                                render: self.sandbox.stub()
                            };

                    self.render.beforeEach(self, renderObj1, renderObj2, texture);






renderCamera = {};

                    self.renderTargetRenderer.createCamera = self.sandbox.stub().returns(renderCamera);
                });



                testTool.multiIt(self.render.before_render, function(){
                    return [renderObj1, renderObj2, renderer, camera];
                });

                it("bind texture", function(){
                    self.renderTargetRenderer.render(renderer, camera);

                    expect(texture.bindToUnit).toCalledWith(0);
                });

                it("dispose camera created before", function(){
                    var camera1 = {
                        dispose:self.sandbox.stub()
                    };
                    var camera2 = {
                    }
                    self.renderTargetRenderer.createCamera.onCall(0).returns(camera1);
                    self.renderTargetRenderer.createCamera.onCall(1).returns(camera2);

                    self.renderTargetRenderer.render(renderer, camera);
                    self.renderTargetRenderer.render(renderer, camera);

                    expect(camera1.dispose).toCalledOnce();
                });
                it("bind frameBuffer and set viewport", function(){
                    self.renderTargetRenderer.render(renderer, camera);

                    expect(frameBufferOperator.bindFrameBuffer).toCalledBefore(frameBufferOperator.setViewport);
                    expect(frameBufferOperator.bindFrameBuffer).toCalledWith(self.renderTargetRenderer.frameBuffer);
                });
                it("render renderTargetTexture's renderList", function(){
                    self.renderTargetRenderer.render(renderer, camera);

                    expect(renderObj1.render).toCalledWith(renderer, renderCamera);
                    expect(renderObj2.render).toCalledWith(renderer, renderCamera);
                    expect(renderObj1.render).toCalledBefore(renderObj2.render);
                });

                testTool.multiIt(self.render.invoke_renderer_render, function(){
                    return [renderer, camera, renderObj1, renderObj2];
                });




                testTool.multiIt(self.render.after_render, function(){
                    return [renderer, camera];
                });



                it("unbind frameBuffer and restore viewport", function(){
                    self.renderTargetRenderer.render(renderer, camera);

                    expect(frameBufferOperator.unBind).toCalledBefore(frameBufferOperator.restoreViewport);
                });
            });
        }
    }
});


