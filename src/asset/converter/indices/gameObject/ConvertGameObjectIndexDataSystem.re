let convertToGameObjectIndexData =
    ({scenes, nodes, meshes, cameras, materials, extensions}: GLTFType.gltf)
    : WDType.gameObjectIndices => {
  let transformGameObjectIndexData =
    ConvertComponentIndexDataSystem.convertToTransformGameObjectIndexData(
      nodes,
    );
  {
    transformGameObjectIndexData,
    childrenTransformIndexData:
      ConvertChildrenDataSystem.convertToChildrenTransformIndexData(
        transformGameObjectIndexData,
        nodes,
      ),
    basicCameraViewGameObjectIndexData:
      ConvertComponentIndexDataSystem.convertToBasicCameraViewGameObjectIndexData(
        nodes,
        cameras,
      ),
    perspectiveCameraProjectionGameObjectIndexData:
      ConvertComponentIndexDataSystem.convertToPerspectiveCameraProjectionGameObjectIndexData(
        nodes,
        cameras,
      ),
    lightMaterialGameObjectIndexData:
      ConvertComponentIndexDataSystem.convertToLightMaterialGameObjectIndexData(
        nodes,
        meshes,
        materials,
      ),
    customGeometryGameObjectIndexData:
      ConvertComponentIndexDataSystem.convertToGeometryGameObjectIndexData(
        nodes,
      ),
    directionLightGameObjectIndexData:
      ConvertComponentIndexDataSystem.convertToLightGameObjectIndexData(
        "directional",
        nodes,
        extensions,
      ),
    pointLightGameObjectIndexData:
      ConvertComponentIndexDataSystem.convertToLightGameObjectIndexData(
        "point",
        nodes,
        extensions,
      ),
  };
};