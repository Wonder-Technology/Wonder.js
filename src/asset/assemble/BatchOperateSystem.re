open StateDataMainType;

open WDType;

open Js.Typed_array;

let _getBatchArrByIndices = (sourceArr, indices) =>
  indices |> Js.Array.map(index => Array.unsafe_get(sourceArr, index));

let _batchCreateMeshRendererArr =
    (lightMaterialGameObjects, {gameObjects}, {meshRendererRecord} as state) => {
  AssembleCommon.checkNotDisposedBefore(
    meshRendererRecord.disposedIndexArray,
  );

  let {index}: MeshRendererType.meshRendererRecord = meshRendererRecord;
  let newIndex = index + (lightMaterialGameObjects |> Js.Array.length);
  let indexArr = ArrayService.range(index, newIndex - 1);
  state.meshRendererRecord = {...meshRendererRecord, index: newIndex};
  (state, indexArr);
};

let _getBatchComponentGameObjectData =
    (
      (
        gameObjectArr,
        transformArr,
        customGeometryArr,
        basicCameraViewArr,
        perspectiveCameraProjectionArr,
        lightMaterialArr,
        directionLightArr,
        pointLightArr,
      ),
      indices,
      wdRecord,
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
  let customGeometryGameObjects =
    indices.gameObjectIndices.customGeometryGameObjectIndexData.
      gameObjectIndices
    |> _getBatchArrByIndices(gameObjectArr);
  let gameObjectCustomGeometrys =
    indices.gameObjectIndices.customGeometryGameObjectIndexData.
      componentIndices
    |> _getBatchArrByIndices(customGeometryArr);

  let lightMaterialGameObjects =
    indices.gameObjectIndices.lightMaterialGameObjectIndexData.
      gameObjectIndices
    |> _getBatchArrByIndices(gameObjectArr);

  let gameObjectLightMaterials =
    indices.gameObjectIndices.lightMaterialGameObjectIndexData.componentIndices
    |> _getBatchArrByIndices(lightMaterialArr);

  let (state, meshRendererArr) =
    _batchCreateMeshRendererArr(lightMaterialGameObjects, wdRecord, state);

  (
    (
      parentTransforms,
      childrenTransforms,
      transformGameObjects,
      gameObjectTransforms,
      customGeometryGameObjects,
      gameObjectCustomGeometrys,
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
      /* indices.gameObjectIndices.lightMaterialGameObjectIndexData.
           gameObjectIndices
         |> _getBatchArrByIndices(gameObjectArr),

         indices.gameObjectIndices.lightMaterialGameObjectIndexData.componentIndices
         |> _getBatchArrByIndices(lightMaterialArr), */
      lightMaterialGameObjects,
      gameObjectLightMaterials,
      lightMaterialGameObjects,
      meshRendererArr,
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
    (
      lightMaterialArr,
      (basicSourceTextureArr, arrayBufferViewSourceTextureArr),
      (imageBase64Arr, imageUint8ArrayArr),
      wdRecord,
    ) =>
  switch (basicSourceTextureArr) {
  | Some(basicSourceTextureArr) => (
      _getBatchTextureData(
        lightMaterialArr,
        basicSourceTextureArr,
        imageBase64Arr |> OptionService.unsafeGet,
        wdRecord,
      )
      |. Some,
      None,
    )
  | None => (
      None,
      _getBatchTextureData(
        lightMaterialArr,
        arrayBufferViewSourceTextureArr |> OptionService.unsafeGet,
        imageUint8ArrayArr |> OptionService.unsafeGet,
        wdRecord,
      )
      |. Some,
    )
  };

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
      (getDataViewFunc, createTypeArrayFunc),
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
                let bufferView =
                  Array.unsafe_get(bufferViews, accessor.bufferView);
                switch (bufferView.byteStride) {
                | Some(byteStride) =>
                  byteStride == _getAccessorTypeSize(accessor)
                  * bytes_per_element
                | None => ()
                };
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

  let offset = ref(accessor.byteOffset + bufferView.byteOffset);
  let pointArr = [||];

  for (i in 0 to accessor.count * _getAccessorTypeSize(accessor) - 1) {
    let (value, newOffset) = getDataViewFunc(. offset^, dataView);

    offset := newOffset;

    pointArr |> ArrayService.push(value) |> ignore;
  };

  createTypeArrayFunc(pointArr);
};

let _getBufferAttributeData = (accessorIndex, dataViewArr, wdRecord) =>
  _getBufferData(
    wdRecord,
    (accessorIndex, dataViewArr, Float32Array._BYTES_PER_ELEMENT),
    (DataViewCommon.getFloat, Float32Array.make),
  );

let _getBufferIndexData = (accessorIndex, dataViewArr, wdRecord) =>
  _getBufferData(
    wdRecord,
    (accessorIndex, dataViewArr, Uint16Array._BYTES_PER_ELEMENT),
    (DataViewCommon.getUint16_1, Uint16Array.make),
  );

let _batchSetCustomGeometryData =
    ({customGeometrys} as wdRecord, customGeometryArr, bufferArr, state) => {
  let dataViewArr =
    bufferArr |> Js.Array.map(buffer => DataViewCommon.create(buffer));

  /* TODO optimize: first get all customGeometry point data; then batch set?(need benchmark test) */
  customGeometrys
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. state, geometryData, geometryIndex) =>
         switch (geometryData) {
         | None => state
         | Some(({position, normal, texCoord, index}: WDType.customGeometry)) =>
           let customGeometry =
             Array.unsafe_get(customGeometryArr, geometryIndex);
           let state =
             VerticesCustomGeometryMainService.setVerticesByTypeArray(
               customGeometry,
               _getBufferAttributeData(position, dataViewArr, wdRecord),
               state,
             );
           let state =
             switch (normal) {
             | None => state
             | Some(normal) =>
               NormalsCustomGeometryMainService.setNormalsByTypeArray(
                 customGeometry,
                 _getBufferAttributeData(normal, dataViewArr, wdRecord),
                 state,
               )
             };
           let state =
             switch (texCoord) {
             | None => state
             | Some(texCoord) =>
               TexCoordsCustomGeometryMainService.setTexCoordsByTypeArray(
                 customGeometry,
                 _getBufferAttributeData(texCoord, dataViewArr, wdRecord),
                 state,
               )
             };
           let state =
             IndicesCustomGeometryMainService.setIndicesByTypeArray(
               customGeometry,
               _getBufferIndexData(index, dataViewArr, wdRecord),
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
                 switch (translation) {
                 | None => localPositions
                 | Some(translation) =>
                   let transform = gameObjectTransforms[index];
                   OperateTypeArrayTransformService.setLocalPositionByTuple(
                     transform,
                     translation,
                     localPositions,
                   );
                 },
               localPositions,
             ),
        localRotations:
          transforms
          |> WonderCommonlib.ArrayService.reduceOneParami(
               (. localRotations, {rotation}, index) =>
                 switch (rotation) {
                 | None => localRotations
                 | Some(rotation) =>
                   let transform = gameObjectTransforms[index];
                   OperateTypeArrayTransformService.setLocalRotationByTuple(
                     transform,
                     rotation,
                     localRotations,
                   );
                 },
               localRotations,
             ),
        localScales:
          transforms
          |> WonderCommonlib.ArrayService.reduceOneParami(
               (. localScales, {scale}, index) =>
                 switch (scale) {
                 | None => localScales
                 | Some(scale) =>
                   let transform = gameObjectTransforms[index];
                   OperateTypeArrayTransformService.setLocalScaleByTuple(
                     transform,
                     scale,
                     localScales,
                   );
                 },
               localScales,
             ),
      }),
  };
};

