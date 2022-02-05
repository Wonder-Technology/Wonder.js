open StateType

open Js.Typed_array

open ReallocatedPointsGeometryUtils

open WonderCommonlib.TypeArrayUtils

let setTexCoords = (state, geometry, data) => {
  WonderCommonlib.Contract.requireCheck(() => {
    open WonderCommonlib.Contract
    open Operators

    test(
      WonderCommonlib.Log.buildAssertMessage(
        ~expect=j`texCoords in [0.0, 1.0]`,
        ~actual=j`not`,
      ),
      () =>
        data->WonderCommonlib.TypeArrayUtils.reduceFloat32Array(true, (. result, value) =>
          result && (\">=."(value, 0.0) && \"<=."(value, 1.0))
        ),
    )
  }, ConfigUtils.getIsDebug(state))

  let {texCoords, texCoordsInfos, texCoordsOffset} = state

  state.texCoordsOffset = setFloat32PointData(
    (
      WonderComponentWorkerUtils.BufferGeometryUtils.getInfoIndex(geometry),
      texCoordsInfos,
      texCoordsOffset,
      Float32Array.length(data),
    ),
    ConfigUtils.getIsDebug(state),
    fillFloat32ArrayWithOffset(texCoords, data),
  )

  state
}
