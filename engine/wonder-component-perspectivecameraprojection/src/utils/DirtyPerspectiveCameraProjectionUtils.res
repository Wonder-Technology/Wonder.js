open StateType

let mark = (state, cameraProjection, isDirty) => {
  {
    ...state,
    dirtyMap: state.dirtyMap->WonderCommonlib.ImmutableSparseMap.set(cameraProjection, isDirty),
  }
}

let isDirty = (state, cameraProjection) => {
  let {dirtyMap} = state

  dirtyMap->WonderCommonlib.MutableSparseMap.unsafeGet(cameraProjection) ===
    true->WonderCommonlib.Contract.ensureCheck(isDirty => {
      open WonderCommonlib.Contract
      open Operators

      test(
        WonderCommonlib.Log.buildAssertMessage(~expect=j`return bool`, ~actual=j`not`),
        () => {
          isDirty->assertIsBool
        },
      )
    }, ConfigUtils.getIsDebug(state))
}
