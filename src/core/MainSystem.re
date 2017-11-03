open MainConfigType;

open StateDataType;

open InitConfigSystem;

open InitDeviceSystem;

open ViewSystem;

open BufferConfigSystem;

open DeviceManagerSystem;

open JsObjUtils;

/* todo not set default twice! */
let _changeToContextConfigRecord = (contextConfigObj: Js.t({..})) : MainConfigType.contextConfig => {
  alpha: getValueFromJsObj(contextConfigObj##alpha, true),
  depth: getValueFromJsObj(contextConfigObj##depth, true),
  stencil: getValueFromJsObj(contextConfigObj##stencil, false),
  antialias: getValueFromJsObj(contextConfigObj##antialias, true),
  premultipliedAlpha: getValueFromJsObj(contextConfigObj##premultipliedAlpha, true),
  preserveDrawingBuffer: getValueFromJsObj(contextConfigObj##preserveDrawingBuffer, false)
};

let _changeToBufferConfigRecord = (bufferConfigObj: Js.t({..})) : MainConfigType.bufferConfig => {
  transformDataBufferCount:
    getValueFromJsObj(bufferConfigObj##transformDataBufferCount, 20 * 1000),
  /* todo unit test */
  geometryPointDataBufferCount:
    getValueFromJsObj(bufferConfigObj##geometryPointDataBufferCount, 1000 * 1000),
  basicMaterialDataBufferCount:
    getValueFromJsObj(bufferConfigObj##basicMaterialDataBufferCount, 20 * 1000)
};

let _changeConfigStateToRecord = (configState: configStateJsObj) : mainConfigData => {
  canvasId: getOptionValueFromJsObj(configState##canvasId),
  isTest: getValueFromJsObj(configState##isTest, false),
  contextConfig:
    switch (Js.Nullable.to_opt(configState##contextConfig)) {
    | Some(contextConfig) => _changeToContextConfigRecord(contextConfig)
    | None => {
        alpha: true,
        depth: true,
        stencil: false,
        antialias: true,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false
      }
    },
  bufferConfig:
    switch (Js.Nullable.to_opt(configState##bufferConfig)) {
    | Some(bufferConfig) => _changeToBufferConfigRecord(bufferConfig)
    | None => {transformDataBufferCount: 20 * 1000, geometryPointDataBufferCount: 1000 * 1000, basicMaterialDataBufferCount: 20 * 1000}
    }
};

let setConfig = (~configState: Js.t({..}), state: state) => {
  let configState = _changeConfigStateToRecord(configState);
  (configState, setIsTest(~isTest=configState.isTest, state))
};

let _initDataFromState = (state: StateDataType.state) =>
  state |> TransformSystem.initData |> MaterialSystem.initData |> GeometrySystem.initData;

/* todo detect, setscreensize, set pixel ratio ... */
let init = ((configState: mainConfigData, state: state)) => {
  let canvas = createCanvas(configState);
  createGL(canvas, configState.contextConfig)
  |> setGL(~state)
  |> setCanvas(~canvas)
  |> setContextConfig(~contextConfig=configState.contextConfig)
  |> setBufferConfig(~bufferConfig=configState.bufferConfig)
  |> _initDataFromState
};