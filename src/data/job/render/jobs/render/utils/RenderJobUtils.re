open StateDataType;

open VboBufferType;

let _directlySendAttributeData = (gl, shaderIndex, geometryIndex, state) => {
  let {vertexBufferMap, normalBufferMap, elementArrayBufferMap} =
    VboBufferGetStateDataUtils.getVboBufferData(state);
  state
  |> GLSLSenderConfigDataHandleSystem.unsafeGetAttributeSendData(shaderIndex)
  |> ArraySystem.reduceState(
       [@bs]
       (
         (state, {pos, size, buffer, sendFunc}) => {
           let arrayBuffer =
             switch buffer {
             | "vertex" =>
               ArrayBufferSystem.getOrCreateBuffer(
                 gl,
                 (geometryIndex, vertexBufferMap),
                 [@bs] GeometryAdmin.unsafeGetVertices,
                 state
               )
             | "normal" =>
               ArrayBufferSystem.getOrCreateBuffer(
                 gl,
                 (geometryIndex, normalBufferMap),
                 [@bs] GeometryAdmin.unsafeGetNormals,
                 state
               )
             | "index" =>
               ElementArrayBufferSystem.getOrCreateBuffer(
                 gl,
                 (geometryIndex, elementArrayBufferMap),
                 [@bs] GeometryAdmin.unsafeGetIndices,
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
  let {lastSendGeometry} as data = GLSLSenderSystem.getGLSLSenderData(state);
  switch lastSendGeometry {
  | Some(lastSendGeometry) when lastSendGeometry === geometryIndex => state
  | _ =>
    data.lastSendGeometry = Some(geometryIndex);
    _directlySendAttributeData(gl, shaderIndex, geometryIndex, state)
  }
};

let _sendUniformRenderObjectModelData = (gl, shaderIndex, transformIndex, state) =>
  state
  |> GLSLSenderConfigDataHandleSystem.unsafeGetUniformRenderObjectSendModelData(shaderIndex)
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
  |> GLSLSenderConfigDataHandleSystem.unsafeGetUniformRenderObjectSendMaterialData(shaderIndex)
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

let render = (gl, (materialIndex, shaderIndex, uid), state: StateDataType.state) => {
  let transformIndex: int = GameObjectAdmin.unsafeGetTransformComponent(uid, state);
  let geometryIndex: int = GameObjectAdmin.unsafeGetGeometryComponent(uid, state);
  let program = ProgramSystem.unsafeGetProgram(shaderIndex, state);
  let state =
    state
    |> ProgramSystem.use(gl, program)
    |> _sendAttributeData(gl, shaderIndex, geometryIndex)
    |> _sendUniformRenderObjectModelData(gl, shaderIndex, transformIndex);
  let {lastSendMaterial} as data = GLSLSenderSystem.getGLSLSenderData(state);
  let state =
    switch lastSendMaterial {
    | Some(lastSendMaterial) when lastSendMaterial === materialIndex => state
    | _ =>
      data.lastSendMaterial = Some(materialIndex);
      state |> _sendUniformRenderObjectMaterialData(gl, shaderIndex, materialIndex)
    };
  (state, shaderIndex, geometryIndex)
};