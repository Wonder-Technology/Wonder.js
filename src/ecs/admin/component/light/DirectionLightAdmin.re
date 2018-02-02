let getLightData = DirectionLightSystem.getLightData;

let getColor = (index, state) => DirectionLightSystem.getColor(index, state);

let getIntensity = (index, state) => DirectionLightSystem.getIntensity(index, state);

let getPosition = (index, state) =>
  state
  |> TransformSystem.getPositionTuple(
       GameObjectGetComponentCommon.unsafeGetTransformComponent(
         DirectionLightSystem.unsafeGetGameObject(index, state),
         state
       )
     );

let deepCopyStateForRestore = DirectionLightSystem.deepCopyStateForRestore;

let restore = DirectionLightSystem.restore;