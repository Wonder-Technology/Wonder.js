open WonderWebgl.GlType;

open WonderWebgl.Gl;

open RenderConfigType;

let _readAttributes =
  (. (gl, program, attributeLocationMap), sendDataArrTuple, attributes) =>
    attributes |> OptionService.isJsonSerializedValueNone ?
      sendDataArrTuple :
      attributes
      |> OptionService.unsafeGetJsonSerializedValue
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. sendDataArrTuple, {name, buffer, type_}) =>
             ! (name |> OptionService.isJsonSerializedValueNone)
             && ! (type_ |> OptionService.isJsonSerializedValueNone) ?
               {
                 let name = name |> OptionService.unsafeGetJsonSerializedValue;
                 let type_ = type_ |> OptionService.unsafeGetJsonSerializedValue;

                 switch (buffer) {
                 | VboBufferType.Instance_m_matrix =>
                   HandleAttributeConfigDataInitMaterialService.addModelMatrixInstanceArrayBufferSendData(
                     (gl, program, name, attributeLocationMap),
                     sendDataArrTuple,
                   )
                 | _ =>
                   HandleAttributeConfigDataInitMaterialService.addOtherArrayBufferSendData(
                     (gl, program, name, buffer, type_, attributeLocationMap),
                     sendDataArrTuple,
                   )
                 };
               } :
               HandleAttributeConfigDataInitMaterialService.addElementBufferSendData(
                 buffer,
                 sendDataArrTuple,
               ),
           sendDataArrTuple,
         );

let _readAttributeSendData =
  (. shaderLibDataArr, gl, program, attributeLocationMap) =>
    HandleAttributeConfigDataInitMaterialService.readAttributeSendData(
      shaderLibDataArr,
      (gl, program),
      _readAttributes,
      attributeLocationMap,
    );

let addAttributeSendData =
  (. glTuple, shaderLibDataArr: shaderLibs, recordTuple) =>
    HandleAttributeConfigDataInitMaterialService.addAttributeSendData(
      glTuple,
      shaderLibDataArr,
      _readAttributeSendData,
      recordTuple,
    );