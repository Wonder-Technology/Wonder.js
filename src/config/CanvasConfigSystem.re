open CanvasConfigType;

let setConfig = (canvasId, state:StateDataType.state) => {...state, canvasConfig: Some({canvasId: canvasId})};

let getConfig = (state: StateDataType.state) => Js.Option.getExn(state.canvasConfig);