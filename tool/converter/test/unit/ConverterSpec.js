var fs = require("fs-extra"),
    Converter = require("../../dist/converter/Converter"),
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
        var destDir;

        beforeEach(function () {
            sourceDir = path.join(process.cwd(), "../res/obj/");
            destDir = path.join(process.cwd(), "../dest_forTest");


            testPath1 = path.join(process.cwd(), "../res/obj/test.obj");
            testPath2 = path.join(process.cwd(), "../res/obj/test2.obj");
        });
        beforeAll(function () {
            testFile = fs.readFileSync(testPath1);
            testFile2 = fs.readFileSync(testPath2);
        });

        function getResultFilePath(objFilePath) {
            var EXTNAME = ".wd";

            return objFilePath.replace(/\.\w+$/, EXTNAME);
        }

        function readJSON(resultFilePath){
            var resultFilePath = getResultFilePath(resultFilePath);

            if(!fs.existsSync(resultFilePath)){
                throw new Error(resultFilePath+" not exist");
            }

            return JSON.parse(fs.readFileSync(resultFilePath).toString());
        }

        it("convert one file, get the .wd file and relative resource files", function (done) {
            converter.write(converter.convert(testFile, testPath1, sourceDir, destDir), sourceDir, destDir, testPath1)
                .subscribe(function (data) {
                    console.log(data)
                }, null, function () {
                    var resultFilePath = path.join(destDir, path.relative(sourceDir, testPath1));
                    var resultJson = readJSON(resultFilePath);

                    expect(resultJson.asset).toEqual({
                        version: '0.8.0',
                        generator: 'wdJsOBJToWDConverter'
                    });

                    expect(fs.existsSync(path.resolve(path.dirname(resultFilePath), "1.jpg"))).toBeTruthy();
                    expect(fs.existsSync(path.resolve(path.dirname(resultFilePath), "./resource/2.png"))).toBeTruthy();

                    fs.removeSync(destDir);

                    done();
                });
        });

        it("convert multi files, get the .wd file and relative resource files", function (done) {
            converter.write(converter.convert(testFile, testPath1, sourceDir, destDir), sourceDir, destDir, testPath1)
                .merge(
                    converter.write(converter.convert(testFile2, testPath2, sourceDir, destDir), sourceDir, destDir, testPath2)
                )
                .subscribe(function (data) {
                }, null, function () {
                    var resultFilePath1 = path.join(destDir, path.relative(sourceDir, testPath1));
                    var resultFilePath2 = path.join(destDir, path.relative(sourceDir, testPath2));
                    var resultJson1 = readJSON(resultFilePath1);
                    var resultJson2 = readJSON(resultFilePath2);

                    expect(resultJson1.nodes).toBeDefined();
                    expect(resultJson1.materials).toBeDefined();
                    expect(resultJson2.nodes).toBeDefined();
                    expect(resultJson2.materials).toBeDefined();


                    expect(fs.existsSync(path.resolve(path.dirname(resultFilePath1), "1.jpg"))).toBeTruthy();
                    expect(fs.existsSync(path.resolve(path.dirname(resultFilePath1), "./resource/2.png"))).toBeTruthy();

                    expect(fs.existsSync(path.resolve(path.dirname(resultFilePath2), "1.jpg"))).toBeTruthy();

                    fs.removeSync(destDir);

                    done();
                })
        });

        describe("test embeded", function(){
            it("not copy the embeded image files", function (done) {
                converter.write(converter.convert(testFile, testPath1, sourceDir, destDir), sourceDir, destDir, testPath1, true)
                    .subscribe(function (data) {
                        console.log(data)
                    }, null, function () {
                        var resultFilePath = path.join(destDir, path.relative(sourceDir, testPath1));
                        var resultJson = readJSON(resultFilePath);


                        expect(fs.existsSync(path.resolve(path.dirname(resultFilePath), "1.jpg"))).toBeFalsy();
                        expect(fs.existsSync(path.resolve(path.dirname(resultFilePath), "./resource/2.png"))).toBeFalsy();

                        fs.removeSync(destDir);

                        done();
                    });
            });
            it("not copy the embeded bin files", function () {
                //todo finish
            });
        });

        describe("fix bug", function(){
            beforeEach(function(){
            });

            describe("if source file is in sub dir, the target file should also in the corresponding dir", function () {
                it("test obj", function(done){
                    sourceDir = path.join(process.cwd(), "../res/");
                    destDir = path.join(process.cwd(), "../dest_forTest");


                    testPath1 = path.join(process.cwd(), "../res/obj/test.obj");


                    converter.write(converter.convert(testFile, testPath1, sourceDir, destDir), sourceDir, destDir, testPath1)
                        .subscribe(function (data) {
                            console.log(data)
                        }, null, function () {
                            var resultFilePath = path.join(destDir, path.relative(sourceDir, testPath1));
                            resultFilePath = getResultFilePath(resultFilePath);

                            expect(fs.existsSync(resultFilePath)).toBeTruthy();
                            expect(fs.existsSync(path.join(destDir, "test.wd"))).toBeFalsy();

                            fs.removeSync(destDir);

                            done();
                        });
                });
                it("test fbx", function(done){
                    sourceDir = path.join(process.cwd(), "../res");
                    destDir = path.join(process.cwd(), "../dest_forTest");


                    testPath1 = path.join(process.cwd(), "../res/fbx/JPN.fbx");

                    testFile = fs.readFileSync(testPath1);

                    converter.write(converter.convert(testFile, testPath1, sourceDir, destDir), sourceDir, destDir, testPath1)
                        .subscribe(function (data) {
                            console.log(data)
                        }, null, function () {
                            var resultFilePath = path.join(destDir, path.relative(sourceDir, testPath1));
                            resultFilePath = getResultFilePath(resultFilePath);

                            expect(fs.existsSync(resultFilePath)).toBeTruthy();
                            expect(fs.existsSync(path.join(destDir, "JPN.wd"))).toBeFalsy();

                            fs.removeSync(destDir);

                            done();
                        });
                });
            });
        });
    });
});

