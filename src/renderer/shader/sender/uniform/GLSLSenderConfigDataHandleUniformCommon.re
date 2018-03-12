open GlType;

open Gl;

open GameObjectType;

open StateDataType;

open GLSLSenderStateUtils;

open GLSLSenderSendDataUtils;

open GLSLSenderConfigDataHandleShaderDataCommon;

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
  GLSLSenderConfigDataHandleUniformRenderObjectModelCommon.setToUniformSendMap(
    shaderIndex,
    uniformRenderObjectSendModelDataMap,
    renderObjectSendModelDataArr
  )
  |> ignore;
  GLSLSenderConfigDataHandleUniformRenderObjectMaterialCommon.setToUniformSendMap(
    shaderIndex,
    uniformRenderObjectSendMaterialDataMap,
    renderObjectSendMaterialDataArr
  )
  |> ignore;
  GLSLSenderConfigDataHandleUniformShaderNoCachableCommon.setToUniformSendMap(
    shaderIndex,
    uniformShaderSendNoCachableDataMap,
    shaderSendNoCachableDataArr
  )
  |> ignore;
  GLSLSenderConfigDataHandleUniformShaderCachableCommon.setToUniformSendMap(
    shaderIndex,
    uniformShaderSendCachableDataMap,
    shaderSendCachableDataArr
  )
  |> ignore;
  GLSLSenderConfigDataHandleUniformShaderCachableFunctionCommon.setToUniformSendMap(
    shaderIndex,
    uniformShaderSendCachableFunctionDataMap,
    shaderSendCachableFunctionDataArr
  )
  |> ignore;
  GLSLSenderConfigDataHandleUniformInstanceNoCachableCommon.setToUniformSendMap(
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
               GLSLSenderConfigDataHandleCameraUniformCommon.addCameraSendData(
                 (
                   field,
                   GLSLLocationSystem.getUniformLocation(program, name, uniformLocationMap, gl),
                   name,
                   type_,
                   uniformCacheMap
                 ),
                 sendDataArrTuple
               )
             | "basicMaterial" =>
               GLSLSenderConfigDataHandleMaterialUniformCommon.addBasicMaterialSendData(
                 (
                   field,
                   GLSLLocationSystem.getUniformLocation(program, name, uniformLocationMap, gl),
                   name,
                   type_,
                   uniformCacheMap
                 ),
                 sendDataArrTuple
               )
             | "lightMaterial" =>
               GLSLSenderConfigDataHandleMaterialUniformCommon.addLightMaterialSendData(
                 (
                   field,
                   GLSLLocationSystem.getUniformLocation(program, name, uniformLocationMap, gl),
                   name,
                   type_,
                   uniformCacheMap
                 ),
                 sendDataArrTuple
               )
             | "ambientLight" =>
               GLSLSenderConfigDataHandleLightUniformCommon.addAmbientLightSendData(
                 (field, program, uniformCacheMap, uniformLocationMap),
                 sendDataArrTuple
               )
             | "directionLight" =>
               GLSLSenderConfigDataHandleLightUniformCommon.addDirectionLightSendData(
                 (field, program, uniformCacheMap, uniformLocationMap),
                 sendDataArrTuple
               )
             | "pointLight" =>
               GLSLSenderConfigDataHandleLightUniformCommon.addPointLightSendData(
                 (field, program, uniformCacheMap, uniformLocationMap),
                 sendDataArrTuple
               )
             | "model" =>
               GLSLSenderConfigDataHandleMoodelUniformCommon.addModelSendData(
                 (
                   field,
                   GLSLLocationSystem.getUniformLocation(program, name, uniformLocationMap, gl),
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
                getGLSLSenderData(state).uniformRenderObjectSendModelDataMap
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
  let record = getGLSLSenderData(state);
  let uniformLocationMap =
    getOrCreateHashMap(state |> GLSLLocationSystem.getUniformLocationMap(shaderIndex));
  _readUniformSendData(
    shaderLibDataArr,
    gl,
    program,
    (
      uniformLocationMap,
      getOrCreateHashMap(record |> GLSLSenderSendDataUtils.getCacheMap(shaderIndex))
    )
  )
  |> _setToUniformSendMap(shaderIndex, record, state)
  |> GLSLLocationSystem.setUniformLocationMap(shaderIndex, uniformLocationMap)
};

let unsafeGetUniformRenderObjectSendMaterialData = GLSLSenderConfigDataHandleUniformRenderObjectMaterialCommon.unsafeGetUniformSendData;

let unsafeGetUniformRenderObjectSendModelData = GLSLSenderConfigDataHandleUniformRenderObjectModelCommon.unsafeGetUniformSendData;

let unsafeGetUniformShaderSendNoCachableData = GLSLSenderConfigDataHandleUniformShaderNoCachableCommon.unsafeGetUniformSendData;

let unsafeGetUniformShaderSendCachableData = GLSLSenderConfigDataHandleUniformShaderCachableCommon.unsafeGetUniformSendData;

let unsafeGetUniformShaderSendCachableFunctionData = GLSLSenderConfigDataHandleUniformShaderCachableFunctionCommon.unsafeGetUniformSendData;

let unsafeGetUniformInstanceSendNoCachableData = GLSLSenderConfigDataHandleUniformInstanceNoCachableCommon.unsafeGetUniformSendData;