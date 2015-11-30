describe("DynamicCubemapRenderTargetRenderer", function() {
    var tool = new CubemapRenderTargetTool();

    var self = tool;

    tool.RenderTargetRenderer = dy.DynamicCubemapRenderTargetRenderer;


    tool.initWhenCreate_body = [
        {
            body: function(texture){
                texture.width = 100;
                texture.height = 200;
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
            }
        }
    ]


    tool.render = (function(){
        return {
            beforeEach:function(self, list1, list2, list3, list4, list5, list6, texture){
                texture.renderList = wdCb.Hash.create({
                    px:list1,
                    nx:list2,
                    py:list3,
                    ny:list4,
                    pz:list5,
                    nz:list6
                })
            },
            render_six_faces: [
                {
                    explain: "if face's renderList is empty, not render the face",
                    body:function(list6, renderObj1, renderObj2, renderObj6, renderer, camera, texture){
                        texture.renderList = wdCb.Hash.create({
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
        var texture = {
            getPosition: self.sandbox.stub().returns(position),
            near: 0.1,
            far: 10
        };
        self.renderTargetRenderer.texture = texture;
    }




    tool.test();
});
