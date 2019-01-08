open StateDataMainType;

let clearInitShaderCache = ({shaderRecord} as state) => {
  ...state,
  shaderRecord: ShaderIndexShaderService.clearShaderIndexMap(shaderRecord),
};