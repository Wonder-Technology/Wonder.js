open StateRenderType;

open AllVboBufferType;

open RenderSourceInstanceType;

open InstanceBufferRenderService;

open AllGLSLSenderType;

let _fillObjectInstanceData =
    (
      objectInstanceTransformDataTuple,
      matricesArrayForInstance,
      fillMatrixTypeArrFunc,
      getRenderDataSubState: SubStateGetRenderDataType.getRenderDataSubState,
      offset: int,
    ) => {
  let _ =
    ObjectInstanceCollectionService.reduceObjectInstanceTransformCollection(
      objectInstanceTransformDataTuple,
      offset,
      (. offset, objectInstanceTransform) =>
      fillMatrixTypeArrFunc(.
        objectInstanceTransform,
        matricesArrayForInstance,
        getRenderDataSubState,
        offset,
      )
    );

  ();
};

let _sendTransformMatrixDataBuffer =
    (
      (gl, extension),
      ({pos, size, getOffsetFunc}: instanceAttributeSendData, stride, index),
      sendRenderDataSubState: SubStateSendRenderDataType.sendRenderDataSubState,
    ) => {
  WonderWebgl.Gl.vertexAttribPointer(
    pos,
    size,
    WonderWebgl.Gl.getFloat(gl),
    false,
    stride,
    getOffsetFunc(. index),
    gl,
  );
  Obj.magic(extension)##vertexAttribDivisorANGLE(. pos, 1) |> ignore;
  SendGLSLDataService.enableVertexAttribArray(
    gl,
    pos,
    sendRenderDataSubState.vertexAttribHistoryArray,
  );
  sendRenderDataSubState;
};

let _sendTransformMatrixDataBufferData =
    (
      glDataTuple,
      shaderIndex,
      stride,
      (sendRenderDataSubState, {glslSenderRecord} as state),
    ) => {
  glslSenderRecord
  |> HandleAttributeConfigDataService.unsafeGetInstanceAttributeSendData(
       shaderIndex,
     )
  |> WonderCommonlib.ArrayService.forEachi((. sendData, index) =>
       sendRenderDataSubState
       |> _sendTransformMatrixDataBuffer(
            glDataTuple,
            (sendData, stride, index),
          )
     );

  state;
};

let _updateAndSendTransformMatrixDataBufferData =
    (
      (gl, extension) as glDataTuple,
      shaderIndex,
      (stride, matricesArrayForInstance, matrixInstanceBuffer),
      (sendRenderDataSubState, state),
    ) => {
  updateData(gl, matricesArrayForInstance, matrixInstanceBuffer) |> ignore;
  _sendTransformMatrixDataBufferData(
    glDataTuple,
    shaderIndex,
    stride,
    (sendRenderDataSubState, state),
  );
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
          objectInstanceTransformDataTuple,
          instanceRenderListCount,
        ),
        (
          matrixInstanceBufferCapacityMap,
          matrixInstanceBufferMap,
          matrixFloat32ArrayMap,
        ),
      ),
      fillMatrixTypeArrFunc,
      state,
    ) => {
  let matrixInstanceBuffer =
    InstanceBufferRenderService.getOrCreateBuffer(
      (gl, sourceInstance, defaultCapacity),
      (matrixInstanceBufferCapacityMap, matrixInstanceBufferMap),
      state,
    );
  let matricesArrayForInstance =
    InstanceBufferRenderService.getOrCreateMatrixFloat32Array(
      sourceInstance,
      defaultCapacity,
      (matrixInstanceBufferCapacityMap, matrixFloat32ArrayMap),
      state,
    );
  let (matrixInstanceBuffer, matricesArrayForInstance) =
    setCapacityAndUpdateBufferTypeArray(
      (
        gl,
        sourceInstance,
        instanceRenderListCount * strideForCapacity,
        defaultCapacity,
      ),
      (matrixInstanceBuffer, matricesArrayForInstance),
      (
        matrixInstanceBufferMap,
        matrixFloat32ArrayMap,
        matrixInstanceBufferCapacityMap,
      ),
      state,
    );

  let getRenderDataSubState =
    CreateGetRenederDataSubStateRenderService.createState(state);
  let _ =
    fillMatrixTypeArrFunc(.
      transformIndex,
      matricesArrayForInstance,
      getRenderDataSubState,
      0,
    )
    |> _fillObjectInstanceData(
         objectInstanceTransformDataTuple,
         matricesArrayForInstance,
         fillMatrixTypeArrFunc,
         getRenderDataSubState,
       );

  _updateAndSendTransformMatrixDataBufferData(
    (gl, extension),
    shaderIndex,
    (strideForSend, matricesArrayForInstance, matrixInstanceBuffer),
    (CreateSendRenederDataSubStateRenderService.createState(state), state),
  );
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
          _,
          instanceRenderListCount,
        ),
        (
          matrixInstanceBufferCapacityMap,
          matrixInstanceBufferMap,
          matrixFloat32ArrayMap,
        ),
      ) as dataTuple,
      fillMatrixTypeArrFunc,
      state,
    ) =>
  MarkIsSendTransformMatrixDataService.isSendTransformMatrixData(
    sourceInstance,
    state.sourceInstanceRecord.isSendTransformMatrixDataMap,
  ) ?
    {
      InstanceBufferRenderService.bind(
        gl,
        InstanceBufferRenderService.getOrCreateBuffer(
          (gl, sourceInstance, defaultCapacity),
          (matrixInstanceBufferCapacityMap, matrixInstanceBufferMap),
          state,
        ),
      )
      |> ignore;

      let sendRenderDataSubState =
        CreateSendRenederDataSubStateRenderService.createState(state);

      _sendTransformMatrixDataBufferData(
        (gl, extension),
        shaderIndex,
        strideForSend,
        (sendRenderDataSubState, state),
      );
    } :
    {
      let state =
        state
        |> _sendTransformMatrixData(
             componentTuple,
             dataTuple,
             fillMatrixTypeArrFunc,
           );
      {
        ...state,
        sourceInstanceRecord:
          state.sourceInstanceRecord
          |> StaticRenderSourceInstanceService.markIsSendTransformMatrixData(
               sourceInstance,
               true,
             ),
      };
    };

