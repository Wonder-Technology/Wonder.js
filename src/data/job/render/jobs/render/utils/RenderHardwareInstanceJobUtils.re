open StateDataType;

open VboBufferType;

open SourceInstanceType;

open InstanceBufferSystem;

let _fillObjectInstanceData =
    (objectInstanceArray, matricesArrayForInstance, fillMatrixTypeArrFunc, stateOffsetTuple) => {
  let (state, offset) =
    objectInstanceArray
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs]
         (
           (stateOffsetTuple, objectInstance) =>
             [@bs]
             fillMatrixTypeArrFunc(objectInstance, matricesArrayForInstance, stateOffsetTuple)
         ),
         stateOffsetTuple
       );
  state
};

let _sendTransformMatrixDataBuffer =
    (
      (gl, extension),
      ({pos, size, getOffsetFunc}: instanceAttributeSendData, stride, index),
      state
    ) => {
  Gl.vertexAttribPointer(pos, size, Gl.getFloat(gl), Js.false_, stride, getOffsetFunc(index), gl);
  [@bs] Obj.magic(extension)##vertexAttribDivisorANGLE(pos, 1) |> ignore;
  GLSLSenderSendDataUtils.enableVertexAttribArray(
    gl,
    pos,
    GLSLSenderStateUtils.getGLSLSenderData(state).vertexAttribHistoryArray,
    state
  )
};

let _sendTransformMatrixDataBufferData =
    (glDataTuple, shaderIndex, (stride, matricesArrayForInstance, matrixInstanceBuffer), state) => {
  let (gl, extension) = glDataTuple;
  let _ = updateData(gl, matricesArrayForInstance, matrixInstanceBuffer);
  state
  |> GLSLSenderConfigDataHandleSystem.unsafeGetInstanceAttributeSendData(shaderIndex)
  |> ArraySystem.reduceStatei(
       [@bs]
       (
         (state, sendData, index) =>
           state |> _sendTransformMatrixDataBuffer(glDataTuple, (sendData, stride, index))
       ),
       state
     )
};

let _sendTransformMatrixData =
    (
      (
        (gl, extension, shaderIndex),
        (
          uid,
          sourceInstance,
          defaultCapacity,
          strideForCapacity,
          strideForSend,
          objectInstanceArray,
          instanceRenderListCount
        ),
        (matrixInstanceBufferCapacityMap, matrixInstanceBufferMap, matrixFloat32ArrayMap)
      ),
      fillMatrixTypeArrFunc,
      state
    ) => {
  let matrixInstanceBuffer =
    InstanceBufferSystem.getOrCreateBuffer(
      (gl, sourceInstance, defaultCapacity),
      (matrixInstanceBufferCapacityMap, matrixInstanceBufferMap),
      state
    );
  let matricesArrayForInstance =
    InstanceBufferSystem.getOrCreateMatrixFloat32Array(
      sourceInstance,
      defaultCapacity,
      (matrixInstanceBufferCapacityMap, matrixFloat32ArrayMap),
      state
    );
  let (matrixInstanceBuffer, matricesArrayForInstance) =
    setCapacityAndUpdateBufferTypeArray(
      (gl, sourceInstance, instanceRenderListCount * strideForCapacity, defaultCapacity),
      (matrixInstanceBuffer, matricesArrayForInstance),
      (matrixInstanceBufferMap, matrixFloat32ArrayMap, matrixInstanceBufferCapacityMap),
      state
    );
  [@bs] fillMatrixTypeArrFunc(uid, matricesArrayForInstance, (state, 0))
  |> _fillObjectInstanceData(objectInstanceArray, matricesArrayForInstance, fillMatrixTypeArrFunc)
  |> _sendTransformMatrixDataBufferData(
       (gl, extension),
       shaderIndex,
       (strideForSend, matricesArrayForInstance, matrixInstanceBuffer)
     )
};

