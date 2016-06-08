describe("GameObjectScene", function() {
    var sandbox = null;
    var scene = null;
    var GameObjectScene = null;
    var gameObject1,
        gameObject2,
        gameObject3;
    var script1,
        script2,
        script3,
        script4;

    function buildScript(){
        return {
            init: sandbox.stub(),
            onEnter:sandbox.stub(),
            onExit: sandbox.stub(),
            update: sandbox.stub()
        }
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        GameObjectScene = wd.GameObjectScene;
        scene = GameObjectScene.create();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("currentCamera", function(){
        var camera1, camera2;

        beforeEach(function(){
            camera1 = testTool.createCamera();
            camera2 = testTool.createCamera();
        });

        describe("getter", function(){
            it("if already set it, return the setted one", function () {
                scene.currentCamera = camera1;

                expect(scene.currentCamera).toEqual(camera1);
            });
            it("else, defaultly return the first camera of the added cameras", function(){
                scene.addChild(camera1);
                scene.addChild(camera2);

                expect(scene.currentCamera).toEqual(camera1);
            });
        });

        describe("setter", function(){
            it("if param is number, set it to be the index of added cameras", function(){
                scene.addChild(camera1);
                scene.addChild(camera2);

                scene.currentCamera = 1;

                expect(scene.currentCamera).toEqual(camera2);
            });
            it("else if param is GameObject, set it to be that", function () {
                scene.currentCamera = camera2;

                expect(scene.currentCamera).toEqual(camera2);
            });

        });
    });

    describe("addChild", function(){
        beforeEach(function(){
        });

        describe("add camera object", function(){
            beforeEach(function(){
            });

            it("if gameObject or its children has CameraController component,  add it to GameObjectScene->_cameraList", function(){
                var cameraObject1 = testTool.createCamera();
                var cameraObject2 = testTool.createCamera();
                var cameraObject3 = testTool.createCamera();
                var cameraObject4 = testTool.createCamera();

                cameraObject3.addChild(cameraObject4);

                var gameObject = wd.GameObject.create();
                gameObject.addChildren([cameraObject2, cameraObject3]);





                scene.addChild(gameObject);
                scene.addChild(cameraObject1);





                var cameraList = scene._cameraList;

                expect(cameraList.getCount()).toEqual(4);
                expect(cameraList.getChildren()).toEqual([cameraObject2, cameraObject3, cameraObject4, cameraObject1]);
            });
        });

        describe("add light object", function(){
            function createLight(){
                var obj = wd.GameObject.create();

                obj.addComponent(wd.PointLight.create());
                obj.addComponent(wd.MeshRenderer.create());

                return obj;
            }

            beforeEach(function(){
            });

            it("if gameObject or its children has Light component,  add it to GameObjectScene->_lightManager", function(){
                var lightObject1 = createLight();
                var lightObject2 = createLight();
                var lightObject3 = createLight();
                var lightObject4 = createLight();

                lightObject3.addChild(lightObject4);

                var gameObject = wd.GameObject.create();
                gameObject.addChildren([lightObject2, lightObject3]);





                scene.addChild(gameObject);
                scene.addChild(lightObject1);





                var lightManager = scene._lightManager;

                expect(lightManager.pointLights.getCount()).toEqual(4);
                expect(lightManager.pointLights.getChildren()).toEqual([lightObject2, lightObject3, lightObject4, lightObject1]);
            });
        });
    });

    describe("test with child", function() {
        beforeEach(function () {
            gameObject1 = wd.GameObject.create();
            gameObject2 = wd.GameObject.create();
            gameObject3 = wd.GameObject.create();

            gameObject2.addChild(gameObject1);

            scene.addChild(gameObject2);
            scene.addChild(gameObject3);

            script1 = buildScript();
            script2 = buildScript();
            script3 = buildScript();
            script4 = buildScript();

            prepareTool.addScript(scene, script1, "customScript1");
            prepareTool.addScript(gameObject1, script2, "customScript2");
            prepareTool.addScript(gameObject2, script3, "customScript3");
            prepareTool.addScript(gameObject3, script4, "customScript4");

            sandbox.stub(gameObject1, "onStartLoop");
            sandbox.stub(gameObject2, "onStartLoop");
            sandbox.stub(gameObject3, "onStartLoop");
            sandbox.stub(gameObject1, "onEndLoop");
            sandbox.stub(gameObject2, "onEndLoop");
            sandbox.stub(gameObject3, "onEndLoop");
            sandbox.stub(gameObject1, "onExit");
            sandbox.stub(gameObject2, "onExit");
            sandbox.stub(gameObject3, "onExit");
        });

        describe("GameObjectScene->init", function () {
            beforeEach(function () {
            });

            it("bind global hook", function () {
                scene.init();

                wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.STARTLOOP));
                wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.ENDLOOP));

                expect(gameObject1.onStartLoop).toCalledOnce();
                expect(gameObject2.onStartLoop).toCalledOnce();
                expect(gameObject3.onStartLoop).toCalledOnce();
                expect(gameObject1.onEndLoop).toCalledOnce();
                expect(gameObject2.onEndLoop).toCalledOnce();
                expect(gameObject3.onEndLoop).toCalledOnce();
            });
            it("invoke components' init", function () {
                var geometry = new wd.BoxGeometry();
                var material = wd.BasicMaterial.create();
                geometry.material = material;

                sandbox.spy(geometry, "init");
                sandbox.spy(material, "init");
                sandbox.stub(material.shader, "init");
                scene.addComponent(geometry);

                scene.init();

                expect(geometry.init).toCalledOnce();
                expect(material.init).toCalledOnce();
                expect(material.shader.init).toCalledOnce();
            });
        });

        describe("GameObjectScene->update", function(){
            var elapsedTime;
            var action1,
                action2,
                action3,
                action4,
                action5;

            function buildAction(){
                var action = new wd.Repeat(new wd.CallFunc(), 10);

                sandbox.stub(action, "update");

                return action;
            }

            beforeEach(function(){
                elapsedTime = 100;
                action1 = buildAction();
                action2 = buildAction();
                action3 = buildAction();
                action4 = buildAction();
                action5 = buildAction();

                //sandbox.stub(scene.actionEngine, "update");
            });

            it("if enable physics, update phsics engine adapter", function () {
                scene.physics.enable = true;
                scene.init();
                sandbox.stub(scene.physicsEngineAdapter, "update");

                scene.update(elapsedTime);

                expect(scene.physicsEngineAdapter.update).toCalledWith(elapsedTime);
            });
            it("if currentCamera component exist, update it", function () {
                var camera1 = testTool.createCamera(),
                    camera2 = testTool.createCamera();
                sandbox.stub(camera1.getComponent(wd.CameraController), "update");
                sandbox.stub(camera2.getComponent(wd.CameraController), "update");
                scene.addChildren([camera1, camera2]);
                scene.currentCamera = camera2;

                scene.update(elapsedTime);

                expect(camera1.getComponent(wd.CameraController).update).not.toCalled();
                expect(camera2.getComponent(wd.CameraController).update).toCalledOnce();
            });
            //it("invoke scene's and it's children's all action->update", function(){
            //    scene.addComponent(action1);
            //    gameObject1.addComponent(action2);
            //    gameObject2.addComponent(action3);
            //    gameObject3.addComponent(action4);
            //    gameObject3.addComponent(action5);
            //    scene.init();
            //
            //    scene.update(elapsedTime);
            //
            //    expect(action1.update).toCalledWith(elapsedTime);
            //    expect(action1.update).toCalledOnce();
            //    //expect(action1.update).toCalledBefore(scene.actionEngine.update);
            //    expect(action1.update).toCalledBefore(action3.update);
            //    expect(action3.update).toCalledWith(elapsedTime);
            //    expect(action3.update).toCalledOnce();
            //    expect(action3.update).toCalledBefore(action2.update);
            //    expect(action2.update).toCalledWith(elapsedTime);
            //    expect(action2.update).toCalledOnce();
            //    expect(action2.update).toCalledBefore(action4.update);
            //    expect(action4.update).toCalledWith(elapsedTime);
            //    expect(action4.update).toCalledOnce();
            //    expect(action4.update).toCalledBefore(action5.update);
            //    expect(action5.update).toCalledWith(elapsedTime);
            //    expect(action5.update).toCalledOnce();
            //});
            //it("invoke scene and it's children's script->update", function(){
            //    scene.update(elapsedTime);
            //
            //    expect(script1.update).toCalledOnce();
            //    expect(script1.update).toCalledWith(elapsedTime);
            //    expect(script2.update).toCalledOnce();
            //    expect(script3.update).toCalledOnce();
            //    expect(script4.update).toCalledOnce();
            //
            //    expect(script1.update).toCalledBefore(script3.update);
            //    expect(script3.update).toCalledBefore(script2.update);
            //    expect(script2.update).toCalledBefore(script4.update);
            //});
        });
    });

    describe("render", function(){
        var renderer,camera;

        function createProceduralRenderTargetRenderer(textureClass, rendererClass, renderRate){
            textureClass = textureClass || wd.FireProceduralTexture;
            rendererClass = rendererClass || wd.FireProceduralRenderTargetRenderer;

            var texture = textureClass.create();

            if(renderRate !== undefined){
                texture.renderRate = renderRate;
            }

            var renderer = rendererClass.create(texture);

            sandbox.stub(renderer, "render");

            return renderer;
        }

        function createCommonRenderTargetRenderer(renderRate){
            var texture = wd.RefractionTexture.create();

            texture.renderRate = renderRate || 0;
            texture.renderList = wdCb.Collection.create();

            //var renderer = new wd.CommonRenderTargetRenderer();
            var renderer = wd.MirrorRenderTargetRenderer.create(texture);


            sandbox.stub(renderer, "render");

            return renderer;
        }

        beforeEach(function(){
            //sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

            //prepareTool.prepareForMap(sandbox);


            //renderer = wd.WebGLRenderer.create();
            //sandbox.stub(renderer, "render");
            renderer = {};

            camera = wd.GameObject.create();
            scene.currentCamera = camera;
        });

        describe("render proceduralRenderTargetRenderers", function(){
            it("render proceduralRenderTargetRenderer before render common renderTargetRenderer", function () {
                var proceduralRenderTargetRenderer = createProceduralRenderTargetRenderer();

                var commonRenderTargetRenderer = createCommonRenderTargetRenderer();


                scene.renderTargetRendererManager.addProceduralRenderTargetRenderer(proceduralRenderTargetRenderer);
                scene.renderTargetRendererManager.addCommonRenderTargetRenderer(commonRenderTargetRenderer);

                scene.render(renderer);


                expect(proceduralRenderTargetRenderer.render).toCalledBefore(commonRenderTargetRenderer.render);
            });

            it("render FireProceduralRenderTargetRenderer every frame", function () {
                var proceduralRenderTargetRenderer = createProceduralRenderTargetRenderer(wd.FireProceduralTexture, wd.FireProceduralRenderTargetRenderer);


                scene.renderTargetRendererManager.addProceduralRenderTargetRenderer(proceduralRenderTargetRenderer);

                scene.render(renderer);
                scene.render(renderer);


                expect(proceduralRenderTargetRenderer.render).toCalledTwice();
                expect(proceduralRenderTargetRenderer.render).toCalledWith(renderer);
            });
            it("render MarbleProceduralRenderTargetRenderer only once", function () {
                var proceduralRenderTargetRenderer = createProceduralRenderTargetRenderer(wd.MarbleProceduralTexture, wd.MarbleProceduralRenderTargetRenderer);


                scene.renderTargetRendererManager.addProceduralRenderTargetRenderer(proceduralRenderTargetRenderer);

                scene.render(renderer);
                scene.render(renderer);


                expect(proceduralRenderTargetRenderer.render).toCalledOnce();
            });

            describe("CustomProceduralRenderTargetRenderer", function(){
                var proceduralRenderTargetRenderer;

                function run(renderRate){
                    var texture = wd.CustomProceduralTexture.create();
                    texture.renderRate = renderRate;

                    proceduralRenderTargetRenderer = wd.CustomProceduralRenderTargetRenderer.create(texture);
                    sandbox.stub(proceduralRenderTargetRenderer, "render");

                    scene.renderTargetRendererManager.addProceduralRenderTargetRenderer(proceduralRenderTargetRenderer);



                    scene.render(renderer);
                    scene.render(renderer);
                }

                beforeEach(function(){
                });

                it("if renderRate === 1, render on every frame", function(){
                    run(1);

                    expect(proceduralRenderTargetRenderer.render).toCalledTwice();
                });
                it("if renderRate === 0, render only once", function () {
                    run(0);

                    expect(proceduralRenderTargetRenderer.render).toCalledOnce();
                });
            });
        });

        it("render renderTargetRenderers", function(){
            var renderTargetRenderer = createCommonRenderTargetRenderer();
            scene.renderTargetRendererManager.addCommonRenderTargetRenderer(renderTargetRenderer);

            scene.render(renderer);

            expect(renderTargetRenderer.render).toCalledWith(renderer, camera);
        });

        it("render rendererComponent", function(){
            var rendererComponent = new wd.RendererComponent();
            geometry = new wd.Geometry();
            rendererComponent.render = sandbox.stub();
            scene.addComponent(geometry);
            scene.addComponent(rendererComponent);

            scene.render(renderer);

            expect(rendererComponent.render).toCalledWith(renderer, geometry, camera);
        });
        it("render children", function(){
            var renderTargetRenderer = createCommonRenderTargetRenderer();
            scene.renderTargetRendererManager.addCommonRenderTargetRenderer(renderTargetRenderer);

            var gameObject1 = wd.GameObject.create();
            sandbox.stub(gameObject1, "render");
            scene.addChild(gameObject1);


            scene.render(renderer);

            expect(gameObject1.render).toCalledWith(renderer, camera);
            expect(gameObject1.render).toCalledAfter(renderTargetRenderer.render);
        });

        describe("test renderRate", function(){
            beforeEach(function(){

            });

            it("if it's 0, render just once", function(){
                var proceduralRenderTargetRenderer = createProceduralRenderTargetRenderer(wd.FireProceduralTexture, wd.FireProceduralRenderTargetRenderer, 0);


                scene.renderTargetRendererManager.addProceduralRenderTargetRenderer(proceduralRenderTargetRenderer);

                scene.render(renderer);
                scene.render(renderer);


                expect(proceduralRenderTargetRenderer.render).toCalledOnce();
            });
            it("else if it's 1, render on every frame", function(){
                var renderer = createCommonRenderTargetRenderer(1);


                scene.renderTargetRendererManager.addCommonRenderTargetRenderer(renderer);

                scene.render(renderer);
                scene.render(renderer);
                scene.render(renderer);


                expect(renderer.render.callCount).toEqual(3);
            });
            it("else if it's 2, render on every two frames", function(){
                var renderer = createCommonRenderTargetRenderer(2);


                scene.renderTargetRendererManager.addCommonRenderTargetRenderer(renderer);

                scene.render(renderer);
                scene.render(renderer);
                scene.render(renderer);


                expect(renderer.render.callCount).toEqual(2);
            });
        });
    });
});
