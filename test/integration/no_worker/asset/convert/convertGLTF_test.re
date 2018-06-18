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

    describe("get imageArr", () =>
      testPromise("get image arr", () =>
        _test(
          ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
          ((wdRecord, imageArr, bufferArr)) =>
          imageArr
          |> expect == [|ConvertGLTFTool.buildFakeImageOfSingleNode()|]
        )
      )
    );
    describe("get bufferArr", () =>
      testPromise("get arrayBuffer arr", () =>
        _test(
          ConvertGLTFTool.buildGLTFJsonOfSingleNode(),
          ((wdRecord, imageArr, bufferArr)) => {
            let arrayBuffer = bufferArr[0];
            (
              bufferArr |> Js.Array.length,
              Js.Typed_array.ArrayBuffer.byteLength(arrayBuffer),
            )
            |> expect == (1, 840);
          },
        )
      )
    );
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
        ConvertGLTFSystem.convert(gltfJson)
        |> Most.reduce(
             (arr, dataTuple) => arr |> ArrayService.push(dataTuple),
             [||],
           )
        |> then_(arr => testFunc(arr) |> resolve);
      };

      testPromise("should only exec convert once", () =>
        _test(_buildGLTFJsonOfMultiImages(), arr =>
          arr |> Js.Array.length |> expect == 1
        )
      );
    });
  });