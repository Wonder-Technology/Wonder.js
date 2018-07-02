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

    describe("test BoxTextured glb", () => {
      test("test images", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          ConvertGLBTool.buildGLBFilePath("BoxTextured.glb"),
          (({images}, binBuffer)) => {
            let images = images |> OptionService.unsafeGet;

            images |> expect == [|{bufferView: 3, mimeType: "image/png"}|];
          },
        )
      );
      test("test bufferViews", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          ConvertGLBTool.buildGLBFilePath("BoxTextured.glb"),
          (({bufferViews}, binBuffer)) =>
          bufferViews
          |>
          expect == [|
                      {
                        buffer: 0,
                        byteOffset: 768,
                        byteLength: 72,
                        byteStride: None,
                      },
                      {
                        buffer: 0,
                        byteOffset: 0,
                        byteLength: 576,
                        byteStride: Some(12),
                      },
                      {
                        buffer: 0,
                        byteOffset: 576,
                        byteLength: 192,
                        byteStride: Some(8),
                      },
                      {
                        buffer: 0,
                        byteOffset: 840,
                        byteLength: 23516,
                        byteStride: None,
                      },
                    |]
        )
      );
      test("test buffers", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          ConvertGLBTool.buildGLBFilePath("BoxTextured.glb"),
          (({buffers}, binBuffer)) =>
          buffers |> expect == [|24360|]
        )
      );
    });

    describe("test AlphaBlendModeTest glb", () => {
      test("test images", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          ConvertGLBTool.buildGLBFilePath("AlphaBlendModeTest.glb"),
          (({images}, binBuffer)) => {
            let images = images |> OptionService.unsafeGet;

            images
            |>
            expect == [|
                        {bufferView: 45, mimeType: "image/jpeg"},
                        {bufferView: 46, mimeType: "image/jpeg"},
                        {bufferView: 47, mimeType: "image/jpeg"},
                        {bufferView: 48, mimeType: "image/png"},
                      |];
          },
        )
      );
      test("test bufferViews", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          ConvertGLBTool.buildGLBFilePath("AlphaBlendModeTest.glb"),
          (({bufferViews}, binBuffer)) =>
          (
            bufferViews |> Js.Array.length,
            bufferViews[45],
            bufferViews[46],
            bufferViews[47],
            bufferViews[48],
          )
          |>
          expect == (
                      49,
                      {
                        buffer: 0,
                        byteOffset: 6776,
                        byteLength: 1216267,
                        byteStride: None,
                      },
                      {
                        buffer: 0,
                        byteOffset: 1223044,
                        byteLength: 1013673,
                        byteStride: None,
                      },
                      {
                        buffer: 0,
                        byteOffset: 2236720,
                        byteLength: 702714,
                        byteStride: None,
                      },
                      {
                        buffer: 0,
                        byteOffset: 2939436,
                        byteLength: 65522,
                        byteStride: None,
                      },
                    )
        )
      );
      test("test buffers", () =>
        ConvertGLBTool.testResult(
          sandbox^,
          ConvertGLBTool.buildGLBFilePath("AlphaBlendModeTest.glb"),
          (({buffers}, binBuffer)) =>
          buffers |> expect == [|3004960|]
        )
      );
    });
    /* describe("test uriImages", () =>
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
       ); */
  });