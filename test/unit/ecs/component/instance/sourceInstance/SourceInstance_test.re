open Wonder_jest;

let _ =
  describe(
    "SourceInstance",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "getSourceInstanceObjectInstanceArray",
        () =>
          test(
            "get objectInstanceArray",
            () => {
              let (state, gameObject, sourceInstance, objectInstanceGameObject, objectInstance) =
                ObjectInstanceTool.createObjectInstanceGameObject(state^);
              SourceInstanceAPI.getSourceInstanceObjectInstanceArray(sourceInstance, state)
              |> expect == [|objectInstanceGameObject|]
            }
          )
      );
      describe(
        "dispose component",
        () => {
          describe(
            "dispose record",
            () => {
              test(
                "remove from sourceInstanceListMap, matrixFloat32ArrayMap, matrixInstanceBufferCapacityMap, isTransformStaticMap, isSendTransformMatrixDataMap, gameObjectMap",
                () => {
                  open SourceInstanceType;
                  let (state, gameObject, sourceInstance) =
                    SourceInstanceTool.createSourceInstanceGameObject(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectSourceInstanceComponent(
                         gameObject,
                         sourceInstance
                       );
                  let {
                    objectInstanceArrayMap,
                    matrixFloat32ArrayMap,
                    matrixInstanceBufferCapacityMap,
                    isTransformStaticMap,
                    isSendTransformMatrixDataMap,
                    gameObjectMap
                  } =
                    SourceInstanceTool.getSourceInstanceData(state);
                  (
                    objectInstanceArrayMap |> WonderCommonlib.SparseMapSystem.has(sourceInstance),
                    matrixFloat32ArrayMap
                    |> WonderCommonlib.SparseMapSystem.has(sourceInstance),
                    matrixInstanceBufferCapacityMap
                    |> WonderCommonlib.SparseMapSystem.has(sourceInstance),
                    isTransformStaticMap |> WonderCommonlib.SparseMapSystem.has(sourceInstance),
                    isSendTransformMatrixDataMap |> WonderCommonlib.SparseMapSystem.has(sourceInstance),
                    gameObjectMap |> WonderCommonlib.SparseMapSystem.has(sourceInstance)
                  )
                  |> expect == (false, false, false, false, false, false)
                }
              );
              test(
                "remove from buffer map",
                () => {
                  open VboBufferType;
                  let (state, gameObject, sourceInstance) =
                    SourceInstanceTool.createSourceInstanceGameObject(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectSourceInstanceComponent(
                         gameObject,
                         sourceInstance
                       );
                  let {matrixInstanceBufferMap} = VboBufferTool.getVboBufferData(state);
                  matrixInstanceBufferMap
                  |> WonderCommonlib.SparseMapSystem.has(sourceInstance)
                  |> expect == false
                }
              );
              describe(
                "dispose all objectInstance gameObjects",
                () =>
                  describe(
                    "should dispose all components",
                    () => {
                      test(
                        "dispose transform component",
                        () => {
                          open TransformType;
                          let (
                            state,
                            gameObject,
                            sourceInstance,
                            objectInstanceGameObjectArr,
                            objectInstanceArr
                          ) =
                            ObjectInstanceTool.createObjectInstanceGameObjectArr(2, state^);
                          let objectInstanceGameObject1 = objectInstanceGameObjectArr[0];
                          let objectInstanceGameObject2 = objectInstanceGameObjectArr[1];
                          let transform1 =
                            GameObjectAPI.unsafeGetGameObjectTransformComponent(
                              objectInstanceGameObject1,
                              state
                            );
                          let transform2 =
                            GameObjectAPI.unsafeGetGameObjectTransformComponent(
                              objectInstanceGameObject2,
                              state
                            );
                          let state =
                            state
                            |> GameObjectAPI.disposeGameObjectSourceInstanceComponent(
                                 gameObject,
                                 sourceInstance
                               );
                          (
                            TransformTool.isDisposed(transform1, state),
                            TransformTool.isDisposed(transform2, state)
                          )
                          |> expect == (true, true)
                        }
                      );
                      test(
                        "dispose objectInstance component",
                        () => {
                          open TransformType;
                          let (
                            state,
                            gameObject,
                            sourceInstance,
                            objectInstanceGameObjectArr,
                            objectInstanceArr
                          ) =
                            ObjectInstanceTool.createObjectInstanceGameObjectArr(2, state^);
                          let objectInstanceGameObject1 = objectInstanceGameObjectArr[0];
                          let objectInstanceGameObject2 = objectInstanceGameObjectArr[1];
                          let objectInstance1 = objectInstanceArr[0];
                          let objectInstance2 = objectInstanceArr[1];
                          state
                          |> GameObjectAPI.disposeGameObjectSourceInstanceComponent(
                               gameObject,
                               sourceInstance
                             );
                          (
                            ObjectInstanceTool.isDisposed(objectInstance1, state),
                            ObjectInstanceTool.isDisposed(objectInstance2, state)
                          )
                          |> expect == (true, true)
                        }
                      )
                    }
                  )
              )
            }
          );
          describe(
            "test add new one after dispose old one",
            () => {
              test(
                "use disposed index as new index firstly",
                () => {
                  open SourceInstanceType;
                  let (state, gameObject1, sourceInstance1) =
                    SourceInstanceTool.createSourceInstanceGameObject(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectSourceInstanceComponent(
                         gameObject1,
                         sourceInstance1
                       );
                  let (state, gameObject2, sourceInstance2) =
                    SourceInstanceTool.createSourceInstanceGameObject(state);
                  sourceInstance2 |> expect == sourceInstance1
                }
              );
              test(
                "if has no disposed index, get index from sourceInstanceRecord.index",
                () => {
                  open SourceInstanceType;
                  let (state, gameObject1, sourceInstance1) =
                    SourceInstanceTool.createSourceInstanceGameObject(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectSourceInstanceComponent(
                         gameObject1,
                         sourceInstance1
                       );
                  let (state, _, sourceInstance2) =
                    SourceInstanceTool.createSourceInstanceGameObject(state);
                  let (state, _, sourceInstance3) =
                    SourceInstanceTool.createSourceInstanceGameObject(state);
                  (sourceInstance2, sourceInstance3)
                  |> expect == (sourceInstance1, sourceInstance1 + 1)
                }
              )
            }
          );
          describe(
            "contract check",
            () =>
              test(
                "expect dispose the alive component, but actual not",
                () => {
                  open SourceInstanceType;
                  let (state, gameObject1, sourceInstance1) =
                    SourceInstanceTool.createSourceInstanceGameObject(state^);
                  let state =
                    state
                    |> GameObjectAPI.disposeGameObjectSourceInstanceComponent(
                         gameObject1,
                         sourceInstance1
                       );
                  expect(
                    () => {
                      let state =
                        state
                        |> GameObjectAPI.disposeGameObjectSourceInstanceComponent(
                             gameObject1,
                             sourceInstance1
                           );
                      ()
                    }
                  )
                  |> toThrowMessage("expect dispose the alive component, but actual not")
                }
              )
          )
        }
      )
    }
  );