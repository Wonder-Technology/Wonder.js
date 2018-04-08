open StateDataMainType;

let execJob = (_, state) => {
  InitBoxGeometryInitBoxGeometryService.init(
    CreateInitBoxGeometryStateMainService.createInitBoxGeometryState(state)
  )
  |> ignore;
  state
};