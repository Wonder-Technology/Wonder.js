let hasSource = (texture, sourceMap) => sourceMap |> WonderCommonlib.SparseMapService.has(texture);

let getSource = (texture, sourceMap) => sourceMap |> WonderCommonlib.SparseMapService.get(texture);

let unsafeGetSource = (texture, sourceMap) =>
  sourceMap |> WonderCommonlib.SparseMapService.unsafeGet(texture);

let setSource = (texture, source, sourceMap) =>
  sourceMap |> WonderCommonlib.SparseMapService.set(texture, source);

let addSource = (texture, source, sourceMap) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|sourceMap in texture:$texture should exist source before|j},
                ~actual={j|exist|j}
              ),
              () => hasSource(texture, sourceMap) |> assertFalse
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  sourceMap |> WonderCommonlib.SparseMapService.set(texture, source)
};