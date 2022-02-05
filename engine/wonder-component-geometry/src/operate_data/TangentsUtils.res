open StateType

open Js.Typed_array

open ReallocatedPointsGeometryUtils

open WonderCommonlib.TypeArrayUtils

let setTangents = (state, geometry, data) => {
  let {tangents, tangentsInfos, tangentsOffset} = state

  state.tangentsOffset = setFloat32PointData(
    (
      WonderComponentWorkerUtils.BufferGeometryUtils.getInfoIndex(geometry),
      tangentsInfos,
      tangentsOffset,
      Float32Array.length(data),
    ),
    ConfigUtils.getIsDebug(state),
    fillFloat32ArrayWithOffset(tangents, data),
  )

  state
}
