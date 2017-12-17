open StateDataType;

open VboBufferType;

open SourceInstanceType;

open InstanceBufferSystem;

let _fillModelMatrixTypeArr = (uid, matricesArrayForInstance, offset, state) => {
  let transform = GameObjectAdmin.unsafeGetTransformComponent(uid, state);
  TypeArrayUtils.fillFloat32ArrayWithFloat32Array(
    matricesArrayForInstance,
    offset,
    TransformAdmin.getLocalToWorldMatrixTypeArray(transform, state),
    0,
    16
  ) |> ignore;
  state
};

let _sendModelMatrixData =
    (
      gl,
      sourceUid,
      extension,
      sourceInstance,
      shaderIndex,
      objectInstanceArray,
      instanceRenderListCount,
      modelMatrixInstanceBufferCapacityMap,
      modelMatrixInstanceBufferMap,
      modelMatrixFloat32ArrayMap,
      transformData,
      state
    ) => {
  let modelMatrixInstanceBuffer =
    InstanceBufferSystem.getOrCreateBuffer(
      gl,
      sourceInstance,
      modelMatrixInstanceBufferCapacityMap,
      modelMatrixInstanceBufferMap,
      state
    );
  /*! instanceCount * 4(float size) * 4(vec count) * 4(component count) */
  let stride = 64;
  let matricesArrayForInstance =
    InstanceBufferSystem.getOrCreateModelMatrixFloat32Array(
      sourceInstance,
      modelMatrixInstanceBufferCapacityMap,
      modelMatrixFloat32ArrayMap,
      state
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
      modelMatrixInstanceBufferCapacityMap,
      state
    );
  let offset = ref(0);
  let state =
    state |> _fillModelMatrixTypeArr(sourceUid, matricesArrayForInstance, offset^);
  offset := offset^ + 16;
  let state =
    objectInstanceArray
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, objectInstance) => {
             let state =
               state
               |> _fillModelMatrixTypeArr(
                    objectInstance,
                    matricesArrayForInstance,
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
  /* todo optimize for static data:
     use bufferData instead of bufferSubData(use STATIC_DRAW)
     use accurate buffer capacity(can't change) */
  let (state, shaderIndex, geometryIndex) = state |> RenderBasicJobCommon.render(gl, uid);
  let extension =
    GPUStateUtils.getGpuDetectData(state).extensionInstancedArrays |> Js.Option.getExn;
  let transformData = TransformAdmin.getTransformData(state);
  let {modelMatrixInstanceBufferMap} = VboBufferGetStateDataUtils.getVboBufferData(state);
  let {modelMatrixFloat32ArrayMap, modelMatrixInstanceBufferCapacityMap} =
    SourceInstanceAdmin.getSourceInstanceData(state);
  let sourceInstance = GameObjectComponentCommon.unsafeGetSourceInstanceComponent(uid, state);
  let objectInstanceArray = SourceInstanceAdmin.getObjectInstanceArray(sourceInstance, state);
  let instanceRenderListCount = Js.Array.length(objectInstanceArray) + 1;
  let state =
    SourceInstanceAdmin.isModelMatrixIsStatic(sourceInstance, state) ?
      SourceInstanceAdmin.isSendModelMatrix(sourceInstance, state) ?
        state :
        _sendModelMatrixData(
          gl,
          uid,
          extension,
          sourceInstance,
          shaderIndex,
          objectInstanceArray,
          instanceRenderListCount,
          modelMatrixInstanceBufferCapacityMap,
          modelMatrixInstanceBufferMap,
          modelMatrixFloat32ArrayMap,
          transformData,
          state
        )
        |> SourceInstanceAdmin.markSendModelMatrix(sourceInstance, true) :
      state
      |> SourceInstanceAdmin.markSendModelMatrix(sourceInstance, false)
      |> _sendModelMatrixData(
           gl,
           uid,
           extension,
           sourceInstance,
           shaderIndex,
           objectInstanceArray,
           instanceRenderListCount,
           modelMatrixInstanceBufferCapacityMap,
           modelMatrixInstanceBufferMap,
           modelMatrixFloat32ArrayMap,
           transformData
         );
  GLSLSenderDrawUtils.drawElementsInstancedANGLE(
    GeometryAdmin.getDrawMode(gl),
    GeometryAdmin.getIndexType(gl),
    GeometryAdmin.getIndexTypeSize(gl),
    GeometryAdmin.getIndicesCount(geometryIndex, state),
    instanceRenderListCount,
    Obj.magic(extension)
  );
  /* todo unbind? */
  state
};