let getShaderIndex = (materialIndex, getShaderIndexFunc, renderState) =>
  [@bs] getShaderIndexFunc(materialIndex, renderState)
  |> WonderLog.Contract.ensureCheck(
       (shaderIndex) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|shaderIndex should exist|j}, ~actual={j|not|j}),
                 () => shaderIndex <>= DefaultTypeArrayValueService.getDefaultShaderIndex()
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     );