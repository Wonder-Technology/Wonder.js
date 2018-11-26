open StateDataMainType;

let _getFuncTuple = () => (
  (
    VerticesGeometryMainService.getVertices,
    NormalsGeometryMainService.getNormals,
    TexCoordsGeometryMainService.getTexCoords,
    IndicesGeometryMainService.getIndices,
    IndicesGeometryMainService.getIndices32,
  ),
  imageUint8Array => imageUint8Array,
);

let generateGLBData = (rootGameObject, imageUint8ArrayMap, state) =>
  GenerateGLBSystem.generateGLBData(
    rootGameObject,
    imageUint8ArrayMap,
    _getFuncTuple(),
    state,
  );

let generateWDB = (rootGameObject, imageUint8ArrayMap, state) =>
  GenerateWDBSystem.generateWDB(
    rootGameObject,
    imageUint8ArrayMap,
    _getFuncTuple(),
    state,
  );