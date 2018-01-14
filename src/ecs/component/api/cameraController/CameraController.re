open CameraControllerSystem;

open StateDataType;

open CameraControllerType;

let createCameraController = create;

let setCameraControllerPerspectiveCamera = (cameraController: int, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(ComponentSystem.checkComponentShouldAlive(cameraController, isAlive, state))
        )
      ),
    StateData.stateData.isTest
  );
  setPerspectiveCamera(cameraController, state)
};

let getCameraControllerPMatrix = (cameraController, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(ComponentSystem.checkComponentShouldAlive(cameraController, isAlive, state))
        )
      ),
    StateData.stateData.isTest
  );
  unsafeGetPMatrix(cameraController, state)
};

let getCameraControllerGameObject = (cameraController, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(ComponentSystem.checkComponentShouldAlive(cameraController, isAlive, state))
        )
      ),
    StateData.stateData.isTest
  );
  getGameObject(cameraController, state) |> Js.Option.getExn
};

let getCameraControllerWorldToCameraMatrix =
    (cameraController: cameraController, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(ComponentSystem.checkComponentShouldAlive(cameraController, isAlive, state))
        )
      ),
    StateData.stateData.isTest
  );
  getWorldToCameraMatrix(
    GetComponentUtils.getTransformFromCameraController(cameraController, state),
    state
  )
};