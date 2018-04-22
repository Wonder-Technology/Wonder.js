open StateRenderType;

let getShaderIndex =
  [@bs]
  (
    (materialIndex: int, {basicMaterialRecord}) =>
      ShaderIndicesService.getShaderIndex(materialIndex, basicMaterialRecord.shaderIndices)
  );