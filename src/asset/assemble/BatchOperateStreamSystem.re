open StateDataMainType;

open WDType;

open Js.Typed_array;

let _getBatchTextureData =
    (lightMaterialArr, textureArr, default11Image, {indices, samplers}) => (
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
    default11Image,
  ),
);

let _getBatchAllTypeTextureData =
    (lightMaterialArr, basicSourceTextureArr, default11Image, wd) =>
  _getBatchTextureData(
    lightMaterialArr,
    basicSourceTextureArr,
    /* blobObjectUrlImageArr, */
    default11Image,
    wd,
  );

let batchOperate =
    (
      {geometrys, indices, gameObjects, basicSourceTextures, images} as wd,
      default11Image,
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
    |> BatchOperateSystem.batchSetNames(
         (gameObjectArr, basicSourceTextureArr),
         (gameObjects, basicSourceTextures),
         (geometrys, geometryArr),
       )
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
      default11Image,
      wd,
    );

  (
    state
    |> BatchOperateSystem.batchSetTransformData(wd, gameObjectTransforms)
    |> BatchOperateSystem.batchSetTransformParent(
         parentTransforms,
         childrenTransforms,
       )
    |> BatchOperateSystem.batchSetBasicCameraViewData(
         wd,
         basicCameraViewArr,
         true,
       )
    |> BatchOperateSystem.batchSetPerspectiveCameraProjectionData(
         wd,
         perspectiveCameraProjectionArr,
       )
    |> BatchOperateSystem.batchSetArcballCameraControllerData(
         wd,
         arcballCameraControllerArr,
         true,
       )
    |> BatchOperateSystem.batchSetMeshRendererData(wd, meshRendererArr)
    |> BatchOperateSystem.batchSetBasicMaterialData(wd, basicMaterialArr)
    |> BatchOperateSystem.batchSetLightMaterialData(wd, lightMaterialArr)
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
    |> BatchSetStreamTextureAllDataSystem.batchSet(basicSourceTextureData),
    gameObjectArr,
    (geometryArr, geometryGameObjects, gameObjectGeometrys),
    (basicSourceTextureArr, indices.imageTextureIndices, images),
  );
};