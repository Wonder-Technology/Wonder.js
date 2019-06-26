open WonderWebgl.GlType;

open AllRenderConfigType;

let _addAmbientLightSendData =
    ((field, program, uniformCacheMap, uniformLocationMap), sendDataArrTuple) =>
  switch (field) {
  | "send" =>
    HandleUniformShaderCachableFunctionService.addUniformSendDataByType(
      (program, uniformCacheMap, uniformLocationMap),
      sendDataArrTuple,
      SendAmbientLightUniformSendRenderDataService.send,
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addAmbientLightSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let _addDirectionLightSendData =
    ((field, program, uniformCacheMap, uniformLocationMap), sendDataArrTuple) =>
  switch (field) {
  | "send" =>
    HandleUniformShaderCachableFunctionService.addUniformSendDataByType(
      (program, uniformCacheMap, uniformLocationMap),
      sendDataArrTuple,
      SendDirectionLightUniformSendRenderDataService.send,
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addDirectionLightSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let _addPointLightSendData =
    ((field, program, uniformCacheMap, uniformLocationMap), sendDataArrTuple) =>
  switch (field) {
  | "send" =>
    HandleUniformShaderCachableFunctionService.addUniformSendDataByType(
      (program, uniformCacheMap, uniformLocationMap),
      sendDataArrTuple,
      SendPointLightUniformSendRenderDataService.send,
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addPointLightSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let _readLightUniform =
    (
      from,
      (field, program, uniformCacheMap, uniformLocationMap),
      sendDataArrTuple,
    ) =>
  switch (from) {
  | "ambientLight" =>
    _addAmbientLightSendData(
      (field, program, uniformCacheMap, uniformLocationMap),
      sendDataArrTuple,
    )
  | "directionLight" =>
    _addDirectionLightSendData(
      (field, program, uniformCacheMap, uniformLocationMap),
      sendDataArrTuple,
    )
  | "pointLight" =>
    _addPointLightSendData(
      (field, program, uniformCacheMap, uniformLocationMap),
      sendDataArrTuple,
    )
  };

let _readUniforms =
  (.
    (gl, program, uniformLocationMap, uniformCacheMap),
    sendDataArrTuple,
    uniforms,
  ) =>
    uniforms |> OptionService.isJsonSerializedValueNone ?
      sendDataArrTuple :
      uniforms
      |> OptionService.unsafeGetJsonSerializedValue
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. sendDataArrTuple, {name, field, type_, from}) =>
             switch (from) {
             | "camera" =>
               HandleCameraUniformConfigDataService.addCameraSendData(
                 (
                   field,
                   AllGLSLLocationService.getUniformLocationAndCache(
                     program,
                     name,
                     uniformLocationMap,
                     gl,
                   ),
                   name,
                   type_,
                   uniformCacheMap,
                 ),
                 sendDataArrTuple,
               )
             | "lightMaterial" =>
               HandleMaterialUniformConfigDataService.addLightMaterialSendData(
                 (
                   field,
                   AllGLSLLocationService.getUniformLocationAndCache(
                     program,
                     name,
                     uniformLocationMap,
                     gl,
                   ),
                   name,
                   type_,
                   uniformCacheMap,
                 ),
                 sendDataArrTuple,
               )
             | "ambientLight"
             | "directionLight"
             | "pointLight" =>
               _readLightUniform(
                 from,
                 (field, program, uniformCacheMap, uniformLocationMap),
                 sendDataArrTuple,
               )
             | "model" =>
               HandleModelUniformConfigDataService.addModelSendData(
                 (
                   field,
                   AllGLSLLocationService.getUniformLocationAndCache(
                     program,
                     name,
                     uniformLocationMap,
                     gl,
                   ),
                   name,
                   type_,
                   uniformCacheMap,
                 ),
                 sendDataArrTuple,
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
           sendDataArrTuple,
         );

let _readUniformSendData =
  (. shaderLibDataArr, gl, program, (uniformLocationMap, uniformCacheMap)) =>
    HandleUniformConfigDataInitShaderAllService.readUniformSendData(
      shaderLibDataArr,
      (gl, program),
      _readUniforms,
      (uniformLocationMap, uniformCacheMap),
    );

let addUniformSendData =
  (.
    gl,
    (program: program, shaderIndex: int, shaderLibDataArr: shaderLibs),
    recordTuple,
  ) =>
    HandleUniformConfigDataInitShaderAllService.addUniformSendData(
      gl,
      (program: program, shaderIndex: int, shaderLibDataArr: shaderLibs),
      _readUniformSendData,
      recordTuple,
    );