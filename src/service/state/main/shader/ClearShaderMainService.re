open StateDataMainType;

let clearShaderCache = ({shaderRecord} as state) => {
  ...state,
  shaderRecord: ShaderIndexShaderService.clearShaderIndexMap(shaderRecord),
};