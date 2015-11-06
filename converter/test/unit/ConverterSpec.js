var fs = require("fs-extra"),
    Converter = require("../../dist/Converter"),
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

        function readJSON(resultFilePath){
            var EXTNAME = ".dy";
            var resultFilePath = resultFilePath.replace(/\.\w+$/, EXTNAME);

            if(!fs.existsSync(resultFilePath)){
                throw new Error(resultFilePath+" not exist");
            }

            return JSON.parse(fs.readFileSync(resultFilePath).toString());
        }

        it("convert one file, get the .dy file and relative resource files", function (done) {
            var destDir = path.join(process.cwd(), "converter/test/dest_forTest");
            converter.write(converter.convert(testFile.toString(), testPath1), sourceDir, destDir, testPath1)
                .subscribe(function (data) {
                    console.log(data)
                }, null, function () {
                    var resultFilePath = path.join(destDir, path.relative(sourceDir, testPath1));
                    var resultJson = readJSON(resultFilePath);

                    expect(resultJson.metadata).toEqual({
                        formatVersion: converter.version,
                        description: '',
                        sourceFile: testPath1,
                        generatedBy: converter.name
                    });

                    //expect(fs.existsSync(path.resolve(path.dirname(resultFilePath), "1.jpg"))).toBeTruthy();
                    //expect(fs.existsSync(path.resolve(path.dirname(resultFilePath), "./resource/2.png"))).toBeTruthy();

                    fs.removeSync(destDir);

                    done();
                })
        });

        it("convert multi files, get the .dy file and relative resource files", function (done) {
            var destDir = path.join(process.cwd(), "converter/test/dest_forTest");
            converter.write(converter.convert(testFile.toString(), testPath1), sourceDir, destDir, testPath1)
                .merge(
                    converter.write(converter.convert(testFile2.toString(), testPath2), sourceDir, destDir, testPath2)
                )
                .subscribe(function (data) {
                }, null, function () {
                    var resultFilePath1 = path.join(destDir, path.relative(sourceDir, testPath1));
                    var resultFilePath2 = path.join(destDir, path.relative(sourceDir, testPath2));
                    var resultJson1 = readJSON(resultFilePath1);
                    var resultJson2 = readJSON(resultFilePath2);

                    expect(resultJson1.objects).toBeDefined();
                    expect(resultJson1.materials).toBeDefined();
                    expect(resultJson2.objects).toBeDefined();
                    expect(resultJson2.materials).toBeDefined();


                    expect(fs.existsSync(path.resolve(path.dirname(resultFilePath1), "1.jpg"))).toBeTruthy();
                    expect(fs.existsSync(path.resolve(path.dirname(resultFilePath1), "./resource/2.png"))).toBeTruthy();

                    expect(fs.existsSync(path.resolve(path.dirname(resultFilePath2), "1.jpg"))).toBeTruthy();

                    fs.removeSync(destDir);

                    done();
                })
        });
    });
});

