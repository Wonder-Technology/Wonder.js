open Wonder_jest;

describe(
  "IndicesGeometryMainService",
  () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(CreateStateMainService.createState());
    beforeEach(
      () => {
        sandbox := createSandbox();
        state := TestTool.init(~sandbox, ())
      }
    );
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
    describe(
      "getIndicesCount",
      () =>
        test(
          "get indices count",
          () => {
            let (state, gameObject, geometry) = BoxGeometryTool.createGameObject(state^);
            let state = state |> GeometryTool.initGeometrys;
            IndicesGeometryTool.getIndicesCount(geometry, state) |> expect == 36
          }
        )
    )
  }
);