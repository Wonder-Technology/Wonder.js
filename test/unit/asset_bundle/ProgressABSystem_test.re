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
      let _prepare = state => {
        let abRelativePath = "a.sab";

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

      describe("getAllDependencyRABCount", () =>
        test("get all dependency rabs' count", () => {
          let (
            state,
            wabRelativePath,
            abRelativePath,
            (rab1RelativePath, rab2RelativePath, rab3RelativePath),
          ) =
            _prepare(state);

          ProgressABSystem.RAB.getAllDependencyRABCount(
            abRelativePath,
            wabRelativePath,
            state,
          )
          |> expect == 3;
        })
      );

      describe("getLoadedDependencyRABCount", () =>
        test("get loaded dependency rabs' count", () => {
          let (
            state,
            wabRelativePath,
            abRelativePath,
            (rab1RelativePath, rab2RelativePath, rab3RelativePath),
          ) =
            _prepare(state);
          let state =
            state
            |> OperateRABAssetBundleMainService.markAssembled(
                 rab2RelativePath,
               )
            |> OperateRABAssetBundleMainService.markAssembled(
                 rab3RelativePath,
               );

          ProgressABSystem.RAB.getLoadedDependencyRABCount(
            abRelativePath,
            wabRelativePath,
            state,
          )
          |> expect == 2;
        })
      );
    });
  });