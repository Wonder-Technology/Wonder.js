open BoxGeometryAPI;

open GeometryType;

open BoxGeometryType;

open Wonder_jest;

open Js.Typed_array;

let _ =
  describe(
    "BoxGeometry",
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
        "createBoxGeometry",
        () =>
          test(
            "create a new geometry which is just index(int)",
            () => {
              let (state, geometry) = createBoxGeometry(state^);
              (RecordBoxGeometryMainService.getRecord(state).index, geometry) |> expect == (1, 0)
            }
          )
      );
      describe(
        "setConfigData",
        () => {
          test(
            "test set config record",
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
                       ~widthSegment=Js.Nullable.return(2.),
                       ~heightSegment=Js.Nullable.return(3.),
                       ~depthSegment=Js.Nullable.return(4.),
                       ()
                     )
                   );
              state
              |> unsafeGetBoxGeometryConfigData(geometry)
              |>
              expect == Js.Dict.fromList([
                          ("width", 10.),
                          ("height", 20.),
                          ("depth", 30.),
                          ("widthSegment", 2.),
                          ("heightSegment", 3.),
                          ("depthSegment", 4.)
                        ])
            }
          );
          test(
            "if not pass full record, use default record",
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
              |> unsafeGetBoxGeometryConfigData(geometry)
              |>
              expect == Js.Dict.fromList([
                          ("width", 10.),
                          ("height", 20.),
                          ("depth", 10.),
                          ("widthSegment", 1.),
                          ("heightSegment", 1.),
                          ("depthSegment", 1.)
                        ])
            }
          )
        }
      );
      describe(
        "test compute record",
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
                       ~widthSegment=Js.Nullable.return(2.),
                       ~heightSegment=Js.Nullable.return(2.),
                       ~depthSegment=Js.Nullable.return(2.),
                       ()
                     )
                   );
              let {vertices, normals, indices}: geometryComputeData =
                state |> BoxGeometryTool.computeData(geometry);
              (vertices, normals, indices)
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
                            0.,
                            0.,
                            (-1.),
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
                            0.,
                            0.,
                            (-1.),
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
                            0.,
                            0.,
                            (-1.),
                            0.,
                            0.
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
      );
      describe(
        "contract check: is alive",
        () =>
          describe(
            "if geometry is disposed",
            () => {
              let _testSetFunc = (setFunc) => {
                open GameObjectAPI;
                let (state, gameObject, geometry) = BoxGeometryTool.createGameObject(state^);
                let state = state |> GeometryTool.initGeometrys;
                TestTool.closeContractCheck();
                let state =
                  state
                  |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(gameObject, geometry);
                TestTool.openContractCheck();
                expect(() => setFunc(geometry, Obj.magic(0), state))
                |> toThrowMessage("expect component alive, but actual not")
              };
              test(
                "setBoxGeometryConfigData should error",
                () => _testSetFunc(setBoxGeometryConfigData)
              )
            }
          )
      );
      describe(
        "test set points",
        () => {
          let _testSetVertexDataWithArray = (type_, getFunc, setFunc) =>
            test(
              {j|if $type_ already exist, fill new record in it|j},
              () => {
                open GameObjectAPI;
                open GameObjectAPI;
                let (state, geometry) = createBoxGeometry(state^);
                let state = state |> setFunc(geometry, [|1., 2., 3.|]);
                let newData = [|3., 3., 5.|];
                let state = state |> setFunc(geometry, newData);
                getFunc(geometry, state) |> expect == Float32Array.make(newData)
              }
            );
          let _testSetVertexDataWithTypeArray = (type_, getFunc, setFunc) =>
            test(
              {j|directly set it|j},
              () => {
                open GameObjectAPI;
                open GameObjectAPI;
                let (state, geometry) = createBoxGeometry(state^);
                let state = state |> setFunc(geometry, Float32Array.make([|1., 2., 3.|]));
                let newData = Float32Array.make([|3., 5., 5.|]);
                let state = state |> setFunc(geometry, newData);
                getFunc(geometry, state) |> expect == newData
              }
            );
          describe(
            "set vertices with array",
            () =>
              _testSetVertexDataWithArray(
                "vertices",
                getBoxGeometryVertices,
                GeometryTool.setVerticesWithArray
              )
          );
          describe(
            "set vertices with type array",
            () =>
              _testSetVertexDataWithTypeArray(
                "vertices",
                getBoxGeometryVertices,
                setBoxGeometryVertices
              )
          );
          describe(
            "set normals with array",
            () =>
              _testSetVertexDataWithArray(
                "normals",
                getBoxGeometryNormals,
                GeometryTool.setNormalsWithArray
              )
          );
          describe(
            "set normals with type array",
            () =>
              _testSetVertexDataWithTypeArray(
                "normals",
                getBoxGeometryNormals,
                setBoxGeometryNormals
              )
          );
          describe(
            "set indices with array",
            () =>
              test(
                "if indices already exist, fill new record in it",
                () => {
                  open GameObjectAPI;
                  open GameObjectAPI;
                  let (state, geometry) = createBoxGeometry(state^);
                  let state = state |> GeometryTool.setIndicesWithArray(geometry, [|1, 2, 3|]);
                  let newData = [|3, 3, 5|];
                  let state = state |> GeometryTool.setIndicesWithArray(geometry, newData);
                  getBoxGeometryIndices(geometry, state) |> expect == Uint16Array.make(newData)
                }
              )
          );
          describe(
            "set indices with type array",
            () =>
              test(
                "directly set it",
                () => {
                  open GameObjectAPI;
                  open GameObjectAPI;
                  let (state, geometry) = createBoxGeometry(state^);
                  let newData = Uint16Array.make([|3, 5, 5|]);
                  let state = state |> setBoxGeometryIndices(geometry, newData);
                  getBoxGeometryIndices(geometry, state) |> expect == newData
                }
              )
          )
        }
      );
      describe(
        "getDrawMode",
        () =>
          test(
            "return TRIANGLES",
            () => {
              let triangles = 1;
              let state = state^ |> FakeGlTool.setFakeGl({"TRIANGLES": triangles});
              state |> getBoxGeometryDrawMode |> expect == triangles
            }
          )
      );
      describe(
        "unsafeGetBoxGeometryGameObject",
        () =>
          test(
            "get geometry's gameObject",
            () => {
              open GameObjectAPI;
              open GameObjectAPI;
              let (state, geometry) = createBoxGeometry(state^);
              let (state, gameObject) = state |> createGameObject;
              let state = state |> addGameObjectBoxGeometryComponent(gameObject, geometry);
              state |> unsafeGetBoxGeometryGameObject(geometry) |> expect == gameObject
            }
          )
      );
      describe(
        "dispose component",
        () => {
          describe(
            "dispose data",
            () => {
              describe(
                "test dispose shared geometry",
                () =>
                  test(
                    "descrease group count",
                    () => {
                      let (state, geometry1) = createBoxGeometry(state^);
                      let (state, gameObject1) = GameObjectAPI.createGameObject(state);
                      let state =
                        state
                        |> GameObjectAPI.addGameObjectBoxGeometryComponent(gameObject1, geometry1);
                      let (state, gameObject2) = GameObjectAPI.createGameObject(state);
                      let state =
                        state
                        |> GameObjectAPI.addGameObjectBoxGeometryComponent(gameObject2, geometry1);
                      let (state, gameObject3) = GameObjectAPI.createGameObject(state);
                      let state =
                        state
                        |> GameObjectAPI.addGameObjectBoxGeometryComponent(gameObject3, geometry1);
                      let state =
                        state
                        |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(
                             gameObject1,
                             geometry1
                           );
                      GeometryTool.getGroupCount(geometry1, state) |> expect == 1
                    }
                  )
              );
              describe(
                "test dispose not shared geometry",
                () => {
                  let _prepare = (state) => {
                    let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
                    let state =
                      VboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(
                        geometry1,
                        state
                      );
                    let state = state |> GeometryTool.initGeometrys;
                    let state =
                      state
                      |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(
                           gameObject1,
                           geometry1
                         );
                    (state, gameObject1, geometry1)
                  };
                  /* test(
                       "remove from configDataMap, isInitMap, computeDataFuncMap, gameObjectMap",
                       () => {
                         open MainStateDataType;
                         let (state, gameObject1, geometry1) = _prepare(state);
                         let {
                           configDataMap,
                           isInitMap,
                           computeDataFuncMap,
                           gameObjectMap
                         } =
                           state.boxGeometryRecord;
                         (
                           configDataMap |> WonderCommonlib.SparseMapService.has(geometry1),
                           isInitMap |> WonderCommonlib.SparseMapService.has(geometry1),
                           computeDataFuncMap |> WonderCommonlib.SparseMapService.has(geometry1),
                           gameObjectMap |> WonderCommonlib.SparseMapService.has(geometry1)
                         )
                         |> expect == (false, false, false, false, false, false, false)
                       }
                     ); */
                  test(
                    "remove from buffer map",
                    () => {
                      open VboBufferType;
                      let (state, gameObject1, geometry1) = _prepare(state);
                      let {vertexBufferMap, normalBufferMap, elementArrayBufferMap} =
                        VboBufferTool.getVboBufferRecord(state);
                      (
                        vertexBufferMap |> WonderCommonlib.SparseMapService.has(geometry1),
                        normalBufferMap |> WonderCommonlib.SparseMapService.has(geometry1),
                        elementArrayBufferMap |> WonderCommonlib.SparseMapService.has(geometry1)
                      )
                      |> expect == (false, false, false)
                    }
                  );
                  /* test(
                       "collect typeArr to pool",
                       () => {
                         open TypeArrayPoolType;
                         let (state, gameObject1, geometry1) = _prepare(state);
                         let {float32ArrayPoolMap, uint16ArrayPoolMap} =
                           MainStateTool.getState().typeArrayPoolRecord;
                         (
                           float32ArrayPoolMap
                           |> WonderCommonlib.SparseMapService.unsafeGet(
                                BoxGeometryTool.getDefaultVertices() |> Float32Array.length
                              )
                           |> Js.Array.length,
                           uint16ArrayPoolMap
                           |> WonderCommonlib.SparseMapService.unsafeGet(
                                BoxGeometryTool.getDefaultIndices() |> Uint16Array.length
                              )
                           |> Js.Array.length
                         )
                         |> expect == (2, 1)
                       }
                     ); */
                  describe(
                    "test reallocate geometry",
                    () =>
                      describe(
                        "if have dispose too many geometrys, reallocate geometry",
                        () => {
                          let _prepare = (state) => {
                            let state = SettingTool.setMemory(state, ~maxDisposeCount=1, ());
                            let (state, gameObject1, geometry1) =
                              BoxGeometryTool.createGameObject(state);
                            let (state, gameObject2, geometry2) =
                              BoxGeometryTool.createGameObject(state);
                            let (state, gameObject3, geometry3) =
                              BoxGeometryTool.createGameObject(state);
                            TestTool.closeContractCheck();
                            let state = state |> GeometryTool.initGeometrys;
                            (
                              state,
                              gameObject1,
                              geometry1,
                              gameObject2,
                              geometry2,
                              gameObject3,
                              geometry3
                            )
                          };
                          describe(
                            "test type array data",
                            () =>
                              describe(
                                "pack old type array with alived data",
                                () => {
                                  test(
                                    "alive geometry's points should exist",
                                    () => {
                                      let (
                                        state,
                                        gameObject1,
                                        geometry1,
                                        gameObject2,
                                        geometry2,
                                        gameObject3,
                                        geometry3
                                      ) =
                                        _prepare(state^);
                                      let state =
                                        state
                                        |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(
                                             gameObject1,
                                             geometry1
                                           );
                                      (
                                        getBoxGeometryVertices(geometry2, state),
                                        getBoxGeometryNormals(geometry2, state),
                                        getBoxGeometryIndices(geometry2, state),
                                        getBoxGeometryVertices(geometry3, state),
                                        getBoxGeometryNormals(geometry3, state),
                                        getBoxGeometryIndices(geometry3, state)
                                      )
                                      |>
                                      expect == (
                                                  BoxGeometryTool.getDefaultVertices(),
                                                  BoxGeometryTool.getDefaultNormals(),
                                                  BoxGeometryTool.getDefaultIndices(),
                                                  BoxGeometryTool.getDefaultVertices(),
                                                  BoxGeometryTool.getDefaultNormals(),
                                                  BoxGeometryTool.getDefaultIndices()
                                                )
                                    }
                                  );
                                  test(
                                    "type array should be packed",
                                    () => {
                                      open Js_typed_array;
                                      open MainStateDataType;
                                      let (
                                        state,
                                        gameObject1,
                                        geometry1,
                                        gameObject2,
                                        geometry2,
                                        gameObject3,
                                        geometry3
                                      ) =
                                        _prepare(state^);
                                      let state =
                                        state
                                        |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(
                                             gameObject2,
                                             geometry2
                                           );
                                      let {vertices, normals, indices} =
                                        state |> BoxGeometryTool.getData;
                                      (
                                        vertices |> Float32Array.slice(~start=0, ~end_=72),
                                        vertices |> Float32Array.slice(~start=72, ~end_=144),
                                        normals |> Float32Array.slice(~start=0, ~end_=72),
                                        normals |> Float32Array.slice(~start=72, ~end_=144),
                                        indices |> Uint16Array.slice(~start=0, ~end_=36),
                                        indices |> Uint16Array.slice(~start=36, ~end_=72)
                                      )
                                      |>
                                      expect == (
                                                  BoxGeometryTool.getDefaultVertices(),
                                                  BoxGeometryTool.getDefaultVertices(),
                                                  BoxGeometryTool.getDefaultNormals(),
                                                  BoxGeometryTool.getDefaultNormals(),
                                                  BoxGeometryTool.getDefaultIndices(),
                                                  BoxGeometryTool.getDefaultIndices()
                                                )
                                    }
                                  )
                                }
                              )
                          );
                          /* test(
                               "all alive geometryIndex are changed",
                               () => {
                                 open Js_typed_array;
                                 open MainStateDataType;
                                 let (
                                   state,
                                   gameObject1,
                                   geometry1,
                                   gameObject2,
                                   geometry2,
                                   gameObject3,
                                   geometry3
                                 ) =
                                   _prepare(state^);
                                 let state =
                                   state
                                   |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(
                                        gameObject2,
                                        geometry2
                                      );
                                 (
                                   geometry1,
                                   /* geometry2, */
                                   geometry3
                                 )
                                 |> expect == (0, 1)
                               }
                             ); */
                          describe
                            (
                              "test info array",
                              () =>
                                test(
                                  "update startIndex, endIndex for packed type array",
                                  () => {
                                    open MainStateDataType;
                                    let (
                                      state,
                                      gameObject1,
                                      geometry1,
                                      gameObject2,
                                      geometry2,
                                      gameObject3,
                                      geometry3
                                    ) =
                                      _prepare(state^);
                                    let state =
                                      state
                                      |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(
                                           gameObject1,
                                           geometry1
                                         );
                                    let {verticesInfoArray, indicesInfoArray} =
                                      state |> BoxGeometryTool.getData;
                                    (verticesInfoArray, indicesInfoArray)
                                    |>
                                    expect == (
                                                [|
                                                  GeometryTool.buildInfo(0, 72),
                                                  GeometryTool.buildInfo(0, 72),
                                                  GeometryTool.buildInfo(72, 144)
                                                |],
                                                [|
                                                  GeometryTool.buildInfo(0, 36),
                                                  GeometryTool.buildInfo(0, 36),
                                                  GeometryTool.buildInfo(36, 72)
                                                |]
                                              )
                                  }
                                )
                            );
                            /* test(
                                 "should only has alive data",
                                 () => {
                                   open MainStateDataType;
                                   let (
                                     state,
                                     gameObject1,
                                     geometry1,
                                     gameObject2,
                                     geometry2,
                                     gameObject3,
                                     geometry3
                                   ) =
                                     _prepare(state^);
                                   let state =
                                     state
                                     |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(
                                          gameObject1,
                                          geometry1
                                        );
                                   let {verticesInfoArray, indicesInfoArray} =
                                     state |> BoxGeometryTool.getData;
                                   (
                                     verticesInfoArray |> Js.Array.length,
                                     indicesInfoArray |> Js.Array.length
                                   )
                                   |> expect == (2, 2)
                                 }
                               ) */
                          describe(
                            "test reallocate maps",
                            () => {
                              let _hasMapData = (index, map) =>
                                map
                                |> WonderCommonlib.SparseMapService.get(index)
                                |> Js.Option.isSome;
                              let _unsafeGetSparseMapData = (index, map, state) =>
                                map |> WonderCommonlib.SparseMapService.unsafeGet(index);
                              let _unsafeGetMapData = (index, map, state) =>
                                map |> WonderCommonlib.SparseMapService.unsafeGet(index);
                              describe(
                                "maps should only has alive data",
                                () =>
                                  /* describe(
                                       "test gameObjectMap",
                                       () => {
                                         test(
                                           "test gameObjectMap",
                                           () => {
                                             open MainStateDataType;
                                             let (
                                               state,
                                               gameObject1,
                                               geometry1,
                                               gameObject2,
                                               geometry2,
                                               gameObject3,
                                               geometry3
                                             ) =
                                               _prepare(state^);
                                             let state =
                                               state
                                               |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(
                                                    gameObject1,
                                                    geometry1
                                                  );
                                             let {gameObjectMap} = state |> BoxGeometryTool.getData;
                                             (
                                               _unsafeGetSparseMapData(
                                                 geometry2,
                                                 gameObjectMap,
                                                 state
                                               ),
                                               _unsafeGetSparseMapData(
                                                 geometry3,
                                                 gameObjectMap,
                                                 state
                                               )
                                             )
                                             |> expect == (gameObject2, gameObject3)
                                           }
                                         );
                                         test(
                                           "test BoxGeometryAPI.unsafeGetBoxGeometryGameObject",
                                           () => {
                                             open MainStateDataType;
                                             let (
                                               state,
                                               gameObject1,
                                               geometry1,
                                               gameObject2,
                                               geometry2,
                                               gameObject3,
                                               geometry3
                                             ) =
                                               _prepare(state^);
                                             let state =
                                               state
                                               |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(
                                                    gameObject1,
                                                    geometry1
                                                  );
                                             let {gameObjectMap} = state |> BoxGeometryTool.getData;
                                             (
                                               BoxGeometryAPI.unsafeGetBoxGeometryGameObject(
                                                 geometry2,
                                                 state
                                               ),
                                               BoxGeometryAPI.unsafeGetBoxGeometryGameObject(
                                                 geometry3,
                                                 state
                                               )
                                             )
                                             |> expect == (gameObject2, gameObject3)
                                           }
                                         )
                                       }
                                     );
                                     test(
                                       "test configDataMap, computeDataFuncMap",
                                       () => {
                                         open MainStateDataType;
                                         let (
                                           state,
                                           gameObject1,
                                           geometry1,
                                           gameObject2,
                                           geometry2,
                                           gameObject3,
                                           geometry3
                                         ) =
                                           _prepare(state^);
                                         /* let _ = state |> GeometryTool.getVerticesCount(geometry1);
                                            let _ = state |> GeometryTool.getVerticesCount(geometry2);
                                            let _ = state |> GeometryTool.getVerticesCount(geometry3);
                                            let _ = state |> GeometryTool.getIndicesCount(geometry1);
                                            let _ = state |> GeometryTool.getIndicesCount(geometry2);
                                            let _ = state |> GeometryTool.getIndicesCount(geometry3); */
                                         let state =
                                           state
                                           |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(
                                                gameObject1,
                                                geometry1
                                              );
                                         let {
                                           configDataMap,
                                           computeDataFuncMap
                                           /* indicesCountCacheMap,
                                              verticesCountCacheMap */
                                         } =
                                           state |> BoxGeometryTool.getData;
                                         (
                                           _hasMapData(0, configDataMap),
                                           _hasMapData(1, configDataMap),
                                           _hasMapData(2, configDataMap),
                                           _hasMapData(0, computeDataFuncMap),
                                           _hasMapData(1, computeDataFuncMap),
                                           _hasMapData(2, computeDataFuncMap)
                                           /* _hasMapData(0, verticesCountCacheMap),
                                              _hasMapData(1, verticesCountCacheMap),
                                              _hasMapData(2, verticesCountCacheMap),
                                              _hasMapData(0, indicesCountCacheMap),
                                              _hasMapData(1, indicesCountCacheMap),
                                              _hasMapData(2, indicesCountCacheMap) */
                                         )
                                         |>
                                         expect == (
                                                     true,
                                                     true,
                                                     false,
                                                     true,
                                                     true,
                                                     false
                                                     /* true,
                                                        true,
                                                        false,
                                                        true,
                                                        true,
                                                        false */
                                                   )
                                       }
                                     );
                                     test(
                                       "test isInitMap",
                                       () => {
                                         open MainStateDataType;
                                         let (
                                           state,
                                           gameObject1,
                                           geometry1,
                                           gameObject2,
                                           geometry2,
                                           gameObject3,
                                           geometry3
                                         ) =
                                           _prepare(state^);
                                         let state =
                                           state
                                           |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(
                                                gameObject1,
                                                geometry1
                                              );
                                         let {isInitMap} = state |> BoxGeometryTool.getData;
                                         (
                                           _hasMapData(0, isInitMap),
                                           _hasMapData(1, isInitMap),
                                           _hasMapData(2, isInitMap),
                                           _hasMapData(3, isInitMap),
                                           _hasMapData(4, isInitMap)
                                         )
                                         |> expect == (true, true, false, false, false)
                                       }
                                     );
                                     test(
                                       "test groupCountMap",
                                       () => {
                                         open MainStateDataType;
                                         let (
                                           state,
                                           gameObject1,
                                           geometry1,
                                           gameObject2,
                                           geometry2,
                                           gameObject3,
                                           geometry3
                                         ) =
                                           _prepare(state^);
                                         let {groupCountMap} = state |> BoxGeometryTool.getData;
                                         groupCountMap
                                         |> WonderCommonlib.SparseMapService.set(geometry1, 1);
                                         groupCountMap
                                         |> WonderCommonlib.SparseMapService.set(geometry2, 1);
                                         groupCountMap
                                         |> WonderCommonlib.SparseMapService.set(geometry3, 1);
                                         groupCountMap
                                         |> WonderCommonlib.SparseMapService.set(geometry1, 0);
                                         let state =
                                           state
                                           |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(
                                                gameObject1,
                                                geometry1
                                              );
                                         let {groupCountMap} = state |> BoxGeometryTool.getData;
                                         (
                                           _hasMapData(0, groupCountMap),
                                           _hasMapData(1, groupCountMap),
                                           _hasMapData(2, groupCountMap),
                                           _hasMapData(3, groupCountMap),
                                           _hasMapData(4, groupCountMap)
                                         )
                                         |> expect == (true, true, false, false, false)
                                       }
                                     ); */
                                  test(
                                    "test buffer map",
                                    () => {
                                      let _hasMapData = (index, map) =>
                                        map |> WonderCommonlib.SparseMapService.has(index);
                                      open MainStateDataType;
                                      open VboBufferType;
                                      let state =
                                        SettingTool.setMemory(state^, ~maxDisposeCount=1, ());
                                      let (state, gameObject1, geometry1, _, _) =
                                        RenderJobsTool.prepareGameObject(sandbox, state);
                                      let (state, _, _, _) =
                                        CameraTool.createCameraGameObject(state);
                                      let buffer = Obj.magic(10);
                                      let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                                      createBuffer |> returns(buffer) |> ignore;
                                      let state =
                                        state
                                        |> FakeGlTool.setFakeGl(
                                             FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ())
                                           );
                                      let state = state |> RenderJobsTool.initSystemAndRender;
                                      /* let state = state |> WebGLRenderTool.render; */
                                      let state = state |> DirectorTool.runWithDefaultTime;
                                      let state =
                                        state
                                        |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(
                                             gameObject1,
                                             geometry1
                                           );
                                      let {vertexBufferMap, elementArrayBufferMap} =
                                        VboBufferTool.getData(state);
                                      (
                                        _hasMapData(0, vertexBufferMap),
                                        _hasMapData(0, elementArrayBufferMap)
                                      )
                                      |> expect == (false, false)
                                    }
                                  )
                              )
                            }
                          );
                          /* test(
                               "reset mappedIndex to alive geometry's count",
                               () => {
                                 open MainStateDataType;
                                 let (
                                   state,
                                   gameObject1,
                                   geometry1,
                                   gameObject2,
                                   geometry2,
                                   gameObject3,
                                   geometry3
                                 ) =
                                   _prepare(state^);
                                 let state =
                                   state
                                   |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(
                                        gameObject1,
                                        geometry1
                                      );
                                 let {mappedIndex, disposedIndexMap} =
                                   state |> BoxGeometryTool.getData;
                                 let state =
                                   state
                                   |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(
                                        gameObject3,
                                        geometry3
                                      );
                                 let {mappedIndex} = state |> BoxGeometryTool.getData;
                                 mappedIndex |> expect == 1
                               }
                             ); */
                          test(
                            "reset offset",
                            () => {
                              open MainStateDataType;
                              let (
                                state,
                                gameObject1,
                                geometry1,
                                gameObject2,
                                geometry2,
                                gameObject3,
                                geometry3
                              ) =
                                _prepare(state^);
                              let state =
                                state
                                |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(
                                     gameObject1,
                                     geometry1
                                   );
                              let state =
                                state
                                |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(
                                     gameObject3,
                                     geometry3
                                   );
                              let {verticesOffset, normalsOffset, indicesOffset} =
                                state |> BoxGeometryTool.getData;
                              (verticesOffset, normalsOffset, indicesOffset)
                              |> expect == (72, 72, 36)
                            }
                          );
                          test(
                            "clean disposedIndexMap",
                            () => {
                              open MainStateDataType;
                              let (
                                state,
                                gameObject1,
                                geometry1,
                                gameObject2,
                                geometry2,
                                gameObject3,
                                geometry3
                              ) =
                                _prepare(state^);
                              let state =
                                state
                                |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(
                                     gameObject1,
                                     geometry1
                                   );
                              let {disposedIndexMap} = state |> BoxGeometryTool.getData;
                              disposedIndexMap
                              |> expect == WonderCommonlib.SparseMapService.createEmpty()
                            }
                          );
                          test(
                            "reset aliveIndexArray",
                            () => {
                              open MainStateDataType;
                              let (
                                state,
                                gameObject1,
                                geometry1,
                                gameObject2,
                                geometry2,
                                gameObject3,
                                geometry3
                              ) =
                                _prepare(state^);
                              let state = state |> GameObjectAPI.disposeGameObject(gameObject1);
                              let (state, gameObject4, geometry4) =
                                BoxGeometryTool.createGameObject(state);
                              let state = state |> GameObjectAPI.initGameObject(gameObject4);
                              let state = state |> GameObjectAPI.disposeGameObject(gameObject4);
                              let {aliveIndexArray} = state |> BoxGeometryTool.getData;
                              aliveIndexArray |> expect == [|geometry2, geometry3|]
                            }
                          );
                          describe(
                            "test add new one after dispose old one",
                            () => {
                              describe(
                                "if has disposed one",
                                () =>
                                  test(
                                    "use disposed index as new index",
                                    () => {
                                      open MainStateDataType;
                                      let (
                                        state,
                                        gameObject1,
                                        geometry1,
                                        gameObject2,
                                        geometry2,
                                        gameObject3,
                                        geometry3
                                      ) =
                                        _prepare(state^);
                                      let state =
                                        state
                                        |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(
                                             gameObject2,
                                             geometry2
                                           );
                                      let (state, gameObject4, geometry4) =
                                        BoxGeometryTool.createGameObject(state);
                                      let state =
                                        state |> GameObjectAPI.initGameObject(gameObject4);
                                      let state =
                                        state
                                        |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(
                                             gameObject4,
                                             geometry4
                                           );
                                      let (state, gameObject5, geometry5) =
                                        BoxGeometryTool.createGameObject(state);
                                      let (state, gameObject6, geometry6) =
                                        BoxGeometryTool.createGameObject(state);
                                      (geometry1, geometry3, geometry5, geometry6)
                                      |> expect == (0, 2, 1, 3)
                                    }
                                  )
                              );
                              test(
                                "else, increase record.index ",
                                () => {
                                  open MainStateDataType;
                                  let (
                                    state,
                                    gameObject1,
                                    geometry1,
                                    gameObject2,
                                    geometry2,
                                    gameObject3,
                                    geometry3
                                  ) =
                                    _prepare(state^);
                                  let (state, gameObject4, geometry4) =
                                    BoxGeometryTool.createGameObject(state);
                                  geometry4 |> expect == geometry3 + 1
                                }
                              )
                            }
                          )
                          /* test(
                               "test hasIndices",
                               () => {
                                 open MainStateDataType;
                                 let (
                                   state,
                                   gameObject1,
                                   geometry1,
                                   gameObject2,
                                   geometry2,
                                   gameObject3,
                                   geometry3
                                 ) =
                                   _prepare(state^);
                                 let state =
                                   state
                                   |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(
                                        gameObject2,
                                        geometry2
                                      );
                                 let (state, gameObject4, geometry4) =
                                   BoxGeometryTool.createGameObject(state);
                                 let state =
                                   state |> GameObjectAPI.initGameObject(gameObject4);
                                 (
                                   GeometryTool.hasIndices(geometry1, state),
                                   GeometryTool.hasIndices(geometry3, state),
                                   GeometryTool.hasIndices(geometry4, state)
                                 )
                                 |> expect == (true, true, true)
                               }
                             ) */
                        }
                      )
                  )
                }
              )
            }
          );
          describe(
            "test add new one after dispose old one",
            () =>
              /* test(
                   "use disposed index as new index firstly",
                   () => {
                     let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
                     let state = state |> GameObjectAPI.initGameObject(gameObject1);
                     let state =
                       VboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(geometry1, state);
                     let state =
                       state |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(gameObject1, geometry1);
                     let (state, geometry2) = createBoxGeometry(state);
                     geometry2 |> expect == geometry1
                   }
                 );
                 test(
                   "if has no disposed index, get index from boxGeometryRecord.index",
                   () => {
                     let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
                     let state = state |> GameObjectAPI.initGameObject(gameObject1);
                     let state =
                       VboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(geometry1, state);
                     let state =
                       state |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(gameObject1, geometry1);
                     let (state, geometry2) = createBoxGeometry(state);
                     let (state, geometry3) = createBoxGeometry(state);
                     (geometry2, geometry3) |> expect == (geometry1, geometry1 + 1)
                   }
                 ); */
              describe(
                "fix bug",
                () =>
                  test(
                    "new one after init should has its own geometry point data",
                    () => {
                      let (state, gameObject1, geometry1) =
                        BoxGeometryTool.createGameObject(state^);
                      let state = state |> GameObjectAPI.initGameObject(gameObject1);
                      let state =
                        VboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(
                          geometry1,
                          state
                        );
                      let state =
                        state
                        |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(
                             gameObject1,
                             geometry1
                           );
                      let (state, geometry2) = createBoxGeometry(state);
                      let state =
                        state
                        |> setBoxGeometryConfigData(
                             geometry2,
                             GeometryTool.buildBoxGeometryConfigDataJsObj(
                               ~width=Js.Nullable.return(20.),
                               ~height=Js.Nullable.return(30.),
                               ~depth=Js.Nullable.return(40.),
                               ()
                             )
                           );
                      let state = state |> GeometryTool.initGeometry(geometry2);
                      (
                        getBoxGeometryVertices(geometry2, state),
                        getBoxGeometryIndices(geometry2, state)
                      )
                      |>
                      expect == (
                                  Float32Array.make([|
                                    (-20.),
                                    (-30.),
                                    40.,
                                    (-20.),
                                    30.,
                                    40.,
                                    20.,
                                    (-30.),
                                    40.,
                                    20.,
                                    30.,
                                    40.,
                                    20.,
                                    (-30.),
                                    (-40.),
                                    20.,
                                    30.,
                                    (-40.),
                                    (-20.),
                                    (-30.),
                                    (-40.),
                                    (-20.),
                                    30.,
                                    (-40.),
                                    (-20.),
                                    30.,
                                    40.,
                                    (-20.),
                                    30.,
                                    (-40.),
                                    20.,
                                    30.,
                                    40.,
                                    20.,
                                    30.,
                                    (-40.),
                                    20.,
                                    (-30.),
                                    40.,
                                    20.,
                                    (-30.),
                                    (-40.),
                                    (-20.),
                                    (-30.),
                                    40.,
                                    (-20.),
                                    (-30.),
                                    (-40.),
                                    20.,
                                    (-30.),
                                    40.,
                                    20.,
                                    30.,
                                    40.,
                                    20.,
                                    (-30.),
                                    (-40.),
                                    20.,
                                    30.,
                                    (-40.),
                                    (-20.),
                                    (-30.),
                                    (-40.),
                                    (-20.),
                                    30.,
                                    (-40.),
                                    (-20.),
                                    (-30.),
                                    40.,
                                    (-20.),
                                    30.,
                                    40.
                                  |]),
                                  Uint16Array.make([|
                                    0,
                                    2,
                                    1,
                                    2,
                                    3,
                                    1,
                                    4,
                                    6,
                                    5,
                                    6,
                                    7,
                                    5,
                                    8,
                                    10,
                                    9,
                                    10,
                                    11,
                                    9,
                                    12,
                                    14,
                                    13,
                                    14,
                                    15,
                                    13,
                                    16,
                                    18,
                                    17,
                                    18,
                                    19,
                                    17,
                                    20,
                                    22,
                                    21,
                                    22,
                                    23,
                                    21
                                  |])
                                )
                    }
                  )
              )
          );
          describe(
            "contract check",
            () =>
              test(
                "shouldn't dispose the alive component",
                () => {
                  let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
                  let state = state |> GameObjectAPI.initGameObject(gameObject1);
                  let state =
                    VboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(geometry1, state);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(gameObject1, geometry1);
                  expect(
                    () => {
                      let state =
                        state
                        |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(
                             gameObject1,
                             geometry1
                           );
                      ()
                    }
                  )
                  |> toThrowMessage("expect dispose the alive component, but actual not")
                }
              )
          )
        }
      );
      describe(
        "contract check",
        () =>
          describe(
            "check is alive",
            () =>
              describe(
                "if geometry is disposed",
                () => {
                  let _testGetFunc = (getFunc) => {
                    open GameObjectAPI;
                    open GameObjectAPI;
                    let (state, gameObject, geometry) = BoxGeometryTool.createGameObject(state^);
                    let state = state |> GeometryTool.initGeometrys;
                    let state =
                      VboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(geometry, state);
                    let state =
                      state
                      |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(gameObject, geometry);
                    expect(() => getFunc(geometry, state))
                    |> toThrowMessage("expect component alive, but actual not")
                  };
                  let _testSetFunc = (setFunc) => {
                    open GameObjectAPI;
                    open GameObjectAPI;
                    let (state, gameObject, geometry) = BoxGeometryTool.createGameObject(state^);
                    let state = state |> GeometryTool.initGeometrys;
                    let state =
                      VboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(geometry, state);
                    let state =
                      state
                      |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(gameObject, geometry);
                    expect(() => setFunc(geometry, Obj.magic(0), state))
                    |> toThrowMessage("expect component alive, but actual not")
                  };
                  test(
                    "getBoxGeometryVertices should error",
                    () => _testGetFunc(getBoxGeometryVertices)
                  );
                  test(
                    "getBoxGeometryNormals should error",
                    () => _testGetFunc(getBoxGeometryNormals)
                  );
                  test(
                    "getBoxGeometryIndices should error",
                    () => _testGetFunc(getBoxGeometryIndices)
                  );
                  test(
                    "unsafeGetBoxGeometryConfigData should error",
                    () => _testGetFunc(unsafeGetBoxGeometryConfigData)
                  );
                  test(
                    "unsafeGetBoxGeometryGameObject should error",
                    () => _testGetFunc(unsafeGetBoxGeometryGameObject)
                  );
                  test(
                    "setBoxGeometryVertices should error",
                    () => _testSetFunc(setBoxGeometryVertices)
                  );
                  test(
                    "setBoxGeometryNormals should error",
                    () => _testSetFunc(setBoxGeometryNormals)
                  );
                  test(
                    "setBoxGeometryIndices should error",
                    () => _testSetFunc(setBoxGeometryIndices)
                  )
                }
              )
          )
      )
    }
  );