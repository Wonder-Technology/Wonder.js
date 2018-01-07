open GlType;

open Gl;

open GameObjectType;

open StateDataType;

open Contract;

open GLSLSenderStateUtils;

open GLSLSenderSendDataUtils;

open GLSLSenderConfigDataHandleShaderDataCommon;

let _getModelMNoCachableData =
  [@bs]
  (
    (transform, state: StateDataType.state) =>
      TransformAdmin.getLocalToWorldMatrixTypeArray(transform, state)
  );

let _addUniformSendDataByType =
    ((type_, shaderCacheMap, name, pos), sendDataListTuple, getDataFunc) =>
  /* todo remove Obj.magic? */
  switch type_ {
  | "mat4" =>
    GLSLSenderConfigDataHandleUniformNoCacheCommon.addUniformSendDataByType(
      pos,
      sendDataListTuple,
      getDataFunc
    )
  | "vec3" =>
    GLSLSenderConfigDataHandleUniformCacheCommon.addUniformSendDataByType(
      (shaderCacheMap, name, pos),
      sendDataListTuple,
      getDataFunc
    )
  | _ => ExceptionHandleSystem.throwMessage({j|unknow type:$type_|j})
  };

let _addCameraSendData = ((field, pos, type_), sendDataListTuple) =>
  switch field {
  | "vMatrix" =>
    GLSLSenderConfigDataHandleUniformShaderCommon.addUniformSendDataByType(
      (type_, pos),
      sendDataListTuple,
      RenderDataSystem.getCameraVMatrixDataFromState
    )
  | "pMatrix" =>
    GLSLSenderConfigDataHandleUniformShaderCommon.addUniformSendDataByType(
      (type_, pos),
      sendDataListTuple,
      RenderDataSystem.getCameraPMatrixDataFromState
    )
  | _ => ExceptionHandleSystem.throwMessage({j|unknow field:$field|j})
  };

let _addMaterialSendData = ((field, pos, name, type_, uniformCacheMap), sendDataListTuple) =>
  switch field {
  | "color" =>
    _addUniformSendDataByType(
      (type_, uniformCacheMap, name, pos),
      sendDataListTuple,
      MaterialAdminAci.unsafeGetColor
    )
  | _ => ExceptionHandleSystem.throwMessage({j|unknow field:$field|j})
  };

let _addModelSendData = ((field, pos, name, type_, uniformCacheMap), sendDataListTuple) =>
  switch field {
  | "mMatrix" =>
    _addUniformSendDataByType(
      (type_, uniformCacheMap, name, pos),
      sendDataListTuple,
      _getModelMNoCachableData
    )
  | "instance_mMatrix" =>
    GLSLSenderConfigDataHandleUniformInstanceCommon.addUniformSendDataByType(
      (type_, pos),
      sendDataListTuple,
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
        sendNoCachableDataList,
        sendCachableDataList,
        shaderSendNoCachableDataList,
        instanceSendNoCachableDataList
      )
    ) => {
  GLSLSenderConfigDataHandleUniformNoCacheCommon.setToUniformSendMap(
    shaderIndex,
    uniformSendNoCachableDataMap,
    sendNoCachableDataList
  )
  |> ignore;
  GLSLSenderConfigDataHandleUniformCacheCommon.setToUniformSendMap(
    shaderIndex,
    uniformSendCachableDataMap,
    sendCachableDataList
  )
  |> ignore;
  GLSLSenderConfigDataHandleUniformShaderCommon.setToUniformSendMap(
    shaderIndex,
    shaderUniformSendNoCachableDataMap,
    shaderSendNoCachableDataList
  )
  |> ignore;
  GLSLSenderConfigDataHandleUniformInstanceCommon.setToUniformSendMap(
    shaderIndex,
    instanceUniformSendNoCachableDataMap,
    instanceSendNoCachableDataList
  )
  |> ignore;
  state
};

let _readUniforms =
    ((gl, program, uniformLocationMap, uniformCacheMap), sendDataListTuple, uniforms) =>
  switch uniforms {
  | None => sendDataListTuple
  | Some(uniforms) =>
    uniforms
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs]
         (
           (sendDataListTuple, {name, field, type_, from}) => {
             let pos =
               GLSLLocationSystem.getUniformLocation(program, name, uniformLocationMap, gl);
             switch from {
             | "camera" => _addCameraSendData((field, pos, type_), sendDataListTuple)
             | "material" =>
               _addMaterialSendData((field, pos, name, type_, uniformCacheMap), sendDataListTuple)
             | "model" =>
               _addModelSendData((field, pos, name, type_, uniformCacheMap), sendDataListTuple)
             | _ => ExceptionHandleSystem.throwMessage({j|unknow from:$from|j})
             }
           }
         ),
         sendDataListTuple
       )
  };

let _readUniformSendData = (shaderLibDataArr, gl, program, (uniformLocationMap, uniformCacheMap)) =>
  shaderLibDataArr
  |> ArraySystem.reduceOneParam(
       [@bs]
       (
         (sendDataListTuple, {variables}) =>
           switch variables {
           | None => sendDataListTuple
           | Some({uniforms}) =>
             _readUniforms(
               (gl, program, uniformLocationMap, uniformCacheMap),
               sendDataListTuple,
               uniforms
             )
           }
       ),
       ([], [], [], [])
     );

let _checkShouldNotAddBefore = (shaderIndex, state) =>
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "shouldn't be added before",
          () =>
            getGLSLSenderData(state).uniformSendNoCachableDataMap
            |> WonderCommonlib.SparseMapSystem.get(shaderIndex)
            |> assertNotExist
        )
      )
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

let getUniformSendNoCachableData = GLSLSenderConfigDataHandleUniformNoCacheCommon.getUniformSendData;

let getUniformSendCachableData = GLSLSenderConfigDataHandleUniformCacheCommon.getUniformSendData;

let getShaderUniformSendNoCachableData = GLSLSenderConfigDataHandleUniformShaderCommon.getUniformSendData;

let getInstanceUniformSendNoCachableData = GLSLSenderConfigDataHandleUniformInstanceCommon.getUniformSendData;