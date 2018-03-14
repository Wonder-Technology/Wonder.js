open GlType;

open Gl;

open GameObjectType;

open StateDataType;

open SendGLSLDataMainService;

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
  HandleUniformRenderObjectModelMainService.setToUniformSendMap(
    shaderIndex,
    uniformRenderObjectSendModelDataMap,
    renderObjectSendModelDataArr
  )
  |> ignore;
  HandleUniformRenderObjectMaterialMainService.setToUniformSendMap(
    shaderIndex,
    uniformRenderObjectSendMaterialDataMap,
    renderObjectSendMaterialDataArr
  )
  |> ignore;
  HandleUniformShaderNoCachableMainService.setToUniformSendMap(
    shaderIndex,
    uniformShaderSendNoCachableDataMap,
    shaderSendNoCachableDataArr
  )
  |> ignore;
  HandleUniformShaderCachableMainService.setToUniformSendMap(
    shaderIndex,
    uniformShaderSendCachableDataMap,
    shaderSendCachableDataArr
  )
  |> ignore;
  HandleUniformShaderCachableFunctionMainService.setToUniformSendMap(
    shaderIndex,
    uniformShaderSendCachableFunctionDataMap,
    shaderSendCachableFunctionDataArr
  )
  |> ignore;
  HandleUniformInstanceNoCachableMainService.setToUniformSendMap(
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
               HandleCameraUniformConfigDataMainService.addCameraSendData(
                 (
                   field,
                   GLSLLocationMainService.getUniformLocation(program, name, uniformLocationMap, gl),
                   name,
                   type_,
                   uniformCacheMap
                 ),
                 sendDataArrTuple
               )
             | "basicMaterial" =>
               HandleMaterialUniformConfigDataMainService.addBasicMaterialSendData(
                 (
                   field,
                   GLSLLocationMainService.getUniformLocation(program, name, uniformLocationMap, gl),
                   name,
                   type_,
                   uniformCacheMap
                 ),
                 sendDataArrTuple
               )
             | "lightMaterial" =>
               HandleMaterialUniformConfigDataMainService.addLightMaterialSendData(
                 (
                   field,
                   GLSLLocationMainService.getUniformLocation(program, name, uniformLocationMap, gl),
                   name,
                   type_,
                   uniformCacheMap
                 ),
                 sendDataArrTuple
               )
             | "ambientLight" =>
               HandleLightUniformConfigDataMainService.addAmbientLightSendData(
                 (field, program, uniformCacheMap, uniformLocationMap),
                 sendDataArrTuple
               )
             | "directionLight" =>
               HandleLightUniformConfigDataMainService.addDirectionLightSendData(
                 (field, program, uniformCacheMap, uniformLocationMap),
                 sendDataArrTuple
               )
             | "pointLight" =>
               HandleLightUniformConfigDataMainService.addPointLightSendData(
                 (field, program, uniformCacheMap, uniformLocationMap),
                 sendDataArrTuple
               )
             | "model" =>
               HandleModelUniformConfigDataMainService.addModelSendData(
                 (
                   field,
                   GLSLLocationMainService.getUniformLocation(program, name, uniformLocationMap, gl),
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
      state |> GLSLLocationMainService.getUniformLocationMap(shaderIndex)
    );
  _readUniformSendData(
    shaderLibDataArr,
    gl,
    program,
    (
      uniformLocationMap,
      HandleShaderConfigDataMapService.getOrCreateHashMap(
        record |> SendGLSLDataMainService.getCacheMap(shaderIndex)
      )
    )
  )
  |> _setToUniformSendMap(shaderIndex, record, state)
  |> GLSLLocationMainService.setUniformLocationMap(shaderIndex, uniformLocationMap)
};