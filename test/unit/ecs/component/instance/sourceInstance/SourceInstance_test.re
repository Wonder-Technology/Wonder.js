open Wonder_jest;

let _ =
  describe(
    "SourceInstance",
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
        "getSourceInstanceObjectInstanceTransformArray",
        () =>
          test(
            "get objectInstance transform array",
            () => {
              let (state, _) = TransformAPI.createTransform(state^);
              let (state, gameObject, sourceInstance, objectInstanceGameObject, objectInstance) =
                ObjectInstanceTool.createObjectInstanceGameObject(state);
              SourceInstanceAPI.getSourceInstanceObjectInstanceTransformArray(
                sourceInstance,
                state
              )
              |>
              expect == [|
                          GameObjectAPI.unsafeGetGameObjectTransformComponent(
                            objectInstanceGameObject,
                            state
                          )
                        |]
            }
          )
      );
      describe(
        "getGameObject",
        () =>
          test(
            "get component's gameObject",
            () => {
              let (state, gameObject, sourceInstance, objectInstanceGameObject, objectInstance) =
                ObjectInstanceTool.createObjectInstanceGameObject(state^);
              SourceInstanceTool.getGameObject(sourceInstance, state) |> expect == Some(gameObject)
            }
          )
      );
      describe(
        "unsafeGetGameObject",
        () =>
          test(
            "unsafe get component's gameObject",
            () => {
              let (state, gameObject, sourceInstance, objectInstanceGameObject, objectInstance) =
                ObjectInstanceTool.createObjectInstanceGameObject(state^);
              SourceInstanceAPI.unsafeGetSourceInstanceGameObject(sourceInstance, state)
              |> expect == gameObject
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
                "add matrixFloat32ArrayMap->typeArray to pool",
                () => {
                  open SourceInstanceType;
                  let (state, gameObject, sourceInstance) =
                    SourceInstanceTool.createSourceInstanceGameObject(state^);
                  let state =
                    VboBufferTool.addVboBufferToSourceInstanceBufferMap(sourceInstance, state);
                  let {matrixFloat32ArrayMap} = SourceInstanceTool.getRecord(state);
                  let typeArr = Js.Typed_array.Float32Array.make([|1.|]);
                  let matrixFloat32ArrayMap =
                    matrixFloat32ArrayMap
                    |> WonderCommonlib.SparseMapService.set(sourceInstance, typeArr);
                  let state =
                    state
                    |> GameObjectTool.disposeGameObjectSourceInstanceComponent(
                         gameObject,
                         sourceInstance
                       );
                  TypeArrayPoolTool.getFloat32ArrayPoolMap(state.typeArrayPoolRecord)[typeArr
                                                                    |> Js.Typed_array.Float32Array.length]
                  |> SparseMapService.length
                  |> expect == 1
                }
              );
              test(
                "reset objectInstanceTransformIndexMap",
                () => {
                  open SourceInstanceType;
                  let (state, gameObject, sourceInstance) =
                    SourceInstanceTool.createSourceInstanceGameObject(state^);
                  let state =
                    state
                    |> GameObjectTool.disposeGameObjectSourceInstanceComponent(
                         gameObject,
                         sourceInstance
                       );
                  let {objectInstanceTransformIndexMap} = SourceInstanceTool.getRecord(state);
                  objectInstanceTransformIndexMap |> expect == [|0|]
                }
              );
              test(
                "remove from t32ArrayMap, matrixInstanceBufferCapacityMap, isTransforsformMatrixDataMap, gameObjectMap",
                () => {
                  open SourceInstanceType;
                  let (state, gameObject, sourceInstance) =
                    SourceInstanceTool.createSourceInstanceGameObject(state^);
                  let state =
                    state
                    |> GameObjectTool.disposeGameObjectSourceInstanceComponent(
                         gameObject,
                         sourceInstance
                       );
                  let {
                    matrixFloat32ArrayMap,
                    matrixInstanceBufferCapacityMap,
                    isSendTransformMatrixDataMap,
                    gameObjectMap
                  } =
                    SourceInstanceTool.getRecord(state);
                  (
                    matrixFloat32ArrayMap |> WonderCommonlib.SparseMapService.has(sourceInstance),
                    matrixInstanceBufferCapacityMap
                    |> WonderCommonlib.SparseMapService.has(sourceInstance),
                    isSendTransformMatrixDataMap
                    |> WonderCommonlib.SparseMapService.has(sourceInstance),
                    gameObjectMap |> WonderCommonlib.SparseMapService.has(sourceInstance)
                  )
                  |> expect == (false, false, false, false)
                }
              );
              describe(
                "test remove from type array",
                () =>
                  test(
                    "delete and reset from isTransformStatics",
                    () => {
                      open SourceInstanceType;
                      let (state, gameObject, sourceInstance) =
                        SourceInstanceTool.createSourceInstanceGameObject(state^);
                      let state =
                        state
                        |> SourceInstanceAPI.markSourceInstanceModelMatrixIsStatic(
                             sourceInstance,
                             Js.false_
                           );
                      let state =
                        state
                        |> GameObjectTool.disposeGameObjectSourceInstanceComponent(
                             gameObject,
                             sourceInstance
                           );
                      StaticTransformTool.isTransformStatic(sourceInstance, state)
                      |> expect == true
                    }
                  )
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
                            |> GameObjectTool.disposeGameObjectSourceInstanceComponent(
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
                          |> GameObjectTool.disposeGameObjectSourceInstanceComponent(
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
                    |> GameObjectTool.disposeGameObjectSourceInstanceComponent(
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
                    |> GameObjectTool.disposeGameObjectSourceInstanceComponent(
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
                    |> GameObjectTool.disposeGameObjectSourceInstanceComponent(
                         gameObject1,
                         sourceInstance1
                       );
                  expect(
                    () => {
                      let state =
                        state
                        |> GameObjectTool.disposeGameObjectSourceInstanceComponent(
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