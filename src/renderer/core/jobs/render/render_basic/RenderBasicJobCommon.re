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
    |> GLSLSenderConfigDataHandleSystem.getUniformSendArrayData(shaderIndex)
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, {pos, getArrayDataFunc, sendArrayDataFunc}: uniformSendArrayData) => {
             [@bs] sendArrayDataFunc(gl, pos, [@bs] getArrayDataFunc(transformIndex, state));
             state
           }
         ),
         state
       )
    |> GLSLSenderConfigDataHandleSystem.getUniformSendVector3Data(shaderIndex)
    |> ArraySystem.reduceState(
         [@bs]
         (
           (
             state,
             {shaderCacheMap, name, pos, getVector3DataFunc, sendVector3DataFunc}: uniformSendVector3Data
           ) => {
             [@bs]
             sendVector3DataFunc(
               gl,
               shaderCacheMap,
               name,
               pos,
               [@bs] getVector3DataFunc(materialIndex, state)
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