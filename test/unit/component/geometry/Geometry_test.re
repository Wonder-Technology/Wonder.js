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
                  let state = state |> GeometryTool.dispose(geometry1);
                  expect(
                    () => {
                      let state = state |> GeometryTool.initGeometrys;
                      ()
                    }
                  )
                  |> toThrowMessage("shouldn't dispose any geometry before init")
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
        "disposeComponent",
        () => {
          describe(
            "test reallocate geometry",
            () =>
              describe(
                "if have dispose too many geometrys, reallocate geometry",
                () => {
                  let _prepare = (state) => {
                    let state = MemoryConfigTool.setConfig(state, ~maxDisposeCount=1, ());
                    let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state);
                    let (state, gameObject2, geometry2) = BoxGeometryTool.createGameObject(state);
                    let (state, gameObject3, geometry3) = BoxGeometryTool.createGameObject(state);
                    TestTool.closeContractCheck();
                    let state = state |> GeometryTool.initGeometrys;
                    (state, gameObject1, geometry1, gameObject2, geometry2, gameObject3, geometry3)
                  };
                  describe(
                    "test type array data",
                    () =>
                      describe(
                        "pack old type array with alived data",
                        () => {
                          test(
                            "alive geometry's vertices should exist",
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
                                |> GameObject.disposeGameObjectGeometryComponent(
                                     gameObject1,
                                     geometry1
                                   );
                              (
                                getGeometryVertices(geometry2, state),
                                getGeometryIndices(geometry2, state),
                                getGeometryVertices(geometry3, state),
                                getGeometryIndices(geometry3, state)
                              )
                              |>
                              expect == (
                                          BoxGeometryTool.getDefaultVertices(),
                                          BoxGeometryTool.getDefaultIndices(),
                                          BoxGeometryTool.getDefaultVertices(),
                                          BoxGeometryTool.getDefaultIndices()
                                        )
                            }
                          );
                          test(
                            "type array should be packed",
                            () => {
                              open Js_typed_array;
                              open StateDataType;
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
                                |> GameObject.disposeGameObjectGeometryComponent(
                                     gameObject2,
                                     geometry2
                                   );
                              let {vertices, indices} = state |> GeometryTool.getData;
                              (
                                vertices |> Float32Array.slice(~start=0, ~end_=72),
                                vertices |> Float32Array.slice(~start=72, ~end_=144),
                                indices |> Uint16Array.slice(~start=0, ~end_=36),
                                indices |> Uint16Array.slice(~start=36, ~end_=72)
                              )
                              |>
                              expect == (
                                          BoxGeometryTool.getDefaultVertices(),
                                          BoxGeometryTool.getDefaultVertices(),
                                          BoxGeometryTool.getDefaultIndices(),
                                          BoxGeometryTool.getDefaultIndices()
                                        )
                            }
                          )
                        }
                      )
                  );
                  test(
                    "all alive geometryIndex are changed",
                    () => {
                      open Js_typed_array;
                      open StateDataType;
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
                        |> GameObject.disposeGameObjectGeometryComponent(gameObject2, geometry2);
                      (
                        GeometryTool.getMappedIndex(geometry1, state),
                        /* GeometryTool.getMappedIndex(geometry2, state), */
                        GeometryTool.getMappedIndex(geometry3, state)
                      )
                      |> expect == (0, 1)
                    }
                  );
                  describe(
                    "test new info array",
                    () => {
                      test(
                        "update startIndex, endIndex",
                        () => {
                          open StateDataType;
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
                            |> GameObject.disposeGameObjectGeometryComponent(
                                 gameObject1,
                                 geometry1
                               );
                          let {verticesInfoArray, indicesInfoArray} =
                            state |> GeometryTool.getData;
                          (verticesInfoArray, indicesInfoArray)
                          |>
                          expect == (
                                      [|
                                        GeometryTool.buildInfo(0, 72),
                                        GeometryTool.buildInfo(72, 144)
                                      |],
                                      [|
                                        GeometryTool.buildInfo(0, 36),
                                        GeometryTool.buildInfo(36, 72)
                                      |]
                                    )
                        }
                      );
                      test(
                        "should only has alive data",
                        () => {
                          open StateDataType;
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
                            |> GameObject.disposeGameObjectGeometryComponent(
                                 gameObject1,
                                 geometry1
                               );
                          let {verticesInfoArray, indicesInfoArray} =
                            state |> GeometryTool.getData;
                          (
                            verticesInfoArray |> Js.Array.length,
                            indicesInfoArray |> Js.Array.length
                          )
                          |> expect == (2, 2)
                        }
                      )
                    }
                  );
                  describe(
                    "test reallocate maps",
                    () => {
                      let _hasMapData = (index, map) =>
                        map
                        |> SparseMapSystem.get((index))
                        |> Js.Option.isSome;
                      let _unsafeGetSparseMapData = (index, map, state) =>
                        map
                        |> SparseMapSystem.unsafeGet(
                             GeometryTool.getMappedIndex(index, state)
                           );
                      let _unsafeGetMapData = (index, map, state) =>
                        map
                        |> SparseMapSystem.unsafeGet(
                             (GeometryTool.getMappedIndex(index, state))
                           );
                      describe(
                        "maps should only has alive data",
                        () => {
                          describe(
                            "test gameObjectMap",
                            () => {
                              test(
                                "test gameObjectMap",
                                () => {
                                  open StateDataType;
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
                                    |> GameObject.disposeGameObjectGeometryComponent(
                                         gameObject1,
                                         geometry1
                                       );
                                  let {gameObjectMap} = state |> GeometryTool.getData;
                                  (
                                    _unsafeGetSparseMapData(geometry2, gameObjectMap, state),
                                    _unsafeGetSparseMapData(geometry3, gameObjectMap, state)
                                  )
                                  |> expect == (gameObject2, gameObject3)
                                }
                              );
                              test(
                                "test Geometry.getGeometryGameObject",
                                () => {
                                  open StateDataType;
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
                                    |> GameObject.disposeGameObjectGeometryComponent(
                                         gameObject1,
                                         geometry1
                                       );
                                  let {gameObjectMap} = state |> GeometryTool.getData;
                                  (
                                    Geometry.getGeometryGameObject(geometry2, state),
                                    Geometry.getGeometryGameObject(geometry3, state)
                                  )
                                  |> expect == (gameObject2, gameObject3)
                                }
                              )
                            }
                          );
                          test(
                            "test configDataMap, computeDataFuncMap, indicesCountCacheMap, verticesCountCacheMap",
                            () => {
                              open StateDataType;
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
                              let _ = state |> GeometryTool.getVerticesCount(geometry1);
                              let _ = state |> GeometryTool.getVerticesCount(geometry2);
                              let _ = state |> GeometryTool.getVerticesCount(geometry3);
                              let _ = state |> GeometryTool.getIndicesCount(geometry1);
                              let _ = state |> GeometryTool.getIndicesCount(geometry2);
                              let _ = state |> GeometryTool.getIndicesCount(geometry3);
                              let state =
                                state
                                |> GameObject.disposeGameObjectGeometryComponent(
                                     gameObject1,
                                     geometry1
                                   );
                              let {
                                configDataMap,
                                computeDataFuncMap,
                                indicesCountCacheMap,
                                verticesCountCacheMap
                              } =
                                state |> GeometryTool.getData;
                              (
                                _hasMapData(0, configDataMap),
                                _hasMapData(1, configDataMap),
                                _hasMapData(2, configDataMap),
                                _hasMapData(0, computeDataFuncMap),
                                _hasMapData(1, computeDataFuncMap),
                                _hasMapData(2, computeDataFuncMap),
                                _hasMapData(0, verticesCountCacheMap),
                                _hasMapData(1, verticesCountCacheMap),
                                _hasMapData(2, verticesCountCacheMap),
                                _hasMapData(0, indicesCountCacheMap),
                                _hasMapData(1, indicesCountCacheMap),
                                _hasMapData(2, indicesCountCacheMap)
                              )
                              |>
                              expect == (
                                          true,
                                          true,
                                          false,
                                          true,
                                          true,
                                          false,
                                          true,
                                          true,
                                          false,
                                          true,
                                          true,
                                          false
                                        )
                            }
                          );
                          test(
                            "test isClonedMap",
                            () => {
                              open StateDataType;
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
                              let (state, _, _, _, clonedGeometryArr1) =
                                CloneTool.cloneWithGeometry(state, gameObject1, geometry1, 1);
                              let (state, _, _, _, clonedGeometryArr2) =
                                CloneTool.cloneWithGeometry(state, gameObject2, geometry2, 1);
                              let (state, _, _, _, clonedGeometryArr3) =
                                CloneTool.cloneWithGeometry(state, gameObject3, geometry3, 1);
                              let state =
                                state
                                |> GameObject.disposeGameObjectGeometryComponent(
                                     gameObject1,
                                     geometry1
                                   );
                              let {isClonedMap} = state |> GeometryTool.getData;
                              (
                                _hasMapData(0, isClonedMap),
                                _hasMapData(1, isClonedMap),
                                _hasMapData(2, isClonedMap),
                                _hasMapData(3, isClonedMap),
                                _hasMapData(4, isClonedMap)
                              )
                              |> expect == (false, false, true, true, true)
                            }
                          );
                          test(
                            "test buffer map",
                            () => {
                              let _hasMapData = (index, map) => map |> SparseMapSystem.has(index);
                              open StateDataType;
                              open VboBufferType;
                              let state =
                                MemoryConfigTool.setConfig(state^, ~maxDisposeCount=1, ());
                              let (state, gameObject1, geometry1, _, _) =
                                RenderJobsTool.prepareGameObject(sandbox, state);
                              let (state, _, _, _) =
                                CameraControllerTool.createCameraGameObject(state);
                              let buffer = Obj.magic(10);
                              let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
                              createBuffer |> returns(buffer) |> ignore;
                              let state =
                                state
                                |> FakeGlTool.setFakeGl(
                                     FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ())
                                   );
                              let state = state |> RenderJobsTool.initSystemAndRender;
                              let state = state |> WebGLRenderTool.render;
                              let state =
                                state
                                |> GameObject.disposeGameObjectGeometryComponent(
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
                        }
                      )
                    }
                  );
                  test(
                    "reset mappedIndex to alive geometry's count",
                    () => {
                      open StateDataType;
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
                        |> GameObject.disposeGameObjectGeometryComponent(gameObject1, geometry1);
                      let {mappedIndex, disposedIndexMap} = state |> GeometryTool.getData;
                      let state =
                        state
                        |> GameObject.disposeGameObjectGeometryComponent(gameObject3, geometry3);
                      let {mappedIndex} = state |> GeometryTool.getData;
                      mappedIndex |> expect == 1
                    }
                  );
                  test(
                    "reset offset",
                    () => {
                      open StateDataType;
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
                        |> GameObject.disposeGameObjectGeometryComponent(gameObject1, geometry1);
                      let state =
                        state
                        |> GameObject.disposeGameObjectGeometryComponent(gameObject3, geometry3);
                      let {verticesOffset, indicesOffset} = state |> GeometryTool.getData;
                      (verticesOffset, indicesOffset) |> expect == (72, 36)
                    }
                  );
                  test(
                    "clean disposedIndexMap",
                    () => {
                      open StateDataType;
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
                        |> GameObject.disposeGameObjectGeometryComponent(gameObject1, geometry1);
                      let {disposedIndexMap} = state |> GeometryTool.getData;
                      disposedIndexMap |> expect == SparseMapSystem.createEmpty()
                    }
                  );
                  test(
                    "reset aliveIndexArray",
                    () => {
                      open StateDataType;
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
                      let state = state |> GameObject.disposeGameObject(gameObject1);
                      let (state, gameObject4, geometry4) =
                        BoxGeometryTool.createGameObject(state);
                      let state = state |> GameObject.initGameObject(gameObject4);
                      let state = state |> GameObject.disposeGameObject(gameObject4);
                      let {aliveIndexArray} = state |> GeometryTool.getData;
                      aliveIndexArray |> expect == [|geometry2, geometry3|]
                    }
                  );
                  describe(
                    "fix bug",
                    () =>
                      describe(
                        "test add new one after dispose old one",
                        () => {
                          describe(
                            "the new one's mappedIndex should be correct",
                            () => {
                              test(
                                "test1",
                                () => {
                                  open StateDataType;
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
                                    |> GameObject.disposeGameObjectGeometryComponent(
                                         gameObject2,
                                         geometry2
                                       );
                                  let (state, gameObject4, geometry4) =
                                    BoxGeometryTool.createGameObject(state);
                                  let state = state |> GameObject.initGameObject(gameObject4);
                                  let state =
                                    state
                                    |> GameObject.disposeGameObjectGeometryComponent(
                                         gameObject4,
                                         geometry4
                                       );
                                  let (state, gameObject5, geometry5) =
                                    BoxGeometryTool.createGameObject(state);
                                  let state = state |> GameObject.initGameObject(gameObject5);
                                  (
                                    GeometryTool.getMappedIndex(geometry1, state),
                                    GeometryTool.getMappedIndex(geometry3, state),
                                    GeometryTool.getMappedIndex(geometry5, state)
                                  )
                                  |> expect == (0, 1, 2)
                                }
                              );
                              test(
                                "test2",
                                () => {
                                  open StateDataType;
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
                                    |> GameObject.disposeGameObjectGeometryComponent(
                                         gameObject2,
                                         geometry2
                                       );
                                  let (state, gameObject4, geometry4) =
                                    BoxGeometryTool.createGameObject(state);
                                  let state = state |> GameObject.initGameObject(gameObject4);
                                  let (state, gameObject5, geometry5) =
                                    BoxGeometryTool.createGameObject(state);
                                  let state = state |> GameObject.initGameObject(gameObject5);
                                  let state =
                                    state
                                    |> GameObject.disposeGameObjectGeometryComponent(
                                         gameObject5,
                                         geometry5
                                       );
                                  (
                                    GeometryTool.getMappedIndex(geometry1, state),
                                    GeometryTool.getMappedIndex(geometry3, state),
                                    GeometryTool.getMappedIndex(geometry4, state)
                                  )
                                  |> expect == (0, 1, 2)
                                }
                              )
                            }
                          );
                          test(
                            "test hasIndices",
                            () => {
                              open StateDataType;
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
                                |> GameObject.disposeGameObjectGeometryComponent(
                                     gameObject2,
                                     geometry2
                                   );
                              let (state, gameObject4, geometry4) =
                                BoxGeometryTool.createGameObject(state);
                              let state = state |> GameObject.initGameObject(gameObject4);
                              (
                                GeometryTool.hasIndices((geometry1), state),
                                GeometryTool.hasIndices((geometry3), state),
                                GeometryTool.hasIndices((geometry4), state)
                              )
                              |> expect == (true, true, true)
                            }
                          )
                        }
                      )
                  )
                }
              )
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
        () => {
          describe(
            "check set point data: should not exceed geometryPointDataBufferCount",
            () => {
              let errMeg = "should not exceed geometryPointDataBufferCount";
              let _prepare = () => {
                let state =
                  TestTool.init(
                    ~bufferConfig=Js.Nullable.return(GeometryTool.buildBufferConfig(5)),
                    ()
                  );
                createBoxGeometry(state)
              };
              test(
                "check setVertices",
                () => {
                  let (state, geometry) = _prepare();
                  expect(
                    () =>
                      state
                      |> setGeometryVertices(
                           geometry,
                           Float32Array.make([|1., 2., 3., 1., 2., 3.|])
                         )
                      |> ignore
                  )
                  |> toThrowMessage(errMeg)
                }
              );
              test(
                "check setIndices",
                () => {
                  let (state, geometry) = _prepare();
                  expect(
                    () =>
                      state
                      |> setGeometryIndices(geometry, Uint16Array.make([|1, 2, 3, 1, 2, 4|]))
                      |> ignore
                  )
                  |> toThrowMessage("sourceTypeArr.length + offset should <= targetTypeArr.length")
                }
              )
            }
          );
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
          );
          describe(
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
          )
        }
      )
    }
  );