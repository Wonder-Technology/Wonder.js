let create = (state: StateType.state): (StateType.state, StateType.geometry) => {
  let index = state.maxIndex
  let newIndex = index->WonderCommonlib.IndexComponentUtils.generateIndex

  state.maxIndex = newIndex

  (
    state,
    index->WonderCommonlib.BufferComponentUtils.checkNotExceedMaxCountByIndex(
      ConfigUtils.getIsDebug(state),
      _,
      ConfigUtils.getGeometryCount(state),
    ),
  )
}
