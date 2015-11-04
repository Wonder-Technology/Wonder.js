var fs = require("fs-extra"),
    converter = require("../dist/converter"),
    Vinyl = require("vinyl"),
    path = require("path"),
    //through = require("through-gulp"),
    sinon = require("sinon");

require("jasmine-before-all");

var testFile;

describe("OBJToDY", function () {
    var sandbox = null;
    var stream = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        stream = converter.OBJToDY.create().convert();


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
    beforeAll(function(){
        testFile = new Vinyl({
            //cwd: "./",
            ////base: "./file",
            //path: "./res/test.obj",
            contents: new Buffer(fs.readFileSync(path.join(process.cwd(), "converter/test/res/test.obj")))
        });
    });

    it("convert metadata", function (done) {
        stream.on("data", function (newFile) {
            var json = JSON.stringify(newFile.toString());

            expect(json.metadata).toEqual({
                formatVersion:"0.1",
                description:"",
                sourceFile:"test.obj",
                generatedBy:"OBJConverter"
            });

            done();
        });




        stream.write(testFile);

        stream.end();
    });
});

