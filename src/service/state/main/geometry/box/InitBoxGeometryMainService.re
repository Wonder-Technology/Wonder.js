let handleInitComponent = (index: int, state: StateDataMainType.state) => {
  InitBoxGeometryInitBoxGeometryService.initGeometry(
    index,
    CreateInitBoxGeometryStateMainService.createInitBoxGeometryState(state)
  )
  |> ignore;
  state
};