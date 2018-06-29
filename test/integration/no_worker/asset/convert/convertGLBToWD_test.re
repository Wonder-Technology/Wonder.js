open Wonder_jest;

open Js.Promise;

open WDType;

open Js.Typed_array;

let _ =
  describe("convert glb to wd", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    /* TODO test jpg data */

    describe("test uint8ArrayImages", () =>
      test("test", () =>
        ConvertGLBTool.testResult(
          ConvertGLBTool.buildGLBFilePath("BoxTextured.glb"),
          ({uint8ArrayImages}) => {
            let uint8ArrayImages = uint8ArrayImages |> OptionService.unsafeGet;
            let uint8ArrayImage = uint8ArrayImages[0];

            (
              uint8ArrayImages |> Js.Array.length,
              ConvertGLBTool.getUint8ArrayLengthFromWDData(uint8ArrayImage),
              uint8ArrayImage.width,
              uint8ArrayImage.height,
            )
            |> expect == (1, 23516, 256, 256);
          },
        )
      )
    );

    describe("test uriImages", () =>
      test("should be none", () =>
        ConvertGLBTool.testResult(
          ConvertGLBTool.buildGLBFilePath("BoxTextured.glb"), ({uriImages}) =>
          uriImages |> Js.Option.isNone |> expect == true
        )
      )
    );

    describe("test buffers", () =>
      test("should has no uri, but has byteLength and buffer", () =>
        ConvertGLBTool.testResult(
          ConvertGLBTool.buildGLBFilePath("BoxTextured.glb"),
          ({buffers}) => {
            let {uri, buffer, byteLength} = buffers[0];

            (
              buffers |> Js.Array.length,
              uri |> Js.Option.isNone,
              buffer |> OptionService.unsafeGet |> ArrayBuffer.byteLength,
              byteLength,
            )
            |> expect == (1, true, 24360, 24360);
          },
        )
      )
    );
  });