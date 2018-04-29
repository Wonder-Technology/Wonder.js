open Wonder_jest;

open Js.Typed_array;

let _ =
  describe(
    "test redo,undo component record",
    () => {
      open Expect;
      open Expect.Operators;
      open Sinon;
      let sandbox = getSandboxDefaultVal();
      let state = ref(MainStateTool.createState());
      let _prepareMeshRendererData = (state) => {
        let (state, gameObject1, meshRenderer1) =
          MeshRendererTool.createBasicMaterialGameObject(state^);
        let (state, gameObject2, meshRenderer2) =
          MeshRendererTool.createLightMaterialGameObject(state);
        let (state, gameObject3, meshRenderer3) =
          MeshRendererTool.createBasicMaterialGameObject(state);
        let state =
          state
          |> GameObjectTool.disposeGameObjectMeshRendererComponent(gameObject3, meshRenderer3);
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
          state
          |> GameObjectTool.disposeGameObjectTransformComponent(gameObject3, transform3, false);
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
          |> GameObjectTool.disposeGameObjectBasicCameraViewComponent(
               gameObject3,
               basicCameraView3
             );
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
          |> GameObjectTool.disposeGameObjectPerspectiveCameraProjectionComponent(
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
      let _prepareBasicMaterialData = (state) => {
        open BasicMaterialAPI;
        open Js.Typed_array;
        let (state, gameObject1, material1) = BasicMaterialTool.createGameObject(state^);
        let (state, gameObject2, material2) = BasicMaterialTool.createGameObject(state);
        let (state, gameObject3, material3) = BasicMaterialTool.createGameObject(state);
        let state = AllMaterialTool.prepareForInit(state);
        /* let state = state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
           let state = BasicMaterialTool.initMaterials([@bs] GlTool.unsafeGetGl(state), state); */
        let state = state |> setBasicMaterialColor(material2, [|1., 0.5, 0.0|]);
        (state, gameObject1, gameObject2, gameObject3, material1, material2, material3)
      };
      let _prepareLightMaterialData = (state) => {
        open LightMaterialAPI;
        open Js.Typed_array;
        let (state, gameObject1, material1) = LightMaterialTool.createGameObject(state^);
        let (state, gameObject2, material2) = LightMaterialTool.createGameObject(state);
        let (state, gameObject3, material3) = LightMaterialTool.createGameObject(state);
        let state = AllMaterialTool.prepareForInit(state);
        /* let state = state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
           let state = LightMaterialTool.initMaterials([@bs] GlTool.unsafeGetGl(state), state); */
        let diffuseColor2 = [|1., 0.5, 0.0|];
        /* let specularColor2 = [|0., 0.1, 0.2|]; */
        let state = state |> setLightMaterialDiffuseColor(material2, diffuseColor2);
        /* let state = state |> setLightMaterialSpecularColor(material2, specularColor2); */
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
        "deep copy meshRenderer record",
        () => {
          test(
            "copied record should equal to source record",
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
              let copiedState = MainStateTool.deepCopyForRestore(state);
              MeshRendererTool.getMeshRendererRecord(copiedState)
              |>
              expect == {
                          index: 3,
                          basicMaterialRenderGameObjectArray: [|gameObject1|],
                          lightMaterialRenderGameObjectArray: [|gameObject2|],
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
            "changing copied state shouldn't affect source state",
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
              let copiedState = MainStateTool.deepCopyForRestore(state);
              let {
                    basicMaterialRenderGameObjectArray,
                    lightMaterialRenderGameObjectArray,
                    gameObjectMap,
                    disposedIndexArray
                  } as record =
                MeshRendererTool.getMeshRendererRecord(copiedState);
              let record = {...record, index: 0};
              basicMaterialRenderGameObjectArray |> Js.Array.pop |> ignore;
              lightMaterialRenderGameObjectArray |> Js.Array.pop |> ignore;
              disposedIndexArray |> Js.Array.pop |> ignore;
              gameObjectMap
              |> Obj.magic
              |> WonderCommonlib.SparseMapService.deleteVal(meshRenderer2);
              MeshRendererTool.getMeshRendererRecord(state)
              |>
              expect == {
                          index: 3,
                          basicMaterialRenderGameObjectArray: [|gameObject1|],
                          lightMaterialRenderGameObjectArray: [|gameObject2|],
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
          let _testCopyTypeArraySingleValue =
              ((createGameObjectFunc, getDataFunc, setDataFunc, getTargetDataFunc), state) => {
            open StateDataMainType;
            /* open SourceInstanceType; */
            let (state, gameObject1, component1) = createGameObjectFunc(state^);
            let (data1, data2) = getTargetDataFunc();
            let state = state |> setDataFunc(component1, data1);
            let copiedState = MainStateTool.deepCopyForRestore(state);
            let copiedState = copiedState |> setDataFunc(component1, data2);
            getDataFunc(component1, state) |> expect == data1
          };
          describe(
            "deep copy transform record",
            () => {
              /* test(
                   "copy localToWorldMatrices",
                   () =>
                     _testCopyTypeArraySingleValue(
                       (
                         GameObjectTool.createGameObject,
                         TransformTool.getLocalToWorldMatrix,
                         TransformTool.setLocalToWorldMatrix,
                         () => (
                           [|2., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1.|],
                           [|3., 1., 0., 0., 0., 1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1.|]
                         )
                       ),
                       state
                     )
                 );
                 test(
                   "copy localPositions",
                   () =>
                     _testCopyTypeArraySingleValue(
                       (
                         GameObjectTool.createGameObject,
                         TransformAPI.getTransformLocalPosition,
                         TransformAPI.setTransformLocalPosition,
                         () => ((2., 0., 0.), (3., 1., 2.))
                       ),
                       state
                     )
                 ); */
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
                  let copiedState = MainStateTool.deepCopyForRestore(state);
                  let (copiedState, transform4) = TransformAPI.createTransform(copiedState);
                  let _ =
                    copiedState
                    |> TransformAPI.setTransformParent(Js.Nullable.return(transform4), transform2);
                  state
                  |> TransformAPI.unsafeGetTransformChildren(transform1)
                  |> expect == [|transform2|]
                }
              );
              test(
                "clean localToWorldMatrixCacheMap, normalMatrixCacheMap",
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
                  let _ = TransformTool.updateAndGetNormalMatrixTypeArray(transform2, state);
                  let copiedState = MainStateTool.deepCopyForRestore(state);
                  let (copiedState, transform4) = TransformAPI.createTransform(copiedState);
                  let {localToWorldMatrixCacheMap, normalMatrixCacheMap} =
                    TransformTool.getRecord(copiedState);
                  (localToWorldMatrixCacheMap, normalMatrixCacheMap)
                  |>
                  expect == (
                              WonderCommonlib.SparseMapService.createEmpty(),
                              WonderCommonlib.SparseMapService.createEmpty()
                            )
                }
              )
            }
          );
          /* describe(
               "deep copy geometry record",
               () =>
                 /* describe(
                      "deep copy box geometry record",
                      () => {
                        test(
                          "copy vertices",
                          () =>
                            _testCopyTypeArraySingleValue(
                              (
                                GameObjectTool.createGameObject,
                                BoxGeometryAPI.getBoxGeometryVertices,
                                BoxGeometryTool.setVertices,
                                () => (
                                  Float32Array.make([|
                                    2.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    1.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    1.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    1.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.
                                  |]),
                                  Float32Array.make([|
                                    4.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    1.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    1.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    1.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.
                                  |])
                                )
                              ),
                              state
                            )
                        );
                        test(
                          "copy normals",
                          () =>
                            _testCopyTypeArraySingleValue(
                              (
                                GameObjectTool.createGameObject,
                                BoxGeometryAPI.getBoxGeometryNormals,
                                BoxGeometryTool.setNormals,
                                () => (
                                  Float32Array.make([|
                                    2.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    1.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    1.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    1.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.
                                  |]),
                                  Float32Array.make([|
                                    4.,
                                    2.,
                                    0.,
                                    0.,
                                    0.,
                                    1.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    1.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    1.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.,
                                    0.
                                  |])
                                )
                              ),
                              state
                            )
                        );
                        test(
                          "copy indices",
                          () =>
                            _testCopyTypeArraySingleValue(
                              (
                                GameObjectTool.createGameObject,
                                BoxGeometryAPI.getBoxGeometryIndices,
                                BoxGeometryTool.setIndices,
                                () => (
                                  Uint16Array.make([|
                                    4,
                                    0,
                                    0,
                                    0,
                                    0,
                                    1,
                                    0,
                                    0,
                                    0,
                                    0,
                                    1,
                                    0,
                                    0,
                                    0,
                                    0,
                                    1,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0
                                  |]),
                                  Uint16Array.make([|
                                    7,
                                    0,
                                    0,
                                    0,
                                    0,
                                    1,
                                    0,
                                    0,
                                    0,
                                    0,
                                    1,
                                    0,
                                    0,
                                    0,
                                    0,
                                    1,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0
                                  |])
                                )
                              ),
                              state
                            )
                        )
                      }
                    ); */
                 /* describe(
                   "deep copy custom geometry record",
                   () =>
                     test(
                       "copy verticesInfos",
                       () => {
                         open StateDataMainType;
                         open CustomGeometryAPI;
                         open GeometryType;
                         let (state, gameObject1, geometry1) =
                           GameObjectTool.createGameObject(state^);
                         let vertices1 = Float32Array.make([|10.|]);
                         let state = state |> setCustomGeometryVertices(geometry1, vertices1);
                         let copiedState = MainStateTool.deepCopyForRestore(state);
                         CustomGeometryTool.getRecord(copiedState).verticesInfos[0] = {
                           startIndex: 10,
                           endIndex: 20
                         };
                         CustomGeometryTool.getRecord(state).verticesInfos[0]
                         |> expect == {startIndex: 0, endIndex: 1}
                       }
                     )
                 ) */
             ); */
          /* test(
               "copy vertices",
               () =>
                 _testCopyTypeArraySingleValue(
                   (
                     GameObjectTool.createGameObject,
                     CustomGeometryAPI.getCustomGeometryVertices,
                     CustomGeometryAPI.setCustomGeometryVertices,
                     () => (
                       Float32Array.make([|2., 0., 0.|]),
                       Float32Array.make([|4., 0., 0.|])
                     )
                   ),
                   state
                 )
             );
             test(
               "copy normals",
               () =>
                 _testCopyTypeArraySingleValue(
                   (
                     GameObjectTool.createGameObject,
                     CustomGeometryAPI.getCustomGeometryNormals,
                     CustomGeometryAPI.setCustomGeometryNormals,
                     () => (
                       Float32Array.make([|2., 0., 0.|]),
                       Float32Array.make([|4., 0., 0.|])
                     )
                   ),
                   state
                 )
             );
             test(
               "copy indices",
               () =>
                 _testCopyTypeArraySingleValue(
                   (
                     GameObjectTool.createGameObject,
                     CustomGeometryAPI.getCustomGeometryIndices,
                     CustomGeometryAPI.setCustomGeometryIndices,
                     () => (Uint16Array.make([|2, 0, 0|]), Uint16Array.make([|4|]))
                   ),
                   state
                 )
             ) */
          /* test(
               "change copied state shouldn't affect source state",
               () => {
                 open StateDataMainType;
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
                 let copiedState = MainStateTool.deepCopyForRestore(state);
                 let record = copiedState.boxGeometryRecord;
                 record.verticesMap
                 |> Obj.magic
                 |> WonderCommonlib.SparseMapService.deleteVal(geometry2);
                 record.normalsMap
                 |> Obj.magic
                 |> WonderCommonlib.SparseMapService.deleteVal(geometry2);
                 record.indicesMap
                 |> Obj.magic
                 |> WonderCommonlib.SparseMapService.deleteVal(geometry2);
                 let {verticesMap, normalsMap, indicesMap} = state.boxGeometryRecord;
                 (
                   verticesMap
                   |> WonderCommonlib.SparseMapService.unsafeGet(geometry2)
                   |> JudgeTool.isUndefined,
                   normalsMap
                   |> WonderCommonlib.SparseMapService.unsafeGet(geometry2)
                   |> JudgeTool.isUndefined,
                   indicesMap
                   |> WonderCommonlib.SparseMapService.unsafeGet(geometry2)
                   |> JudgeTool.isUndefined
                 )
                 |> expect == (false, false, false)
               }
             ) */
          describe(
            "deep copy material record",
            () => {
              describe(
                "test basic material",
                () =>
                  test(
                    "shadow copy materialArrayForWorkerInit",
                    () =>
                      StateDataMainType.(
                        BasicMaterialType.(
                          MainStateTool.testShadowCopyArrayLikeMapData(
                            (state) => {
                              let {materialArrayForWorkerInit} =
                                BasicMaterialTool.getRecord(state);
                              [|materialArrayForWorkerInit |> Obj.magic |> Obj.magic|]
                            },
                            state^
                          )
                        )
                      )
                  )
              );
              describe(
                "test light material",
                () =>
                  test(
                    "shadow copy materialArrayForWorkerInit",
                    () =>
                      StateDataMainType.(
                        LightMaterialType.(
                          MainStateTool.testShadowCopyArrayLikeMapData(
                            (state) => {
                              let {materialArrayForWorkerInit} =
                                LightMaterialTool.getRecord(state);
                              [|materialArrayForWorkerInit |> Obj.magic |> Obj.magic|]
                            },
                            state^
                          )
                        )
                      )
                  )
              )
            }
          );
          /*

           describe(
                "deep copy material record",
                () => {
                  describe(
                    "test basic material",
                    () =>
                      test(
                        "copy colors",
                        () =>
                          _testCopyTypeArraySingleValue(
                            (
                              GameObjectTool.createGameObject,
                              (material, state) =>
                                BasicMaterialAPI.getBasicMaterialColor(material, state)
                                |> TypeArrayTool.truncateArray,
                              BasicMaterialAPI.setBasicMaterialColor,
                              () => ([|0.1, 0., 0.|], [|0.2, 0., 0.|])
                            ),
                            state
                          )
                      )
                  );
                  describe(
                    "test light material",
                    () => {
                      test(
                        "copy diffuseColors",
                        () =>
                          _testCopyTypeArraySingleValue(
                            (
                              GameObjectTool.createGameObject,
                              (material, state) =>
                                LightMaterialAPI.getLightMaterialDiffuseColor(material, state)
                                |> TypeArrayTool.truncateArray,
                              LightMaterialAPI.setLightMaterialDiffuseColor,
                              () => ([|0.1, 0., 0.|], [|0.2, 0., 0.|])
                            ),
                            state
                          )
                      );
                      test(
                        "copy specularColors",
                        () =>
                          _testCopyTypeArraySingleValue(
                            (
                              GameObjectTool.createGameObject,
                              (material, state) =>
                                LightMaterialAPI.getLightMaterialSpecularColor(material, state)
                                |> TypeArrayTool.truncateArray,
                              LightMaterialAPI.setLightMaterialSpecularColor,
                              () => ([|0.1, 0., 0.|], [|0.2, 0., 0.|])
                            ),
                            state
                          )
                      );
                      test(
                        "copy shininess",
                        () =>
                          _testCopyTypeArraySingleValue(
                            (
                              GameObjectTool.createGameObject,
                              LightMaterialAPI.getLightMaterialShininess,
                              LightMaterialAPI.setLightMaterialShininess,
                              () => (1., 2.)
                            ),
                            state
                          )
                      )
                    }
                  )
                }
              ); */
          describe(
            "deep copy light record",
            () => {
              describe(
                "test ambient light",
                () =>
                  /* describe(
                       "copy type array record",
                       () =>
                         test(
                           "copy colors",
                           () =>
                             _testCopyTypeArraySingleValue(
                               (
                                 AmbientLightTool.createGameObject,
                                 AmbientLightAPI.getAmbientLightColor,
                                 AmbientLightAPI.setAmbientLightColor,
                                 () => ([|1., 1., 0.|], [|0., 1., 0.|])
                               ),
                               state
                             )
                         )
                     ); */
                  test(
                    "shadow copy mappedIndexMap, gameObjectMap",
                    () =>
                      StateDataMainType.(
                        AmbientLightType.(
                          MainStateTool.testShadowCopyArrayLikeMapData(
                            (state) => {
                              let {mappedIndexMap, gameObjectMap} =
                                AmbientLightTool.getRecord(state);
                              [|mappedIndexMap |> Obj.magic, gameObjectMap |> Obj.magic|]
                            },
                            state^
                          )
                        )
                      )
                  )
              );
              describe(
                "test direction light",
                () =>
                  /* describe(
                       "copy type array record",
                       () => {
                         test(
                           "copy colors",
                           () =>
                             _testCopyTypeArraySingleValue(
                               (
                                 DirectionLightTool.createGameObject,
                                 DirectionLightAPI.getDirectionLightColor,
                                 DirectionLightAPI.setDirectionLightColor,
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
                                 DirectionLightAPI.getDirectionLightIntensity,
                                 DirectionLightAPI.setDirectionLightIntensity,
                                 () => (2., 3.)
                               ),
                               state
                             )
                         )
                       }
                     ); */
                  test(
                    "shadow copy mappedIndexMap, gameObjectMap",
                    () =>
                      StateDataMainType.(
                        DirectionLightType.(
                          MainStateTool.testShadowCopyArrayLikeMapData(
                            (state) => {
                              let {mappedIndexMap, gameObjectMap} =
                                DirectionLightTool.getRecord(state);
                              [|mappedIndexMap |> Obj.magic, gameObjectMap |> Obj.magic|]
                            },
                            state^
                          )
                        )
                      )
                  )
              );
              describe(
                "test point light",
                () =>
                  /* describe(
                       "copy type array record",
                       () => {
                         test(
                           "copy colors",
                           () =>
                             _testCopyTypeArraySingleValue(
                               (
                                 PointLightTool.createGameObject,
                                 PointLightAPI.getPointLightColor,
                                 PointLightAPI.setPointLightColor,
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
                                 PointLightAPI.getPointLightIntensity,
                                 PointLightAPI.setPointLightIntensity,
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
                                 PointLightAPI.getPointLightConstant,
                                 PointLightAPI.setPointLightConstant,
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
                                 PointLightAPI.getPointLightLinear,
                                 PointLightAPI.setPointLightLinear,
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
                                 PointLightAPI.getPointLightQuadratic,
                                 PointLightAPI.setPointLightQuadratic,
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
                                 PointLightAPI.getPointLightRange,
                                 PointLightAPI.setPointLightRange,
                                 () => (2., 3.)
                               ),
                               state
                             )
                         )
                       }
                     ); */
                  test(
                    "shadow copy mappedIndexMap, gameObjectMap",
                    () =>
                      StateDataMainType.(
                        PointLightType.(
                          MainStateTool.testShadowCopyArrayLikeMapData(
                            (state) => {
                              let {mappedIndexMap, gameObjectMap} =
                                PointLightTool.getRecord(state);
                              [|mappedIndexMap |> Obj.magic, gameObjectMap |> Obj.magic|]
                            },
                            state^
                          )
                        )
                      )
                  )
              )
            }
          );
          describe(
            "deep copy sourceInstance record",
            () => {
              test(
                "deep copy matrixFloat32ArrayMap",
                () => {
                  open StateDataMainType;
                  open SourceInstanceType;
                  let (state, gameObject1, sourceInstance1) =
                    SourceInstanceTool.createSourceInstanceGameObject(state^);
                  let {matrixFloat32ArrayMap} = SourceInstanceTool.getRecord(state);
                  let originMatrixFloat32Array = Float32Array.make([|1.|]);
                  matrixFloat32ArrayMap
                  |> WonderCommonlib.SparseMapService.set(
                       sourceInstance1,
                       originMatrixFloat32Array
                     )
                  |> ignore;
                  let copiedState = MainStateTool.deepCopyForRestore(state);
                  let {matrixFloat32ArrayMap} = SourceInstanceTool.getRecord(copiedState);
                  let matrixFloat32Array =
                    matrixFloat32ArrayMap
                    |> WonderCommonlib.SparseMapService.unsafeGet(sourceInstance1);
                  Float32Array.unsafe_set(matrixFloat32Array, 0, 1000.) |> ignore;
                  let {matrixFloat32ArrayMap} = SourceInstanceTool.getRecord(state);
                  matrixFloat32ArrayMap
                  |> WonderCommonlib.SparseMapService.unsafeGet(sourceInstance1)
                  |> expect == originMatrixFloat32Array
                }
              );
              test(
                "shadow copy objectInstanceTransformIndexMap, matrixInstanceBufferCapacityMap, gameObjectMap, disposedIndexArray",
                () =>
                  StateDataMainType.(
                    SourceInstanceType.(
                      MainStateTool.testShadowCopyArrayLikeMapData(
                        (state) => {
                          let {
                            objectInstanceTransformIndexMap,
                            matrixInstanceBufferCapacityMap,
                            gameObjectMap,
                            disposedIndexArray
                          } =
                            SourceInstanceTool.getRecord(state);
                          [|
                            objectInstanceTransformIndexMap |> Obj.magic,
                            matrixInstanceBufferCapacityMap |> Obj.magic,
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
            "deep copy gameObject record",
            () =>
              test(
                "shadow copy disposedUidMap,\n\n        disposedUidArray,\n        disposedUidArrayForKeepOrder,\n        disposedBasicCameraViewArray,\n        disposedTransformArray,\n        disposedTransformArrayForKeepOrder,\n        disposedPerspectiveCameraProjectionArray,\n        disposedBasicMaterialArray,\n        disposedLightMaterialArray,\n        disposedBoxGeometryArray,\n        disposedCustomGeometryArray,\n        disposedSourceInstanceArray,\n        disposedObjectInstanceArray,\n        disposedAmbientLightArray,\n        disposedDirectionLightArray,\n        disposedPointLightArray,\n        disposedMeshRendererComponentArray,\n        disposedMeshRendererUidArray,\n                \n                \n                aliveUidArray, transformMap, basicCameraViewMap, currentGeometryDataMap, meshRendererMap, basicMaterialMap, lightMaterialMap, ambientLightMap, directionLightMap, pointLightMap, sourceInstanceMap, objectInstanceMap",
                () =>
                  StateDataMainType.(
                    GameObjectType.(
                      MainStateTool.testShadowCopyArrayLikeMapData(
                        (state) => {
                          let {
                            disposedUidMap,
                            disposedUidArray,
                            disposedUidArrayForKeepOrder,
                            disposedBasicCameraViewArray,
                            disposedTransformArray,
                            disposedTransformArrayForKeepOrder,
                            disposedPerspectiveCameraProjectionArray,
                            disposedBasicMaterialArray,
                            disposedLightMaterialArray,
                            disposedBoxGeometryArray,
                            disposedCustomGeometryArray,
                            disposedSourceInstanceArray,
                            disposedObjectInstanceArray,
                            disposedAmbientLightArray,
                            disposedDirectionLightArray,
                            disposedPointLightArray,
                            disposedMeshRendererComponentArray,
                            disposedMeshRendererUidArray,
                            aliveUidArray,
                            transformMap,
                            basicCameraViewMap,
                            currentGeometryDataMap,
                            meshRendererMap,
                            basicMaterialMap,
                            lightMaterialMap,
                            ambientLightMap,
                            directionLightMap,
                            pointLightMap,
                            sourceInstanceMap,
                            objectInstanceMap
                          } =
                            GameObjectTool.getGameObjectRecord(state);
                          [|
                            disposedUidMap |> Obj.magic,
                            disposedUidArray |> Obj.magic,
                            disposedUidArrayForKeepOrder |> Obj.magic,
                            disposedBasicCameraViewArray |> Obj.magic,
                            disposedTransformArray |> Obj.magic,
                            disposedTransformArrayForKeepOrder |> Obj.magic,
                            disposedPerspectiveCameraProjectionArray |> Obj.magic,
                            disposedBasicMaterialArray |> Obj.magic,
                            disposedLightMaterialArray |> Obj.magic,
                            disposedBoxGeometryArray |> Obj.magic,
                            disposedCustomGeometryArray |> Obj.magic,
                            disposedSourceInstanceArray |> Obj.magic,
                            disposedObjectInstanceArray |> Obj.magic,
                            disposedAmbientLightArray |> Obj.magic,
                            disposedDirectionLightArray |> Obj.magic,
                            disposedPointLightArray |> Obj.magic,
                            disposedMeshRendererComponentArray |> Obj.magic,
                            disposedMeshRendererUidArray |> Obj.magic,
                            aliveUidArray |> Obj.magic,
                            transformMap |> Obj.magic,
                            basicCameraViewMap |> Obj.magic,
                            currentGeometryDataMap |> Obj.magic,
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
              )
          );
          describe(
            "deep copy objectInstance record",
            () =>
              test(
                "shadow copy sourceInstanceMap, gameObjectMap, disposedIndexArray",
                () =>
                  StateDataMainType.(
                    ObjectInstanceType.(
                      MainStateTool.testShadowCopyArrayLikeMapData(
                        (state) => {
                          let {sourceInstanceMap, gameObjectMap, disposedIndexArray} =
                            ObjectInstanceTool.getObjectInstanceRecord(state);
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
            "deep copy basicCameraView record",
            () =>
              test(
                "shadow copy gameObjectMap, disposedIndexArray",
                () =>
                  BasicCameraViewType.(
                    MainStateTool.testShadowCopyArrayLikeMapData(
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
            "deep copy basicCameraView record",
            () => {
              test(
                "shadow copy dirtyArray, nearMap, farMap, fovyMap, aspectMap, gameObjectMap, disposedIndexArray",
                () =>
                  PerspectiveCameraProjectionType.(
                    MainStateTool.testShadowCopyArrayLikeMapData(
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
                  let copiedState = MainStateTool.deepCopyForRestore(state);
                  let {pMatrixMap} as record = copiedState.perspectiveCameraProjectionRecord;
                  let record = {...record, index: 0};
                  Js.Typed_array.Float32Array.unsafe_set(
                    pMatrixMap |> WonderCommonlib.SparseMapService.unsafeGet(0),
                    1,
                    10.0
                  );
                  let oldPMatrix =
                    state.perspectiveCameraProjectionRecord.pMatrixMap
                    |> WonderCommonlib.SparseMapService.unsafeGet(0);
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
            let currentState = MainStateTool.createNewCompleteStateWithRenderConfig(sandbox);
            let (currentState, _, _, _, _, _, _) = prepareDataFunc(ref(currentState));
            let _ = MainStateTool.restore(currentState, state);
            MainStateTool.unsafeGetState() |> getDataFunc |> expect == (state |> getDataFunc)
            /* expect(1) == 1; */
          };
          describe(
            "restore meshRenderer record to target state",
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
                let state = AllMaterialTool.prepareForInit(state);
                let (currentState, gameObject4, meshRenderer4) =
                  MeshRendererTool.createBasicMaterialGameObject(
                    MainStateTool.createNewCompleteState(sandbox)
                  );
                let currentState = AllMaterialTool.pregetGLSLData(currentState);
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
                  let currentState = MainStateTool.restore(currentState, state);
                  MainStateTool.unsafeGetState() |> expect == currentState
                }
              );
              test(
                "change restored state should affect source state",
                () => {
                  let ((state, _, _, _, _, _, _), (currentState, _, _)) = _prepare(state);
                  let currentState = MainStateTool.restore(currentState, state);
                  let (currentState, gameObject5, meshRenderer5) =
                    MeshRendererTool.createBasicMaterialGameObject(
                      MainStateTool.createNewCompleteState(sandbox)
                    );
                  state
                  |> MeshRendererAPI.unsafeGetMeshRendererGameObject(meshRenderer5)
                  |> expect == gameObject5
                }
              );
              test(
                "changing restored state which is restored from deep copied state shouldn't affect source state",
                () => {
                  let (
                    (state, gameObject1, gameObject2, gameObject3, _, _, _),
                    (currentState, _, _)
                  ) =
                    _prepare(state);
                  let currentState =
                    MainStateTool.restore(currentState, state |> MainStateTool.deepCopyForRestore);
                  let (currentState, _, _) =
                    MeshRendererTool.createBasicMaterialGameObject(currentState);
                  (
                    MeshRendererTool.getMeshRendererRecord(state).
                      basicMaterialRenderGameObjectArray,
                    MeshRendererTool.getMeshRendererRecord(state).
                      lightMaterialRenderGameObjectArray
                  )
                  |> expect == ([|gameObject1|], [|gameObject2|])
                }
              )
            }
          );
          describe(
            "restore transform record to target state",
            () =>
              test(
                "get target buffer to current buffer",
                () => {
                  open TransformType;
                  state :=
                    TestTool.initWithJobConfigWithoutBuildFakeDom(
                      ~sandbox,
                      ~buffer=SettingTool.buildBufferConfigStr(~transformDataBufferCount=5, ()),
                      ()
                    );
                  let (state, gameObject1, gameObject2, _, transform1, transform2, _) =
                    _prepareTransformMatrixData(state);
                  let state = TransformTool.update(transform1, state);
                  let state = TransformTool.update(transform2, state);
                  let copiedState = MainStateTool.deepCopyForRestore(state);
                  let (currentState, _, transform4) =
                    GameObjectTool.createGameObject(MainStateTool.createNewCompleteState(sandbox));
                  let pos4 = ((-1.), 4., 5.);
                  let currentState =
                    TransformAPI.setTransformLocalPosition(transform4, pos4, currentState);
                  let _ = MainStateTool.restore(currentState, copiedState);
                  let {localToWorldMatrices, localPositions} =
                    MainStateTool.unsafeGetState() |> TransformTool.getRecord;
                  (localToWorldMatrices, localPositions)
                  |>
                  expect == (
                              Float32Array.make([|
                                1.,
                                0.,
                                0.,
                                0.,
                                0.,
                                1.,
                                0.,
                                0.,
                                0.,
                                0.,
                                1.,
                                0.,
                                1.,
                                2.,
                                3.,
                                1.,
                                1.,
                                0.,
                                0.,
                                0.,
                                0.,
                                1.,
                                0.,
                                0.,
                                0.,
                                0.,
                                1.,
                                0.,
                                3.,
                                6.,
                                13.,
                                1.,
                                1.,
                                0.,
                                0.,
                                0.,
                                0.,
                                1.,
                                0.,
                                0.,
                                0.,
                                0.,
                                1.,
                                0.,
                                0.,
                                0.,
                                0.,
                                1.,
                                1.,
                                0.,
                                0.,
                                0.,
                                0.,
                                1.,
                                0.,
                                0.,
                                0.,
                                0.,
                                1.,
                                0.,
                                0.,
                                0.,
                                0.,
                                1.,
                                1.,
                                0.,
                                0.,
                                0.,
                                0.,
                                1.,
                                0.,
                                0.,
                                0.,
                                0.,
                                1.,
                                0.,
                                0.,
                                0.,
                                0.,
                                1.
                              |]),
                              Float32Array.make([|
                                1.,
                                2.,
                                3.,
                                2.,
                                4.,
                                10.,
                                0.,
                                0.,
                                0.,
                                0.,
                                0.,
                                0.,
                                0.,
                                0.,
                                0.
                              |])
                            )
                }
              )
          );
          describe(
            "restore customGeometry record to target state",
            () =>
              test(
                "get target buffer to current buffer",
                () => {
                  open CustomGeometryType;
                  state :=
                    TestTool.initWithJobConfigWithoutBuildFakeDom(
                      ~sandbox,
                      ~buffer=
                        SettingTool.buildBufferConfigStr(
                          ~customGeometryPointDataBufferCount=2,
                          ()
                        ),
                      ()
                    );
                  let (state, gameObject1, geometry1, (vertices1, normals1, indices1)) =
                    CustomGeometryTool.createGameObjectAndSetPointData(state^);
                  let copiedState = MainStateTool.deepCopyForRestore(state);
                  let (state, gameObject2, geometry2) =
                    CustomGeometryTool.createGameObject(
                      MainStateTool.createNewCompleteState(sandbox)
                    );
                  let vertices2 = Float32Array.make([|2., 3., 40.|]);
                  let currentState =
                    CustomGeometryAPI.setCustomGeometryVertices(geometry2, vertices2, state);
                  let _ = MainStateTool.restore(currentState, copiedState);
                  let {vertices} = MainStateTool.unsafeGetState() |> CustomGeometryTool.getRecord;
                  vertices |> expect == Float32Array.make([|10., 0., 0., 0., 0., 0.|])
                }
              )
          );
          describe(
            "restore material record to target state",
            () => {
              describe(
                "test basic material",
                () =>
                  test(
                    "get target buffer to current buffer",
                    () => {
                      open BasicMaterialType;
                      state :=
                        TestTool.initWithJobConfigWithoutBuildFakeDom(
                          ~sandbox,
                          ~buffer=
                            SettingTool.buildBufferConfigStr(~basicMaterialDataBufferCount=3, ()),
                          ()
                        );
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
                      let copiedState = MainStateTool.deepCopyForRestore(state);
                      let (state, gameObject4, material4) =
                        BasicMaterialTool.createGameObject(
                          MainStateTool.createNewCompleteState(sandbox)
                        );
                      let currentState =
                        BasicMaterialAPI.setBasicMaterialColor(material4, [|1., 0.1, 1.|], state);
                      let currentState = AllMaterialTool.pregetGLSLData(currentState);
                      let _ = MainStateTool.restore(currentState, copiedState);
                      let {colors} = MainStateTool.unsafeGetState() |> BasicMaterialTool.getRecord;
                      colors
                      |> expect == Float32Array.make([|1., 1., 1., 1., 0.5, 0., 1., 1., 1.|])
                    }
                  )
              );
              describe(
                "test light material",
                () =>
                  test(
                    "get target buffer to current buffer",
                    () => {
                      open LightMaterialType;
                      state :=
                        TestTool.initWithJobConfigWithoutBuildFakeDom(
                          ~sandbox,
                          ~buffer=
                            SettingTool.buildBufferConfigStr(~lightMaterialDataBufferCount=3, ()),
                          ()
                        );
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
                      let copiedState = MainStateTool.deepCopyForRestore(state);
                      let (state, gameObject4, material4) =
                        LightMaterialTool.createGameObject(
                          MainStateTool.createNewCompleteState(sandbox)
                        );
                      let currentState =
                        LightMaterialAPI.setLightMaterialDiffuseColor(
                          material4,
                          [|1., 0.1, 1.|],
                          state
                        );
                      let currentState = AllMaterialTool.pregetGLSLData(currentState);
                      let _ = MainStateTool.restore(currentState, copiedState);
                      let {diffuseColors} =
                        MainStateTool.unsafeGetState() |> LightMaterialTool.getRecord;
                      diffuseColors
                      |> expect == Float32Array.make([|1., 1., 1., 1., 0.5, 0., 1., 1., 1.|])
                    }
                  )
              )
            }
          );
          describe(
            "restore light record to target state",
            () => {
              let _prepareLightData = (createGameObjectFunc, state) => {
                open LightMaterialAPI;
                open Js.Typed_array;
                let (state, gameObject1, light1) = createGameObjectFunc(state^);
                let (state, gameObject2, light2) = createGameObjectFunc(state);
                let (state, gameObject3, light3) = createGameObjectFunc(state);
                let state = AllMaterialTool.prepareForInit(state);
                let state = state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
                (state, gameObject1, gameObject2, gameObject3, light1, light2, light3)
              };
              /* let _prepareAmbientLightData = (state) => {
                   open LightMaterialAPI;
                   open Js.Typed_array;
                   let (state, gameObject1, light1) = AmbientLightTool.createGameObject(state^);
                   let (state, gameObject2, light2) = AmbientLightTool.createGameObject(state);
                   let (state, gameObject3, light3) = AmbientLightTool.createGameObject(state);
                   let state = AllMaterialTool.prepareForInit(state);
                   let state = state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
                   (state, gameObject1, gameObject2, gameObject3, light1, light2, light3)
                 }; */
              /* test(
                   "test ambient light",
                   () =>
                     _testRestoreStateEqualTargetState(
                       state,
                       _prepareLightData(AmbientLightTool.createGameObject),
                       AmbientLightTool.getRecord
                     )
                 ); */
              describe(
                "test ambient light",
                () =>
                  test(
                    "get target buffer to current buffer",
                    () => {
                      open AmbientLightType;
                      let (state, gameObject1, gameObject2, gameObject3, light1, light2, light3) =
                        _prepareLightData(AmbientLightTool.createGameObject, state);
                      let state =
                        AmbientLightAPI.setAmbientLightColor(light2, [|0., 0.5, 0.|], state);
                      let copiedState = MainStateTool.deepCopyForRestore(state);
                      let (state, gameObject4, light4) =
                        AmbientLightTool.createGameObject(
                          MainStateTool.createNewCompleteState(sandbox)
                        );
                      let currentState =
                        AmbientLightAPI.setAmbientLightColor(light4, [|1., 0.1, 1.|], state);
                      let currentState = AllMaterialTool.pregetGLSLData(currentState);
                      let _ = MainStateTool.restore(currentState, copiedState);
                      let {colors} = MainStateTool.unsafeGetState() |> AmbientLightTool.getRecord;
                      colors
                      |> expect == Float32Array.make([|1., 1., 1., 0., 0.5, 0., 1., 1., 1.|])
                    }
                  )
              );
              describe(
                "test direction light",
                () =>
                  test(
                    "get target buffer to current buffer",
                    () => {
                      open DirectionLightType;
                      let (state, gameObject1, gameObject2, gameObject3, light1, light2, light3) =
                        _prepareLightData(DirectionLightTool.createGameObject, state);
                      let state =
                        DirectionLightAPI.setDirectionLightColor(light2, [|0., 0.5, 0.|], state);
                      let copiedState = MainStateTool.deepCopyForRestore(state);
                      let (state, gameObject4, light4) =
                        DirectionLightTool.createGameObject(
                          MainStateTool.createNewCompleteState(sandbox)
                        );
                      let currentState =
                        DirectionLightAPI.setDirectionLightColor(light4, [|1., 0.1, 1.|], state);
                      let currentState = AllMaterialTool.pregetGLSLData(currentState);
                      let _ = MainStateTool.restore(currentState, copiedState);
                      let {colors} =
                        MainStateTool.unsafeGetState() |> DirectionLightTool.getRecord;
                      colors
                      |>
                      expect == Float32Array.make([|
                                  1.,
                                  1.,
                                  1.,
                                  0.,
                                  0.5,
                                  0.,
                                  1.,
                                  1.,
                                  1.,
                                  1.,
                                  1.,
                                  1.
                                |])
                    }
                  )
              );
              describe(
                "test point light",
                () =>
                  test(
                    "get target buffer to current buffer",
                    () => {
                      open PointLightType;
                      let (state, gameObject1, gameObject2, gameObject3, light1, light2, light3) =
                        _prepareLightData(PointLightTool.createGameObject, state);
                      let state = PointLightAPI.setPointLightColor(light2, [|0., 0.5, 0.|], state);
                      let copiedState = MainStateTool.deepCopyForRestore(state);
                      let (state, gameObject4, light4) =
                        PointLightTool.createGameObject(
                          MainStateTool.createNewCompleteState(sandbox)
                        );
                      let currentState =
                        PointLightAPI.setPointLightColor(light4, [|1., 0.1, 1.|], state);
                      let currentState = AllMaterialTool.pregetGLSLData(currentState);
                      let _ = MainStateTool.restore(currentState, copiedState);
                      let {colors} = MainStateTool.unsafeGetState() |> PointLightTool.getRecord;
                      colors
                      |>
                      expect == Float32Array.make([|
                                  1.,
                                  1.,
                                  1.,
                                  0.,
                                  0.5,
                                  0.,
                                  1.,
                                  1.,
                                  1.,
                                  1.,
                                  1.,
                                  1.
                                |])
                    }
                  )
              )
            }
          );
          describe(
            "restore sourceInstance record to target state",
            () => {
              test(
                "get target buffer to current buffer",
                () => {
                  open SourceInstanceType;
                  open Js.Typed_array;
                  let state =
                    TestTool.initWithJobConfigWithoutBuildFakeDom(
                      ~sandbox,
                      ~buffer=
                        SettingTool.buildBufferConfigStr(
                          ~sourceInstanceCount=3,
                          ~objectInstanceCountPerSourceInstance=3,
                          ()
                        ),
                      ()
                    );
                  let (
                    state,
                    gameObject,
                    sourceInstance1,
                    objectInstanceGameObjectArr,
                    objectInstanceArr
                  ) =
                    ObjectInstanceTool.createObjectInstanceGameObjectArr(2, state);
                  let (
                    state,
                    gameObject,
                    sourceInstance2,
                    objectInstanceGameObjectArr,
                    objectInstanceArr
                  ) =
                    ObjectInstanceTool.createObjectInstanceGameObjectArr(3, state);
                  let state =
                    state
                    |> StaticTransformTool.markModelMatrixIsStatic(sourceInstance1, true)
                    |> StaticTransformTool.markModelMatrixIsStatic(sourceInstance2, false);
                  let copiedState = MainStateTool.deepCopyForRestore(state);
                  let currentState = MainStateTool.createNewCompleteState(sandbox);
                  let (
                    currentState,
                    gameObject,
                    sourceInstance3,
                    objectInstanceGameObjectArr,
                    objectInstanceArr
                  ) =
                    ObjectInstanceTool.createObjectInstanceGameObjectArr(1, currentState);
                  let currentState =
                    currentState
                    |> StaticTransformTool.markModelMatrixIsStatic(sourceInstance3, true);
                  let _ = MainStateTool.restore(currentState, copiedState);
                  let {isTransformStatics, objectInstanceTransformCollections} =
                    MainStateTool.unsafeGetState() |> SourceInstanceTool.getRecord;
                  (isTransformStatics, objectInstanceTransformCollections)
                  |>
                  expect == (
                              Uint8Array.make([|1, 0, 1|]),
                              Uint32Array.make([|1, 2, 0, 4, 5, 6, 0, 0, 0|])
                            )
                }
              );
              test(
                "add current state->sourceInstanceRecord->matrixFloat32ArrayMap typeArr to pool",
                () => {
                  open StateDataMainType;
                  open SourceInstanceType;
                  open TypeArrayPoolType;
                  let state = state^;
                  let currentState = MainStateTool.createNewCompleteState(sandbox);
                  let {matrixFloat32ArrayMap} = SourceInstanceTool.getRecord(currentState);
                  let index = 0;
                  let typeArr = Float32Array.make([|1.|]);
                  matrixFloat32ArrayMap |> WonderCommonlib.SparseMapService.set(index, typeArr);
                  let _ = MainStateTool.restore(currentState, state);
                  let {float32ArrayPoolMap}: typeArrayPoolRecord =
                    MainStateTool.unsafeGetState().typeArrayPoolRecord;
                  float32ArrayPoolMap
                  |> WonderCommonlib.SparseMapService.unsafeGet(typeArr |> Float32Array.length)
                  |> expect == [|typeArr|]
                }
              );
              test(
                "mark is-not-send-modelMatrixData",
                () => {
                  open StateDataMainType;
                  open SourceInstanceType;
                  open TypeArrayPoolType;
                  let state = state^;
                  let {isSendTransformMatrixDataMap} = SourceInstanceTool.getRecord(state);
                  isSendTransformMatrixDataMap
                  |> WonderCommonlib.SparseMapService.set(0, true)
                  |> WonderCommonlib.SparseMapService.set(1, false)
                  |> ignore;
                  let _ =
                    MainStateTool.restore(MainStateTool.createNewCompleteState(sandbox), state);
                  let {isSendTransformMatrixDataMap} =
                    SourceInstanceTool.getRecord(MainStateTool.unsafeGetState());
                  isSendTransformMatrixDataMap |> expect == [|false, false|]
                }
              )
            }
          );
          test(
            "restore basicCameraView record to target state",
            () =>
              _testRestoreStateEqualTargetState(
                state,
                _prepareBasicCameraViewData,
                (state) => state.basicCameraViewRecord
              )
          );
          test(
            "restore perspectiveCameraProjection record to target state",
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