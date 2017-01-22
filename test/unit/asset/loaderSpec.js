describe("loader", function () {
    var sandbox = null;
    var manager = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        manager = wd.LoaderManager.getInstance();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        manager.dispose();
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });


    describe("get asset", function(){
        it("use LoaderManager.getInstance().get(id) to get loaded asset", function(done){
            wd.LoaderManager.getInstance().load([
                {url: testTool.resPath + "test/res/fragment.glsl", id: "a1"}
            ]).subscribe(function(data){
            }, function(err){
            }, function(){
                expect(manager.get("a1")).toEqual("test");

                done();
            });
        });
        it("use XXXLoader.getInstance().get(id) to get loaded asset", function(done){
            wd.LoaderManager.getInstance().load([
                {url: testTool.resPath + "test/res/fragment.glsl", id: "a1"}
            ]).subscribe(function(data){
            }, function(err){
            }, function(){
                expect(wd.GLSLLoader.getInstance().get("a1")).toEqual("test");

                done();
            });
        });
    });

    it("load glsl", function(done){
        var current = [],
            total = [];

        wd.LoaderManager.getInstance().load([
            {url: testTool.resPath + "test/res/fragment.glsl", id: "a1"},
            {url: testTool.resPath + "test/res/fragment.glsl", id: "a2"}
        ]).subscribe(function(data){
            current.push(data.currentLoadedCount);
            total.push(data.assetCount);
        }, function(err){
        }, function(){
            expect(current).toEqual([1, 2]);
            expect(total).toEqual([2, 2]);

            expect(wd.LoaderManager.getInstance().get("a1")).toEqual("test");
            expect(wd.LoaderManager.getInstance().get("a2")).toEqual("test");

            done();
        });
    });

    //todo load pvr
    describe("load texture", function() {
        it("load common texture", function (done) {
            var current = [],
                total = [];

            wd.LoaderManager.getInstance().load([
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

                var jpg = wd.LoaderManager.getInstance().get("jpg");
                var png = wd.LoaderManager.getInstance().get("png");

                expect(jpg).toBeInstanceOf(wd.ImageTextureAsset);
                expect(jpg.format).toEqual(wd.ETextureFormat.RGB);
                expect(png).toBeInstanceOf(wd.ImageTextureAsset);
                expect(png.format).toEqual(wd.ETextureFormat.RGBA);

                done();
            });
        });
        it("load compressed texture", function (done) {
            sandbox.stub(wd.GPUDetector.getInstance(), "extensionCompressedTextureS3TC", {
                COMPRESSED_RGB_S3TC_DXT1_EXT: "COMPRESSED_RGB_S3TC_DXT1_EXT"
            });

            wd.LoaderManager.getInstance().load([
                {url: testTool.resPath + "test/res/disturb_dxt1_mip.dds", id: "dds"}
            ]).subscribe(function (data) {
            }, function (err) {
                console.log(err);
                done();
            }, function () {
                var dds = wd.LoaderManager.getInstance().get("dds");

                expect(dds).toBeInstanceOf(wd.CompressedTextureAsset);
                expect(dds.format).toEqual("COMPRESSED_RGB_S3TC_DXT1_EXT");
                expect(dds.mipmaps.getCount()).toEqual(10);
                expect(dds.minFilter).toEqual(wd.ETextureFilterMode.LINEAR_MIPMAP_LINEAR);

                done();
            });
        });
        it("test set crossOrigin", function (done) {
            var current = [],
                total = [];

            wd.LoaderManager.getInstance().load([
                {url: testTool.resPath + "test/res/1.jpg", id: "jpg", config:{
                isCrossOrigin:true
                }},
                {url: testTool.resPath + "test/res/2.png", id: "png"}
            ]).subscribe(function (data) {
            }, function (err) {
                console.log(err);
                done();
            }, function () {
                var jpg = wd.LoaderManager.getInstance().get("jpg");
                var png = wd.LoaderManager.getInstance().get("png");

                expect(jpg.source.crossOrigin).toEqual("anonymous")

                if(!ciTool.isTestInCI()){
                    expect(png.source.crossOrigin).not.toBeExist();
                }

                done();
            });
        });
    });

    describe("load video", function(){
        //todo load video in chrome sometime fail!!!?
        //so now not test it

        //it("test load success", function(done){
        //    var current = [],
        //        total = [];
        //
        //    wd.LoaderManager.getInstance().load([
        //        {url: [testTool.resPath + "test/res/sintel.mp4",testTool.resPath + "test/res/sintel.ogv"], id: "video1"},
        //        //{url: testTool.resPath + "test/res/kinect.webm", id: "video2"}
        //        {url: testTool.resPath + "test/res/sintel.ogv", id: "video2"}
        //    ]).subscribe(function(data){
        //        current.push(data.currentLoadedCount);
        //        total.push(data.assetCount);
        //    }, function(err){
        //        console.log(err);
        //    }, function(){
        //        expect(current).toEqual([1, 2]);
        //        expect(total).toEqual([2, 2]);
        //
        //        expect(wd.LoaderManager.getInstance().get("video1")).toBeInstanceOf(wd.VideoTextureAsset);
        //        expect(wd.LoaderManager.getInstance().get("video1").video).toBeInstanceOf(wd.Video);
        //        expect(wd.LoaderManager.getInstance().get("video1").video.url).toEqual(testTool.resPath + "test/res/sintel.mp4");
        //        expect(wd.LoaderManager.getInstance().get("video2")).toBeInstanceOf(wd.VideoTextureAsset);
        //
        //        done();
        //    });
        //});
        //it("test load error", function(done){
        //
        //});
    });

    describe("load sound", function(){
        if(bowser.firefox){
            return;
        }

        it("load the can-play asset", function(done){
           var current = [],
               total = [];

            sandbox.stub(wd.SoundUtils, "getMimeStr");

            //not support .ogg sound
            wd.SoundUtils.getMimeStr.withArgs("ogg").returns(null);
            wd.SoundUtils.getMimeStr.withArgs("mp3").returns("audio/mpeg");

           wd.LoaderManager.getInstance().load([
               {url: [testTool.resPath + "test/res/sound/b.ogg",testTool.resPath + "test/res/sound/a.mp3"], id: "sound1"}
           ]).subscribe(function(data){
               current.push(data.currentLoadedCount);
               total.push(data.assetCount);
           }, function(err){
               console.log(err);
           }, function(){
               expect(current).toEqual([1]);
               expect(total).toEqual([1]);

               var sound = wd.LoaderManager.getInstance().get("sound1");

               expect(sound).toBeInstanceOf(wd.BaseAudio);
               expect(sound.url).toEqual(testTool.resPath + "test/res/sound/a.mp3");

               done();
           });
        });
        it("if the current asset can't be loaded, skip it and load the next", function (done) {
           var current = [],
               total = [];

            sandbox.stub(wd.SoundUtils, "getMimeStr");

            //not support .ogg sound
            wd.SoundUtils.getMimeStr.withArgs("ogg").returns(null);
            wd.SoundUtils.getMimeStr.withArgs("mp3").returns("audio/mpeg");

           wd.LoaderManager.getInstance().load([
               {url: testTool.resPath + "test/res/sound/b.ogg", id: "sound1"},
               {url: testTool.resPath + "test/res/sound/a.mp3", id: "sound2"}
           ]).subscribe(function(data){
               current.push(data.currentLoadedCount);
               total.push(data.assetCount);
           }, function(err){
               console.log(err);
           }, function(){
               expect(current).toEqual([1, 2]);
               expect(total).toEqual([2, 2]);

               var sound1 = wd.LoaderManager.getInstance().get("sound1");

               expect(sound1).toBeNull();

               var sound2 = wd.LoaderManager.getInstance().get("sound2");
               expect(sound2).toBeInstanceOf(wd.BaseAudio);

               expect(sound2.url).toEqual(testTool.resPath + "test/res/sound/a.mp3");

               done();
           });
        });

    });

    describe("load font asset", function(){
        describe("plain font", function(){
            beforeEach(function(){

            });
            afterEach(function(){
                $("style").remove();
            });

            it("if browser support document.fonts api, it can ensure that the font is loaded", function(done) {
                if(!document.fonts){
                    done();

                    return;
                }

                sandbox.spy(document.fonts, "load");

                wd.LoaderManager.getInstance().load([
                    {type: wd.EAssetType.FONT, url: testTool.resPath + "test/res/font/Urdeutsch.ttf", id: "Urdeutsch"}
                ]).subscribe(function (data) {
                }, null, function () {
                    expect(document.fonts.load).toCalledOnce();

                    done();
                });
            });

            describe("load .ttf", function(){
                it("add style element with @font-face into body to load ttf font", function(done){
                    wd.LoaderManager.getInstance().load([
                        {type: wd.EAssetType.FONT, url: testTool.resPath + "test/res/font/Urdeutsch.ttf", id: "Urdeutsch"}
                    ]).subscribe(function(data){
                    }, null, function(){
                        expect($("style").length).toEqual(1);


                        done();
                    });
                });
                it("dipose method should remove the added style element", function(done){
                    wd.LoaderManager.getInstance().load([
                        {type: wd.EAssetType.FONT, url: testTool.resPath + "test/res/font/Urdeutsch.ttf", id: "Urdeutsch"}
                    ]).subscribe(function(data){
                    }, null, function(){
                        expect($("style").length).toEqual(1);

                        wd.LoaderManager.getInstance().dispose();

                        expect($("style").length).toEqual(0);

                        done();
                    });
                });
            });
        });

        describe("bitmap font", function(){
            it("load and parse fnt file", function(done){
                wd.LoaderManager.getInstance().load([
                    {url: testTool.resPath + "test/res/font/myFont.fnt", id: "myFont_fnt"}
                ]).subscribe(function(data){
                }, null, function(){
                    var fnt = wd.LoaderManager.getInstance().get("myFont_fnt");

                    expect(fnt.commonHeight).toEqual(90);
                    expect(fnt.atlasName).toEqual(testTool.resPath + "test/res/font/myFont.png");
                    expect(fnt.fontDefDictionary).toBeDefined();
                    expect(fnt.commonBase).toEqual(70);
                    expect(fnt.scaleW).toEqual(490);
                    expect(fnt.scaleH).toEqual(547);
                    expect(fnt.kerningArray.length).toEqual(241);
                    expect(fnt.kerningArray[0]).toEqual({
                        first:89,
                        second:112,
                        amount:-3
                    });

                    done();
                });
            });
            it("load bitmap file", function(done){
                wd.LoaderManager.getInstance().load([
                    {url: testTool.resPath + "test/res/font/myFont.png", id: "myFont_image"}
                ]).subscribe(function(data){
                }, null, function(){
                    var bitmap = wd.LoaderManager.getInstance().get("myFont_image");

                    expect(bitmap).toBeInstanceOf(wd.ImageTextureAsset);
                    expect(bitmap.format).toEqual(wd.ETextureFormat.RGBA);

                    done();
                });
            });
            it("test multi pages", function (done) {
                wd.LoaderManager.getInstance().load([
                    {url: testTool.resPath + "test/res/font/Norwester-Multi-64.fnt", id: "myFont_fnt"}
                ]).subscribe(function(data){
                }, null, function(){
                    var fnt = wd.LoaderManager.getInstance().get("myFont_fnt");

                    expect(fnt.isMultiPages).toBeTruthy();

                    var dict = fnt.fontDefDictionary;
                    expect(dict).toBeDefined();
                    expect(dict["10"].page).toEqual(1);
                    expect(dict["32"].page).toEqual(0);

                    done();
                });
            });

        });
    });

    describe("if XXXLoader class not exist, not load corresponding asset", function () {
        var SoundLoader;

        function judge(done, url) {
            var current = [],
                total = [];

            sandbox.stub(wd.SoundUtils, "getMimeStr");

            wd.SoundUtils.getMimeStr.withArgs("mp3").returns("audio/mpeg");

            wd.LoaderManager.getInstance().load([
                {url: url, id: "sound1"}
            ]).subscribe(function(data){
                current.push(data.currentLoadedCount);
                total.push(data.assetCount);
            }, function(err){
                console.log(err);
                expect().toFail();

                done();
            }, function(){
                expect(current).toEqual([]);
                expect(total).toEqual([]);

                var sound = wd.LoaderManager.getInstance().get("sound1");

                expect(sound).toBeNull();

                done();
            });
        }

        beforeEach(function(){
            SoundLoader = wd.SoundLoader;
            delete wd.SoundLoader;
        });
        afterEach(function(){
            wd.SoundLoader = SoundLoader;
        });

        it("test single asset", function (done) {
            judge(done, testTool.resPath + "test/res/sound/a.mp3");
        });
        it("test multi assets", function (done) {
            judge(done, [testTool.resPath + "test/res/sound/a.mp3"]);
        });
    });
});
