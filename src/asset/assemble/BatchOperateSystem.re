open StateDataMainType;

open WDType;

open Js.Typed_array;

let _getBatchArrByIndices = (sourceArr, indices) =>
  indices |> Js.Array.map(index => Array.unsafe_get(sourceArr, index));

/* TODO add drawMode */
/* let _batchCreateMeshRendererArr =
       (lightMaterialGameObjects, {gameObjects}, state) => {
     let meshRendererRecord = RecordMeshRendererMainService.getRecord(state);

     AssembleCommon.checkNotDisposedBefore(
       meshRendererRecord.disposedIndexArray,
     );

     let {index}: MeshRendererType.meshRendererRecord = meshRendererRecord;
     let newIndex = index + (lightMaterialGameObjects |> Js.Array.length);
     let indexArr = ArrayService.range(index, newIndex - 1);
     state.meshRendererRecord = Some({...meshRendererRecord, index: newIndex});
     (state, indexArr);
   }; */

let _getBatchComponentGameObjectData =
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
    |> _getBatchArrByIndices(transformArr);
  let childrenTransforms =
    indices.gameObjectIndices.childrenTransformIndexData.
      childrenTransformIndices
    |> Js.Array.map(childrenIndices =>
         childrenIndices
         |> Js.Array.map(index => Array.unsafe_get(transformArr, index))
       );
  let transformGameObjects =
    indices.gameObjectIndices.transformGameObjectIndexData.gameObjectIndices
    |> _getBatchArrByIndices(gameObjectArr);
  let gameObjectTransforms =
    indices.gameObjectIndices.transformGameObjectIndexData.componentIndices
    |> _getBatchArrByIndices(transformArr);
  let geometryGameObjects =
    indices.gameObjectIndices.geometryGameObjectIndexData.gameObjectIndices
    |> _getBatchArrByIndices(gameObjectArr);
  let gameObjectGeometrys =
    indices.gameObjectIndices.geometryGameObjectIndexData.componentIndices
    |> _getBatchArrByIndices(geometryArr);

  let meshRendererGameObjects =
    indices.gameObjectIndices.meshRendererGameObjectIndexData.gameObjectIndices
    |> _getBatchArrByIndices(gameObjectArr);
  let gameObjectMeshRenderers =
    indices.gameObjectIndices.meshRendererGameObjectIndexData.componentIndices
    |> _getBatchArrByIndices(meshRendererArr);

  let basicMaterialGameObjects =
    indices.gameObjectIndices.basicMaterialGameObjectIndexData.
      gameObjectIndices
    |> _getBatchArrByIndices(gameObjectArr);
  let gameObjectBasicMaterials =
    indices.gameObjectIndices.basicMaterialGameObjectIndexData.componentIndices
    |> _getBatchArrByIndices(basicMaterialArr);

  let lightMaterialGameObjects =
    indices.gameObjectIndices.lightMaterialGameObjectIndexData.
      gameObjectIndices
    |> _getBatchArrByIndices(gameObjectArr);
  let gameObjectLightMaterials =
    indices.gameObjectIndices.lightMaterialGameObjectIndexData.componentIndices
    |> _getBatchArrByIndices(lightMaterialArr);

  /* let (state, meshRendererArr) =
     _batchCreateMeshRendererArr(lightMaterialGameObjects, wd, state); */

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
      |> _getBatchArrByIndices(gameObjectArr),
      indices.gameObjectIndices.basicCameraViewGameObjectIndexData.
        componentIndices
      |> _getBatchArrByIndices(basicCameraViewArr),
      indices.gameObjectIndices.perspectiveCameraProjectionGameObjectIndexData.
        gameObjectIndices
      |> _getBatchArrByIndices(gameObjectArr),
      indices.gameObjectIndices.perspectiveCameraProjectionGameObjectIndexData.
        componentIndices
      |> _getBatchArrByIndices(perspectiveCameraProjectionArr),
      indices.gameObjectIndices.arcballCameraControllerGameObjectIndexData.
        gameObjectIndices
      |> _getBatchArrByIndices(gameObjectArr),
      indices.gameObjectIndices.arcballCameraControllerGameObjectIndexData.
        componentIndices
      |> _getBatchArrByIndices(arcballCameraControllerArr),
      basicMaterialGameObjects,
      gameObjectBasicMaterials,
      lightMaterialGameObjects,
      gameObjectLightMaterials,
      meshRendererGameObjects,
      gameObjectMeshRenderers,
      indices.gameObjectIndices.directionLightGameObjectIndexData.
        gameObjectIndices
      |> _getBatchArrByIndices(gameObjectArr),
      indices.gameObjectIndices.directionLightGameObjectIndexData.
        componentIndices
      |> _getBatchArrByIndices(directionLightArr),
      indices.gameObjectIndices.pointLightGameObjectIndexData.gameObjectIndices
      |> _getBatchArrByIndices(gameObjectArr),
      indices.gameObjectIndices.pointLightGameObjectIndexData.componentIndices
      |> _getBatchArrByIndices(pointLightArr),
    ),
    state,
  );
};

