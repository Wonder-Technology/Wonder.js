open Wonder_jest;

open Js.Typed_array;

open GeometryRunAPI;

let _ =
  describe("triangle geometry", () => {
    open Expect;
    open! Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("createTriangleGeometry", () =>
      test("create a new geometry which is just index(int)", () => {
        let geometry = createTriangleGeometry()->ResultTool.getExnSuccessValue;

        (
          getVertices(geometry)
          ->ResultTool.getExnSuccessValue
          ->VerticesVO.value,
          getTexCoords(geometry)
          ->ResultTool.getExnSuccessValue
          ->TexCoordsVO.value,
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
               0.0,
               0.5,
               0.,
               (-0.5),
               (-0.5),
               0.,
               0.5,
               (-0.5),
               0.,
             |]),
             Float32Array.make([|0.5, 1., 0., 0., 1., 0.|]),
             Float32Array.make([|0., 0., 1., 0., 0., 1., 0., 0., 1.|]),
             Uint32Array.make([|0, 1, 2|]),
           );
      })
    );
  });
