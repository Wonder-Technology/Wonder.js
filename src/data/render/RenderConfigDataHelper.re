open StateDataType;

let initData = ((shaders, shader_libs), state) => {
  ...state,
  renderConfigData: Some({shaders, shader_libs})
};