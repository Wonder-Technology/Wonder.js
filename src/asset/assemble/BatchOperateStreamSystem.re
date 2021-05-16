open StateDataMainType;

open WDType;

open Js.Typed_array;

let _getBatchAllTypeBasicSourceTextureData =
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
    indices.imageBasicSourceTextureIndices.textureIndices
    |> BatchOperateSystem.getBatchArrByIndices(textureArr),
    default11Image,
  ),
);

let _getBatchAllTypeCubemapTextureData =
    (textureArr, default11Image, {indices, samplers}) => (
  (
    indices.samplerCubemapTextureIndices.cubemapTextureIndices
    |> BatchOperateSystem.getBatchArrByIndices(textureArr),
    indices.samplerCubemapTextureIndices.samplerIndices
    |> BatchOperateSystem.getBatchArrByIndices(samplers),
  ),
  (
    indices.imageCubemapTextureIndices.cubemapTextureIndices
    |> BatchOperateSystem.getBatchArrByIndices(textureArr),
    default11Image,
  ),
);

let batchOperate =
    (
      {
        geometrys,
        indices,
        gameObjects,
        basicSourceTextures,
        cubemapTextures,
        images,
      } as wd,
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
    _getBatchAllTypeBasicSourceTextureData(
      lightMaterialArr,
      basicSourceTextureArr,
      default11Image,
      wd,
    );

  let cubemapTextureData =
    _getBatchAllTypeCubemapTextureData(cubemapTextureArr, default11Image, wd);

  (
    state
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
    |> BatchOperateSystem.batchSetComponentData(
         wd,
         (true, true),
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
    |> BatchSetStreamBasicSourceTextureAllDataSystem.batchSet(
         basicSourceTextureData,
       )
    |> BatchSetStreamCubemapTextureAllDataSystem.batchSet(cubemapTextureData),
    gameObjectArr,
    (geometryArr, geometryGameObjects, gameObjectGeometrys),
    (
      images,
      (basicSourceTextureArr, indices.imageBasicSourceTextureIndices),
      (cubemapTextureArr, indices.imageCubemapTextureIndices),
    ),
  );
};
