open MiddlewareManagerType

let register = (state, name: middlewareName, middlewareData: middlewareData) => {
  {
    ...state,
    middlewareDataMap: state.middlewareDataMap->WonderCommonlib.ImmutableHashMap.set(
      name,
      middlewareData,
    ),
  }
}

let unsafeGetData = (state, name: middlewareName) => {
  state.middlewareDataMap->WonderCommonlib.ImmutableHashMap.unsafeGet(name)
}

let setState = (state, name: middlewareName, middlewareState: middlewareState) => {
  {
    ...state,
    middlewareStateMap: state.middlewareStateMap->WonderCommonlib.ImmutableHashMap.set(
      name,
      middlewareState,
    ),
  }
}

let unsafeGetState = (state, name: middlewareName) => {
  state.middlewareStateMap->WonderCommonlib.ImmutableHashMap.unsafeGet(name)
}

let init = () => {
  {
    middlewareDataMap: WonderCommonlib.ImmutableHashMap.createEmpty(),
    middlewareStateMap: WonderCommonlib.ImmutableHashMap.createEmpty(),
  }
}

let buildAPI = (): Type.middlewareManagerAPI => {
  unsafeGetData: unsafeGetData->Obj.magic,
  unsafeGetState: unsafeGetState->Obj.magic,
  setState: setState->Obj.magic,
}
