let getPosition = (gameObject, state) =>
  state
  |> TransformSystem.getPositionTuple(
       GameObjectGetComponentCommon.unsafeGetTransformComponent(gameObject, state)
     );