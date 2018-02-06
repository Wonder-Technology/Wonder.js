let _getModelMatrixNoCachableData =
  [@bs]
  (
    (transform, state: StateDataType.state) =>
      TransformAdmin.getLocalToWorldMatrixTypeArray(transform, state)
  );

let _getNormalMatrixNoCachableData =
  [@bs]
  (
    (transform, state: StateDataType.state) => {
      let (normalMatrix, _) = TransformAdmin.getNormalMatrixTypeArray(transform, state);
      normalMatrix
    }
  );

let addModelSendData = ((field, pos, name, type_, uniformCacheMap), sendDataArrTuple) =>
  switch field {
  | "mMatrix" =>
    GLSLSenderConfigDataHandleUniformRenderObjectModelCommon.addUniformSendDataByType(
      (pos, type_),
      sendDataArrTuple,
      _getModelMatrixNoCachableData
    )
  | "normalMatrix" =>
    GLSLSenderConfigDataHandleUniformRenderObjectModelCommon.addUniformSendDataByType(
      (pos, type_),
      sendDataArrTuple,
      _getNormalMatrixNoCachableData
    )
  | "instance_mMatrix" =>
    GLSLSenderConfigDataHandleUniformInstanceNoCachableCommon.addUniformSendDataByType(
      pos,
      sendDataArrTuple,
      (_getModelMatrixNoCachableData, GLSLSenderSendDataUtils.sendMatrix4)
    )
  | "instance_normalMatrix" =>
    GLSLSenderConfigDataHandleUniformInstanceNoCachableCommon.addUniformSendDataByType(
      pos,
      sendDataArrTuple,
      (_getNormalMatrixNoCachableData, GLSLSenderSendDataUtils.sendMatrix3)
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