open Wonder_jest;

open Js.Promise;

let _ =
  describe("assemble wd from glb", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state :=
        TestTool.init(
          ~sandbox,
          ~buffer=
            SettingTool.buildBufferConfigStr(
              ~customGeometryPointCount=10000,
              ~customGeometryCount=10,
              (),
            ),
          (),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test lightMaterials", () =>
      describe("test diffuseMaps", () => {
        describe("test set texture name", () =>
          testPromise("test", () =>
            AssembleWDSystemTool.testGlb(
              sandbox^,
              ConvertGLBTool.buildGLBFilePath("BoxTextured.glb"),
              ((state, sceneGameObject)) =>
                AssembleWDSystemTool.getAllDiffuseMaps(sceneGameObject, state)
                |> Js.Array.map(diffuseMap =>
                     BasicSourceTextureAPI.unsafeGetBasicSourceTextureName(
                       diffuseMap,
                       state,
                     )
                   )
                |> expect == [|"CesiumLogoFlat.png"|],
              state^,
            )
          )
        );

        testPromise("set not flipY", () =>
          AssembleWDSystemTool.testGlb(
            sandbox^,
            ConvertGLBTool.buildGLBFilePath("BoxTextured.glb"),
            ((state, sceneGameObject)) =>
              AssembleWDSystemTool.getAllDiffuseMaps(sceneGameObject, state)
              |> Js.Array.map(diffuseMap =>
                   BasicSourceTextureAPI.getBasicSourceTextureFlipY(
                     diffuseMap,
                     state,
                   )
                 )
              |> Obj.magic
              |> expect == [|false|],
            state^,
          )
        );

        testPromise("test set other data", () =>
          AssembleWDSystemTool.testGlb(
            sandbox^,
            ConvertGLBTool.buildGLBFilePath("BoxTextured.glb"),
            ((state, sceneGameObject)) =>
              AssembleWDSystemTool.getAllDiffuseMaps(sceneGameObject, state)
              |> Js.Array.map(diffuseMap =>
                   (
                     BasicSourceTextureAPI.getBasicSourceTextureMagFilter(
                       diffuseMap,
                       state,
                     ),
                     BasicSourceTextureAPI.getBasicSourceTextureMinFilter(
                       diffuseMap,
                       state,
                     ),
                     BasicSourceTextureAPI.getBasicSourceTextureWrapS(
                       diffuseMap,
                       state,
                     ),
                     BasicSourceTextureAPI.getBasicSourceTextureWrapT(
                       diffuseMap,
                       state,
                     ),
                   )
                 )
              |> Obj.magic
              |>
              expect == [|
                          (
                            SourceTextureType.LINEAR,
                            SourceTextureType.NEAREST_MIPMAP_LINEAR,
                            SourceTextureType.REPEAT,
                            SourceTextureType.REPEAT,
                          ),
                        |],
            state^,
          )
        );

        testPromise("test set source", () =>
          AssembleWDSystemTool.testGlb(
            sandbox^,
            ConvertGLBTool.buildGLBFilePath("BoxTextured.glb"),
            ((state, sceneGameObject)) =>
              AssembleWDSystemTool.getAllDiffuseMaps(sceneGameObject, state)
              |> Js.Array.map(diffuseMap =>
                   BasicSourceTextureAPI.unsafeGetBasicSourceTextureSource(
                     diffuseMap,
                     state,
                   )
                 )
              |> expect == [|"object_url0" |> Obj.magic|],
            state^,
          )
        );

        describe("test set format", () => {
          testPromise("png source should set RGBA format", () =>
            AssembleWDSystemTool.testGlb(
              sandbox^,
              ConvertGLBTool.buildGLBFilePath("BoxTextured.glb"),
              ((state, sceneGameObject)) =>
                AssembleWDSystemTool.getAllDiffuseMaps(sceneGameObject, state)
                |> Js.Array.map(diffuseMap =>
                     BasicSourceTextureAPI.getBasicSourceTextureFormat(
                       diffuseMap,
                       state,
                     )
                   )
                |> expect == [|SourceTextureType.RGBA|],
              state^,
            )
          );

          testPromise("jpeg source should set RGB format", () =>
            AssembleWDSystemTool.testGlb(
              sandbox^,
              ConvertGLBTool.buildGLBFilePath("AlphaBlendModeTest.glb"),
              ((state, sceneGameObject)) =>
                AssembleWDSystemTool.getAllDiffuseMaps(sceneGameObject, state)
                |> Js.Array.map(diffuseMap =>
                     BasicSourceTextureAPI.getBasicSourceTextureFormat(
                       diffuseMap,
                       state,
                     )
                   )
                |>
                expect == [|
                            SourceTextureType.RGB,
                            SourceTextureType.RGBA,
                            SourceTextureType.RGBA,
                            SourceTextureType.RGBA,
                            SourceTextureType.RGBA,
                            SourceTextureType.RGBA,
                            SourceTextureType.RGBA,
                            SourceTextureType.RGBA,
                            SourceTextureType.RGBA,
                          |],
              state^,
            )
          );
        });
      })
    );
  });