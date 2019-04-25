open Wonder_jest;

let _ =
  describe("FindDependencyDataSystem", () => {
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

    describe("findAllDependencyRAbRelativePathByDepthSearch", () => {
      test("test1", () => {
        let abRelativePath = "a.sab";

        let rab1RelativePath = "rab1.rab";
        let rab2RelativePath = "rab2.rab";
        let rab3RelativePath = "rab3.rab";
        let rab4RelativePath = "rab4.rab";
        let rab5RelativePath = "rab5.rab";

        let wholeDependencyRelationMap =
          GenerateAllABTool.buildDependencyRelation([|
            [|abRelativePath, rab2RelativePath|],
            [|rab2RelativePath, rab1RelativePath, rab3RelativePath|],
            [|rab4RelativePath, rab5RelativePath|],
            [|rab1RelativePath, rab3RelativePath|],
          |]);

        FindDependencyDataSystem.findAllDependencyRAbRelativePathByDepthSearch(
          abRelativePath,
          wholeDependencyRelationMap,
        )
        |> expect == [|rab3RelativePath, rab1RelativePath, rab2RelativePath|];
      });
      test("test2", () => {
        let abRelativePath = "a.sab";

        let rab1RelativePath = "rab1.rab";
        let rab2RelativePath = "rab2.rab";
        let rab3RelativePath = "rab3.rab";
        let rab4RelativePath = "rab4.rab";
        let rab5RelativePath = "rab5.rab";

        let wholeDependencyRelationMap =
          GenerateAllABTool.buildDependencyRelation([|
            [|abRelativePath, rab2RelativePath|],
            [|rab2RelativePath, rab1RelativePath, rab3RelativePath|],
            [|rab4RelativePath, rab5RelativePath|],
            [|rab1RelativePath, rab3RelativePath|],
            [|rab3RelativePath, rab4RelativePath|],
          |]);

        FindDependencyDataSystem.findAllDependencyRAbRelativePathByDepthSearch(
          abRelativePath,
          wholeDependencyRelationMap,
        )
        |> expect
        == [|
             rab5RelativePath,
             rab4RelativePath,
             rab3RelativePath,
             rab1RelativePath,
             rab2RelativePath,
           |];
      });
    });

    describe("findAllDependencyRAbRelativePathByBreadthSearch", () => {
      test("test1", () => {
        let abRelativePath = "a.sab";

        let rab1RelativePath = "rab1.rab";
        let rab2RelativePath = "rab2.rab";
        let rab3RelativePath = "rab3.rab";
        let rab4RelativePath = "rab4.rab";
        let rab5RelativePath = "rab5.rab";

        let wholeDependencyRelationMap =
          GenerateAllABTool.buildDependencyRelation([|
            [|abRelativePath, rab2RelativePath|],
            [|rab2RelativePath, rab1RelativePath, rab3RelativePath|],
            [|rab4RelativePath, rab5RelativePath|],
            [|rab1RelativePath, rab3RelativePath|],
          |]);

        FindDependencyDataSystem.findAllDependencyRAbRelativePathByBreadthSearch(
          abRelativePath,
          wholeDependencyRelationMap,
        )
        |> expect
        == [|
             [|rab3RelativePath|],
             [|rab1RelativePath|],
             [|rab2RelativePath|],
           |];
      });
      test("test2", () => {
        let abRelativePath = "a.sab";

        let rab1RelativePath = "rab1.rab";
        let rab2RelativePath = "rab2.rab";
        let rab3RelativePath = "rab3.rab";
        let rab4RelativePath = "rab4.rab";
        let rab5RelativePath = "rab5.rab";

        let wholeDependencyRelationMap =
          GenerateAllABTool.buildDependencyRelation([|
            [|abRelativePath, rab2RelativePath|],
            [|rab2RelativePath, rab1RelativePath, rab3RelativePath|],
            [|rab1RelativePath, rab3RelativePath|],
            [|rab3RelativePath, rab4RelativePath, rab5RelativePath|],
          |]);

        FindDependencyDataSystem.findAllDependencyRAbRelativePathByBreadthSearch(
          abRelativePath,
          wholeDependencyRelationMap,
        )
        |> expect
        == [|
             [|rab4RelativePath, rab5RelativePath|],
             [|rab3RelativePath|],
             [|rab1RelativePath|],
             [|rab2RelativePath|],
           |];
      });
    });
  });