describe("UIRenderer", function () {
    var sandbox = null;
    var font;
    var renderer;
    var gameObject;
    var director;

    function createFont(uiRenderer) {
        font = wd.PlainFont.create();


        var gameObject = wd.GameObject.create();

        gameObject.addComponent(font);


        if(uiRenderer){
            gameObject.addComponent(uiRenderer);
        }
        else{
            renderer = wd.UIRenderer.create();

            gameObject.addComponent(renderer);
        }


        return gameObject;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        director = wd.Director.getInstance();

        sandbox.stub(wd.DeviceManager.getInstance(), "view", {
            x: 0,
            y: 0,
            width:1000,
            height: 500
        });

        gameObject = createFont();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance();
        gameObject.dispose();
        sandbox.restore();
    });

    describe("init", function(){
        beforeEach(function(){
            director.scene.addChild(gameObject);

            director._init();
        });

        it("add overlay canvas", function(){
            var canvas = $("canvas");
            var view = wd.DeviceManager.getInstance().view;
            expect(canvas.length).toEqual(1);
            expect(canvas.css("position")).toEqual("absolute");
            expect(canvas.css("left")).toEqual(view.x + "px");
            expect(canvas.css("top")).toEqual(view.y + "px");
            expect(canvas.css("zIndex")).toEqual("1");
            expect(canvas.width()).toEqual(view.width);
            expect(canvas.height()).toEqual(view.height);
        });
        it("get context", function(){
            expect(renderer._context).not.toBeNull();
        });
        it("ui can get UIRenderer's context", function(){
            expect(font._context).not.toBeNull();
        });
    });

    describe("dispose", function(){
        it("if not all references(the gameObject which share the same UIRenderer) are disposed, not dispose the UIRenderer", function(){
            var gameObject2 = createFont(renderer);

            director.scene.addChild(gameObject);
            director.scene.addChild(gameObject2);

            director._init();


            expect($("canvas").length).toEqual(1);

            gameObject.dispose();

            expect($("canvas").length).toEqual(1);


            gameObject2.dispose();

            expect($("canvas").length).toEqual(0);
        });

        describe("else", function(){
            beforeEach(function(){

            });

            it("off BEFORE_INIT event handler", function(){
                sandbox.spy(renderer, "_createOverlayCanvas");

                wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.BEFORE_INIT));

                expect(renderer._createOverlayCanvas).toCalledOnce();


                gameObject.dispose();

                wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.BEFORE_INIT));

                expect(renderer._createOverlayCanvas).toCalledOnce();
            });
            it("off ENDLOOP event handler", function(){
                wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.BEFORE_INIT));
                renderer.init();

                renderer.isClear = true;

                wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.ENDLOOP));

                expect(renderer.isClear).toBeFalsy();


                gameObject.dispose();


                renderer.isClear = true;

                wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.ENDLOOP));

                expect(renderer.isClear).toBeFalsy();
            });
            it("remove canvas", function(){
                director.scene.addChild(gameObject);

                director._init();

                expect($("canvas").length).toEqual(1);


                gameObject.dispose();

                expect($("canvas").length).toEqual(0);
            });
            //todo unbind event binded on canvas
        });
    });

    it("not add command, not render webgl, only update ui", function(){
        sandbox.stub(director.renderer, "render");
        sandbox.stub(font, "update");

        director.scene.addChild(gameObject);


        director._init();
        director._loopBody(1);


        expect(director.renderer.render).not.toCalled();
        expect(font.update).toCalledOnce();
    });

    it("clear canvas before update ui", function(){
        sandbox.stub(font, "update");

        director.scene.addChild(gameObject);


        director._init();

        sandbox.stub(renderer.context, "clearRect");


        director._loopBody(1);

        expect(renderer.context.clearRect).toCalledBefore(font.update);
    });

    it("each UIRenderer has one independent canvas", function(){
        var gameObject2 = createFont();

        director.scene.addChild(gameObject);
        director.scene.addChild(gameObject2);

        director._init();

        expect($("canvas").length).toEqual(2);
        expect(gameObject.getComponent(wd.UIRenderer).context !== gameObject2.getComponent(wd.UIRenderer).context).toBeTruthy();

        gameObject2.dispose();
    });

    //todo should only create canvas once
});
