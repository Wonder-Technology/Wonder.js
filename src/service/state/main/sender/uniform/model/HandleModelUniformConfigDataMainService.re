let _getModelMatrixNoCachableData =
  [@bs]
  (
    (transform, state: MainStateDataType.state) =>
      UpdateTransformService.updateAndGetLocalToWorldMatrixTypeArray(transform, state.globalTempRecord, state |> RecordTransformMainService.getRecord)
  );

let _getNormalMatrixNoCachableData =
  [@bs]
  (
    (transform, state: MainStateDataType.state) => {
      let (normalMatrix, _) = UpdateTransformService.updateAndGetNormalMatrixTypeArray(transform, state.globalTempRecord, state |> RecordTransformMainService.getRecord);
      normalMatrix
    }
  );

let addModelSendData = ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch field {
  | "mMatrix" =>
    HandleUniformRenderObjectModelMainService.addUniformSendDataByType(
      (pos, type_),
      sendDataArrTuple,
      _getModelMatrixNoCachableData
    )
  | "normalMatrix" =>
    HandleUniformRenderObjectModelMainService.addUniformSendDataByType(
      (pos, type_),
      sendDataArrTuple,
      _getNormalMatrixNoCachableData
    )
  | "instance_mMatrix" =>
    HandleUniformInstanceNoCachableMainService.addUniformSendDataByType(
      pos,
      sendDataArrTuple,
      (_getModelMatrixNoCachableData, SendGLSLDataMainService.sendMatrix4)
    )
  | "instance_normalMatrix" =>
    HandleUniformInstanceNoCachableMainService.addUniformSendDataByType(
      pos,
      sendDataArrTuple,
      (_getNormalMatrixNoCachableData, SendGLSLDataMainService.sendMatrix3)
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