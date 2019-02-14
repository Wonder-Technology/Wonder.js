open StateDataMainType;

let clearInitShaderCache = ({shaderRecord} as state) => {
  ...state,
  shaderRecord: ShaderLibShaderIndexShaderService.clearShaderIndexMap(shaderRecord),
};