let setLocalEulerAngles = (gameObject, localEulerAngles, state) =>
  TransformAPI.setTransformLocalEulerAngles(
    GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject, state),
    localEulerAngles,
    state,
  );

let setLocalScale = (gameObject, localScale, state) =>
  TransformAPI.setTransformLocalScale(
    GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject, state),
    localScale,
    state,
  );

let getLocalEulerAngles = (gameObject, state) =>
  TransformAPI.getTransformLocalEulerAngles(
    GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject, state),
    state,
  )
  |> Vector3Tool.truncate(3);