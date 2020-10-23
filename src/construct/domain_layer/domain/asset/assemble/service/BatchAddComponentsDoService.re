open WDDType;

let _batchAddComponents = (addComponentFunc, gameObjects, components) => {
  ListSt.zipBy(gameObjects, components, (gameObject, component) => {
    addComponentFunc(gameObject, component)
  })
  ->ListSt.sequenceResultM;
};

let batchAddComponents =
    (
      wdd,
      (
        transformGameObjects,
        gameObjectTransforms,
        geometryGameObjects,
        gameObjectGeometries,
        basicCameraViewGameObjects,
        gameObjectBasicCameraViews,
        perspectiveCameraProjectionGameObjects,
        gameObjectPerspectiveCameraProjection,
        bsdfMaterialGameObjects,
        gameObjectBSDFMaterials,
        directionLightGameObjects,
        gameObjectDirectionLights,
      ),
    ) => {
  ListResult.mergeResults([
    _batchAddComponents(
      AddComponentGameObjectDoService.addTransform,
      transformGameObjects,
      gameObjectTransforms,
    ),
    _batchAddComponents(
      AddComponentGameObjectDoService.addGeometry,
      geometryGameObjects,
      gameObjectGeometries,
    ),
    _batchAddComponents(
      AddComponentGameObjectDoService.addBasicCameraView,
      basicCameraViewGameObjects,
      gameObjectBasicCameraViews,
    ),
    _batchAddComponents(
      AddComponentGameObjectDoService.addPerspectiveCameraProjection,
      perspectiveCameraProjectionGameObjects,
      gameObjectPerspectiveCameraProjection,
    ),
    _batchAddComponents(
      AddComponentGameObjectDoService.addBSDFMaterial,
      bsdfMaterialGameObjects,
      gameObjectBSDFMaterials,
    ),
    _batchAddComponents(
      AddComponentGameObjectDoService.addDirectionLight,
      directionLightGameObjects,
      gameObjectDirectionLights,
    ),
  ]);
};
