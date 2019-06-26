open AllGlobalTempType;

let getFloat32Array1 = record => record.float16Array1;

let addUnUsedFloat9 = (float9Array1, record) => {
  record.unusedFloat9ArrayArr =
    record.unusedFloat9ArrayArr |> ArrayService.push(float9Array1);

  record;
};

let popUnUsedFloat9Array = record => {
  let value =
    WonderCommonlib.ArrayService.unsafePop(record.unusedFloat9ArrayArr);

  (
    record,
    NullService.isInArray(value),
    value,
    /* record.unusedFloat9ArrayArr |> Js.Array.pop, */
  );
};