open StateType

let mark = (state, transform, isDirty) => {
  state.dirtyMap->WonderCommonlib.MutableSparseMap.set(transform, isDirty)->ignore

  state
}

let isDirty = (state, transform) => {
  let {dirtyMap} = state

  dirtyMap->WonderCommonlib.MutableSparseMap.unsafeGet(transform) ===
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
