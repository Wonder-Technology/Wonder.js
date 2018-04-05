open MaterialType;

open GeometryType;

open ComponentType;

open GlType;

open Js.Typed_array;

type shaderCacheMap = WonderCommonlib.HashMapService.t(array(float));

type uniformCacheMap = array(shaderCacheMap);

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
        StateSendAttributeType.sendAttributeState
      ) =>
      unit
    )
};

type instanceAttributeSendData = {
  pos: attributeLocation,
  size: int,
  getOffsetFunc: [@bs] (int => int)
};

type uniformRenderObjectSendModelData = {
  pos: uniformLocation,
  getDataFunc: [@bs] ((component, StateSendUniformType.sendUniformState) => Float32Array.t),
  sendDataFunc: [@bs] ((webgl1Context, uniformLocation, Float32Array.t) => unit)
};

type uniformRenderObjectSendMaterialData = {
  shaderCacheMap,
  name: string,
  pos: uniformLocation,
  getDataFunc: [@bs] ((component, StateSendUniformType.sendUniformState) => array(float)),
  sendDataFunc:
    [@bs] ((webgl1Context, shaderCacheMap, (string, uniformLocation), array(float)) => unit)
};

type uniformShaderSendNoCachableData = {
  pos: uniformLocation,
  getDataFunc: [@bs] (Float32Array.t => StateSendUniformType.sendUniformState),
  sendDataFunc: [@bs] ((webgl1Context, uniformLocation, Float32Array.t) => unit)
};

type uniformShaderSendCachableData = {
  shaderCacheMap,
  name: string,
  pos: uniformLocation,
  getDataFunc: [@bs] (StateSendUniformType.sendUniformState => array(float)),
  sendDataFunc:
    [@bs] ((webgl1Context, shaderCacheMap, (string, uniformLocation), array(float)) => unit)
};

type uniformShaderSendCachableFunctionData = {
  program,
  shaderCacheMap,
  locationMap: GLSLLocationType.uniformLocationMapOfShader,
  sendCachableFunctionDataFunc:
    [@bs]
    (
      (
        webgl1Context,
        (program, shaderCacheMap, GLSLLocationType.uniformLocationMapOfShader),
        StateSendUniformType.sendUniformState
      ) =>
      unit
    )
};

type uniformInstanceSendNoCachableData = {
  pos: uniformLocation,
  getDataFunc: [@bs] ((component, StateSendUniformType.sendUniformState) => Float32Array.t),
  sendDataFunc: [@bs] ((webgl1Context, uniformLocation, Float32Array.t) => unit)
};

type glslSenderRecord = {
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
  mutable vertexAttribHistoryArray: array(bool),
  mutable lastSendMaterial: option(material),
  mutable lastSendGeometry: option((geometry, int))
};