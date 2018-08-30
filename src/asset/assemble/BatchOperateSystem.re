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
        arcballCameraControllerArr,
        basicMaterialArr,
        lightMaterialArr,
        directionLightArr,
        pointLightArr,
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
                 translation |> OptionService.isJsonSerializedValueNone ?
                   localPositions :
                   {
                     let transform = gameObjectTransforms[index];
                     OperateTypeArrayTransformService.setLocalPositionByTuple(
                       transform,
                       translation
                       |> OptionService.unsafeGetJsonSerializedValue,
                       localPositions,
                     );
                   },
               localPositions,
             ),
        localRotations:
          transforms
          |> WonderCommonlib.ArrayService.reduceOneParami(
               (. localRotations, {rotation}, index) =>
                 rotation |> OptionService.isJsonSerializedValueNone ?
                   localRotations :
                   {
                     let transform = gameObjectTransforms[index];
                     OperateTypeArrayTransformService.setLocalRotationByTuple(
                       transform,
                       rotation |> OptionService.unsafeGetJsonSerializedValue,
                       localRotations,
                     );
                   },
               localRotations,
             ),
        localScales:
          transforms
          |> WonderCommonlib.ArrayService.reduceOneParami(
               (. localScales, {scale}, index) =>
                 scale |> OptionService.isJsonSerializedValueNone ?
                   localScales :
                   {
                     let transform = gameObjectTransforms[index];
                     OperateTypeArrayTransformService.setLocalScaleByTuple(
                       transform,
                       scale |> OptionService.unsafeGetJsonSerializedValue,
                       localScales,
                     );
                   },
               localScales,
             ),
      }),
  };
};

let batchSetBasicCameraViewData =
    (
      {basicCameraViews},
      basicCameraViewArr,
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
         ),
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

let batchSetArcballCameraControllerData =
    (
      {arcballCameraControllers},
      arcballCameraControllerArr,
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
           isBindEvent ?
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
             let {drawMode} =
               meshRendererData |> OptionService.unsafeGetJsonSerializedValue;
             let meshRenderer = meshRendererArr[index];

             OperateMeshRendererMainService.setDrawMode(
               meshRenderer,
               drawMode |> DrawModeType.drawModeToUint8,
               state,
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

let _batchSetGameObjectName = (targets, names, setNameFunc, state) =>
  targets
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. state, target, index) =>
         setNameFunc(. target, Array.unsafe_get(names, index), state),
       state,
     );

let _batchSetTextureName = (basicSourceTextureArr, basicSourceTextures, state) =>
  basicSourceTextureArr
  |> ArrayService.reduceOneParamValidi(
       (. state, basicSourceTexture, index) =>
         NameBasicSourceTextureMainService.setName(.
           basicSourceTexture,
           Array.unsafe_get(basicSourceTextures, index).name,
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
      (gameObjectArr, basicSourceTextureArr),
      (gameObjects: WDType.gameObjects, basicSourceTextures),
      (geometrys, geometryArr),
      state,
    ) =>
  state
  |> _batchSetGameObjectName(
       gameObjectArr,
       gameObjects.names,
       NameGameObjectMainService.setName,
     )
  |> _batchSetTextureName(basicSourceTextureArr, basicSourceTextures)
  |> _batchSetGeometryName(geometrys, geometryArr);