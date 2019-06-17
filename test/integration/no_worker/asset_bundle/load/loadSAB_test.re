open Wonder_jest;

open Js.Promise;

open WonderBsMost;

open Js.Typed_array;

let _ =
  describe("load sab", () => {
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

    describe("loadSABAndSetToState", () => {
      let _buildFakeFetchArrayBufferResponse = arrayBuffer =>
        {"ok": true, "arrayBuffer": () => arrayBuffer |> Js.Promise.resolve}
        |> Js.Promise.resolve;

      let _buildFakeFetch = (~sandbox, ~arrayBuffer1, ~arrayBuffer2) => {
        let fetch = createEmptyStubWithJsObjSandbox(sandbox);
        fetch
        |> onCall(0)
        |> returns(_buildFakeFetchArrayBufferResponse(arrayBuffer1))
        |> onCall(1)
        |> returns(_buildFakeFetchArrayBufferResponse(arrayBuffer2));

        fetch;
      };

      testPromise("if sab is loaded, not load", () => {
        let (rab1RelativePath, rab2RelativePath, sab1RelativePath) =
          ImportABTool.SAB.getABRelativePaths();

        GenerateAllABTool.TestWithTwoRAB.generateTwoRABs(state^)
        |> then_(((rab1, rab2)) => {
             let state = StateAPI.unsafeGetState();

             let state =
               state
               |> OperateSABAssetBundleMainService.markLoaded(
                    sab1RelativePath,
                  );

             state |> StateAPI.setState |> ignore;

             let fetch =
               _buildFakeFetch(
                 ~sandbox,
                 ~arrayBuffer1=rab1,
                 ~arrayBuffer2=rab2,
               );

             ImportABTool.SAB.loadSABAndSetToState(
               ~sabRelativePath=sab1RelativePath,
               /* ~isAssetBundleArrayBufferCachedFunc=(_, _) => false, */
               ~fetchFunc=fetch,
               (),
             )
             |> MostTool.testStream(() =>
                  fetch |> expect |> not_ |> toCalled |> resolve
                );
           });
      });

      describe("else", () => {
        testPromise("if dependency rab is cached, not load it", () => {
          let (rab1RelativePath, rab2RelativePath, sab1RelativePath) =
            ImportABTool.SAB.getABRelativePaths();

          GenerateAllABTool.TestWithTwoRAB.generateTwoRABs(state^)
          |> then_(((rab1, rab2)) => {
               let fetch =
                 _buildFakeFetch(
                   ~sandbox,
                   ~arrayBuffer1=rab1,
                   ~arrayBuffer2=rab2,
                 );

               ImportABTool.SAB.loadSABAndSetToState(
                 ~sabRelativePath=sab1RelativePath,
                 ~isAssetBundleArrayBufferCachedFunc=
                   (. _, _) =>
                     Js.Promise.make((~resolve, ~reject) => resolve(. true)),
                 ~getAssetBundleArrayBufferCacheFunc=
                   (. _) =>
                     Js.Promise.make((~resolve, ~reject) => resolve(. rab1)),
                 ~fetchFunc=fetch,
                 (),
               )
               |> MostTool.testStream(() =>
                    fetch |> expect |> not_ |> toCalled |> resolve
                  );
             });
        });

        describe("else", () => {
          testPromise("load dependency rab", () => {
            let (rab1RelativePath, rab2RelativePath, sab1RelativePath) =
              ImportABTool.SAB.getABRelativePaths();

            GenerateAllABTool.TestWithTwoRAB.generateTwoRABs(state^)
            |> then_(((rab1, rab2)) => {
                 let fetch =
                   _buildFakeFetch(
                     ~sandbox,
                     ~arrayBuffer1=rab1,
                     ~arrayBuffer2=rab2,
                   );

                 ImportABTool.SAB.loadSABAndSetToState(
                   ~sabRelativePath=sab1RelativePath,
                   ~isAssetBundleArrayBufferCachedFunc=
                     (. abRelativePath, hashId) =>
                       Js.Promise.make((~resolve, ~reject) =>
                         resolve(.
                           JudgeTool.isEqual(abRelativePath, rab1RelativePath) ?
                             true : false,
                         )
                       ),
                   ~getAssetBundleArrayBufferCacheFunc=
                     (. _) =>
                       Js.Promise.make((~resolve, ~reject) =>
                         resolve(. rab1)
                       ),
                   ~fetchFunc=fetch,
                   (),
                 )
                 |> MostTool.testStream(() =>
                      (
                        fetch |> getCallCount,
                        fetch
                        |> getCall(0)
                        |> SinonTool.calledWith(_, sab1RelativePath),
                      )
                      |> expect == (1, true)
                      |> resolve
                    );
               });
          });
          testPromise("mark sab loaded", () => {
            let (rab1RelativePath, rab2RelativePath, sab1RelativePath) =
              ImportABTool.SAB.getABRelativePaths();

            GenerateAllABTool.TestWithTwoRAB.generateTwoRABs(state^)
            |> then_(((rab1, rab2)) => {
                 let fetch =
                   _buildFakeFetch(
                     ~sandbox,
                     ~arrayBuffer1=rab1,
                     ~arrayBuffer2=rab2,
                   );

                 ImportABTool.SAB.loadSABAndSetToState(
                   ~sabRelativePath=sab1RelativePath,
                   ~isAssetBundleArrayBufferCachedFunc=
                     (. abRelativePath, hashId) =>
                       Js.Promise.make((~resolve, ~reject) =>
                         resolve(. false)
                       ),
                   ~fetchFunc=fetch,
                   (),
                 )
                 |> MostTool.testStream(() => {
                      let state = StateAPI.unsafeGetState();

                      OperateSABAssetBundleMainService.isLoaded(
                        sab1RelativePath,
                        state,
                      )
                      |> expect == true
                      |> resolve;
                    });
               });
          });
          testPromise("set loaded sab to state", () => {
            let (rab1RelativePath, rab2RelativePath, sab1RelativePath) =
              ImportABTool.SAB.getABRelativePaths();

            GenerateAllABTool.TestWithTwoRAB.generateTwoRABs(state^)
            |> then_(((rab1, rab2)) => {
                 let sab1 = Obj.magic(-100);
                 let fetch =
                   _buildFakeFetch(
                     ~sandbox,
                     ~arrayBuffer1=sab1,
                     ~arrayBuffer2=rab2,
                   );

                 ImportABTool.SAB.loadSABAndSetToState(
                   ~sabRelativePath=sab1RelativePath,
                   ~isAssetBundleArrayBufferCachedFunc=
                     (. abRelativePath, hashId) =>
                       Js.Promise.make((~resolve, ~reject) =>
                         resolve(. false)
                       ),
                   ~fetchFunc=fetch,
                   (),
                 )
                 |> MostTool.testStream(() => {
                      let state = StateAPI.unsafeGetState();

                      OperateSABAssetBundleMainService.getLoadedSAB(
                        sab1RelativePath,
                        state,
                      )
                      |> expect == sab1
                      |> resolve;
                    });
               });
          });
        });
      });
    });
  });