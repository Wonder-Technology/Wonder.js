describe("TwoDShadowMapRenderTargetRenderer", function() {
    var tool = new TwoDRenderTargetTool();
    var self = tool;

    tool.RenderTargetRenderer = dy.TwoDShadowMapRenderTargetRenderer;


    tool.initWhenCreate_beforeEach = function(){
        self.sandbox.stub(dy.TwoDShadowMapRenderTargetRendererUtils, "create");
    };


    tool.initWhenCreate_body = [
        {
            explain: "create TwoDShadowMapRenderTargetRendererUtils instance",
            body: function(texture){
                self.renderTargetRenderer.initWhenCreate();

                expect(dy.TwoDShadowMapRenderTargetRendererUtils.create).toCalledOnce();
            }
        },
        {
            explain: "if texture size is exceed canvas size, not warn",
            body: function(texture){
                texture.width = 100;
                texture.height = 200;
                self.sandbox.stub(dy.Log, "warn");
                self.sandbox.stub(dy.DeviceManager.getInstance(), "view", {
                    width: 101,
                    height:100
                });

                self.renderTargetRenderer.initWhenCreate();

                self.sandbox.stub(dy.DeviceManager.getInstance(), "view", {
                    width: 99,
                    height:201
                });

                self.renderTargetRenderer.initWhenCreate();

                expect(dy.Log.warn).not.toCalled();
            }
        }
        ]

tool.init_beforeEach = function(self){
    self.renderTargetRenderer._shadowMapRendererUtils = new dy.TwoDShadowMapRenderTargetRendererUtils();
}

    tool.init_body = function(self) {
        it("clear twoD shadow data when endLoop", function () {
            self.sandbox.stub(self.renderTargetRenderer._shadowMapRendererUtils, "clearTwoDShadowMapData");

            var renderObj1 = {};
            var renderObj2 = {};
            var renderObj3 = {};
            var renderObj4 = {};
            var renderObj5 = {};
            var renderObj6 = {};


            self.renderTargetRenderer._light = {
                shadowRenderList: dyCb.Collection.create([renderObj1, renderObj2, renderObj3, renderObj4, renderObj5, renderObj6])

            };

            self.renderTargetRenderer.init();

            dy.EventManager.trigger(dy.CustomEvent.create("dy_endLoop"));

            expect(self.renderTargetRenderer._shadowMapRendererUtils.clearTwoDShadowMapData.callCount).toEqual(6);
        });
        it("create shader with BuildTwoDShadowMapShaderLib", function () {
            self.sandbox.stub(self.renderTargetRenderer._shadowMapRendererUtils, "createShaderWithShaderLib");

            self.renderTargetRenderer._light = {
                shadowRenderList: dyCb.Collection.create()

            };

            self.renderTargetRenderer.init();

            expect(self.renderTargetRenderer._shadowMapRendererUtils.createShaderWithShaderLib).toCalledWith(sinon.match.instanceOf(dy.BuildTwoDShadowMapShaderLib));
        });
    };


    tool.render = (function(){
        var light;
        var utils;
        var scene;


        return {
            beforeEach:function(self, renderObj1, renderObj2){
                light = {
                    shadowRenderList: dyCb.Collection.create([renderObj1, renderObj2])
                };
                self.renderTargetRenderer._light = light;


                utils = self.sandbox.createStubObj("setShadowMapData", "beforeRender", "afterRender");

                self.renderTargetRenderer._shadowMapRendererUtils = utils;

            },
            before_render: [
                {
                    explain: "set shadow map data",
                    body:
                        [
                            {
                                explain:"one item only set data once",
                                body: function(renderObj1, renderObj2){
                                    it("one item only set data once", function(){
                                        list1[1] = renderObj1;

                                        light = {
                                            shadowRenderList: dyCb.Collection.create([renderObj1, renderObj2, renderObj2])
                                        };



                                        self.renderTargetRenderer.render(renderer, camera);

                                        expect(utils.setShadowMapData.callCount).toEqual(2);
                                    });
                                }
                            }
                        ]
                },
                {
                    explain: "invoke shadowMap utils's beforeRender",
                    body: function(list1, renderObj1, renderer, camera){
                        self.renderTargetRenderer.render(renderer, camera);

                        expect(utils.beforeRender).toCalledOnce();
                    }
                }
            ],
            invoke_renderer_render: [
                {
                    explain: "invoke renderer's render method",
                    body: function (renderer, camera, renderObj1, renderObj2) {
                        self.renderTargetRenderer.render(renderer, camera);
                        expect(renderer.render).toCalledOnce();
                    }
                }
            ],
            after_render:[
                {
                    explain: "invoke shadowMap utils's afterRender",
                    body: function(renderer, camera){
                        self.renderTargetRenderer.render(renderer, camera);

                        expect(utils.afterRender).toCalledOnce();
                    }
                }
            ]
        }
    }());



    tool.test();




    describe("create camera", function(){
        var camera,cameraComponent;
        var texture;
        var plane;

        var light;

        beforeEach(function(){
            //cameraComponent = {
            //    worldToCameraMatrix: dy.Matrix4.create().rotate(45, 0, 1, 0),
            //    pMatrix: dy.Matrix4.create()
            //};
            //camera = {
            //    getComponent: self.sandbox.stub().returns(cameraComponent)
            //};
            //
            //self.sandbox.stub(self.renderTargetRenderer, "_setClipPlane").returns(cameraComponent.pMatrix);
            //
            //plane = {
            //    getReflectionMatrix:self.sandbox.stub().returns(dy.Matrix4.create())
            //}
            //
            //texture = {
            //    getPlane:self.sandbox.stub().returns(plane)
            //}
            //
            //self.renderTargetRenderer.texture = texture;

            light = {
                shadowCameraLeft:-10,
                shadowCameraRight: 10,
                shadowCameraTop: 20,
                shadowCameraBottom: -20,
                shadowCameraNear: 0.1,
                shadowCameraFar: 50,
                position: dy.Vector3.create(10, 20, 30)
            }

            self.renderTargetRenderer._light = light;

        });

        it("create Ortho camera", function(){
            expect(self.renderTargetRenderer.createCamera().getComponent(dy.Camera)).toBeInstanceOf(dy.OrthographicCamera);
        });
        it("set camera component", function(){
            var cameraComponent = self.renderTargetRenderer.createCamera().getComponent(dy.Camera);

            expect(cameraComponent.left).toEqual(light.shadowCameraLeft);
            expect(cameraComponent.right).toEqual(light.shadowCameraRight);
            expect(cameraComponent.top).toEqual(light.shadowCameraTop);
            expect(cameraComponent.bottom).toEqual(light.shadowCameraBottom);
            expect(cameraComponent.near).toEqual(light.shadowCameraNear);
            expect(cameraComponent.far).toEqual(light.shadowCameraFar);
        });
        it("move to light's position, lookAt zero point", function(){
            var camera = self.renderTargetRenderer.createCamera();
            var transform = dy.Transform.create().translate(light.position).lookAt(0, 0, 0);

            expect(camera.transform.position).toEqual(transform.position);
            expect(camera.transform.rotation).toEqual(
                transform.rotation
            )
        });
        it("init camera", function(){
            var firstCallCamera = self.renderTargetRenderer.createCamera(camera);
            var firstCallCameraCompoment = firstCallCamera.getComponent(dy.Camera);

            expect(testTool.getValues(firstCallCameraCompoment.pMatrix.values)).toEqual(
                    [ 0.1, 0, 0, 0, 0, 0.05, 0, 0, 0, 0, -0.0400802, 0, 0, 0, -1.0040081, 1 ]
            );
        })
    });
});

