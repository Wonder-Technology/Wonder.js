describe("UIRenderer", function () {
    var sandbox = null;
    var font;
    var renderer;
    var uiObject;
    var director;

    function createFont(uiRenderer) {
        font = wd.PlainFont.create();


        var uiObject = wd.UIObject.create();

        uiObject.addComponent(font);


        if(uiRenderer){
            uiObject.addComponent(uiRenderer);
        }
        else{
            renderer = wd.UIRenderer.create();

            uiObject.addComponent(renderer);
        }


        return uiObject;
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

        uiObject = createFont();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance(sandbox);
        uiObject.dispose();
        sandbox.restore();
    });

    describe("init", function(){
        beforeEach(function(){
            director.scene.addChild(uiObject);

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
        it("if not all references(the uiObject which share the same UIRenderer) are disposed, not dispose the UIRenderer", function(){
            var uiObject2 = createFont(renderer);

            director.scene.addChild(uiObject);
            director.scene.addChild(uiObject2);

            director._init();


            expect($("canvas").length).toEqual(1);

            uiObject.dispose();

            expect($("canvas").length).toEqual(1);


            uiObject2.dispose();

            expect($("canvas").length).toEqual(0);
        });

        describe("else", function(){
            beforeEach(function(){

            });

            it("remove canvas", function(){
                director.scene.addChild(uiObject);

                director._init();

                expect($("canvas").length).toEqual(1);


                uiObject.dispose();

                expect($("canvas").length).toEqual(0);
            });
            //todo unbind event binded on canvas
        });
    });

    it("not add command, not render webgl, only update ui", function(){
        sandbox.stub(director.renderer, "render");
        sandbox.stub(font, "update");

        director.scene.addChild(uiObject);


        director._init();
        director._loopBody(1);


        expect(director.renderer.render).not.toCalled();
        expect(font.update).toCalledOnce();
    });

    it("clear canvas before update ui", function(){
        sandbox.stub(font, "update");

        director.scene.addChild(uiObject);


        director._init();

        sandbox.stub(renderer.context, "clearRect");


        director._loopBody(1);

        expect(renderer.context.clearRect).toCalledBefore(font.update);
    });

    it("each UIRenderer has one independent canvas", function(){
        var uiObject2 = createFont();

        director.scene.addChild(uiObject);
        director.scene.addChild(uiObject2);

        director._init();

        expect($("canvas").length).toEqual(2);
        expect(uiObject.getComponent(wd.UIRenderer).context !== uiObject2.getComponent(wd.UIRenderer).context).toBeTruthy();

        uiObject2.dispose();
    });

    describe("set zIndex", function() {
        beforeEach(function () {

        });

        it("can specify the canvas->zIndex", function () {
            renderer.zIndex = 10;
            director.scene.addChild(uiObject);

            director._init();

            expect($("canvas").css("zIndex")).toEqual("10");
        });
        it("refresh canvas->zIndex when change zIndex", function(){
            renderer.zIndex = 10;
            director.scene.addChild(uiObject);

            director._init();
            director._loopBody(1);


            renderer.zIndex = 100;

            director._loopBody(2);
            expect($("canvas").css("zIndex")).toEqual("100");
        });
    });

    describe("clone", function(){
        beforeEach(function(){
        });

        it("clone data", function(){
            var zIndex = 10;



            cloneTool.extend(renderer, {
                zIndex: zIndex
            });

            var result = renderer.clone();

            expect(result === renderer).toBeFalsy();
            expect(result.zIndex).toEqual(zIndex);
        });
    });
});
