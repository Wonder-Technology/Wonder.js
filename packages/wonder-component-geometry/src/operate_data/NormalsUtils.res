open StateType

open Js.Typed_array

open ReallocatedPointsGeometryUtils

open WonderCommonlib.TypeArrayUtils

let setNormals = (state, geometry, data) => {
  let {normals, normalsInfos, normalsOffset} = state

  state.normalsOffset = setFloat32PointData(
    (
      WonderComponentWorkerUtils.BufferGeometryUtils.getInfoIndex(geometry),
      normalsInfos,
      normalsOffset,
      Float32Array.length(data),
    ),
    ConfigUtils.getIsDebug(state),
    fillFloat32ArrayWithOffset(normals, data),
  )

  state
}
