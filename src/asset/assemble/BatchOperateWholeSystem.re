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
             let {position, normal, texCoord, index}: WDType.geometry =
               geometryData |> OptionService.unsafeGetJsonSerializedValue;

             let geometry = Array.unsafe_get(geometryArr, geometryIndex);

             let state =
               VerticesGeometryMainService.setVerticesByTypeArray(
                 geometry,
                 BatchOperateWholeGeometrySystem.getBufferAttributeData(
                   position,
                   dataViewArr,
                   wd,
                 ),
                 state,
               );
             let state =
               normal |> OptionService.isJsonSerializedValueNone ?
                 state :
                 NormalsGeometryMainService.setNormalsByTypeArray(
                   geometry,
                   BatchOperateWholeGeometrySystem.getBufferAttributeData(
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
                   BatchOperateWholeGeometrySystem.getBufferAttributeData(
                     texCoord |> OptionService.unsafeGetJsonSerializedValue,
                     dataViewArr,
                     wd,
                   ),
                   state,
                 );

             let componentType =
               BatchOperateWholeGeometrySystem.getAccessorComponentType(
                 wd,
                 index,
               );
             let state =
               switch (
                 BatchOperateWholeGeometrySystem.getBufferIndex16Data(
                   componentType,
                   index,
                   dataViewArr,
                   wd,
                 )
               ) {
               | Some(data) =>
                 IndicesGeometryMainService.setIndicesByUint16Array(
                   geometry,
                   data,
                   state,
                 )
               | None =>
                 switch (
                   BatchOperateWholeGeometrySystem.getBufferIndex32Data(
                     componentType,
                     index,
                     dataViewArr,
                     wd,
                   )
                 ) {
                 | Some(data) =>
                   IndicesGeometryMainService.setIndicesByUint32Array(
                     geometry,
                     data,
                     state,
                   )
                 | None =>
                   WonderLog.Log.fatal(
                     WonderLog.Log.buildFatalMessage(
                       ~title="_batchSetGeometryData",
                       ~description=
                         {j|unknown componentType: $componentType|j},
                       ~reason="",
                       ~solution={j||j},
                       ~params={j||j},
                     ),
                   )
                 }
               };

             state;
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

let _getBatchAllTypeTextureData =
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
    state
    |> BatchOperateSystem.batchSetNames(
         (gameObjectArr, basicSourceTextureArr),
         (gameObjects, basicSourceTextures),
         (geometrys, geometryArr),
       )
    |> BatchOperateSystem.batchSetIsActive(gameObjectArr, gameObjects)
    |> BatchOperateSystem.batchSetIsRoot(gameObjectArr, gameObjects);

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

  let imageUint8ArrayDataMap =
    BatchSetWholeTextureAllDataSystem.convertKeyFromImageIndexToBasicSourceTexture(
      indices.imageTextureIndices,
      basicSourceTextureArr,
      imageUint8ArrayDataMap,
    );

  (
    state
    |> BatchOperateSystem.batchSetTransformData(wd, gameObjectTransforms)
    |> BatchOperateSystem.batchSetTransformParent(
         parentTransforms,
         childrenTransforms,
       )
    |> _batchSetGeometryData(wd, geometryArr, bufferArr)
    |> BatchOperateSystem.batchSetBasicCameraViewData(
         wd,
         basicCameraViewArr,
         isActiveCamera,
       )
    |> BatchOperateSystem.batchSetPerspectiveCameraProjectionData(
         wd,
         perspectiveCameraProjectionArr,
       )
    |> BatchOperateSystem.batchSetArcballCameraControllerData(
         wd,
         arcballCameraControllerArr,
         isBindEvent,
       )
    |> BatchOperateSystem.batchSetMeshRendererData(wd, meshRendererArr)
    |> BatchOperateSystem.batchSetBasicMaterialData(wd, basicMaterialArr)
    |> BatchOperateSystem.batchSetLightMaterialData(wd, lightMaterialArr)
    |> BatchOperateSystem.batchSetScriptData(wd, scriptArr)
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
    |> BatchAddGameObjectComponentMainService.batchAddScriptComponentForCreate(
         scriptGameObjects,
         gameObjectScripts,
       )
    |> BatchSetWholeTextureAllDataSystem.batchSet(basicSourceTextureData),
    imageUint8ArrayDataMap,
    gameObjectArr,
  );
};