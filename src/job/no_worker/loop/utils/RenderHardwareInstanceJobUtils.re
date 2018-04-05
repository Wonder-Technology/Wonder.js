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
  SendGLSLDataService.enableVertexAttribArray(
    gl,
    pos,
    state.glslSenderRecord.vertexAttribHistoryArray,
    state
  )
};

let _sendTransformMatrixDataBufferData = (glDataTuple, shaderIndex, stride, state) =>
  state
  |> HandleAttributeConfigDataRenderService.unsafeGetInstanceAttributeSendData(shaderIndex)
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
      (transformIndex, sourceInstance),
      (
        (gl, extension, shaderIndex),
        (
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
  [@bs] fillMatrixTypeArrFunc(transformIndex, matricesArrayForInstance, (state, 0))
  |> _fillObjectInstanceData(objectInstanceArray, matricesArrayForInstance, fillMatrixTypeArrFunc)
  |> _updateAndSendTransformMatrixDataBufferData(
       (gl, extension),
       shaderIndex,
       (strideForSend, matricesArrayForInstance, matrixInstanceBuffer)
     )
};

let _sendStaticTransformMatrixData =
    (
      (transformIndex, sourceInstance) as componentTuple,
      (
        (gl, extension, shaderIndex),
        (
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
      let state =
        state |> _sendTransformMatrixData(componentTuple, dataTuple, fillMatrixTypeArrFunc);
      {
        ...state,
        sourceInstanceRecord:
          state.sourceInstanceRecord
          |> StaticSourceInstanceService.markIsSendTransformMatrixData(sourceInstance, true)
      }
    };

let _sendDynamicTransformMatrixData =
    (
      (transformIndex, sourceInstance) as componentTuple,
      (glDataTuple, _, matrixMapTuple) as dataTuple,
      fillMatrixTypeArrFunc,
      {sourceInstanceRecord} as state
    ) =>
  {
    ...state,
    sourceInstanceRecord:
      sourceInstanceRecord
      |> StaticSourceInstanceService.markIsSendTransformMatrixData(sourceInstance, false)
  }
  |> _sendTransformMatrixData(componentTuple, dataTuple, fillMatrixTypeArrFunc);

let _geMatrixMapTuple = (state) => {
  let {matrixInstanceBufferMap} = state.vboBufferRecord;
  let {matrixFloat32ArrayMap, matrixInstanceBufferCapacityMap} = state.sourceInstanceRecord;
  (matrixInstanceBufferCapacityMap, matrixInstanceBufferMap, matrixFloat32ArrayMap)
};

let _renderSourceInstanceGameObject = (gl, indexTuple, renderFunc, state) =>
  [@bs] renderFunc(gl, indexTuple, state);

let _prepareData =
    (
      gl,
      shaderIndex,
      (sourceInstance, defaultCapacity, strideForCapacity, strideForSend),
      state: MainStateDataType.state
    ) => {
  let extension = GPUDetectService.unsafeGetInstanceExtension(state.gpuDetectRecord);
  let objectInstanceArray =
    ObjectInstanceArraySourceInstanceService.getObjectInstanceArray(
      sourceInstance,
      state.sourceInstanceRecord
    );
  let instanceRenderListCount = Js.Array.length(objectInstanceArray) + 1;
  (
    (gl, extension, shaderIndex),
    (
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
      (
        (
          transformIndex,
          materialIndex,
          shaderIndex,
          geometryIndex,
          geometryType,
          sourceInstance
        ) as indexTuple,
        defaultCapacity,
        strideForCapacity,
        strideForSend
      ),
      (renderFunc, fillMatrixTypeArrFunc),
      state: MainStateDataType.state
    ) => {
  /* TODO optimize for static record:
     use bufferData instead of bufferSubData(use STATIC_DRAW)
     use accurate buffer capacity(can't change) */
  let state =
    _renderSourceInstanceGameObject(
      gl,
      (transformIndex, materialIndex, shaderIndex, geometryIndex, geometryType),
      renderFunc,
      state
    );
  let ((gl, extension, _), (_, _, _, _, instanceRenderListCount), matrixMapTuple) as dataTuple =
    _prepareData(
      gl,
      shaderIndex,
      (sourceInstance, defaultCapacity, strideForCapacity, strideForSend),
      state
    );
  let state =
    StaticSourceInstanceService.isTransformStatic(sourceInstance, state.sourceInstanceRecord) ?
      _sendStaticTransformMatrixData(
        (transformIndex, sourceInstance),
        dataTuple,
        fillMatrixTypeArrFunc,
        state
      ) :
      _sendDynamicTransformMatrixData(
        (transformIndex, sourceInstance),
        dataTuple,
        fillMatrixTypeArrFunc,
        state
      );
  let getIndicesCountFunc = CurrentComponentDataMapSendAttributeService.getGetIndicesCountFunc(geometryType);
  DrawGLSLService.drawElementsInstancedANGLE(
    (
      RenderGeometryService.getDrawMode(gl),
      RenderGeometryService.getIndexType(gl),
      RenderGeometryService.getIndexTypeSize(gl),
      getIndicesCountFunc(geometryIndex, state),
      instanceRenderListCount
    ),
    Obj.magic(extension)
  );
  /* TODO unbind? */
  state
};

let fillMatrixTypeArr = (transformIndex, matricesArrayForInstance, (state, offset)) =>
  TypeArrayService.fillFloat32ArrayWithFloat32Array(
    (matricesArrayForInstance, offset),
    (
      UpdateTransformService.updateAndGetLocalToWorldMatrixTypeArray(
        transformIndex,
        state.globalTempRecord,
        state |> RecordTransformMainService.getRecord
      ),
      0
    ),
    16
  );