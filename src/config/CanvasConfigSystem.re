open CanvasConfigType;

let setConfig = (canvasId, state:MainStateDataType.state) => {...state, canvasConfig: Some({canvasId: canvasId})};

let getConfig = (state: MainStateDataType.state) => Js.Option.getExn(state.canvasConfig);