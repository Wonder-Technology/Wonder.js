describe("ui", function () {
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
        gameObject.dispose();
        sandbox.restore();
    });

    it("if ui not change, not clear ui canvas and not update ui", function(){
        sandbox.spy(font, "update");
        director.scene.addChild(gameObject);

        director._init();

        sandbox.stub(renderer.context, "clearRect");

        director._loopBody(1);
        director._loopBody(2);

        expect(renderer.context.clearRect).toCalledOnce();
        expect(font.update).toCalledOnce();

        //
        //
        //function loop(callCount){
        //    director._loopBody();
        //
        //    expect(renderer.context.clearRect.callCount).toEqual(callCount);
        //    expect(font.update.callCount).toEqual(callCount);
        //
        //
        //    director._loopBody();
        //
        //    expect(renderer.context.clearRect.callCount).toEqual(callCount);
        //    expect(font.update.callCount).toEqual(callCount);
        //}
        //
        //beforeEach(function(){
        //    sandbox.spy(font, "update");
        //    director.scene.addChild(gameObject);
        //
        //    director._init();
        //
        //    sandbox.stub(renderer.context, "clearRect");
        //
        //    director._loopBody(1);
        //    director._loopBody(2);
        //
        //    expect(renderer.context.clearRect).toCalledOnce();
        //    expect(font.update).toCalledOnce();
        //});
        //
        //it("test change text", function(){
        //    font.text = "aaa";
        //
        //    loop(2);
        //});
        //it("test change fontFamily", function(){
        //    font.fontFamily = "aaa";
        //
        //    loop(2);
        //});
        //it("test change width", function(){
        //    font.width = 1;
        //
        //    loop(2);
        //});
        //it("test change height", function(){
        //    font.height = 1;
        //
        //    loop(2);
        //});
        //it("test change xAlignment", function(){
        //    font.xAlignment = wd.FontXAlignment.CENTER;
        //
        //    loop(2);
        //});
        //it("test change yAlignment", function(){
        //    font.yAlignment = wd.FontYAlignment.MIDDLE;
        //
        //    loop(2);
        //});


        //todo test more ui
    });
});
