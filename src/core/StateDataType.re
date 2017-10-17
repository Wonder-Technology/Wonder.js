open GlType;

type contextConfigData = MainConfigType.contextConfigData;

type viewData = {
  canvas: Dom.canvasElement,
  contextConfig: contextConfigData
};

type initConfigData = {isTest: bool};

type deviceManagerData = {gl: webgl1Context};