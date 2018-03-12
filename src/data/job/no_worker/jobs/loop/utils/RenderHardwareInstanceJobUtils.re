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
  Gl.vertexAttribPointer(
    pos,
    size,
    Gl.getFloat(gl),
    Js.false_,
    stride,
    [@bs] getOffsetFunc(index),
    gl
  );
  [@bs] Obj.magic(extension)##vertexAttribDivisorANGLE(pos, 1) |> ignore;
  GLSLSenderSendDataUtils.enableVertexAttribArray(
    gl,
    pos,
    GLSLSenderStateUtils.getGLSLSenderData(state).vertexAttribHistoryArray,
    state
  )
};

let _sendTransformMatrixDataBufferData = (glDataTuple, shaderIndex, stride, state) =>
  state
  |> GLSLSenderConfigDataHandleSystem.unsafeGetInstanceAttributeSendData(shaderIndex)
  |> ArraySystem.reduceStatei(
       [@bs]
       (
         (state, sendData, index) =>
           state |> _sendTransformMatrixDataBuffer(glDataTuple, (sendData, stride, index))
       ),
       state
     );

let _updateAndSendTransformMatrixDataBufferData =
    (
      (gl, extension) as glDataTuple,
      shaderIndex,
      (stride, matricesArrayForInstance, matrixInstanceBuffer),
      state
    ) => {
  updateData(gl, matricesArrayForInstance, matrixInstanceBuffer) |> ignore;
  _sendTransformMatrixDataBufferData(glDataTuple, shaderIndex, stride, state)
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
  |> _updateAndSendTransformMatrixDataBufferData(
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
      InstanceBufferSystem.bind(
        gl,
        InstanceBufferSystem.getOrCreateBuffer(
          (gl, sourceInstance, defaultCapacity),
          (matrixInstanceBufferCapacityMap, matrixInstanceBufferMap),
          state
        )
      )
      |> ignore;
      _sendTransformMatrixDataBufferData((gl, extension), shaderIndex, strideForSend, state)
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

let _renderSourceInstanceGameObject = (gl, uid, renderFunc, state) =>
  [@bs] renderFunc(gl, uid, state);

let _prepareData =
    (
      gl,
      shaderIndex,
      (uid, defaultCapacity, strideForCapacity, strideForSend),
      state: StateDataType.state
    ) => {
  let extension = GPUDetectSystem.unsafeGetInstanceExtension(state);
  let sourceInstance = GameObjectGetComponentCommon.unsafeGetSourceInstanceComponent(uid, state);
  let objectInstanceArray = SourceInstanceAdmin.getObjectInstanceArray(sourceInstance, state);
  let instanceRenderListCount = Js.Array.length(objectInstanceArray) + 1;
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
    _geMatrixMapTuple(state)
  )
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
  let (state, shaderIndex, geometryIndex) =
    _renderSourceInstanceGameObject(gl, uid, renderFunc, state);
  let (
        (gl, extension, _),
        (_, sourceInstance, _, _, _, _, instanceRenderListCount),
        matrixMapTuple
      ) as dataTuple =
    _prepareData(gl, shaderIndex, (uid, defaultCapacity, strideForCapacity, strideForSend), state);
  let state =
    SourceInstanceAdmin.isTransformStatic(sourceInstance, state) ?
      _sendStaticTransformMatrixData(dataTuple, fillMatrixTypeArrFunc, state) :
      _sendDynamicTransformMatrixData(dataTuple, fillMatrixTypeArrFunc, state);
  GLSLSenderDrawUtils.drawElementsInstancedANGLE(
    (
      RenderGeometryService.getDrawMode(gl),
      RenderGeometryService.getIndexType(gl),
      RenderGeometryService.getIndexTypeSize(gl),
      IndicesService.getIndicesCount(geometryIndex, state.boxGeometryRecord.indicesMap),
      instanceRenderListCount
    ),
    Obj.magic(extension)
  );
  /* TODO unbind? */
  state
};