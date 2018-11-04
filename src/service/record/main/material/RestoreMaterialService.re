let resetShaderIndices = (index, defaultShaderIndex, shaderIndices) =>
  ArrayService.range(0, index - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       ((shaderIndices, i) => shaderIndices |> TypeArrayService.setUint32_1(i, defaultShaderIndex)),
       shaderIndices
     );