open StateInitLightMaterialType;

open ShaderType;

open RenderConfigType;

let _genereateShaderIndex = ({index} as record) => {
  record.index = succ(index);
  index
  |> WonderLog.Contract.ensureCheck(
       (r) => {
         open WonderLog;
         open Contract;
         open Operators;
         let defaultShaderIndex = DefaultTypeArrayValueService.getDefaultShaderIndex();
         test(
           Log.buildAssertMessage(
             ~expect={j|not equal default shader index:$defaultShaderIndex |j},
             ~actual={j|equal|j}
           ),
           () => r <>= defaultShaderIndex
         )
       },
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     )
};

let _getShaderIndex = (key: string, {shaderIndexMap}) =>
  shaderIndexMap |> WonderCommonlib.HashMapService.get(key);

let _setShaderIndex = (key: string, shaderIndex: int, {shaderIndexMap}) =>
  shaderIndexMap |> WonderCommonlib.HashMapService.set(key, shaderIndex);

let _join = (array: array(shaderLib)) => {
  let output = ref("");
  for (i in 0 to Js.Array.length(array) |> pred) {
    output := output^ ++ array[i].name
  };
  output^
};

let _buildShaderIndexMapKey = (shaderLibDataArr: shader_libs) => shaderLibDataArr |> _join;

let initMaterialShader =
    (
      materialIndex: int,
      (gl, shaderLibDataArr),
      buildGLSLSourceFunc,
      {
        directionLightRecord,
        pointLightRecord,
        shaderRecord,
        programRecord,
        glslRecord,
        glslSenderRecord,
        glslLocationRecord,
        glslChunkRecord
      }
    ) => {
  let key = _buildShaderIndexMapKey(shaderLibDataArr);
  switch (_getShaderIndex(key, shaderRecord)) {
  | None =>
    let shaderIndex = _genereateShaderIndex(shaderRecord);
    _setShaderIndex(key, shaderIndex, shaderRecord) |> ignore;
    let (vsSource, fsSource) =
      [@bs]
      buildGLSLSourceFunc(
        materialIndex,
        shaderLibDataArr,
        HandleGLSLInitLightMaterialService.getHandle((directionLightRecord, pointLightRecord)),
        (glslRecord, glslChunkRecord)
      );
    let program =
      gl
      |> Gl.createProgram
      |> ProgramService.registerProgram(shaderIndex, programRecord)
      |> ProgramService.initShader(vsSource, fsSource, gl);
    (glslSenderRecord, glslLocationRecord)
    |> HandleAttributeConfigDataInitLightMaterialService.addAttributeSendData(
         (gl, shaderIndex, program),
         shaderLibDataArr
       )
    |> HandleUniformConfigDataInitLightMaterialService.addUniformSendData(
         gl,
         (program, shaderIndex, shaderLibDataArr)
       )
    |> ignore;
    shaderIndex
  | Some(shaderIndex) => shaderIndex
  }
};