open Wonder_jest;

open Js.Promise;

let _ =
  describe("load wdb", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    let _buildFakeFetchArrayBufferResponse = arrayBuffer =>
      {"arrayBuffer": () => arrayBuffer |> Js.Promise.resolve}
      |> Js.Promise.resolve;

    let _buildFakeFetch = (sandbox, gltfJsonStr, binBuffer) => {
      let fetch = createEmptyStubWithJsObjSandbox(sandbox);
      fetch
      |> onCall(0)
      |> returns(
           _buildFakeFetchArrayBufferResponse(
             ConvertGLBSystem.convertGLBData((
               gltfJsonStr |> Js.Json.parseExn,
               binBuffer,
             ))
             |> Obj.magic,
           ),
         );
      fetch;
    };

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());

      GLBTool.prepare(sandbox^);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    testPromise("load wdb and assemble", () => {
      let fetchFunc =
        _buildFakeFetch(
          sandbox,
          ConvertGLBTool.buildGLTFJsonOfSingleNode(),
          GLBTool.buildBinBuffer(),
        );

      LoadWDBTool.load(~wdbPath="../singleNode.wdb", ~fetchFunc, ())
      |> then_(((state, gameObject)) =>
           AssembleWDBSystemTool.getAllGameObjects(gameObject, state)
           |> expect == [|gameObject|]
           |> resolve
         );
    });
  });