open StateDataType;

open VboBufferType;

let render = (gl, uid, state: StateDataType.state) => {
  let transformIndex: int = GameObjectAdmin.unsafeGetTransformComponent(uid, state);
  let materialIndex: int = GameObjectAdmin.unsafeGetMaterialComponent(uid, state);
  let shaderIndex = MaterialAdmin.unsafeGetShaderIndex(materialIndex, state);
  let geometryIndex: int = GameObjectAdmin.unsafeGetGeometryComponent(uid, state);
  let {vertexBufferMap, elementArrayBufferMap} = VboBufferStateUtils.getVboBufferData(state);
  let program = ProgramSystem.unsafeGetProgram(shaderIndex, state);
  (
    state
    |> ProgramSystem.use(gl, program)
    |> GLSLSenderConfigDataHandleSystem.getAttributeSendData(shaderIndex)
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, {pos, size, buffer, sendFunc}) => {
             let arrayBuffer =
               switch buffer {
               | "vertex" =>
                 ArrayBufferSystem.getOrCreateBuffer(
                   gl,
                   geometryIndex,
                   vertexBufferMap,
                   [@bs] GeometryAdmin.unsafeGetVertices,
                   state
                 )
               | "index" =>
                 ElementArrayBufferSystem.getOrCreateBuffer(
                   gl,
                   geometryIndex,
                   elementArrayBufferMap,
                   [@bs] GeometryAdmin.unsafeGetIndices,
                   state
                 )
               | _ => ExceptionHandleSystem.throwMessage({j|unknow buffer:$buffer|j})
               };
             [@bs] sendFunc(gl, size, pos, arrayBuffer, state)
           }
         ),
         state
       )
    |> GLSLSenderConfigDataHandleSystem.getUniformSendNoCacheableData(shaderIndex)
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, {pos, getNoCacheableDataFunc, sendNoCacheableDataFunc}: uniformSendNoCacheableData) => {
             [@bs] sendNoCacheableDataFunc(gl, pos, [@bs] getNoCacheableDataFunc(transformIndex, state));
             state
           }
         ),
         state
       )
    |> GLSLSenderConfigDataHandleSystem.getUniformSendCacheableData(shaderIndex)
    |> ArraySystem.reduceState(
         [@bs]
         (
           (
             state,
             {shaderCacheMap, name, pos, getCacheableDataFunc, sendCacheableDataFunc}: uniformSendCacheableData
           ) => {
             [@bs]
             sendCacheableDataFunc(
               gl,
               shaderCacheMap,
               name,
               pos,
               [@bs] getCacheableDataFunc(materialIndex, state)
             );
             state
           }
         ),
         state
       ),
    shaderIndex,
    geometryIndex
  )
};