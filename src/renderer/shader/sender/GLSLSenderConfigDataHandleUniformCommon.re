open GlType;

open Gl;

open GameObjectType;

open StateDataType;

open Contract;

open GLSLSenderStateUtils;

open GLSLSenderSendDataUtils;

open GLSLSenderConfigDataHandleShaderDataCommon;

let _getModelMNoCacheableData =
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
      _getModelMNoCacheableData
    )
  | "instance_mMatrix" =>
    GLSLSenderConfigDataHandleUniformInstanceCommon.addUniformSendDataByType(
      (type_, pos),
      sendDataListTuple,
      _getModelMNoCacheableData
    )
  | _ => ExceptionHandleSystem.throwMessage({j|unknow field:$field|j})
  };

let _setToUniformSendMap =
    (
      shaderIndex,
      {
        uniformSendNoCacheableDataMap,
        uniformSendCacheableDataMap,
        shaderUniformSendNoCacheableDataMap,
        instanceUniformSendNoCacheableDataMap
      },
      state,
      (
        sendNoCacheableDataList,
        sendCacheableDataList,
        shaderSendNoCacheableDataList,
        instanceSendNoCacheableDataList
      )
    ) => {
  GLSLSenderConfigDataHandleUniformNoCacheCommon.setToUniformSendMap(
    shaderIndex,
    uniformSendNoCacheableDataMap,
    sendNoCacheableDataList
  )
  |> ignore;
  GLSLSenderConfigDataHandleUniformCacheCommon.setToUniformSendMap(
    shaderIndex,
    uniformSendCacheableDataMap,
    sendCacheableDataList
  )
  |> ignore;
  GLSLSenderConfigDataHandleUniformShaderCommon.setToUniformSendMap(
    shaderIndex,
    shaderUniformSendNoCacheableDataMap,
    shaderSendNoCacheableDataList
  )
  |> ignore;
  GLSLSenderConfigDataHandleUniformInstanceCommon.setToUniformSendMap(
    shaderIndex,
    instanceUniformSendNoCacheableDataMap,
    instanceSendNoCacheableDataList
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
            getGLSLSenderData(state).uniformSendNoCacheableDataMap
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

let getUniformSendNoCacheableData = GLSLSenderConfigDataHandleUniformNoCacheCommon.getUniformSendData;

let getUniformSendCacheableData = GLSLSenderConfigDataHandleUniformCacheCommon.getUniformSendData;

let getShaderUniformSendNoCacheableData = GLSLSenderConfigDataHandleUniformShaderCommon.getUniformSendData;

let getInstanceUniformSendNoCacheableData = GLSLSenderConfigDataHandleUniformInstanceCommon.getUniformSendData;