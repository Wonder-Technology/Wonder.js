/*!
node-canvas has bug: Image given has not completed loading when draw image
so can't test the generated image!


 https://github.com/Automattic/node-canvas/issues/289 :
 For everybody on this ticket and for all those who will arrive in the future, please note that this error message MAY occur because you are attempting to load an image type that canvas does not support - probably due to a limited cairo build. You can verify this by trying to load a PNG instead which is typically supported. It is not clear why loading an unsupported image type results in this error message.







var fs = require("fs-extra"),
    Generator = require("../dist/Generator"),
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
        function getImageData(resultDir, width, height, callback){
            console.log(resultDir, fs.readdirSync);

            var imagePathArr = fs.readdirSync(resultDir);

            expect(imagePathArr.length).toEqual(1);

            console.log(path.join(resultDir, imagePathArr[0]));

            fs.readFile(path.join(resultDir, imagePathArr[0]), function(err, heightMap){
                //var heightMap = fs.readFileSync(path.join(resultDir, imagePathArr[0]));

                console.log("read", heightMap.length)

                if (err){
                    throw err;
                }

                var img = new Image();

                img.src = heightMap;


                var canvas = new Canvas(width, height);
                var ctx = canvas.getContext('2d');

                //img.onload = function(){
                //    try{
                //        ctx.drawImage(this, 0, 0, width, height);
                //    }
                //    catch(e){
                //        console.log(e)
                //    }
                //
                //    callback(ctx.getImageData(0,0, width, height));
                //
                //
                //
                //    //console.log("draw", img, width, height, ctx.drawImage)
                //    //console.log("after draw")
                //}
                //img.onerror = function(e){
                //    console.log(e)
                //}




                try{
                    ctx.drawImage(img, 0, 0, width, height);
                }
                catch(e){
                    console.log(e)
                }

            });
        }

        it("generate one .png height map", function (done) {
            var method = "fault";
            var iterationCount = 1;
            var width = 256;
            var height = 256;
            var smoothLevel = 0;
            var destDir = "dest_test/";

            destDir = path.join(__dirname, destDir);


            fs.removeSync(destDir);
            fs.mkdirsSync(destDir);

            generator.generateHeightMap(method, iterationCount, width, height, smoothLevel, destDir)
                .subscribe(function (data) {
                    console.log("data", data);
                }, function (e) {
                    console.log("error:", e);
                    done();
                }, function () {
                    //console.log("completed");
                    //done();


                    getImageData(destDir, width, height, function (imageData) {
                        console.log("imageData");

                        expect(true).toBeTruthy();

                        fs.removeSync(destDir);

                        done();
                    });

                    //done();

                });
        });
        it("image->width should === width / 4", function (done) {
            done();
        });
    });
});
*/
