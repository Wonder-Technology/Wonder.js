open Contract;

let pregetGLSLData = (gl, state: StateDataType.state) => {
  let glslData = ShaderStateCommon.getGLSLData(state);
  glslData.precision = Some(ShaderSystem.getPrecisionSource(state));
  state
};

let initData = (state:StateDataType.state) => MaterialSystem.initData(state);

let unsafeGetShaderIndex = MaterialSystem.unsafeGetShaderIndex;

let initBasicMaterial = BasicMaterialSystem.init;