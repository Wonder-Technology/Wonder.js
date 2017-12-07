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
  let {instanceBufferMap} = VboBufferStateSystem.getVboBufferData(state);
  let {objectInstanceListMap, modelMatrixFloat32ArrayMap, instanceBufferCapacityMap} =
    SourceInstanceStateSystem.getData(state);
  let sourceInstance = GameObjectComponentSystem.unsafeGetSourceInstanceComponent(uid, state);
  let instanceRenderList =
    SourceInstanceSystem.getRenderList(sourceInstance, objectInstanceListMap);
  let instanceBuffer =
    InstanceBufferSystem.getOrCreateBuffer(
      gl,
      sourceInstance,
      instanceBufferCapacityMap,
      instanceBufferMap
    );
  /*! instanceCount * 4(float size) * 4(vec count) * 4(component count) */
  let stride = 64;
  let instanceRenderListCount = Js.Array.length(instanceRenderList);
  let matricesArrayForInstance =
    InstanceBufferSystem.getOrCreateModelMatrixFloat32Array(
      sourceInstance,
      instanceBufferCapacityMap,
      modelMatrixFloat32ArrayMap
    );
  let matricesArrayForInstance =
    setCapacityAndUpdateBufferAndTypeArray(
      gl,
      sourceInstance,
      instanceRenderListCount * stride,
      instanceBuffer,
      matricesArrayForInstance,
      instanceBufferMap,
      modelMatrixFloat32ArrayMap,
      instanceBufferCapacityMap
    );
  let offset = ref(0);
  let state =
    instanceRenderList
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
  let _ = updateData(gl, matricesArrayForInstance, instanceBuffer);
  state
  |> GLSLSenderConfigDataHandleSystem.getInstanceAttributeSendData(shaderIndex)
  |> WonderCommonlib.ArraySystem.forEachi(
       [@bs]
       (
         ({pos}: instanceAttributeSendData, index) => {
           Gl.enableVertexAttribArray(pos, gl);
           Gl.vertexAttribPointer(pos, 4, Gl.getFloat(gl), Js.false_, stride, index * 16, gl);
           [@bs] Obj.magic(extension)##vertexAttribDivisorANGLE(pos, 1)
         }
       )
     );
  GLSLSenderDrawSystem.drawElementsInstancedANGLE(
    GeometrySystem.getDrawMode(gl),
    GeometrySystem.getIndexType(gl),
    GeometrySystem.getIndexTypeSize(gl),
    GeometrySystem.getIndicesCount(mappedGeometryIndex, state),
    instanceRenderListCount,
    Obj.magic(extension)
  );
  /* todo unbind? */
  state
};