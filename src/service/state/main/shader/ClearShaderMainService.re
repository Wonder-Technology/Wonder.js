open StateDataMainType;

let clearInitShaderCache = ({shaderRecord} as state) => {
  ...state,
  shaderRecord: ShaderLibShaderIndexAllShaderService.clearShaderIndexMap(shaderRecord),
};