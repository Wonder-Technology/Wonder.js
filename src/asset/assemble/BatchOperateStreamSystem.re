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
    _getBatchAllTypeTextureData(
      lightMaterialArr,
      basicSourceTextureArr,
      default11Image,
      wd,
    );

  (
    state
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
    |> BatchSetStreamTextureAllDataSystem.batchSet(basicSourceTextureData),
    gameObjectArr,
    (geometryArr, geometryGameObjects, gameObjectGeometrys),
    (basicSourceTextureArr, indices.imageTextureIndices, images),
  );
};