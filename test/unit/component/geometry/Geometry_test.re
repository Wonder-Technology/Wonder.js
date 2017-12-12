open Geometry;

open BoxGeometry;

open Wonder_jest;

open Js.Typed_array;

let _ =
  describe(
    "Geometry",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            TestTool.init(
              ~sandbox,
              ~bufferConfig=Js.Nullable.return(GeometryTool.buildBufferConfig(1000)),
              ()
            )
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "init",
        () => {
          describe(
            "init all geometrys",
            () => {
              let _prepare = () => {
                let (state, geometry1) = createBoxGeometry(state^);
                let (state, geometry2) = createBoxGeometry(state);
                let state = state |> BoxGeometryTool.setDefaultConfigData(geometry1);
                let state = state |> BoxGeometryTool.setDefaultConfigData(geometry2);
                (state, geometry1, geometry2)
              };
              test(
                "compute and set vertices",
                () => {
                  let (state, geometry1, geometry2) = _prepare();
                  let state = state |> GeometryTool.initGeometrys;
                  (getGeometryVertices(geometry1, state), getGeometryVertices(geometry2, state))
                  |>
                  expect == (
                              BoxGeometryTool.getDefaultVertices(),
                              BoxGeometryTool.getDefaultVertices()
                            )
                }
              );
              test(
                "compute and set indices",
                () => {
                  let (state, geometry1, geometry2) = _prepare();
                  let state = state |> GeometryTool.initGeometrys;
                  (getGeometryIndices(geometry1, state), getGeometryIndices(geometry2, state))
                  |>
                  expect == (
                              BoxGeometryTool.getDefaultIndices(),
                              BoxGeometryTool.getDefaultIndices()
                            )
                }
              )
            }
          );
          describe(
            "contract check",
            () =>
              test(
                "shouldn't dispose any geometry before init",
                () => {
                  let (state, geometry1) = BoxGeometryTool.createBoxGeometry(state^);
                  let (state, geometry2) = BoxGeometryTool.createBoxGeometry(state);
                  let state =
                    VboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(geometry1, state);
                  expect(
                    () => {
                      let state = state |> GeometryTool.dispose(geometry1);
                      ()
                    }
                  )
                  |> toThrowMessage("vertices should exist")
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
              state |> getGeometryDrawMode |> expect == triangles
            }
          )
      );
      describe(
        "getGeometryGameObject",
        () =>
          test(
            "get geometry's gameObject",
            () => {
              open GameObject;
              let (state, geometry) = createBoxGeometry(state^);
              let (state, gameObject) = state |> createGameObject;
              let state = state |> addGameObjectGeometryComponent(gameObject, geometry);
              state |> getGeometryGameObject(geometry) |> expect == gameObject
            }
          )
      );
      describe(
        "dispose component",
        () => {
          describe(
            "dispose data",
            () => {
              test(
                "remove from verticesMap, indicesMap, configDataMap, isInitMap, computeDataFuncMap, gameObjectMap",
                () => {
                  open StateDataType;
                  let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
                  let state =
                    VboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(geometry1, state);
                  let state = state |> GeometryTool.initGeometrys;
                  let state =
                    state |> GameObject.disposeGameObjectGeometryComponent(gameObject1, geometry1);
                  let {
                    verticesMap,
                    indicesMap,
                    configDataMap,
                    isInitMap,
                    computeDataFuncMap,
                    gameObjectMap
                  } =
                    GeometryTool.getGeometryData(state);
                  (
                    verticesMap |> WonderCommonlib.SparseMapSystem.has(geometry1),
                    indicesMap |> WonderCommonlib.SparseMapSystem.has(geometry1),
                    configDataMap |> WonderCommonlib.SparseMapSystem.has(geometry1),
                    isInitMap |> WonderCommonlib.SparseMapSystem.has(geometry1),
                    computeDataFuncMap |> WonderCommonlib.SparseMapSystem.has(geometry1),
                    gameObjectMap |> WonderCommonlib.SparseMapSystem.has(geometry1)
                  )
                  |> expect == (false, false, false, false, false, false)
                }
              );
              test(
                "reset group count",
                () => {
                  let (state, geometry1) = createBoxGeometry(state^);
                  let (state, gameObject1) = GameObject.createGameObject(state);
                  let state =
                    state |> GameObject.addGameObjectGeometryComponent(gameObject1, geometry1);
                  let (state, gameObject2) = GameObject.createGameObject(state);
                  let state =
                    state |> GameObject.addGameObjectGeometryComponent(gameObject2, geometry1);
                  let state =
                    state |> GameObject.disposeGameObjectGeometryComponent(gameObject1, geometry1);
                  GeometryTool.getGroupCount(geometry1, state) |> expect == 0
                }
              );
              test(
                "remove from buffer map",
                () => {
                  open VboBufferType;
                  let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
                  let state =
                    VboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(geometry1, state);
                  let state = state |> GeometryTool.initGeometrys;
                  let state =
                    state |> GameObject.disposeGameObjectGeometryComponent(gameObject1, geometry1);
                  let {vertexBufferMap, elementArrayBufferMap} =
                    VboBufferTool.getVboBufferData(state);
                  (
                    vertexBufferMap |> WonderCommonlib.SparseMapSystem.has(geometry1),
                    elementArrayBufferMap |> WonderCommonlib.SparseMapSystem.has(geometry1)
                  )
                  |> expect == (false, false)
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
                  let state = state |> GameObject.initGameObject(gameObject1);
                  let state =
                    VboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(geometry1, state);
                  let state =
                    state |> GameObject.disposeGameObjectGeometryComponent(gameObject1, geometry1);
                  let (state, geometry2) = createBoxGeometry(state);
                  geometry2 |> expect == geometry1
                }
              );
              test(
                "if has no disposed index, get index from geometryData.index",
                () => {
                  let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
                  let state = state |> GameObject.initGameObject(gameObject1);
                  let state =
                    VboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(geometry1, state);
                  let state =
                    state |> GameObject.disposeGameObjectGeometryComponent(gameObject1, geometry1);
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
                      let state = state |> GameObject.initGameObject(gameObject1);
                      let state =
                        VboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(
                          geometry1,
                          state
                        );
                      let state =
                        state
                        |> GameObject.disposeGameObjectGeometryComponent(gameObject1, geometry1);
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
                      (getGeometryVertices(geometry2, state), getGeometryIndices(geometry2, state))
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
                "shouldn't dispose the component which isn't alive",
                () => {
                  let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
                  let state = state |> GameObject.initGameObject(gameObject1);
                  let state =
                    VboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(geometry1, state);
                  let state =
                    state |> GameObject.disposeGameObjectGeometryComponent(gameObject1, geometry1);
                  expect(
                    () => {
                      let state =
                        state
                        |> GameObject.disposeGameObjectGeometryComponent(gameObject1, geometry1);
                      ()
                    }
                  )
                  |> toThrowMessage("shouldn't dispose the component which isn't alive")
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
                    open GameObject;
                    let (state, gameObject, geometry) = BoxGeometryTool.createGameObject(state^);
                    let state = state |> GeometryTool.initGeometrys;
                    let state =
                      VboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(geometry, state);
                    let state =
                      state |> GameObject.disposeGameObjectGeometryComponent(gameObject, geometry);
                    expect(() => getFunc(geometry, state))
                    |> toThrowMessage("component should alive")
                  };
                  let _testSetFunc = (setFunc) => {
                    open GameObject;
                    let (state, gameObject, geometry) = BoxGeometryTool.createGameObject(state^);
                    let state = state |> GeometryTool.initGeometrys;
                    let state =
                      VboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(geometry, state);
                    let state =
                      state |> GameObject.disposeGameObjectGeometryComponent(gameObject, geometry);
                    expect(() => setFunc(geometry, Obj.magic(0), state))
                    |> toThrowMessage("component should alive")
                  };
                  test(
                    "getGeometryVertices should error",
                    () => _testGetFunc(getGeometryVertices)
                  );
                  test("getGeometryIndices should error", () => _testGetFunc(getGeometryIndices));
                  test(
                    "getGeometryConfigData should error",
                    () => _testGetFunc(getGeometryConfigData)
                  );
                  test(
                    "getGeometryGameObject should error",
                    () => _testGetFunc(getGeometryGameObject)
                  );
                  test(
                    "setGeometryVertices should error",
                    () => _testSetFunc(setGeometryVertices)
                  );
                  test("setGeometryIndices should error", () => _testSetFunc(setGeometryIndices))
                }
              )
          )
      )
      /* describe(
           "check getGeometryConfigData",
           () =>
             test(
               "cloned geometry have no config data, shouldn't get it",
               () => {
                 open StateDataType;
                 let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
                 let state = state |> GeometryTool.initGeometrys;
                 let (state, _, _, _, clonedGeometryArr) =
                   CloneTool.cloneWithGeometry(state, gameObject1, geometry1, 1);
                 expect(() => state |> Geometry.getGeometryConfigData(clonedGeometryArr[0]))
                 |> toThrowMessage("cloned geometry have no config data, shouldn't get it")
               }
             )
         ) */
    }
  );