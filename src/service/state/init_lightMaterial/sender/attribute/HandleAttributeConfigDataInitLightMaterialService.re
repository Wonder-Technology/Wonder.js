open GlType;

open Gl;

open RenderConfigType;

open StateRenderType;

let _addNormalMatrixInstanceArrayBufferSendData =
    ((gl, program, name, attributeLocationMap), (sendDataArr, instanceSendNoCachableDataArr)) => (
  sendDataArr,
  instanceSendNoCachableDataArr
  |> ArrayService.push({
       pos: GLSLLocationService.getAttribLocation(program, name, attributeLocationMap, gl),
       size: 3,
       getOffsetFunc: [@bs] ((index) => (index - 4) * 12 + 64)
     })
);

let _readAttributes =
  [@bs]
  (
    ((gl, program, attributeLocationMap), sendDataArrTuple, attributes) =>
      switch attributes {
      | None => sendDataArrTuple
      | Some(attributes) =>
        attributes
        |> WonderCommonlib.ArrayService.reduceOneParam(
             [@bs]
             (
               (sendDataArrTuple, {name, buffer, type_}) =>
                 switch (name, type_) {
                 | (Some(name), Some(type_)) =>
                   switch buffer {
                   | "instance_mMatrix" =>
                     HandleAttributeConfigDataInitMaterialService.addModelMatrixInstanceArrayBufferSendData(
                       (gl, program, name, attributeLocationMap),
                       sendDataArrTuple
                     )
                   | "instance_normalMatrix" =>
                     _addNormalMatrixInstanceArrayBufferSendData(
                       (gl, program, name, attributeLocationMap),
                       sendDataArrTuple
                     )
                   | _ =>
                     HandleAttributeConfigDataInitMaterialService.addOtherArrayBufferSendData(
                       (gl, program, name, buffer, type_, attributeLocationMap),
                       sendDataArrTuple
                     )
                   }
                 | (_, _) =>
                   HandleAttributeConfigDataInitMaterialService.addElementBufferSendData(
                     buffer,
                     sendDataArrTuple
                   )
                 }
             ),
             sendDataArrTuple
           )
      }
  );

let _readAttributeSendData =
  [@bs]
  (
    (shaderLibDataArr, gl, program, attributeLocationMap) =>
      HandleAttributeConfigDataInitMaterialService.readAttributeSendData(
        shaderLibDataArr,
        (gl, program),
        _readAttributes,
        attributeLocationMap
      )
  );

let addAttributeSendData =
  [@bs]
  (
    (glTuple, shaderLibDataArr: shader_libs, recordTuple) =>
      HandleAttributeConfigDataInitMaterialService.addAttributeSendData(
        glTuple,
        shaderLibDataArr,
        _readAttributeSendData,
        recordTuple
      )
  );