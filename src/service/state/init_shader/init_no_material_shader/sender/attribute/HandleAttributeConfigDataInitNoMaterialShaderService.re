open WonderWebgl.GlType;

open WonderWebgl.Gl;

open AllRenderConfigType;

open AllGLSLSenderType;

let _addOtherArrayBufferSendData =
    ((gl, program, name, buffer, type_, attributeLocationMap), sendDataArr) =>
  sendDataArr
  |> ArrayService.push({
       pos:
         AllGLSLLocationService.getAttribLocationAndCache(
           program,
           name,
           attributeLocationMap,
           gl,
         ),
       size: SendGLSLDataService.getBufferSizeByType(type_),
       buffer,
       sendFunc: SendGLSLDataSendRenderDataService.sendBuffer,
     });

let _addElementBufferSendData = (buffer, sendDataArr) =>
  sendDataArr
  |> ArrayService.push({
       pos: 0,
       size: 0,
       buffer,
       sendFunc: DrawGLSLInitShaderAllService.bindElementArrayBuffer,
     });

let _readAttributes =
    ((gl, program, attributeLocationMap), sendDataArr, attributes) =>
  attributes |> OptionService.isJsonSerializedValueNone ?
    sendDataArr :
    attributes
    |> OptionService.unsafeGetJsonSerializedValue
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. sendDataArr, {name, buffer, type_}) =>
           ! (name |> OptionService.isJsonSerializedValueNone)
           && ! (type_ |> OptionService.isJsonSerializedValueNone) ?
             {
               let name = name |> OptionService.unsafeGetJsonSerializedValue;
               let type_ = type_ |> OptionService.unsafeGetJsonSerializedValue;

               switch (buffer) {
               /* | AllVboBufferType.Instance_m_matrix =>
                  HandleAttributeConfigDataInitMaterialAllService.addModelMatrixInstanceArrayBufferSendData(
                    (gl, program, name, attributeLocationMap),
                    sendDataArr,
                  ) */
               | _ =>
                 _addOtherArrayBufferSendData(
                   (gl, program, name, buffer, type_, attributeLocationMap),
                   sendDataArr,
                 )
               };
             } :
             _addElementBufferSendData(buffer, sendDataArr),
         sendDataArr,
       );

let _readAttributeSendData =
    (
      shaderLibDataArr,
      gl,
      program,
      /* readAttributesFunc, */
      attributeLocationMap,
    ) =>
  shaderLibDataArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. sendDataArr, {variables}) =>
         variables |> OptionService.isJsonSerializedValueNone ?
           sendDataArr :
           {
             let {attributes} =
               variables |> OptionService.unsafeGetJsonSerializedValue;

             _readAttributes(
               (gl, program, attributeLocationMap),
               sendDataArr,
               attributes,
             );
           },
       [||],
     );

let _setToAttributeSendMap =
    (shaderIndex, attributeLocationMap, glslSenderRecord, sendDataArr) => {
  let {attributeSendDataMap} = glslSenderRecord;
  attributeSendDataMap
  |> WonderCommonlib.MutableSparseMapService.set(shaderIndex, sendDataArr)
  |> ignore;
  /* instanceAttributeSendDataMap
     |> WonderCommonlib.MutableSparseMapService.set(
          shaderIndex,
          instanceSendNoCachableDataArr,
        )
     |> ignore; */
  glslSenderRecord;
};

let addAttributeSendData =
    (
      (gl, shaderIndex: int, program: program),
      shaderLibDataArr: shaderLibs,
      /* readAttributeSendDataFunc, */
      (glslSenderRecord, glslLocationRecord),
    ) => {
  let attributeLocationMap =
    HandleShaderConfigDataMapService.getOrCreateHashMap(
      glslLocationRecord
      |> AllGLSLLocationService.getAttributeLocationMap(shaderIndex),
    );
  (
    _readAttributeSendData(shaderLibDataArr, gl, program, attributeLocationMap)
    |> _setToAttributeSendMap(
         shaderIndex,
         attributeLocationMap,
         glslSenderRecord,
       ),
    glslLocationRecord
    |> AllGLSLLocationService.setAttributeLocationMap(
         shaderIndex,
         attributeLocationMap,
       ),
  );
};