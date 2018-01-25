open StateDataType;

open VboBufferType;

let _sendAttributeData = (gl, shaderIndex, geometryIndex, state) => {
  let {vertexBufferMap, elementArrayBufferMap} =
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
             | "index" =>
               ElementArrayBufferSystem.getOrCreateBuffer(
                 gl,
                 (geometryIndex, elementArrayBufferMap),
                 [@bs] GeometryAdmin.unsafeGetIndices,
                 state
               )
             | _ => ExceptionHandleSystem.throwMessage({j|unknow buffer:$buffer|j})
             };
           [@bs] sendFunc(gl, (size, pos), arrayBuffer, state)
         }
       ),
       state
     )
};

let _sendUniformNoCacheData = (gl, shaderIndex, transformIndex, state) =>
  state
  |> GLSLSenderConfigDataHandleSystem.unsafeGetUniformSendNoCachableData(shaderIndex)
  |> ArraySystem.reduceState(
       [@bs]
       (
         (state, {pos, getNoCachableDataFunc, sendNoCachableDataFunc}: uniformSendNoCachableData) => {
           [@bs]
           sendNoCachableDataFunc(gl, pos, [@bs] getNoCachableDataFunc(transformIndex, state));
           state
         }
       ),
       state
     );

let _sendUniformCachableData = (gl, shaderIndex, materialIndex, state) =>
  state
  |> GLSLSenderConfigDataHandleSystem.unsafeGetUniformSendCachableData(shaderIndex)
  |> ArraySystem.reduceState(
       [@bs]
       (
         (
           state,
           {shaderCacheMap, name, pos, getCachableDataFunc, sendCachableDataFunc}: uniformSendCachableData
         ) => {
           [@bs]
           sendCachableDataFunc(
             gl,
             shaderCacheMap,
             (name, pos),
             [@bs] getCachableDataFunc(materialIndex, state)
           );
           state
         }
       ),
       state
     );

let render = (gl, uid, state: StateDataType.state) => {
  let transformIndex: int = GameObjectAdmin.unsafeGetTransformComponent(uid, state);
  let materialIndex: int = GameObjectAdmin.unsafeGetMaterialComponent(uid, state);
  let shaderIndex = MaterialAdmin.unsafeGetShaderIndex(materialIndex, state);
  let geometryIndex: int = GameObjectAdmin.unsafeGetGeometryComponent(uid, state);
  let program = ProgramSystem.unsafeGetProgram(shaderIndex, state);
  let state =
    state
    |> ProgramSystem.use(gl, program)
    |> _sendAttributeData(gl, shaderIndex, geometryIndex)
    |> _sendUniformNoCacheData(gl, shaderIndex, transformIndex);
  let {lastSendMaterial} as data = GLSLSenderSystem.getGLSLSenderData(state);
  let state =
    switch lastSendMaterial {
    | Some(lastSendMaterial) when lastSendMaterial === materialIndex => state
    | _ =>
      data.lastSendMaterial = Some(materialIndex);
      state |> _sendUniformCachableData(gl, shaderIndex, materialIndex)
    };
  (state, shaderIndex, geometryIndex)
};