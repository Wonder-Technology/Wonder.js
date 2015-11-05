var fs = require("fs-extra"),
    Converter = require("../dist/Converter"),
    path = require("path"),
    sinon = require("sinon");

require("jasmine-before-all");

describe("Converter", function () {
    var sandbox = null;
    var converter;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        converter = Converter.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("convert obj file", function () {
        var testFile, testFile2;
        var testPath1, testPath2;
        var sourceDir;

        beforeEach(function () {
            sourceDir = path.join(process.cwd(), "converter/test/");
            testPath1 = path.join(process.cwd(), "converter/test/res/test.obj");
            testPath2 = path.join(process.cwd(), "converter/test/res/test2.obj");
        });
        beforeAll(function () {
            testFile = fs.readFileSync(testPath1);
            testFile2 = fs.readFileSync(testPath2);
        });

        it("convert one file", function (done) {
            var destDir = path.join(process.cwd(), "converter/test/dest_forTest");
            converter.write(converter.convert(testFile.toString(), testPath1), sourceDir, destDir, testPath1)
                .subscribe(function (data) {
                }, null, function () {
                    var resultFilePath = path.join(destDir, path.relative(sourceDir, testPath1));
                    var resultJson = JSON.parse(fs.readFileSync(resultFilePath).toString());

                    expect(resultJson.metadata).toEqual({
                        formatVersion: '0.1.0',
                        description: '',
                        sourceFile: testPath1,
                        generatedBy: 'DYConverter'
                    });

                    fs.removeSync(destDir);

                    done();
                })
        });

        it("convert multi files", function (done) {
            var destDir = path.join(process.cwd(), "converter/test/dest_forTest");
            converter.write(converter.convert(testFile.toString(), testPath1), sourceDir, destDir, testPath1)
                .merge(
                    converter.write(converter.convert(testFile2.toString(), testPath2), sourceDir, destDir, testPath2)
                )
                .subscribe(function (data) {
                }, null, function () {
                    var resultFilePath1 = path.join(destDir, path.relative(sourceDir, testPath1));
                    var resultFilePath2 = path.join(destDir, path.relative(sourceDir, testPath2));
                    var resultJson1 = JSON.parse(fs.readFileSync(resultFilePath1).toString());
                    var resultJson2 = JSON.parse(fs.readFileSync(resultFilePath2).toString());

                    expect(resultJson1.objects).toBeDefined();
                    expect(resultJson1.materials).toBeDefined();
                    expect(resultJson2.objects).toBeDefined();
                    expect(resultJson2.materials).toBeDefined();

                    fs.removeSync(destDir);

                    done();
                })
        });
    });
});