let _sendDynamicTransformMatrixData =
    (
      (transformIndex, sourceInstance) as componentTuple,
      (glDataTuple, _, matrixMapTuple) as dataTuple,
      fillMatrixTypeArrFunc,
      {sourceInstanceRecord} as state,
    ) =>
  {
    ...state,
    sourceInstanceRecord:
      sourceInstanceRecord
      |> StaticRenderSourceInstanceService.markIsSendTransformMatrixData(
           sourceInstance,
           false,
         ),
  }
  |> _sendTransformMatrixData(
       componentTuple,
       dataTuple,
       fillMatrixTypeArrFunc,
     );

let _geMatrixMapTuple = state => {
  let {matrixInstanceBufferMap} = state.vboBufferRecord;
  let {matrixFloat32ArrayMap, matrixInstanceBufferCapacityMap} =
    state.sourceInstanceRecord;
  (
    matrixInstanceBufferCapacityMap,
    matrixInstanceBufferMap,
    matrixFloat32ArrayMap,
  );
};

let _renderSourceInstanceGameObject = (gl, indexTuple, renderFunc, state) =>
  renderFunc(. gl, indexTuple, state);

let _prepareData =
    (
      gl,
      shaderIndex,
      (sourceInstance, defaultCapacity, strideForCapacity, strideForSend),
      state,
    ) => {
  let extension =
    AllGPUDetectService.unsafeGetInstanceExtension(state.gpuDetectRecord);
  let (objectInstanceTransformIndex, objectInstanceTransformDataTuple) =
    BuildObjectInstanceTransformDataTupleUtils.build(sourceInstance, state);
  let instanceRenderListCount =
    ObjectInstanceCollectionService.getObjectInstanceTransformCount(
      objectInstanceTransformIndex,
    )
    + 1;
  (
    (gl, extension, shaderIndex),
    (
      defaultCapacity,
      strideForCapacity,
      strideForSend,
      objectInstanceTransformDataTuple,
      instanceRenderListCount,
    ),
    _geMatrixMapTuple(state),
  );
};

let _unbind = (shaderIndex, extension, state) => {
  state.glslSenderRecord
  |> HandleAttributeConfigDataService.unsafeGetInstanceAttributeSendData(
       shaderIndex,
     )
  |> WonderCommonlib.ArrayService.forEach(
       (. {pos}: instanceAttributeSendData) =>
       Obj.magic(extension)##vertexAttribDivisorANGLE(. pos, 0) |> ignore
     );
  state;
};

let render =
    (
      gl,
      (
        (
          transformIndex,
          materialIndex,
          shaderIndex,
          meshRendererIndex,
          geometryIndex,
          sourceInstance,
        ) as indexTuple,
        defaultCapacity,
        strideForCapacity,
        strideForSend,
      ),
      (renderFunc, fillMatrixTypeArrFunc),
      state,
    ) => {
  /* TODO optimize for static record:
     use bufferData instead of bufferSubData(use STATIC_DRAW)
     use accurate buffer capacity(can't change) */
  let state =
    _renderSourceInstanceGameObject(
      gl,
      (
        transformIndex,
        materialIndex,
        shaderIndex,
        meshRendererIndex,
        geometryIndex,
      ),
      renderFunc,
      state,
    );
  let (
        (gl, extension, _),
        (_, _, _, _, instanceRenderListCount),
        matrixMapTuple,
      ) as dataTuple =
    _prepareData(
      gl,
      shaderIndex,
      (sourceInstance, defaultCapacity, strideForCapacity, strideForSend),
      state,
    );
  let state =
    StaticRenderSourceInstanceService.isTransformStatic(
      sourceInstance,
      state.sourceInstanceRecord,
    ) ?
      _sendStaticTransformMatrixData(
        (transformIndex, sourceInstance),
        dataTuple,
        fillMatrixTypeArrFunc,
        state,
      ) :
      _sendDynamicTransformMatrixData(
        (transformIndex, sourceInstance),
        dataTuple,
        fillMatrixTypeArrFunc,
        state,
      );
  DrawGLSLService.drawElementsInstancedANGLE(
    (
      DrawModeMeshRendererService.getGlDrawMode(gl, meshRendererIndex, state),
      GeometryRenderService.getIndexType(gl, geometryIndex, state),
      GeometryRenderService.getIndexTypeSize(gl, geometryIndex, state),
      GetGeometryIndicesRenderService.getIndicesCount(. geometryIndex, state),
      instanceRenderListCount,
    ),
    Obj.magic(extension),
  );
  _unbind(shaderIndex, extension, state);
};

let fillMatrixTypeArr =
    (transformIndex, matricesArrayForInstance, state, offset) =>
  TypeArrayService.fillFloat32ArrayWithFloat32Array(
    (matricesArrayForInstance, offset),
    (
      GetTransformDataGetRenderDataService.getLocalToWorldMatrixTypeArray(.
        transformIndex,
        state,
      ),
      0,
    ),
    16,
  );