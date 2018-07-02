/* open Wonder_jest;

open Js.Promise;

let _ =
  describe("load wdb", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    let _buildFakeFetchJsonResponse = json =>
      {"json": () => json |> Js.Promise.resolve} |> Js.Promise.resolve;

    let _buildFakeFetch = (sandbox, gltfJson) => {
      let fetch = createEmptyStubWithJsObjSandbox(sandbox);
      fetch
      |> onCall(0)
      |> returns(
           _buildFakeFetchJsonResponse(
             ConvertGLTFSystem.convert(gltfJson) |> Obj.magic,
           ),
         );
      fetch;
    };

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());

      ConvertTool.buildFakeLoadImage();
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    testPromise("load wd file and assemble", () => {
      let fetchFunc =
        _buildFakeFetch(sandbox, ConvertGLTFTool.buildGLTFJsonOfSingleNode());

      LoadWDBTool.load(~wdPath="../singleNode.wd", ~fetchFunc, ())
      |> then_(((state, gameObject)) =>
           AssembleWDBSystemTool.getAllGameObjects(gameObject, state)
           |> expect == [|gameObject|]
           |> resolve
         );
    });
  }); */