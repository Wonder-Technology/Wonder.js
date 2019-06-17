open WonderWebgl.GlType;

open AllGLSLSenderType;

open AllRenderConfigType;

let _setToUniformSendMap =
    (
      shaderIndex,
      {
        uniformRenderObjectSendModelDataMap,
        uniformRenderObjectSendMaterialDataMap,
        uniformShaderSendNoCachableDataMap,
        uniformShaderSendCachableDataMap,
        uniformShaderSendCachableFunctionDataMap,
        uniformInstanceSendNoCachableDataMap,
        uniformNoMaterialShaderSendCachableDataMap,
      },
      {
        renderObjectSendModelDataArr,
        renderObjectSendMaterialDataArr,
        shaderSendNoCachableDataArr,
        shaderSendCachableDataArr,
        shaderSendCachableFunctionDataArr,
        instanceSendNoCachableDataArr,
        noMaterialShaderSendCachableDataArr,
      },
    ) => {
  HandleUniformRenderObjectModelService.setToUniformSendMap(
    shaderIndex,
    uniformRenderObjectSendModelDataMap,
    renderObjectSendModelDataArr,
  )
  |> ignore;
  HandleUniformRenderObjectMaterialService.setToUniformSendMap(
    shaderIndex,
    uniformRenderObjectSendMaterialDataMap,
    renderObjectSendMaterialDataArr,
  )
  |> ignore;
  HandleUniformShaderNoCachableService.setToUniformSendMap(
    shaderIndex,
    uniformShaderSendNoCachableDataMap,
    shaderSendNoCachableDataArr,
  )
  |> ignore;
  HandleUniformShaderCachableService.setToUniformSendMap(
    shaderIndex,
    uniformShaderSendCachableDataMap,
    shaderSendCachableDataArr,
  )
  |> ignore;
  HandleUniformShaderCachableFunctionService.setToUniformSendMap(
    shaderIndex,
    uniformShaderSendCachableFunctionDataMap,
    shaderSendCachableFunctionDataArr,
  )
  |> ignore;
  HandleUniformInstanceNoCachableService.setToUniformSendMap(
    shaderIndex,
    uniformInstanceSendNoCachableDataMap,
    instanceSendNoCachableDataArr,
  )
  |> ignore;

  HandleUniformInstanceNoCachableService.setToUniformSendMap(
    shaderIndex,
    uniformInstanceSendNoCachableDataMap,
    instanceSendNoCachableDataArr,
  )
  |> ignore;

  HandleNoMaterialShaderUniformConfigDataService.setToUniformSendMap(
    shaderIndex,
    uniformNoMaterialShaderSendCachableDataMap,
    noMaterialShaderSendCachableDataArr,
  )
  |> ignore;
};

let readUniformSendData =
    (
      shaderLibDataArr,
      (gl, program),
      readUniformsFunc,
      (uniformLocationMap, uniformCacheMap),
    ) =>
  shaderLibDataArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. sendDataArrTuple, {variables}) =>
         variables |> OptionService.isJsonSerializedValueNone ?
           sendDataArrTuple :
           {
             let {uniforms} =
               variables |> OptionService.unsafeGetJsonSerializedValue;

             readUniformsFunc(.
               (gl, program, uniformLocationMap, uniformCacheMap),
               sendDataArrTuple,
               uniforms,
             );
           },
       {
         renderObjectSendModelDataArr: [||],
         renderObjectSendMaterialDataArr: [||],
         shaderSendNoCachableDataArr: [||],
         shaderSendCachableDataArr: [||],
         shaderSendCachableFunctionDataArr: [||],
         instanceSendNoCachableDataArr: [||],
         noMaterialShaderSendCachableDataArr: [||],
       },
     );

let _checkShouldNotAddBefore = (shaderIndex, glslSenderRecord) =>
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|not be added before|j},
                ~actual={j|be|j},
              ),
              () =>
              glslSenderRecord.uniformRenderObjectSendModelDataMap
              |> WonderCommonlib.MutableSparseMapService.get(shaderIndex)
              |> assertNotExist
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

let addUniformSendData =
    (
      gl,
      (program: program, shaderIndex: int, shaderLibDataArr: shaderLibs),
      readUniformSendDataFunc,
      (glslSenderRecord, glslLocationRecord),
    ) => {
  /* _checkShouldNotAddBefore(shaderIndex, glslSenderRecord); */
  let uniformLocationMap =
    HandleShaderConfigDataMapService.getOrCreateHashMap(
      glslLocationRecord
      |> AllGLSLLocationService.getUniformLocationMap(shaderIndex),
    );
  (
    readUniformSendDataFunc(.
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
    |> AllGLSLLocationService.setUniformLocationMap(
         shaderIndex,
         uniformLocationMap,
       ),
  );
};