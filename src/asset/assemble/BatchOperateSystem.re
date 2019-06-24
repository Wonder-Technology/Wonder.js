open StateDataMainType;

open WDType;

open Js.Typed_array;

let getBatchArrByIndices = (sourceArr, indices) =>
  indices |> Js.Array.map(index => Array.unsafe_get(sourceArr, index));

let getBatchComponentGameObjectData =
    (
      (
        gameObjectArr,
        transformArr,
        geometryArr,
        meshRendererArr,
        basicCameraViewArr,
        perspectiveCameraProjectionArr,
        flyCameraControllerArr,
        arcballCameraControllerArr,
        basicMaterialArr,
        lightMaterialArr,
        directionLightArr,
        pointLightArr,
        scriptArr,
      ),
      indices,
      wd,
      state,
    ) => {
  let parentTransforms =
    indices.gameObjectIndices.childrenTransformIndexData.parentTransformIndices
    |> getBatchArrByIndices(transformArr);
  let childrenTransforms =
    indices.gameObjectIndices.childrenTransformIndexData.
      childrenTransformIndices
    |> Js.Array.map(childrenIndices =>
         childrenIndices
         |> Js.Array.map(index => Array.unsafe_get(transformArr, index))
       );
  let transformGameObjects =
    indices.gameObjectIndices.transformGameObjectIndexData.gameObjectIndices
    |> getBatchArrByIndices(gameObjectArr);
  let gameObjectTransforms =
    indices.gameObjectIndices.transformGameObjectIndexData.componentIndices
    |> getBatchArrByIndices(transformArr);
  let geometryGameObjects =
    indices.gameObjectIndices.geometryGameObjectIndexData.gameObjectIndices
    |> getBatchArrByIndices(gameObjectArr);
  let gameObjectGeometrys =
    indices.gameObjectIndices.geometryGameObjectIndexData.componentIndices
    |> getBatchArrByIndices(geometryArr);

  let meshRendererGameObjects =
    indices.gameObjectIndices.meshRendererGameObjectIndexData.gameObjectIndices
    |> getBatchArrByIndices(gameObjectArr);
  let gameObjectMeshRenderers =
    indices.gameObjectIndices.meshRendererGameObjectIndexData.componentIndices
    |> getBatchArrByIndices(meshRendererArr);

  let basicMaterialGameObjects =
    indices.gameObjectIndices.basicMaterialGameObjectIndexData.
      gameObjectIndices
    |> getBatchArrByIndices(gameObjectArr);
  let gameObjectBasicMaterials =
    indices.gameObjectIndices.basicMaterialGameObjectIndexData.componentIndices
    |> getBatchArrByIndices(basicMaterialArr);

  let lightMaterialGameObjects =
    indices.gameObjectIndices.lightMaterialGameObjectIndexData.
      gameObjectIndices
    |> getBatchArrByIndices(gameObjectArr);
  let gameObjectLightMaterials =
    indices.gameObjectIndices.lightMaterialGameObjectIndexData.componentIndices
    |> getBatchArrByIndices(lightMaterialArr);

  let scriptGameObjects =
    indices.gameObjectIndices.scriptGameObjectIndexData.gameObjectIndices
    |> getBatchArrByIndices(gameObjectArr);
  let gameObjectScripts =
    indices.gameObjectIndices.scriptGameObjectIndexData.componentIndices
    |> getBatchArrByIndices(scriptArr);

  (
    (
      parentTransforms,
      childrenTransforms,
      transformGameObjects,
      gameObjectTransforms,
      geometryGameObjects,
      gameObjectGeometrys,
      indices.gameObjectIndices.basicCameraViewGameObjectIndexData.
        gameObjectIndices
      |> getBatchArrByIndices(gameObjectArr),
      indices.gameObjectIndices.basicCameraViewGameObjectIndexData.
        componentIndices
      |> getBatchArrByIndices(basicCameraViewArr),
      indices.gameObjectIndices.perspectiveCameraProjectionGameObjectIndexData.
        gameObjectIndices
      |> getBatchArrByIndices(gameObjectArr),
      indices.gameObjectIndices.perspectiveCameraProjectionGameObjectIndexData.
        componentIndices
      |> getBatchArrByIndices(perspectiveCameraProjectionArr),
      indices.gameObjectIndices.flyCameraControllerGameObjectIndexData.
        gameObjectIndices
      |> getBatchArrByIndices(gameObjectArr),
      indices.gameObjectIndices.flyCameraControllerGameObjectIndexData.
        componentIndices
      |> getBatchArrByIndices(flyCameraControllerArr),
      indices.gameObjectIndices.arcballCameraControllerGameObjectIndexData.
        gameObjectIndices
      |> getBatchArrByIndices(gameObjectArr),
      indices.gameObjectIndices.arcballCameraControllerGameObjectIndexData.
        componentIndices
      |> getBatchArrByIndices(arcballCameraControllerArr),
      basicMaterialGameObjects,
      gameObjectBasicMaterials,
      lightMaterialGameObjects,
      gameObjectLightMaterials,
      meshRendererGameObjects,
      gameObjectMeshRenderers,
      indices.gameObjectIndices.directionLightGameObjectIndexData.
        gameObjectIndices
      |> getBatchArrByIndices(gameObjectArr),
      indices.gameObjectIndices.directionLightGameObjectIndexData.
        componentIndices
      |> getBatchArrByIndices(directionLightArr),
      indices.gameObjectIndices.pointLightGameObjectIndexData.gameObjectIndices
      |> getBatchArrByIndices(gameObjectArr),
      indices.gameObjectIndices.pointLightGameObjectIndexData.componentIndices
      |> getBatchArrByIndices(pointLightArr),
      scriptGameObjects,
      gameObjectScripts,
    ),
    state,
  );
};

