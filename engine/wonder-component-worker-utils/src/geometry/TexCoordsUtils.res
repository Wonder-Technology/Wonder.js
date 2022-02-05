open ReallocatedPointsGeometryUtils

let getTexCoords = (texCoords, texCoordsInfos, isDebug, geometry) => {
  getFloat32PointData(
    BufferGeometryUtils.getInfoIndex(geometry),
    texCoords,
    isDebug,
    texCoordsInfos,
  )
}
