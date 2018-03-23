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
                      BoxGeometryTool.getGroupCount(geometry1, state) |> expect == 1
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
                  test(
                    "remove from groupCountMap, configDataMap, isInitMap, computeDataFuncMap, gameObjectMap",
                    () => {
                      open MainStateDataType;
                      let (state, gameObject1, geometry1) = _prepare(state);
                      let {
                        groupCountMap,
                        configDataMap,
                        isInitMap,
                        computeDataFuncMap,
                        gameObjectMap
                      } =
                        RecordBoxGeometryMainService.getRecord(state);
                      (
                        groupCountMap |> WonderCommonlib.SparseMapService.has(geometry1),
                        configDataMap |> WonderCommonlib.SparseMapService.has(geometry1),
                        isInitMap |> WonderCommonlib.SparseMapService.has(geometry1),
                        computeDataFuncMap |> WonderCommonlib.SparseMapService.has(geometry1),
                        gameObjectMap |> WonderCommonlib.SparseMapService.has(geometry1)
                      )
                      |> expect == (false, false, false, false, false)
                    }
                  );
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
                  )
                }
              )
            }
          );
          describe(
            "test add new one after dispose old one",
            () => {
              test(
                "use disposed index as new index firstly",
                () => {
                  let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
                  let state = state |> GameObjectAPI.initGameObject(gameObject1);
                  let state =
                    VboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(geometry1, state);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(gameObject1, geometry1);
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
                    state
                    |> GameObjectAPI.disposeGameObjectBoxGeometryComponent(gameObject1, geometry1);
                  let (state, geometry2) = createBoxGeometry(state);
                  let (state, geometry3) = createBoxGeometry(state);
                  (geometry2, geometry3) |> expect == (geometry1, geometry1 + 1)
                }
              );
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
            }
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
                  )
                }
              )
          )
      )
    }
  );