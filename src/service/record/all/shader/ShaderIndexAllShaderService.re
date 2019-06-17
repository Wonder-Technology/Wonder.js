open AllShaderType;

let genereateShaderIndex = ({index} as record) => {
  record.index = succ(index);

  index
  |> WonderLog.Contract.ensureCheck(
       r => {
         open WonderLog;
         open Contract;
         open Operators;
         let defaultShaderIndex =
           DefaultTypeArrayValueService.getDefaultShaderIndex();
         test(
           Log.buildAssertMessage(
             ~expect={j|not equal default shader index:$defaultShaderIndex |j},
             ~actual={j|equal|j},
           ),
           () =>
           r <>= defaultShaderIndex
         );
       },
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );
};

let _hasMaterialUseShader = (shaderIndex, material, materialsMap) =>
  switch (
    WonderCommonlib.MutableSparseMapService.get(shaderIndex, materialsMap)
  ) {
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

let isDefaultShaderIndex = shaderIndex =>
  shaderIndex === DefaultTypeArrayValueService.getDefaultShaderIndex();