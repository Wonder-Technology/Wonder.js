open StateDataType;

open VboBufferType;

let render = (gl, uid, state: StateDataType.state) => {
  let transformIndex: int = GameObjectAdmin.unsafeGetTransformComponent(uid, state);
  let materialIndex: int = GameObjectAdmin.unsafeGetMaterialComponent(uid, state);
  let shaderIndex = MaterialSystem.unsafeGetShaderIndex(materialIndex, state);
  let geometryIndex: int = GameObjectAdmin.unsafeGetGeometryComponent(uid, state);
  let mappedGeometryIndex =
    GeometryIndexSystem.getMappedIndex(
      geometryIndex,
      GeometryIndexSystem.getMappedIndexMap(state)
    );
  let {vertexBufferMap, elementArrayBufferMap} = VboBufferStateSystem.getVboBufferData(state);
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
                   mappedGeometryIndex,
                   vertexBufferMap,
                   [@bs] GeometrySystem.getVertices,
                   state
                 )
               | "index" =>
                 ElementArrayBufferSystem.getOrCreateBuffer(
                   gl,
                   geometryIndex,
                   mappedGeometryIndex,
                   elementArrayBufferMap,
                   [@bs] GeometrySystem.getIndices,
                   state
                 )
               | _ => ExceptionHandleSystem.throwMessage({j|unknow buffer:$buffer|j})
               };
             [@bs] sendFunc(gl, size, pos, arrayBuffer, state)
           }
         ),
         state
       )
    |> GLSLSenderConfigDataHandleSystem.getUniformSendData(shaderIndex)
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, {pos, getArrayDataFunc, sendArrayDataFunc}: uniformSendData) => {
             [@bs] sendArrayDataFunc(gl, pos, [@bs] getArrayDataFunc(transformIndex, state));
             state
           }
         ),
         state
       ),
    shaderIndex,
    mappedGeometryIndex
  )
};