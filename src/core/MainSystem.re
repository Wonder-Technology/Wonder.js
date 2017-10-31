open MainConfigType;

open StateDataType;

open InitConfigSystem;

open InitDeviceSystem;

open ViewSystem;

open BufferConfigSystem;

open DeviceManagerSystem;

let _getValueFromJsObj = (valueFromJsObj: Js.nullable('value), defaultValue: 'value) =>
  switch (Js.Nullable.to_opt(valueFromJsObj)) {
  | Some(value) => value
  | None => defaultValue
  };

let _getOptionValueFromJsObj = (valueFromJsObj: Js.nullable('value)) =>
  Js.Nullable.to_opt(valueFromJsObj);

/* todo not set default twice! */
let _changeToContextConfigRecord = (contextConfigObj: Js.t({..})) : MainConfigType.contextConfig => {
  alpha: _getValueFromJsObj(contextConfigObj##alpha, true),
  depth: _getValueFromJsObj(contextConfigObj##depth, true),
  stencil: _getValueFromJsObj(contextConfigObj##stencil, false),
  antialias: _getValueFromJsObj(contextConfigObj##antialias, true),
  premultipliedAlpha: _getValueFromJsObj(contextConfigObj##premultipliedAlpha, true),
  preserveDrawingBuffer: _getValueFromJsObj(contextConfigObj##preserveDrawingBuffer, false)
};

let _changeToBufferConfigRecord = (bufferConfigObj: Js.t({..})) : MainConfigType.bufferConfig => {
  transformDataBufferCount:
    _getValueFromJsObj(bufferConfigObj##transformDataBufferCount, 20 * 1000)
};

let _changeConfigStateToRecord = (configState: configStateJsObj) : mainConfigData => {
  canvasId: _getOptionValueFromJsObj(configState##canvasId),
  isTest: _getValueFromJsObj(configState##isTest, false),
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
    | None => {transformDataBufferCount: 20 * 1000}
    }
};

let setConfig = (~configState: Js.t({..}), state: state) => {
  let configState = _changeConfigStateToRecord(configState);
  (configState, setIsTest(~isTest=configState.isTest, state))
};

let _initDataFromState = (state: StateDataType.state) => state |> TransformSystem.initData;

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
