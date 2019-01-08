open StateDataMainType;

/* TODO test */
let clearShaderCache = ({shaderRecord} as state) => {
  ...state,
  shaderRecord: ShaderIndexShaderService.clearShaderIndexMap(shaderRecord),
};


let clearShaderIndexCache = ({shaderRecord} as state) => {
  ...state,
  shaderRecord: ShaderIndexShaderService.clearShaderIndexMap(shaderRecord),
};