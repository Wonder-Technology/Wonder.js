open StateDataType;

open ViewSystem;

open GlType;

open Dom;

let setGL (gl: webgl1Context) state::(state: state) => {
  ...state,
  deviceManagerData: {gl: Some gl}
};

/* let createGL (state: state) =>
   state |> getCanvas |> getContext options::(getContextConfig state); */
let createGL (canvas: htmlElement) contextConfig => getContext canvas contextConfig;