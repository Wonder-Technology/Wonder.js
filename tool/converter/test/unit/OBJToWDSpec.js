var fs = require("fs-extra"),
    Converter = require("../../dist/converter/src/obj/OBJToWD"),
    path = require("path"),
    sinon = require("sinon");

require("jasmine-before-all");

describe("OBJToWD", function () {
    var sandbox = null;
    var converter = null;
    var testFile1, testFile2;
    var testFile3;
    var filePath1, filePath2;
    var filePath3;


    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        converter = Converter.OBJToWD.create("0.1.0");
    });
    afterEach(function () {
        sandbox.restore();
    });
    beforeAll(function () {

        filePath1 = path.join(process.cwd(), "../res/obj/test.obj");
        filePath2 = path.join(process.cwd(), "../res/obj/test2.obj");
        filePath3 = path.join(process.cwd(), "../res/obj/noMtl.obj");

        testFile1 = fs.readFileSync(filePath1);
        testFile2 = fs.readFileSync(filePath2);
        testFile3 = fs.readFileSync(filePath3);
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

    it("convert metadata", function (done) {
        judge(testFile1, filePath1, function (json) {
            expect(json.asset).toEqual({
                version: "0.1.0",
                generator: "WonderJsOBJToWDConverter"
            });
        }, done);
    });
    // it("convert scene", function (done) {
    //     judge(testFile1, filePath1, function(json){
    //         expect(json.scene).toEqual({
    //             ambientColor: [0, 0, 0]
    //         });
    //     }, done);
    // });
    //
    describe("convert objects. object container has whole vertex data, each object has verticeIndices and normalIndices? , uvIndices?", function () {
        var vertices, normals, texCoords;

        beforeEach(function () {
        });

        it("read normals from file", function (done) {
            vertices = [1, -1, -1, 1, -1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, -1, 1, -1, 1, -1, -1, 1, -1, -1, -1];
            normals = [-1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1, -1, -1, -1];
            texCoords = [0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1];

            judge(testFile1, filePath1, function (json) {

                expect(json.scene).toEqual("Scene");
                expect(json.scenes).toEqual({
                    "Scene": {
                        "nodes": [
                            "test"
                        ]
                    }
                });


                expect(json.nodes).toEqual(
                    {
                        test: {
                            children: [],
                            matrix: [
                                1,
                                0,
                                0,
                                0,
                                0,
                                1,
                                0,
                                0,
                                0,
                                0,
                                1,
                                0,
                                0,
                                0,
                                0,
                                1],
                            mesh: 'test_mesh',
                            name: 'test'
                        }
                    }
                )

                expect(json.meshes).toEqual(
                    {
                        test_mesh: {
                            name: 'test_mesh',
                            primitives: [
                                {
                                    name: 'model1',
                                    attributes: {
                                        POSITION: vertices,
                                        TEXCOORD: texCoords,
                                        NORMAL: normals
                                    },
                                    verticeIndices: [
                                        0,
                                        3,
                                        1,
                                        0,
                                        1,
                                        2,
                                        0,
                                        1,
                                        2,
                                        0,
                                        2,
                                        3
                                    ],
                                    normalIndices: [
                                        1,
                                        2,
                                        3,
                                        1,
                                        3,
                                        0,
                                        5,
                                        2,
                                        1,
                                        5,
                                        1,
                                        0
                                    ],
                                    texCoordIndices: [
                                        2,
                                        1,
                                        0,
                                        2,
                                        0,
                                        3,
                                        2,
                                        0,
                                        2,
                                        2,
                                        2,
                                        3
                                    ],
                                    material: 'material1',
                                    mode: 4
                                },
                                {
                                    name: 'model2',
                                    attributes: {
                                        POSITION: vertices,
                                        TEXCOORD: texCoords,
                                        NORMAL: normals
                                    },
                                    verticeIndices: [
                                        0,
                                        2,
                                        1,
                                        0,
                                        1,
                                        3
                                    ],
                                    normalIndices: [
                                        3,
                                        2,
                                        1,
                                        3,
                                        1,
                                        0
                                    ],
                                    texCoordIndices: [
                                        0,
                                        1,
                                        2,
                                        0,
                                        2,
                                        3
                                    ],
                                    material: 'material2',
                                    mode: 4
                                }
                            ]
                        }
                    }
                )

            }, done);
        });
        it("if no normals, not compute it", function (done) {
            vertices = [10, -1, -1, 1, -1, 1, -1, -1, 1, -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1, -1, -1, -1];
            texCoords = [0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1];

            judge(testFile2, filePath2, function (json) {
                expect(json.scene).toEqual("Scene");
                expect(json.scenes).toEqual({
                    "Scene": {
                        "nodes": [
                            "test2"
                        ]
                    }
                });


                expect(json.nodes).toEqual(
                    {
                        test2: {
                            children: [],
                            matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                            mesh: 'test2_mesh',
                            name: 'test2'
                        }
                    }
                )

                expect(json.meshes).toEqual(
                    {
                        test2_mesh: {
                            name: 'test2_mesh',
                            primitives: [{
                                name: 'model1',
                                attributes: {
                                    POSITION: vertices,
                                    TEXCOORD: texCoords,
                                    NORMAL: []
                                },
                                verticeIndices: [0, 3, 1, 0, 1, 2],
                                normalIndices: [],
                                texCoordIndices: [2, 1, 0, 2, 0, 3],
                                material: 'material1',
                                mode: 4
                            }, {
                                name: 'model3',
                                attributes: {
                                    POSITION: vertices,
                                    TEXCOORD: texCoords,
                                    NORMAL: []
                                },
                                verticeIndices: [0, 2, 1, 0, 1, 3],
                                normalIndices: [],
                                texCoordIndices: [0, 1, 2, 0, 2, 3],
                                material: 'material3',
                                mode: 4
                            }]
                        }
                    }
                )

            }, done);
        });
        it("support no mtl file", function (done) {
            judge(testFile3, filePath3, function (json) {
                expect(json.scene).toEqual("Scene");
                expect(json.scenes).toEqual(
                    {Scene: {nodes: ['noMtl']}}
                );


                expect(json.nodes).toEqual(
                    {
                        noMtl: {
                            children: [],
                            matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                            mesh: 'noMtl_mesh',
                            name: 'noMtl'
                        }
                    }
                )

                expect(json.meshes).toEqual(
                    {
                        noMtl_mesh: {
                            name: 'noMtl_mesh',
                            primitives: [{
                                name: null,
                                attributes: {
                                    POSITION: [0.061043, 0.025284, 0.03449, 0.011829, 0.022302, 0.083267, -0.058528, 0.017917, 0.083267],
                                    TEXCOORD: [0.131375, 0.762327, 0.437504, 0.96342, 0.086658, 0.708747],
                                    NORMAL: [0.912731, 0.155721, 0.377721, 0.912731, 0.155721, 0.377721, 0.912731, 0.155721, 0.377721]
                                },
                                verticeIndices: [-1, 0, 1],
                                normalIndices: [0, 1, -1],
                                texCoordIndices: [0, -1, 1],
                                material: null,
                                mode: 4
                            }]
                        }
                    }
                )
            }, done);
        });
    });

    it("convert materials", function(done){
        judge(testFile1, filePath1, function(json, resourceUrlArr){
            expect(json.materials).toEqual(
                {
                    material1: {
                        technique: 'PHONG',
                        transparent: true,
                        transparency: 0.1,
                        values: {
                            diffuse: 'texture_1',
                            specular: [
                                '0.500000',
                                '0.500000',
                                '0.500000'
                            ],
                            emission: 'texture_2',
                            normalMap: 'texture_2',
                            shininess: 96.078431
                        }
                    },
                    material2: {
                        technique: 'PHONG',
                        transparent: true,
                        transparency: 0.5,
                        values: {
                            diffuse: [
                                '0.300000',
                                '0.200000',
                                '0.100000'
                            ],
                            specular: 'texture_1',
                            emission:[
                                '0.100000',
                                '0.500000',
                                '0.600000'
                            ],
                            shininess: 80.078431
                        }
                    }
                }
            )

            expect(json.samplers).toEqual(
                {
                    sampler_1: {
                        minFilter: 9986,
                        magFilter: 9729,
                        wrapS: 10497,
                        wrapT: 10497
                    },
                    sampler_2: {
                        minFilter: 9986,
                        magFilter: 9729,
                        wrapS: 10497,
                        wrapT: 10497
                    }
                }
            )

            expect(json.images).toEqual(
                {
                    image_1: {
                        name: 'image_1',
                        uri: '1.jpg'
                    },
                    image_2: {
                        name: 'image_2',
                        uri: './resource/2.png'
                    }
                }
            )
        }, done);
    });
});

