var fs = require("fs-extra"),
    converter = require("../dist/obj/OBJToDY"),
    Vinyl = require("vinyl"),
    path = require("path"),
    sinon = require("sinon");

require("jasmine-before-all");

var testFile, testFile2;

describe("OBJToDY", function () {
    var sandbox = null;
    var stream = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        stream = converter.create("0.1.0").convert();


        //attach data event listener can switch the stream into flowing mode,
        // which will trigger the end event!

        //Attaching a data event listener to a stream that has not been explicitly paused will switch the stream into flowing mode.
        //Note that the end event will not fire unless the data is completely consumed. This can be done by switching into flowing mode,
        stream.on("data", function () {
        });
    });
    afterEach(function () {
        sandbox.restore();
    });
    beforeAll(function () {
        testFile = new Vinyl({
            //cwd: "./",
            ////base: "./file",
            path: path.join(process.cwd(), "converter/test/res/test.obj"),
            contents: new Buffer(fs.readFileSync(path.join(process.cwd(), "converter/test/res/test.obj")))
        });
        testFile2 = new Vinyl({
            path: path.join(process.cwd(), "converter/test/res/test2.obj"),
            contents: new Buffer(fs.readFileSync(path.join(process.cwd(), "converter/test/res/test2.obj")))
        });
    });

    it("convert metadata", function (done) {
        stream.on("data", function (newFile) {
            var json = JSON.parse(newFile.toString());

            expect(json.metadata).toEqual({
                formatVersion: '0.1.0',
                description: '',
                sourceFile: '/Users/y/Github/DYEngine/converter/test/res/test.obj',
                generatedBy: 'OBJToDY'
            });

            done();
        });


        stream.write(testFile);

        stream.end();
    });
    it("convert scene", function (done) {
        stream.on("data", function (newFile) {
            var json = JSON.parse(newFile.toString());

            expect(json.scene).toEqual({
                ambientColor: [0, 0, 0]
            });

            done();
        });


        stream.write(testFile);

        stream.end();
    });

    describe("convert objects", function () {
        it("read normals from file", function (done) {
            stream.on("data", function (newFile) {
                var json = JSON.parse(newFile.toString());

                expect(json.objects).toEqual(
                    {
                        test: {
                            children: {
                                model1: {
                                    material: 'material1',
                                    vertices: [1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, -1, 1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, 1, -1, -1, 1, 1, -1, -1, -1, -1, 1, -1, -1, -1],
                                    normals: [-1, -1, 1, 1, -1, 1, 1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1, 1, 1, -1, 1, -1, -1, 1, -1, -1, -1],
                                    uvs: [1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1],
                                    indices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                                    colors: [],
                                    morphTargets: []
                                },
                                model2: {
                                    material: 'material2',
                                    vertices: [1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1, 1, -1, 1, -1, -1, -1],
                                    normals: [1, -1, -1, 1, -1, 1, -1, -1, 1, 1, -1, -1, -1, -1, 1, -1, -1, -1],
                                    uvs: [0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1],
                                    indices: [0, 1, 2, 3, 4, 5],
                                    colors: [],
                                    morphTargets: []
                                }
                            }
                        }
                    }
                );

                done();
            });


            stream.write(testFile);

            stream.end();
        });
        it("compute normals", function (done) {
            stream.on("data", function (newFile) {
                var json = JSON.parse(newFile.toString());

                expect(json.objects).toEqual(
                    {
                        test2: {
                            children: {
                                model1: {
                                    material: 'material1',
                                    vertices: [1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, -1, 1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, 1, -1, -1, 1, 1, -1, -1, -1, -1, 1, -1, -1, -1],
                                    normals: [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0],
                                    uvs: [1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1],
                                    indices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                                    colors: [],
                                    morphTargets: []
                                },
                                model2: {
                                    material: 'material2',
                                    vertices: [1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1, 1, -1, 1, -1, -1, -1],
                                    normals: [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0],
                                    uvs: [0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1],
                                    indices: [0, 1, 2, 3, 4, 5],
                                    colors: [],
                                    morphTargets: []
                                }
                            }
                        }
                    }
                );

                done();
            });


            stream.write(testFile2);

            stream.end();
        });
    });

    it("convert materials", function(done){
        stream.on("data", function (newFile) {
            var json = JSON.parse(newFile.toString());

            expect(json.materials).toEqual(
                {
                    material1: {
                        type: 'LightMaterial',
                        diffuseColor: ['0.100000', '0.200000', '0.300000'],
                        specularColor: ['0.500000', '0.500000', '0.500000'],
                        diffuseMapUrl: '1.jpg',
                        specularMapUrl: null,
                        normalMapUrl: null,
                        shininess: 96.078431,
                        opacity: 0.1
                    },
                    material2: {
                        type: 'LightMaterial',
                        diffuseColor: ['0.300000', '0.200000', '0.100000'],
                        specularColor: ['0.800000', '0.500000', '0.600000'],
                        diffuseMapUrl: null,
                        specularMapUrl: '1.jpg',
                        normalMapUrl: null,
                        shininess: 80.078431,
                        opacity: 0.5
                    }
                }
            );

            done();
        });


        stream.write(testFile2);

        stream.end();
    });
});

