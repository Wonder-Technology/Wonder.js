describe("loader", function () {
    var sandbox = null;
    var manager = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        manager = dy.LoaderManager.getInstance();
        sandbox.stub(dy.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance();
        manager.dispose();
        sandbox.restore();
    });

    //it("load glsl", function(done){
    //    var current = [],
    //        total = [];
    //
    //    dy.LoaderManager.getInstance().load([
    //        {url: testTool.resPath + "test/res/fragment.glsl", id: "a1"},
    //        {url: testTool.resPath + "test/res/fragment.glsl", id: "a2"}
    //    ]).subscribe(function(data){
    //        current.push(data.currentLoadedCount);
    //        total.push(data.assetCount);
    //    }, function(err){
    //    }, function(){
    //        expect(current).toEqual([1, 2]);
    //        expect(total).toEqual([2, 2]);
    //
    //        expect(dy.GLSLLoader.getInstance().get("a1")).toEqual("test");
    //        expect(dy.GLSLLoader.getInstance().get("a2")).toEqual("test");
    //
    //        done();
    //    });
    //});
    //
    ////todo load pvr
    //describe("load texture", function() {
    //    it("load common texture", function (done) {
    //        var current = [],
    //            total = [];
    //
    //        dy.LoaderManager.getInstance().load([
    //            {url: testTool.resPath + "test/res/1.jpg", id: "jpg"},
    //            {url: testTool.resPath + "test/res/2.png", id: "png"}
    //        ]).subscribe(function (data) {
    //            current.push(data.currentLoadedCount);
    //            total.push(data.assetCount);
    //        }, function (err) {
    //            console.log(err);
    //            done();
    //        }, function () {
    //            expect(current).toEqual([1, 2]);
    //            expect(total).toEqual([2, 2]);
    //
    //            var jpg = dy.TextureLoader.getInstance().get("jpg");
    //            var png = dy.TextureLoader.getInstance().get("png");
    //
    //            expect(jpg).toBeInstanceOf(dy.TwoDTextureAsset);
    //            expect(jpg.format).toEqual(dy.TextureFormat.RGB);
    //            expect(png).toBeInstanceOf(dy.TwoDTextureAsset);
    //            expect(png.format).toEqual(dy.TextureFormat.RGBA);
    //
    //            done();
    //        });
    //    });
    //    it("load compressed texture", function (done) {
    //        sandbox.stub(dy.GPUDetector.getInstance(), "extensionCompressedTextureS3TC", {
    //            COMPRESSED_RGB_S3TC_DXT1_EXT: "COMPRESSED_RGB_S3TC_DXT1_EXT"
    //        });
    //
    //        dy.LoaderManager.getInstance().load([
    //            {url: testTool.resPath + "test/res/disturb_dxt1_mip.dds", id: "dds"}
    //        ]).subscribe(function (data) {
    //        }, function (err) {
    //            console.log(err);
    //            done();
    //        }, function () {
    //            var dds = dy.TextureLoader.getInstance().get("dds");
    //
    //            expect(dds).toBeInstanceOf(dy.CompressedTextureAsset);
    //            expect(dds.format).toEqual("COMPRESSED_RGB_S3TC_DXT1_EXT");
    //            expect(dds.mipmaps.getCount()).toEqual(10);
    //            expect(dds.minFilter).toEqual(dy.TextureFilterMode.LINEAR_MIPMAP_LINEAR);
    //
    //            done();
    //        });
    //    });
    //});
    //
    //describe("load video", function(){
    //    it("test load success", function(done){
    //        var current = [],
    //            total = [];
    //
    //        dy.LoaderManager.getInstance().load([
    //            {url: [testTool.resPath + "test/res/sintel.mp4",testTool.resPath + "test/res/sintel.ogv"], id: "video1"},
    //            //todo load .webm in chrome sometime fail!!!?
    //            //{url: testTool.resPath + "test/res/kinect.webm", id: "video2"}
    //            {url: testTool.resPath + "test/res/sintel.ogv", id: "video2"}
    //        ]).subscribe(function(data){
    //            current.push(data.currentLoadedCount);
    //            total.push(data.assetCount);
    //        }, function(err){
    //            console.log(err);
    //        }, function(){
    //            expect(current).toEqual([1, 2]);
    //            expect(total).toEqual([2, 2]);
    //
    //            expect(dy.VideoLoader.getInstance().get("video1")).toBeInstanceOf(dy.VideoTextureAsset);
    //            expect(dy.VideoLoader.getInstance().get("video1").video).toBeInstanceOf(dy.Video);
    //            expect(dy.VideoLoader.getInstance().get("video1").video.url).toEqual(testTool.resPath + "test/res/sintel.mp4");
    //            expect(dy.VideoLoader.getInstance().get("video2")).toBeInstanceOf(dy.VideoTextureAsset);
    //
    //            done();
    //        });
    //    });
    //    //it("test load error", function(done){
    //    //
    //    //});
    //});

    describe("load obj model", function () {
        function getV2(x, y) {
            return dy.Vector2.create(x, y);
        }

        function getV3(x, y, z) {
            return dy.Vector3.create(x, y, z);
        }

        function getColor(r, g, b) {
            return dy.Color.create("rgb(" + r + "," + g + "," + b + ")");
        }

        it("if url is array, contract error", function(done){
            dy.LoaderManager.getInstance().load([
                {url: [testTool.resPath + "test/res/obj/test.obj"], id: "model"}
            ]).subscribe(function (data) {
            }, function (err) {
                expect(err).toBeDefined();
                //console.log(err);
                done();
            }, function () {
                expect().toFail();
            });
        });

        describe("test load model", function () {
            function assertFirstModel(model) {
                expect(model.getChild(0).name).toEqual("model1");

                var geo1 = model.getChild(0).getComponent(dy.Geometry);
                expect(geo1.vertices.getChildren()).toEqual(
                    [
                        getV3(1, -1, -1), getV3(1, 1, -1), getV3(1, 1, 1), getV3(1, -1, -1), getV3(1, 1, 1), getV3(1, -1, 1), getV3(1, -1, -1), getV3(1, -1, 1), getV3(-1, -1, 1), getV3(1, -1, -1), getV3(-1, -1, 1), getV3(-1, -1, -1)
                    ]
                );
                expect(geo1.normals.getChildren()).toEqual(
                    [
                        getV3(1,0,0), getV3(1,0,0), getV3(1,0,0), getV3(1,0,0), getV3(1,0,0), getV3(1,0,0), getV3(0,-1,0), getV3(0,-1,0), getV3(0,-1,0), getV3(0,-1,0), getV3(0,-1,0), getV3(0,-1,0)
                    ]
                );
                expect(geo1.texCoords.getChildren()).toEqual(
                    [
                        getV2(0, 0), getV2(1, 0), getV2(1, 1), getV2(0, 0), getV2(1, 1), getV2(0, 1), getV2(0, 0), getV2(1, 0), getV2(1, 1), getV2(0, 0), getV2(1, 1), getV2(0, 1)
                    ]
                );
                expect(geo1.indices.getChildren()).toEqual(
                    [
                        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
                    ]
                );
                var mat1 = geo1.material;
                expect(mat1.color).toEqual(
                    getColor(0.1, 0.2, 0.3)
                );
                expect(mat1.specular).toEqual(
                    getColor(0.5, 0.5, 0.5)
                );
                expect(mat1.diffuseMap).toBeInstanceOf(dy.TwoDTexture);
                expect(mat1.specularMap).toBeNull();
                expect(mat1.normalMap).toBeNull();
                expect(mat1.shininess).toEqual(96.078431);
                expect(mat1.opacity).toEqual(0.1);

            }

            function assertSecondModel(model) {
                expect(model.getChild(1).name).toEqual("model2");

                var geo2 = model.getChild(1).getComponent(dy.Geometry);
                expect(geo2.vertices.getChildren()).toEqual(
                    [
                        getV3(1, -1, -1), getV3(-1, -1, 1), getV3(1, -1, 1), getV3(1, -1, -1), getV3(1, -1, 1), getV3(-1, -1, -1)
                    ]
                );
                expect(geo2.normals.getChildren()).toEqual(
                    [
                        getV3(-1, -1, -1), getV3(-1, -1, 1), getV3(1, -1, 1), getV3(-1, -1, -1), getV3(1, -1, 1), getV3(1, -1, -1)
                    ]
                );
                expect(geo2.texCoords.getChildren()).toEqual(
                    [
                        getV2(0, 0), getV2(1, 0), getV2(1, 1), getV2(0, 0), getV2(1, 1), getV2(0, 1)
                    ]
                );
                expect(geo2.indices.getChildren()).toEqual(
                    [
                        0, 1, 2, 3, 4, 5
                    ]
                );
                var mat2 = geo2.material;
                expect(mat2.color).toEqual(
                    getColor(0.3, 0.2, 0.1)
                );
                expect(mat2.specular).toEqual(
                    getColor(0.8, 0.5, 0.6)
                );
                expect(mat2.diffuseMap).toBeNull();
                expect(mat2.specularMap).toBeInstanceOf(dy.TwoDTexture);
                expect(mat2.normalMap).toBeNull();
                expect(mat2.shininess).toEqual(80.078431);
                expect(mat2.opacity).toEqual(0.5);
            }

            it("load one obj file", function (done) {
                dy.LoaderManager.getInstance().load([
                    {url: testTool.resPath + "test/res/obj/test.obj", id: "model"}
                ]).subscribe(function (data) {
                }, function (err) {
                    expect().toFail(err.message);
                    done();
                }, function () {
                    var model = dy.OBJLoader.getInstance().get("model");

                    expect(model).toBeInstanceOf(dy.GameObject);
                    expect(model.name).toEqual("model");
                    expect(model.getChildren().getCount()).toEqual(2);
                    assertFirstModel(model);
                    assertSecondModel(model);

                    done();
                });
            });
            it("when load multi obj files, each one should be independent", function (done) {
                dy.LoaderManager.getInstance().load([
                    {url: testTool.resPath + "test/res/obj/test.obj", id: "model1"},
                    {url: testTool.resPath + "test/res/obj/test.obj", id: "model2"}
                ]).subscribe(function (data) {
                }, function (err) {
                    expect().toFail(err.message);
                    done();
                }, function () {
                    var model1 = dy.OBJLoader.getInstance().get("model1");

                    expect(model1).toBeInstanceOf(dy.GameObject);
                    expect(model1.getChildren().getCount()).toEqual(2);
                    expect(model1.name).toEqual("model1");
                    expect(model1.getChildren().getCount()).toEqual(2);

                    assertFirstModel(model1);
                    assertSecondModel(model1);


                    var model2 = dy.OBJLoader.getInstance().get("model2");

                    expect(model2).toBeInstanceOf(dy.GameObject);
                    expect(model2.getChildren().getCount()).toEqual(2);
                    expect(model2.name).toEqual("model2");
                    expect(model2.getChildren().getCount()).toEqual(2);
                    assertFirstModel(model2);
                    assertSecondModel(model2);

                    done();
                });
            });
            it("load obj with no mtl", function () {
                //todo
            });
        });
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
    //    sandbox.stub(dy.Log, "log");
    //
    //    manager.load([
    //        {url: testTool.resPath + "test/res/fragment.glsl", id: "a1"}
    //    ]).subscribe(function(data){}, function(error){
    //        expect(error).toEqual(err);
    //        expect(dy.Log.log).toCalledOnce();
    //
    //        done();
    //    }, function(){
    //    });
    //});
});
