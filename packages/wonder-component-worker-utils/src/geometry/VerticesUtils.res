open ReallocatedPointsGeometryUtils

let getVertices = (vertices, verticesInfos, isDebug, geometry) => {
  getFloat32PointData(BufferGeometryUtils.getInfoIndex(geometry), vertices, isDebug, verticesInfos)
}
