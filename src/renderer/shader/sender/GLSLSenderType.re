open GlType;

open StateDataType;

/* type attributeSendData = {
     /* pos: int,
     buffer:buffer,
     size: int */
     sendBufferFunc: state => unit;
   }; */
/* type glslSenderData = {attributeSendDataMap: Js.Dict.t(array(attributeSendData))}; */
type glslSenderData = {
  attributeSendDataMap: Js.Dict.t(array((state => unit))),
  vertexAttribHistoryMap: Js.Dict.t(bool)
};