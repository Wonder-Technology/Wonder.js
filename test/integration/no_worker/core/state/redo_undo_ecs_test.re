open Wonder_jest;

open Js.Typed_array;

open BoxGeometryType;

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
      let _prepareTransformMatrixData = (state) => {
        let (state, gameObject1, transform1) = GameObjectTool.createGameObject(state^);
        let (state, gameObject2, transform2) = GameObjectTool.createGameObject(state);
        let (state, gameObject3, transform3) = GameObjectTool.createGameObject(state);
        let state =
          TransformAPI.setTransformParent(Js.Nullable.return(transform1), transform2, state);
        let pos1 = (1., 2., 3.);
        let pos2 = (2., 4., 10.);
        let pos3 = ((-1.), 4., 5.);
        let state = TransformAPI.setTransformLocalPosition(transform1, pos1, state);
        let state = TransformAPI.setTransformLocalPosition(transform2, pos2, state);
        let state = TransformAPI.setTransformLocalPosition(transform3, pos3, state);
        let state =
          state |> GameObjectAPI.disposeGameObjectTransformComponent(gameObject3, transform3);
        (state, gameObject1, gameObject2, gameObject3, transform1, transform2, transform3)
      };
      let _prepareBasicCameraViewData = (state) => {
        let (state, gameObject1, _, (basicCameraView1, _)) =
          CameraTool.createCameraGameObject(state^);
        let (state, gameObject2, _, (basicCameraView2, _)) =
          CameraTool.createCameraGameObject(state);
        let (state, gameObject3, _, (basicCameraView3, _)) =
          CameraTool.createCameraGameObject(state);
        /* let state = state |> setPerspectiveCameraNear(basicCameraView2, 0.2);
           let state = state |> setPerspectiveCameraFar(basicCameraView2, 100.);
           let state = state |> setPerspectiveCameraFar(basicCameraView3, 100.);
           let state = state |> setPerspectiveCameraAspect(basicCameraView1, 1.);
           let state = state |> setPerspectiveCameraAspect(basicCameraView2, 2.);
           let state = state |> setPerspectiveCameraFovy(basicCameraView2, 60.); */
        /* let state = state |> BasicCameraViewTool.update; */
        let state =
          state
          |> GameObjectAPI.disposeGameObjectBasicCameraViewComponent(gameObject3, basicCameraView3);
        (
          state,
          gameObject1,
          gameObject2,
          gameObject3,
          basicCameraView1,
          basicCameraView2,
          basicCameraView3
        )
      };
      let _preparePerspectiveCameraProjectionData = (state) => {
        open PerspectiveCameraProjectionAPI;
        let (state, gameObject1, _, (_, perspectiveCameraProjection1)) =
          CameraTool.createCameraGameObject(state^);
        let (state, gameObject2, _, (_, perspectiveCameraProjection2)) =
          CameraTool.createCameraGameObject(state);
        let (state, gameObject3, _, (_, perspectiveCameraProjection3)) =
          CameraTool.createCameraGameObject(state);
        let state = state |> setPerspectiveCameraNear(perspectiveCameraProjection2, 0.2);
        let state = state |> setPerspectiveCameraFar(perspectiveCameraProjection2, 100.);
        let state = state |> setPerspectiveCameraFar(perspectiveCameraProjection3, 100.);
        let state = state |> setPerspectiveCameraAspect(perspectiveCameraProjection1, 1.);
        let state = state |> setPerspectiveCameraAspect(perspectiveCameraProjection2, 2.);
        let state = state |> setPerspectiveCameraFovy(perspectiveCameraProjection2, 60.);
        let state = state |> PerspectiveCameraProjectionTool.update;
        let state =
          state
          |> GameObjectAPI.disposeGameObjectPerspectiveCameraProjectionComponent(
               gameObject3,
               perspectiveCameraProjection3
             );
        (
          state,
          gameObject1,
          gameObject2,
          gameObject3,
          perspectiveCameraProjection1,
          perspectiveCameraProjection2,
          perspectiveCameraProjection3
        )
      };
      let _prepareGeometryData = (state) => {
        open BoxGeometryAPI;
        open Js.Typed_array;
        let (state, gameObject1, geometry1) = BoxGeometryTool.createGameObject(state^);
        let (state, gameObject2, geometry2) = BoxGeometryTool.createGameObject(state);
        let (state, gameObject3, geometry3) = BoxGeometryTool.createGameObject(state);
        let state = GeometryTool.initGeometrys(state);
        let state = state |> setBoxGeometryVertices(geometry2, Float32Array.make([|3., 5., 5.|]));
        let state = state |> setBoxGeometryIndices(geometry2, Uint16Array.make([|1, 2, 4|]));
        (state, gameObject1, gameObject2, gameObject3, geometry1, geometry2, geometry3)
      };
      let _prepareBasicMaterialData = (state) => {
        open BasicMaterial;
        open Js.Typed_array;
        let (state, gameObject1, material1) = BasicMaterialTool.createGameObject(state^);
        let (state, gameObject2, material2) = BasicMaterialTool.createGameObject(state);
        let (state, gameObject3, material3) = BasicMaterialTool.createGameObject(state);
        let state = AllMaterialTool.prepareForInit(state);
        let state = state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
        let state = BasicMaterialTool.initMaterials([@bs] GlTool.unsafeGetGl(state), state);
        let state = state |> setBasicMaterialColor(material2, [|1., 0.1, 0.2|]);
        (state, gameObject1, gameObject2, gameObject3, material1, material2, material3)
      };
      let _prepareLightMaterialData = (state) => {
        open LightMaterial;
        open Js.Typed_array;
        let (state, gameObject1, material1) = LightMaterialTool.createGameObject(state^);
        let (state, gameObject2, material2) = LightMaterialTool.createGameObject(state);
        let (state, gameObject3, material3) = LightMaterialTool.createGameObject(state);
        let state = AllMaterialTool.prepareForInit(state);
        let state = state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
        let state = LightMaterialTool.initMaterials([@bs] GlTool.unsafeGetGl(state), state);
        /* let diffuseColor2 = [|1., 0.1, 0.2|];
           let specularColor2 = [|0., 0.1, 0.2|];
           let state = state |> setLightMaterialDiffuseColor(material2, diffuseColor2);
           let state = state |> setLightMaterialSpecularColor(material2, specularColor2); */
        (state, gameObject1, gameObject2, gameObject3, material1, material2, material3)
      };
      beforeEach(
        () => {
          sandbox := createSandbox();
          state := TestTool.initWithJobConfig(~sandbox, ())
        }
      );
      afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));
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
              let copiedState = StateTool.deepCopyForRestore(state);
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
              let copiedState = StateTool.deepCopyForRestore(state);
              let {renderGameObjectArray, gameObjectMap, disposedIndexArray} as data =
                MeshRendererTool.getMeshRendererData(copiedState);
              let data = {...data, index: 0};
              renderGameObjectArray |> Js.Array.pop |> ignore;
              disposedIndexArray |> Js.Array.pop |> ignore;
              gameObjectMap
              |> Obj.magic
              |> WonderCommonlib.SparseMapSystem.deleteVal(meshRenderer2);
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
        "deepCopyForRestore",
        () => {
          describe(
            "deep copy transform data",
            () => {
              test(
                "deep copy localToWorldMatrixMap, localPositionMap",
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
                    _prepareTransformMatrixData(state);
                  let _ = TransformAPI.getTransformPosition(transform2, state);
                  let copiedState = StateTool.deepCopyForRestore(state);
                  let data = TransformTool.getTransformData(copiedState);
                  data.localToWorldMatrixMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(transform2);
                  data.localPositionMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(transform2);
                  (
                    TransformTool.getTransformData(state).localToWorldMatrixMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(transform2)
                    |> JudgeTool.isUndefined,
                    TransformTool.getTransformData(state).localPositionMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(transform2)
                    |> JudgeTool.isUndefined
                  )
                  |> expect == (false, false)
                }
              );
              test(
                "deep copy childMap",
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
                    _prepareTransformMatrixData(state);
                  let _ = TransformAPI.getTransformPosition(transform2, state);
                  let copiedState = StateTool.deepCopyForRestore(state);
                  let (copiedState, transform4) = TransformAPI.createTransform(copiedState);
                  let _ =
                    copiedState
                    |> TransformAPI.setTransformParent(Js.Nullable.return(transform4), transform2);
                  state |> TransformAPI.unsafeGetTransformChildren(transform1) |> expect == [|transform2|]
                }
              );
              test(
                "clean normalMatrixCacheMap",
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
                    _prepareTransformMatrixData(state);
                  let _ = TransformTool.getNormalMatrixTypeArray(transform2, state);
                  let copiedState = StateTool.deepCopyForRestore(state);
                  let (copiedState, transform4) = TransformAPI.createTransform(copiedState);
                  TransformTool.getTransformData(copiedState).normalMatrixCacheMap
                  |> expect == WonderCommonlib.SparseMapSystem.createEmpty()
                }
              )
            }
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
                  let copiedState = StateTool.deepCopyForRestore(state);
                  let data = copiedState.boxGeometryRecord;
                  data.verticesMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(geometry2);
                  data.normalsMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(geometry2);
                  data.indicesMap
                  |> Obj.magic
                  |> WonderCommonlib.SparseMapSystem.deleteVal(geometry2);
                  let {verticesMap, normalsMap, indicesMap} = state.boxGeometryRecord;
                  (
                    verticesMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(geometry2)
                    |> JudgeTool.isUndefined,
                    normalsMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(geometry2)
                    |> JudgeTool.isUndefined,
                    indicesMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(geometry2)
                    |> JudgeTool.isUndefined
                  )
                  |> expect == (false, false, false)
                }
              )
          );
          describe(
            "deep copy material data",
            () => {
              describe(
                "test basic material",
                () =>
                  test(
                    "change copied state shouldn't affect source state",
                    () => {
                      open BasicMaterialType;
                      let (
                        state,
                        gameObject1,
                        gameObject2,
                        gameObject3,
                        material1,
                        material2,
                        material3
                      ) =
                        _prepareBasicMaterialData(state);
                      let copiedState = StateTool.deepCopyForRestore(state);
                      let data = BasicMaterialTool.getMaterialData(copiedState);
                      data.colorMap
                      |> Obj.magic
                      |> WonderCommonlib.SparseMapSystem.deleteVal(material2);
                      let {colorMap} = BasicMaterialTool.getMaterialData(state);
                      colorMap
                      |> WonderCommonlib.SparseMapSystem.unsafeGet(material2)
                      |> JudgeTool.isUndefined
                      |> expect == false
                    }
                  )
              );
              describe(
                "test light material",
                () =>
                  test(
                    "change copied state shouldn't affect source state",
                    () => {
                      open LightMaterialType;
                      let (
                        state,
                        gameObject1,
                        gameObject2,
                        gameObject3,
                        material1,
                        material2,
                        material3
                      ) =
                        _prepareLightMaterialData(state);
                      let copiedState = StateTool.deepCopyForRestore(state);
                      let data = LightMaterialTool.getMaterialData(copiedState);
                      data.diffuseColorMap
                      |> Obj.magic
                      |> WonderCommonlib.SparseMapSystem.deleteVal(material2);
                      data.specularColorMap
                      |> Obj.magic
                      |> WonderCommonlib.SparseMapSystem.deleteVal(material2);
                      let {diffuseColorMap, specularColorMap} =
                        LightMaterialTool.getMaterialData(state);
                      (
                        diffuseColorMap
                        |> WonderCommonlib.SparseMapSystem.unsafeGet(material2)
                        |> JudgeTool.isUndefined,
                        specularColorMap
                        |> WonderCommonlib.SparseMapSystem.unsafeGet(material2)
                        |> JudgeTool.isUndefined
                      )
                      |> expect == (false, false)
                    }
                  )
              )
            }
          );
          describe(
            "deep copy light data",
            () => {
              let _testCopyTypeArraySingleValue =
                  ((createGameObjectFunc, getDataFunc, setDataFunc, getTargetDataFunc), state) => {
                open StateDataType;
                open SourceInstanceType;
                let (state, gameObject1, light1) = createGameObjectFunc(state^);
                let (data1, data2) = getTargetDataFunc();
                let state = state |> setDataFunc(light1, data1);
                let copiedState = StateTool.deepCopyForRestore(state);
                let copiedState = copiedState |> setDataFunc(light1, data2);
                getDataFunc(light1, state) |> expect == data1
              };
              describe(
                "test ambient light",
                () => {
                  describe(
                    "copy type array data",
                    () =>
                      test(
                        "copy colors",
                        () =>
                          _testCopyTypeArraySingleValue(
                            (
                              AmbientLightTool.createGameObject,
                              AmbientLight.getAmbientLightColor,
                              AmbientLight.setAmbientLightColor,
                              () => ([|1., 1., 0.|], [|0., 1., 0.|])
                            ),
                            state
                          )
                      )
                  );
                  test(
                    "shadow copy mappedIndexMap, gameObjectMap",
                    () =>
                      StateDataType.(
                        AmbientLightType.(
                          StateTool.testShadowCopyArrayLikeMapData(
                            (state) => {
                              let {mappedIndexMap, gameObjectMap} =
                                AmbientLightTool.getLightData(state);
                              [|mappedIndexMap |> Obj.magic, gameObjectMap |> Obj.magic|]
                            },
                            state^
                          )
                        )
                      )
                  )
                }
              );
              describe(
                "test direction light",
                () => {
                  describe(
                    "copy type array data",
                    () => {
                      test(
                        "copy colors",
                        () =>
                          _testCopyTypeArraySingleValue(
                            (
                              DirectionLightTool.createGameObject,
                              DirectionLight.getDirectionLightColor,
                              DirectionLight.setDirectionLightColor,
                              () => ([|1., 1., 0.|], [|0., 1., 0.|])
                            ),
                            state
                          )
                      );
                      test(
                        "copy intensities",
                        () =>
                          _testCopyTypeArraySingleValue(
                            (
                              DirectionLightTool.createGameObject,
                              DirectionLight.getDirectionLightIntensity,
                              DirectionLight.setDirectionLightIntensity,
                              () => (2., 3.)
                            ),
                            state
                          )
                      )
                    }
                  );
                  test(
                    "shadow copy mappedIndexMap, gameObjectMap",
                    () =>
                      StateDataType.(
                        DirectionLightType.(
                          StateTool.testShadowCopyArrayLikeMapData(
                            (state) => {
                              let {mappedIndexMap, gameObjectMap} =
                                DirectionLightTool.getLightData(state);
                              [|mappedIndexMap |> Obj.magic, gameObjectMap |> Obj.magic|]
                            },
                            state^
                          )
                        )
                      )
                  )
                }
              );
              describe(
                "test point light",
                () => {
                  describe(
                    "copy type array data",
                    () => {
                      test(
                        "copy colors",
                        () =>
                          _testCopyTypeArraySingleValue(
                            (
                              PointLightTool.createGameObject,
                              PointLight.getPointLightColor,
                              PointLight.setPointLightColor,
                              () => ([|1., 1., 0.|], [|0., 1., 0.|])
                            ),
                            state
                          )
                      );
                      test(
                        "copy intensities",
                        () =>
                          _testCopyTypeArraySingleValue(
                            (
                              PointLightTool.createGameObject,
                              PointLight.getPointLightIntensity,
                              PointLight.setPointLightIntensity,
                              () => (2., 3.)
                            ),
                            state
                          )
                      );
                      test(
                        "copy constants",
                        () =>
                          _testCopyTypeArraySingleValue(
                            (
                              PointLightTool.createGameObject,
                              PointLight.getPointLightConstant,
                              PointLight.setPointLightConstant,
                              () => (2., 3.)
                            ),
                            state
                          )
                      );
                      test(
                        "copy linears",
                        () =>
                          _testCopyTypeArraySingleValue(
                            (
                              PointLightTool.createGameObject,
                              PointLight.getPointLightLinear,
                              PointLight.setPointLightLinear,
                              () => (2., 3.)
                            ),
                            state
                          )
                      );
                      test(
                        "copy quadratics",
                        () =>
                          _testCopyTypeArraySingleValue(
                            (
                              PointLightTool.createGameObject,
                              PointLight.getPointLightQuadratic,
                              PointLight.setPointLightQuadratic,
                              () => (2., 3.)
                            ),
                            state
                          )
                      );
                      test(
                        "copy ranges",
                        () =>
                          _testCopyTypeArraySingleValue(
                            (
                              PointLightTool.createGameObject,
                              PointLight.getPointLightRange,
                              PointLight.setPointLightRange,
                              () => (2., 3.)
                            ),
                            state
                          )
                      )
                    }
                  );
                  test(
                    "shadow copy mappedIndexMap, gameObjectMap",
                    () =>
                      StateDataType.(
                        PointLightType.(
                          StateTool.testShadowCopyArrayLikeMapData(
                            (state) => {
                              let {mappedIndexMap, gameObjectMap} =
                                PointLightTool.getLightData(state);
                              [|mappedIndexMap |> Obj.magic, gameObjectMap |> Obj.magic|]
                            },
                            state^
                          )
                        )
                      )
                  )
                }
              )
            }
          );
          describe(
            "deep copy sourceInstance data",
            () => {
              test(
                "deep copy objectInstanceArrayMap, matrixFloat32ArrayMap",
                () => {
                  open StateDataType;
                  open SourceInstanceType;
                  let (state, gameObject1, sourceInstance1) =
                    SourceInstanceTool.createSourceInstanceGameObject(state^);
                  let {objectInstanceArrayMap, matrixFloat32ArrayMap} =
                    SourceInstanceTool.getSourceInstanceData(state);
                  let originMatrixFloat32Array = Float32Array.make([|1.|]);
                  matrixFloat32ArrayMap
                  |> WonderCommonlib.SparseMapSystem.set(
                       sourceInstance1,
                       originMatrixFloat32Array
                     )
                  |> ignore;
                  let originObjectInstanceArray = [|20|];
                  objectInstanceArrayMap
                  |> WonderCommonlib.SparseMapSystem.set(
                       sourceInstance1,
                       originObjectInstanceArray
                     )
                  |> ignore;
                  let copiedState = StateTool.deepCopyForRestore(state);
                  let {objectInstanceArrayMap, matrixFloat32ArrayMap} =
                    SourceInstanceTool.getSourceInstanceData(copiedState);
                  let objectInstanceArray =
                    objectInstanceArrayMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(sourceInstance1);
                  objectInstanceArray |> Js.Array.push(100) |> ignore;
                  let matrixFloat32Array =
                    matrixFloat32ArrayMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(sourceInstance1);
                  Float32Array.unsafe_set(matrixFloat32Array, 0, 1000.) |> ignore;
                  let {objectInstanceArrayMap, matrixFloat32ArrayMap} =
                    SourceInstanceTool.getSourceInstanceData(state);
                  (
                    objectInstanceArrayMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(sourceInstance1),
                    matrixFloat32ArrayMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(sourceInstance1)
                  )
                  |> expect == (originObjectInstanceArray, originMatrixFloat32Array)
                }
              );
              test(
                "shadow copy matrixInstanceBufferCapacityMap, isTransformStaticMap, gameObjectMap, disposedIndexArray",
                () =>
                  StateDataType.(
                    SourceInstanceType.(
                      StateTool.testShadowCopyArrayLikeMapData(
                        (state) => {
                          let {
                            matrixInstanceBufferCapacityMap,
                            isTransformStaticMap,
                            gameObjectMap,
                            disposedIndexArray
                          } =
                            SourceInstanceTool.getSourceInstanceData(state);
                          [|
                            matrixInstanceBufferCapacityMap |> Obj.magic,
                            isTransformStaticMap |> Obj.magic,
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
                "shadow copy disposedUidMap, aliveUidArray, transformMap, basicCameraViewMap, boxGeometryMap, meshRendererMap, basicMaterialMap, lightMaterialMap, ambientLightMap, directionLightMap, pointLightMap, sourceInstanceMap, objectInstanceMap",
                () =>
                  GameObjectType.(
                    StateTool.testShadowCopyArrayLikeMapData(
                      (state) => {
                        let {
                          disposedUidMap,
                          aliveUidArray,
                          transformMap,
                          basicCameraViewMap,
                          boxGeometryMap,
                          meshRendererMap,
                          basicMaterialMap,
                          lightMaterialMap,
                          ambientLightMap,
                          directionLightMap,
                          pointLightMap,
                          sourceInstanceMap,
                          objectInstanceMap
                        } =
                          GameObjectTool.getGameObjectData(state);
                        [|
                          disposedUidMap |> Obj.magic,
                          aliveUidArray |> Obj.magic,
                          transformMap |> Obj.magic,
                          basicCameraViewMap |> Obj.magic,
                          boxGeometryMap |> Obj.magic,
                          meshRendererMap |> Obj.magic,
                          basicMaterialMap |> Obj.magic,
                          lightMaterialMap |> Obj.magic,
                          ambientLightMap |> Obj.magic,
                          directionLightMap |> Obj.magic,
                          pointLightMap |> Obj.magic,
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
            "deep copy basicCameraView data",
            () =>
              test(
                "shadow copy gameObjectMap, disposedIndexArray",
                () =>
                  BasicCameraViewType.(
                    StateTool.testShadowCopyArrayLikeMapData(
                      (state) => {
                        let {gameObjectMap, disposedIndexArray} = state.basicCameraViewRecord;
                        [|gameObjectMap |> Obj.magic, disposedIndexArray |> Obj.magic|]
                      },
                      state^
                    )
                  )
              )
          );
          describe(
            "deep copy basicCameraView data",
            () => {
              test(
                "shadow copy dirtyArray, nearMap, farMap, fovyMap, aspectMap, gameObjectMap, disposedIndexArray",
                () =>
                  PerspectiveCameraProjectionType.(
                    StateTool.testShadowCopyArrayLikeMapData(
                      (state) => {
                        let {
                          dirtyArray,
                          nearMap,
                          farMap,
                          fovyMap,
                          aspectMap,
                          gameObjectMap,
                          disposedIndexArray
                        } =
                          state.perspectiveCameraProjectionRecord;
                        [|
                          dirtyArray |> Obj.magic,
                          nearMap |> Obj.magic,
                          farMap |> Obj.magic,
                          fovyMap |> Obj.magic,
                          aspectMap |> Obj.magic,
                          gameObjectMap |> Obj.magic,
                          disposedIndexArray |> Obj.magic
                        |]
                      },
                      state^
                    )
                  )
              );
              test(
                "deep copy pMatrixMap",
                () => {
                  open PerspectiveCameraProjectionType;
                  let (
                    state,
                    gameObject1,
                    gameObject2,
                    gameObject3,
                    perspectiveCameraProjection1,
                    perspectiveCameraProjection2,
                    perspectiveCameraProjection3
                  ) =
                    _preparePerspectiveCameraProjectionData(state);
                  let copiedState = StateTool.deepCopyForRestore(state);
                  let {pMatrixMap} as record = copiedState.perspectiveCameraProjectionRecord;
                  let record = {...record, index: 0};
                  Js.Typed_array.Float32Array.unsafe_set(
                    pMatrixMap |> WonderCommonlib.SparseMapSystem.unsafeGet(0),
                    1,
                    10.0
                  );
                  let oldPMatrix =
                    state.perspectiveCameraProjectionRecord.pMatrixMap
                    |> WonderCommonlib.SparseMapSystem.unsafeGet(0);
                  Js.Typed_array.Float32Array.unsafe_get(oldPMatrix, 1) |> expect != 10.0
                }
              )
            }
          )
        }
      );
      describe(
        "restore",
        () => {
          let _testRestoreStateEqualTargetState = (state, prepareDataFunc, getDataFunc) => {
            let (state, _, _, _, _, _, _) = prepareDataFunc(state);
            let currentState = StateTool.createNewCompleteStateWithRenderConfigData(sandbox);
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
                  MeshRendererTool.createGameObject(StateTool.createNewCompleteState(sandbox));
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
                    MeshRendererTool.createGameObject(StateTool.createNewCompleteState(sandbox));
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
                    StateTool.restore(currentState, state |> StateTool.deepCopyForRestore);
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
                "add current state->transformRecord->localToWorldMatrixMap, localPositionMap typeArr to pool",
                () => {
                  open TypeArrayPoolType;
                  let (state, _, _, _, _, _, _) = _prepareTransformMatrixData(state);
                  let (currentState, _, transform4) =
                    GameObjectTool.createGameObject(StateTool.createNewCompleteState(sandbox));
                  let pos4 = ((-1.), 4., 5.);
                  let currentState =
                    TransformAPI.setTransformLocalPosition(transform4, pos4, currentState);
                  let _ = StateTool.restore(currentState, state);
                  let {float32ArrayPoolMap} =
                    StateTool.getState().typeArrayPoolRecord;
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
                "add current state->boxGeometryRecord->verticesMap, normalsMap, indicesMap typeArr to pool",
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
                    BoxGeometryTool.createGameObject(StateTool.createNewCompleteState(sandbox));
                  let currentState = GeometryTool.initGeometry(geometry4, currentState);
                  let _ = StateTool.restore(currentState, state);
                  let {float32ArrayPoolMap, uint16ArrayPoolMap} =
                    StateTool.getState().typeArrayPoolRecord;
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
          );
          describe(
            "restore material data to target state",
            () => {
              test(
                "test basic material",
                () =>
                  _testRestoreStateEqualTargetState(
                    state,
                    _prepareBasicMaterialData,
                    BasicMaterialTool.getMaterialData
                  )
              );
              test(
                "test light material",
                () =>
                  _testRestoreStateEqualTargetState(
                    state,
                    _prepareLightMaterialData,
                    LightMaterialTool.getMaterialData
                  )
              )
            }
          );
          describe(
            "restore light data to target state",
            () => {
              let _prepareLightData = (createGameObjectFunc, state) => {
                open LightMaterial;
                open Js.Typed_array;
                let (state, gameObject1, light1) = createGameObjectFunc(state^);
                let (state, gameObject2, light2) = createGameObjectFunc(state);
                let (state, gameObject3, light3) = createGameObjectFunc(state);
                let state = AllMaterialTool.prepareForInit(state);
                let state = state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
                (state, gameObject1, gameObject2, gameObject3, light1, light2, light3)
              };
              let _prepareAmbientLightData = (state) => {
                open LightMaterial;
                open Js.Typed_array;
                let (state, gameObject1, light1) = AmbientLightTool.createGameObject(state^);
                let (state, gameObject2, light2) = AmbientLightTool.createGameObject(state);
                let (state, gameObject3, light3) = AmbientLightTool.createGameObject(state);
                let state = AllMaterialTool.prepareForInit(state);
                let state = state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
                (state, gameObject1, gameObject2, gameObject3, light1, light2, light3)
              };
              test(
                "test ambient light",
                () =>
                  _testRestoreStateEqualTargetState(
                    state,
                    _prepareLightData(AmbientLightTool.createGameObject),
                    AmbientLightTool.getLightData
                  )
              );
              test(
                "test direction light",
                () =>
                  _testRestoreStateEqualTargetState(
                    state,
                    _prepareLightData(DirectionLightTool.createGameObject),
                    DirectionLightTool.getLightData
                  )
              );
              test(
                "test point light",
                () =>
                  _testRestoreStateEqualTargetState(
                    state,
                    _prepareLightData(PointLightTool.createGameObject),
                    PointLightTool.getLightData
                  )
              )
            }
          );
          describe(
            "restore sourceInstance data to target state",
            () => {
              test(
                "add current state->sourceInstanceData->matrixFloat32ArrayMap typeArr to pool",
                () => {
                  open StateDataType;
                  open SourceInstanceType;
                  open TypeArrayPoolType;
                  let state = state^;
                  let currentState = StateTool.createNewCompleteState(sandbox);
                  let {matrixFloat32ArrayMap} =
                    SourceInstanceTool.getSourceInstanceData(currentState);
                  let index = 0;
                  let typeArr = Float32Array.make([|1.|]);
                  matrixFloat32ArrayMap |> WonderCommonlib.SparseMapSystem.set(index, typeArr);
                  let _ = StateTool.restore(currentState, state);
                  let {float32ArrayPoolMap}: typeArrayPoolRecord =
                    StateTool.getState().typeArrayPoolRecord;
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
                  let {isSendTransformMatrixDataMap} =
                    SourceInstanceTool.getSourceInstanceData(state);
                  isSendTransformMatrixDataMap
                  |> WonderCommonlib.SparseMapSystem.set(0, true)
                  |> WonderCommonlib.SparseMapSystem.set(1, false)
                  |> ignore;
                  let _ = StateTool.restore(StateTool.createNewCompleteState(sandbox), state);
                  let {isSendTransformMatrixDataMap} =
                    SourceInstanceTool.getSourceInstanceData(StateTool.getState());
                  isSendTransformMatrixDataMap |> expect == [|false, false|]
                }
              )
            }
          );
          test(
            "restore basicCameraView data to target state",
            () =>
              _testRestoreStateEqualTargetState(
                state,
                _prepareBasicCameraViewData,
                (state) => state.basicCameraViewRecord
              )
          );
          test(
            "restore perspectiveCameraProjection data to target state",
            () =>
              _testRestoreStateEqualTargetState(
                state,
                _preparePerspectiveCameraProjectionData,
                (state) => state.perspectiveCameraProjectionRecord
              )
          )
        }
      )
    }
  );