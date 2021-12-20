let create = (state: StateType.state): (StateType.state, StateType.basicCameraView) => {
  let index = state.maxIndex
  let newIndex = index->WonderCommonlib.IndexComponentUtils.generateIndex

  (
    {
      ...state,
      maxIndex: newIndex,
    },
    index,
  )
}
