open Wonder_jest;

open Js.Typed_array;

let _ =
  describe("test redo,undo component data", () => {
    open Expect;
    open Expect.Operators;
    open Sinon;
    let sandbox = getSandboxDefaultVal();
    let state = ref(MainStateTool.createState());
    let _prepareBasicCameraViewData = state => {
      let (state, gameObject1, _, (basicCameraView1, _)) =
        CameraTool.createCameraGameObject(state^);
      let (state, gameObject2, _, (basicCameraView2, _)) =
        CameraTool.createCameraGameObject(state);
      let (state, gameObject3, _, (basicCameraView3, _)) =
        CameraTool.createCameraGameObject(state);
      /* let state = state |> setPerspectiveCameraProjectionNear(basicCameraView2, 0.2);
         let state = state |> setPerspectiveCameraProjectionFar(basicCameraView2, 100.);
         let state = state |> setPerspectiveCameraProjectionFar(basicCameraView3, 100.);
         let state = state |> setPerspectiveCameraProjectionAspect(basicCameraView1, 1.);
         let state = state |> setPerspectiveCameraProjectionAspect(basicCameraView2, 2.);
         let state = state |> setPerspectiveCameraProjectionFovy(basicCameraView2, 60.); */
      /* let state = state |> BasicCameraViewTool.update; */
      let state =
        state
        |> GameObjectTool.disposeGameObjectBasicCameraViewComponent(
             gameObject3,
             basicCameraView3,
           );
      (
        state,
        gameObject1,
        gameObject2,
        gameObject3,
        basicCameraView1,
        basicCameraView2,
        basicCameraView3,
      );
    };
    let _preparePerspectiveCameraProjectionData = state => {
      open PerspectiveCameraProjectionAPI;
      let (state, gameObject1, _, (_, perspectiveCameraProjection1)) =
        CameraTool.createCameraGameObject(state^);
      let (state, gameObject2, _, (_, perspectiveCameraProjection2)) =
        CameraTool.createCameraGameObject(state);
      let (state, gameObject3, _, (_, perspectiveCameraProjection3)) =
        CameraTool.createCameraGameObject(state);
      let state =
        state
        |> setPerspectiveCameraProjectionNear(
             perspectiveCameraProjection2,
             0.2,
           );
      let state =
        state
        |> setPerspectiveCameraProjectionFar(
             perspectiveCameraProjection2,
             100.,
           );
      let state =
        state
        |> setPerspectiveCameraProjectionFar(
             perspectiveCameraProjection3,
             100.,
           );
      let state =
        state
        |> setPerspectiveCameraProjectionAspect(
             perspectiveCameraProjection1,
             1.,
           );
      let state =
        state
        |> setPerspectiveCameraProjectionAspect(
             perspectiveCameraProjection2,
             2.,
           );
      let state =
        state
        |> setPerspectiveCameraProjectionFovy(
             perspectiveCameraProjection2,
             60.,
           );
      let state = state |> PerspectiveCameraProjectionTool.update;
      let state =
        state
        |> GameObjectTool.disposeGameObjectPerspectiveCameraProjectionComponent(
             gameObject3,
             perspectiveCameraProjection3,
           );
      (
        state,
        gameObject1,
        gameObject2,
        gameObject3,
        perspectiveCameraProjection1,
        perspectiveCameraProjection2,
        perspectiveCameraProjection3,
      );
    };
    let _prepareBasicMaterialData = state => {
      open BasicMaterialAPI;
      open Js.Typed_array;
      let (state, gameObject1, material1) =
        BasicMaterialTool.createGameObject(state^);
      let (state, gameObject2, material2) =
        BasicMaterialTool.createGameObject(state);
      let (state, gameObject3, material3) =
        BasicMaterialTool.createGameObject(state);
      let state = AllMaterialTool.prepareForInit(state);
      /* let state = state |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
         let state = BasicMaterialTool.initMaterials([@bs] GlTool.unsafeGetGl(state), state); */
      let state =
        state |> setBasicMaterialColor(material2, [|1., 0.5, 0.0|]);
      (
        state,
        gameObject1,
        gameObject2,
        gameObject3,
        material1,
        material2,
        material3,
      );
    };
    let _prepareBasicSourceTextureData = state => {
      open BasicSourceTextureAPI;
      open Js.Typed_array;
      open SourceTextureType;
      let (state, texture1) = createBasicSourceTexture(state);
      let (state, texture2) = createBasicSourceTexture(state);
      let (state, texture3) = createBasicSourceTexture(state);
      let state = AllMaterialTool.prepareForInit(state);
      let state =
        state |> setBasicSourceTextureWrapS(texture2, Mirrored_repeat);
      let state =
        state |> setBasicSourceTextureWrapT(texture2, Mirrored_repeat);
      let state = state |> setBasicSourceTextureMagFilter(texture2, Linear);
      let state = state |> setBasicSourceTextureMinFilter(texture2, Linear);
      let state = state |> setBasicSourceTextureType(texture2, 1);
      let state = state |> setBasicSourceTextureFormat(texture2, Alpha);
      (state, texture1, texture2, texture3);
    };
    let _prepareArrayBufferViewSourceTextureData = state => {
      open ArrayBufferViewSourceTextureAPI;
      open Js.Typed_array;
      open SourceTextureType;
      let (state, texture1) = createArrayBufferViewSourceTexture(state);
      let (state, texture2) = createArrayBufferViewSourceTexture(state);
      let (state, texture3) = createArrayBufferViewSourceTexture(state);
      let state = AllMaterialTool.prepareForInit(state);
      let state =
        state
        |> setArrayBufferViewSourceTextureWrapS(texture2, Mirrored_repeat);
      let state =
        state
        |> setArrayBufferViewSourceTextureWrapT(texture2, Mirrored_repeat);
      let state =
        state |> setArrayBufferViewSourceTextureMagFilter(texture2, Linear);
      let state =
        state |> setArrayBufferViewSourceTextureMinFilter(texture2, Linear);
      let state = state |> setArrayBufferViewSourceTextureType(texture2, 1);
      let state =
        state
        |> setArrayBufferViewSourceTextureFormat(
             texture2,
             SourceTextureType.Alpha,
           );
      let state = state |> setArrayBufferViewSourceTextureWidth(texture2, 2);
      let state = state |> setArrayBufferViewSourceTextureHeight(texture2, 4);
      (state, texture1, texture2, texture3);
    };

    beforeEach(() => {
      sandbox := createSandbox();
      state := TestTool.initWithJobConfig(~sandbox, ());
    });
    afterEach(() => restoreSandbox(refJsObjToSandbox(sandbox^)));

    describe("deepCopyForRestore", () => {
      describe("deep copy material record", () =>
        describe("test basic material", () => {
          test("shadow copy nameMap, aterialArrayForWorkerInit", () =>
            StateDataMainType.(
              BasicMaterialType.(
                MainStateTool.testShadowCopyArrayLikeMapData(
                  state => {
                    let {nameMap, materialArrayForWorkerInit} =
                      BasicMaterialTool.getRecord(state);
                    [|
                      nameMap |> Obj.magic,
                      materialArrayForWorkerInit |> Obj.magic,
                    |];
                  },
                  state^,
                )
              )
            )
          );
          test("deep copy gameObjectsMap, emptyMapUnitArrayMap", () => {
            open StateDataMainType;
            open BasicMaterialType;
            let (state, gameObject1, basicMaterial1) =
              BasicMaterialTool.createGameObject(state^);
            let {gameObjectsMap, emptyMapUnitArrayMap} =
              BasicMaterialTool.getRecord(state);
            let originGameObjectsArr = [|1|];
            let originEmptyMapUnitArrayMap = [|2, 1, 0|];
            let copiedOriginGameObjectsArr =
              originGameObjectsArr |> Js.Array.copy;
            let copiedOriginEmptyMapUnitArrayMap =
              originEmptyMapUnitArrayMap |> Js.Array.copy;
            gameObjectsMap
            |> WonderCommonlib.MutableSparseMapService.set(
                 basicMaterial1,
                 originGameObjectsArr,
               )
            |> ignore;
            emptyMapUnitArrayMap
            |> WonderCommonlib.MutableSparseMapService.set(
                 basicMaterial1,
                 originEmptyMapUnitArrayMap,
               )
            |> ignore;
            let copiedState = MainStateTool.deepCopyForRestore(state);
            let {gameObjectsMap, emptyMapUnitArrayMap} =
              BasicMaterialTool.getRecord(copiedState);
            let arr =
              gameObjectsMap
              |> WonderCommonlib.MutableSparseMapService.unsafeGet(
                   basicMaterial1,
                 );
            Array.unsafe_set(arr, 0, 2);
            let arr =
              emptyMapUnitArrayMap
              |> WonderCommonlib.MutableSparseMapService.unsafeGet(
                   basicMaterial1,
                 );
            Array.unsafe_set(arr, 0, 4);

            let {gameObjectsMap, emptyMapUnitArrayMap} =
              BasicMaterialTool.getRecord(state);
            (
              gameObjectsMap
              |> WonderCommonlib.MutableSparseMapService.unsafeGet(
                   basicMaterial1,
                 ),
              emptyMapUnitArrayMap
              |> WonderCommonlib.MutableSparseMapService.unsafeGet(
                   basicMaterial1,
                 ),
            )
            |> expect
            == (copiedOriginGameObjectsArr, copiedOriginEmptyMapUnitArrayMap);
          });
          test("copy colors", () =>
            RedoUndoTool.testCopyTypeArraySingleValue(
              (
                BasicMaterialTool.createGameObject,
                (material, state) =>
                  BasicMaterialAPI.getBasicMaterialColor(material, state)
                  |> TypeArrayTool.truncateArray,
                BasicMaterialAPI.setBasicMaterialColor,
                () => ([|0.1, 0., 0.|], [|0.2, 0., 0.|]),
              ),
              state,
            )
          );
          test("copy textureIndices", () =>
            RedoUndoTool.testCopyTypeArraySingleValue(
              (
                BasicMaterialTool.createGameObject,
                (material, state) =>
                  BasicMaterialAPI.unsafeGetBasicMaterialMap(material, state),
                BasicMaterialAPI.setBasicMaterialMap,
                () => (0, 1),
              ),
              state,
            )
          );
          test("copy mapUnits", () =>
            RedoUndoTool.testCopyTypeArraySingleValue(
              (
                BasicMaterialTool.createGameObject,
                (material, state) =>
                  BasicMaterialTool.getMapUnit(material, state),
                BasicMaterialTool.setMapUnit,
                () => (1, 2),
              ),
              state,
            )
          );
          test("copy isDepthTests", () =>
            RedoUndoTool.testCopyTypeArraySingleValue(
              (
                BasicMaterialTool.createGameObject,
                (material, state) =>
                  BasicMaterialAPI.getBasicMaterialIsDepthTest(
                    material,
                    state,
                  ),
                BasicMaterialAPI.setBasicMaterialIsDepthTest,
                () => (false, false),
              ),
              state,
            )
          );
          test("copy alphas", () =>
            RedoUndoTool.testCopyTypeArraySingleValue(
              (
                BasicMaterialTool.createGameObject,
                (material, state) =>
                  BasicMaterialAPI.getBasicMaterialAlpha(material, state),
                BasicMaterialAPI.setBasicMaterialAlpha,
                () => (1.5, 0.5),
              ),
              state,
            )
          );
        })
      );

      describe("deep copy texture record", () => {
        describe("deep copy basic source texture record", () =>
          test(
            "shadow copy sourceMap,glTextureMap, \n                    bindTextureUnitCacheMap, disposedIndexArray,needAddedSourceArray,needInitedTextureIndexArray
            materialsMap, needDisposedTextureIndexArray
            \n                    \n                    ",
            () =>
            StateDataMainType.(
              BasicSourceTextureType.(
                MainStateTool.testShadowCopyArrayLikeMapData(
                  state => {
                    let {
                      sourceMap,
                      glTextureMap,
                      bindTextureUnitCacheMap,
                      disposedIndexArray,
                      needAddedSourceArray,
                      needInitedTextureIndexArray,
                      materialsMap,
                      needDisposedTextureIndexArray,
                    } =
                      BasicSourceTextureTool.getRecord(state);
                    [|
                      sourceMap |> Obj.magic,
                      glTextureMap |> Obj.magic,
                      bindTextureUnitCacheMap |> Obj.magic,
                      disposedIndexArray |> Obj.magic,
                      needAddedSourceArray |> Obj.magic,
                      needInitedTextureIndexArray |> Obj.magic,
                      materialsMap |> Obj.magic,
                      needDisposedTextureIndexArray |> Obj.magic,
                    |];
                  },
                  state^,
                )
              )
            )
          )
        );

        describe("deep copy arrayBufferView source texture record", () =>
          test(
            "shadow copy sourceMap,glTextureMap, \n                    bindTextureUnitCacheMap, disposedIndexArray,needAddedSourceArray,needInitedTextureIndexArray, materialsMap, needDisposedTextureIndexArray\n                    \n                    ",
            () =>
            StateDataMainType.(
              ArrayBufferViewSourceTextureType.(
                MainStateTool.testShadowCopyArrayLikeMapData(
                  state => {
                    let {
                      sourceMap,
                      glTextureMap,
                      bindTextureUnitCacheMap,
                      disposedIndexArray,
                      needAddedSourceArray,
                      needInitedTextureIndexArray,
                      materialsMap,
                      needDisposedTextureIndexArray,
                    } =
                      ArrayBufferViewSourceTextureTool.getRecord(state);
                    [|
                      sourceMap |> Obj.magic,
                      glTextureMap |> Obj.magic,
                      bindTextureUnitCacheMap |> Obj.magic,
                      disposedIndexArray |> Obj.magic,
                      needAddedSourceArray |> Obj.magic,
                      needInitedTextureIndexArray |> Obj.magic,
                      materialsMap |> Obj.magic,
                      needDisposedTextureIndexArray |> Obj.magic,
                    |];
                  },
                  state^,
                )
              )
            )
          )
        );
      });

      describe("deep copy light record", () => {
        describe("test direction light", () => {
          describe("copy type array record", () => {
            test("copy colors", () =>
              RedoUndoTool.testCopyTypeArraySingleValue(
                (
                  DirectionLightTool.createGameObject,
                  DirectionLightAPI.getDirectionLightColor,
                  DirectionLightAPI.setDirectionLightColor,
                  () => ([|1., 1., 0.|], [|0., 1., 0.|]),
                ),
                state,
              )
            );
            test("copy intensities", () =>
              RedoUndoTool.testCopyTypeArraySingleValue(
                (
                  DirectionLightTool.createGameObject,
                  DirectionLightAPI.getDirectionLightIntensity,
                  DirectionLightAPI.setDirectionLightIntensity,
                  () => (2., 3.),
                ),
                state,
              )
            );
          });
          test("shadow copy mappedIndexMap, gameObjectMap, renderLightArr", () =>
            StateDataMainType.(
              DirectionLightType.(
                MainStateTool.testShadowCopyArrayLikeMapData(
                  state => {
                    let {disposedIndexArray, gameObjectMap, renderLightArr} =
                      DirectionLightTool.getRecord(state);
                    [|
                      disposedIndexArray |> Obj.magic,
                      gameObjectMap |> Obj.magic,
                      renderLightArr |> Obj.magic,
                    |];
                  },
                  state^,
                )
              )
            )
          );
        });
        describe("test point light", () => {
          describe("copy type array record", () => {
            test("copy colors", () =>
              RedoUndoTool.testCopyTypeArraySingleValue(
                (
                  PointLightTool.createGameObject,
                  PointLightAPI.getPointLightColor,
                  PointLightAPI.setPointLightColor,
                  () => ([|1., 1., 0.|], [|0., 1., 0.|]),
                ),
                state,
              )
            );
            test("copy intensities", () =>
              RedoUndoTool.testCopyTypeArraySingleValue(
                (
                  PointLightTool.createGameObject,
                  PointLightAPI.getPointLightIntensity,
                  PointLightAPI.setPointLightIntensity,
                  () => (2., 3.),
                ),
                state,
              )
            );
            test("copy constants", () =>
              RedoUndoTool.testCopyTypeArraySingleValue(
                (
                  PointLightTool.createGameObject,
                  PointLightAPI.getPointLightConstant,
                  PointLightAPI.setPointLightConstant,
                  () => (2., 3.),
                ),
                state,
              )
            );
            test("copy linears", () =>
              RedoUndoTool.testCopyTypeArraySingleValue(
                (
                  PointLightTool.createGameObject,
                  PointLightAPI.getPointLightLinear,
                  PointLightAPI.setPointLightLinear,
                  () => (2., 3.),
                ),
                state,
              )
            );
            test("copy quadratics", () =>
              RedoUndoTool.testCopyTypeArraySingleValue(
                (
                  PointLightTool.createGameObject,
                  PointLightAPI.getPointLightQuadratic,
                  PointLightAPI.setPointLightQuadratic,
                  () => (2., 3.),
                ),
                state,
              )
            );
            test("copy ranges", () =>
              RedoUndoTool.testCopyTypeArraySingleValue(
                (
                  PointLightTool.createGameObject,
                  PointLightAPI.getPointLightRange,
                  PointLightAPI.setPointLightRange,
                  () => (2., 3.),
                ),
                state,
              )
            );
          });
          test("shadow copy mappedIndexMap, gameObjectMap, renderLightArr", () =>
            StateDataMainType.(
              PointLightType.(
                MainStateTool.testShadowCopyArrayLikeMapData(
                  state => {
                    let {disposedIndexArray, gameObjectMap, renderLightArr} =
                      PointLightTool.getRecord(state);
                    [|
                      disposedIndexArray |> Obj.magic,
                      gameObjectMap |> Obj.magic,
                      renderLightArr |> Obj.magic,
                    |];
                  },
                  state^,
                )
              )
            )
          );
        });
      });
      describe("deep copy sourceInstance record", () => {
        test("deep copy matrixFloat32ArrayMap", () => {
          open StateDataMainType;
          open SourceInstanceType;
          let (state, gameObject1, sourceInstance1) =
            SourceInstanceTool.createSourceInstanceGameObject(state^);
          let {matrixFloat32ArrayMap} = SourceInstanceTool.getRecord(state);
          let originMatrixFloat32Array = Float32Array.make([|1.|]);
          matrixFloat32ArrayMap
          |> WonderCommonlib.MutableSparseMapService.set(
               sourceInstance1,
               originMatrixFloat32Array,
             )
          |> ignore;
          let copiedState = MainStateTool.deepCopyForRestore(state);
          let {matrixFloat32ArrayMap} =
            SourceInstanceTool.getRecord(copiedState);
          let matrixFloat32Array =
            matrixFloat32ArrayMap
            |> WonderCommonlib.MutableSparseMapService.unsafeGet(
                 sourceInstance1,
               );
          Float32Array.unsafe_set(matrixFloat32Array, 0, 1000.) |> ignore;
          let {matrixFloat32ArrayMap} = SourceInstanceTool.getRecord(state);
          matrixFloat32ArrayMap
          |> WonderCommonlib.MutableSparseMapService.unsafeGet(
               sourceInstance1,
             )
          |> expect == originMatrixFloat32Array;
        });
        test(
          "shadow copy objectInstanceTransformIndexMap, matrixInstanceBufferCapacityMap, gameObjectMap, disposedIndexArray",
          () =>
          StateDataMainType.(
            SourceInstanceType.(
              MainStateTool.testShadowCopyArrayLikeMapData(
                state => {
                  let {
                    objectInstanceTransformIndexMap,
                    matrixInstanceBufferCapacityMap,
                    gameObjectMap,
                    disposedIndexArray,
                  } =
                    SourceInstanceTool.getRecord(state);
                  [|
                    objectInstanceTransformIndexMap |> Obj.magic,
                    matrixInstanceBufferCapacityMap |> Obj.magic,
                    gameObjectMap |> Obj.magic,
                    disposedIndexArray |> Obj.magic,
                  |];
                },
                state^,
              )
            )
          )
        );
      });

      describe("deep copy gameObject record", () =>
        test(
          {|shadow copy
          nameMap,
isActiveMap,
          isRootMap,
          disposedUidMap,        disposedUidArray,        disposedUidArrayForKeepOrder,

          disposedUidArrayForKeepOrderRemoveGeometry,
          disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial,
                  disposedBasicCameraViewArray,        disposedTransformArray,        disposedTransformArrayForKeepOrder,        disposedPerspectiveCameraProjectionArray,        disposedBasicMaterialDataMap,        disposedLightMaterialDataMap,                disposedGeometryDataMap,        disposedSourceInstanceArray,        disposedObjectInstanceArray,                disposedDirectionLightArray,        disposedPointLightArray,        disposedMeshRendererComponentArray,
          disposedScriptArray,

          disposedMeshRendererUidArray,                                                aliveUidArray, transformMap, basicCameraViewMap, geometryMap, meshRendererMap, basicMaterialMap, lightMaterialMap, directionLightMap, pointLightMap, sourceInstanceMap, objectInstanceMap, scriptMap|},
          () =>
          StateDataMainType.(
            GameObjectType.(
              MainStateTool.testShadowCopyArrayLikeMapData(
                state => {
                  let {
                    nameMap,
                    isActiveMap,
                    isRootMap,
                    disposedUidMap,
                    disposedUidArray,
                    disposedUidArrayForKeepOrder,
                    disposedUidArrayForKeepOrderRemoveGeometry,
                    disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial,
                    disposedBasicCameraViewArray,
                    disposedTransformArray,
                    disposedTransformArrayForKeepOrder,
                    disposedPerspectiveCameraProjectionArray,
                    disposedBasicMaterialDataMap,
                    disposedLightMaterialDataMap,
                    disposedGeometryDataMap,
                    disposedSourceInstanceArray,
                    disposedObjectInstanceArray,
                    disposedDirectionLightArray,
                    disposedPointLightArray,
                    disposedMeshRendererComponentArray,
                    disposedScriptArray,
                    aliveUidArray,
                    transformMap,
                    basicCameraViewMap,
                    geometryMap,
                    meshRendererMap,
                    basicMaterialMap,
                    lightMaterialMap,
                    directionLightMap,
                    pointLightMap,
                    sourceInstanceMap,
                    objectInstanceMap,
                    scriptMap,
                  } =
                    GameObjectTool.getGameObjectRecord(state);
                  [|
                    nameMap |> Obj.magic,
                    isActiveMap |> Obj.magic,
                    isRootMap |> Obj.magic,
                    disposedUidMap |> Obj.magic,
                    disposedUidArray |> Obj.magic,
                    disposedUidArrayForKeepOrder |> Obj.magic,
                    disposedUidArrayForKeepOrderRemoveGeometry |> Obj.magic,
                    disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial
                    |> Obj.magic,
                    disposedBasicCameraViewArray |> Obj.magic,
                    disposedTransformArray |> Obj.magic,
                    disposedTransformArrayForKeepOrder |> Obj.magic,
                    disposedPerspectiveCameraProjectionArray |> Obj.magic,
                    disposedBasicMaterialDataMap |> Obj.magic,
                    disposedLightMaterialDataMap |> Obj.magic,
                    disposedGeometryDataMap |> Obj.magic,
                    disposedSourceInstanceArray |> Obj.magic,
                    disposedObjectInstanceArray |> Obj.magic,
                    disposedDirectionLightArray |> Obj.magic,
                    disposedPointLightArray |> Obj.magic,
                    disposedMeshRendererComponentArray |> Obj.magic,
                    disposedScriptArray |> Obj.magic,
                    aliveUidArray |> Obj.magic,
                    transformMap |> Obj.magic,
                    basicCameraViewMap |> Obj.magic,
                    geometryMap |> Obj.magic,
                    meshRendererMap |> Obj.magic,
                    basicMaterialMap |> Obj.magic,
                    lightMaterialMap |> Obj.magic,
                    directionLightMap |> Obj.magic,
                    pointLightMap |> Obj.magic,
                    sourceInstanceMap |> Obj.magic,
                    objectInstanceMap |> Obj.magic,
                    scriptMap |> Obj.magic,
                  |];
                },
                state^,
              )
            )
          )
        )
      );

      describe("deep copy objectInstance record", () =>
        test(
          "shadow copy sourceInstanceMap, gameObjectMap, disposedIndexArray",
          () =>
          StateDataMainType.(
            ObjectInstanceType.(
              MainStateTool.testShadowCopyArrayLikeMapData(
                state => {
                  let {sourceInstanceMap, gameObjectMap, disposedIndexArray} =
                    ObjectInstanceTool.getObjectInstanceRecord(state);
                  [|
                    sourceInstanceMap |> Obj.magic,
                    gameObjectMap |> Obj.magic,
                    disposedIndexArray |> Obj.magic,
                  |];
                },
                state^,
              )
            )
          )
        )
      );

      describe("deep copy basicCameraView record", () =>
        test("shadow copy isActiveMap, gameObjectMap, disposedIndexArray", () =>
          BasicCameraViewType.(
            MainStateTool.testShadowCopyArrayLikeMapData(
              state => {
                let {isActiveMap, gameObjectMap, disposedIndexArray} =
                  state.basicCameraViewRecord;
                [|
                  isActiveMap |> Obj.magic,
                  gameObjectMap |> Obj.magic,
                  disposedIndexArray |> Obj.magic,
                |];
              },
              state^,
            )
          )
        )
      );

      describe("deep copy perspectiveCameraProjection record", () => {
        test(
          "shadow copy dirtyArray, nearMap, farMap, fovyMap, aspectMap, gameObjectMap, disposedIndexArray",
          () =>
          PerspectiveCameraProjectionType.(
            MainStateTool.testShadowCopyArrayLikeMapData(
              state => {
                let {
                  dirtyArray,
                  nearMap,
                  farMap,
                  fovyMap,
                  aspectMap,
                  gameObjectMap,
                  disposedIndexArray,
                } =
                  state.perspectiveCameraProjectionRecord;
                [|
                  dirtyArray |> Obj.magic,
                  nearMap |> Obj.magic,
                  farMap |> Obj.magic,
                  fovyMap |> Obj.magic,
                  aspectMap |> Obj.magic,
                  gameObjectMap |> Obj.magic,
                  disposedIndexArray |> Obj.magic,
                |];
              },
              state^,
            )
          )
        );
        test("deep copy pMatrixMap", () => {
          open PerspectiveCameraProjectionType;
          let (
            state,
            gameObject1,
            gameObject2,
            gameObject3,
            perspectiveCameraProjection1,
            perspectiveCameraProjection2,
            perspectiveCameraProjection3,
          ) =
            _preparePerspectiveCameraProjectionData(state);
          let copiedState = MainStateTool.deepCopyForRestore(state);
          let {pMatrixMap} as record =
            copiedState.perspectiveCameraProjectionRecord;
          let record = {...record, index: 0};
          Js.Typed_array.Float32Array.unsafe_set(
            pMatrixMap |> WonderCommonlib.MutableSparseMapService.unsafeGet(0),
            1,
            10.0,
          );
          let oldPMatrix =
            state.perspectiveCameraProjectionRecord.pMatrixMap
            |> WonderCommonlib.MutableSparseMapService.unsafeGet(0);
          Js.Typed_array.Float32Array.unsafe_get(oldPMatrix, 1)
          |> expect != 10.0;
        });
      });
    });

    describe("restore", () => {
      let _testRestoreStateEqualTargetState =
          (state, prepareDataFunc, getDataFunc) => {
        let (state, _, _, _, _, _, _) = prepareDataFunc(state);
        let currentState =
          MainStateTool.createNewCompleteStateWithRenderConfig(sandbox);
        let (currentState, _, _, _, _, _, _) =
          prepareDataFunc(ref(currentState));
        let _ = MainStateTool.restore(currentState, state);
        MainStateTool.unsafeGetState()
        |> getDataFunc
        |> expect == (state |> getDataFunc);
        /* expect(1) == 1; */
      };

      describe("restore material record to target state", () =>
        describe("test basic material", () =>
          test("test restore typeArrays", () => {
            open BasicMaterialType;
            state :=
              TestTool.initWithJobConfigWithoutBuildFakeDom(
                ~sandbox,
                ~buffer=
                  SettingTool.buildBufferConfigStr(
                    ~basicMaterialCount=4,
                    ~textureCountPerMaterial=1,
                    (),
                  ),
                (),
              );

            let (
              state,
              gameObject1,
              gameObject2,
              gameObject3,
              material1,
              material2,
              material3,
            ) =
              _prepareBasicMaterialData(state);
            let state =
              state
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
            let copiedState = MainStateTool.deepCopyForRestore(state);
            let (currentState, gameObject4, material4) =
              BasicMaterialTool.createGameObject(state);
            let currentState =
              BasicMaterialAPI.setBasicMaterialColor(
                material4,
                [|1., 0.1, 1.|],
                currentState,
              );
            let (currentState, map1) =
              BasicSourceTextureAPI.createBasicSourceTexture(currentState);
            let (currentState, map2) =
              BasicSourceTextureAPI.createBasicSourceTexture(currentState);
            let currentState =
              currentState
              |> BasicMaterialAPI.setBasicMaterialMap(material4, map2);
            let currentState =
              BasicMaterialAPI.setBasicMaterialIsDepthTest(
                material4,
                false,
                currentState,
              );
            let currentState =
              BasicMaterialAPI.setBasicMaterialAlpha(
                material4,
                0.5,
                currentState,
              );

            let currentState = AllMaterialTool.pregetGLSLData(currentState);
            let _ = MainStateTool.restore(currentState, copiedState);

            let defaultUnit = BasicSourceTextureTool.getDefaultUnit();
            let defaultIsDepthTest =
              BufferMaterialService.getDefaultIsDepthTest();
            let defaultAlpha = BasicMaterialTool.getDefaultAlpha();
            let {colors, textureIndices, mapUnits, isDepthTests, alphas} =
              MainStateTool.unsafeGetState() |> BasicMaterialTool.getRecord;
            (colors, textureIndices, mapUnits, isDepthTests, alphas)
            |> expect
            == (
                 Float32Array.make([|
                   1.,
                   1.,
                   1.,
                   1.,
                   0.5,
                   0.,
                   1.,
                   1.,
                   1.,
                   1.,
                   1.,
                   1.,
                 |]),
                 Uint32Array.make([|0, 0, 0, 0|]),
                 Uint8Array.make([|
                   defaultUnit,
                   defaultUnit,
                   defaultUnit,
                   defaultUnit,
                 |]),
                 Uint8Array.make([|
                   defaultIsDepthTest,
                   defaultIsDepthTest,
                   defaultIsDepthTest,
                   defaultIsDepthTest,
                 |]),
                 Float32Array.make([|
                   defaultAlpha,
                   defaultAlpha,
                   defaultAlpha,
                   defaultAlpha,
                 |]),
               );
          })
        )
      );

      describe("restore light record to target state", () => {
        let _prepareLightData = (createGameObjectFunc, state) => {
          open LightMaterialAPI;
          open Js.Typed_array;
          let (state, gameObject1, light1) = createGameObjectFunc(state^);
          let (state, gameObject2, light2) = createGameObjectFunc(state);
          let state = AllMaterialTool.prepareForInit(state);
          let state =
            state
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
          (state, gameObject1, gameObject2, light1, light2);
        };

        describe("test direction light", () =>
          test("test restore typeArrays", () => {
            open DirectionLightType;
            let (state, gameObject1, gameObject2, light1, light2) =
              _prepareLightData(DirectionLightTool.createGameObject, state);
            let state =
              DirectionLightAPI.setDirectionLightColor(
                light2,
                [|0., 0.5, 0.|],
                state,
              );
            let copiedState = MainStateTool.deepCopyForRestore(state);
            let (currentState, gameObject3, light3) =
              DirectionLightTool.createGameObject(state);
            let (currentState, gameObject4, light4) =
              DirectionLightTool.createGameObject(state);
            let currentState =
              DirectionLightAPI.setDirectionLightColor(
                light3,
                [|1., 0.1, 0.|],
                currentState,
              );
            let currentState =
              DirectionLightAPI.setDirectionLightColor(
                light4,
                [|0., 0.5, 0.5|],
                currentState,
              );
            let currentState =
              DirectionLightAPI.setDirectionLightColor(
                light1,
                [|0., 0.5, 1.|],
                currentState,
              );
            let currentState =
              DirectionLightAPI.setDirectionLightIntensity(
                light2,
                0.2,
                currentState,
              );
            let currentState =
              DirectionLightAPI.setDirectionLightIntensity(
                light4,
                0.5,
                currentState,
              );
            let currentState = AllMaterialTool.pregetGLSLData(currentState);
            let _ = MainStateTool.restore(currentState, copiedState);
            let {colors, intensities} =
              MainStateTool.unsafeGetState() |> DirectionLightTool.getRecord;

            (
              colors |> Float32Array.slice(~start=0, ~end_=12),
              intensities |> Float32Array.slice(~start=0, ~end_=4),
            )
            |> expect
            == (
                 Float32Array.make([|
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
                   1.,
                 |]),
                 Float32Array.make([|1., 1., 1., 1.|]),
               );
          })
        );
        describe("test point light", () =>
          test("test restore typeArrays", () => {
            open PointLightType;
            let (state, gameObject1, gameObject2, light1, light2) =
              _prepareLightData(PointLightTool.createGameObject, state);
            let state =
              PointLightAPI.setPointLightColor(
                light2,
                [|0., 0.5, 0.|],
                state,
              );
            let copiedState = MainStateTool.deepCopyForRestore(state);
            let (currentState, gameObject3, light3) =
              PointLightTool.createGameObject(state);
            let (currentState, gameObject4, light4) =
              PointLightTool.createGameObject(currentState);
            let currentState =
              PointLightAPI.setPointLightColor(
                light3,
                [|1., 0.1, 1.|],
                currentState,
              );
            let currentState =
              PointLightAPI.setPointLightColor(
                light4,
                [|1., 0.2, 1.|],
                currentState,
              );
            let currentState =
              PointLightAPI.setPointLightColor(
                light1,
                [|0., 0., 1.|],
                currentState,
              );
            let currentState =
              PointLightAPI.setPointLightRange(light2, 0.2, currentState);
            let currentState =
              PointLightAPI.setPointLightRange(light3, 0.5, currentState);
            let currentState = AllMaterialTool.pregetGLSLData(currentState);
            let _ = MainStateTool.restore(currentState, copiedState);
            let {colors, ranges} =
              MainStateTool.unsafeGetState() |> PointLightTool.getRecord;

            (
              colors |> Float32Array.slice(~start=0, ~end_=12),
              ranges |> Float32Array.slice(~start=0, ~end_=4),
            )
            |> expect
            == (
                 Float32Array.make([|
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
                   1.,
                 |]),
                 Float32Array.make([|65., 65., 65., 65.|]),
               );
          })
        );
      });
      describe("restore texture record to target state", () => {
        describe("test restore basic source texture record", () =>
          test("test restore typeArrays", () => {
            open BasicSourceTextureType;
            state :=
              TestTool.initWithJobConfigWithoutBuildFakeDom(
                ~sandbox,
                ~buffer=
                  SettingTool.buildBufferConfigStr(
                    ~basicSourceTextureCount=4,
                    (),
                  ),
                (),
              );

            let (state, texture1, texture2, texture3) =
              _prepareBasicSourceTextureData(state^);
            let state =
              state
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
            let copiedState = MainStateTool.deepCopyForRestore(state);
            let (currentState, texture4) =
              BasicSourceTextureAPI.createBasicSourceTexture(state);
            let currentState =
              BasicSourceTextureAPI.setBasicSourceTextureWrapT(
                texture4,
                SourceTextureType.Mirrored_repeat,
                currentState,
              );
            let currentState = AllMaterialTool.pregetGLSLData(currentState);
            let _ = MainStateTool.restore(currentState, copiedState);
            let defaultWrapS =
              BasicSourceTextureTool.getDefaultWrapS()
              |> SourceTextureType.wrapToUint8;

            let defaultWrapT =
              BasicSourceTextureTool.getDefaultWrapT()
              |> SourceTextureType.wrapToUint8;
            let defaultMagFilter =
              BasicSourceTextureTool.getDefaultMagFilter()
              |> SourceTextureType.filterToUint8;

            let defaultMinFilter =
              BasicSourceTextureTool.getDefaultMinFilter()
              |> SourceTextureType.filterToUint8;
            let defaultFormat =
              BasicSourceTextureTool.getDefaultFormat()
              |> SourceTextureType.formatToUint8;
            let defaultType = BasicSourceTextureTool.getDefaultType();
            let defaultIsNeedUpdate =
              BasicSourceTextureTool.getDefaultIsNeedUpdate();
            let {
              wrapSs,
              wrapTs,
              magFilters,
              minFilters,
              formats,
              types,
              isNeedUpdates,
            } =
              MainStateTool.unsafeGetState()
              |> BasicSourceTextureTool.getRecord;
            (
              wrapSs,
              wrapTs,
              magFilters,
              minFilters,
              formats,
              types,
              isNeedUpdates,
            )
            |> expect
            == (
                 Uint8Array.make([|
                   defaultWrapS,
                   1,
                   defaultWrapS,
                   defaultWrapS,
                 |]),
                 Uint8Array.make([|
                   defaultWrapT,
                   1,
                   defaultWrapT,
                   defaultWrapT,
                 |]),
                 Uint8Array.make([|
                   defaultMagFilter,
                   1,
                   defaultMagFilter,
                   defaultMagFilter,
                 |]),
                 Uint8Array.make([|
                   defaultMinFilter,
                   1,
                   defaultMinFilter,
                   defaultMinFilter,
                 |]),
                 Uint8Array.make([|
                   defaultFormat,
                   2,
                   defaultFormat,
                   defaultFormat,
                 |]),
                 Uint8Array.make([|
                   defaultType,
                   1,
                   defaultType,
                   defaultType,
                 |]),
                 Uint8Array.make([|
                   defaultIsNeedUpdate,
                   defaultIsNeedUpdate,
                   defaultIsNeedUpdate,
                   defaultIsNeedUpdate,
                 |]),
               );
          })
        );
        describe("test restore arrayBufferView source texture record", () =>
          test("test restore typeArrays", () => {
            open ArrayBufferViewSourceTextureType;
            state :=
              TestTool.initWithJobConfigWithoutBuildFakeDom(
                ~sandbox,
                ~buffer=
                  SettingTool.buildBufferConfigStr(
                    ~arrayBufferViewSourceTextureCount=4,
                    (),
                  ),
                (),
              );

            let (state, texture1, texture2, texture3) =
              _prepareArrayBufferViewSourceTextureData(state^);
            let state =
              state
              |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
            let copiedState = MainStateTool.deepCopyForRestore(state);
            let (currentState, texture4) =
              ArrayBufferViewSourceTextureAPI.createArrayBufferViewSourceTexture(
                state,
              );
            let currentState =
              ArrayBufferViewSourceTextureAPI.setArrayBufferViewSourceTextureWrapT(
                texture4,
                SourceTextureType.Mirrored_repeat,
                currentState,
              );
            let currentState = AllMaterialTool.pregetGLSLData(currentState);
            let _ = MainStateTool.restore(currentState, copiedState);
            let defaultWrapS =
              ArrayBufferViewSourceTextureTool.getDefaultWrapS()
              |> SourceTextureType.wrapToUint8;
            let defaultWrapT =
              ArrayBufferViewSourceTextureTool.getDefaultWrapT()
              |> SourceTextureType.wrapToUint8;
            let defaultMagFilter =
              ArrayBufferViewSourceTextureTool.getDefaultMagFilter()
              |> SourceTextureType.filterToUint8;
            let defaultMinFilter =
              ArrayBufferViewSourceTextureTool.getDefaultMinFilter()
              |> SourceTextureType.filterToUint8;
            let defaultFormat =
              ArrayBufferViewSourceTextureTool.getDefaultFormat()
              |> SourceTextureType.formatToUint8;
            let defaultType =
              ArrayBufferViewSourceTextureTool.getDefaultType();
            let defaultIsNeedUpdate =
              ArrayBufferViewSourceTextureTool.getDefaultIsNeedUpdate();
            let defaultWidth =
              ArrayBufferViewSourceTextureTool.getDefaultWidth();
            let defaultHeight =
              ArrayBufferViewSourceTextureTool.getDefaultHeight();
            let {
              wrapSs,
              wrapTs,
              magFilters,
              minFilters,
              formats,
              types,
              isNeedUpdates,
              widths,
              heights,
            } =
              MainStateTool.unsafeGetState()
              |> ArrayBufferViewSourceTextureTool.getRecord;
            (
              wrapSs,
              wrapTs,
              magFilters,
              minFilters,
              formats,
              types,
              isNeedUpdates,
              widths,
              heights,
            )
            |> expect
            == (
                 Uint8Array.make([|
                   defaultWrapS,
                   1,
                   defaultWrapS,
                   defaultWrapS,
                 |]),
                 Uint8Array.make([|
                   defaultWrapT,
                   1,
                   defaultWrapT,
                   defaultWrapT,
                 |]),
                 Uint8Array.make([|
                   defaultMagFilter,
                   1,
                   defaultMagFilter,
                   defaultMagFilter,
                 |]),
                 Uint8Array.make([|
                   defaultMinFilter,
                   1,
                   defaultMinFilter,
                   defaultMinFilter,
                 |]),
                 Uint8Array.make([|
                   defaultFormat,
                   2,
                   defaultFormat,
                   defaultFormat,
                 |]),
                 Uint8Array.make([|
                   defaultType,
                   1,
                   defaultType,
                   defaultType,
                 |]),
                 Uint8Array.make([|
                   defaultIsNeedUpdate,
                   defaultIsNeedUpdate,
                   defaultIsNeedUpdate,
                   defaultIsNeedUpdate,
                 |]),
                 Uint16Array.make([|
                   defaultWidth,
                   2,
                   defaultWidth,
                   defaultWidth,
                 |]),
                 Uint16Array.make([|
                   defaultHeight,
                   4,
                   defaultHeight,
                   defaultHeight,
                 |]),
               );
          })
        );
      });
      describe("restore sourceInstance record to target state", () => {
        test("test restore typeArrays", () => {
          open SourceInstanceType;
          open Js.Typed_array;
          let state =
            TestTool.initWithJobConfigWithoutBuildFakeDom(
              ~sandbox,
              ~buffer=
                SettingTool.buildBufferConfigStr(
                  ~sourceInstanceCount=3,
                  ~objectInstanceCountPerSourceInstance=3,
                  (),
                ),
              (),
            );

          let (
            state,
            gameObject,
            sourceInstance1,
            objectInstanceGameObjectArr,
            objectInstanceArr,
          ) =
            ObjectInstanceTool.createObjectInstanceGameObjectArr(2, state);
          let state =
            state
            |> FakeGlTool.setFakeGl(FakeGlTool.buildFakeGl(~sandbox, ()));
          let (
            state,
            gameObject,
            sourceInstance2,
            objectInstanceGameObjectArr,
            objectInstanceArr,
          ) =
            ObjectInstanceTool.createObjectInstanceGameObjectArr(3, state);
          let state =
            state
            |> StaticTransformTool.markModelMatrixIsStatic(
                 sourceInstance1,
                 true,
               )
            |> StaticTransformTool.markModelMatrixIsStatic(
                 sourceInstance2,
                 false,
               );
          let copiedState = MainStateTool.deepCopyForRestore(state);
          let currentState = state;
          let (
            currentState,
            gameObject,
            sourceInstance3,
            objectInstanceGameObjectArr,
            objectInstanceArr,
          ) =
            ObjectInstanceTool.createObjectInstanceGameObjectArr(
              1,
              currentState,
            );
          let currentState =
            currentState
            |> StaticTransformTool.markModelMatrixIsStatic(
                 sourceInstance3,
                 true,
               )
            |> StaticTransformTool.markModelMatrixIsStatic(
                 sourceInstance1,
                 false,
               );
          let _ = MainStateTool.restore(currentState, copiedState);
          let {isTransformStatics, objectInstanceTransformCollections} =
            MainStateTool.unsafeGetState() |> SourceInstanceTool.getRecord;
          (isTransformStatics, objectInstanceTransformCollections)
          |> expect
          == (
               Uint8Array.make([|1, 0, 1|]),
               Uint32Array.make([|2, 3, 0, 5, 6, 7, 0, 0, 0|]),
             );
        });
        test(
          "add current state->sourceInstanceRecord->matrixFloat32ArrayMap typeArr to pool",
          () => {
            open StateDataMainType;
            open SourceInstanceType;
            open TypeArrayPoolType;
            let state = state^;
            let currentState = MainStateTool.createNewCompleteState(sandbox);
            let {matrixFloat32ArrayMap} =
              SourceInstanceTool.getRecord(currentState);
            let index = 0;
            let typeArr = Float32Array.make([|1.|]);
            matrixFloat32ArrayMap
            |> WonderCommonlib.MutableSparseMapService.set(index, typeArr);
            let _ = MainStateTool.restore(currentState, state);
            let {float32ArrayPoolMap}: typeArrayPoolRecord =
              MainStateTool.unsafeGetState().typeArrayPoolRecord;
            float32ArrayPoolMap
            |> WonderCommonlib.MutableSparseMapService.unsafeGet(
                 typeArr |> Float32Array.length,
               )
            |> expect == [|typeArr|];
          },
        );
        test("mark is-not-send-modelMatrixData", () => {
          open StateDataMainType;
          open SourceInstanceType;
          open TypeArrayPoolType;
          let state = state^;
          let {isSendTransformMatrixDataMap} =
            SourceInstanceTool.getRecord(state);
          isSendTransformMatrixDataMap
          |> WonderCommonlib.MutableSparseMapService.set(0, true)
          |> WonderCommonlib.MutableSparseMapService.set(1, false)
          |> ignore;
          let _ =
            MainStateTool.restore(
              MainStateTool.createNewCompleteState(sandbox),
              state,
            );
          let {isSendTransformMatrixDataMap} =
            SourceInstanceTool.getRecord(MainStateTool.unsafeGetState());
          isSendTransformMatrixDataMap
          |> WonderCommonlib.SparseMapType.arrayNullableToArrayNotNullable
          |> expect == [|false, false|];
        });
      });
      test("restore basicCameraView record to target state", () =>
        _testRestoreStateEqualTargetState(
          state, _prepareBasicCameraViewData, state =>
          state.basicCameraViewRecord
        )
      );
      test("restore perspectiveCameraProjection record to target state", () =>
        _testRestoreStateEqualTargetState(
          state, _preparePerspectiveCameraProjectionData, state =>
          state.perspectiveCameraProjectionRecord
        )
      );
    });
  });