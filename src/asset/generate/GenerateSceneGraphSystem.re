open StateDataMainType;

let _getFuncTuple = () => (
  (
    VerticesGeometryMainService.getVertices,
    NormalsGeometryMainService.getNormals,
    TexCoordsGeometryMainService.getTexCoords,
    IndicesGeometryMainService.getIndices16,
    IndicesGeometryMainService.getIndices32,
  ),
  imageUint8Array => imageUint8Array,
);

let generateGLBData =
    (rootGameObject, imageUint8ArrayMap, isBuildCubemapFronSceneSkybox, state) =>
  GenerateGLBSystem.generateGLBData(
    (rootGameObject, imageUint8ArrayMap),
    isBuildCubemapFronSceneSkybox,
    _getFuncTuple(),
    state,
  );

let generateWDB =
    (rootGameObject, imageUint8ArrayMap, isBuildCubemapFronSceneSkybox, state) =>
  GenerateWDBSystem.generateWDB(
    rootGameObject,
    imageUint8ArrayMap,
    isBuildCubemapFronSceneSkybox,
    _getFuncTuple(),
    state,
  );