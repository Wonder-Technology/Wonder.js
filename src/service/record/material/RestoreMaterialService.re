let resetShaderIndices = (index, defaultShaderIndex, shaderIndices) =>
  ArrayService.range(0, index)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       ((shaderIndices, i) => shaderIndices |> TypeArrayService.setInt32_1(i, defaultShaderIndex)),
       shaderIndices
     );