let _batchSetPerspectiveCameraProjectionData =
    (
      {perspectiveCameraProjections},
      perspectiveCameraProjectionArr,
      {perspectiveCameraProjectionRecord, viewRecord} as state,
    ) => {
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
           switch (far) {
           | None =>
             perspectiveCameraProjectionRecord
             |> FrustumPerspectiveCameraProjectionService.setFar(
                  cameraProjection,
                  FrustumPerspectiveCameraProjectionService.getInfiniteFar(),
                )
           | Some(far) =>
             perspectiveCameraProjectionRecord
             |> FrustumPerspectiveCameraProjectionService.setFar(
                  cameraProjection,
                  far,
                )
           };
         let perspectiveCameraProjectionRecord =
           perspectiveCameraProjectionRecord
           |> FrustumPerspectiveCameraProjectionService.setFovy(
                cameraProjection,
                fovy,
              );
         let perspectiveCameraProjectionRecord =
           switch (aspect) {
           | None => perspectiveCameraProjectionRecord
           | Some(aspect) =>
             perspectiveCameraProjectionRecord
             |> FrustumPerspectiveCameraProjectionService.setAspect(
                  cameraProjection,
                  aspect,
                )
           };
         perspectiveCameraProjectionRecord;
       },
       perspectiveCameraProjectionRecord,
     );
  {...state, perspectiveCameraProjectionRecord};
};

