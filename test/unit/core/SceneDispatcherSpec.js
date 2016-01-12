describe("SceneDispatcher", function() {
    var sandbox = null;
    var scene = null;
    var SceneDispatcher = null;
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

    function buildAction(){
        var action = new wd.Repeat(new wd.CallFunc(), 10);

        return action;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
        SceneDispatcher = wd.SceneDispatcher;
        scene = SceneDispatcher.create();
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("test with child", function(){
        beforeEach(function(){
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

            scene.scriptList.addChild("customScript1", script1);
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

        describe("GameObjectScene->init", function(){
            beforeEach(function(){
                scene = scene.gameObjectScene;
            });
            
            it("bind global hook", function(){
                scene.init();

                wd.EventManager.trigger(wd.CustomEvent.create("dy_startLoop"));
                wd.EventManager.trigger(wd.CustomEvent.create("dy_endLoop"));

                expect(gameObject1.onStartLoop).toCalledOnce();
                expect(gameObject2.onStartLoop).toCalledOnce();
                expect(gameObject3.onStartLoop).toCalledOnce();
                expect(gameObject1.onEndLoop).toCalledOnce();
                expect(gameObject2.onEndLoop).toCalledOnce();
                expect(gameObject3.onEndLoop).toCalledOnce();
            });
            it("invoke components' init", function(){
                var geometry = new wd.BoxGeometry();
                var material = new wd.BasicMaterial();
                geometry.material = material;

                sandbox.spy(geometry, "init");
                sandbox.spy(material, "init");
                sandbox.spy(material.mapManager, "init");
                sandbox.stub(material.shader, "init");
                scene.addComponent(geometry);

                scene.init();

                expect(geometry.init).toCalledOnce();
                expect(material.init).toCalledOnce();
                expect(material.mapManager.init).toCalledOnce();
                expect(material.shader.init).toCalledOnce();
            });
            it("invoke scene and it's children's script->init", function(){
                scene.init();

                expect(script1.init).toCalledOnce();
                expect(script2.init).toCalledOnce();
                expect(script3.init).toCalledOnce();
                expect(script4.init).toCalledOnce();
                expect(script1.init).toCalledBefore(script3.init);
                expect(script3.init).toCalledBefore(script2.init);
                expect(script2.init).toCalledBefore(script4.init);
            });
        });

        describe("onEnter", function(){
            it("invoke scene's script->onEnter", function(){
                scene.onEnter();

                expect(script1.onEnter).toCalledOnce();
                expect(script2.onEnter).not.toCalled();
                expect(script3.onEnter).not.toCalled();
                expect(script4.onEnter).not.toCalled();
            })
        });

        describe("onExit", function(){
            it("invoke scene's script->onExit", function(){
                scene.onExit();

                expect(script1.onExit).toCalledOnce();
                expect(script2.onExit).not.toCalled();
                expect(script3.onExit).not.toCalled();
                expect(script4.onExit).not.toCalled();
            })
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
                scene = scene.gameObjectScene;

                elapsedTime = 100;
                action1 = buildAction();
                action2 = buildAction();
                action3 = buildAction();
                action4 = buildAction();
                action5 = buildAction();

                //sandbox.stub(scene.actionManager, "update");
            });

            it("invoke scene's and it's children's all action->update", function(){
                scene.addComponent(action1);
                gameObject1.addComponent(action2);
                gameObject2.addComponent(action3);
                gameObject3.addComponent(action4);
                gameObject3.addComponent(action5);
                scene.init();

                scene.update(elapsedTime);

                expect(action1.update).toCalledWith(elapsedTime);
                expect(action1.update).toCalledOnce();
                expect(action1.update).toCalledBefore(scene.actionManager.update);
                expect(action1.update).toCalledBefore(action3.update);
                expect(action3.update).toCalledWith(elapsedTime);
                expect(action3.update).toCalledOnce();
                expect(action3.update).toCalledBefore(action2.update);
                expect(action2.update).toCalledWith(elapsedTime);
                expect(action2.update).toCalledOnce();
                expect(action2.update).toCalledBefore(action4.update);
                expect(action4.update).toCalledWith(elapsedTime);
                expect(action4.update).toCalledOnce();
                expect(action4.update).toCalledBefore(action5.update);
                expect(action5.update).toCalledWith(elapsedTime);
                expect(action5.update).toCalledOnce();
            });
            it("invoke scene and it's children's script->update", function(){
                scene.update(elapsedTime);

                expect(script1.update).toCalledOnce();
                expect(script1.update).toCalledWith(elapsedTime);
                expect(script2.update).toCalledOnce();
                expect(script3.update).toCalledOnce();
                expect(script4.update).toCalledOnce();

                expect(script1.update).toCalledBefore(script3.update);
                expect(script3.update).toCalledBefore(script2.update);
                expect(script2.update).toCalledBefore(script4.update);
            });
        });

        describe("add child", function(){
            var oldParent,
                newParent;
            var child;

            function buildParent(){
                return {
                    removeChild:sandbox.stub()
                }
            }

            function buildChild(){
                var gameObject = wd.GameObject.create();

                sandbox.stub(gameObject, "hasComponent");
                sandbox.stub(gameObject, "onEnter");

                return gameObject;
            }

            beforeEach(function(){
                oldParent = buildParent();
                newParent = buildParent();
                child = buildChild();
            });

            describe("addChild", function(){
                it("if target's parent exist, remove target from it's parent", function(){
                    child.parent = oldParent;

                    scene.addChild(child);

                    expect(oldParent.removeChild).toCalledWith(child);
                });
                it("set target's parent to be gameObjectScene", function(){
                    scene.addChild(child);

                    expect(child.parent).toEqual(scene.gameObjectScene);
                });
                it("set target's transform's parent to be scene's transform", function(){
                    scene.addChild(child);

                    expect(child.transform.parent).toEqual(scene.transform);
                });
                it("add target into scene", function(){
                    scene.addChild(child);

                    expect(scene.getChild(2)).toEqual(child);
                });
                it("invoke child's onEnter", function(){
                    scene.addChild(child);

                    expect(child.onEnter).toCalledOnce();
                });
            });

            describe("addChildren", function(){
                var child2;
                var children;

                beforeEach(function(){
                    child2 = buildChild();
                });

                it("can add single one", function(){
                    children = child;
                    scene.addChildren(children);

                    expect(scene.getChild(2)).toEqual(child);
                });
                it("can add array", function(){
                    children = [child, child2];
                    scene.addChildren(children);

                    expect(scene.getChild(2)).toEqual(child);
                    expect(scene.getChild(3)).toEqual(child2);
                });
                it("can add Collection", function(){
                    children = wdCb.Collection.create([child, child2]);
                    scene.addChildren(children);

                    expect(scene.getChild(2)).toEqual(child);
                    expect(scene.getChild(3)).toEqual(child2);
                });
            });
        });

        describe("removeChild", function(){
            it("invoke target's onExit", function(){
                scene.removeChild(gameObject2);

                expect(gameObject2.onExit).toCalledOnce();
            });
            it("remove target", function(){
                expect(scene.findChildByUid(gameObject2.uid)).toEqual(gameObject2);

                scene.removeChild(gameObject2);

                expect(scene.findChildByUid(gameObject2)).toBeNull();
            });
            it("set target's parent to be null", function(){
                scene.removeChild(gameObject2);

                expect(gameObject2.parent).toBeNull();
            });
        });
    });

    describe("addComponent", function(){
        it("if component exist, return", function(){
            var component = new wd.Action();
            sandbox.stub(wd.Log, "assert");

            scene.addComponent(component);
            var result = scene.addComponent(component);

            expect(wd.Log.assert).toCalledOnce();
            expect(result).toEqual(scene);
        });
        it("set component's gameObject", function(){
            var component = new wd.Action();

            scene.addComponent(component);

            expect(component.entityObject).toEqual(scene.gameObjectScene);
        });
        it("add component to container", function(){
            var component = new wd.Action();

            scene.addComponent(component);

            expect(scene.findComponentByUid(component.uid)).toEqual(component);
        });

        describe("if component is Action", function(){
            it("set action's target and add it to actionManager", function(){
                var component = new wd.Action();

                scene.addComponent(component);

                expect(component.target).toEqual(scene.gameObjectScene);
                expect(scene.actionManager.hasChild(component)).toBeTruthy();
            });
        });

        describe("if component is Script", function(){
            it("add load stream to Director->scriptStreams", function(){
                var stream = new wdFrp.Stream();
                var component = wd.Script.create("aaa.js");
                sandbox.stub(component, "createLoadJsStream").returns({
                    do:sandbox.stub().returns(stream)
                });

                scene.addComponent(component);

                expect(wd.Director.getInstance().scriptStreams.hasChild(component.uid.toString())).toBeTruthy();
            });
        });
    });

    describe("removeComponent", function(){
        it("remove component from container", function(){
            var component = new wd.Action();
            scene.addComponent(component);

            scene.removeComponent(component);

            expect(scene.findComponentByUid(component.uid)).toBeNull();
        });
        it("set component's gameObject to be null", function(){
            var component = new wd.Action();
            scene.addComponent(component);

            scene.removeComponent(component);

            expect(component.entityObject).toBeNull();
        });

        describe("if component is Action", function(){
            it("remove it from actionManager", function(){
                var component = new wd.Action();
                scene.addComponent(component);

                scene.removeComponent(component);

                expect(scene.actionManager.hasChild(component)).toBeFalsy();
            });
        });

        describe("if component is Script", function(){
            it("remove load stream to Director->scriptStreams", function(){
                var stream = new wdFrp.Stream();
                var component = wd.Script.create("aaa.js");
                sandbox.stub(component, "createLoadJsStream").returns({
                    do:sandbox.stub().returns(stream)
                });
                scene.addComponent(component);

                scene.removeComponent(component);

                expect(wd.Director.getInstance().scriptStreams.hasChild(component.uid.toString())).toBeFalsy();
            });
        });
    });

    describe("addRenderTargetRenderer", function(){
        it("add renderTargetRenderer with renderTargetTexture", function(){
            var renderer = {
            };

            scene.addRenderTargetRenderer(renderer);

            expect(scene.gameObjectScene._renderTargetRenderers.hasChild(renderer)).toBeTruthy();
        });
    });

    describe("GameObjectScene->render", function(){
        var renderer,camera;

        beforeEach(function(){
            scene = scene.gameObjectScene;

            renderer = {};
            camera = {};
            scene.camera = camera;
        });

        it("render renderTargetRenderers", function(){
            var renderTargetRenderer = {
                init: sandbox.stub(),
                render: sandbox.stub()
            };
            scene.addRenderTargetRenderer(renderTargetRenderer);

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
            var renderTargetRenderer = {
                init: sandbox.stub(),
                render: sandbox.stub()
            };
            scene.addRenderTargetRenderer(renderTargetRenderer);

            var gameObject1 = wd.GameObject.create();
            sandbox.stub(gameObject1, "render");
            scene.addChild(gameObject1);


            scene.render(renderer);

            expect(gameObject1.render).toCalledWith(renderer, camera);
            expect(gameObject1.render).toCalledAfter(renderTargetRenderer.render);
        });
    });

    describe("test dispatch to GameObjectScene/UIObjectScene", function(){
        var uiObject1;

        beforeEach(function(){
            gameObject1 = wd.GameObject.create();

            uiObject1 = wd.UIObject.create();

            scene.addChild(gameObject1);
            scene.addChild(uiObject1);
        });

        it("use gameObjectScene->script as scene->script", function(){
            script1 = buildScript();

            prepareTool.addScript(scene.gameObjectScene, script1, "customScript1");

            expect(scene.scriptList.getCount()).toEqual(1);
        });
        it("use gameObjectScene->actionManager as scene->actionManager", function(){
            var action = buildAction();
            scene.gameObjectScene.addComponent(action);

            expect(scene.actionManager).toEqual(scene.gameObjectScene.actionManager);
        });

        describe("dispatch", function(){
            describe("addChild", function(){
                beforeEach(function(){
                    sandbox.stub(scene.gameObjectScene, "addChild");
                    sandbox.stub(scene.uiObjectScene, "addChild");
                });

                it("dispatch to addChild", function(){
                    scene.addChild(uiObject1);

                    expect(scene.uiObjectScene.addChild).toCalledOnce();
                    expect(scene.gameObjectScene.addChild).not.toCalled();


                    scene.addChild(gameObject1);

                    expect(scene.uiObjectScene.addChild).toCalledOnce();
                    expect(scene.gameObjectScene.addChild).toCalledOnce();
                });
            });

            describe("hasChild", function(){
                beforeEach(function(){
                    sandbox.stub(scene.gameObjectScene, "hasChild");
                    sandbox.stub(scene.uiObjectScene, "hasChild");
                });

                it("dispatch to hasChild", function(){
                    scene.hasChild(uiObject1);

                    expect(scene.uiObjectScene.hasChild).toCalledOnce();
                    expect(scene.gameObjectScene.hasChild).not.toCalled();


                    scene.hasChild(gameObject1);

                    expect(scene.uiObjectScene.hasChild).toCalledOnce();
                    expect(scene.gameObjectScene.hasChild).toCalledOnce();
                });
            });

            describe("removeChild", function(){
                beforeEach(function(){
                    sandbox.stub(scene.gameObjectScene, "removeChild");
                    sandbox.stub(scene.uiObjectScene, "removeChild");
                });

                it("dispatch to removeChild", function(){
                    scene.removeChild(uiObject1);

                    expect(scene.uiObjectScene.removeChild).toCalledOnce();
                    expect(scene.gameObjectScene.removeChild).not.toCalled();


                    scene.removeChild(gameObject1);

                    expect(scene.uiObjectScene.removeChild).toCalledOnce();
                    expect(scene.gameObjectScene.removeChild).toCalledOnce();
                });
            });

            describe("addChildren", function(){
                beforeEach(function(){
                    sandbox.stub(scene.gameObjectScene, "addChild");
                    sandbox.stub(scene.uiObjectScene, "addChild");
                });

                it("dispatch to addChild", function(){
                    scene.addChildren([gameObject1, uiObject1]);

                    expect(scene.gameObjectScene.addChild).toCalledWith(gameObject1);
                    expect(scene.uiObjectScene.addChild).toCalledWith(uiObject1);
                });
            });
        });

        describe("invoke gameObjectScene,uiObjectScene", function(){
            function judge(method){
                sandbox.stub(scene.gameObjectScene, method);
                sandbox.stub(scene.uiObjectScene, method);

                scene[method]();

                expect(scene.gameObjectScene[method]).toCalledOnce();
                expect(scene.uiObjectScene[method]).toCalledOnce();
            }


            //it("init", function(){
            //    judge("init");
            //});
            //it("update", function(){
            //    judge("update");
            //});
            it("dispose", function(){
                judge("dispose");
            });

            it("onStartLoop", function(){
                judge("onStartLoop");
            });
            it("onEndLoop", function(){
                judge("onEndLoop");
            });
            it("onEnter", function(){
                judge("onEnter");
            });
            it("onExit", function(){
                judge("onExit");
            });
            it("onDispose", function(){
                judge("onDispose");
            });
        });

        describe("only invoke gameObjectScene", function(){
            function judge(method){
                sandbox.stub(scene.gameObjectScene, method);
                sandbox.stub(scene.uiObjectScene, method);

                scene[method]();

                expect(scene.gameObjectScene[method]).toCalledOnce();
                expect(scene.uiObjectScene[method]).not.toCalled();
            }

            //it("render", function(){
            //    judge("render");
            //});
            it("forEach", function(){
                judge("forEach");
            });
            it("filter", function(){
                judge("filter");
            });
            it("getChildren", function(){
                judge("getChildren");
            });
            it("getChild", function(){
                judge("getChild");
            });
            it("findChildByUid", function(){
                judge("findChildByUid");
            });
            it("findChildByTag", function(){
                judge("findChildByTag");
            });
            it("findChildByName", function(){
                judge("findChildByName");
            });
            it("findChildrenByName", function(){
                judge("findChildrenByName");
            });
            it("getComponent", function(){
                judge("getComponent");
            });
            it("findComponentByUid", function(){
                judge("findComponentByUid");
            });
            it("getFirstComponent", function(){
                judge("getFirstComponent");
            });
            it("forEachComponent", function(){
                judge("forEachComponent");
            });
            it("hasComponent", function(){
                judge("hasComponent");
            });
            it("addComponent", function(){
                judge("addComponent");
            });
            it("removeComponent", function(){
                judge("removeComponent");
            });
            it("removeAllComponent", function(){
                judge("removeAllComponent");
            });
        });
    });
});
