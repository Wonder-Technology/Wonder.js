open GlType;

open Gl;

open GameObjectType;

open StateDataType;

open GLSLSenderStateUtils;

open GLSLSenderSendDataUtils;

open GLSLSenderConfigDataHandleShaderDataCommon;

open RenderJobConfigType;

let _getModelMNoCachableData =
  [@bs]
  (
    (transform, state: StateDataType.state) =>
      TransformAdmin.getLocalToWorldMatrixTypeArray(transform, state)
  );

let _addCameraSendData = ((field, pos, type_), sendDataArrTuple) =>
  switch field {
  | "vMatrix" =>
    GLSLSenderConfigDataHandleUniformShaderNoCacheCommon.addUniformSendDataByType(
      (type_, pos),
      sendDataArrTuple,
      RenderDataSystem.getCameraVMatrixDataFromState
    )
  | "pMatrix" =>
    GLSLSenderConfigDataHandleUniformShaderNoCacheCommon.addUniformSendDataByType(
      (type_, pos),
      sendDataArrTuple,
      RenderDataSystem.getCameraPMatrixDataFromState
    )
  /* TODO test */
  | "position" =>
    GLSLSenderConfigDataHandleUniformShaderNoCacheCommon.addUniformSendDataByType(
      (type_, pos),
      sendDataArrTuple,
      RenderDataSystem.getCameraPositionDataFromState
    )
  | "normalMatrix" =>
    GLSLSenderConfigDataHandleUniformShaderNoCacheCommon.addUniformSendDataByType(
      (type_, pos),
      sendDataArrTuple,
      RenderDataSystem.getCameraNormalMatrixDataFromState
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addCameraSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let _addAmbientLightSendData =
    ((field, program, uniformCacheMap, uniformLocationMap), sendDataArrTuple) =>
  switch field {
  | "send" =>
    GLSLSenderConfigDataHandleUniformShaderCacheFunctionCommon.addUniformSendDataByType(
      (program, uniformCacheMap, uniformLocationMap),
      sendDataArrTuple,
      SendAmbientLightHandle.send
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addAmbientLightSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let _addBasicMaterialSendData = ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch field {
  | "color" =>
    GLSLSenderConfigDataHandleUniformRenderObjectMaterialCommon.addUniformSendDataByType(
      (uniformCacheMap, name, pos),
      sendDataArrTuple,
      (BasicMaterialAdminAci.unsafeGetColor, sendFloat3)
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addBasicMaterialSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let _addLightMaterialSendData = ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch field {
  | "diffuseColor" =>
    GLSLSenderConfigDataHandleUniformRenderObjectMaterialCommon.addUniformSendDataByType(
      (uniformCacheMap, name, pos),
      sendDataArrTuple,
      (LightMaterialAdminAci.unsafeGetDiffuseColor, sendFloat3)
    )
  | "specularColor" =>
    GLSLSenderConfigDataHandleUniformRenderObjectMaterialCommon.addUniformSendDataByType(
      (uniformCacheMap, name, pos),
      sendDataArrTuple,
      (LightMaterialAdminAci.unsafeGetSpecularColor, sendFloat3)
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addLightMaterialSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let _addModelSendData = ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch field {
  | "mMatrix" =>
    GLSLSenderConfigDataHandleUniformRenderObjectModelCommon.addUniformSendDataByType(
      pos,
      sendDataArrTuple,
      (_getModelMNoCachableData, sendMatrix4)
    )
  | "instance_mMatrix" =>
    GLSLSenderConfigDataHandleUniformInstanceCommon.addUniformSendDataByType(
      (type_, pos),
      sendDataArrTuple,
      _getModelMNoCachableData
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addModelSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let _setToUniformSendMap =
    (
      shaderIndex,
      {
        uniformRenderObjectSendModelDataMap,
        uniformRenderObjectSendMaterialDataMap,
        uniformShaderSendNoCachableDataMap,
        uniformShaderSendCachableFunctionDataMap,
        uniformInstanceSendNoCachableDataMap
      },
      state,
      (
        renderObjectSendModelDataArr,
        renderObjectSendMaterialDataArr,
        shaderSendNoCachableDataArr,
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
  GLSLSenderConfigDataHandleUniformShaderNoCacheCommon.setToUniformSendMap(
    shaderIndex,
    uniformShaderSendNoCachableDataMap,
    shaderSendNoCachableDataArr
  )
  |> ignore;
  GLSLSenderConfigDataHandleUniformShaderCacheFunctionCommon.setToUniformSendMap(
    shaderIndex,
    uniformShaderSendCachableFunctionDataMap,
    shaderSendCachableFunctionDataArr
  )
  |> ignore;
  GLSLSenderConfigDataHandleUniformInstanceCommon.setToUniformSendMap(
    shaderIndex,
    uniformInstanceSendNoCachableDataMap,
    instanceSendNoCachableDataArr
  )
  |> ignore;
  state
};

let _readUniforms =
    ((gl, program, uniformLocationMap, uniformCacheMap), sendDataArrTuple, uniforms) =>
  switch uniforms {
  | None => sendDataArrTuple
  | Some(uniforms) =>
    uniforms
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs]
         (
           (sendDataArrTuple, {name, field, type_, from}) =>
             switch from {
             | "camera" =>
               _addCameraSendData(
                 (
                   field,
                   GLSLLocationSystem.getUniformLocation(program, name, uniformLocationMap, gl),
                   type_
                 ),
                 sendDataArrTuple
               )
             | "basicMaterial" =>
               _addBasicMaterialSendData(
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
               _addLightMaterialSendData(
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
               _addAmbientLightSendData(
                 (field, program, uniformCacheMap, uniformLocationMap),
                 sendDataArrTuple
               )
             | "model" =>
               _addModelSendData(
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
       ([||], [||], [||], [||], [||])
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
  let data = getGLSLSenderData(state);
  let uniformLocationMap =
    getOrCreateHashMap(state |> GLSLLocationSystem.getUniformLocationMap(shaderIndex));
  _readUniformSendData(
    shaderLibDataArr,
    gl,
    program,
    (
      uniformLocationMap,
      getOrCreateHashMap(data |> GLSLSenderSendDataUtils.getCacheMap(shaderIndex))
    )
  )
  |> _setToUniformSendMap(shaderIndex, data, state)
  |> GLSLLocationSystem.setUniformLocationMap(shaderIndex, uniformLocationMap)
};

let unsafeGetUniformRenderObjectSendMaterialData = GLSLSenderConfigDataHandleUniformRenderObjectMaterialCommon.unsafeGetUniformSendData;

let unsafeGetUniformRenderObjectSendModelData = GLSLSenderConfigDataHandleUniformRenderObjectModelCommon.unsafeGetUniformSendData;

let unsafeGetUniformShaderSendNoCachableData = GLSLSenderConfigDataHandleUniformShaderNoCacheCommon.unsafeGetUniformSendData;

let unsafeGetUniformShaderSendCachableFunctionData = GLSLSenderConfigDataHandleUniformShaderCacheFunctionCommon.unsafeGetUniformSendData;

let unsafeGetUniformInstanceSendNoCachableData = GLSLSenderConfigDataHandleUniformInstanceCommon.unsafeGetUniformSendData;