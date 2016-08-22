var fs = require("fs-extra"),
    Converter = require("../../dist/converter/md2/MD2ToWD"),
    config = require("../../dist/converter/common/Config"),
    path = require("path"),
    sinon = require("sinon");

require("jasmine-before-all");

describe("MD2ToWD", function () {
    var sandbox = null;
    var converter = null;
    var testFile, testFile2;
    var filePath1, filePath2;


    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        converter = Converter.create("0.1.0");
    });
    afterEach(function () {
        sandbox.restore();
    });
    beforeAll(function () {
        filePath1 = path.join(process.cwd(), "tool/converter/test/res/md2/cube.md2");
        //filePath2 = path.join(process.cwd(), "tool/converter/test/res/test2.obj");

        testFile = fs.readFileSync(filePath1);
        //testFile2 = fs.readFileSync(filePath2);
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
        judge(testFile, filePath1, function (json) {
            expect(json.metadata).toEqual({
                formatVersion: '0.1.0',
                description: '',
                sourceFile: filePath1,
                generatedBy: 'MD2ToWD'
            });
        }, done);
    });
    it("convert scene", function (done) {
        judge(testFile, filePath1, function (json) {
            expect(json.scene).toEqual({});
        }, done);
    });

    describe("convert objects", function(){
        beforeEach(function(){

        });

        it("test1", function (done) {
            sandbox.stub(config, "md2VerticeDecimalPrecision", 2);

            judge(testFile, filePath1, function (json) {



                expect(json.objects).toEqual(
                    [{
                        name: "cube",
                        material: null,
                        vertices: [-6.94, 6.73, 5.21, 5.74, 6.73, 6.42, 6.88, -5.60, 5.21, 5.74, -5.60, -6.47, -6.94, 5.52, -6.47, 6.88, 6.73, -5.31, -5.80, -5.60, 6.42, -6.94, -4.39, -6.47, -6.94, 6.73, -5.31, 6.88, 5.52, 6.42, 6.88, 5.52, -6.47, -6.94, 5.52, 6.42, 5.74, -5.60, 6.42, -5.80, -5.60, -6.47, 6.88, -5.60, -5.31, -6.94, -5.60, 5.21, -0.01, 6.73, -0.05, 6.88, 6.73, 5.21, -5.80, 6.73, 6.42, 5.74, 6.73, -6.47, -6.94, -5.60, -5.31, 6.88, -4.39, 6.42, -6.94, -4.39, 6.42, 6.88, -4.39, -6.47, -5.80, 6.73, -6.47],
                        normals: [],
                        colors: [],
                        morphTargets: [{
                            name: "FRAME000",
                            vertices: [-6.94, 6.73, 5.21, 5.74, 6.73, 6.42, 6.88, -5.60, 5.21, 5.74, -5.60, -6.47, -6.94, 5.52, -6.47, 6.88, 6.73, -5.31, -5.80, -5.60, 6.42, -6.94, -4.39, -6.47, -6.94, 6.73, -5.31, 6.88, 5.52, 6.42, 6.88, 5.52, -6.47, -6.94, 5.52, 6.42, 5.74, -5.60, 6.42, -5.80, -5.60, -6.47, 6.88, -5.60, -5.31, -6.94, -5.60, 5.21, -0.01, 6.73, -0.05, 6.88, 6.73, 5.21, -5.80, 6.73, 6.42, 5.74, 6.73, -6.47, -6.94, -5.60, -5.31, 6.88, -4.39, 6.42, -6.94, -4.39, 6.42, 6.88, -4.39, -6.47, -5.80, 6.73, -6.47]
                        }],
                        uvIndices: [15, 17, 18, 15, 20, 12, 15, 12, 11, 15, 11, 16, 16, 19, 17, 17, 15, 16, 52, 46, 51, 7, 56, 6, 9, 44, 43, 34, 31, 26, 9, 43, 8, 46, 52, 4, 28, 36, 26, 36, 28, 35, 29, 28, 26, 13, 6, 53, 13, 7, 6, 37, 9, 8, 47, 46, 4, 49, 0, 4, 31, 25, 26, 37, 8, 39, 27, 26, 25, 53, 14, 13, 39, 38, 37, 45, 4, 0, 4, 45, 47, 26, 27, 29, 54, 13, 14, 40, 37, 38, 0, 48, 45, 33, 29, 27, 30, 25, 32, 37, 40, 42, 25, 30, 27, 50, 47, 45, 38, 41, 40, 14, 55, 54, 21, 22, 2, 3, 1, 5, 5, 23, 10, 2, 3, 21, 10, 3, 5, 3, 2, 1, 3, 10, 24, 3, 24, 21],
                        verticeIndices: [12, 14, 2, 12, 6, 15, 12, 15, 20, 12, 20, 13, 13, 3, 14, 14, 12, 13, 3, 23, 14, 21, 2, 14, 7, 13, 20, 2, 21, 12, 7, 20, 15, 23, 3, 13, 22, 6, 12, 6, 22, 15, 11, 22, 12, 9, 14, 23, 9, 21, 14, 4, 7, 15, 10, 23, 13, 7, 4, 13, 21, 9, 12, 4, 15, 22, 18, 12, 9, 23, 10, 9, 22, 11, 4, 19, 13, 4, 13, 19, 10, 12, 18, 11, 17, 9, 10, 8, 4, 11, 4, 24, 19, 0, 11, 18, 1, 9, 17, 4, 8, 24, 9, 1, 18, 5, 10, 19, 11, 0, 8, 10, 5, 17, 8, 0, 18, 16, 1, 17, 17, 5, 19, 18, 16, 8, 19, 16, 17, 16, 18, 1, 16, 19, 24, 16, 24, 8],
                        uvs: [0, 0.859375, 0.0625, 0.953125, 0.90625, 0.953125, 0.484375, 0.484375, 0.078125, 0.0625, 0, 0.859375, 0.09375, 0.03125, 0.984375, 0.125, 0.09375, 0.03125, 0.984375, 0.125, 0.0625, 0.015625, 0, 0.859375, 0, 0.109375, 0.984375, 0.875, 0, 0.875, 0.90625, 0.015625, 0.078125, 0.953125, 1, 0.859375, 1, 0.109375, 0.90625, 0.953125, 0.078125, 0.015625, 0.984375, 0.109375, 0.984375, 0.859375, 0, 0.109375, 0.90625, 0.015625, 0, 0.859375, 0.078125, 0.0625, 0.90625, 0.953125, 1, 0.15625, 1, 0.859375, 0.078125, 0.953125, 0, 0.15625, 0, 0.953125, 1, 0.953125, 0, 0.0625, 1, 0.0625, 0.90625, 0.0625, 0.984375, 0.875, 0, 0.875, 0, 0.125, 0.890625, 0.96875, 0.09375, 0.96875, 0.984375, 0.96875, 0.890625, 0.03125, 0.984375, 0.03125, 0.90625, 0.9375, 1, 0.140625, 1, 0.859375, 0.078125, 0.9375, 0, 0.140625, 1, 0.9375, 1, 0.0625, 0.90625, 0.0625, 0, 0.125, 0.890625, 0.96875, 0.09375, 0.96875, 0.890625, 0.03125]
                    }]
                );
            }, done);
        });
        //
        //describe("duplicate the vertex which has different uvs", function () {
        //    it("test one vertex has two different uvs", function(){
        //        var json = [{
        //            name: "cube",
        //            material: null,
        //            vertices: [1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4],
        //            normals: [],
        //            colors: [],
        //            morphTargets: [{
        //                name: "FRAME000",
        //                vertices: [1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4]
        //            },
        //            {
        //                name: "FRAME001",
        //                vertices: [4, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4]
        //            }
        //            ],
        //            verticeIndices: [0, 1, 2, 1, 3, 2],
        //            uvIndices: [2, 0, 1, 2, 3, 1],
        //            uvs: [1.0, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.5]
        //        }];
        //
        //        converter._duplicateVertexWithDifferentUv(json);
        //
        //        result = json[0];
        //
        //        //verticeIndices: [0, 1, 2, 1, 3, 2],
        //        //    uvIndices: [2, 0, 1, 2, 3, 1],
        //        //
        //        //    uvs: [1.0, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.5]
        //        expect(result.vertices).toEqual(
        //            [
        //                1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4,
        //                4, -1, -2
        //            ]
        //        )
        //        expect(result.morphTargets[0].vertices).toEqual(
        //            [
        //                1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4,
        //                4, -1, -2
        //            ]
        //        )
        //        expect(result.morphTargets[1].vertices).toEqual(
        //            [
        //                4, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4,
        //                4, -1, -2
        //            ]
        //        )
        //        expect(result.uvs).toEqual(
        //            [
        //                1.0, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.5
        //            ]
        //        )
        //        expect(result.verticeIndices).toEqual(
        //            [
        //                0, 1, 2, 4, 3, 2
        //            ]
        //        )
        //        expect(result.uvIndices).toEqual(
        //            [
        //                2, 0, 1, 2, 3, 1
        //            ]
        //        )
        //    });
        //});
    });

    describe("convert materials", function () {
        it("materials are empty", function(done){
            judge(testFile, filePath1, function (json, resourceUrlArr) {
                expect(json.materials).toEqual({});

                done();
            }, done);
        });
    });
});

