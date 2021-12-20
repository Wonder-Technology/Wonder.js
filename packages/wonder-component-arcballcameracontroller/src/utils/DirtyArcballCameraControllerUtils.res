open StateType

let mark = (state, cameraController, isDirty) => {
  {
    ...state,
    dirtyMap: state.dirtyMap->WonderCommonlib.ImmutableSparseMap.set(cameraController, isDirty),
  }
}

let isDirty = (state, cameraController) => {
  let {dirtyMap} = state

  dirtyMap->WonderCommonlib.MutableSparseMap.unsafeGet(cameraController) ===
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
