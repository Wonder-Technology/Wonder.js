let _getModelMatrixNoCachableData =
  [@bs]
  (
    (transform, state: StateDataType.state) =>
      UpdateTransformService.updateAndGetLocalToWorldMatrixTypeArray(transform, state.globalTempRecord, state.transformRecord)
  );

let _getNormalMatrixNoCachableData =
  [@bs]
  (
    (transform, state: StateDataType.state) => {
      let (normalMatrix, _) = UpdateTransformService.updateAndGetNormalMatrixTypeArray(transform, state.globalTempRecord, state.transformRecord);
      normalMatrix
    }
  );

let addModelSendData = ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch field {
  | "mMatrix" =>
    HandleUniformRenderObjectModelService.addUniformSendDataByType(
      (pos, type_),
      sendDataArrTuple,
      _getModelMatrixNoCachableData
    )
  | "normalMatrix" =>
    HandleUniformRenderObjectModelService.addUniformSendDataByType(
      (pos, type_),
      sendDataArrTuple,
      _getNormalMatrixNoCachableData
    )
  | "instance_mMatrix" =>
    HandleUniformInstanceNoCachableService.addUniformSendDataByType(
      pos,
      sendDataArrTuple,
      (_getModelMatrixNoCachableData, SendGLSLDataService.sendMatrix4)
    )
  | "instance_normalMatrix" =>
    HandleUniformInstanceNoCachableService.addUniformSendDataByType(
      pos,
      sendDataArrTuple,
      (_getNormalMatrixNoCachableData, SendGLSLDataService.sendMatrix3)
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_addModelSendData",
        ~description={j|unknow field:$field|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };