open Js.Typed_array

open WonderCommonlib.TypeArrayUtils

let getInfo = (infoIndex, isDebug, infos) =>
  (
    getUint32_1(infoIndex, infos),
    getUint32_1(infoIndex + 1, infos),
  )->WonderCommonlib.Contract.ensureCheck(((startIndex, endIndex)) => {
    open WonderCommonlib.Contract
    open Operators

    test(WonderCommonlib.Log.buildAssertMessage(~expect=j`has info data`, ~actual=j`not`), () =>
      list{startIndex, endIndex}->assertNullableListExist
    )
    test(
      WonderCommonlib.Log.buildAssertMessage(
        ~expect=j`endIndex >= startIndex`,
        ~actual=j`is $endIndex`,
      ),
      () => endIndex >= startIndex,
    )
  }, isDebug)

let getFloat32PointData = (infoIndex, points: Float32Array.t, isDebug, infos) => {
  let (startIndex, endIndex) = getInfo(infoIndex, isDebug, infos)

  getFloat32Array(points, startIndex, endIndex)
}
let getUint32PointData = (infoIndex: int, points: Uint32Array.t, isDebug, infos) => {
  let (startIndex, endIndex) = getInfo(infoIndex, isDebug, infos)

  getUint32Array(points, startIndex, endIndex)
}
