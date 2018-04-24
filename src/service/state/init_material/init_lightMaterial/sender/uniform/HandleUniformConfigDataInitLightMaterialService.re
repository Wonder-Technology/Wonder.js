open GlType;

open Gl;

open StateRenderType;

open SendGLSLDataService;

open RenderConfigType;

let _readUniforms =
  [@bs]
  (
    ((gl, program, uniformLocationMap, uniformCacheMap), sendDataArrTuple, uniforms) =>
      switch uniforms {
      /* TODO use record instead of tuple */
      | None => sendDataArrTuple
      | Some(uniforms) =>
        uniforms
        |> WonderCommonlib.ArrayService.reduceOneParam(
             [@bs]
             (
               (sendDataArrTuple, {name, field, type_, from}) =>
                 switch from {
                 | "camera" =>
                   HandleCameraUniformConfigDataService.addCameraSendData(
                     (
                       field,
                       GLSLLocationService.getUniformLocation(
                         program,
                         name,
                         uniformLocationMap,
                         gl
                       ),
                       name,
                       type_,
                       uniformCacheMap
                     ),
                     sendDataArrTuple
                   )
                 | "basicMaterial" =>
                   HandleMaterialUniformConfigDataService.addBasicMaterialSendData(
                     (
                       field,
                       GLSLLocationService.getUniformLocation(
                         program,
                         name,
                         uniformLocationMap,
                         gl
                       ),
                       name,
                       type_,
                       uniformCacheMap
                     ),
                     sendDataArrTuple
                   )
                 | "lightMaterial" =>
                   HandleMaterialUniformConfigDataService.addLightMaterialSendData(
                     (
                       field,
                       GLSLLocationService.getUniformLocation(
                         program,
                         name,
                         uniformLocationMap,
                         gl
                       ),
                       name,
                       type_,
                       uniformCacheMap
                     ),
                     sendDataArrTuple
                   )
                 | "ambientLight" =>
                   HandleLightUniformConfigDataAllService.addAmbientLightSendData(
                     (field, program, uniformCacheMap, uniformLocationMap),
                     sendDataArrTuple
                   )
                 | "directionLight" =>
                   HandleLightUniformConfigDataAllService.addDirectionLightSendData(
                     (field, program, uniformCacheMap, uniformLocationMap),
                     sendDataArrTuple
                   )
                 | "pointLight" =>
                   HandleLightUniformConfigDataAllService.addPointLightSendData(
                     (field, program, uniformCacheMap, uniformLocationMap),
                     sendDataArrTuple
                   )
                 | "model" =>
                   HandleModelUniformConfigDataService.addModelSendData(
                     (
                       field,
                       GLSLLocationService.getUniformLocation(
                         program,
                         name,
                         uniformLocationMap,
                         gl
                       ),
                       name,
                       type_,
                       uniformCacheMap
                     ),
                     sendDataArrTuple
                   )
                 | _ =>
                   WonderLog.Log.fatal(
                     WonderLog.Log.buildFatalMessage(
                       ~title="_readUniforms",
                       ~description={j|unknow from:$from|j},
                       ~reason="",
                       ~solution={j||j},
                       ~params={j||j}
                     )
                   )
                 }
             ),
             sendDataArrTuple
           )
      }
  );

let _readUniformSendData =
  [@bs]
  (
    (shaderLibDataArr, gl, program, (uniformLocationMap, uniformCacheMap)) =>
      HandleUniformConfigDataInitMaterialService.readUniformSendData(
        shaderLibDataArr,
        (gl, program),
        _readUniforms,
        (uniformLocationMap, uniformCacheMap)
      )
  );

let addUniformSendData =
  [@bs]
  (
    (gl, (program: program, shaderIndex: int, shaderLibDataArr: shader_libs), recordTuple) =>
      HandleUniformConfigDataInitMaterialService.addUniformSendData(
        gl,
        (program: program, shaderIndex: int, shaderLibDataArr: shader_libs),
        _readUniformSendData,
        recordTuple
      )
  );