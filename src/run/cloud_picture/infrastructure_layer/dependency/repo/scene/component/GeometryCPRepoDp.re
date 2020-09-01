open GeometryCPPOType;

let getMaxIndex = () => {
  CPRepo.getExnGeometry().maxIndex;
};

let setMaxIndex = maxIndex => {
  CPRepo.setGeometry({...CPRepo.getExnGeometry(), maxIndex});
};

let getGameObjects = geometry => {
  CPRepo.getExnGeometry().gameObjectsMap
  ->ImmutableSparseMap.getNullable(geometry);
};

let addGameObject = (geometry, gameObject) => {
  let {gameObjectsMap} as geometryPO = CPRepo.getExnGeometry();

  CPRepo.setGeometry({
    ...geometryPO,
    gameObjectsMap:
      gameObjectsMap->ListMapRepoUtils.addValue(geometry, gameObject),
  });
};

let getVertices = geometry => {
  VerticesGeometryCPRepo.getVertices(geometry);
};

let setVertices = (geometry, vertices) => {
  VerticesGeometryCPRepo.setVertices(geometry, vertices);
};

let getNormals = geometry => {
  NormalsGeometryCPRepo.getNormals(geometry);
};

let setNormals = (geometry, normals) => {
  NormalsGeometryCPRepo.setNormals(geometry, normals);
};

let getIndices = geometry => {
  IndicesGeometryCPRepo.getIndices(geometry);
};

let setIndices = (geometry, indices) => {
  IndicesGeometryCPRepo.setIndices(geometry, indices);
};

let hasVertices = geometry => {
  VerticesGeometryCPRepo.hasVertices(geometry);
};

let hasNormals = geometry => {
  NormalsGeometryCPRepo.hasNormals(geometry);
};

let hasIndices = geometry => {
  IndicesGeometryCPRepo.hasIndices(geometry);
};

let getIndicesCount = geometry => {
  let {indicesInfos} = CPRepo.getExnGeometry();

  ReallocatedPointsGeometryCPRepoUtils.getInfo(
    BufferGeometryCPRepoUtils.getInfoIndex(geometry),
    indicesInfos,
  )
  ->Result.mapSuccess(((startIndex, endIndex)) => {endIndex - startIndex});
};
