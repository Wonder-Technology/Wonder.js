open Wonder_jest;

let _ =
  describe("Matrix4Service", () => {
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

    describe("fix bug", () =>
      test("fix getRotation bug", () => {
        let matrix =
          Js.Typed_array.Float32Array.make([|
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            (-1.0),
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
          |]);

        Matrix4Service.fromTranslationRotationScale(
          Matrix4Service.getTranslationTuple(matrix),
          Matrix4Service.getRotationTuple(matrix),
          Matrix4Service.getScaleTuple(matrix),
          GlobalTempTool.getFloat32Array1(state^),
        )
        |>
        expect == Js.Typed_array.Float32Array.make([|
                    1.,
                    0.,
                    (-0.),
                    0.,
                    (-0.),
                    2.220446049250313e-16,
                    (-1.),
                    0.,
                    0.,
                    1.,
                    2.220446049250313e-16,
                    0.,
                    0.,
                    0.,
                    0.,
                    1.,
                  |]);
      })
    );
  });