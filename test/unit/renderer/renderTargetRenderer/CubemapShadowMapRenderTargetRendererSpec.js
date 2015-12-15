describe("CubemapShadowRenderTargetRenderer", function() {
    var tool = new CubemapRenderTargetTool();

    var self = tool;

    tool.RenderTargetRenderer = wd.CubemapShadowMapRenderTargetRenderer;

tool.init_beforeEach = function(self){
    self.renderTargetRenderer._shadowMapRendererUtils = new wd.CubemapShadowMapRenderTargetRendererUtils();
}

    tool.init_body = function(self) {
        it("clear cubemap shadow data when endLoop", function () {
            function createRenderObj(){
                return prepareTool.createBox();
            }


            self.sandbox.stub(self.renderTargetRenderer._shadowMapRendererUtils, "clearCubemapShadowMapData");
            var renderObj1 = createRenderObj();
            var renderObj2 = createRenderObj();
            var renderObj3 = createRenderObj();
            var renderObj4 = createRenderObj();
            var renderObj5 = createRenderObj();
            var renderObj6 = createRenderObj();


            var list1 = [renderObj1];
            var list2 = [renderObj2];
            var list3 = [renderObj3];
            var list4 = [renderObj4];
            var list5 = [renderObj5];
            var list6 = [renderObj6];

            self.renderTargetRenderer._light = {
                shadowRenderList: wdCb.Hash.create({
                    px: wdCb.Collection.create(list1),
                    nx: wdCb.Collection.create(list2),
                    py: wdCb.Collection.create(list3),
                    ny: wdCb.Collection.create(list4),
                    pz: wdCb.Collection.create(list5),
                    nz: wdCb.Collection.create(list6)
                })

            };


            self.renderTargetRenderer.init();

            wd.EventManager.trigger(wd.CustomEvent.create("dy_endLoop"));

            expect(self.renderTargetRenderer._shadowMapRendererUtils.clearCubemapShadowMapData.callCount).toEqual(6);
        });
        it("create shader with BuildCubemapShadowMapShaderLib", function () {
            self.sandbox.stub(self.renderTargetRenderer._shadowMapRendererUtils, "createShaderWithShaderLib");

            self.renderTargetRenderer._light = {
                shadowRenderList: wdCb.Collection.create()

            };

            self.renderTargetRenderer.init();

            expect(self.renderTargetRenderer._shadowMapRendererUtils.createShaderWithShaderLib).toCalledWith(sinon.match.instanceOf(wd.BuildCubemapShadowMapShaderLib));
        });
    };



    tool.initWhenCreate_beforeEach = function(){
        self.sandbox.stub(wd
.CubemapShadowMapRenderTargetRendererUtils, "create");
    }



    tool.initWhenCreate_body = [
        {
            explain: "create CubemapShadowMapRenderTargetRendererUtils instance",
            body: function(texture){
                self.renderTargetRenderer.initWhenCreate();

                expect(wd.CubemapShadowMapRenderTargetRendererUtils.create).toCalledOnce();
            }
    },
        {
            explain: "if texture size is exceed canvas size, not warn",
            body: function(texture){
                texture.width = 100;
                texture.height = 200;
                self.sandbox.stub(wd.Log, "warn");
                self.sandbox.stub(wd.DeviceManager.getInstance(), "view", {
                    width: 101,
                    height:100
                });

                self.renderTargetRenderer.initWhenCreate();

                self.sandbox.stub(wd.DeviceManager.getInstance(), "view", {
                    width: 99,
                    height:201
                });

                self.renderTargetRenderer.initWhenCreate();

                expect(wd.Log.warn).not.toCalled();
            }
        }
    ]


    tool.render = (function(){
        var light;
        var utils;
        var scene;


        return {
            beforeEach:function(self, list1, list2, list3, list4, list5, list6){
                light = {
                    shadowRenderList: wdCb.Hash.create({
                        px:wdCb.Collection.create(list1),
                        nx:wdCb.Collection.create(list2),
                        py:wdCb.Collection.create(list3),
                        ny:wdCb.Collection.create(list4),
                        pz:wdCb.Collection.create(list5),
                        nz:wdCb.Collection.create(list6)
                    })
                };
                self.renderTargetRenderer._light = light;


                utils = self.sandbox.createStubObj("setShadowMapData", "beforeRender", "afterRender");

                self.renderTargetRenderer._shadowMapRendererUtils = utils;
            },
            before_render_six_faces: [
                    {
                        explain: "set shadow map data",
                        body:
                            [
                                {
                                    explain:"one item only set data once",
                                    body: function(list1, renderObj1){
                                        it("one item only set data once", function(){
                                            list1[1] = renderObj1;

                                            self.renderTargetRenderer.render(renderer, camera);

                                            expect(utils.setShadowMapData.callCount).toEqual(6);
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
            render_six_faces: [
                    {
                        explain: "if face's renderList is empty, not render the face",
                        body:function(list6, renderObj1, renderObj2, renderObj6, renderer, camera){
                            light.shadowRenderList = wdCb.Hash.create({
                                nx:wdCb.Collection.create(),
                                nz:wdCb.Collection.create(list6)
                            });

                            self.renderTargetRenderer.render(renderer, camera);

                            expect(renderObj1.render).not.toCalled();
                            expect(renderObj2.render).not.toCalled();
                            expect(renderObj6.render).toCalledOnce();
                        }
                    }
                ],
            after_render_six_faces:[
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




    tool.createCamera_beforeEach = function(self, position){
        var light = {
            position: position,
            shadowMapWidth: 10,
            shadowMapHeight: 10,
            shadowCameraNear: 0.1,
            shadowCameraFar: 10
        };
        self.renderTargetRenderer._light = light;
    }




    tool.test();
});
