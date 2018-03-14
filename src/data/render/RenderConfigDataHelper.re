open MainStateDataType;

let create = ((shaders, shader_libs), state) => {
  ...state,
  renderConfigData: Some({shaders, shader_libs})
};