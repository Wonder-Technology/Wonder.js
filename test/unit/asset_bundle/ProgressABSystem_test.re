open Wonder_jest;

let _ =
  describe("ProgressABSystem test", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("module RAB", () => {
      let _prepare = (~state, ~abRelativePath="a.sab", ()) => {
        let rab1RelativePath = "rab1.rab";
        let rab2RelativePath = "rab2.rab";
        let rab3RelativePath = "rab3.rab";

        let wholeDependencyRelationMap =
          GenerateAllABTool.buildDependencyRelation([|
            [|abRelativePath, rab2RelativePath|],
            [|rab2RelativePath, rab1RelativePath, rab3RelativePath|],
            [|rab1RelativePath, rab3RelativePath|],
          |]);

        let wabRelativePath = "w1.wab";

        let state =
          OperateWABAssetBundleMainService.setWholeDependencyRelationMap(
            wabRelativePath,
            wholeDependencyRelationMap,
            state^,
          );

        (
          state,
          wabRelativePath,
          abRelativePath,
          (rab1RelativePath, rab2RelativePath, rab3RelativePath),
        );
      };

      describe("getAllNeededABCount", () =>
        test("get all dependency rabs' count + 1", () => {
          let (
            state,
            wabRelativePath,
            abRelativePath,
            (rab1RelativePath, rab2RelativePath, rab3RelativePath),
          ) =
            _prepare(~state, ());

          ProgressABSystem.RAB.getAllNeededABCount(
            abRelativePath,
            wabRelativePath,
            state,
          )
          |> expect == 3
          + 1;
        })
      );

      describe("getLoadedNeededABCount", () =>
        describe("get loaded dependency rabs' count + is self loaded", () => {
          describe("test self is sab", () => {
            test("test self is not loaded", () => {
              let (
                state,
                wabRelativePath,
                abRelativePath,
                (rab1RelativePath, rab2RelativePath, rab3RelativePath),
              ) =
                _prepare(~state, ~abRelativePath="a.sab", ());
              let state =
                state
                |> OperateSABAssetBundleMainService.markNotLoaded(
                     abRelativePath,
                   )
                |> OperateRABAssetBundleMainService.markNotLoaded(
                     rab2RelativePath,
                   )
                |> OperateRABAssetBundleMainService.markLoaded(
                     rab3RelativePath,
                   );

              ProgressABSystem.RAB.getLoadedNeededABCount(
                abRelativePath,
                wabRelativePath,
                state,
              )
              |> expect == 1;
            });
            test("test self is loaded", () => {
              let (
                state,
                wabRelativePath,
                abRelativePath,
                (rab1RelativePath, rab2RelativePath, rab3RelativePath),
              ) =
                _prepare(~state, ~abRelativePath="a.sab", ());
              let state =
                state
                |> OperateSABAssetBundleMainService.markLoaded(
                     abRelativePath,
                   )
                |> OperateRABAssetBundleMainService.markNotLoaded(
                     rab2RelativePath,
                   )
                |> OperateRABAssetBundleMainService.markLoaded(
                     rab3RelativePath,
                   );

              ProgressABSystem.RAB.getLoadedNeededABCount(
                abRelativePath,
                wabRelativePath,
                state,
              )
              |> expect == 1
              + 1;
            });
          });

          describe("test self is rab", () =>
            test("test self is loaded", () => {
              let (
                state,
                wabRelativePath,
                abRelativePath,
                (rab1RelativePath, rab2RelativePath, rab3RelativePath),
              ) =
                _prepare(~state, ~abRelativePath="a.rab", ());
              let state =
                state
                |> OperateRABAssetBundleMainService.markLoaded(
                     abRelativePath,
                   )
                |> OperateRABAssetBundleMainService.markNotLoaded(
                     rab2RelativePath,
                   )
                |> OperateRABAssetBundleMainService.markLoaded(
                     rab3RelativePath,
                   );

              ProgressABSystem.RAB.getLoadedNeededABCount(
                abRelativePath,
                wabRelativePath,
                state,
              )
              |> expect == 1
              + 1;
            })
          );

          describe("test self is wab", () =>
            test("fatal", () => {
              let (
                state,
                wabRelativePath,
                abRelativePath,
                (rab1RelativePath, rab2RelativePath, rab3RelativePath),
              ) =
                _prepare(~state, ~abRelativePath="a.wab", ());

              expect(() =>
                ProgressABSystem.RAB.getLoadedNeededABCount(
                  abRelativePath,
                  wabRelativePath,
                  state,
                )
              )
              |> toThrowMessage("unknown abRelativePath");
            })
          );
        })
      );
    });
  });