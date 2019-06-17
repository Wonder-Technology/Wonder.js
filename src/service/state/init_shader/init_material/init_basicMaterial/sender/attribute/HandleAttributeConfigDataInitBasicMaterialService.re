open WonderWebgl.GlType;

open WonderWebgl.Gl;

open AllRenderConfigType;

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
                 | AllVboBufferType.Instance_m_matrix =>
                   HandleAttributeConfigDataInitMaterialAllService.addModelMatrixInstanceArrayBufferSendData(
                     (gl, program, name, attributeLocationMap),
                     sendDataArrTuple,
                   )
                 | _ =>
                   HandleAttributeConfigDataInitMaterialAllService.addOtherArrayBufferSendData(
                     (gl, program, name, buffer, type_, attributeLocationMap),
                     sendDataArrTuple,
                   )
                 };
               } :
               HandleAttributeConfigDataInitMaterialAllService.addElementBufferSendData(
                 buffer,
                 sendDataArrTuple,
               ),
           sendDataArrTuple,
         );

let _readAttributeSendData =
  (. shaderLibDataArr, gl, program, attributeLocationMap) =>
    HandleAttributeConfigDataInitMaterialAllService.readAttributeSendData(
      shaderLibDataArr,
      (gl, program),
      _readAttributes,
      attributeLocationMap,
    );

let addAttributeSendData =
  (. glTuple, shaderLibDataArr: shaderLibs, recordTuple) =>
    HandleAttributeConfigDataInitMaterialAllService.addAttributeSendData(
      glTuple,
      shaderLibDataArr,
      _readAttributeSendData,
      recordTuple,
    );