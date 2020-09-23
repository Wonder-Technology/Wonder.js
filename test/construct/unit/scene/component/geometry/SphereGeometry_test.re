open Wonder_jest;

open Js.Typed_array;

open GeometryRunAPI;

let _ =
  describe("sphere geometry", () => {
    open Expect;
    open! Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();

    beforeEach(() => {
      sandbox := createSandbox();
      TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("createSphereGeometry", () =>
      test("create a new geometry which is just index(int)", () => {
        let geometry =
          createSphereGeometry(0.5, 2)->ResultTool.getExnSuccessValue;

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
               0.,
               0.5,
               0.,
               (-0.),
               0.5,
               0.,
               0.,
               0.5,
               (-0.),
               0.5,
               3.0616171314629196e-17,
               0.,
               (-0.5),
               3.0616171314629196e-17,
               6.123234262925839e-17,
               0.5,
               3.0616171314629196e-17,
               (-1.2246468525851679e-16),
               6.123234262925839e-17,
               (-0.5),
               0.,
               (-6.123234262925839e-17),
               (-0.5),
               7.498798786105971e-33,
               6.123234262925839e-17,
               (-0.5),
               (-1.4997597572211942e-32),
             |]),
             Float32Array.make([|
               1.,
               1.,
               0.5,
               1.,
               0.,
               1.,
               1.,
               0.5,
               0.5,
               0.5,
               0.,
               0.5,
               1.,
               0.,
               0.5,
               0.,
               0.,
               0.,
             |]),
             Float32Array.make([|
               0.,
               0.5,
               0.,
               (-0.),
               0.5,
               0.,
               0.,
               0.5,
               (-0.),
               0.5,
               3.0616171314629196e-17,
               0.,
               (-0.5),
               3.0616171314629196e-17,
               6.123234262925839e-17,
               0.5,
               3.0616171314629196e-17,
               (-1.2246468525851679e-16),
               6.123234262925839e-17,
               (-0.5),
               0.,
               (-6.123234262925839e-17),
               (-0.5),
               7.498798786105971e-33,
               6.123234262925839e-17,
               (-0.5),
               (-1.4997597572211942e-32),
             |]),
             Uint32Array.make([|
               1,
               3,
               0,
               1,
               4,
               3,
               2,
               4,
               1,
               2,
               5,
               4,
               4,
               6,
               3,
               4,
               7,
               6,
               5,
               7,
               4,
               5,
               8,
               7,
             |]),
           );
      })
    );
  });
