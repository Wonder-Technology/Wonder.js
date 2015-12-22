describe("UIRenderer", function () {
    var sandbox = null;
    var font;
    var renderer;
    var gameObject;
    var director;

    function createFont() {
        font = wd.PlainFont.create();


        var gameObject = wd.GameObject.create();

        gameObject.addComponent(font);


        renderer = wd.UIRenderer.create();


        gameObject.addComponent(renderer);


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
        renderer.dispose();
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
        it("off BEFORE_INIT event handler", function(){
            sandbox.spy(renderer, "_createOverlayCanvas");

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.BEFORE_INIT));

            expect(renderer._createOverlayCanvas).toCalledOnce();


            renderer.dispose();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EngineEvent.BEFORE_INIT));

            expect(renderer._createOverlayCanvas).toCalledOnce();
        });
        it("remove canvas", function(){
            director.scene.addChild(gameObject);

            director._init();

            expect($("canvas").length).toEqual(1);


            renderer.dispose();

            expect($("canvas").length).toEqual(0);
        });
        //todo unbind event binded on canvas
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

});