let batchSetTransformParent = (parentTransforms, childrenTransforms, state) => {
  let ({parentMap, childMap}: TransformType.transformRecord) as transformRecord =
    RecordTransformMainService.getRecord(state);
  let (parentMap, childMap) =
    parentTransforms
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (. hierachyDataTuple, parentTransform, index) =>
           AssembleCommon.addChildrenToParent(
             parentTransform,
             Array.unsafe_get(childrenTransforms, index),
             hierachyDataTuple,
           ),
         (parentMap, childMap),
       );
  {
    ...state,
    transformRecord: Some({...transformRecord, parentMap, childMap}),
  };
};

let _batchSetTransformLocalData =
    (
      (gameObjectTransforms, index),
      (localData, localDataTypeArray),
      setLocalDataFunc,
    ) =>
  localData |> OptionService.isJsonSerializedValueNone ?
    localDataTypeArray :
    {
      let transform = gameObjectTransforms[index];
      setLocalDataFunc(
        transform,
        localData |> OptionService.unsafeGetJsonSerializedValue,
        localDataTypeArray,
      );
    };

let batchSetTransformData = ({transforms}, gameObjectTransforms, state) => {
  let (
        {localPositions, localRotations, localScales}: TransformType.transformRecord
      ) as transformRecord =
    RecordTransformMainService.getRecord(state);
  {
    ...state,
    transformRecord:
      Some({
        ...transformRecord,
        localPositions:
          transforms
          |> WonderCommonlib.ArrayService.reduceOneParami(
               (. localPositions, {translation}, index) =>
                 _batchSetTransformLocalData(
                   (gameObjectTransforms, index),
                   (translation, localPositions),
                   OperateTypeArrayTransformService.setLocalPositionByTuple,
                 ),
               localPositions,
             ),
        localRotations:
          transforms
          |> WonderCommonlib.ArrayService.reduceOneParami(
               (. localRotations, {rotation}, index) =>
                 _batchSetTransformLocalData(
                   (gameObjectTransforms, index),
                   (rotation, localRotations),
                   OperateTypeArrayTransformService.setLocalRotationByTuple,
                 ),
               localRotations,
             ),
        localScales:
          transforms
          |> WonderCommonlib.ArrayService.reduceOneParami(
               (. localScales, {scale}, index) =>
                 _batchSetTransformLocalData(
                   (gameObjectTransforms, index),
                   (scale, localScales),
                   OperateTypeArrayTransformService.setLocalScaleByTuple,
                 ),
               localScales,
             ),
      }),
  };
};

