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
        //todo load video in chrome sometime fail!!!?
        //so now not test it

        //it("test load success", function(done){
        //    var current = [],
        //        total = [];
        //
        //    dy.LoaderManager.getInstance().load([
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
        //        expect(dy.VideoLoader.getInstance().get("video1")).toBeInstanceOf(dy.VideoTextureAsset);
        //        expect(dy.VideoLoader.getInstance().get("video1").video).toBeInstanceOf(dy.Video);
        //        expect(dy.VideoLoader.getInstance().get("video1").video.url).toEqual(testTool.resPath + "test/res/sintel.mp4");
        //        expect(dy.VideoLoader.getInstance().get("video2")).toBeInstanceOf(dy.VideoTextureAsset);
        //
        //        done();
        //    });
        //});
        //it("test load error", function(done){
        //
        //});
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
            var model1 = json.objects[0];
            expect(geo.vertices).toEqual(
                model1.vertices
            );
            expect(geo.faces[0].vertexNormals.getCount()).toEqual(0);
            expect(geo.texCoords).toEqual(
                model1.uvs
            );
            expect(geo.colors).toEqual(
                model1.colors
            );
            dyTool.judgeFaceIndices(geo.faces, model1.indices);

            geo.init();



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
            expect(m2.getChildren().getCount()).toEqual(2);

            var geo2 = m2.getComponent(dy.Geometry);
            var model2 = json.objects[1];
            expect(geo2).toBeNull();
            //expect(geo2.vertices).toBeUndefined();
            //expect(geo2.normals).toBeUndefined();
            //
            //var mat2 = geo2.material;
            //assertColor(mat2.color, materialData2.diffuseColor);





            var m21 = m2.getChild(0);
            expect(m21.getChildren().getCount()).toEqual(0);

            var geo21 = m21.getComponent(dy.Geometry);
            expect(geo21.colors).toEqual(
                model2.children[0].colors
            )
            dyTool.judgeFaceIndices(geo21.faces, model2.children[0].indices);
            expect(geo21.vertices).toEqual(
                model2.children[0].vertices
            )
            expect(geo21.texCoords).toEqual(
                model2.children[0].uvs
            )
            dyTool.judgeFaceVertexNormals(geo21.faces, model2.children[0].normals);
            var mat21 = geo21.material;
            assertColor(mat21.color, materialData1.diffuseColor);



            var m22 = m2.getChild(1);
            expect(m22.getChildren().getCount()).toEqual(0);

            var geo22 = m22.getComponent(dy.Geometry);
            expect(geo22.colors).toEqual(
                model2.children[1].colors
            )
            dyTool.judgeFaceIndices(geo22.faces, model2.children[1].indices);
            expect(geo22.vertices).toEqual(
                model2.children[1].vertices
            )
            expect(geo22.texCoords).toEqual(
                model2.children[1].uvs
            )
            dyTool.judgeFaceVertexNormals(geo22.faces, model2.children[1].normals);
            var mat22 = geo22.material;
            assertColor(mat22.color, materialData2.diffuseColor);

        }

        beforeEach(function(){
            json =
            {
                "metadata" : {
                    formatVersion:"0.1.0",
                    description:"aaa",
                    sourceFile:"b.dy",
                    generatedBy:"DYConverter"
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
                                colors: [0.10000000149011612, 0.20000000298023224, 1, 0.10000000149011612, 0.20000000298023224, 1, 1, 0.30000001192092896, 0 ],
                                vertices: [2, 3, 4, 2, 3, 4, 2, 2, 3],
                                uvs:[0.10000000149011612, 0.20000000298023224, 0.10000000149011612, 0.20000000298023224, 0.5, 0.20000000298023224],
                                normals:[-2, 3, 4, -2, 3, 4, -1, 2, 3 ],
                                material: "aa",
                                morphTargets: [],
                                indices:[0,1,2]
                            },
                            {
                                name:"cc",
                                material:"bb",
                                colors:[0.5, 0.20000000298023224, 0, 0.10000000149011612, 0.20000000298023224, 1, 0.10000000149011612, 0.20000000298023224, 1 ],
                                vertices:[ 2, 2, 3, 2, 3, 4, 2, 3, 4 ],
                                uvs:[0.1, 0.2, 0.5, 0.2, 0.1, 0.2],
                                normals:[-2, 3, 4, -2, 3, 4, -1, 2, 3],
                                morphTargets: [],
                                indices:[0,1,2]
                            }
                        ]
                    }
                ]
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
