var gulp = require("gulp");
var gs = require("glob-stream");
var fs = require("fs-extra");
// var gulpTs = require("gulp-typescript");
// var merge = require("merge2");
var del = require("del");
// var gulpSync = require("gulp-sync")(gulp);
var wdFrp = require("wdfrp");
var path = require("path");

var commandUtils = require("./gulp_task/common/commandUtils");


gulp.task("convert", function (done) {
    var Converter = require("./dist/converter/Converter");
//todo support combine multi wd files to one file(according to command line param)

    var sourceDir = commandUtils.parseOption("--sourceDir") || "./source/",
        destDir = commandUtils.parseOption("--destDir") || "./dest/",
        converter = Converter.create();

    wdFrp.fromNodeCallback(fs.remove)(destDir)
        .concat(
            wdFrp.fromStream(gs.create([path.join(sourceDir, "**")], {nodir: true}))
                //todo use concatMap?
                .flatMap(function (data) {
                    return wdFrp.fromNodeCallback(fs.readFile)(data.path)
                        .flatMap(function (fileBuffer) {
                            var filePath = data.path;

                            return converter.write(converter.convert(fileBuffer, filePath), sourceDir, destDir, filePath);
                        })
                })
        )
        .subscribe(function (dataArr) {
        }, function (e) {
            console.log(e);
            done();
        }, function () {
            console.log("completed");
            done();
        });
});

require("../gulp_task/common");

require("./gulp_task/convertIndices/convertMultiIndicesToSingleIndice");

require("./gulp_task/compressToBinary/compressToBinary");



// var BufferWriter = require("./common/BufferWriter");
//
//
// function toBuffer(ab) {
//     // var buffer = new Buffer(ab.byteLength);
//     // var view = new Uint8Array(ab);
//     // for (var i = 0; i < buffer.length; ++i) {
//     //     buffer[i] = view[i];
//     // }
//     //
//     // console.log(buffer)
//     // console.log(view)
//     //
//     // return buffer;
//
//
//     // console.log(ab, ab.byteLength)
//
//     // var buffer = new Buffer(ab);
//     // var buffer = Buffer.from(ab)
//     // //
//     // console.log(buffer)
//     // //
//     // // // buffer.writeFloatLE(-4.01, 0);
//     // //
//     // console.log(buffer.readFloatLE(4));
//
//     return Buffer.from(ab);
// }


// gulp.task("convertToBinaryFile", function (done) {
//     var sourceFile = "../../mine/output.json";
//
//     var destBinFile = "../../mine/output.bin";
//
//     var fileJson = JSON.parse(fs.readFileSync(sourceFile, "utf8").toString());
//
//     // var data = fileJson["embeds"]["Embed_172_Biped_Nulls:Lower_Teeth"].vertices;
//
//     // console.log(data);
//
//     // var writer = BufferWriter.create(Buffer.alloc(data.length));
//     // var writer = BufferWriter.create(Buffer.alloc(4));
//
//     // console.log(new Float32Array(3).buffer)
//
//     //
//     //
//     // var writer = BufferWriter.create(new Float32Array(3).buffer);
//     //
//     // writer.seek(0);
//     //
//     // // data.forEach(function(value){
//     // //     console.log(value)
//     // //     writer.writeFloat(value);
//     // // });
//     //
//     //
//     // // writer.writeFloat(-4.000000000000021);
//     // writer.writeFloat(4.0);
//     //
//     //
//     // // writer.seek(4);
//     //
//     // writer.writeFloat(4.0);
//
//
//
//     var data = [
//           -4.0,
//           -5.64789797243898,
//           4.0
//         ];
//
//
//     var arr = new Float32Array(3);
//
//
//     data.forEach(function(value, index){
//         // console.log(value)
//         // writer.writeFloat(value);
//         arr[index] = value;
//     });
//
//
//
//     // console.log(arr)
//
//     fs.writeFileSync(destBinFile, toBuffer(arr.buffer));
//     // fs.writeFileSync(destBinFile, toBuffer(arr));
//
//
//     //
//     // // fs.writeFileSync()
//     //
//     // var view = new DataView(writer.buffer);
//     //
//     // console.log(view.getFloat32(0));
//
//
//     var file = fs.readFileSync(destBinFile);
//
//
//     console.log(file.readFloatLE(0))
//
//     done();
// });