let batchSetBasicCameraViewData =
    (
      {basicCameraViews},
      basicCameraViewArr,
      isActiveCamera,
      {basicCameraViewRecord} as state,
    ) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;

      let len =
        basicCameraViews
        |> Js.Array.filter(({isActive}) => isActive === true)
        |> Js.Array.length;

      test(
        Log.buildAssertMessage(
          ~expect={j|has at most one active basicCameraView|j},
          ~actual={j|has $len|j},
        ),
        () =>
        len <= 1
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  {
    ...state,
    basicCameraViewRecord:
      isActiveCamera ?
        basicCameraViews
        |> WonderCommonlib.ArrayService.reduceOneParami(
             (. basicCameraViewRecord, {isActive}, index) => {
               let cameraView = basicCameraViewArr[index];

               let basicCameraViewRecord =
                 isActive ?
                   ActiveBasicCameraViewService.active(
                     cameraView,
                     basicCameraViewRecord,
                   ) :
                   basicCameraViewRecord;

               basicCameraViewRecord;
             },
             basicCameraViewRecord,
           ) :
        basicCameraViewRecord,
  };
};

let batchSetPerspectiveCameraProjectionData =
    (
      {perspectiveCameraProjections},
      perspectiveCameraProjectionArr,
      {perspectiveCameraProjectionRecord} as state,
    ) => {
  ...state,
  perspectiveCameraProjectionRecord:
    perspectiveCameraProjections
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           perspectiveCameraProjectionRecord,
           {near, far, fovy, aspect},
           index,
         ) => {
           let cameraProjection = perspectiveCameraProjectionArr[index];

           let perspectiveCameraProjectionRecord =
             perspectiveCameraProjectionRecord
             |> FrustumPerspectiveCameraProjectionService.setNear(
                  cameraProjection,
                  near,
                );
           let perspectiveCameraProjectionRecord =
             far |> OptionService.isJsonSerializedValueNone ?
               perspectiveCameraProjectionRecord
               |> FrustumPerspectiveCameraProjectionService.setFar(
                    cameraProjection,
                    FrustumPerspectiveCameraProjectionService.getInfiniteFar(),
                  ) :
               perspectiveCameraProjectionRecord
               |> FrustumPerspectiveCameraProjectionService.setFar(
                    cameraProjection,
                    far |> OptionService.unsafeGetJsonSerializedValue,
                  );
           let perspectiveCameraProjectionRecord =
             perspectiveCameraProjectionRecord
             |> FrustumPerspectiveCameraProjectionService.setFovy(
                  cameraProjection,
                  fovy,
                );
           let perspectiveCameraProjectionRecord =
             aspect |> OptionService.isJsonSerializedValueNone ?
               perspectiveCameraProjectionRecord :
               perspectiveCameraProjectionRecord
               |> FrustumPerspectiveCameraProjectionService.setAspect(
                    cameraProjection,
                    aspect |> OptionService.unsafeGetJsonSerializedValue,
                  );

           perspectiveCameraProjectionRecord;
         },
         perspectiveCameraProjectionRecord,
       ),
};

