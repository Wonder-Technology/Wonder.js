open GlType;

open StateDataType;

type uniformSendData = {
  getDataFunc: state => unit,
  sendFloat32ArrDataFunc: Float32Array.t => unit
  /* sendFloat32DataFunc: float => unit;
     sendIntDataFunc: int => unit; */
};

type glslSenderData = {
  attributeSendDataMap: Js.Dict.t(array((state => unit))),
  uniformSendDataMap,
  vertexAttribHistoryMap: Js.Dict.t(bool)
};