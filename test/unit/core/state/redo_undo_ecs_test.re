open Wonder_jest;

open Js.Typed_array;

let _ =
  describe(
    "test redo,undo component data",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(StateTool.createState());
      let _prepareMeshRendererData = (state) => {
        let (state, gameObject1, meshRenderer1) = MeshRendererTool.createGameObject(state^);
        let (state, gameObject2, meshRenderer2) = MeshRendererTool.createGameObject(state);
        let (state, gameObject3, meshRenderer3) = MeshRendererTool.createGameObject(state);
        let state =
          state |> GameObject.disposeGameObjectMeshRendererComponent(gameObject3, meshRenderer3);
        (state, gameObject1, gameObject2, gameObject3, meshRenderer1, meshRenderer2, meshRenderer3)
      };
      let _prepareTransformData = (state) => {
        let (state, gameObject1, transform1) = GameObjectTool.createGameObject(state^);
        let (state, gameObject2, transform2) = GameObjectTool.createGameObject(state);
        let (state, gameObject3, transform3) = GameObjectTool.createGameObject(state);
        let state =
          Transform.setTransformParent(Js.Nullable.return(transform1), transform2, state);
        let pos1 = (1., 2., 3.);
        let pos2 = (2., 4., 10.);
        let pos3 = ((-1.), 4., 5.);
        let state = Transform.setTransformLocalPosition(transform1, pos1, state);
        let state = Transform.setTransformLocalPosition(transform2, pos2, state);
        let state = Transform.setTransformLocalPosition(transform3, pos3, state);
        let state =
          state |> GameObject.disposeGameObjectTransformComponent(gameObject3, transform3);
        (state, gameObject1, gameObject2, gameObject3, transform1, transform2, transform3)
      };
      let _prepareCameraControllerData = (state) => {
        open PerspectiveCamera;
        let (state, gameObject1, _, cameraController1) =
          CameraControllerTool.createCameraGameObject(state^);
        let (state, gameObject2, _, cameraController2) =
          CameraControllerTool.createCameraGameObject(state);
        let (state, gameObject3, _, cameraController3) =
          CameraControllerTool.createCameraGameObject(state);
        let state = state |> setPerspectiveCameraNear(cameraController2, 0.2);
        let state = state |> setPerspectiveCameraFar(cameraController2, 100.);
        let state = state |> setPerspectiveCameraFar(cameraController3, 100.);
        let state = state |> setPerspectiveCameraAspect(cameraController1, 1.);
        let state = state |> setPerspectiveCameraAspect(cameraController2, 2.);
        let state = state |> setPerspectiveCameraFovy(cameraController2, 60.);
        let state = state |> CameraControllerTool.update;
        let state =
          state
          |> GameObject.disposeGameObjectCameraControllerComponent(gameObject3, cameraController3);
        (
          state,
          gameObject1,
          gameObject2,
          gameObject3,
          cameraController1,
          cameraController2,
          cameraController3
        )
      };
      let _prepareGeometryData = (state) => {
        open Geometry;
        open Js.Typed_array;
        let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
        let (state, gameObject2, geometry2) = BoxGeometryTool.createGameObject(state);
        let (state, gameObject3, geometry3) = BoxGeometryTool.createGameObject(state);
        let state = GeometryTool.initGeometrys(state);
        let state = state |> setGeometryVertices(geometry2, Float32Array.make([|3., 5., 5.|]));
        let state = state |> setGeometryIndices(geometry2, Uint16Array.make([|1, 2, 4|]));
        (state, gameObject1, gameObject2, gameObject3, geometry1, geometry2, geometry3)
      };
      let _prepareMaterialData = (state) => {
        open Material;
        open Js.Typed_array;
        let (state, gameObject1, material1) = BasicMaterialTool.createGameObject(state^);
        let (state, gameObject2, material2) = BasicMaterialTool.createGameObject(state);
        let (state, gameObject3, material3) = BasicMaterialTool.createGameObject(state);
        let state = MaterialTool.prepareForInit(state);
        let state = state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
        let state = BasicMaterialTool.initMaterials([@bs] GlTool.unsafeGetGl(state), state);
        let state = state |> setMaterialColor(material2, [|1., 0.1, 0.2|]);
        (state, gameObject1, gameObject2, gameObject3, material1, material2, material3)
      };
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.init(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
      describe(
        "deepCopyStateForRestore",
        () => {
          describe(
            "deep copy meshRenderer data",
            () => {
              test(
                "copied data should equal to source data",
                () => {
                  open MeshRendererType;
                  let (
                    state,
                    gameObject1,
                    gameObject2,
                    gameObject3,
                    meshRenderer1,
                    meshRenderer2,
                    meshRenderer3
                  ) =
                    _prepareMeshRendererData(state);
                  let copiedState = StateTool.deepCopyStateForRestore(state);
                  MeshRendererTool.getMeshRendererData(copiedState)
                  |>
                  expect == {
                              index: 3,
                              renderGameObjectArray: [|gameObject1, gameObject2|],
                              gameObjectMap: [|
                                gameObject1,
                                gameObject2,
                                Js.Undefined.empty |> Obj.magic
                              |],
                              disposedIndexArray: [|meshRenderer3|]
                            }
                }
              );
              test(
                "change copied state shouldn't affect source state",
                () => {
                  open MeshRendererType;
                  let (
                    state,
                    gameObject1,
                    gameObject2,
                    gameObject3,
                    meshRenderer1,
                    meshRenderer2,
                    meshRenderer3
                  ) =
                    _prepareMeshRendererData(state);
                  let copiedState = StateTool.deepCopyStateForRestore(state);
                  let data = MeshRendererTool.getMeshRendererData(copiedState);
                  data.index = 0;
                  data.renderGameObjectArray |> Js.Array.pop |> ignore;
                  data.gameObjectMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(meshRenderer2);
                  data.disposedIndexArray |> Js.Array.pop |> ignore;
                  MeshRendererTool.getMeshRendererData(state)
                  |>
                  expect == {
                              index: 3,
                              renderGameObjectArray: [|gameObject1, gameObject2|],
                              gameObjectMap: [|
                                gameObject1,
                                gameObject2,
                                Js.Undefined.empty |> Obj.magic
                              |],
                              disposedIndexArray: [|meshRenderer3|]
                            }
                }
              )
            }
          );
          describe(
            "deep copy transform data",
            () =>
              test(
                "change copied state shouldn't affect source state",
                () => {
                  open TransformType;
                  let (
                    state,
                    gameObject1,
                    gameObject2,
                    gameObject3,
                    transform1,
                    transform2,
                    transform3
                  ) =
                    _prepareTransformData(state);
                  let _ = Transform.getTransformPosition(transform2, state);
                  let copiedState = StateTool.deepCopyStateForRestore(state);
                  let data = TransformTool.getTransformData(copiedState);
                  data.localPositionMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(transform2);
                  TransformTool.getTransformData(state).localPositionMap
                  |> WonderCommonlib.SparseMapSystem.unsafeGet(transform2)
                  |> expect
                  |> not_ == (Js.Undefined.empty |> Obj.magic)
                }
              )
          );
          describe(
            "deep copy geometry data",
            () =>
              test(
                "change copied state shouldn't affect source state",
                () => {
                  open StateDataType;
                  let (
                    state,
                    gameObject1,
                    gameObject2,
                    gameObject3,
                    geometry1,
                    geometry2,
                    geometry3
                  ) =
                    _prepareGeometryData(state);
                  let copiedState = StateTool.deepCopyStateForRestore(state);
                  let data = GeometryTool.getGeometryData(copiedState);
                  data.verticesMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(geometry2);
                  data.indicesMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(geometry2);
                  let {verticesMap, indicesMap} = GeometryTool.getGeometryData(state);
                  (
                    verticesMap |> WonderCommonlib.SparseMapSystem.unsafeGet(geometry2),
                    indicesMap |> WonderCommonlib.SparseMapSystem.unsafeGet(geometry2)
                  )
                  |> expect
                  |> not_ == (Js.Undefined.empty |> Obj.magic)
                }
              )
          );
          describe(
            "deep copy material data",
            () =>
              test(
                "change copied state shouldn't affect source state",
                () => {
                  open MaterialType;
                  let (
                    state,
                    gameObject1,
                    gameObject2,
                    gameObject3,
                    material1,
                    material2,
                    material3
                  ) =
                    _prepareMaterialData(state);
                  let copiedState = StateTool.deepCopyStateForRestore(state);
                  let data = MaterialTool.getMaterialData(copiedState);
                  data.colorMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(material2);
                  let {colorMap} = MaterialTool.getMaterialData(state);
                  colorMap
                  |> WonderCommonlib.SparseMapSystem.unsafeGet(material2)
                  |> expect
                  |> not_ == (Js.Undefined.empty |> Obj.magic)
                }
              )
          );
          describe(
            "deep copy sourceInstance data",
            () => {
              test(
                "deep copy objectInstanceArrayMap, modelMatrixFloat32ArrayMap",
                () => {
                  open StateDataType;
                  open SourceInstanceType;
                  let (state, gameObject1, sourceInstance1) =
                    SourceInstanceTool.createSourceInstanceGameObject(state^);
                  let {objectInstanceArrayMap, modelMatrixFloat32ArrayMap} =
                    SourceInstanceTool.getSourceInstanceData(state);
                  let originModelMatrixFloat32Array = Float32Array.make([|1.|]);
                  modelMatrixFloat32ArrayMap
                  |> WonderCommonlib.SparseMapSystem.set(
                       sourceInstance1,
                       originModelMatrixFloat32Array
                     )
                  |> ignore;
                  let originObjectInstanceArray = [|20|];
                  objectInstanceArrayMap
                  |> WonderCommonlib.SparseMapSystem.set(
                       sourceInstance1,
                       originObjectInstanceArray
                     )
                  |> ignore;
                  let copiedState = StateTool.deepCopyStateForRestore(state);
                  let {objectInstanceArrayMap, modelMatrixFloat32ArrayMap} =
                    SourceInstanceTool.getSourceInstanceData(copiedState);
                  let objectInstanceArray =
                    objectInstanceArrayMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(sourceInstance1);
                  objectInstanceArray |> Js.Array.push(100) |> ignore;
                  let modelMatrixFloat32Array =
                    modelMatrixFloat32ArrayMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(sourceInstance1);
                  Float32Array.unsafe_set(modelMatrixFloat32Array, 0, 1000.) |> ignore;
                  let {objectInstanceArrayMap, modelMatrixFloat32ArrayMap} =
                    SourceInstanceTool.getSourceInstanceData(state);
                  (
                    objectInstanceArrayMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(sourceInstance1),
                    modelMatrixFloat32ArrayMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(sourceInstance1)
                  )
                  |> expect == (originObjectInstanceArray, originModelMatrixFloat32Array)
                }
              );
              test(
                "shadow copy modelMatrixInstanceBufferCapacityMap, isModelMatrixStaticMap, gameObjectMap, disposedIndexArray",
                () =>
                  StateDataType.(
                    SourceInstanceType.(
                      StateTool.testShadowCopyArrayLikeMapData(
                        (state) => {
                          let {
                            modelMatrixInstanceBufferCapacityMap,
                            isModelMatrixStaticMap,
                            gameObjectMap,
                            disposedIndexArray
                          } =
                            SourceInstanceTool.getSourceInstanceData(state);
                          [|
                            modelMatrixInstanceBufferCapacityMap |> Obj.magic,
                            isModelMatrixStaticMap |> Obj.magic,
                            gameObjectMap |> Obj.magic,
                            disposedIndexArray |> Obj.magic
                          |]
                        },
                        state^
                      )
                    )
                  )
              )
            }
          );
          describe(
            "deep copy gameObject data",
            () =>
              test(
                "shadow copy disposedUidMap, aliveUidArray, transformMap, cameraControllerMap, geometryMap, meshRendererMap, materialMap, sourceInstanceMap, objectInstanceMap",
                () =>
                  GameObjectType.(
                    StateTool.testShadowCopyArrayLikeMapData(
                      (state) => {
                        let {
                          disposedUidMap,
                          aliveUidArray,
                          transformMap,
                          cameraControllerMap,
                          geometryMap,
                          meshRendererMap,
                          materialMap,
                          sourceInstanceMap,
                          objectInstanceMap
                        } =
                          GameObjectTool.getGameObjectData(state);
                        [|
                          disposedUidMap |> Obj.magic,
                          aliveUidArray |> Obj.magic,
                          transformMap |> Obj.magic,
                          cameraControllerMap |> Obj.magic,
                          geometryMap |> Obj.magic,
                          meshRendererMap |> Obj.magic,
                          materialMap |> Obj.magic,
                          sourceInstanceMap |> Obj.magic,
                          objectInstanceMap |> Obj.magic
                        |]
                      },
                      state^
                    )
                  )
              )
          );
          describe(
            "deep copy objectInstance data",
            () =>
              test(
                "shadow copy sourceInstanceMap, gameObjectMap, disposedIndexArray",
                () =>
                  StateDataType.(
                    ObjectInstanceType.(
                      StateTool.testShadowCopyArrayLikeMapData(
                        (state) => {
                          let {sourceInstanceMap, gameObjectMap, disposedIndexArray} =
                            ObjectInstanceTool.getObjectInstanceData(state);
                          [|
                            sourceInstanceMap |> Obj.magic,
                            gameObjectMap |> Obj.magic,
                            disposedIndexArray |> Obj.magic
                          |]
                        },
                        state^
                      )
                    )
                  )
              )
          );
          describe(
            "deep copy cameraController data",
            () =>
              test(
                "change copied state shouldn't affect source state",
                () => {
                  open CameraControllerType;
                  let (
                    state,
                    gameObject1,
                    gameObject2,
                    gameObject3,
                    cameraController1,
                    cameraController2,
                    cameraController3
                  ) =
                    _prepareCameraControllerData(state);
                  let copiedState = StateTool.deepCopyStateForRestore(state);
                  let {perspectiveCameraData} as data =
                    CameraControllerTool.getCameraControllerData(copiedState);
                  data.cameraArray
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(cameraController2);
                  data.updateCameraFuncMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(cameraController2);
                  perspectiveCameraData.nearMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(cameraController1);
                  let {cameraArray, updateCameraFuncMap, perspectiveCameraData} =
                    CameraControllerTool.getCameraControllerData(state);
                  (
                    cameraArray,
                    updateCameraFuncMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(cameraController2)
                    |> JudgeTool.isUndefined,
                    perspectiveCameraData.nearMap
                  )
                  |>
                  expect == (
                              [|
                                cameraController1,
                                cameraController2,
                                Js.Undefined.empty |> Obj.magic
                              |],
                              false,
                              [|0.1, 0.2, Js.Undefined.empty |> Obj.magic|]
                            )
                }
              )
          )
        }
      );
      describe(
        "restore",
        () => {
          let _testRestoreStateEqualTargetState = (state, prepareDataFunc, getDataFunc) => {
            let (state, _, _, _, _, _, _) = prepareDataFunc(state);
            let currentState = StateTool.createNewCompleteState();
            let (currentState, _, _, _, _, _, _) = prepareDataFunc(ref(currentState));
            let _ = StateTool.restore(currentState, state);
            StateTool.getState() |> getDataFunc |> expect == (state |> getDataFunc)
          };
          describe(
            "restore meshRenderer data to target state",
            () => {
              let _prepare = (state) => {
                let (
                  state,
                  gameObject1,
                  gameObject2,
                  gameObject3,
                  meshRenderer1,
                  meshRenderer2,
                  meshRenderer3
                ) =
                  _prepareMeshRendererData(state);
                let (currentState, gameObject4, meshRenderer4) =
                  MeshRendererTool.createGameObject(StateTool.createNewCompleteState());
                (
                  (
                    state,
                    gameObject1,
                    gameObject2,
                    gameObject3,
                    meshRenderer1,
                    meshRenderer2,
                    meshRenderer3
                  ),
                  (currentState, gameObject4, meshRenderer4)
                )
              };
              test(
                "set restored state to stateData",
                () => {
                  let ((state, _, _, _, _, _, _), (currentState, _, _)) = _prepare(state);
                  let currentState = StateTool.restore(currentState, state);
                  StateTool.getState() |> expect == currentState
                }
              );
              test(
                "change restored state should affect source state",
                () => {
                  let ((state, _, _, _, _, _, _), (currentState, _, _)) = _prepare(state);
                  let currentState = StateTool.restore(currentState, state);
                  let (currentState, gameObject5, meshRenderer5) =
                    MeshRendererTool.createGameObject(StateTool.createNewCompleteState());
                  state
                  |> MeshRenderer.getMeshRendererGameObject(meshRenderer5)
                  |> expect == gameObject5
                }
              );
              test(
                "change restored state which is restore from deep copied state shouldn't affect source state",
                () => {
                  let ((state, gameObject1, gameObject2, _, _, _, _), (currentState, _, _)) =
                    _prepare(state);
                  let currentState =
                    StateTool.restore(currentState, state |> StateTool.deepCopyStateForRestore);
                  let (currentState, _, _) = MeshRendererTool.createGameObject(currentState);
                  MeshRendererTool.getMeshRendererData(state).renderGameObjectArray
                  |> expect == [|gameObject1, gameObject2|]
                }
              )
            }
          );
          describe(
            "restore transform data to target state",
            () =>
              test(
                "add current state->transformData->localToWorldMatrixMap, localPositionMap typeArr to pool",
                () => {
                  open TypeArrayPoolType;
                  let (state, _, _, _, _, _, _) = _prepareTransformData(state);
                  let (currentState, _, transform4) =
                    GameObjectTool.createGameObject(StateTool.createNewCompleteState());
                  let pos4 = ((-1.), 4., 5.);
                  let currentState =
                    Transform.setTransformLocalPosition(transform4, pos4, currentState);
                  let _ = StateTool.restore(currentState, state);
                  let {float32ArrayPoolMap} =
                    StateTool.getState() |> TypeArrayPoolTool.getTypeArrayPoolData;
                  (
                    float32ArrayPoolMap |> WonderCommonlib.SparseMapSystem.unsafeGet(16),
                    float32ArrayPoolMap |> WonderCommonlib.SparseMapSystem.unsafeGet(3)
                  )
                  |>
                  expect == (
                              [|TransformTool.getDefaultLocalToWorldMatrix()|],
                              [|TransformTool.changeTupleToTypeArray(pos4)|]
                            )
                }
              )
          );
          describe(
            "restore geometry data to target state",
            () =>
              test(
                "add current state->geometryData->verticesMap, indicesMap typeArr to pool",
                () => {
                  open StateDataType;
                  open TypeArrayPoolType;
                  let (
                    state,
                    gameObject1,
                    gameObject2,
                    gameObject3,
                    geometry1,
                    geometry2,
                    geometry3
                  ) =
                    _prepareGeometryData(state);
                  let (currentState, gameObject4, geometry4) =
                    BoxGeometryTool.createGameObject(StateTool.createNewCompleteState());
                  let currentState = GeometryTool.initGeometry(geometry4, currentState);
                  let _ = StateTool.restore(currentState, state);
                  let {float32ArrayPoolMap, uint16ArrayPoolMap} =
                    StateTool.getState() |> TypeArrayPoolTool.getTypeArrayPoolData;
                  (
                    float32ArrayPoolMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(
                         BoxGeometryTool.getDefaultVertices() |> Float32Array.length
                       ),
                    uint16ArrayPoolMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(
                         BoxGeometryTool.getDefaultIndices() |> Uint16Array.length
                       )
                  )
                  |>
                  expect == (
                              [|BoxGeometryTool.getDefaultVertices()|],
                              [|BoxGeometryTool.getDefaultIndices()|]
                            )
                }
              )
          );
          test(
            "restore material data to target state",
            () =>
              _testRestoreStateEqualTargetState(
                state,
                _prepareMaterialData,
                MaterialTool.getMaterialData
              )
          );
          describe(
            "restore sourceInstance data to target state",
            () => {
              test(
                "add current state->sourceInstanceData->modelMatrixFloat32ArrayMap typeArr to pool",
                () => {
                  open StateDataType;
                  open SourceInstanceType;
                  open TypeArrayPoolType;
                  let state = state^;
                  let currentState = StateTool.createNewCompleteState();
                  let {modelMatrixFloat32ArrayMap} =
                    SourceInstanceTool.getSourceInstanceData(currentState);
                  let index = 0;
                  let typeArr = Float32Array.make([|1.|]);
                  modelMatrixFloat32ArrayMap |> WonderCommonlib.SparseMapSystem.set(index, typeArr);
                  let _ = StateTool.restore(currentState, state);
                  let {float32ArrayPoolMap}: typeArrayPoolData =
                    StateTool.getState() |> TypeArrayPoolTool.getTypeArrayPoolData;
                  float32ArrayPoolMap
                  |> WonderCommonlib.SparseMapSystem.unsafeGet(typeArr |> Float32Array.length)
                  |> expect == [|typeArr|]
                }
              );
              test(
                "mark is-not-send-modelMatrixData",
                () => {
                  open StateDataType;
                  open SourceInstanceType;
                  open TypeArrayPoolType;
                  let state = state^;
                  let {isSendModelMatrixDataMap} = SourceInstanceTool.getSourceInstanceData(state);
                  isSendModelMatrixDataMap
                  |> WonderCommonlib.SparseMapSystem.set(0, true)
                  |> WonderCommonlib.SparseMapSystem.set(1, false)
                  |> ignore;
                  let _ = StateTool.restore(StateTool.createNewCompleteState(), state);
                  let {isSendModelMatrixDataMap} =
                    SourceInstanceTool.getSourceInstanceData(StateTool.getState());
                  isSendModelMatrixDataMap |> expect == [|false, false|]
                }
              )
            }
          );
          test(
            "restore cameraController data to target state",
            () =>
              _testRestoreStateEqualTargetState(
                state,
                _prepareCameraControllerData,
                CameraControllerTool.getCameraControllerData
              )
          );
        }
      )
    }
  );