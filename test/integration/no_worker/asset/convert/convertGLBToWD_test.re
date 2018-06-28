open Wonder_jest;

open Js.Promise;

open WDType;

let _ =
  describe("convert glb to wd", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    let convertUint8ArrayToBuffer = [%raw
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

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test", () =>
      test("aaaa", () => {
        buildFakeTextDecoder(convertUint8ArrayToBuffer);

        let buffer =
          NodeExtend.readFileBufferSync(
            Node.Path.join([|
              Node.Process.cwd(),
              "./test/res/",
              "BoxTextured.glb",
            |]),
          );

        /* WonderLog.Log.print(buffer##buffer) |> ignore; */

        ConverterAPI.convertGLBToWD(buffer##buffer)
        |> expect == (1 |> Obj.magic);
      })
    );
  });