var fs = require("fs-extra"),
    Converter = require("../../dist/converter/src/gltf/GLTFToWD"),
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

    describe("convert skin skeleton animation data", function(){
        describe("if joint animations are separate in different animations", function(){
            beforeEach(function(){
                filePath1 = path.join(process.cwd(), "../res/gltf/testskinSkeletonAnimation.gltf");

                testFile = fs.readFileSync(filePath1);
            });

            describe("combine one animation's joint animation data", function(){
                it("remove origin joint animation data, only remain the combined animation", function (done) {
                    judge(testFile, filePath1, function (json) {
                        var index = 0,
                            animName = null;

                        for(animName in json.animations){
                            if(json.animations.hasOwnProperty(animName)){
                                index++;
                            }
                        }

                        expect(index).toEqual(1);
                        expect(animName).toEqual("animation_0")
                    }, done);
                });
                it("test combine", function (done) {
                    judge(testFile, filePath1, function (json) {
                        var index = 0,
                            animName = null;

                        var animation = json.animations["animation_0"];

                        expect(animation.channels).toEqual(
                            [
                                {
                                    sampler: 'animation_0_scale_sampler',
                                    target: {
                                        id: 'Bip01_Pelvis',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_0_translation_sampler',
                                    target: {
                                        id: 'Bip01_Pelvis',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_0_rotation_sampler',
                                    target: {
                                        id: 'Bip01_Pelvis',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_1_scale_sampler_Bip01_Spine',
                                    target: {
                                        id: 'Bip01_Spine',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_1_translation_sampler_Bip01_Spine',
                                    target: {
                                        id: 'Bip01_Spine',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_1_rotation_sampler_Bip01_Spine',
                                    target: {
                                        id: 'Bip01_Spine',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_10_scale_sampler_Bip01_L_Finger0',
                                    target: {
                                        id: 'Bip01_L_Finger0',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_10_translation_sampler_Bip01_L_Finger0',
                                    target: {
                                        id: 'Bip01_L_Finger0',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_10_rotation_sampler_Bip01_L_Finger0',
                                    target: {
                                        id: 'Bip01_L_Finger0',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_11_scale_sampler_Bip01_L_Finger0Nub',
                                    target: {
                                        id: 'Bip01_L_Finger0Nub',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_11_translation_sampler_Bip01_L_Finger0Nub',
                                    target: {
                                        id: 'Bip01_L_Finger0Nub',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_11_rotation_sampler_Bip01_L_Finger0Nub',
                                    target: {
                                        id: 'Bip01_L_Finger0Nub',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_12_scale_sampler_Bip01_R_Clavicle',
                                    target: {
                                        id: 'Bip01_R_Clavicle',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_12_translation_sampler_Bip01_R_Clavicle',
                                    target: {
                                        id: 'Bip01_R_Clavicle',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_12_rotation_sampler_Bip01_R_Clavicle',
                                    target: {
                                        id: 'Bip01_R_Clavicle',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_13_scale_sampler_Bip01_R_UpperArm',
                                    target: {
                                        id: 'Bip01_R_UpperArm',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_13_translation_sampler_Bip01_R_UpperArm',
                                    target: {
                                        id: 'Bip01_R_UpperArm',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_13_rotation_sampler_Bip01_R_UpperArm',
                                    target: {
                                        id: 'Bip01_R_UpperArm',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_14_scale_sampler_Bip01_R_Forearm',
                                    target: {
                                        id: 'Bip01_R_Forearm',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_14_translation_sampler_Bip01_R_Forearm',
                                    target: {
                                        id: 'Bip01_R_Forearm',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_14_rotation_sampler_Bip01_R_Forearm',
                                    target: {
                                        id: 'Bip01_R_Forearm',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_15_scale_sampler_Bip01_R_Hand',
                                    target: {
                                        id: 'Bip01_R_Hand',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_15_translation_sampler_Bip01_R_Hand',
                                    target: {
                                        id: 'Bip01_R_Hand',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_15_rotation_sampler_Bip01_R_Hand',
                                    target: {
                                        id: 'Bip01_R_Hand',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_16_scale_sampler_Bip01_R_Finger0',
                                    target: {
                                        id: 'Bip01_R_Finger0',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_16_translation_sampler_Bip01_R_Finger0',
                                    target: {
                                        id: 'Bip01_R_Finger0',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_16_rotation_sampler_Bip01_R_Finger0',
                                    target: {
                                        id: 'Bip01_R_Finger0',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_17_scale_sampler_Bip01_R_Finger0Nub',
                                    target: {
                                        id: 'Bip01_R_Finger0Nub',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_17_translation_sampler_Bip01_R_Finger0Nub',
                                    target: {
                                        id: 'Bip01_R_Finger0Nub',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_17_rotation_sampler_Bip01_R_Finger0Nub',
                                    target: {
                                        id: 'Bip01_R_Finger0Nub',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_18_scale_sampler_Bip01_R_Thigh',
                                    target: {
                                        id: 'Bip01_R_Thigh',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_18_translation_sampler_Bip01_R_Thigh',
                                    target: {
                                        id: 'Bip01_R_Thigh',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_18_rotation_sampler_Bip01_R_Thigh',
                                    target: {
                                        id: 'Bip01_R_Thigh',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_19_scale_sampler_Bip01_R_Calf',
                                    target: {
                                        id: 'Bip01_R_Calf',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_19_translation_sampler_Bip01_R_Calf',
                                    target: {
                                        id: 'Bip01_R_Calf',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_19_rotation_sampler_Bip01_R_Calf',
                                    target: {
                                        id: 'Bip01_R_Calf',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_2_scale_sampler_Bip01_Spine1',
                                    target: {
                                        id: 'Bip01_Spine1',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_2_translation_sampler_Bip01_Spine1',
                                    target: {
                                        id: 'Bip01_Spine1',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_2_rotation_sampler_Bip01_Spine1',
                                    target: {
                                        id: 'Bip01_Spine1',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_20_scale_sampler_Bip01_R_Foot',
                                    target: {
                                        id: 'Bip01_R_Foot',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_20_translation_sampler_Bip01_R_Foot',
                                    target: {
                                        id: 'Bip01_R_Foot',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_20_rotation_sampler_Bip01_R_Foot',
                                    target: {
                                        id: 'Bip01_R_Foot',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_21_scale_sampler_Bip01_R_Toe0',
                                    target: {
                                        id: 'Bip01_R_Toe0',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_21_translation_sampler_Bip01_R_Toe0',
                                    target: {
                                        id: 'Bip01_R_Toe0',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_21_rotation_sampler_Bip01_R_Toe0',
                                    target: {
                                        id: 'Bip01_R_Toe0',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_22_scale_sampler_Bip01_R_Toe0Nub',
                                    target: {
                                        id: 'Bip01_R_Toe0Nub',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_22_translation_sampler_Bip01_R_Toe0Nub',
                                    target: {
                                        id: 'Bip01_R_Toe0Nub',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_22_rotation_sampler_Bip01_R_Toe0Nub',
                                    target: {
                                        id: 'Bip01_R_Toe0Nub',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_23_scale_sampler_Bip01_L_Thigh',
                                    target: {
                                        id: 'Bip01_L_Thigh',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_23_translation_sampler_Bip01_L_Thigh',
                                    target: {
                                        id: 'Bip01_L_Thigh',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_23_rotation_sampler_Bip01_L_Thigh',
                                    target: {
                                        id: 'Bip01_L_Thigh',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_24_scale_sampler_Bip01_L_Calf',
                                    target: {
                                        id: 'Bip01_L_Calf',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_24_translation_sampler_Bip01_L_Calf',
                                    target: {
                                        id: 'Bip01_L_Calf',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_24_rotation_sampler_Bip01_L_Calf',
                                    target: {
                                        id: 'Bip01_L_Calf',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_25_scale_sampler_Bip01_L_Foot',
                                    target: {
                                        id: 'Bip01_L_Foot',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_25_translation_sampler_Bip01_L_Foot',
                                    target: {
                                        id: 'Bip01_L_Foot',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_25_rotation_sampler_Bip01_L_Foot',
                                    target: {
                                        id: 'Bip01_L_Foot',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_26_scale_sampler_Bip01_L_Toe0',
                                    target: {
                                        id: 'Bip01_L_Toe0',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_26_translation_sampler_Bip01_L_Toe0',
                                    target: {
                                        id: 'Bip01_L_Toe0',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_26_rotation_sampler_Bip01_L_Toe0',
                                    target: {
                                        id: 'Bip01_L_Toe0',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_27_scale_sampler_Bip01_L_Toe0Nub',
                                    target: {
                                        id: 'Bip01_L_Toe0Nub',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_27_translation_sampler_Bip01_L_Toe0Nub',
                                    target: {
                                        id: 'Bip01_L_Toe0Nub',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_27_rotation_sampler_Bip01_L_Toe0Nub',
                                    target: {
                                        id: 'Bip01_L_Toe0Nub',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_28_scale_sampler_Bip01_Tail',
                                    target: {
                                        id: 'Bip01_Tail',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_28_translation_sampler_Bip01_Tail',
                                    target: {
                                        id: 'Bip01_Tail',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_28_rotation_sampler_Bip01_Tail',
                                    target: {
                                        id: 'Bip01_Tail',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_29_scale_sampler_Bip01_Tail1',
                                    target: {
                                        id: 'Bip01_Tail1',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_29_translation_sampler_Bip01_Tail1',
                                    target: {
                                        id: 'Bip01_Tail1',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_29_rotation_sampler_Bip01_Tail1',
                                    target: {
                                        id: 'Bip01_Tail1',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_3_scale_sampler_Bip01_Neck',
                                    target: {
                                        id: 'Bip01_Neck',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_3_translation_sampler_Bip01_Neck',
                                    target: {
                                        id: 'Bip01_Neck',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_3_rotation_sampler_Bip01_Neck',
                                    target: {
                                        id: 'Bip01_Neck',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_30_scale_sampler_Bip01_Tail2',
                                    target: {
                                        id: 'Bip01_Tail2',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_30_translation_sampler_Bip01_Tail2',
                                    target: {
                                        id: 'Bip01_Tail2',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_30_rotation_sampler_Bip01_Tail2',
                                    target: {
                                        id: 'Bip01_Tail2',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_31_scale_sampler_Bip01_TailNub',
                                    target: {
                                        id: 'Bip01_TailNub',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_31_translation_sampler_Bip01_TailNub',
                                    target: {
                                        id: 'Bip01_TailNub',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_31_rotation_sampler_Bip01_TailNub',
                                    target: {
                                        id: 'Bip01_TailNub',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_4_scale_sampler_Bip01_Head',
                                    target: {
                                        id: 'Bip01_Head',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_4_translation_sampler_Bip01_Head',
                                    target: {
                                        id: 'Bip01_Head',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_4_rotation_sampler_Bip01_Head',
                                    target: {
                                        id: 'Bip01_Head',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_5_scale_sampler_Bip01_HeadNub',
                                    target: {
                                        id: 'Bip01_HeadNub',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_5_translation_sampler_Bip01_HeadNub',
                                    target: {
                                        id: 'Bip01_HeadNub',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_5_rotation_sampler_Bip01_HeadNub',
                                    target: {
                                        id: 'Bip01_HeadNub',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_6_scale_sampler_Bip01_L_Clavicle',
                                    target: {
                                        id: 'Bip01_L_Clavicle',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_6_translation_sampler_Bip01_L_Clavicle',
                                    target: {
                                        id: 'Bip01_L_Clavicle',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_6_rotation_sampler_Bip01_L_Clavicle',
                                    target: {
                                        id: 'Bip01_L_Clavicle',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_7_scale_sampler_Bip01_L_UpperArm',
                                    target: {
                                        id: 'Bip01_L_UpperArm',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_7_translation_sampler_Bip01_L_UpperArm',
                                    target: {
                                        id: 'Bip01_L_UpperArm',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_7_rotation_sampler_Bip01_L_UpperArm',
                                    target: {
                                        id: 'Bip01_L_UpperArm',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_8_scale_sampler_Bip01_L_Forearm',
                                    target: {
                                        id: 'Bip01_L_Forearm',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_8_translation_sampler_Bip01_L_Forearm',
                                    target: {
                                        id: 'Bip01_L_Forearm',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_8_rotation_sampler_Bip01_L_Forearm',
                                    target: {
                                        id: 'Bip01_L_Forearm',
                                        path: 'rotation'
                                    }
                                },
                                {
                                    sampler: 'animation_9_scale_sampler_Bip01_L_Hand',
                                    target: {
                                        id: 'Bip01_L_Hand',
                                        path: 'scale'
                                    }
                                },
                                {
                                    sampler: 'animation_9_translation_sampler_Bip01_L_Hand',
                                    target: {
                                        id: 'Bip01_L_Hand',
                                        path: 'translation'
                                    }
                                },
                                {
                                    sampler: 'animation_9_rotation_sampler_Bip01_L_Hand',
                                    target: {
                                        id: 'Bip01_L_Hand',
                                        path: 'rotation'
                                    }
                                }
                            ]
);

                        expect(animation.parameters).toEqual(
                            {
                                TIME: 'animAccessor_0',
                                rotation: 'animAccessor_3',
                                scale: 'animAccessor_1',
                                translation: 'animAccessor_2',
                                TIME1: 'animAccessor_0',
                                rotation1: 'animAccessor_6',
                                scale1: 'animAccessor_4',
                                translation1: 'animAccessor_5',
                                TIME2: 'animAccessor_0',
                                rotation2: 'animAccessor_9',
                                scale2: 'animAccessor_7',
                                translation2: 'animAccessor_8',
                                TIME3: 'animAccessor_0',
                                rotation3: 'animAccessor_12',
                                scale3: 'animAccessor_10',
                                translation3: 'animAccessor_11',
                                TIME4: 'animAccessor_0',
                                rotation4: 'animAccessor_15',
                                scale4: 'animAccessor_13',
                                translation4: 'animAccessor_14',
                                TIME5: 'animAccessor_0',
                                rotation5: 'animAccessor_18',
                                scale5: 'animAccessor_16',
                                translation5: 'animAccessor_17',
                                TIME6: 'animAccessor_0',
                                rotation6: 'animAccessor_21',
                                scale6: 'animAccessor_19',
                                translation6: 'animAccessor_20',
                                TIME7: 'animAccessor_0',
                                rotation7: 'animAccessor_24',
                                scale7: 'animAccessor_22',
                                translation7: 'animAccessor_23',
                                TIME8: 'animAccessor_0',
                                rotation8: 'animAccessor_27',
                                scale8: 'animAccessor_25',
                                translation8: 'animAccessor_26',
                                TIME9: 'animAccessor_0',
                                rotation9: 'animAccessor_30',
                                scale9: 'animAccessor_28',
                                translation9: 'animAccessor_29',
                                TIME10: 'animAccessor_0',
                                rotation10: 'animAccessor_33',
                                scale10: 'animAccessor_31',
                                translation10: 'animAccessor_32',
                                TIME11: 'animAccessor_0',
                                rotation11: 'animAccessor_36',
                                scale11: 'animAccessor_34',
                                translation11: 'animAccessor_35',
                                TIME12: 'animAccessor_0',
                                rotation12: 'animAccessor_39',
                                scale12: 'animAccessor_37',
                                translation12: 'animAccessor_38',
                                TIME13: 'animAccessor_0',
                                rotation13: 'animAccessor_42',
                                scale13: 'animAccessor_40',
                                translation13: 'animAccessor_41',
                                TIME14: 'animAccessor_0',
                                rotation14: 'animAccessor_45',
                                scale14: 'animAccessor_43',
                                translation14: 'animAccessor_44',
                                TIME15: 'animAccessor_0',
                                rotation15: 'animAccessor_48',
                                scale15: 'animAccessor_46',
                                translation15: 'animAccessor_47',
                                TIME16: 'animAccessor_0',
                                rotation16: 'animAccessor_51',
                                scale16: 'animAccessor_49',
                                translation16: 'animAccessor_50',
                                TIME17: 'animAccessor_0',
                                rotation17: 'animAccessor_54',
                                scale17: 'animAccessor_52',
                                translation17: 'animAccessor_53',
                                TIME18: 'animAccessor_0',
                                rotation18: 'animAccessor_57',
                                scale18: 'animAccessor_55',
                                translation18: 'animAccessor_56',
                                TIME19: 'animAccessor_0',
                                rotation19: 'animAccessor_60',
                                scale19: 'animAccessor_58',
                                translation19: 'animAccessor_59',
                                TIME20: 'animAccessor_0',
                                rotation20: 'animAccessor_63',
                                scale20: 'animAccessor_61',
                                translation20: 'animAccessor_62',
                                TIME21: 'animAccessor_0',
                                rotation21: 'animAccessor_66',
                                scale21: 'animAccessor_64',
                                translation21: 'animAccessor_65',
                                TIME22: 'animAccessor_0',
                                rotation22: 'animAccessor_69',
                                scale22: 'animAccessor_67',
                                translation22: 'animAccessor_68',
                                TIME23: 'animAccessor_0',
                                rotation23: 'animAccessor_72',
                                scale23: 'animAccessor_70',
                                translation23: 'animAccessor_71',
                                TIME24: 'animAccessor_0',
                                rotation24: 'animAccessor_75',
                                scale24: 'animAccessor_73',
                                translation24: 'animAccessor_74',
                                TIME25: 'animAccessor_0',
                                rotation25: 'animAccessor_78',
                                scale25: 'animAccessor_76',
                                translation25: 'animAccessor_77',
                                TIME26: 'animAccessor_0',
                                rotation26: 'animAccessor_81',
                                scale26: 'animAccessor_79',
                                translation26: 'animAccessor_80',
                                TIME27: 'animAccessor_0',
                                rotation27: 'animAccessor_84',
                                scale27: 'animAccessor_82',
                                translation27: 'animAccessor_83',
                                TIME28: 'animAccessor_0',
                                rotation28: 'animAccessor_87',
                                scale28: 'animAccessor_85',
                                translation28: 'animAccessor_86',
                                TIME29: 'animAccessor_0',
                                rotation29: 'animAccessor_90',
                                scale29: 'animAccessor_88',
                                translation29: 'animAccessor_89',
                                TIME30: 'animAccessor_0',
                                rotation30: 'animAccessor_93',
                                scale30: 'animAccessor_91',
                                translation30: 'animAccessor_92',
                                TIME31: 'animAccessor_0',
                                rotation31: 'animAccessor_96',
                                scale31: 'animAccessor_94',
                                translation31: 'animAccessor_95'
                            }
                        );

                        expect(animation.samplers).toEqual(
                            {
                                animation_0_rotation_sampler: {
                                    input: 'TIME',
                                    interpolation: 'LINEAR',
                                    output: 'rotation'
                                },
                                animation_0_scale_sampler: {
                                    input: 'TIME',
                                    interpolation: 'LINEAR',
                                    output: 'scale'
                                },
                                animation_0_translation_sampler: {
                                    input: 'TIME',
                                    interpolation: 'LINEAR',
                                    output: 'translation'
                                },
                                animation_1_rotation_sampler_Bip01_Spine: {
                                    input: 'TIME1',
                                    interpolation: 'LINEAR',
                                    output: 'rotation1'
                                },
                                animation_1_scale_sampler_Bip01_Spine: {
                                    input: 'TIME1',
                                    interpolation: 'LINEAR',
                                    output: 'scale1'
                                },
                                animation_1_translation_sampler_Bip01_Spine: {
                                    input: 'TIME1',
                                    interpolation: 'LINEAR',
                                    output: 'translation1'
                                },
                                animation_10_rotation_sampler_Bip01_L_Finger0: {
                                    input: 'TIME2',
                                    interpolation: 'LINEAR',
                                    output: 'rotation2'
                                },
                                animation_10_scale_sampler_Bip01_L_Finger0: {
                                    input: 'TIME2',
                                    interpolation: 'LINEAR',
                                    output: 'scale2'
                                },
                                animation_10_translation_sampler_Bip01_L_Finger0: {
                                    input: 'TIME2',
                                    interpolation: 'LINEAR',
                                    output: 'translation2'
                                },
                                animation_11_rotation_sampler_Bip01_L_Finger0Nub: {
                                    input: 'TIME3',
                                    interpolation: 'LINEAR',
                                    output: 'rotation3'
                                },
                                animation_11_scale_sampler_Bip01_L_Finger0Nub: {
                                    input: 'TIME3',
                                    interpolation: 'LINEAR',
                                    output: 'scale3'
                                },
                                animation_11_translation_sampler_Bip01_L_Finger0Nub: {
                                    input: 'TIME3',
                                    interpolation: 'LINEAR',
                                    output: 'translation3'
                                },
                                animation_12_rotation_sampler_Bip01_R_Clavicle: {
                                    input: 'TIME4',
                                    interpolation: 'LINEAR',
                                    output: 'rotation4'
                                },
                                animation_12_scale_sampler_Bip01_R_Clavicle: {
                                    input: 'TIME4',
                                    interpolation: 'LINEAR',
                                    output: 'scale4'
                                },
                                animation_12_translation_sampler_Bip01_R_Clavicle: {
                                    input: 'TIME4',
                                    interpolation: 'LINEAR',
                                    output: 'translation4'
                                },
                                animation_13_rotation_sampler_Bip01_R_UpperArm: {
                                    input: 'TIME5',
                                    interpolation: 'LINEAR',
                                    output: 'rotation5'
                                },
                                animation_13_scale_sampler_Bip01_R_UpperArm: {
                                    input: 'TIME5',
                                    interpolation: 'LINEAR',
                                    output: 'scale5'
                                },
                                animation_13_translation_sampler_Bip01_R_UpperArm: {
                                    input: 'TIME5',
                                    interpolation: 'LINEAR',
                                    output: 'translation5'
                                },
                                animation_14_rotation_sampler_Bip01_R_Forearm: {
                                    input: 'TIME6',
                                    interpolation: 'LINEAR',
                                    output: 'rotation6'
                                },
                                animation_14_scale_sampler_Bip01_R_Forearm: {
                                    input: 'TIME6',
                                    interpolation: 'LINEAR',
                                    output: 'scale6'
                                },
                                animation_14_translation_sampler_Bip01_R_Forearm: {
                                    input: 'TIME6',
                                    interpolation: 'LINEAR',
                                    output: 'translation6'
                                },
                                animation_15_rotation_sampler_Bip01_R_Hand: {
                                    input: 'TIME7',
                                    interpolation: 'LINEAR',
                                    output: 'rotation7'
                                },
                                animation_15_scale_sampler_Bip01_R_Hand: {
                                    input: 'TIME7',
                                    interpolation: 'LINEAR',
                                    output: 'scale7'
                                },
                                animation_15_translation_sampler_Bip01_R_Hand: {
                                    input: 'TIME7',
                                    interpolation: 'LINEAR',
                                    output: 'translation7'
                                },
                                animation_16_rotation_sampler_Bip01_R_Finger0: {
                                    input: 'TIME8',
                                    interpolation: 'LINEAR',
                                    output: 'rotation8'
                                },
                                animation_16_scale_sampler_Bip01_R_Finger0: {
                                    input: 'TIME8',
                                    interpolation: 'LINEAR',
                                    output: 'scale8'
                                },
                                animation_16_translation_sampler_Bip01_R_Finger0: {
                                    input: 'TIME8',
                                    interpolation: 'LINEAR',
                                    output: 'translation8'
                                },
                                animation_17_rotation_sampler_Bip01_R_Finger0Nub: {
                                    input: 'TIME9',
                                    interpolation: 'LINEAR',
                                    output: 'rotation9'
                                },
                                animation_17_scale_sampler_Bip01_R_Finger0Nub: {
                                    input: 'TIME9',
                                    interpolation: 'LINEAR',
                                    output: 'scale9'
                                },
                                animation_17_translation_sampler_Bip01_R_Finger0Nub: {
                                    input: 'TIME9',
                                    interpolation: 'LINEAR',
                                    output: 'translation9'
                                },
                                animation_18_rotation_sampler_Bip01_R_Thigh: {
                                    input: 'TIME10',
                                    interpolation: 'LINEAR',
                                    output: 'rotation10'
                                },
                                animation_18_scale_sampler_Bip01_R_Thigh: {
                                    input: 'TIME10',
                                    interpolation: 'LINEAR',
                                    output: 'scale10'
                                },
                                animation_18_translation_sampler_Bip01_R_Thigh: {
                                    input: 'TIME10',
                                    interpolation: 'LINEAR',
                                    output: 'translation10'
                                },
                                animation_19_rotation_sampler_Bip01_R_Calf: {
                                    input: 'TIME11',
                                    interpolation: 'LINEAR',
                                    output: 'rotation11'
                                },
                                animation_19_scale_sampler_Bip01_R_Calf: {
                                    input: 'TIME11',
                                    interpolation: 'LINEAR',
                                    output: 'scale11'
                                },
                                animation_19_translation_sampler_Bip01_R_Calf: {
                                    input: 'TIME11',
                                    interpolation: 'LINEAR',
                                    output: 'translation11'
                                },
                                animation_2_rotation_sampler_Bip01_Spine1: {
                                    input: 'TIME12',
                                    interpolation: 'LINEAR',
                                    output: 'rotation12'
                                },
                                animation_2_scale_sampler_Bip01_Spine1: {
                                    input: 'TIME12',
                                    interpolation: 'LINEAR',
                                    output: 'scale12'
                                },
                                animation_2_translation_sampler_Bip01_Spine1: {
                                    input: 'TIME12',
                                    interpolation: 'LINEAR',
                                    output: 'translation12'
                                },
                                animation_20_rotation_sampler_Bip01_R_Foot: {
                                    input: 'TIME13',
                                    interpolation: 'LINEAR',
                                    output: 'rotation13'
                                },
                                animation_20_scale_sampler_Bip01_R_Foot: {
                                    input: 'TIME13',
                                    interpolation: 'LINEAR',
                                    output: 'scale13'
                                },
                                animation_20_translation_sampler_Bip01_R_Foot: {
                                    input: 'TIME13',
                                    interpolation: 'LINEAR',
                                    output: 'translation13'
                                },
                                animation_21_rotation_sampler_Bip01_R_Toe0: {
                                    input: 'TIME14',
                                    interpolation: 'LINEAR',
                                    output: 'rotation14'
                                },
                                animation_21_scale_sampler_Bip01_R_Toe0: {
                                    input: 'TIME14',
                                    interpolation: 'LINEAR',
                                    output: 'scale14'
                                },
                                animation_21_translation_sampler_Bip01_R_Toe0: {
                                    input: 'TIME14',
                                    interpolation: 'LINEAR',
                                    output: 'translation14'
                                },
                                animation_22_rotation_sampler_Bip01_R_Toe0Nub: {
                                    input: 'TIME15',
                                    interpolation: 'LINEAR',
                                    output: 'rotation15'
                                },
                                animation_22_scale_sampler_Bip01_R_Toe0Nub: {
                                    input: 'TIME15',
                                    interpolation: 'LINEAR',
                                    output: 'scale15'
                                },
                                animation_22_translation_sampler_Bip01_R_Toe0Nub: {
                                    input: 'TIME15',
                                    interpolation: 'LINEAR',
                                    output: 'translation15'
                                },
                                animation_23_rotation_sampler_Bip01_L_Thigh: {
                                    input: 'TIME16',
                                    interpolation: 'LINEAR',
                                    output: 'rotation16'
                                },
                                animation_23_scale_sampler_Bip01_L_Thigh: {
                                    input: 'TIME16',
                                    interpolation: 'LINEAR',
                                    output: 'scale16'
                                },
                                animation_23_translation_sampler_Bip01_L_Thigh: {
                                    input: 'TIME16',
                                    interpolation: 'LINEAR',
                                    output: 'translation16'
                                },
                                animation_24_rotation_sampler_Bip01_L_Calf: {
                                    input: 'TIME17',
                                    interpolation: 'LINEAR',
                                    output: 'rotation17'
                                },
                                animation_24_scale_sampler_Bip01_L_Calf: {
                                    input: 'TIME17',
                                    interpolation: 'LINEAR',
                                    output: 'scale17'
                                },
                                animation_24_translation_sampler_Bip01_L_Calf: {
                                    input: 'TIME17',
                                    interpolation: 'LINEAR',
                                    output: 'translation17'
                                },
                                animation_25_rotation_sampler_Bip01_L_Foot: {
                                    input: 'TIME18',
                                    interpolation: 'LINEAR',
                                    output: 'rotation18'
                                },
                                animation_25_scale_sampler_Bip01_L_Foot: {
                                    input: 'TIME18',
                                    interpolation: 'LINEAR',
                                    output: 'scale18'
                                },
                                animation_25_translation_sampler_Bip01_L_Foot: {
                                    input: 'TIME18',
                                    interpolation: 'LINEAR',
                                    output: 'translation18'
                                },
                                animation_26_rotation_sampler_Bip01_L_Toe0: {
                                    input: 'TIME19',
                                    interpolation: 'LINEAR',
                                    output: 'rotation19'
                                },
                                animation_26_scale_sampler_Bip01_L_Toe0: {
                                    input: 'TIME19',
                                    interpolation: 'LINEAR',
                                    output: 'scale19'
                                },
                                animation_26_translation_sampler_Bip01_L_Toe0: {
                                    input: 'TIME19',
                                    interpolation: 'LINEAR',
                                    output: 'translation19'
                                },
                                animation_27_rotation_sampler_Bip01_L_Toe0Nub: {
                                    input: 'TIME20',
                                    interpolation: 'LINEAR',
                                    output: 'rotation20'
                                },
                                animation_27_scale_sampler_Bip01_L_Toe0Nub: {
                                    input: 'TIME20',
                                    interpolation: 'LINEAR',
                                    output: 'scale20'
                                },
                                animation_27_translation_sampler_Bip01_L_Toe0Nub: {
                                    input: 'TIME20',
                                    interpolation: 'LINEAR',
                                    output: 'translation20'
                                },
                                animation_28_rotation_sampler_Bip01_Tail: {
                                    input: 'TIME21',
                                    interpolation: 'LINEAR',
                                    output: 'rotation21'
                                },
                                animation_28_scale_sampler_Bip01_Tail: {
                                    input: 'TIME21',
                                    interpolation: 'LINEAR',
                                    output: 'scale21'
                                },
                                animation_28_translation_sampler_Bip01_Tail: {
                                    input: 'TIME21',
                                    interpolation: 'LINEAR',
                                    output: 'translation21'
                                },
                                animation_29_rotation_sampler_Bip01_Tail1: {
                                    input: 'TIME22',
                                    interpolation: 'LINEAR',
                                    output: 'rotation22'
                                },
                                animation_29_scale_sampler_Bip01_Tail1: {
                                    input: 'TIME22',
                                    interpolation: 'LINEAR',
                                    output: 'scale22'
                                },
                                animation_29_translation_sampler_Bip01_Tail1: {
                                    input: 'TIME22',
                                    interpolation: 'LINEAR',
                                    output: 'translation22'
                                },
                                animation_3_rotation_sampler_Bip01_Neck: {
                                    input: 'TIME23',
                                    interpolation: 'LINEAR',
                                    output: 'rotation23'
                                },
                                animation_3_scale_sampler_Bip01_Neck: {
                                    input: 'TIME23',
                                    interpolation: 'LINEAR',
                                    output: 'scale23'
                                },
                                animation_3_translation_sampler_Bip01_Neck: {
                                    input: 'TIME23',
                                    interpolation: 'LINEAR',
                                    output: 'translation23'
                                },
                                animation_30_rotation_sampler_Bip01_Tail2: {
                                    input: 'TIME24',
                                    interpolation: 'LINEAR',
                                    output: 'rotation24'
                                },
                                animation_30_scale_sampler_Bip01_Tail2: {
                                    input: 'TIME24',
                                    interpolation: 'LINEAR',
                                    output: 'scale24'
                                },
                                animation_30_translation_sampler_Bip01_Tail2: {
                                    input: 'TIME24',
                                    interpolation: 'LINEAR',
                                    output: 'translation24'
                                },
                                animation_31_rotation_sampler_Bip01_TailNub: {
                                    input: 'TIME25',
                                    interpolation: 'LINEAR',
                                    output: 'rotation25'
                                },
                                animation_31_scale_sampler_Bip01_TailNub: {
                                    input: 'TIME25',
                                    interpolation: 'LINEAR',
                                    output: 'scale25'
                                },
                                animation_31_translation_sampler_Bip01_TailNub: {
                                    input: 'TIME25',
                                    interpolation: 'LINEAR',
                                    output: 'translation25'
                                },
                                animation_4_rotation_sampler_Bip01_Head: {
                                    input: 'TIME26',
                                    interpolation: 'LINEAR',
                                    output: 'rotation26'
                                },
                                animation_4_scale_sampler_Bip01_Head: {
                                    input: 'TIME26',
                                    interpolation: 'LINEAR',
                                    output: 'scale26'
                                },
                                animation_4_translation_sampler_Bip01_Head: {
                                    input: 'TIME26',
                                    interpolation: 'LINEAR',
                                    output: 'translation26'
                                },
                                animation_5_rotation_sampler_Bip01_HeadNub: {
                                    input: 'TIME27',
                                    interpolation: 'LINEAR',
                                    output: 'rotation27'
                                },
                                animation_5_scale_sampler_Bip01_HeadNub: {
                                    input: 'TIME27',
                                    interpolation: 'LINEAR',
                                    output: 'scale27'
                                },
                                animation_5_translation_sampler_Bip01_HeadNub: {
                                    input: 'TIME27',
                                    interpolation: 'LINEAR',
                                    output: 'translation27'
                                },
                                animation_6_rotation_sampler_Bip01_L_Clavicle: {
                                    input: 'TIME28',
                                    interpolation: 'LINEAR',
                                    output: 'rotation28'
                                },
                                animation_6_scale_sampler_Bip01_L_Clavicle: {
                                    input: 'TIME28',
                                    interpolation: 'LINEAR',
                                    output: 'scale28'
                                },
                                animation_6_translation_sampler_Bip01_L_Clavicle: {
                                    input: 'TIME28',
                                    interpolation: 'LINEAR',
                                    output: 'translation28'
                                },
                                animation_7_rotation_sampler_Bip01_L_UpperArm: {
                                    input: 'TIME29',
                                    interpolation: 'LINEAR',
                                    output: 'rotation29'
                                },
                                animation_7_scale_sampler_Bip01_L_UpperArm: {
                                    input: 'TIME29',
                                    interpolation: 'LINEAR',
                                    output: 'scale29'
                                },
                                animation_7_translation_sampler_Bip01_L_UpperArm: {
                                    input: 'TIME29',
                                    interpolation: 'LINEAR',
                                    output: 'translation29'
                                },
                                animation_8_rotation_sampler_Bip01_L_Forearm: {
                                    input: 'TIME30',
                                    interpolation: 'LINEAR',
                                    output: 'rotation30'
                                },
                                animation_8_scale_sampler_Bip01_L_Forearm: {
                                    input: 'TIME30',
                                    interpolation: 'LINEAR',
                                    output: 'scale30'
                                },
                                animation_8_translation_sampler_Bip01_L_Forearm: {
                                    input: 'TIME30',
                                    interpolation: 'LINEAR',
                                    output: 'translation30'
                                },
                                animation_9_rotation_sampler_Bip01_L_Hand: {
                                    input: 'TIME31',
                                    interpolation: 'LINEAR',
                                    output: 'rotation31'
                                },
                                animation_9_scale_sampler_Bip01_L_Hand: {
                                    input: 'TIME31',
                                    interpolation: 'LINEAR',
                                    output: 'scale31'
                                },
                                animation_9_translation_sampler_Bip01_L_Hand: {
                                    input: 'TIME31',
                                    interpolation: 'LINEAR',
                                    output: 'translation31'
                                }
                            }
                        );

                    }, done);
                });
            });
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