let batchSetFlyCameraControllerData =
    (
      {flyCameraControllers},
      flyCameraControllerArr,
      isBindEventConfig,
      {flyCameraControllerRecord} as state,
    ) =>
  flyCameraControllers
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (.
         state,
         {moveSpeed, rotateSpeed, wheelSpeed, isBindEvent}: SceneGraphType.flyCameraController,
         index,
       ) => {
         let cameraController = flyCameraControllerArr[index];

         let state =
           isBindEventConfig && isBindEvent ?
             EventFlyCameraControllerMainService.bindEvent(
               cameraController,
               state,
             ) :
             state;

         {
           ...state,
           flyCameraControllerRecord:
             state.flyCameraControllerRecord
             |> OperateFlyCameraControllerService.setMoveSpeed(
                  cameraController,
                  moveSpeed,
                )
             |> OperateFlyCameraControllerService.setRotateSpeed(
                  cameraController,
                  rotateSpeed,
                )
             |> OperateFlyCameraControllerService.setWheelSpeed(
                  cameraController,
                  wheelSpeed,
                ),
         };
       },
       state,
     );

let batchSetArcballCameraControllerData =
    (
      {arcballCameraControllers},
      arcballCameraControllerArr,
      isBindEventConfig,
      {arcballCameraControllerRecord} as state,
    ) =>
  arcballCameraControllers
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (.
         state,
         {
           distance,
           minDistance,
           phi,
           theta,
           thetaMargin,
           target,
           moveSpeedX,
           moveSpeedY,
           rotateSpeed,
           wheelSpeed,
           isBindEvent,
         }: SceneGraphType.arcballCameraController,
         index,
       ) => {
         let cameraController = arcballCameraControllerArr[index];

         let state =
           isBindEventConfig && isBindEvent ?
             EventArcballCameraControllerMainService.bindEvent(
               cameraController,
               state,
             ) :
             state;

         {
           ...state,
           arcballCameraControllerRecord:
             state.arcballCameraControllerRecord
             |> OperateArcballCameraControllerService.setMinDistance(
                  cameraController,
                  minDistance,
                )
             |> OperateArcballCameraControllerService.setDistance(
                  cameraController,
                  distance,
                )
             |> OperateArcballCameraControllerService.setPhi(
                  cameraController,
                  phi,
                )
             |> OperateArcballCameraControllerService.setTheta(
                  cameraController,
                  theta,
                )
             |> OperateArcballCameraControllerService.setThetaMargin(
                  cameraController,
                  thetaMargin,
                )
             |> OperateArcballCameraControllerService.setTarget(
                  cameraController,
                  target,
                )
             |> OperateArcballCameraControllerService.setMoveSpeedX(
                  cameraController,
                  moveSpeedX,
                )
             |> OperateArcballCameraControllerService.setMoveSpeedY(
                  cameraController,
                  moveSpeedY,
                )
             |> OperateArcballCameraControllerService.setRotateSpeed(
                  cameraController,
                  rotateSpeed,
                )
             |> OperateArcballCameraControllerService.setWheelSpeed(
                  cameraController,
                  wheelSpeed,
                ),
         };
       },
       state,
     );

let batchSetMeshRendererData = ({meshRenderers}, meshRendererArr, state) =>
  meshRenderers
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. state, meshRendererData, index) =>
         meshRendererData |> OptionService.isJsonSerializedValueNone ?
           state :
           {
             let {drawMode, isRender} =
               meshRendererData |> OptionService.unsafeGetJsonSerializedValue;
             let meshRenderer = meshRendererArr[index];

             state
             |> OperateMeshRendererMainService.setDrawMode(
                  meshRenderer,
                  drawMode |> DrawModeType.drawModeToUint8,
                )
             |> OperateMeshRendererMainService.setIsRender(
                  meshRenderer,
                  isRender,
                );
           },
       state,
     );

let batchSetBasicMaterialData = ({basicMaterials}, basicMaterialArr, state) =>
  basicMaterials
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. state, {color, name}, index) => {
         let material = basicMaterialArr[index];

         OperateBasicMaterialMainService.setColor(material, color, state)
         |> NameBasicMaterialMainService.setName(material, name);
       },
       state,
     );

