open StateType

open Js.Typed_array

open ReallocatedPointsGeometryUtils

open WonderCommonlib.TypeArrayUtils

let setIndices = (state, geometry, data) => {
  let {indices, indicesInfos, indicesOffset} = state

  state.indicesOffset = setUint32PointData(
    (
      WonderComponentWorkerUtils.BufferGeometryUtils.getInfoIndex(geometry),
      indicesInfos,
      indicesOffset,
      Uint32Array.length(data),
    ),
    ConfigUtils.getIsDebug(state),
    fillUint32ArrayWithOffset(indices, data),
  )

  state
}
