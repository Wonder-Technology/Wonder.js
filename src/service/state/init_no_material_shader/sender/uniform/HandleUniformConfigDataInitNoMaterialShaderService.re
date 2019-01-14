open WonderWebgl.GlType;

open RenderConfigType;

open GLSLSenderType;

let _readUniforms =
    (
      (gl, program, uniformLocationMap, uniformCacheMap),
      sendCachableDataArr,
      uniforms,
    ) =>
  uniforms |> OptionService.isJsonSerializedValueNone ?
    sendCachableDataArr :
    uniforms
    |> OptionService.unsafeGetJsonSerializedValue
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. sendCachableDataArr, {name, field, type_, from}) =>
           switch (from) {
           | "no_material_shader" =>
             HandleNoMaterialShaderUniformConfigDataService.addSendData(
               (
                 field,
                 GLSLLocationService.getUniformLocation(
                   program,
                   name,
                   uniformLocationMap,
                   gl,
                 ),
                 name,
                 type_,
                 uniformCacheMap,
               ),
               sendCachableDataArr,
             )
           | _ =>
             WonderLog.Log.fatal(
               WonderLog.Log.buildFatalMessage(
                 ~title="_readUniforms",
                 ~description={j|unknow from:$from|j},
                 ~reason="",
                 ~solution={j||j},
                 ~params={j||j},
               ),
             )
           },
         sendCachableDataArr,
       );

let _readUniformSendData =
    (shaderLibDataArr, gl, program, (uniformLocationMap, uniformCacheMap)) =>
  shaderLibDataArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. sendCachableDataArr, {variables}) =>
         variables |> OptionService.isJsonSerializedValueNone ?
           sendCachableDataArr :
           {
             let {uniforms} =
               variables |> OptionService.unsafeGetJsonSerializedValue;

             _readUniforms(
               (gl, program, uniformLocationMap, uniformCacheMap),
               sendCachableDataArr,
               uniforms,
             );
           },
       [||],
     );

let _setToUniformSendMap =
    (
      shaderIndex,
      {uniformNoMaterialShaderSendCachableDataMap},
      sendCachableDataArr,
    ) =>
  HandleNoMaterialShaderUniformConfigDataService.setToUniformSendMap(
    shaderIndex,
    uniformNoMaterialShaderSendCachableDataMap,
    sendCachableDataArr,
  );

let addUniformSendData =
    (
      gl,
      (program: program, shaderIndex: int, shaderLibDataArr: shaderLibs),
      (glslSenderRecord, glslLocationRecord),
    ) => {
  /* HandleUniformConfigDataInitMaterialService.addUniformSendData(
       gl,
       (program: program, shaderIndex: int, shaderLibDataArr: shaderLibs),
       _readUniformSendData,
       recordTuple,
     ); */

  let uniformLocationMap =
    HandleShaderConfigDataMapService.getOrCreateHashMap(
      glslLocationRecord
      |> GLSLLocationService.getUniformLocationMap(shaderIndex),
    );

  (
    _readUniformSendData(
      shaderLibDataArr,
      gl,
      program,
      (
        uniformLocationMap,
        HandleShaderConfigDataMapService.getOrCreateHashMap(
          glslSenderRecord.uniformCacheMap
          |> SendGLSLDataService.getCacheMap(shaderIndex),
        ),
      ),
    )
    |> _setToUniformSendMap(shaderIndex, glslSenderRecord),
    glslLocationRecord
    |> GLSLLocationService.setUniformLocationMap(
         shaderIndex,
         uniformLocationMap,
       ),
  );
};