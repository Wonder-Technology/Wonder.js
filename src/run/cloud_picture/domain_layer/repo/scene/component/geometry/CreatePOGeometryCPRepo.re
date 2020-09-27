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
            tangents,
            indices,
            verticesInfos,
            texCoordsInfos,
            normalsInfos,
            tangentsInfos,
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
          tangents,
          indices,
          verticesInfos,
          texCoordsInfos,
          normalsInfos,
          tangentsInfos,
          indicesInfos,
          verticesOffset: 0,
          texCoordsOffset: 0,
          normalsOffset: 0,
          tangentsOffset:0,
          indicesOffset: 0,
          gameObjectsMap:
            CreateMapComponentCPRepoUtils.createEmptyMap(geometryCount),
        }: GeometryCPPOType.geometry
      )
    });
};
