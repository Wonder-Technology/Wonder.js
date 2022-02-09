type middlewareData

type middlewareState

type middlewareName = string

type state = {
  middlewareDataMap: WonderCommonlib.ImmutableHashMap.t<middlewareName, middlewareData>,
  middlewareStateMap: WonderCommonlib.ImmutableHashMap.t<middlewareName, middlewareState>,
}
