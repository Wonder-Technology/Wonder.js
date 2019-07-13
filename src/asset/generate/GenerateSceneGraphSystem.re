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
    (rootGameObject, imageUint8ArrayMap, isBuildCubemapFromSceneSkybox, state) =>
  GenerateGLBSystem.generateGLBData(
    (rootGameObject, imageUint8ArrayMap),
    isBuildCubemapFromSceneSkybox,
    _getFuncTuple(),
    state,
  );

let generateWDB =
    (rootGameObject, imageUint8ArrayMap, isBuildCubemapFromSceneSkybox, state) =>
  GenerateWDBSystem.generateWDB(
    rootGameObject,
    imageUint8ArrayMap,
    isBuildCubemapFromSceneSkybox,
    _getFuncTuple(),
    state,
  );