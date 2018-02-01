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
      let state = ref(StateTool.createState());
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
                "compute and set normals",
                () => {
                  let (state, geometry1, geometry2) = _prepare();
                  let state = state |> GeometryTool.initGeometrys;
                  (getGeometryNormals(geometry1, state), getGeometryNormals(geometry2, state))
                  |>
                  expect == (
                              BoxGeometryTool.getDefaultNormals(),
                              BoxGeometryTool.getDefaultNormals()
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
                  |> toThrow
                }
              )
          )
        }
      );
      describe(
        "test set points",
        () => {
          let _testSetVertexDataWithArray = (type_, getFunc, setFunc) =>
            test(
              {j|if $type_ already exist, fill new data in it|j},
              () => {
                open GameObject;
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
                open GameObject;
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
                getGeometryVertices,
                GeometryTool.setVerticesWithArray
              )
          );
          describe(
            "set vertices with type array",
            () =>
              _testSetVertexDataWithTypeArray("vertices", getGeometryVertices, setGeometryVertices)
          );
          describe(
            "set normals with array",
            () =>
              _testSetVertexDataWithArray(
                "normals",
                getGeometryNormals,
                GeometryTool.setNormalsWithArray
              )
          );
          describe(
            "set normals with type array",
            () =>
              _testSetVertexDataWithTypeArray("normals", getGeometryNormals, setGeometryNormals)
          );
          describe(
            "set indices with array",
            () =>
              test(
                "if indices already exist, fill new data in it",
                () => {
                  open GameObject;
                  let (state, geometry) = createBoxGeometry(state^);
                  let state = state |> GeometryTool.setIndicesWithArray(geometry, [|1, 2, 3|]);
                  let newData = [|3, 3, 5|];
                  let state = state |> GeometryTool.setIndicesWithArray(geometry, newData);
                  getGeometryIndices(geometry, state) |> expect == Uint16Array.make(newData)
                }
              )
          );
          describe(
            "set indices with type array",
            () =>
              test(
                "directly set it",
                () => {
                  open GameObject;
                  let (state, geometry) = createBoxGeometry(state^);
                  let state = state |> GeometryTool.setIndicesWithArray(geometry, [|1, 2, 3|]);
                  let newData = Uint16Array.make([|3, 5, 5|]);
                  let state = state |> setGeometryIndices(geometry, newData);
                  getGeometryIndices(geometry, state) |> expect == newData
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
              let _prepare = (state) => {
                let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
                let state =
                  VboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(geometry1, state);
                let state = state |> GeometryTool.initGeometrys;
                let state =
                  state |> GameObject.disposeGameObjectGeometryComponent(gameObject1, geometry1);
                (state, gameObject1, geometry1)
              };
              test(
                "remove from verticesMap, normalsMap, indicesMap, configDataMap, isInitMap, computeDataFuncMap, gameObjectMap",
                () => {
                  open StateDataType;
                  let (state, gameObject1, geometry1) = _prepare(state);
                  let {
                    verticesMap,
                    normalsMap,
                    indicesMap,
                    configDataMap,
                    isInitMap,
                    computeDataFuncMap,
                    gameObjectMap
                  } =
                    GeometryTool.getGeometryData(state);
                  (
                    verticesMap |> WonderCommonlib.SparseMapSystem.has(geometry1),
                    normalsMap |> WonderCommonlib.SparseMapSystem.has(geometry1),
                    indicesMap |> WonderCommonlib.SparseMapSystem.has(geometry1),
                    configDataMap |> WonderCommonlib.SparseMapSystem.has(geometry1),
                    isInitMap |> WonderCommonlib.SparseMapSystem.has(geometry1),
                    computeDataFuncMap |> WonderCommonlib.SparseMapSystem.has(geometry1),
                    gameObjectMap |> WonderCommonlib.SparseMapSystem.has(geometry1)
                  )
                  |> expect == (false, false, false, false, false, false, false)
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
                  let (state, gameObject1, geometry1) = _prepare(state);
                  let {vertexBufferMap, normalBufferMap, elementArrayBufferMap} =
                    VboBufferTool.getVboBufferData(state);
                  (
                    vertexBufferMap |> WonderCommonlib.SparseMapSystem.has(geometry1),
                    normalBufferMap |> WonderCommonlib.SparseMapSystem.has(geometry1),
                    elementArrayBufferMap |> WonderCommonlib.SparseMapSystem.has(geometry1)
                  )
                  |> expect == (false, false, false)
                }
              );
              test(
                "collect typeArr to pool",
                () => {
                  open TypeArrayPoolType;
                  let (state, gameObject1, geometry1) = _prepare(state);
                  let {float32ArrayPoolMap, uint16ArrayPoolMap} =
                    StateTool.getState() |> TypeArrayPoolTool.getTypeArrayPoolData;
                  (
                    float32ArrayPoolMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(
                         BoxGeometryTool.getDefaultVertices() |> Float32Array.length
                       )
                    |> Js.Array.length,
                    uint16ArrayPoolMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(
                         BoxGeometryTool.getDefaultIndices() |> Uint16Array.length
                       )
                    |> Js.Array.length
                  )
                  |> expect == (2, 1)
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
                "shouldn't dispose the alive component",
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
                    open GameObject;
                    let (state, gameObject, geometry) = BoxGeometryTool.createGameObject(state^);
                    let state = state |> GeometryTool.initGeometrys;
                    let state =
                      VboBufferTool.passBufferShouldExistCheckWhenDisposeGeometry(geometry, state);
                    let state =
                      state |> GameObject.disposeGameObjectGeometryComponent(gameObject, geometry);
                    expect(() => getFunc(geometry, state))
                    |> toThrowMessage("expect component alive, but actual not")
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
                    |> toThrowMessage("expect component alive, but actual not")
                  };
                  test(
                    "getGeometryVertices should error",
                    () => _testGetFunc(getGeometryVertices)
                  );
                  test("getGeometryNormals should error", () => _testGetFunc(getGeometryNormals));
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
                  test("setGeometryNormals should error", () => _testSetFunc(setGeometryNormals));
                  test("setGeometryIndices should error", () => _testSetFunc(setGeometryIndices))
                }
              )
          )
      )
    }
  );