let _batchSetLightMaterialData =
    ({lightMaterials}, lightMaterialArr, {lightMaterialRecord} as state) =>
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

let _batchSetName = (targets, names, setNameFunc, state) =>
  targets
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. state, target, index) =>
         setNameFunc(. target, Array.unsafe_get(names, index), state),
       state,
     );

let _batchSetNames =
    (
      (
        gameObjectArr,
        (basicSourceTextureArr, arrayBufferViewSourceTextureArr),
      ),
      (
        gameObjects: WDType.gameObjects,
        (
          basicSourceTextures: option(WDType.basicSourceTextures),
          arrayBufferViewSourceTextures,
        ),
      ),
      state,
    ) => {
  let state =
    state
    |> _batchSetName(
         gameObjectArr,
         gameObjects.names,
         NameGameObjectMainService.setName,
       );

  switch (basicSourceTextureArr) {
  | Some(basicSourceTextureArr) =>
    state
    |> _batchSetName(
         basicSourceTextureArr,
         OptionService.unsafeGet(basicSourceTextures).names,
         NameBasicSourceTextureMainService.setName,
       )
  | None =>
    state
    |> _batchSetName(
         arrayBufferViewSourceTextureArr |> OptionService.unsafeGet,
         OptionService.unsafeGet(arrayBufferViewSourceTextures).names,
         NameArrayBufferViewSourceTextureMainService.setName,
       )
  };
};

let batchOperate =
    (
      {
        indices,
        gameObjects,
        basicSourceTextures,
        arrayBufferViewSourceTextures,
      } as wdRecord,
      imageArrTuple,
      bufferArr,
      (
        state,
        gameObjectArr,
        (
          transformArr,
          customGeometryArr,
          basicCameraViewArr,
          perspectiveCameraProjectionArr,
          lightMaterialArr,
          directionLightArr,
          pointLightArr,
        ),
        textureArrTuple,
      ),
    ) => {
  let state =
    state
    |> _batchSetNames(
         (gameObjectArr, textureArrTuple),
         (gameObjects, (basicSourceTextures, arrayBufferViewSourceTextures)),
       );
  let (
    (
      parentTransforms,
      childrenTransforms,
      transformGameObjects,
      gameObjectTransforms,
      customGeometryGameObjects,
      gameObjectCustomGeometrys,
      basicCameraViewGameObjects,
      gameObjectBasicCameraViews,
      perspectiveCameraProjectionGameObjects,
      gameObjectPerspectiveCameraProjection,
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
        customGeometryArr,
        basicCameraViewArr,
        perspectiveCameraProjectionArr,
        lightMaterialArr,
        directionLightArr,
        pointLightArr,
      ),
      indices,
      wdRecord,
      state,
    );
  let (basicSourceTextureData, arrayBufferSourceTextureData) =
    _getBatchAllTypeTextureData(
      lightMaterialArr,
      textureArrTuple,
      imageArrTuple,
      wdRecord,
    );

  (
    state
    |> _batchSetTransformData(wdRecord, gameObjectTransforms)
    |> _batchSetTransformParent(parentTransforms, childrenTransforms)
    |> _batchSetCustomGeometryData(wdRecord, customGeometryArr, bufferArr)
    |> _batchSetPerspectiveCameraProjectionData(
         wdRecord,
         perspectiveCameraProjectionArr,
       )
    |> _batchSetLightMaterialData(wdRecord, lightMaterialArr)
    |> BatchOperateLightSystem.batchSetDirectionLightData(
         wdRecord,
         directionLightArr,
       )
    |> BatchOperateLightSystem.batchSetPointLightData(
         wdRecord,
         pointLightArr,
       )
    |> BatchOperateLightSystem.setAmbientLightData(wdRecord)
    |> BatchAddGameObjectComponentMainService.batchAddTransformComponentForCreate(
         transformGameObjects,
         gameObjectTransforms,
       )
    |> BatchAddGameObjectComponentMainService.batchAddCustomGeometryComponentForCreate(
         customGeometryGameObjects,
         gameObjectCustomGeometrys,
       )
    |> BatchAddGameObjectComponentMainService.batchAddBasicCameraViewComponentForCreate(
         basicCameraViewGameObjects,
         gameObjectBasicCameraViews,
       )
    |> BatchAddGameObjectComponentMainService.batchAddPerspectiveCameraProjectionComponentForCreate(
         perspectiveCameraProjectionGameObjects,
         gameObjectPerspectiveCameraProjection,
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
    |> BatchSetTextureAllDataSystem.batchSet(
         basicSourceTextureData,
         arrayBufferSourceTextureData,
       ),
    gameObjectArr,
  );
};