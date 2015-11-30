describe("MirrorRenderTargetRenderer", function () {
    var tool = new TwoDRenderTargetTool();
    var self = tool;

    tool.RenderTargetRenderer = wd.MirrorRenderTargetRenderer;


    tool.initWhenCreate_body = [
        {
            body: function (texture) {
                texture.width = 100;
                texture.height = 200;
                self.sandbox.stub(wd.DeviceManager.getInstance(), "view", {
                    width: 101,
                    height: 100
                });

                self.renderTargetRenderer.initWhenCreate();

                self.sandbox.stub(wd.DeviceManager.getInstance(), "view", {
                    width: 99,
                    height: 201
                });

                self.renderTargetRenderer.initWhenCreate();
            }
        }
    ]


    tool.render = (function () {
        var plane;

        return {
            beforeEach: function (self, renderObj1, renderObj2, renderTargetTexture) {

                plane = {
                    getReflectionMatrix: self.sandbox.stub().returns(wd.Matrix4.create())
                };
                renderTargetTexture.getPlane = self.sandbox.stub().returns(plane);

                renderTargetTexture.renderList = wdCb.Collection.create([renderObj1, renderObj2])
            },
            before_render: null,
            invoke_renderer_render: [
                {
                    explain: "1.set Scene's side to be FRONT, 2.invoke renderer's render method, 3.not use Scene's side",
                    body: function (renderer, camera, renderObj1, renderObj2) {
                        self.sandbox.stub(self.renderTargetRenderer, "_setSceneSide");

                        self.renderTargetRenderer.render(renderer, camera);

                        expect(self.renderTargetRenderer._setSceneSide.firstCall).toCalledWith(wd.Side.BACK);
                        expect(self.renderTargetRenderer._setSceneSide.secondCall).toCalledWith(null);
                        expect(renderer.render).toCalledOnce();
                        expect(renderer.render).toCalledAfter(renderObj2.render);
                    }
                }
            ],
            after_render: null
        }
    }());


    tool.test();



    describe("create camera", function(){
        var camera,cameraComponent;
        var texture;
        var plane;

        beforeEach(function(){
            cameraComponent = {
                worldToCameraMatrix: wd.Matrix4.create().rotate(45, 0, 1, 0),
                pMatrix: wd.Matrix4.create()
            };
            camera = wd.GameObject.create();
            camera.addComponent(wd.BasicCameraController.create(cameraComponent));
            //camera = {
            //    getComponent: self.sandbox.stub().returns(cameraComponent)
            //};

            self.sandbox.stub(self.renderTargetRenderer, "_setClipPlane").returns(cameraComponent.pMatrix);

            plane = {
                getReflectionMatrix:self.sandbox.stub().returns(wd.Matrix4.create())
            }

            texture = {
                getPlane:self.sandbox.stub().returns(plane)
            }

            self.renderTargetRenderer.texture = texture;

        });

        it("set clip plane(viewMatrix is reflectionMatrix * worldToCameraMatrix)", function(){
            self.renderTargetRenderer.createCamera(camera);

            expect(self.renderTargetRenderer._setClipPlane).toCalledWith(plane.getReflectionMatrix().applyMatrix(cameraComponent.worldToCameraMatrix), cameraComponent.pMatrix, plane);
        });
        it("init camera(not updateProjectionMatrix)", function(){
            var firstCallCamera = self.renderTargetRenderer.createCamera(camera);
            var firstCallCameraCompoment = firstCallCamera.getComponent(wd.CameraController).camera;

            expect(testTool.getValues(firstCallCameraCompoment.pMatrix.values)).toEqual(

                testTool.getValues(
                    cameraComponent.pMatrix.values
                )
            );
        })
    });
});

