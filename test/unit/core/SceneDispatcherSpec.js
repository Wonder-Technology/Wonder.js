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

    function getChild(index){
        return scene.gameObjectScene.getChild(index);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
        SceneDispatcher = wd.SceneDispatcher;
        scene = SceneDispatcher.create();
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
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

            prepareTool.addScript(scene, script1, "customScript1");
            prepareTool.addScript(gameObject1, script2, "customScript2");
            prepareTool.addScript(gameObject2, script3, "customScript3");
            prepareTool.addScript(gameObject3, script4, "customScript4");

            //sandbox.stub(gameObject1, "onStartLoop");
            //sandbox.stub(gameObject2, "onStartLoop");
            //sandbox.stub(gameObject3, "onStartLoop");
            //sandbox.stub(gameObject1, "onEndLoop");
            //sandbox.stub(gameObject2, "onEndLoop");
            //sandbox.stub(gameObject3, "onEndLoop");
            sandbox.stub(gameObject1, "onExit");
            sandbox.stub(gameObject2, "onExit");
            sandbox.stub(gameObject3, "onExit");
        });

        describe("onEnter", function(){
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
                it("set target's parent to be SceneDispatcher", function(){
                    scene.addChild(child);

                    expect(child.parent).toEqual(scene);
                });
                it("set target's transform's parent to be scene's transform", function(){
                    scene.addChild(child);

                    expect(child.transform.parent).toEqual(scene.transform);
                });
                it("add target into scene", function(){
                    scene.addChild(child);

                    expect(getChild(2)).toEqual(child);
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

                    expect(getChild(2)).toEqual(child);
                });
                it("can add array", function(){
                    children = [child, child2];
                    scene.addChildren(children);

                    expect(getChild(2)).toEqual(child);
                    expect(getChild(3)).toEqual(child2);
                });
                it("can add Collection", function(){
                    children = wdCb.Collection.create([child, child2]);
                    scene.addChildren(children);

                    expect(getChild(2)).toEqual(child);
                    expect(getChild(3)).toEqual(child2);
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
        it("if component exist, contract error", function(){
            testTool.openContractCheck(sandbox);

            var component = new wd.Action();

            scene.addComponent(component);

            expect(function(){
                scene.addComponent(component);
            }).toThrow();
        });
        it("set component's entityObject", function(){
            var component = new wd.Action();

            scene.addComponent(component);

            expect(component.entityObject).toEqual(scene);
        });
        it("add component to container", function(){
            var component = new wd.Action();

            scene.addComponent(component);

            expect(scene.findComponentByUid(component.uid)).toEqual(component);
        });

        describe("if component is Action", function(){
            it("set action's target and add it to ActionComponentContainer", function(){
                var component = new wd.Action();

                scene.addComponent(component);

                expect(component.target).toEqual(scene);
                expect(wd.ActionComponentContainer.getInstance().hasChild(component)).toBeTruthy();
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
        //it("set component's gameObject to be null", function(){
        //    var component = new wd.Action();
        //    scene.addComponent(component);
        //
        //    scene.removeComponent(component);
        //
        //    expect(component.entityObject).toBeNull();
        //});

        describe("if component is Action", function(){
            it("remove it from ActionComponentContainer", function(){
                var component = new wd.Action();
                scene.addComponent(component);

                scene.removeComponent(component);

                expect(wd.ActionComponentContainer.getInstance().hasChild(component)).toBeFalsy();
            });
        });
    });

    //describe("addCommonRenderTargetRenderer", function(){
    //    it("add renderTargetRenderer", function(){
    //        var renderer = {
    //        };
    //
    //        scene.addCommonRenderTargetRenderer(renderer);
    //
    //        expect(scene.gameObjectScene._renderTargetRendererList.hasChild(renderer)).toBeTruthy();
    //    });
    //});
    //
    //describe("addProceduralRenderTargetRenderer", function(){
    //    it("add proceduralRenderTargetRenderer", function(){
    //        var renderer = {
    //        };
    //
    //        scene.addProceduralRenderTargetRenderer(renderer);
    //
    //        expect(scene.gameObjectScene._proceduralRendererList.hasChild(renderer)).toBeTruthy();
    //    });
    //});

    describe("test dispatch to GameObjectScene/UIObjectScene", function(){
        var uiObject1;

        beforeEach(function(){
            gameObject1 = wd.GameObject.create();

            uiObject1 = wd.UIObject.create();

            scene.addChild(gameObject1);
            scene.addChild(uiObject1);
        });

        //it("use gameObjectScene->script as scene->script", function(){
        //    script1 = buildScript();
        //
        //    prepareTool.addScript(scene.gameObjectScene, script1, "customScript1");
        //
        //    expect(scene.scriptList.getCount()).toEqual(1);
        //});
        it("use gameObjectScene->actionEngine as scene->actionEngine", function(){
            var action = buildAction();
            scene.gameObjectScene.addComponent(action);

            expect(scene.actionEngine).toEqual(scene.gameObjectScene.actionEngine);
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

        //it("getChildren", function(){
        //    judge("getChildren");
        //});
        //it("findChildByUid", function(){
        //    judge("findChildByUid");
        //});
        //it("findChildByTag", function(){
        //    judge("findChildByTag");
        //});
        //it("findChildByName", function(){
        //    judge("findChildByName");
        //});
        //it("findChildrenByName", function(){
        //    judge("findChildrenByName");
        //});

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

            //it("onStartLoop", function(){
            //    judge("onStartLoop");
            //});
            //it("onEndLoop", function(){
            //    judge("onEndLoop");
            //});
            it("onEnter", function(){
                judge("onEnter");
            });
            it("onExit", function(){
                judge("onExit");
            });
            it("onDispose", function(){
                judge("onDispose");
            });
            //it("findComponentByUid", function(){
            //    judge("findComponentByUid");
            //});
        });
    });

    describe("fix bug", function(){
        beforeEach(function(){

        });

        it("SceneDispatcher->getChildren() shouldn't change gameObjectScene,uiObjectScene->children", function(){
            var gameObject = wd.GameObject.create();
            var uiObject = wd.UIObject.create();

            scene.addChild(gameObject);
            scene.addChild(uiObject);

            var children1 = scene.getChildren();
            var children2 = scene.getChildren();

            expect(scene.gameObjectScene.getChildren().getCount()).toEqual(1);
            expect(scene.uiObjectScene.getChildren().getCount()).toEqual(1);
        });
    });
});
