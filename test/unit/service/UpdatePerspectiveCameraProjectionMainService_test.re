open Wonder_jest;

describe(
  "UpdatePerspectiveCameraProjectionMainService",
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
      "updateCameraProjection",
      () =>
        test(
          "if not has fovy/aspect/near/far value, error",
          () =>
            expect(() => PerspectiveCameraProjectionTool.updateCameraProjection(0, state^))
            |> toThrowMessage("fovy,near,far should all exist")
        )
    )
  }
);