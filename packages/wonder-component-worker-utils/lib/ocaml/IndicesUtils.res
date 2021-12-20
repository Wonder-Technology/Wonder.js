open ReallocatedPointsGeometryUtils

let getIndices = (indices, indicesInfos, isDebug, geometry) => {
  getUint32PointData(BufferGeometryUtils.getInfoIndex(geometry), indices, isDebug, indicesInfos)
}

let getIndicesCount = (indicesInfos, isDebug, geometry) => {
  let (startIndex, endIndex) = getInfo(
    BufferGeometryUtils.getInfoIndex(geometry),
    isDebug,
    indicesInfos,
  )

  endIndex - startIndex
}