let batchSetLightMaterialData = ({lightMaterials}, lightMaterialArr, state) =>
  lightMaterials
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. state, {diffuseColor, name}, index) => {
         let material = lightMaterialArr[index];

         OperateLightMaterialMainService.setDiffuseColor(
           material,
           diffuseColor,
           state,
         )
         |> NameLightMaterialMainService.setName(material, name);
       },
       state,
     );

let batchSetScriptData = ({scripts}, scriptArr, state) =>
  scripts
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (.
         state,
         {isActive, eventFunctionDataMap, attributeMap}: script,
         index,
       ) => {
         let script = scriptArr[index];

         state
         |> IsActiveScriptMainService.setIsActive(script, isActive)
         |> OperateScriptDataMainService.addEventFunctionDataMap(
              script,
              ConvertScriptDataUtils.convertEventFunctionDataMapJsonToRecord(
                eventFunctionDataMap,
              ),
            )
         |> OperateScriptDataMainService.addAttributeMap(
              script,
              ConvertScriptDataUtils.convertAttributeMapJsonToRecord(
                attributeMap,
              ),
            );
       },
       state,
     );

let _batchSetGameObjectData = (targets, dataArr, setDataFunc, state) =>
  targets
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. state, target, index) =>
         setDataFunc(. target, Array.unsafe_get(dataArr, index), state),
       state,
     );

let _batchSetBasicSourceTextureName =
    (
      basicSourceTextureArr,
      basicSourceTextures: array(WDType.basicSourceTexture),
      state,
    ) =>
  basicSourceTextureArr
  |> ArrayService.reduceOneParamValidi(
       (. state, basicSourceTexture, index) =>
         NameBasicSourceTextureMainService.setName(
           basicSourceTexture,
           Array.unsafe_get(basicSourceTextures, index).name,
           state,
         ),
       state,
     );

let _batchSetCubemapTextureName =
    (cubemapTextureArr, cubemapTextures: array(WDType.cubemapTexture), state) =>
  cubemapTextureArr
  |> ArrayService.reduceOneParamValidi(
       (. state, cubemapTexture, index) =>
         NameBasicSourceTextureMainService.setName(
           cubemapTexture,
           Array.unsafe_get(cubemapTextures, index).name,
           state,
         ),
       state,
     );

let _batchSetGeometryName = (geometrys, geometryArr, state) =>
  geometrys
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. state, geometryData, geometryIndex) =>
         geometryData |> OptionService.isJsonSerializedValueNone ?
           state :
           {
             let {name}: WDType.geometry =
               geometryData |> OptionService.unsafeGetJsonSerializedValue;

             let geometry = Array.unsafe_get(geometryArr, geometryIndex);

             NameGeometryMainService.setName(geometry, name, state);
           },
       state,
     );

let batchSetNames =
    (
      (gameObjectArr, gameObjects),
      (basicSourceTextureArr, basicSourceTextures),
      (cubemapTextureArr, cubemapTextures),
      (geometrys, geometryArr),
      state,
    ) =>
  state
  |> _batchSetGameObjectData(
       gameObjectArr,
       gameObjects.names,
       NameGameObjectMainService.setName,
     )
  |> _batchSetBasicSourceTextureName(
       basicSourceTextureArr,
       basicSourceTextures,
     )
  |> _batchSetCubemapTextureName(cubemapTextureArr, cubemapTextures)
  |> _batchSetGeometryName(geometrys, geometryArr);

let batchSetIsActive = (gameObjectArr, gameObjects: WDType.gameObjects, state) =>
  gameObjectArr
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. state, gameObject, index) =>
         AssembleIsActiveUtils.doesGameObjectHasIsActiveData(
           index,
           gameObjects,
         ) ?
           SetIsActiveGameObjectMainService.setIsActive(
             gameObject,
             AssembleIsActiveUtils.unsafeGetGameObjectIsActiveData(
               index,
               gameObjects,
             ),
             state,
           ) :
           state,
       state,
     );

