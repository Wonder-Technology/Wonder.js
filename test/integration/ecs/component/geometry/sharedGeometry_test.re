open Wonder_jest;

let _ =
  describe(
    "test shared geometry",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      let _createAndInit = (state) => {
        let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state);
        let (state, gameObject2, geometry2) =
          GeometryGroupTool.createGameObjectWithSharedGeometry(geometry1, state);
        (state |> GeometryTool.initGeometrys, gameObject1, geometry1, gameObject2, geometry2)
      };
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      test(
        "shared geometry can be added to gameObject",
        () => {
          let (state, gameObject1, geometry1, gameObject2, geometry2) = _createAndInit(state^);
          state |> GameObject.getGameObjectGeometryComponent(gameObject2) |> expect == geometry1
        }
      );
      test(
        "shared geometry can get the same gameObject(first gameObject)",
        () => {
          let (state, gameObject1, geometry1, gameObject2, geometry2) = _createAndInit(state^);
          (
            state |> Geometry.getGeometryGameObject(geometry1),
            state |> Geometry.getGeometryGameObject(geometry2)
          )
          |> expect == (gameObject1, gameObject1)
        }
      );
      describe(
        "test clone geometry component",
        () => {
          open GameObject;
          let _createAndInitGameObject = (state) => {
            let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state);
            let state = state |> initGameObject(gameObject1);
            (state, gameObject1, geometry1)
          };
          let _prepare = (state) => {
            open GameObjectType;
            let (state, gameObject1, geometry1) = _createAndInitGameObject(state);
            CloneTool.cloneWithGeometry(state, gameObject1, geometry1, 2)
          };
          let _initClonedGeometrys = (clonedGeometryArr, state) =>
            clonedGeometryArr
            |> ArraySystem.reduceState(
                 [@bs]
                 ((state, clonedGeometry) => GeometryTool.initGeometry(clonedGeometry, state)),
                 state
               );
          /* let _testClonedGeometryVertices = (state, geometry1, clonedGeometryArr) => {
               let sourceVertices = Geometry.getGeometryVertices(geometry1, state);
               clonedGeometryArr
               |> Js.Array.map((geometry) => Geometry.getGeometryVertices(geometry, state))
               |> expect == [|sourceVertices, sourceVertices|]
             };
             let _testClonedGeometryIndices = (state, geometry1, clonedGeometryArr) => {
               let sourceIndices = Geometry.getGeometryIndices(geometry1, state);
               clonedGeometryArr
               |> Js.Array.map((geometry) => Geometry.getGeometryIndices(geometry, state))
               |> expect == [|sourceIndices, sourceIndices|]
             }; */
          /* test(
               "test clone specific count of geometrys",
               () => {
                 let (_, _, _, _, clonedGeometryArr) = _prepare(state^);
                 clonedGeometryArr |> Js.Array.length |> expect == 2
               }
             ); */
          test(
            "cloned geometrys share geometry with source geometry",
            () => {
              let (_, _, geometry, _, clonedGeometryArr) = _prepare(state^);
              clonedGeometryArr |> expect == [|geometry, geometry|]
            }
          );
          /* test(
               "set cloned geometry's vertices by source geometry's vertices",
               () => {
                 let (state, _, geometry1, _, clonedGeometryArr) = _prepare(state^);
                 _testClonedGeometryVertices(state, geometry1, clonedGeometryArr)
               }
             );
             test(
               "set cloned geometry's indices by source geometry's indices",
               () => {
                 let (state, _, geometry1, _, clonedGeometryArr) = _prepare(state^);
                 _testClonedGeometryIndices(state, geometry1, clonedGeometryArr)
               }
             ); */
          describe(
            "test init cloned geometry",
            () =>
              test(
                "not init cloned geometry",
                () => {
                  open StateDataType;
                  let (state, _, geometry1, _, clonedGeometryArr) = _prepare(state^);
                  let (state, computeDataFunc1) =
                    GeometryTool.createStubComputeFuncData(sandbox, clonedGeometryArr[0], state);
                  let (state, computeDataFunc2) =
                    GeometryTool.createStubComputeFuncData(sandbox, clonedGeometryArr[1], state);
                  let state = state |> _initClonedGeometrys(clonedGeometryArr);
                  (computeDataFunc1 |> getCallCount, computeDataFunc2 |> getCallCount)
                  |> expect == (0, 0)
                }
              )
          );
          /* test(
               "can correctly get cloned one's vertices after init",
               () => {
                 let (state, _, geometry1, _, clonedGeometryArr) = _prepare(state^);
                 let state = state |> _initClonedGeometrys(clonedGeometryArr);
                 _testClonedGeometryVertices(state, geometry1, clonedGeometryArr)
               }
             );
             test(
               "can correctly get cloned one's indices after init",
               () => {
                 let (state, _, geometry1, _, clonedGeometryArr) = _prepare(state^);
                 let state = state |> _initClonedGeometrys(clonedGeometryArr);
                 _testClonedGeometryIndices(state, geometry1, clonedGeometryArr)
               }
             ) */
          describe(
            "test dispose cloned geometry",
            () => {
              let _prepare = (state) => {
                /* let state = MemoryConfigTool.setConfig(state, ~maxDisposeCount=1, ()); */
                let (state, gameObject1, geometry1) = _createAndInitGameObject(state);
                CloneTool.cloneWithGeometry(state, gameObject1, geometry1, 1)
              };
              test(
                "not collect dispose index",
                () => {
                  open StateDataType;
                  let (state, _, _, clonedGameObjectArr, clonedGeometryArr) = _prepare(state^);
                  let state =
                    state
                    |> GeometryTool.disposeGeometryByCloseContractCheck(
                         clonedGameObjectArr[0],
                         clonedGeometryArr[0]
                       );
                  let {disposedIndexArray} = GeometryTool.getGeometryData(state);
                  disposedIndexArray |> expect == [||]
                }
              );
              test(
                "dispose all cloned geometry shouldn't cause really dispose",
                () => {
                  open StateDataType;
                  let (state, _, _, clonedGameObjectArr, clonedGeometryArr) = _prepare(state^);
                  let state =
                    state
                    |> GeometryTool.disposeGeometryByCloseContractCheck(
                         clonedGameObjectArr[0],
                         clonedGeometryArr[0]
                       );
                  let {gameObjectMap} = GeometryTool.getGeometryData(state);
                  gameObjectMap |> expect == [|0|]
                }
              );
              test(
                "dispose all cloned geometry and source geometry should cause really dispose",
                () => {
                  open StateDataType;
                  let (state, gameObject1, geometry1, clonedGameObjectArr, clonedGeometryArr) =
                    _prepare(state^);
                  let state =
                    state
                    |> GeometryTool.disposeGeometryByCloseContractCheck(
                         clonedGameObjectArr[0],
                         clonedGeometryArr[0]
                       );
                  let state =
                    state
                    |> GeometryTool.disposeGeometryByCloseContractCheck(gameObject1, geometry1);
                  state |> GeometryTool.isGeometryDisposed(geometry1) |> expect == true
                }
              )
            }
          );
          describe(
            "test batch dispose cloned geometry",
            () => {
              let _prepare = (state) => {
                let state = MemoryConfigTool.setConfig(state, ~maxDisposeCount=1, ());
                let (state, gameObject1, geometry1) = _createAndInitGameObject(state);
                CloneTool.cloneWithGeometry(state, gameObject1, geometry1, 1)
              };
              test(
                "not collect dispose index",
                () => {
                  open StateDataType;
                  let (state, _, _, clonedGameObjectArr, clonedGeometryArr) = _prepare(state^);
                  let state =
                    state
                    |> GeometryTool.batchDisposeGeometryByCloseContractCheck([|
                         clonedGameObjectArr[0]
                       |]);
                  let {disposedIndexArray} = GeometryTool.getGeometryData(state);
                  disposedIndexArray |> expect == [||]
                }
              );
              test(
                "dispose all cloned geometry shouldn't cause really dispose",
                () => {
                  open StateDataType;
                  let (state, _, _, clonedGameObjectArr, clonedGeometryArr) = _prepare(state^);
                  let state =
                    state
                    |> GeometryTool.batchDisposeGeometryByCloseContractCheck([|
                         clonedGameObjectArr[0]
                       |]);
                  let {gameObjectMap} = GeometryTool.getGeometryData(state);
                  gameObjectMap |> expect == [|0|]
                }
              );
              test(
                "dispose all cloned geometry and source geometry should cause really dispose",
                () => {
                  open StateDataType;
                  let (state, gameObject1, geometry1, clonedGameObjectArr, clonedGeometryArr) =
                    _prepare(state^);
                  let state =
                    state
                    |> GeometryTool.batchDisposeGeometryByCloseContractCheck([|
                         gameObject1,
                         clonedGameObjectArr[0]
                       |]);
                  state |> GeometryTool.isGeometryDisposed(geometry1) |> expect == true
                }
              )
            }
          );
          /* describe(
               "fix bug",
               () =>
                 describe(
                   "test clone after reallocate geometry",
                   () =>
                     test(
                       "test getVertices",
                       () => {
                         let state = MemoryConfigTool.setConfig(state^, ~maxDisposeCount=1, ());
                         let (state, gameObject1, geometry1) = _createAndInitGameObject(state);
                         let (state, gameObject2, geometry2) = _createAndInitGameObject(state);
                         let state =
                           state
                           |> GeometryTool.disposeGeometryByCloseContractCheck(
                                gameObject1,
                                geometry1
                              );
                         let (state, gameObject2, geometry2, _, clonedGeometryArr) =
                           CloneTool.cloneWithGeometry(state, gameObject2, geometry2, 2);
                         let state = state |> _initClonedGeometrys(clonedGeometryArr);
                         _testClonedGeometryVertices(state, geometry2, clonedGeometryArr)
                       }
                     )
                 )
             ); */
          test(
            "source geometry's gameObject is cloned geometry's gameObject",
            () => {
              let (state, gameObject, _, clonedGameObjectArr, clonedGeometryArr) =
                _prepare(state^);
              (
                Geometry.getGeometryGameObject(clonedGeometryArr[0], state),
                Geometry.getGeometryGameObject(clonedGeometryArr[1], state)
              )
              |> expect == (gameObject, gameObject)
            }
          )
        }
      );
      describe(
        "test buffer",
        () => {
          let _prepare = (state) => {
            open StateDataType;
            let (state, gameObject1, geometry1, gameObject2, geometry2) = _createAndInit(state);
            let (
              state,
              (arrayBuffer1, arrayBuffer2, arrayBuffer3, arrayBuffer4),
              (elementArrayBuffer1, elementArrayBuffer2),
              createBuffer
            ) =
              VboBufferTool.prepareCreatedBuffer(sandbox, state);
            let (resultVertexArrayBuffer1, resultNormalArrayBuffer1, resultElementArrayBuffer1) =
              VboBufferTool.getOrCreateAllBuffers(geometry1, state);
            let (resultVertexArrayBuffer2, resultNormalArrayBuffer2, resultElementArrayBuffer2) =
              VboBufferTool.getOrCreateAllBuffers(geometry2, state);
            (
              state,
              (gameObject1, geometry1, gameObject2, geometry2),
              (arrayBuffer1, arrayBuffer2, arrayBuffer3, arrayBuffer4),
              (elementArrayBuffer1, elementArrayBuffer2),
              (resultVertexArrayBuffer1, resultNormalArrayBuffer1, resultElementArrayBuffer1),
              (resultVertexArrayBuffer2, resultNormalArrayBuffer2, resultElementArrayBuffer2),
              createBuffer
            )
          };
          describe(
            "test dispose shared geometry",
            () => {
              beforeEach(
                () => state := MemoryConfigTool.setConfig(state^, ~maxDisposeCount=2, ())
              );
              test(
                "if has other alive shared geometry, not add buffer to pool",
                () => {
                  open VboBufferType;
                  let (state, (gameObject1, geometry1, gameObject2, geometry2), _, _, _, _, _) =
                    _prepare(state^);
                  let state =
                    state |> GameObject.disposeGameObjectGeometryComponent(gameObject1, geometry1);
                  let {vertexArrayBufferPool, elementArrayBufferPool} =
                    VboBufferTool.getVboBufferData(state);
                  (
                    vertexArrayBufferPool |> Js.Array.length,
                    elementArrayBufferPool |> Js.Array.length
                  )
                  |> expect == (0, 0)
                }
              );
              test(
                "else, add buffer to pool",
                () => {
                  open VboBufferType;
                  let (state, (gameObject1, geometry1, gameObject2, geometry2), _, _, _, _, _) =
                    _prepare(state^);
                  let state =
                    state |> GameObject.disposeGameObjectGeometryComponent(gameObject1, geometry1);
                  let state =
                    state |> GameObject.disposeGameObjectGeometryComponent(gameObject2, geometry2);
                  let {vertexArrayBufferPool, elementArrayBufferPool} =
                    VboBufferTool.getVboBufferData(state);
                  (
                    vertexArrayBufferPool |> Js.Array.length,
                    elementArrayBufferPool |> Js.Array.length
                  )
                  |> expect == (2, 1)
                }
              )
            }
          );
          describe(
            "test batch dispose shared geometry",
            () => {
              beforeEach(
                () => state := MemoryConfigTool.setConfig(state^, ~maxDisposeCount=2, ())
              );
              test(
                "if has other alive shared geometry, not add buffer to pool",
                () => {
                  open VboBufferType;
                  let (state, (gameObject1, geometry1, gameObject2, geometry2), _, _, _, _, _) =
                    _prepare(state^);
                  let state = state |> GameObject.batchDisposeGameObject([|gameObject1|]);
                  let {vertexArrayBufferPool, elementArrayBufferPool} =
                    VboBufferTool.getVboBufferData(state);
                  (
                    vertexArrayBufferPool |> Js.Array.length,
                    elementArrayBufferPool |> Js.Array.length
                  )
                  |> expect == (0, 0)
                }
              );
              test(
                "else, add buffer to pool",
                () => {
                  open VboBufferType;
                  let (state, (gameObject1, geometry1, gameObject2, geometry2), _, _, _, _, _) =
                    _prepare(state^);
                  let state =
                    state |> GameObject.batchDisposeGameObject([|gameObject1, gameObject2|]);
                  let {vertexArrayBufferPool, elementArrayBufferPool} =
                    VboBufferTool.getVboBufferData(state);
                  (
                    vertexArrayBufferPool |> Js.Array.length,
                    elementArrayBufferPool |> Js.Array.length
                  )
                  |> expect == (2, 1)
                }
              )
            }
          );
          test(
            "shared geometry should share one buffer",
            () => {
              let (
                state,
                _,
                (arrayBuffer1, arrayBuffer2, arrayBuffer3, arrayBuffer4),
                (elementArrayBuffer1, elementArrayBuffer2),
                (resultVertexArrayBuffer1, resultNormalArrayBuffer1, resultElementArrayBuffer1),
                (resultVertexArrayBuffer2, resultNormalArrayBuffer2, resultElementArrayBuffer2),
                createBuffer
              ) =
                _prepare(state^);
              (
                createBuffer |> getCallCount,
                resultVertexArrayBuffer2,
                resultNormalArrayBuffer2,
                resultElementArrayBuffer2
              )
              |> expect == (3, arrayBuffer1, arrayBuffer2, elementArrayBuffer1)
            }
          )
        }
      )
    }
  );