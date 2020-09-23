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
            texCoords,
            normals,
            indices,
            verticesInfos,
            texCoordsInfos,
            normalsInfos,
            indicesInfos,
          ),
        ),
      ) => {
      (
        {
          maxIndex: 0,
          buffer,
          vertices,
          texCoords,
          normals,
          indices,
          verticesInfos,
          texCoordsInfos,
          normalsInfos,
          indicesInfos,
          verticesOffset: 0,
          texCoordsOffset: 0,
          normalsOffset: 0,
          indicesOffset: 0,
          gameObjectsMap:
            CreateMapComponentCPRepoUtils.createEmptyMap(geometryCount),
        }: GeometryCPPOType.geometry
      )
    });
};
