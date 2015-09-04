describe("VideoManager", function () {
    var sandbox = null;
    var manager = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        manager = dy.VideoManager.getInstance();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("play", function(){
        it("play video which from loader", function(){
            var video = {
                play:sandbox.stub()
            };
            sandbox.stub(dy.VideoLoader.getInstance(), "get").returns({
                video:video
            });

            manager.play("a");

            expect(dy.VideoLoader.getInstance().get).toCalledWith("a");
            expect(video.play).toCalledOnce();
        });
    });
});

