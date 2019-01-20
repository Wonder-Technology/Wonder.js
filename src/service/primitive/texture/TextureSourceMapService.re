let hasSource = (texture, sourceMap) => sourceMap |> WonderCommonlib.MutableSparseMapService.has(texture);

let getSource = (texture, sourceMap) => sourceMap |> WonderCommonlib.MutableSparseMapService.get(texture);

let unsafeGetSource = (texture, sourceMap) =>
  sourceMap |> WonderCommonlib.MutableSparseMapService.unsafeGet(texture);

let setSource = (texture, source, sourceMap) =>
  sourceMap |> WonderCommonlib.MutableSparseMapService.set(texture, source);

let addSource = (texture, source, sourceMap) => {
  /* WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|source in sourceMap->texture:$texture shouldn't exist before|j},
                ~actual={j|exist|j}
              ),
              () => hasSource(texture, sourceMap) |> assertFalse
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  ); */
  sourceMap |> WonderCommonlib.MutableSparseMapService.set(texture, source)
};