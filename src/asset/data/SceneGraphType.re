open WDPrimitiveType;

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

type funcMap = string;

type customControlData = {funcMap};

type allSkinDataMap = string;

type skinData = {allSkinDataMap};

type extendData = {
  customControlData,
  skinData,
};

type fntData = {
  name: string,
  content: string,
};

type bitmapData = {
  name: string,
  bufferView: bufferViewIndex,
};

type fontData = {
  fntData,
  bitmapData,
};

type customImageData = {
  id: string,
  bufferView: bufferViewIndex,
  mimeType,
};

type customImagesData = {customImages: array(customImageData)};

type assetData = {
  fontData: option(fontData),
  customImagesData: option(customImagesData),
};

type serializedCustomData = string;

type execFuncData = {
  execFunc: serializedFunc,
  customData: serializedCustomData,
  zIndex: WonderImgui.IMGUIType.execFuncZIndex,
  name: WonderImgui.IMGUIType.execFuncName,
};

type execFuncDataArr = array(execFuncData);

type execData = {execFuncDataArr};

type imgui = {
  assetData,
  execData,
  extendData,
};