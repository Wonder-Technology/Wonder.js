open Wonder_jest;
open Js.Typed_array;

let _ = 
	describe("Matrix4", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      TestTool.init(~sandbox, ());
    });

    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("setLookAt", () => {
      test("test", () => {
        let matrix = Matrix4.setLookAt((0., 0., 20.), (0., 0., 0.), (0., 1., 0.));
        let result = Float32Array.make([|
          1.0,
          0.0,
          0.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          0.0,
          20.0,
          1.0
        |]);
       
        matrix -> expect == result;
      })
    })
  })