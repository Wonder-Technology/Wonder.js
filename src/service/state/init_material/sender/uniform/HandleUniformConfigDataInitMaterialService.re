open GlType;

open Gl;

open StateRenderType;

open SendGLSLDataService;

open RenderConfigType;

let _setToUniformSendMap =
    (
      shaderIndex,
      {
        uniformRenderObjectSendModelDataMap,
        uniformRenderObjectSendMaterialDataMap,
        uniformShaderSendNoCachableDataMap,
        uniformShaderSendCachableDataMap,
        uniformShaderSendCachableFunctionDataMap,
        uniformInstanceSendNoCachableDataMap
      },
      (
        renderObjectSendModelDataArr,
        renderObjectSendMaterialDataArr,
        shaderSendNoCachableDataArr,
        shaderSendCachableDataArr,
        shaderSendCachableFunctionDataArr,
        instanceSendNoCachableDataArr
      )
    ) => {
  HandleUniformRenderObjectModelService.setToUniformSendMap(
    shaderIndex,
    uniformRenderObjectSendModelDataMap,
    renderObjectSendModelDataArr
  )
  |> ignore;
  HandleUniformRenderObjectMaterialService.setToUniformSendMap(
    shaderIndex,
    uniformRenderObjectSendMaterialDataMap,
    renderObjectSendMaterialDataArr
  )
  |> ignore;
  HandleUniformShaderNoCachableService.setToUniformSendMap(
    shaderIndex,
    uniformShaderSendNoCachableDataMap,
    shaderSendNoCachableDataArr
  )
  |> ignore;
  HandleUniformShaderCachableService.setToUniformSendMap(
    shaderIndex,
    uniformShaderSendCachableDataMap,
    shaderSendCachableDataArr
  )
  |> ignore;
  HandleUniformShaderCachableFunctionService.setToUniformSendMap(
    shaderIndex,
    uniformShaderSendCachableFunctionDataMap,
    shaderSendCachableFunctionDataArr
  )
  |> ignore;
  HandleUniformInstanceNoCachableService.setToUniformSendMap(
    shaderIndex,
    uniformInstanceSendNoCachableDataMap,
    instanceSendNoCachableDataArr
  )
  |> ignore
};

let readUniformSendData =
    (shaderLibDataArr, (gl, program), readUniformsFunc, (uniformLocationMap, uniformCacheMap)) =>
  shaderLibDataArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (sendDataArrTuple, {variables}) =>
           switch variables {
           | None => sendDataArrTuple
           | Some({uniforms}) =>
             [@bs]
             readUniformsFunc(
               (gl, program, uniformLocationMap, uniformCacheMap),
               sendDataArrTuple,
               uniforms
             )
           }
       ),
       ([||], [||], [||], [||], [||], [||])
     );

let _checkShouldNotAddBefore = (shaderIndex, glslSenderRecord) =>
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|not be added before|j}, ~actual={j|be|j}),
              () =>
                glslSenderRecord.uniformRenderObjectSendModelDataMap
                |> WonderCommonlib.SparseMapService.get(shaderIndex)
                |> assertNotExist
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );

let addUniformSendData =
    (
      gl,
      (program: program, shaderIndex: int, shaderLibDataArr: shaderLibs),
      readUniformSendDataFunc,
      (glslSenderRecord, glslLocationRecord)
    ) => {
  _checkShouldNotAddBefore(shaderIndex, glslSenderRecord);
  let uniformLocationMap =
    HandleShaderConfigDataMapService.getOrCreateHashMap(
      glslLocationRecord |> GLSLLocationService.getUniformLocationMap(shaderIndex)
    );
  (
    [@bs]
    readUniformSendDataFunc(
      shaderLibDataArr,
      gl,
      program,
      (
        uniformLocationMap,
        HandleShaderConfigDataMapService.getOrCreateHashMap(
          glslSenderRecord.uniformCacheMap |> SendGLSLDataService.getCacheMap(shaderIndex)
        )
      )
    )
    |> _setToUniformSendMap(shaderIndex, glslSenderRecord),
    glslLocationRecord
    |> GLSLLocationService.setUniformLocationMap(shaderIndex, uniformLocationMap)
  )
};