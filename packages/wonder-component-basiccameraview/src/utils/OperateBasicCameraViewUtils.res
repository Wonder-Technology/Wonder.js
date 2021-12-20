open StateType

let _setAllNotActive = state => {
  let {isActiveMap} = state

  {
    ...state,
    isActiveMap: isActiveMap->WonderCommonlib.ImmutableSparseMap.map((. value) => false),
  }
}

let getIsActive = (state, cameraView) =>
  state.isActiveMap
  ->WonderCommonlib.ImmutableSparseMap.get(cameraView)
  ->WonderCommonlib.OptionSt.getWithDefault(false)

let setIsActive = (state, cameraView, isActive) => {
  let state =
    isActive == true
      ? {
          state->_setAllNotActive
        }
      : state

  let {isActiveMap} = state

  {
    ...state,
    isActiveMap: isActiveMap->WonderCommonlib.ImmutableSparseMap.set(cameraView, isActive),
  }
}
