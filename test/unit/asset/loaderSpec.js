describe("loader", function () {
    var sandbox = null;
    var manager = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        manager = dy.LoaderManager.getInstance();
    });
    afterEach(function () {
        manager.dispose();
        sandbox.restore();
    });

    it("load glsl", function(done){
        var current = [],
            total = [];

        dy.LoaderManager.getInstance().load([
            {url: testTool.resPath + "test/res/fragment.glsl", id: "a1"},
            {url: testTool.resPath + "test/res/fragment.glsl", id: "a2"}
        ]).subscribe(function(data){
            current.push(data.currentLoadedCount);
            total.push(data.assetCount);
        }, function(err){
        }, function(){
            expect(current).toEqual([1, 2]);
            expect(total).toEqual([2, 2]);

            expect(dy.GLSLLoader.getInstance().get("a1")).toEqual("test");
            expect(dy.GLSLLoader.getInstance().get("a2")).toEqual("test");

            done();
        });
    });

    //todo load pvr
    describe("load texture", function() {
        it("load common texture", function (done) {
            var current = [],
                total = [];

            dy.LoaderManager.getInstance().load([
                {url: testTool.resPath + "test/res/1.jpg", id: "jpg"},
                {url: testTool.resPath + "test/res/2.png", id: "png"}
            ]).subscribe(function (data) {
                current.push(data.currentLoadedCount);
                total.push(data.assetCount);
            }, function (err) {
                console.log(err);
                done();
            }, function () {
                expect(current).toEqual([1, 2]);
                expect(total).toEqual([2, 2]);

                var jpg = dy.TextureLoader.getInstance().get("jpg");
                var png = dy.TextureLoader.getInstance().get("png");

                expect(jpg).toBeInstanceOf(dy.TwoDTextureAsset);
                expect(jpg.format).toEqual(dy.TextureFormat.RGB);
                expect(png).toBeInstanceOf(dy.TwoDTextureAsset);
                expect(png.format).toEqual(dy.TextureFormat.RGBA);

                done();
            });
        });
        it("load compressed texture", function (done) {
            sandbox.stub(dy.GPUDetector.getInstance(), "extensionCompressedTextureS3TC", {
                COMPRESSED_RGB_S3TC_DXT1_EXT: "COMPRESSED_RGB_S3TC_DXT1_EXT"
            });

            dy.LoaderManager.getInstance().load([
                {url: testTool.resPath + "test/res/disturb_dxt1_mip.dds", id: "dds"}
            ]).subscribe(function (data) {
            }, function (err) {
                console.log(err);
                done();
            }, function () {
                var dds = dy.TextureLoader.getInstance().get("dds");

                expect(dds).toBeInstanceOf(dy.CompressedTextureAsset);
                expect(dds.format).toEqual("COMPRESSED_RGB_S3TC_DXT1_EXT");
                expect(dds.mipmaps.getCount()).toEqual(10);
                expect(dds.minFilter).toEqual(dy.TextureFilterMode.LINEAR_MIPMAP_LINEAR);

                done();
            });
        });
    });

    describe("load video", function(){
        it("test load success", function(done){
            var current = [],
                total = [];

            dy.LoaderManager.getInstance().load([
                {url: [testTool.resPath + "test/res/sintel.mp4",testTool.resPath + "test/res/sintel.ogv"], id: "video1"},
                {url: testTool.resPath + "test/res/sintel.webm", id: "video2"}
            ]).subscribe(function(data){
                current.push(data.currentLoadedCount);
                total.push(data.assetCount);
            }, function(err){
                console.log(err);
            }, function(){
                expect(current).toEqual([1, 2]);
                expect(total).toEqual([2, 2]);

                expect(dy.VideoLoader.getInstance().get("video1")).toBeInstanceOf(dy.VideoTextureAsset);
                expect(dy.VideoLoader.getInstance().get("video1").video).toBeInstanceOf(dy.Video);
                expect(dy.VideoLoader.getInstance().get("video1").video.url).toEqual(testTool.resPath + "test/res/sintel.mp4");
                expect(dy.VideoLoader.getInstance().get("video2")).toBeInstanceOf(dy.VideoTextureAsset);

                done();
            });
        });
        //it("test load error", function(done){
        //
        //});
    });

    //it("if already load the same id, not load it again", function(done){
    //    sandbox.spy(dyCb.AjaxUtils, "ajax");
    //    var current = [],
    //        total = [];
    //
    //    manager.load([
    //        {url: testTool.resPath + "test/res/fragment.glsl", id: "a1"}
    //    ]).subscribe(function(data){}, null, function(){
    //        manager.load([
    //            {url: testTool.resPath + "test/res/fragment.glsl", id: "a1"}
    //        ]).subscribe(function(data){
    //            current.push(data.currentLoadedCount);
    //            total.push(data.resCount);
    //        }, null, function(){
    //            expect(current).toEqual([]);
    //            expect(total).toEqual([]);
    //            expect(manager.currentLoadedCount).toEqual(1);
    //            expect(manager.resCount).toEqual(1);
    //
    //            expect(dyCb.AjaxUtils.ajax).toCalledOnce();
    //
    //            expect(dy.GLSLLoader.getInstance().get("a1")).toEqual("test");
    //
    //            done();
    //        });
    //    });
    //});
    //it("if error, just log it, don't pass to stream error handler", function(done){
    //    var err = new Error("err");
    //    var promise = new RSVP.Promise(function (resolve, reject) {
    //        reject(err);
    //    });
    //    sandbox.stub(dy.GLSLLoader.getInstance(), "_loadText").returns(promise);
    //    sandbox.stub(dyCb.Log, "log");
    //
    //    manager.load([
    //        {url: testTool.resPath + "test/res/fragment.glsl", id: "a1"}
    //    ]).subscribe(function(data){}, function(error){
    //        expect(error).toEqual(err);
    //        expect(dyCb.Log.log).toCalledOnce();
    //
    //        done();
    //    }, function(){
    //    });
    //});
});
