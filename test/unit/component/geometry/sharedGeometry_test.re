open Wonder_jest;

let _ =
  describe(
    "test shared geometry",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateSystem.createState());
      let _createAndInit = (state) => {
        let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state);
        let (state, gameObject2, geometry2) =
          GeometryGroupTool.createGameObjectWithSharedGeometry(geometry1, state);
        (state |> GeometryTool.initGeometrys, gameObject1, geometry1, gameObject2, geometry2)
      };
      beforeEach(
        () => {
          sandbox := createSandbox();
          state :=
            TestTool.init(~sandbox, 
              ~bufferConfig=Js.Nullable.return(GeometryTool.buildBufferConfig(1000)),
              ()
            )
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
        "test reallocate geometry",
        () =>
          test(
            "dispose some the shared geometry while still has alive one not cause really dispose",
            () => {
              state := MemoryConfigTool.setConfig(state^, ~maxDisposeCount=1, ());
              open GeometryType;
              open StateDataType;
              let (state, gameObject1, geometry1, gameObject2, geometry2) = _createAndInit(state^);
              let (state, gameObject3, geometry3) = BoxGeometryTool.createGameObject(state);
              let state =
                state |> GameObject.disposeGameObjectGeometryComponent(gameObject1, geometry1);
              let {gameObjectMap} = GeometryTool.getData(state);
              gameObjectMap |> expect == [|0, 2|]
            }
          )
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
                let state = MemoryConfigTool.setConfig(state, ~maxDisposeCount=1, ());
                let (state, gameObject1, geometry1) = _createAndInitGameObject(state);
                CloneTool.cloneWithGeometry(state, gameObject1, geometry1, 1)
              };
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
                  let {gameObjectMap} = GeometryTool.getData(state);
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
                  let {gameObjectMap} = GeometryTool.getData(state);
                  gameObjectMap |> expect == [||]
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
                "dispose all cloned geometry shouldn't cause really dispose",
                () => {
                  open StateDataType;
                  let (state, _, _, clonedGameObjectArr, clonedGeometryArr) = _prepare(state^);
                  let state =
                    state
                    |> GeometryTool.batchDisposeGeometryByCloseContractCheck([|
                         clonedGameObjectArr[0]
                       |]);
                  let {gameObjectMap} = GeometryTool.getData(state);
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
                  let {gameObjectMap} = GeometryTool.getData(state);
                  gameObjectMap |> expect == [||]
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
            let arrayBuffer1 = Obj.magic(10);
            let arrayBuffer2 = Obj.magic(11);
            let elementArrayBuffer1 = Obj.magic(12);
            let elementArrayBuffer2 = Obj.magic(13);
            let createBuffer = createEmptyStubWithJsObjSandbox(sandbox);
            createBuffer |> onCall(0) |> returns(arrayBuffer1);
            createBuffer |> onCall(1) |> returns(elementArrayBuffer1);
            createBuffer |> onCall(2) |> returns(arrayBuffer2);
            createBuffer |> onCall(3) |> returns(elementArrayBuffer2);
            let state =
              state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ~createBuffer, ()));
            let resultArrayBuffer1 = VboBufferTool.getOrCreateArrayBuffer(geometry1, state);
            let resultElementArrayBuffer1 =
              VboBufferTool.getOrCreateElementArrayBuffer(geometry1, state);
            let resultArrayBuffer2 = VboBufferTool.getOrCreateArrayBuffer(geometry2, state);
            let resultElementArrayBuffer2 =
              VboBufferTool.getOrCreateElementArrayBuffer(geometry2, state);
            (
              state,
              (gameObject1, geometry1, gameObject2, geometry2),
              (
                createBuffer,
                arrayBuffer1,
                elementArrayBuffer1,
                resultArrayBuffer1,
                resultElementArrayBuffer1,
                arrayBuffer2,
                elementArrayBuffer2,
                resultArrayBuffer2,
                resultElementArrayBuffer2
              )
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
                  let (state, (gameObject1, geometry1, gameObject2, geometry2), _) =
                    _prepare(state^);
                  let state =
                    state |> GameObject.disposeGameObjectGeometryComponent(gameObject1, geometry1);
                  let {vertexArrayBufferPool, elementArrayBufferPool} =
                    VboBufferTool.getData(state);
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
                  let (state, (gameObject1, geometry1, gameObject2, geometry2), _) =
                    _prepare(state^);
                  let state =
                    state |> GameObject.disposeGameObjectGeometryComponent(gameObject1, geometry1);
                  let state =
                    state |> GameObject.disposeGameObjectGeometryComponent(gameObject2, geometry2);
                  let {vertexArrayBufferPool, elementArrayBufferPool} =
                    VboBufferTool.getData(state);
                  (
                    vertexArrayBufferPool |> Js.Array.length,
                    elementArrayBufferPool |> Js.Array.length
                  )
                  |> expect == (1, 1)
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
                  let (state, (gameObject1, geometry1, gameObject2, geometry2), _) =
                    _prepare(state^);
                  let state = state |> GameObject.batchDisposeGameObject([|gameObject1|]);
                  let {vertexArrayBufferPool, elementArrayBufferPool} =
                    VboBufferTool.getData(state);
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
                  let (state, (gameObject1, geometry1, gameObject2, geometry2), _) =
                    _prepare(state^);
                  let state =
                    state |> GameObject.batchDisposeGameObject([|gameObject1, gameObject2|]);
                  let {vertexArrayBufferPool, elementArrayBufferPool} =
                    VboBufferTool.getData(state);
                  (
                    vertexArrayBufferPool |> Js.Array.length,
                    elementArrayBufferPool |> Js.Array.length
                  )
                  |> expect == (1, 1)
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
                (
                  createBuffer,
                  arrayBuffer1,
                  elementArrayBuffer1,
                  resultArrayBuffer1,
                  resultElementArrayBuffer1,
                  arrayBuffer2,
                  elementArrayBuffer2,
                  resultArrayBuffer2,
                  resultElementArrayBuffer2
                )
              ) =
                _prepare(state^);
              (createBuffer |> getCallCount, resultArrayBuffer2, resultElementArrayBuffer2)
              |> expect == (2, arrayBuffer1, elementArrayBuffer1)
            }
          )
        }
      )
    }
  );