open MainStateDataType;

open VboBufferType;

open SourceInstanceType;

open InstanceBufferMainService;

let _fillObjectInstanceData =
    (objectInstanceArray, matricesArrayForInstance, fillMatrixTypeArrFunc, stateOffsetTuple) => {
  let (state, offset) =
    objectInstanceArray
    |> WonderCommonlib.ArrayService.reduceOneParam(
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
  SendGLSLDataMainService.enableVertexAttribArray(
    gl,
    pos,
    state.glslSenderRecord.vertexAttribHistoryArray,
    state
  )
};

let _sendTransformMatrixDataBufferData = (glDataTuple, shaderIndex, stride, state) =>
  state
  |> HandleAttributeConfigDataMainService.unsafeGetInstanceAttributeSendData(shaderIndex)
  |> ReduceStateMainService.reduceStatei(
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
    InstanceBufferMainService.getOrCreateBuffer(
      (gl, sourceInstance, defaultCapacity),
      (matrixInstanceBufferCapacityMap, matrixInstanceBufferMap),
      state
    );
  let matricesArrayForInstance =
    InstanceBufferMainService.getOrCreateMatrixFloat32Array(
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
  StaticSourceInstanceService.isSendTransformMatrixData(sourceInstance, state.sourceInstanceRecord) ?
    {
      InstanceBufferMainService.bind(
        gl,
        InstanceBufferMainService.getOrCreateBuffer(
          (gl, sourceInstance, defaultCapacity),
          (matrixInstanceBufferCapacityMap, matrixInstanceBufferMap),
          state
        )
      )
      |> ignore;
      _sendTransformMatrixDataBufferData((gl, extension), shaderIndex, strideForSend, state)
    } :
    {
      let state = state |> _sendTransformMatrixData(dataTuple, fillMatrixTypeArrFunc);
      {
        ...state,
        sourceInstanceRecord:
          state.sourceInstanceRecord
          |> StaticSourceInstanceService.markIsSendTransformMatrixData(sourceInstance, true)
      }
    };

let _sendDynamicTransformMatrixData =
    (
      (glDataTuple, (_, sourceInstance, _, _, _, _, _), matrixMapTuple) as dataTuple,
      fillMatrixTypeArrFunc,
      {sourceInstanceRecord} as state
    ) =>
  {
    ...state,
    sourceInstanceRecord:
      sourceInstanceRecord
      |> StaticSourceInstanceService.markIsSendTransformMatrixData(sourceInstance, false)
  }
  |> _sendTransformMatrixData(dataTuple, fillMatrixTypeArrFunc);

let _geMatrixMapTuple = (state) => {
  let {matrixInstanceBufferMap} = state.vboBufferRecord;
  let {matrixFloat32ArrayMap, matrixInstanceBufferCapacityMap} = state.sourceInstanceRecord;
  (matrixInstanceBufferCapacityMap, matrixInstanceBufferMap, matrixFloat32ArrayMap)
};

let _renderSourceInstanceGameObject = (gl, uid, renderFunc, state) =>
  [@bs] renderFunc(gl, uid, state);

let _prepareData =
    (
      gl,
      shaderIndex,
      (uid, defaultCapacity, strideForCapacity, strideForSend),
      state: MainStateDataType.state
    ) => {
  let extension = GPUDetectService.unsafeGetInstanceExtension(state.gpuDetectRecord);
  let sourceInstance =
    GetComponentGameObjectService.unsafeGetSourceInstanceComponent(uid, state.gameObjectRecord);
  let objectInstanceArray =
    ObjectInstanceArraySourceInstanceService.getObjectInstanceArray(
      sourceInstance,
      state.sourceInstanceRecord
    );
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
      state: MainStateDataType.state
    ) => {
  /* TODO optimize for static record:
     use bufferData instead of bufferSubData(use STATIC_DRAW)
     use accurate buffer capacity(can't change) */
  let (state, shaderIndex, geometryIndex, mappedGeometryIndex) =
    _renderSourceInstanceGameObject(gl, uid, renderFunc, state);
  let (
        (gl, extension, _),
        (_, sourceInstance, _, _, _, _, instanceRenderListCount),
        matrixMapTuple
      ) as dataTuple =
    _prepareData(gl, shaderIndex, (uid, defaultCapacity, strideForCapacity, strideForSend), state);
  let state =
    StaticSourceInstanceService.isTransformStatic(sourceInstance, state.sourceInstanceRecord) ?
      _sendStaticTransformMatrixData(dataTuple, fillMatrixTypeArrFunc, state) :
      _sendDynamicTransformMatrixData(dataTuple, fillMatrixTypeArrFunc, state);
  DrawGLSLMainService.drawElementsInstancedANGLE(
    (
      RenderGeometryService.getDrawMode(gl),
      RenderGeometryService.getIndexType(gl),
      RenderGeometryService.getIndexTypeSize(gl),
      IndicesGeometryMainService.getIndicesCount(mappedGeometryIndex, state),
      instanceRenderListCount
    ),
    Obj.magic(extension)
  );
  /* TODO unbind? */
  state
};

let fillMatrixTypeArr = (uid, transform, matricesArrayForInstance, (state, offset)) =>
  TypeArrayService.fillFloat32ArrayWithFloat32Array(
    (matricesArrayForInstance, offset),
    (
      UpdateTransformService.updateAndGetLocalToWorldMatrixTypeArray(
        transform,
        state.globalTempRecord,
        state |> RecordTransformMainService.getRecord
      ),
      0
    ),
    16
  );