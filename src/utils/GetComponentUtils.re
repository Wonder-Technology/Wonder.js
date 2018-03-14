open BasicCameraViewType;

let getTransformFromBasicCameraView = (gameObject, state: MainStateDataType.state) =>
  GetComponentGameObjectService.unsafeGetTransformComponent(gameObject, state.gameObjectRecord);