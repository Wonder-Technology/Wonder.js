open BasicCameraViewType;

open ComponentSystem;

let _isValidComponent = (cameraView) => cameraView >= 0;

let rec _find = (index, record) =>
  _isValidComponent(index) ?
    BasicCameraViewDisposeComponentService.isAlive(index, record) ?
      Some(index) : _find(index - 1, record) :
    None;

let findFirstGameObject = ({index, disposedIndexArray} as record) => _find(index |> pred, record);

let getGameObject = (cameraView, {gameObjectMap}) =>
  ComponentSystem.getComponentGameObject(cameraView, gameObjectMap);

let unsafeGetGameObject = (cameraView, {gameObjectMap}) =>
  ComponentSystem.unsafeGetComponentGameObject(cameraView, gameObjectMap);