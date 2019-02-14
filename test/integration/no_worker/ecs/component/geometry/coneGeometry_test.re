open GeometryAPI;

open GeometryType;

open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("cone geometry", () => {
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

    describe("createConeGeometry", () =>
      test("create a new geometry which is just index(int)", () => {
        let (state, geometry) = createConeGeometry(3., 10., 2, 2, state^);

        (
          getGeometryVertices(geometry, state),
          getGeometryNormals(geometry, state),
          getGeometryTexCoords(geometry, state),
          getGeometryIndices16(geometry, state),
        )
        |>
        expect == (
                    Float32Array.make([|
                      0.,
                      5.,
                      0.,
                      0.,
                      5.,
                      (-0.),
                      (-0.),
                      5.,
                      0.,
                      0.,
                      0.,
                      1.5,
                      1.8369701465288538e-16,
                      0.,
                      (-1.5),
                      (-3.6739402930577075e-16),
                      0.,
                      1.5,
                      0.,
                      (-5.),
                      3.,
                      3.6739402930577075e-16,
                      (-5.),
                      (-3.),
                      (-7.347880586115415e-16),
                      (-5.),
                      3.,
                      0.,
                      (-5.),
                      0.,
                      0.,
                      (-5.),
                      0.,
                      0.,
                      (-5.),
                      3.,
                      3.6739402930577075e-16,
                      (-5.),
                      (-3.),
                      (-7.347880586115415e-16),
                      (-5.),
                      3.,
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
                      0.5,
                      0.5,
                      0.5,
                      0.5,
                      1.,
                      0.5,
                      0.,
                      0.5,
                      1.,
                      0.5,
                    |]),
                    Float32Array.make([|
                      0.,
                      0.30000001192092896,
                      1.,
                      1.2246468525851679e-16,
                      0.30000001192092896,
                      (-1.),
                      (-2.4492937051703357e-16),
                      0.30000001192092896,
                      1.,
                      0.,
                      0.30000001192092896,
                      1.,
                      1.2246468525851679e-16,
                      0.30000001192092896,
                      (-1.),
                      (-2.4492937051703357e-16),
                      0.30000001192092896,
                      1.,
                      0.,
                      0.30000001192092896,
                      1.,
                      1.2246468525851679e-16,
                      0.30000001192092896,
                      (-1.),
                      (-2.4492937051703357e-16),
                      0.30000001192092896,
                      1.,
                      0.,
                      (-1.),
                      0.,
                      0.,
                      (-1.),
                      0.,
                      0.,
                      (-1.),
                      0.,
                      0.,
                      (-1.),
                      0.,
                      0.,
                      (-1.),
                      0.
                    |]),
                    Uint16Array.make([|
                      0,
                      3,
                      1,
                      3,
                      4,
                      1,
                      3,
                      6,
                      4,
                      6,
                      7,
                      4,
                      1,
                      4,
                      2,
                      4,
                      5,
                      2,
                      4,
                      7,
                      5,
                      7,
                      8,
                      5,
                      12,
                      11,
                      9,
                      13,
                      12,
                      10,
                    |]),
                  );
      })
    );
  });