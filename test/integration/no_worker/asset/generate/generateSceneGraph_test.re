open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("generateSceneGraph", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeAllPromise(() => ConvertTool.buildFakeLoadImage());
    beforeEach(() => {
      sandbox := createSandbox();

      state :=
        TestTool.initWithoutBuildFakeDom(
          ~sandbox,
          ~buffer=
            SettingTool.buildBufferConfigStr(
              ~geometryPointCount=50000,
              ~geometryCount=10,
              (),
            ),
          (),
        );

      ConvertTool.setFakeTransformCount();
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("generate asset", () =>
      testPromise("test", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLB(
          sandbox^,
          GLBTool.buildGLBFilePath("BoxTextured.glb"),
          ((gltf, binBuffer)) =>
            gltf
            |> GenerateSceneGraphSystemTool.contain(
                 {|"asset":{"version":"2.0", "generator":"GLTF2WD"}|},
               ),
          state,
        );
      })
    );

    describe("generate scene", () =>
      testPromise("test", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLB(
          sandbox^,
          GLBTool.buildGLBFilePath("BoxTextured.glb"),
          ((gltf, binBuffer)) =>
            gltf
            |> GenerateSceneGraphSystemTool.contain(
                 {|
                  "scenes":[{"extensions":{"KHR_lights":{"light":0}},"nodes":[0],"extras":{}}]
                  |},
               ),
          state,
        );
      })
    );
  });