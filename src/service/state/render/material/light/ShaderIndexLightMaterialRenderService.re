open StateRenderType;

let getShaderIndex =
  [@bs]
  (
    (materialIndex: int, {lightMaterialRecord}) =>
      ShaderIndicesService.getShaderIndex(materialIndex, lightMaterialRecord.shaderIndices)
  );