open Wonder_jest;

describe(
  "GetBoxGeometryIndicesRenderService",
  () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
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
            /*let state = state |> BoxGeometryTool.initGeometrys;*/
            CustomGeometryTool.getIndicesCount(geometry, RenderStateTool.createState(state))
            |> expect == 36
          }
        )
    )
  }
);