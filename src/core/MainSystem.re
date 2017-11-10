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
  alpha: Js.to_bool(getValueFromJsObj(contextConfigObj##alpha, Js.true_)),
  depth: Js.to_bool(getValueFromJsObj(contextConfigObj##depth, Js.true_)),
  stencil: Js.to_bool(getValueFromJsObj(contextConfigObj##stencil, Js.false_)),
  antialias: Js.to_bool(getValueFromJsObj(contextConfigObj##antialias, Js.true_)),
  premultipliedAlpha: Js.to_bool(getValueFromJsObj(contextConfigObj##premultipliedAlpha, Js.true_)),
  preserveDrawingBuffer: Js.to_bool(getValueFromJsObj(contextConfigObj##preserveDrawingBuffer, Js.false_))
};
                               

let _changeToBufferConfigRecord = (bufferConfigObj: Js.t({..})) : MainConfigType.bufferConfig => {
  transformDataBufferCount: getValueFromJsObj(bufferConfigObj##transformDataBufferCount, 20 * 1000),
  geometryPointDataBufferCount:
    getValueFromJsObj(bufferConfigObj##geometryPointDataBufferCount, 1000 * 1000),
  basicMaterialDataBufferCount:
    getValueFromJsObj(bufferConfigObj##basicMaterialDataBufferCount, 20 * 1000)
};

let _changeConfigStateToRecord = (configState: configStateJsObj) : mainConfigData => {
  canvasId: getOptionValueFromJsObj(configState##canvasId),
  isTest: Js.to_bool(getValueFromJsObj(configState##isTest, Js.false_)),
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
    | None => {
        transformDataBufferCount: 20 * 1000,
        geometryPointDataBufferCount: 1000 * 1000,
        basicMaterialDataBufferCount: 20 * 1000
      }
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
  state
  |> setGl(createGL(canvas, configState.contextConfig))
  |> setCanvas(~canvas)
  |> setContextConfig(~contextConfig=configState.contextConfig)
  |> setBufferConfig(~bufferConfig=configState.bufferConfig)
  |> _initDataFromState
};