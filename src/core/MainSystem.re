open StateData;

open InitConfigSystem;

open InitDeviceSystem;

let _getValueFromJsObj (valueFromJsObj: Js.nullable 'value) (defaultValue: 'value) =>
  switch (Js.Nullable.to_opt valueFromJsObj) {
  | Some value => value
  | None => defaultValue
  };

let _changeConfigStateoRecord (configState: Js.t {..}) :mainConfigData => {
  canvasId: _getValueFromJsObj configState##canvasId None,
  isTest: _getValueFromJsObj configState##isTest false,
  contextConfig:
    _getValueFromJsObj
      configState##contextConfig
      {
        alpha: true,
        depth: true,
        stencil: false,
        antialias: true,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false
      }
};

let setConfig configState::(configState: Js.t {..}) (state: state) =>
  _changeConfigStateoRecord configState
  |> (fun configState => configState.isTest)
  |> setIsTest ::state;

let init (state: state) =>
  /* todo init device */
  createCanvas state;