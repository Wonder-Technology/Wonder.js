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
  let matricesArrayForInstance =
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
      /* todo finish */
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