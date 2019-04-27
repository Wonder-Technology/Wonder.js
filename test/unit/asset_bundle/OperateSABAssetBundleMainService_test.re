open Wonder_jest;

let _ =
  describe("OperateSABAssetBundleMainService", () => {
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

    describe("canAssemble", () => {
      let _getWABRelativePath = () => "wab1.wab";

      let _canAssemble =
          (
            ~state,
            ~wabRelativePath=_getWABRelativePath(),
            ~sabRelativePath=ImportABTool.SAB.getSABRelativePath(),
            /* ~wholeDependencyRelationMap=ImportABTool.RAB.buildWholeDependencyRelationMap(
                 ImportABTool.SAB.getABRelativePaths(),
               ), */
            (),
          ) =>
        OperateSABAssetBundleMainService.canAssemble(
          sabRelativePath,
          wabRelativePath,
          state,
        );

      describe("return whether can assemble sab or not", () => {
        test("if sab isn't loaded, can't", () => {
          let sabRelativePath = ImportABTool.SAB.getSABRelativePath();

          let state =
            state^
            |> OperateSABAssetBundleMainService.markNotLoaded(sabRelativePath);

          _canAssemble(~state, ()) |> expect == false;
        });
        test("if wholeDependencyRelationMap isn't set to state, can't", () => {
          let sabRelativePath = ImportABTool.SAB.getSABRelativePath();
          let (rab1RelativePath, rab2RelativePath) =
            ImportABTool.SAB.getRABRelativePaths();

          let state =
            state^
            |> OperateSABAssetBundleMainService.markLoaded(sabRelativePath);

          _canAssemble(~state, ()) |> expect == false;
        });
        test("if any dependency rab isn't assembled, can't", () => {
          let sabRelativePath = ImportABTool.SAB.getSABRelativePath();
          let (rab1RelativePath, rab2RelativePath) =
            ImportABTool.SAB.getRABRelativePaths();

          let state =
            state^
            |> OperateSABAssetBundleMainService.markLoaded(sabRelativePath)
            |> OperateRABAssetBundleMainService.markNotAssembled(
                 rab1RelativePath,
               )
            |> OperateRABAssetBundleMainService.markAssembled(
                 rab2RelativePath,
               )
            |> OperateWABAssetBundleMainService.setWholeDependencyRelationMap(
                 _getWABRelativePath(),
                 ImportABTool.RAB.buildWholeDependencyRelationMap(
                   ImportABTool.SAB.getABRelativePaths(),
                 ),
               );

          _canAssemble(~state, ()) |> expect == false;
        });
        test("else, can", () => {
          let sabRelativePath = ImportABTool.SAB.getSABRelativePath();
          let (rab1RelativePath, rab2RelativePath) =
            ImportABTool.SAB.getRABRelativePaths();

          let state =
            state^
            |> OperateSABAssetBundleMainService.markLoaded(sabRelativePath)
            |> OperateRABAssetBundleMainService.markAssembled(
                 rab1RelativePath,
               )
            |> OperateRABAssetBundleMainService.markAssembled(
                 rab2RelativePath,
               )
            |> OperateWABAssetBundleMainService.setWholeDependencyRelationMap(
                 _getWABRelativePath(),
                 ImportABTool.RAB.buildWholeDependencyRelationMap(
                   ImportABTool.SAB.getABRelativePaths(),
                 ),
               );

          _canAssemble(~state, ()) |> expect == true;
        });
      });
    });
  });