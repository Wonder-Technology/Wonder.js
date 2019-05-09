open Wonder_jest;

open Js.Promise;

open WonderBsMost;

open Js.Typed_array;

let _ =
  describe("load wab", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());

      PrepareABTool.prepare(sandbox^);
      GenerateAllABTool.Manifest.prepareDigest(sandbox^);
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("loadWABAndSetToState", () => {
      let _buildFakeFetchArrayBufferResponse = arrayBuffer =>
        {"ok": true, "arrayBuffer": () => arrayBuffer |> Js.Promise.resolve}
        |> Js.Promise.resolve;

      let _buildFakeFetch = (~sandbox, ~arrayBuffer1) => {
        let fetch = createEmptyStubWithJsObjSandbox(sandbox);
        fetch
        |> onCall(0)
        |> returns(_buildFakeFetchArrayBufferResponse(arrayBuffer1));
        /* |> onCall(1)
           |> returns(_buildFakeFetchArrayBufferResponse(arrayBuffer2)); */

        fetch;
      };

      testPromise("if wab is loaded, not load", () => {
        let wab1RelativePath = ImportABTool.WAB.getWABRelativePath();

        let wab = ImportABTool.WAB.buildWAB();

        let state = StateAPI.unsafeGetState();

        let state =
          state
          |> OperateWABAssetBundleMainService.setLoadedWAB(
               wab1RelativePath,
               wab,
             )
          |> OperateWABAssetBundleMainService.markLoaded(wab1RelativePath);

        state |> StateAPI.setState |> ignore;

        let fetch = _buildFakeFetch(~sandbox, ~arrayBuffer1=wab);

        ImportABTool.WAB.loadWABAndSetToState(
          ~wabRelativePath=wab1RelativePath,
          ~fetchFunc=fetch,
          (),
        )
        |> MostTool.testStream(_ =>
             fetch |> expect |> not_ |> toCalled |> resolve
           );
      });

      describe("else", () => {
        testPromise("mark wab loaded", () => {
          let wab1RelativePath = ImportABTool.WAB.getWABRelativePath();

          let state = StateAPI.unsafeGetState();

          let state =
            state
            |> OperateWABAssetBundleMainService.markNotLoaded(
                 wab1RelativePath,
               );

          state |> StateAPI.setState |> ignore;

          let fetch =
            _buildFakeFetch(
              ~sandbox,
              ~arrayBuffer1=ImportABTool.WAB.buildWAB(),
            );
          ImportABTool.WAB.loadWABAndSetToState(
            ~wabRelativePath=wab1RelativePath,
            ~fetchFunc=fetch,
            (),
          )
          |> MostTool.testStream(_ => {
               let state = StateAPI.unsafeGetState();

               state
               |> OperateWABAssetBundleMainService.isLoaded(wab1RelativePath)
               |> expect == true
               |> resolve;
             });
        });
        testPromise("set loaded sab to state", () => {
          let wab1RelativePath = ImportABTool.WAB.getWABRelativePath();

          let state = StateAPI.unsafeGetState();

          let state =
            state
            |> OperateWABAssetBundleMainService.markNotLoaded(
                 wab1RelativePath,
               );

          state |> StateAPI.setState |> ignore;

          let wab = ImportABTool.WAB.buildWAB();

          let fetch = _buildFakeFetch(~sandbox, ~arrayBuffer1=wab);
          ImportABTool.WAB.loadWABAndSetToState(
            ~wabRelativePath=wab1RelativePath,
            ~fetchFunc=fetch,
            (),
          )
          |> MostTool.testStream(_ => {
               let state = StateAPI.unsafeGetState();

               state
               |> OperateWABAssetBundleMainService.unsafeGetLoadedWAB(
                    wab1RelativePath,
                  )
               |> expect == wab
               |> resolve;
             });
        });
      });
    });
  });