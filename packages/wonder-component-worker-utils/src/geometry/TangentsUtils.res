open ReallocatedPointsGeometryUtils

let getTangents = (tangents, tangentsInfos, isDebug, geometry) => {
  getFloat32PointData(BufferGeometryUtils.getInfoIndex(geometry), tangents, isDebug, tangentsInfos)
}
