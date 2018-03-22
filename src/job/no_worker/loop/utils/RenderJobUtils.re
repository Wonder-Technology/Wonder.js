open MainStateDataType;

open VboBufferType;

open BoxGeometryType;

let _directlySendAttributeData = (gl, (shaderIndex, geometryIndex, mappedGeometryIndex), state) => {
  let {vertexBufferMap, normalBufferMap, elementArrayBufferMap} = state.vboBufferRecord;
  state
  |> HandleAttributeConfigDataMainService.unsafeGetAttributeSendData(shaderIndex)
  |> ReduceStateMainService.reduceState(
       [@bs]
       (
         (state, {pos, size, buffer, sendFunc}) => {
           let arrayBuffer =
             switch buffer {
             | "vertex" =>
               ArrayBufferMainService.getOrCreateBuffer(
                 gl,
                 (geometryIndex, mappedGeometryIndex, vertexBufferMap),
                 [@bs] VerticesGeometryMainService.getVertices,
                 state
               )
             | "normal" =>
               ArrayBufferMainService.getOrCreateBuffer(
                 gl,
                 (geometryIndex, mappedGeometryIndex, normalBufferMap),
                 [@bs] NormalsGeometryMainService.getNormals,
                 state
               )
             | "index" =>
               ElementArrayBufferMainService.getOrCreateBuffer(
                 gl,
                 (geometryIndex, mappedGeometryIndex, elementArrayBufferMap),
                 [@bs] IndicesGeometryMainService.getIndices,
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

let _sendAttributeData =
    (gl, (shaderIndex, geometryIndex, mappedGeometryIndex) as indexTuple, state) => {
  let {lastSendGeometry} as record = state.glslSenderRecord;
  switch lastSendGeometry {
  | Some(lastSendGeometry) when lastSendGeometry === geometryIndex => state
  | _ =>
    record.lastSendGeometry = Some(geometryIndex);
    _directlySendAttributeData(gl, indexTuple, state)
  }
};

let _sendUniformRenderObjectModelData = (gl, shaderIndex, transformIndex, state) =>
  state
  |> HandleUniformRenderObjectModelMainService.unsafeGetUniformSendData(shaderIndex)
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
  |> HandleUniformRenderObjectMaterialMainService.unsafeGetUniformSendData(shaderIndex)
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

let render = (gl, (materialIndex, shaderIndex, uid), {programRecord, gameObjectRecord} as state) => {
  let {mappedIndexMap} as boxGeometryRecord = RecordBoxGeometryMainService.getRecord(state);
  let transformIndex: int =
    GetComponentGameObjectService.unsafeGetTransformComponent(uid, gameObjectRecord);
  let geometryIndex: int =
    GetComponentGameObjectService.unsafeGetBoxGeometryComponent(uid, gameObjectRecord);
  let mappedGeometryIndex = MappedIndexService.getMappedIndex(geometryIndex, mappedIndexMap);
  let program = ProgramService.unsafeGetProgram(shaderIndex, programRecord);
  let state =
    state
    |> UseProgramMainService.use(gl, program)
    |> _sendAttributeData(gl, (shaderIndex, geometryIndex, mappedGeometryIndex))
    |> _sendUniformRenderObjectModelData(gl, shaderIndex, transformIndex);
  let {lastSendMaterial} as record = state.glslSenderRecord;
  let state =
    switch lastSendMaterial {
    | Some(lastSendMaterial) when lastSendMaterial === materialIndex => state
    | _ =>
      record.lastSendMaterial = Some(materialIndex);
      state |> _sendUniformRenderObjectMaterialData(gl, shaderIndex, materialIndex)
    };
  (state, shaderIndex, geometryIndex, mappedGeometryIndex)
};