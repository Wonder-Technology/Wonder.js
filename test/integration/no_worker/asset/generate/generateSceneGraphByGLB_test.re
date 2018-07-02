open Wonder_jest;

open Js.Typed_array;

open GLTFType;

let _ =
  describe("generateSceneGraph by glb", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeEach(() => {
      sandbox := createSandbox();

      state :=
        TestTool.initWithoutBuildFakeDom(
          ~sandbox,
          ~buffer=
            SettingTool.buildBufferConfigStr(
              ~customGeometryPointCount=50000,
              ~customGeometryCount=10,
              (),
            ),
          (),
        );
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("test BoxTextured glb", () => {
      testPromise("test nodes", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLB(
          sandbox^,
          ConvertGLBTool.buildGLBFilePath("BoxTextured.glb"),
          ((gltf, binBuffer)) =>
            gltf
            |> GenerateSceneGraphSystemTool.contain(
                 {|
  "nodes":[{"name":"gameObject_0","children":[1],"rotation":[-0.7071067690849304,0,0,0.7071067690849304]},{"name":"Mesh","mesh":0,"extras":{"material":0}}]
  |},
               ),
          state,
        );
      });

      testPromise("test images", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLB(
          sandbox^,
          ConvertGLBTool.buildGLBFilePath("BoxTextured.glb"),
          ((gltf, binBuffer)) =>
            gltf
            |> GenerateSceneGraphSystemTool.contain(
                 {|
  "images":[{"bufferView":4,"mimeType":"image/png"}]
  |},
               ),
          state,
        );
      });

      testPromise("test bufferViews", () => {
        let _ = GenerateSceneGraphSystemTool.prepareCanvas(sandbox);

        GenerateSceneGraphSystemTool.testGLTFResultByGLB(
          sandbox^,
          ConvertGLBTool.buildGLBFilePath("BoxTextured.glb"),
          ((gltf, binBuffer)) =>
            gltf
            |> GenerateSceneGraphSystemTool.contain(
                 {|
  "bufferViews":[{"buffer":0,"byteOffset":0,"byteLength":288},{"buffer":0,"byteOffset":288,"byteLength":288},{"buffer":0,"byteOffset":576,"byteLength":192},{"buffer":0,"byteOffset":768,"byteLength":72},
  {"buffer":0,"byteOffset":840,"byteLength":4}]
  |},
               ),
          state,
        );
      });

      /* TODO test image data */
      /* TODO test buffer data */
    });
  });