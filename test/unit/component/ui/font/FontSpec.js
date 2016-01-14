describe("Font", function () {
    var sandbox = null;
    var Font = null;
    var font;
    var uiObject;
    var director;
    var renderer;

    function createFont() {
        font = new Font();


        var uiObject = wd.UIObject.create();

        uiObject.addComponent(font);


        renderer = wd.UIRenderer.create();


        uiObject.addComponent(renderer);


        return uiObject;
    }
    //function setDimensions(width, height) {
    //    font.width = width;
    //    font.height = height || 0;
    //}
    //
    //function createFont() {
    //    font = Font.create();
    //
    //    font.gameObject = {};
    //
    //
    //    sandbox.stub(font, "getContext");
    //
    //
    //    return font;
    //}
    //
    //function setPosition(x, y){
    //    font.gameObject.transform = {
    //        position: wd.Vector3.create(x, y, 0)
    //    }
    //}


    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.openContractCheck(sandbox);

        Font = wd.Font;

        director = wd.Director.getInstance();

        sandbox.stub(wd.DeviceManager.getInstance(), "view", {
            x: 0,
            y: 0,
            width:1000,
            height: 800
        });


        uiObject = createFont();

        //setHeight(400);
        //setPosition(0, 0);


        director.scene.addChild(uiObject);

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("init", function(){
        afterEach(function(){
            uiObject.dispose();
        });

        it("get uiRenderer->context", function(){
            expect(font.context).toBeNull();

            director._init();

            expect(font.context).not.toBeNull();
        });
        it("bind UI_WIDTH_CHANGE event", function(){
            director._init();

            font.dirty = false;

            wd.EventManager.trigger(uiObject, wd.CustomEvent.create(wd.EngineEvent.UI_WIDTH_CHANGE));

            expect(font.dirty).toBeTruthy();
        });
        it("bind UI_HEIGHT_CHANGE event", function(){
            director._init();

            font.dirty = false;

            wd.EventManager.trigger(uiObject, wd.CustomEvent.create(wd.EngineEvent.UI_HEIGHT_CHANGE));

            expect(font.dirty).toBeTruthy();
        });
    });

    describe("dispose", function(){
        beforeEach(function(){
            director._init();

            uiObject.dispose();

            font.needFormat = false;
        });

        it("off UI_WIDTH_CHANGE event", function(){
            wd.EventManager.trigger(uiObject, wd.CustomEvent.create(wd.EngineEvent.UI_WIDTH_CHANGE));

            expect(font.needFormat).toBeFalsy();
        });
        it("off UI_HEIGHT_CHANGE event", function(){
            wd.EventManager.trigger(uiObject, wd.CustomEvent.create(wd.EngineEvent.UI_HEIGHT_CHANGE));

            expect(font.needFormat).toBeFalsy();
        });
    });
});
