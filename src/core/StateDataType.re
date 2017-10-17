open GlType;

type contextConfigData = MainConfigType.contextConfigData;

type viewData = {
  canvas: option Dom.htmlElement,
  contextConfig: option contextConfigData
};

type initConfigData = {isTest: option bool};

type deviceManagerData = {gl: option webgl1Context};

type state = {
  viewData,
  initConfigData,
  deviceManagerData
};

type stateData = {mutable state: option state};

