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
        sandbox.restore();
    });

    describe("init", function(){
        beforeEach(function(){
            director.scene.addChild(gameObject);

            director._init();
        });

        it("add overlay canvas", function(){
            //gameObject.init();

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
            //gameObject.init();

            expect(renderer._context).not.toBeNull();
        });
        it("ui can get UIRenderer's context", function(){
            //sandbox.stub(director.renderer, "render");
            //sandbox.stub(font, "update");
            //director.scene.addChild(gameObject);

            //director._init();

            expect(font._context).not.toBeNull();
        });
    });

    it("not add command, not render webgl, only update ui", function(){
        var director = wd.Director.getInstance();
        sandbox.stub(director.renderer, "render");
        sandbox.stub(font, "update");

        director.scene.addChild(gameObject);


        director._init();
        director._loopBody(1);


        expect(director.renderer.render).not.toCalled();
        expect(font.update).toCalledOnce();
    });

    it("clear canvas before update ui", function(){
        var director = wd.Director.getInstance();
        sandbox.stub(font, "update");

        director.scene.addChild(gameObject);


        director._init();

        sandbox.stub(renderer.context, "clearRect");


        director._loopBody(1);

        expect(renderer.context.clearRect).toCalledBefore(font.update);
    });
});
