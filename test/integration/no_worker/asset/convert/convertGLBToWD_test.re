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

    describe("test blobImages", () =>
      test("test", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          ConvertGLBTool.buildGLBFilePath("BoxTextured.glb"),
          ({blobImages}) => {
            let blobImages = blobImages |> OptionService.unsafeGet;
            let blobImage = blobImages[0];

            blobImage.objectUrl |> expect == "object_url0";
          },
        )
      )
    );
    describe("test uriImages", () =>
      test("should be none", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          ConvertGLBTool.buildGLBFilePath("BoxTextured.glb"),
          ({uriImages}) =>
          uriImages |> Js.Option.isNone |> expect == true
        )
      )
    );

    describe("test buffers", () =>
      test("should has no uri, but has byteLength and buffer", () =>
        ConvertGLBTool.testResult(
          sandbox^,
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
    /* test("aaaa", () =>
               ConvertGLBTool.testResult(
                 ConvertGLBTool.buildGLBFilePath("BoxTextured.glb"),
                 ({blobImages}) => {
                   let blobImages = blobImages |> OptionService.unsafeGet;
                   let blobImage = blobImages[0];


       Node.Fs.writeFileSync(
       Node.Path.join([|Node.Process.cwd(), "./test/res/", "test.png"|]),

       blobImage.uint8Array |> Uint8Array.buffer
       |>WonderLog.Log.print

       |> Obj.magic
       |>
       Node.Buffer.fromString

       |> Obj.magic



       ,
       `binary

       );

       1
                   |> expect == 1
                 },
               )
             ) */
  });