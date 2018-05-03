open StateDataMainType;

open PointLightType;

let _restoreTypeArrays = (currentPointLightRecord, targetPointLightRecord) => {
  let (colors, intensities, constants, linears, quadratics, ranges) =
    (
      currentPointLightRecord.colors,
      currentPointLightRecord.intensities,
      currentPointLightRecord.constants,
      currentPointLightRecord.linears,
      currentPointLightRecord.quadratics,
      currentPointLightRecord.ranges
    )
    |> RecordPointLightMainService.setDefaultTypeArrData(
         BufferPointLightService.getBufferMaxCount()
       );
  TypeArrayService.fillFloat32ArrayWithFloat32Array(
    (currentPointLightRecord.colors, 0),
    (targetPointLightRecord.colors, 0),
    Js.Typed_array.Float32Array.length(targetPointLightRecord.colors)
  )
  |> ignore;
  TypeArrayService.fillFloat32ArrayWithFloat32Array(
    (currentPointLightRecord.intensities, 0),
    (targetPointLightRecord.intensities, 0),
    Js.Typed_array.Float32Array.length(targetPointLightRecord.intensities)
  )
  |> ignore;
  TypeArrayService.fillFloat32ArrayWithFloat32Array(
    (currentPointLightRecord.constants, 0),
    (targetPointLightRecord.constants, 0),
    Js.Typed_array.Float32Array.length(targetPointLightRecord.constants)
  )
  |> ignore;
  TypeArrayService.fillFloat32ArrayWithFloat32Array(
    (currentPointLightRecord.linears, 0),
    (targetPointLightRecord.linears, 0),
    Js.Typed_array.Float32Array.length(targetPointLightRecord.linears)
  )
  |> ignore;
  TypeArrayService.fillFloat32ArrayWithFloat32Array(
    (currentPointLightRecord.quadratics, 0),
    (targetPointLightRecord.quadratics, 0),
    Js.Typed_array.Float32Array.length(targetPointLightRecord.quadratics)
  )
  |> ignore;
  TypeArrayService.fillFloat32ArrayWithFloat32Array(
    (currentPointLightRecord.ranges, 0),
    (targetPointLightRecord.ranges, 0),
    Js.Typed_array.Float32Array.length(targetPointLightRecord.ranges)
  )
  |> ignore;
  (currentPointLightRecord, targetPointLightRecord)
};

let restore = (currentState, targetState) => {
  let currentPointLightRecord = currentState.pointLightRecord;
  let targetPointLightRecord = targetState.pointLightRecord;
  let (currentPointLightRecord, targetPointLightRecord) =
    _restoreTypeArrays(currentPointLightRecord, targetPointLightRecord);
  {
    ...targetState,
    pointLightRecord: {
      ...targetPointLightRecord,
      buffer: currentPointLightRecord.buffer,
      colors: currentPointLightRecord.colors,
      intensities: currentPointLightRecord.intensities,
      constants: currentPointLightRecord.constants,
      linears: currentPointLightRecord.linears,
      quadratics: currentPointLightRecord.quadratics,
      ranges: currentPointLightRecord.ranges
    }
  }
};