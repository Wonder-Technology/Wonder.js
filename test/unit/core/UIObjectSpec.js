describe("UIObject", function () {
    var sandbox = null;
    var plainFont;
    var renderer;
    var uiObject;
    var director;

    function createFont() {
        plainFont = wd.PlainFont.create();


        var uiObject = wd.UIObject.create();

        uiObject.addComponent(plainFont);


        renderer = wd.UIRenderer.create();


        uiObject.addComponent(renderer);


        return uiObject;
    }

    function createUIObject(ui, uiRenderer){
        var renderer;
        var uiComponent;

        var uiUIObject = wd.UIObject.create();
        if(ui){
            uiComponent = ui;
        }
        else{
            uiComponent = wd.PlainFont.create();
        }

        uiUIObject.addComponent(uiComponent);

        if(uiRenderer || uiRenderer === "no"){
            renderer = uiRenderer;
        }
        else{
            renderer = wd.UIRenderer.create();
        }

        uiUIObject.addComponent(renderer);


        return {
            uiObject:uiUIObject,
            ui:uiComponent,
            renderer:renderer
        }
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        director = wd.Director.getInstance();

        sandbox.stub(wd.DeviceManager.getInstance(), "view", {
            x: 0,
            y: 0,
            width:1000,
            height: 500
        });

        uiObject = createFont();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance();
        uiObject.dispose();
        sandbox.restore();
    });

    describe("UIObjectScene->update", function(){
        beforeEach(function(){
        });

        describe("if any one of its children's ui component dirty, clear canvas and mark all children to be update_dirty", function(){
            beforeEach(function(){
            });

            describe("defer to update ui(next loop) when new dirty occur during current loop", function(){
                //var rotationMatrix;

                function addAction(uiObject){
                    var action = wd.CallFunc.create(function(){
                        this.getComponent(wd.UI).dirty = true;
                    }, uiObject);

                    uiObject.addComponent(action);

                    action.init();
                }

                function addRotateAction(uiObject, angle){
                    var action = wd.CallFunc.create(function(){
                        this.transform.rotation = angle;
                        this.getComponent(wd.UI).dirty = true;
                    }, uiObject);

                    uiObject.addComponent(action);

                    action.init();
                }

                beforeEach(function(){
                    sandbox.stub(window.performance, "now").returns(0);

                    director.scene.addChild(uiObject);

                    director._init();
                });

                it("test defer to update ui", function(){
                    var ui = uiObject.getComponent(wd.UI);
                    sandbox.stub(ui, "update");


                    director._loopBody(199);

                    expect(ui.update).toCalledOnce();

                    wd.Director.getInstance().scheduler.scheduleTime(function(){
                        addAction(
                            uiObject
                        );
                    }, 200);


                    director._loopBody(200);

                    expect(ui.update).toCalledOnce();
                    expect(ui.dirty).toBeTruthy();


                    director._loopBody(201);


                    expect(ui.update).toCalledTwice();
                    expect(ui.dirty).toBeFalsy();
                });
                it("test defer to reset transform state when new dirty occur during current loop", function(){
                    var ui = uiObject.getComponent(wd.UI);
                    sandbox.stub(ui, "update");


                    director._loopBody(199);

                    expect(uiObject.transform.isRotate).toBeFalsy();

                    wd.Director.getInstance().scheduler.scheduleTime(function(){
                        addRotateAction(
                            uiObject,
                            45
                        );
                    }, 200);


                    director._loopBody(200);

                    expect(uiObject.transform.isRotate).toBeTruthy();


                    director._loopBody(201);


                    expect(uiObject.transform.isRotate).toBeFalsy();
                });
            });

            describe("firstly clear canvas(only once), then update every one", function(){
                beforeEach(function(){
                    sandbox.stub(wd.LoaderManager.getInstance(), "get").returns({});
                });

                it("test ui component with the same UIRenderer", function(){
                    var data1 = createUIObject(wd.BitmapFont.create(), renderer);
                    var bitmapFontUIObject = data1.uiObject;
                    var bitmapFont = data1.ui;

                    uiObject.addChild(bitmapFontUIObject);


                    var data2 = createUIObject(wd.CharFont.create(), uiObject.getComponent(wd.UIRenderer));

                    var charFontUIObject = data2.uiObject;
                    var charFont = data2.ui;


                    uiObject.addChild(charFontUIObject);

                    sandbox.spy(plainFont, "update");
                    sandbox.spy(bitmapFont, "update");
                    sandbox.spy(charFont, "update");





                    director.scene.addChild(uiObject);

                    director._init();

                    sandbox.stub(renderer.context, "clearRect");

                    plainFont.dirty = false;
                    bitmapFont.dirty = true;
                    charFont.dirty = true;



                    director._loopBody(1);


                    expect(renderer.context.clearRect).toCalledOnce();
                    expect(renderer.context.clearRect).toCalledBefore(plainFont.update);
                    expect(plainFont.update).toCalledBefore(bitmapFont.update);
                    expect(bitmapFont.update).toCalledBefore(charFont.update);

                    expect(plainFont.update).toCalledOnce();
                    expect(bitmapFont.update).toCalledOnce();
                    expect(charFont.update).toCalledOnce();
                });
                it("test BitmapFont component and CharFont component which is generated by the BitmapFont component", function(){
                    uiObject.removeComponent(wd.PlainFont);

                    var bitmapFont = wd.BitmapFont.create();

                    uiObject.addComponent(bitmapFont);

                    var data = createUIObject(wd.CharFont.create(), uiObject.getComponent(wd.UIRenderer));

                    var charFontUIObject = data.uiObject;
                    var charFont = data.ui;


                    uiObject.addChild(charFontUIObject);

                    sandbox.spy(bitmapFont, "update");
                    sandbox.spy(charFont, "update");





                    director.scene.addChild(uiObject);

                    director._init();

                    sandbox.stub(renderer.context, "clearRect");

                    bitmapFont.dirty = false;
                    charFont.dirty = true;



                    director._loopBody(1);


                    expect(renderer.context.clearRect).toCalledOnce();
                    expect(renderer.context.clearRect).toCalledBefore(bitmapFont.update);
                    expect(bitmapFont.update).toCalledBefore(charFont.update);

                    expect(bitmapFont.update).toCalledOnce();
                    expect(charFont.update).toCalledOnce();
                });
                it("test UIObject with different UIRenderers, so that each UIRenderer can clear once", function(){
                    var data1 = createUIObject(wd.BitmapFont.create(), renderer);
                    var bitmapFontUIObject = data1.uiObject;
                    var bitmapFont = data1.ui;

                    uiObject.addChild(bitmapFontUIObject);


                    //var bitmapFont = wd.BitmapFont.create();
                    //
                    //uiObject.addComponent(bitmapFont);





                    var data2 = createUIObject();

                    var plainFontUIObject2 = data2.uiObject;
                    var plainFont2 = data2.ui;
                    var renderer2 = data2.renderer;



                    var data3 = createUIObject(wd.BitmapFont.create(), renderer2);
                    var bitmapFontUIObject2 = data3.uiObject;
                    var bitmapFont2 = data3.ui;


                    //plainFontUIObject2.addComponent(bitmapFont2);
                    plainFontUIObject2.addChild(bitmapFontUIObject2);


                    //uiObject.addChild(plainFontUIObject2);






                    sandbox.spy(plainFont, "update");
                    sandbox.spy(bitmapFont, "update");
                    sandbox.spy(bitmapFont2, "update");
                    sandbox.spy(plainFont2, "update");





                    director.scene.addChild(uiObject);
                    director.scene.addChild(plainFontUIObject2);

                    director._init();

                    sandbox.stub(renderer.context, "clearRect");
                    sandbox.stub(renderer2.context, "clearRect");

                    plainFont.dirty = false;
                    plainFont2.dirty = false;
                    bitmapFont.dirty = true;
                    bitmapFont2.dirty = true;



                    director._loopBody(1);


                    expect(renderer.context.clearRect).toCalledOnce();
                    expect(renderer.context.clearRect).toCalledBefore(plainFont.update);
                    expect(plainFont.update).toCalledBefore(bitmapFont.update);

                    expect(plainFont.update).toCalledOnce();
                    expect(bitmapFont.update).toCalledOnce();



                    expect(renderer2.context.clearRect).toCalledOnce();
                    //expect(renderer2.context.clearRect).toCalledAfter(bitmapFont.update);
                    expect(renderer2.context.clearRect).toCalledBefore(bitmapFont.update);
                    expect(renderer2.context.clearRect).toCalledBefore(plainFont2.update);
                    expect(plainFont2.update).toCalledBefore(bitmapFont2.update);

                    expect(plainFont2.update).toCalledOnce();
                    expect(bitmapFont2.update).toCalledOnce();
                });

                //todo test more ui
            });

            it("the UIObject which has the same UIRenderer with the dirty one should also be updated", function(){
                director.scene.addChild(uiObject);

                var data = createUIObject(wd.Button.create(), renderer);

                var buttonUIObject = data.uiObject;
                var button = data.ui;


                director.scene.addChild(buttonUIObject);

                sandbox.spy(plainFont, "update");
                sandbox.spy(button, "update");






                director._init();

                sandbox.stub(renderer.context, "clearRect");

                plainFont.dirty = true;
                button.dirty = false;



                director._loopBody(1);


                expect(renderer.context.clearRect).toCalledOnce();
                expect(button.update).toCalledAfter(plainFont.update);
            });
        });

        describe("if ui not dirty, not clear ui canvas and not update ui", function(){
            it("test uiObject only has PlainFont component", function(){
                sandbox.spy(plainFont, "update");
                director.scene.addChild(uiObject);

                director._init();

                sandbox.stub(renderer.context, "clearRect");

                director._loopBody(1);
                director._loopBody(2);

                expect(renderer.context.clearRect).toCalledOnce();
                expect(plainFont.update).toCalledOnce();
            });

            //todo test more ui
        });
    });

    describe("sort sibling children by transform->zIndex", function(){
        var uiObject2, uiObject3;

        beforeEach(function(){
            sandbox.stub(renderer.context, "fillText");
            sandbox.stub(renderer.context, "strokeText");
            sandbox.stub(renderer.context, "drawImage");

            var data = createUIObject(wd.ProgressBar.create(), renderer);
            uiObject2 = data.uiObject;
            var bar = data.ui;

            bar.percent = 0.5;

            uiObject2.transform.zIndex = 3;




            var data2 = createUIObject(null, renderer);
            uiObject3 = data2.uiObject;
            var font = data2.ui;
            font.enableStroke("red", 50);

            uiObject3.transform.zIndex = 100;
        });
        afterEach(function(){
            uiObject2.dispose();
            uiObject3.dispose();
        })
        
        it("test sort top UIObject", function(){
            uiObject.transform.zIndex = 1;

            director.scene.addChildren([uiObject, uiObject2]);

            director.initUIObjectScene();

            director.runUIObjectScene(1);

            expect(renderer.context.drawImage).toCalledAfter(renderer.context.fillText);
        });
        it("test sort sibling children of top UIObject", function(){
            uiObject.addChild(uiObject2);
            uiObject.addChild(uiObject3);


            director.scene.addChildren([uiObject]);

            director.initUIObjectScene();

            director.runUIObjectScene(1);


            expect(renderer.context.fillText).toCalledBefore(renderer.context.strokeText);
        });
        it("parent one will be drawed before child one by ignoring their zIndex", function(){
            uiObject.transform.zIndex = 1000;

            uiObject.addChild(uiObject2);


            director.scene.addChildren([uiObject]);

            director.initUIObjectScene();

            director.runUIObjectScene(1);


            expect(renderer.context.fillText).toCalledBefore(renderer.context.drawImage);
        })
    });

    describe("addComponent", function(){
        beforeEach(function(){
        });

        it("one UIObject should only has one UI component", function(){
            expect(function(){
                uiObject.addComponent(wd.ProgressBar.create());
            }).toThrow();
        });
    });

    describe("addChild", function(){
        beforeEach(function(){
        });

        it("the UIRenderer of UIObject and its children should be the same one", function(){
            var uiObject2 = createUIObject().uiObject;

            expect(function(){
                uiObject.addChild(uiObject2)
            }).toThrow();
        });
    });
});


