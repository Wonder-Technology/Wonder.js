open StateRenderType;

open StateSendAttributeType;

open StateSendUniformType;

open VboBufferType;

let _directlySendAttributeData =
    (
      gl,
      (shaderIndex, geometryIndex, geometryType),
      ({vboBufferRecord, glslSenderRecord} as renderState, sendAttributeState)
    ) => {
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
               sendAttributeState  
               )
             | "normal" =>
               ArrayBufferMainService.getOrCreateBuffer(
                 gl,
                 (geometryIndex, normalBufferMap),
                 [@bs] getNormalsFunc,
                 sendAttributeState
               )
             | "index" =>
               ElementArrayBufferMainService.getOrCreateBuffer(
                 gl,
                 (geometryIndex, elementArrayBufferMap),
                 [@bs] getIndicesFunc,
                 sendAttributeState
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
           [@bs] sendFunc(gl, (size, pos), arrayBuffer, sendAttributeState)
         }
       ),
       sendAttributeState
     )
};

let _sendAttributeData =
    (
      gl,
      (shaderIndex, geometryIndex, geometryType) as indexTuple,
      (renderState, sendAttributeState) as stateTuple
    ) => {
  let {lastSendGeometry} as record = renderState.glslSenderRecord;
  switch lastSendGeometry {
  | Some((lastSendGeometryIndex, lastSendGeometryType))
      when lastSendGeometryIndex === geometryIndex && lastSendGeometryType === geometryType => stateTuple
  | _ =>
    record.lastSendGeometry = Some((geometryIndex, geometryType));
    _directlySendAttributeData(gl, indexTuple, stateTuple)
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
      ({programRecord, gameObjectRecord} as renderState, sendAttributeState, sendUniformState)
    ) => {
  /* let transformIndex: int =
       GetComponentGameObjectService.unsafeGetTransformComponent(uid, gameObjectRecord);
     let geometryData =
       GetComponentGameObjectService.unsafeGetGeometryComponentData(uid, gameObjectRecord); */
  let program = ProgramService.unsafeGetProgram(shaderIndex, programRecord);
  let renderState = renderState |> UseProgramRenderService.use(gl, program);
  let (renderState, sendAttributeState) =
    _sendAttributeData(
      gl,
      (shaderIndex, geometryIndex, geometryType),
      (renderState, sendAttributeState)
    );
  let sendUniformState =
    sendUniformState |> _sendUniformRenderObjectModelData(gl, shaderIndex, transformIndex);
  let {lastSendMaterial} as record = renderState.glslSenderRecord;
  let state =
    switch lastSendMaterial {
    | Some(lastSendMaterial) when lastSendMaterial === materialIndex => state
    | _ =>
      record.lastSendMaterial = Some(materialIndex);
      state |> _sendUniformRenderObjectMaterialData(gl, shaderIndex, materialIndex)
    };
  /* state */
  (renderState, sendAttributeState, sendUniformState)
};