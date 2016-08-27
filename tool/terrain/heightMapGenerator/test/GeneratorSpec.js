var fs = require("fs-extra"),
    Generator = require("../dist/terrain/heightMapGenerator/Generator"),
    path = require("path"),
    Canvas = require("canvas"),
    sinon = require("sinon");
var wdFrp = require("wdfrp");

var Image = Canvas.Image;

describe("Generator", function () {
    var sandbox = null;
    var generator;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        generator = Generator.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("generateHeightMap", function () {
        var method;
        var iterationCount;
        var width;
        var height;
        var smoothLevel;
        var destDir;

        function isPixelEqual(pixel1, pixel2){
            return Math.abs(pixel1 - pixel2) <= 10;
        }

        beforeEach(function(){
            method = "fault";
            iterationCount = 10;
            width = 64;
            height = 64;
            smoothLevel = 0;
            destDir = "dest_test/";

            destDir = path.join(__dirname, destDir);


            fs.removeSync(destDir);
            fs.mkdirsSync(destDir);
        });
        afterEach(function(){
            fs.removeSync(destDir);
        });

        it("image file is created but has no data when generateHeightMap->completed", function (done) {
            generator.generateHeightMap(method, iterationCount, width, height, smoothLevel, destDir)
                .subscribe(function (data) {
                    //console.log("data");
                }, function (e) {
                    console.log("error:", e);
                    done();
                }, function () {
                    //console.log("completed");

                    var imagePathArr = fs.readdirSync(destDir);

                    expect(imagePathArr.length).toEqual(1);
                    expect(imagePathArr).toMatch(/\.png$/);

                    var fileStat = fs.statSync(path.join(destDir, imagePathArr[0]));

                    expect(fileStat.size).toEqual(0);
                    expect(fileStat.blocks).toEqual(0);

                    done();
                });
        });
        it("the image file's data can be getted some time later when generateHeightMap->completed(so the writing image data is async operation, but the creating image file is sync operation?)", function (done) {
            generator.generateHeightMap(method, iterationCount, width, height, smoothLevel, destDir)
                .subscribe(function (data) {
                    //console.log("data");
                }, function (e) {
                    console.log("error:", e);
                    done();
                }, function () {
                    var imagePathArr = fs.readdirSync(destDir);

                    setTimeout(function() {
                        var heightMap = fs.readFileSync(path.join(destDir, imagePathArr[0]));

                        //console.log(heightMap.length)
                        expect(heightMap.length).toBeGreaterThan(0);

                        var img = new Image();

                        img.src = heightMap;

                        width = width / 4;

                        var c = new Canvas(width, height);
                        var ctx = c.getContext('2d');

                        //console.log("end2")

                        try {
                            ctx.drawImage(img, 0, 0, width, height);
                        }
                        catch (e) {
                            console.log(e)
                        }
                        //console.log("end3", width, height)

                        var targetImageData = ctx.getImageData(0, 0, width, height);
                        //console.log("end4")

                        var sourceImageData = generator.imageData;






                        var equalCount = 0,
                            expectedEqualCount = 100;

                        //console.log(targetImageData.data.length)

                        for(var i = 0, len = expectedEqualCount; i < len; i++){
                            if(isPixelEqual(targetImageData.data[i], sourceImageData.data[i])){
                                equalCount ++;
                            }
                        }

                        expect(equalCount).toEqual(expectedEqualCount);

                        done();

                    }, 100);
                });
        });
        it("image->pixel value should >=0 && <= 255", function (done) {
            generator.generateHeightMap(method, iterationCount, width, height, smoothLevel, destDir)
                .subscribe(function (data) {
                    //console.log("data");
                }, function (e) {
                    console.log("error:", e);
                    done();
                }, function () {
                    var imagePathArr = fs.readdirSync(destDir);

                    setTimeout(function() {
                        var heightMap = fs.readFileSync(path.join(destDir, imagePathArr[0]));

                        //expect(heightMap.length).toBeGreaterThan(0);

                        var img = new Image();

                        img.src = heightMap;

                        width = width / 4;

                        var c = new Canvas(width, height);
                        var ctx = c.getContext('2d');


                        try {
                            ctx.drawImage(img, 0, 0, width, height);
                        }
                        catch (e) {
                            console.log(e)
                        }

                        var targetImageData = ctx.getImageData(0, 0, width, height);




                        for(var i = 0, len = targetImageData.data.length; i < len; i++){
                            expect(targetImageData.data[i]).not.toBeLessThan(0)
                            expect(targetImageData.data[i]).toBeLessThan(256)
                        }

                        done();

                    }, 100);
                });
        });
    });
});
