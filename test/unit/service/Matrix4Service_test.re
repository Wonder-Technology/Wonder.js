open Wonder_jest;

open Js.Typed_array;

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

    describe("copy", () =>
      test("copy mat4 float32Arr", () => {
        let matrix = Matrix4Service.createIdentityMatrix4();

        let copiedMatrix = Matrix4Service.copy(matrix);
        let copiedMatrix =
          copiedMatrix |> Matrix4Service.setTranslation((0.1, 0.2, 0.3));

        matrix |> expect |> not_ |> toEqual(copiedMatrix);
      })
    );

    describe("fix bug", () =>
      test("fix getRotation bug", () => {
        let matrix =
          Float32Array.make([|
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
        |> expect
        == Float32Array.make([|
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