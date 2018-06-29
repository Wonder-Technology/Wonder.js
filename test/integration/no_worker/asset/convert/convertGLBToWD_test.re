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

    describe("test blobImages", () => {
      test("test only png image", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          ConvertGLBTool.buildGLBFilePath("BoxTextured.glb"),
          ({blobImages}) => {
            let blobImages = blobImages |> OptionService.unsafeGet;

            blobImages |> expect == [|{objectUrl: "object_url0"}|];
          },
        )
      );

      test("test jpeg and png images", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          ConvertGLBTool.buildGLBFilePath("AlphaBlendModeTest.glb"),
          ({blobImages}) => {
            let blobImages = blobImages |> OptionService.unsafeGet;

            blobImages
            |>
            expect == [|
                        {objectUrl: "object_url0"},
                        {objectUrl: "object_url1"},
                        {objectUrl: "object_url2"},
                        {objectUrl: "object_url3"},
                      |];
          },
        )
      );
    });

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

    describe("test basicSourceTextures", () => {
      test("test only png image", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          ConvertGLBTool.buildGLBFilePath("BoxTextured.glb"),
          ({basicSourceTextures}) =>
          basicSourceTextures
          |>
          expect == [|
                      {
                        name: "CesiumLogoFlat.png",
                        format: SourceTextureType.RGBA,
                      },
                    |]
        )
      );

      test("test jpeg and png images", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          ConvertGLBTool.buildGLBFilePath("AlphaBlendModeTest.glb"),
          ({basicSourceTextures}) =>
          basicSourceTextures
          |>
          expect == [|
                      {name: "texture_0", format: SourceTextureType.RGB},
                      {name: "texture_1", format: SourceTextureType.RGB},
                      {name: "texture_2", format: SourceTextureType.RGB},
                      {name: "texture_3", format: SourceTextureType.RGBA},
                      {name: "texture_4", format: SourceTextureType.RGBA},
                      {name: "texture_5", format: SourceTextureType.RGBA},
                      {name: "texture_6", format: SourceTextureType.RGBA},
                      {name: "texture_7", format: SourceTextureType.RGBA},
                    |]
        )
      );
    });

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
  });