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

let _getBatchTextureData =
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
    indices.imageTextureIndices.textureIndices
    |> BatchOperateSystem.getBatchArrByIndices(textureArr),
    indices.imageTextureIndices.imageIndices
    |> BatchOperateSystem.getBatchArrByIndices(imageArr),
  ),
);

let getBatchAllTypeTextureData =
    (lightMaterialArr, basicSourceTextureArr, blobObjectUrlImageArr, wd) =>
  _getBatchTextureData(
    lightMaterialArr,
    basicSourceTextureArr,
    blobObjectUrlImageArr,
    wd,
  );

let batchOperate =
    (
      {geometrys, indices, gameObjects, basicSourceTextures} as wd,
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
        basicSourceTextureArr,
      ),
    ) => {
  let state =
    BatchOperateSystem.batchSetNamesAndGameObjectIsActiveAndIsRoot(
      wd,
      (
        state,
        gameObjectArr,
        (transformArr, geometryArr),
        basicSourceTextureArr,
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
    BatchSetTextureAllDataSystem.batchSetFormatAndFlipY(
      basicSourceTextureArr,
      basicSourceTextures,
      state,
    );

  let basicSourceTextureData =
    getBatchAllTypeTextureData(
      lightMaterialArr,
      basicSourceTextureArr,
      blobObjectUrlImageArr,
      wd,
    );

  let imageUint8ArrayDataMap =
    BatchSetWholeTextureAllDataSystem.convertKeyFromImageIndexToBasicSourceTexture(
      indices.imageTextureIndices,
      basicSourceTextureArr,
      imageUint8ArrayDataMap,
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
    |> BatchSetWholeTextureAllDataSystem.batchSet(basicSourceTextureData),
    imageUint8ArrayDataMap,
    gameObjectArr,
  );
};