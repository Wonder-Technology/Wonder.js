open StateType

open Js.Typed_array

open ReallocatedPointsGeometryUtils

open WonderCommonlib.TypeArrayUtils

let setVertices = (state, geometry, data) => {
  let {vertices, verticesInfos, verticesOffset} = state

  state.verticesOffset = setFloat32PointData(
    (
      WonderComponentWorkerUtils.BufferGeometryUtils.getInfoIndex(geometry),
      verticesInfos,
      verticesOffset,
      Float32Array.length(data),
    ),
    ConfigUtils.getIsDebug(state),
    fillFloat32ArrayWithOffset(vertices, data),
  )

  state
}
