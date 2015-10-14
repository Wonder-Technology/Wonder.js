describe("CubemapShadowRenderTargetRenderer", function() {
    var tool = new CubemapRenderTargetTool();

    var self = tool;

    tool.RenderTargetRenderer = dy.CubemapShadowMapRenderTargetRenderer;



    tool.init_body = function(self) {
        it("clear cubemap shadow data when endLoop", function () {
            self.renderTargetRenderer._shadowMapRendererUtils = {
                clearCubemapShadowMapData: self.sandbox.stub()
            };
            var renderObj1 = {};
            var renderObj2 = {};
            var renderObj3 = {};
            var renderObj4 = {};
            var renderObj5 = {};
            var renderObj6 = {};


            var list1 = [renderObj1];
            var list2 = [renderObj2];
            var list3 = [renderObj3];
            var list4 = [renderObj4];
            var list5 = [renderObj5];
            var list6 = [renderObj6];

            self.renderTargetRenderer._light = {
                shadowRenderList: dyCb.Hash.create({
                    px: list1,
                    nx: list2,
                    py: list3,
                    ny: list4,
                    pz: list5,
                    nz: list6
                })

            };
            dy.EventManager.trigger(dy.CustomEvent.create("dy_endLoop"));

            expect(self.renderTargetRenderer._shadowMapRendererUtils.clearCubemapShadowMapData.callCount).toEqual(6);
        });
    };



    tool.initWhenCreate_beforeEach = function(){
        self.sandbox.stub(dy.CubemapShadowMapRenderTargetRendererUtils, "create");
    }



    tool.initWhenCreate_body = [
        {
            explain: "create CubemapShadowMapRenderTargetRendererUtils instance",
            body: function(texture){
                self.renderTargetRenderer.initWhenCreate();

                expect(dy.CubemapShadowMapRenderTargetRendererUtils.create).toCalledOnce();
            }
    },
        {
            explain: "if texture size is exceed canvas size, not warn",
            body: function(texture){
                texture.width = 100;
                texture.height = 200;
                self.sandbox.stub(dyCb.Log, "warn");
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

                expect(dyCb.Log.warn).not.toCalled();
            }
        }
    ]


    tool.render = (function(){
        var light;
        var utils;
        var stage;


        return {
            beforeEach:function(self, list1, list2, list3, list4, list5, list6){
                light = {
                    shadowRenderList: dyCb.Hash.create({
                        px:list1,
                        nx:list2,
                        py:list3,
                        ny:list4,
                        pz:list5,
                        nz:list6
                    })
                };
                self.renderTargetRenderer._light = light;



                utils = {}
                self.renderTargetRenderer._shadowMapRendererUtils = utils;

                utils.setShadowMapData = self.sandbox.stub();

                stage = {
                    createShaderOnlyOnce: self.sandbox.stub(),
                    useProgram: self.sandbox.stub(),
                    unUseProgram: self.sandbox.stub()
                };

                self.sandbox.stub(dy.Director.getInstance(), "stage", stage);
            },
            pre_render_six_faces: [
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
                        explain: "set Stage's shader to be BuildCubemapShadowMapShaderLib",
                        body: function(list1, renderObj1, renderer, camera){
                            self.renderTargetRenderer.render(renderer, camera);

                            expect(stage.createShaderOnlyOnce).toCalledWith(sinon.match.instanceOf(dy.BuildCubemapShadowMapShaderLib));

                        }
                    },
                    {
                        explain: "use Stage's program",
                        body: function(list1, renderObj1, renderer, camera){
                            self.renderTargetRenderer.render(renderer, camera);

                            expect(stage.useProgram).toCalledOnce();

                        }
                    }
                ],
            render_six_faces: [
                    {
                        explain: "if face's renderList is empty, not render the face",
                        body:function(list6, renderObj1, renderObj2, renderObj6, renderer, camera){
                            light.shadowRenderList = dyCb.Hash.create({
                                nx:[],
                                nz:list6
                            });

                            self.renderTargetRenderer.render(renderer, camera);

                            expect(renderObj1.render).not.toCalled();
                            expect(renderObj2.render).not.toCalled();
                            expect(renderObj6.render).toCalledOnce();
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
