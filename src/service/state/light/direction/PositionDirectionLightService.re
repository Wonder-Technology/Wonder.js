open StateDataType;

let getPosition = (index, state) =>
  state
  |> PositionLightService.getPosition(
       GameObjectDirectionLightService.unsafeGetGameObject(index, state.directionLightRecord)
     );