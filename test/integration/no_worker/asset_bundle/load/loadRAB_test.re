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

    describe("loadAndAssembleAllDependencyRAB", () => {
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

      testPromise("init cache", () => {
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

             let valueRef = ref(0);

             ImportABTool.RAB.loadAndAssembleAllDependencyRAB(
               ~abRelativePath=rab3RelativePath,
               ~initAssetBundleArrayBufferCache=
                 (.) => {
                   valueRef := 2;

                   Most.empty();
                 },
               ~isAssetBundleArrayBufferCachedFunc=
                 (. _, _) => false |> Most.just,
               ~fetchFunc=fetch,
               (),
             )
             |> MostTool.testStream(() => valueRef^ |> expect == 2 |> resolve);
           });
      });

      testPromise("if dependency rab is assembled, not load", () => {
        let (rab1RelativePath, rab2RelativePath, rab3RelativePath) =
          ImportABTool.RAB.getRabRelativePaths();

        GenerateAllABTool.TestWithTwoRAB.generateTwoRABs(state^)
        |> then_(((rab1, rab2)) => {
             let state = StateAPI.unsafeGetState();

             let state =
               state
               |> OperateRABAssetBundleMainService.markAssembled(
                    rab1RelativePath,
                  )
               |> OperateRABAssetBundleMainService.markAssembled(
                    rab2RelativePath,
                  );

             state |> StateAPI.setState |> ignore;

             let fetch =
               _buildFakeFetch(
                 ~sandbox,
                 ~arrayBuffer1=rab1,
                 ~arrayBuffer2=rab2,
               );

             ImportABTool.RAB.loadAndAssembleAllDependencyRAB(
               ~abRelativePath=rab3RelativePath,
               ~isAssetBundleArrayBufferCachedFunc=
                 (. _, _) => false |> Most.just,
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

               ImportABTool.RAB.loadAndAssembleAllDependencyRAB(
                 ~abRelativePath=rab3RelativePath,
                 ~isAssetBundleArrayBufferCachedFunc=
                   (. _, _) => true |> Most.just,
                 ~getAssetBundleArrayBufferCacheFunc=
                   (. _) => rab1 |> Most.just,
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

                 ImportABTool.RAB.loadAndAssembleAllDependencyRAB(
                   ~abRelativePath=rab3RelativePath,
                   ~isAssetBundleArrayBufferCachedFunc=
                     (. abRelativePath, hashId) =>
                       (
                         JudgeTool.isEqual(abRelativePath, rab1RelativePath) ?
                           true : false
                       )
                       |> Most.just,
                   ~getAssetBundleArrayBufferCacheFunc=
                     (. _) => rab1 |> Most.just,
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

                 ImportABTool.RAB.loadAndAssembleAllDependencyRAB(
                   ~abRelativePath=rab3RelativePath,
                   ~isAssetBundleArrayBufferCachedFunc=
                     (. abRelativePath, hashId) =>
                       (
                         JudgeTool.isEqual(abRelativePath, rab1RelativePath) ?
                           true : false
                       )
                       |> Most.just,
                   ~getAssetBundleArrayBufferCacheFunc=
                     (. _) => rab1 |> Most.just,
                   ~cacheAssetBundleArrayBufferFunc=
                     (. abRelativePath, ab, hashId) => {
                       cachedABRelativePathRef := abRelativePath;

                       cachedABHashIdRef := hashId;

                       Most.empty();
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
          testPromise("assemble dependency rab", () => {
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

                 ImportABTool.RAB.loadAndAssembleAllDependencyRAB(
                   ~abRelativePath=rab3RelativePath,
                   ~isAssetBundleArrayBufferCachedFunc=
                     (. abRelativePath, hashId) => false |> Most.just,
                   ~fetchFunc=fetch,
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
          });
        });
      });
    });
  });