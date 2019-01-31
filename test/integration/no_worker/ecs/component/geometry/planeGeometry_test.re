open GeometryAPI;

open GeometryType;

open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("plane geometry", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;

    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.init(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("createPlaneGeometry", () =>
      test("create a new geometry which is just index(int)", () => {
        let (state, geometry) = createPlaneGeometry(10., 5., 2, 2, state^);

        (
          getGeometryVertices(geometry, state),
          getGeometryNormals(geometry, state),
          getGeometryTexCoords(geometry, state),
          getGeometryIndices16(geometry, state),
        )
        |>
        expect == (
                    Float32Array.make([|
                      (-5.),
                      2.5,
                      0.,
                      0.,
                      2.5,
                      0.,
                      5.,
                      2.5,
                      0.,
                      (-5.),
                      (-0.),
                      0.,
                      0.,
                      (-0.),
                      0.,
                      5.,
                      (-0.),
                      0.,
                      (-5.),
                      (-2.5),
                      0.,
                      0.,
                      (-2.5),
                      0.,
                      5.,
                      (-2.5),
                      0.,
                    |]),
                    Float32Array.make([|
                      0.,
                      0.,
                      1.,
                      0.,
                      0.,
                      1.,
                      0.,
                      0.,
                      1.,
                      0.,
                      0.,
                      1.,
                      0.,
                      0.,
                      1.,
                      0.,
                      0.,
                      1.,
                      0.,
                      0.,
                      1.,
                      0.,
                      0.,
                      1.,
                      0.,
                      0.,
                      1.,
                    |]),
                    Float32Array.make([|
                      0.,
                      1.,
                      0.5,
                      1.,
                      1.,
                      1.,
                      0.,
                      0.5,
                      0.5,
                      0.5,
                      1.,
                      0.5,
                      0.,
                      0.,
                      0.5,
                      0.,
                      1.,
                      0.,
                    |]),
                    Uint16Array.make([|
                      0,
                      3,
                      1,
                      3,
                      4,
                      1,
                      1,
                      4,
                      2,
                      4,
                      5,
                      2,
                      3,
                      6,
                      4,
                      6,
                      7,
                      4,
                      4,
                      7,
                      5,
                      7,
                      8,
                      5,
                    |]),
                  );
      })
    );
  });