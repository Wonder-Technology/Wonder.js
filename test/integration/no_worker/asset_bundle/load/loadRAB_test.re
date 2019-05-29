open Wonder_jest;

open Js.Promise;

open WonderBsMost;

open Js.Typed_array;

let _ =
  describe("load rab", () => {
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

    describe("loadAllDependencyRABAndSetToState", () => {
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

      testPromise("if dependency rab is loaded, not load", () => {
        let (rab1RelativePath, rab2RelativePath, rab3RelativePath) =
          ImportABTool.RAB.getRabRelativePaths();

        GenerateAllABTool.TestWithTwoRAB.generateTwoRABs(state^)
        |> then_(((rab1, rab2)) => {
             let state = StateAPI.unsafeGetState();

             let state =
               state
               |> OperateRABAssetBundleMainService.markLoaded(
                    rab1RelativePath,
                  )
               |> OperateRABAssetBundleMainService.markLoaded(
                    rab2RelativePath,
                  );

             state |> StateAPI.setState |> ignore;

             let fetch =
               _buildFakeFetch(
                 ~sandbox,
                 ~arrayBuffer1=rab1,
                 ~arrayBuffer2=rab2,
               );

             ImportABTool.RAB.loadAllDependencyRABAndSetToState(
               ~abRelativePath=rab3RelativePath,
               ~isAssetBundleArrayBufferCachedFunc=
                 (. _, _) =>
                   Js.Promise.make((~resolve, ~reject) => resolve(. false)),
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
          let (rab1RelativePath, rab2RelativePath, rab3RelativePath) =
            ImportABTool.RAB.getRabRelativePaths();

          GenerateAllABTool.TestWithTwoRAB.generateTwoRABs(state^)
          |> then_(((rab1, rab2)) => {
               let fetch =
                 _buildFakeFetch(
                   ~sandbox,
                   ~arrayBuffer1=rab1,
                   ~arrayBuffer2=rab2,
                 );

               ImportABTool.RAB.loadAllDependencyRABAndSetToState(
                 ~abRelativePath=rab3RelativePath,
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
            let (rab1RelativePath, rab2RelativePath, rab3RelativePath) =
              ImportABTool.RAB.getRabRelativePaths();

            GenerateAllABTool.TestWithTwoRAB.generateTwoRABs(state^)
            |> then_(((rab1, rab2)) => {
                 let fetch =
                   _buildFakeFetch(
                     ~sandbox,
                     ~arrayBuffer1=rab1,
                     ~arrayBuffer2=rab2,
                   );

                 ImportABTool.RAB.loadAllDependencyRABAndSetToState(
                   ~abRelativePath=rab3RelativePath,
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
                        |> SinonTool.calledWith(_, rab2RelativePath),
                      )
                      |> expect == (1, true)
                      |> resolve
                    );
               });
          });
          testPromise("cache dependency rab", () => {
            let (rab1RelativePath, rab2RelativePath, rab3RelativePath) =
              ImportABTool.RAB.getRabRelativePaths();

            let cachedABRelativePathRef = ref("");
            let cachedABHashIdRef = ref("");

            GenerateAllABTool.TestWithTwoRAB.generateTwoRABs(state^)
            |> then_(((rab1, rab2)) => {
                 let fetch =
                   _buildFakeFetch(
                     ~sandbox,
                     ~arrayBuffer1=rab1,
                     ~arrayBuffer2=rab2,
                   );

                 ImportABTool.RAB.loadAllDependencyRABAndSetToState(
                   ~abRelativePath=rab3RelativePath,
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
                   ~cacheAssetBundleArrayBufferFunc=
                     (. abRelativePath, ab, hashId) => {
                       cachedABRelativePathRef := abRelativePath;

                       cachedABHashIdRef := hashId;

                       Js.Promise.make((~resolve, ~reject) =>
                         (PromiseType.convertResolveToUnit(resolve))(.)
                       );
                     },
                   ~fetchFunc=fetch,
                   (),
                 )
                 |> MostTool.testStream(() =>
                      (cachedABRelativePathRef^, cachedABHashIdRef^)
                      |> expect
                      == (rab2RelativePath, ImportABTool.RAB.getHashId2())
                      |> resolve
                    );
               });
          });
        });
      });
    });

    describe("assembleAllDependencyRAB", () =>
      testPromise("assemble all dependency rabs by concat", () => {
        let (rab1RelativePath, rab2RelativePath, rab3RelativePath) =
          ImportABTool.RAB.getRabRelativePaths();

        GenerateAllABTool.TestWithTwoRAB.generateTwoRABs(state^)
        |> then_(((rab1, rab2)) => {
             let state = StateAPI.unsafeGetState();

             state
             |> OperateRABAssetBundleMainService.setLoadedRAB(
                  rab1RelativePath,
                  rab1,
                )
             |> OperateRABAssetBundleMainService.setLoadedRAB(
                  rab2RelativePath,
                  rab2,
                )
             |> StateAPI.setState
             |> ignore;

             ImportABTool.RAB.assembleAllDependencyRAB(
               ~abRelativePath=rab3RelativePath,
               ~wholeDependencyRelationMap=
                 ImportABTool.RAB.buildWholeDependencyRelationMap((
                   rab1RelativePath,
                   rab2RelativePath,
                   rab3RelativePath,
                 )),
               (),
             )
             |> MostTool.testStream(() => {
                  let state = StateAPI.unsafeGetState();

                  (
                    OperateRABAssetBundleMainService.isAssembled(
                      rab1RelativePath,
                      state,
                    ),
                    OperateRABAssetBundleMainService.isAssembled(
                      rab2RelativePath,
                      state,
                    ),
                  )
                  |> expect == (true, true)
                  |> resolve;
                });
           });
      })
    );
  });