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

let _getBufferData =
    (
      {accessors, bufferViews, buffers},
      (accessorIndex, dataViewArr, bytes_per_element),
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|not support interleaved buffer data|j},
                ~actual={j|is interleaved|j},
              ),
              () => {
                let accessor = Array.unsafe_get(accessors, accessorIndex);
                let {byteStride} =
                  Array.unsafe_get(bufferViews, accessor.bufferView);

                byteStride |> OptionService.isJsonSerializedValueNone ?
                  assertPass() :
                  byteStride
                  |>
                  OptionService.unsafeGetJsonSerializedValue == BufferUtils.getAccessorTypeSize(
                                                                  accessor.
                                                                    type_,
                                                                )
                  * bytes_per_element;
              },
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  let accessor = Array.unsafe_get(accessors, accessorIndex);
  let bufferView = Array.unsafe_get(bufferViews, accessor.bufferView);
  let dataView = Array.unsafe_get(dataViewArr, bufferView.buffer);

  let offset = accessor.byteOffset + bufferView.byteOffset;

  (
    dataView |> DataView.buffer,
    offset,
    BufferUtils.computeTypeArrayLengthByAccessorData(
      accessor.count,
      accessor.type_,
    ),
  );
};

let getAccessorComponentType = ({accessors}, accessorIndex) => {
  let accessor = Array.unsafe_get(accessors, accessorIndex);

  accessor.componentType;
};

let _getBufferPointData =
    (
      (accessorIndex, bytes_per_element, dataViewArr, wd),
      fromBufferRangeFunc,
    ) => {
  let (arrayBuffer, offset, length) =
    _getBufferData(wd, (accessorIndex, dataViewArr, bytes_per_element));

  fromBufferRangeFunc(arrayBuffer, ~offset, ~length);
};

let _getBufferAttributeData = (accessorIndex, dataViewArr, wd) =>
  _getBufferPointData(
    (accessorIndex, Float32Array._BYTES_PER_ELEMENT, dataViewArr, wd),
    Float32Array.fromBufferRange,
  );

let _getBufferIndexData = (accessorIndex, dataViewArr, wd) =>
  switch (getAccessorComponentType(wd, accessorIndex)) {
  | UNSIGNED_BYTE =>
    Uint16Array.from(
      _getBufferPointData(
        (accessorIndex, Uint8Array._BYTES_PER_ELEMENT, dataViewArr, wd),
        Uint8Array.fromBufferRange,
      )
      |> Obj.magic,
    )
  | UNSIGNED_SHORT =>
    _getBufferPointData(
      (accessorIndex, Uint16Array._BYTES_PER_ELEMENT, dataViewArr, wd),
      Uint16Array.fromBufferRange,
    )
  };

let batchSetGeometryData = ({geometrys} as wd, geometryArr, bufferArr, state) => {
  let dataViewArr =
    bufferArr |> Js.Array.map(buffer => DataViewCommon.create(buffer));

  /* TODO optimize: first get all geometry point data; then batch set?(need benchmark test) */
  geometrys
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. state, geometryData, geometryIndex) =>
         geometryData |> OptionService.isJsonSerializedValueNone ?
           state :
           {
             let {position, normal, texCoord, index}: WDType.geometry =
               geometryData |> OptionService.unsafeGetJsonSerializedValue;

             let geometry = Array.unsafe_get(geometryArr, geometryIndex);
             let state =
               VerticesGeometryMainService.setVerticesByTypeArray(
                 geometry,
                 _getBufferAttributeData(position, dataViewArr, wd),
                 state,
               );
             let state =
               normal |> OptionService.isJsonSerializedValueNone ?
                 state :
                 NormalsGeometryMainService.setNormalsByTypeArray(
                   geometry,
                   _getBufferAttributeData(
                     normal |> OptionService.unsafeGetJsonSerializedValue,
                     dataViewArr,
                     wd,
                   ),
                   state,
                 );
             let state =
               texCoord |> OptionService.isJsonSerializedValueNone ?
                 state :
                 TexCoordsGeometryMainService.setTexCoordsByTypeArray(
                   geometry,
                   _getBufferAttributeData(
                     texCoord |> OptionService.unsafeGetJsonSerializedValue,
                     dataViewArr,
                     wd,
                   ),
                   state,
                 );
             let state =
               IndicesGeometryMainService.setIndicesByTypeArray(
                 geometry,
                 _getBufferIndexData(index, dataViewArr, wd),
                 state,
               );
             state;
           },
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
               ActiveBasicCameraViewService.setActive(
                 cameraView,
                 isActive,
                 basicCameraViewRecord,
               );

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

let batchSetGameObjectName = (targets, names, setNameFunc, state) =>
  targets
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. state, target, index) =>
         setNameFunc(. target, Array.unsafe_get(names, index), state),
       state,
     );

let batchSetTextureName = (basicSourceTextureArr, basicSourceTextures, state) =>
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

let batchSetNames =
    (
      (gameObjectArr, basicSourceTextureArr),
      (gameObjects: WDType.gameObjects, basicSourceTextures),
      state,
    ) =>
  state
  |> batchSetGameObjectName(
       gameObjectArr,
       gameObjects.names,
       NameGameObjectMainService.setName,
     )
  |> batchSetTextureName(basicSourceTextureArr, basicSourceTextures);