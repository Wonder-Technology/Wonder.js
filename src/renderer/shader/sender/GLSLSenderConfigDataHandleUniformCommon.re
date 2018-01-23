open GlType;

open Gl;

open GameObjectType;

open StateDataType;

open GLSLSenderStateUtils;

open GLSLSenderSendDataUtils;

open GLSLSenderConfigDataHandleShaderDataCommon;

open RenderConfigType;

let _getModelMNoCachableData =
  [@bs]
  (
    (transform, state: StateDataType.state) =>
      TransformAdmin.getLocalToWorldMatrixTypeArray(transform, state)
  );

let _addUniformSendDataByType = ((type_, shaderCacheMap, name, pos), sendDataArrTuple, getDataFunc) =>
  /* TODO remove Obj.magic? */
  switch type_ {
  | "mat4" =>
    GLSLSenderConfigDataHandleUniformNoCacheCommon.addUniformSendDataByType(
      pos,
      sendDataArrTuple,
      getDataFunc
    )
  | "vec3" =>
    GLSLSenderConfigDataHandleUniformCacheCommon.addUniformSendDataByType(
      (shaderCacheMap, name, pos),
      sendDataArrTuple,
      getDataFunc
    )
  | _ => ExceptionHandleSystem.throwMessage({j|unknow type:$type_|j})
  };

let _addCameraSendData = ((field, pos, type_), sendDataArrTuple) =>
  switch field {
  | "vMatrix" =>
    GLSLSenderConfigDataHandleUniformShaderCommon.addUniformSendDataByType(
      (type_, pos),
      sendDataArrTuple,
      RenderDataSystem.getCameraVMatrixDataFromState
    )
  | "pMatrix" =>
    GLSLSenderConfigDataHandleUniformShaderCommon.addUniformSendDataByType(
      (type_, pos),
      sendDataArrTuple,
      RenderDataSystem.getCameraPMatrixDataFromState
    )
  | _ => ExceptionHandleSystem.throwMessage({j|unknow field:$field|j})
  };

let _addMaterialSendData = ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch field {
  | "color" =>
    _addUniformSendDataByType(
      (type_, uniformCacheMap, name, pos),
      sendDataArrTuple,
      MaterialAdminAci.unsafeGetColor
    )
  | _ => ExceptionHandleSystem.throwMessage({j|unknow field:$field|j})
  };

let _addModelSendData = ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch field {
  | "mMatrix" =>
    _addUniformSendDataByType(
      (type_, uniformCacheMap, name, pos),
      sendDataArrTuple,
      _getModelMNoCachableData
    )
  | "instance_mMatrix" =>
    GLSLSenderConfigDataHandleUniformInstanceCommon.addUniformSendDataByType(
      (type_, pos),
      sendDataArrTuple,
      _getModelMNoCachableData
    )
  | _ => ExceptionHandleSystem.throwMessage({j|unknow field:$field|j})
  };

let _setToUniformSendMap =
    (
      shaderIndex,
      {
        uniformSendNoCachableDataMap,
        uniformSendCachableDataMap,
        shaderUniformSendNoCachableDataMap,
        instanceUniformSendNoCachableDataMap
      },
      state,
      (
        sendNoCachableDataArr,
        sendCachableDataArr,
        shaderSendNoCachableDataArr,
        instanceSendNoCachableDataArr
      )
    ) => {
  GLSLSenderConfigDataHandleUniformNoCacheCommon.setToUniformSendMap(
    shaderIndex,
    uniformSendNoCachableDataMap,
    sendNoCachableDataArr
  )
  |> ignore;
  GLSLSenderConfigDataHandleUniformCacheCommon.setToUniformSendMap(
    shaderIndex,
    uniformSendCachableDataMap,
    sendCachableDataArr
  )
  |> ignore;
  GLSLSenderConfigDataHandleUniformShaderCommon.setToUniformSendMap(
    shaderIndex,
    shaderUniformSendNoCachableDataMap,
    shaderSendNoCachableDataArr
  )
  |> ignore;
  GLSLSenderConfigDataHandleUniformInstanceCommon.setToUniformSendMap(
    shaderIndex,
    instanceUniformSendNoCachableDataMap,
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
           (sendDataArrTuple, {name, field, type_, from}) => {
             let pos =
               GLSLLocationSystem.getUniformLocation(program, name, uniformLocationMap, gl);
             switch from {
             | "camera" => _addCameraSendData((field, pos, type_), sendDataArrTuple)
             | "material" =>
               _addMaterialSendData((field, pos, name, type_, uniformCacheMap), sendDataArrTuple)
             | "model" =>
               _addModelSendData((field, pos, name, type_, uniformCacheMap), sendDataArrTuple)
             | _ => ExceptionHandleSystem.throwMessage({j|unknow from:$from|j})
             }
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
       ([||], [||], [||], [||])
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
                getGLSLSenderData(state).uniformSendNoCachableDataMap
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

let unsafeGetUniformSendNoCachableData = GLSLSenderConfigDataHandleUniformNoCacheCommon.unsafeGetUniformSendData;

let unsafeGetUniformSendCachableData = GLSLSenderConfigDataHandleUniformCacheCommon.unsafeGetUniformSendData;

let unsafeGetShaderUniformSendNoCachableData = GLSLSenderConfigDataHandleUniformShaderCommon.unsafeGetUniformSendData;

let unsafeGetInstanceUniformSendNoCachableData = GLSLSenderConfigDataHandleUniformInstanceCommon.unsafeGetUniformSendData;