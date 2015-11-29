describe("VideoTexture", function() {
    var sandbox = null;
    var Texture = null;
    var texture = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Texture = dy.VideoTexture;
        texture = new Texture();
        sandbox.stub(dy.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("dispose", function(){
        it("off dy_startLoop handler", function(){
            var asset = dy.VideoTextureAsset.create({
                isStop:false
            });
            texture = Texture.create(asset);


            texture.init();

            dy.EventManager.trigger(dy.CustomEvent.create("dy_startLoop"));

            expect(texture.needUpdate).toBeTruthy();


            texture.dispose();
            texture.needUpdate = false;

            dy.EventManager.trigger(dy.CustomEvent.create("dy_startLoop"));

            expect(texture.needUpdate).toBeFalsy();
        });
    });
});

