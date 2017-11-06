open BoxGeometry;

open Geometry;

open BoxGeometryType;

open GeometryType;

open Jest;

let _ =
  describe(
    "BoxGeometry",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init()
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "create",
        () =>
          test(
            "create a new geometry which is just index(int)",
            () => {
              let (_, geometry) = createBoxGeometry(state^);
              expect(geometry) == 0
            }
          )
      );
      describe(
        "setConfigData",
        () => {
          test(
            "test set config data",
            () => {
              let (state, geometry) = createBoxGeometry(state^);
              let state =
                state
                |> setBoxGeometryConfigData(
                     geometry,
                     GeometryTool.buildBoxGeometryConfigDataJsObj(
                       ~width=Js.Nullable.return(10.),
                       ~height=Js.Nullable.return(20.),
                       ~depth=Js.Nullable.return(30.),
                       ~widthSegments=Js.Nullable.return(2.),
                       ~heightSegments=Js.Nullable.return(3.),
                       ~depthSegments=Js.Nullable.return(4.),
                       ()
                     )
                   );
              state
              |> getGeometryConfigData(geometry)
              |>
              expect == Js.Dict.fromList([
                          ("width", 10.),
                          ("height", 20.),
                          ("depth", 30.),
                          ("widthSegments", 2.),
                          ("heightSegments", 3.),
                          ("depthSegments", 4.)
                        ])
            }
          );
          test(
            "if not pass full data, use default data",
            () => {
              let (state, geometry) = createBoxGeometry(state^);
              let state =
                state
                |> setBoxGeometryConfigData(
                     geometry,
                     GeometryTool.buildBoxGeometryConfigDataJsObj(
                       ~height=Js.Nullable.return(20.),
                       ()
                     )
                   );
              state
              |> getGeometryConfigData(geometry)
              |>
              expect == Js.Dict.fromList([
                          ("width", 10.),
                          ("height", 20.),
                          ("depth", 10.),
                          ("widthSegments", 1.),
                          ("heightSegments", 1.),
                          ("depthSegments", 1.)
                        ])
            }
          )
        }
      );
      describe(
        "test compute data",
        () =>
          test(
            "test with 2 segments",
            () => {
              let (state, geometry) = createBoxGeometry(state^);
              let state =
                state
                |> setBoxGeometryConfigData(
                     geometry,
                     GeometryTool.buildBoxGeometryConfigDataJsObj(
                       ~width=Js.Nullable.return(10.),
                       ~height=Js.Nullable.return(20.),
                       ~depth=Js.Nullable.return(30.),
                       ~widthSegments=Js.Nullable.return(2.),
                       ~heightSegments=Js.Nullable.return(2.),
                       ~depthSegments=Js.Nullable.return(2.),
                       ()
                     )
                   );
              let {vertices, indices}: geometryComputeData =
                state |> BoxGeometryTool.computeData(geometry);
              (vertices, indices)
              |>
              expect == (
                          [|
                            (-10.),
                            (-20.),
                            30.,
                            (-10.),
                            0.,
                            30.,
                            (-10.),
                            20.,
                            30.,
                            0.,
                            (-20.),
                            30.,
                            0.,
                            0.,
                            30.,
                            0.,
                            20.,
                            30.,
                            10.,
                            (-20.),
                            30.,
                            10.,
                            0.,
                            30.,
                            10.,
                            20.,
                            30.,
                            10.,
                            (-20.),
                            (-30.),
                            10.,
                            0.,
                            (-30.),
                            10.,
                            20.,
                            (-30.),
                            0.,
                            (-20.),
                            (-30.),
                            0.,
                            0.,
                            (-30.),
                            0.,
                            20.,
                            (-30.),
                            (-10.),
                            (-20.),
                            (-30.),
                            (-10.),
                            0.,
                            (-30.),
                            (-10.),
                            20.,
                            (-30.),
                            (-10.),
                            20.,
                            30.,
                            (-10.),
                            20.,
                            0.,
                            (-10.),
                            20.,
                            (-30.),
                            0.,
                            20.,
                            30.,
                            0.,
                            20.,
                            0.,
                            0.,
                            20.,
                            (-30.),
                            10.,
                            20.,
                            30.,
                            10.,
                            20.,
                            0.,
                            10.,
                            20.,
                            (-30.),
                            10.,
                            (-20.),
                            30.,
                            10.,
                            (-20.),
                            0.,
                            10.,
                            (-20.),
                            (-30.),
                            0.,
                            (-20.),
                            30.,
                            0.,
                            (-20.),
                            0.,
                            0.,
                            (-20.),
                            (-30.),
                            (-10.),
                            (-20.),
                            30.,
                            (-10.),
                            (-20.),
                            0.,
                            (-10.),
                            (-20.),
                            (-30.),
                            10.,
                            (-20.),
                            30.,
                            10.,
                            0.,
                            30.,
                            10.,
                            20.,
                            30.,
                            10.,
                            (-20.),
                            0.,
                            10.,
                            0.,
                            0.,
                            10.,
                            20.,
                            0.,
                            10.,
                            (-20.),
                            (-30.),
                            10.,
                            0.,
                            (-30.),
                            10.,
                            20.,
                            (-30.),
                            (-10.),
                            (-20.),
                            (-30.),
                            (-10.),
                            0.,
                            (-30.),
                            (-10.),
                            20.,
                            (-30.),
                            (-10.),
                            (-20.),
                            0.,
                            (-10.),
                            0.,
                            0.,
                            (-10.),
                            20.,
                            0.,
                            (-10.),
                            (-20.),
                            30.,
                            (-10.),
                            0.,
                            30.,
                            (-10.),
                            20.,
                            30.
                          |],
                          [|
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
                            9,
                            12,
                            10,
                            12,
                            13,
                            10,
                            10,
                            13,
                            11,
                            13,
                            14,
                            11,
                            12,
                            15,
                            13,
                            15,
                            16,
                            13,
                            13,
                            16,
                            14,
                            16,
                            17,
                            14,
                            18,
                            21,
                            19,
                            21,
                            22,
                            19,
                            19,
                            22,
                            20,
                            22,
                            23,
                            20,
                            21,
                            24,
                            22,
                            24,
                            25,
                            22,
                            22,
                            25,
                            23,
                            25,
                            26,
                            23,
                            27,
                            30,
                            28,
                            30,
                            31,
                            28,
                            28,
                            31,
                            29,
                            31,
                            32,
                            29,
                            30,
                            33,
                            31,
                            33,
                            34,
                            31,
                            31,
                            34,
                            32,
                            34,
                            35,
                            32,
                            36,
                            39,
                            37,
                            39,
                            40,
                            37,
                            37,
                            40,
                            38,
                            40,
                            41,
                            38,
                            39,
                            42,
                            40,
                            42,
                            43,
                            40,
                            40,
                            43,
                            41,
                            43,
                            44,
                            41,
                            45,
                            48,
                            46,
                            48,
                            49,
                            46,
                            46,
                            49,
                            47,
                            49,
                            50,
                            47,
                            48,
                            51,
                            49,
                            51,
                            52,
                            49,
                            49,
                            52,
                            50,
                            52,
                            53,
                            50
                          |]
                        )
            }
          )
      )
    }
  );