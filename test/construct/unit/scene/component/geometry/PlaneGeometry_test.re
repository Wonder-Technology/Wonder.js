open Wonder_jest;

open Js.Typed_array;

open GeometryRunAPI;

let _ =
  describe("plane geometry", () => {
    open Expect;
    open! Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("createPlaneGeometry", () =>
      test("create a new geometry which is just index(int)", () => {
        let geometry = createPlaneGeometry()->ResultTool.getExnSuccessValue;

        (
          getVertices(geometry)
          ->ResultTool.getExnSuccessValue
          ->VerticesVO.value,
          getNormals(geometry)
          ->ResultTool.getExnSuccessValue
          ->NormalsVO.value,
          getIndices(geometry)
          ->ResultTool.getExnSuccessValue
          ->IndicesVO.value,
        )
        |> expect
        == (
             Float32Array.make([|
               1.0,
               0.0,
               (-1.0),
               1.0,
               0.0,
               1.0,
               (-1.0),
               0.0,
               1.0,
               (-1.0),
               0.0,
               (-1.0),
             |]),
             Float32Array.make([|
               0.0,
               1.0,
               0.0,
               0.0,
               1.0,
               0.0,
               0.0,
               1.0,
               0.0,
               0.0,
               1.0,
               0.0,
             |]),
             Uint32Array.make([|2, 1, 0, 0, 3, 2|]),
           );
      })
    );
  });
