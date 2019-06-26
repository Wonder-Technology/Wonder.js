open CameraControllerType;

type direction =
  | Left
  | Right
  | Up
  | Down
  | Front
  | Back;

type eulerAngleDiffType = {
  diffX: float,
  diffY: float,
};

type dirtyArray = array(cameraController);