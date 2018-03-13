open GlType;

open Gl;

open GameObjectType;

open StateDataType;

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
      state,
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
  |> ignore;
  state
};

let _readUniforms =
    (
      (gl, program, uniformLocationMap, uniformCacheMap: GLSLSenderType.shaderCacheMap),
      sendDataArrTuple,
      uniforms
    ) =>
  switch uniforms {
  /* TODO use record instead of tuple */
  | None => sendDataArrTuple
  | Some(uniforms) =>
    uniforms
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs]
         (
           (sendDataArrTuple, {name, field, type_, from}) =>
             switch from {
             | "camera" =>
               HandleCameraUniformConfigDataService.addCameraSendData(
                 (
                   field,
                   GLSLLocationService.getUniformLocation(program, name, uniformLocationMap, gl),
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
                   GLSLLocationService.getUniformLocation(program, name, uniformLocationMap, gl),
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
                   GLSLLocationService.getUniformLocation(program, name, uniformLocationMap, gl),
                   name,
                   type_,
                   uniformCacheMap
                 ),
                 sendDataArrTuple
               )
             | "ambientLight" =>
               HandleLightUniformConfigDataService.addAmbientLightSendData(
                 (field, program, uniformCacheMap, uniformLocationMap),
                 sendDataArrTuple
               )
             | "directionLight" =>
               HandleLightUniformConfigDataService.addDirectionLightSendData(
                 (field, program, uniformCacheMap, uniformLocationMap),
                 sendDataArrTuple
               )
             | "pointLight" =>
               HandleLightUniformConfigDataService.addPointLightSendData(
                 (field, program, uniformCacheMap, uniformLocationMap),
                 sendDataArrTuple
               )
             | "model" =>
               HandleModelUniformConfigDataService.addModelSendData(
                 (
                   field,
                   GLSLLocationService.getUniformLocation(program, name, uniformLocationMap, gl),
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
  };

let _readUniformSendData = (shaderLibDataArr, gl, program, (uniformLocationMap, uniformCacheMap)) =>
  shaderLibDataArr
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs]
       (
         (sendDataArrTuple, {variables}) =>
           switch variables {
           | None => sendDataArrTuple
           | Some({uniforms}) =>
             _readUniforms(
               (gl, program, uniformLocationMap, uniformCacheMap),
               sendDataArrTuple,
               uniforms
             )
           }
       ),
       ([||], [||], [||], [||], [||], [||])
     );

let _checkShouldNotAddBefore = (shaderIndex, state) =>
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(~expect={j|not be added before|j}, ~actual={j|be|j}),
              () =>
                state.glslSenderRecord.uniformRenderObjectSendModelDataMap
                |> WonderCommonlib.SparseMapSystem.get(shaderIndex)
                |> assertNotExist
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );

let addUniformSendData =
    (
      gl,
      (program: program, shaderIndex: int, shaderLibDataArr: shader_libs),
      state: StateDataType.state
    )
    : StateDataType.state => {
  _checkShouldNotAddBefore(shaderIndex, state);
  let record = state.glslSenderRecord;
  let uniformLocationMap =
    HandleShaderConfigDataMapService.getOrCreateHashMap(
      state |> GLSLLocationService.getUniformLocationMap(shaderIndex)
    );
  _readUniformSendData(
    shaderLibDataArr,
    gl,
    program,
    (
      uniformLocationMap,
      HandleShaderConfigDataMapService.getOrCreateHashMap(
        record |> SendGLSLDataService.getCacheMap(shaderIndex)
      )
    )
  )
  |> _setToUniformSendMap(shaderIndex, record, state)
  |> GLSLLocationService.setUniformLocationMap(shaderIndex, uniformLocationMap)
};