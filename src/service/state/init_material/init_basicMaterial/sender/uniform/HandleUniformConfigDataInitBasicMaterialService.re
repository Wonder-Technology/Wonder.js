open GlType;

open Gl;

open StateRenderType;

open SendGLSLDataService;

open RenderConfigType;

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
                 sendDataArrTuple,
               )
             | "basicMaterial" =>
               HandleMaterialUniformConfigDataService.addBasicMaterialSendData(
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
                 sendDataArrTuple,
               )
             | "model" =>
               HandleModelUniformConfigDataService.addModelSendData(
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
    HandleUniformConfigDataInitMaterialService.readUniformSendData(
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
    HandleUniformConfigDataInitMaterialService.addUniformSendData(
      gl,
      (program: program, shaderIndex: int, shaderLibDataArr: shaderLibs),
      _readUniformSendData,
      recordTuple,
    );