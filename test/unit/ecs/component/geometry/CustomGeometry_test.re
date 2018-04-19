open CustomGeometryAPI;

open GeometryType;

open CustomGeometryType;

open Wonder_jest;

open Js.Typed_array;

let _ =
  describe(
    "CustomGeometry",
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
      /* let state = SettingTool.setMemory(state, ~maxDisposeCount=1, ()); */
      describe(
        "createCustomGeometry",
        () =>
          test(
            "create a new geometry which is just index(int)",
            () => {
              let (state, geometry) = createCustomGeometry(state^);
              (RecordCustomGeometryMainService.getRecord(state).index, geometry)
              |> expect == (1, 0)
            }
          )
      );
      describe(
        "test set points",
        () => {
          let _testSetVertexDataWithTypeArray = (type_, getFunc, setFunc) =>
            test(
              {j|directly set it|j},
              () => {
                open GameObjectAPI;
                open GameObjectAPI;
                let (state, geometry) = createCustomGeometry(state^);
                let state = state |> setFunc(geometry, Float32Array.make([|1., 2., 3.|]));
                let newData = Float32Array.make([|3., 5., 5.|]);
                let state = state |> setFunc(geometry, newData);
                getFunc(geometry, state) |> expect == newData
              }
            );
          describe(
            "set vertices with type array",
            () =>
              _testSetVertexDataWithTypeArray(
                "vertices",
                getCustomGeometryVertices,
                setCustomGeometryVertices
              )
          );
          describe(
            "set normals with type array",
            () =>
              _testSetVertexDataWithTypeArray(
                "normals",
                getCustomGeometryNormals,
                setCustomGeometryNormals
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
                  let (state, geometry) = createCustomGeometry(state^);
                  let newData = Uint16Array.make([|3, 5, 5|]);
                  let state = state |> setCustomGeometryIndices(geometry, newData);
                  getCustomGeometryIndices(geometry, state) |> expect == newData
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
              state |> getCustomGeometryDrawMode |> expect == triangles
            }
          )
      );
      describe(
        "unsafeGetCustomGeometryGameObject",
        () =>
          test(
            "get geometry's gameObject",
            () => {
              open GameObjectAPI;
              open GameObjectAPI;
              let (state, geometry) = createCustomGeometry(state^);
              let (state, gameObject) = state |> createGameObject;
              let state = state |> addGameObjectCustomGeometryComponent(gameObject, geometry);
              state |> unsafeGetCustomGeometryGameObject(geometry) |> expect == gameObject
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
                      let (state, geometry1) = createCustomGeometry(state^);
                      let (state, gameObject1) = GameObjectAPI.createGameObject(state);
                      let state =
                        state
                        |> GameObjectAPI.addGameObjectCustomGeometryComponent(
                             gameObject1,
                             geometry1
                           );
                      let (state, gameObject2) = GameObjectAPI.createGameObject(state);
                      let state =
                        state
                        |> GameObjectAPI.addGameObjectCustomGeometryComponent(
                             gameObject2,
                             geometry1
                           );
                      let (state, gameObject3) = GameObjectAPI.createGameObject(state);
                      let state =
                        state
                        |> GameObjectAPI.addGameObjectCustomGeometryComponent(
                             gameObject3,
                             geometry1
                           );
                      let state =
                        state
                        |> GameObjectTool.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(
                             gameObject1,
                             geometry1
                           );
                      CustomGeometryTool.getGroupCount(geometry1, state) |> expect == 1
                    }
                  )
              );
              describe(
                "test dispose not shared geometry",
                () => {
                  let _prepare = (state) => {
                    let (state, gameObject1, geometry1) =
                      CustomGeometryTool.createGameObject(state^);
                    let state =
                      VboBufferTool.passBufferShouldExistCheckWhenDisposeCustomGeometry(
                        geometry1,
                        state
                      );
                    let state =
                      state
                      |> GameObjectTool.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(
                           gameObject1,
                           geometry1
                         );
                    (state, gameObject1, geometry1)
                  };
                  test(
                    "remove from groupCountMap, gameObjectMap",
                    () => {
                      open StateDataMainType;
                      let (state, gameObject1, geometry1) = _prepare(state);
                      let {groupCountMap, gameObjectMap} = CustomGeometryTool.getRecord(state);
                      (
                        groupCountMap |> WonderCommonlib.SparseMapService.has(geometry1),
                        gameObjectMap |> WonderCommonlib.SparseMapService.has(geometry1)
                      )
                      |> expect == (false, false)
                    }
                  );
                  describe(
                    "test reallocate geometry",
                    () =>
                      describe(
                        "if have dispose too many geometrys, reallocate geometry",
                        () => {
                          let _prepare = (state) => {
                            let state = SettingTool.setMemory(state, ~maxDisposeCount=1, ());
                            CustomGeometryTool.createThreeGameObjectsAndSetPointData(state)
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
                                        (gameObject1, gameObject2, gameObject3),
                                        (geometry1, geometry2, geometry3),
                                        (vertices1, vertices2, vertices3),
                                        (normals1, normals2, normals3),
                                        (indices1, indices2, indices3)
                                      ) =
                                        _prepare(state^);
                                      let state =
                                        state
                                        |> GameObjectTool.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(
                                             gameObject1,
                                             geometry1
                                           );
                                      (
                                        getCustomGeometryVertices(geometry2, state),
                                        getCustomGeometryNormals(geometry2, state),
                                        getCustomGeometryIndices(geometry2, state),
                                        getCustomGeometryVertices(geometry3, state),
                                        getCustomGeometryNormals(geometry3, state),
                                        getCustomGeometryIndices(geometry3, state)
                                      )
                                      |>
                                      expect == (
                                                  vertices2,
                                                  normals2,
                                                  indices2,
                                                  vertices3,
                                                  normals3,
                                                  indices3
                                                )
                                    }
                                  );
                                  test(
                                    "type array should be packed",
                                    () => {
                                      open Js_typed_array;
                                      open StateDataMainType;
                                      let (
                                        state,
                                        (gameObject1, gameObject2, gameObject3),
                                        (geometry1, geometry2, geometry3),
                                        (vertices1, vertices2, vertices3),
                                        (normals1, normals2, normals3),
                                        (indices1, indices2, indices3)
                                      ) =
                                        _prepare(state^);
                                      let state =
                                        state
                                        |> GameObjectTool.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(
                                             gameObject2,
                                             geometry2
                                           );
                                      let {vertices, normals, indices} =
                                        state |> CustomGeometryTool.getRecord;
                                      (
                                        vertices |> Float32Array.slice(~start=0, ~end_=10),
                                        normals |> Float32Array.slice(~start=0, ~end_=10),
                                        indices |> Uint16Array.slice(~start=0, ~end_=10)
                                      )
                                      |>
                                      expect == (
                                                  Float32Array.make([|
                                                    10.,
                                                    5.,
                                                    3.,
                                                    2.,
                                                    3.,
                                                    2.,
                                                    0.,
                                                    0.,
                                                    0.,
                                                    0.
                                                  |]),
                                                  Float32Array.make([|
                                                    1.,
                                                    5.,
                                                    1.,
                                                    2.,
                                                    1.,
                                                    2.,
                                                    0.,
                                                    0.,
                                                    0.,
                                                    0.
                                                  |]),
                                                  Uint16Array.make([|
                                                    2,
                                                    3,
                                                    3,
                                                    2,
                                                    3,
                                                    2,
                                                    0,
                                                    0,
                                                    0,
                                                    0
                                                  |])
                                                )
                                    }
                                  )
                                }
                              )
                          );
                          describe(
                            "test info array",
                            () =>
                              test(
                                "update startIndex, endIndex for packed type array",
                                () => {
                                  open StateDataMainType;
                                  let (
                                    state,
                                    (gameObject1, gameObject2, gameObject3),
                                    (geometry1, geometry2, geometry3),
                                    (vertices1, vertices2, vertices3),
                                    (normals1, normals2, normals3),
                                    (indices1, indices2, indices3)
                                  ) =
                                    _prepare(state^);
                                  let state =
                                    state
                                    |> GameObjectTool.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(
                                         gameObject1,
                                         geometry1
                                       );
                                  let {verticesInfoArray, normalsInfoArray, indicesInfoArray} =
                                    state |> CustomGeometryTool.getRecord;
                                  (verticesInfoArray, normalsInfoArray, indicesInfoArray)
                                  |>
                                  expect == (
                                              [|
                                                GeometryTool.buildInfo(0, 1),
                                                GeometryTool.buildInfo(0, 2),
                                                GeometryTool.buildInfo(2, 5)
                                              |],
                                              [|
                                                GeometryTool.buildInfo(0, 1),
                                                GeometryTool.buildInfo(0, 2),
                                                GeometryTool.buildInfo(2, 5)
                                              |],
                                              [|
                                                GeometryTool.buildInfo(0, 1),
                                                GeometryTool.buildInfo(0, 2),
                                                GeometryTool.buildInfo(2, 5)
                                              |]
                                            )
                                }
                              )
                          );
                          test(
                            "reset offset",
                            () => {
                              open StateDataMainType;
                              let (
                                state,
                                (gameObject1, gameObject2, gameObject3),
                                (geometry1, geometry2, geometry3),
                                (vertices1, vertices2, vertices3),
                                (normals1, normals2, normals3),
                                (indices1, indices2, indices3)
                              ) =
                                _prepare(state^);
                              let state =
                                state
                                |> GameObjectTool.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(
                                     gameObject1,
                                     geometry1
                                   );
                              let state =
                                state
                                |> GameObjectTool.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(
                                     gameObject3,
                                     geometry3
                                   );
                              let {verticesOffset, normalsOffset, indicesOffset} =
                                state |> CustomGeometryTool.getRecord;
                              (verticesOffset, normalsOffset, indicesOffset)
                              |>
                              expect == (
                                          vertices2 |> Float32Array.length,
                                          normals2 |> Float32Array.length,
                                          indices2 |> Uint16Array.length
                                        )
                            }
                          );
                          test(
                            "clean disposedIndexMap",
                            () => {
                              open StateDataMainType;
                              let (
                                state,
                                (gameObject1, gameObject2, gameObject3),
                                (geometry1, geometry2, geometry3),
                                (vertices1, vertices2, vertices3),
                                (normals1, normals2, normals3),
                                (indices1, indices2, indices3)
                              ) =
                                _prepare(state^);
                              let state =
                                state
                                |> GameObjectTool.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(
                                     gameObject1,
                                     geometry1
                                   );
                              let {disposedIndexMap} = state |> CustomGeometryTool.getRecord;
                              disposedIndexMap
                              |> expect == WonderCommonlib.SparseMapService.createEmpty()
                            }
                          );
                          test(
                            "reset aliveIndexArray",
                            () => {
                              open StateDataMainType;
                              let (
                                state,
                                (gameObject1, gameObject2, gameObject3),
                                (geometry1, geometry2, geometry3),
                                (vertices1, vertices2, vertices3),
                                (normals1, normals2, normals3),
                                (indices1, indices2, indices3)
                              ) =
                                _prepare(state^);
                              let state = state |> GameObjectTool.disposeGameObject(gameObject1);
                              let (state, gameObject4, geometry4) =
                                CustomGeometryTool.createGameObject(state);
                              let state = state |> GameObjectAPI.initGameObject(gameObject4);
                              let state = state |> GameObjectTool.disposeGameObject(gameObject4);
                              let {aliveIndexArray} = state |> CustomGeometryTool.getRecord;
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
                                      open StateDataMainType;
                                      let (
                                        state,
                                        (gameObject1, gameObject2, gameObject3),
                                        (geometry1, geometry2, geometry3),
                                        (vertices1, vertices2, vertices3),
                                        (normals1, normals2, normals3),
                                        (indices1, indices2, indices3)
                                      ) =
                                        _prepare(state^);
                                      let state =
                                        state
                                        |> GameObjectTool.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(
                                             gameObject2,
                                             geometry2
                                           );
                                      let (state, gameObject4, geometry4) =
                                        CustomGeometryTool.createGameObject(state);
                                      let state =
                                        state |> GameObjectAPI.initGameObject(gameObject4);
                                      let state =
                                        state
                                        |> GameObjectTool.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(
                                             gameObject4,
                                             geometry4
                                           );
                                      let (state, gameObject5, geometry5) =
                                        CustomGeometryTool.createGameObject(state);
                                      let (state, gameObject6, geometry6) =
                                        CustomGeometryTool.createGameObject(state);
                                      (geometry1, geometry3, geometry5, geometry6)
                                      |> expect == (0, 2, 1, 3)
                                    }
                                  )
                              );
                              test(
                                "else, increase record.index ",
                                () => {
                                  open StateDataMainType;
                                  let (
                                    state,
                                    (gameObject1, gameObject2, gameObject3),
                                    (geometry1, geometry2, geometry3),
                                    (vertices1, vertices2, vertices3),
                                    (normals1, normals2, normals3),
                                    (indices1, indices2, indices3)
                                  ) =
                                    _prepare(state^);
                                  let (state, gameObject4, geometry4) =
                                    CustomGeometryTool.createGameObject(state);
                                  geometry4 |> expect == geometry3 + 1
                                }
                              )
                            }
                          )
                        }
                      )
                  )
                }
              )
            }
          );
          describe(
            "contract check",
            () =>
              test(
                "shouldn't dispose the alive component",
                () => {
                  let (state, gameObject1, geometry1) =
                    CustomGeometryTool.createGameObject(state^);
                  let state = state |> GameObjectAPI.initGameObject(gameObject1);
                  let state =
                    VboBufferTool.passBufferShouldExistCheckWhenDisposeCustomGeometry(
                      geometry1,
                      state
                    );
                  let state =
                    state
                    |> GameObjectTool.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(
                         gameObject1,
                         geometry1
                       );
                  expect(
                    () => {
                      let state =
                        state
                        |> GameObjectTool.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(
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
                    let (state, gameObject, geometry) =
                      CustomGeometryTool.createGameObject(state^);
                    let state =
                      VboBufferTool.passBufferShouldExistCheckWhenDisposeCustomGeometry(
                        geometry,
                        state
                      );
                    let state =
                      state
                      |> GameObjectTool.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(
                           gameObject,
                           geometry
                         );
                    expect(() => getFunc(geometry, state))
                    |> toThrowMessage("expect component alive, but actual not")
                  };
                  let _testSetFunc = (setFunc) => {
                    open GameObjectAPI;
                    open GameObjectAPI;
                    let (state, gameObject, geometry) =
                      CustomGeometryTool.createGameObject(state^);
                    let state =
                      VboBufferTool.passBufferShouldExistCheckWhenDisposeCustomGeometry(
                        geometry,
                        state
                      );
                    let state =
                      state
                      |> GameObjectTool.disposeGameObjectCustomGeometryComponentWithoutVboBuffer(
                           gameObject,
                           geometry
                         );
                    expect(() => setFunc(geometry, Obj.magic(0), state))
                    |> toThrowMessage("expect component alive, but actual not")
                  };
                  test(
                    "getCustomGeometryVertices should error",
                    () => _testGetFunc(getCustomGeometryVertices)
                  );
                  test(
                    "getCustomGeometryNormals should error",
                    () => _testGetFunc(getCustomGeometryNormals)
                  );
                  test(
                    "getCustomGeometryIndices should error",
                    () => _testGetFunc(getCustomGeometryIndices)
                  );
                  test(
                    "unsafeGetCustomGeometryGameObject should error",
                    () => _testGetFunc(unsafeGetCustomGeometryGameObject)
                  );
                  test(
                    "setCustomGeometryVertices should error",
                    () => _testSetFunc(setCustomGeometryVertices)
                  );
                  test(
                    "setCustomGeometryNormals should error",
                    () => _testSetFunc(setCustomGeometryNormals)
                  );
                  test(
                    "setCustomGeometryIndices should error",
                    () => _testSetFunc(setCustomGeometryIndices)
                  )
                }
              )
          )
      )
    }
  );