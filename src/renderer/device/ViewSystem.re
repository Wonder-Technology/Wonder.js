open StateData;

open MainData;

let setCanvas (canvas: Dom.canvasElement) state::(state: state) => {
  ...state,
  viewData: {...state.viewData, canvas}
};

let setContextConfig contextConfig::(contextConfig: contextConfigData) (state: state) => {
  ...state,
  viewData: {...state.viewData, contextConfig}
};