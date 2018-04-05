open MainStateDataType;

open VboBufferType;

let _directlySendAttributeData =
    (gl, (shaderIndex, geometryIndex, geometryType), {vboBufferRecord, glslSenderRecord } as state) => {
  let (
    (vertexBufferMap, normalBufferMap, elementArrayBufferMap),
    (getVerticesFunc, getNormalsFunc, getIndicesFunc)
  ) =
    CurrentComponentDataMapSendAttributeService.getCurrentGeometryBufferMapAndGetPointsFuncs(
      geometryType,
      vboBufferRecord
    );
  glslSenderRecord
  |> HandleAttributeConfigDataRenderService.unsafeGetAttributeSendData(shaderIndex)
  |> ReduceStateMainService.reduceState(
       [@bs]
       (
         (state, {pos, size, buffer, sendFunc}) => {
           let arrayBuffer =
             switch buffer {
             | "vertex" =>
               ArrayBufferMainService.getOrCreateBuffer(
                 gl,
                 (geometryIndex, vertexBufferMap),
                 [@bs] getVerticesFunc,
                 state
               )
             | "normal" =>
               ArrayBufferMainService.getOrCreateBuffer(
                 gl,
                 (geometryIndex, normalBufferMap),
                 [@bs] getNormalsFunc,
                 state
               )
             | "index" =>
               ElementArrayBufferMainService.getOrCreateBuffer(
                 gl,
                 (geometryIndex, elementArrayBufferMap),
                 [@bs] getIndicesFunc,
                 state
               )
             | _ =>
               WonderLog.Log.fatal(
                 WonderLog.Log.buildFatalMessage(
                   ~title="_sendAttributeData",
                   ~description={j|unknonw buffer: $buffer|j},
                   ~reason="",
                   ~solution={j||j},
                   ~params={j||j}
                 )
               )
             };
           [@bs] sendFunc(gl, (size, pos), arrayBuffer, state)
         }
       ),
       state
     )
};

let _sendAttributeData = (gl, (shaderIndex, geometryIndex, geometryType) as indexTuple, state) => {
  let {lastSendGeometry} as record = state.glslSenderRecord;
  switch lastSendGeometry {
  | Some((lastSendGeometryIndex, lastSendGeometryType))
      when lastSendGeometryIndex === geometryIndex && lastSendGeometryType === geometryType => state
  | _ =>
    record.lastSendGeometry = Some((geometryIndex, geometryType));
    _directlySendAttributeData(gl, indexTuple, state)
  }
};

let _sendUniformRenderObjectModelData = (gl, shaderIndex, transformIndex, state) =>
  state
  |> HandleUniformRenderObjectModelService.unsafeGetUniformSendData(shaderIndex)
  |> ReduceStateMainService.reduceState(
       [@bs]
       (
         (state, {pos, getDataFunc, sendDataFunc}: uniformRenderObjectSendModelData) => {
           [@bs] sendDataFunc(gl, pos, [@bs] getDataFunc(transformIndex, state));
           state
         }
       ),
       state
     );

let _sendUniformRenderObjectMaterialData = (gl, shaderIndex, materialIndex, state) =>
  state
  |> HandleUniformRenderObjectMaterialService.unsafeGetUniformSendData(shaderIndex)
  |> ReduceStateMainService.reduceState(
       [@bs]
       (
         (
           state,
           {shaderCacheMap, name, pos, getDataFunc, sendDataFunc}: uniformRenderObjectSendMaterialData
         ) => {
           [@bs]
           sendDataFunc(gl, shaderCacheMap, (name, pos), [@bs] getDataFunc(materialIndex, state));
           state
         }
       ),
       state
     );

let render =
    (
      gl,
      (transformIndex, materialIndex, shaderIndex, geometryIndex, geometryType),
      /* {programRecord, gameObjectRecord} as state */
      ( {programRecord, gameObjectRecord} as renderState,
      
      sendAttributeState,
      sendUniformState
      )
    ) => {
  /* let transformIndex: int =
       GetComponentGameObjectService.unsafeGetTransformComponent(uid, gameObjectRecord);
     let geometryData =
       GetComponentGameObjectService.unsafeGetGeometryComponentData(uid, gameObjectRecord); */
  let program = ProgramService.unsafeGetProgram(shaderIndex, programRecord);
  let renderState =
    renderState
    |> UseProgramMainService.use(gl, program)
    |> _sendAttributeData(gl, (shaderIndex, geometryIndex, geometryType))
    |> _sendUniformRenderObjectModelData(gl, shaderIndex, transformIndex);
  let {lastSendMaterial} as record = renderState.glslSenderRecord;
  let state =
    switch lastSendMaterial {
    | Some(lastSendMaterial) when lastSendMaterial === materialIndex => state
    | _ =>
      record.lastSendMaterial = Some(materialIndex);
      state |> _sendUniformRenderObjectMaterialData(gl, shaderIndex, materialIndex)
    };
  /* state */
  (
renderState,
sendAttributeState,
sendUniformState

  )
};