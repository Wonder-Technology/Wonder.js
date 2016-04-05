describe("loader", function () {
    var sandbox = null;
    var manager = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        manager = wd.LoaderManager.getInstance();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance();
        manager.dispose();
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

    describe("load wd file", function(){
        var json;

        function assertColor(color, colorArr){
            expect(color.toVector3()).toEqual(
                wd.Vector3.create(colorArr[0], colorArr[1], colorArr[2])
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


            var geo = result.getChild("models").getChild(0).getComponent(wd.Geometry);
            var model1 = json.objects[0];
            expect(geo.vertices).toEqual(
                model1.vertices
            );
            expect(geo.faces[0].vertexNormals.getCount()).toEqual(0);
            expect(testTool.getValues(geo.texCoords)).toEqual(
                testTool.getValues(model1.uvs)
            );
            expect(testTool.getValues(geo.colors)).toEqual(
                testTool.getValues(model1.colors)
            );
            geometryTool.judgeFaceIndices(geo.faces, model1.indices);

            geo.init();

            var geometryData = geo.buffers.geometryData;
            expect(geometryData.indices).toEqual(model1.indices);
            //test computed normals
            expect(geometryData.normals).toEqual(model1.normals);




            var materialData = json.materials.aa;
            var mat = geo.material;
            assertColor(mat.color, materialData.diffuseColor);
            assertColor(mat.specularColor, materialData.specularColor);
            expect(mat.diffuseMap).toBeInstanceOf(wd.ImageTexture);
            expect(mat.specularMap).toBeInstanceOf(wd.ImageTexture);
            expect(mat.normalMap).toBeInstanceOf(wd.ImageTexture);
            expect(mat.shininess).toEqual(materialData.shininess);
            expect(mat.opacity).toEqual(materialData.opacity);
        }

        function assert2Obj(data){
            var result = data;

            var materialData1 = json.materials.aa;
            var materialData2 = json.materials.bb;




            var m2 = result.getChild("models").getChild(1);
            expect(m2.getChildren().getCount()).toEqual(2);

            var geo2 = m2.getComponent(wd.Geometry);
            var model2 = json.objects[1];
            expect(geo2).toBeNull();
            //expect(geo2.vertices).toBeUndefined();
            //expect(geo2.normals).toBeUndefined();
            //
            //var mat2 = geo2.material;
            //assertColor(mat2.color, materialData2.diffuseColor);






            expect(m2.hasTag(wd.EWDTag.CONTAINER)).toBeTruthy();



            var m21 = m2.getChild(0);
            expect(m21.getChildren().getCount()).toEqual(0);

            var geo21 = m21.getComponent(wd.Geometry);
            expect(testTool.getValues(geo21.colors)).toEqual(
                testTool.getValues(model2.children[0].colors)
            )
            geometryTool.judgeFaceIndices(geo21.faces, model2.children[0].indices);
            expect(geo21.vertices).toEqual(
                model2.children[0].vertices
            )
            expect(geo21.texCoords).toEqual(
                model2.children[0].uvs
            )
            geometryTool.judgeFaceVertexNormals(geo21.faces, model2.children[0].normals);
            var mat21 = geo21.material;
            assertColor(mat21.color, materialData1.diffuseColor);



            var m22 = m2.getChild(1);
            expect(m22.getChildren().getCount()).toEqual(0);

            var geo22 = m22.getComponent(wd.Geometry);
            expect(geo22.colors).toEqual(
                model2.children[1].colors
            )
            geometryTool.judgeFaceIndices(geo22.faces, model2.children[1].indices);
            expect(geo22.vertices).toEqual(
                model2.children[1].vertices
            )
            expect(geo22.texCoords).toEqual(
                model2.children[1].uvs
            )
            geometryTool.judgeFaceVertexNormals(geo22.faces, model2.children[1].normals);
            var mat22 = geo22.material;
            assertColor(mat22.color, materialData2.diffuseColor);

        }

        beforeEach(function(){
            json =
            {
                "metadata" : {
                    formatVersion:"0.1.0",
                    description:"aaa",
                    sourceFile:"test.wd",
                    generatedBy:"WDConverter"
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

                "objects":[
                    {
                        name:"a",
                        material:"aa",
                        vertices:[-1, 2, 1, 2, -3, 4, 2, 3, 4],
                        normals:[ -0.7071067690849304, 0, 0.7071067690849304, -0.7071067690849304, 0, 0.7071067690849304, -0.7071067690849304, 0, 0.7071067690849304 ],
                        morphTargets: [],
                        colors: [0.10000000149011612, 0.20000000298023224, 0, 0.10000000149011612, 0.20000000298023224, 1, 0.10000000149011612, 0.20000000298023224, 1],
                        uvs:[0.10000000149011612, 0.20000000298023224, 0.10000000149011612, 0.20000000298023224, 0.10000000149011612, 0.20000000298023224 ],
                        indices:[0,1,2]
                    },
                    {
                        name:"b",
                        normals:[-1, 2, 3, -2, 3, 4, -2, 3, 4],
                        uvs:[0.5,0.2,0.1,0.2, 0.1,0.2],

                        children:[
                            {
                                name:"bb",
                                colors: [1, 0.3, 0, 0.1, 0.2, 1, 0.1, 0.2, 1 ],
                                vertices: [2, 2, 3, 2, 3, 4, 2, 3, 4 ],
                                uvs:[0.5, 0.2, 0.1, 0.2, 0.1, 0.2],
                                normals:[-2, 3, 4, -2, 3, 4, -1, 2, 3 ],
                                material: "aa",
                                morphTargets: [],
                                indices:[2, 1, 0 ]
                            },
                            {
                                name:"cc",
                                material:"bb",
                                colors:[0.5, 0.2, 0, 0.1, 0.2, 1, 0.1, 0.2, 1 ],
                                vertices:[ 2, 2, 3, 2, 3, 4, 2, 3, 4 ],
                                uvs:[0.1, 0.2, 0.1, 0.2, 0.5, 0.2],
                                normals:[-2, 3, 4, -2, 3, 4, -1, 2, 3],
                                morphTargets: [],
                                indices:[0, 2, 1 ]
                            }
                        ]
                    }
                ]
            }
        });

        it("load one obj file", function (done) {
            wd.LoaderManager.getInstance().load([
                {url: testTool.resPath + "test/res/wd/test.wd", id: "sceneModel"}
            ]).subscribe(function (data) {
            }, function (err) {
                expect().toFail(err.message);
                done();
            }, function () {
                var sceneModel = wd.LoaderManager.getInstance().get("sceneModel");

                assertMetadata(sceneModel);
                assertScene(sceneModel);
                assert1Obj(sceneModel);
                assert2Obj(sceneModel);

                done();
            });
        });
        it("currentLoadedCount should equal wd files' count, not contain the material images' count", function (done) {
            var current =[],
                total = [];

            wd.LoaderManager.getInstance().load([
                {url: testTool.resPath + "test/res/wd/test.wd", id: "sceneModel"}
            ]).subscribe(function (data) {
                current.push(data.currentLoadedCount);
                total.push(data.assetCount);
            }, function (err) {
                expect().toFail(err.message);
                done();
            }, function () {
                expect(current).toEqual([1]);
                expect(total).toEqual([1]);

                done();
            });
        });
        it("save material image asset in TextureLoader and LoaderManager", function (done) {
            wd.LoaderManager.getInstance().load([
                {url: testTool.resPath + "test/res/wd/test.wd", id: "sceneModel"}
            ]).subscribe(function (data) {
            }, function (err) {
                expect().toFail(err.message);
                done();
            }, function () {
                var loader = wd.TextureLoader.getInstance();

                expect(loader.get("base/test/res/wd/1.jpg")).toEqual(jasmine.any(wd.ImageTextureAsset));
                expect(wd.LoaderManager.getInstance().get("base/test/res/wd/1.jpg")).toEqual(jasmine.any(wd.ImageTextureAsset));

                done();
            });
        });
        //todo modify gltf loader!

        it("when load multi wd files, each one should be independent", function (done) {
            wd.LoaderManager.getInstance().load([
                {url: testTool.resPath + "test/res/wd/test.wd", id: "sceneModel1"},
                {url: testTool.resPath + "test/res/wd/test2.wd", id: "sceneModel2"}
            ]).subscribe(function (data) {
            }, function (err) {
                expect().toFail(err.message);
                done();
            }, function () {
                var sceneModel1 = wd.LoaderManager.getInstance().get("sceneModel1");

                expect(sceneModel1.getChild("models").getChild(0).name).toEqual("a");

                var sceneModel2 = wd.LoaderManager.getInstance().get("sceneModel2");

                expect(sceneModel2.getChild("models").getChild(0).name).toEqual("b");

                done();
            });
        });
    });

    describe("load gltf file", function(){
        var json;

        function assertMetadata(data){
            expect(data.getChild("metadata").getChildren()).toEqual(json.metadata);
        }

        function assertObj(data){
            var result = data;


            var boxGeo = result.getChild("models").getChild(0).getChild(0).getComponent(wd.Geometry);

            expect(boxGeo.vertices.length).toEqual(72);


            var boxMat = boxGeo.material;

            expect(boxMat.diffuseMap).toBeInstanceOf(wd.ImageTexture);
            expect(boxMat.specularColor.r).toEqual(0.2)
        }

        beforeEach(function(){
            json =
            {
                "metadata" : {
                    "generator": "collada2gltf@ceec062e3d5793f2f249f53cbd843aee382ad40b",
                    "premultipliedAlpha": true,
                    "profile": {
                        "api": "WebGL",
                        "version": "1.0.2"
                    },
                    "version": 1
                }
            }

            sandbox.stub(wd.Log, "error");
        });

        it("test load metadata and buffer/image assets", function (done) {
            wd.LoaderManager.getInstance().load([
                {url: testTool.resPath + "test/res/gltf/boxTextured/glTF-MaterialsCommon/CesiumTexturedBoxTest.gltf", id: "sceneModel"}
            ]).subscribe(function (data) {
            }, function (err) {
                expect().toFail(err.message);
                done();
            }, function () {
                var sceneModel = wd.LoaderManager.getInstance().get("sceneModel");

                assertMetadata(sceneModel);

                assertObj(sceneModel);

                done();
            });
        });
        it("when load multi gltf files, each one should be independent", function (done) {
            wd.LoaderManager.getInstance().load([
                {url: testTool.resPath + "test/res/gltf/boxTextured/glTF-MaterialsCommon/CesiumTexturedBoxTest.gltf", id: "sceneModel1"},
                {url: testTool.resPath + "test/res/gltf/box/glTF-MaterialsCommon/box.gltf", id: "sceneModel2"}
            ]).subscribe(function (data) {
            }, function (err) {
                expect().toFail(err.message);
                done();
            }, function () {
                var sceneModel1 = wd.LoaderManager.getInstance().get("sceneModel1");

                expect(sceneModel1.getChild("models").getChild(0).name).toEqual("CesiumTexturedBox");

                var sceneModel2 = wd.LoaderManager.getInstance().get("sceneModel2");

                expect(sceneModel2.getChild("models").getChild(0).name).toEqual("box");

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
        });
    });
});
