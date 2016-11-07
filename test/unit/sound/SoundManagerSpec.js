describe("SoundManager", function () {
    var sandbox = null;
    var manager = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        manager = wd.SoundManager.getInstance();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("play", function(){
        it("play video which from loader", function(){
            var sound = wd.WebAudio.create({
                urlArr:[],
                onLoad:function () {
                },
                onError:function () {
                }
            });
            sandbox.stub(sound, "play");
            sandbox.stub(sound, "canPlay").returns(true);
            sandbox.stub(wd.LoaderManager.getInstance(), "get").returns(sound);

            manager.play("a");

            expect(wd.LoaderManager.getInstance().get).toCalledWith("a");
            expect(sound.play).toCalledOnce();
        });
    });
});
