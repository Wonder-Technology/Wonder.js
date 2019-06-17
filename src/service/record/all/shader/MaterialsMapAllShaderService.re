open AllShaderType;

let addMaterialWithoutDuplicate = (shaderIndex, material, {materialsMap} as record) => {
  ArrayMapService.addValueWithoutDuplicate(
    shaderIndex,
    material,
    materialsMap,
  )
  |> ignore;

  record
  |> WonderLog.Contract.ensureCheck(
       ({materialsMap}) =>
         WonderLog.(
           Contract.(
             Operators.(
               ArrayMapService.checkDuplicate(
                 {j|material should only use the same shaderIndex once|j},
                 shaderIndex,
                 material,
                 materialsMap,
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );
};