open StateDataType;

open VboBufferType;

open SourceInstanceType;

open InstanceBufferSystem;

let render = (gl, uid, state: StateDataType.state) => {
  let (state, shaderIndex, mappedGeometryIndex) = state |> RenderBasicSystem.render(gl, uid);
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