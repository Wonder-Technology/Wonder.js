type target = (float, float, float);

type flyCameraController = {
  moveSpeed: float,
  rotateSpeed: float,
  wheelSpeed: float,
  isBindEvent: bool,
};

type arcballCameraController = {
  distance: float,
  minDistance: float,
  phi: float,
  theta: float,
  thetaMargin: float,
  target,
  moveSpeedX: float,
  moveSpeedY: float,
  rotateSpeed: float,
  wheelSpeed: float,
  isBindEvent: bool,
};

type serializedFunc = string;

type funcMap = WonderCommonlib.ImmutableHashMapService.t(serializedFunc);

type customControlData = {funcMap};

type extendData = {
  customControlData,
  skinData: ExtendIMGUIType.skinData,
};

type imgui = {
  imguiFunc: serializedFunc,
  customData: WonderImgui.IMGUIType.customDataForIMGUIFunc,
  extendData,
};