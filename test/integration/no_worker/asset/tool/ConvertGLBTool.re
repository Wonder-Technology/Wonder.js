let _convertUint8ArrayToBuffer = [%raw
  uint8Array => {|
      {
           var buf = new Buffer(uint8Array.byteLength);

           for (var i = 0; i < buf.length; ++i) {
               buf[i] = uint8Array[i];
           }

           return buf;
       }
      |}
];

let buildFakeTextDecoder = [%raw
  convertUint8ArrayToBufferFunc => {|
        var TextDecoder = function(utfLabel){
        };

        TextDecoder.prototype.decode = (uint8Array) => {
          var buffer = convertUint8ArrayToBufferFunc(uint8Array);

          return buffer.toString("utf8");
        };

        window.TextDecoder = TextDecoder;
    |}
];

let buildGLBFilePath = glbFileName =>
  Node.Path.join([|Node.Process.cwd(), "./test/res/", glbFileName|]);

let testResult = (glbFilePath, testFunc) => {
  buildFakeTextDecoder(_convertUint8ArrayToBuffer);

  let buffer = NodeExtend.readFileBufferSync(glbFilePath);

  testFunc(ConverterAPI.convertGLBToWD(buffer##buffer));
};

let getUint8ArrayLength = uint8Array =>
  uint8Array |> Js.Typed_array.Uint8Array.length;

let getUint8ArrayLengthFromWDData = ({uint8Array}: WDType.uint8ArrayImage) =>
  uint8Array |> getUint8ArrayLength;