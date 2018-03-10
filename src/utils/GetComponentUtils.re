open BasicCameraViewType;

let getTransformFromBasicCameraView = (gameObject, state: StateDataType.state) =>
  GetComponentGameObjectService.unsafeGetTransformComponent(gameObject, state.gameObjectRecord);