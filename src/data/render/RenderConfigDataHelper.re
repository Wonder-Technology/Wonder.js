open MainStateDataType;

let create = ((shaders, shader_libs), state) => {
  ...state,
  renderConfigRecord: Some({shaders, shader_libs})
};