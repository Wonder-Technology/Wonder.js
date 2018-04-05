open MaterialType;

open GeometryType;

open ComponentType;

open GlType;

open Js.Typed_array;

open GLSLSenderType;

open ProgramType;

open GeometryRenderType;

type attributeSendData = {
  pos: attributeLocation,
  size: int,
  buffer: string,
  sendFunc:
    [@bs]
    (
      (
        webgl1Context,
        (attributeLocation, int),
        GlType.buffer,
        /* StateRenderType.sendAttributeState */
        /* GLSLSenderType.vertexAttribHistoryArray */
        renderState
      ) =>
      unit
    )
}
and instanceAttributeSendData = {
  pos: attributeLocation,
  size: int,
  getOffsetFunc: [@bs] (int => int)
}
and uniformRenderObjectSendModelData = {
  pos: uniformLocation,
  getDataFunc: [@bs] ((component, renderState) => Float32Array.t),
  sendDataFunc: [@bs] ((webgl1Context, uniformLocation, Float32Array.t) => unit)
}
and uniformRenderObjectSendMaterialData = {
  shaderCacheMap,
  name: string,
  pos: uniformLocation,
  getDataFunc: [@bs] ((component, renderState) => array(float)),
  sendDataFunc:
    [@bs] ((webgl1Context, shaderCacheMap, (string, uniformLocation), array(float)) => unit)
}
and uniformShaderSendNoCachableData = {
  pos: uniformLocation,
  getDataFunc: [@bs] (renderState => renderState),
  sendDataFunc: [@bs] ((webgl1Context, uniformLocation, Float32Array.t) => unit)
}
and uniformShaderSendCachableData = {
  shaderCacheMap,
  name: string,
  pos: uniformLocation,
  getDataFunc: [@bs] (renderState => array(float)),
  sendDataFunc:
    [@bs] ((webgl1Context, shaderCacheMap, (string, uniformLocation), array(float)) => unit)
}
and uniformShaderSendCachableFunctionData = {
  program,
  shaderCacheMap,
  locationMap: renderState,
  sendCachableFunctionDataFunc:
    [@bs]
    (
      (
        webgl1Context,
        (program, shaderCacheMap, GLSLLocationType.uniformLocationMapOfShader),
        renderState
      ) =>
      unit
    )
}
and uniformInstanceSendNoCachableData = {
  pos: uniformLocation,
  getDataFunc: [@bs] ((component, renderState) => Float32Array.t),
  sendDataFunc: [@bs] ((webgl1Context, uniformLocation, Float32Array.t) => unit)
}
and glslSenderRecord = {
  attributeSendDataMap: array(array(attributeSendData)),
  instanceAttributeSendDataMap: array(array(instanceAttributeSendData)),
  uniformCacheMap,
  uniformRenderObjectSendModelDataMap: array(array(uniformRenderObjectSendModelData)),
  uniformRenderObjectSendMaterialDataMap: array(array(uniformRenderObjectSendMaterialData)),
  uniformShaderSendNoCachableDataMap: array(array(uniformShaderSendNoCachableData)),
  uniformShaderSendCachableDataMap: array(array(uniformShaderSendCachableData)),
  uniformShaderSendCachableFunctionDataMap: array(array(uniformShaderSendCachableFunctionData)),
  uniformInstanceSendNoCachableDataMap: array(array(uniformInstanceSendNoCachableData)),
  /* drawPointsFuncMap: array((webgl1Context => unit)), */
  mutable vertexAttribHistoryArray,
  mutable lastSendMaterial: option(material),
  mutable lastSendGeometry: option((geometry, int))
}
and renderState = {
  glslSenderRecord,
  programRecord,
  boxGeometryRecord: pointsRecord
  /* customGeometryRecord:  pointsRecord */
  /* vertexAttribHistoryArray: GLSLSenderType.vertexAttribHistoryArray */
};