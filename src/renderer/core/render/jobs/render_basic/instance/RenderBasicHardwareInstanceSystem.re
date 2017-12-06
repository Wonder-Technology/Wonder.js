open StateDataType;

open VboBufferType;

open SourceInstanceType;

open InstanceBufferSystem;

open Js.Typed_array;

let render = (gl, uid, state: StateDataType.state) => {
  /* todo refactor */
  let materialIndex: int = GameObjectSystem.unsafeGetMaterialComponent(uid, state);
  let shaderIndex = MaterialSystem.unsafeGetShaderIndex(materialIndex, state);
  let geometryIndex: int = GameObjectSystem.unsafeGetGeometryComponent(uid, state);
  let mappedGeometryIndex =
    GeometryIndexSystem.getMappedIndex(
      geometryIndex,
      GeometryIndexSystem.getMappedIndexMap(state)
    );
  let {vertexBufferMap, elementArrayBufferMap} = VboBufferStateSystem.getVboBufferData(state);
  let program = ProgramSystem.unsafeGetProgram(shaderIndex, state);
  let state =
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
             [@bs] sendArrayDataFunc(gl, pos, [@bs] getArrayDataFunc(uid, state));
             state
           }
         ),
         state
       );
  /* GLSLSenderDrawSystem.drawElement(
       GeometrySystem.getDrawMode(gl),
       GeometrySystem.getIndexType(gl),
       GeometrySystem.getIndexTypeSize(gl),
       GeometrySystem.getIndicesCount(mappedGeometryIndex, state),
       gl
     );
     state */
  let extension = GPUStateSystem.getData(state).extensionInstancedArrays |> Js.Option.getExn;
  let vertexAttribDivisorANGLE = extension##vertexAttribDivisorANGLE;
  let drawElementsInstancedANGLE = extension##drawElementsInstancedANGLE;
  let {instanceBufferMap} = VboBufferStateSystem.getVboBufferData(state);
  let sourceInstance = GameObjectComponentSystem.unsafeGetSourceInstanceComponent(uid, state);
  let objectInstanceList = SourceInstanceSystem.getObjectInstanceList(state);
  let instanceBuffer =
    InstanceBufferSystem.getOrCreateBuffer(gl, sourceInstance, instanceBufferMap, state);
  /*! instanceCount * 4(float size) * 4(vec count) * 4(component count) */
  let stride = 64;
  let objectInstanceCount = Js.Array.length(objectInstanceList);
  let (capacity, instanceBuffer) = instanceBuffer |> setCapacity(gl, objectInstanceCount * stride);
  let matricesArrayForInstance = Float32Array.fromLength(getFloat32InstanceArraySize(capacity));
  let offset = ref(0);
  let state =
    objectInstanceList
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, objectInstance) => {
             let transform =
               Js.Option.getExn(
                 GameObjectComponentSystem.getTransformComponent(objectInstance, state)
               );
             TypeArrayUtils.fillFloat32ArrayWithOffset(
               matricesArrayForInstance,
               TransformSystem.getLocalToWorldMatrix(transform, state),
               offset^
             );
             offset := offset^ + 16;
             state
           }
         ),
         state
       );
  let instanceBuffer = updateData(gl, matricesArrayForInstance, instanceBuffer);
  let state =
    state
    |> GLSLSenderConfigDataHandleSystem.getInstanceAttributeSendData(shaderIndex)
    |> ArraySystem.reduceStatei(
         [@bs]
         (
           (state, {pos}: instanceAttributeSendData, index) => {
             Gl.enableVertexAttribArray(pos, gl);
             Gl.vertexAttribPointer(pos, 4, Gl.getFloat(gl), Js.false_, stride, index * 16, gl);
             vertexAttribDivisorANGLE(pos, 1);
             state
           }
         ),
         state
       );
  GLSLSenderDrawSystem.drawElementsInstancedANGLE(
    GeometrySystem.getDrawMode(gl),
    GeometrySystem.getIndexType(gl),
    GeometrySystem.getIndexTypeSize(gl),
    GeometrySystem.getIndicesCount(mappedGeometryIndex, state),
    objectInstanceCount,
    drawElementsInstancedANGLE
  );
  state
};