open BasicCameraViewType;

let getTransformFromBasicCameraView = (gameObject, state: StateDataType.state) =>
  GameObjectAdmin.unsafeGetTransformComponent(gameObject, state);