let batchSetIsRoot = (gameObjectArr, gameObjects: WDType.gameObjects, state) =>
  gameObjectArr
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. state, gameObject, index) =>
         AssembleIsRootUtils.doesGameObjectHasIsRootData(index, gameObjects) ?
           IsRootGameObjectMainService.setIsRoot(.
             gameObject,
             AssembleIsRootUtils.unsafeGetGameObjectIsRootData(
               index,
               gameObjects,
             ),
             state,
           ) :
           state,
       state,
     );

let batchSetNamesAndGameObjectIsActiveAndIsRoot =
    (
      {geometrys, gameObjects, basicSourceTextures, cubemapTextures} as wd,
      (
        state,
        gameObjectArr,
        (transformArr, geometryArr),
        (basicSourceTextureArr, cubemapTextureArr),
      ),
    ) =>
  state
  |> batchSetNames(
       (gameObjectArr, gameObjects),
       (basicSourceTextureArr, basicSourceTextures),
       (cubemapTextureArr, cubemapTextures),
       (geometrys, geometryArr),
     )
  |> batchSetIsActive(gameObjectArr, gameObjects)
  |> batchSetIsRoot(gameObjectArr, gameObjects);

let batchSetComponentData =
    (
      wd,
      /* (blobObjectUrlImageArr, imageUint8ArrayDataMap), */
      /* bufferArr, */
      (isBindEvent, isActiveCamera),
      (
        transformArr,
        geometryArr,
        meshRendererArr,
        basicCameraViewArr,
        perspectiveCameraProjectionArr,
        flyCameraControllerArr,
        arcballCameraControllerArr,
        basicMaterialArr,
        lightMaterialArr,
        directionLightArr,
        pointLightArr,
        scriptArr,
      ),
      (
        parentTransforms,
        childrenTransforms,
        /* transformGameObjects, */
        gameObjectTransforms,
        /* geometryGameObjects,
           gameObjectGeometrys,
           basicCameraViewGameObjects,
           gameObjectBasicCameraViews,
           perspectiveCameraProjectionGameObjects,
           gameObjectPerspectiveCameraProjection,
           arcballCameraControllerGameObjects,
           gameObjectArcballCameraController,
           basicMaterialGameObjects,
           gameObjectBasicMaterials, */
        /* lightMaterialGameObjects, */
        /* gameObjectLightMaterials,
           meshRendererGameObjects,
           gameObjectMeshRenderers,
           directionLightGameObjects,
           gameObjectDirectionLights,
           pointLightGameObjects,
           gameObjectPointLights,
           scriptGameObjects,
           gameObjectScripts, */
      ),
      state,
    ) =>
  state
  |> batchSetTransformData(wd, gameObjectTransforms)
  |> batchSetTransformParent(parentTransforms, childrenTransforms)
  /* |> _batchSetGeometryData(wd, geometryArr, bufferArr) */
  |> batchSetBasicCameraViewData(wd, basicCameraViewArr, isActiveCamera)
  |> batchSetPerspectiveCameraProjectionData(
       wd,
       perspectiveCameraProjectionArr,
     )
  |> batchSetFlyCameraControllerData(wd, flyCameraControllerArr, isBindEvent)
  |> batchSetArcballCameraControllerData(
       wd,
       arcballCameraControllerArr,
       isBindEvent,
     )
  |> batchSetMeshRendererData(wd, meshRendererArr)
  |> batchSetBasicMaterialData(wd, basicMaterialArr)
  |> batchSetLightMaterialData(wd, lightMaterialArr)
  |> batchSetScriptData(wd, scriptArr)
  |> BatchOperateLightSystem.batchSetDirectionLightData(
       wd,
       directionLightArr,
     )
  |> BatchOperateLightSystem.batchSetPointLightData(wd, pointLightArr)
  |> BatchOperateLightSystem.setAmbientLightData(wd);

