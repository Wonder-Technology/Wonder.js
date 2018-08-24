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
      GLBTool.prepare(sandbox^) |> ignore;
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
      |> then_(((state, _, gameObject)) =>
           AssembleWDBSystemTool.getAllGameObjects(gameObject, state)
           |> expect == [|gameObject|]
           |> resolve
         );
    });

    describe("test load multi wdb files", () => {
      let _buildFakeFetch = (sandbox, gltfJsonStr1, gltfJsonStr2, binBuffer) => {
        let fetch = createEmptyStubWithJsObjSandbox(sandbox);
        fetch
        |> onCall(0)
        |> returns(
             _buildFakeFetchArrayBufferResponse(
               ConvertGLBSystem.convertGLBData((
                 gltfJsonStr1 |> Js.Json.parseExn,
                 binBuffer,
               ))
               |> Obj.magic,
             ),
           )
        |> onCall(1)
        |> returns(
             _buildFakeFetchArrayBufferResponse(
               ConvertGLBSystem.convertGLBData((
                 gltfJsonStr2 |> Js.Json.parseExn,
                 binBuffer,
               ))
               |> Obj.magic,
             ),
           );
        fetch;
      };

      testPromise("test", () => {
        let fetchFunc =
          _buildFakeFetch(
            sandbox,
            ConvertGLBTool.buildGLTFJsonOfSingleNode(),
            ConvertGLBTool.buildGLTFJsonOfSingleNode(),
            GLBTool.buildBinBuffer(),
          );

        LoadWDBTool.load(~wdbPath="../singleNode.wdb", ~fetchFunc, ())
        |> then_(((state, _, gameObject1)) => {
             MainStateTool.setState(state) |> ignore;

             LoadWDBTool.load(~wdbPath="../singleNode.wdb", ~fetchFunc, ())
             |> then_(((state, _, gameObject2)) =>
                  (
                    AssembleWDBSystemTool.getAllGameObjects(
                      gameObject1,
                      state,
                    ),
                    AssembleWDBSystemTool.getAllGameObjects(
                      gameObject2,
                      state,
                    ),
                  )
                  |> expect == ([|gameObject1|], [|gameObject2|])
                  |> resolve
                );
           });
      });
    });
  });