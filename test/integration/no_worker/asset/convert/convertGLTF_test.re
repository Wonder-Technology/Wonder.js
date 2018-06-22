open Wonder_jest;

open Js.Promise;

let _ =
  describe("convert gltf", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    let _buildFakeLoadImage = ConvertGLTFTool.buildFakeLoadImage;

    let _test = (gltfJson, testFunc) =>
      ConvertGLTFTool.testResult(gltfJson, testFunc);

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("fix bug", () => {
      let _buildGLTFJsonOfMultiImages = () =>
        ConvertGLTFTool.buildGLTFJson(
          ~images=
            {|  [
        {
            "uri":"|}
            ++ ConvertGLTFTool.buildFakeImageOfSingleNode()
            ++ {|"
            },
        {
            "uri":"|}
            ++ ConvertGLTFTool.buildFakeImageOfCesiumMilkTruck()
            ++ {|"
            }
            ]|},
          (),
        );
      let _test = (gltfJson, testFunc) => {
        _buildFakeLoadImage();
        [||]
        |> ArrayService.push(ConvertGLTFSystem.convert(gltfJson))
        |> testFunc;
      };

      test("should only exec convert once", () =>
        _test(_buildGLTFJsonOfMultiImages(), arr =>
          arr |> Js.Array.length |> expect == 1
        )
      );
    });
  });