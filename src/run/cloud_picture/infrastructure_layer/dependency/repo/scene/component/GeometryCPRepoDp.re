open GeometryCPPOType;

open ReallocatedPointsGeometryCPRepoUtils;

open Js.Typed_array;

open TypeArrayCPRepoUtils;

let getMaxIndex = () => {
  CPRepo.getExnGeometry().maxIndex;
};

let setMaxIndex = maxIndex => {
  CPRepo.setGeometry({...CPRepo.getExnGeometry(), maxIndex});
};

let getGameObjects = geometry => {
  CPRepo.getExnGeometry().gameObjectsMap
  ->ImmutableSparseMap.get(geometry);
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
  let {vertices, verticesInfos} = CPRepo.getExnGeometry();

  getFloat32PointData(
    BufferGeometryCPRepoUtils.getInfoIndex(geometry),
    vertices,
    verticesInfos,
  );
};

let setVertices = (geometry, data) => {
  let {verticesInfos, vertices, verticesOffset} as geometryPO =
    CPRepo.getExnGeometry();

  setFloat32PointData(
    (
      BufferGeometryCPRepoUtils.getInfoIndex(geometry),
      verticesInfos,
      verticesOffset,
      Float32Array.length(data),
    ),
    fillFloat32ArrayWithOffset(vertices, data),
  )
  ->Result.mapSuccess(verticesOffset => {
      CPRepo.setGeometry({...geometryPO, verticesOffset})
    });
};

let getNormals = geometry => {
  let {normals, normalsInfos} = CPRepo.getExnGeometry();

  getFloat32PointData(
    BufferGeometryCPRepoUtils.getInfoIndex(geometry),
    normals,
    normalsInfos,
  );
};

let setNormals = (geometry, data) => {
  let {normalsInfos, normals, normalsOffset} as geometryPO =
    CPRepo.getExnGeometry();

  setFloat32PointData(
    (
      BufferGeometryCPRepoUtils.getInfoIndex(geometry),
      normalsInfos,
      normalsOffset,
      Float32Array.length(data),
    ),
    fillFloat32ArrayWithOffset(normals, data),
  )
  ->Result.mapSuccess(normalsOffset => {
      CPRepo.setGeometry({...geometryPO, normalsOffset})
    });
};

let getTexCoords = geometry => {
  let {texCoords, texCoordsInfos} = CPRepo.getExnGeometry();

  getFloat32PointData(
    BufferGeometryCPRepoUtils.getInfoIndex(geometry),
    texCoords,
    texCoordsInfos,
  );
};

let setTexCoords = (geometry, data) => {
  let {texCoordsInfos, texCoords, texCoordsOffset} as geometryPO =
    CPRepo.getExnGeometry();

  setFloat32PointData(
    (
      BufferGeometryCPRepoUtils.getInfoIndex(geometry),
      texCoordsInfos,
      texCoordsOffset,
      Float32Array.length(data),
    ),
    fillFloat32ArrayWithOffset(texCoords, data),
  )
  ->Result.mapSuccess(texCoordsOffset => {
      CPRepo.setGeometry({...geometryPO, texCoordsOffset})
    });
};

let getIndices = geometry => {
  let {indices, indicesInfos} = CPRepo.getExnGeometry();

  getUint32PointData(
    BufferGeometryCPRepoUtils.getInfoIndex(geometry),
    indices,
    indicesInfos,
  );
};

let setIndices = (geometry, data) => {
  let {indicesInfos, indices, indicesOffset} as geometryPO =
    CPRepo.getExnGeometry();

  setUint32PointData(
    (
      BufferGeometryCPRepoUtils.getInfoIndex(geometry),
      indicesInfos,
      indicesOffset,
      Uint32Array.length(data),
    ),
    fillUint32ArrayWithOffset(indices, data),
  )
  ->Result.mapSuccess(indicesOffset => {
      CPRepo.setGeometry({...geometryPO, indicesOffset})
    });
};

let hasVertices = geometry => {
  let {verticesInfos} = CPRepo.getExnGeometry();

  hasPointData(
    BufferGeometryCPRepoUtils.getInfoIndex(geometry),
    verticesInfos,
  );
};

let hasNormals = geometry => {
  let {normalsInfos} = CPRepo.getExnGeometry();

  hasPointData(
    BufferGeometryCPRepoUtils.getInfoIndex(geometry),
    normalsInfos,
  );
};

let hasTexCoords = geometry => {
  let {texCoordsInfos} = CPRepo.getExnGeometry();

  hasPointData(
    BufferGeometryCPRepoUtils.getInfoIndex(geometry),
    texCoordsInfos,
  );
};

let hasIndices = geometry => {
  ReallocatedPointsGeometryCPRepoUtils.hasPointData(
    BufferGeometryCPRepoUtils.getInfoIndex(geometry),
    CPRepo.getExnGeometry().indicesInfos,
  );
};

let getIndicesCount = geometry => {
  let {indicesInfos} = CPRepo.getExnGeometry();

  ReallocatedPointsGeometryCPRepoUtils.getInfo(
    BufferGeometryCPRepoUtils.getInfoIndex(geometry),
    indicesInfos,
  )
  ->Result.mapSuccess(((startIndex, endIndex)) => {endIndex - startIndex});
};
