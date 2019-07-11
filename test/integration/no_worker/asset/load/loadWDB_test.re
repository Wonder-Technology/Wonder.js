open Wonder_jest;

open Js.Promise;

let _ =
  describe("load wdb", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    let _buildFakeFetchArrayBufferResponse =
        (sandbox, contentLength, arrayBuffer) =>
      {
        "headers": {
          "get":
            Sinon.createEmptyStubWithJsObjSandbox(sandbox)
            |> Sinon.withOneArg("content-length")
            |> Sinon.returns(contentLength),
        },
        "arrayBuffer": () => arrayBuffer |> Js.Promise.resolve,
      }
      |> Js.Promise.resolve;

    let _buildFakeFetch = (sandbox, contentLength, gltfJsonStr, binBuffer) => {
      let fetch = createEmptyStubWithJsObjSandbox(sandbox);
      fetch
      |> onCall(0)
      |> returns(
           _buildFakeFetchArrayBufferResponse(
             sandbox,
             contentLength,
             ConvertGLBSystem.convertGLBData(
               gltfJsonStr |> Js.Json.parseExn,
               binBuffer,
             )
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
          0,
          ConvertGLBTool.buildGLTFJsonOfSingleNode(),
          GLBTool.buildBinBuffer(),
        );

      LoadWDBTool.load(~wdbPath="../singleNode.wdb", ~fetchFunc, ())
      |> then_(((state, _, (gameObject, _))) =>
           AssembleWDBSystemTool.getAllGameObjects(gameObject, state)
           |> expect == [|gameObject|]
           |> resolve
         );
    });

    describe("test load multi wdb files", () => {
      let _buildFakeFetch =
          (
            sandbox,
            contentLength1,
            contentLength2,
            gltfJsonStr1,
            gltfJsonStr2,
            binBuffer,
          ) => {
        let fetch = createEmptyStubWithJsObjSandbox(sandbox);
        fetch
        |> onCall(0)
        |> returns(
             _buildFakeFetchArrayBufferResponse(
               sandbox,
               contentLength1,
               ConvertGLBSystem.convertGLBData(
                 gltfJsonStr1 |> Js.Json.parseExn,
                 binBuffer,
               )
               |> Obj.magic,
             ),
           )
        |> onCall(1)
        |> returns(
             _buildFakeFetchArrayBufferResponse(
               sandbox,
               contentLength2,
               ConvertGLBSystem.convertGLBData(
                 gltfJsonStr2 |> Js.Json.parseExn,
                 binBuffer,
               )
               |> Obj.magic,
             ),
           );
        fetch;
      };

      testPromise("test load", () => {
        let fetchFunc =
          _buildFakeFetch(
            sandbox,
            0,
            0,
            ConvertGLBTool.buildGLTFJsonOfSingleNode(),
            ConvertGLBTool.buildGLTFJsonOfSingleNode(),
            GLBTool.buildBinBuffer(),
          );

        LoadWDBTool.load(~wdbPath="../singleNode.wdb", ~fetchFunc, ())
        |> then_(((state, _, (gameObject1, _))) => {
             MainStateTool.setState(state) |> ignore;

             LoadWDBTool.load(~wdbPath="../singleNode.wdb", ~fetchFunc, ())
             |> then_(((state, _, (gameObject2, _))) =>
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
      testPromise("test trigger handleWhenLoadingFunc", () => {
        let contentLengthArr = [||];
        let wdbPathArr = [||];
        let contentLength1 = 1;
        let contentLength2 = 2;
        let wdbPath1 = "../singleNode1.wdb";
        let wdbPath2 = "../singleNode2.wdb";
        let fetchFunc =
          _buildFakeFetch(
            sandbox,
            contentLength1,
            contentLength2,
            ConvertGLBTool.buildGLTFJsonOfSingleNode(),
            ConvertGLBTool.buildGLTFJsonOfSingleNode(),
            GLBTool.buildBinBuffer(),
          );
        let handleWhenLoadingFunc = (contentLength, wdbPath) => {
          contentLengthArr |> ArrayService.push(contentLength) |> ignore;
          wdbPathArr |> ArrayService.push(wdbPath) |> ignore;
        };

        LoadWDBTool.load(
          ~wdbPath=wdbPath1,
          ~fetchFunc,
          ~handleWhenLoadingFunc,
          (),
        )
        |> then_(((state, _, (gameObject1, _))) => {
             MainStateTool.setState(state) |> ignore;

             LoadWDBTool.load(
               ~wdbPath=wdbPath2,
               ~fetchFunc,
               ~handleWhenLoadingFunc,
               (),
             )
             |> then_(((state, _, (gameObject2, _))) =>
                  (
                    contentLengthArr,
                    wdbPathArr,
                    AssembleWDBSystemTool.getAllGameObjects(
                      gameObject1,
                      state,
                    ),
                    AssembleWDBSystemTool.getAllGameObjects(
                      gameObject2,
                      state,
                    ),
                  )
                  |> expect
                  == (
                       [|contentLength1, contentLength2|],
                       [|wdbPath1, wdbPath2|],
                       [|gameObject1|],
                       [|gameObject2|],
                     )
                  |> resolve
                );
           });
      });
    });
  });