let _getBatchTextureData =
    (lightMaterialArr, textureArr, imageArr, {indices, samplers}) => (
  (
    indices.materialIndices.diffuseMapMaterialIndices.materialIndices
    |> _getBatchArrByIndices(lightMaterialArr),
    indices.materialIndices.diffuseMapMaterialIndices.mapIndices
    |> _getBatchArrByIndices(textureArr),
  ),
  (
    indices.samplerTextureIndices.textureIndices
    |> _getBatchArrByIndices(textureArr),
    indices.samplerTextureIndices.samplerIndices
    |> _getBatchArrByIndices(samplers),
  ),
  (
    indices.imageTextureIndices.textureIndices
    |> _getBatchArrByIndices(textureArr),
    indices.imageTextureIndices.imageIndices
    |> _getBatchArrByIndices(imageArr),
  ),
);

let _getBatchAllTypeTextureData =
    (lightMaterialArr, basicSourceTextureArr, blobObjectUrlImageArr, wd) =>
  _getBatchTextureData(
    lightMaterialArr,
    basicSourceTextureArr,
    blobObjectUrlImageArr,
    wd,
  );

let _getAccessorTypeSize = ({type_}) =>
  switch (type_) {
  | SCALAR => 1
  | VEC2 => 2
  | VEC3 => 3
  | VEC4 => 4
  | MAT2 => 4
  | MAT3 => 9
  | MAT4 => 16
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_getAccessorTypeSize",
        ~description={j|unknown type_:$type_ |j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
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
                  () :
                  byteStride
                  |>
                  OptionService.unsafeGetJsonSerializedValue == _getAccessorTypeSize(
                                                                  accessor,
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
    accessor.count * _getAccessorTypeSize(accessor),
  );
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
  _getBufferPointData(
    (accessorIndex, Uint16Array._BYTES_PER_ELEMENT, dataViewArr, wd),
    Uint16Array.fromBufferRange,
  );

let _batchSetGeometryData =
    ({geometrys} as wd, geometryArr, bufferArr, state) => {
  let dataViewArr =
    bufferArr |> Js.Array.map(buffer => DataViewCommon.create(buffer));

  /* TODO optimize: first get all geometry point data; then batch set?(need benchmark test) */
  geometrys
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. state, geometryData, geometryIndex) =>
         geometryData |> OptionService.isJsonSerializedValueNone ?
           state :
           {
             let {position, normal, texCoord, index, name}: WDType.geometry =
               geometryData |> OptionService.unsafeGetJsonSerializedValue;

             let geometry = Array.unsafe_get(geometryArr, geometryIndex);

             let state =
               NameGeometryMainService.setName(geometry, name, state);
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

let _batchSetTransformParent = (parentTransforms, childrenTransforms, state) => {
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

let _batchSetTransformData = ({transforms}, gameObjectTransforms, state) => {
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

let _batchSetBasicCameraViewData =
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

let _batchSetPerspectiveCameraProjectionData =
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

let _batchSetArcballCameraControllerData =
    (
      {arcballCameraControllers},
      arcballCameraControllerArr,
      {arcballCameraControllerRecord} as state,
    ) =>
  arcballCameraControllers
  |> WonderCommonlib.ArrayService.reduceOneParami(
       /* arcballCameraControllerRecord, */
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

let _batchSetMeshRendererData = ({meshRenderers}, meshRendererArr, state) =>
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

let _batchSetBasicMaterialData = ({basicMaterials}, basicMaterialArr, state) =>
  basicMaterials
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. state, {color, name}, index) => {
         let material = basicMaterialArr[index];

         OperateBasicMaterialMainService.setColor(material, color, state)
         |> NameBasicMaterialMainService.setName(material, name);
       },
       state,
     );

let _batchSetLightMaterialData = ({lightMaterials}, lightMaterialArr, state) =>
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
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. state, basicSourceTexture, index) =>
         NameBasicSourceTextureMainService.setName(.
           basicSourceTexture,
           Array.unsafe_get(basicSourceTextures, index).name,
           state,
         ),
       state,
     );

let _batchSetNames =
    (
      (gameObjectArr, basicSourceTextureArr),
      (gameObjects: WDType.gameObjects, basicSourceTextures),
      state,
    ) =>
  state
  |> _batchSetGameObjectName(
       gameObjectArr,
       gameObjects.names,
       NameGameObjectMainService.setName,
     )
  |> _batchSetTextureName(basicSourceTextureArr, basicSourceTextures);

let batchOperate =
    (
      {
        indices,
        gameObjects,
        basicSourceTextures,
        /* arrayBufferViewSourceTextures, */
      } as wd,
      blobObjectUrlImageArr,
      bufferArr,
      (
        state,
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
        ),
        basicSourceTextureArr,
      ),
    ) => {
  let state =
    state
    |> _batchSetNames(
         (gameObjectArr, basicSourceTextureArr),
         (gameObjects, basicSourceTextures),
       );

  let (
    (
      parentTransforms,
      childrenTransforms,
      transformGameObjects,
      gameObjectTransforms,
      geometryGameObjects,
      gameObjectGeometrys,
      basicCameraViewGameObjects,
      gameObjectBasicCameraViews,
      perspectiveCameraProjectionGameObjects,
      gameObjectPerspectiveCameraProjection,
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
    ),
    state,
  ) =
    _getBatchComponentGameObjectData(
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
    );

  let state =
    BatchSetTextureAllDataSystem.batchSetFormat(
      basicSourceTextureArr,
      basicSourceTextures,
      state,
    );

  let basicSourceTextureData =
    _getBatchAllTypeTextureData(
      lightMaterialArr,
      basicSourceTextureArr,
      blobObjectUrlImageArr,
      wd,
    );

  (
    state
    |> _batchSetTransformData(wd, gameObjectTransforms)
    |> _batchSetTransformParent(parentTransforms, childrenTransforms)
    |> _batchSetGeometryData(wd, geometryArr, bufferArr)
    |> _batchSetBasicCameraViewData(wd, basicCameraViewArr)
    |> _batchSetPerspectiveCameraProjectionData(
         wd,
         perspectiveCameraProjectionArr,
       )
    |> _batchSetArcballCameraControllerData(wd, arcballCameraControllerArr)
    |> _batchSetMeshRendererData(wd, meshRendererArr)
    |> _batchSetBasicMaterialData(wd, basicMaterialArr)
    |> _batchSetLightMaterialData(wd, lightMaterialArr)
    |> BatchOperateLightSystem.batchSetDirectionLightData(
         wd,
         directionLightArr,
       )
    |> BatchOperateLightSystem.batchSetPointLightData(wd, pointLightArr)
    |> BatchOperateLightSystem.setAmbientLightData(wd)
    |> BatchAddGameObjectComponentMainService.batchAddTransformComponentForCreate(
         transformGameObjects,
         gameObjectTransforms,
       )
    |> BatchAddGameObjectComponentMainService.batchAddGeometryComponentForCreate(
         geometryGameObjects,
         gameObjectGeometrys,
       )
    |> BatchAddGameObjectComponentMainService.batchAddBasicCameraViewComponentForCreate(
         basicCameraViewGameObjects,
         gameObjectBasicCameraViews,
       )
    |> BatchAddGameObjectComponentMainService.batchAddPerspectiveCameraProjectionComponentForCreate(
         perspectiveCameraProjectionGameObjects,
         gameObjectPerspectiveCameraProjection,
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
    |> BatchSetTextureAllDataSystem.batchSet(basicSourceTextureData),
    gameObjectArr,
  );
};