let batchAddComponent =
    (
      wd,
      /* (blobObjectUrlImageArr, imageUint8ArrayDataMap), */
      /* bufferArr, */
      /* (isBindEvent, isActiveCamera), */
      /* (
           gameObjectArr,
           (
             transformArr,
             geometryArr,
             meshRendererArr,
             basicCameraViewArr,
             perspectiveCameraProjectionArr,
             arcballCameraControllerArr,
             basicMaterialArr,
             lightMaterialArr,
             directionLightArr,
             pointLightArr,
             scriptArr,
           ),
           basicSourceTextureArr,
         ), */
      /* basicSourceTextureData, */
      (
        /* parentTransforms,
           childrenTransforms, */
        transformGameObjects,
        gameObjectTransforms,
        geometryGameObjects,
        gameObjectGeometrys,
        basicCameraViewGameObjects,
        gameObjectBasicCameraViews,
        perspectiveCameraProjectionGameObjects,
        gameObjectPerspectiveCameraProjection,
        flyCameraControllerGameObjects,
        gameObjectFlyCameraController,
        arcballCameraControllerGameObjects,
        gameObjectArcballCameraController,
        basicMaterialGameObjects,
        gameObjectBasicMaterials,
        lightMaterialGameObjects,
        gameObjectLightMaterials,
        meshRendererGameObjects,
        gameObjectMeshRenderers,
        directionLightGameObjects,
        gameObjectDirectionLights,
        pointLightGameObjects,
        gameObjectPointLights,
        scriptGameObjects,
        gameObjectScripts,
      ),
      state,
    ) =>
  state
  |> BatchAddGameObjectComponentMainService.batchAddTransformComponentForCreate(
       transformGameObjects,
       gameObjectTransforms,
     )
  /* |> BatchAddGameObjectComponentMainService.batchAddGeometryComponentForCreate(
       geometryGameObjects,
       gameObjectGeometrys,
     ) */
  |> BatchAddGameObjectComponentMainService.batchAddBasicCameraViewComponentForCreate(
       basicCameraViewGameObjects,
       gameObjectBasicCameraViews,
     )
  |> BatchAddGameObjectComponentMainService.batchAddPerspectiveCameraProjectionComponentForCreate(
       perspectiveCameraProjectionGameObjects,
       gameObjectPerspectiveCameraProjection,
     )
  |> BatchAddGameObjectComponentMainService.batchAddFlyCameraControllerComponentForCreate(
       flyCameraControllerGameObjects,
       gameObjectFlyCameraController,
     )
  |> BatchAddGameObjectComponentMainService.batchAddArcballCameraControllerComponentForCreate(
       arcballCameraControllerGameObjects,
       gameObjectArcballCameraController,
     )
  |> BatchAddGameObjectComponentMainService.batchAddBasicMaterialComponentForCreate(
       basicMaterialGameObjects,
       gameObjectBasicMaterials,
     )
  |> BatchAddGameObjectComponentMainService.batchAddLightMaterialComponentForCreate(
       lightMaterialGameObjects,
       gameObjectLightMaterials,
     )
  |> BatchAddGameObjectComponentMainService.batchAddMeshRendererComponentForCreate(
       meshRendererGameObjects,
       gameObjectMeshRenderers,
     )
  |> BatchAddGameObjectComponentMainService.batchAddDirectionLightComponentForCreate(
       directionLightGameObjects,
       gameObjectDirectionLights,
     )
  |> BatchAddGameObjectComponentMainService.batchAddPointLightComponentForCreate(
       pointLightGameObjects,
       gameObjectPointLights,
     )
  |> BatchAddGameObjectComponentMainService.batchAddScriptComponentForCreate(
       scriptGameObjects,
       gameObjectScripts,
     );
/* |> BatchSetWholeBasicSourceTextureAllDataSystem.batchSet(basicSourceTextureData); */