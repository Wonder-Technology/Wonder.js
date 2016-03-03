describe("VideoTexture", function() {
    var sandbox = null;
    var Texture = null;
    var texture = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Texture = wd.VideoTexture;
        texture = new Texture();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("dispose", function(){
        it("unbind startLoop event", function(){
            var asset = wd.VideoTextureAsset.create({
                isStop:false
            });
            texture = Texture.create(asset);


            texture.init();

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.STARTLOOP));

            expect(texture.needUpdate).toBeTruthy();


            texture.dispose();
            texture.needUpdate = false;

            wd.EventManager.trigger(wd.CustomEvent.create(wd.EEngineEvent.STARTLOOP));

            expect(texture.needUpdate).toBeFalsy();
        });
    });
});

