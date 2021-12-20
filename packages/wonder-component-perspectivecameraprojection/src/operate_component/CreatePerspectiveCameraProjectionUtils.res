let create = (state: StateType.state): (StateType.state, StateType.perspectiveCameraProjection) => {
  let index = state.maxIndex
  let newIndex = index->WonderCommonlib.IndexComponentUtils.generateIndex

  let state =
    DirtyPerspectiveCameraProjectionUtils.mark(
      state,
      index,
      true
    )->OperatePerspectiveCameraProjectionUtils.setPMatrix(
      index,
      WonderCommonlib.Matrix4.createIdentityMatrix4(),
    )

  (
    {
      ...state,
      maxIndex: newIndex,
    },
    index,
  )
}
