describe("VideoManager", function () {
    var sandbox = null;
    var manager = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        manager = wd.VideoManager.getInstance();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("play", function(){
        it("play video which from loader", function(){
            var video = {
                play:sandbox.stub()
            };
            sandbox.stub(wd.VideoLoader.getInstance(), "get").returns({
                video:video
            });

            manager.play("a");

            expect(wd.VideoLoader.getInstance().get).toCalledWith("a");
            expect(video.play).toCalledOnce();
        });
    });
});
