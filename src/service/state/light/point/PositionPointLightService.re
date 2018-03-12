open StateDataType;

let getPosition = (index, state) =>
  state
  |> PositionLightService.getPosition(
       GameObjectPointLightService.unsafeGetGameObject(index, state.pointLightRecord)
     );