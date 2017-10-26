
open GlType;

open TransformType;

open CameraControllerType;

open GameObjectType;

type contextConfig = {
  alpha: bool,
  depth: bool,
  stencil: bool,
  antialias: bool,
  premultipliedAlpha: bool,
  preserveDrawingBuffer: bool
};

type bufferConfig = {mutable transformDataBufferCount: int};

type viewData = {
  canvas: option Dom.htmlElement,
  contextConfig: option contextConfig
};

type initConfigData = {isTest: option bool};

type deviceManagerData = {gl: option webgl1Context};

type state = {
  bufferConfig: option bufferConfig,
  viewData,
  initConfigData,
  deviceManagerData,
  gameObjectData,
  mutable transformData: option transformData,
  mutable cameraControllerData: cameraControllerData
};

type stateData = {mutable state: option state};

