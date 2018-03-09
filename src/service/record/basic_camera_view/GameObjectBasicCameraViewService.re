open BasicCameraViewType;

open ComponentSystem;

let getGameObject = (cameraView, {gameObjectMap}) =>
  ComponentSystem.getComponentGameObject(cameraView, gameObjectMap);

let unsafeGetGameObject = (cameraView, {gameObjectMap}) =>
  ComponentSystem.unsafeGetComponentGameObject(cameraView, gameObjectMap);

let _isValidComponent = (cameraView, maxIndex) => cameraView >= 0 && cameraView < maxIndex;

let rec _findFirstBasicCameraView = (index, maxIndex, record) =>
  _isValidComponent(index, maxIndex) ?
    DisposeBasicCameraViewService.isAlive(index, record) ?
      switch (getGameObject(index, record)) {
      | None => None
      | Some(gameObject) => Some(gameObject)
      } :
      _findFirstBasicCameraView(index |> succ, maxIndex, record) :
    None;

let findFirstGameObject = ({index} as record) => _findFirstBasicCameraView(0, index, record);