open StateDataType;

open VboBufferType;

let _directlySendAttributeData = (gl, shaderIndex, geometryIndex, state) => {
  let {vertexBufferMap, normalBufferMap, elementArrayBufferMap} = state.vboBufferRecord;
  state
  |> HandleAttributeConfigDataService.unsafeGetAttributeSendData(shaderIndex)
  |> ArraySystem.reduceState(
       [@bs]
       (
         (state, {pos, size, buffer, sendFunc}) => {
           let arrayBuffer =
             switch buffer {
             | "vertex" =>
               ArrayBufferService.getOrCreateBuffer(
                 gl,
                 (geometryIndex, vertexBufferMap),
                 [@bs] VerticesGeometryService.unsafeGetVertices,
                 state
               )
             | "normal" =>
               ArrayBufferService.getOrCreateBuffer(
                 gl,
                 (geometryIndex, normalBufferMap),
                 [@bs] NormalsGeometryService.unsafeGetNormals,
                 state
               )
             | "index" =>
               ElementArrayBufferService.getOrCreateBuffer(
                 gl,
                 (geometryIndex, elementArrayBufferMap),
                 [@bs] IndicesGeometryService.unsafeGetIndices,
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

let _sendAttributeData = (gl, shaderIndex, geometryIndex, state) => {
  let {lastSendGeometry} as record = state.glslSenderRecord;
  switch lastSendGeometry {
  | Some(lastSendGeometry) when lastSendGeometry === geometryIndex => state
  | _ =>
    record.lastSendGeometry = Some(geometryIndex);
    _directlySendAttributeData(gl, shaderIndex, geometryIndex, state)
  }
};

let _sendUniformRenderObjectModelData = (gl, shaderIndex, transformIndex, state) =>
  state
  |> HandleUniformRenderObjectModelService.unsafeGetUniformSendData(shaderIndex)
  |> ArraySystem.reduceState(
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
  |> ArraySystem.reduceState(
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
  let transformIndex: int =
    GetComponentGameObjectService.unsafeGetTransformComponent(uid, gameObjectRecord);
  let geometryIndex: int =
    GetComponentGameObjectService.unsafeGetBoxGeometryComponent(uid, gameObjectRecord);
  let program = ProgramService.unsafeGetProgram(shaderIndex, programRecord);
  let state =
    state
    |> UseProgramService.use(gl, program)
    |> _sendAttributeData(gl, shaderIndex, geometryIndex)
    |> _sendUniformRenderObjectModelData(gl, shaderIndex, transformIndex);
  let {lastSendMaterial} as record = state.glslSenderRecord;
  let state =
    switch lastSendMaterial {
    | Some(lastSendMaterial) when lastSendMaterial === materialIndex => state
    | _ =>
      record.lastSendMaterial = Some(materialIndex);
      state |> _sendUniformRenderObjectMaterialData(gl, shaderIndex, materialIndex)
    };
  (state, shaderIndex, geometryIndex)
};