let _sendStaticTransformMatrixData =
    (
      (
        (gl, extension, shaderIndex),
        (
          uid,
          sourceInstance,
          defaultCapacity,
          strideForCapacity,
          strideForSend,
          objectInstanceArray,
          instanceRenderListCount
        ),
        (matrixInstanceBufferCapacityMap, matrixInstanceBufferMap, matrixFloat32ArrayMap)
      ) as dataTuple,
      fillMatrixTypeArrFunc,
      state
    ) =>
  SourceInstanceAdmin.isSendTransformMatrixData(sourceInstance, state) ?
    {
      /* TODO test */
      InstanceBufferSystem.bind(
        gl,
        InstanceBufferSystem.getOrCreateBuffer(
          (gl, sourceInstance, defaultCapacity),
          (matrixInstanceBufferCapacityMap, matrixInstanceBufferMap),
          state
        )
      )
      |> ignore;
      state
      |> GLSLSenderConfigDataHandleSystem.unsafeGetInstanceAttributeSendData(shaderIndex)
      |> ArraySystem.reduceStatei(
           [@bs]
           (
             (state, sendData, index) =>
               state
               |> _sendTransformMatrixDataBuffer((gl, extension), (sendData, strideForSend, index))
           ),
           state
         );
      state
    } :
    state
    |> _sendTransformMatrixData(dataTuple, fillMatrixTypeArrFunc)
    |> SourceInstanceAdmin.markIsSendTransformMatrixData(sourceInstance, true);

let _sendDynamicTransformMatrixData =
    (
      (glDataTuple, (_, sourceInstance, _, _, _, _, _), matrixMapTuple) as dataTuple,
      fillMatrixTypeArrFunc,
      state
    ) =>
  state
  |> SourceInstanceAdmin.markIsSendTransformMatrixData(sourceInstance, false)
  |> _sendTransformMatrixData(dataTuple, fillMatrixTypeArrFunc);

let _geMatrixMapTuple = (state) => {
  let {matrixInstanceBufferMap} = VboBufferGetStateDataUtils.getVboBufferData(state);
  let {matrixFloat32ArrayMap, matrixInstanceBufferCapacityMap} =
    SourceInstanceAdmin.getSourceInstanceData(state);
  (matrixInstanceBufferCapacityMap, matrixInstanceBufferMap, matrixFloat32ArrayMap)
};

let render =
    (
      gl,
      (uid, defaultCapacity, strideForCapacity, strideForSend),
      (renderFunc, fillMatrixTypeArrFunc),
      state: StateDataType.state
    ) => {
  /* TODO optimize for static data:
     use bufferData instead of bufferSubData(use STATIC_DRAW)
     use accurate buffer capacity(can't change) */
  let (state, shaderIndex, geometryIndex) = [@bs] renderFunc(gl, uid, state);
  /* TODO move to function */
  let extension =
    GPUStateUtils.getGpuDetectData(state).extensionInstancedArrays |> Js.Option.getExn;
  let sourceInstance = GameObjectGetComponentCommon.unsafeGetSourceInstanceComponent(uid, state);
  let objectInstanceArray = SourceInstanceAdmin.getObjectInstanceArray(sourceInstance, state);
  let instanceRenderListCount = Js.Array.length(objectInstanceArray) + 1;
  let glDataTuple = (gl, extension, shaderIndex);
  let instanceDataTuple = (
    uid,
    sourceInstance,
    defaultCapacity,
    strideForCapacity,
    strideForSend,
    objectInstanceArray,
    instanceRenderListCount
  );
  let matrixMapTuple = _geMatrixMapTuple(state);
  let dataTuple = (glDataTuple, instanceDataTuple, matrixMapTuple);
  let state =
    SourceInstanceAdmin.isTransformStatic(sourceInstance, state) ?
      _sendStaticTransformMatrixData(dataTuple, fillMatrixTypeArrFunc, state) :
      _sendDynamicTransformMatrixData(dataTuple, fillMatrixTypeArrFunc, state);
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
  /* TODO unbind? */
  state
};