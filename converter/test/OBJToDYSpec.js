var fs = require("fs-extra"),
    Converter = require("../dist/obj/OBJToDY"),
    Vinyl = require("vinyl"),
    path = require("path"),
    sinon = require("sinon");

require("jasmine-before-all");



describe("OBJToDY", function () {
    var sandbox = null;
    //var stream = null;
    var converter = null;
    var testFile, testFile2;
    var filePath1,filePath2;


    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        converter = Converter.create("0.1.0");

        //stream = converter.create("0.1.0").convert();
        //
        //
        ////attach data event listener can switch the stream into flowing mode,
        //// which will trigger the end event!
        //
        ////Attaching a data event listener to a stream that has not been explicitly paused will switch the stream into flowing mode.
        ////Note that the end event will not fire unless the data is completely consumed. This can be done by switching into flowing mode,
        //stream.on("data", function () {
        //});
    });
    afterEach(function () {
        sandbox.restore();
    });
    beforeAll(function () {
        filePath1 = path.join(process.cwd(), "converter/test/res/test.obj");
        filePath2 = path.join(process.cwd(), "converter/test/res/test2.obj");

        testFile = fs.readFileSync(filePath1);
        testFile2 = fs.readFileSync(filePath2);
    });

    function judge(file, filePath, assertion, done){
        converter.convert(file.toString(), filePath)
            .subscribe(function(arr){
                var json = arr[0],
                    sourceUrlArr = arr[1];

                assertion(json, sourceUrlArr);
            }, null, function(){
                done();
            })
    }

    it("convert metadata", function (done) {
        judge(testFile, filePath1, function(json){
            expect(json.metadata).toEqual({
                formatVersion: '0.1.0',
                description: '',
                sourceFile: '/Users/y/Github/DYEngine/converter/test/res/test.obj',
                generatedBy: 'OBJToDY'
            });
        }, done);
    });
    it("convert scene", function (done) {
        judge(testFile, filePath1, function(json){
            expect(json.scene).toEqual({
                ambientColor: [0, 0, 0]
            });
        }, done);
    });

    describe("convert objects", function () {
        it("read normals from file", function (done) {
            judge(testFile, filePath1, function(json){
                expect(json.objects).toEqual(
                    [{
                        name: 'test',
                        children: [{
                            name: 'model1',
                            material: 'material1',
                            vertices: [1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, -1, 1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, 1, -1, -1, 1, 1, -1, -1, -1, -1, 1, -1, -1, -1],
                            normals: [-1, -1, 1, 1, -1, 1, 1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1, 1, 1, -1, 1, -1, -1, 1, -1, -1, -1],
                            uvs: [1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1],
                            indices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                            colors: [],
                            morphTargets: []
                        }, {
                            name: 'model2',
                            material: 'material2',
                            vertices: [1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1, 1, -1, 1, -1, -1, -1],
                            normals: [1, -1, -1, 1, -1, 1, -1, -1, 1, 1, -1, -1, -1, -1, 1, -1, -1, -1],
                            uvs: [0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1],
                            indices: [0, 1, 2, 3, 4, 5],
                            colors: [],
                            morphTargets: []
                        }]
                    }]
                );
            }, done);
        });
        it("compute normals", function (done) {
            judge(testFile2, filePath2, function(json){
                expect(json.objects).toEqual(
                    [{
                        name: 'test2',
                        children: [{
                            name: 'model1',
                            material: 'material1',
                            vertices: [10, -1, -1, -1, -1, -1, 1, -1, 1, 10, -1, -1, 1, -1, 1, -1, -1, 1],
                            normals: [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0],
                            uvs: [1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
                            indices: [0, 1, 2, 3, 4, 5],
                            colors: [],
                            morphTargets: []
                        }, {
                            name: 'model3',
                            material: 'material3',
                            vertices: [10, -1, -1, -1, -1, 1, 1, -1, 1, 10, -1, -1, 1, -1, 1, -1, -1, -1],
                            normals: [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0],
                            uvs: [0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1],
                            indices: [0, 1, 2, 3, 4, 5],
                            colors: [],
                            morphTargets: []
                        }]
                    }]
                );

                done();
            }, done);
        });
    });

    it("convert materials", function(done){
        judge(testFile, filePath1, function(json, resourceUrlArr){
            expect(json.materials).toEqual(
                {
                    material1: {
                        type: 'LightMaterial',
                        diffuseColor: ['0.100000', '0.200000', '0.300000'],
                        specularColor: ['0.500000', '0.500000', '0.500000'],
                        diffuseMapUrl: '1.jpg',
                        specularMapUrl: null,
                        normalMapUrl: './resource/2.png',
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
            filePath1 = path.join(process.cwd(), "converter/test/res/test.obj");

            expect(resourceUrlArr).toEqual(
                [
                    path.resolve(path.dirname(filePath1), "1.jpg"),
                    path.resolve(path.dirname(filePath1), "./resource/2.png")
                ]
            );

            done();
        }, done);
    });
});

