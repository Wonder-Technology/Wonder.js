open ShaderType;

let _hasMaterialUseShader = (shaderIndex, material, materialsMap) =>
  switch (WonderCommonlib.SparseMapService.get(shaderIndex, materialsMap)) {
  | Some(arr) when arr |> Js.Array.length > 0 => true
  | _ => false
  };

let _removeShaderIndexUsedInSendUniformShaderDataJob =
    (shaderIndex, glslSenderRecord) =>
  glslSenderRecord
  |> HandleUniformShaderCachableFunctionService.removeData(shaderIndex)
  |> HandleUniformShaderCachableService.removeData(shaderIndex)
  |> HandleUniformShaderNoCachableService.removeData(shaderIndex);

let removeShaderIndexFromMaterial =
    (shaderIndex, material, {materialsMap} as shaderRecord, glslSenderRecord) => {
  ArrayMapService.removeValue(shaderIndex, material, materialsMap) |> ignore;

  _hasMaterialUseShader(shaderIndex, material, materialsMap) ?
    (shaderRecord, glslSenderRecord) :
    (
      shaderRecord,
      _removeShaderIndexUsedInSendUniformShaderDataJob(
        shaderIndex,
        glslSenderRecord,
      ),
    );
};