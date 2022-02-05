let createState = (isDebug, geometryPointCount, geometryCount, buffer): StateType.state => {
  let (
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
  ) = WonderComponentWorkerUtils.CreateTypeArrayGeometryUtils.createTypeArrays(
    buffer,
    geometryPointCount,
    geometryCount,
  )

  {
    config: {
      isDebug: isDebug,
    },
    vertices: vertices,
    texCoords: texCoords,
    normals: normals,
    tangents: tangents,
    indices: indices,
    verticesInfos: verticesInfos,
    texCoordsInfos: texCoordsInfos,
    normalsInfos: normalsInfos,
    tangentsInfos: tangentsInfos,
    indicesInfos: indicesInfos,
  }
}
