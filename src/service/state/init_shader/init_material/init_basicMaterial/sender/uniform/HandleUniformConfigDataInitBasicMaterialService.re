open WonderWebgl.GlType;

open AllRenderConfigType;

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
             | "basicMaterial" =>
               HandleMaterialUniformConfigDataService.addBasicMaterialSendData(
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