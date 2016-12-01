var fs = require("fs-extra"),
    Converter = require("../../dist/converter/gltf/GLTFToWD"),
    config = require("../../dist/converter/common/Config"),
    path = require("path"),
    sinon = require("sinon");

require("jasmine-before-all");

describe("GLTFToWD", function () {
    var sandbox = null;
    var converter = null;
    var testFile;
    var filePath1;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        converter = Converter.GLTFToWD.create("0.1.0");
    });
    afterEach(function () {
        sandbox.restore();
    });
    beforeAll(function () {
        filePath1 = path.join(process.cwd(), "../res/gltf/test.gltf");

        testFile = fs.readFileSync(filePath1);
    });

    function judge(file, filePath, assertion, done) {
        converter.convert(file, filePath)
            .subscribe(function (arr) {
                var json = arr[0],
                    sourceUrlArr = arr[1];

                assertion(json, sourceUrlArr);
            }, null, function () {
                done();
            })
    }


    describe("convert asset data", function(){
        beforeEach(function(){
        });

        it("set generator and version", function(done){
            judge(testFile, filePath1, function (json) {
                expect(json.asset.generator).toEqual(converter.name);
                expect(json.asset.version).toEqual(converter.version);
            }, done);
        });
    });

    describe("convert camera data", function(){
        beforeEach(function(){
        });
        
        it("convert 'aspect_ratio' to 'aspectRatio'", function(done){
            judge(testFile, filePath1, function (json) {
                expect(json.cameras.cameraShape1.perspective.aspectRatio).toEqual(1.5);

                expect(json.cameras.cameraShape1.perspective.aspect_ratio).toBeUndefined();
            }, done);
        });
    });

    describe("convert light data", function(){
        beforeEach(function(){
        });

        it("convert lights", function(done){
            judge(testFile, filePath1, function (json) {
                expect(json.lights).toBeDefined();
                expect(json.lights["directionalLightShape1-lib"]).toEqual({
                    "directional": {
                        "color": [
                            1,
                            1,
                            1
                        ]
                    },
                    "name": "directionalLightShape1",
                    "type": "directional"
                });
            }, done);
        });
        it("convert nodes->light", function(done){
            judge(testFile, filePath1, function (json) {
                expect(json.nodes["directionalLight1"].light).toEqual("directionalLightShape1-lib");
            }, done);
        });

        describe("convert point light->distance to range", function () {
            it("if no distance field, not convert range", function (done) {
                judge(testFile, filePath1, function (json) {
                    expect(json.lights.pointLight1.point.range).toBeUndefined();
                }, done);
            });
            it("if distance === 0, not convert range", function (done) {
                judge(testFile, filePath1, function (json) {
                    expect(json.lights.pointLight2.point.range).toBeUndefined();
                }, done);
            });
            it("if distance > 0, convert range", function (done) {
                judge(testFile, filePath1, function (json) {
                    expect(json.lights.pointLight3.point.range).toEqual(5);
                }, done);
            });
        });
    });

    describe("convert material data", function(){
        beforeEach(function(){
        });

        it("convert materials", function(done){
            judge(testFile, filePath1, function (json) {
                expect(json.materials).toBeDefined();
                expect(json.materials).toEqual({
                    "blinn3-fx": {
                        "doubleSided": false,
                        "jointCount": 0,
                        "technique": "BLINN",
                        "transparent": true,
                        "values": {
                            "ambient": [
                                0,
                                0,
                                0,
                                1
                            ],
                            "diffuse": "texture_file2",
                            "emission": [
                                0,
                                0,
                                0,
                                1
                            ],
                            "shininess": 38.4,
                            "specular": [
                                0,
                                0,
                                0,
                                1
                            ],
                            "transparency": 0
                        },
                        "name": "blinn3"
                    }
                });
            }, done);
        });
    });
    
    describe("convert primitive data", function(){
        beforeEach(function(){
        });
        
        it("if has multi attribute datas, contract error", function(){
            expect(function(){
                converter._convertPrimitives({
                    "meshes": {
                        "LOD3spShape-lib": {
                            "name": "LOD3spShape",
                            "primitives": [
                                {
                                    "attributes": {
                                        "NORMAL": "accessor_25",
                                        "POSITION": "accessor_23",
                                        "TEXCOORD_0": "accessor_27",
                                        "TEXCOORD_1": "accessor_27"
                                    },
                                    "indices": "accessor_21",
                                    "material": "blinn3-fx",
                                    "mode": 4
                                }
                            ]
                        }
                    }
                })
            }).toThrow("not support multi attribute datas(e.g. TEXCOORD_1)->expected true to be false");
        });
        it("remove attribute key->index", function (done) {
            judge(testFile, filePath1, function (json) {
                expect(json.meshes["LOD3spShape-lib"].primitives[0].attributes.TEXCOORD).toEqual("accessor_27");
                expect(json.meshes["LOD3spShape-lib"].primitives[0].attributes["TEXCOORD_0"]).toBeUndefined();
            }, done);
        });
    });

    describe("convert node data", function(){
        beforeEach(function(){
        });

        it("if node has multi mehses, contract error", function(){
            expect(function(){
                converter._convertNodes({
                    "nodes": {
                        "node": {
                            "children": [],
                            "meshes":[
                                "a",
                                "b"
                            ]
                        }
                    }
                })
            }).toThrow("not support multi meshes->expected 2 to equal 1");
        });
        it("convert to single mesh", function (done) {
            judge(testFile, filePath1, function (json) {
                expect(json.nodes["LOD3sp"].mesh).toEqual("LOD3spShape-lib");
                expect(json.nodes["LOD3sp"].meshes).toBeUndefined();
            }, done);
        });
    });
    //
    // describe("parse resource url arr", function(){
    //     beforeEach(function(){
    //     });
    //
    //     it("parse bin file", function(done){
    //         judge(testFile, filePath1, function (json, resourceUrlArr) {
    //             expect(resourceUrlArr[0]).toEqual(
    //                     path.resolve(path.dirname(filePath1), "duck.bin")
    //             );
    //         }, done);
    //     });
    //     it("parse image files", function(done){
    //         judge(testFile, filePath1, function (json, resourceUrlArr) {
    //             expect(resourceUrlArr[1]).toEqual(
    //                     path.resolve(path.dirname(filePath1), "duckCM.png")
    //             );
    //         }, done);
    //     });
    // });
});

