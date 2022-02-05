open Js.Typed_array

open WonderCommonlib.TypeArrayUtils

let setInfo = (infoIndex, startIndex, endIndex, isDebug, infos) => {
  WonderCommonlib.Contract.requireCheck(() => {
    open WonderCommonlib.Contract
    open Operators
    test(
      WonderCommonlib.Log.buildAssertMessage(
        ~expect=j`startIndex >= 0`,
        ~actual=j`is $startIndex`,
      ),
      () => startIndex >= 0,
    )
    test(
      WonderCommonlib.Log.buildAssertMessage(
        ~expect=j`endIndex >= startIndex`,
        ~actual=j`is $endIndex`,
      ),
      () => endIndex >= startIndex,
    )
  }, isDebug)

  setUint32_1(infoIndex, startIndex, infos)
  setUint32_1(infoIndex + 1, endIndex, infos)
}
// ->WonderCommonlib.Result.bind(() =>
//   setUint32_1(infoIndex, startIndex, infos)
// )->WonderCommonlib.Result.bind(() => setUint32_1(infoIndex + 1, endIndex, infos))

let hasPointData = (infoIndex, isDebug, infos) => {
  let (
    startIndex,
    endIndex,
  ) = WonderComponentWorkerUtils.ReallocatedPointsGeometryUtils.getInfo(
    infoIndex,
    isDebug,
    infos,
  )

  endIndex > startIndex
}
// WonderComponentWorkerUtils.ReallocatedPointsGeometryUtils. getInfo(infoIndex, isDebug, infos)->WonderCommonlib.Result.mapSuccess(((startIndex, endIndex)) =>
//   endIndex > startIndex
// )

let _setPointData = ((infoIndex: int, infos, offset: int, count), isDebug, fillTypeArrayFunc) => {
  let startIndex = offset
  let newOffset = offset + count
  setInfo(infoIndex, startIndex, newOffset, isDebug, infos)

  fillTypeArrayFunc(startIndex)

  newOffset
  // ->WonderCommonlib.Result.bind(() => fillTypeArrayFunc(startIndex))
  // ->WonderCommonlib.Result.mapSuccess(() => newOffset)
}

let setFloat32PointData = (dataTuple, isDebug, fillFloat32ArrayFunc) =>
  _setPointData(dataTuple, isDebug, fillFloat32ArrayFunc)

let setUint32PointData = (dataTuple, isDebug, fillUint32ArraryFunc) =>
  _setPointData(dataTuple, isDebug, fillUint32ArraryFunc)
