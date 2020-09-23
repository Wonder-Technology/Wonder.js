let _initBufferData = (geometryPointCount, geometryCount) => {
  BufferGeometryCPRepoUtils.createBuffer(geometryPointCount, geometryCount)
  ->Result.mapSuccess(buffer => {
      (
        buffer,
        CreateTypeArrayGeometryCPRepoUtils.createTypeArrays(
          buffer,
          geometryPointCount,
          geometryCount,
        ),
      )
    });
};

let createPO = () => {
  let geometryPointCount = POConfigCPRepo.getGeometryPointCount();
  let geometryCount = POConfigCPRepo.getGeometryCount();

  _initBufferData(geometryPointCount, geometryCount)
  ->Result.mapSuccess(
      (
        (
          buffer,
          (
            vertices,
            normals,
            texCoords,
            indices,
            verticesInfos,
            normalsInfos,
            texCoordsInfos,
            indicesInfos,
          ),
        ),
      ) => {
      (
        {
          maxIndex: 0,
          buffer,
          vertices,
          normals,
          texCoords,
          indices,
          verticesInfos,
          normalsInfos,
          texCoordsInfos,
          indicesInfos,
          verticesOffset: 0,
          normalsOffset: 0,
          texCoordsOffset: 0,
          indicesOffset: 0,
          gameObjectsMap:
            CreateMapComponentCPRepoUtils.createEmptyMap(geometryCount),
        }: GeometryCPPOType.geometry
      )
    });
};
