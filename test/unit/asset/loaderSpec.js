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
                //todo load .webm in chrome sometime fail!!!?
                //{url: testTool.resPath + "test/res/kinect.webm", id: "video2"}
                {url: testTool.resPath + "test/res/sintel.ogv", id: "video2"}
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

    describe("load dy file", function(){
        var json;

        function assertColor(color, colorArr){
            expect(color.toVector3()).toEqual(
                dy.Vector3.create(colorArr[0], colorArr[1], colorArr[2])
            );
        }

        function assertMetadata(data){
            expect(data.getChild("metadata").getChildren()).toEqual(json.metadata);
        }

        function assertScene(data){
            assertColor(data.getChild("scene").getChild("ambientColor"), json.scene.ambientColor);
        }

        function assertAnimation(data){
        }

        function assert1Obj(data){
            var result = data;

            var geo = result.getChild("models").getChild(0).getComponent(dy.Geometry);
            expect(geo.vertices.getChildren()).toEqual(
                json.objects.a.vertices
            );
            expect(geo.normals.getChildren()).toEqual(
                json.objects.a.normals
            );
            expect(geo.texCoords.getChildren()).toEqual(
                json.objects.a.uvs
            );
            expect(geo.colors.getChildren()).toEqual(
                json.objects.a.colors
            );
            expect(geo.indices.getChildren()).toEqual(
                json.objects.a.indices
            );

            geo.init();
            expect(testTool.getValues(geo.colorBuffer.data)).toEqual(
                json.objects.a.colors
            );




            var materialData = json.materials.aa;
            var mat = geo.material;
            assertColor(mat.color, materialData.diffuseColor);
            assertColor(mat.specular, materialData.specularColor);
            expect(mat.diffuseMap).toBeInstanceOf(dy.TwoDTexture);
            expect(mat.specularMap).toBeInstanceOf(dy.TwoDTexture);
            expect(mat.normalMap).toBeInstanceOf(dy.TwoDTexture);
            expect(mat.shininess).toEqual(materialData.shininess);
            expect(mat.opacity).toEqual(materialData.opacity);
        }

        function assert2Obj(data){
            var result = data;

            var materialData1 = json.materials.aa;
            var materialData2 = json.materials.bb;




            var m2 = result.getChild("models").getChild(1);
            expect(m2.getChildren().getCount()).toEqual(1);

            var geo2 = m2.getComponent(dy.Geometry);
            expect(geo2.vertices.getChildren()).toEqual(
                json.objects.b.vertices
            );
            expect(geo2.normals.getChildren()).toEqual(
                json.objects.b.normals
            );

            var mat2 = geo2.material;
            assertColor(mat2.color, materialData2.diffuseColor);





            var m21 = m2.getChild(0);
            expect(m21.getChildren().getCount()).toEqual(1);

            var geo21 = m21.getComponent(dy.Geometry);
            expect(geo21.colors.getChildren()).toEqual(
                json.objects.b.children.bb.colors
            )
            expect(geo21.indices.getChildren()).toEqual(
                json.objects.b.children.bb.indices
            )
            expect(geo21.vertices.getChildren()).toEqual(
                json.objects.b.vertices
            )
            expect(geo21.texCoords.getChildren()).toEqual(
                json.objects.b.uvs
            )
            expect(geo21.normals.getChildren()).toEqual(
                json.objects.b.normals
            )
            var mat21 = geo21.material;
            assertColor(mat21.color, materialData1.diffuseColor);



            var m211 = m21.getChild(0);
            expect(m211.getChildren().getCount()).toEqual(0);

            var geo211 = m211.getComponent(dy.Geometry);
            expect(geo211.colors.getChildren()).toEqual(
                json.objects.b.children.bb.colors
            )
            expect(geo211.indices.getChildren()).toEqual(
                json.objects.b.children.bb.children.bbb.indices
            )
            expect(geo211.vertices.getChildren()).toEqual(
                json.objects.b.vertices
            )
            expect(geo211.texCoords.getChildren()).toEqual(
                json.objects.b.uvs
            )
            expect(geo211.normals.getChildren()).toEqual(
                json.objects.b.normals
            )
            var mat211 = geo211.material;
            assertColor(mat211.color, materialData2.diffuseColor);

        }

        beforeEach(function(){
            json =
            {
                "metadata" : {
                    formatVersion:"0.1",
                    description:"aaa",
                    sourceFile:"b.dy",
                    generatedBy:"OBJConverter"
                },

                "scene":{
                    ambientColor: [1.0, 0, 0.5]
                },

                "materials": {
                    aa:{
                        type: "LightMaterial",
                        diffuseColor: [1.0, 0.1, 0],
                        specularColor: [0.0, 0.1, 0],
                        diffuseMapUrl: "1.jpg",
                        specularMapUrl: "1.jpg",
                        normalMapUrl: "1.jpg",
                        shininess: 32,
                        opacity: 1.0
                    },
                    bb:{
                        type: "LightMaterial",
                        diffuseColor: [0.0, 0.1, 0],
                        specularColor: [0.0, 0.2, 0],
                        normalMapUrl: "1.jpg",
                        shininess: 10,
                        opacity: 0.1
                    }
                },

                "objects":{
                    a:{
                        material:"aa",
                        vertices:[1, 2, 3, 2, 3, 4, 2, 3, 4],
                        normals:[1, 2, 3, -2, 3, 4, -2, 3, 4],
                        morphTargets: [
                        ],
                        colors: [0.1, 0.2, 0, 0.1, 0.2, 1, 0.1, 0.2, 1],
                        uvs:[0.1,0.2,0.1,0.2, 0.1,0.2],
                        indices:[1,2,3]
                    },
                    b:{
                        material:"bb",
                        vertices:[2, 2, 3, 2, 3, 4, 2, 3, 4],
                        normals:[-1, 2, 3, -2, 3, 4, -2, 3, 4],
                        morphTargets: [
                        ],
                        colors: [0.5, 0.2, 0, 0.1, 0.2, 1, 0.1, 0.2, 1],
                        uvs:[0.5,0.2,0.1,0.2, 0.1,0.2],
                        indices:[3,2,1],

                        children:{
                            bb:{
                                material:"aa",
                                morphTargets: [
                                ],
                                colors: [1.0, 0.3, 0, 0.1, 0.2, 1, 0.1, 0.2, 1],
                                indices:[2,3,1],

                                children:{
                                    bbb:{
                                        material:"bb",
                                        morphTargets: [
                                        ],
                                        indices:[1,3,2]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        it("load one obj file", function (done) {
            dy.LoaderManager.getInstance().load([
                {url: testTool.resPath + "test/res/dy/test.dy", id: "sceneModel"}
            ]).subscribe(function (data) {
            }, function (err) {
                expect().toFail(err.message);
                done();
            }, function () {
                var sceneModel = dy.DYLoader.getInstance().get("sceneModel");

                assertMetadata(sceneModel);
                assertScene(sceneModel);
                assert1Obj(sceneModel);
                assert2Obj(sceneModel);

                done();
            });
        });
        it("when load multi dy files, each one should be independent", function (done) {
            dy.LoaderManager.getInstance().load([
                {url: testTool.resPath + "test/res/dy/test.dy", id: "sceneModel1"},
                {url: testTool.resPath + "test/res/dy/test.dy", id: "sceneModel2"}
            ]).subscribe(function (data) {
            }, function (err) {
                expect().toFail(err.message);
                done();
            }, function () {
                var sceneModel1 = dy.DYLoader.getInstance().get("sceneModel1");

                assertMetadata(sceneModel1);
                assertScene(sceneModel1);
                assert1Obj(sceneModel1);
                assert2Obj(sceneModel1);

                var sceneModel2 = dy.DYLoader.getInstance().get("sceneModel2");

                assertMetadata(sceneModel2);
                assertScene(sceneModel2);
                assert1Obj(sceneModel2);
                assert2Obj(sceneModel2);

                done();
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
