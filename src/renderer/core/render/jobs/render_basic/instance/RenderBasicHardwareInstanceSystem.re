open StateDataType;

open VboBufferType;

open SourceInstanceType;

open InstanceBufferSystem;

let _sendModelMatrixData =
    (
      gl,
      extension,
      sourceInstance,
      shaderIndex,
      instanceRenderList,
      instanceRenderListCount,
      modelMatrixInstanceBufferCapacityMap,
      modelMatrixInstanceBufferMap,
      modelMatrixFloat32ArrayMap,
      state
    ) => {
  let modelMatrixInstanceBuffer =
    InstanceBufferSystem.getOrCreateBuffer(
      gl,
      sourceInstance,
      modelMatrixInstanceBufferCapacityMap,
      modelMatrixInstanceBufferMap
    );
  /*! instanceCount * 4(float size) * 4(vec count) * 4(component count) */
  let stride = 64;
  let matricesArrayForInstance =
    InstanceBufferSystem.getOrCreateModelMatrixFloat32Array(
      sourceInstance,
      modelMatrixInstanceBufferCapacityMap,
      modelMatrixFloat32ArrayMap
    );
  let (modelMatrixInstanceBuffer, matricesArrayForInstance) =
    setCapacityAndUpdateBufferAndTypeArray(
      gl,
      sourceInstance,
      instanceRenderListCount * stride,
      modelMatrixInstanceBuffer,
      matricesArrayForInstance,
      modelMatrixInstanceBufferMap,
      modelMatrixFloat32ArrayMap,
      modelMatrixInstanceBufferCapacityMap
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
             TypeArrayUtils.fillFloat32ArrayWithFloat32Array(
               matricesArrayForInstance,
               offset^ ,
               TransformSystem.getLocalToWorldMatrix(transform, state),
               0,
               16
             );
             offset := offset^ + 16;
             state
           }
         ),
         state
       );
  let _ = updateData(gl, matricesArrayForInstance, modelMatrixInstanceBuffer);
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
  state
};

let render = (gl, uid, state: StateDataType.state) => {
  /* todo optimize for static data:
  use bufferData instead of bufferSubData(use STATIC_DRAW)
  use accurate buffer capacity(can't change) */

  let (state, shaderIndex, mappedGeometryIndex) = state |> RenderBasicSystem.render(gl, uid);
  let extension = GPUStateSystem.getData(state).extensionInstancedArrays |> Js.Option.getExn;
  let {modelMatrixInstanceBufferMap} = VboBufferStateSystem.getVboBufferData(state);
  let {objectInstanceListMap, modelMatrixFloat32ArrayMap, modelMatrixInstanceBufferCapacityMap} =
    SourceInstanceStateSystem.getData(state);
  let sourceInstance = GameObjectComponentSystem.unsafeGetSourceInstanceComponent(uid, state);
  let instanceRenderList =
    SourceInstanceSystem.getRenderList(sourceInstance, objectInstanceListMap);
  let instanceRenderListCount = Js.Array.length(instanceRenderList);
  let state =
    SourceInstanceSystem.isModelMatrixIsStatic(sourceInstance, state) ?
      SourceInstanceStaticSystem.isSendModelMatrix(sourceInstance, state) ?
        state :
        _sendModelMatrixData(
          gl,
          extension,
          sourceInstance,
          shaderIndex,
          instanceRenderList,
          instanceRenderListCount,
          modelMatrixInstanceBufferCapacityMap,
          modelMatrixInstanceBufferMap,
          modelMatrixFloat32ArrayMap,
          state
        )
        |> SourceInstanceStaticSystem.markSendModelMatrix(sourceInstance, true) :
      state
      |> SourceInstanceStaticSystem.markSendModelMatrix(sourceInstance, false)
      |> _sendModelMatrixData(
           gl,
           extension,
           sourceInstance,
           shaderIndex,
           instanceRenderList,
           instanceRenderListCount,
           modelMatrixInstanceBufferCapacityMap,
           modelMatrixInstanceBufferMap,
           modelMatrixFloat32ArrayMap
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