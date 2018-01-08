open StateDataType;

open VboBufferType;

open SourceInstanceType;

open InstanceBufferSystem;

let _fillModelMatrixTypeArr = (uid, matricesArrayForInstance, (state, offset)) => {
  let transform = GameObjectAdmin.unsafeGetTransformComponent(uid, state);
  TypeArrayUtils.fillFloat32ArrayWithFloat32Array(
    (matricesArrayForInstance, offset),
    (TransformAdmin.getLocalToWorldMatrixTypeArray(transform, state), 0),
    16
  )
  |> ignore;
  (state, offset + 16)
};

let _fillObjectInstanceData = (objectInstanceArray, matricesArrayForInstance, stateOffsetTuple) => {
  let (state, offset) =
    objectInstanceArray
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs]
         (
           (stateOffsetTuple, objectInstance) =>
             _fillModelMatrixTypeArr(objectInstance, matricesArrayForInstance, stateOffsetTuple)
         ),
         stateOffsetTuple
       );
  state
};

let _sendModelMatrixDataBuffer = ((gl, extension), pos, stride, index) => {
  Gl.enableVertexAttribArray(pos, gl);
  Gl.vertexAttribPointer(pos, 4, Gl.getFloat(gl), Js.false_, stride, index * 16, gl);
  [@bs] Obj.magic(extension)##vertexAttribDivisorANGLE(pos, 1)
};

let _sendModelMatrixDataBufferData =
    (
      glDataTuple,
      shaderIndex,
      (stride, matricesArrayForInstance, modelMatrixInstanceBuffer),
      state
    ) => {
  let (gl, extension) = glDataTuple;
  let _ = updateData(gl, matricesArrayForInstance, modelMatrixInstanceBuffer);
  state
  |> GLSLSenderConfigDataHandleSystem.getInstanceAttributeSendData(shaderIndex)
  |> WonderCommonlib.ArraySystem.forEachi(
       [@bs]
       (
         ({pos}: instanceAttributeSendData, index) =>
           _sendModelMatrixDataBuffer(glDataTuple, pos, stride, index)
       )
     );
  state
};

let _sendModelMatrixData =
    (
      (gl, extension, shaderIndex),
      (sourceUid, sourceInstance, objectInstanceArray, instanceRenderListCount),
      (
        modelMatrixInstanceBufferCapacityMap,
        modelMatrixInstanceBufferMap,
        modelMatrixFloat32ArrayMap
      ),
      state
    ) => {
  let modelMatrixInstanceBuffer =
    InstanceBufferSystem.getOrCreateBuffer(
      gl,
      sourceInstance,
      (modelMatrixInstanceBufferCapacityMap, modelMatrixInstanceBufferMap),
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
    setCapacityAndUpdateBufferTypeArray(
      (gl, sourceInstance, instanceRenderListCount * stride),
      (modelMatrixInstanceBuffer, matricesArrayForInstance),
      (
        modelMatrixInstanceBufferMap,
        modelMatrixFloat32ArrayMap,
        modelMatrixInstanceBufferCapacityMap
      ),
      state
    );
  _fillModelMatrixTypeArr(sourceUid, matricesArrayForInstance, (state, 0))
  |> _fillObjectInstanceData(objectInstanceArray, matricesArrayForInstance)
  |> _sendModelMatrixDataBufferData(
       (gl, extension),
       shaderIndex,
       (stride, matricesArrayForInstance, modelMatrixInstanceBuffer)
     )
};

let _sendStaticModelMatrixData =
    (
      glDataTuple,
      (uid, sourceInstance, objectInstanceArray, instanceRenderListCount),
      modelMatrixMapTuple,
      state
    ) =>
  SourceInstanceAdmin.isSendModelMatrix(sourceInstance, state) ?
    state :
    state
    |> _sendModelMatrixData(
         glDataTuple,
         (uid, sourceInstance, objectInstanceArray, instanceRenderListCount),
         modelMatrixMapTuple
       )
    |> SourceInstanceAdmin.markSendModelMatrix(sourceInstance, true);

let _sendDynamicModelMatrixData =
    (
      glDataTuple,
      (uid, sourceInstance, objectInstanceArray, instanceRenderListCount),
      modelMatrixMapTuple,
      state
    ) =>
  state
  |> SourceInstanceAdmin.markSendModelMatrix(sourceInstance, false)
  |> _sendModelMatrixData(
       glDataTuple,
       (uid, sourceInstance, objectInstanceArray, instanceRenderListCount),
       modelMatrixMapTuple
     );

let _getModelMatrixMapTuple = (state) => {
  let {modelMatrixInstanceBufferMap} = VboBufferGetStateDataUtils.getVboBufferData(state);
  let {modelMatrixFloat32ArrayMap, modelMatrixInstanceBufferCapacityMap} =
    SourceInstanceAdmin.getSourceInstanceData(state);
  (modelMatrixInstanceBufferCapacityMap, modelMatrixInstanceBufferMap, modelMatrixFloat32ArrayMap)
};

let render = (gl, uid, state: StateDataType.state) => {
  /* todo optimize for static data:
     use bufferData instead of bufferSubData(use STATIC_DRAW)
     use accurate buffer capacity(can't change) */
  let (state, shaderIndex, geometryIndex) = state |> RenderBasicJobCommon.render(gl, uid);
  let extension =
    GPUStateUtils.getGpuDetectData(state).extensionInstancedArrays |> Js.Option.getExn;
  let sourceInstance = GameObjectGetComponentCommon.unsafeGetSourceInstanceComponent(uid, state);
  let objectInstanceArray = SourceInstanceAdmin.getObjectInstanceArray(sourceInstance, state);
  let instanceRenderListCount = Js.Array.length(objectInstanceArray) + 1;
  let glDataTuple = (gl, extension, shaderIndex);
  let instanceDataTuple = (uid, sourceInstance, objectInstanceArray, instanceRenderListCount);
  let modelMatrixMapTuple = _getModelMatrixMapTuple(state);
  let state =
    SourceInstanceAdmin.isModelMatrixIsStatic(sourceInstance, state) ?
      _sendStaticModelMatrixData(glDataTuple, instanceDataTuple, modelMatrixMapTuple, state) :
      _sendDynamicModelMatrixData(glDataTuple, instanceDataTuple, modelMatrixMapTuple, state);
  GLSLSenderDrawUtils.drawElementsInstancedANGLE(
    (
      GeometryAdmin.getDrawMode(gl),
      GeometryAdmin.getIndexType(gl),
      GeometryAdmin.getIndexTypeSize(gl),
      GeometryAdmin.getIndicesCount(geometryIndex, state),
      instanceRenderListCount
    ),
    Obj.magic(extension)
  );
  /* todo unbind? */
  state
};