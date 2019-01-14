open ShaderType;

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