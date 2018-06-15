open Wonder_jest;
let _ =
  describe("GenerateWDSystem", () => {
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

    describe("generateEmbededGLTF", () =>
      describe("generate asset", () => {
        testPromise("test", () =>
          GenerateSceneGraphSystemTool.testGLTFResult(
            ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
            {|{"asset":{ "generator":"GLTF2WD", "version":"2.0"}}|},
            state,
          )
        );
      })
    );
  });