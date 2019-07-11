open StateDataMainType;

open WDType;

open Js.Typed_array;

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
             let ({position, normal, texCoord, index}: WDType.geometry) as geometryData =
               geometryData |> OptionService.unsafeGetJsonSerializedValue;

             let geometry = Array.unsafe_get(geometryArr, geometryIndex);

             BatchOperateWholeGeometrySystem.setGeometryData(
               geometry,
               wd,
               dataViewArr,
               geometryData,
               state,
             );
           },
       state,
     );
};

let getBatchAllTypeBasicSourceTextureData =
    (lightMaterialArr, textureArr, imageArr, {indices, samplers}) => (
  (
    indices.materialIndices.diffuseMapMaterialIndices.materialIndices
    |> BatchOperateSystem.getBatchArrByIndices(lightMaterialArr),
    indices.materialIndices.diffuseMapMaterialIndices.mapIndices
    |> BatchOperateSystem.getBatchArrByIndices(textureArr),
  ),
  (
    indices.samplerTextureIndices.textureIndices
    |> BatchOperateSystem.getBatchArrByIndices(textureArr),
    indices.samplerTextureIndices.samplerIndices
    |> BatchOperateSystem.getBatchArrByIndices(samplers),
  ),
  (
    indices.imageBasicSourceTextureIndices.textureIndices
    |> BatchOperateSystem.getBatchArrByIndices(textureArr),
    indices.imageBasicSourceTextureIndices.imageIndices
    |> BatchOperateSystem.getBatchArrByIndices(imageArr),
  ),
);

let getBatchAllTypeCubemapTextureData =
    (textureArr, imageArr, {indices, samplers}) => (
  (
    indices.samplerCubemapTextureIndices.cubemapTextureIndices
    |> BatchOperateSystem.getBatchArrByIndices(textureArr),
    indices.samplerCubemapTextureIndices.samplerIndices
    |> BatchOperateSystem.getBatchArrByIndices(samplers),
  ),
  (
    indices.imageCubemapTextureIndices.cubemapTextureIndices
    |> BatchOperateSystem.getBatchArrByIndices(textureArr),
    indices.imageCubemapTextureIndices.pxImageIndices
    |> BatchOperateSystem.getBatchArrByIndices(imageArr),
    indices.imageCubemapTextureIndices.nxImageIndices
    |> BatchOperateSystem.getBatchArrByIndices(imageArr),
    indices.imageCubemapTextureIndices.pyImageIndices
    |> BatchOperateSystem.getBatchArrByIndices(imageArr),
    indices.imageCubemapTextureIndices.nyImageIndices
    |> BatchOperateSystem.getBatchArrByIndices(imageArr),
    indices.imageCubemapTextureIndices.pzImageIndices
    |> BatchOperateSystem.getBatchArrByIndices(imageArr),
    indices.imageCubemapTextureIndices.nzImageIndices
    |> BatchOperateSystem.getBatchArrByIndices(imageArr),
  ),
);

let batchOperate =
    (
      {geometrys, indices, gameObjects, basicSourceTextures, cubemapTextures} as wd,
      (blobObjectUrlImageArr, imageUint8ArrayDataMap),
      bufferArr,
      (isBindEvent, isActiveCamera),
      (
        state,
        gameObjectArr,
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
        (basicSourceTextureArr, cubemapTextureArr),
      ),
    ) => {
  let state =
    BatchOperateSystem.batchSetNamesAndGameObjectIsActiveAndIsRoot(
      wd,
      (
        state,
        gameObjectArr,
        (transformArr, geometryArr),
        (basicSourceTextureArr, cubemapTextureArr),
      ),
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
  ) =
    BatchOperateSystem.getBatchComponentGameObjectData(
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
    );

  let state =
    state
    |> BatchSetBasicSourceTextureAllDataSystem.batchSetFormatAndTypeAndFlipY(
         basicSourceTextureArr,
         basicSourceTextures,
       )
    |> BatchSetCubemapTextureAllDataSystem.batchSetFormatAndTypeAndFlipY(
         cubemapTextureArr,
         cubemapTextures,
       );

  let basicSourceTextureData =
    getBatchAllTypeBasicSourceTextureData(
      lightMaterialArr,
      basicSourceTextureArr,
      blobObjectUrlImageArr,
      wd,
    );

  let cubemapTextureData =
    getBatchAllTypeCubemapTextureData(
      cubemapTextureArr,
      blobObjectUrlImageArr,
      wd,
    );

  let basicSourceTextureImageUint8ArrayDataMap =
    imageUint8ArrayDataMap
    |> WonderCommonlib.MutableSparseMapService.copy
    |> BatchSetWholeBasicSourceTextureAllDataSystem.convertKeyFromImageIndexToBasicSourceTexture(
         indices.imageBasicSourceTextureIndices,
         basicSourceTextureArr,
       );

  let cubemapTextureImageUint8ArrayDataMap =
    imageUint8ArrayDataMap
    |> WonderCommonlib.MutableSparseMapService.copy
    |> BatchSetWholeCubemapTextureAllDataSystem.convertKeyFromImageIndexToCubemapTexture(
         indices.imageCubemapTextureIndices,
         cubemapTextureArr,
       );

  (
    state
    |> BatchOperateSystem.batchSetComponentData(
         wd,
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
         (parentTransforms, childrenTransforms, gameObjectTransforms),
       )
    |> _batchSetGeometryData(wd, geometryArr, bufferArr)
    |> BatchOperateSystem.batchAddComponent(
         wd,
         (
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
       )
    |> BatchAddGameObjectComponentMainService.batchAddGeometryComponentForCreate(
         geometryGameObjects,
         gameObjectGeometrys,
       )
    |> BatchSetWholeBasicSourceTextureAllDataSystem.batchSet(
         basicSourceTextureData,
       )
    |> BatchSetWholeCubemapTextureAllDataSystem.batchSet(cubemapTextureData),
    (
      basicSourceTextureImageUint8ArrayDataMap,
      cubemapTextureImageUint8ArrayDataMap,
    ),
    gameObjectArr,
    cubemapTextureArr,
  );
};