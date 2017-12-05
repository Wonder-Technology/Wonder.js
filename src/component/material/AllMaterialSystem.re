open Contract;

let pregetGLSLData = (gl, state: StateDataType.state) => {
  let glslData = ShaderStateSystem.getGLSLData(state);
  glslData.precision = ShaderSystem.getPrecisionSource(state);
  state
};